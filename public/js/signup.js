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
        this.passwordConfirmError = document.getElementById(
            'passwordConfirmError',
        );
        this.nicknameError = document.getElementById('nicknameError');
    }

    initializeEventListeners() {
        if (this.profilePreview && this.profileUpload) {
            this.profilePreview.addEventListener('click', () =>
                this.profileUpload.click(),
            );
            this.profileUpload.addEventListener(
                'change',
                this.handleProfileImage,
            );
        }

        this.emailInput.addEventListener('input', this.validateEmailInput);
        this.passwordInput.addEventListener(
            'input',
            this.validatePasswordInput,
        );
        this.passwordConfirmInput.addEventListener(
            'input',
            this.validatePasswordConfirmInput,
        );
        this.nicknameInput.addEventListener(
            'input',
            this.validateNicknameInput,
        );
        this.signupButton.addEventListener('click', this.handleSignup);
        this.loginLink.addEventListener('click', this.handleLoginLink);
    }

    handleProfileImage = event => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                this.profilePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return '이메일을 입력해주세요.';
        if (email.length < 5) return '이메일이 너무 짧습니다.';
        if (!emailPattern.test(email)) return '올바른 이메일 형식이 아닙니다.';
        return '';
    }

    validatePassword(password) {
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if (!password) return '비밀번호를 입력해주세요.';
        if (!passwordPattern.test(password))
            return '비밀번호는 8-20자이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        return '';
    }

    validatePasswordConfirm(password, passwordConfirm) {
        if (!passwordConfirm) return '비밀번호를 한번 더 입력해주세요.';
        if (password !== passwordConfirm)
            return '비밀번호가 일치하지 않습니다.';
        return '';
    }

    validateNickname(nickname) {
        if (!nickname) return '닉네임을 입력해주세요.';
        if (nickname.length < 2 || nickname.length > 10)
            return '닉네임은 2자 이상 10자 이하여야 합니다.';
        return '';
    }

    displayError(input, error) {
        const errorElement = this[`${input}Error`];
        errorElement.textContent = error;
        errorElement.classList.toggle('show', error !== '');
        this[input + 'Input'].parentElement.classList.toggle(
            'error',
            error !== '',
        );
    }

    validateEmailInput = () => {
        this.displayError('email', this.validateEmail(this.emailInput.value));
    };

    validatePasswordInput = () => {
        this.displayError(
            'password',
            this.validatePassword(this.passwordInput.value),
        );
    };

    validatePasswordConfirmInput = () => {
        const error = this.validatePasswordConfirm(
            this.passwordInput.value,
            this.passwordConfirmInput.value,
        );
        this.displayError('passwordConfirm', error);
    };

    validateNicknameInput = () => {
        this.displayError(
            'nickname',
            this.validateNickname(this.nicknameInput.value),
        );
    };

    handleSignup = () => {
        const emailValidation = this.validateEmail(this.emailInput.value);
        const passwordValidation = this.validatePassword(
            this.passwordInput.value,
        );
        const passwordConfirmValidation = this.validatePasswordConfirm(
            this.passwordInput.value,
            this.passwordConfirmInput.value,
        );
        const nicknameValidation = this.validateNickname(
            this.nicknameInput.value,
        );

        if (
            !emailValidation &&
            !passwordValidation &&
            !passwordConfirmValidation &&
            !nicknameValidation
        ) {
            const userData = {
                email: this.emailInput.value,
                password: this.passwordInput.value,
                nickname: this.nicknameInput.value,
            };

            fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('회원가입 성공');
                        window.location.href = 'login.html';
                    } else {
                        alert(data.message || '회원가입 실패');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('서버 오류가 발생했습니다.');
                });
        } else {
            this.displayError('email', emailValidation);
            this.displayError('password', passwordValidation);
            this.displayError('passwordConfirm', passwordConfirmValidation);
            this.displayError('nickname', nicknameValidation);
        }
    };

    handleLoginLink = () => {
        window.location.href = 'login.html';
    };
}

document.addEventListener('DOMContentLoaded', () => {
    new SignupForm();
});
