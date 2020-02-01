const cors = require('cors')
const express = require('express')

const app = express()
const config = require('../config')
const content = require('../content')

app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/api/v1/phrases', (req,res) => {
  const phrases = content.map((value, id) => ({
    ...value,
    id: id + 1
  }))

  return res.status(200).json({
    response: phrases,
    statusCode: 200
  })
})

app.listen(config.server.port || process.env.PORT, () => {
  console.log(
    'Server has been started'
  )
})