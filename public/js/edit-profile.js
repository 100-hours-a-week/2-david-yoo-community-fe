document.addEventListener('DOMContentLoaded', function() {
    // 프로필 이미지 업로드
    const profileImageContainer = document.getElementById('profileImageContainer');
    const profileUpload = document.getElementById('profileUpload');
    const profilePreview = document.getElementById('profilePreview');

    profileImageContainer.addEventListener('click', () => {
        profileUpload.click();
    });

    profileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 닉네임 유효성 검사
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

    // 회원탈퇴 팝업
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
        // 회원탈퇴 처리 로직
        confirmPopup.classList.remove('show');
    });

    // 드롭다운 메뉴
    const userMenu = document.querySelector('.user-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    userMenu.addEventListener('click', (e) => {
        e.stopPropagation();  // 추가: 이벤트 버블링 방지
        dropdownMenu.classList.toggle('show');  // 변경: style 직접 조작 대신 클래스 토글 사용
    });

    // 드롭다운 메뉴 외부 클릭시 닫기
    document.addEventListener('click', () => {
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    });
});