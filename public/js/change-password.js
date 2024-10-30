class passwordForm {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.passwordInput = document.getElementById('password');
        this.passwordConfirmInput = document.getElementById('passwordConfirm');
        this.signupButton = document.getElementById('signupButton');
        
        this.passwordError = document.getElementById('passwordError');
        this.passwordConfirmError = document.getElementById('passwordConfirmError');
    }

    initializeEventListeners() {
        this.passwordInput.addEventListener('input', () => this.validatePasswordInput());
        this.passwordConfirmInput.addEventListener('input', () => this.validatePasswordConfirmInput());
        this.signupButton.addEventListener('click', () => this.handleSignup());
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


    handlePassword() {
        const passwordValidation = this.validatePassword(this.passwordInput.value);
        const passwordConfirmValidation = this.validatePasswordConfirm(
            this.passwordInput.value,
            this.passwordConfirmInput.value
        );

        if (!passwordValidation && !passwordConfirmValidation) {
            this.signupButton.style.backgroundColor = '#7F6AEE';
            setTimeout(() => {
                window.location.href = 'posts.html';
            }, 500);
        } else {
            this.passwordError.classList.toggle('show', passwordValidation !== '');
            this.passwordConfirmError.classList.toggle('show', passwordConfirmValidation !== '');
            
            this.passwordInput.parentElement.classList.toggle('error', passwordValidation !== '');
            this.passwordConfirmInput.parentElement.classList.toggle('error', passwordConfirmValidation !== '');
        }
    }

    handleLoginLink() {
        window.location.href = 'posts.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new passwordForm();
});