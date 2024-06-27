const loginData = getLoginData();
function showProfile(user) {
    msgElement.value = user.bio;
    bioElement.innerHTML = user.bio;
}
profileElement.addEventListener("click", () => {
    fetch(apiBaseURL + "/api/users/" + loginData.username, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bio: msgElement.value

        })
    }).then(r => location = "/profile/profile.html")
})
fetch(apiBaseURL + "/api/users/" + loginData.username, {
    headers: {
        Authorization: `Bearer ${loginData.token}`,
    },
}).then(r => r.json()).then(showProfile)