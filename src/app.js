//? Dependencies principal express
const express = require('express')

//?Database connection
const db = require('./utils/database')

//?Routes
const userRouter = require('./users/users.router')

//? Initial configuration
const port = 9000
const app = express()

//? JSON 
app.use(express.json())

//? Validate connection and autentication database
db.authenticate()
  .then(() => console.log('Database authentication successful'))
  .catch((err) => console.error(err))

db.sync()
  .then(() => console.log('Database connection successful'))
  .catch((err) => console.error(err))

//? validate root url
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok!' })
});

//? root url define
app.use('/api/v1/', userRouter)

app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})
