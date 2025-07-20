document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const passport = document.getElementById('passport').value.trim();
  const caseNumber = document.getElementById('caseNumber').value.trim();

  fetch('https://raw.githubusercontent.com/Aryan176-cyber/Track-Application-Australia/main/data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
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
        alert('مشخصات وارد شده نادرست است.');
      }
    })
    .catch(error => {
      console.error('خطا در دریافت فایل JSON:', error);
      alert('مشکلی در ارتباط با سرور پیش آمده است.');
    });
});
