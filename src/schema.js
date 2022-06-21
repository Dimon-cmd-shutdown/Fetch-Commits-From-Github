const { buildSchema } = require('graphql')

//sha, message, html url, commiter info, date.

const schema = buildSchema(`

    type Commit {
        sha: String
        message: String
        html_url: String
        commiter_info:CommiterInfo
        date: String
    }

    type CommiterInfo {
        login: String
        id: ID
        node_id: String
        html_url: String
        repos_url: String
        type: String
    }

    type Query{
        getAllCommits: [Commit]
    }

`)

module.exports = schema