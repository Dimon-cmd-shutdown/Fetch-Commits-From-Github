const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const octokitSet = require('./request')
const commitsFetch = require('./helpFunctions/commitsFetchFunc')
const dateParse = require('./helpFunctions/dateParseFunc')
const signUpUser = require('./helpFunctions/authUser')
const { helper } = require('./helpFunctions/isAuthUser')

const commitsStorage = []
const firstCommitsStorage = []
const JWTstorage = []
//sha, message, html url, commiter info, date.

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

const root = {

    signUpUser: ({ input }) => {
        signUpUser(input.username, input.password)

        return [{ status: 'Signed Up' }]
    },

    isAuthUser: ({ input }) => {
        helper(input.username, input.password, JWTstorage)
        const isAuthUser = (callback) => {
            setTimeout(() => {
                callback(JWTstorage)
            }, 20)
        }
        isAuthUser((JWTstorage) => {
            console.log(JWTstorage)
        })
    },

    fetchCommits: () => {
        if (JWTstorage.length === 0) {
            return [{ status: 'NoAuth' }]
        }
        octokitSet().then(({ data }) => {

            commitsFetch(data.items, commitsStorage)

        }).catch((error) => {
            throw new Error(error)
        })
        return [{ status: 'Fetched' }]

    },

    getAllCommits: () => {
        if (JWTstorage.length === 0) {
            return
        }
        return commitsStorage

    },

    getSeveralCommits: ({ first }) => {
        if (JWTstorage.length === 0) {
            return
        }
        firstCommitsStorage.length = 0
        for (let i = 0; i < first; i++) {
            firstCommitsStorage.push(commitsStorage[i])
        }
        return firstCommitsStorage
    },

    helloWorld: () => {
        return [{ message: 'Hello world' }]
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))


app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))

