// DARK MODE
const btn = document.getElementById("darkModeBtn");

btn.onclick = () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
};

// Charger thème
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

// NAVBAR SCROLL
window.addEventListener("scroll", () => {
    let nav = document.getElementById("navbar");

    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// COMPTEURS
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    let update = () => {
        let target = +counter.getAttribute("data-target");
        let count = +counter.innerText;

        let increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(update, 30);
        } else {
            counter.innerText = target;
        }
    };

    update();
});

// YEAR FOOTER
document.getElementById("year").innerText = new Date().getFullYear();
const filter = document.getElementById("filter");

if (filter) {
    filter.addEventListener("change", () => {
        let value = filter.value;
        let cards = document.querySelectorAll(".freelancer");

        cards.forEach(card => {
            if (value === "all" || card.dataset.category === value) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let nom = document.getElementById("nom");
        let email = document.getElementById("email");
        let message = document.getElementById("message");

        let valid = true;

        if (nom.value === "") {
            nom.nextElementSibling.innerText = "Nom requis";
            valid = false;
        }

        if (!email.value.includes("@")) {
            email.nextElementSibling.innerText = "Email invalide";
            valid = false;
        }

        if (message.value.length < 20) {
            message.nextElementSibling.innerText = "Message trop court";
            valid = false;
        }

        if (valid) {
            document.getElementById("success").innerText = "Message envoyé ✔";
            form.reset();
        }
    });
}
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
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
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
});
function filter(cat) {
  document.querySelectorAll("[data-cat]").forEach(card => {
    card.style.display =
      (cat === "all" || card.dataset.cat === cat) ? "block" : "none";
  });
}
const form = document.getElementById("contactForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", e => {
  e.preventDefault();

  let email = form.querySelector("input[type='email']").value;

  if (!email.includes("@")) {
    msg.innerText = "Email invalide ❌";
    msg.style.color = "red";
  } else {
    msg.innerText = "Message envoyé ✅";
    msg.style.color = "green";
  }
});