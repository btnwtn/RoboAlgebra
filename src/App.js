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
      case "CLEAR_OUTPUT":
        return {
          output: []
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

class Tube extends Component {
  render() {
    return (
      <div style={{
        position: 'relative',
        marginTop: '10px',
        marginBottom: '10px',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100px',
          height: '20px',
          backgroundColor: 'darkgreen',
          borderRadius: '50%',
          transform: 'translateY(-10px)',
        }}/>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100px',
          height: '200px',
          backgroundColor: 'green',
        }}>
          <span style={{
            fontSize: '1.4rem',
            color: '#fff',
            textShadow: '1px 1px 2px rgba(0,0,0,.4)',
          }}>
            2x + 3
          </span>
        </div>
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          left: 0,
          width: '100px',
          height: '20px',
          backgroundColor: 'green',
          borderRadius: '50%',
          transform: 'translateY(-10px)',
        }}/>
      </div>
    )
  }
}

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
                if (this.state.question === 2) {
                  store.dispatch({ type: "CLEAR_OUTPUT" });
                }
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
                if (this.state.question === 1) {
                  store.dispatch({ type: "CLEAR_OUTPUT" });
                }
                this.setState({ question: 2 });
              }}
            >
              Question 2
            </a>
          </div>

          <h2>Drag an Emoji into the code below:</h2>

          <Tube/>

          {this.state.question === 1 &&
            <FunctionBlock
              handleDrop={monitor => {
                const emoji = monitor.getItem().children;
                return `IN: ${emoji} OUT: ${emoji.repeat(2)}😎`;
              }}
            >
              {Question2}
            </FunctionBlock>}

          {this.state.question === 2 &&
            <FunctionBlock
              handleDrop={monitor => {
                const emoji = monitor.getItem().children;
                return `IN: ${emoji} OUT: ${emoji.repeat(3)}🐢`;
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
