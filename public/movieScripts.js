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
    if (node.parentElement.classList[0]) {
      node.parentElement.classList.add("hiddenPass");
    } else {
      node.parentElement.parentElement.classList.add("hiddenPass");
    }
  })
);

updatePass.addEventListener("input", (e) => {
  if (e.target.value == pass) {
    updateBtn.removeAttribute("disabled");
  } else {
    updateBtn.disabled = true;
  }
});

deletePass.addEventListener("input", (e) => {
  if (e.target.value == pass) {
    deleteBtn.removeAttribute("disabled");
  } else {
    deleteBtn.disabled = true;
  }
});
