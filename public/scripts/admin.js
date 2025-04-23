const results = document.getElementById('containerss')
const addMenuItem = document.getElementById('addMenuItem')
const addEvent = document.getElementById('addEvent')

async function handleFormSubmit(event, url, form) {
    event.preventDefault() 
    const newItem = {}

    
    if (form.id === 'addMenuItem') {
        newItem.name = document.getElementById('menuName').value
        newItem.description = document.getElementById('menuDescription').value
        newItem.price = document.getElementById('menuPrice').value
        newItem.img = document.getElementById('menuItemImage').value
    } else if (form.id === 'addEvent') {
        newItem.name = document.getElementById('eventName').value
        newItem.location = document.getElementById('eventLocation').value
        newItem.date = document.getElementById('eventDate').value
        newItem.time = document.getElementById('eventTime').value
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
    })

    const { insertedId } = await response.json()
    results.textContent = insertedId
        ? `You added: ${insertedId}`
        : "Error: Could not submit data."
    if (insertedId) form.reset()
}

addMenuItem.addEventListener('submit', (event) => handleFormSubmit(event, 'http://localhost:3000/api/v1/menu', addMenuItem))
addEvent.addEventListener('submit', (event) => handleFormSubmit(event, 'http://localhost:3000/api/v1/events', addEvent))


