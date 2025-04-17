document.addEventListener("DOMContentLoaded", function(){
  if(!localStorage.getItem("user")){
    window.location.href = "./pages/login.html"
  }
})
const LOADER = document.getElementById("loader")
const CONTAIN = document.getElementById("contain")


// Card main malumotlari uchun ===========================>
fetch("https://json-api.uz/api/project/fn37/cars")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    ui(res);
  });
function ui({data}){
  LOADER.classList.add("hidden");
  data.forEach((element) => {
    const { id, description, price, name } = element;
    CONTAIN.innerHTML += `
       <li>
          <div class="max-w-sm p-8 bg-white border border-gray-200 rounded-2xl shadow-shadow shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
          <h5 class="mb-3 text-3xl font-bold tracking-tight text-gray-700 dark:text-white">${name}</h5>
          </a>
          <p class="mb-4 font-normal text-gray-700 line-clamp-2 dark:text-gray-400">${description}</p>
          <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          ${price}
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          </a>
          <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          ${id}
          </a>
          </div>
       </li>
    `
  })
  
  CONTAIN.classList.remove("hidden");
  CONTAIN.classList.toggle("grid");
}