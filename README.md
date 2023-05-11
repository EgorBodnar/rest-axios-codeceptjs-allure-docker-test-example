# 🛠️ API testing framework rest-axios-codeceptjs-allure-docker-test-example

**The Automation Quality Assurance Framework is designed to streamline and improve the testing process
for both backend and frontend applications. This innovative solution relies on a mock-back-end-server
based on Moc-server for REST API testing, complete with detailed documentation. The framework allows
for the efficient reuse of helpers and the extension of preconditions for tests. It also enforces
a strict coding style policy and automatically triggers unit tests for key functionalities on
a pre-push hook. Prepared for containerization with Docker, the framework is accompanied by 
a preconfigured mock-back-end-server with stabs.**

## Table of Contents
- [Architecture](#architecture)
- [Required presets](#presets)
- [Mocked backend REST API](#mocked-backed)
- [How to run tests](#how-to-run)
- [Project Structure](#project-structure)
- [Demo how it works](#demo)

<a name="architecture"></a>
```
 ----------------------------------------------------------
|                       Framework Architecture             |
|-------------------|------------|-------------|-----------|
| REST API Testing  | Execution  | Assertion   | Reporting |
|-------------------|------------|-------------|-----------|
|                   |            |             |           |
| Axios             | Codeceptjs | Jest Expect | Allure    |
|                   |            |             |           |
 ----------------------------------------------------------
```
```
 ------------------------------------------------------------------------------
|                              Code Control                                    |
|-----------------------------------------------|-----------------|------------|
| Linter | Code formatting / Code style control | Pre-commit hook | Unit tests |
|--------|--------------------------------------|-----------------|------------|
| Eslint | Prettier & Eslint                    |     Husky       | Jest       |
 ------------------------------------------------------------------------------
```

<a name="presets"></a>
## 🧰 Required presets
* Docker
* Node.js
* JDK or JRE 8+ (For Allure reports only)

<a name="mocked-backed"></a>
## 📜 [Mocked backend REST API documentation](mock-back-end-server/rest-api-docs/README.md)

**to start mocked backend server**
```npm run docker:mock-server:start```

**The Mocked Backend Server** will start on the port `38391`
Open http://localhost:38391 to check if it works. Should see message: "`The Mock Backend server is working properly`"

<a name="how-to-run"></a>
## ▶️ How to run tests

**to run tests locally**
```npm run test-local```

**to open Allure report after test run**
```npm run allure:open```

**to run tests in Docker container**
```npm run test-in-docker```



<a name="project-structure"></a>
## Project Structure

```
.
├── Dockerfile               -- Defines the Docker image for the main framework
├── README.md                -- Provides an overview and instructions for the framework
├── models                   -- Defines data models used to generate test data by builders for the tests
│   ├── ...
├── services                 -- Contains the wrapped application's endpoints to use as bricks in tests
│   ├── ...
├── test                     -- Stores functional tests
│   └── ...
├── unit-test                -- Stores unit tests for the framework
│   ├── ...    
├── mock-back-end-server     -- Contains the mock server and related files
│   ├── Dockerfile -         -- Defines the Docker image for the mock server
│   ├── default-mocks        -- Stores default mock data for the server
│   │   ├── alive.json       -- Contains mock data for the server's health check
│   ├── mergeDefaultMocks.js -- Script to merge default mock data
│   └── rest-api-docs        -- Contains documentation for the REST API
│       ├── README.md        -- Overview of the REST API documentation
│       ├── login.md         -- Detailed documentation for the login endpoint
│       ...
└── utils -                  -- Contains utilities and helpers for tests
    └── HttpService.ts       -- Provides HTTP request functionality. Wrapped and extended to store all request/response data in the test report.
...

```

<a name="demo"></a>
## 🎥 Demo how it works
![ Tests in work](doc/gif/testsInWork.gif)
