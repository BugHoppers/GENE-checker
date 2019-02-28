import React, { Component } from "react";
import DisplayGene from "./displayGene";
import axios from "axios";
export class FileOpener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: []
    };
  }

  handleFileChosen = async (file) => {
    var reader = new FileReader();
    let contents;
    reader.onload = e => {
      contents = reader.result;
      axios.post("/upload", {
        "files": contents
      });
    }
    reader.readAsText(file);
  };

  getGenes = () => {
    return (
      <div>
        {this.state.details.map((detail, i) => <DisplayGene key={i} meta={detail["meta"]} gene={detail["gene"]} />)}
      </div>
    );
  };
  render() {
    return (
      <div>
        <div onSubmit={this.onFormSubmit}>
          <p>Open a fasta File</p>
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
