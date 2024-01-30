import { orders } from "../data/purchase.js";
import { userData } from "../data/user.js";

document.querySelector('.identity').innerHTML = userData[0].name
const id = Math.floor(Math.random() * 10000000)
document.querySelector('.purchase-id').innerHTML = id

let totalPrice = 0
let totalAmount = 0

orders.forEach((order) => {
  const nameHTML = `<p><span>${order.product.name}</span></p>`
  const priceHTML = `<p><span>$${order.product.price}</span></p>`
  const amountHTML = `<p><span>${order.others.amount}</span></p>`

  document.querySelector('.js-product').innerHTML += nameHTML
  document.querySelector('.js-price').innerHTML += priceHTML
  document.querySelector('.js-amount').innerHTML += amountHTML

  totalPrice += Number(order.product.price) *
   Number(order.others.amount)
  totalAmount += Number(order.others.amount)
})

document.querySelector('.total-price').innerHTML = `$${totalPrice}`
document.querySelector('.total-amount').innerHTML = totalAmount

localStorage.removeItem('productOrdered')