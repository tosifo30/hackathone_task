// ✅ Whitelist array from localStorag
import returnProducts from "./product.js";
// let products=returnProducts();

let whitelist = JSON.parse(localStorage.getItem("whitelist")) || [];
let white = document.getElementById("white");



// 🔹 Render Whitelist
window.renderWhite = function() {
    white.innerHTML = "";

    // if(whitelist.length === 0) {
    //     white.innerHTML = "<p>No items in whitelist</p>";
    //     return;
    // }

    whitelist.forEach(item => {
        let div = document.createElement("div");
        div.className = "cartdiv";

        div.innerHTML = `
            <div class="cartImg">   
                <img src="${item.image}" alt="">
            </div>
            <div class="cartBtn">
                <h3>${item.name}</h3>
                <h2>$${item.price}</h2>
            </div>
            <div class="countbtn">
                <button onclick="incrementWhitelist(${item.id})">+</button>
                <span>${item.quantity}</span>
                <button onclick="decrementWhitelist(${item.id})">-</button>
            </div>
            <div class="cartRemove">
                <button onclick="removeWhitelist(${item.id})">Remove</button>
            </div>
        `;

        white.appendChild(div);
    });
}
renderWhite();


// 🔹 Remove from Whitelist
window.removeWhitelist = function(id) {
    whitelist = whitelist.filter(item => item.id !== id); // ✅ modify whitelist array
    localStorage.setItem("whitelist", JSON.stringify(whitelist));
    renderWhite();
}

// 🔹 Increment Quantity in Whitelist
window.incrementWhitelist = function(id) {
    whitelist = whitelist.map(item => {
        if(item.id === id) item.quantity += 1;
        return item;
    });
    localStorage.setItem("whitelist", JSON.stringify(whitelist));
    renderWhite();
}

// 🔹 Decrement Quantity in Whitelist
window.decrementWhitelist = function(id) {
    whitelist = whitelist.map(item => {
        if(item.id === id && item.quantity > 1) item.quantity -= 1;
        return item;
    });
    localStorage.setItem("whitelist", JSON.stringify(whitelist));
    renderWhite();
}
