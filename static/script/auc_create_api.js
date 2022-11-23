window.onload = () => {
    console.log('api부분실행');
}


async function AuctionCreate(){

    const auctionData = {
        "start_bid": start_bid,
        "end_date": end_date,
    }
    const response = await fetch(`${backendBaseUrl}/auctions/1/`,{
        method: 'POST',
        header: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: Json.stringify(auctionData)
    })
    response_json = await response.json()
    console.log(response_json);

}
AuctionCreate()