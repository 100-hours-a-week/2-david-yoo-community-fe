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
    document.querySelector('.post-date').innerText = new Date(
        post.time,
    ).toLocaleString();
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

async function submitComment(postId) {
    const content = document.querySelector('.comment-input textarea').value;
    const author = 'User'; // TODO: 댓글 작성자를 현재 로그인 한 유저로 변경

    if (!content) return alert('댓글 내용을 입력하세요.');

    try {
        const response = await fetch(`http://localhost:3000/api/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId, content, author }),
        });

        if (response.ok) {
            const newComment = await response.json();
            displayComment(newComment);
            document.querySelector('.comment-input textarea').value = '';
        } else {
            console.error('댓글 등록 실패');
        }
    } catch (error) {
        console.error('서버 오류:', error);
    }
}

async function fetchComments(postId) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/comments/${postId}`,
        );
        if (response.ok) {
            const comments = await response.json();
            comments.forEach(displayComment);
        } else {
            console.error('댓글을 불러오는 데 실패했습니다.');
        }
    } catch (error) {
        console.error('서버 오류:', error);
    }
}

function displayComment(comment) {
    const commentList = document.querySelector('.comment-list');
    const commentItem = document.createElement('div');
    commentItem.classList.add('comment-item');

    commentItem.innerHTML = `
        <div class="profile-image"></div>
        <div class="comment-content">
            <div class="comment-header">
                <div>
                    <span class="commenter-name">${comment.author}</span>
                    <span class="comment-date">${new Date(comment.time).toLocaleString()}</span>
                </div>
                <div class="comment-actions">
                    <button class="comment-edit-btn">수정</button>
                    <button class="comment-delete-btn">삭제</button>
                </div>
            </div>
            <div class="comment-text">${comment.content}</div>
        </div>
    `;
    commentList.appendChild(commentItem);

    const deleteBtn = commentItem.querySelector('.comment-delete-btn');
    deleteBtn.addEventListener('click', () => openModal('commentDeleteModal'));
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        fetchPost(postId);
        fetchComments(postId);
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
        postDeleteBtn.addEventListener('click', () =>
            openModal('postDeleteModal'),
        );
    }

    const cancelBtns = document.querySelectorAll('.btn-cancel');
    cancelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.closest('.modal-backdrop').id;
            closeModal(modalId);
        });
    });

    const modals = document.querySelectorAll('.modal-backdrop');
    modals.forEach(modal => {
        modal.addEventListener('click', event => {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    const commentSubmitButton = document.querySelector('.comment-submit');
    commentSubmitButton.addEventListener('click', () => submitComment(postId));
});
