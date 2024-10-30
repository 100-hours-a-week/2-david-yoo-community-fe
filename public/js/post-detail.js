function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', function() {
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
        btn.addEventListener('click', function() {
            const modalId = this.closest('.modal-backdrop').id;
            closeModal(modalId);
        });
    });

    const modals = document.querySelectorAll('.modal-backdrop');
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeModal(this.id);
            }
        });
    });
});