
window.onload = async function loadAuction(auctionId){

    const response = await fetch('http://127.0.0.1:8000/auctions/detail/3/', { method: 'GET'})
    response_json = await response.json()

    console.log(response_json)
    
    if (response.status === 400) {
        alert("경매가 마감되었습니다.")
        location.replace('index.html')    
    }else {

    const auction_title = document.getElementById("auction_title")
    const auction_owner = document.getElementById("auction_owner")
    const auction_content = document.getElementById("auction_content")
    const auction_like_count = document.getElementById("auction_like_count")
    const auction_now_bid = document.getElementById("auction_now_bid")
    const auction_now_bidder = document.getElementById("auction_now_bidder")



    auction_title.innerText = response_json.painting.title   
    auction_owner.innerText = response_json.painting.owner
    auction_content.innerText = response_json.painting.content
    auction_like_count.innerText = response_json.auction_like_count
    auction_now_bid.innerText = response_json.now_bid
    auction_now_bidder.innerText = response_json.bidder

    
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
async function AuctionDetailDelete(){
    var delConfirm = confirm("경매 취소하시겠습니까?")
    if (delConfirm) {const response = await fetch(`${backendBaseUrl}/auctions/1/10/`, {
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
    }else {
        alert(response_json["error"])
  
    }
}}

