/* One-time "Brian unlocked" report to POST /api/unlock. Inert until index.html loads it.
   Reads doji-unlocks / doji-story only; its own marker is doji-brian-reported. Never touches doji-player. */
(function () {
  "use strict";
  var KEY = "doji-brian-reported";
  try {
    if (!window.VerseBoard || VerseBoard.preview()) return;
    if (/[?&](unlockall|manual|dev|race|newstory)\b/.test(location.search)) return;
    if (localStorage.getItem(KEY) || sessionStorage.getItem(KEY)) return;
    var u = JSON.parse(localStorage.getItem("doji-unlocks") || "{}") || {};
    var story = !!localStorage.getItem("doji-story");
    if (!u.brian && !story) return;
    var data = VerseBoard.initData(), lt = data ? "" : VerseBoard.launchToken();
    if (!data && !lt) return;
    sessionStorage.setItem(KEY, "1"); // at most one try per session
    var h = { "Content-Type": "application/json" };
    if (data) h["X-Telegram-Init-Data"] = data; else h["X-Verse-Launch-Token"] = lt;
    fetch("/api/unlock", { method: "POST", headers: h, credentials: "same-origin", cache: "no-store",
      body: JSON.stringify({ initData: data, launchToken: lt, unlock: "brian", legacy: story }) })
      .then(function (r) { if (r.status === 204 || r.status === 200 || r.status === 422) localStorage.setItem(KEY, String(Date.now())); })
      .catch(function () {});
  } catch (_) {}
})();
