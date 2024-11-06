const submitPost = () => {
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const imageUploadInput = document.getElementById('imageUpload');

    const title = titleInput.value.trim(); // 제목
    const content = contentInput.value.trim(); // 내용
    const nickname = localStorage.getItem('nickname'); // 로그인한 사용자의 닉네임 (로컬스토리지에서 가져옴)

    if (!title || !content) {
        alert('제목과 내용은 필수입니다.');
        return;
    }

    // TODO : 이미지 업로드
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('nickname', nickname);
    if (imageUploadInput.files.length > 0) {
        formData.append('image', imageUploadInput.files[0]); // 이미지 파일 추가
    }

    fetch('http://localhost:3000/posts/create-post', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('게시물이 성공적으로 작성되었습니다!');
                window.location.href = 'posts.html';
            } else {
                alert('게시물 작성에 실패했습니다.');
            }
        })
        .catch(error => console.error(`Error: ${error}`));
};
