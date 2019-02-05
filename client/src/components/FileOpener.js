import React, { Component } from "react";
import DisplayGene from "./displayGene";

export class FileOpener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genes: []
    };
  }
  handleFileChosen = file => {
    var reader = new FileReader();
    let genes = [];
    reader.onload = e => {
      let content = reader.result;
      content = content.split(">");
      if (content.length > 1) {
        for (let i = 1; i < content.length; i++) {
          if (content[i].includes("Reverse")) {
            console.log("REV");
            genes.push(content[i]);
            this.setState({ genes: genes });
          } else if (content[i].includes("Forward")) {
            console.log("FOWD");
            genes.push(content[i]);
            this.setState({ genes: genes });
          } else {
            alert("Not a fasta file");
          }
        }
        console.log(this.state.genes);
      } else {
        alert("It is not a fasta file");
      }
    };
    reader.readAsText(file);
  };

  getGenes = () => {
    return (
      <div>
        {this.state.genes.map((gene,i) => <DisplayGene key={i} details={gene}/>)}
      </div>
    );
  };
  render() {
    return (
      <div>
        <div onSubmit={this.onFormSubmit}>
          <p>Open A faster File</p>
          <div className="upload-expense">
            <input
              type="file"
              id="file"
              className="input-file"
              accept=".txt,.fasta"
              onChange={e => this.handleFileChosen(e.target.files[0])}
            />
          </div>
          {this.getGenes()}
        </div>
      </div>
    );
  }
}

export default FileOpener;
