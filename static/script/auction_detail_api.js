

window.onload = async function loadAuction(auctionId){
    const response = await fetch('http://127.0.0.1:8000/auctions/1/10/', { method: 'GET'})
    response_json = await response.json()

    console.log(response_json)
     
    const auction_title = document.getElementById("auction_title")
    const auction_owner = document.getElementById("auction_owner")
    const auction_content = document.getElementById("auction_content")
    const auction_end_date = document.getElementById("auction_end_date")
    const auction_like_count = document.getElementById("auction_like_count")
    const auction_now_bid = document.getElementById("auction_now_bid")
    
    auction_title.innerText = response_json.painting.title
    auction_content.innerText = response_json.painting.content
    auction_owner.innerText = response_json.painting.owner
    auction_end_date.innerText = response_json.end_date
    auction_like_count.innerText = response_json.auction_like_count
    auction_now_bid.innerText = response_json.now_bid
    
    // 상세페이지 이미지
    const painting_image = document.getElementById("painting_image")
    let image_url = response_json.painting.after_image
    painting_image.setAttribute("src", `${backendBaseUrl}${image_url}`)

}

// 경매 삭제
async function AuctionDetailDelete(){
    var delConfirm = confirm("정말 삭제를 하시겠습니까?")
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