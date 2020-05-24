# Roadetrix.com

## Getting Started
---------------
To get the server running locally:
- Clone this repo
- Run `npm install`
- Have a postgres database created locally on your system for this server
- Create a `.env` file in the root directory
- Add `DATABASE_URL=database-url-here` 
- Run `knex migrate:latest`
- Run `knex seed:run`
- After all of this setup, use `npm run server` to start up the server. If
you want to use a different port, and an env variable PORT=new-port. 

Note: Knex may need to be installed globally for migration and seeds to run. Also, nodemon may need to be installed globally on your system in order to use npm run server.

## Making Contributions
---------------
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

### Issue/Bug Request
If you are having an issue with the existing project code, please submit a bug report under the following guidelines:

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests
We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests
If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

**Pull Request Guidelines**
- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Ensure that your code conforms to our existing code conventions and **test** coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.