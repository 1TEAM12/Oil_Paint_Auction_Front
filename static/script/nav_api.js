//네비바 프로필
async function Nav_Profile(){
    
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

    const a_nav_user_email = document.getElementById("nav_user_email")
    const a_nav_user_nickname = document.getElementById("nav_user_nickname")
    const a_nav_user_point = document.getElementById("nav_user_point")

    a_nav_user_email.innerText = `이메일 : ${response_json.email}`
    a_nav_user_nickname.innerText = `닉네임 : ${response_json.nickname}`
    a_nav_user_point.innerText = `보유포인트 : ${response_json.point} Point`


    document.getElementById("nav_profile_image").src = `${backendBaseUrl}${response_json.profile_image}`
} 
Nav_Profile();