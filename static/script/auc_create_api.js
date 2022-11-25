
let getLink = window.location.search;
let getLink_Name = getLink.split('=');
let id = getLink_Name[1]


window.onload = async function paintingLoad(id){
    const response = await fetch(`${backendBaseUrl}/paintings/${id}`,{
        method: 'GET',
        headers:{
            Accept: "application/json",
            "Content-type":"application/json",
            "Authorization":"Bearer" + localStorage.getItem("access")
            }   
        }
    )
    response_json = await response.json()
    console.log(response_json)
    
}



async function AuctionCreate(){

    const start_bid = document.getElementById("start-price").value
    const end_date = document.getElementById("Date").value

    const response = await fetch(`${backendBaseUrl}/auctions/2/`,{
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify({"start_bid": start_bid, "end_date":end_date})
        
    })
    
    const response_json = await response.json()
    console.log(response.status)

    if (response.status === 200) {
        location.replace('profile.html')
    }else if(response.status === 400) {
        alert('이미 등록된 상품입니다.')
        location.replace('profile.html')
    }
}

const page_cancel=() => {
    location.replace('profile.html')
}