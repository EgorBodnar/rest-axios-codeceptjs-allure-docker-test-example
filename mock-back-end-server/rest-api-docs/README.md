# RESTAPI Docs

## Open Endpoints

Open endpoints require no Authentication.

* [Login](login.md) : `POST /api/login/`
* [Patrons](patrons.md) : `GET /api/patrons/`
* [Server Info](serverInfo.md) : `GET /api/serverInfo/`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Show user info](userInfo.md) : `GET /api/userInfo/`
