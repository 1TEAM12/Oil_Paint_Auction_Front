const token = location.href.split('/')[5]
const uidb64 = location.href.split('/')[4]

Check_Password()

//비밀번호 확인
async function Check_Password() {

    const response = await fetch(`${backendBaseUrl}/users/password-reset/${uidb64}/${token}`,{
        headers:{
            'Content-type':'application/json',
        },
        method: 'GET',
    })

    const result = await response.json()
    console.log(result)
    if (response.status === 401) {
        alert(result["message"])
        location.replace('index.html')
    }
}

//비밀번호 재설정
async function Set_Password() {

    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;
    console.log(uidb64)
    const response = await fetch(`${backendBaseUrl}/users/password-reset-complete/`,{
        headers:{
            'Content-type':'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({"password":password, "repassword":repassword, "uidb64":uidb64, "token":token})
    })

    const result = await response.json()
    console.log(result)
    if (response.status === 200) {
        alert(result["message"])
        location.replace('user.html')
        
    } else if (response.status == 401){
        alert("링크가 유효하지 않습니다.")

    } else {
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