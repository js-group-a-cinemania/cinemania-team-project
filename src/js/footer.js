document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modalTeam');
  const btn = document.querySelector('.footerButton');
  const span = document.querySelector('.modalCloseButton');

  btn.onclick = function () {
    modal.style.display = 'block';
  };

  span.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  document.onkeydown = function (event) {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
  };
});
