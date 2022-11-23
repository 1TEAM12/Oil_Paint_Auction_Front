window.onload = () =>{
    const style_no = location.href.split('=')[1]
    console.log(style_no)
    loadStyle(style_no)
}



//스타일 읽어오기
async function loadStyle(style_no){
    StyleLoadView(style_no)
    

}


async function StyleLoadView(style_no){
    const response = await fetch(`${backendBaseUrl}/paintings/new`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
        }
    })
    response_json = await response.json()
    console.log(response_json)
    console.log(response_json[style_no][1])
    
    const style_title = response_json[style_no][1]

    const style_name = document.getElementById("style_name")
    style_name.innerHTML = `<p style="font-size:30px;font-weight: bold;">0${style_no} ${style_title}</p>`

    

}





async function uploadImg(){
    const upload_img = {
        "path": document.getElementById("upload_img").value,
    }

    const response = await fetch(`${backendBaseUrl}/paintings/file`, {
        method:'POST',
        headers:{
            "Content-type": "application/json",
        },
        body: JSON.stringify(upload_img)
    })
    console.log(upload_img)
}