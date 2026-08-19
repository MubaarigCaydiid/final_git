const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const translations = {
  en: {
    "nav.home":"Home","nav.about":"About","nav.projects":"Projects","nav.contact":"Contact",
    "hero.available":"Building & learning","hero.hi":"Hi, I'm","hero.rolePrefix":"I’m a",
    "hero.text":"I build modern web experiences and explore machine learning, data and open-source software through practical projects.",
    "hero.ctaProjects":"View projects","stack.label":"Working with",
    "about.kicker":"About","about.title":"Building with purpose, learning by doing.",
    "about.p1":"I'm a self-taught developer focused on web development and the practical side of AI and machine learning. I enjoy turning ideas into usable interfaces, working with data, and learning through real projects.",
    "about.p2":"Open source and GitHub are also part of my learning path — from repositories and pull requests to issues, reviews and GitHub Actions.",
    "about.learning":"Currently exploring","projects.kicker":"Selected work","projects.title":"Projects I’ve built.",
    "projects.all":"View all repositories",
    "projects.premier":"A machine-learning project focused on predicting Premier League match outcomes using practical classification models.",
    "projects.aslam":"A modern SaaS landing page built with responsive layouts, reusable UI sections and a polished frontend experience.",
    "projects.house":"A regression project exploring how data and machine-learning models can be used to estimate house prices.",
    "contact.kicker":"Contact","contact.title":"Have a project or idea?",
    "contact.text":"I'm always interested in useful projects, collaboration and learning through building.",
    "contact.email":"Send an email ↗","footer":"Built with HTML, CSS & JavaScript."
  },
  so: {
    "nav.home":"Bogga Hore","nav.about":"Aniga","nav.projects":"Mashaariic","nav.contact":"Xiriir",
    "hero.available":"Dhisid & barasho","hero.hi":"Salaan, waxaan ahay","hero.rolePrefix":"Waxaan ahay",
    "hero.text":"Waxaan dhisaa web applications casri ah, waxaana daraaseeyaa machine learning, data iyo open source anigoo ku baranaya mashaariic dhab ah.",
    "hero.ctaProjects":"Eeg mashaariicda","stack.label":"Waxaan la shaqeeyaa",
    "about.kicker":"Aniga","about.title":"Waxaan ku dhisaa ujeeddo, waxaan ku bartaa shaqo dhab ah.",
    "about.p1":"Waxaan ahay developer iskiis wax u barta, diiraddayduna waa web development iyo dhinaca practical-ka ah ee AI iyo machine learning. Waxaan jeclahay inaan fikrado u beddelo interfaces la isticmaali karo, data la shaqeeyo, kuna barto mashaariic dhab ah.",
    "about.p2":"Open source iyo GitHub sidoo kale waxay qayb ka yihiin waddadayda waxbarasho — laga bilaabo repositories iyo pull requests ilaa issues, reviews iyo GitHub Actions.",
    "about.learning":"Waxaan hadda daraaseynayaa","projects.kicker":"Shaqooyin la doortay","projects.title":"Mashaariic aan dhisay.",
    "projects.all":"Eeg dhammaan repositories",
    "projects.premier":"Mashruuc machine learning ah oo diiradda saaraya saadaalinta natiijooyinka kulamada Premier League iyadoo la adeegsanayo classification models.",
    "projects.aslam":"SaaS landing page casri ah oo leh responsive layouts, UI sections dib loo isticmaali karo iyo frontend nadiif ah.",
    "projects.house":"Mashruuc regression ah oo baaraya sida data iyo machine-learning models loogu qiyaasi karo qiimaha guryaha.",
    "contact.kicker":"Xiriir","contact.title":"Ma haysaa project ama fikrad?",
    "contact.text":"Waxaan xiiseynayaa mashaariic faa'iido leh, iskaashi iyo waxbarasho ku timaadda dhisid.",
    "contact.email":"Email ii dir ↗","footer":"Waxaa lagu dhisay HTML, CSS & JavaScript."
  }
};

const roles = {
  en: ["Full-Stack Developer", "AI/ML Learner", "Open Source Contributor", "Python Developer"],
  so: ["Full-Stack Developer", "AI/ML Barte", "Open Source Contributor", "Python Developer"]
};

let lang = localStorage.getItem("portfolio-lang") || "en";
let roleIndex = 0;

function applyLanguage(nextLang) {
  lang = nextLang;
  localStorage.setItem("portfolio-lang", lang);
  document.documentElement.lang = lang === "so" ? "so" : "en";

  $$("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      const span = el.querySelector("span:last-child");
      if (el.classList.contains("nav-link") && span) {
        span.textContent = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  $("#langToggle").textContent = lang === "en" ? "SO" : "EN";
  roleIndex = 0;
  $("#rotatingRole").textContent = roles[lang][roleIndex];
}

$("#langToggle").addEventListener("click", () => applyLanguage(lang === "en" ? "so" : "en"));
applyLanguage(lang);

setInterval(() => {
  const el = $("#rotatingRole");
  el.animate(
    [{opacity:1, transform:"translateY(0)"},{opacity:0, transform:"translateY(7px)"}],
    {duration:180, fill:"forwards"}
  );

  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles[lang].length;
    el.textContent = roles[lang][roleIndex];
    el.animate(
      [{opacity:0, transform:"translateY(-7px)"},{opacity:1, transform:"translateY(0)"}],
      {duration:220, fill:"forwards"}
    );
  }, 190);
}, 2600);

const nav = $("#nav");

$("#menuToggle").addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(open));
});

$$(".nav-link").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  $("#menuToggle").setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: 0.12});

$$(".reveal").forEach(el => observer.observe(el));

const sections = $$("main section[id]");
const navLinks = $$(".nav-link");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
    );
  });
}, {rootMargin:"-35% 0px -55% 0px"});

sections.forEach(section => sectionObserver.observe(section));

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light");

function syncThemeIcon() {
  $("#themeIcon").textContent =
    document.body.classList.contains("light") ? "☾" : "☼";
}

syncThemeIcon();

$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "portfolio-theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
  syncThemeIcon();
});

$("#year").textContent = new Date().getFullYear();
