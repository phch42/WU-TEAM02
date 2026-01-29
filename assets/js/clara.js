import { getVehicles } from "./api.js";

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
    document.querySelector('navbar').append(navList)
}

doNavBar()
getVehicles()