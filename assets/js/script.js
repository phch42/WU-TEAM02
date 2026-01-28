<<<<<<< HEAD
 const endpoints = {
      films: "https://swapi.dev/api/films",
      people: "https://swapi.dev/api/people",
      planets: "https://swapi.dev/api/planets",
      species: "https://swapi.dev/api/species",
      vehicles: "https://swapi.dev/api/vehicles",
      starships: "https://swapi.dev/api/starships"
    };

    async function fetchData(url) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.status);
        return await res.json();
      } catch (err) {
        console.error("Fetch error:", err);
        return null;
      }
    }

    async function load(resource) {
      const data = await fetchData(endpoints[resource]);
      if (!data) return;

      const items = data.results || data;
      const list = document.getElementById("list");
      const details = document.getElementById("details");
      list.innerHTML = "";
      details.innerHTML = "";

      const field = resource === "films" ? "title" : "name";

      items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item[field] || "Unknown";
        li.onclick = () => showDetails(resource, item);
        list.appendChild(li);
      });
    }

    function showDetails(resource, item) {
      const details = document.getElementById("details");
      details.innerHTML = "<h2>Details</h2>";

      if (resource === "films") {
        details.innerHTML += `
          <p><strong>Title:</strong> ${item.title}</p>
          <p><strong>Episode:</strong> ${item.episode_id}</p>
          <p><strong>Director:</strong> ${item.director}</p>
          <p><strong>Release:</strong> ${item.release_date}</p>
        `;
      } else {
        for (const key in item) {
          if (typeof item[key] !== "object" && item[key] !== null) {
            details.innerHTML += `<p><strong>${key}:</strong> ${item[key]}</p>`;
          }
        }
      }
    }
=======
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
>>>>>>> 18a314c2466936d36a557fd8c124732be934fe57
