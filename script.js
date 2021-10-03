const animeApiUrl = "https://api.jikan.moe/v3";

function searchAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    
    fetch(`${animeApiUrl}/search/anime?q=${query}&page=1`)
    .then(response=>response.json())
    .then(animeDisplay)
    .catch(err=>console.warn(err.message));
}

function animeDisplay(data){

    const searchResults = document.getElementById('search-results');
    

    const animeByCategories = data.results
        .reduce((acc, anime)=>{

            const {type} = anime;
            if(acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;

        }, {});

        searchResults.innerHTML = Object.keys(animeByCategories).map(key=>{
            const animes = animeByCategories[key]
            .sort((a,b)=>a.episodes-b.episodes)
            .map(anime=>{
                return `
                    <div class="card">
                        <div class="card-image">
                            <img class="image" src="${anime.image_url}">
                        </div>
                        <div class="card-content">
                            <div><h3 class="card-title">${anime.title}</h3></div>
                            <p class="synopsis">${anime.synopsis}</p>
                            <span class="card-details">Start Date: ${anime.start_date}</span>
                            <span class="card-details">End Date: ${anime.end_date}</span>
                            <span class="card-details">Score: ${anime.score}</span>
                            <span class="card-details">Type: ${anime.type}</span>
                            <span class="card-details">Rated: ${anime.rated}</span>
                            
                        </div>
                        <div class="card-action">
                            <button><a href="${anime.url}">More Info</a></button>
                        </div>
                    </div>
                `
            }).join("");


            return `
                <section>
                    <h3>${key.toUpperCase()}</h3>
                    <div class="anime-row">${animes}</div>
                </section>
            `
        }).join("");
}

function pageLoaded(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded);