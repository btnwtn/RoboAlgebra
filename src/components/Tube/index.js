import React from 'react'

const Tube = (props) => {
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
        backgroundColor: props.topColor ? props.topColor : 'darkgreen',
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
          {props.children}
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

export default Tube
