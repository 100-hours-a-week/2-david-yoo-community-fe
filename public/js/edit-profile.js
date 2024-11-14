document.addEventListener('DOMContentLoaded', function () {
    const profileImageContainer = document.getElementById(
        'profileImageContainer',
    );
    const profileUpload = document.getElementById('profileUpload');
    const profilePreview = document.getElementById('profilePreview');
    const email = localStorage.getItem('email');

    fetch(`http://localhost:3000/user/profile-image/${email}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 기본 이미지인 경우
                if (data.profileImage === 'default.webp') {
                    profilePreview.src = '../assets/default.webp';
                } else {
                    // 업로드된 이미지인 경우
                    profilePreview.src = `http://localhost:3000/uploads/${data.profileImage}`;
                }
            }
        })
        .catch(error => {
            console.error('프로필 이미지 로드 오류:', error);
            profilePreview.src = '../assets/default.webp'; // 오류 시 기본 이미지 사용
        });

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

    const saveButton = document.getElementById('saveButton');

    const emailInput = document.querySelector('input[type="email"]');
    emailInput.value = localStorage.getItem('email'); // 로그인 시 저장된 이메일 불러오기

    saveButton.addEventListener('click', async () => {
        const nickname = nicknameInput.value;

        if (nickname.length < 2 || nickname.length > 10) {
            nicknameError.style.display = 'block';
            return;
        }

        try {
            // 프로필 이미지 업데이트
            if (profilePreview.src.startsWith('data:image')) {
                await fetch('http://localhost:3000/user/update-profile-image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        profileImage: profilePreview.src,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (!data.success) {
                            throw new Error(data.message);
                        }
                    });
            }

            // 닉네임 업데이트
            const nicknameResponse = await fetch(
                'http://localhost:3000/user/update-nickname',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        nickname: nickname,
                    }),
                },
            );

            const nicknameData = await nicknameResponse.json();

            if (nicknameData.success) {
                alert('프로필이 성공적으로 업데이트되었습니다!');
                location.href = 'posts.html';
            } else {
                alert('프로필 업데이트에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('프로필 업데이트 중 오류가 발생했습니다.');
        }
    });
});
