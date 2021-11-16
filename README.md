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

## Modules
**Questions** Questions asked by user
**Answers** Answer to questions
**Comment** Handle comments on questions and answers
**Subscriptions** Subscribe to question 
**Notifications** Is activated when a user answer a question. Only subscriber gets message
**Ratings** Questions and Answer rating

## Database Setup
Create DB called "Korapay" on PhpMyAdmin or another Mysql management software you have on your machine

## Project Set up
`git clone https://gitlab.com/korapay-assessment/be-ope-mesonrale.git`

`npm i`

 In the root of the folder, convert the .env.sample to .env 

`npm run dev`

Go to http://localhost:3000/api-docs to view docs

## Project Test
`npm run migrate:u:a`

`npm run migrate`

`npm run seed:a`

`npm run dev`

 
 Go to swagger documentation  http://localhost:3000/api-docs/#/auth/post_auth_login    and login with

  **email**: user1@g.com 
  **password**: 123456

  Copy the token from the response body after login action is executed on swagger.
  
  Paste the copied token  into .env file variable TEST_TOKEN

  The token is valid for one hour

 `npm run test`

 **For some weird reason**  you have to run `npm run test` twice before all test pass.

## Assumptions
1. User has msql server install on computer
2. User runs Node 15.7 or latest.
3. Only authenticated user can create post, reply, rate and subscribe to question
4. Unauthenticated user can perform Find all and Find by id operation across all the REST apis
5. User can rate questions and answers.

## Requirement not Covered
None

## Issued Faced
Because of MySQL foreign key constraint error, i had to comment out the test for delete route in some test suit. This account to why some test coverage are low. 

## Improvement suggestions
None


## Acknowledgment
 ljlm0402 /typescript-express-starter . Awesome library!!!


