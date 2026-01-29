import { getFilms, getPeople, getPlanets, getSpecies,  } from "./API.js";

const doNavBar = () => {
    const arrNavItems = [
        { text: 'Forside', script: getFilms },
        { text: 'Karakterer', script: getPeople },
         { text: 'Planeter', script: getPlanets },
         { text: 'Species', script: getSpecies },
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
        navList.append(li)
    }
    document.getElementById('navbar').append(navList)
}

doNavBar()
getFilms()
