// Highlight the dock icon of the section in view (home page only).
(function () {
  try {
    var links = [].slice.call(document.querySelectorAll('.dock a[data-sec]'));
    var map = {};
    links.forEach(function (a) { map[a.dataset.sec] = a; });
    var secs = ['home', 'projects', 'experience', 'stack', 'research', 'contact']
      .map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!('IntersectionObserver' in window) || !secs.length || !document.getElementById('home')) return;
    var alias = { research: 'stack' };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('on'); a.removeAttribute('aria-current'); });
        var t = map[e.target.id] || map[alias[e.target.id]];
        if (t) { t.classList.add('on'); t.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    secs.forEach(function (s) { io.observe(s); });
  } catch (err) { /* decorative only */ }
})();

// Contact form: no backend, so it opens a pre-filled email.
(function () {
  var form = document.getElementById('cform');
  if (!form) return;
  var note = document.getElementById('fnote');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var f = form.elements;
    var name = f.name.value.trim(), email = f.email.value.trim(), msg = f.message.value.trim();
    var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !okEmail || !msg) {
      note.textContent = 'Please add your name, a valid email and a message.';
      note.className = 'fnote err';
      return;
    }
    note.className = 'fnote';
    var subject = 'Portfolio: ' + f.topic.value;
    var body = msg + '\n\n— ' + name + ' (' + email + ')';
    window.location.href = 'mailto:suhanikhanna31@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    note.textContent = 'Opening your email app. If nothing opens, write to suhanikhanna31@gmail.com.';
  });
})();
