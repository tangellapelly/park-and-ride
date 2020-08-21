import React from "react";
import "./index.css";
const InfoCard = () => {
  return (
    <div className="info-card colii-7">
      <h4>Coverage Information</h4>
      <p>
        Park and Ride routing is available as a service in the following cities.
      </p>
      <ul>
        <li>Australia - Sydney</li>
        <li>Canada - Toronto</li>
        <li>France - Paris</li>
        <li>Germany - Frankfurt, Munich, Stuttgart</li>
        <li>Italy - Milan, Rome</li>
        <li>Netherlands - Amsterdam</li>
        <li>Spain - Barcelona, Madrid, Valencia</li>
        <li>United Kingdom - Birmingham, London</li>
        <li>United States - Chicago, New York City, Seattle</li>
      </ul>
      <div>
        <h4>Route Legend</h4>
      </div>
      <div
        className="color-palette js-palette"
        style={{
          display: "flex",

          position: "absolute",
          zIndex: 999999,
          width: "300px",
          justifyContent: "space-evenly",
          textAlign: "center",
        }}
      >
        <div className="locked">
          <div
            className="js-palette-color"
            data-hex="#047828"
            data-rgb="117, 255, 51"
            data-hsl="101, 80%, 60%"
            style={{ backgroundColor: "rgb(63, 183, 6)" }}
          ></div>
          <span data-hex="#047828" className="color-lock js-lock"></span>
          <p>Walk</p>
        </div>
        <div className="locked">
          <div
            className="js-palette-color"
            data-hex="#33ffbd"
            data-rgb="51, 255, 189"
            data-hsl="161, 80%, 60%"
            style={{ backgroundColor: "rgb(51, 255, 189)" }}
          ></div>
          <p>Transit</p>
        </div>
        <div className="locked">
          <div
            className="js-palette-color"
            data-hex="#FFC300"
            data-rgb="255, 195, 0"
            data-hsl="46, 100%, 50%"
            style={{ backgroundColor: "rgb(255, 195, 0)" }}
          ></div>

          <p>Drive</p>
        </div>
        <div className="locked">
          <div
            className="js-palette-color"
            data-hex="#FF5733"
            data-rgb="255, 87, 51"
            data-hsl="11, 80%, 60%"
            style={{ backgroundColor: "rgb(255, 87, 51) " }}
          ></div>
          <p>Cab</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
