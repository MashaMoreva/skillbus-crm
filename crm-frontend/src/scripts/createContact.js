export function createContact() {
  const contact = document.createElement("div");
  contact.classList.add("form__contact");

  const customSelect = document.createElement("div");
  customSelect.classList.add("custom-select");
  contact.appendChild(customSelect);

  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("custom-select__input");
  input.readOnly = true;
  input.value = "Телефон";
  customSelect.appendChild(input);

  const contactInput = document.createElement("input");
  contactInput.type = "text";
  contactInput.classList.add("form__contact-input");
  contact.appendChild(contactInput);

  const options = document.createElement("ul");
  options.classList.add("custom-select__options");
  customSelect.appendChild(options);

  const contactTypes = [
    "Телефон",
    "Email",
    "Facebook",
    "VK",
    "Telegram",
    "Twitter",
    "Instagram",
    "Другое",
  ];
  contactTypes.forEach((type) => {
    const option = document.createElement("li");
    option.classList.add("custom-select__option");
    option.textContent = type;
    options.appendChild(option);
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("form__contact-delete-button");
  contact.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    contact.remove();
  });

  customSelect.addEventListener("click", () => {
    customSelect.classList.toggle("open");
  });

  options.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("custom-select__option")) {
      input.value = evt.target.textContent;
      customSelect.classList.toggle("open");
    }
  });

  return contact;
}
