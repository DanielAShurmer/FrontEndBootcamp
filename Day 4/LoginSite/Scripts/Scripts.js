currentUserCreds = {

}

allUserCreds = {

}

matchingLogInFound = false;

function swapToRegisterPage() {
    window.location = "registrationPage.html";
}

function swapToMainPage() {
    sessionStorage.clear();
    window.location = "mainPage.html";
}

function swapToUserPage() {
    window.location = "registrationPage.html";
}

function findUserMatch() {
    for (let data in allUserCreds) {
        // Extract Username & Password
        let checkingDetails = [];
        checkingDetails[0] = data;
        let thisUser = allUserCreds[data];
        for (let subData in thisUser) {
            if (subData == "password") {
                checkingDetails[1] = thisUser[subData];
            }
        }
        // If These Match What The User Entered
        if (checkingDetails[0] == document.getElementById("js_log_in_username").value &&
            checkingDetails[1] == document.getElementById("js_log_in_password").value) {
            matchingLogInFound = true;
            sessionStorage.setItem("currentUser", checkingDetails[0]);
            const LogInRequest = new XMLHttpRequest();
            LogInRequest.onload = function () {
                window.location = "userPage.html";
            }
            LogInRequest.onerror = function () {
                let thisError = document.createElement("p");
                document.getElementById("js_error_display").removeChild(document.getElementById("js_error_message"));
                thisError.innerText = "Connection Error " + LogInRequest.statusText + " Occured. Please Retry.";
                thisError.id = "js_error_message";
                document.getElementById("js_error_display").appendChild(thisError);
            }
            LogInRequest.open("GET", "https://us-central1-qac-sandbox.cloudfunctions.net/login?username=" + thisUser + "&password=" + checkingDetails[1]);
            LogInRequest.send();
        }
    }
    // If There Were No Matches, Show Error
    if (matchingLogInFound == false) {
        let thisError = document.createElement("p");
        document.getElementById("js_error_display").removeChild(document.getElementById("js_error_message"));
        thisError.innerText = "No Such User Could Be Found.";
        thisError.id = "js_error_message";
        document.getElementById("js_error_display").appendChild(thisError);
    }
}

function loadDetails() {
    let currentUser = sessionStorage.getItem("currentUser");
    console.log(currentUser);

    const DataRequest = new XMLHttpRequest();

    DataRequest.onload = function () {
        console.log("Data Received!");
        allUserCreds = JSON.parse(DataRequest.responseText);

        for (let data in allUserCreds) {
            if (data == currentUser) {
                let thisUser = allUserCreds[data];
                document.getElementById("js_update_first_name").value = thisUser["firstName"];
                document.getElementById("js_update_last_name").value = thisUser["lastName"];
                document.getElementById("js_update_email").value = thisUser["email"];
                document.getElementById("js_update_password").value = thisUser["password"];
                document.getElementById("js_update_username").value = currentUser;
            }
        }
    }

    DataRequest.open("GET", "https://us-central1-qac-sandbox.cloudfunctions.net/getUsers");
    DataRequest.send();

}

function handleLogIn(formData) {
    for (let control of formData) {
        currentUserCreds[control.id] = control.value;
    }

    const DataRequest = new XMLHttpRequest();

    DataRequest.onload = function () {
        console.log("Data Received!");
        allUserCreds = JSON.parse(DataRequest.responseText);
        findUserMatch();
    }

    DataRequest.open("GET", "https://us-central1-qac-sandbox.cloudfunctions.net/getUsers");
    DataRequest.send();

    return false;
}

function handleRegister(formData) {

    let userToAddDetails = {};
    userToAddDetails["username"] = formData[0].value;
    userToAddDetails["email"] = formData[3].value;
    userToAddDetails["firstName"] = formData[1].value;
    userToAddDetails["lastName"] = formData[2].value;
    userToAddDetails["password"] = formData[4].value;

    console.log(userToAddDetails);


    const InputDataRequest = new XMLHttpRequest();

    InputDataRequest.onloadend = function () {
        console.log("User Added!");
        swapToMainPage();
    }

    InputDataRequest.open("POST", "https://us-central1-qac-sandbox.cloudfunctions.net/setUser");
    InputDataRequest.setRequestHeader("Content-Type", "application/json");
    InputDataRequest.send(JSON.stringify(userToAddDetails));


    return false;
}

function handleEdit(formData) {
    let currentUser = sessionStorage.getItem("currentUser");
    const DataRequest = new XMLHttpRequest();

    DataRequest.onloadend = function () {
        console.log("User Deleted! Readding...");
        let userToAddDetails = {};
        userToAddDetails["username"] = formData[0].value;
        userToAddDetails["email"] = formData[3].value;
        userToAddDetails["firstName"] = formData[1].value;
        userToAddDetails["lastName"] = formData[2].value;
        userToAddDetails["password"] = formData[4].value;
        const InputDataRequest = new XMLHttpRequest();

        InputDataRequest.onloadend = function () {
            console.log("User Readded!");
        }

        InputDataRequest.open("POST", "https://us-central1-qac-sandbox.cloudfunctions.net/setUser");
        InputDataRequest.setRequestHeader("Content-Type", "application/json");
        InputDataRequest.send(JSON.stringify(userToAddDetails));
    }

    DataRequest.open("DELETE", "https://us-central1-qac-sandbox.cloudfunctions.net/deleteUser​?username=" + currentUser);
    DataRequest.send();

    return false;
}

function handleDelete(formData) {
    let currentUser = sessionStorage.getItem("currentUser");
    const DataRequest = new XMLHttpRequest();

    DataRequest.onloadend = function () {
        console.log("User Deleted!");
        swapToMainPage();
    }

    DataRequest.open("DELETE", "https://us-central1-qac-sandbox.cloudfunctions.net/deleteUser​?username=" + currentUser);
    DataRequest.send();

    return false;
}