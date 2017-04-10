.PHONY: dev build clean
dev:
	npm run dev

build:
	make clean && npm run build

preview:
	npm run preview

gh-pahes:
	node build/gh-pages.js

clean:
	rm -rfv dist
