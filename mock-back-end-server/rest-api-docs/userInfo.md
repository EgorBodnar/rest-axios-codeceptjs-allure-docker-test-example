# Show Current User

Get the details of the currently Authenticated User.

**URL** : `/api/userInfo/`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "id": 1234,
    "first_name": "User",
    "last_name": "Valid",
    "email": "valid.user@example.com"
}
```
## Error Response

**Condition** : If the authorization token is wrong.

**Code** : `401 Unauthorized`

**Content** :

```json
{ 
  "error": "Not valid authorization token"
}
```
