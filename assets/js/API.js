const ROOT = document.getElementById("root");

export const getFilms = () => {
  fetch("https://swapi.info/api/films")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const ulWrapper = document.createElement("ul");

      for (const item of data) {
        const { title, episode_id, director, release_date } = item;

        const liWrapper = document.createElement("li");
        liWrapper.innerText = title;

        const ulDetails = document.createElement("ul");

        const liDir = document.createElement("li");
        liDir.innerText = `Instruktør: ${director}`;

        const liEpisode = document.createElement("li");
        liEpisode.innerText = `Episode: ${episode_id}`;

        const liRelease = document.createElement("li");
        liRelease.innerText = `Udgivelsesår: ${new Date(release_date).getFullYear()}`;

        ulDetails.append(liDir, liEpisode, liRelease);

        liWrapper.append(ulDetails);

        ulWrapper.append(liWrapper);
      }
      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getPeople = () => {
  fetch("https://swapi.info/api/people")
    .then((response) => response.json())
    .then((data) => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "people";

      for (const item of data.slice(0, 10)) {
        const { name, gender, films } = item;

        const liWrapper = document.createElement("li");
        liWrapper.innerHTML = `<b>${name}</b>`;

        const ulDetails = document.createElement("ul");

        const liDir = document.createElement("li");
        liDir.innerText = `Køn: ${gender}`;

        const liEpisode = document.createElement("li");
        liEpisode.innerHTML = `Film: <ul><li>${films.join("</li><li>")}</li></ul>`;

        ulDetails.append(liDir, liEpisode);

        liWrapper.append(ulDetails);

        ulWrapper.append(liWrapper);

        console.log(ulWrapper);
      }
      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getPlanets = () => {
  fetch("https://swapi.info/api/planets")
    .then((response) => response.json())
    .then((data) => {
      const ulWrapper = document.createElement("ul");
      ulWrapper.className = "planets";

      for (const item of data.slice(0, 10)) {
        const { name, climate, terrain } = item;

        const liWrapper = document.createElement("li");
        liWrapper.innerHTML = `<b>${name}</b>`;

        const ullist = document.createElement("ul");

        const liClimate = document.createElement("li");
        liClimate.innerText = `climate: ${climate}`;

        const liTerrain = document.createElement("li");
        liTerrain.innerText = `terrain: ${terrain}`;

        ullist.append(liClimate, liTerrain);

        liWrapper.append(ullist);

        ulWrapper.append(liWrapper); 
      }
      ROOT.innerHTML = "";
      ROOT.append(ulWrapper);
    })
    .catch((error) => {
      console.error(error);
    });
};
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

export const getStarships = () => {

    // fetch говорит браузеру:
    // "сходи по этой ссылке в интернет и принеси данные"
    fetch('https://swapi.info/api/starships')
                    // когда браузер получил ответ
                    // мы превращаем его в JSON (читаемый для JavaScript формат)
        .then(response => response.json())
                    // когда JSON уже готов
                    // data — это объект со всеми данными от API
        .then(data => {
                    // создаём HTML элемент <ul>
                    // это будет список всех кораблей
           const ulWrapper = document.createElement('ul')
                    // добавляем класс, чтобы CSS мог его оформить
            ulWrapper.className = 'starships'

                    // data — это коробка, в которой лежал определенный item
            for (const item of data) {
                    // из одного корабля мы достаём нужные данные
                    // это destructuring — короткий способ взять свойства
                const { name, model, manufacturer, length, crew, passengers, films } = item

                    // создаём <li> это один корабль в списке
                const liWrapper = document.createElement('li')

                    // создаём заголовок <h2> в нём будет имя корабля
                const h2 = document.createElement('h2')
                    // записываем имя корабля внутрь <h2>
                h2.innerText = name


                    // создаём вложенный список <ul>
                    // в нём будут детали корабля (model, length и т.д.)
                const ulInner = document.createElement('ul')
                
                    // создаём <li> для модели корабля
                const liModel = document.createElement('li')

                    // записываем текст, который увидит пользователь ${model} подставляет значение из API
                liModel.innerText = `Model: ${model}`

                const liManu = document.createElement('li')
                liManu.innerText = `Manufacturer: ${manufacturer}`

                const liLength = document.createElement("li")
                liLength.innerText = `Length: ${length}`

                const liCrew = document.createElement("li")
                liCrew.innerText = `Crew: ${crew}`

                const liPassengers = document.createElement("li")
                liPassengers.innerText = `Passengers: ${passengers}`

                const liFilms = document.createElement("li")
                liFilms.innerText = `Films: ${films.length}`;

                   // добавляем строку с моделью внутрь списка деталей
                ulInner.append(liModel, liManu, liLength, liCrew, liPassengers, liFilms)

                    // кладём заголовок и список деталей внутрь одного корабля
                liWrapper.append(h2, ulInner) 
                    // кладём корабль в общий список кораблей
                ulWrapper.append(liWrapper)


            }

                    // очищаем ROOT чтобы старый контент исчез
            ROOT.innerHTML = ''
                    // добавляем новый список кораблей на страницу
            ROOT.append(ulWrapper)


        });
}