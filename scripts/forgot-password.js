import { userData } from "../data/user.js";

document.querySelector('.confirm-password').addEventListener('click', () => {
  const newPass = document.querySelector('.password-1')
  const verifyPass = document.querySelector('.password-2')
  if (newPass.value === verifyPass.value && newPass.value !== '') {
    userData[0].password = newPass.value
    localStorage.setItem('userData', JSON.stringify(userData))
    document.querySelector('.redirect').setAttribute('href', 'login.html')
  } else {
    document.querySelector('.redirect').setAttribute('href', '')
  }
})