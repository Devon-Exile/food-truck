const router = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

let menuCollection = null
let eventsCollection = null

const getMenu = async () => {
    if(!menuCollection) menuCollection = await getCollection('food-truck', 'menu')
    return menuCollection 
}

const getEvents = async () => {
    if(!eventsCollection) eventsCollection = await getCollection('food-truck', 'events')
    return eventsCollection 
}

// menu endpoint
router.get('/menu', async (request, response) => {
    const menuCollection = await getMenu()
    const found = await menuCollection.find().toArray()
    if (found) response.send(found)
    else response.send({ error: { message: 'Could not find menu' }})
})

//event endpoint
router.get('/events', async (request, response) => {
    const eventsCollection = await getEvents()
    const found = await eventsCollection.find().toArray()
    if (found) response.send(found)
    else response.send({ error: { message: 'Could not find events' }})
})

//menu:id endpoint
router.get('/menu/:id', async (request, response) => {
    const { id } = request.params
    const menuCollection = await getMenu()
    const found = await menuCollection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find menu item with id: ${id}` }})
})

//event:id endpoint
router.get('/events/:id', async (request, response) => {
    const { id } = request.params
    const eventsCollection = await getEvents()
    const found = await eventsCollection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find event with id: ${id}` }})
})

//post menu endpoint
router.post('/menu', async (request, response) => {
    const { name, description, price, img } = request.body
    const menuCollection = await getMenu()
    const { acknowledged, insertedId } = await menuCollection.insertOne({ name, description, price, img })
    response.send({ acknowledged, insertedId })
})

//post event endpoint
router.post('/events', async (request, response) => {
    const { name, location, date, time } = request.body
    const eventsCollection = await getEvents()
    const { acknowledged, insertedId } = await eventsCollection.insertOne({ name, location, date, time })
    response.send({ acknowledged, insertedId })
})

module.exports = router