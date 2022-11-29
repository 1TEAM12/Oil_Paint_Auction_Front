function sendSearchKeyword(){
    var inputValue = document.getElementById('search').value;
    window.location.href = `/auction_search.html?search=${inputValue}`;
}


async function searchParam(){
    let getLink = window.location.search;
    let getLink_Name = getLink.split('=');
    let getLink_result = getLink_Name[1]
    let decodeResult = decodeURI(getLink_result);

    if(decodeResult){
        const response = await fetch(`${backendBaseUrl}/auctions/search?search=${decodeResult}`,{
                headers:{
                    'content-type':'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("access")     
            },
            method:'GET',
        })
            const response_json = await response.json()
            
        if(response_json.length){
            
                response_json.forEach((item, key) => {
                    console.log(item)
                    console.log(item.painting[key])

                    
                    function diffDay(data) {
                        const masTime = new Date(data);
                        const todayTime = new Date();
                        
                        const diff = masTime - todayTime;
                        
                        const diffDay = Math.floor(diff / (1000*60*60*24));
                        const diffHour = Math.floor((diff / (1000*60*60)) % 24);
                        const diffMin = Math.floor((diff / (1000*60)) % 60);
                        
                        return `${diffDay}일 ${diffHour}시간 ${diffMin}분 `;
                    }
    
                    let remain_end_time = diffDay(item.paintings[key].end_date)
                    const now_bid = item.paintings[key].now_bid.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

                    $('#auction_search_view').append(
                        `
                        <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 mb-6">
                            <div class="explore-style-one">
                                <div class="thumb">
                                <a href="auction_details.html?$id=${item.paintings[key].id}/"><img src="${backendBaseUrl}${item.paintings[key].painting.after_image}"
                                    alt="nft live auction thumbnail"></a>
                                <button class="reaction-btn"><i class="ri-heart-fill"></i><span>${item.paintings[key].auction_like_count}</span></button>
                                <!-- End .reaction-count -->
                                </div>
                                <!-- End .thumb -->
                                <div class="content">
                                <div class="header d-flex-between pt-4 pb-3">
                                    <h3 class="title"><a href="auction_details.html">${item.paintings[key].painting.title}</a></h3>
                                </div>
                                <!-- .header -->
                                <div class="product-share-wrapper">
                                종료일&nbsp;&nbsp;&nbsp;<span id='remain-time' style='color:red;'>${remain_end_time}</span>
                                </div>
                                <p></p>
                                <div class="product-share-wrapper">
                                <span class="bid-owner">Bid Price : <strong>${now_bid} Point</strong></span>
                                </div>
                                <!-- End product-share-wrapper -->
                                <div class="product-owner py-4 d-flex-between">
                                    <span class="bid-owner">Owned By <strong>${item.paintings[key].painting.owner}</strong></span>
                                </div>
                                <!-- End .product-owner -->
                                </div>
                                <!-- action-wrapper -->
                                </div>
                                <!-- End .content -->
                            </div>
                        </div>
                        `
                    )
                
                });  
                
        }else{
            alert(`${decodeResult} 검색내용이 없습니다!`);
        }
    }else{
        alert(`검색내용을 입력해주세요!`);
    }
}

function enterkey(e) {
    if (window.event.keyCode == 13){
        sendSearchKeyword().then();
    }
}


function move_detail_page(click_id){ 
    window.location.href = `/auction_detail.html?$id=${click_id}`;

}