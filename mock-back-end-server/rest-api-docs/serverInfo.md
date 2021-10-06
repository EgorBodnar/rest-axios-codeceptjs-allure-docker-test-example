# Show Current User

Get the details of the currently Authenticated User along with basic
subscription information.

**URL** : `/api/serverInfo`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "baseUrl": "http://localhost",
  "serverTitle": "Mocked back-end server",
  "version": "1.0.3",
  "buildInfo": "Mocked back-end based on MockServer(https://www.mock-server.com). Works in docker container."
}
```
