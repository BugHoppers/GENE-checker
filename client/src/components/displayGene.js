import React, { Component } from 'react'

export class DisplayGene extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <div>
          <p>{this.props.details}</p>
      </div>
    )
  }
}

export default DisplayGene
