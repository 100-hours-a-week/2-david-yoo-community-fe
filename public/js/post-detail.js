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

async function deletePost(postId) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('게시글 삭제에 실패했습니다.');
        }

        // 삭제 성공 시 목록 페이지로 이동
        window.location.href = 'posts.html';
    } catch (error) {
        console.error('게시글 삭제 중 오류 발생:', error);
        alert('게시글 삭제에 실패했습니다.');
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
    commentItem.setAttribute('data-comment-id', comment.id); // Add this line to store comment ID

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
                    <button class="comment-delete-btn" data-comment-id="${comment.id}">삭제</button>
                </div>
            </div>
            <div class="comment-text">${comment.content}</div>
        </div>
    `;
    commentList.appendChild(commentItem);

    const deleteBtn = commentItem.querySelector('.comment-delete-btn');
    deleteBtn.addEventListener('click', () => {
        const modal = document.getElementById('commentDeleteModal');
        modal.setAttribute('data-comment-id', comment.id); // Store comment ID in modal
        openModal('commentDeleteModal');
    });
}

async function deleteComment(commentId) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/comments/${commentId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!response.ok) {
            throw new Error('댓글 삭제에 실패했습니다.');
        }

        // 화면에서 댓글 요소 제거
        const commentElement = document.querySelector(
            `[data-comment-id="${commentId}"]`,
        );
        if (commentElement) {
            commentElement.remove();
        }
    } catch (error) {
        console.error('댓글 삭제 중 오류 발생:', error);
        alert('댓글 삭제에 실패했습니다.');
    }
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

    // 게시글 삭제 모달 관련 이벤트 리스너
    const postDeleteBtn = document.querySelector('.post-delete-btn');
    if (postDeleteBtn) {
        postDeleteBtn.addEventListener('click', () =>
            openModal('postDeleteModal'),
        );
    }

    // 게시글 삭제 확인 버튼 이벤트 리스너 추가
    const postDeleteConfirmBtn = document.querySelector(
        '#postDeleteModal .btn-confirm',
    );
    if (postDeleteConfirmBtn) {
        postDeleteConfirmBtn.addEventListener('click', async () => {
            await deletePost(postId);
            closeModal('postDeleteModal');
        });
    }

    // 댓글 삭제
    const commentDeleteConfirmBtn = document.querySelector(
        '#commentDeleteModal .btn-confirm',
    );
    if (commentDeleteConfirmBtn) {
        commentDeleteConfirmBtn.addEventListener('click', async () => {
            const modal = document.getElementById('commentDeleteModal');
            const commentId = modal.getAttribute('data-comment-id');
            if (commentId) {
                await deleteComment(commentId);
                closeModal('commentDeleteModal');
            }
        });
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
