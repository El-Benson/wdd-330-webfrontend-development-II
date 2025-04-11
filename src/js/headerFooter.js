export function loadHeaderFooter() {
    fetch("/partials/header.html")
      .then(response => response.text())
      .then(html => document.querySelector("#header").innerHTML = html);
  
    fetch("/partials/footer.html")
      .then(response => response.text())
      .then(html => document.querySelector("#footer").innerHTML = html);
  }
  