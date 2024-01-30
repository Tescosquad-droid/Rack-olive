import { userData } from "../data/user.js"

const userName = document.querySelector('.name-input')
const userEmail = document.querySelector('.email-input')

userName.value = JSON.parse(localStorage.getItem('name')) || userData[0].name || 'userName'
userEmail.value = JSON.parse(localStorage.getItem('email')) || userData[0].email || 'userEmail@gmail.com'
document.querySelector('.js-name-update').innerHTML = JSON.parse(localStorage.getItem('name')) || userData[0].name
document.querySelector('.js-email-update').innerHTML = JSON.parse(localStorage.getItem('email')) || userData[0].email

const edits = document.querySelectorAll('.js-edit')
edits.forEach((edit) => {
  edit.addEventListener('click', () => {
    const id = edit.id
    const input = document.getElementById(`${id}`)
    if (input.hasAttribute('disabled')) {
      input.attributes.removeNamedItem('disabled')
      document.getElementById(`${id}`).focus()
      
      input.addEventListener('keydown', (e) => { 
        const key = e.key
        if (key === 'Enter') {
          document.getElementById(`${id}`).setAttribute('disabled', 'disabled')
          const newdetail = document.getElementById(`${id}`).value
          document.querySelector(`.js-${id}-update`)
          .innerHTML = newdetail
          if (id === 'name') {
            localStorage.setItem('name', JSON.stringify(newdetail))
            userData[0].name = JSON.parse(localStorage.getItem('name'))
            localStorage.setItem('userData', JSON.stringify(userData))
            userName.value = JSON.parse(localStorage.getItem('name'))
            document.querySelector('.js-name-update').innerHTML = JSON.parse(localStorage.getItem('name'))
          } else if (id === 'email') {
            localStorage.setItem('email', JSON.stringify(newdetail))
            userData[0].email = JSON.parse(localStorage.getItem('email'))
            localStorage.setItem('userData', JSON.stringify(userData))
            userEmail.value = JSON.parse(localStorage.getItem('email'))
            document.querySelector('.js-email-update').innerHTML = JSON.parse(localStorage.getItem('email'))
          }
        }
      })
    } else {
      input.setAttribute('disabled', 'disabled')
    }
  })
})
document.querySelectorAll('.js-sidelist ul').forEach((list) => {
  list.addEventListener('click', () => {
    const menuIcon = document.querySelector('.js-menu-icon')
    menuIcon.classList.remove('cancel-icon')
    menuIcon.setAttribute('src', 'images/menu-icon.png')
  })
})

document.querySelector('.sidebar-menu-icon')
.addEventListener('click', () => {
  const menuIcon = document.querySelector('.js-menu-icon')
  if (menuIcon.getAttribute('src') === 'images/menu-icon.png') {
    menuIcon.setAttribute('src', 'images/cancel-icon.png')
    menuIcon.classList.add('cancel-icon')
  } else {
    menuIcon.classList.remove('cancel-icon')
    menuIcon.setAttribute('src', 'images/menu-icon.png')
  }
  const sideMenu = document.querySelector('.side-menu').style.transform
  if (sideMenu === 'translateX(-120%)') {
    menuIcon.setAttribute('src', 'images/cancel-icon.png')
    menuIcon.classList.add('cancel-icon')
  } else if (sideMenu === 'translate(0%)') {
    menuIcon.classList.remove('cancel-icon')
    menuIcon.setAttribute('src', 'images/menu-icon.png')
  }
  if (sideMenu === 'translateX(0%)') {
    document.querySelector('.side-menu').style.setProperty('transform', 'translateX(-120%)')
    
  } else {
    document.querySelector('.side-menu').style.setProperty('transform', 'translateX(0%)')
  }
})

document.querySelectorAll('.about-href').forEach((about) => {
  about.addEventListener('click', () => {
    window.scrollTo(0, 600)
  })
})
document.querySelectorAll('.contact-href').forEach((contact) => {
  contact.addEventListener('click', () => {
    window.scrollTo(0, 2000)
  })
})