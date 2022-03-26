/**
	* Sticky Table of Contents with Scrolling Active States,
	* adapted from https://css-tricks.com/sticky-table-of-contents-with-scrolling-active-states/
	*
	* @author Chris Coyier 
	*/

window.addEventListener('DOMContentLoaded', () => {
  var observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      var id = entry.target.getAttribute('id'),
          encodedURI = encodeURI(id).toLowerCase();
      if (entry.intersectionRatio > 0) {
        document.querySelector(`#TableOfContents li a[href="#${encodedURI}"]`).parentElement.classList.add('active');
      } else {
        document.querySelector(`#TableOfContents li a[href="#${encodedURI}"]`).parentElement.classList.remove('active');
      }
    });
  });
  // Track all elements that have an `id` applied
  document.querySelectorAll('main [id]').forEach((heading) => {
    observer.observe(heading);
  });
});

// Add role="navigation" to #TableOfContents
var toc = document.querySelector('#TableOfContents');
if (toc) { 
  toc.setAttribute("role", "navigation");
}
