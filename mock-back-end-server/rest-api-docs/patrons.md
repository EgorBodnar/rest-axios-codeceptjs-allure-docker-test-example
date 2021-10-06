# Show Current User

Get the details of the currently Authenticated User along with basic
subscription information.

**URL** : `/api/patrons`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "patrons": [
    {
      "id": 123,
      "topRatingPlace": 3,
      "nickname": "Bezons3000",
      "donationAmount": 123987
    },
    {
      "id": 132,
      "topRatingPlace": 1,
      "nickname": "BlueWolf",
      "donationAmount": 323984
    }
  ]
}
```
