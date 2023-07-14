import { createTableRow } from "./createTableRow.js";

let isInitialLoad = true;

export function renderTable(clients) {
  const tableBody = document.querySelector(".table__body");
  const tableHeader = document.querySelector(".table__header-row");

  if (isInitialLoad) {
    const headers = [
      { columnName: "id", label: "ID", sortable: true },
      { columnName: "name", label: "Фамилия Имя Отчество", sortable: true },
      {
        columnName: "createdAt",
        label: "Дата и время создания",
        sortable: true,
      },
      { columnName: "updatedAt", label: "Последние изменения", sortable: true },
      { columnName: "contacts", label: "Контакты" },
      { columnName: "actions", label: "Действия" },
    ];

    headers.forEach((header, index) => {
      const th = document.createElement("th");
      th.classList.add("table__header");

      const span = document.createElement("span");
      span.classList.add("table__header-span");
      span.textContent = header.label;
      th.append(span);

      if (header.sortable) {
        const arrow = document.createElement("div");
        arrow.classList.add("sort-arrow");
        arrow.dataset.column = header.columnName;
        th.append(arrow);

        if (index === 1) {
          const text = document.createElement("span");
          text.classList.add("sort-text");
          text.textContent = "А-Я";
          th.append(text);
        }

        th.addEventListener("click", () => {
          handleSortClick(header.columnName);
        });
      }

      tableHeader.appendChild(th);
    });

    isInitialLoad = false;
  }

  sortTable("id", "asc");

  const idColumnHeader = tableHeader
    .querySelector('.sort-arrow[data-column="id"]')
    .closest(".table__header");
  idColumnHeader.classList.add("active");

  tableBody.innerHTML = "";

  clients.forEach((client) => {
    const row = createTableRow(client);
    tableBody.appendChild(row);
  });

  const idLinks = document.querySelectorAll(".cell__id a");
  idLinks.forEach((link) => {
    link.addEventListener("click", (evt) => {
      evt.preventDefault();
      const clientId = link.textContent;
      window.location.hash = `#${clientId}`;
    });
  });

  function handleSortClick(columnName) {
    const currentSortOrder = getSortOrder(columnName);
    const newSortOrder = currentSortOrder === "asc" ? "desc" : "asc";

    sortTable(columnName, newSortOrder);
    updateSortArrow(columnName, newSortOrder);
  }

  function getSortOrder(columnName) {
    const sortArrow = document.querySelector(
      `.sort-arrow[data-column="${columnName}"]`
    );
    return sortArrow.classList.contains("asc") ? "asc" : "desc";
  }

  function sortTable(columnName, sortOrder) {
    clients.sort((clientA, clientB) => {
      const valueA = getValue(clientA, columnName);
      const valueB = getValue(clientB, columnName);

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      } else if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });

    tableBody.innerHTML = "";

    clients.forEach((client) => {
      const row = createTableRow(client);
      tableBody.appendChild(row);
    });

    updateSortArrow(columnName, sortOrder);
  }

  function getValue(client, columnName) {
    if (columnName === "name") {
      const { surname, name, lastname } = client;
      return `${surname} ${name} ${lastname}`.trim();
    }

    return client[columnName] ? String(client[columnName]).trim() : "";
  }

  function updateSortArrow(columnName, sortOrder) {
    const sortArrow = document.querySelector(
      `.sort-arrow[data-column="${columnName}"]`
    );
    const sortText = sortArrow.parentNode.querySelector(".sort-text");

    sortArrow.classList.toggle("asc", sortOrder === "asc");
    sortArrow.classList.toggle("desc", sortOrder === "desc");

    if (columnName === "name") {
      sortText.textContent = sortOrder === "asc" ? "А-Я" : "Я-А";
    }

    const tableHeader = document.querySelector(".table__header-row");
    const columnHeaders = tableHeader.querySelectorAll(".table__header");
    columnHeaders.forEach((header) => {
      if (header === sortArrow.parentNode) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }
    });
  }
}
