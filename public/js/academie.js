document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.menu-groupe').forEach(groupe => {
    const titre = groupe.querySelector('.menu-titre');
    if (titre) {
      titre.addEventListener('click', (e) => {
        if (window.innerWidth < 1024) {
          e.preventDefault();
          groupe.classList.toggle('ouvert');
        }
      });
    }
  });
});
