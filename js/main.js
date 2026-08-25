// MDTA Al-Barokah — script bersama semua halaman
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mainNav');
  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    document.querySelectorAll('nav a').forEach(a =>
      a.addEventListener('click', () => nav.classList.remove('open'))
    );
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  const profileModal = document.getElementById('profileModal');
  if (profileModal) {
    const name = document.getElementById('profileName');
    const role = document.getElementById('profileRole');
    const photo = document.getElementById('profilePhoto');
    const birth = document.getElementById('profileBirth');
    const address = document.getElementById('profileAddress');
    const contact = document.getElementById('profileContact');
    const closeProfile = () => {
      profileModal.classList.remove('is-open');
      profileModal.setAttribute('aria-hidden', 'true');
    };
    document.querySelectorAll('.org-card[data-person]').forEach(card => {
     card.addEventListener('click', () => {
  name.textContent = card.dataset.person;
  role.textContent = card.dataset.role;

  const cardPhoto = card.querySelector('.org-avatar');
  photo.src = cardPhoto.src;
  photo.alt = cardPhoto.alt;

  profileModal.classList.add('is-open');
  profileModal.setAttribute('aria-hidden', 'false');

  birth.textContent = card.dataset.lahir || 'Belum diinformasikan';
  address.textContent = card.dataset.alamat || 'Belum diinformasikan';
  contact.textContent = card.dataset.kontak || 'Belum diinformasikan';
});
    });
    profileModal.querySelectorAll('[data-close-profile]').forEach(button => button.addEventListener('click', closeProfile));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeProfile(); });
  }
});
