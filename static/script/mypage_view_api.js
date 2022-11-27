function time1str(date) {
  let before = new Date(date)
  return `${before.getFullYear()}년 ${before.getMonth() + 1}월 ${before.getDate()}일 `
};

async function MypageView(){
    const response = await fetch(`${backendBaseUrl}/paintings/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            }
        }
    )
    response_json = await response.json()
    
    response_json.forEach(item => {
      let time_str = time1str((item["created_at"]))
        $('#mypage').append(
          
            `
            <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 mb-6">
                <div class="explore-style-one">
                    <div class="thumb">
                        <img src="${backendBaseUrl}${item.after_image}"alt="nft live auction thumbnail">
                            <!-- End .reaction-count -->
                    </div>
                    <!-- End .thumb -->
                    <div class="content">
                        <div class="header d-flex-between pt-4 pb-3">
                        <h3 class="title" style="text-align:center;">${item.title}</h3>
                        <div class="more-dropdown "><i class="ri-more-fill" data-bs-toggle="dropdown"></i>
                            <ul class="dropdown-menu dropdown-menu-dark">

                            <li><a id=${item.id} onclick="PaintUpdate(this)" class="dropdown-item" href="#">Edit</a></li>                        
                            <li><a id="${item.id}" class="dropdown-item" onclick="deletePainting(this)">Delete</a></li>

                            </ul>
                        </div>
                        </div>
                        <!-- .header -->
                        <div class="action-wrapper d-flex-between pt-4">
                        <a href="#" id="${item.id}" onclick="Show_Modal(this)" data-bs-toggle="modal" class="madal_btn btn  btn-outline btn-small"><span><i class="ri-add-fill"></i>More</span></a>
                        </div>
                        <!-- action-wrapper -->
                    </div>
                    <!-- End .content -->
                </div>
            </div>


    
    <div id="${item.id}modal" style="display:none; z-index:9999; background-color:rgba(0, 0, 0, 0.6); transition:opacity .35s;" >
    <div class="modal-dialog modal-dialog-centered" style="width:800px;">
      <div class="modal-content" style="height: 420px;">

        <div>
          <a type="button" id="${item.id}close"class="btn-custom-closer" data-bs-dismiss="modal" aria-label="Close"><i
              class="ri-close-fill"></i></a>
            <form action="#">
              <div class="create-item-wrapper" style="padding:35px 35px 20px 35px;">
                <div class="row">
                  <div class="col-lg-4"style='width:395px;'>
                    <!-- file upload area -->
                    <div class="upload-area">
      
                      <div class="brows-file-wrapper">
                        <div style=" height: 294px; width: 100%;">      
                          <img src="${backendBaseUrl}${item.after_image}" style="width: 100%; height:100%; border-radius:10px; object-fit: cover">
                        </div>
                      </div>
                    </div>
                    <!-- end upoad file area -->
                  </div>
      
                  <div class="col-lg-8" style='width:365px;'>
                    <div class="form-field-wrapper container"style="word-break:break-all; height:294px; overflow-y:scroll">
                      <div class="row">
                        <div class="col-md-12 mb-4">
                          <div class="field-box" style="display:flex; justify-content: space-between;">
                            <div class="form-label"><strong>Artist :</strong> ${item.author}</div>
                          </div>
                        </div>
                        <div class="col-md-12 mb-4">
                          <div class="field-box" style="display:flex; justify-content: space-between;">
                            <div class="form-label"><strong>Owner :</strong> ${item.owner}</div>
                          </div>
                        </div>
                        <div class="col-md-12 mb-4">
                          <div class="field-box" style="display:flex; justify-content: space-between;">
                            <div class="form-label"><strong>Create :</strong> ${time_str}</div>
                          </div>
                        </div>
                        <div class="col-md-12 mb-4">
                          <div class="field-box">
                            <div class="form-label"><strong>Title :</strong> ${item.title}</div>
                          </div>
                        </div>
  
                        <div class="col-md-6 mb-4" style="width:100%">
                          <div class="field-box">
                            <div class="form-label"><strong>Content :</strong> ${item.content}</div>
                          </div>
                        </div>       
                      </div>
                      <!-- End .row -->
                    </div>
                    <!--  -->
                  </div>
                </div>
                <!-- End .row -->
              </div>
              <!-- End .create-item-wrapper -->
              <div class="row">
                <div class="col-md-12" style="margin-left:-35px;">
                  <div class="d-flex-between flex-wrap">
                    <div class="d-flex-center ">
                      
                    </div>
                    <div class="input-box">
                      <a id="${item.id}" onclick="AuctionCreate(this)" class="btn btn-gradient btn-medium justify-content-center"><span>Create Item</span></a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ENd .row -->
            </form>
        </div>

      </div>
      <!-- End .modal-content -->
    </div>
  </div>
            `
        )
    })
}





function Show_Modal(id){
  var modal = document.getElementById(`${id.id}modal`);
  var close = document.getElementById(`${id.id}close`);
  document.body.style.overflow = "hidden";

  modal.style.position = "fixed";

  modal.style.top =  "0";
  modal.style.left =  "0";

  modal.style.width =  "100%";
  modal.style.height =  "100%";
  
  modal.style.outline =  "0";
  modal.style.display = "block";

  


  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "unset";

}

  close.addEventListener("click", closeModal)
}



async function AuctionList(){
    const response = await fetch(`${backendBaseUrl}/auctions/mylist/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            }
        }
    )
    response_json = await response.json()
    response_json.forEach(item => {
        $('#action_list').append(
            `
            <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 mb-6">
                <div class="explore-style-one">
                    <div class="thumb">
                    <a href="auction_details.html?$id=${item.id}/"><img src="${backendBaseUrl}${item.painting.after_image}"
                        alt="nft live auction thumbnail"></a>
                    <button class="reaction-btn"><i class="ri-heart-fill"></i><span>${item.auction_like_count}</span></button>
                    <!-- End .reaction-count -->
                    </div>
                    <!-- End .thumb -->
                    <div class="content">
                    <div class="header d-flex-between pt-4 pb-3">
                        <h3 class="title"><a href="auction_details.html">${item.painting.title}</a></h3>
                    </div>
                    <!-- .header -->
                    <div class="product-share-wrapper">
                    종료일&nbsp;&nbsp;&nbsp;<span id='remain-time' style='color:red;'>${item.end_date}</span>
                    </div>
                    <p></p>
                    <div class="product-share-wrapper">
                    <span class="bid-owner">Bid Price : <strong>${item.now_bid} Point</strong></span>
                    </div>
                    <!-- End product-share-wrapper -->
                    <div class="product-owner py-4 d-flex-between">
                        <span class="bid-owner">Owned By <strong>${item.painting.owner}</strong></span>
                    </div>
                    <!-- End .product-owner -->
                    <div class="action-wrapper d-flex-between pt-4">
                        <a id="${item.id}" onclick="confirm__auction(this)" data-bs-toggle="modal" data-bs-target="#placeBit"
                        class="btn  btn-outline btn-small"><span><i class="ri-shopping-bag-line"></i>Successful Bid</span></a>
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
AuctionList()



function AuctionCreate(click_id){
  window.location.href = `/auction_create.html?id=${click_id.id}`;
}


function PaintUpdate(click_id){
  window.location.href = `/PaintUpdate.html?id=${click_id.id}`;
}

//유화 삭제
async function deletePainting(paintings){
  var delConfirm = confirm("정말 유화를 삭제하시겠습니까?")
  if (delConfirm) {
  const response = await fetch(`${backendBaseUrl}/paintings/${paintings.id}/`, {
      method: 'DELETE',
      headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("access")
      },
  })
  response_json = await response.json
      if (response.status === 200) {
          alert("유화가 삭제되었습니다..")
          window.location.reload()
          return response_json
      }
}}

function AuctionCreate(click_id){
  window.location.href = `/auction_create.html?id=${click_id.id}`;
}

//경매 낙찰
async function confirm__auction(auction){
  var delConfirm = confirm("정말 낙찰을 하시겠습니까?")
  if (delConfirm) {
  const response = await fetch(`${backendBaseUrl}/auctions/detail/${auction.id}/`, {
      method: 'POST',
      headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("access")
      },
  })
  response_json = await response.json
      if (response.status === 200) {
          alert("낙찰이 완료되었습니다.")
          window.location.reload()
          return response_json
      } else if (response.status === 400) {

        alert("입찰한 사람이 없습니다.")

      } else if (response.status ===403) {
        alert("접근 권한이 없습니다.")
      }
}}

