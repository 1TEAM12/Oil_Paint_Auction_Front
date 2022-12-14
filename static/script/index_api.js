// 경매 list GET
window.onload = async function AuctionAlllistView(){

    const response = await fetch(`${backendBaseUrl}/auctions/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            }
    }
    )
    response_json = await response.json()

    response_json.closing_auction.forEach(item => {
        function diffDay(data) {
            const masTime = new Date(data);
            const todayTime = new Date();
            
            const diff = masTime - todayTime;
            
            const diffDay = Math.floor(diff / (1000*60*60*24));
            const diffHour = Math.floor((diff / (1000*60*60)) % 24);
            const diffMin = Math.floor((diff / (1000*60)) % 60);
            
            return `${diffDay}일 ${diffHour}시간 ${diffMin}분 `;
        }
        const now_bid = item.now_bid.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

        let remain_end_time = diffDay(item.end_date)
        $('#auction_deadline_view').append(
            `
            <div class="explore-style-one">
            <div class="thumb">
                <a onclick="move_auction_detail_page(${item.id})"> <img src="${backendBaseUrl}${item.painting.after_image}" alt="nft live auction thumbnail"  style="width: 270px; height:270px; object-fit:fill;"></a>
                <button class="reaction-btn"><i class="ri-heart-fill"></i><span>${item.auction_like_count}</span></button>
                <!-- End .reaction-count -->
            </div>
            <!-- End .thumb -->
            <div class="content">
                <div class="header d-flex-between pt-4 pb-3">
                    <h3 class="title"><a onclick="move_auction_detail_page(${item.id})">${item.painting.title}</a></h3>
                </div>
                <!-- .header -->
                <div class="product-share-wrapper">
                종료일&nbsp;&nbsp;&nbsp;<span style='color:red;'>약  ${remain_end_time}</span>
                </div>

                <div class="product-share-wrapper">
                Bid price&nbsp;&nbsp;&nbsp;<strong><span >${now_bid} Point</span></strong>
                </div>
                <!-- End product-share-wrapper -->
                <div class="product-owner py-4 d-flex-between">
                    <span class="bid-owner">Owned By <strong>${item.painting.owner}</a></strong></span>
                    
                </div>
                <!-- End .product-owner -->
                
                <!-- action-wrapper -->
            </div>
            <!-- End .content -->
            </div>
            `
        )
    })

    response_json.open_auctions.forEach(item => {
        function diffDay(data) {
            const masTime = new Date(data);
            const todayTime = new Date();
            
            const diff = masTime - todayTime;
            
            const diffDay = Math.floor(diff / (1000*60*60*24));
            const diffHour = Math.floor((diff / (1000*60*60)) % 24);
            const diffMin = Math.floor((diff / (1000*60)) % 60);
            
            return `${diffDay}일 ${diffHour}시간 ${diffMin}분 `;
        }
        const now_bid = item.now_bid.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

        let remain_end_time = diffDay(item.end_date)
        $('#auction_open_view').append(
            `
            <div class="explore-style-one">
            <div class="thumb">
                <a onclick="move_auction_detail_page(${item.id})"> <img src="${backendBaseUrl}${item.painting.after_image}" alt="nft live auction thumbnail"  style="width: 270px; height:270px; object-fit:fill;"></a>
                <button class="reaction-btn"><i class="ri-heart-fill"></i><span>${item.auction_like_count}</span></button>
                <!-- End .reaction-count -->
            </div>
            <!-- End .thumb -->
            <div class="content">
                <div class="header d-flex-between pt-4 pb-3">
                    <h3 class="title"><a onclick="move_auction_detail_page(${item.id})">${item.painting.title}</a></h3>
                </div>
                <!-- .header -->
                <div class="product-share-wrapper">
                종료일&nbsp;&nbsp;&nbsp;<span style='color:red;'>약  ${remain_end_time}</span>
                </div>

                <div class="product-share-wrapper">
                Bid price&nbsp;&nbsp;&nbsp;<strong><span >${now_bid} Point</span></strong>
                </div>
                <!-- End product-share-wrapper -->
                <div class="product-owner py-4 d-flex-between">
                    <span class="bid-owner">Owned By <strong>${item.painting.owner}</a></strong></span>
                    
                </div>
                <!-- End .product-owner -->
                
                <!-- action-wrapper -->
            </div>
            <!-- End .content -->
            </div>
            `
        )
    })


    const _WRAP = document.querySelector('.wrap');
    const _UL = document.querySelector('.listWrap');

    function listView(item){
    // 경매 마감 남은 시간
    
    
    function diffDay(data) {
        const masTime = new Date(data);
        const todayTime = new Date();
        
        const diff = masTime - todayTime;
        
        const diffDay = Math.floor(diff / (1000*60*60*24));
        const diffHour = Math.floor((diff / (1000*60*60)) % 24);
        const diffMin = Math.floor((diff / (1000*60)) % 60);
        
        return `${diffDay}일 ${diffHour}시간 ${diffMin}분 `;
    }
    const now_bid = item.now_bid.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let remain_end_time = diffDay(item.end_date)

        let _LI = document.createElement('div');
        _LI.className = "grid-item cat--4 js-load";
        _LI.innerHTML = 
        `
        <div class="explore-style-one">
                    <div class="thumb">
                        <a onclick="move_auction_detail_page(${item.id})"> <img src="${backendBaseUrl}${item.painting.after_image}" alt="nft live auction thumbnail"  style="width: 270px; height:270px; object-fit:fill;"></a>
                        <button class="reaction-btn"><i class="ri-heart-fill"></i><span>${item.auction_like_count}</span></button>
                        <!-- End .reaction-count -->
                    </div>
                    <!-- End .thumb -->
                    <div class="content">
                        <div class="header d-flex-between pt-4 pb-3">
                            <h3 class="title"><a onclick="move_auction_detail_page(${item.id})">${item.painting.title}</a></h3>
                        </div>
                        <!-- .header -->
                        <div class="product-share-wrapper">
                        종료일&nbsp;&nbsp;&nbsp;<span style='color:red;'>약  ${remain_end_time}</span>
                        </div>

                        <div class="product-share-wrapper">
                        Bid price &nbsp;&nbsp;&nbsp;<strong>${now_bid}<span> Point</span></strong>
                        </div>
                        <!-- End product-share-wrapper -->
                        <div class="product-owner py-4 d-flex-between">
                            <span class="bid-owner">Owned By <strong>${item.painting.owner}</a></strong></span>
                            
                        </div>
                        <!-- End .product-owner -->
                        
                        <!-- action-wrapper -->
                    </div>
                    <!-- End .content -->
                </div>
        `;
        return _LI
    }


        function more(){
            let _BTN = document.createElement('div');
            
            
            _BTN.innerHTML = `<div style="text-align: center;"><a class="btn btn-gradient btn-medium" id="read_more">read more</a></div>`
            return _WRAP.appendChild(_BTN)

        }
        
        const max = 4;
        let start = 0;
        let cnt = 1;

        if(response_json.auction.length < max){
            for(let i=start; i < response_json.auction.length; i++){
                _UL.appendChild(listView(response_json.auction[i]))
            }
        }else{
            for(let i=start; i < max; i++){
                _UL.appendChild(listView(response_json.auction[i]))
            }
        }
        
        more(response_json.auction.length, max).addEventListener('click', function(e){
            cnt++;     

            if(response_json.auction.length < max * cnt){ 
                for(let i= max * (cnt - 1); i< response_json.auction.length; i++){
                    _UL.appendChild(listView(response_json.auction[i]));
                }
                const _BTN = document.getElementById("read_more");
                _BTN.style.display = 'none';
            }else{
                for(let i=max * (cnt - 1); i< max * cnt; i++){
                    _UL.appendChild(listView(response_json.auction[i]));
                }
            }
        })
}


function move_auction_detail_page(auction_id){
    window.location.href = `/auction_details.html?$id=${auction_id}/`
    }
