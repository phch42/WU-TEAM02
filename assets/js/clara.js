const ROOT = document.querySelector('#root')

export const getVehicles = () => {

    fetch('https://swapi.info/api/vehicles')
        .then(response => response.json())
        .then(data => {
            const ulWrapper = document.createElement('ul')
            ulWrapper.className = 'vehicles'

            for (const item of data) {
                const { name, model, manufacturer, vehicle_class, crew, cargo_capacity, films } = item

                const liWrapper = document.createElement('li')
                const h2 = document.createElement('h2')
                h2.innerText = name

                const ulInner = document.createElement('ul')

                const liModel = document.createElement('li')
                liModel.innerText = `Model: ${model}`
               
                const liManu = document.createElement('li')
                liManu.innerText = `Producent: ${manufacturer}`
                
                const liVehicles = document.createElement('li')
                liManu.innerText = `Fartøjsklasse: ${vehicle_class}`
               
                const liCrew = document.createElement('li')
                liCrew.innerText = `Antal besætning: ${crew}`
               
                const liCargo = document.createElement('li')
                liCargo.innerText = `Kapacitet: ${cargo_capacity}`
               
                const liFilms = document.createElement('li')
                liFilms.innerText = `Film: ${films}`

                ulInner.append(liModel, liManu, liVehicles, liCrew, liCargo, liFilms )

                liWrapper.append(h2, ulInner)
                ulWrapper.append(liWrapper)
            }
            ROOT.innerHTML = ''
            ROOT.append(ulWrapper)
        })
}

//API.js
const doNavBar = () => {
    const arrNavItems = [
        { text: 'Fartøjer', script: getVehicles },
    ]
    const navList = document.createElement('ul')

    for (const element of arrNavItems) {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.innerText = element.text
        a.addEventListener('click', () => {
            element.script()
        })
        li.append(a)
        navList.append.li
    }
    document.querySelector('#navbar').append(navList)
}

doNavBar()
getVehicles()