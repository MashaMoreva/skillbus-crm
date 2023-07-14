const BASE_URL = "http://localhost:3000/api/clients";

async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    if (
      response.status === 422 ||
      response.status === 404 ||
      response.status >= 500
    ) {
      const responseData = response.json();
      const errorMessage =
        responseData?.errors?.[0]?.message || "Что-то пошло не так...";
      const saveButton = document.querySelector(".form__save-button");
      const errorMessageBox = document.createElement("p");
      errorMessageBox.classList.add("error-message");
      errorMessageBox.textContent = errorMessage;
      saveButton.parentNode.insertBefore(errorMessageBox, saveButton);
    }
    throw new Error("Произошла ошибка, запрос не выполнен");
  }
}

export async function getClientsAPI() {
  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return handleResponse(response);
}

export async function getClientDataAPI(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return handleResponse(response);
}

export async function addClientAPI(formData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  return handleResponse(response);
}

export async function deleteClientAPI(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

export async function updateClientAPI(id, formData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  return handleResponse(response);
}
