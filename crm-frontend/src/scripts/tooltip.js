export function showTooltip() {
  const tooltipText = this.getAttribute("data-tooltip");
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  tooltip.textContent = tooltipText;
  document.body.appendChild(tooltip);

  const tooltipRect = tooltip.getBoundingClientRect();
  const iconRect = this.getBoundingClientRect();
  const top = iconRect.top - tooltipRect.height - 10;
  const left = iconRect.left + iconRect.width / 2 - tooltipRect.width / 2;
  tooltip.style.top = top + "px";
  tooltip.style.left = left + "px";
}

export function hideTooltip() {
  const tooltip = document.querySelector(".tooltip");
  if (tooltip) {
    tooltip.remove();
  }
}
