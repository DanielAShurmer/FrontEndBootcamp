let userdata = {


}

function handleSubmit(formData){

    for (let control of formData){
        if (control.id != "SubmitButton"){
            userdata[control.id] = control.value;
        }
    }
    console.log(userdata);
    return false;
}