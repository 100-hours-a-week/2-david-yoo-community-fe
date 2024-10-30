class MainHeader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="main-header">
                <div class="main-header-title">아무 말 대잔치</div>
                <div class="user-menu">
                    <img src="../assets/default.webp" alt="프로필" class="profile-small">
                    <div class="dropdown-menu">
                        <a href="edit-profile.html">회원정보수정</a>
                        <a href="login.html">로그아웃</a>
                    </div>
                </div>
            </div>
        `;
        this.initDropdown();
    }

    initDropdown() {
        const userMenu = this.querySelector('.user-menu');
        const dropdownMenu = this.querySelector('.dropdown-menu');

        userMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
}

customElements.define('main-header', MainHeader);