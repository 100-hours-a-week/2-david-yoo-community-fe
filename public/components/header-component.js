class Header extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="header">
                <div class="header-title">아무 말 대잔치</div>
            </div>
        `;
    }
}

customElements.define('header-component', Header);