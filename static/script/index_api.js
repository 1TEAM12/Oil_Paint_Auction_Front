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

    const _WRAP = document.querySelector('.wrap');
    const _UL = document.querySelector('.listWrap');
    function listView(item){
        let _LI = document.createElement('div');
        _LI.className = "grid-item cat--4 js-load";
        _LI.innerHTML = 
        `
        <div class="explore-style-one">
                    <div class="thumb">
                        <a onclick="move_auction_detail_page(${item.id})"> <img src="${backendBaseUrl}${item.painting.after_image}" alt="nft live auction thumbnail"  style="width: 270px; height:270px;"></a>
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
                        종료일&nbsp;&nbsp;&nbsp;<span style='color:red;'>${item.end_date}</span>
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


        function more(length,max){
            let _BTN = document.createElement('div');
            
            
            _BTN.innerHTML = `<div style="text-align: center;"><a class="btn btn-gradient btn-medium" id="read_more">more</a></div>`
            return length > max && _WRAP.appendChild(_BTN)
        }
        
        const max = 4;
        let start = 0;
        if(response_json.length < max){
            for(let i=start; i < response_json.length; i++){
                _UL.appendChild(listView(response_json[i]))
            }
        }else{
            for(let i=start; i < max; i++){
                _UL.appendChild(listView(response_json[i]))
            }
        }
        
        let cnt = 1;
        more(response_json.length, max).addEventListener('click', function(e){
            cnt++;     
            if(response_json.length < max * cnt){ 
                for(let i= max * (cnt - 1); i< response_json.length; i++){
                    _UL.appendChild(listView(response_json[i]));
                }
                const _BTN = document.getElementById("read_more");
                _BTN.style.display = 'none';
            }else{
                for(let i=max * (cnt - 1); i< max * cnt - 1; i++){
                    _UL.appendChild(listView(response_json[i]));
                }
            }
        })
}


function move_auction_detail_page(auction_id){
    window.location.href = `/auction_details.html?$id=${auction_id}/`
    }

