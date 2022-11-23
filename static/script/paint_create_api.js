window.onload = () => {
    const style_no = location.href.split('=')[1]
    console.log(style_no)
    StyleLoadView(style_no)
}


async function StyleLoadView(style_no) {
    
    const response = await fetch(`${backendBaseUrl}/paintings/file`, {
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
    style_name.innerHTML = `<p style="font-size:30px;font-weight: bold;"> 0${style_no}  ${style_title}</p>`

}


async function uploadImg() {
    const upload_img = document.getElementById("upload_img").value

    const context = {
        "before_img" : upload_img,
    }
    const response = await fetch(`${backendBaseUrl}/paintings/file`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            // 'Authorization': "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify(context)
    })
    const response_json = await response.json()
    console.log(response_json)
    console.log("전송 완료")

    localStorage.setItem("pt_id", response_json.painting_id)
}


async function savePainting() {
    const upload_img = document.getElementById("upload_img").value
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const style_no = location.href.split('=')[1]
    const painting_id = localStorage.getItem("pt_id")

    const context = {
        "title" : title,
        "content" : content,
        "before_img" : upload_img,
        "style" : style_no
    }

    const response = await fetch(`${backendBaseUrl}/paintings/new/${painting_id}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            // 'Authorization': "Bearer " + localStorage.getItem("access")
        },
        body: JSON.stringify(context)
    })
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
        console.log(file);
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