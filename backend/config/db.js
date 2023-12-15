const mongoose = require('mongoose')


const connectDb = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.DB_CONNECTION_URL}/${process.env.DB_NAME}`)
        console.log(`MonogoDB connected: ${conn.connection.host}`)
    }
    catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit()
    }
}

module.exports = connectDb