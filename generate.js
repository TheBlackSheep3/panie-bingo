const WORDLIST_FILE = 'phrases.txt';
const OUTPUT_TEX = 'bingo.tex';

function splitStringToWordlist (string) {
    return string.split('\r\n');
}

function getRandomIndex (length) {
    return Math.floor(Math.random() * length);
}

function generateLatexString (wordlist) {
    let width = Math.ceil(Math.sqrt(wordlist.length));
    let string = '\\documentclass{article}\r\n';
    string += '\\usepackage{geometry}\r\n';
    string += '\\usepackage{tabularx}\r\n';
    string += '\\geometry{\r\n';
    string += 'a4paper,\r\n';
    string += 'margin=3cm\r\n';
    string += '}\r\n';
    string += '\\renewcommand{\\tabularxcolumn}[1]{>{\\normalsize}m{#1}}\r\n';
    string += '\\renewcommand{\\arraystretch}{2}\r\n';
    string += '\\newcolumntype{n}{>{\\centering\\arraybackslash}X}\r\n';
    string += '\\newcolumntype{n}{>{\\centering\\arraybackslash}X}\r\n';
    string += '\\pagestyle{empty}\r\n';
    string += '\\begin{document}\r\n';
    string += '\\begin{tabularx}{\\textwidth}{|';
    for (let i = 0; i < width; i++) {
        string += 'n|';
    }
    string += '}\r\n';
    string += '\\hline\r\n';
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < width; j++) {
            if (wordlist.length > 0) {
                let index = getRandomIndex(wordlist.length)
                string += wordlist.splice(index, 1)[0];
            }

            if (j < width - 1) {
                string += ' & '
            } else {
                string += '\\\\\r\n';
            }
        }
        string += '\\hline\r\n';
    }
    string += '\\end{tabularx}\r\n';
    string += '\\end{document}\r\n';

    return string;
}

fs = require('fs');

fs.readFile(WORDLIST_FILE, 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    
    wordlist = splitStringToWordlist(data);
    
    
    fs.writeFile(OUTPUT_TEX, generateLatexString(wordlist), (err, data) => {
        if (err) {
            return console.log(err);
        }
    });
});