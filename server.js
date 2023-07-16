const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api',(req,res)=>{
    res.status(200).json({ message: "Get goals" })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})