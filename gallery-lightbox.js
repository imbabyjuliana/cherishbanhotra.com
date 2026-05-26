const previewButtons = document.querySelectorAll('.gallery-preview');
const modal = document.querySelector('#imageModal');
const modalImage = document.querySelector('#modalImage');
const modalCaption = document.querySelector('#modalCaption');
const closeButtons = modal.querySelectorAll('.modal-close, .modal-backdrop');
let activeTrigger = null;

const closePreview = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modalImage.src = '';
  modalImage.alt = '';
  modalCaption.textContent = '';

  if (activeTrigger) {
    activeTrigger.focus();
  }
};

previewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeTrigger = button;
    const image = button.querySelector('img');
    const title = button.dataset.title;

    modalImage.src = button.dataset.full;
    modalImage.alt = image.alt;
    modalCaption.textContent = title;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close').focus();
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', closePreview);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    closePreview();
  }
});
