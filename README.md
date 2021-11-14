# be-ope-mesonrale



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://gitlab.com/-/experiment/new_project_readme_content:53fffc5bb2bb1a352c809ad2458aaae8?https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://gitlab.com/-/experiment/new_project_readme_content:53fffc5bb2bb1a352c809ad2458aaae8?https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://gitlab.com/-/experiment/new_project_readme_content:53fffc5bb2bb1a352c809ad2458aaae8?https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/korapay-assessment/be-ope-mesonrale.git
git branch -M main
git push -uf origin main
```

***

# Requirement

The task is to implement a simple clone of Stackoverflow. To limit
scope, there are 3 modules to be implemented:
1. Authentication
2. Questions (asking and replying)
3. Rating (upvoting/downvoting)
4. Subscription (A user can subscribe to a question and get a
notification when the question is answered)

## Database Setup
Create DB called "Korapay" on PhpMyAdmin or another Mysql management you have on your machine

## Project Set up
git clone https://gitlab.com/korapay-assessment/be-ope-mesonrale.git
npm i
npm run dev

Go to http://localhost:3000/api-docs to view docs

## Project Test
npm run migrate
npm run seed:a
npm run dev
 Go to swagger http://localhost:3000/api-docs/#/auth/post_auth_login    and login as email: user1@g.com password:123456

 copy the token and place in .env file variable TEST_TOKEN

 The token is valid for one hour

 npm run test

## Assumptions
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Requirement not Covered
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Issued Faced
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Improvement suggestions
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.


## Acknowledgment
 ljlm0402 /typescript-express-starter .



