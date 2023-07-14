import { getClientDataAPI } from "./api.js";
import { openModalWithForm } from "./openModalWithForm.js";

export function checkBodyOverflow() {
  const bodyHeight = document.body.offsetHeight;
  const windowHeight = window.innerHeight;

  const isBodyOverflow = bodyHeight > windowHeight;

  addClientButton.classList.toggle("secondary-button", !isBodyOverflow);
  addClientButton.classList.toggle("float-button", isBodyOverflow);

  const textSpan = addClientButton.querySelector("span");
  if (textSpan) {
    textSpan.textContent = isBodyOverflow ? "" : "Добавить клиента";
  }
}

export function handleHashChange() {
  const clientId = window.location.hash.slice(1);
  if (clientId) {
    getClientData(clientId);
  }
}

async function getClientData(clientId) {
  try {
    const client = await getClientDataAPI(clientId);
    if (client) {
      openModalWithForm(client);
    } else {
      console.log(`Клиент с id ${clientId} не найден.`);
    }
  } catch (error) {
    console.error(
      `Ошибка при получении данных клиента с id ${clientId}:`,
      error
    );
  }
}

export function formatLetters(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
