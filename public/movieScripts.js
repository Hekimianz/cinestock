const pass = 670222;
const updateBtn = document.querySelector(".update--password button");
const deleteBtn = document.querySelector(".delete--password button");
const updatePass = document.querySelector(".update--password input");
const deletePass = document.querySelector(".delete--password input");

document.querySelector(".single--edit").addEventListener("click", () => {
  document.querySelector(".update--password").classList.remove("hiddenPass");
});

document.querySelector(".single--delete").addEventListener("click", () => {
  document.querySelector(".delete--password").classList.remove("hiddenPass");
});

document.querySelectorAll(".close").forEach((node) =>
  node.addEventListener("click", () => {
    node.parentElement.parentElement.classList.add("hiddenPass");
  })
);

document.addEventListener("DOMContentLoaded", function () {
  const errorNotification = document.querySelector(".error--notification");
  const errorText = errorNotification.querySelector("p");
  console.log(errorText.innerHTML);
  if (errorNotification && errorText.innerHTML.length > 0) {
    errorNotification.classList.add("show");
    setTimeout(() => {
      errorNotification.classList.remove("show");
    }, 3000);
  }
});
