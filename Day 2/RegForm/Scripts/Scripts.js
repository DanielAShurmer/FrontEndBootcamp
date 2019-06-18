let userdata = {}

function handleSubmit(formData) {

    for (let control of formData) {
        if (control.id != "SubmitButton") {
            userdata[control.id] = control.value;                            // Alternate implimentation with adding more key-value pairs to storage.
    //                                                                          sessionStorage.setItem(control.id, control.value);
        }
    }
    console.log(userdata);
    formData.reset();

    sessionStorage.setItem("userData", JSON.stringify(userdata));
    window.location = "ConfirmationPage.html";
    return false;
}

function displayUsername(){
    let UserName = "";                                                       // Alternate implimentation with retreving two key-value pairs from storage.
    //                                                                          UserName += sessionStorage.getItem("FirstName");
    //                                                                          UserName += " ";
    //                                                                          UserName += sessionStorage.getItem("LastName");

    userdata = JSON.parse(sessionStorage.getItem("userData"));
    UserName += userdata["FirstName"];
    UserName += " ";
    UserName += userdata["LastName"];

    document.getElementById("UserName").innerText = UserName;
}