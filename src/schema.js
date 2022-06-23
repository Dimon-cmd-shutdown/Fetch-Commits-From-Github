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

    type UserStatus{
        status: String
    }

    type UserAuthStatus{
        status: String
    }

    type FetchStatus{
        status: String
    }

    type CommiterInfo {
        login: String
        id: ID
        node_id: String
        html_url: String
        repos_url: String
        type: String
    }

    type hello{
        message: String
    }

    input SignUp{
        username: String!
        password: String!
    }

    input Auth{
        username: String!
        password: String!
    }

    type Query{
        signUpUser(input: SignUp): [UserStatus] 
        isAuthUser(input: Auth): [UserAuthStatus]
        fetchCommits: [FetchStatus]
        getAllCommits: [Commit]
        getSeveralCommits(first:Int!): [Commit]
        helloWorld: [hello]
    }

`)

module.exports = schema