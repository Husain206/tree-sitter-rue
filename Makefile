generate:
	tree-sitter generate --abi 14

parse: generate
	tree-sitter parse main.rei

cst: generate
	tree-sitter parse main.rei -c

highlight: generate
	tree-sitter highlight main.rei

install: generate
	helix -g build
	mkdir -vp ~/.config/helix/runtime/queries/rei
	cp -uv queries/* ~/.config/helix/runtime/queries/rei

pre-commit: generate
	npm install --entrypoint grammar.js >/dev/null 2>&1
	npm check grammar.js
	npm lint grammar.js
	npm fmt --ignore=src

dependencies:
	npm install --entrypoint grammar.js

ifndef VERBOSE
.SILENT:
endif

