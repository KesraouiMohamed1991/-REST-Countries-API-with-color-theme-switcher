const toggle = document.querySelectorAll('.dark-toggle')

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".grid-system");

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      for (let index = 0; index < data.length; index++) {
        const piece = `
                    <a href="./full-page.html" target="">

    <div data-index="${data[index].numericCode}" class=" clicked shadow-md yes bg-white dark:bg-gray-700 dark:text-slate-300  ">
        <div class="w-full h-full bg-red-500 overflow-hidden">
            <img class=" h-full md:h-48 object-cover w-full photo " src="${data[index].flags.svg}" alt="" />
        </div>
    
        <div class="countryy h-1/2 w-[90%] sm:h-1/2 sm:w-full p-6 font-bold">
            <h1 class="py-2 name">${data[index].name}</h1>
            <h6>
                Population: <span class="font-thin population">${data[index].population}</span>
            </h6>
            <h6 class="py-2">
                Region: <span class="font-thin region">${data[index].region}</span>
            </h6>
            <h6>Capital: <span class="font-thin capital">${data[index].capital}</span></h6>
        </div>
    </div>

</a>
                        `;
        grid.innerHTML += piece; // Append each piece to the container
      }


      const countryCard = document.querySelectorAll(".clicked");
      countryCard.forEach((card) => {
        card.addEventListener("click", (e) => {
          const clickedBase = Array.from(countryCard).indexOf(card);
          console.log(clickedBase);
          localStorage.setItem("clickedBase", clickedBase); // Store the index in local storage
        });
      });
    })

    .catch((error) => {
      console.log("Error fetching data:", error);
    });
});

// to refresh the page
const refreshLink = document.getElementById("refreshLink");
refreshLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior (navigating to a new URL)
  location.reload(); // Refresh the 
  localStorage.clear()

});



toggle.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    document.documentElement.classList.toggle('dark')
  })
})
  


console.log(toggle)
