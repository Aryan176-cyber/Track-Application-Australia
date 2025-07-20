document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.querySelector('#firstName').value.trim();
    const lastName = document.querySelector('#lastName').value.trim();
    const passport = document.querySelector('#passport').value.trim();
    const caseNumber = document.querySelector('#caseNumber').value.trim();

    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const matchedUser = data.find(user =>
          user.firstName === firstName &&
          user.lastName === lastName &&
          user.passport === passport &&
          user.caseNumber === caseNumber
        );

        if (matchedUser) {
          window.location.href = matchedUser.redirectUrl;
        } else {
          alert('Login information does not match any record.');
        }
      })
      .catch(error => {
        console.error('Error loading data.json:', error);
        alert('Unable to load user data.');
      });
  });
});
