document.addEventListener('DOMContentLoaded', function() {
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


    const userMenu = document.querySelector('.user-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    userMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    });
});