import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { Notify } from "notiflix";
import SlimSelect from 'slim-select'


const selectEl = document.querySelector(".breed-select");
const loaderEl = document.querySelector(".loader-wrapper");

const catInfo = document.querySelector(".cat-info");

fetchBreeds().then((breeds)=>{
    console.log(breeds)
    breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        selectEl.appendChild(option);
    });
    new SlimSelect({
        select: '#selectElement'
      })

    
    // selectEl.classList.remove("hidden");
    loaderEl.classList.add("hidden");
   
    
}).catch(()=>{
    loaderEl.classList.add("hidden");
    Notify.failure('Oops! Something went wrong! Try reloading the page!')}
)

selectEl.addEventListener("change", () => {
    const selectSlim = document.querySelector(".ss-main.breed-select");
    const selectedBreedId = selectEl.value;
    loaderEl.classList.remove('hidden');
    catInfo.classList.add("hidden");
    selectSlim.classList.add("hidden");
    fetchCatByBreed(selectedBreedId).then((cat)=>{
        console.log(cat.breeds[0])
        document.querySelector(".cat-img").src = cat.url;
        document.querySelector(".cat-name").innerHTML = cat.breeds[0].name;
        document.querySelector(".cat-description").innerHTML = cat.breeds[0].description;
        document.querySelector(".cat-temp").innerHTML ="<b>Temperament: </b>" + cat.breeds[0].temperament;
        loaderEl.classList.add('hidden');
        catInfo.classList.remove("hidden");
        selectSlim.classList.remove("hidden");

    })
    .catch(()=>{
        loaderEl.classList.add('hidden');
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
 
})


