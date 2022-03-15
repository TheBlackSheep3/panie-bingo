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
    if (width > 5) {
        width = 5;
    }
    let string = '\\documentclass{article}\r\n';
    string += '\\usepackage[a4paper,margin=2cm]{geometry}\r\n';
    string += '\\usepackage{tikz}\r\n';
    string += '\\usetikzlibrary{calc}';
    string += `\\newcommand{\\Size}{${Math.floor(100/width)/100}\\textwidth}\r\n`;
    string += `\\def\\NumOfColumns{${width}}`;
    string += '\\def\\Sequence{';
    for (let i = 0; i < width; i++) {
        string += `${i+1}/${String.fromCharCode(i+65)}`;
        if (i < width - 1) {
            string += ', ';
        }
    }
    string += '}\r\n';
    string += '\\tikzset{Square/.style={\r\n';
    string += 'inner sep=0pt,\r\n';
    string += 'text width=\\Size,\r\n';
    string += 'minimum size=\\Size,\r\n';
    string += 'draw=black,\r\n';
    string += 'fill=white,\r\n';
    string += 'align=center\r\n';
    string += '}\r\n';
    string += '}\r\n';
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < width; j++) {
            let word = '';
            if (wordlist.length > 0) {
                let index = getRandomIndex(wordlist.length)
                word = wordlist.splice(index, 1)[0];
            }
            string += `\\newcommand{\\Node${String.fromCharCode(65+i,65+j)}}{\\large ${word}}\r\n`;
        }
    }
    string += '\\begin{document}\r\n';
    string += '\\begin{center}\r\n';
    string += '\\begin{tikzpicture}[draw=black, ultra thick, x=\\Size,y=\\Size]\r\n';
    string += '    \\foreach \\col/\\colLetter in \\Sequence {%\r\n';
    string += '        \\foreach \\row/\\rowLetter in \\Sequence{%\r\n';
    string += '            \\pgfmathtruncatemacro{\\value}{\\col+\\NumOfColumns*(\\row-1)}\r\n';
    string += '            \\def\\NodeText{\\expandafter\\csname Node\\rowLetter\\colLetter\\endcsname}\r\n';
    string += '            \\node [Square] at ($(\\col,-\\row)-(0.5,0.5)$) {\\NodeText};\r\n';
    string += '        }\r\n';
    string += '    }\r\n';
    string += '\\end{tikzpicture}\r\n';
    string += '\\end{center}\r\n';
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