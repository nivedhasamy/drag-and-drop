import React from "react";

function renderer(config, i) {
  return React.createElement(
    config?.component,
    {
      key: i,
      placeholder: config?.placeholder,
      type: config?.type,
      className: config?.className,
      value: config?.value,
      contentEditable: config?.contentEditable,
      rows: config?.rows,
      col: config?.col,
      style: {
        transform: `translate(${config.translateX}px, ${config.translateY}px)`
      }
    },
    !!config?.children
      ? typeof config?.children === "string"
        ? config?.children
        : config?.children.map((c) => renderer(c))
      : null
  );
}

export default renderer;
