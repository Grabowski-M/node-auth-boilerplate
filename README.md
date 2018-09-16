## node-auth-boilerplate
Node application with basic authentication, and email account confirmation.

### Technologies used
- <a href="https://nodejs.org/en/">Node.js</a>
- <a href="https://www.mongodb.com/">MongoDB</a>
- <a href="https://mongoosejs.com/">Mongoose</a>
- <a href="https://eslint.org/">Eslint</a>


### Installation & configuration
1. Clone the repo, install depedencies with `npm install`
2. Copy the `.env_example` to `.env` file and set proper fields

### Routes

#### Sign up

```
URL: /auth/sign-up
method: POST
success: 
(200) returns JWT token, nodemailer is run to send email with confirmation link to given email
failure: 
(500) 'Could not add new user to the database'
(409) 'User with this email already exists'
```

#### Login

```
URL: /auth/login
method: POST
success: 
(200) returns JWT token
failure: 
(500) 'Server error'
(401) 'Invalid credentials'
(403) 'User not confirmed'
(404) 'User not found'
```

#### Confirm
```
URL: /auth/confirm/:token
method: GET
success: (200)
failure: 
(500) 'There was a problem with updating user confirmation'
(401) 'Failed to authenticate the token'
```
