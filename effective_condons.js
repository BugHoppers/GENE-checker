dist1 = {
    "TTT": 0,
    "TTC": 0,
    "TTA": 0,
    "TTG": 0,
    "CTT": 0,
    "CTC": 0,
    "CTA": 0,
    "CTG": 0,
    "ATT": 0,
    "ATC": 0,
    "ATA": 0,
    "ATG": 0,
    "GTT": 0,
    "GTC": 0,
    "GTA": 0,
    "GTG": 0,
    "TCT": 0,
    "TCC": 0,
    "TCA": 0,
    "TCG": 0,
    "CCT": 0,
    "CCC": 0,
    "CCA": 0,
    "CCG": 0,
    "ACT": 0,
    "ACC": 0,
    "ACA": 0,
    "ACG": 0,
    "GCT": 0,
    "GCC": 0,
    "GCA": 0,
    "GCG": 0,
    "TAT": 0,
    "TAC": 0,
    "TAA": 0,
    "TAG": 0,
    "CAT": 0,
    "CAC": 0,
    "CAA": 0,
    "CAG": 0,
    "AAT": 0,
    "AAC": 0,
    "AAA": 0,
    "AAG": 0,
    "GAT": 0,
    "GAC": 0,
    "GAA": 0,
    "GAG": 0,
    "TGT": 0,
    "TGC": 0,
    "TGA": 0,
    "TGG": 0,
    "CGT": 0,
    "CGC": 0,
    "CGA": 0,
    "CGG": 0,
    "AGT": 0,
    "AGC": 0,
    "AGA": 0,
    "AGG": 0,
    "GGT": 0,
    "GGC": 0,
    "GGA": 0,
    "GGG": 0
}

dist2 = {
    "Ala": ['GCT', 'GCC', 'GCA', 'GCG'],
    "Cys": ['TGT', 'TGC'],
    "Asp": ['GAT', 'GAC'],
    "Glu": ['GAA', 'GAG'],
    "Phe": ['TTT', 'TTC'],
    'Gly': ['GGT', 'GGC', 'GGA', 'GGG'],
    'His': ['CAT', 'CAC'],
    'Ile': ['ATT', 'ATC', 'ATA'],
    'Lys': ['AAA', 'AAG'],
    'Leu': ['TTA', 'TTG', 'CTT', 'CTC', 'CTA', 'CTG'],
    'Met': ['ATG'],
    'Asn': ['AAT', 'AAC'],
    'Pro': ['CCT', 'CCC', 'CCA', 'CCG'],
    'Gln': ['CAA', 'CAG'],
    'Arg': ['AGA', 'AGG', 'CGT', 'CGC', 'CGA', 'CGG'],
    'Ser': ['AGT', 'AGC', 'TCT', 'TCC', 'TCA', 'TCG'],
    'Thr': ['ACT', 'ACC', 'ACA', 'ACG'],
    'Val': ['GTT', 'GTC', 'GTA', 'GTG'],
    'Trp': ['TGG'],
    'Tyr': ['TAT', 'TAC']
}

// console.log(dist2["Ala"]);
effective_no_of_codons = (gene_seq) => {
    let length;
    let fk = [];
    for (const key in dist1) {
        dist1[key] = 0;
    }
    if ((gene_seq.length % 3) != 0) {
        length = gene_seq.length - (gene_seq.length % 3);
    } else {
        length = gene_seq.length;
    }
    for (let i = 0; i < length; i += 3) {
        let codon = gene_seq[i] + gene_seq[i + 1] + gene_seq[i + 2];
        dist1[codon] += 1;
    }
    for (key in dist2) {
        let ni = [];
        let pi = [];
        for (const k of dist2[key]) {
            ni.push(dist1[k]);
        }
        // sum
        let n = ni.reduce(function (a, b) { return a + b; }, 0);
        if (n != 0) {
            for (let i = 0; i < ni.length; i++) {
                let pi_t = ni[i] / n;
                pi.push(pi_t * pi_t);
            }
        }
        let pi_sum = pi.reduce(function (a, b) { return a + b; }, 0);
        fk.push(pi_sum);
    }
    fk = fk.filter(function (val) {
        return val !== 0;
    });

    // rounding
    let x = 0;
    let len = fk.length
    while (x < len) {
        let t;
        t = 1/(Math.round(fk[x]*100)/100);
        fk[x] = Math.round(t*100)/100
        x++
    }
    // console.log(fk);
    let fk_sum = fk.reduce(function (a, b) { return a + b; }, 0);
    return fk_sum;
}

module.exports = {
    effective_no_of_codons
}