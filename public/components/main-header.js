class MainHeader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="main-header">
                <div class="main-header-title">아무 말 대잔치</div>
                <div class="user-menu">
                    <img src="/assets/default-profile.png" alt="프로필" class="profile-small">
                    <div class="dropdown-menu">
                        <a href="edit-profile.html">회원정보수정</a>
                        <a href="login.html">로그아웃</a>
                    </div>
                </div>
            </div>
        `;

        // 드롭다운 메뉴 관련 코드
        this.initDropdown();
    }

    initDropdown() {
        const userMenu = this.querySelector('.user-menu');
        const dropdownMenu = this.querySelector('.dropdown-menu');

        // 클릭 이벤트 처리
        userMenu.addEventListener('click', (e) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            dropdownMenu.classList.toggle('show'); // 드롭다운 메뉴 토글
        });

        // 드롭다운 메뉴 외부 클릭 시 닫기
        document.addEventListener('click', () => {
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
}

customElements.define('main-header', MainHeader);