handleFileChosen = contents => {
    //   var reader = new FileReader();
         let details = []
    //   reader.onload = e => {
    //     let contents = reader.result;
        contents = contents.split(">");
        if (contents.length > 1) {
          for (let i = 1; i < contents.length; i++) {
            if (contents[i].includes("Reverse")) {
              let content = contents[i].split("Reverse");
              details.push({"meta": content[0], "gene": content[1]})
              //this.setState({ details: details});
            } else if (contents[i].includes("Forward")) {
              let content = contents[i].split("Forward");
              details.push({"meta": content[0], "gene": content[1]})
              //this.setState({ details: details});
            } else {
              alert("Not a fasta file");
            }
          }
        } else {
          alert("It is not a fasta file");
        }
        console.log(details[1])
      };
      //reader.readAsText(file);
    //};

module.exports = handleFileChosen