const header = document.querySelector("[data-header]");
const footer = document.querySelector("[data-footer]");
const page = document.body.dataset.page || "home";

const logo = `
  <a class="logo" href="index.html">
    <img src="img/logo.png" width="72" height="72" alt="Zeeuws Centrum de Verbinding">
    <div>
      <strong>De Verbinding</strong>
      <span>Zeeuws Centrum</span>
    </div>
  </a>
`;

if (header) {
  header.innerHTML = `
    <div class="topbar">
      <div class="container">
        <span>Dreesstraat 8, 4384 DC Vlissingen · nabij bos en strand</span>
        <span>
          <a href="tel:+31614439796">06 14 43 97 96</a> ·
          <a href="tel:+31652541664">06 52 54 16 64</a> ·
          <a href="mailto:info@zeeuwscentrumdeverbinding.nl">info@zeeuwscentrumdeverbinding.nl</a>
        </span>
      </div>
    </div>
    <div class="header">
      <div class="container nav">
        ${logo}
        <button class="menu-toggle" aria-label="Menu openen"><span></span></button>
        <ul class="nav-links">
          <li><a href="index.html" data-nav="home">Home</a></li>
          <li><a href="dagbesteding.html" data-nav="dagbesteding">Dagbesteding</a></li>
          <li><a href="begeleiding.html" data-nav="begeleiding">Begeleiding</a></li>
          <li><a href="snuffelmarkt.html" data-nav="snuffelmarkt">Snuffelmarkt</a></li>
          <li><a href="over-ons.html" data-nav="over">Wie zijn wij</a></li>
          <li><a href="contact.html" data-nav="contact">Contact</a></li>
          <li class="nav-cta"><a class="btn btn-gold" href="contact.html">Kennismaken</a></li>
        </ul>
        <a class="btn btn-gold header-cta" href="contact.html">Kennismaken</a>
      </div>
    </div>
  `;
  const active = header.querySelector(`[data-nav="${page}"]`);
  if (active) active.classList.add("active");
}

if (footer) {
  footer.innerHTML = `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          ${logo}
          <p>Kleinschalige dagbesteding en individuele begeleiding in Vlissingen. Iedereen is anders, iedereen mag er zijn.</p>
        </div>
        <div>
          <h3>Aanbod</h3>
          <p><a href="dagbesteding.html">Dagbesteding</a></p>
          <p><a href="begeleiding.html">Individuele begeleiding</a></p>
          <p><a href="snuffelmarkt.html">Snuffelmarkt</a></p>
        </div>
        <div>
          <h3>Direct contact</h3>
          <p>Anniek de Kok<br><a href="tel:+31614439796">06 14 43 97 96</a></p>
          <p>Femke ten Haken<br><a href="tel:+31652541664">06 52 54 16 64</a></p>
          <p><a href="mailto:info@zeeuwscentrumdeverbinding.nl">info@zeeuwscentrumdeverbinding.nl</a></p>
        </div>
        <div>
          <h3>Gegevens</h3>
          <p>Dreesstraat 8<br>4384 DC Vlissingen</p>
          <p>KvK 90478010</p>
          <p><a href="privacy.html">Privacyverklaring</a></p>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© ${new Date().getFullYear()} Zeeuws Centrum de Verbinding</span>
        <span>Gecontracteerd bij alle Zeeuwse gemeenten via CKZ</span>
      </div>
    </footer>
    <div class="sticky-cta">
      <a class="btn btn-ghost" href="tel:+31614439796">Bel ons</a>
      <a class="btn btn-gold" href="contact.html">Plan gesprek</a>
    </div>
    <div class="float-contact">
      <div class="float-panel" id="contactPanel">
        <a href="tel:+31614439796">Bel Anniek</a>
        <a href="tel:+31652541664">Bel Femke</a>
        <a href="https://wa.me/31614439796" target="_blank" rel="noreferrer">WhatsApp</a>
        <a href="mailto:info@zeeuwscentrumdeverbinding.nl">E-mail</a>
        <a href="contact.html">Kennismakingsgesprek</a>
      </div>
      <button class="float-btn" id="contactToggle" aria-label="Contactopties">Contact</button>
    </div>
  `;
}

const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
toggle?.addEventListener("click", () => {
  const open = links?.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
});
links?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    links.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Menu openen");
  });
});

window.addEventListener("scroll", () => {
  document.querySelector(".header")?.classList.toggle("scrolled", window.scrollY > 8);
});

document.querySelectorAll(".page-hero .container").forEach((el) => {
  if (el.querySelector(".hero-logo")) return;
  const img = document.createElement("img");
  img.className = "hero-logo";
  img.src = "img/logo.png";
  img.alt = "Zeeuws Centrum de Verbinding";
  el.prepend(img);
});

document.getElementById("contactToggle")?.addEventListener("click", () => {
  document.getElementById("contactPanel")?.classList.toggle("open");
});

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const naam = `${data.get("voornaam") || ""} ${data.get("achternaam") || ""}`.trim();
    const onderwerp = encodeURIComponent(`Kennismaking via website – ${naam}`);
    const lichaam = encodeURIComponent(
      `Naam: ${naam}\nE-mail: ${data.get("email")}\nTelefoon: ${data.get("telefoon") || "-"}\nInteresse: ${data.get("interesse") || "-"}\n\nBericht:\n${data.get("bericht") || ""}`
    );
    form.querySelector(".form-success")?.classList.add("show");
    window.location.href = `mailto:info@zeeuwscentrumdeverbinding.nl?subject=${onderwerp}&body=${lichaam}`;
    form.reset();
  });
});
