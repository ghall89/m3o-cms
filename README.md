# m3o-cms

## About

A simple experimental CLI app built with Node.js, and powered by [m3o.com](https://m3o.com).

The goal of the project is to create a tool to manage my portfolio at [ghall.dev](https://ghall.dev) more easily without having to modify and redeploy my entire site every time.

This code is provided for modification and use in your own personal projects.

## Installation

1. Run `yarn` or `npm i` from the project directory.
2. Obtain an API key from [m3o.com](https://m3o.com) by signing up or logging in to an account.
3. Create a file in the project directory called '.env', and paste `API_KEY="[YOUR API KEY]"` into the file (replace `[YOUR API KEY]` with the API key you obtained in the previous step).
4. Run `node index.js` and follow the prompts.

## Dependencies

- [inquirer](https://yarnpkg.com/package/inquirer)
- [dotenv](https://yarnpkg.com/package/dotenv)
- [m3o](https://yarnpkg.com/package/m3o)
