document.querySelector('.create-button').addEventListener('click', function() {
    window.location.href = 'create-post.html';
});

document.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('click', function() {
        window.location.href = 'post-detail.html';
    });
});