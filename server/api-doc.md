Done

- Client-Server model
- Min 3 API (min 1 API Key)
- github for colab

Not yet

- Rest API Doc

POST /register

Req.body

```json
{
  "email": "<email>",
  "password": "<password>"
}
```

success 201. pesan
respones....

POST /login

```json
{
  "email": "<email>",
  "password": "<password>"
}
```

POST /oauthLogin

```json
{
  "token": "<token>"
}
```

GET /news

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

- 3rd API on server (use Axios)
- Auth
- 3rd Party Login - Google OAuth
- Client-Side HTML-CSS-jQuery

Task

Server

- POST /register
- POST /login

---

- POST /oauthLogin
  - server
  - client

---

- GET /news
  - get data API NYTimes
  - get data API Guardian
  - get data API News
  - data prepare

---

- Error handler

Client

- Pages Login / Register
  - design
  - auth jQuery
  - logout

---

- Pages News
  - design
  - get news
  - search
  - infinite scroll

Rio

- Get news + query

Soraida

- API Doc
- Server login / register

Rangga
sisanya
