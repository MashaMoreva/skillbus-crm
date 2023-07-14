import { createModal, closeModal } from "./modal.js";
import { createButton } from "./createButton.js";
import { onDelete } from "./handlers.js";

export function openDeleteConfirmationModal(client) {
  const { modal: modalElement, overlay } = createModal(
    "Удалить клиента",
    null,
    "Вы действительно хотите удалить данного клиента?"
  );

  modalElement.classList.add("modal-confirm");

  const confirmButton = createButton("Удалить", "primary");
  const cancelButton = createButton("Отмена", "flat");

  confirmButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    onDelete(client.id, modalElement, overlay);
  });

  cancelButton.addEventListener("click", () => {
    closeModal(modalElement, overlay);
  });

  modalElement.append(confirmButton, cancelButton);

  document.body.append(overlay, modalElement);
}
