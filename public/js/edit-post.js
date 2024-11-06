async function fetchPost(postId) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        if (!response.ok) {
            throw new Error('게시글을 가져오는 데 실패했습니다.');
        }
        const post = await response.json();
        populateForm(post);
    } catch (error) {
        console.error(error);
    }
}

function populateForm(post) {
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;
    // TODO: 이미지 처리 로직은 나중에 추가
    // nickname을 hidden input으로 저장
    if (!document.getElementById('originalNickname')) {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'originalNickname';
        document.body.appendChild(hiddenInput);
    }
    document.getElementById('originalNickname').value = post.nickname;
}

async function reSubmitPost() {
    const postId = new URLSearchParams(window.location.search).get('id');
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const nickname = document.getElementById('originalNickname').value; // 기존 닉네임 유지

    const updatedPost = {
        title,
        content,
        nickname,
        time: new Date().toISOString(),
        // TODO: 이미지 처리 로직 추가
    };

    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
        });

        if (!response.ok) {
            throw new Error('게시글 수정에 실패했습니다.');
        }

        alert('게시글이 수정되었습니다.');
        window.location.href = 'post-detail.html?id=' + postId;
    } catch (error) {
        console.error(error);
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

    // submit 이벤트 리스너 추가
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            reSubmitPost();
        });
    }
});
