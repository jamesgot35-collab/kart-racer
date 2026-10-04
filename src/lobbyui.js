export function mountLobby(app, T) {
  const d = app.screenEl(); d.innerHTML = '<div class="topbar"><h2>Versus · room code</h2></div><div class="panel" style="padding:14px">Online lobby loading…</div><div class="row"><button class="btn ghost" id="back">Back</button></div>';
  d.querySelector('#back').onclick = () => app.show('menu');
}
