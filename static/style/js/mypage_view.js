// window.onload = () => {
//     console.log("유화 리스트페이지 접속 완료")

// }

// async function handlePaintingDetaillist() {
//     const title = document.getElementById("title").value
//     const content = document.getElementById("content").value
//     const created_at = document.getElementById("created_at").value
//     const updated_at = document.getElementById("updated_at").value
//     const author = document.getElementById("author").value
//     console.log(title, content, created_at, updated_at, author)

//     const response = await fetch('http://127.0.0.1:8000/paintings/', {
//         headers: {
//             'content=type': 'application/json',
//             "Authorization": "Bearer " + localStorage.getItem("access"),
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             "title": title,
//             "content": content,
//             "created_at": created_at,
//             "updated_at": updated_at,
//             "author":author,
//         })
//     }}