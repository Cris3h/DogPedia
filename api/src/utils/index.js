require ('dotenv').config()


module.exports = {
    api: process.env.API_URL,
    key: process.env.API,
    user: process.env.DB_USER,
    passw: process.env.DB_PASSWORD,
    port: 3001,
}