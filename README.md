# Github Repo

This project allows user to search for a repository on github and returns the first 100 repos sorted by number of Stargazers. When you expand the commits section you can browse the top 5 commits.

You can either search for your organization or go to /:organizationName to get details about your org.

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install all the dependencies to start the app.

### `REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN=$YOUR_TOKEN yarn start`

For eg, REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN=abc yarn start

1. To generate a personal access token follow the following steps. Make sure you check `repo` and `read:org` permissions when generating a token :
https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token 



Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
Press a to run all tests
