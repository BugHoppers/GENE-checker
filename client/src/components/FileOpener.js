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

  handleFileChosen =async  (file) => {
    var reader = new FileReader();
    let contents;
    reader.onload = e => {
      contents = reader.result;
      axios.post("/upload",{
        "files": contents
      });
    }
    reader.readAsText(file);
  };
  
  // handleFileChosen = file => {
  //   var reader = new FileReader();
  //   let details = []
  //   reader.onload = e => {
  //     let contents = reader.result;
  //     contents = contents.split(">");
  //     if (contents.length > 1) {
  //       for (let i = 1; i < contents.length; i++) {
  //         if (contents[i].includes("Reverse")) {
  //           let content = contents[i].split("Reverse");
  //           details.push({"meta": content[0], "gene": content[1]})
  //           this.setState({ details: details});
  //         } else if (contents[i].includes("Forward")) {
  //           let content = contents[i].split("Forward");
  //           details.push({"meta": content[0], "gene": content[1]})
  //           this.setState({ details: details});
  //         } else {
  //           alert("Not a fasta file");
  //         }
  //       }
  //     } else {
  //       alert("It is not a fasta file");
  //     }
  //   };
  //   reader.readAsText(file);
  // };

  getGenes = () => {
    return (
      <div>
        {this.state.details.map((detail,i) => <DisplayGene key={i} meta={detail["meta"]} gene={detail["gene"]}/>)}
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
