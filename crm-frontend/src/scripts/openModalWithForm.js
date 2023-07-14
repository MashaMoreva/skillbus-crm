import { createModal } from "./modal.js";
import { createForm } from "./createForm.js";

export function openModalWithForm(client) {
  const { modal: modalElement, overlay } = createModal(
    client ? "Изменить данные" : "Новый клиент",
    client && client.id ? `ID: ${client.id}` : null
  );

  const form = createForm(client, modalElement, overlay);

  modalElement.append(form);

  document.body.append(overlay, modalElement);
}
