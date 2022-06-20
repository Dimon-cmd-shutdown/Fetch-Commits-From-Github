const { buildSchema } = require('graphql')

//sha, message, html url, commiter info, date.

const schema = buildSchema(`

    type Request {
        id: ID
        sha: String
        message: String
        html_url: String
        commiter_info:[Info]
        date: String
    }

    type Info {
        login: String
        id: ID
    }


`)

module.exports = schema