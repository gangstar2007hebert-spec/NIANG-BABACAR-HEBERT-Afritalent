const toggle = document.getElementById("darkToggle");

// charger thème
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggle.onclick = () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
};
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    nav.style.background = "#000";
  } else {
    nav.style.background = "";
  }
});
// Observer pour animations fade-in
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".fade").forEach(el => {
  observer.observe(el);
});
// Compteurs animés
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let counter = entry.target;
      let target = +counter.dataset.target;
      let count = 0;

      let update = () => {
        count += target / 100;

        if (count < target) {
          counter.innerText = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
      counterObserver.unobserve(counter);
    }
  });
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});
// FILTRAGE DES FREELANCES

const filterButtons = document.querySelectorAll(".filter-btn");
const freelanceCards = document.querySelectorAll(".freelance-card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const category = button.dataset.category;

    freelanceCards.forEach(card => {

      if (
        category === "all" ||
        card.dataset.category === category
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  });

});


// VALIDATION FORMULAIRE

const form = document.getElementById("contactForm");

if (form) {

  form.addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    let valid = true;

    // NOM
    if (name.value.trim() === "") {
      nameError.textContent = "Le nom est obligatoire";
      valid = false;
    }

    // EMAIL
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!emailRegex.test(email.value)) {
      emailError.textContent = "Email invalide";
      valid = false;
    }

    // MESSAGE
    if (message.value.trim().length < 20) {
      messageError.textContent =
      "Le message doit contenir au moins 20 caractères";

      valid = false;
    }

    // SUCCÈS
    if (valid) {

      document.getElementById("successMessage").textContent =
      "Message envoyé avec succès !";

      form.reset();

    }

  });

}