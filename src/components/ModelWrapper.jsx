// ModelWrapper.js
import React from 'react'

function ModelWrapper({ children, animation }) {
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, { animation })
  })
}

export default ModelWrapper
