install:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

test:
	npx jest

cover:
	npx jest --coverage
