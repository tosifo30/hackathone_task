import returnProducts from "./product.js";
import categorys from "./catagory.js";

let products=returnProducts();
let category=categorys();


let currentIndex = 0;
const slides = document.querySelectorAll('.img');
const totalSlides = slides.length;
const heroContainer = document.querySelector('.hero');
let proContainer=document.getElementById("container_product")
let eight_card=document.getElementById("8Card")
let search=document.getElementById("search")
let catbtn=document.getElementById("category")
console.log("yer its working")

// local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the slide position
function updateSlider() {
    // Moves the container to the left by (100% * index)
    heroContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Logic for Next/Prev buttons
function moveSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= totalSlides) {
        currentIndex = 0; // Loop back to start
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1; // Loop to end
    } 
    updateSlider();
    resetTimer(); // Reset auto-slide when user interacts
}

// Auto-slide logic
let slideInterval = setInterval(() => {
    moveSlide(1);
}, 3000);

// Function to restart the timer if a button is clicked
function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        moveSlide(1);
    }, 3000);
}


// cards Append

window.productCard=function(){
    proContainer.innerHTML=""
    products.forEach(item => {
        let pro_card=document.createElement("div")
        pro_card.setAttribute("class","allcard")
        pro_card.innerHTML=`
        <img src="${item.image}" alt="">
            <h1>${item.name}</h1>
            <h3>${item.price}</h3>
            <p>dic</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
            <button onclick="addToWhitelist(${item.id})">Add to WhiteList</button>
        `
        proContainer.appendChild(pro_card)
        
    });
    console.log("hello")

}

productCard();

// selector for apend

let home=document.getElementById("home")
let product=document.getElementById("product")
let hero=document.getElementById("hero")
let but=document.getElementById("but")

window.allProduct=function(){
    hero.style.display="none"
    product.style.display="block"
    eight_card.style.display="none"
    but.style.display="none"

}




// for 8 card

window.eightCard = function() {
    eight_card.innerHTML = "";

    // .slice(0, 8) ensures only the first 8 items are processed
    products.slice(0, 8).forEach(item => {
        let pros_card = document.createElement("div");
        pros_card.setAttribute("class", "eightcard");
        
        pros_card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h1>${item.name}</h1>
            <h3>${item.price}</h3>
            <p>Description</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
            <button onclick="addToWhitelist(${item.id})">Add to Wishlist</button>
        `;
        
        eight_card.appendChild(pros_card);
    });
    
    console.log("First 8 products rendered");
}

eightCard();


// catagory button

function catagorybtn(){
    catbtn.innerHTML=""
    category.forEach(element => {
        let catbutton=document.createElement("button")
        catbutton.setAttribute("class","catbtn")
        catbutton.setAttribute("onclick","showCardCat(this)")
        catbutton.innerHTML=element.category
         
        catbtn.appendChild(catbutton)
        
    });
}
catagorybtn()



// search
search.addEventListener("input", () => {
  let value = search.value.toLowerCase();

  let filterCard = products.filter((seritem) =>
    seritem.name.toLowerCase().includes(value)
  );
  proContainer.innerHTML = ""; 
  filterCard.forEach(items => {
    let card_div = document.createElement("div");
    card_div.innerHTML = `
            <img src="${items.image}" alt="${items.name}">
            <h1>${items.name}</h1>
            <h3>${items.price}</h3>
            <p>Description</p>
            <button onclick="addToCart(${items.id})">Add to Cart</button>
            <button onclick="addToWhitelist(${items.id})">Add to Wishlist</button>
        `;
    proContainer.appendChild(card_div);
  });
});


// catagrice in btn


window.showCardCat=function(clickbtn){
  if(clickbtn.innerHTML==="All"){
    productCard()
  }else{
  proContainer.innerHTML=""
    let filtered = products.filter((item) => {
      return item.category === clickbtn.innerHTML;
    })
    filtered.forEach(element => {
      // proContainer.innerHTML=""
      let card_div = document.createElement("div");
      card_div.innerHTML = `
            <img src="${element.image}" alt="${element.name}">
            <h1>${element.name}</h1>
            <h3>${element.price}</h3>
            <p>Description</p>  
            <button onclick="addToCart(${element.id})">Add to Cart</button>
            <button onclick="aaddToWhitelist(${element.id})">Add to Wishlist</button>
        `;
    proContainer.appendChild(card_div);
    console.log(filtered)
    });
  }
}


// close poppop
// let main_poppop=document.getElementById("main_poppop")
// main_poppop.style.display="none"

window.openPoppop=function(){
    // main_poppop.style.display="block"
     window.open("cart.html", "_self");
         localStorage.setItem("cart", JSON.stringify(cart)); // 🔥 SAVE CART
}
window.remove=function(){
    window.history.back();
}



// Add to cart

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  // alert("ur right")
}

window.addToCart=function(productId){
    console.log("yes doing work")
  const selectedproduct= products.find((ids)=>ids.id==productId)
  const  exist=cart.find((item)=>item.id===productId)
  if(exist){
    alert("Item Alredy Exist")
    return
  }
  cart.push({...selectedproduct,quantity:1})
  saveCart();
  increaseCount();
  render();
  alert(selectedproduct.name+"Add to cart")
  
}
let whitelist = JSON.parse(localStorage.getItem("whitelist")) || [];
// 🔹 Add to Whitelist
window.addToWhitelist = function(productId) {
    console.log("Adding to whitelist...");

    const selectedProduct = products.find(item => item.id === productId);
    const exist = whitelist.find(item => item.id === productId);
    if(exist) {
        alert("Item already in Whitelist");
        return;
    }
    whitelist.push({...selectedProduct, quantity: 1});
    localStorage.setItem("whitelist", JSON.stringify(whitelist));
    renderWhite();
    alert(selectedProduct.name + " added to whitelist");
}




let cartCount=document.getElementById("cartCount")
// cart cout
function increaseCount(){
  const totalItems = cart.reduce((total, item) => total + item.quantity,0 );
  cartCount.textContent = totalItems;
  localStorage.setItem("cart", JSON.stringify(cart));
}
 increaseCount()


 window.whiteList=function(){
    window.open("whitelist.html", "_self");
 }
 let allbtn=document.getElementById("allbtn")
 let setting=document.getElementById("setting")
 setting.style.display="none"
 window.setting=function(){
    hero.style.display="none"
    eight_card.style.display="none"
    allbtn.style.display="none"
     setting.style.display="block"

 }


// ✅ Function to set mode


window.changebg=function(){
    console.log("Asdfas");
    let body=document.getElementById("body")
   
    let islight=body.classList.contains("light-mode")
    if(islight){
        body.classList.add("dark-mode")
        body.classList.remove("light-mode")
        body.style.transition="2s ease"
        
        
        
    }else{
        body.classList.add("light-mode")
        body.classList.remove("dark-mode")
    }
}


window.login=function(){
    window.open("form.html");
}