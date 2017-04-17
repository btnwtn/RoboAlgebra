import React from 'react'
import { DropTarget } from 'react-dnd'
import { Types } from "../../DragSources";
import TubeTarget from '../../containers/TubeTarget'

const target = {
  drop(props, monitor) {
    console.log(monitor.getItem())
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const TubeTarget = DropTarget(Types.EMOJI, target, collect)(
  const DropTarget = ({ connectDropTarget, isOver, ...rest }) => {
    return connectDropTarget(
      Tube({
        ...rest,
        backgroundColor: 'red',
      })
    )
  }
)

export default TubeTarget
