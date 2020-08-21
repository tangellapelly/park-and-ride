import React from "react";
import SectionInfo from "../SectionInfo";
const RouteInfo = (props) => {
  const { route, index } = props;
  const routeName = [
    "Route A",
    "Route B",
    "Route C",
    "Route D",
    "Route E",
    "Route F",
    "Route G",
  ];
  const routeColors = ["#80391e", "#195e83"];

  return (
    <div className="card" style={{ width: "21rem", top: "60xp" }}>
      <div className="card-body" style={{ color: "#ffff" }}>
        <h5
          className="card-title"
          style={{
            backgroundColor: routeColors[index],
            borderRadius: "13px",
            color: "#ffff",
            textAlign: "center",
            padding: "5px",
          }}
        >
          {routeName[index]}
        </h5>
        <SectionInfo route={route} />
      </div>
    </div>
  );
};

export default RouteInfo;
