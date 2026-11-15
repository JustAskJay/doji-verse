/* Shared score bridge. No timers, submission retries or guest submissions. */
(function (root) {
  "use strict";
  function launchToken() {
    try {
      var q = new URLSearchParams(root.location.search).get("lt");
      if (q) { root.sessionStorage.setItem("verse_lt", q); try { var u = new URL(root.location.href); u.searchParams.delete("lt"); root.history.replaceState(root.history.state, "", u.pathname + u.search + u.hash); } catch (_) {} return q; }
      return root.sessionStorage.getItem("verse_lt") || "";
    } catch (_) { return ""; }
  }
  launchToken();
  var games = ["holm", "wagbi", "http", "lab", "dock", "pier"];
  var titles = ["HOLM COIN RUN", "WAGBi STACKER", "200 OK", "BUG HUNT", "WAVE RIDE", "GHOST WHACK"];
  function initData() {
    try {
      var here = root.Telegram && root.Telegram.WebApp;
      var parent = root.parent && root.parent.Telegram && root.parent.Telegram.WebApp;
      return (here && here.initData) || (parent && parent.initData) || "";
    } catch (_) { return ""; }
  }
  function preview() {
    function flagged(search) {
      var q = new URLSearchParams(search);
      return ["game", "warp", "preview", "shot"].some(function (key) { return q.has(key); });
    }
    try { return flagged(root.location.search) || !!root.PREVIEW || (root.parent !== root && (flagged(root.parent.location.search) || !!root.parent.PREVIEW)); }
    catch (_) { return true; }
  }
  function errorMessage(status) {
    return status === 401 ? "REOPEN FROM THE BOT" : status === 429 ? "TOO FAST / NOT SAVED" :
      status === 422 || status === 400 ? "SCORE REJECTED" : "BOARD OFFLINE";
  }
  async function request(game, payload, data) {
    var headers = data ? { "X-Telegram-Init-Data": data } : {};
    if (!data && launchToken()) headers["X-Verse-Launch-Token"] = launchToken();
    var options = { headers: headers, cache: "no-store", credentials: "same-origin" };
    var url = "/api/verse-leaderboard?game=" + encodeURIComponent(game);
    if (payload) {
      url = "/api/verse-score";
      options.method = "POST";
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(payload);
    }
    var response = await root.fetch(url, options);
    if (!response.ok) {
      var error = new Error(errorMessage(response.status));
      error.status = response.status;
      throw error;
    }
    var board = await response.json();
    try {
      if (board.weekly && board.weekly.player) {
        root.sessionStorage.setItem("verse_wb_" + game, String(board.weekly.player.best));
      }
    } catch (_) {}
    return board;
  }
  function knownWeekBest(game) {
    try {
      var value = root.sessionStorage.getItem("verse_wb_" + game);
      return value === null ? -1 : Number(value);
    } catch (_) { return -1; }
  }
  function get(game) { return request(game, null, initData()); }
  function finish(run) {
    var data = initData();
    var practice = (!data && !launchToken()) || preview() || !!run.preview || !!run.tutorial;
    // Ranked submissions depend on the server weekly best, never the device best.
    var submit = !practice && run.game !== "holm" && run.score > 0 && run.score > knownWeekBest(run.game);
    var state = { best: Math.max(run.previousBest, run.score), line: practice ? "PRACTICE / NOT RANKED" : submit ? "SAVING..." : "LOADING...", board: null };
    state.done = request(run.game, submit ? { initData: data, launchToken: data ? "" : launchToken(), game: run.game, score: run.score, ms: run.ms } : null, data).catch(function (error) {
      if (submit && error.status === 429) return get(run.game);
      throw error;
    }).then(function (board) {
      state.board = board;
      var all = board.all_time && board.all_time.player;
      var week = board.weekly && board.weekly.player;
      if (!practice) {
        state.best = Math.max(state.best, all ? Number(all.best) || 0 : 0);
        state.line = all && all.rank ? "YOU #" + all.rank : "YOU #--";
        if (week && week.rank && (state.line + " / WK #" + week.rank).length <= 24) state.line += " / WK #" + week.rank;
      }
      return state;
    }).catch(function (error) {
      state.line = /REOPEN|TOO FAST|REJECTED/.test(error.message) ? error.message : "BOARD OFFLINE";
      return state;
    });
    return state;
  }
  root.VerseBoard = { games: games, titles: titles, initData: initData, launchToken: launchToken, preview: preview, get: get, finish: finish };
})(typeof window !== "undefined" ? window : globalThis);
