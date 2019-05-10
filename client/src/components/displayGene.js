import React, { Component } from 'react'

export class DisplayGene extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <div>
          <h3>GENE:</h3>
          <p>SEQ: {this.props.gene["gene"]}</p>
          <p>PROTEIN: {this.props.gene["protein_seq"]}</p>
          <p>NC : {this.props.gene["Nc"]}</p>
      </div>
    )
  }
}

export default DisplayGene
