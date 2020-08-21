import React from "react";
import ControlPanel from "../Controlpanel";
import defaultRoute from "./defaultRoute.json";
import "./index.css";

import LoadingOverlay from "react-loading-overlay";
import InfoCard from "../InfoCard.js";
class Map extends React.Component {
  mapRef = React.createRef();
  state = {
    map: null,
    loading: false,
  };

  async componentDidMount() {
    const H = window.H;

    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_HERE_API_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 50, lng: 5 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    window.addEventListener("resize", () => map.getViewPort().resize());
    window.ui = H.ui.UI.createDefault(map, defaultLayers);

    this.setState({ map });
    window.map = map;

    document.getElementById("start").value =
      "Crosby St, New York, NY 10012, United States";
    document.getElementById("dest").value = "Hoboken, NJ, United States";
    await new Promise((resolve) => setTimeout(resolve, 3000));
    document.getElementById("routeButton2").click();
  }

  componentWillUnmount() {
    this.state.map.dispose();
  }
  logEvent = (evt) => {
    var logContainer = document.createElement("ul");
    logContainer.className = "log";
    logContainer.innerHTML = "";
    var entry = document.createElement("li");
    entry.className = "log-entry";
    entry.textContent = [
      'event "',
      evt.type,
      '" @ ' + evt.target.getData(),
    ].join("");
    logContainer.insertBefore(entry, logContainer.firstChild);
  };
  addPolylineToMap = (
    source,
    destination,
    polyline,
    color,
    stroke,
    routeId,
    route
  ) => {
    var lineString = new window.H.geo.LineString();
    const routeColors = ["#80391e", "#195e83"];
    const sectionColors = {
      transit: "#33FFBD",
      vehicle: "#FFC300",
      pedestrian: "rgb(63, 183, 6)",
      taxi: "#FF5733",
    };

    polyline.map((lineAry) => {
      lineString.pushPoint({ lat: lineAry[0], lng: lineAry[1] });
      return null;
    });

    let polylineOnMap = new window.H.map.Polyline(lineString, {
      style: {
        lineWidth: stroke,
        strokeColor: route ? routeColors[color] : sectionColors[color],
      },
    });
    var svgMarkup =
      '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
      '<rect stroke="black" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
      '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
      'text-anchor="middle" fill="${STROKE}" >${text}</text></svg>';

    // Add the first marker
    var sourceIcon = new window.H.map.Icon(
      svgMarkup
        .replace("${FILL}", "blue")
        .replace("${STROKE}", "red")
        .replace("${text}", "S")
    );
    var destinationIcon = new window.H.map.Icon(
      svgMarkup
        .replace("${FILL}", "orange")
        .replace("${STROKE}", "white")
        .replace("${text}", "D")
    );

    var sourceMarker = new window.H.map.Marker(
      { lat: source.split(",")[0], lng: source.split(",")[1] },
      { icon: sourceIcon }
    );
    sourceMarker.setData(`<p>Source</p>`);
    var destinationMarker = new window.H.map.Marker(
      { lat: destination.split(",")[0], lng: destination.split(",")[1] },
      { icon: destinationIcon }
    );
    destinationMarker.setData(`<p>destination</p>`);
    var group = new window.H.map.Group();

    window.map.addObject(group);

    // add 'tap' event listener, that opens info bubble, to the group
    group.addEventListener(
      "tap",
      function (evt) {
        // event target is the marker itself, group is a parent event target
        // for all objects that it contains
        var bubble = new window.H.ui.InfoBubble(evt.target.getGeometry(), {
          // read custom data
          content: evt.target.getData(),
        });
        // show info bubble
        window.ui.addBubble(bubble);
      },
      false
    );

    polylineOnMap.setData(`${routeId}`);

    window.sourceMarker = sourceMarker;
    window.destinationMarker = destinationMarker;
    window.polylineOnMap = polylineOnMap;
    group.addObject(sourceMarker);
    group.addObject(destinationMarker);
    group.addObject(polylineOnMap);
    window.map
      .getViewModel()
      .setLookAtData({ bounds: polylineOnMap.getBoundingBox() }, true);
    window.map.setZoom(11, true);
  };

  isLoading = (loading) => {
    this.setState({ loading });
  };

  render() {
    return (
      <React.Fragment>
        <div ref={this.mapRef} style={{ width: "100vw", height: "100vh" }}>
          <InfoCard />

          <ControlPanel
            addPolylineToMap={this.addPolylineToMap}
            loading={this.isLoading}
          />
        </div>
        <LoadingOverlay
          active={this.state.loading}
          spinner
          text="Fetching route(s)..."
        />
      </React.Fragment>
    );
  }
}

export default Map;
