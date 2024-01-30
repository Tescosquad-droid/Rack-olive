import { productOrdered } from "../data/purchase.js";
import { products } from "../data/product.js";

let orders = [];

products.forEach((product) => {
  productOrdered.forEach((order) => {
    if (product.id === order.productID) {
      const prod = {
        "product": product,
        "others": order
      }
      orders.push(prod)
    }
  })
  localStorage.setItem('orders', JSON.stringify(orders))
})

function calcFinances() {
  let amount = 0
  let price = 0

  orders.forEach((order) => {
    amount += Number(order.others.amount)
    price += Number(order.product.price * order.others.amount)
  })
  document.querySelectorAll('.js-amount').forEach((ordered) => {
    ordered.innerHTML = amount
  })
  
  document.querySelector('.js-price').innerHTML = `$${price.toFixed(2)}`
  
  const shipping = 0.05 * price
  document.querySelector('.js-shipping').innerHTML = `$${shipping.toFixed(2)}`
  
  const beforeTax = price + shipping
  document.querySelector('.js-before-tax').innerHTML = `$${beforeTax.toFixed(2)}`
  
  const tax = 0.1 * price
  document.querySelector('.js-tax').innerHTML = `$${tax.toFixed(2)}`
  
  const total = beforeTax + tax
  document.querySelector('.js-total').innerHTML = `$${total.toFixed(2)}`
}
calcFinances()



function runPage() {
  let productHTML = ''

  orders.forEach((order) => {
    productHTML += `
    <div class="order-container">
      <div class="shoe-container">
        <img src="${order.product.image}" alt="" class="shoe-image">
      </div>
      <div class="details-container">
        <p>${order.product.name}</p>
        <p>$${order.product.price}</p>
        <p>${order.others.amount} pairs</p>
        <p>${order.product.gender}</p>
      </div>
      <img src="images/delete-trash-can.png" alt="" class="delete js-delete" data-product-id="${order.product.id}">
    </div>
    `
})
document.querySelector('.overall-ordered').innerHTML = productHTML
}
runPage()


document.querySelector('.js-button').addEventListener('click', () => {
  document.querySelectorAll('.js-delete').forEach((delBtn) => {
    delBtn.style.setProperty('display', 'none')
  })
  document.querySelector('.js-success').style.setProperty('transform', 'translateY(-1px)')
  let l = 220
  setInterval(() => {
    document.querySelector('.js-multicolor').style.setProperty('width', `${l-1}px`)
    l--
  }, 12)
  setTimeout(() => {
    document.querySelector('.js-success').style.setProperty('transform', 'translateY(-70px)')
  }, 2500)
  document.querySelector('.js-receipt').style.setProperty('display', 'grid')

  localStorage.removeItem('orderCount')
})

if (orders.length === 1) {
  const delButton =  document.querySelector('.js-delete')
  delButton.addEventListener('click', () => {
    orders.splice(0, 1)
    localStorage.setItem('orders', JSON.stringify(orders))
    orders = JSON.parse(localStorage.getItem('orders'))
    runPage()
    calcFinances()
  })
}
orders = JSON.parse(localStorage.getItem('orders'))

function deleteOrder() {
  document.querySelectorAll('.js-delete').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      let productId  = deleteButton.dataset.productId
      orders.forEach((order) => {
        if (productId === order.product.id) {
          const index = orders.indexOf(order)
          orders.splice(index, 1)
          localStorage.removeItem('order')
          
          productOrdered.forEach((product) => {
            if (product.productID === productId) {
              localStorage.removeItem(product)
            }
          })

          localStorage.setItem('orders', JSON.stringify(orders))
          runPage()
          calcFinances()
          deleteOrder()
        }
      })
    })
  })
}
deleteOrder()
localStorage.setItem('orders', JSON.stringify(orders))