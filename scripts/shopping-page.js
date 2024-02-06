import { products } from "../data/product.js";
import { userData } from "../data/user.js";
import { productOrdered } from "../data/purchase.js";

let orderCount = 0

document.querySelector('.js-order-count').innerHTML = JSON.parse(localStorage.getItem('orderCount')) || 0

const name = userData[0].name
const firstLetter = name.slice(0, 1)
document.querySelector('.name-abbr').innerHTML = firstLetter.toUpperCase()
document.querySelector('.name-abbr').setAttribute('title', `${name}`)

document.querySelectorAll('.head-click').forEach((headClick) => {
  headClick.addEventListener('click', () => {
    const attr = headClick.dataset.attr
    const head = document.querySelector(`.js-list-${attr}`)
    const caret = document.querySelector(`.js-arrow-${attr}`)
    if (head.classList.contains('show-list')) {
      head.classList.remove('show-list')
      caret.classList.remove('rotate')
    } else {
      caret.classList.add('rotate')
      head.classList.add('show-list')
    }
  })
})

document.querySelectorAll('.list li').forEach((list) => {
  list.addEventListener('click', () => {
    const filter = document.querySelector('.js-filter-step')
    filter.classList.remove('filter-show')
  })
})

document.querySelector('.js-filt-icon').addEventListener('click', () => {
  const filter = document.querySelector('.js-filter-step')
  if (filter.classList.contains('filter-show')) {
    filter.classList.remove('filter-show')
  } else {
    filter.classList.add('filter-show')
  }
})

let productHTML = ''
products.forEach((product) => {
  productHTML += `
    <div class="product">
      <div>
        <div class="image-container">
          <img src="${product.image}" alt="" class="edited-images">
        </div>
      </div>
      <p class="name">${product.name}</p>
      <div class="key-detail">
        <p class="price">$${product.price}</p>
      </div>
      <div class="gender">${product.gender}</div>
      <div class="order-container">
        <select class="quantity-selector js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <button class="order-button js-order-button" type="button" data-product-id="${product.id}">Add to cart</button>
      </div>
    </div>
  `
})
localStorage.setItem('productHTML', JSON.stringify(productHTML))
document.querySelector('.js-product-container').innerHTML = productHTML


const orderButton = document.querySelectorAll('.js-order-button')
orderButton.forEach((button) => {
  button.addEventListener('click', () => {

    const productID = button.dataset.productId
    const amount = document.querySelector(`.js-quantity-selector-${productID}`).value

    sortOrder(productID, amount)
    
    
    localStorage.setItem('productOrdered', JSON.stringify(productOrdered))
    orderCount = orderCount + Number(amount)
    document.querySelector('.js-order-count').innerHTML = orderCount
    localStorage.setItem('orderCount', JSON.stringify(orderCount))
  })
})

function sortOrder(productID, amount) {

  const exist = productOrdered.find((prod) => prod.productID === productID)

  if (exist) {
    let total = Number(exist.amount)
    total += Number(amount)
    productOrdered.forEach((prod) => {
      if (prod === exist) {
        prod.amount = `${total}`
      }
    })
  } else {
    productOrdered.push({
      productID: productID,
      amount: amount
    })
  }
  
}

