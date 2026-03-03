let cart = JSON.parse(localStorage.getItem("cart")) || [];


window.render=function(){
  poppop.innerHTML="";
  console.log(cart);
  cart.forEach(cardItem => {
    let cart_div = document.createElement("div");
    cart_div.setAttribute("class","cartdiv")
    cart_div.innerHTML=`
      <div class="cartImg">   
        <img src="${cardItem.image}" alt="">
    </div>
    <div class="cartBtn">
        <h3>${cardItem.name}</h3>
        <h2>$${cardItem.price}</h2>
    </div>
    <div class="countbtn">
        <button onclick="Incriment(${cardItem.id})">+</button>
        <span>${cardItem.quantity}</span>
        <button onclick="Decrement(${cardItem.id})">-</button>
    </div>
    <div class="cartRemove">
        <button onclick="removeCart(${cardItem.id})">Remove</button>
    </div>
    `
    poppop.appendChild(cart_div)

  });
}
render();




window.removeCart = function(id) {

    //  Remove item from cart array
    cart = cart.filter(item => item.id !== id);

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Re-render UI
    render();
}



//  Increment Quantity
window.increment = function(id) {
    cart = cart.map(item => {
        if(item.id === id) item.quantity + 1;
        return item;
    });
    saveCart();
    render();
}

//  Decrement Quantity
window.decrement = function(id) {
    cart = cart.map(item => {
        if(item.id === id && item.quantity > 1) item.quantity - 1;
        return item;
    });
    saveCart();
    render();
}

window.remove=function(){
    window.close("cart.html");
}


