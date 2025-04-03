const sortableList = document.querySelector(".sortable-list");
const sortableItems = document.querySelectorAll(".sortable-item");

let draggedItem = null;

sortableItems.forEach((item, index) => {
  item.setAttribute("data-index", index);

  item.addEventListener("dragstart", function () {
    draggedItem = this;
    setTimeout(() => {
      this.classList.add("dragging");
    }, 0);
  });

  item.addEventListener("dragend", function () {
    this.classList.remove("dragging");
    draggedItem = null;
    updateItemNumbers();
  });

  item.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  item.addEventListener("dragenter", function (e) {
    e.preventDefault();

    if (this !== draggedItem) {
      const rect = this.getBoundingClientRect();
      const mouseY = e.clientY;

      if (mouseY < rect.top + rect.height / 2) {
        sortableList.insertBefore(draggedItem, this);
      } else {
        sortableList.insertBefore(draggedItem, this.nextSibling);
      }
    }
  });
});

function updateItemNumbers() {
  const items = document.querySelectorAll(".sortable-item");
  items.forEach((item, index) => {
    const numberElement = item.querySelector(".sortable-item-number");
    numberElement.textContent = index + 1;
  });
}
