effective_no_of_codons = (amino_str) => {
    amino_str = amino_str.replace("STOP","");
    let amino_arr = amino_str.match(/.{1,1}/g);
    let ni_arr = {};

    for (let i = 0; i < amino_arr.length; i++) {
        let acid = amino_arr[i];
        ni_arr[acid] = ni_arr[acid] ? ni_arr[acid] + 1 : 1;
    }
    // Equation 1 
    let n = 0;
    for(const acid in ni_arr){
        n = n + ni_arr[acid];
    }
    // console.log("n",n);
    let faa = 0;
    for(const acid in ni_arr){
        let count = ni_arr[acid];
        let pi = count/n;
        // console.log(pi);
        faa = faa + (pi * pi);
    }

    // Equation 2
    let ncaa = 1 / faa;

    console.log(ncaa);
}

// Replace c with any amino acid string;
c = `MKQHKAMIVALIVICITAVVAALVTRKDLCEVHIRTGQTEVAVFTAYESESTOP`;
effective_no_of_codons(c);

