get_protein_sequence = (gene_seq) => {
  let protein_seq = "";
  let gene = gene_seq.replace(/T/g, "U")
  let gene_arr = gene.match(/.{1,3}/g);
  // console.log(gene_arr)
  for (const gene of gene_arr) {
    if (gene[0] == 'U') {
      if (gene[1] == 'U') {
        if (gene[2] == 'U' || gene[2] == 'C') {
          protein_seq = protein_seq + "Phe";
        } else if (gene[2] == 'A' || gene[2] == 'G') {
          protein_seq = protein_seq + "Leu";
        }
      } else if (gene[1] == 'C') {
        if (gene[2] == 'U' || gene[2] == 'C' || gene[2] == 'A' || gene[2] == 'G') {
          protein_seq = protein_seq + "Leu";
        }
      } else if (gene[1] == 'A') {
        if (gene[2] == 'U' || gene[2] == 'C') {
          protein_seq = protein_seq + "Tyr";
        } else if (gene[2] == 'U' || gene[2] == 'C') {
          // protein_seq = protein_seq + "Leu";
          // stop
        }

      } else if (gene[1] == 'G') {
        if (gene[2] == 'U' || gene[2] == 'C') {
          protein_seq = protein_seq + "Cys";
        } else if (gene[2] == 'A') {
          // protein_seq = protein_seq + "Leu";
          // stop
        } else if (gene[2] == 'G') {
          protein_seq = protein_seq + "Trip";
        }
      }
    } else if (gene[0] == 'C') {
      if (gene[1] == 'U') {
        if (gene[2] == 'U' || gene[2] == 'C' || gene[2] == 'A' || gene[2] == 'G') {
          protein_seq = protein_seq + "Leu";
        }
      } else if (gene[1] == 'C') {
        if (gene[2] == 'U' || gene[2] == 'C' || gene[2] == 'A' || gene[2] == 'G') {
          protein_seq = protein_seq + "Pro";
        }
      } else if (gene[1] == 'A') {
        if (gene[2] == 'U' || gene[2] == 'C') {
          protein_seq = protein_seq + "His";
        } else if (gene[2] == 'A' || gene[2] == 'G') {
          protein_seq = protein_seq + "Gln";
        }
      } else if (gene[1] == 'G') {
        if (gene[2] == 'U' || gene[2] == 'C' || gene[2] == 'A' || gene[2] == 'G') {
          protein_seq = protein_seq + "Arg";
        }
      }
    } else if (gene[0] == 'A') {
      if (gene[1] == 'U') {
        if (gene[2] == 'U' || gene[2] == 'C' || gene[3] == 'A') {
          protein_seq = protein_seq + "lie";
          // console.log(protein_seq);
        } else if (gene[2] == 'G') {
          // protein_seq = protein_seq + "Leu";
          // stop
        }
      } else if (gene[1] == 'C') {
        if (gene[2] == 'U' || gene[2] == 'C' || gene[2] == 'A' || gene[2] == 'G') {
          protein_seq = protein_seq + "Thr";
        }

      } else if (gene[1] == 'A') {
        if (gene[2] == 'U' || gene[2] == 'C') {
          protein_seq = protein_seq + "Asp";
        } else if (gene[2] == 'A' || gene[2] == 'G') {
          protein_seq = protein_seq + "Lys";
        }
      } else if (gene[1] == 'G') {
        if (gene[2] == 'U' || gene[2] == 'C') {
          protein_seq = protein_seq + "Ser";
        } else if (gene[2] == 'U' || gene[2] == 'C') {
          protein_seq = protein_seq + "Arg";
          // stop
        }
      }
    } else if (gene[0] == 'G') {
      if (gene[1] == 'U') {
        if (gene[2] == 'U' || gene[2] == 'C' || gene[2] == 'A' || gene[2] == 'G') {
          protein_seq = protein_seq + "Val";
        }
      } else if (gene[1] == 'C') {
        if (gene[2] == 'U' || gene[2] == 'C' || gene[2] == 'A' || gene[2] == 'G') {
          protein_seq = protein_seq + "ALs";
        }
      } else if (gene[1] == 'A') {
        if (gene[2] == 'U' || gene[2] == 'C') {
          protein_seq = protein_seq + "Asp";
        } else if (gene[2] == 'U' || gene[2] == 'C') {
          protein_seq = protein_seq + "Glu";
          // stop
        }
      } else if (gene[1] == 'G') {
        if (gene[2] == 'U' || gene[2] == 'C' || gene[2] == 'A' || gene[2] == 'G') {
          protein_seq = protein_seq + "Gly";
        }

      }
    }
  }
  return protein_seq;
}

handleFileChosen = contents => {
  let details = [];
  contents = contents.split(">");
  console.log(contents.length);
  if (contents.length > 1) {
    for (let i = 1; i < contents.length; i++) {
      if (contents[i].includes("genome")) {
        split_term = "genome";
      } else if (contents[i].includes("Reverse")) {
        split_term = "Reverse";
      } else if (contents[i].includes("Forward")) {
        split_term = "Forward";
      } else {
        console.log("Not a fasta file");
      }
      let content = contents[i].split(split_term);
      if (content[1].match("[^ATGC]*")[0].length > 3) {
        console.log(content[1].match("[^ATGC]*")[0])
        console.log("Error in gene");
        return null;
      } else {
        content[1] = content[1].replace(new RegExp('\r?\n', 'g'), '');
        len = content[1].length;
        countA = (content[1].match(/A/g) || []).length;
        countT = (content[1].match(/T/g) || []).length;
        countG = (content[1].match(/G/g) || []).length;
        countC = (content[1].match(/C/g) || []).length;
        let protein_seq = get_protein_sequence(content[1]);
        // console.log(protein_seq);
        per = (countG + countC) * 100.0 / len;
        loc = (content[0].substring(content[0].indexOf(":") + 1)).split(" ")[0];
        if (loc[0] == 'c') {
          let temp = loc.split("-");
          loc = temp[1] + "-" + temp[0].slice(1);
        }
        if (loc.indexOf(",") == -1) {
          details.push({
            meta: content[0],
            Location: loc,
            gene: content[1],
            protein_seq: protein_seq,
            count_A: countA,
            count_T: countT,
            count_G: countG,
            count_C: countC,
            length: len,
            percentage_G_C: per
          });
        }
      }
    }
  } else {
    console.log("It is not a fasta file");
  }
  // console.log(details[1]);
  return details;
};

getDetails = data => {
  let gene_details = [];
  var lines = data.split(/\n/);
  for (let i = 3; i < lines.length; i++) {
    let x = lines[i].split(/\t/);
    gene_details.push({
      Location: x[0].replace("..", "-"),
      Strand: x[1],
      Length: x[2],
      PID: x[3],
      Gene: x[4],
      Synonym: x[5],
      Code: x[6],
      COG: x[7],
      Product: x[8]
    });
  }
  // console.log(gene_details[1]);
  return gene_details;
};

module.exports = {
  handleFileChosen,
  getDetails
};