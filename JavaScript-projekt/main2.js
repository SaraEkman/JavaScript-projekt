let charList = document.querySelector(".character-list");
let charDetails = document.querySelector(".character-details");
let extraInfo = document.querySelector(".extra-info");
let loader = document.querySelector(".spinner-div");
let butnLeft = document.querySelector(".left-btn");
let activePage = document.querySelector(".active-page");
let butnRight = document.querySelector(".right-btn");
let charName = document.querySelector(".character-name");
let extraButns = document.querySelector(".extra-butns");
let activePageNow = 1;

extraButns.insertAdjacentHTML("afterbegin", "<button id='planet'>Planet</button><button id='species'>Species</button><button id='vehicles'>Vehicles</button><button id='starships'>Starships</button>"
);

async function fetchList() {
    activePage.innerHTML = activePageNow;
    PageRender();
    const request = await fetch("https://swapi.dev/api/people/?page=" + activePageNow);
    const data = await request.json();
    renderData(data.results);
    console.log(activePageNow);
    console.log(data);
}

function renderData(data) {
    for (let user of data) {
        const liChar = document.createElement("li");
        liChar.innerText = `${user.name}`;
        charList.append(liChar);

        liChar.addEventListener("click", function () {
            const liDetails = charDetails;
            removeList(charDetails);
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
        });
    }
}



function buttonActions() {
    butnLeft.addEventListener("click", () => {
        activePageNow--;
        removeList(charList);
        fetchList();
        PageRender();
        // console.log(activePageNow);
    });

    butnRight.addEventListener("click", () => {
        activePageNow++;
        removeList(charList);
        fetchList();
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



// async function renderSpecies(user) { 
//     try {
//         const species = await fetch(user.species);
//         const speciesData = await species.json();

//         extraInfo.innerHTML = `
//           <h3>${speciesData.name}</h3>
//         <p>Classification: ${speciesData.classification}</p>
//         <p>Designation: ${speciesData.designation}</p>
//         <p>Average height: ${speciesData.average_height}</p>
//         <p>Skin colors: ${speciesData.skin_colors}</p>
//         <p>Hair colors: ${speciesData.hair_colors}</p>
//         <p>Eye colors: ${speciesData.eye_colors}</p>
//         <p>Average lifespan: ${speciesData.average_lifespan}</p>
//         <p>Homeworld: ${speciesData.homeworld}</p>
//         <p>Language: ${speciesData.language}</p>
//         `;
//     } catch (error) {
//         extraInfo.innerHTML = `
//         Try again.
//       `;
//     }
// }

// function renderButns() {
    // extraButns.insertAdjacentHTML("afterbegin", "<button id='planet'>Planet</button><button id='species'>Species</button><button id='vehicles'>Vehicles</button><button id='starships'>Starships</button>"
    // );

    // extraButns.innerHTML = `<button id='planet'>Planet</button><button id='species'>Species</button><button id='vehicles'>Vehicles</button><button id='starships'>Starships</button>`
    

    // let planet = document.getElementById("planet");
    // planet.addEventListener("click", function () {
    //     charPlanet(user);
    // });
    // let species = document.getElementById("species");
    // species.addEventListener("click", function () {
    //     renderSpecies(user);
    // });
    // let vehicles = document.getElementById("vehicles");
    // vehicles.addEventListener("click", function () {
    //     renderVehicles(user);
    // });
    // let starships = document.getElementById("starships");
    // starships.addEventListener("click", function () {
    //     renderStarShips(user);
    // });
     
// }



    


function main() {
    fetchList();
    buttonActions();
    // renderButns();

}
main();
