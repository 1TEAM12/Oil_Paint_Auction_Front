

async function AuctionCreate(){
    const start_bid = document.getElementById("start-price").value
    const end_date = document.getElementById("DateLocal").value

    const response = await fetch(`${backendBaseUrl}/auctions/16/`,{
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify({"start_bid": start_bid, "end_date":end_date})
        
    })
    console.log(JSON.stringify({"start_bid": start_bid, "end_date":end_date}))
    console.log( "Bearer " + localStorage.getItem("access"))

    const response_json = await response.json()

}

