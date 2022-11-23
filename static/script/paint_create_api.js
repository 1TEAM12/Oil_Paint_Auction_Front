window.onload = () =>{
    console.log("로딩되었음")
}

async function uploadImg(){
    const upload_img = {
        "path": document.getElementById("upload_img").value,
    }

    console.log("1")
    const response = await fetch(`${backendBaseUrl}/paintings/file`, {
        method:'POST',
        headers:{
            "Content-type": "application/json",
        },
        body: JSON.stringify(upload_img)
    })

    console.log(response)
    console.log("2")
    console.log(upload_img)
}