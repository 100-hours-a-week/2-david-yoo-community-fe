const threadContainer = document.getElementById('threadContainer');

async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts'); // 백엔드 API 엔드포인트
        if (!response.ok) {
            throw new Error('게시글을 가져오는 데 실패했습니다.');
        }

        const posts = await response.json(); // JSON 형식으로 변환
        displayPosts(posts);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

function displayPosts(posts) {
    threadContainer.innerHTML = ''; // 기존 게시물 초기화
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');
        postCard.dataset.id = post.id; // 각 포스트의 ID를 추가

        postCard.innerHTML = `
            <div class="post-header">
                <h2 class="post-title">${post.title}</h2>
                <div class="post-date">${new Date(post.time).toLocaleString()}</div>
            </div>
            <div class="post-divider"></div>
            <div class="post-content">${post.content}</div>
        `;

        postCard.addEventListener('click', function () {
            window.location.href = `post-detail.html?id=${post.id}`;
        });

        threadContainer.appendChild(postCard);
    });
}

document.querySelector('.create-button').addEventListener('click', function () {
    window.location.href = 'create-post.html';
});

fetchPosts();
