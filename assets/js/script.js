// -----------------------------------------------------
// LOADING
// -----------------------------------------------------

let progress = 0;
const maxProgress = 25;
let loadingFailed = false;
window.addEventListener('load', () => {
  updateProgress();
});

function updateProgress() {
  if (loadingFailed && progress >= 10) return;

  progress++;
  const percentage = Math.floor((progress / maxProgress) * 120);
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = percentage + '%';

  if (progress < maxProgress) {
    setTimeout(updateProgress, 100);
  } else if (!loadingFailed) {
    smoothHideLoader();
  }
}

function smoothHideLoader() {
  const loader = document.getElementById('loading-content');
  const pageSlide = document.getElementById('page-slide');
  const mainToggle = document.getElementById('main-toggle');

  loader.style.transition = 'opacity 0.3s ease';
  loader.style.opacity = '0';

  setTimeout(() => {
    loader.style.display = 'none';

    pageSlide.classList.add('slide-out');

    setTimeout(() => {
      mainToggle.style.display = 'block';
      mainToggle.style.opacity = '0';

      setTimeout(() => {
        mainToggle.style.transition = 'opacity 1s ease';
        mainToggle.style.opacity = '1';

        setTimeout(() => {
          pageSlide.remove();
        }, 1500); 
      }, 50); 
    }, 200);  
  }, 600); 
}


// -----------------------------------------------------
// NAVBAR
// -----------------------------------------------------

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const toggleBtn = document.querySelector('.list-toggle');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  overlay.classList.toggle('show');
  
  if (toggleBtn.classList.contains('bi-list')) {
    toggleBtn.classList.remove('bi-list');
    toggleBtn.classList.add('bi-x');
  } else {
    toggleBtn.classList.remove('bi-x');
    toggleBtn.classList.add('bi-list');
  }
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('show');
      overlay.classList.remove('show');
      toggleBtn.classList.remove('bi-x');
      toggleBtn.classList.add('bi-list');
    });
    
// -----------------------------------------------------
// MODE GELAP & TERANG
// -----------------------------------------------------

const darkToggle = document.getElementById('darkModeToggle');
const themeIcon = document.getElementById('themeIcon');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    themeIcon.classList.remove('bi-moon');
    themeIcon.classList.add('bi-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('bi-sun');
    themeIcon.classList.add('bi-moon');
    localStorage.setItem('theme', 'light');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('bi-moon');
    themeIcon.classList.add('bi-sun');
  } else {
    themeIcon.classList.remove('bi-sun');
    themeIcon.classList.add('bi-moon');
  }
});

  // ===== Share Web ===== //

  function bagikanHalaman() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: "FALINTEC!",
        url: window.location.href
      }).catch(() => alert("Gagal membagikan."));
    } else {
      prompt("Copy link:", window.location.href);
    }
  }

   // ===== Text Home ===== //

    const typedText = document.getElementById('typed-text');
    const underline = document.getElementById('underline');
    const measurer = document.getElementById('text-measurer');

    const texts = ["Penghayal Handal", "Mahasiswa UGD", "Kang Pacul"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentText = texts[textIndex];
      let currentDisplay = currentText.substring(0, charIndex);
      typedText.textContent = currentDisplay;
      measurer.textContent = currentDisplay;

      const width = measurer.offsetWidth;
      underline.style.width = width + "px";

      if (!isDeleting && charIndex < currentText.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 60);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          textIndex = (textIndex + 1) % texts.length;
        }
        setTimeout(typeEffect, 1000);
      }
    }

    typeEffect();
    
  // ===== Skills ===== //

  document.addEventListener('DOMContentLoaded', () => {
    const bars = document.querySelectorAll('.bar-skill');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percent = parseInt(bar.getAttribute('data-percent'), 10);
          const fill = bar.querySelector('.skill-fill');
          const label = bar.querySelector('.skill-percent');

          let current = 0;
          fill.style.width = percent + '%';

          const counter = setInterval(() => {
            if (current >= percent) {
              clearInterval(counter);
            } else {
              current++;
              label.textContent = current + '%';
            }
          }, 15);

          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
  });

  // ===== Portofolio ===== //

  document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("portofolioModalAlert");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalLink = document.getElementById("modalLink");


  document.querySelectorAll(".open-modal").forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalTitle.textContent = img.dataset.title;
      modalDesc.textContent = img.dataset.desc;
      modalLink.href = img.dataset.link;
    });
  });



  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});


  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);
  
  const scrollTopBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});