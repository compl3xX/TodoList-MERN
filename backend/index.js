const express = require('express')
const cors = require('cors');
const dotenv=require('dotenv')
const connectDB = require('./config/db')
const notesRouter = require('./routes/todosRoute')

const app = express()

dotenv.config()
connectDB();
app.use(cors())


const port = process.env.PORT || 8000


app.use(express.json());

app.use(notesRouter)


app.listen(port, () => {
    console.log(`Listening on ${port}`)
})