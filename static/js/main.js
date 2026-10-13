/* main.js — Homepage interactions */
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer if element exists
  const yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach(el => { el.textContent = new Date().getFullYear(); });
});
