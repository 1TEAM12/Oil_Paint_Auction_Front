

window.onload = async function loadAuction(auctionId) {
    const response = await fetch('http://127.0.0.1:8000/auctions/detail/2/', { method: 'GET' })
    response_json = await response.json()

    console.log(response_json)

    if (response.status === 400) {
        alert("경매가 마감되었습니다.")
        location.replace('index.html')
    } else {

        const auction_title = document.getElementById("auction_title")
        const auction_owner = document.getElementById("auction_owner")
        const auction_content = document.getElementById("auction_content")
        // const auction_end_date = document.getElementById("auction_end_date")
        const auction_like_count = document.getElementById("auction_like_count")
        const auction_now_bid = document.getElementById("auction_now_bid")

        auction_title.innerText = response_json.painting.title
        auction_content.innerText = response_json.painting.content
        auction_owner.innerText = response_json.painting.owner
        // auction_end_date.innerText = response_json.end_date
        auction_like_count.innerText = response_json.auction_like_count
        auction_now_bid.innerText = response_json.now_bid

        // 상세페이지 이미지
        const painting_image = document.getElementById("painting_image")
        let image_url = response_json.painting.after_image
        painting_image.setAttribute("src", `${backendBaseUrl}${image_url}`)

        console.log(response_json.end_date)
        console.log(response_json.end_date.split('T')[0])

        // 시간 formating
        const remaining_time = response_json.end_date.split('T')[0]

        // 경매 마감 남은 시간
        const remainTime = document.querySelector("#remain-time");


        function diffDay() {
            const masTime = new Date(remaining_time);
            const todayTime = new Date();

            const diff = masTime - todayTime;

            const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
            const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const diffMin = Math.floor((diff / (1000 * 60)) % 60);
            const diffSec = Math.floor(diff / 1000 % 60);

            remainTime.innerText = `${diffDay}일 ${diffHour}시간 ${diffMin}분 ${diffSec}초`;
        }
        diffDay();
        setInterval(diffDay, 1000);
        console.log(response_json.id)
        localStorage.setItem("auction_id", response_json.id)
        
    }
}


// 경매 삭제
async function AuctionDetailDelete() {
    var delConfirm = confirm("경매 취소하시겠습니까?")
    if (delConfirm) {
        const response = await fetch(`${backendBaseUrl}/auctions/1/10/`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            }
        }
        )
        response_json = await response.json
        if (response.status === 200) {
            alert("경매가 취소되었습니다")
            location.replace('index.html')
        } else {
            alert(response_json["error"])

        }
    }
}


$(document).ready(function(){
    auction_id = localStorage.getItem("auction_id")
    loadComment(auction_id);
});


// 댓글 불러오기
async function loadComment(auction_id) {
    const response2 = await fetch(`${backendBaseUrl}/auctions/${auction_id}/comments/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        }
    })
    response_json2 = await response2.json()
    console.log("-댓글 로드-")
    console.log(response_json2)

    $('#comment_box').empty()
    response_json2.forEach(item => {
        $('#comment_box').append(
            `<ul class="comment-box-inner">
                <li class="single-comment-box d-flex-between ">
                    <div class="inner d-flex-start">
                        <a href="#" class="avatar">
                            <img src="${backendBaseUrl}/${item['profile_image']}" alt="author">
                        </a>
                        <!-- End .avatar -->
                        <div class="content">
                            <h5 class="title">${item['user']}<span class="date-post">Feb 8,2022 &nbsp&nbsp</span> 
                                <i class="ri-more-fill" data-bs-toggle="dropdown"></i>
                                <ul class="dropdown-menu dropdown-menu-dark">
                                    <li><a class="dropdown-item" href="#">Edit</a></li>
                                    <li><a class="dropdown-item" href="#">Delete</a></li>
                                </ul>
                            </h5>
                            <p id="comment_content">${item['comment']}</p>
                        </div>
                    </div>
                </li>
            <!-- End .single-comment-box -->
            </ul>`
        )
    });
}

