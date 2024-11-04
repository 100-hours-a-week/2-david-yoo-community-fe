async function fetchPost(postId) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        if (!response.ok) {
            throw new Error('게시글을 가져오는 데 실패했습니다.');
        }
        const post = await response.json();
        displayPost(post);
    } catch (error) {
        console.error(error);
    }
}

function displayPost(post) {
    document.querySelector('.post-title').innerText = post.title;
    document.querySelector('.author-name').innerText = post.nickname;
    document.querySelector('.post-date').innerText = new Date(post.time).toLocaleString();
    document.querySelector('.post-content p').innerText = post.content;
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        fetchPost(postId);
    } else {
        console.error('게시물 ID가 없습니다.');
    }

    const editButton = document.getElementById('edit-button');
    if (editButton) {
        editButton.addEventListener('click', () => {
            location.href = `edit-post.html?id=${postId}`;
        });
    }

    const postDeleteBtn = document.querySelector('.post-delete-btn');
    if (postDeleteBtn) {
        postDeleteBtn.addEventListener('click', () => openModal('postDeleteModal'));
    }

    const commentDeleteBtns = document.querySelectorAll('.comment-delete-btn');
    commentDeleteBtns.forEach(btn => {
        btn.addEventListener('click', () => openModal('commentDeleteModal'));
    });

    const cancelBtns = document.querySelectorAll('.btn-cancel');
    cancelBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modalId = this.closest('.modal-backdrop').id;
            closeModal(modalId);
        });
    });

    const modals = document.querySelectorAll('.modal-backdrop');
    modals.forEach(modal => {
        modal.addEventListener('click', function (event) {
            if (event.target === this) {
                closeModal(this.id);
            }
        });
    });
});