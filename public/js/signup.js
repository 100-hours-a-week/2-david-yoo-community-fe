class SignupForm {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.profileUpload = document.getElementById('profileUpload');
        this.profilePreview = document.getElementById('profilePreview');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordConfirmInput = document.getElementById('passwordConfirm');
        this.nicknameInput = document.getElementById('nickname');
        this.signupButton = document.getElementById('signupButton');
        this.loginLink = document.getElementById('loginLink');
        
        this.emailError = document.getElementById('emailError');
        this.passwordError = document.getElementById('passwordError');
        this.passwordConfirmError = document.getElementById('passwordConfirmError');
        this.nicknameError = document.getElementById('nicknameError');
    }

    initializeEventListeners() {
        if (this.profilePreview && this.profileUpload) {
            this.profilePreview.addEventListener('click', () => this.profileUpload.click());
            this.profileUpload.addEventListener('change', (e) => this.handleProfileImage(e));
        }

        this.emailInput.addEventListener('input', () => this.validateEmailInput());
        this.passwordInput.addEventListener('input', () => this.validatePasswordInput());
        this.passwordConfirmInput.addEventListener('input', () => this.validatePasswordConfirmInput());
        this.nicknameInput.addEventListener('input', () => this.validateNicknameInput());
        this.signupButton.addEventListener('click', () => this.handleSignup());
        this.loginLink.addEventListener('click', () => this.handleLoginLink());
    }

    handleProfileImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.profilePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return '이메일을 입력해주세요.';
        if (email.length < 5) return '이메일이 너무 짧습니다.';
        if (!emailPattern.test(email)) return '올바른 이메일 형식이 아닙니다.';
        return '';
    }

    validatePassword(password) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if (!password) return '비밀번호를 입력해주세요.';
        if (!passwordPattern.test(password)) return '비밀번호는 8-20자이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        return '';
    }

    validatePasswordConfirm(password, passwordConfirm) {
        if (!passwordConfirm) return '비밀번호를 한번 더 입력해주세요.';
        if (password !== passwordConfirm) return '비밀번호가 일치하지 않습니다.';
        return '';
    }

    validateNickname(nickname) {
        if (!nickname) return '닉네임을 입력해주세요.';
        if (nickname.length < 2 || nickname.length > 10) return '닉네임은 2자 이상 10자 이하여야 합니다.';
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

    validatePasswordConfirmInput() {
        const error = this.validatePasswordConfirm(
            this.passwordInput.value,
            this.passwordConfirmInput.value
        );
        this.passwordConfirmError.textContent = error;
        this.passwordConfirmError.classList.toggle('show', error !== '');
        this.passwordConfirmInput.parentElement.classList.toggle('error', error !== '');
    }

    validateNicknameInput() {
        const error = this.validateNickname(this.nicknameInput.value);
        this.nicknameError.textContent = error;
        this.nicknameError.classList.toggle('show', error !== '');
        this.nicknameInput.parentElement.classList.toggle('error', error !== '');
    }

    handleSignup() {
        const emailValidation = this.validateEmail(this.emailInput.value);
        const passwordValidation = this.validatePassword(this.passwordInput.value);
        const passwordConfirmValidation = this.validatePasswordConfirm(
            this.passwordInput.value,
            this.passwordConfirmInput.value
        );
        const nicknameValidation = this.validateNickname(this.nicknameInput.value);

        if (!emailValidation && !passwordValidation && !passwordConfirmValidation && !nicknameValidation) {
            this.signupButton.style.backgroundColor = '#7F6AEE';
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 500);
        } else {
            this.emailError.classList.toggle('show', emailValidation !== '');
            this.passwordError.classList.toggle('show', passwordValidation !== '');
            this.passwordConfirmError.classList.toggle('show', passwordConfirmValidation !== '');
            this.nicknameError.classList.toggle('show', nicknameValidation !== '');
            
            this.emailInput.parentElement.classList.toggle('error', emailValidation !== '');
            this.passwordInput.parentElement.classList.toggle('error', passwordValidation !== '');
            this.passwordConfirmInput.parentElement.classList.toggle('error', passwordConfirmValidation !== '');
            this.nicknameInput.parentElement.classList.toggle('error', nicknameValidation !== '');
        }
    }

    handleLoginLink() {
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SignupForm();
});