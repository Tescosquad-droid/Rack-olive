import { userData } from "../data/user.js"

if (userData[0] !== undefined) {
  document.querySelectorAll('.button-container').forEach((getStarted) => {
    getStarted.remove()
  })
} else {
  document.querySelector('.button-2').remove()
}