export function validateForm(form) {
  let isValid = true;

  const errorMessages = form.querySelectorAll(".form__error-message");
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });

  const surnameInput = form.querySelector('input[name="surname"]');
  const surnameInputBox = surnameInput.closest(".form__inputbox");
  if (surnameInput.value.trim() === "") {
    displayErrorMessage(surnameInputBox, "Поле обязательно для заполнения");
    isValid = false;
    surnameInputBox.classList.add("error");
  }

  const nameInput = form.querySelector('input[name="name"]');
  const nameInputBox = nameInput.closest(".form__inputbox");
  if (nameInput.value.trim() === "") {
    displayErrorMessage(nameInputBox, "Поле обязательно для заполнения");
    isValid = false;
    nameInputBox.classList.add("error");
  }

  const contactInputs = form.querySelectorAll(".form__contact-input");
  contactInputs.forEach((valueInput) => {
    const contactBox = valueInput.closest(".form__contact");
    const contactType = contactBox.querySelector(".custom-select__input").value;

    if (valueInput.value.trim() === "") {
      displayErrorMessage(contactBox, "Контакт должен быть заполнен");
      isValid = false;
      valueInput.classList.add("error");
    } else {
      if (contactType === "Телефон") {
        if (!isValidPhone(valueInput.value)) {
          displayErrorMessage(
            contactBox,
            "Используйте только цифры и символы () + -"
          );
          isValid = false;
          valueInput.classList.add("error");
        }
      } else if (contactType === "Email") {
        if (!isValidEmail(valueInput.value)) {
          displayErrorMessage(
            contactBox,
            "Допустимый формат: example@example.ru"
          );
          isValid = false;
          valueInput.classList.add("error");
        }
      }
    }
  });

  return isValid;
}

export function displayErrorMessage(inputElement, message) {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("form__error-message");
  errorMessage.textContent = message;

  inputElement.append(errorMessage);

  const valueInput = inputElement.querySelector(".form__contact-input");

  inputElement.addEventListener("input", () => {
    errorMessage.remove();
    inputElement.classList.remove("error");
    valueInput?.classList.remove("error");
  });
}

function isValidPhone(phone) {
  const phoneRegex = /^[\d()+-]+$/;
  return phoneRegex.test(phone);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
