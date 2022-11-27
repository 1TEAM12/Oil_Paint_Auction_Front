//로그인 토큰 확인
function style_select_service(){
    const storge = localStorage.getItem("payload");
    if (storge){
    }else {
        alert("로그인이 필요합니다.")
        location.replace(history.back())
    }}
style_select_service()

$(StyleSelectView)

//Style select
async function StyleSelectView(){
    const response = await fetch(`${backendBaseUrl}/paintings/style/`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Authorization': "Bearer " + localStorage.getItem("access")
        }
    })
    response_json = await response.json()
    console.log(response_json)

    $('#style-box').empty()
    response_json.forEach(item => {
        $('#style-box').append(
            `
            <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 mb-6">
                <div class="explore-style-one">
                    <div class="thumb">
                    <a href="#" onclick="move_create_page(${item[0]-1})"><img src="./model_imgs/${item[1]}.png" alt="nft live auction thumbnail"></a>
                    <!-- End .reaction-count -->
                    </div>
                    <!-- End .thumb -->
                    <div class="content">
                    <div class="header d-flex-between pt-4 pb-3">
                        <h3 class="title"><a href="#" onclick="move_create_page(${item[0]-1})">${item[1]}</a></h3>
                    </div>
                    <!-- .header -->
                    <!-- End product-share-wrapper -->
                    
                </div>
            </div>
            `
        )
        
    });
}

function move_create_page(style_no){ 
    window.location.href = `/paint_create.html?$id=${style_no}/`
}