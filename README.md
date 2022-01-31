# API testing framework rest-ts-test-axios-codeceptjs-allure-solution-example


```
 ----------------------------------------------------------
|                       Architecture                       |
|-------------------|------------|-------------|-----------|
| REST API Testing  | Execution  | Assertion   | Reporting |
|-------------------|------------|-------------|-----------|
|                   |            |             |           |
| Axios             | Codeceptjs | Jest Expect | Allure    |
|                   |            |             |           |
 ----------------------------------------------------------

 --------------------------------------------------------------------------
|                              Code Control                                |
|-----------------------------------------------|-------------|------------|
| Linter | Code formatting / Code style control | Commit hook | Unit tests |
|--------|--------------------------------------|-------------|------------|
| Eslint | Prettier & Eslint                    | Husky       | Jest       |
 --------------------------------------------------------------------------

```

## Required presets
* Docker
* Node.js
* JDK or JRE 8+ (For Allure reports only)

## How to run

**to start mocked backend server**
```npm run docker:mock-server:start```

The Mocked Backend Server will start on the port `38391`
Open http://localhost:38391 to check if it works. Should see message: "The Mock Backend server is working properly"


**to run tests locally**
```npm run test-local```

**to open Allure report after test run**
```npm allure:open```

**to run tests in Docker container**
```npm run test-in-docker```
