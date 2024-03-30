install:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

test:
	npx jest --watchAll

cover:
	npx jest --coverage
