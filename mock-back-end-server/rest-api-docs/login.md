# Login

Used to collect a Token for a registered User.

**URL** : `/api/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
  "username": "[valid email address]",
  "password": "[password in plain text]"
}
```

**Data example**

```json
{
  "username": "valid.user@example.com",
  "password": "qwerty1234"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "token": "9w2sa2337a2df03h6l85b4775q324ewp80e7"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "error": "Unable to login with provided credentials."
}
```
