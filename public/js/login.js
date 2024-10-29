class LoginForm {
    constructor() {
        this.loginButton = document.getElementById('loginButton');
        this.signupButton = document.getElementById('signupButton');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.emailError = document.getElementById('emailError');
        this.passwordError = document.getElementById('passwordError');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.emailInput.addEventListener('input', () => this.validateEmailInput());
        this.passwordInput.addEventListener('input', () => this.validatePasswordInput());
        this.loginButton.addEventListener('click', () => this.handleLogin());
        this.signupButton.addEventListener('click', () => this.handleSignup());
    }

    validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return '이메일을 입력해주세요.';
        }
        if (email.length < 5) {
            return '이메일이 너무 짧습니다.';
        }
        if (!emailPattern.test(email)) {
            return '올바른 이메일 형식이 아닙니다.';
        }
        return '';
    }

    validatePassword(password) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if (!password) {
            return '비밀번호를 입력해주세요.';
        }
        if (!passwordPattern.test(password)) {
            return '비밀번호는 8-20자이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        }
        return '';
    }

    validateEmailInput() {
        const error = this.validateEmail(this.emailInput.value);
        this.emailError.textContent = error;
        this.emailError.classList.toggle('show', error !== '');
        this.emailInput.parentElement.classList.toggle('error', error !== '');
    }

    validatePasswordInput() {
        const error = this.validatePassword(this.passwordInput.value);
        this.passwordError.textContent = error;
        this.passwordError.classList.toggle('show', error !== '');
        this.passwordInput.parentElement.classList.toggle('error', error !== '');
    }

    handleLogin() {
        const emailValidation = this.validateEmail(this.emailInput.value);
        const passwordValidation = this.validatePassword(this.passwordInput.value);

        if (!emailValidation && !passwordValidation) {
            this.loginButton.style.backgroundColor = '#7F6AEE';
            setTimeout(() => {
                window.location.href = 'posts.html';
            }, 500);
        } else {
            this.emailError.classList.toggle('show', emailValidation !== '');
            this.passwordError.classList.toggle('show', passwordValidation !== '');
            this.emailInput.parentElement.classList.toggle('error', emailValidation !== '');
            this.passwordInput.parentElement.classList.toggle('error', passwordValidation !== '');
        }
    }

    handleSignup() {
        window.location.href = 'signup.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LoginForm();
});