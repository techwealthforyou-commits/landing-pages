document.addEventListener("DOMContentLoaded", () => {
  const toolsGrid = document.getElementById("toolsGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (!toolsGrid || typeof toolsData === "undefined") return;

  let visibleCount = 4;
  const step = 4;

  function getFilteredTools() {
    const keyword = searchInput ? searchInput.value.toLowerCase() : "";
    const category = categoryFilter ? categoryFilter.value : "all";

    return toolsData.filter(tool => {
      const matchKeyword =
        tool.title.toLowerCase().includes(keyword) ||
        tool.desc.toLowerCase().includes(keyword);

      const matchCategory =
        category === "all" || tool.category === category;

      return matchKeyword && matchCategory;
    });
  }

  function renderTools(reset = false) {
    const filtered = getFilteredTools();

    if (reset) visibleCount = step;

    toolsGrid.innerHTML = "";

    filtered.slice(0, visibleCount).forEach(tool => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h2>${tool.title}</h2>
        <p>${tool.desc}</p>
       <a 
 	 class="btn tool-link"
 	 href="/pages/index.html?page=${encodeURIComponent(tool.slug)}"
	  data-project="${tool.slug}"
	>
	  ${tool.btn}
	</a>
      `;

      toolsGrid.appendChild(card);
    });

    if (loadMoreBtn) {
      loadMoreBtn.style.display =
        visibleCount >= filtered.length ? "none" : "inline-block";
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => renderTools(true));
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => renderTools(true));
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += step;
      renderTools();
    });
  }

  renderTools(true);
});
 

  // =========================
  // 🔥 SCROLL LOAD
  // =========================

  let isLoading = false;

  window.addEventListener("scroll", () => {

    if (isLoading) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.offsetHeight;

    if (scrollTop + windowHeight >= fullHeight - 150) {
	const total = getFilteredTools().length;
      if (visibleCount >= total) return;

      isLoading = true;

      visibleCount += step;
      renderTools();

      setTimeout(() => {
        isLoading = false;
      }, 200);
    }

  });


// =========================
// 🚀 INIT (SAFE - KHÔNG PHÁ TOOL)
// =========================

function init() {
  console.log("✅ INIT RUN");

  // 🔥 không gọi applyFilter nếu bạn đang render thẳng
  if (typeof renderTools === "function") {
    renderTools(true);
  }
}

// 🔥 dùng đúng toolsData (không dùng window)
if (typeof toolsData !== "undefined" && Array.isArray(toolsData)) {
  init();
} else {
  console.error("❌ toolsData chưa sẵn sàng");
}

// =========================
// ⚡ PRELOAD
// =========================

let preloadTimeout;
document.addEventListener("mouseover", function(e){

  const link = e.target.closest(".tool-link");
  if (!link) return;

  clearTimeout(preloadTimeout);

  preloadTimeout = setTimeout(() => {

    const url = link.href;
    if (!url.includes("pages")) return;

    if (document.querySelector(`link[rel="prefetch"][href="${url}"]`)) return;

    const preload = document.createElement("link");
    preload.rel = "prefetch";
    preload.href = url;

    document.head.appendChild(preload);

  }, 200);

});


// =========================
// 🔴 TRACKING
// =========================

document.addEventListener("click", function(e){

  const btn = e.target.closest(".tool-link");
  if (!btn) return;

  e.preventDefault();

  const url = btn.href;
  const project = (btn.dataset.project || "unknown").trim();

  trackEvent('select_tool', {
    project: project,
    location: 'categories'
  });

  // ⏱ delay nhẹ
  setTimeout(() => {
    window.location.href = url;
  }, 100);

});
