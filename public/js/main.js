// Wait for the page to load
window.addEventListener("DOMContentLoaded", (event) => {
  const successMessage = document.querySelector(".alert-success");

  if (successMessage) {
    setTimeout(() => {
      successMessage.classList.add("fade-out");
    }, 4000);
  }
});
