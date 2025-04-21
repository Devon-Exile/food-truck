const router = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

let collection = null

const getMenu = async () => {
    if(!collection) collection = await getCollection('food-truck', 'menu')
    return collection 
}

const getEvents = async () => {
    if(!collection) collection = await getCollection('food-truck', 'events')
    return collection 
}

//menu endpoint
router.get('/menu', async (request, response) => {
    const collection = await getMenu()
    const found = await collection.find().toArray()
    if (found) response.send(found)
    else response.send({ error: { message: 'Could not find menu' }})
})

//event endpoint
router.get('/events', async (request, response) => {
    const collection = await getEvents()
    const found = await collection.find().toArray()
    if (found) response.send(found)
    else response.send({ error: { message: 'Could not find events' }})
})

//menu:id endpoint
router.get('/menu/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getMenu()
    const found = await collection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find menu item with id: ${id}` }})
})

//event:id endpoint
router.get('/events/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getEvents()
    const found = await collection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find event with id: ${id}` }})
})

//post menu endpoint
router.post('/menu', async (request, response) => {
    const { number, name, type } = request.body
    const collection = await getPokemon()
    const { acknowledged, insertedId } = await collection.insertOne({ number, name, type })
    response.send({ acknowledged, insertedId })
})

//post event endpoint
router.post('/events', async (request, response) => {
    const { number, name, type } = request.body
    const collection = await getPokemon()
    const { acknowledged, insertedId } = await collection.insertOne({ number, name, type })
    response.send({ acknowledged, insertedId })
})

module.exports = router