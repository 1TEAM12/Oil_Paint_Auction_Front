// 경매 list GET
async function AuctionAlllistView(){

    const response = await fetch(`${backendBaseUrl}/auctions/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            }
    }
    )
    response_json = await response.json()
    console.log(response_json)
        response_json.forEach(item => {
            $('#auctionlist').append(
                `
                <div class="grid-item cat--4" >
                    <div class="explore-style-one">
                        <div class="thumb">
                            <a href="auction_details.html"> <img src="${backendBaseUrl}${item.painting.after_image}" alt="nft live auction thumbnail"  style="width: 270px; height:270px;"></a>
                            <button class="reaction-btn"><i class="ri-heart-fill"></i><span>${item.auction_like_count}</span></button>
                            <!-- End .reaction-count -->
                        </div>
                        <!-- End .thumb -->
                        <div class="content">
                            <div class="header d-flex-between pt-4 pb-3">
                                <h3 class="title"><a href="product-details.html">${item.painting.title}</a></h3>
                                <div class="more-dropdown "><i class="ri-more-fill" data-bs-toggle="dropdown"></i>
                                    <ul class="dropdown-menu dropdown-menu-dark">
                                        <li><a class="dropdown-item" href="#">New bid</a></li>
                                        <li>
                                        <hr class="dropdown-divider">
                                        </li>
                                        <li><a class="dropdown-item" href="#">Refresh Metadata</a></li>
                                        <li><a class="dropdown-item" href="#">Share</a></li>
                                        <li><a class="dropdown-item" href="#">Report</a></li>

                                    </ul>
                                </div>
                            </div>
                            <!-- .header -->
                            <div class="product-share-wrapper">
                            종료일&nbsp;&nbsp;&nbsp;<span style='color:red;'>${item.end_date}</span>
                            </div>
                            <!-- End product-share-wrapper -->
                            <div class="product-owner py-4 d-flex-between">
                                <span class="bid-owner">Owned By <strong><a href="author-profile.html">${item.painting.owner}</a></strong></span>
                                
                            </div>
                            <!-- End .product-owner -->
                            <div class="action-wrapper d-flex-between pt-4">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#bid_history" class="history d-flex-center"><i
                                    class="ri-history-line"></i>View History</a>
                                <a href="#" data-bs-toggle="modal" data-bs-target="#placeBit"
                                class="btn btn-outline btn-small "><span><i class="ri-shopping-bag-line"></i> Place
                                    Bid</span></a>
                            </div>
                            <!-- action-wrapper -->
                        </div>
                        <!-- End .content -->
                    </div>
                </div>
                `
            )
            
        })
}
AuctionAlllistView()