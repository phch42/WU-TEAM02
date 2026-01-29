import { getFilms, getPeople } from "./API.js";

const doNavBar = () => {
    const arrNavItems = [
        { text: 'Forside', script: getFilms },
        { text: 'Karakterer', script: getPeople },
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