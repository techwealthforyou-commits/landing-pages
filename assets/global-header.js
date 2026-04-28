const currentPath = window.location.pathname;

let backText = "← Explore More AI Tools";
let backHref = "/";

if (currentPath.includes("/ai-writing-tools/")) {
  backText = "← Explore More AI Writing Tools";
  backHref = "/ai-writing-tools/";
} else if (currentPath.includes("/ai-video-tools/")) {
  backText = "← Explore More AI Video Tools";
  backHref = "/ai-video-tools/";
} else if (currentPath.includes("/ai-marketing-tools/")) {
  backText = "← Explore More AI Marketing Tools";
  backHref = "/ai-marketing-tools/";
} else if (currentPath.includes("/ai-image-tools/")) {
  backText = "← Explore More AI Image Tools";
  backHref = "/ai-image-tools/";
} else if (currentPath.includes("/ai-coding-tools/")) {
  backText = "← Explore More AI Coding Tools";
  backHref = "/ai-coding-tools/";
}

document.getElementById("globalHeader").innerHTML = `
<header class="site-header">
  <div class="container">
    <div class="header-inner">
      
      <a href="/" class="brand-link">
        <img class="brand-logo" src="https://i.ibb.co/Z1wvTZHc/techwealthforyou.png" alt="TechWealth For You">
        <span class="brand-text">TECHWEALTH FOR YOU</span>
      </a>

      <a href="${backHref}" class="header-back-link">
        ${backText}
      </a>

    </div>
  </div>
</header>
`;
// ================================
// 🎯 GLOBAL TRACKING 2026
// ================================
function trackCTA(name, category) {
  if (typeof gtag === 'function') {
    gtag('event', 'cta_click', {
      event_category: category,
      event_label: name,
      page: window.location.pathname
    });
  }

  console.log("CTA:", name, category);
}