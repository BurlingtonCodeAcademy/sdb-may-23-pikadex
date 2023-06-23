const express = require("express")
const app = express()

const PORT = 4000

const poke = require("./controllers/poke")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(poke)

app.listen(PORT, () => {
    console.log(`[server] on ${PORT}`)
})