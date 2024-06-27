
/* Posts Page JavaScript */

"use strict";
// curl -X 'POST' \
//   'http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts' \
//   -H 'accept: application/json' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtldmluZWxvbmciLCJpYXQiOjE3MTg5OTA5MTgsImV4cCI6MTcxOTA3NzMxOH0.Kk6YxYzdAaagLSu0az1Jfz7nQ3k23ayIdW3vnpNbwIo' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "text": "string"
// }'
function like(postId) {
    fetch(apiBaseURL + "/api/likes", {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token
        },
        body: JSON.stringify({
            postId: postId
        })
    }).then(response => {
        console.log(response);
        location = "/posts/";  //force refresh
    });
}

btnPost.addEventListener("click", () => {
    fetch(apiBaseURL + "/api/posts", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: messageElement.value

        })
    }).then(r => location = "/posts/")
})

function getMessage(message) {
    return `
    <div class="post">
        <h1>${message.text}</h1>
        <div class="username">${message.username}</div>
        <div class="createdAt">${message.createdAt}</div>
        <div class="ID:">${message._id}</div>
        <div class="Likes:">${message.likes.length}</div>
        <div class="Likes:">${message.likes.length} Likes 
        <button onclick="like('${message._id}')">Like</button>
        </div>
    </div>
    <hr>
    `;
}
function showMessages(messages) {
    if (messages.hasOwnProperty("message")) {
        location = "/";
        return;
    }
    messagesOutput.innerHTML = messages.map(getMessage).join("");
}
const loginData = getLoginData();

fetch(apiBaseURL + "/api/posts", {
    method: "GET",

    headers: { Authorization: `Bearer ${loginData.token}` }
}).then(response => {
    if (response.statusCode >= 400) {
        console.log(response);
        location = "/";
    }
    return response.json()
}).then(data => {
    showMessages(data);
});
