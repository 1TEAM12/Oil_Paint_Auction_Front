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
    response_json = await response.json()

        

    const h4_profile_nickname = document.getElementById("profile_nickname")
    const p_profile_email = document.getElementById("profile_email")
    const h5_profile_point = document.getElementById("profile_point")

    h4_profile_nickname.innerText = response_json.nickname
    p_profile_email.innerText = response_json.email
    h5_profile_point.innerText = `${response_json.point} Point`


    document.getElementById("profile_image").src = `${backendBaseUrl}${response_json.profile_image}`

        response_json.like_auction.forEach(item => {
            $('#action_like_list').append(
                `
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 mb-6">
                <div class="explore-style-one">
                    <div class="thumb">
                    <a href="auction_details.html?id=${item.id}/"><img src="${backendBaseUrl}${item.painting.after_image}"alt="nft live auction thumbnail"></a>
                    <!-- End .reaction-count -->
                    </div>
                    <!-- End .thumb -->
                    <div class="content">
                    <div class="header d-flex-between pt-4 pb-3">
                        <h3 class="title"><a href="product-details.html">${item.painting.title}</a></h3>
                    </div>
                    <!-- .header -->
                    <!-- End product-share-wrapper -->
                    <div class="product-owner py-4 d-flex-between">
                        <span class="bid-owner">Owned By <strong> ${item.painting.owner}</a></strong></span>
                    </div>
                    </div>
                    <!-- End .content -->
                </div>
                </div>
                `
            )
        })
}

async function Auction_History_View(){

    const response = await fetch(`${backendBaseUrl}/auctions/${auction_id}/history/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            }
    }
    )
    response_json = await response.json()
        response_json.forEach(item => {
            let time_before = time2str((item['created_at']))
            
            $('#auction_history_view').append(
                `
                <div class="single-item-history d-flex-center">
                    <div class="avatar">
                        <img src="${backendBaseUrl}${item['bidder_profile_image']}" alt="history">
                    <i class="ri-check-line"></i>
                    </div>
                    <!-- end avatar -->
                    <div class="content">
                    <p>Bid accepted <span class="color-primary fw-500">${item['now_bid']}
                    Point</span> by <h5 style="font-size:16px;"class="text-white" >${item['bidder']}</h5></p>
                    <span class="date">${time_before}</span>
                    </div>
                </div>
                `
            )
        })
}
Profile()

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

