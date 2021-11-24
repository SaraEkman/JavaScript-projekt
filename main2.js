let charList = document.querySelector(".character-list");
let charDetails = document.querySelector(".character-details");
let extraInfo = document.querySelector(".extra-info");
let loader = document.querySelector(".spinner-div");
let butnLeft = document.querySelector(".left-btn");
let activePage = document.querySelector(".active-page");
let butnRight = document.querySelector(".right-btn");
let charName = document.querySelector(".character-name");
let extraButns = document.querySelector(".extra-butns");
let wrapperChar = document.querySelector(".wrapper-Char");
let activePageNow = 1;


async function fetchList() {
    activePage.innerHTML = activePageNow;
    PageRender();
    showLoaderChar();
    // showLoader()
    const request = await fetch("https://swapi.dev/api/people/?page=" + activePageNow);
    const data = await request.json();
    hideLoaderChar();
    renderData(data.results);
    // hideLoader();
    console.log(activePageNow);
    console.log(data);

}

function renderData(data) {
    for (let user of data) {
        const liChar = document.createElement("li");
        liChar.className = ('list-hover')
        liChar.innerText = `${user.name}`;
        charList.append(liChar);


        liChar.addEventListener("click", function () {
            const liDetails = charDetails;

            removeList(charDetails);
            showLoader();
            extraButnsShow();
            liDetails.innerHTML = `
                <h3>${user.name}</h3>
                <p>Height: ${user.height}</p>
                <p>Mass: ${user.mass}</p>
                <p>Hair color: ${user.hair_color}</p>
                <p>Skin color: ${user.skin_color}</p>
                <p>Eye color: ${user.eye_color}</p>
                <p>Birth year: ${user.birth_year}</p>
                <p>Gender: ${user.gender}</p>`;
            charPlanet(user);
            removeList(extraInfo);
            renderButns(user);
        });
    }
}


function buttonActions() {
    butnLeft.addEventListener("click", () => {
        activePageNow--;
        removeList(charList);
        fetchList();
        showLoader();
        PageRender();
        // console.log(activePageNow);
    });

    butnRight.addEventListener("click", () => {
        activePageNow++;
        removeList(charList);
        fetchList();
        showLoader();
        PageRender();
        // console.log(activePageNow);
    });
}

