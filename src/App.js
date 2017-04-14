import React, { Component } from 'react';
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import { DragDropContext, DragSource, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './App.css';

const initialState = {
  output: []
}

let store = createStore(function (state = initialState, action) {
  switch (action.type) {
    case 'DISPLAY_OUTPUT':
      return {
        output: [
          ...state.output,
          ...action.payload.output
        ]
      }
    default: return state
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const Types = {
  EMOJI: 'EMOJI',
}

const emojiSource = {
  beginDrag(props) {
    return {
      children: props.children
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const Emoji = DragSource(Types.EMOJI, emojiSource, collect)(
  class Emoji extends Component {
    render() {
      const { connectDragSource, isDragging } = this.props
      return connectDragSource(
        <span style={{
          opacity: isDragging ? 0.5 : 1,
          border: '2px solid silver',
          fontSize: '2rem',
          marginRight: '1rem',
          zIndex: 2,
          cursor: 'move'
        }}>
          {this.props.children}
        </span>
      )
    }
  }
)

const squareTarget = {
  drop(props, monitor) {
    store.dispatch({
      type: 'DISPLAY_OUTPUT',
      payload: {
        output: [`${monitor.getItem().children.repeat(3)}🐢`] 
      }
    })
  }
}

function squareCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const Question = `function (emoji) {

  return emoji * 3 + 🐢

}`

const Square = DropTarget(Types.EMOJI, squareTarget, squareCollect)(
  class Square extends Component {
    render() {
      const { connectDropTarget, isOver } = this.props
      return connectDropTarget(
        <pre style={{
          padding: '1rem',
          fontSize: '1.5rem',
          backgroundColor: isOver ? 'yellow' : 'silver'
        }}>
          {Question}
        </pre>
      )
    }
  }
)

function mapStateToProps({ output }) {
  return {
    output
  }
}

const Output = connect(mapStateToProps)(
  (props) => {
    return (
      <div>
        <h2>Results:</h2>
      {props.output.map((emoji, i) => (
        <div
          key={`emoji-${i}`}
          style={{
            fontSize: '2rem',
          }}
        >
          {emoji}
        </div>
      ))}
      </div>
    )
  }
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>RoboAlgebra</h1>
          <Emoji>
            ☺️
          </Emoji>
          <Emoji>
            👽
          </Emoji>
          <Emoji>
            👽👽
          </Emoji>
          <h2>Drag an Emoji into the code below:</h2>
          <Square/>
          <Output/>
        </div>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
