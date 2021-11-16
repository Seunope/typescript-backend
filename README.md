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
**Replies** Answer to questions
**Comment** Handle comments on questions and replies(answer)
**Subscriptions** Subscribe to question reply(answer)
**Notifications** Is activated when a user answer (reply) a question. Only subscriber gets message
**Ratings** Questions and Reply (answer) rating

## Database Setup
Create DB called "Korapay" on PhpMyAdmin or another Mysql management software you have on your machine

## Project Set up
`git clone https://gitlab.com/korapay-assessment/be-ope-mesonrale.git`

`npm i`

 In the root of the floder, convert the .env.sample to .env 

`npm run dev`

Go to http://localhost:3000/api-docs to view docs

## Project Test
`npm run migrate`

`npm run seed:a`

`npm run dev`

 
 Go to swagger http://localhost:3000/api-docs/#/auth/post_auth_login    and login with

  **email**: user1@g.com 
  **password**: 123456

  Copy the token from the reponsed body after login action is excuted on swagger.
  
  Paste the copied token  into .env file variable TEST_TOKEN

  The token is valid for one hour

 `npm run test`

## Assumptions
1. User has msql server install on computer
2. user runs Node 15.7 or latest 
3. Only autheticated user can create post, reply, rate and subscribe to question
4. Unautheticated user can perform Find all and Find by id opperation accross alll the REST apis
5. User can rate questions and answers 

## Requirement not Covered
None

## Issued Faced
None

## Improvement suggestions
None


## Acknowledgment
 ljlm0402 /typescript-express-starter .



