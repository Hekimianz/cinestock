const newCont = document.querySelector(".new--cont");
const checkboxes = document.querySelectorAll(".tag--checkbox");
const selected = document.querySelectorAll(".tag--checkbox:checked");
const maxSelection = 3;
if (selected.length >= maxSelection) {
  checkboxes.forEach((cb) => {
    if (!cb.checked) {
      cb.disabled = true;
    }
  });
} else {
  checkboxes.forEach((cb) => {
    cb.disabled = false;
  });
}

const overlay = document.createElement("div");
overlay.style.position = "absolute";
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(0, 0, 0, .3)"; // Transparent
newCont.appendChild(overlay);

const adminPassword = document.querySelector(".admin--input");
const enterBtn = document.querySelector(".pass--btn");

adminPassword.addEventListener("input", () => {
  if (adminPassword.value === "670222") {
    overlay.style.display = "none";
    adminPassword.parentElement.style.display = "none";
    enterBtn.diabled = false;
  } else {
    enterBtn.disabled = true;
  }
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const selected = document.querySelectorAll(".tag--checkbox:checked");
    console.log(selected);
    if (selected.length >= maxSelection) {
      checkboxes.forEach((cb) => {
        if (!cb.checked) {
          cb.disabled = true;
        }
      });
    } else {
      checkboxes.forEach((cb) => {
        cb.disabled = false;
      });
    }
  });
});

console.log(checkboxes);
