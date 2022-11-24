//프로필 
async function Profile(){
    
    const response = await fetch(`${backendBaseUrl}/users/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            }
        }
    )
    const response_json = await response.json()
    console.log(response_json)
    const h4_profile_nickname = document.getElementById("profile_nickname")
    const p_profile_email = document.getElementById("profile_email")
    const h5_profile_point = document.getElementById("profile_point")

    h4_profile_nickname.innerText = response_json.nickname
    p_profile_email.innerText = response_json.email
    h5_profile_point.innerText = `${response_json.point} Point`


    document.getElementById("profile_image").src = `${backendBaseUrl}${response_json.profile_image}`
}
Profile()

//프로필 
async function Profile(){
    
    const response = await fetch(`${backendBaseUrl}/users/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            }
        }
    )
    const response_json = await response.json()
    console.log(response_json)
    const h4_profile_nickname = document.getElementById("profile_nickname")
    const p_profile_email = document.getElementById("profile_email")
    const h5_profile_point = document.getElementById("profile_point")

    h4_profile_nickname.innerText = response_json.nickname
    p_profile_email.innerText = response_json.email
    h5_profile_point.innerText = `${response_json.point} Point`


    document.getElementById("profile_image").src = `${backendBaseUrl}${response_json.profile_image}`
}

// 회원탈퇴
async function withdrawal() {
    var delConfirm = confirm("정말 계정 비활성화를 진행하시겠습니까?")
    if (delConfirm) {
    const response = await fetch(`${backendBaseUrl}/users/`, {
        method: "DELETE",
        headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access")
        }
    })

    withdrawal_json = await response.json()
    if (response.status === 200) {
    alert(withdrawal_json["message"])
    localStorage.removeItem("payload")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    location.replace('user.html')    }
    }
}

//새로운 창 뜨게하기
function ProfileEditNewTab() {
    window.open(`${frontendBaseUrl}/profile_edit.html`, "","width=600, height=600");
  }
function ChangePasswordNewTab() {
    window.open(`${frontendBaseUrl}/user_password_confirm.html`, "","width=600, height=600");
  }
  
  //에러 메시지
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

