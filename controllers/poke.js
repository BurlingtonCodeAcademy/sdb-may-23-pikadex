const router = require("express").Router()
const fs = require("fs")
const dbPath = "./pokemon.json"


// TODO: GET /pokemon/:id
// TODO: GET /search (all matching)
// TODO: POST /pokemon add

function read() {
    const file = fs.readFileSync(dbPath)
    return JSON.parse(file)
}

function save(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data), err => {
        if (err) throw Error
    })
}


router.get("/pokemon", (req, res) => {
    let findAll = read()
    res.status(200).json(findAll)
})

router.get("/pokemon/:id", (req, res) => {
    
    try {
        const { id } = req.params
        let db = read()
        let findOne = db.find(poke => poke.id == id)
        
        if (!findOne) throw Error("Pokemon not found")

        res.status(200).json(findOne)

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

router.get("/search", (req, res) => {
    try {
        // Destructure search properties
        const { name, hitPoints, attack, defense } = req.query
        // Read the database
        const db = read()
        // Perform the search
        function search(term) {
            // Occurs on property name from the req matching term value
            return db.find(i => i[Object.keys(req.query)] == term)
        }
        // Placeholder variable for function return
        let findMatching
    
        if (name) findMatching = search(name)
        if (hitPoints) findMatching = search(hitPoints)
        if (attack) findMatching = search(attack)
        if (defense) findMatching = search(defense)
    
        if (!findMatching) throw Error("No matching data found")
    
        res.status(200).json(findMatching)
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router
