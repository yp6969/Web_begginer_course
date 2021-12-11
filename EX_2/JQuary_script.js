let weak_pass = '<div class="col-4 bg-danger" style="height: 11px;"></div>'
let medium_pass = "<div class='col-8 bg-warning' style='height: 11px;'></div>"
let strong_pass = "<div class='col-12 bg-success' style='height: 11px';></div>"

$(document).ready(() => {
    // $('#password_field').keypress(strength_meter);
    $('#password_field').on("input",strength_meter);
    $('#btn_sign_up').click(validat_input);
    $('#output-col').hide(); //hide the resaults before validation.
 })


let validat_input = () => {
    // validate the form input.
    let user_fields_ok = validate_user_fields();
    let role_field_ok = validate_role();
    let system_field_ok = validate_system();

    if(system_field_ok && user_fields_ok && role_field_ok) show_user_deatails();
}

function validate_user_fields(){
    // validate the form input.
    // let validation = true;
    
    valid_name = validate_name();
    valid_email = validate_email();
    valid_pass = validate_password();

    return valid_name && valid_email && valid_pass;
}

function validate_name(){
    let username = $("#name_field").val();
    if(username == ''){
        console.log("no username input");
        $('#name_verify_msg').html('Please fill name');
        return false;
    }
    $('#name_verify_msg').html("");
    return true;
}

function validate_email(){
    let email = $("#email_field").val();
    if(email == ''){
        console.log("no email input");
        $('#email_verify_msg').html('Please fill email');
        return false;
    }

    let email_regx = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "g")
    if(!email.match(email_regx))
    {
        $('#email_verify_msg').html('Email is illegal');
        return false;
    }
    $('#email_verify_msg').html('');
    return true;
}

function validate_password(){
    // check if the password is not too weak.
    let password = $("#password_field").val();
    if(password == ''){
        console.log("no password input");
        $('#password_verify_msg').html('Please fill password');
        return false;
    }
    if($("#strength_meter").html() == weak_pass){
        console.log("too weak password");
        $("#password_verify_msg").html('Password too weak..');
        return false;
    }
    console.log("good password");
    $('#password_verify_msg').html('');
    return true;
}

let validate_role = () => {
    // check if the role form has chaecked
    let role = $("#role_val").val();

    if(!role){
        console.log("no role");
        $("#role_verify_msg").html('Please select an role from the list');
        return false;
    }
    $('#role_verify_msg').html('');
    return true; 
}

let validate_system = () => {
    // check if the system form has chaecked
    let system = $('input[name=System]:checked').val();
    if(!system){
        $('#system_verify_msg').html('Please select System...');
        return false;
    }
    $('#system_verify_msg').html('');
    return true;
}


let strength_meter = () => {
    // show the strength of the password
    strong_reg_exp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    medium_reg_exp = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    let password = $("#password_field").val();
    if(password == ""){
        $("#strength_meter").html("");
    }
    else if(password.match(strong_reg_exp)){
        $("#strength_meter").html(strong_pass);
    }
    else if(password.match(medium_reg_exp)){
        $("#strength_meter").html(medium_pass);
    }
    else{
        $("#strength_meter").html(weak_pass);
    }
}

let show_user_deatails = () => {
    $('#output-col').slideDown();

    $("#output_title").html('Registration Details:');
    $("#name_output").html("Name: " + $("#name_field").val());
    $("#email_output").html("Email: " + $("#email_field").val());
    $("#password_output").html("Password: " + $("#password_field").val());
    $("#role_output").html("Role: " + $("#role_val").val());
    $("#system_output").html("System: " + $("input[name=System]:checked").val());

    $("#affiliation_title").html("Affiliation:")

    $("#affiliation_vals input:checked").each(function(){
        $("#affiliation_output").append($(this).val() + "<br>");
    }) 
    reset_form();
}

function reset_form()
{   
    $('#name_field').val('');
    $('#email_field').val('');
    $('#password_field').val('');
    $('#strength_meter').html("");
    $('#role_val option').prop('selected',false);
    $('input[name=System]').prop('checked', false);
    $('input[type=checkbox]').prop('checked', false);
}