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
        <a class="btn" href="${tool.link}">${tool.btn}</a>
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