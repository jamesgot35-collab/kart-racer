// iOS Safari zoom / selection / long-press guards. iOS ignores user-scalable=no (since iOS 10), so pinch, double-tap and
// gesture zoom must be blocked in script + touch-action CSS. Controls use pointer events, which keep working after preventDefault on touch events.
const isField = (t) => !!(t && t.closest && t.closest('input,textarea,select,[contenteditable="true"]'));
export function installIOSGuard(controlRoot) {
  const opt = { passive: false };
  // 1) Safari-only pinch gesture events (gesturestart/change/end)
  for (const ev of ['gesturestart', 'gesturechange', 'gestureend']) document.addEventListener(ev, e => e.preventDefault(), opt);
  // 2) control layer: stop browser handling of every touch (scroll, zoom, double-tap, callout), pointer events still fire
  if (controlRoot) {
        for (const ev of ['touchstart', 'touchmove']) controlRoot.addEventListener(ev, e => { if (e.cancelable) e.preventDefault(); }, opt);
    // every touchend on the control layer is cancelled (covers the 300 ms double-tap window and any second tap)
    controlRoot.addEventListener('touchend', e => { if (e.cancelable) e.preventDefault(); }, opt);
    controlRoot.addEventListener('touchcancel', e => { if (e.cancelable) e.preventDefault(); }, opt);
  }
  // 3) anywhere: block multi-finger moves / scaled touches (pinch), and a second touchend within 300 ms on the canvas, HUD and controls (double-tap zoom)
  document.addEventListener('touchmove', e => { if (e.cancelable && ((e.touches && e.touches.length > 1) || (e.scale && e.scale !== 1))) e.preventDefault(); }, opt);
  let last = 0;
  document.addEventListener('touchend', e => {
    const now = Date.now(); const t = e.target; const inGame = t && t.closest && t.closest('#touch,#gl,#hud,#center');
    if (inGame && !isField(t) && now - last < 300 && e.cancelable) e.preventDefault();
    last = now;
  }, opt);
  // 4) long-press menu / selection / drag / magnifier (inputs excepted so the room code stays editable)
  document.addEventListener('contextmenu', e => { if (!isField(e.target)) e.preventDefault(); });
  document.addEventListener('selectstart', e => { if (!isField(e.target)) e.preventDefault(); });
  document.addEventListener('dragstart', e => e.preventDefault());
}
