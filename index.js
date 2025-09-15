// Get data from form
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
// CHANGED: select by class to match the DOM
const successMessage = document.querySelector('.success-message');
const errorMessages = document.querySelectorAll('.error-message');

// Attach a submit-handler to run checks before sending
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // CHANGED: always prevent navigation
        const ok = validateForm();

        if (ok) {
            sendEmail();
            if (successMessage) successMessage.innerText = 'Message sent successfully!';
            form.reset();
        }
    });
}

// Validate form
function validateForm() {
    clearMessages();
    let errorFlag = false;

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const messageVal = messageInput ? messageInput.value.trim() : '';

    if (nameVal.length < 1) {
        if (errorMessages[0]) errorMessages[0].innerText = 'Name cannot be blank';
        if (nameInput) nameInput.classList.add('error-border');
        errorFlag = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
        if (errorMessages[1]) errorMessages[1].innerText = 'Invalid email address';
        if (emailInput) emailInput.classList.add('error-border');
        errorFlag = true;
    }

    if (messageVal.length < 1) {
        if (errorMessages[2]) errorMessages[2].innerText = 'Message cannot be blank';
        if (messageInput) messageInput.classList.add('error-border');
        errorFlag = true;
    }

    return !errorFlag;
}

// Clear error/success messages
function clearMessages() {
    if (errorMessages && errorMessages.length) {
        for (let i = 0; i < errorMessages.length; i++) {
            errorMessages[i].innerText = '';
        }
    }
    if (nameInput) nameInput.classList.remove('error-border');
    if (emailInput) emailInput.classList.remove('error-border');
    if (messageInput) messageInput.classList.remove('error-border');
    if (successMessage) successMessage.innerText = '';
}

// Send email
function sendEmail() {
    var params = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
    }
    emailjs.send("service_rqw7tp5","template_b9fv021", params).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    });
}