import React from "react";

const ActionsList = (props) => {
  const secToTimer = (sec) => {
    let o = new Date(0);
    let p = new Date(sec * 1000);
    return new Date(p.getTime() - o.getTime())
      .toISOString()
      .split("T")[1]
      .split("Z")[0];
  };
  const { section } = props;
  return (
    <div>
      <div>{"Travel-Summary: "}</div>
      <div className="row">
        <div className="col-7">
          {"Duration: " + secToTimer(section.travelSummary.duration)}
        </div>
        <div className="col-7">
          {"Distance: " + Number(section.travelSummary.length) / 1000 + " km"}
        </div>
      </div>
      <ul>
        {section.actions !== undefined
          ? section.actions.map((action, index) => {
              return (
                <li key={index}>
                  {action.action} {action.instruction}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};

export default ActionsList;
