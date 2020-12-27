import React from "react";
import styled, { css } from "styled-components";

export default class Draggable extends React.Component {
  state = {
    isDragging: false,

    originalX: 0,
    originalY: 0,

    translateX: 0,
    translateY: 0,

    lastTranslateX: this.props.element.translateX || 0,
    lastTranslateY: this.props.element.translateY || 0
  };

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown = (e) => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);

    const { clientX, clientY } = e;

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true
    });
  };

  handleMouseMove = (e) => {
    const { isDragging } = this.state;

    if (!isDragging) {
      return;
    }
    const { clientX, clientY } = e;

    const el = document.getElementsByClassName("drop-container")[0];
    const eloffsetLeft = el.offsetLeft + 30;
    const eloffsetTop = el.offsetTop + 30;
    const eloffsetRight = el.offsetWidth + eloffsetLeft;
    const eloffsetBottom = el.offsetHeight + eloffsetTop;

    if (
      clientX > eloffsetLeft &&
      clientX < eloffsetRight &&
      clientY > eloffsetTop &&
      clientY < eloffsetBottom
    ) {
      const {
        lastTranslateX,
        originalX,
        lastTranslateY,
        originalY
      } = this.state;
      const { setCardConfig, index } = this.props;

      const translateX = clientX - originalX + lastTranslateX;
      const translateY = clientY - originalY + lastTranslateY;
      this.setState({ translateX, translateY });
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
  };

  handleMouseUp = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);

    this.setState({
      originalX: 0,
      originalY: 0,
      lastTranslateX: this.state.translateX,
      lastTranslateY: this.state.translateY,
      isDragging: false
    });
  };

  render() {
    const { children } = this.props;
    const { translateX, translateY, isDragging } = this.state;

    return (
      <Container
        onMouseDown={this.handleMouseDown}
        x={translateX}
        y={translateY}
        isDragging={isDragging}
      >
        {children}
      </Container>
    );
  }
}

const Container = styled.div`
  cursor: grab;
  display: inline-block;
  ${({ isDragging }) =>
    isDragging &&
    css`
      opacity: 0.8;
      cursor: grabbing;
    `};
`;
