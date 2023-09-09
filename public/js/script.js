const dialogBodyList = document.querySelectorAll('dialog.dialog .dialog-body');
const modalList = document.querySelectorAll('dialog.dialog');
modalList.forEach((item) => {
  item.addEventListener('click', () => {
    setCloseModal(item);
  });
});
dialogBodyList.forEach((item) => {
  item.addEventListener('click', () => {
    event.stopPropagation();
  });
});

const demoModal = document.getElementById('demo-modal');
const demoModal2 = document.getElementById('demo-modal2');
const btnModalShow = document.getElementById('btn-show');
const btnModalShow2 = document.getElementById('btn-show2');
const btnModalCloseList = document.querySelectorAll('.btn-close');
const showModalCustom = (incModal) => {
  incModal.showModal();
  incModal.classList.add('active');
};
const setCloseModal = (incModal) => {
  incModal.addEventListener('transitionend', closeModal);
  incModal.classList.remove('active');
};
const closeModal = () => {
  event.target.removeEventListener('transitionend', closeModal);
  event.target.close();
};
btnModalShow.addEventListener('click', () => {
  showModalCustom(demoModal);
});
btnModalShow2.addEventListener('click', () => {
  showModalCustom(demoModal2);
});
btnModalCloseList.forEach((item) => {
  item.addEventListener('click', () => {
    setCloseModal(item.parentElement);
  });
});