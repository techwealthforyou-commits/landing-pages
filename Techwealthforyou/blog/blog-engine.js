document.addEventListener("DOMContentLoaded", () => {

  const blogGrid = document.getElementById("blogGrid");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (!blogGrid || !window.BLOG_DATA) return;

  let visibleCount = 4; // số bài hiển thị ban đầu
  const step = 4;       // mỗi lần load thêm

  function renderPosts(reset = false) {

    if (reset) visibleCount = step;

    blogGrid.innerHTML = "";

    const posts = window.BLOG_DATA;

    posts.slice(0, visibleCount).forEach(post => {

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.desc}</p>

        <a href="/blog/post.html?slug=${post.slug}" class="btn">
          Read Article
        </a>
      `;

      blogGrid.appendChild(card);
    });

    // Ẩn nút nếu hết bài
    if (loadMoreBtn) {
      loadMoreBtn.style.display =
        visibleCount >= posts.length ? "none" : "inline-block";
    }
  }

  // Click load more
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += step;
      renderPosts();
    });
  }

  renderPosts(true);

});