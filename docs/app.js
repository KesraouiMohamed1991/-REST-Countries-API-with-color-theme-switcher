const inputfield = document.querySelector(".input-field");
const form = document.getElementById("monFormulaire");
const selectElement = document.getElementById("filtre");
const SelectedCountry = document.getElementById("SelectedCountry");

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
      const SelectedCountryCard = document.querySelectorAll(".clickedSelect");
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


    






      localStorage.setItem("CountriesName", JSON.stringify(CountriesName)); // Store the index in local storage

      grid.innerHTML = SelectedCountry; // Append each piece to the container


  
    }
    function sortRegion() {
      const grid = document.querySelector(".grid-system");
      grid.innerHTML = ""; // Clear existing content

      const selectedValue = selectElement.value;
      const regionsName = data.filter(
        (region) => region.region.toLowerCase() === selectedValue.toLowerCase(),
        );
        

      console.log(regionsName);

      localStorage.setItem("regionsName", JSON.stringify(regionsName));

      const regionDataArray = regionsName.map(
        (country) => `
                                  <a href="./full-page.html" target="">
                                    <div data-index="${country.numericCode}" class=" filtred-countries dark:text-slate-300 shadow-md yes">
                                    <div class="w-full bg-red-500 overflow-hidden">
                                        <img class="sm:h-48 h-full object-cover w-full photo" src="${country.flags.png}" alt="" />
                                    </div>
                                    <div class="countryy h-2/3 w-[90%] sm:h-1/2 sm:w-full p-6 font-bold">
                                        <h1 class="py-2 name">${country.name}</h1>
                                        <h6>Population: <span class="font-thin population">${country.population}</span></h6>
                                        <h6 class="py-2">Region: <span class="font-thin region">${country.region}</span></h6>
                                        <h6>Capital: <span class="font-thin capital">${country.capital}</span></h6>
                                    </div>
                                    </div>
                                    </a>
  `,
      );


      grid.innerHTML = regionDataArray.join(""); // Append all regionData at once

      const filtredCountries = document.querySelectorAll(".filtred-countries ");

      filtredCountries.forEach((filteredCountry) => {
        filteredCountry.addEventListener("click", function () {
          const clickedFilterCard =
            Array.from(filtredCountries).indexOf(filteredCountry);
          


          localStorage.setItem("clickedFilterCard", clickedFilterCard); // Store the index in local storage
        });
      });


    }

    selectElement.addEventListener("change", sortRegion);
    inputfield.addEventListener("input", SearchCountry);
  });

form.addEventListener("submit", function (event) {
  event.preventDefault(event); // Prevent form submission
});
