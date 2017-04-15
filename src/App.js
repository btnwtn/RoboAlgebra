import React, { Component } from "react";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "./App.css";

import Emoji from "./containers/Emoji";
import FunctionBlock from "./containers/FunctionBlock";

const initialState = {
  output: []
};

let store = createStore(
  function(state = initialState, action) {
    switch (action.type) {
      case "DISPLAY_OUTPUT":
        return {
          output: [...state.output, ...action.payload.output]
        };
      default:
        return state;
    }
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Question1 = `function (emoji) {

  return emoji * 3 + 🐢

}`;

const Question2 = `function (emoji) {

  return emoji * 2 + 😎

}`;

function mapStateToProps({ output }) {
  return {
    output
  };
}

const Output = connect(mapStateToProps)(props => {
  return (
    <div>
      {Boolean(props.output.length) && <h2>Results:</h2>}
      {props.output.map((emoji, i) => (
        <div
          key={`emoji-${i}`}
          style={{
            fontSize: "2rem"
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
});

class App extends Component {
  state = {
    question: 1
  };

  render() {
    return (
      <Provider store={store}>
        <div>
          <h1
            style={{
              marginTop: 0
            }}
          >
            RoboAlgebra
          </h1>
          <Emoji>
            ☺️
          </Emoji>
          <Emoji>
            👽
          </Emoji>
          <Emoji>
            👽👽
          </Emoji>

          <h2 style={{ marginTop: "2rem" }}>Pick a Question</h2>
          <div
            style={{
              fontSize: "1.25rem",
              marginTop: "1rem"
            }}
          >
            <a
              href="#"
              style={{
                marginRight: "1rem",
                cursor: this.state.question === 1 ? "default" : "pointer",
                color: this.state.question === 1 ? "black" : "",
                textDecoration: this.state.question === 1 ? "none" : "underline"
              }}
              onClick={event => {
                event.preventDefault();
                this.setState({ question: 1 });
              }}
            >
              Question 1
            </a>
            <a
              href="#"
              style={{
                cursor: this.state.question === 2 ? "default" : "pointer",
                color: this.state.question === 2 ? "black" : "",
                textDecoration: this.state.question === 2 ? "none" : "underline"
              }}
              onClick={event => {
                event.preventDefault();
                this.setState({ question: 2 });
              }}
            >
              Question 2
            </a>
          </div>

          <h2>Drag an Emoji into the code below:</h2>
          {this.state.question === 1 &&
            <FunctionBlock
              handleDrop={monitor => {
                const emoji = monitor.getItem().children;
                return `${emoji.repeat(2)}😎`;
              }}
            >
              {Question2}
            </FunctionBlock>}

          {this.state.question === 2 &&
            <FunctionBlock
              handleDrop={monitor => {
                const emoji = monitor.getItem().children;
                return `${emoji.repeat(3)}🐢`;
              }}
            >
              {Question1}
            </FunctionBlock>}

          <Output />
        </div>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
