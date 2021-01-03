export default {
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
    children: "Your paragraph here."
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
