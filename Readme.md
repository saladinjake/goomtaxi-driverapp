##Requirements
- MONGO_DB
- Nodejs

##How to Use

- download or clone
- ensure to have yarn,   npm installed globally
- cd in to root folder
- run: yarn install
- open a terminal to start the mongodb server
- open 2 terminals
- on one run the front end  : npm run start:dev
- on the other run the backend yarn start-back or npm run start-back


# admin
- admin: juwavictor@gmail.com password: password123

#user
- user: codyqwerty@gmail.com password: password123




### Screen shot
![alt text](https://github.com/saladinjake/carbooking-withpaystack-wallet-option/blob/app-complete-state/public/images/dashboard.PNG?raw=true)

![alt text](https://github.com/saladinjake/carbooking-withpaystack-wallet-option/blob/app-complete-state/public/images/login.PNG?raw=true)

![alt text](https://github.com/saladinjake/carbooking-withpaystack-wallet-option/blob/app-complete-state/public/images/profile.PNG?raw=true)


# for more scripts look through the package.json files
```
"scripts": {
  "start:gulp:devmode": "gulp watch",
  "webpack-vanilla": "webpack -p --config=./automation/webpack_workflow/webpack-for-vanillajs/webpack.config.prod.js",
  "start:webpack-vanilla:devmode": "webpack-dev-server --config ./automation/webpack_workflow/webpack-for-vanillajs/webpack.config.dev.js --port 4001 --open --hot",
  "build:webpack-vanilla:production": "webpack --config ./automation/webpack_workflow/webpack-for-vanillajs/webpack.config.prod.js",
  "babel-node": "babel-node --presets=@babel/preset-env",
  "test-karmarize": "export NODE_ENV=test  || set NODE_ENV=test  && node ./node_modules/karma/bin/karma start --single-run --browsers PhantomJS",
  "test:headless": "karma start ./karma.conf.js --browsers PhantomJS",
  "test:chrome": "karma start ./config/karma.conf.js --browsers Chrome",
  "karma-coverage": "cat coverage/lcov.info | codecov",
  "test-vanillafront": "mocha  --timeout 150000 --compilers js:@babel/register --require UI/tests/jsdomTests/test_helpers.js UI/tests/jsdomTests/test.js  --exit --reporter spec",
  "test-vanillafront-watch": "npm run test -- --watch",
  "startzx": "npm run launch-it",
  "start": "export NODE_ENV=DEVELOPMENT || set NODE_ENV=DEVELOPMENT && nodemon --exec babel-node  server/dynamic_server/server.js",
  "start-old": "export NODE_ENV=DEVELOPMENT || set NODE_ENV=DEVELOPMENT && nodemon --exec babel-node -- server/dynamic_server/server.js",
  "build": "npm run builda",
  "coveralls": "nyc npm test && nyc report --reporter=text-lcov | coveralls",
  "coverage": "nyc reports --reporter=text-lcov | coveralls",
  "mocha": "mocha --require @babel/register",
  "test": "for i in $(ls tests/); do babel-node \"./tests/${i}\" | faucet ; done",
  "pretest": "npm run dbrun-migrations-mongoose",
  "migration-mongoose-seed": " npm run babel-node -- server/dynamic_server/mongo_api/migrations/migrations.js",
  "dbrun-migrations-mongoose": "npm run migration-mongoose-seed",
  "heroku-postbuild": "npm run builda",
  "lint": "eslint source/ --quiet",
  "lint:write": "eslint --debug . --fix",
  "prettier": "prettier --write UI/**/*.js",
  "start-react": "node server_react.js",
  "webpack": "webpack --config ./webpack.config.prod.js",
  "webpack-admin": "webpack --config ./webpack.config.prodadmin.js",
  "start:dev": "webpack-dev-server --config ./webpack.config.dev.js --open --hot --port 4001",

  "start:dev-user": "webpack-dev-server --config ./webpack.config.dev-admin.js --open --hot --port 5000",
  "build-react": "webpack -p --config ./webpack.config.prod.js",
  "start-react-prod": "npm run build-react  && node server_react.js",
  "clean-react": "del-cli  dist-reactive ",
  "launch-it": "export NODE_ENV=DEVELOPMENT || set NODE_ENV=DEVELOPMENT  && node  ./buildfolder/dynamic_server/server.js",
  "clean": "del-cli  buildfolder/**/*.js ",
  "clean-front": "del-cli  dist-reactive/*",
  "clean-front-admin": "del-cli  dist-reactive-admin/*",
  "build-css": "node-sass scss/app.scss public/css/app.css",
  "build-server": "babel -d ./buildfolder ./server -s",
  "builda": "npm run clean && npm run build-server  && webpack -p --config ./webpackuploadtoserver.config.js",
  "starte": "npm run launch-it",
  "debug": "node --debug ./build/index.js",
  "validate": "npm run lint; npm run test && npm outdated --depth 0",
  "migration-mongoose-seed-deploy": " node ./buildfolder/dynamic_server/mongo_api/migrations/migrations.js",
  "dbrun-migrations-mongoose-deploy": "npm run migration-mongoose-seed-deploy",
  "up": "webpack -p --config ./webpackuploadtoserver.config.js",
  "build-front": "npm run clean-front && npm run webpack",
  "build-admin": "npm run clean-front-admin && npm run webpack-admin",
  "start-front": "export NODE_ENV=DEVELOPMENT || set NODE_ENV=DEVELOPMENT &&  node server_react.js",
  "start-front-user": "export NODE_ENV=DEVELOPMENT || set NODE_ENV=DEVELOPMENT &&  node server_react_admin.js",
  "start-back": "npm run launch-it-back",
  "launch-it-back": "export NODE_ENV=DEVELOPMENT || set NODE_ENV=DEVELOPMENT  && npm run dbrun-migrations-mongoose-deploy-back && node  ./buildfolder/dynamic_server/server.js",
  "migration-mongoose-seed-deploy-back": " node ./buildfolder/dynamic_server/mongo_api/migrations/migrations.js",
  "dbrun-migrations-mongoose-deploy-back": "npm run migration-mongoose-seed-deploy-back",
  "build-server-back": "babel -d ./buildfolder ./server -s",
  "builda-back": "npm run clean && npm run build-server-back && npm run up",
  "production-deploy-index": "scp -r ./dist-reactive/index.html root@167.71.131.172:/var/www/commute-app/html",
  "production-deploy-bundle": "scp -r ./dist-reactive/bundlex.js root@167.71.131.172:/var/www/commute-app/html",
  "production-deploy-front": "scp -r ./dist-reactive/* root@167.71.131.172:/var/www/commute-app/html",
  "production-deploy-front-admin": "scp -r ./dist-reactive-admin/* root@167.71.131.172:/var/www/commute-admin/html",
  "production-deploy-index-admin": "scp -r ./dist-reactive-admin/index.html root@167.71.131.172:/var/www/commute-admin/html",
  "production-deploy-bundle-admin": "scp -r ./dist-reactive-admin/bundlex.js root@167.71.131.172:/var/www/commute-admin/html",
  "production-build-front": "npm run build-front && node server_react.js",
  "production-deploy-back": "scp -r ./buildfolder/* root@167.71.131.172:~/digitalhost/buildfolder",


  "production-deploy-front-two": "scp -r ./dist-reactive/* root@178.62.28.107:~/www/commute-app/html",


  "move-bundle-js2-admin": "scp -r ./dist-reactive/bundlex.js root@178.62.28.107:~/www/commute-admin/html",
  "move-index2-admin": "scp -r ./dist-reactive/index.html root@178.62.28.107:~/www/commute-admin/html",

  "move-bundle-js2-user": "scp -r ./dist-reactive/bundlex.js root@178.62.28.107:~/www/commute-app/html",
  "move-index2-user": "scp -r ./dist-reactive/index.html root@178.62.28.107:~/www/commute-app/html",


  "move-bundle-js2-useradmin-nginx": "scp -r ./dist-reactive/bundlex.js root@178.62.28.107:/var/www/useradminapp.com/html/html",
  "move-index2-useradmin-nginx": "scp -r ./dist-reactive/index.html root@178.62.28.107:/var/www/useradminapp.com/html/html",


  "production-deploy-back2": "scp -r ./buildfolder/* root@178.62.28.107:~/digitalhost/buildfolder"








},



```
