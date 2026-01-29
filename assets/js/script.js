
const BASE_API = "https://swapi.info/api";
// 🔹 Dette er den grundlæggende URL til Star Wars API.
// 🔹 Alle endpoints bygges ovenpå denne base-URL.

// Endpoints
const endpoints = {
  films: `${BASE_API}/films`,
  people: `${BASE_API}/people`,
  planets: `${BASE_API}/planets`,
  species: `${BASE_API}/species`,
  vehicles: `${BASE_API}/vehicles`,
  starships: `${BASE_API}/starships`
};
// 🔹 Her oprettes et objekt med alle API-endpoints.
// 🔹 Det gør det nemt at hente forskellige typer data fra API'en uden at skrive URL'erne igen.

// Map HTML page names to API resources
const pageToResource = {
  "index": "films",
  "people": "people",
  "planet": "planets",      // planet.html → planets API
  "starships": "starships",
  "vehicles": "vehicles",
  "species": "species"
};
// 🔹 Dette objekt kobler HTML-filenavnet (uden .html) til API-ressourcen.
// 🔹 Fx "planet" (planet.html) henter data fra "planets" endpointet.

// Generic fetch helper
async function fetchData(url) {
  try {
    const res = await fetch(url); // 🔹 Henter data fra den angivne URL
    if (!res.ok) throw new Error(`HTTP ${res.status}`); // 🔹 Hvis status ikke er 200–299, smid en fejl
    return await res.json(); // 🔹 Konverter JSON-responsen til et JS-objekt
  } catch (err) {
    console.error("Fetch error:", err); // 🔹 Log fejl i konsollen
    return null; // 🔹 Returner null hvis der opstår en fejl
  }
}

// Load resource (films, people, planets, etc.)
async function load(resource) {
  if (!endpoints[resource]) {
    console.warn(`No endpoint for resource: ${resource}`); // 🔹 Tjekker om endpoint eksisterer
    return;
  }

  const data = await fetchData(endpoints[resource]); // 🔹 Hent data fra API
  if (!data) return; // 🔹 Stop hvis fetchData fejler

  let items = data.results || data; // 🔹 Nogle API'er returnerer resultater i .results, andre som array
  const list = document.getElementById("list"); // 🔹 Find <ul> hvor listen skal vises
  const details = document.getElementById("details"); // 🔹 Find <div> hvor detaljer skal vises
  list.innerHTML = ""; // 🔹 Ryd listen
  details.innerHTML = ""; // 🔹 Ryd detaljer

  // Sort films chronologically
  if (resource === "films") {
    items = items
      .filter(film => film.episode_id >= 1 && film.episode_id <= 6) // 🔹 Kun Episode I–VI
      .sort((a, b) => a.episode_id - b.episode_id); // 🔹 Sorter kronologisk efter episode
  }

  const field = resource === "films" ? "title" : "name"; // 🔹 Vælg felt der vises i listen

  items.forEach(item => {
    const li = document.createElement("li"); // 🔹 Opret et <li>-element
    li.textContent =
      resource === "films"
        ? `Episode ${item.episode_id}: ${item.title}` // 🔹 For films: vis episode og titel
        : item[field] || "Unknown"; // 🔹 For andre: vis name, ellers "Unknown"

    li.addEventListener("click", () => showDetails(resource, item)); // 🔹 Klik på element viser detaljer
    list.appendChild(li); // 🔹 Tilføj <li> til listen
  });
}

// Show details for selected item
function showDetails(resource, item) {
  const details = document.getElementById("details"); // 🔹 Find detalje-containeren
  details.innerHTML = "<h2>Details</h2>"; // 🔹 Tilføj overskrift

  if (resource === "films") {
    details.innerHTML += `
      <p><strong>Title:</strong> ${item.title}</p>
     
      <p>${item.opening_crawl.replace(/\n/g, "<br>")}</p>
    `;
    // 🔹 For films: vis titel
  } else {
    for (const key in item) {
      if (
        typeof item[key] !== "object" && // 🔹 Ignorer objekter
        item[key] !== null &&            // 🔹 Ignorer null
        key !== "created" &&             // 🔹 Ignorer metadata
        key !== "edited" &&
        key !== "url"
      ) {
        details.innerHTML += `<p><strong>${key}:</strong> ${item[key]}</p>`; // 🔹 Vis key-value par
      }
    }
  }
}

// Auto-load resource based on page name
document.addEventListener("DOMContentLoaded", () => {
  let page = window.location.pathname.split("/").pop().split(".")[0]; // 🔹 Få filnavn uden .html
  if (!page) page = "index"; // 🔹 Hvis tom, brug index som default

  const resource = pageToResource[page]; // 🔹 Find hvilken API resource der hører til siden
  if (resource) {
    load(resource); // 🔹 Indlæs data for denne resource
  } else {
    console.warn(`No resource mapping found for page: ${page}`); // 🔹 Hvis ingen mapping, log advarsel
  }
});
