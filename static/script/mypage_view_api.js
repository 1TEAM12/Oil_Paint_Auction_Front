

async function MypageVeiw(id){
    const response = await fetch(`${backendBaseUrl}/auctions/${id}/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            // "Authorization": "Bearer " + localStorage.getItem("access")
            }
        }
    )
    respons_json = await response.json()

    console.log(respons_json);
}
