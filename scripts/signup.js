import { userData } from "../data/user.js"

const signUp = document.querySelector('.js-signup')
const userName = document.getElementById('username')
const userEmail = document.getElementById('email')
const password = document.getElementById('password')

signUp.addEventListener('click', () => {
  if (userName.value === '' || userEmail.value === '' || password.value === '') {
    document.querySelector('.link').setAttribute('href', '')
    document.querySelector('.js-warning').classList.add('show-warning')
    return
  } else {
    document.querySelector('.link').setAttribute('href', 'home-page.html')
    if (document.querySelector('.js-warning').classList.contains('show-warning')) {
      document.querySelector('.js-warning').classList.remove('show-warning')
    }
    userData.push(
      {
        'name': `${userName.value}`,
        'email': `${userEmail.value}`,
        'password': `${password.value}`
      }
    )
    localStorage.setItem('userData', JSON.stringify(userData))
  }
})

document.querySelector('.js-see-password').addEventListener('click', () => {
  const passwordLock = document.querySelector('.js-see-password')
  if (passwordLock.getAttribute('src') === 'images/password-locked-logo.png') {
    passwordLock.setAttribute('src', 'images/password-open-logo.png')
  } else {
    passwordLock.setAttribute('src', 'images/password-locked-logo.png')
  }
  password.attributes[0].value === "password" ? password.setAttribute('type', 'text') : password.setAttribute('type', 'password')
})
