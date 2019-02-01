import React, { Component } from "react";

const ImportFromFileBodyComponent = () => {
  let fileReader;

  const handleFileRead = e => {
    const content = fileReader.result;
    console.log(content);
    // … do something with the 'content' …
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
        accept=".txt,.csv"
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
