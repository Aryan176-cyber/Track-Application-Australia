document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const nationality = document.getElementById('nationality').value.trim();
  const passportNumber = document.getElementById('passportNumber').value.trim();
  const tazkiraNumber = document.getElementById('tazkiraNumber').value.trim();
  const caseNumber = document.getElementById('caseNumber').value.trim();

  fetch('https://raw.githubusercontent.com/Aryan176-cyber/Track-Application-Australia/main/data.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(users => {
      const matchedUser = users.find(user =>
        user.firstName === firstName &&
        user.lastName === lastName &&
        user.nationality === nationality &&
        user.passport === passportNumber &&
        user.tazkira === tazkiraNumber &&
        user.caseNumber === caseNumber
      );

      if (matchedUser) {
        window.location.href = matchedUser.redirectUrl;
      } else {
        document.getElementById('errorMessage').textContent = 'Login information does not match any record.';
      }
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
      document.getElementById('errorMessage').textContent = 'An error occurred while trying to log in.';
    });
});
