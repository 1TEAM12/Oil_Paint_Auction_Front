//로그인 토큰 확인
function service(){
    const storge = localStorage.getItem("payload");
    if (storge){
        alert("접근이 불가능합니다.")
        location.replace(history.back())
    }}
service();

//회원가입
async function Sign_Up() {
    let input_check;
    if (document.getElementById("input_check").checked){
        input_check = document.getElementById("input_check").value
        console.log(input_check)
    } else{
        input_check = document.getElementById("input_check_hidden").value
        console.log(input_check)
    }
    const signupData = {
        repassword: document.getElementById("repassword").value,
        password: document.getElementById("signup_password").value,
        nickname: document.getElementById("nickname").value,
        email: document.getElementById("email").value,
        term_check : input_check,
    }

    const response = await fetch(`${backendBaseUrl}/users/`,{
        headers:{
            'Content-type':'application/json',
        },
        method: 'POST',
        body: JSON.stringify(signupData)
    })

    const result = await response.json()
    
    if (response.status === 201) {
        alert("회원가입 성공")
        document.getElementById('sign-in').click()
        
    } else if (response.status === 400) {
        document.getElementById('alert-danger').style.display ="block"
        const key = Object.keys(result)[0];
        makeAlert(key, result[key][0]);
        
    }
}

function makeAlert(key, errorText){
    if (document.getElementsByClassName("alert-danger")[0]){
        const alert_div = document.getElementsByClassName("alert-danger")[0];
        alert_div.innerText = `${errorText}`
    } else {
    const alert_div = document.createElement("div");
    const signup_form = document.getElementsByClassName("signup")[0];
    alert_div.setAttribute("class", "alert-danger");
    alert_div.innerText = `${errorText}`;
    const signup_button = signup_form.childNodes[8];
    signup_form.insertBefore(alert_div, signup_button); }
}

//로그인
async function Login() {
    const email = document.getElementById("signin_email").value;
    const password = document.getElementById("login_password").value;

    const response = await fetch(
        `${backendBaseUrl}/users/api/token/`,
        { 
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({"email": email, "password": password})
        }
    )
    const response_json = await response.json()

    localStorage.setItem("access", response_json.access); 
    localStorage.setItem("refresh", response_json.refresh);
    
    if (response.status === 200) {
        alert("로그인 성공");

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(function (c) {
                return '%' + (
                    '00' + c.charCodeAt(0).toString(16)
                ).slice(-2);
            }).join('')
        );
        localStorage.setItem("payload", jsonPayload);
        location.replace('index.html')

    } else if(response.status === 400 && response_json["non_field_errors"])  {
        alert(response_json["non_field_errors"])

    } else {
        alert("이메일과 비밀번호를 확인해주세요.");
    }
}