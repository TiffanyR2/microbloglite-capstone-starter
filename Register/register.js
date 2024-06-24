function register() {
    return fetch(apiBaseURL + "/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            username: username.value,
            fullName: fullname.value,
            password: password.value
        })
    }).then(() => location = "/"); //TODO check for failure
}

registerButton.addEventListener("click", register)