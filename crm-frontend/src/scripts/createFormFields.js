function createFormField(labelText, type, name, value, placeholderText) {
  const fieldContainer = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = labelText;
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.value = value;
  input.placeholder = placeholderText;
  fieldContainer.append(input, label);

  return fieldContainer;
}
export function createFormFields(form, client) {
  const surnameInputBox = createFormField(
    "Фамилия",
    "text",
    "surname",
    client ? client.surname : "",
    " "
  );

  const nameInputBox = createFormField(
    "Имя",
    "text",
    "name",
    client ? client.name : "",
    " "
  );

  const lastNameInputBox = createFormField(
    "Отчество",
    "text",
    "lastName",
    client ? client.lastName : "",
    " "
  );

  [surnameInputBox, nameInputBox].forEach((inputBox) => {
    inputBox.querySelector("label").classList.add("form__label--required");
  });

  [surnameInputBox, nameInputBox, lastNameInputBox].forEach((inputBox) => {
    inputBox.classList.add("form__inputbox");
  });

  form.append(surnameInputBox, nameInputBox, lastNameInputBox);
}
