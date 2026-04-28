document.addEventListener("DOMContentLoaded", () => {

  // ===== GET PAGE PARAM =====
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");

  if (!page) return;
if (typeof trackEvent === "function") {
  trackEvent('view_landing', {
    project: page || 'unknown'
  });
}
  // ===== LOAD DATA FILE =====
 const script = document.createElement("script");
script.src = `../data/${page}.js?v=${Date.now()}`;

script.onload = () => {

   if (!window.DATA) {
    console.error("❌ DATA chưa sẵn sàng");
    return;
   }

      renderHero(window.DATA.hero);
      renderContent("content1", window.DATA.content1);
      renderContent("content2", window.DATA.content2);
      renderFeatures(window.DATA.features);
      renderMidCTA(window.DATA.midCTA);
      renderCTA(window.DATA.cta);


};

document.body.appendChild(script);

});
  // =========================
  // 🔵 RENDER FUNCTIONS
  // =========================

 function renderHero(hero){
  const el = document.getElementById("hero");
  if (!el || !hero) return;

  el.innerHTML = `
    <div class="hero-inner">

      <div class="hero-text">
        <h1>${hero.title}</h1>
        <p>${hero.desc}</p>

        <a href="${hero.link}" 
          class="btn cta-button"
          data-project="${hero.project || 'unknown'}"
          data-cta="hero"
          data-page="${hero.project}"
          data-value="${hero.value || 3}"
          target="_blank"
          rel="nofollow sponsored"
        >
          ${hero.text}
        </a>
      </div>

      <div class="hero-image">
        <img src="${hero.image}" alt="Unity Assets">
      </div>

    </div>
  `;
}


 function renderContent(id, data){
  const el = document.getElementById(id);
  if (!el || !data) return;

  el.innerHTML = `
    <h2>${data.title}</h2>

    <ul>
      ${data.items.map(i => `<li>${i}</li>`).join("")}
    </ul>

    ${data.image ? `
      <div class="content-image">
        <img src="${data.image}" alt="Unity demo">
      </div>
    ` : ""}
  `;
}


  function renderFeatures(features){
    const el = document.getElementById("features");
    if (!el || !features) return;

    el.innerHTML = `
      <h2>${features.title}</h2>
      <p class="section-sub">${features.desc}</p>

      <div class="features-grid">
        ${features.items.map(i => `<div class="box">${i}</div>`).join("")}
      </div>
    `;
  }


  function renderMidCTA(mid){
    const el = document.getElementById("midCta");
    if (!el || !mid) return;

    el.innerHTML = `
      <h2>${mid.title}</h2>
      <p>${mid.desc}</p>

      <a href="${mid.link}" 
        class="btn cta-button"
        data-project="${mid.project || 'unknown'}"
        data-cta="middle"
        data-page="${mid.project || 'unknown'}"
        data-value="${mid.value || 2}"
        target="_blank"
        rel="nofollow sponsored"
      >
        ${mid.text}
      </a>
    `;
  }


  function renderCTA(cta){
    const el = document.getElementById("cta");
    if (!el || !cta) return;

    el.innerHTML = `
      <h2>${cta.title}</h2>
      <p>${cta.desc}</p>

      <a href="${cta.link}" 
        class="btn cta-button"
        data-project="${cta.project || 'unknown'}"
        data-cta="bottom"
        data-page="${cta.project || 'unknown'}"
        data-value="${cta.value || 1}"
        target="_blank"
        rel="nofollow sponsored"
      >
        ${cta.text}
      </a>
    `;
  }


   // 🔴 GLOBAL CTA TRACKING
  // =========================

  document.addEventListener("click", function(e){

    const btn = e.target.closest(".cta-button");
    if (!btn|| !btn.href) return;
  e.preventDefault();
  const url = btn.href;
  
trackEvent('click_cta', {
  project: btn.dataset.project || 'unknown',
  position: btn.dataset.cta || 'unknown',
  pageType: btn.dataset.page || 'unknown',
  value: parseFloat(btn.dataset.value) || 1,
  pagePath: location.pathname
 });

setTimeout(() => {
  window.location.href = url;
}, 100);

});

