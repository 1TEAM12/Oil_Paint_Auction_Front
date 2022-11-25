

window.onload = async function loadAuction(auctionId){
    const response = await fetch('http://127.0.0.1:8000/auctions/detail/3/', { method: 'GET'})

    response_json = await response.json()

    console.log(response_json)

    if (response.status === 400) {
        alert("경매가 마감되었습니다.")
        location.replace('index.html')
    } else {


    const auction_title = document.getElementById("auction_title")
    const auction_owner = document.getElementById("auction_owner")
    const auction_content = document.getElementById("auction_content")
    const auction_like_count = document.getElementById("auction_like_count")
    const auction_now_bid = document.getElementById("auction_now_bid")




    auction_title.innerText = response_json.painting.title   
    auction_owner.innerText = response_json.painting.owner
    auction_content.innerText = response_json.painting.content
    auction_like_count.innerText = response_json.auction_like_count
    auction_now_bid.innerText = response_json.now_bid


    
    // 상세페이지 이미지
    const painting_image = document.getElementById("painting_image")
    let image_url = response_json.painting.after_image
    painting_image.setAttribute("src", `${backendBaseUrl}${image_url}`)

    // 시간 formating
    const remaining_time = response_json.end_date

    // 경매 마감 남은 시간
    const remainTime = document.querySelector("#remain-time");
    
    function diffDay() {
        const masTime = new Date(remaining_time);
        const todayTime = new Date();
        
        const diff = masTime - todayTime;
        
        const diffDay = Math.floor(diff / (1000*60*60*24));
        const diffHour = Math.floor((diff / (1000*60*60)) % 24);
        const diffMin = Math.floor((diff / (1000*60)) % 60);
        const diffSec = Math.floor(diff / 1000 % 60);
        
        remainTime.innerText = `${diffDay}일 ${diffHour}시간 ${diffMin}분 ${diffSec}초`;
    }

    diffDay();
    setInterval(diffDay, 1000);
    }
}

// 낙찰가 Update
async function BidUpdate(){
 
    const bidData = {
        "now_bid": document.getElementById("now_bid").value,
    }   

    const response = await fetch(`${backendBaseUrl}/auctions/detail/3/`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            },
        body: JSON.stringify(bidData)
    }
    )
    console.log(response)

    const response_json = await response.json()

    if (response.status === 200) {
        alert("입찰이 완료되었습니다.")
        location.reload()

    }else if (response.status === 400)  {  
        alert(response_json["error"])

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

    // function displayTime(timeValue) {
    //     var today = new Date();
    //     var gap = today.getTime() - timeValue;
    //     var dateObj = newDate(timeValue);
    //     var str = "";

    //     //24시간이 지나지 않은 댓글
    //     if (gap < (1000 * 60 * 60 * 24)) {
    //         var hh = dateObj.getHour();
    //         var mi = dateObj.getMinutes();
    //         var ss = dateObj.getSeconds();
    //         return [(hh > 9? '': '0') + hh, ':', (mi > 9 ? '' : '0') + mi, (ss > 9 ? '' : '0') + ss].join('');
    //     } else {
    //     // 24시간이 지난 댓글
    //         var yy = dateObj.getFullYear();
    //         var mm = dateObj.getMonth()+1;
    //         var dd = dateObj.getDate();
    //         return [yy, '/', (mm > 9 ? '' : '0') + mm, '/', (dd > 9 ? '' : '0') + dd].join('');
    //     }
    //     }
    

    $('#comment_box').empty()
    response_json2.forEach(item => {
        
        // $('#comment_container').append(
            $('#comment_box').append(
                `<ul class="comment-box-inner" style="height:70px;">
                    <li class="single-comment-box d-flex-between ">
                        <div class="inner d-flex-start">
                            <a href="#" class="avatar">
                                <img src="${backendBaseUrl}/${item['profile_image']}" alt="author">
                            </a>
                            <!-- End .avatar -->
                            <div class="content">
                                <h5 class="title">${item['user']}<span class="date-post"> ${item['updated_at']}&nbsp&nbsp</span> 
                                <div class="more-dropdown details-dropdown"><i class="ri-more-fill" data-bs-toggle="dropdown"></i>
                                <ul class="dropdown-menu dropdown-menu-dark">
                                <li><a class="dropdown-item" onclick="#">수정</a></li>
                                <li><a class="dropdown-item" onclick="deleteComment(${item['id']})">삭제</a></li>
                                </ul>
                            </div>
                                </h5>
                                <p id="comment_content">${item['comment']}</p>
                            </div>
                        </div>
                    </li>
                <!-- End .single-comment-box -->
                </ul></div>
                <hr>
                `
            ),
            $('#dropdown_box').append(
                ``)
        // )
        });
        
}

// 댓글 생성
async function createComment(){
    const comment = document.getElementById("comment_contents").value
    console.log(comment)

    const formData = new FormData()
    formData.append("comment", comment)

    const response = await fetch(`${backendBaseUrl}/auctions/${auction_id}/comments/`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body : formData
    })
    response_json = await response.json()
    console.log("-댓글 저장-")
    console.log(response_json)
}



// 댓글 삭제
async function deleteComment(comment_id){
    var delConfirm = confirm("정말 파일을 삭제하시겠습니까?")
    if (delConfirm) {}
    const response = await fetch(`${backendBaseUrl}/auctions/${auction_id}/comments/${comment_id}/`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
    })
    response_json = await response.json
        if (response.status === 200) {
            alert("댓글이 삭제되었습니다.")
            window.location.reload()
            return response_json
        }else {
            alert(response_json["error"])
        }
}


// 댓글 수정
async function updatecomment(id, comment_id, comment){
    const formData = new FormData()
    formData.append("comment", comment)

    const response = await fetch(`${backendBaseUrl}/auctions/${auction_id}/comments/${comment_id}/`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            },
        body: formData
    })
    response_json = await response.json()
    
    if (response.status == 200) {
        alert ("댓글이 수정되었습니다.")
        location.reload();
        return response_json

    }else {
        alert(response_json["error"])
    }
}