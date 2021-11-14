# be-ope-mesonrale

# Requirement

The task is to implement a simple clone of Stackoverflow. To limit
scope, there are 3 modules to be implemented:
```
1. Authentication
2. Questions (asking and replying)
3. Rating (upvoting/downvoting)
4. Subscription (A user can subscribe to a question and get a
notification when the question is answered)
```
***

## Database Setup
Create DB called "Korapay" on PhpMyAdmin or another Mysql management you have on your machine

## Project Set up
`git clone https://gitlab.com/korapay-assessment/be-ope-mesonrale.git`
`npm i`
`npm run dev`

Go to http://localhost:3000/api-docs to view docs

## Project Test
`npm run migrate`
`npm run seed:a`
`npm run dev`
 
 Go to swagger http://localhost:3000/api-docs/#/auth/post_auth_login    and login as email: user1@g.com password:123456

 copy the token and place in .env file variable TEST_TOKEN

 The token is valid for one hour

 `npm run test`

## Assumptions


## Requirement not Covered


## Issued Faced


## Improvement suggestions



## Acknowledgment
 ljlm0402 /typescript-express-starter .



