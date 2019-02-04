import React, { Component } from "react";

const ImportFromFileBodyComponent = () => {
  let fileReader;

  const handleFileRead = e => {
    let content = fileReader.result;
    content = content.split(">");
    console.log();
    if(content.length > 1 ){
      for(let i =1 ;i < content.length; i++){
        if(content[i].includes("Reverse")){
          console.log("REV")
        }else if(content[i].includes("Forward")){
          console.log("FOWD")
        }else{
          alert("Not a fasta file")
        }
      }
    }else{
      alert("It is not a fasta file");
    }
  };

  const handleFileChosen = file => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className="upload-expense">
      <input
        type="file"
        id="file"
        className="input-file"
        accept=".txt,.fasta"
        onChange={e => handleFileChosen(e.target.files[0])}
      />
    </div>
  );
};

export class FileOpener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ""
    };
  }
  onChange = e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
  };
  render() {
    return (
      <div>
        <div onSubmit={this.onFormSubmit}>
          <p>Open A faster File</p>
          <ImportFromFileBodyComponent />
        </div>
      </div>
    );
  }
}

export default FileOpener;
