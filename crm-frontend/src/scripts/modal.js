export function createModal(titleText, subtitleText, messageText) {
  const modal = document.createElement("div");
  const overlay = createOverlay(modal);
  const closeButton = createCloseButton(modal, overlay);
  modal.classList.add("modal");

  setTimeout(() => {
    modal.classList.add("visible");
  }, 0);

  const title = createTitle(titleText, subtitleText);
  const message = createMessage(messageText);

  modal.append(closeButton, title, message);

  return { modal, overlay };
}

function createOverlay(modal) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  overlay.addEventListener("click", () => {
    closeModal(modal, overlay);
  });

  return overlay;
}

function createCloseButton(modal, overlay) {
  const closeButton = document.createElement("button");
  closeButton.classList.add("modal__close-button");

  closeButton.addEventListener("click", () => {
    closeModal(modal, overlay);
  });

  return closeButton;
}

function createTitle(titleText, subtitleText) {
  const title = document.createElement("h2");
  title.classList.add("modal__title");
  title.textContent = titleText;

  if (subtitleText) {
    const subtitle = document.createElement("span");
    subtitle.textContent = subtitleText;
    subtitle.classList.add("modal__subtitle");
    title.appendChild(subtitle);
  }

  return title;
}

function createMessage(messageText) {
  const message = document.createElement("p");
  message.classList.add("modal__text");
  message.textContent = messageText;
  return message;
}

export function closeModal(modal, overlay) {
  modal.classList.remove("visible");
  setTimeout(() => {
    modal.remove();
    overlay.remove();
  }, 300);
}
