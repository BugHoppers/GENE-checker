import React, { Component } from 'react'

export class DisplayGene extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <div>
          <h3>META</h3>
          <p>{this.props.meta}</p>
          <h3>GENE:</h3>
          <p>{this.props.gene}</p>
      </div>
    )
  }
}

export default DisplayGene
