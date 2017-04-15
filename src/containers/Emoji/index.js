import React, { Component } from "react";
import { DragSource } from "react-dnd";
import { Types } from "../../DragSources";

const source = {
  beginDrag(props) {
    return {
      children: props.children
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const Emoji = DragSource(Types.EMOJI, source, collect)(
  class Emoji extends Component {
    render() {
      const { connectDragSource, isDragging } = this.props;
      return connectDragSource(
        <span
          style={{
            opacity: isDragging ? 0.5 : 1,
            border: "2px solid silver",
            fontSize: "2rem",
            marginRight: "1rem",
            zIndex: 2,
            cursor: "move"
          }}
        >
          {this.props.children}
        </span>
      );
    }
  }
);

export default Emoji;
