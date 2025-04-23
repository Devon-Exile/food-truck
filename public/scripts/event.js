(async () => {
    const { pathname } = window.location
    const { name, location, date, time } = await (await fetch(`/api/v1/events/${pathname.split('/')[2]}`)).json()
    Object.entries({ 
        ename: name, 
        elocation: `Location: ${location}`, 
        edate: `Date: ${date}`, 
        etime: `Time: ${time}` 
    }).forEach(([id, text]) => document.getElementById(id).textContent = text)
})()
