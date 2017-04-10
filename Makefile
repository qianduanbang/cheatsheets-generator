.PHONY: dev build clean
dev:
	npm run dev

build:
	make clean && npm run build

preview:
	npm run preview

gh-pages:
	node build/gh-pages.js

clean:
	rm -rfv dist
