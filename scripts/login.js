import { userData } from "../data/user.js";

const name = userData[0].name
const password = userData[0].password

const loginButton = document.querySelector('.js-login')

loginButton.addEventListener('click', () => {
  const inputName = document.getElementById('name').value
  const inputPassword = document.getElementById('password').value
  if (inputName !== name) {
    document.querySelector('.js-name-warning').classList.add('show-incorrect')
    document.querySelector('.href').setAttribute('href', '')
    return
  } else if (inputPassword !== password) {
    document.querySelector('.href').setAttribute('href', '')
    document.querySelector('.js-password-warning').classList.add('show-incorrect')
    return
  } else {
    document.querySelector('.href').setAttribute('href', 'home-page.html')
  }
  
  
})
document.querySelector('.js-password').addEventListener('click', () => {
  const passwordLock = document.querySelector('.js-password')
  if (passwordLock.getAttribute('src') === 'images/password-locked-logo.png') {
    passwordLock.setAttribute('src', 'images/password-open-logo.png')
  } else {
    passwordLock.setAttribute('src', 'images/password-locked-logo.png')
  }
  
  
  const passwordInput = document.getElementById('password')
  passwordInput.attributes[0].value === 'password' ? passwordInput.setAttribute('type', 'text')  : passwordInput.setAttribute('type', 'password')
})