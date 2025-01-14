document.addEventListener("DOMContentLoaded", () => {
  const filterBtn = document.querySelector(".filter--btn");
  const filtersCont = document.querySelector(".filters--cont");
  filterBtn.addEventListener("click", () => {
    if (filtersCont.classList.contains("hidden")) {
      // Measure the content's natural height
      const contentHeight = filtersCont.scrollHeight + "px";

      // Apply dynamic height for the transition
      filtersCont.style.maxHeight = contentHeight;

      // Make it visible
      filtersCont.classList.remove("hidden");
      filtersCont.classList.add("visible");

      // Remove the inline style after the transition ends
      filtersCont.addEventListener(
        "transitionend",
        () => {
          filtersCont.style.maxHeight = "none";
        },
        { once: true }
      );
    } else {
      // Set the max-height back to its current height for a smooth collapse
      filtersCont.style.maxHeight = filtersCont.scrollHeight + "px";

      // Trigger reflow to ensure the height is applied
      filtersCont.offsetHeight; // This forces a repaint

      // Collapse the element
      filtersCont.style.maxHeight = "0";
      filtersCont.classList.remove("visible");
      filtersCont.classList.add("hidden");
    }
  });
});
