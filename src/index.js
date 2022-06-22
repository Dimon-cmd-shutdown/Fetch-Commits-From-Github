const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const octokitSet = require('./request')
const commitsFetch = require('./helpFunctions/commitsFetchFunc')
const dateParse = require('./helpFunctions/dateParseFunc')

const commitsStorage = []
const firstCommitsStorage = []
//sha, message, html url, commiter info, date.

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

const root = {

    fetchCommits: () => {
        octokitSet().then(({ data }) => {

            commitsFetch(data.items, commitsStorage)

        }).catch((error) => {
            throw new Error(error)
        })
        return [{ status: 'Fetched' }]
    },

    getAllCommits: () => {
        return commitsStorage
    },

    getSeveralCommits: ({ first }) => {
        firstCommitsStorage.length = 0
        for (let i = 0; i < first; i++) {
            firstCommitsStorage.push(commitsStorage[i])
        }
        return firstCommitsStorage
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))





app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))

