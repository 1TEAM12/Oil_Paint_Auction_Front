const signup = document.getElementById("sign-up");
signin = document.getElementById("sign-in");
loginin = document.getElementById("login-in");
loginup = document.getElementById("login-up");

signup.addEventListener("click", () => {
    loginin.classList.remove("block");
    loginup.classList.remove("none");

    loginin.classList.add("none");
    loginup.classList.add("block");
})

signin.addEventListener("click", () => {
    loginin.classList.remove("none");
    loginup.classList.remove("block");

    loginin.classList.add("block");
    loginup.classList.add("none");
})

//비밀번호 text or password type 변환
var lock_icon_signup = document.getElementById('lock_icon_signup');
var lock_icon_re_signup = document.getElementById('lock_icon_re_signup');
var lock_icon_login = document.getElementById('lock_icon_login');
var sign_up_password = document.getElementById("signup_password");
var sign_up_repassword = document.getElementById("repassword");
var login_password = document.getElementById("login_password");
lock_icon_signup.addEventListener('click', ()=>{
    hideAndShowPass(lock_icon_signup, signup_password); 
});

lock_icon_re_signup.addEventListener('click', ()=>{
    hideAndShowPass(lock_icon_re_signup, sign_up_repassword); 
});

lock_icon_login.addEventListener('click', ()=>{
    hideAndShowPass(lock_icon_login, login_password);  
});

const hideAndShowPass = (lock_icon, password) => {
    if(lock_icon.classList.contains("bx-lock")){
        lock_icon.classList.remove('bx-lock');
        lock_icon.classList.add('bx-lock-open');
        password.setAttribute('type', 'text');
        
    }
    else{
        lock_icon.classList.remove('bx-lock-open');
        lock_icon.classList.add('bx-lock');
        password.setAttribute('type', 'password');
    }
};

if(document.getElementById("input_check").checked) {
    document.getElementById("input_check_hidden").disabled = true;
}


//비밀번호 찾기 모달창
const openButton = document.getElementById("forgot_password");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modal__overlay")
const closeBtn = modal.querySelector("button")
const openModal = () =>{
    modal.classList.remove("hidden");
}
const closeModal = () => {
    modal.classList.add("hidden");
}
overlay.addEventListener("click", closeModal)
closeBtn.addEventListener("click", closeModal)
openButton.addEventListener("click", openModal)