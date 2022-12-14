//로그인 토큰 확인
function painting_create_service(){
    const storge = localStorage.getItem("payload");
    if (storge){
    }else {
        alert("로그인이 필요합니다.")
        location.replace(history.back())
    }}
painting_create_service()

window.onload = () => {
    const style_no = location.href.split('=')[1][0]
    StyleLoadView(style_no)
}


async function StyleLoadView(style_no) {
    
    const response = await fetch(`${backendBaseUrl}/paintings/img/`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Authorization': "Bearer " + localStorage.getItem("access")
        }
    })
    response_json = await response.json()


    const style_title = response_json[style_no][1]

    const style_name = document.getElementById("style_name")
    style_name.innerHTML = `<p style="font-size:30px;font-weight: bold;"> ${style_title}</p>`

}

async function uploadImg() {
    let style_no = location.href.split('=')[1][0]
    style_no = Number(style_no)+1
    const before_image = document.getElementById("before_image").files[0]

    const formData = new FormData()
    formData.append("style", style_no)
    formData.append("before_image", before_image)

    // const context = {
    //     // "style" : style_no,
    //     "upload_img" : before_img
    // }
    const response = await fetch(`${backendBaseUrl}/paintings/img/`, {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("access")
        },
        body: formData
    })
    const response_json = await response.json()


    localStorage.setItem("pt_id", response_json.id)
    localStorage.setItem("after_image", response_json.after_image)
    savePainting()
}


async function savePainting() {
    const painting_id = localStorage.getItem("pt_id")
    // const after_image = localStorage.getItem("after_image")
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value

    let storage = localStorage.getItem('payload');
    const personObj = JSON.parse(storage);
    user_id = personObj['user_id'];

    const formData = new FormData()
    formData.append("painting_id", painting_id)
    formData.append("title", title)
    formData.append("content", content)
    formData.append("user_id", user_id)


    const response = await fetch(`${backendBaseUrl}/paintings/img/${painting_id}/`, {
        method: 'PUT',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("access")
        },
        body: formData
    })
    move_profile_page()
}


function DropFile(dropAreaId, fileListId) {
    let dropArea = document.getElementById(dropAreaId);
    let fileList = document.getElementById(fileListId);

    //기존 이벤트 무효화
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        preventDefaults(e);
        dropArea.classList.add("highlight");
    }

    function unhighlight(e) {
        preventDefaults(e);
        dropArea.classList.remove("highlight");
    }

    function handleDrop(e) {
        unhighlight(e);
        let dt = e.dataTransfer;
        let files = dt.files;

        handleFiles(files);

        const fileList = document.getElementById(fileListId);
        if (fileList) {
            fileList.scrollTo({ top: fileList.scrollHeight });
        }
    }

    function handleFiles(files) {
        files = [...files];
        // files.forEach(uploadFile);
        files.forEach(previewFile);
    }

    function previewFile(file) {
        renderFile(file);
    }

    function renderFile(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let img = dropArea.getElementsByClassName("preview")[0];
            img.src = reader.result;
            img.style.display = "block";
        };
    }

    dropArea.addEventListener("dragenter", highlight, false);
    dropArea.addEventListener("dragover", highlight, false);
    dropArea.addEventListener("dragleave", unhighlight, false);
    dropArea.addEventListener("drop", handleDrop, false);

    return {
        handleFiles
    };
}

const dropFile = new DropFile("drop-file", "files");

function move_select_page(){ 
    window.location.href = `/select_style.html`
}

function move_profile_page(){
    window.location.href = `/profile.html`
}