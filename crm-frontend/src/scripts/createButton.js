import { openModalWithForm } from "./openModalWithForm.js";

export function createButton(text, style) {
  const button = document.createElement("button");
  button.textContent = text;

  switch (style) {
    case "primary":
      button.classList.add("primary-button");
      break;
    case "secondary":
      button.classList.add("secondary-button");
      break;
    case "flat":
      button.classList.add("flat-button");
      break;
    default:
      break;
  }

  return button;
}

export function createAddClientButton() {
  const addClientButton = document.createElement("button");
  const textAddClientButton = document.createElement("span");
  addClientButton.id = "addClientButton";
  addClientButton.classList.add("secondary-button");
  textAddClientButton.textContent = "Добавить клиента";

  const addIcon = document.createElement("img");
  addIcon.src = "./src/images/add.svg";
  addIcon.alt = "Иконка добавления клиента";

  addClientButton.append(addIcon, textAddClientButton);

  addClientButton.addEventListener("click", () => {
    openModalWithForm(null);
  });

  return addClientButton;
}
