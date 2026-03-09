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

// local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];



// for slide move also
function updateSlider() {
    heroContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function moveSlide(direction) {
    currentIndex += direction;
    // If last then go back to first slide.
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } 
    updateSlider();
}

let slideInterval = setInterval(() => {
    moveSlide(1);
}, 3000);



// cards Append in product list also show in screen all cards

window.productCard=function(){
    proContainer.innerHTML=""
    products.forEach(item => {
        let more_card=document.createElement("div")
        more_card.setAttribute("class","allcard")
        more_card.innerHTML=`
        <img src="${item.image}" alt="">
            <h1>${item.name}</h1>
            <h3>${item.price}</h3>
            <p>dic</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
            <button onclick="addToWhitelist(${item.id})">Add to WhiteList</button>
        `
        proContainer.appendChild(more_card)
        
    });
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
    morecard.style.display="none"

}




// for 8 card
// .slice(0, 8) only the first 8 items are processed


window.eightCard = function() {
    eight_card.innerHTML = "";
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
}
eightCard();

// More card add 
let morecard=document.getElementById("morecard")
morecard.style.display="none"

window.morePageCard = function() {
    // morecard.innerHTML=""
    products.slice(9, 16).forEach(item => {
        let pros_card = document.createElement("div");
        pros_card.setAttribute("class", "more8card");  
        pros_card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h1>${item.name}</h1>
            <h3>${item.price}</h3>
            <p>Description</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
            <button onclick="addToWhitelist(${item.id})">Add to Wishlist</button>
        `;
        morecard.appendChild(pros_card);
    });
}
morePageCard();

window.MoreCard=function(){
    eight_card.style.display="none"
    morecard.style.display="block"

}




// catagory button we take data from catagory and then put in button

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



// function for serch when we serach a card that they show me
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
// catagory whwn we search about catogary then we can also serach

search.addEventListener("input", () => {
  let value = search.value.toLowerCase();

  let filterCategoryCard = products.filter((seritem) =>
    seritem.category.toLowerCase().includes(value)
  );
//   proContainer.innerHTML = ""; 
  filterCategoryCard.forEach(items => {
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




// catagrice in btn like we when we click on botton then those catagory show which equal to button text

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


// functio for poppop sccreen open

window.openPoppop=function(){
     window.open("cart.html", "_self");
         localStorage.setItem("cart", JSON.stringify(cart)); 
}




// Add to cart like when we click add to card then we show that they add to local storage

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  // alert("ur right")
}
let savedUser = JSON.parse(localStorage.getItem("userProfile"));

window.addToCart=function(productId){
    console.log("yes doing work")
  const selectedproduct= products.find((ids)=>ids.id==productId)
  const  exist=cart.find((item)=>item.id===productId)
  if(!savedUser){
    alert("No user logged in. Please login first.");
    window.location.href="./form.html"
    return
  }
  if(exist){
    alert("Item Alredy Exist")
    return
  }

  cart.push({...selectedproduct,quantity:1})
  saveCart();
  increaseCount();
  render();
  
}


// Local Storage Array For Whitelist
// Add to Whitelist
let whitelist = JSON.parse(localStorage.getItem("whitelist")) || [];

window.addToWhitelist = function(productId) {
    // console.log("Adding to whitelist...");
    if(!savedUser){
    alert("No user logged in. Please login first.");
    window.location.href="./form.html"
    return
  }

    const selectedProduct = products.find(item => item.id === productId);
    const exist = whitelist.find(item => item.id === productId);
    if(exist) {

        alert("Item already in Whitelist");
        return;
    }
    whitelist.push({...selectedProduct, quantity: 1});
    localStorage.setItem("whitelist", JSON.stringify(whitelist));
    renderWhite();
}


// cont for cart when we add csrd to and poppop then the show me a count


let cartCount=document.getElementById("cartCount")
function increaseCount(){
  const totalItems = cart.reduce((total, item) => total + item.quantity,0 );
  cartCount.textContent = totalItems;
  localStorage.setItem("cart", JSON.stringify(cart));
}
 increaseCount()



//  functoin for white list in click when we click then function apply 

 window.whiteList=function(){
    window.open("whitelist.html", "_self");
 }

// funtion fr setting twhen we click on sething then what function run

 let allbtn=document.getElementById("allbtn")
 let setting=document.getElementById("setting")
//  window.setting=function(){
//     hero.style.display="none"
//     eight_card.style.display="none"
//     allbtn.style.display="none"
//      setting.style.display="block"

//  }


// Function to set mode


window.changebg=function(){
    let body=document.getElementById("body")
    let modeChange=document.getElementById("modeChange")
   
    let islight=body.classList.contains("light-mode")
    if(islight){
        proContainer.style.background="#222"
        body.classList.add("dark-mode")
        body.classList.remove("light-mode")
        body.style.transition="2s ease"
        modeChange.classList.remove("fa-moon");
        modeChange.classList.add("fa-sun");
        
    }else{
        proContainer.style.background="#ffff"
        body.classList.add("light-mode")
        body.classList.remove("dark-mode")
        modeChange.classList.remove("fa-sun");
        modeChange.classList.add("fa-moon");
    }
    saveCart()
}

// click for login form 

let logout=document.getElementById("logout")
logout.addEventListener("click", () => {

    window.replace.open("form.html")
});





