bingo: generate.js phrases.txt
	$(RM) bingo.pdf
	node generate
	pdflatex bingo
	$(RM) bingo.aux bingo.log bingo.tex

clean:
	$(RM) *.aux *.log *.pdf *.tex