const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const octokitSet = require('./request')

const commits = []

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))














app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))

