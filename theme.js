/* Theme switcher. Load in <head>: sets data-theme before first paint.
   Order of preference: saved choice, then OS setting, then dark. */
(function () {
  var KEY = "roast-theme", root = document.documentElement;
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function initial() {
    var s = saved();
    if (s === "light" || s === "dark") return s;
    return window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  var btn;
  var SVGNS = "http://www.w3.org/2000/svg", icon = null;
  function buildIcon() {
    if (!window.d3) { btn.textContent = "\u25D0"; return; }   // plain fallback if D3 is missing
    var d3 = window.d3, uid = "tt" + Math.floor(Math.random() * 1e6);
    var svg = d3.select(btn).append("svg").attr("width", 58).attr("height", 58).attr("viewBox", "0 0 56 56").attr("aria-hidden", "true");
    var defs = svg.append("defs");
    var g = defs.append("linearGradient").attr("id", uid + "g").attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", 16).attr("x2", 0).attr("y2", 40);
    g.append("stop").attr("offset", "0%").attr("stop-color", "#F9CB82");
    g.append("stop").attr("offset", "100%").attr("stop-color", "#E57F3D");
    var m = defs.append("mask").attr("id", uid + "m").attr("maskUnits", "userSpaceOnUse").attr("x", -10).attr("y", -10).attr("width", 76).attr("height", 76);
    m.append("rect").attr("x", -10).attr("y", -10).attr("width", 76).attr("height", 76).attr("fill", "#fff");
    var cut = m.append("circle").attr("r", 9);
    svg.append("circle").attr("class", "tt-disc").attr("cx", 28).attr("cy", 28).attr("r", 26);
    var ico = svg.append("g").attr("transform", "rotate(-25 28 28)");
    var rays = ico.append("g").attr("stroke", "url(#" + uid + "g)").attr("stroke-width", 2.2).attr("stroke-linecap", "round");
    d3.range(8).forEach(function (i) {
      var a = i * Math.PI / 4;
      rays.append("line").attr("x1", 28 + 13.5 * Math.cos(a)).attr("y1", 28 + 13.5 * Math.sin(a))
        .attr("x2", 28 + 17.5 * Math.cos(a)).attr("y2", 28 + 17.5 * Math.sin(a));
    });
    var body = ico.append("circle").attr("cx", 28).attr("cy", 28).attr("fill", "url(#" + uid + "g)").attr("mask", "url(#" + uid + "m)");
    icon = { d3: d3, body: body, cut: cut, rays: rays, ico: ico };
  }
  function paintButton(t, instant) {
    if (!btn) return;
    btn.setAttribute("aria-pressed", t === "light" ? "true" : "false");
    btn.setAttribute("aria-label", "Switch to " + (t === "light" ? "dark" : "light") + " theme");
    if (!icon) return;
    var moon = t === "light";                       // light page shows a moon (click for dark)
    var dur = instant || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) ? 0 : 450;
    var tr = function (s) { return s.transition().duration(dur); };
    tr(icon.body).attr("r", moon ? 10 : 8);
    tr(icon.cut).attr("cx", moon ? 34 : 52).attr("cy", moon ? 22 : 4);
    tr(icon.rays).style("opacity", moon ? 0 : 1);
    tr(icon.ico).attr("transform", moon ? "rotate(-25 28 28)" : "rotate(20 28 28)");
  }
  function apply(t, persist, broadcast) {
    root.setAttribute("data-theme", t);
    if (persist) { try { localStorage.setItem(KEY, t); } catch (e) {} }
    paintButton(t, false);
    if (broadcast) {   // keep embedded charts (iframes) in step, even on file://
      var f = document.getElementsByTagName("iframe");
      for (var i = 0; i < f.length; i++) { try { f[i].contentWindow.postMessage({ roastTheme: t }, "*"); } catch (e) {} }
    }
  }
  apply(initial(), false, false);

  var embedded = window.self !== window.top;
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (d && (d.roastTheme === "light" || d.roastTheme === "dark")) apply(d.roastTheme, false, false);
    if (d && d.roastThemeRequest && e.source) e.source.postMessage({ roastTheme: root.getAttribute("data-theme") }, "*");
  });
  window.addEventListener("storage", function (e) {
    if (e.key === KEY && (e.newValue === "light" || e.newValue === "dark")) apply(e.newValue, false, true);
  });

  document.addEventListener("DOMContentLoaded", function () {
    if (embedded) { window.parent.postMessage({ roastThemeRequest: true }, "*"); return; } // parent owns the toggle
    btn = document.createElement("button");
    btn.type = "button"; btn.className = "theme-toggle";
    buildIcon();
    btn.addEventListener("click", function () {
      apply(root.getAttribute("data-theme") === "light" ? "dark" : "light", true, true);
    });
    document.body.appendChild(btn);
    paintButton(root.getAttribute("data-theme"), true);
  });
})();
