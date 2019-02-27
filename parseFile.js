handleFileChosen = contents => {
  let details = []
  contents = contents.split(">");
  if (contents.length > 1) {
    for (let i = 1; i < contents.length; i++) {
      if (contents[i].includes("Reverse")) {
        split_term = "Reverse";
      } else if (contents[i].includes("Forward")) {
        split_term = "Forward"
      }
      else {
        alert("Not a fasta file");
      }
      let content = contents[i].split(split_term);
      details.push({ "meta": content[0], "gene": content[1] })
    }
  } else {
    alert("It is not a fasta file");
  }
  console.log(details[1]);
  return details;
};


module.exports = handleFileChosen