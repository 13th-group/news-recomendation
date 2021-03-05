# NEWS RECOMMENDATION APP
``News recommendation is an application to show worldwide news based on the categories``


> POST /register


Req.body:
```json
  {
    "email": "<email>",
    "password": "<password>"
  }
```

Response (200 - OK)
```json
  {
    "id": "<id>",
    "email": "<email>",
  }
```

Response (400 - Bad Request)
```json
  {
    "message": "<validation error message>"
  }
```

Response (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```

> POST /login

Req.body:
```json
  {
    "email": "<email>",
    "password": "<password>"
  }
```

Response (200 - OK)
```json
  {
    "access_token": "<access_token>"
  }
```

Response (400 - Bad Request)
```json
  {
    "message": "<validation error message>"
  }
```

Response (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```

> GET /news

Req.headers:
```json
  {
    "access_token": "<access_token>"
  }
```

Response (200 - OK)
```json
  [
    {
      "web_url": "<web_url>",
      "image_url": "<image_url>",
      "title": "<title>",
      "date": "<date>"
    },
    {
      "web_url": "<web_url>",
      "image_url": "<image_url>",
      "title": "<title>",
      "date": "<date>"
    }
  ]
```

Response (401 - Unauthorized)
```json
  {
    "message": "<Unauthorized Message>"
  }
```

Response (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```

> GET /Oauth

Req.body:
``` json
  {
    "token": "<access_token>"
  }
```

Response (200 - OK)
```json
  {
    "access_token": "<access_token>"
  }
```