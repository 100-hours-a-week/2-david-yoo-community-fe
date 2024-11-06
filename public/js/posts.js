const threadContainer = document.getElementById('threadContainer');
let currentPage = 1;
const postsPerPage = 10;

async function fetchPosts(page = 1) {
    try {
        const response = await fetch(
            `http://localhost:3000/posts?page=${page}&limit=${postsPerPage}`,
        );
        if (!response.ok) {
            throw new Error('게시글을 가져오는 데 실패했습니다.');
        }

        const data = await response.json();
        displayPosts(data.posts);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

function displayPosts(posts) {
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');
        postCard.dataset.id = post.id;

        postCard.innerHTML = `
            <div class="post-header">
                <h2 class="post-title">${post.title}</h2>
                <div class="post-date">${new Date(post.time).toLocaleString()}</div>
            </div>
            <div class="post-divider"></div>
            <div class="post-content">${post.content}</div>
        `;

        postCard.addEventListener('click', () => {
            window.location.href = `post-detail.html?id=${post.id}`;
        });

        threadContainer.appendChild(postCard);
    });
}

fetchPosts(currentPage);

// Infinite scrolling
window.addEventListener('scroll', () => {
    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
    ) {
        currentPage++;
        fetchPosts(currentPage);
    }
});

document.querySelector('.create-button').addEventListener('click', () => {
    window.location.href = 'create-post.html';
});
