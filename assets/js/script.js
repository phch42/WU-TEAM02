const endpoints = {
  films: "https://swapi.info/api/films",
  people: "https://swapi.info/api/people",
  planets: "https://swapi.info/api/planets",
  species: "https://swapi.info/api/species",
  vehicles: "https://swapi.info/api/vehicles",
  starships: "https://swapi.info/api/starships"
};

/* ---------------- FETCH ---------------- */
const fetchData = url => fetch(url).then(res => res.json());

/* ---------------- LOAD & LIST ---------------- */
const loadResource = resource => 
  fetchData(endpoints[resource]).then(data => {
    const items = data.results || data;
    const field = resource === "films" ? "title" : "name";
    const list = document.getElementById("list");
    const details = document.getElementById("details");
    list.innerHTML = "";
    details.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item[field];
      li.onclick = () => showDetails(item.url);
      list.appendChild(li);
    });
  });

/* ---------------- DETAILS ---------------- */
const showDetails = url => {
  const details = document.getElementById("details");
  details.innerHTML = "<h2>Details</h2>";

  fetchData(url).then(data => {
    for (const key in data) {
      const value = data[key];
      if (Array.isArray(value) && value.length) {
        const ul = document.createElement("ul");
        value.forEach(relUrl => fetchRelationName(relUrl, ul));
        const header = document.createElement("h3");
        header.textContent = key;
        details.appendChild(header);
        details.appendChild(ul);
      } else if (value && typeof value !== "object") {
        details.appendChild(Object.assign(document.createElement("p"), {textContent: `${key}: ${value}`}));
      }
    }
  });
};

/* ---------------- FETCH RELATION NAMES ---------------- */
const fetchRelationName = (url, parentUl) => 
  fetchData(url).then(rel => {
    const li = document.createElement("li");
    li.textContent = rel.name || rel.title || "Unknown";
    parentUl.appendChild(li);
  });

/* ---------------- BUTTONS ---------------- */
["Films","People","Planets","Starships","Vehicles","Species"]
  .forEach(type => window["load"+type] = () => loadResource(type.toLowerCase()));