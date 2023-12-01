const { createOAuthAppAuth} = require("@octokit/auth-oauth-app");
const { Octokit } = require("@octokit/core");

const appOctokit = new Octokit({
    authStrategy: createOAuthAppAuth,
    auth: {
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
    }
});

module.exports = appOctokit;