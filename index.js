// Get data from form
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const successMessage = document.querySelector('.success-message');
const errorMessages = document.querySelectorAll('.error-message');
const NAME_MIN = 2;
const NAME_MAX = 30;
const messageCounter = document.querySelector('.counter');
const MESSAGE_MIN = 40;
const MESSAGE_MAX = 500;

// Add live event listener to form
if (nameInput) {
    nameInput.addEventListener('input', () => validateField('name'));
}

if (emailInput) {
    emailInput.addEventListener('input', () => validateField('email'));
}

if (messageInput) {
    messageInput.addEventListener('input', () => {
        validateField('message');
        updateMessageCounter();
    });
    // Initialize counter on load
    updateMessageCounter();
}

// Attach a submit-handler to run checks before sending
if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const ok = validateForm();

        if (ok) {
            try {
                // Wait for email to be sent successfully
                await sendEmail();

                // Reset form and clear only error states (not success)
                form.reset();
                clearErrorsOnly();
                updateMessageCounter();

                // Now show success message
                if (successMessage) successMessage.innerText = 'Message sent successfully!';
            } catch (err) {
                if (successMessage) successMessage.innerText = 'Sending failed. Please try again.';
                // Optionally log the error
                console.error(err);
            }
        }
    });
}


// Validate a single field by key: 'name' | 'email' | 'message'
function validateField(fieldKey) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fieldKey === 'name' && nameInput) {
        const val = nameInput.value.trim();
        if (val.length < 1) {
            if (errorMessages[0]) errorMessages[0].innerText = 'Name cannot be blank';
            nameInput.classList.add('error-border');
            return false;
        } else if (val.length < NAME_MIN) {
            if (errorMessages[0]) errorMessages[0].innerText = `Name must be at least ${NAME_MIN} characters long`;
            nameInput.classList.add('error-border');
            return false;
        } else if (val.length > NAME_MAX) {
            if (errorMessages[0]) errorMessages[0].innerText = `Name must be less than ${NAME_MAX} characters long`;
            nameInput.classList.add('error-border');
            return false;
        } else {
            if (errorMessages[0]) errorMessages[0].innerText = '';
            nameInput.classList.remove('error-border');
            return true;
        }
    }


    if (fieldKey === 'email' && emailInput) {
        const val = emailInput.value.trim();
        if (!emailRegex.test(val)) {
            if (errorMessages[1]) errorMessages[1].innerText = 'Invalid email address';
            emailInput.classList.add('error-border');
            return false;
        } else {
            if (errorMessages[1]) errorMessages[1].innerText = '';
            emailInput.classList.remove('error-border');
            return true;
        }
    }

    if (fieldKey === 'message' && messageInput) {
        const val = messageInput.value.trim();
        if (val.length < 1) {
            if (errorMessages[2]) errorMessages[2].innerText = 'Message cannot be blank';
            messageInput.classList.add('error-border');
            return false;
        } else if (val.length < MESSAGE_MIN) {
            if (errorMessages[2]) errorMessages[2].innerText = `Message must be at least ${MESSAGE_MIN} characters long`;
            messageInput.classList.add('error-border');
            return false;
        } else if (val.length > MESSAGE_MAX) {
            if (errorMessages[2]) errorMessages[2].innerText = `Message must be less than ${MESSAGE_MAX} characters long`;
            messageInput.classList.add('error-border');
            return false;
        } else {
            if (errorMessages[2]) errorMessages[2].innerText = '';
            messageInput.classList.remove('error-border');
            return true;
        }
    }
    return true;
}



// Validate form
function validateForm() {
    clearMessages();
    let errorFlag = false;

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const messageVal = messageInput ? messageInput.value.trim() : '';

    // Validate each field individually
    // Validate name
    if(!validateField('name')) errorFlag = true;
    if (nameVal.length < 1) {
        if (errorMessages[0]) errorMessages[0].innerText = 'Name cannot be blank';
        if (nameInput) nameInput.classList.add('error-border');
        errorFlag = true;
    } else if (nameVal.length < 2) {
        if (errorMessages[0]) errorMessages[0].innerText = 'Name must be at least 2 characters long';
        if (nameInput) nameInput.classList.add('error-border');
    } else if (nameVal.length > 30) {
        if (errorMessages[0]) errorMessages[0].innerText = 'Name must be less than 30 characters long';
        if (nameInput) nameInput.classList.add('error-border');
    }

    // Validate email
    if(!validateField('email')) errorFlag = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
        if (errorMessages[1]) errorMessages[1].innerText = 'Invalid email address';
        if (emailInput) emailInput.classList.add('error-border');
        errorFlag = true;
    }

    // Validate message
    if(!validateField('message')) errorFlag = true;
    if (messageVal.length < 1) { // check for empty string
        if (errorMessages[2]) errorMessages[2].innerText = 'Message cannot be blank';
        if (messageInput) messageInput.classList.add('error-border');
        errorFlag = true;
    } else if (messageVal.length < MESSAGE_MIN) { // check for less than min
        if (errorMessages[2]) errorMessages[2].innerText = `Message must be at least ${MESSAGE_MIN} characters long`;
        if (messageInput) messageInput.classList.add('error-border');
    } else if (messageVal.length > MESSAGE_MAX) { // check for more than max
        if (errorMessages[2]) errorMessages[2].innerText = `Message must be less than ${MESSAGE_MAX} characters long`;
        if (messageInput) messageInput.classList.add('error-border');
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

// Clear only error messages
function clearErrorsOnly() {
    if (errorMessages && errorMessages.length) {
        for (let i = 0; i < errorMessages.length; i++) {
            errorMessages[i].innerText = '';
        }
    }
    if (nameInput) nameInput.classList.remove('error-border');
    if (emailInput) emailInput.classList.remove('error-border');
    if (messageInput) messageInput.classList.remove('error-border');
}


// update the live message counter and optional styling
function updateMessageCounter() {
    if (!messageCounter) return;
    const len = messageInput ? messageInput.value.length : 0;
    messageCounter.innerText = `${len}/${MESSAGE_MAX}`;
    messageCounter.classList.toggle('under-min', len > 0 && len < MESSAGE_MIN);
    messageCounter.classList.toggle('over-max', len > MESSAGE_MAX);
    messageCounter.classList.toggle('ok', len >= MESSAGE_MIN && len <= MESSAGE_MAX);
}


// Send email
function sendEmail() {
    let params = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
    }
    // Return the promise so submit handler can await it
    return emailjs.send("service_rqw7tp5", "template_b9fv021", params).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        return response;
    });
}