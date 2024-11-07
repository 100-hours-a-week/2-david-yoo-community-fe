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
        this.emailInput.addEventListener('input', () =>
            this.validateEmailInput(),
        );
        this.passwordInput.addEventListener('input', () =>
            this.validatePasswordInput(),
        );
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
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
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
        this.passwordInput.parentElement.classList.toggle(
            'error',
            error !== '',
        );
    }

    async handleLogin() {
        const emailValidation = this.validateEmail(this.emailInput.value);
        const passwordValidation = this.validatePassword(
            this.passwordInput.value,
        );

        if (!emailValidation && !passwordValidation) {
            try {
                const response = await fetch(
                    'http://localhost:3000/auth/login',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({
                            email: this.emailInput.value,
                            password: this.passwordInput.value,
                        }),
                    },
                );

                if (response.ok) {
                    const data = await response.json();
                    // 이메일과 닉네임 모두 저장
                    localStorage.setItem('email', this.emailInput.value);
                    localStorage.setItem('nickname', data.nickname);
                    window.location.href = 'posts.html';
                } else {
                    const errorData = await response.json();
                    console.error(errorData.message);
                }
            } catch (error) {
                console.error('로그인 요청 중 오류 발생:', error);
            }
        }
    }

    handleSignup() {
        window.location.href = 'signup.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LoginForm();
});
