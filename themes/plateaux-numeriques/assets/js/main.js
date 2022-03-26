// Nav button

var btn = document.querySelector('#nav-btn');

function toggleBtnAriaExpanded() {
  btn.setAttribute(
    'aria-expanded', 
    window.innerWidth < 1024 ? 'false' : 'true'  
  )
}
toggleBtnAriaExpanded();

btn.addEventListener('click', function() {
  this.setAttribute(
    'aria-expanded',
    this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
  )
});

window.onresize = toggleBtnAriaExpanded;

/**
	* lunr search
	* adapted from https://palant.info/2020/06/04/the-easier-way-to-use-lunr-search-with-hugo/#generating-the-search-index
	*
	* @author Wladimir Palant
	*/

var index = null;
var lookup = null;
var queuedTerm = null;

var form = document.getElementById("search");
var input = document.getElementById("search-input");

function submitSearch(event) {
	// console.log('submit');
  event.preventDefault();

  var term = input.value.trim();
  if (!term)
    return;

  startSearch(term);
};

function startSearch(term) {
	// console.log('startSearch('+term+')');
  // Start icon animation.
  form.setAttribute("data-running", "true");

  if (index) {
    // Index already present, search directly.
    search(term);
  }
  else if (queuedTerm) {
    // Index is being loaded, replace the term we want to search for.
    queuedTerm = term;
  }
  else {
    // Start loading index, perform the search when done.
    queuedTerm = term;
    initIndex();
  }
}

function searchDone() {
  // Stop icon animation.
  form.removeAttribute("data-running");

  queuedTerm = null;
}

function initIndex() {
  var request = new XMLHttpRequest();
  request.open("GET", "/search.json");
  request.responseType = "json";
  request.addEventListener("load", function(event)
  {
    lookup = {};
    index = lunr(function() {
      // Uncomment the following line and replace de by the right language
      // code to use a lunr language pack.

      this.use(lunr.fr);

      this.ref("uri");

      // If you added more searchable fields to the search index, list them here.
      this.field("title");
      this.field("subtitle");
      this.field("description");
      this.field("content");
      // this.field("categories");

      for (var doc of request.response) {
        this.add(doc);
        lookup[doc.uri] = doc;
      }
    });

    // Search index is ready, perform the search now
    search(queuedTerm);
  }, false);
  request.addEventListener("error", searchDone, false);
  request.send(null);
}

function search(term) {
  var results = index.search(term);

  // The element where search results should be displayed, adjust as needed.
  var target = document.querySelector("#search-results");
  document.querySelector("#search-results-wrapper").removeAttribute("hidden");

  // Add search term as data attribute
  target.dataset.term = term;

  
  // Hide page elements
  var breadcrumb = document.querySelector("#breadcrumb-wrapper"),
      banner = document.querySelector("[role='banner']"),
      toc = document.querySelector(".toc > *"),
      widgets = document.querySelector("#widgets");

  var elementsToHide = [breadcrumb, banner, toc, widgets];
  for (var el of elementsToHide) {
    if (el)
      el.style.display = "none";
  }

  var sections = document.querySelectorAll("#main > section");
  if (sections) {
    for (var section of sections) {
      section.style.display = "none";
    }
  }

  
  // Add search term as hash
  window.location.hash = "search="+term;

  while (target.firstChild)
    target.removeChild(target.firstChild);
  
  // Create elements
  var header = document.createElement("header");
  header.className = "order-first pb-4 border-b";
  target.appendChild(header);

  var icon = document.createElement("span");
  icon.className = "inline-block text-6xl relative mt-12 mb-6";
  icon.textContent = `🔍`;
  header.appendChild(icon);

  var title = document.createElement("h1");
  title.className = "text-gray-900 mb-2";
	title.textContent = `Recherche`;
  header.appendChild(title);
  
  var subtitle = document.createElement("h2");
  subtitle.className = "text-lg text-gray-600 pb-6";
  if (results.length == 0)
    subtitle.textContent = `Aucun résultat trouvé pour « ${term} »`;
  else if (results.length == 1)
    subtitle.textContent = `1 résultat trouvé pour « ${term} »`;
  else
    subtitle.textContent = `${results.length} résultats trouvés pour « ${term} »`;
  header.appendChild(subtitle);

  document.title = subtitle.textContent+" | "+title.textContent;

  var template = document.getElementById("search-result");
  for (var result of results) {
    var doc = lookup[result.ref];

    // Fill out search result template, adjust as needed.
    var element = template.content.cloneNode(true);

    element.querySelector(".post-title-link").href =
        element.querySelector(".read-more-link").href = doc.uri;
    element.querySelector(".post-title-link").textContent = 
      element.querySelector("article").dataset.title = doc.title;
    if (doc.icon) {
      element.querySelector(".post-icon").textContent = doc.icon;
      element.querySelector(".post-icon").classList.remove("hidden");
    }
    element.querySelector(".post-parent a").textContent = doc.parent;
    element.querySelector(".post-parent a").href = doc.parentLink;
    if (doc.grandParent) {
      element.querySelector(".post-grandParent a").textContent = doc.grandParent;
      element.querySelector(".post-grandParent a").href = doc.grandParentLink;
      element.querySelector(".post-grandParent").classList.remove("hidden");
    }
    
    element.querySelector(".summary").textContent = truncate(doc.content, 30);
    
    console.log(doc.title.toLowerCase());
    console.log(term.toLowerCase());
    if (doc.title.toLowerCase().includes(term.toLowerCase())) {
      console.log("order -1");
      element.querySelector("article").style.order = "-1";
    }

    target.appendChild(element);
  }
  // target.scrollIntoView(true);

  searchDone();
}

// This matches Hugo's own summary logic:
// https://github.com/gohugoio/hugo/blob/b5f39d23b8/helpers/content.go#L543
function truncate(text, minWords)
{
  var match;
  var result = "";
  var wordCount = 0;
  var regexp = /(\S+)(\s*)/g;
  while (match = regexp.exec(text))
  {
    wordCount++;
    if (wordCount <= minWords)
      result += match[0];
    else
    {
      var char1 = match[1][match[1].length - 1];
      var char2 = match[2][0];
      if (/[.?!"]/.test(char1) || char2 == "\n")
      {
        result += match[1];
        break;
      }
      else
        result += match[0];
    }
  }
  return result;
}

// Contact form
function updateSubject(email) {
  document.getElementById("subject").value = "Nouveau message de " + email;
}
