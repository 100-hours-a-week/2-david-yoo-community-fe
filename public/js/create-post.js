const submitPost = async () => {
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const imageUploadInput = document.getElementById('imageUpload');
    // 입력된 제목과 내용을 가져오고 앞뒤 공백 제거
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    // 닉네임을 로컬 스토리지에서 가져오며, 없으면 '익명'으로 설정
    const nickname = localStorage.getItem('nickname') || '익명';

    if (!title || !content) {
        alert('제목과 내용은 필수입니다.');
        return;
    }

    if (imageUploadInput.files.length > 0) {
        const file = imageUploadInput.files[0];
        // 파일 크기 검증 (5MB 초과 시 경고)
        if (file.size > 5 * 1024 * 1024) {
            alert('이미지 크기는 5MB를 초과할 수 없습니다.');
            return;
        }
        // JPEG, PNG, GIF만 허용
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            alert(
                '지원하지 않는 파일 형식입니다. JPEG, PNG, GIF 파일만 업로드 가능합니다.',
            );
            return;
        }
    }
    // 서버로 보낼 데이터 준비
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('nickname', nickname);
    // 이미지 파일이 있다면 formData에 추가
    if (imageUploadInput.files.length > 0) {
        formData.append('image', imageUploadInput.files[0]);
    }

    try {
        const response = await fetch(
            'http://localhost:3000/posts/create-post',
            {
                method: 'POST',
                body: formData,
                credentials: 'include',
            },
        );
        // 요청이 실패하면 오류 메시지를 표시
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '게시물 작성에 실패했습니다.');
        }

        const data = await response.json();

        if (data.success) {
            alert('게시물이 성공적으로 작성되었습니다!');
            window.location.href = 'posts.html';
        } else {
            alert(data.error || '게시물 작성에 실패했습니다.');
        }
    } catch (error) {
        console.error('Error creating post:', error);
        alert(error.message);
    }
};
