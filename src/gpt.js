// Function to format population number with commas
function formatPopulationNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to create a single country card piece
function createCountryCard(data) {
    return `
    <a href="./full-page.html" target="">
      <div data-index="${data.numericCode}" class="clickedSelect shadow-md yes">
        <div class="w-full bg-red-500 overflow-hidden">
          <img class="h-full sm:h-48 object-cover w-full photo" src="${data.flags.png}" alt="" />
        </div>
        <div class="countryy h-2/3 w-[90%] sm:h-1/2 sm:w-full p-6 font-bold">
          <h1 class="py-2 name">${data.name}</h1>
          <h6>Population: <span class="font-thin population">${data.population}</span></h6>
          <h6 class="py-2">Region: <span class="font-thin region">${data.region}</span></h6>
          <h6>Capital: <span class="font-thin capital">${data.capital}</span></h6>
        </div>
      </div>
    </a>
  `;
}

// Function to create buttons based on the data
function createButtons(data) {
    if (!data || data.length === 0) {
        // If there are no borders, display a message
        btnContainer.innerHTML = "This country has no borders.";
    } else {
        // If there are borders, create buttons
        const buttons = data.map(border => `<button type="button" class="py-2 px-4 mr-2 mb-1 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">${border}</button>`).join('');
        btnContainer.innerHTML = buttons; // Insert all buttons into btnContainer
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector(".input-field");
    const form = document.getElementById("monFormulaire");
    const selectElement = document.getElementById("filtre");
    const grid = document.querySelector(".grid-system");
    const backBtn = document.querySelector(".backbtn");
    const refreshLink = document.getElementById("refreshLink");

    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            // Function to filter data based on the input value
            function searchCountry() {
                const searchQuery = inputField.value.trim().toLowerCase();
                const filteredCountries = data.filter(country => country.name.toLowerCase() === searchQuery);

                grid.innerHTML = createCountryCard(filteredCountries[0]);

                if (filteredCountries.length > 0) {
                    localStorage.setItem("CountriesName", JSON.stringify(filteredCountries));
                } else {
                    localStorage.removeItem("CountriesName");
                }
            }

            // Function to filter data based on the selected region
            function sortRegion() {
                const selectedValue = selectElement.value.toLowerCase();
                const filteredCountries = data.filter(country => country.region.toLowerCase() === selectedValue);

                grid.innerHTML = createFilteredCountryCardsHTML(filteredCountries);

                if (filteredCountries.length > 0) {
                    localStorage.setItem("regionsName", JSON.stringify(filteredCountries));
                } else {
                    localStorage.removeItem("regionsName");
                }
            }

            inputField.addEventListener("input", searchCountry);
            selectElement.addEventListener("change", sortRegion);
            form.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent form submission
            });

            // Refresh the page and clear local storage on link click
            refreshLink.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent the default link behavior (navigating to a new URL)
                location.reload(); // Refresh the page
                localStorage.clear();
            });

            // Code to handle initial data load and button creation
            const clickedBase = localStorage.getItem("clickedBase");
            const countriesNameJSON = localStorage.getItem("CountriesName");
            const clickedFiltredCard = localStorage.getItem("clickedFilterCard");
            const filtredDataBase = localStorage.getItem("regionsName");
            const countriesName = JSON.parse(countriesNameJSON);
            const clickedIndex = parseInt(clickedBase);

            if (!countriesName && !clickedFiltredCard) {
                const countryData = data[clickedIndex];
                nativename.innerHTML = countryData.name;
                naming.innerHTML = countryData.name;
                popoulationNum.innerHTML = formatPopulationNumber(countryData.population);
                continent.innerHTML = countryData.region;
                subcontinent.innerHTML = countryData.subregion;
                capitalCity.innerHTML = countryData.capital;
                levelDomain.innerHTML = countryData.topLevelDomain[0];
                Currencies.innerHTML = countryData.currencies[0].name;
                LanguagesList.innerHTML = `${countryData.languages[0].iso639_1}, ${countryData.languages[0].iso639_2}`;
                countryIMG.src = countryData.flag;
                createButtons(countryData.borders);
            } else if (!clickedBase && !clickedFiltredCard) {
                const countryData = countriesName[0];
                nativename.innerHTML = countryData.name;
                naming.innerHTML = countryData.name;
                popoulationNum.innerHTML = formatPopulationNumber(countryData.population);
                continent.innerHTML = countryData.region;
                subcontinent.innerHTML = countryData.subregion;
                capitalCity.innerHTML = countryData.capital;
                levelDomain.innerHTML = countryData.topLevelDomain[0];
                Currencies.innerHTML = countryData.currencies[0].name;
                LanguagesList.innerHTML = `${countryData.languages[0].iso639_1}, ${countryData.languages[0].iso639_2}`;
                countryIMG.src = countryData.flag;
                createButtons(countryData.borders);
            } else {
                const dataFiltred = JSON.parse(filtredDataBase);
                const countryData = dataFiltred[clickedFiltredCard];
                nativename.innerHTML = countryData.name;
                naming.innerHTML = countryData.name;
                popoulationNum.innerHTML = formatPopulationNumber(countryData.population);
                continent.innerHTML = countryData.region;
                subcontinent.innerHTML = countryData.subregion;
                capitalCity.innerHTML = countryData.capital;
                levelDomain.innerHTML = countryData.topLevelDomain[0];
                Currencies.innerHTML = countryData.currencies[0].name;
                LanguagesList.innerHTML = `${countryData.languages[0].iso639_1}, ${countryData.languages[0].iso639_2}`;
                countryIMG.src = countryData.flag;
                createButtons(countryData.borders);
            }

            backBtn.addEventListener("click", function () {
                localStorage.clear();
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});
