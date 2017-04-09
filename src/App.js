import React, { Component } from 'react';
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import { DragDropContext, DragSource, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import 'normalize.css'
import './App.css';

const initialState = {
  output: []
}

let store = createStore(function (state = initialState, action) {
  switch (action.type) {
    case 'DISPLAY_OUTPUT':
      return {
        output: [...state.output, ...action.payload.output]
      }
    default: return state
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const Types = {
  KISSY: Symbol('kissy')
}

const emojiSource = {
  beginDrag(props) {
    return {
      emojiId: 'kissy',
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const Emoji = DragSource(Types.KISSY, emojiSource, collect)(
  class Emoji extends Component {
    render() {
      const { connectDragSource, isDragging } = this.props
      return connectDragSource(
        <span style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: '2rem',
          zIndex: 2,
          cursor: 'move'
        }}>
        😘
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
        emoji: 'kissy',
        output: ['😘😘😘🐢']
      }
    })
    console.log(monitor.getItem())
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

const Square = DropTarget(Types.KISSY, squareTarget, squareCollect)(
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
      <ReactCSSTransitionGroup
        transitionName="tube"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {props.output.map((emoji, i) => (
          <div key={`emoji-${i}`}>{emoji}</div>
        ))}
      </ReactCSSTransitionGroup>
    )
  }
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>RoboAlgebra</h1>
          <Emoji/>
          <Square/>
          <Output/>
        </div>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
