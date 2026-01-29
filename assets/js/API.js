const ROOT = document.getElementById('root')

export const getFilms = () => {

    fetch('https://swapi.info/api/films')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const ulWrapper = document.createElement('ul')

            for (const item of data) {
                const { title, episode_id, director, release_date } = item

                const liWrapper = document.createElement('li')
                liWrapper.innerText = title

                const ulDetails = document.createElement('ul')

                const liDir = document.createElement('li')
                liDir.innerText = `Instruktør: ${director}`

                const liEpisode = document.createElement('li')
                liEpisode.innerText = `Episode: ${episode_id}`

                const liRelease = document.createElement('li')
                liRelease.innerText = `Udgivelsesår: ${new Date(release_date).getFullYear()}`

                ulDetails.append(liDir, liEpisode, liRelease)

                liWrapper.append(ulDetails)
                
                ulWrapper.append(liWrapper)

             

            }
            ROOT.innerHTML = '';
            ROOT.append(ulWrapper)

        })
        .catch(error => {
            console.error(error)
        })
}

export const getPeople = () => {

    fetch('https://swapi.info/api/people')
        .then(response => response.json())
        .then(data => {
            const ulWrapper = document.createElement('ul')
            ulWrapper.className = 'people'

            for (const item of data.slice(0,10)) {
                const { name, gender, films } = item

                const liWrapper = document.createElement('li')
                liWrapper.innerHTML = `<b>${name}</b>`

                const ulDetails = document.createElement('ul')

                const liDir = document.createElement('li')
                liDir.innerText = `Køn: ${gender}`

                const liEpisode = document.createElement('li')
                liEpisode.innerHTML = `Film: <ul><li>${films.join('</li><li>')}</li></ul>`

                ulDetails.append(liDir, liEpisode)

                liWrapper.append(ulDetails)
                
                ulWrapper.append(liWrapper)

                console.log(ulWrapper);

            }
            ROOT.innerHTML = '';
            ROOT.append(ulWrapper)

        })
        .catch(error => {
            console.error(error)
        })
}

export const getPlanets = () => {

    fetch('https://swapi.info/api/planets')
        .then(response => response.json())
        .then(data => {
            const ulWrapper = document.createElement('ul')
            ulWrapper.className = 'planets'

            for (const item of data.slice(0,10)) {
                const { name, climate, terrain } = item

                const liWrapper = document.createElement('li')
                liWrapper.innerHTML = `<b>${name}</b>`

                const ullist = document.createElement('ul')

                const liClimate = document.createElement('li')
                liClimate.innerText = `climate: ${climate}`

                const liTerrain = document.createElement('li')
                liTerrain.innerText = `terrain: ${terrain}`

                ullist.append(liClimate, liTerrain)

                liWrapper.append(ullist)

                ulWrapper.append(liWrapper)
            }
            ROOT.innerHTML = '';
            ROOT.append(ulWrapper)
        })
        .catch(error => {
            console.error(error)
        })
}

export const getSpecies = () => {
    fetch('https://swapi.info/api/species')
        .then(response => response.json())
        .then(data => {
            const ulWrapper = document.createElement('ul')
            ulWrapper.className = 'species'

            for (const item of data.slice(0, 10)) {
                const { name, classification, designation, skin_colors, hair_colors } = item

                const liWrapper = document.createElement('li')
                liWrapper.innerHTML = `<b>${name}</b>`

                const ullist = document.createElement('ul')

                const liClassification = document.createElement('li')
                liClassification.innerText = `Classification: ${classification}`

                const liDesignation = document.createElement('li')
                liDesignation.innerText = `Designation: ${designation}`

                const liSkin = document.createElement('li')
                liSkin.innerText = `Skin colors: ${skin_colors}`

                const liHair = document.createElement('li')
                liHair.innerText = `Hair colors: ${hair_colors}`

                ullist.append(liClassification, liDesignation, liSkin, liHair)

                liWrapper.append(ullist)
                ulWrapper.append(liWrapper)
            }

            ROOT.innerHTML = ''
            ROOT.append(ulWrapper)
        })
        .catch(error => {
            console.error(error)
        })
}
