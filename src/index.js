const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const octokitSet = require('./request')
const commitsFetch = require('./helpFunctions/commitsFetchFunc')
const dateParse = require('./helpFunctions/dateParseFunc')

const commitsStorage = []
//sha, message, html url, commiter info, date.


octokitSet().then(({ data }) => {

    commitsFetch(data.items, commitsStorage)

}).catch((error) => {
    throw new Error(error)
})



const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())


const root = {

    getAllCommits: () => {
        return commitsStorage
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))





app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))

