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
}

async function submitPost() {
    const postId = new URLSearchParams(window.location.search).get('id');
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const updatedPost = {
        title,
        content,
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
});
