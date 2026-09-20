let items = [];

function addItem() {
  const input = document.getElementById("input");
  const item = input.value.trim();

  if (item === "") {
    return;
  }

  if (items.includes(item)) {
    alert(item + " is already on the list");
    return;
  }

  items.push(item);
  input.value = "";
  input.focus();
  render();
}

function deleteItem(name) {
  const index = items.indexOf(name);
  if (index !== -1) {
    items.splice(index, 1);
  }

  render();
}

function render() {
  const tbody = document.getElementById("table-body");
  tbody.textContent = "";

  for (const item of items) {
    const trow = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item;

    const buttonCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteItem(item);
    });

    buttonCell.appendChild(deleteBtn);
    trow.appendChild(nameCell);
    trow.appendChild(buttonCell);
    tbody.appendChild(trow);
  }
}

render();
