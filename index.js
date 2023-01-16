import {menuArray} from "/data.js"


// ordersArray the snippet is working with

let ordersArray = []

// eventlisteners 

document.addEventListener('click', function(e) {
    if(e.target.dataset.buy) {                    /* listening for add button*/
        orderItem(e.target.dataset.buy) 
        totalPrice()
    }
    else if (e.target.dataset.remove){            /* listening for remove button*/
        removeItem(e.target.dataset.remove)
        totalPrice()
    }
    else if (e.target.id === "order-btn") {       /* listening for order button*/
        renderPayForm()
    }
    else if (e.target.id === "payment-btn") {     /* listening for payment button*/
        e.preventDefault()
        thanks()
    }
    

})

// function to render total price and hide the order container when array is empty

function totalPrice() {
    let total = 0
    ordersArray.forEach(function(menu) {
        total += menu.price
    })
    
    let result = total /* the total price*/ 
    
    document.getElementById("total").innerHTML = `
    <div class="total-wrapper container">
        <h2>Total Price</h2>
        <h3>$${result}</span></h3>
    </div> 
    `
    // empty the array when the length is zero
    
    if(ordersArray.length == 1){
        document.getElementById("order").classList.remove("hidden")
        document.getElementById("total").classList.remove("hidden")
        document.getElementById("complete-order").classList.remove("hidden")
    }
    if (ordersArray.length == 0) {
        document.getElementById("order").classList.add("hidden")
        document.getElementById("total").classList.add("hidden")
        document.getElementById("complete-order").classList.add("hidden")
    }
    
}

// check index of item to be removed and remove it

function removeItem(clickedItem) {
    const indexElement = document.getElementById(`${clickedItem}`)
    let index = Array.from(indexElement.parentElement).indexOf(indexElement)
    indexElement.remove()
    
    ordersArray.splice(index, 1) 
}



// placing the orders and rendering the html

function orderItem(itemId) {
    let orderHtml = ``
    const clickedMenu = menuArray.filter(function(menu){
        return menu.id == itemId
    })[0]
    ordersArray.push(clickedMenu)
    

    ordersArray.forEach(function(order) {

        orderHtml = `
        <div class="container orders" id="${order.id}">

            <div>
                <h2 class="order-item">${order.name}</h2>
                <button class="remove-btn" data-remove="${order.id}">remove</button> 
            </div>
            <h3 class="price">&dollar;${order.price}</h3>

        </div>      
        `
    })
    document.getElementById("order").innerHTML += orderHtml
}


// render pay-form when order is placed

function renderPayForm() {
    document.querySelector(".pay-form").classList.remove("hidden")
    
}

// render the thanks message when payment-btn is clicked

function thanks() {
    const payForm = document.getElementById("pay-form")
    let payFormData = new FormData(payForm)
    const userName = payFormData.get("user-name")
    document.querySelector(".pay-form").classList.add("hidden")
    document.querySelector(".order-container").innerHTML = `
        <h3 class="thanks" id="thanks">Thanks, ${userName}! Your order is on its way!</h3>
        `
        document.addEventListener('click', function(e) {
            if(e.target.dataset.buy) {
                location.reload()
            }
    })

}
// rendering the menu section

function getMenuHtml() {
    let menuHtml = ``
    
    menuArray.forEach(function(menu){
        menuHtml += `
<div class="container items-wrapper">
        <div class="item-details">
            <p><span class="item-graphic">${menu.emoji}</span></p>
            <div>
                <h2 class="item-title">${menu.name}</h2>
                <p>${menu.ingredients}</p>
                <h3>&dollar;${menu.price}</h3>
            </div>
        </div>
        <div>   
        <button class="btn" id="buy-btn"><img src="images/add-btn.png" alt="Buy button" data-buy="${menu.id}"></button> 
        </div>                  
</div>
        `
    })
    return menuHtml
}

function renderMenu(){
    document.getElementById("menu").innerHTML = getMenuHtml()
}

renderMenu()

