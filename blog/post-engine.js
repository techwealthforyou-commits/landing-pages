document.addEventListener("DOMContentLoaded", () => {

  const app = document.getElementById("app");
  if (!app || !window.BLOG_DATA) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const post = window.BLOG_DATA.find(p => p.slug === slug);

  if (!post) {
    app.innerHTML = "<p>Post not found</p>";
    return;
  }

  // =========================
  // 🔥 CTA GENERATOR (DÙNG toolLink TỪ blog-data)
  // =========================
  function createCTA(post, text = "Explore Tool", position = "blog-inline") {

    const link = post.toolLink || "#";

    return `
      <a 
        href="${link}"
        target="_blank"
        class="btn blog-cta"
        data-project="${post.slug}"
        data-cta="${position}"
        data-page="blog"
      >
        ${text}
      </a>
    `;
  }

  // =========================
  // 🔥 INJECT CTA
  // =========================
  function injectCTA(content, post) {
    return content.replaceAll("{{CTA}}", createCTA(post));
  }

  // =========================
  // 🔥 RENDER POST
  // =========================
  app.innerHTML = `
    <section class="section">
      <div class="container">

        <h1>${post.title}</h1>

        ${injectCTA(post.content, post)}

        <div class="cta-card">
          ${createCTA(post, "👉 Start Using This Tool", "blog-bottom")}
        </div>

      </div>
    </section>
  `;
});

document.addEventListener("click", function(e){

 const btn = e.target.closest(".blog-cta");
  if (!btn) return;

  e.preventDefault(); // ✅ chặn để track

  const url = btn.href;

  const project  = btn.dataset.project || 'unknown';
  const position = btn.dataset.cta || 'unknown';
  const pageType = btn.dataset.page || 'blog';
  const slug     = new URLSearchParams(window.location.search).get("slug");

  let redirected = false;

  const go = () => {
    if (!redirected) {
      redirected = true;

      // 🔥 nếu link ngoài → mở tab mới
      if (url.startsWith("http")) {
        window.open(url, "_blank", "noopener");
      } else {
        // 🔥 nếu link nội bộ
        window.location.href = url;
      }
    }
  };

  if (typeof gtag === "function") {

    try {
      gtag('event', 'cta_click', {
        project,
        position,
        pageType,
        slug,

        event_callback: go
      });

    } catch (err) {
      // 🔥 nếu gtag lỗi → vẫn đi tiếp
      go();
    }

    // 🔥 fallback chắc chắn (QUAN TRỌNG NHẤT)
    setTimeout(go, 400);

  } else {
    go();
  }

});