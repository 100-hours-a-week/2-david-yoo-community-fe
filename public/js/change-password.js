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
        this.passwordConfirmError = document.getElementById(
            'passwordConfirmError',
        );
    }

    initializeEventListeners() {
        this.passwordInput.addEventListener('input', () =>
            this.validatePasswordInput(),
        );
        this.passwordConfirmInput.addEventListener('input', () =>
            this.validatePasswordConfirmInput(),
        );
        this.signupButton.addEventListener('click', () =>
            this.handlePassword(),
        );
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

    validatePasswordInput() {
        const error = this.validatePassword(this.passwordInput.value);
        this.passwordError.textContent = error;
        this.passwordError.classList.toggle('show', error !== '');
        this.passwordInput.parentElement.classList.toggle(
            'error',
            error !== '',
        );
    }

    validatePasswordConfirmInput() {
        const error = this.validatePasswordConfirm(
            this.passwordInput.value,
            this.passwordConfirmInput.value,
        );
        this.passwordConfirmError.textContent = error;
        this.passwordConfirmError.classList.toggle('show', error !== '');
        this.passwordConfirmInput.parentElement.classList.toggle(
            'error',
            error !== '',
        );
    }

    async handlePassword() {
        const passwordValidation = this.validatePassword(
            this.passwordInput.value,
        );
        const passwordConfirmValidation = this.validatePasswordConfirm(
            this.passwordInput.value,
            this.passwordConfirmInput.value,
        );

        if (!passwordValidation && !passwordConfirmValidation) {
            try {
                const response = await fetch(
                    'http://localhost:3000/user/change-password',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: localStorage.getItem('email'), // 현재 로그인한 사용자의 이메일
                            newPassword: this.passwordInput.value,
                        }),
                    },
                );

                if (response.ok) {
                    alert('비밀번호가 성공적으로 변경되었습니다.');
                    this.signupButton.style.backgroundColor = '#7F6AEE';
                    setTimeout(() => {
                        window.location.href = 'posts.html';
                    }, 500);
                } else {
                    alert('비밀번호 변경에 실패했습니다.');
                }
            } catch (error) {
                console.error('비밀번호 변경 요청 중 오류 발생:', error);
            }
        } else {
            this.passwordError.classList.toggle(
                'show',
                passwordValidation !== '',
            );
            this.passwordConfirmError.classList.toggle(
                'show',
                passwordConfirmValidation !== '',
            );

            this.passwordInput.parentElement.classList.toggle(
                'error',
                passwordValidation !== '',
            );
            this.passwordConfirmInput.parentElement.classList.toggle(
                'error',
                passwordConfirmValidation !== '',
            );
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new passwordForm();
});
