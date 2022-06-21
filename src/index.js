const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const octokitSet = require('./request')

//sha, message, html url, commiter info, date.

const commits = []

const dateParse = (dateToParse) => {
    const dateArr = dateToParse.split('T')
    const date = dateArr[0] + ', ' + dateArr[1].split('.')[0]
    return date
}

octokitSet().then(({ data }) => {

    const date = dateParse(data.items[0].commit.committer.date)

    for (let count = 0; count < 5; count++) {
        const commitInfoObject = {
            sha: data.items[count].sha,
            message: data.items[count].commit.message,
            html_url: data.items[count].html_url,
            commiter_info: {
                login: data.items[count].committer.login,
                id: data.items[count].committer.id,
                node_id: data.items[count].committer.node_id,
                html_url: data.items[count].committer.html_url,
                repos_url: data.items[count].committer.repos_url,
                type: data.items[count].committer.type
            },
            date
        }

        commits.push(commitInfoObject)
    }

}).catch((error) => {
    throw new Error(error)
})



const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())


const root = {
    getAllCommits: () => {
        return commits
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))





app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))