function removeList(list) {
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

function PageRender() {
    butnRight.disabled = (activePageNow === 9);
    butnLeft.disabled = (activePageNow === 1);
}

async function charPlanet(user) {
    try {
        removeList(extraInfo);
       
        const homeworld = await fetch(user.homeworld);
        const homeworldData = await homeworld.json();

        extraInfo.innerHTML = `
          <h3>${homeworldData.name}</h3>
        <p>Rotation period: ${homeworldData.rotation_period}</p>
        <p>Orbital period: ${homeworldData.orbital_period}</p>
        <p>Diameter: ${homeworldData.diameter}</p>
        <p>Climate: ${homeworldData.climate}</p>
        <p>Gravity: ${homeworldData.gravity}</p>
        <p>Terrain: ${homeworldData.terrain}</p>
        `;
    } catch (error) {
        extraInfo.innerHTML = `
          Try again.
          `;
    }
}

async function renderSpecies(user) {
    try {
        const species = await fetch(user.species);
        const speciesData = await species.json();
        removeList(extraInfo);

        extraInfo.innerHTML = `
          <h3>${speciesData.name}</h3>
        <p>Classification: ${speciesData.classification}</p>
        <p>Designation: ${speciesData.designation}</p>
        <p>Average height: ${speciesData.average_height}</p>
        <p>Skin colors: ${speciesData.skin_colors}</p>
        <p>Hair colors: ${speciesData.hair_colors}</p>
        <p>Eye colors: ${speciesData.eye_colors}</p>
        <p>Average lifespan: ${speciesData.average_lifespan}</p>
        <p>Homeworld: ${speciesData.homeworld}</p>
        <p>Language: ${speciesData.language}</p>
        `;
    } catch (error) {
        extraInfo.innerHTML = `
        Try again.
      `;
    }
}

async function renderVehicles(user) {
    extraInfo.innerHTML = "";
    if (user.vehicles.length > 0) {
        for (let i = 0; i < user.vehicles.length; i++) {
            try {
                const vehicles = await fetch(user.vehicles[i]);
                const vehiclesData = await vehicles.json();

                extraInfo.innerHTML += `
            <h3>${vehiclesData.name}</h3>
          <p>Model: ${vehiclesData.model}</p>
          <p>Manufacturer: ${vehiclesData.manufacturer}</p>
          <p>Cost in credits: ${vehiclesData.cost_in_credits}</p>
          <p>Length: ${vehiclesData.length}</p>
          <p>Max atmosphering speed: ${vehiclesData.max_atmosphering_speed}</p>
          <p>Crew: ${vehiclesData.crew}</p>
          <p>Passengers: ${vehiclesData.passengers}</p>
          <p>cargo capacity: ${vehiclesData.cargo_capacity}</p>
          <p>Consumables: ${vehiclesData.consumables}</p>
          <p>Vehicle class: ${vehiclesData.vehicle_class}</p>
          <span></span>     
          `;
            } catch (error) {
                extraInfo.innerHTML = `
          Try again.
          `;
            }
        }
    } else {
        extraInfo.innerHTML = `
        No vehicles.
      `;
    }
}

async function renderStarShips(user) {
    extraInfo.innerHTML = "";
    if (user.starships.length > 0) {
        for (let i = 0; i < user.starships.length; i++) {
            try {
                const starships = await fetch(user.starships[i]);
                const starshipsData = await starships.json();

                extraInfo.innerHTML += `
            <h3>${starshipsData.name}</h3>
          <p>Model: ${starshipsData.model}</p>
          <p>Manufacturer: ${starshipsData.manufacturer}</p>
          <p>Cost in credits: ${starshipsData.cost_in_credits}</p>
          <p>Length: ${starshipsData.length}</p>
          <p>Max atmosphering speed: ${starshipsData.max_atmosphering_speed}</p>
          <p>Crew: ${starshipsData.crew}</p>
          <p>Passengers: ${starshipsData.passengers}</p>
          <p>cargo capacity: ${starshipsData.cargo_capacity}</p>
          <p>Consumables: ${starshipsData.consumables}</p>
          <p>Hyperdrive rating: ${starshipsData.hyperdrive_rating}</p>
          <p>MGLT: ${starshipsData.MGLT}</p>
          <p>Starship class: ${starshipsData.starship_class}</p>
          <span></span>

          `;
            } catch (error) {
                extraInfo.innerHTML = `
            Try again.
            `;
            }
        }
    } else {
        extraInfo.innerHTML = `
      There are no starships.
      `;
    }
}
function showLoaderChar() {
    charList.innerHTML = `
    <div class="load-container">
      <div class="loading char"><div>
    </div>
    `;
}

function showLoader() {
    charDetails.innerHTML = `
    <div class="load-container">
    <div class="loading detalils"><div>
    </div>
    `;
     extraInfo.innerHTML = `
      <div class="load-container">
     <div class="loading detalils"><div>
     </div>     
    `;
}


function hideLoaderChar() {
    charList.innerHTML = ``;
}
function hideLoader() {
    charDetails.innerHTML = ``;
    // extraButns.innerHTML = ``;
    extraInfo.innerHTML = ``;
}

function extraButnsShow() {
    extraButns.innerHTML = `<button id='planet'>Planet</button><button id='species'>Species</button><button id='vehicles'>Vehicles</button><button id='starships'>Starships</button>`;
}


function renderButns(user) {
    extraInfo.style.overflow = "auto";
    extraInfo.style.width = "25rem";
    extraInfo.style.height = "150px";

    let planet = document.getElementById("planet");
    planet.addEventListener("click", function () {
        console.log("klickad");
        charPlanet(user);
    });
    let species = document.getElementById("species");
    species.addEventListener("click", function () {
        console.log("klickad");
        renderSpecies(user);
    });
    let vehicles = document.getElementById("vehicles");
    vehicles.addEventListener("click", function () {
        console.log("klickad");
        renderVehicles(user);
    });
    let starships = document.getElementById("starships");
    starships.addEventListener("click", function () {
        renderStarShips(user);
    });
}

function main() {
    fetchList();
    showLoader();

    buttonActions();
}
main();
