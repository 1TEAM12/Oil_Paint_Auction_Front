let getPaint = window.location.search;
let getPaint_Name = getPaint.split('=');
let id_Paint = getPaint_Name[1]



window.onload = async function paintingLoad(){

    const response = await fetch(`${backendBaseUrl}/paintings/${id_Paint}/`,{
        method: 'GET',
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("access")
            }   
        }
    )
    response_json = await response.json()
    if (response.status === 200) {
    const image_after = document.getElementById("image_after")
    const image_painting = response_json.after_image
    image_after.setAttribute("src",`${backendBaseUrl}${image_painting}`)

    const painting_title_update = document.getElementById("painting_title")
    const painting_content_update = document.getElementById("painting_content")

    painting_title_update.value  = response_json.title
    painting_content_update.value  = response_json.content


    } else if (response.status === 403 ) {
        alert("접근 권한이 없습니다.")
        history.back();
    }


}




async function painting_Update(){

    const painting_title_update = document.getElementById("painting_title").value;
    const painting_content_update = document.getElementById("painting_content").value;
    console.log(painting_title_update)
    console.log(painting_content_update)

    const response = await fetch(`${backendBaseUrl}/paintings/${id_Paint}/`,{
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify({"title": painting_title_update, "content":painting_content_update})
    })

    const response_json = await response.json()
    console.log(response_json)

    // move_profile_page()

}



function move_profile_page(){
    window.location.href = `/profile.html`
}