const genderList = document.querySelectorAll('.js-list-gender li')
genderList.forEach((gender) => {
  gender.addEventListener('click', () => {
    if (gender.innerHTML === 'all') {
      const productHTML = JSON.parse(localStorage.getItem('productHTML'))
      document.querySelector('.js-product-container').innerHTML = productHTML 
  
      const orderButton = document.querySelectorAll('.js-order-button')
      orderButton.forEach((button) => {
        button.addEventListener('click', () => {
          const productID = button.dataset.productId
          const amount = document.querySelector(`.js-quantity-selector-${productID}`).value
          sortOrder(productID, amount)
          
          localStorage.setItem('productOrdered', JSON.stringify(productOrdered))
          orderCount = orderCount + Number(amount)
          document.querySelector('.js-order-count').innerHTML = orderCount
          localStorage.setItem('orderCount', JSON.stringify(orderCount))
        })
      })
      return
    }
  
    let filteredArray = [];
    productHTML = ''
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      if (product.gender === gender.innerHTML) {
        if (filteredArray.includes(product)) {
          return
        } else {
          filteredArray.push(product)
          productHTML += `
            <div class="product">
              <div>
                <div class="image-container">
                  <img src="${product.image}" alt="" class="edited-images">
                </div>
              </div>
              <p class="name">${product.name}</p>
              <div class="key-detail">
                <p class="price">$${product.price}</p>
              </div>
              <div class="gender">${product.gender}</div>
              <div class="order-container">
                <select class="quantity-selector js-quantity-selector-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <button class="order-button js-order-button" type="button" data-product-id="${product.id}">Add to cart</button>
              </div>
            </div>
          `
        }
      }
    }
    document.querySelector('.js-product-container').innerHTML = productHTML
  
    const orderButton = document.querySelectorAll('.js-order-button')
    orderButton.forEach((button) => {
      button.addEventListener('click', () => {
        const productID = button.dataset.productId
        const amount = document.querySelector(`.js-quantity-selector-${productID}`).value
        sortOrder(productID, amount)
        
        localStorage.setItem('productOrdered', JSON.stringify(productOrdered))
        orderCount = orderCount + Number(amount)
        document.querySelector('.js-order-count').innerHTML = orderCount
        localStorage.setItem('orderCount', JSON.stringify(orderCount))
      })
    })
  })
})

const brandList = document.querySelectorAll('.js-list-brand li')
brandList.forEach((brand) => {
  brand.addEventListener('click', () => {
    if (brand.innerHTML === 'all') {
      const productHTML = JSON.parse(localStorage.getItem('productHTML'))
      document.querySelector('.js-product-container').innerHTML = productHTML 
  
      const orderButton = document.querySelectorAll('.js-order-button')
      orderButton.forEach((button) => {
        button.addEventListener('click', () => {
          const productID = button.dataset.productId
          const amount = document.querySelector(`.js-quantity-selector-${productID}`).value
          sortOrder(productID, amount)
          
          localStorage.setItem('productOrdered', JSON.stringify(productOrdered))
          orderCount = orderCount + Number(amount)
          document.querySelector('.js-order-count').innerHTML = orderCount
          localStorage.setItem('orderCount', JSON.stringify(orderCount))
        })
      })
      return
    }
  
    let filteredArray = [];
    productHTML = ''
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      if (product.brand === brand.innerHTML) {
        if (filteredArray.includes(product)) {
          return
        } else {
          filteredArray.push(product)
          productHTML += `
            <div class="product">
              <div>
                <div class="image-container">
                  <img src="${product.image}" alt="" class="edited-images">
                </div>
              </div>
              <p class="name">${product.name}</p>
              <div class="key-detail">
                <p class="price">$${product.price}</p>
              </div>
              <div class="gender">${product.gender}</div>
              <div class="order-container">
                <select class="quantity-selector js-quantity-selector-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <button class="order-button js-order-button" type="button" data-product-id="${product.id}">Add to cart</button>
              </div>
            </div>
          `
        }
      }
    }
    document.querySelector('.js-product-container').innerHTML = productHTML
  
    const orderButton = document.querySelectorAll('.js-order-button')
    orderButton.forEach((button) => {
      button.addEventListener('click', () => {
        const productID = button.dataset.productId
        const amount = document.querySelector(`.js-quantity-selector-${productID}`).value
        sortOrder(productID, amount)
        
        localStorage.setItem('productOrdered', JSON.stringify(productOrdered))
        orderCount = orderCount + Number(amount)
        document.querySelector('.js-order-count').innerHTML = orderCount
        localStorage.setItem('orderCount', JSON.stringify(orderCount))
      })
    })
  })
})