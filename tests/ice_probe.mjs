// Probes whether this machine's Chrome can establish a local WebRTC data channel at all.
import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: process.env.HEADED ? false : process.env.OLDHL ? true : 'new', args: ['--no-sandbox', ...process.argv.slice(2)] });
const pg = await b.newPage(); await pg.goto('http://127.0.0.1:9/').catch(()=>{}); await pg.evaluate(()=>0);
const r = await pg.evaluate(async () => {
  const out = []; const cfg = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }; const a = new RTCPeerConnection(cfg); const c = new RTCPeerConnection(cfg);
  a.onicecandidate = e => { if (e.candidate) { out.push('A ' + e.candidate.candidate.slice(0, 90)); c.addIceCandidate(e.candidate); } }; c.onicecandidate = e => { if (e.candidate) { out.push('C ' + e.candidate.candidate.slice(0, 90)); a.addIceCandidate(e.candidate); } };
  const dc = a.createDataChannel('x'); let open = false; dc.onopen = () => open = true;
  const o = await a.createOffer(); await a.setLocalDescription(o); await c.setRemoteDescription(o); const an = await c.createAnswer(); await c.setLocalDescription(an); await a.setRemoteDescription(an);
  await new Promise(r => setTimeout(r, 5000)); return { open, ice: a.iceConnectionState, gather: a.iceGatheringState, sig: a.signalingState, sdp: a.localDescription.sdp.split('\n').filter(l=>/candidate|m=|c=/.test(l)).slice(0,6), out };
});
console.log(JSON.stringify(r, null, 1)); await b.close();
