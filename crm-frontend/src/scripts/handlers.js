import {
  addClientAPI,
  getClientsAPI,
  updateClientAPI,
  deleteClientAPI,
} from "./api.js";
import { renderTable } from "./renderTable.js";
import { closeModal } from "./modal.js";

export const onSave = async (client, isNewClient, id) => {
  try {
    if (isNewClient) {
      await addClientAPI(client);
    } else {
      await updateClientAPI(id, client);
    }
    const clients = await getClientsAPI();
    renderTable(clients);
  } catch (error) {}
};

export const onDelete = async (clientId, modalElement, overlay) => {
  try {
    await deleteClientAPI(clientId);
    const clients = await getClientsAPI();
    renderTable(clients);
    closeModal(modalElement, overlay);
  } catch (error) {
    console.error("Ошибка при удалении клиента:", error);
  }
};
