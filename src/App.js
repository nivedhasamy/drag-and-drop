import React, { useState, useEffect } from "react";
import "./styles.css";
import RenderCard from "./renderCard";
import "bootstrap/dist/css/bootstrap.min.css";
import Draggable from "./draggable";

const elements = {
  Input: {
    component: "input",
    placeholder: "input placeholder",
    type: "text"
  },
  Select: {
    component: "select",
    children: [
      { component: "option", value: "val1", children: "value1" },
      { component: "option", value: "val2", children: "value2" },
      { component: "option", value: "val3", children: "value3" }
    ]
  },
  "Text Area": {
    component: "textarea",
    placeholder: "textarea placeholder",
    rows: "3",
    cols: "60"
  },
  Paragraph: {
    component: "p",
    children: "Click and edit your custom text",
    contentEditable: true
  },
  Heading: {
    component: "h1",
    children: "Header 1"
  },
  Button: {
    component: "button",
    children: "Click Me!"
  }
};

export default function App() {
  const [cardConfig, setCardConfig] = useState([]);

  // useEffect(() => {
  //   console.log({ cardConfig });
  // }, [cardConfig]);

  useEffect(() => {
    setCardConfig(JSON.parse(localStorage.getItem("progress")) || []);
  }, []);

  const onSave = () =>
    localStorage.setItem("progress", JSON.stringify(cardConfig));

  const onClear = () => setCardConfig([]);

  const onDragStart = (e, option) => {
    e.dataTransfer.setData("element", option);
  };

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e) => {
    let item = e.dataTransfer.getData("element");
    setCardConfig((x) => [...x, elements[item]]);
  };

  return (
    <div className="App">
      <h4>React Studio</h4>
      <span className="gui-container">
        <div className="elements-container">
          {Object.keys(elements).map((option) => {
            return (
              <h5
                key={option}
                onDragStart={(e) => onDragStart(e, option)}
                draggable
                className="draggable"
              >
                {option}
              </h5>
            );
          })}
        </div>
        <div className="drag-n-drop-container">
          <div
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => {
              onDrop(e);
            }}
            className="drop-container droppable"
          >
            {cardConfig.map((config, i) => (
              <Draggable
                index={i}
                element={config}
                setCardConfig={setCardConfig}
                key={`${config?.component}_${i}`}
              >
                {RenderCard(config, i)}
              </Draggable>
            ))}
          </div>
        </div>
      </span>
      <div className="btnContainer">
        <button onClick={onSave}>Save</button>
        <button className="buttonInverse" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
