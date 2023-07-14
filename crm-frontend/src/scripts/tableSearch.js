import { renderTable } from "./renderTable.js";

export function tableSearch(searchInput, clients) {
  let searchResults = [];
  let currentIndex = -1;
  let searchTimerId = null;

  const autocompleteList = createAutocompleteList();
  const autocompleteContainer = document.createElement("div");
  autocompleteContainer.classList.add("header__autocomplete");
  searchInput.parentNode.appendChild(autocompleteContainer);

  searchInput.addEventListener("input", handleSearchInput);
  searchInput.addEventListener("keydown", handleSearchKeyDown);

  function handleSearchInput() {
    const query = searchInput.value.trim();
    clearTimeout(searchTimerId);

    searchTimerId = setTimeout(() => {
      if (query) {
        searchResults = searchContacts(query, clients);
        renderAutocompleteList(searchResults);
      } else {
        clearAutocompleteList();
        clearTableHighlight();
      }
    }, 300);
  }

  function handleSearchKeyDown(event) {
    if (searchResults.length === 0) return;

    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        navigateSearchResults("up");
        break;
      case "ArrowDown":
        event.preventDefault();
        navigateSearchResults("down");
        break;
      case "Enter":
        event.preventDefault();
        selectContact();
        break;
    }
  }

  function searchContacts(query, clients) {
    return clients.filter((client) => {
      const name =
        `${client.surname} ${client.name} ${client.lastName}`.toLowerCase();
      return name.includes(query.toLowerCase());
    });
  }

  function createAutocompleteList() {
    const list = document.createElement("ul");
    list.classList.add("header__autocomplete-list");
    return list;
  }

  function clearAutocompleteList() {
    autocompleteList.innerHTML = "";
    autocompleteContainer.style.display = "none";
  }

  function renderAutocompleteList(results) {
    autocompleteList.innerHTML = "";
    results.forEach((result, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${result.surname} ${result.name}`;
      listItem.classList.add("header__autocomplete-item");
      listItem.addEventListener("click", () => {
        handleAutocompleteItemClick(index);
      });
      autocompleteList.appendChild(listItem);
    });

    autocompleteContainer.innerHTML = "";
    autocompleteContainer.appendChild(autocompleteList);
    autocompleteContainer.style.display = results.length > 0 ? "block" : "none";
  }

  function handleAutocompleteItemClick(index) {
    currentIndex = index;
    highlightAutocompleteItem();
    scrollToContact(searchResults[currentIndex]);
    selectContact();
  }

  function navigateSearchResults(direction) {
    const maxIndex = searchResults.length - 1;

    if (direction === "up") {
      currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    } else if (direction === "down") {
      currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    }

    highlightAutocompleteItem();
    scrollToContact(searchResults[currentIndex]);
  }

  function highlightAutocompleteItem() {
    const items = autocompleteList.querySelectorAll(
      ".header__autocomplete-item"
    );
    items.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  function scrollToContact(contact) {
    const table = document.querySelector(".table");
    const contactId = contact.id;
    const contactRow = document.querySelector(
      `[data-contact-id="${contactId}"]`
    );

    if (table && contactRow) {
      table.scrollTo({
        top: contactRow.offsetTop,
        behavior: "smooth",
      });
    }
  }

  function selectContact() {
    const tableRows = document.querySelectorAll(".table-row");
    tableRows.forEach((row) => {
      row.classList.remove("highlighted");
    });

    if (currentIndex >= 0 && currentIndex < searchResults.length) {
      const selectedContact = searchResults[currentIndex];
      const selectedRow = document.querySelector(
        `[data-contact-id="${selectedContact.id}"]`
      );
      if (selectedRow) {
        selectedRow.classList.add("highlighted");
      }
    }
  }

  function clearTableHighlight() {
    const tableRows = document.querySelectorAll(".table-row");
    tableRows.forEach((row) => {
      row.classList.remove("highlighted");
    });
  }

  renderTable(clients);
}
