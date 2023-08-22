window.addEventListener("DOMContentLoaded", (event) => {
  const successMessage = document.querySelector(".alert-success");
  const errorMessage = document.querySelector(".alert-danger");

  if (successMessage && successMessage.textContent.trim() !== "") {
    setTimeout(() => {
      successMessage.classList.add("fade-out");
    }, 4000);
  }
  if (errorMessage && errorMessage.textContent.trim() !== "") {
    setTimeout(() => {
      errorMessage.classList.add("fade-out");
    }, 4000);
  }
});
