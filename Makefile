all: lib/RPCMock.js test/RPCMock-test.js

lib/RPCMock.js: lib/RPCMock.bs
	bailey -c lib

test/RPCMock-test.js: test/RPCMock-test.bs
	bailey -c test

test: lib/RPCMock.js test/RPCMock-test.js
	npm test

mocha: lib/RPCMock.js test/RPCMock-test.js
	node_modules/.bin/mocha

html-coverage:
	istanbul report html && open coverage/index.html


.PHONY: test html-coverage
