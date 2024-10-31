import postsInfo from '../postsInfo.js';

const threadContainer = document.getElementById('threadContainer');

function formatViews(views) {
    if (views >= 100000) {
        return Math.floor(views / 1000) + 'k';
    } else if (views >= 10000) {
        return Math.floor(views / 1000) + 'k';
    } else if (views >= 1000) {
        return Math.floor(views / 100) / 10 + 'k';
    } else {
        return views;
    }
}

postsInfo.forEach(post => {
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');

    postCard.innerHTML = `
        <div class="post-header">
            <h2 class="post-title">${post.title}</h2>
            <div class="post-stats">좋아요 ${post.likes} 댓글 ${post.comments} 조회수 ${formatViews(post.views)}</div>
            <div class="post-date">${post.date}</div>
        </div>
        <div class="post-divider"></div>
        <div class="post-footer">
            <div class="profile">
                <img src="${post.profileImage}" alt="프로필" class="profile-small" />
                <span class="profile-name"><strong>${post.author}</strong></span>
            </div>
        </div>
    `;

    threadContainer.appendChild(postCard);
});

document.querySelector('.create-button').addEventListener('click', function () {
    window.location.href = 'create-post.html';
});

document.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('click', function () {
        window.location.href = 'post-detail.html';
    });
});
