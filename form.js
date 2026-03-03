let login=document.getElementById("login")
let click=document.getElementById("click")
let SignUp=document.getElementById("SignUp")
let name=document.getElementById("name").value
let email=document.getElementById("email")
let wellCome=document.getElementById("wellCome")
let hide=document.getElementById("hide")

login.style.display="none"
wellCome.style.display="none"
// hide.style.display="none"


click.addEventListener("click", (event)=>{
    event.preventDefault();
    if(login.style.display="none"){
        login.style.display="block"
        login.style.margin=""
        SignUp.style.display="none"
    }
})

SignUp.addEventListener("submit",(event)=>{
    // event.preventDefault();
    let formData=new FormData(event.target)

 let userData={
    name:formData.get("name"),
    email:formData.get("email"),
    confirmEmail:formData.get("confirmEmail")
 }

 console.log(userData)


if (userData.email !== userData.confirmEmail) {
        alert("Emails do not match!");
        return;
    }

    // 2. Save to Local Storage
    localStorage.setItem("userProfile", JSON.stringify(userData));

    console.log("Data saved to localStorage:", userData);
    alert("Sign up successful!");

})

login.addEventListener("submit",(event)=>{
    event.preventDefault();

    let userProfile = JSON.parse(localStorage.getItem("userProfile"));


    let loginName = login.name.value;
    let loginEmail = login.email.value;

    if(userProfile && loginName===userProfile.name && loginEmail===userProfile.email){
        console.log("succesfull entered");
        alert("Login successful!");
        login.style.display="none"
        wellCome.style.display="block"
        hide.append(wellCome)
    }else{
         alert("Incorrect name or email!");
    }
    
})


function replace(){
    window.open("index.html");
}

