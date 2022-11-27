const backendBaseUrl = "http://127.0.0.1:8000"
const frontendBaseUrl = "http://127.0.0.1:5500"
// const frontendBaseUrl = "http://192.168.219.105:5500"

function logout_view(){
    const storge = localStorage.getItem("payload");
    const login_view = document.getElementById("login_view")
    const logout_view = document.getElementById("logout_view")
    const profile_view = document.getElementById("profile_view")
    const create_painting = document.getElementById("create_painting")
    const a_nav_user_email = document.getElementById("nav_user_email")
    const a_nav_user_nickname = document.getElementById("nav_user_nickname")
    const a_nav_user_point = document.getElementById("nav_user_point")

    if (storge){
        login_view.setAttribute("style", "display:none;")
    } else{
        a_nav_user_email.setAttribute("style", "display:none;")
        a_nav_user_nickname.setAttribute("style", "display:none;")
        a_nav_user_point.setAttribute("style", "display:none;")

        logout_view.setAttribute("style", "display:none;")
        profile_view.setAttribute("style", "display:none;")
        create_painting.setAttribute("style", "display:none;")
    }

} logout_view()


//로그아웃
async function logout_user(){
    const response = await fetch(`${backendBaseUrl}/users/logout/`, {

        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify({"refresh": localStorage.getItem("refresh")})
    })
    response_json = await response.json
        if (response.status === 200) {
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            localStorage.removeItem("payload")
            alert("로그아웃 완료")
            window.location.replace('user.html')

        } else if (response.status === 400) {

        alert("토큰이 유효하지 않습니다.")

        } else if (response.status === 403) {
        alert("접근 권한이 없습니다.")
        }
}