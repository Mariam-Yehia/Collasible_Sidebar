// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();

  // DOM Elements
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");
  const mainContent = document.querySelector(".main-content");
  const overlay = document.getElementById("overlay");

  // Check screen size and set initial state
  function updateSidebarState() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Mobile state - sidebar should be completely hidden
      sidebar.classList.add("collapsed");
      sidebar.classList.remove("expanded");
      mainContent.style.marginLeft = '0';
    } else {
      // Desktop state - sidebar should be visible
      sidebar.classList.remove("collapsed");
      sidebar.classList.remove("expanded");
      mainContent.style.marginLeft = '220px';
    }
  }

  // Toggle sidebar
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      if (sidebar.classList.contains("expanded")) {
        // Close sidebar
        sidebar.classList.remove("expanded");
        sidebar.classList.add("collapsed");
        overlay.classList.remove("active");
      } else {
        // Open sidebar
        sidebar.classList.remove("collapsed");
        sidebar.classList.add("expanded");
        overlay.classList.add("active");
      }
    } else {
      // Desktop toggle
      if (sidebar.classList.contains("collapsed")) {
        // Expand sidebar
        sidebar.classList.remove("collapsed");
        mainContent.style.marginLeft = '220px';
      } else {
        // Collapse sidebar
        sidebar.classList.add("collapsed");
        mainContent.style.marginLeft = '0';
      }
    }
  });

  // Close sidebar when clicking outside on mobile
  overlay.addEventListener("click", () => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && sidebar.classList.contains("expanded")) {
      sidebar.classList.remove("expanded");
      sidebar.classList.add("collapsed");
      overlay.classList.remove("active");
    }
  });

  // Prevent sidebar from closing when clicking on links
  sidebar.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    // Remove overlay on resize if mobile
    if (window.innerWidth > 768) {
      overlay.classList.remove("active");
    }
    updateSidebarState();
  });

  // Initialize on load
  updateSidebarState();
});