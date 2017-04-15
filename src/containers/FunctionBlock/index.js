import React, { Component } from "react";
import { connect } from "react-redux";
import { DropTarget } from "react-dnd";
import { Types } from "../../DragSources";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateOutput: output =>
      dispatch({
        type: "DISPLAY_OUTPUT",
        payload: {
          output
        }
      })
  };
};

const target = {
  drop(props, monitor) {
    props.updateOutput([props.handleDrop(monitor)]);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const FunctionBlock = DropTarget(Types.EMOJI, target, collect)(
  class FunctionBlock extends Component {
    render() {
      const { connectDropTarget, isOver } = this.props;
      return connectDropTarget(
        <pre
          style={{
            maxWidth: "26.25rem",
            padding: "1rem",
            fontSize: "1.5rem",
            backgroundColor: isOver ? "yellow" : "#eee",
            border: "2px solid #dedede"
          }}
        >
          {this.props.children}
        </pre>
      );
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(FunctionBlock);
