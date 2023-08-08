const nativename = document.querySelector(".nativename");
const naming = document.querySelector(".naming");
const continent = document.querySelector(".continent");
const subcontinent = document.querySelector(".subcontinent");
const capitalCity = document.querySelector(".capitalCity");
const levelDomain = document.querySelector(".levelDomain");
const Currencies = document.querySelector(".Currencies");
const LanguagesList = document.querySelector(".Languages");
const popoulationNum = document.querySelector(".population");
const countryIMG = document.querySelector(".countryIMG");
const backbtn = document.querySelector(".backbtn");
const btnContainer = document.querySelector('.btn-container')


document.addEventListener("DOMContentLoaded", function () {

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {

      const clickedBase = localStorage.getItem("clickedBase");
      const countriesNameJSON = localStorage.getItem("CountriesName");
      const clickedFiltredCard = localStorage.getItem("clickedFilterCard");
      const filtredDataBase = localStorage.getItem("regionsName");

      const countriesName = JSON.parse(countriesNameJSON);

      if (
        localStorage.getItem("CountriesName") === null &&
        localStorage.getItem("clickedFilterCard") === null
      ) {
        const clickedIndex = parseInt(clickedBase);
        nativename.innerHTML = data[clickedIndex].name;
        naming.innerHTML = data[clickedIndex].name;
        function formatPopulationNumber(number) {
          return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        const populationNumber = data[clickedIndex].population;
        popoulationNum.innerHTML = formatPopulationNumber(populationNumber);
        continent.innerHTML = data[clickedIndex].region;
        subcontinent.innerHTML = data[clickedIndex].subregion;
        capitalCity.innerHTML = data[clickedIndex].capital;
        levelDomain.innerHTML = data[clickedIndex].topLevelDomain[0];
        Currencies.innerHTML = data[clickedIndex].currencies[0].name;
        LanguagesList.innerHTML = `${data[clickedIndex].languages[0].iso639_1} ,
                 ${data[clickedIndex].languages[0].iso639_2}`;
        countryIMG.src = data[clickedIndex].flag;

        const insertBtn = (data) => {
          if (!data || data.length === 0) {
            // If there are no borders, display a message
            btnContainer.innerHTML = "This country has no borders, or it's an island.";
          } else {
            // If there are borders, create buttons as before
            let btn = ""; // Define btn variable outside the loop

            for (let index = 0; index < data.length; index++) {
              // Concatenate each button to the btn variable
              btn += `<button type="button" class="button py-2 px-4 mr-2 mb-1 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">${data[index]}</button>`;
            }

            btnContainer.innerHTML = btn; // Insert all buttons into btnContainer
          }
        };

        insertBtn(data[clickedIndex].borders);


        
      } else if (
        localStorage.getItem("clickedBase") === null &&
        localStorage.getItem("clickedFilterCard") === null
      ) {
        nativename.innerHTML = countriesName[0].name;
        naming.innerHTML = countriesName[0].name;
        function formatPopulationNumber(number) {
          return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        // Assuming data[clickedIndex].population is a number
        const populationNumber = countriesName[0].population;
        popoulationNum.innerHTML = formatPopulationNumber(populationNumber);
        continent.innerHTML = countriesName[0].region;
        subcontinent.innerHTML = countriesName[0].subregion;
        capitalCity.innerHTML = countriesName[0].capital;
        levelDomain.innerHTML = countriesName[0].topLevelDomain[0];
        Currencies.innerHTML = countriesName[0].currencies[0].name;
        LanguagesList.innerHTML = `${countriesName[0].languages[0].iso639_1} ,
                 ${countriesName[0].languages[0].iso639_2}`;
        countryIMG.src = countriesName[0].flag;


        const insertBtn = (data) => {
          if (!data || data.length === 0) {
            // If there are no borders, display a message
            btnContainer.innerHTML = "This country has no borders.";
          } else {
            // If there are borders, create buttons as before
            let btn = ""; // Define btn variable outside the loop

            for (let index = 0; index < data.length; index++) {
              // Concatenate each button to the btn variable
              btn += `<button type="button" class="button py-2 px-4 mr-2 mb-1 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">${data[index]}</button>`;
            }

            btnContainer.innerHTML = btn; // Insert all buttons into btnContainer
          }
        };


        insertBtn(countriesName[0].borders);






       


      } else {
        const dataFiltred = JSON.parse(filtredDataBase);

        const clickedFilredNAme = JSON.parse(clickedFiltredCard);

        nativename.innerHTML = dataFiltred[clickedFiltredCard].name;
        naming.innerHTML = dataFiltred[clickedFiltredCard].name;
        function formatPopulationNumber(number) {
          return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        const populationNumber = dataFiltred[clickedFiltredCard].population;
        popoulationNum.innerHTML = formatPopulationNumber(populationNumber);
        continent.innerHTML = dataFiltred[clickedFiltredCard].region;
        subcontinent.innerHTML = dataFiltred[clickedFiltredCard].subregion;
        capitalCity.innerHTML = dataFiltred[clickedFiltredCard].capital;
        levelDomain.innerHTML =
          dataFiltred[clickedFiltredCard].topLevelDomain[0];
        Currencies.innerHTML =
          dataFiltred[clickedFiltredCard].currencies[0].name;
        LanguagesList.innerHTML = `${dataFiltred[clickedFiltredCard].languages[0].iso639_1} ,
                 ${dataFiltred[clickedFiltredCard].languages[0].iso639_2}`;
        countryIMG.src = dataFiltred[clickedFiltredCard].flag;

        console.log(dataFiltred[clickedFiltredCard].borders)

// the borders function

        const insertBtn = (data) => {
          if (!data || data.length === 0) {
            // If there are no borders, display a message
            btnContainer.innerHTML = "This country has no borders.";
          } else {
            // If there are borders, create buttons as before
            let btn = ""; // Define btn variable outside the loop

            for (let index = 0; index < data.length; index++) {
              // Concatenate each button to the btn variable
              btn += `<button type="button" class="button py-2 px-4 mr-2 mb-1 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">${data[index]}</button>`;
            }

            btnContainer.innerHTML = btn; // Insert all buttons into btnContainer
          }
        };


        insertBtn(dataFiltred[clickedFiltredCard].borders);

        
        




 
      }
      backbtn.addEventListener("click", function () {
        localStorage.removeItem("clickedBase");
        localStorage.removeItem("CountriesName");
        localStorage.removeItem("clickedFilterCard");
        localStorage.clear()
      });




    }
    
      )
    
    .catch((error) => {
      console.error();
      "Error fetching data:", error;
    });
});


