document.addEventListener("DOMContentLoaded", function () {
    const userEmailInput = document.getElementById('user-email');
    const userPasswordInput = document.getElementById('user-password');
    const loginButton = document.getElementById('login-button');

    function validateEmail() {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(userEmailInput.value);
    }

    function validatePassword() {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8}$/;
        return regex.test(userPasswordInput.value);
    }

    function updateInput(inputElement, isValid) {
        const errorSpan = inputElement.nextElementSibling;
        if (!isValid) {
            inputElement.classList.add('input-error');
            errorSpan.style.display = 'block';
        } else {
            inputElement.classList.remove('input-error');
            errorSpan.style.display = 'none';
        }
    }

    userEmailInput.addEventListener('blur', function () {
        updateInput(this, validateEmail());
    });

    userPasswordInput.addEventListener('blur', function () {
        updateInput(this, validatePassword());
    });

    loginButton.addEventListener('click', function (event) {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        if (!isEmailValid || !isPasswordValid) {
            event.preventDefault();
            alert('請修正表單錯誤後再提交。');
        }
    });
});

