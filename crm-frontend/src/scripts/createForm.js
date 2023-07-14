import { onSave, onDelete } from "./handlers.js";
import { createFormFields } from "./createFormFields.js";
import { createContact } from "./createContact.js";
import { openDeleteConfirmationModal } from "./openDeleteConfirmationModal.js";
import { validateForm } from "./validation.js";
import { createButton } from "./createButton.js";
import { closeModal } from "./modal.js";
import { formatLetters } from "./utils.js";

export function createForm(client, modalElement, overlay) {
  const form = document.createElement("form");
  form.classList.add("form");

  createFormFields(form, client);
  createAddContactButton(form);
  createContacts(form, client);
  createSaveButton(form, client, modalElement, overlay);
  createDeleteOrCancelButton(form, client, modalElement, overlay);

  form.addEventListener("input", () => {
    const isValid = validateForm(form);
    form.querySelector(".primary-button").disabled = !isValid;
  });

  return form;
}

function createAddContactButton(form) {
  const addContactButton = document.createElement("button");
  addContactButton.classList.add("form__add-contact-button");
  addContactButton.textContent = "Добавить контакт";

  addContactButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    const contact = createContact();
    let contactsBox = form.querySelector(".contacts-box");

    if (!contactsBox) {
      contactsBox = document.createElement("div");
      contactsBox.classList.add("contacts-box");
      form.insertBefore(contactsBox, addContactButton);
    }

    contactsBox.append(contact);

    const contactCount = form.querySelectorAll(".form__contact").length;
    if (contactCount >= 10) {
      addContactButton.style.display = "none";
    }
  });

  form.append(addContactButton);
}

function createContacts(form, client) {
  if (client && client.contacts && client.contacts.length > 0) {
    const contactsBox = document.createElement("div");
    contactsBox.classList.add("contacts-box");

    client.contacts.forEach((contact) => {
      const contactElement = createContact();
      const typeInput = contactElement.querySelector(".custom-select__input");
      const valueInput = contactElement.querySelector(".form__contact-input");

      typeInput.value = contact.type;
      valueInput.value = contact.value;

      contactsBox.appendChild(contactElement);
    });

    form.insertBefore(
      contactsBox,
      form.querySelector(".form__add-contact-button")
    );
  }
}

export function createSaveButton(form, client, modalElement, overlay) {
  const saveButton = createButton("Сохранить", "primary");

  saveButton.addEventListener("click", (evt) =>
    handleClick(evt, form, client, modalElement, overlay)
  );

  form.append(saveButton);
}

async function handleClick(evt, form, client, modalElement, overlay) {
  evt.preventDefault();

  if (validateForm(form)) {
    const saveButton = form.querySelector(".primary-button");
    const originalButtonText = saveButton.textContent;
    saveButton.textContent = client
      ? "Данные обновляются..."
      : "Идет добавление нового клиента...";

    const newClient = collectClientData(form);

    try {
      await onSave(newClient, !client || !client.id, client?.id);
      closeModal(modalElement, overlay);
    } catch (error) {
      console.error("Ошибка при сохранении клиента:", error);
    } finally {
      saveButton.textContent = originalButtonText;
    }
  }
}

function collectClientData(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const formattedData = {
    name: formatLetters(data.name),
    surname: formatLetters(data.surname),
    lastName: formatLetters(data.lastName),
  };

  const contactElements = form.querySelectorAll(".form__contact");
  const contacts = [];

  contactElements.forEach((contactElement) => {
    const typeInput = contactElement.querySelector(".custom-select__input");
    const valueInput = contactElement.querySelector(".form__contact-input");

    const contact = {
      type: typeInput.value,
      value: valueInput.value,
    };

    contacts.push(contact);
  });

  return {
    ...formattedData,
    contacts: contacts,
  };
}

function createDeleteOrCancelButton(form, client, modalElement, overlay) {
  if (client) {
    const deleteButton = createButton("Удалить клиента", "flat");
    deleteButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      closeModal(modalElement, overlay);
      openDeleteConfirmationModal(client);
    });
    form.append(deleteButton);
  } else {
    const cancelButton = createButton("Отменить", "flat");
    cancelButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      closeModal(modalElement, overlay);
    });
    form.append(cancelButton);
  }
}
