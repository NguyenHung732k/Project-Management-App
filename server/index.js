const express = require('express')
require('dotenv').config()
const colors = require('colors')

const cors = require('cors')

// const { graphqlHTTP } = require('graphql-http')
const { ruruHTML } = require("ruru/server")
const { createHandler } = require("graphql-http/lib/use/express")
const schema = require('./schema/schema')

const connectDB = require('./config/db')

const port = process.env.PORT || 5000


connectDB()

const app = express()

app.use(cors())

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: process.env.NODE_ENV === 'development'
// }))

app.all(
    "/graphql",
    createHandler({
        schema: schema,
    })
)

app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(port, console.log(`Server is running on port ${port}`))