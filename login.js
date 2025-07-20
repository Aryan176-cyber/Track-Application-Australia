document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = form.firstName.value.trim().toLowerCase();
    const lastName = form.lastName.value.trim().toLowerCase();
    const nationality = form.nationality.value.trim().toLowerCase();
    const passport = form.passportNumber.value.trim().toLowerCase();
    const tazkira = form.tazkiraNumber.value.trim().toLowerCase();
    const caseNumber = form.caseNumber.value.trim().toLowerCase();

fetch('./data.json')
  .then(response => {
        if (!response.ok) throw new Error("Failed to load user data");
        return response.json();
      })
      .then(users => {
        const matchedUser = users.find(user =>
          user.firstName.toLowerCase() === firstName &&
          user.lastName.toLowerCase() === lastName &&
          user.nationality.toLowerCase() === nationality &&
          user.passport.toLowerCase() === passport &&
          user.tazkira.toLowerCase() === tazkira &&
          user.caseNumber.toLowerCase() === caseNumber
        );

        if (matchedUser) {
          window.location.href = matchedUser.redirectUrl;
        } else {
          errorMessage.textContent = "Login information does not match any record.";
        }
      })
      .catch(err => {
        errorMessage.textContent = "Error loading user data.";
        console.error(err);
      });
  });
});
