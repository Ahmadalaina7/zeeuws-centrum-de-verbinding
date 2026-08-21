const header = document.querySelector("[data-header]");
const footer = document.querySelector("[data-footer]");
const page = document.body.dataset.page || "home";

const logo = `
  <a class="logo" href="index.html">
    <img src="img/logo.png" width="52" height="52" alt="">
    <span>
      <strong>De Verbinding</strong>
      <small>Zeeuws Centrum</small>
    </span>
  </a>
`;

if (header) {
  header.innerHTML = `
    <header class="site-header">
      <div class="container header-bar">
        ${logo}
        <button class="menu-toggle" type="button" aria-label="Menu openen" aria-controls="site-nav" aria-expanded="false"><span></span></button>
        <div class="nav-wrap" id="site-nav">
          <ul class="nav-links">
            <li><a href="index.html" data-nav="home">Home</a></li>
            <li><a href="dagbesteding.html" data-nav="dagbesteding">Dagbesteding</a></li>
            <li><a href="begeleiding.html" data-nav="begeleiding">Begeleiding</a></li>
            <li><a href="snuffelmarkt.html" data-nav="snuffelmarkt">Snuffelmarkt</a></li>
            <li><a href="over-ons.html" data-nav="over">Wie zijn wij</a></li>
            <li><a href="contact.html" data-nav="contact">Contact</a></li>
          </ul>
          <a class="btn btn-gold header-cta" href="contact.html">Kennismaken</a>
        </div>
      </div>
    </header>
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
          <h3>Contact</h3>
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
      <a class="btn sticky-wa" href="https://wa.me/31614439796" target="_blank" rel="noreferrer">WhatsApp</a>
      <a class="btn btn-gold" href="tel:+31614439796">Bel Anniek</a>
    </div>
  `;
}

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-wrap");
const setMenu = (open) => {
  nav?.classList.toggle("open", open);
  toggle?.setAttribute("aria-expanded", open ? "true" : "false");
  toggle?.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
  document.body.classList.toggle("menu-open", open);
};

toggle?.addEventListener("click", () => setMenu(!nav?.classList.contains("open")));
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});
window.matchMedia("(min-width: 981px)").addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
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
