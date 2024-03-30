install:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

test:
	npx jest --watch

test-coverage:
	npx jest --coverage
