import React from "react";
import "./index.css";
import axios from "axios";
import { decode } from "../../utils/flexPolyline";
import RouteInfo from "../RouteInfo";
import ShowModal from "../ShowModal";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromResult: [],
      toResult: [],
      loading: true,
      notices: [],
      sectionInfo: [],
      routes: [],
    };
  }
  componentDidMount() {
    let fromPosition = { lat: 40.72284, lng: -73.99783 };
    let toPosition = { lat: 40.73718, lng: -74.03096 };

    this.setState({ fromPosition });
    this.setState({ toPosition });
    //document.getElementById("routeButton2").click();
  }

  GetFrom = (e) => {
    let searchString = e.target.value;

    if (
      (searchString === null) |
      (searchString === undefined) |
      (searchString === ``)
    ) {
      this.setState({ fromResult: [] });
      return;
    }

    fetch(
      `https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=${process.env.REACT_APP_HERE_API_KEY}&at=33.738045,73.084488&limit=5&resultType=locality,administrativeArea,city,country&in=countryCode:GBP,USA,EUR,FRA,DEU,AUS&q=${searchString}&lang=en`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({ fromResult: [] });
        let dropDownItems = json.items.filter(
          (item) => item.position !== undefined
        );
        let dropData = dropDownItems.map((item, index) => {
          return (
            <li
              onClick={this.handleSelect}
              data-position={JSON.stringify(item.position)}
              data-title={item.title}
              key={index}
            >
              {item.title}
            </li>
          );
        });
        this.setState({ fromResult: dropData });
      });
  };
  GetTo = (e) => {
    let searchString = e.target.value;

    if (
      (searchString === null) |
      (searchString === undefined) |
      (searchString === ``)
    ) {
      this.setState({ toResult: [] });
      return;
    }

    fetch(
      `https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=${process.env.REACT_APP_HERE_API_KEY}&at=33.738045,73.084488&limit=5&resultType=locality,administrativeArea,city,country&in=countryCode:GBP,USA,FRA,DEU,AUS&q=${searchString}&lang=en`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({ toResult: [] });
        let dropDownItems = json.items.filter(
          (item) => item.position !== undefined
        );

        let dropData = dropDownItems.map((item, index) => {
          return (
            <li
              onClick={this.handleToSelect}
              data-position={JSON.stringify(item.position)}
              data-title={item.title}
              key={index}
            >
              {item.title}
            </li>
          );
        });
        this.setState({ toResult: dropData });
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="ctrl-panel">
          <div className="form-horizontal">
            <div className="form-group row">
              <div className="col-sm-12">
                <input
                  required
                  type="text"
                  id="start"
                  size="40"
                  className="form-control "
                  placeholder="From"
                  onKeyUp={this.GetFrom}
                  autoComplete="off"
                  ref={(input) => {
                    this.fromValue = input;
                  }}
                />
                <ul id="fromlist" className="list">
                  {this.state.fromResult}
                </ul>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <input
                  type="text"
                  id="dest"
                  className="form-control"
                  size="40"
                  autoComplete="off"
                  required
                  placeholder="To"
                  ref={(input) => {
                    this.toValue = input;
                  }}
                  onKeyUp={this.GetTo}
                />
                <ul id="Tolist" className="list">
                  {this.state.toResult}
                </ul>
              </div>
            </div>
          </div>

          <div className="form-horizontal">
            <div className="form-group" style={{ textAlign: "center" }}>
              <div className="col-sm-12">
                <input
                  type="submit"
                  id="routeButton2"
                  className="btn btn-success"
                  value="Fetch Route"
                  onClick={this.calculateInterModelRoute}
                />
              </div>
            </div>
          </div>
          {this.state.notices.length > 0 ? (
            <ShowModal show={true} notices={this.state.notices} />
          ) : (
            ""
          )}

          <div
            style={{
              overflow: "auto",
              width: "-webkit-fill-available",
              maxHeight: "400px",
              padding: "9px 9px 0px 0px",
            }}
          >
            {this.state.routes.map((route, index) => {
              return <RouteInfo route={route} index={index} />;
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleSelect = async (data) => {
    let selected_position = JSON.parse(data.currentTarget.dataset.position);
    let selectedValue = data.currentTarget.dataset.title;
    this.fromValue.value = selectedValue;
    this.setState({ fromResult: [] });
    const fromPosition = {
      lat: Number(selected_position.lat),
      lng: Number(selected_position.lng),
    };

    this.setState({ fromPosition });
  };
  handleToSelect = async (data) => {
    let selected_position = JSON.parse(data.currentTarget.dataset.position);
    let selectedValue = data.currentTarget.dataset.title;
    this.toValue.value = selectedValue;
    this.setState({ toResult: [] });
    const toPosition = {
      lat: Number(selected_position.lat),
      lng: Number(selected_position.lng),
    };

    this.setState({ toPosition });
  };

  calculateInterModelRoute = async () => {
    window.map.removeObjects(window.map.getObjects());
    if (
      (this.state.fromPosition === undefined) |
      (this.state.fromPosition === "")
    ) {
      alert("From is required");
      return;
    }
    if (
      (this.state.toPosition === undefined) |
      (this.state.toPosition === "")
    ) {
      alert("From is required");
      return;
    }
    let source = `${this.state.fromPosition.lat},${this.state.fromPosition.lng}`;
    let destination = `${this.state.toPosition.lat},${this.state.toPosition.lng}`;

    try {
      this.props.loading(true);
      document.body.style.backgroundColor = "gray";
      const time = new Date().toISOString();
      const response = await axios.get(
        `https://intermodal.router.hereapi.com/v8/routes?alternatives=1&departureTime=${time}&destination=${destination}&origin=${source}&transit[enable]=routeTail&vehicle[enable]=routeHead&vehicle[modes]=car&return=intermediate,fares,polyline,actions,travelSummary&apikey=${process.env.REACT_APP_HERE_API_KEY}`
      );
      this.props.loading(false);
      document.body.style.backgroundColor = "transparent";

      if (response.data.notices !== undefined) {
        let notices = response.data.notices.map((notice) => (
          <li>{notice.title}</li>
        ));

        this.setState({ notices });
      }

      if (response.data.title === "Service unavailable") {
        alert("Please choose correct pair of source and destination");
        return;
      }
      this.setState({ routes: response.data.routes });

      response.data.routes.map((route, routeIndex) => {
        let fullRoute = [];

        route.sections.map((section, index) => {
          fullRoute.push(decode(section.polyline).polyline);
        });
        var merged = [].concat.apply([], fullRoute);
        // Diplaying routes
        this.props.addPolylineToMap(
          source,
          destination,
          merged,
          routeIndex,
          12,
          route.id,
          true
        );

        // Displaying sections in the route
        let sectionInfo = route.sections.map((section, index) => {
          //fullRoute.push(decode(section.polyline).polyline)

          this.props.addPolylineToMap(
            source,
            destination,
            decode(section.polyline).polyline,
            section.type,
            5,
            route.id,
            false
          );
          const { id, type, actions, postActions, travelSummary } = section;
          return { id, type, actions, postActions, travelSummary };
        });
        sectionInfo.routeId = route.id;

        this.setState({ sectionInfo });
      });

      //this.props.addPolylineToMap(decode(routes[0].sections[0].polyline).polyline, 1)
    } catch (error) {
      console.error(error);
      this.props.loading(false);
      alert("something went wrong");
    }
  };
}
export default ControlPanel;
