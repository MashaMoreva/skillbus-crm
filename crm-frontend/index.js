import { getClientsAPI } from "./src/scripts/api.js";
import { tableSearch } from "./src/scripts/tableSearch.js";
import { renderTable } from "./src/scripts/renderTable.js";
import { createAddClientButton } from "./src/scripts/createButton.js";
import { checkBodyOverflow, handleHashChange } from "./src/scripts/utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.getElementById("loader");
  const searchInput = document.querySelector(".header__search");
  const content = document.querySelector(".content");

  try {
    loader.classList.add("loader--visible");
    const clients = await getClientsAPI();
    loader.classList.remove("loader--visible");

    window.addEventListener("hashchange", handleHashChange);

    handleHashChange();
    tableSearch(searchInput, clients);
    renderTable(clients);

    const addClientButton = createAddClientButton();
    content.append(addClientButton);

    checkBodyOverflow();
  } catch (error) {
    console.error("Ошибка при получении списка клиентов:", error);
  }
});
