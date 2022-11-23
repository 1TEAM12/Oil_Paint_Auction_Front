//Style select
async function StyleSelectView(id){
    const response = await fetch(`${backendBaseUrl}/prints/styleselect/`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
        }
    }
    )
    response_json = await response.json()

    $('#style-box').empty()
    response_json.forEach(item => {
        $('#style-box').append(
            `<!-- Style Thumb Image -->
            <div class="thumb">
                <a href="product-details.html"><img src="./model_imgs/02_la_muse(1).png" alt="nft live auction thumbnail"></a>
            </div>
            <!-- Style name -->
            <div class="content">
                <div class="header d-flex-between pt-4 pb-3">
                    <h3 class="title"><a href="product-details.html">Style : la_muse01</a></h3>
                </div>
            </div>`
        )
    });
}

