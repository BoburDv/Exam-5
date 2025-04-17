const FORM = document.getElementById("form");
const REMEMBER = document.getElementById("remember");

// formadan malumot olish ===========================>
FORM.addEventListener("submit", function (e){
  e.preventDefault();

  const formData = new FormData(e.target);

  const result = {}
  for (const [key, value] of formData.entries()){
    result[key] = value;
  }
  const checker = validator(result)

  if (checker) {
    const toast = document.getElementById("toast-top-right");
    toast.querySelector("div").textContent = checker.message;
    toast.classList.remove("hidden")
    setTimeout(() => {
      toast.classList.add("hidden")
    }, 2500);

    e.target[checker.target].focus()
  } else {
    login(result);

    if (REMEMBER.checked) {
      localStorage.setItem("user", JSON.stringify(result))
    }
  }
})


// input tekshiruvi ===========================>
export function validator(object) {
  if (object.username.trim() == ""){
    return {target: "username", message: "Foydalanuvchi nomini kiriting!"}
  }
  if (object.password.trim() == ""){
    return {target: "password", message: "Foydalanuvchi parolini kiriting!"}
  }
  return false;
}


// Login Api ===========================>
function login(user) {
  fetch("https://json-api.uz/api/project/fn37/auth/login",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      const toast = document.getElementById("toast-top-right");

      if (res.access_token) {
        toast.querySelector("div").textContent = "Kirish muvaffaqiyatli"
        toast.classList.remove("hidden")
        localStorage.setItem("user", JSON.stringify(res))
        setTimeout(() => {
          toast.classList.add("hidden")
          window.location.href = "../index.html"
        }, 1500);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
