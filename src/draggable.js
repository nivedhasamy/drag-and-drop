import React, { useEffect, useState, useCallback } from "react";
import styled, { css } from "styled-components";

const Draggable = ({ element, children, setCardConfig, index }) => {
  const [originalX, setOriginalX] = useState(0);
  const [originalY, setOriginalY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [lastTranslateX, setLastTranslateX] = useState(
    element?.translateX || 0
  );
  const [lastTranslateY, setLastTranslateY] = useState(
    element?.translateY || 0
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    const { clientX, clientY } = e;

    setOriginalX(clientX);
    setOriginalY(clientY);
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e) => {
      e.stopPropagation();
      if (!isDragging) {
        return;
      }
      const { clientX, clientY } = e;

      const container = document.getElementsByClassName("drop-container")[0];
      let elStyle = window.getComputedStyle(container);

      const eloffsetLeft =
        container.offsetLeft +
        parseInt(e?.srcElement?.offsetWidth, 10) +
        parseInt(elStyle.paddingLeft, 10);

      const eloffsetTop =
        container.offsetTop +
        parseInt(e?.srcElement?.offsetHeight, 10) -
        parseInt(elStyle.paddingTop, 10);

      const eloffsetRight =
        container.offsetLeft +
        container.offsetWidth -
        parseInt(e?.srcElement?.offsetWidth, 10) -
        parseInt(elStyle.paddingRight, 10);

      const eloffsetBottom =
        container.offsetHeight +
        container.offsetTop -
        parseInt(e?.srcElement?.offsetHeight, 10) -
        parseInt(elStyle.paddingBottom, 10);

      if (
        clientX > eloffsetLeft &&
        clientX < eloffsetRight &&
        clientY > eloffsetTop &&
        clientY < eloffsetBottom
      ) {
        const translateX = clientX - originalX + lastTranslateX;
        const translateY = clientY - originalY + lastTranslateY;
        setTranslateX(translateX);
        setTranslateY(translateY);

        setCardConfig((x) => [
          ...x.slice(0, index),
          {
            ...x[index],
            translateX,
            translateY
          },
          ...x.slice(index + 1)
        ]);
      }
    },
    [
      isDragging,
      originalX,
      originalY,
      lastTranslateX,
      lastTranslateY,
      setCardConfig,
      index
    ]
  );

  const handleMouseUp = useCallback(
    (e) => {
      e.stopPropagation();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      setOriginalX(0);
      setOriginalY(0);
      setIsDragging(false);
      setLastTranslateX(translateX);
      setLastTranslateY(translateY);
    },
    [translateY, translateX, handleMouseMove]
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <Container
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      isDragging={isDragging}
    >
      {children}
    </Container>
  );
};

const Container = styled.div`
  cursor: grab;
  position: absolute;
  display: inline-block;
  ${({ isDragging }) =>
    isDragging &&
    css`
      opacity: 0.8;
      cursor: grabbing;
    `};
`;

export default Draggable;
