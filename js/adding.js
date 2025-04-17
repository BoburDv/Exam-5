document.addEventListener("DOMContentLoaded", function(){
  if(!localStorage.getItem("user")){
    window.location.href = "../pages/login.html"
  }
})


async function addCar(object) {
  const token = JSON.parse(localStorage.getItem("user"))?.access_token;
  const req = await fetch("https://json-api.uz/api/project/fn37/cars",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(object)
  });
  const res = await req.json()
  if (req.status === 200){
    return res
  }
}


// Formadan malumot olish
document.getElementById("addForm").addEventListener("submit", function (e){
  e.preventDefault()
  const formData = new FormData(this)
  const car = {
    name: formData.get("username"),
    price: formData.get("text"),
    description: formData.get("desc")
  }

  
  // ish statusi
  addCar(car)
    .then((res) => {
      const toast = document.getElementById("toast-top-right")
      toast.querySelector("div").textContent = "Muvoffaqiyatli qo'shildi!"
        toast.classList.remove("hidden")
        localStorage.setItem("user", JSON.stringify(res))
        setTimeout(() => {
          toast.classList.add("hidden")
          window.location.href = "../index.html"
        }, 1500)
    })
    .catch((err) => {
      console.error("Xatolik", err.message)
    })
})