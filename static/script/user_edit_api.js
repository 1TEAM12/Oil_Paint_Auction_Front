//로그인 토큰 확인
function user_edit_service(){
    const storge = localStorage.getItem("payload");
    if (storge){
    }else {
        alert("로그인이 필요합니다.")
        location.replace(history.back())
    }}
user_edit_service()


//비밀번호 변경을 위한 인증
async function ConfirmPassword() {

    const password =  document.getElementById("password").value
    const response = await fetch(`${backendBaseUrl}/users/changepassword/`,{
        headers:{
            'Content-type':'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: JSON.stringify({"password":password})
    })

  if (response.status === 200) {
      alert("비밀번호 확인 완료")
      window.location.replace(`user_password_change.html`)
  } else if (response.status === 400) {
    alert("현재 비밀번호와 동일한 비밀번호를 입력해주세요")
  } 
}

//비밀번호 변경
async function ChangePassword() {

    const ChangePassowordData = {
        repassword: document.getElementById("repassword").value,
        password: document.getElementById("password").value,
    }

    const response = await fetch(`${backendBaseUrl}/users/changepassword/`,{
        headers:{
            'Content-type':'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify(ChangePassowordData)
    })

    const result = await response.json()

    if (response.status === 200) {
        alert("비밀번호 변경 완료")
        localStorage.removeItem("payload")
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        window.close()

    } else if (response.status === 400) {
        document.getElementById('alert-danger').style.display ="block"
        const key = Object.keys(result)[0];
        makeAlert(key, result[key][0]);
        
    }
}

//회원수정
async function ProfileEdit() {

    let image = document.querySelector("#id_photo")
    let nickname = document.getElementById("nickname").value
    let profile_image = image.files[0]
    let formData = new FormData()

    formData.append("profile_image", profile_image)
    formData.append("nickname", nickname)
    
    const response = await fetch(`${backendBaseUrl}/users/`, {
    method: "PUT",
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("access")
    },
    body: formData
    })

    const result = await response.json()

    if (response.status === 200) {
        alert("회원정보 수정이 완료되었습니다.")
        window.close()
        
    } else if (response.status === 400) {
        document.getElementById('alert-danger').style.display ="block"
        const key = Object.keys(result)[0];
        makeAlert(key, result[key][0]);
        
    }  else if(response.status == 403) {
        alert("접근이 불가능합니다.")
        window.location.replace(`user.html`)
    }
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


var fileInput = document.querySelector("#id_photo"),
button = document.querySelector(".input-file-trigger"),
the_return = document.querySelector(".file-return");
fileInput.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
function handleImage(e) {
var reader = new FileReader();
reader.onload = function (event) {
    var img = new Image();
    // var imgWidth =
    img.onload = function () {
        canvas.width = 200;
        canvas.height = 200;
        ctx.drawImage(img, 0, 0, 200, 200);
    };
    img.src = event.target.result;
};
reader.readAsDataURL(e.target.files[0]);
}