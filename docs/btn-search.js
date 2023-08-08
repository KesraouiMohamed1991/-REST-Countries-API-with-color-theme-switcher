fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        function SearchCountry() {

            
            const pays = inputfield.value;

            // Filter data based on the input value
            const CountriesName = data.filter(
                (country) => country.name.toLowerCase() === pays.toLowerCase(),
            );

            const grid = document.querySelector(".grid-system");
            const SelectedCountry = `  <a href="./full-page.html" target="">

            <div data-index="${CountriesName[0].numericCode}" class="clickedSelect shadow-md yes " id="SelectedCountry">
                <div class="w-full bg-red-500 overflow-hidden">
                    <img class=" h-full sm:h-48 object-cover w-full photo" src="${CountriesName[0].flags.png}" alt="" />
                </div>

                <div class="countryy h-2/3 w-[90%] sm:h-1/2 sm:w-full p-6 font-bold">
                    <h1 class="py-2 name">${CountriesName[0].name}</h1>
                    <h6>
                        Population: <span class="font-thin population">${CountriesName[0].population}</span>
                    </h6>
                    <h6 class="py-2">
                        Region: <span class="font-thin region">${CountriesName[0].region}</span>
                    </h6>
                    <h6>Capital: <span class="font-thin capital">${CountriesName[0].capital}</span></h6>
                </div>
            </div>
            </a>`;

            console.log(CountriesName);

            localStorage.setItem("CountriesName", JSON.stringify(CountriesName)); // Store the index in local storage

            grid.innerHTML = SelectedCountry; // Append each piece to the container

            const SelectedCountryCard = document.querySelectorAll(".clickedSelect");

    
        }
    })
    .catch((error)=>{
    console.error('this is an error', error)
    })