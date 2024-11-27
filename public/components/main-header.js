import { handleLogout } from '../js/logout.js';

class MainHeader extends HTMLElement {
    constructor() {
        super();
        this.loadProfileImage();
    }

    async loadProfileImage() {
        const email = localStorage.getItem('email');
        if (!email) {
            this.renderDefaultHeader();
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/user/profile-image/${email}`,
                // `http://3.35.132.8:3000/user/profile-image/${email}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (!response.ok) throw new Error('Failed to fetch profile image');

            const data = await response.json();
            // 이미지 URL 수정
            const imageUrl = data.profileImage
                ? `http://localhost:3000/uploads/profiles/${data.profileImage}`
                : 'http://localhost:3000/uploads/profiles/default.webp';
                // ? `http://3.35.132.8:3000/uploads/profiles/${data.profileImage}`
                // : 'http://3.35.132.8:3000/uploads/profiles/default.webp';

            this.renderHeader(imageUrl);
        } catch (error) {
            console.error('Profile image load failed:', error);
            this.renderDefaultHeader();
        }
    }

    renderDefaultHeader() {
        this.renderHeader(
            'http://localhost:3000/uploads/profiles/default.webp',
            // 'http://3.35.132.8:3000/uploads/profiles/default.webp',
        );
    }

    renderHeader(imageUrl) {
        this.innerHTML = `
            <div class="header">
                <h4 class="main-header-title">아무 말 대잔치</h4>
                <div class="user-menu">
                    <img src="${imageUrl}" 
                         alt="프로필" 
                         class="profile-small"
                         onerror="this.src='../assets/default.webp'">
                    <div class="dropdown-menu">
                        <a href="edit-profile.html">회원정보수정</a>
                        <a href="change-password.html">비밀번호수정</a>
                        <a class="logout">로그아웃</a>
                    </div>
                </div>
            </div>
            <script type="module" src="main-header.js"></script>
        `;
        this.initDropdown();
        this.initLogout();
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

    initLogout() {
        const logoutButton = this.querySelector('.logout');
        logoutButton.addEventListener('click', handleLogout);
    }
}

customElements.define('main-header', MainHeader);
