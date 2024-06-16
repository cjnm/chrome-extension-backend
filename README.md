# chrome-extension-backend
Refer to the url for full reference to get started: https://docs.google.com/document/d/1lPFYRsUo63pdXKyMVWnuTjfnLGnZcl9Vc9TuF5bSecY/edit?usp=sharing
Chrome Extension URL: https://github.com/cjnm/chrome-extension

## Demo Site
https://chrome-extension-backend-phi.vercel.app/

## Introduction

This is a NextJS app which uses MongoDB as storage and Github for auth. After logging in to the backend, the user can get a token which contains server url and auth token, that can be added to the chrome extension and the extension is ready to grab products from daraz.com.np. Users can view and delete the product imformation from the backend.

The features of the APi are:

- Logged in user can view and delete products.
- User can get auth token for the chrome extension.
- User can navigate to product and seller site.

##### Other Features

- Github Auth
- Uses MongoDB
- Vercel deployment ready

## Setup

### Prerequisite

- NodeJS (latest LTS version)
- MongoDB
###### OR
- Vercel
- Free MongoDB Atlas Account

### Local Install

- Install dependency for frontend and backend

```
yarn
```

- Setup environment variable

```
cp .env.example .env
```

Update the environment variables with necessary parameters. For `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` get a new token and secret from <https://github.com/settings/developers>.


- Starting the backend

```
yarn start
```

## Implementation

### Endpoints

There are product endpoints available for fetching, updating and deleting products and two for internal github authentication.

### Status Codes

simpleblog API returns the following status codes.

| Status Code |         Description          |
| :---------- | :--------------------------: |
| 200         |             `OK`             |
| 401         | `BAD REQUEST` `Unauthorized` |
| 500         |   `Internal Server Error`    |

#### Success Response Example

```
{
    status: 200,
    data: [] //where applicable
}
```

#### Failure Response Example

```
{
    status: 401,
    message: ''
}
```

### Authentication

Github Auth has been used for user signup and user creation and JWT Auth has been used for API calls.

#### Auth header for API calls

```
{
    Authorization: JWT_token,
}
```

###### JWT token and user details can be found on browser local storage for loggedin user using `localStorage.getItem('chrome-extension-user')` comand on browser console.
