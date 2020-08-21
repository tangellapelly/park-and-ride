import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ActionsList from "../ActionsList";
const SectionItem = (props) => {
  const { section, index } = props;

  const type = {
    taxi: "Cab",
    vehicle: "Drive",
    pedestrian: "Walk",
    transit: "Transit",
  };
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={section.id}>
          {type[section.type]}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={section.id}>
        <Card.Body>
          <ActionsList section={section} index={index} />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default SectionItem;
