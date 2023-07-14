import { openModalWithForm } from "./openModalWithForm.js";
import { openDeleteConfirmationModal } from "./openDeleteConfirmationModal.js";
import { onDelete } from "./handlers.js";
import { showTooltip, hideTooltip } from "./tooltip.js";

const contactIconClasses = {
  Телефон: "phone-icon",
  Email: "email-icon",
  Facebook: "facebook-icon",
  VK: "vk-icon",
  Twitter: "twitter-icon",
  Instagram: "instagram-icon",
  Telegram: "telegram-icon",
};

function createIdCell(client) {
  const idCell = document.createElement("td");

  const idLink = document.createElement("a");
  idLink.href = `#${client.id}`;
  idLink.target = "_blank";
  idLink.textContent = client.id;
  idLink.classList.add("cell__id");

  idCell.appendChild(idLink);
  return idCell;
}

function createNameCell(client) {
  const nameCell = document.createElement("td");
  nameCell.textContent = `${client.surname} ${client.name} ${client.lastName}`;
  nameCell.classList.add("cell__name");
  return nameCell;
}

function createDateTimeCell(dateTime) {
  const cell = document.createElement("td");
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
  });
  cell.innerHTML = `<span class="cell__date">${date}</span><span class="cell__time">${time}</span>`;
  cell.classList.add("created-at-cell");
  return cell;
}

function createContactsCell(client) {
  const contactsCell = document.createElement("td");
  contactsCell.classList.add("cell__contacts");

  if (client.contacts && client.contacts.length > 0) {
    client.contacts.forEach((contact) => {
      const icon = document.createElement("span");
      icon.classList.add(
        "contact-icon",
        contactIconClasses[contact.type] || "default-icon"
      );

      icon.setAttribute("data-tooltip", `${contact.type}: ${contact.value}`);
      icon.addEventListener("mouseenter", showTooltip);
      icon.addEventListener("mouseleave", hideTooltip);

      contactsCell.appendChild(icon);
    });
  }

  return contactsCell;
}

function createEditButton(client) {
  const editButton = document.createElement("button");
  editButton.textContent = "Изменить";
  editButton.classList.add("edit-button");

  const editIcon = document.createElement("span");
  editIcon.classList.add("button-icon", "edit-icon");
  editButton.insertBefore(editIcon, editButton.firstChild);

  editButton.addEventListener("click", async () => {
    handleEditButtonClick(client, editIcon);
  });

  return editButton;
}

function createDeleteButton(client) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Удалить";
  deleteButton.classList.add("delete-button");

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("button-icon", "delete-icon");
  deleteButton.insertBefore(deleteIcon, deleteButton.firstChild);

  deleteButton.addEventListener("click", () => {
    handleDeleteButtonClick(client);
  });

  return deleteButton;
}

// async function handleEditButtonClick(client, editIcon) {
//   editIcon.classList.add("loading-icon");
//   try {
//     const updatedClient = await getClientDataAPI(client.id);
//     openModalWithForm(updatedClient);
//   } catch (error) {
//     console.error("Ошибка при получении данных клиента:", error);
//   } finally {
//     editIcon.classList.remove("loading-icon");
//   }
// }

function handleEditButtonClick(client) {
  openModalWithForm(client);
}

function handleDeleteButtonClick(client) {
  openDeleteConfirmationModal(client, { onDelete });
}

export function createTableRow(client) {
  const row = document.createElement("tr");
  row.classList.add("table-row");
  row.dataset.contactId = client.id;

  const idCell = createIdCell(client);
  const nameCell = createNameCell(client);
  const createdAtCell = createDateTimeCell(new Date(client.createdAt));
  const updatedAtCell = createDateTimeCell(new Date(client.updatedAt));
  const contactsCell = createContactsCell(client);
  const actionsCell = document.createElement("td");
  actionsCell.classList.add("cell__actions");

  const editButton = createEditButton(client);
  actionsCell.appendChild(editButton);

  const deleteButton = createDeleteButton(client);
  actionsCell.appendChild(deleteButton);

  row.append(
    idCell,
    nameCell,
    createdAtCell,
    updatedAtCell,
    contactsCell,
    actionsCell
  );

  return row;
}
