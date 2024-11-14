class LottieHeader extends HTMLElement {
    constructor() {
        super();
        this.loadProfileImage();
    }
    async loadProfileImage() {
        const email = localStorage.getItem('email');
        try {
            const response = await fetch(
                `http://localhost:3000/user/profile-image/${email}`,
            );
            const data = await response.json();

            this.innerHTML = `
                <div class="header">
                <div class="lottie-back-button" id="back-button"></div>
                    <h4 class="main-header-title">아무 말 대잔치</h4>
                    <div class="user-menu">
                        <img src="${data.success ? `http://localhost:3000/uploads/${data.profileImage}` : '../assets/default.webp'}" 
                             alt="프로필" 
                             class="profile-small">
                        <div class="dropdown-menu">
                            <a href="edit-profile.html">회원정보수정</a>
                            <a href="change-password.html">비밀번호수정</a>
                            <a href="login.html">로그아웃</a>
                        </div>
                    </div>
                </div>
            `;
            this.initDropdown();
            this.initLottie();
        } catch (error) {
            console.error('프로필 이미지 로드 실패:', error);
        }
    }

    initDropdown() {
        const userMenu = this.querySelector('.user-menu');
        const dropdownMenu = this.querySelector('.dropdown-menu');

        userMenu.addEventListener('click', e => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        });
    }

    initLottie() {
        const backButton = this.querySelector('#back-button');
        const lottieAnimation = lottie.loadAnimation({
            container: backButton,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: '../assets/animation.json',
        });

        backButton.addEventListener('click', () => {
            window.location.href = 'posts.html';
        });
    }
}

customElements.define('lottie-header', LottieHeader);
