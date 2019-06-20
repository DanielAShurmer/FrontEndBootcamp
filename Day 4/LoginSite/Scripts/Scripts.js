currentUserCreds = {

}

allUserCreds = {

}

matchingLogInFound = false;

function findUserMatch() {
    for (let data in allUserCreds) {
        let checkingDetails = [];
        checkingDetails[0] = data;
        let thisUser = allUserCreds[data];
        for (let subData in thisUser) {
            if (subData == "password") {
                checkingDetails[1] = thisUser[subData];
            }
        }
        console.log(checkingDetails);
        console.log(document.getElementById("js_log_in_username").value);
        console.log(document.getElementById("js_log_in_password").value);
        if (checkingDetails[0] == document.getElementById("js_log_in_username").value &&
            checkingDetails[1] == document.getElementById("js_log_in_password").value) {
                matchingLogInFound = true;
                sessionStorage.setItem("currentUser", thisUser);
                const LogInRequest = new XMLHttpRequest();
                LogInRequest.onload = function () {
                    window.location = "userPage.html";
                }
                LogInRequest.open("GET", "https://us-central1-qac-sandbox.cloudfunctions.net/login?username="+thisUser+"&password="+checkingDetails[1]);
                LogInRequest.send();
        }
    }
    if (matchingLogInFound == false){
        let thisError = document.createElement("p");
        document.getElementById("js_error_display").removeChild(document.getElementById("js_error_message"));
        thisError.innerText = "No Such User Could Be Found.";
        thisError.id = "js_error_message";
        document.getElementById("js_error_display").appendChild(thisError);
    }
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