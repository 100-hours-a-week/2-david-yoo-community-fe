document.addEventListener('DOMContentLoaded', function () {
    const profileImageContainer = document.getElementById(
        'profileImageContainer',
    );
    const profileUpload = document.getElementById('profileUpload');
    const profilePreview = document.getElementById('profilePreview');

    profileImageContainer.addEventListener('click', () => {
        profileUpload.click();
    });

    profileUpload.addEventListener('change', e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                profilePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    const nicknameInput = document.getElementById('nickname');
    const nicknameError = document.getElementById('nicknameError');

    nicknameInput.addEventListener('input', () => {
        const nickname = nicknameInput.value;
        if (nickname.length < 2 || nickname.length > 10) {
            nicknameError.style.display = 'block';
        } else {
            nicknameError.style.display = 'none';
        }
    });

    const withdrawButton = document.getElementById('withdrawButton');
    const confirmPopup = document.getElementById('confirmPopup');
    const cancelBtn = confirmPopup.querySelector('.cancel-btn');
    const confirmBtn = confirmPopup.querySelector('.confirm-btn');

    withdrawButton.addEventListener('click', () => {
        confirmPopup.classList.add('show');
    });

    cancelBtn.addEventListener('click', () => {
        confirmPopup.classList.remove('show');
    });

    confirmBtn.addEventListener('click', () => {
        confirmPopup.classList.remove('show');
    });

    confirmBtn.addEventListener('click', () => {
        const email = localStorage.getItem('email');

        fetch('http://localhost:3000/auth/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('회원 탈퇴가 완료되었습니다.');
                    localStorage.removeItem('email'); // 로컬 스토리지 데이터 삭제
                    window.location.href = 'login.html';
                } else {
                    alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
            })
            .finally(() => {
                confirmPopup.classList.remove('show');
            });
    });

    const saveButton = document.getElementById('saveButton');

    const emailInput = document.querySelector('input[type="email"]');
    emailInput.value = localStorage.getItem('email'); // 로그인 시 저장된 이메일 불러오기

    saveButton.addEventListener('click', () => {
        const nickname = nicknameInput.value;

        if (nickname.length < 2 || nickname.length > 10) {
            nicknameError.style.display = 'block';
            return;
        } else {
            nicknameError.style.display = 'none';
        }

        fetch('http://localhost:3000/user/update-nickname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('email'),
                nickname: nickname,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('닉네임이 성공적으로 변경되었습니다!');
                    location.href = 'posts.html';
                } else {
                    alert('닉네임 변경에 실패했습니다.');
                }
            })
            .catch(error => console.error('Error:', error));
    });
});
