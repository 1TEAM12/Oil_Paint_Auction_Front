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


    const image_after = document.getElementById("image_after")
    const image_painting = response_json.after_image
    image_after.setAttribute("src",`${backendBaseUrl}${image_painting}`)

    const painting_title = document.getElementById("painting_title")

}




async function painting_Update(){
    console.log(id_Paint)
    const paint_title = document.getElementById("paint_title").value;
    const paint_content = document.getElementById("paint_content").value;

    const response = await fetch(`${backendBaseUrl}/paintings/${id_Paint}/`,{
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify({"paint_title": paint_title, "paint_content":paint_content})
    })
    // move_profile_page()
    console.log(JSON.stringify({"paint_title": paint_title, "paint_content":paint_content}))
    console.log(response)

}



function move_profile_page(){
    window.location.href = `/profile.html`
}