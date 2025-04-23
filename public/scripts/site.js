(async () => {
    
    const menu = document.querySelector('#menu')
    const event = document.querySelector('#events');

    (await (await fetch('/api/v1/menu')).json()).forEach(({ img, name, description, price }) => {
        menu.innerHTML += `
            <div class="menuitem">
                <img src="${img}" alt="${name}" class="images">
                <h3>${name}</h3>
                <p>${description}</p>
                <p>${price}</p>
            </div>`
    });
    (await (await fetch('/api/v1/events')).json()).forEach(({ _id, name, date }) => {
        event.innerHTML += `
            <span class="event">
                <h3>${name}</h3>
                <p>${date}</p>
                <a href="/event/${_id}"> Information for Event </a>
            </span>`
    })

})()

