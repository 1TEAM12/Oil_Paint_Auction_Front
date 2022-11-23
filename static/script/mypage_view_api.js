

async function MypageVeiw(){
    const response = await fetch(`${backendBaseUrl}/auctions/mypage/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            }
        }
    )
    response_json = await response.json()

    console.log(response_json);
    response_json.forEach(item => {
        $('#mypage').append(
            `
            <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 mb-6">
                <div class="explore-style-one">
                    <div class="thumb">
                        <img src="${backendBaseUrl}${item.after_image}"alt="nft live auction thumbnail">
                            <button class="reaction-btn"><i class="ri-heart-fill"></i><span>49</span></button>
                            <!-- End .reaction-count -->
                    </div>
                    <!-- End .thumb -->
                    <div class="content">
                        <div class="header d-flex-between pt-4 pb-3">
                        <h3 class="title" style="text-align:center;">${item.title}</h3>
                        <div class="more-dropdown "><i class="ri-more-fill" data-bs-toggle="dropdown"></i>
                            <ul class="dropdown-menu dropdown-menu-dark">
                            <li><a class="dropdown-item" href="#">Edit</a></li>
                            <li><a class="dropdown-item" href="#">Delete</a></li>
                            </ul>
                        </div>
                        </div>
                        <!-- .header -->
                        <div class="action-wrapper d-flex-between pt-4">
                        <a href="#" data-bs-toggle="modal" data-bs-target="#placeBit"class="btn  btn-outline btn-small"><span><i class="ri-add-fill"></i>More</span></a>
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

