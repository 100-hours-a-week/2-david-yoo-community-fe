async function fetchPost(postId) {
    try {
        // 조회수 증가, 페이지가 로딩될 때 마다 조회수 추가
        await fetch(`http://localhost:3000/api/views/${postId}`, {
            method: 'POST'
        });
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        if (!response.ok) {
            throw new Error('게시글을 가져오는 데 실패했습니다.');
        }
        const post = await response.json();
        // 댓글 수 계산
        const commentCount = await fetchCommentCount(postId);
        post.commentsCount = commentCount;
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
    const nickname = localStorage.getItem('nickname');
    
    // 로그인 상태 확인
    if (!nickname) {
        alert('댓글을 작성하려면 로그인이 필요합니다.');
        return;
    }
    
    const content = document.querySelector('.comment-input textarea').value;
    if (!content) {
        alert('댓글 내용을 입력하세요.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ 
                postId, 
                content, 
                author: nickname // 현재 로그인한 사용자의 닉네임으로 설정
            }),
        });

        if (response.ok) {
            const newComment = await response.json();
            displayComment(newComment);
            document.querySelector('.comment-input textarea').value = '';
            // 댓글 수 업데이트
            const currentCount = parseInt(document.getElementById('comments-count').innerText || '0');
            updateCommentCount(currentCount + 1);
        } else {
            const errorData = await response.json();
            alert(errorData.message || '댓글 등록에 실패했습니다.');
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
    commentItem.setAttribute('data-comment-id', comment.id);

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
        modal.setAttribute('data-comment-id', comment.id);
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
            // 댓글 수 업데이트
            const currentCount = parseInt(document.getElementById('comments-count').innerText || '0');
            updateCommentCount(Math.max(0, currentCount - 1));
        }
    } catch (error) {
        console.error('댓글 삭제 중 오류 발생:', error);
        alert('댓글 삭제에 실패했습니다.');
    }
}

async function fetchCommentCount(postId) {
    try {
        const response = await fetch(`http://localhost:3000/api/comments/${postId}`);
        if (!response.ok) {
            throw new Error('댓글을 가져오는 데 실패했습니다.');
        }
        const comments = await response.json();
        return comments.length;
    } catch (error) {
        console.error('댓글 수를 가져오는 중 오류:', error);
        return 0;
    }
}

function updateCommentCount(count) {
    const commentCountElement = document.getElementById('comments-count');
    if (commentCountElement) {
        commentCountElement.innerText = count;
    }
}


async function toggleLike(postId) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/likes/${postId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // 쿠키 전송을 위해 필요
            },
        );

        if (!response.ok) {
            throw new Error('좋아요 처리 중 오류가 발생했습니다.');
        }

        const result = await response.json();
        updateLikeDisplay(result.isLiked, result.likeCount);
    } catch (error) {
        console.error('좋아요 처리 중 오류:', error);
    }
}

function updateLikeDisplay(isLiked, likeCount) {
    const likesCountElement = document.getElementById('likes-count');
    const likeButton = document.querySelector('.stat-item[data-type="likes"]');

    // 좋아요 수 업데이트
    likesCountElement.innerText = likeCount;

    // 좋아요 상태에 따른 스타일 변경
    if (isLiked) {
        likeButton.classList.add('liked');
    } else {
        likeButton.classList.remove('liked');
    }
}

function displayPost(post) {
    document.querySelector('.post-title').innerText = post.title;
    document.querySelector('.author-name').innerText = post.nickname;
    document.querySelector('.post-date').innerText = new Date(
        post.time,
    ).toLocaleString();
    document.querySelector('.post-content p').innerText = post.content;

    // 좋아요 수 표시
    document.getElementById('likes-count').innerText = post.likeCount || 0;
    document.getElementById('views-count').innerText = post.views || 0;
    document.getElementById('comments-count').innerText =
        post.commentsCount || 0;

    // 초기 좋아요 상태 확인
    checkLikeStatus(post.id);
}

// 좋아요 상태 확인
async function checkLikeStatus(postId) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/likes/check/${postId}`,
            {
                credentials: 'include',
            },
        );

        if (response.status === 401) {
            console.log('로그인이 필요한 기능입니다.');
            return;
        }

        if (response.ok) {
            const { isLiked } = await response.json();
            const likeButton = document.querySelector(
                '.stat-item[data-type="likes"]',
            );
            if (isLiked) {
                likeButton.classList.add('liked');
            }
        }
    } catch (error) {
        console.error('좋아요 상태 확인 중 오류:', error);
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

    const likeButton = document.querySelector('.stat-item');
    likeButton.setAttribute('data-type', 'likes');
    likeButton.style.cursor = 'pointer';
    likeButton.addEventListener('click', () => {
        const postId = new URLSearchParams(window.location.search).get('id');
        toggleLike(postId);
    });
});
