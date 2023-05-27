// Errors Checking ------>>>>>>>>>>
function errors(errorName,inputElement,num = ''){

    let errorField = inputElement.nextElementSibling;

    // Required errors
    if(errorName === 'required')
        errorField.innerText = `${inputElement.name} is ${errorName}`;
    // length errors
    else if(errorName === 'length')
        errorField.innerText = `${inputElement.name} must be atleast ${num} characters`;  
    // No Errors (correct validation)
    else
        errorField.innerText = '';
}

// Checking Required ----->>>>>>>>>>
function checkRequired(userDetails){
    
    // iterating on every input fields in a form
    for(let i=0; i<=3;i++){

        if(userDetails[i].value === '')
            console.log('field required!');
            errors('required',userDetails[i]);
    }
}

// Checking Length ------->>>>>>>>>
function checkLength(userDetails){
    
    let usernameElement = userDetails.Username;
    let pass1Element = userDetails.Password; 

    let usernameLength = usernameElement.value.length;
    let pass1Length = pass1Element.value.length;

    // username length checker
    if(usernameLength < 3 && usernameLength !== 0)
        errors('length',usernameElement,3);
    else if (usernameLength !==0)
        errors('',usernameElement);

    // pass1 length checker
    if(pass1Length < 6 && pass1Length !== 0)
        errors('length',pass1Element,6);
    else if(pass1Length !==0)
        errors('',pass1Element);
}

function checkEmail(inputElement){

    let errorHolder = inputElement.nextElementSibling; 

    let email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let flag = email_pattern.test(inputElement.value);
    
    if(inputElement.value == '')
        errorHolder.innerText = 'Email is required';
    else if(!flag)
        errorHolder.innerText = 'Email is not valid';
    else
    errorHolder.innerText = '';
}

// Checking Password Match ----->>>>>>>
function checkPasswordsMatch(inputElement1,inputElement2){

    let errorField = inputElement2.nextElementSibling;

    let pass1 = inputElement1.value;
    let pass2 = inputElement2.value;

    if(pass1 !== pass2)
        errorField.innerText = 'Password and Confirm Password does not match';
    else
        errorField.innerText = '';
}

// Checking form Validation ----->>>>
function validation(userDetails){
    
    let i = 0;
    for(i=0;i<=3;i++){
        console.log(userDetails[i].nextElementSibling.innerHTML)
        if(userDetails[i].nextElementSibling.innerHTML !== ''){
            console.log('form is not valid');
            break;
        }
    }

    if(i==4){
        let userInfo = `'{"name":${userDetails[0].value}, "email":${userDetails[1].value},"password":${userDetails[2].value}'`;
        let key = userDetails[1].value;  // key will be user email (unique)

        // Saving form data into local storage
        localStorage.setItem(key,userInfo);
        $('#result').text('User created successfully!')
        setTimeout( () => {
            location.reload();
        },1000);
        console.log('User Information saved in local Storage!');
    }
}

// ||||||||| --------------------------------- |||||||||
// After form submitted event --------->>>>>>
$('form').submit((event)=> {

    // Stop Refreshing a Page
    event.preventDefault();

    // form all input fields 
    let userDetails = event.target;

    checkRequired(userDetails);
    checkLength(userDetails);
    checkEmail(userDetails.Email);
    checkPasswordsMatch(userDetails.Password,userDetails.Pass2);
    validation(userDetails)
})