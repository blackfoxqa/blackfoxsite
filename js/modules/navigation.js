/**
 * Navigation Module - Handles page switching
 */
export function initializeNavigation() {
  const navLinks = document.querySelectorAll('[data-page]');
  const pages = document.querySelectorAll('[data-section]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute('data-page');
      
      // Hide all pages
      pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
      });

      // Show target page
      const targetElement = document.querySelector(`[data-section="${targetPage}"]`);
      if (targetElement) {
        targetElement.classList.add('active');
        targetElement.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Store current page in localStorage
      localStorage.setItem('currentPage', targetPage);
    });
  });

  // Load last visited page
  const savedPage = localStorage.getItem('currentPage') || 'home';
  const savedLink = document.querySelector(`[data-page="${savedPage}"]`);
  if (savedLink) {
    savedLink.click();
  }
}
