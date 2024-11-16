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

// 폼에 게시글 데이터를 채우는 함수
function populateForm(post) {
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;

    // 기존 이미지가 있다면 미리보기 표시
    const imagePreview = document.getElementById('imagePreview');
    if (post.imageData && imagePreview) {
        imagePreview.src = post.imageData;
        imagePreview.style.display = 'block';
    }

    // 기존 닉네임을 hidden input으로 저장
    if (!document.getElementById('originalNickname')) {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'originalNickname';
        document.body.appendChild(hiddenInput);
    }
    document.getElementById('originalNickname').value = post.nickname;
}

// 게시글을 수정하는 함수
async function reSubmitPost() {
    const postId = new URLSearchParams(window.location.search).get('id');
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const nickname = document.getElementById('originalNickname').value;
    const imageInput = document.getElementById('imageUpload');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('nickname', nickname);

    // 새로운 이미지가 선택되었다면 FormData에 추가
    if (imageInput && imageInput.files.length > 0) {
        formData.append('image', imageInput.files[0]);
    }

    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'PUT',
            body: formData, // FormData 사용
        });

        if (!response.ok) {
            throw new Error('게시글 수정에 실패했습니다.');
        }

        alert('게시글이 수정되었습니다.');
        window.location.href = 'post-detail.html?id=' + postId;
    } catch (error) {
        console.error(error);
        alert('게시글 수정 중 오류가 발생했습니다.');
    }
}

// 이미지 미리보기 함수
function handleImagePreview() {
    const imageInput = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');

    imageInput.addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (postId) {
        fetchPost(postId);
    } else {
        console.error('게시물 ID가 없습니다.');
    }

    // 이미지 미리보기 초기화
    handleImagePreview();

    // submit 이벤트 리스너 추가
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            reSubmitPost();
        });
    }
});
