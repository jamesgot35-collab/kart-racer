var P0=Object.create;var Tl=Object.defineProperty;var I0=Object.getOwnPropertyDescriptor;var L0=Object.getOwnPropertyNames;var D0=Object.getPrototypeOf,k0=Object.prototype.hasOwnProperty;var N0=i=>{throw TypeError(i)};var U0=(i,t)=>()=>{try{return t||i((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}},_r=(i,t)=>{for(var e in t)Tl(i,e,{get:t[e],enumerable:!0})},F0=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of L0(t))!k0.call(i,s)&&s!==e&&Tl(i,s,{get:()=>t[s],enumerable:!(n=I0(t,s))||n.enumerable});return i};var Td=(i,t,e)=>(e=i!=null?P0(D0(i)):{},F0(t||!i||!i.__esModule?Tl(e,"default",{value:i,enumerable:!0}):e,i));var vr=(i,t,e)=>t.has(i)?N0("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(i):t.set(i,e);var zu=U0((ew,Bu)=>{"use strict";var rt={};rt.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)};rt.localCName=rt.generateIdentifier();rt.splitLines=function(i){return i.trim().split(`
`).map(t=>t.trim())};rt.splitSections=function(i){return i.split(`
m=`).map((e,n)=>(n>0?"m="+e:e).trim()+`\r
`)};rt.getDescription=function(i){let t=rt.splitSections(i);return t&&t[0]};rt.getMediaSections=function(i){let t=rt.splitSections(i);return t.shift(),t};rt.matchPrefix=function(i,t){return rt.splitLines(i).filter(e=>e.indexOf(t)===0)};rt.parseCandidate=function(i){let t;i.indexOf("a=candidate:")===0?t=i.substring(12).split(" "):t=i.substring(10).split(" ");let e={foundation:t[0],component:{1:"rtp",2:"rtcp"}[t[1]]||t[1],protocol:t[2].toLowerCase(),priority:parseInt(t[3],10),ip:t[4],address:t[4],port:parseInt(t[5],10),type:t[7]};for(let n=8;n<t.length;n+=2)switch(t[n]){case"raddr":e.relatedAddress=t[n+1];break;case"rport":e.relatedPort=parseInt(t[n+1],10);break;case"tcptype":e.tcpType=t[n+1];break;case"ufrag":e.ufrag=t[n+1],e.usernameFragment=t[n+1];break;default:e[t[n]]===void 0&&(e[t[n]]=t[n+1]);break}return e};rt.writeCandidate=function(i){let t=[];t.push(i.foundation);let e=i.component;e==="rtp"?t.push(1):e==="rtcp"?t.push(2):t.push(e),t.push(i.protocol.toUpperCase()),t.push(i.priority),t.push(i.address||i.ip),t.push(i.port);let n=i.type;return t.push("typ"),t.push(n),n!=="host"&&i.relatedAddress&&i.relatedPort!==void 0&&(t.push("raddr"),t.push(i.relatedAddress),t.push("rport"),t.push(i.relatedPort)),i.tcpType&&i.protocol.toLowerCase()==="tcp"&&(t.push("tcptype"),t.push(i.tcpType)),(i.usernameFragment||i.ufrag)&&(t.push("ufrag"),t.push(i.usernameFragment||i.ufrag)),"candidate:"+t.join(" ")};rt.parseIceOptions=function(i){return i.substring(14).split(" ")};rt.parseRtpMap=function(i){let t=i.substring(9).split(" "),e={payloadType:parseInt(t.shift(),10)};return t=t[0].split("/"),e.name=t[0],e.clockRate=parseInt(t[1],10),e.channels=t.length===3?parseInt(t[2],10):1,e.numChannels=e.channels,e};rt.writeRtpMap=function(i){let t=i.payloadType;i.preferredPayloadType!==void 0&&(t=i.preferredPayloadType);let e=i.channels||i.numChannels||1;return"a=rtpmap:"+t+" "+i.name+"/"+i.clockRate+(e!==1?"/"+e:"")+`\r
`};rt.parseExtmap=function(i){let t=i.substring(9).split(" ");return{id:parseInt(t[0],10),direction:t[0].indexOf("/")>0?t[0].split("/")[1]:"sendrecv",uri:t[1],attributes:t.slice(2).join(" ")}};rt.writeExtmap=function(i){return"a=extmap:"+(i.id||i.preferredId)+(i.direction&&i.direction!=="sendrecv"?"/"+i.direction:"")+" "+i.uri+(i.attributes?" "+i.attributes:"")+`\r
`};rt.parseFmtp=function(i){let t={},e,n=i.substring(i.indexOf(" ")+1).split(";");for(let s=0;s<n.length;s++)e=n[s].trim().split("="),t[e[0].trim()]=e[1];return t};rt.writeFmtp=function(i){let t="",e=i.payloadType;if(i.preferredPayloadType!==void 0&&(e=i.preferredPayloadType),i.parameters&&Object.keys(i.parameters).length){let n=[];Object.keys(i.parameters).forEach(s=>{i.parameters[s]!==void 0?n.push(s+"="+i.parameters[s]):n.push(s)}),t+="a=fmtp:"+e+" "+n.join(";")+`\r
`}return t};rt.parseRtcpFb=function(i){let t=i.substring(i.indexOf(" ")+1).split(" ");return{type:t.shift(),parameter:t.join(" ")}};rt.writeRtcpFb=function(i){let t="",e=i.payloadType;return i.preferredPayloadType!==void 0&&(e=i.preferredPayloadType),i.rtcpFeedback&&i.rtcpFeedback.length&&i.rtcpFeedback.forEach(n=>{t+="a=rtcp-fb:"+e+" "+n.type+(n.parameter&&n.parameter.length?" "+n.parameter:"")+`\r
`}),t};rt.parseSsrcMedia=function(i){let t=i.indexOf(" "),e={ssrc:parseInt(i.substring(7,t),10)},n=i.indexOf(":",t);return n>-1?(e.attribute=i.substring(t+1,n),e.value=i.substring(n+1)):e.attribute=i.substring(t+1),e};rt.parseSsrcGroup=function(i){let t=i.substring(13).split(" ");return{semantics:t.shift(),ssrcs:t.map(e=>parseInt(e,10))}};rt.getMid=function(i){let t=rt.matchPrefix(i,"a=mid:")[0];if(t)return t.substring(6)};rt.parseFingerprint=function(i){let t=i.substring(14).split(" ");return{algorithm:t[0].toLowerCase(),value:t[1].toUpperCase()}};rt.getDtlsParameters=function(i,t){return{role:"auto",fingerprints:rt.matchPrefix(i+t,"a=fingerprint:").map(rt.parseFingerprint)}};rt.writeDtlsParameters=function(i,t){let e="a=setup:"+t+`\r
`;return i.fingerprints.forEach(n=>{e+="a=fingerprint:"+n.algorithm+" "+n.value+`\r
`}),e};rt.parseCryptoLine=function(i){let t=i.substring(9).split(" ");return{tag:parseInt(t[0],10),cryptoSuite:t[1],keyParams:t[2],sessionParams:t.slice(3)}};rt.writeCryptoLine=function(i){return"a=crypto:"+i.tag+" "+i.cryptoSuite+" "+(typeof i.keyParams=="object"?rt.writeCryptoKeyParams(i.keyParams):i.keyParams)+(i.sessionParams?" "+i.sessionParams.join(" "):"")+`\r
`};rt.parseCryptoKeyParams=function(i){if(i.indexOf("inline:")!==0)return null;let t=i.substring(7).split("|");return{keyMethod:"inline",keySalt:t[0],lifeTime:t[1],mkiValue:t[2]?t[2].split(":")[0]:void 0,mkiLength:t[2]?t[2].split(":")[1]:void 0}};rt.writeCryptoKeyParams=function(i){return i.keyMethod+":"+i.keySalt+(i.lifeTime?"|"+i.lifeTime:"")+(i.mkiValue&&i.mkiLength?"|"+i.mkiValue+":"+i.mkiLength:"")};rt.getCryptoParameters=function(i,t){return rt.matchPrefix(i+t,"a=crypto:").map(rt.parseCryptoLine)};rt.getIceParameters=function(i,t){let e=rt.matchPrefix(i+t,"a=ice-ufrag:")[0],n=rt.matchPrefix(i+t,"a=ice-pwd:")[0];return e&&n?{usernameFragment:e.substring(12),password:n.substring(10)}:null};rt.writeIceParameters=function(i){let t="a=ice-ufrag:"+i.usernameFragment+`\r
a=ice-pwd:`+i.password+`\r
`;return i.iceLite&&(t+=`a=ice-lite\r
`),t};rt.parseRtpParameters=function(i){let t={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},n=rt.splitLines(i)[0].split(" ");t.profile=n[2];for(let r=3;r<n.length;r++){let a=n[r],o=rt.matchPrefix(i,"a=rtpmap:"+a+" ")[0];if(o){let c=rt.parseRtpMap(o),l=rt.matchPrefix(i,"a=fmtp:"+a+" ");switch(c.parameters=l.length?rt.parseFmtp(l[0]):{},c.rtcpFeedback=rt.matchPrefix(i,"a=rtcp-fb:"+a+" ").map(rt.parseRtcpFb),t.codecs.push(c),c.name.toUpperCase()){case"RED":case"ULPFEC":t.fecMechanisms.push(c.name.toUpperCase());break;default:break}}}rt.matchPrefix(i,"a=extmap:").forEach(r=>{t.headerExtensions.push(rt.parseExtmap(r))});let s=rt.matchPrefix(i,"a=rtcp-fb:* ").map(rt.parseRtcpFb);return t.codecs.forEach(r=>{s.forEach(a=>{r.rtcpFeedback.find(c=>c.type===a.type&&c.parameter===a.parameter)||r.rtcpFeedback.push(a)})}),t};rt.writeRtpDescription=function(i,t){let e="";e+="m="+i+" ",e+=t.codecs.length>0?"9":"0",e+=" "+(t.profile||"UDP/TLS/RTP/SAVPF")+" ",e+=t.codecs.map(s=>s.preferredPayloadType!==void 0?s.preferredPayloadType:s.payloadType).join(" ")+`\r
`,e+=`c=IN IP4 0.0.0.0\r
`,e+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,t.codecs.forEach(s=>{e+=rt.writeRtpMap(s),e+=rt.writeFmtp(s),e+=rt.writeRtcpFb(s)});let n=0;return t.codecs.forEach(s=>{s.maxptime>n&&(n=s.maxptime)}),n>0&&(e+="a=maxptime:"+n+`\r
`),t.headerExtensions&&t.headerExtensions.forEach(s=>{e+=rt.writeExtmap(s)}),e};rt.parseRtpEncodingParameters=function(i){let t=[],e=rt.parseRtpParameters(i),n=e.fecMechanisms.indexOf("RED")!==-1,s=e.fecMechanisms.indexOf("ULPFEC")!==-1,r=rt.matchPrefix(i,"a=ssrc:").map(h=>rt.parseSsrcMedia(h)).filter(h=>h.attribute==="cname"),a=r.length>0&&r[0].ssrc,o,c=rt.matchPrefix(i,"a=ssrc-group:FID").map(h=>h.substring(17).split(" ").map(u=>parseInt(u,10)));c.length>0&&c[0].length>1&&c[0][0]===a&&(o=c[0][1]),e.codecs.forEach(h=>{if(h.name.toUpperCase()==="RTX"&&h.parameters.apt){let d={ssrc:a,codecPayloadType:parseInt(h.parameters.apt,10)};a&&o&&(d.rtx={ssrc:o}),t.push(d),n&&(d=JSON.parse(JSON.stringify(d)),d.fec={ssrc:a,mechanism:s?"red+ulpfec":"red"},t.push(d))}}),t.length===0&&a&&t.push({ssrc:a});let l=rt.matchPrefix(i,"b=");return l.length&&(l[0].indexOf("b=TIAS:")===0?l=parseInt(l[0].substring(7),10):l[0].indexOf("b=AS:")===0?l=parseInt(l[0].substring(5),10)*1e3*.95-2e3*8:l=void 0,t.forEach(h=>{h.maxBitrate=l})),t};rt.parseRtcpParameters=function(i){let t={},e=rt.matchPrefix(i,"a=ssrc:").map(r=>rt.parseSsrcMedia(r)).filter(r=>r.attribute==="cname")[0];e&&(t.cname=e.value,t.ssrc=e.ssrc);let n=rt.matchPrefix(i,"a=rtcp-rsize");t.reducedSize=n.length>0,t.compound=n.length===0;let s=rt.matchPrefix(i,"a=rtcp-mux");return t.mux=s.length>0,t};rt.writeRtcpParameters=function(i){let t="";return i.reducedSize&&(t+=`a=rtcp-rsize\r
`),i.mux&&(t+=`a=rtcp-mux\r
`),i.ssrc!==void 0&&i.cname&&(t+="a=ssrc:"+i.ssrc+" cname:"+i.cname+`\r
`),t};rt.parseMsid=function(i){let t,e=rt.matchPrefix(i,"a=msid:");if(e.length===1)return t=e[0].substring(7).split(" "),{stream:t[0],track:t[1]};let n=rt.matchPrefix(i,"a=ssrc:").map(s=>rt.parseSsrcMedia(s)).filter(s=>s.attribute==="msid");if(n.length>0)return t=n[0].value.split(" "),{stream:t[0],track:t[1]}};rt.parseSctpDescription=function(i){let t=rt.parseMLine(i),e=rt.matchPrefix(i,"a=max-message-size:"),n;e.length>0&&(n=parseInt(e[0].substring(19),10)),isNaN(n)&&(n=65536);let s=rt.matchPrefix(i,"a=sctp-port:");if(s.length>0)return{port:parseInt(s[0].substring(12),10),protocol:t.fmt,maxMessageSize:n};let r=rt.matchPrefix(i,"a=sctpmap:");if(r.length>0){let a=r[0].substring(10).split(" ");return{port:parseInt(a[0],10),protocol:a[1],maxMessageSize:n}}};rt.writeSctpDescription=function(i,t){let e=[];return i.protocol!=="DTLS/SCTP"?e=["m="+i.kind+" 9 "+i.protocol+" "+t.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+t.port+`\r
`]:e=["m="+i.kind+" 9 "+i.protocol+" "+t.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+t.port+" "+t.protocol+` 65535\r
`],t.maxMessageSize!==void 0&&e.push("a=max-message-size:"+t.maxMessageSize+`\r
`),e.join("")};rt.generateSessionId=function(){return Math.random().toString().substr(2,22)};rt.writeSessionBoilerplate=function(i,t,e){let n,s=t!==void 0?t:2;return i?n=i:n=rt.generateSessionId(),`v=0\r
o=`+(e||"thisisadapterortc")+" "+n+" "+s+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`};rt.getDirection=function(i,t){let e=rt.splitLines(i);for(let n=0;n<e.length;n++)switch(e[n]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return e[n].substring(2);default:}return t?rt.getDirection(t):"sendrecv"};rt.getKind=function(i){return rt.splitLines(i)[0].split(" ")[0].substring(2)};rt.isRejected=function(i){return i.split(" ",2)[1]==="0"};rt.parseMLine=function(i){let e=rt.splitLines(i)[0].substring(2).split(" ");return{kind:e[0],port:parseInt(e[1],10),protocol:e[2],fmt:e.slice(3).join(" ")}};rt.parseOLine=function(i){let e=rt.matchPrefix(i,"o=")[0].substring(2).split(" ");return{username:e[0],sessionId:e[1],sessionVersion:parseInt(e[2],10),netType:e[3],addressType:e[4],address:e[5]}};rt.isValidSDP=function(i){if(typeof i!="string"||i.length===0)return!1;let t=rt.splitLines(i);for(let e=0;e<t.length;e++)if(t[e].length<2||t[e].charAt(1)!=="=")return!1;return!0};typeof Bu=="object"&&(Bu.exports=rt)});var Kd=0,nh=1,Zd=2;var Xr=1,jd=2,$s=3,Oi=0,je=1,Re=2,ei=0,Bi=1,cs=2,ih=3,sh=4,Qd=5;var ls=100,tf=101,ef=102,nf=103,sf=104,rf=200,af=201,of=202,cf=203,rh=204,ah=205,lf=206,hf=207,uf=208,df=209,ff=210,pf=211,mf=212,gf=213,xf=214,ao=0,oo=1,co=2,Os=3,lo=4,ho=5,uo=6,fo=7,oh=0,_f=1,vf=2,Wn=0,ch=1,lh=2,hh=3,qr=4,uh=5,dh=6,fh=7;var ph=300,zi=301,hs=302,Oo=303,Bo=304,$r=306,ss=1e3,Cn=1001,po=1002,qe=1003,yf=1004;var Yr=1005;var Ke=1006,zo=1007;var Hi=1008;var xn=1009,mh=1010,gh=1011,Ys=1012,Ho=1013,Xn=1014,In=1015,qn=1016,Go=1017,Vo=1018,Js=1020,xh=35902,_h=35899,vh=1021,yh=1022,Ln=1023,jn=1026,Gi=1027,Wo=1028,Xo=1029,Vi=1030,qo=1031;var $o=1033,Jr=33776,Kr=33777,Zr=33778,jr=33779,Yo=35840,Jo=35841,Ko=35842,Zo=35843,jo=36196,Qo=37492,tc=37496,ec=37488,nc=37489,Qr=37490,ic=37491,sc=37808,rc=37809,ac=37810,oc=37811,cc=37812,lc=37813,hc=37814,uc=37815,dc=37816,fc=37817,pc=37818,mc=37819,gc=37820,xc=37821,_c=36492,vc=36494,yc=36495,bc=36283,Mc=36284,ta=36285,Sc=36286;var Ar=2300,mo=2301,so=2302,Yl=2303,Jl=2400,Kl=2401,Zl=2402;var bf=3200;var Tc=0,Mf=1,vi="",Ce="srgb",Cr="srgb-linear",Rr="linear",he="srgb";var ro=7680;var Sf=519,Tf=512,wf=513,Ef=514,wc=515,Af=516,Cf=517,Ec=518,Rf=519,Pf=35044,ea=35048;var bh="300 es",zn=2e3,Bs=2001;function O0(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function B0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Pr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function If(){let i=Pr("canvas");return i.style.display="block",i}var wd={},zs=null;function Mh(...i){let t="THREE."+i.shift();zs?zs("log",t,...i):console.log(t,...i)}function Lf(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Bt(...i){i=Lf(i);let t="THREE."+i.shift();if(zs)zs("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Ht(...i){i=Lf(i);let t="THREE."+i.shift();if(zs)zs("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function is(...i){let t=i.join(" ");t in wd||(wd[t]=!0,Bt(...i))}function Df(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var kf={[ao]:oo,[co]:uo,[lo]:fo,[Os]:ho,[oo]:ao,[uo]:co,[fo]:lo,[ho]:Os},Qn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var wl=Math.PI/180,go=180/Math.PI;function na(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]+"-"+en[t&255]+en[t>>8&255]+"-"+en[t>>16&15|64]+en[t>>24&255]+"-"+en[e&63|128]+en[e>>8&255]+"-"+en[e>>16&255]+en[e>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function ne(i,t,e){return Math.max(t,Math.min(e,i))}function z0(i,t){return(i%t+t)%t}function El(i,t,e){return(1-e)*i+e*t}function yr(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function gn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ah=class Ah{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ah.prototype.isVector2=!0;var Kt=Ah,Rn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(d!==x||c!==u||l!==f||h!==g){let m=c*u+l*f+h*g+d*x;m<0&&(u=-u,f=-f,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){let y=Math.acos(m),w=Math.sin(y);p=Math.sin(p*y)/w,o=Math.sin(o*y)/w,c=c*p+u*o,l=l*p+f*o,h=h*p+g*o,d=d*p+x*o}else{c=c*p+u*o,l=l*p+f*o,h=h*p+g*o,d=d*p+x*o;let y=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=y,l*=y,h*=y,d*=y}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+c*f-l*u,t[e+1]=c*g+h*u+l*d-o*f,t[e+2]=l*g+h*f+o*u-c*d,t[e+3]=h*g-o*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),u=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:Bt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ch=class Ch{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ed.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ed.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Al.copy(this).projectOnVector(t),this.sub(Al)}reflect(t){return this.sub(Al.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ch.prototype.isVector3=!0;var O=Ch,Al=new O,Ed=new Rn,Rh=class Rh{constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],y=s[1],w=s[4],_=s[7],S=s[2],T=s[5],C=s[8];return r[0]=a*x+o*y+c*S,r[3]=a*m+o*w+c*T,r[6]=a*p+o*_+c*C,r[1]=l*x+h*y+d*S,r[4]=l*m+h*w+d*T,r[7]=l*p+h*_+d*C,r[2]=u*x+f*y+g*S,r[5]=u*m+f*w+g*T,r[8]=u*p+f*_+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,u=o*c-h*r,f=l*r-a*c,g=e*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(s*l-h*n)*x,t[2]=(o*n-s*a)*x,t[3]=u*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return is("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Cl.makeScale(t,e)),this}rotate(t){return is("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Cl.makeRotation(-t)),this}translate(t,e){return is("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Cl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Rh.prototype.isMatrix3=!0;var Gt=Rh,Cl=new Gt,Ad=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cd=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function H0(){let i={enabled:!0,workingColorSpace:Cr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===he&&(s.r=fi(s.r),s.g=fi(s.g),s.b=fi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===he&&(s.r=Fs(s.r),s.g=Fs(s.g),s.b=Fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===vi?Rr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return is("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return is("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Cr]:{primaries:t,whitePoint:n,transfer:Rr,toXYZ:Ad,fromXYZ:Cd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ce},outputColorSpaceConfig:{drawingBufferColorSpace:Ce}},[Ce]:{primaries:t,whitePoint:n,transfer:he,toXYZ:Ad,fromXYZ:Cd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ce}}}),i}var ee=H0();function fi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ss,xo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ss===void 0&&(Ss=Pr("canvas")),Ss.width=t.width,Ss.height=t.height;let s=Ss.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ss}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Pr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=fi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(fi(e[n]/255)*255):e[n]=fi(e[n]);return{data:e,width:t.width,height:t.height}}else return Bt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},G0=0,Hs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:G0++}),this.uuid=na(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Rl(s[a].image)):r.push(Rl(s[a]))}else r=Rl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Rl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?xo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Bt("Texture: Unable to serialize Texture."),{})}var V0=0,Pl=new O,hn=class i extends Qn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Cn,s=Cn,r=Ke,a=Hi,o=Ln,c=xn,l=i.DEFAULT_ANISOTROPY,h=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:V0++}),this.uuid=na(),this.name="",this.source=new Hs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Kt(0,0),this.repeat=new Kt(1,1),this.center=new Kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Pl).x}get height(){return this.source.getSize(Pl).y}get depth(){return this.source.getSize(Pl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Bt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Bt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ph)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ss:t.x=t.x-Math.floor(t.x);break;case Cn:t.x=t.x<0?0:1;break;case po:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ss:t.y=t.y-Math.floor(t.y);break;case Cn:t.y=t.y<0?0:1;break;case po:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=ph;hn.DEFAULT_ANISOTROPY=1;var Ph=class Ph{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(l+1)/2,_=(f+1)/2,S=(p+1)/2,T=(h+u)/4,C=(d+x)/4,v=(g+m)/4;return w>_&&w>S?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=T/n,r=C/n):_>S?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=v/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=C/r,s=v/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-x)/y,this.z=(u-h)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this.w=ne(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this.w=ne(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ne(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ph.prototype.isVector4=!0;var Se=Ph,_o=class extends Qn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ke,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new hn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ke,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Hs(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},sn=class extends _o{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ir=class extends hn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var vo=class extends hn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Fo=class Fo{constructor(t,e,n,s,r,a,o,c,l,h,d,u,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,d,u,f,g,x,m)}set(t,e,n,s,r,a,o,c,l,h,d,u,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Fo().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Ts.setFromMatrixColumn(t,0).length(),r=1/Ts.setFromMatrixColumn(t,1).length(),a=1/Ts.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,f=a*d,g=o*h,x=o*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=u-x*l,e[9]=-o*c,e[2]=x-u*l,e[6]=g+f*l,e[10]=a*c}else if(t.order==="YXZ"){let u=c*h,f=c*d,g=l*h,x=l*d;e[0]=u+x*o,e[4]=g*o-f,e[8]=a*l,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=x+u*o,e[10]=a*c}else if(t.order==="ZXY"){let u=c*h,f=c*d,g=l*h,x=l*d;e[0]=u-x*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=x-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let u=a*h,f=a*d,g=o*h,x=o*d;e[0]=c*h,e[4]=g*l-f,e[8]=u*l+x,e[1]=c*d,e[5]=x*l+u,e[9]=f*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let u=a*c,f=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=x-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=f*d+g,e[10]=u-x*d}else if(t.order==="XZY"){let u=a*c,f=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+x,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(W0,t,X0)}lookAt(t,e,n){let s=this.elements;return yn.subVectors(t,e),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),wi.crossVectors(n,yn),wi.lengthSq()===0&&(Math.abs(n.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),wi.crossVectors(n,yn)),wi.normalize(),Ua.crossVectors(yn,wi),s[0]=wi.x,s[4]=Ua.x,s[8]=yn.x,s[1]=wi.y,s[5]=Ua.y,s[9]=yn.y,s[2]=wi.z,s[6]=Ua.z,s[10]=yn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],y=n[3],w=n[7],_=n[11],S=n[15],T=s[0],C=s[4],v=s[8],M=s[12],A=s[1],R=s[5],P=s[9],D=s[13],L=s[2],B=s[6],q=s[10],Y=s[14],st=s[3],X=s[7],Q=s[11],nt=s[15];return r[0]=a*T+o*A+c*L+l*st,r[4]=a*C+o*R+c*B+l*X,r[8]=a*v+o*P+c*q+l*Q,r[12]=a*M+o*D+c*Y+l*nt,r[1]=h*T+d*A+u*L+f*st,r[5]=h*C+d*R+u*B+f*X,r[9]=h*v+d*P+u*q+f*Q,r[13]=h*M+d*D+u*Y+f*nt,r[2]=g*T+x*A+m*L+p*st,r[6]=g*C+x*R+m*B+p*X,r[10]=g*v+x*P+m*q+p*Q,r[14]=g*M+x*D+m*Y+p*nt,r[3]=y*T+w*A+_*L+S*st,r[7]=y*C+w*R+_*B+S*X,r[11]=y*v+w*P+_*q+S*Q,r[15]=y*M+w*D+_*Y+S*nt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15],y=c*f-l*u,w=o*f-l*d,_=o*u-c*d,S=a*f-l*h,T=a*u-c*h,C=a*d-o*h;return e*(x*y-m*w+p*_)-n*(g*y-m*S+p*T)+s*(g*w-x*S+p*C)-r*(g*_-x*T+m*C)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],h=t[10];return e*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],y=e*o-n*a,w=e*c-s*a,_=e*l-r*a,S=n*c-s*o,T=n*l-r*o,C=s*l-r*c,v=h*x-d*g,M=h*m-u*g,A=h*p-f*g,R=d*m-u*x,P=d*p-f*x,D=u*p-f*m,L=y*D-w*P+_*R+S*A-T*M+C*v;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/L;return t[0]=(o*D-c*P+l*R)*B,t[1]=(s*P-n*D-r*R)*B,t[2]=(x*C-m*T+p*S)*B,t[3]=(u*T-d*C-f*S)*B,t[4]=(c*A-a*D-l*M)*B,t[5]=(e*D-s*A+r*M)*B,t[6]=(m*_-g*C-p*w)*B,t[7]=(h*C-u*_+f*w)*B,t[8]=(a*P-o*A+l*v)*B,t[9]=(n*A-e*P-r*v)*B,t[10]=(g*T-x*_+p*y)*B,t[11]=(d*_-h*T-f*y)*B,t[12]=(o*M-a*R-c*v)*B,t[13]=(e*R-n*M+s*v)*B,t[14]=(x*w-g*S-m*y)*B,t[15]=(h*S-d*w+u*y)*B,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,d=o+o,u=r*l,f=r*h,g=r*d,x=a*h,m=a*d,p=o*d,y=c*l,w=c*h,_=c*d,S=n.x,T=n.y,C=n.z;return s[0]=(1-(x+p))*S,s[1]=(f+_)*S,s[2]=(g-w)*S,s[3]=0,s[4]=(f-_)*T,s[5]=(1-(u+p))*T,s[6]=(m+y)*T,s[7]=0,s[8]=(g+w)*C,s[9]=(m-y)*C,s[10]=(1-(u+x))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Ts.set(s[0],s[1],s[2]).length(),o=Ts.set(s[4],s[5],s[6]).length(),c=Ts.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Un.copy(this);let l=1/a,h=1/o,d=1/c;return Un.elements[0]*=l,Un.elements[1]*=l,Un.elements[2]*=l,Un.elements[4]*=h,Un.elements[5]*=h,Un.elements[6]*=h,Un.elements[8]*=d,Un.elements[9]*=d,Un.elements[10]*=d,e.setFromRotationMatrix(Un),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=zn,c=!1){let l=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===zn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Bs)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=zn,c=!1){let l=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s),g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===zn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===Bs)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Fo.prototype.isMatrix4=!0;var fe=Fo,Ts=new O,Un=new fe,W0=new O(0,0,0),X0=new O(1,1,1),wi=new O,Ua=new O,yn=new O,Rd=new fe,Pd=new Rn,Hn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ne(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ne(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Bt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Rd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Pd.setFromEuler(this),this.setFromQuaternion(Pd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Hn.DEFAULT_ORDER="XYZ";var Lr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},q0=0,Id=new O,ws=new Rn,ci=new fe,Fa=new O,br=new O,$0=new O,Y0=new Rn,Ld=new O(1,0,0),Dd=new O(0,1,0),kd=new O(0,0,1),Nd={type:"added"},J0={type:"removed"},Es={type:"childadded",child:null},Il={type:"childremoved",child:null},ke=class i extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:q0++}),this.uuid=na(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new O,e=new Hn,n=new Rn,s=new O(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new fe},normalMatrix:{value:new Gt}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.multiply(ws),this}rotateOnWorldAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.premultiply(ws),this}rotateX(t){return this.rotateOnAxis(Ld,t)}rotateY(t){return this.rotateOnAxis(Dd,t)}rotateZ(t){return this.rotateOnAxis(kd,t)}translateOnAxis(t,e){return Id.copy(t).applyQuaternion(this.quaternion),this.position.add(Id.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ld,t)}translateY(t){return this.translateOnAxis(Dd,t)}translateZ(t){return this.translateOnAxis(kd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Fa.copy(t):Fa.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(br,Fa,this.up):ci.lookAt(Fa,br,this.up),this.quaternion.setFromRotationMatrix(ci),s&&(ci.extractRotation(s.matrixWorld),ws.setFromRotationMatrix(ci),this.quaternion.premultiply(ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ht("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Nd),Es.child=t,this.dispatchEvent(Es),Es.child=null):Ht("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(J0),Il.child=t,this.dispatchEvent(Il),Il.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ci.multiply(t.parent.matrixWorld)),t.applyMatrix4(ci),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Nd),Es.child=t,this.dispatchEvent(Es),Es.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,t,$0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,Y0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ke.DEFAULT_UP=new O(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var oe=class extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}},K0={type:"move"},Gs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new oe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new oe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new oe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(K0)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new oe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Nf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},Oa={h:0,s:0,l:0};function Ll(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Nt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ce){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=z0(t,1),e=ne(e,0,1),n=ne(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ll(a,r,t+1/3),this.g=Ll(a,r,t),this.b=Ll(a,r,t-1/3)}return ee.colorSpaceToWorking(this,s),this}setStyle(t,e=Ce){function n(r){r!==void 0&&parseFloat(r)<1&&Bt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Bt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Bt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ce){let n=Nf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Bt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=fi(t.r),this.g=fi(t.g),this.b=fi(t.b),this}copyLinearToSRGB(t){return this.r=Fs(t.r),this.g=Fs(t.g),this.b=Fs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ce){return ee.workingToColorSpace(nn.copy(this),t),Math.round(ne(nn.r*255,0,255))*65536+Math.round(ne(nn.g*255,0,255))*256+Math.round(ne(nn.b*255,0,255))}getHexString(t=Ce){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(nn.copy(this),e);let n=nn.r,s=nn.g,r=nn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(nn.copy(this),e),t.r=nn.r,t.g=nn.g,t.b=nn.b,t}getStyle(t=Ce){ee.workingToColorSpace(nn.copy(this),t);let e=nn.r,n=nn.g,s=nn.b;return t!==Ce?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ei),this.setHSL(Ei.h+t,Ei.s+e,Ei.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ei),t.getHSL(Oa);let n=El(Ei.h,Oa.h,e),s=El(Ei.s,Oa.s,e),r=El(Ei.l,Oa.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},nn=new Nt;Nt.NAMES=Nf;var Dr=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Nt(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},kr=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Nt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Gn=class extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hn,this.environmentIntensity=1,this.environmentRotation=new Hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Fn=new O,li=new O,Dl=new O,hi=new O,As=new O,Cs=new O,Ud=new O,kl=new O,Nl=new O,Ul=new O,Fl=new Se,Ol=new Se,Bl=new Se,Pi=class i{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Fn.subVectors(t,e),s.cross(Fn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Fn.subVectors(s,e),li.subVectors(n,e),Dl.subVectors(t,e);let a=Fn.dot(Fn),o=Fn.dot(li),c=Fn.dot(Dl),l=li.dot(li),h=li.dot(Dl),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,hi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,hi.x),c.addScaledVector(a,hi.y),c.addScaledVector(o,hi.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Fl.setScalar(0),Ol.setScalar(0),Bl.setScalar(0),Fl.fromBufferAttribute(t,e),Ol.fromBufferAttribute(t,n),Bl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Fl,r.x),a.addScaledVector(Ol,r.y),a.addScaledVector(Bl,r.z),a}static isFrontFacing(t,e,n,s){return Fn.subVectors(n,e),li.subVectors(t,e),Fn.cross(li).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Fn.subVectors(this.c,this.b),li.subVectors(this.a,this.b),Fn.cross(li).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;As.subVectors(s,n),Cs.subVectors(r,n),kl.subVectors(t,n);let c=As.dot(kl),l=Cs.dot(kl);if(c<=0&&l<=0)return e.copy(n);Nl.subVectors(t,s);let h=As.dot(Nl),d=Cs.dot(Nl);if(h>=0&&d<=h)return e.copy(s);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(As,a);Ul.subVectors(t,r);let f=As.dot(Ul),g=Cs.dot(Ul);if(g>=0&&f<=g)return e.copy(r);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Cs,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Ud.subVectors(r,s),o=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(Ud,o);let p=1/(m+x+u);return a=x*p,o=u*p,e.copy(n).addScaledVector(As,a).addScaledVector(Cs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ti=class{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(On.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(On.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=On.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,On):On.fromBufferAttribute(r,a),On.applyMatrix4(t.matrixWorld),this.expandByPoint(On);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ba.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ba.copy(n.boundingBox)),Ba.applyMatrix4(t.matrixWorld),this.union(Ba)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,On),On.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Mr),za.subVectors(this.max,Mr),Rs.subVectors(t.a,Mr),Ps.subVectors(t.b,Mr),Is.subVectors(t.c,Mr),Ai.subVectors(Ps,Rs),Ci.subVectors(Is,Ps),Qi.subVectors(Rs,Is);let e=[0,-Ai.z,Ai.y,0,-Ci.z,Ci.y,0,-Qi.z,Qi.y,Ai.z,0,-Ai.x,Ci.z,0,-Ci.x,Qi.z,0,-Qi.x,-Ai.y,Ai.x,0,-Ci.y,Ci.x,0,-Qi.y,Qi.x,0];return!zl(e,Rs,Ps,Is,za)||(e=[1,0,0,0,1,0,0,0,1],!zl(e,Rs,Ps,Is,za))?!1:(Ha.crossVectors(Ai,Ci),e=[Ha.x,Ha.y,Ha.z],zl(e,Rs,Ps,Is,za))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,On).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(On).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ui),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ui=[new O,new O,new O,new O,new O,new O,new O,new O],On=new O,Ba=new ti,Rs=new O,Ps=new O,Is=new O,Ai=new O,Ci=new O,Qi=new O,Mr=new O,za=new O,Ha=new O,ts=new O;function zl(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ts.fromArray(i,r);let o=s.x*Math.abs(ts.x)+s.y*Math.abs(ts.y)+s.z*Math.abs(ts.z),c=t.dot(ts),l=e.dot(ts),h=n.dot(ts);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var De=new O,Ga=new Kt,Z0=0,we=class extends Qn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Z0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Pf,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ga.fromBufferAttribute(this,e),Ga.applyMatrix3(t),this.setXY(e,Ga.x,Ga.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix3(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=yr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=gn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=yr(e,this.array)),e}setX(t,e){return this.normalized&&(e=gn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=yr(e,this.array)),e}setY(t,e){return this.normalized&&(e=gn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=yr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=gn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=yr(e,this.array)),e}setW(t,e){return this.normalized&&(e=gn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=gn(e,this.array),n=gn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=gn(e,this.array),n=gn(n,this.array),s=gn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=gn(e,this.array),n=gn(n,this.array),s=gn(s,this.array),r=gn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Nr=class extends we{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ur=class extends we{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Xt=class extends we{constructor(t,e,n){super(new Float32Array(t),e,n)}},j0=new ti,Sr=new O,Hl=new O,pi=class{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):j0.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Sr.subVectors(t,this.center);let e=Sr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Sr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Hl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Sr.copy(t.center).add(Hl)),this.expandByPoint(Sr.copy(t.center).sub(Hl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Q0=0,An=new fe,Gl=new ke,Ls=new O,bn=new ti,Tr=new ti,Xe=new O,me=class i extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Q0++}),this.uuid=na(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(O0(t)?Ur:Nr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return An.makeRotationFromQuaternion(t),this.applyMatrix4(An),this}rotateX(t){return An.makeRotationX(t),this.applyMatrix4(An),this}rotateY(t){return An.makeRotationY(t),this.applyMatrix4(An),this}rotateZ(t){return An.makeRotationZ(t),this.applyMatrix4(An),this}translate(t,e,n){return An.makeTranslation(t,e,n),this.applyMatrix4(An),this}scale(t,e,n){return An.makeScale(t,e,n),this.applyMatrix4(An),this}lookAt(t){return Gl.lookAt(t),Gl.updateMatrix(),this.applyMatrix4(Gl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ls).negate(),this.translate(Ls.x,Ls.y,Ls.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Bt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ti);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ht("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];bn.setFromBufferAttribute(r),this.morphTargetsRelative?(Xe.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Xe),Xe.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Xe)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ht('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ht("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){let n=this.boundingSphere.center;if(bn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Tr.setFromBufferAttribute(o),this.morphTargetsRelative?(Xe.addVectors(bn.min,Tr.min),bn.expandByPoint(Xe),Xe.addVectors(bn.max,Tr.max),bn.expandByPoint(Xe)):(bn.expandByPoint(Tr.min),bn.expandByPoint(Tr.max))}bn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Xe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Xe));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Xe.fromBufferAttribute(o,l),c&&(Ls.fromBufferAttribute(t,l),Xe.add(Ls)),s=Math.max(s,n.distanceToSquared(Xe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ht('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ht("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new we(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let v=0;v<n.count;v++)o[v]=new O,c[v]=new O;let l=new O,h=new O,d=new O,u=new Kt,f=new Kt,g=new Kt,x=new O,m=new O;function p(v,M,A){l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,A),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,A),h.sub(l),d.sub(l),f.sub(u),g.sub(u);let R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(R),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(R),o[v].add(x),o[M].add(x),o[A].add(x),c[v].add(m),c[M].add(m),c[A].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let v=0,M=y.length;v<M;++v){let A=y[v],R=A.start,P=A.count;for(let D=R,L=R+P;D<L;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let w=new O,_=new O,S=new O,T=new O;function C(v){S.fromBufferAttribute(s,v),T.copy(S);let M=o[v];w.copy(M),w.sub(S.multiplyScalar(S.dot(M))).normalize(),_.crossVectors(T,M);let R=_.dot(c[v])<0?-1:1;a.setXYZW(v,w.x,w.y,w.z,R)}for(let v=0,M=y.length;v<M;++v){let A=y[v],R=A.start,P=A.count;for(let D=R,L=R+P;D<L;D+=3)C(t.getX(D+0)),C(t.getX(D+1)),C(t.getX(D+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new we(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new O,r=new O,a=new O,o=new O,c=new O,l=new O,h=new O,d=new O;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Xe.fromBufferAttribute(t,e),Xe.normalize(),t.setXYZ(e,Xe.x,Xe.y,Xe.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h),f=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new we(u,h,d)}if(this.index===null)return Bt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){let u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Vl=new O,tm=new O,em=new Gt,Bn=class{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Vl.subVectors(n,e).cross(tm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Vl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||em.getNormalMatrix(t),s=this.coplanarPoint(Vl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},nm=0,mi=class extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nm++}),this.uuid=na(),this.name="",this.type="Material",this.blending=Bi,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rh,this.blendDst=ah,this.blendEquation=ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=Os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ro,this.stencilZFail=ro,this.stencilZPass=ro,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Bt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Bt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Nt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Bn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Kt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Kt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var di=new O,Wl=new O,Va=new O,Wa=new O,Fr=class{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,di)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=di.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(di.copy(this.origin).addScaledVector(this.direction,e),di.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Wl.copy(t).add(e).multiplyScalar(.5),Va.copy(e).sub(t).normalize(),Wa.copy(this.origin).sub(Wl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Va),o=Wa.dot(this.direction),c=-Wa.dot(Va),l=Wa.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*c-o,u=a*o-c,g=r*h,d>=0)if(u>=-g)if(u<=g){let x=1/h;d*=x,u*=x,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Wl).addScaledVector(Va,u),f}intersectSphere(t,e){if(t.radius<0)return null;di.subVectors(t.center,this.origin);let n=di.dot(this.direction),s=di.dot(di)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,di)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,g=e.x-a.x,x=e.y-a.y,m=e.z-a.z,p=n.x-a.x,y=n.y-a.y,w=n.z-a.z,_=Math.abs(c),S=Math.abs(l),T=Math.abs(h),C,v,M,A,R,P,D,L,B,q,Y,st;if(_>=S&&_>=T?(M=c,P=d,B=g,st=p,c>=0?(C=l,v=h,A=u,R=f,D=x,L=m,q=y,Y=w):(C=h,v=l,A=f,R=u,D=m,L=x,q=w,Y=y)):S>=T?(M=l,P=u,B=x,st=y,l>=0?(C=h,v=c,A=f,R=d,D=m,L=g,q=w,Y=p):(C=c,v=h,A=d,R=f,D=g,L=m,q=p,Y=w)):(M=h,P=f,B=m,st=w,h>=0?(C=c,v=l,A=d,R=u,D=g,L=x,q=p,Y=y):(C=l,v=c,A=u,R=d,D=x,L=g,q=y,Y=p)),M===0)return null;let X=C/M,Q=v/M,nt=1/M,yt=A-X*P,wt=R-Q*P,ue=D-X*B,Zt=L-Q*B,re=q-X*st,K=Y-Q*st,et=re*Zt-K*ue,St=yt*K-wt*re,Vt=ue*wt-Zt*yt;if(s){if(et<0||St<0||Vt<0)return null}else if((et<0||St<0||Vt<0)&&(et>0||St>0||Vt>0))return null;let bt=et+St+Vt;if(bt===0)return null;let Jt=nt*(et*P+St*B+Vt*st);return(bt>0?Jt<0:Jt>0)?null:this.at(Jt/bt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},se=class extends mi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=oh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Fd=new fe,es=new Fr,Xa=new pi,Od=new O,qa=new O,$a=new O,Ya=new O,Xl=new O,Ja=new O,Bd=new O,Ka=new O,Ot=class extends ke{constructor(t=new me,e=new se){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Ja.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],d=r[c];h!==0&&(Xl.fromBufferAttribute(d,t),a?Ja.addScaledVector(Xl,h):Ja.addScaledVector(Xl.sub(e),h))}e.add(Ja)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xa.copy(n.boundingSphere),Xa.applyMatrix4(r),es.copy(t.ray).recast(t.near),!(Xa.containsPoint(es.origin)===!1&&(es.intersectSphere(Xa,Od)===null||es.origin.distanceToSquared(Od)>(t.far-t.near)**2))&&(Fd.copy(r).invert(),es.copy(t.ray).applyMatrix4(Fd),!(n.boundingBox!==null&&es.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,es)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),w=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,S=w;_<S;_+=3){let T=o.getX(_),C=o.getX(_+1),v=o.getX(_+2);s=Za(this,p,t,n,l,h,d,T,C,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let y=o.getX(m),w=o.getX(m+1),_=o.getX(m+2);s=Za(this,a,t,n,l,h,d,y,w,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),w=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,S=w;_<S;_+=3){let T=_,C=_+1,v=_+2;s=Za(this,p,t,n,l,h,d,T,C,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let y=m,w=m+1,_=m+2;s=Za(this,a,t,n,l,h,d,y,w,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function im(i,t,e,n,s,r,a,o){let c;if(t.side===je?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Oi,o),c===null)return null;Ka.copy(o),Ka.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Ka);return l<e.near||l>e.far?null:{distance:l,point:Ka.clone(),object:i}}function Za(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,qa),i.getVertexPosition(c,$a),i.getVertexPosition(l,Ya);let h=im(i,t,e,n,qa,$a,Ya,Bd);if(h){let d=new O;Pi.getBarycoord(Bd,qa,$a,Ya,d),s&&(h.uv=Pi.getInterpolatedAttribute(s,o,c,l,d,new Kt)),r&&(h.uv1=Pi.getInterpolatedAttribute(r,o,c,l,d,new Kt)),a&&(h.normal=Pi.getInterpolatedAttribute(a,o,c,l,d,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new O,materialIndex:0};Pi.getNormal(qa,$a,Ya,u.normal),h.face=u,h.barycoord=d}return h}var Or=class extends hn{constructor(t=null,e=1,n=1,s,r,a,o,c,l=qe,h=qe,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Vs=class extends we{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Ds=new fe,zd=new fe,ja=[],Hd=new ti,sm=new fe,wr=new Ot,Er=new pi,Ii=class extends Ot{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Vs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,sm)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ti),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ds),Hd.copy(t.boundingBox).applyMatrix4(Ds),this.boundingBox.union(Hd)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new pi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ds),Er.copy(t.boundingSphere).applyMatrix4(Ds),this.boundingSphere.union(Er)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(wr.geometry=this.geometry,wr.material=this.material,wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Er.copy(this.boundingSphere),Er.applyMatrix4(n),t.ray.intersectsSphere(Er)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ds),zd.multiplyMatrices(n,Ds),wr.matrixWorld=zd,wr.raycast(t,ja);for(let a=0,o=ja.length;a<o;a++){let c=ja[a];c.instanceId=r,c.object=this,e.push(c)}ja.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Vs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Or(new Float32Array(s*this.count),s,this.count,Wo,In));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ns=new pi,rm=new Kt(.5,.5),Qa=new O,Ws=class{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,r=new Bn,a=new Bn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=zn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],y=r[12],w=r[13],_=r[14],S=r[15];if(s[0].setComponents(l-a,f-h,p-g,S-y).normalize(),s[1].setComponents(l+a,f+h,p+g,S+y).normalize(),s[2].setComponents(l+o,f+d,p+x,S+w).normalize(),s[3].setComponents(l-o,f-d,p-x,S-w).normalize(),n)s[4].setComponents(c,u,m,_).normalize(),s[5].setComponents(l-c,f-u,p-m,S-_).normalize();else if(s[4].setComponents(l-c,f-u,p-m,S-_).normalize(),e===zn)s[5].setComponents(l+c,f+u,p+m,S+_).normalize();else if(e===Bs)s[5].setComponents(c,u,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ns.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ns.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ns)}intersectsSprite(t){ns.center.set(0,0,0);let e=rm.distanceTo(t.center);return ns.radius=.7071067811865476+e,ns.applyMatrix4(t.matrixWorld),this.intersectsSphere(ns)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Qa.x=s.normal.x>0?t.max.x:t.min.x,Qa.y=s.normal.y>0?t.max.y:t.min.y,Qa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Qa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Xs=class extends mi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Gd=new fe,jl=new Fr,to=new pi,eo=new O,rs=class extends ke{constructor(t=new me,e=new Xs){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),to.copy(n.boundingSphere),to.applyMatrix4(s),to.radius+=r,t.ray.intersectsSphere(to)===!1)return;Gd.copy(s).invert(),jl.copy(t.ray).applyMatrix4(Gd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){let u=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=u,x=f;g<x;g++){let m=l.getX(g);eo.fromBufferAttribute(d,m),Vd(eo,m,c,s,t,e,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,x=f;g<x;g++)eo.fromBufferAttribute(d,g),Vd(eo,g,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Vd(i,t,e,n,s,r,a){let o=jl.distanceSqToPoint(i);if(o<e){let c=new O;jl.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Br=class extends hn{constructor(t=[],e=zi,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},gi=class extends hn{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Li=class extends hn{constructor(t,e,n=Xn,s,r,a,o=qe,c=qe,l,h=jn,d=1){if(h!==jn&&h!==Gi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Hs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},yo=class extends Li{constructor(t,e=Xn,n=zi,s,r,a=qe,o=qe,c,l=jn){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},zr=class extends hn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Pn=class i extends me{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Xt(l,3)),this.setAttribute("normal",new Xt(h,3)),this.setAttribute("uv",new Xt(d,2));function g(x,m,p,y,w,_,S,T,C,v,M){let A=_/C,R=S/v,P=_/2,D=S/2,L=T/2,B=C+1,q=v+1,Y=0,st=0,X=new O;for(let Q=0;Q<q;Q++){let nt=Q*R-D;for(let yt=0;yt<B;yt++){let wt=yt*A-P;X[x]=wt*y,X[m]=nt*w,X[p]=L,l.push(X.x,X.y,X.z),X[x]=0,X[m]=0,X[p]=T>0?1:-1,h.push(X.x,X.y,X.z),d.push(yt/C),d.push(1-Q/v),Y+=1}}for(let Q=0;Q<v;Q++)for(let nt=0;nt<C;nt++){let yt=u+nt+B*Q,wt=u+nt+B*(Q+1),ue=u+(nt+1)+B*(Q+1),Zt=u+(nt+1)+B*Q;c.push(yt,wt,Zt),c.push(wt,ue,Zt),st+=6}o.addGroup(f,st,M),f+=st,u+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},as=class i extends me{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],c=[],l=[],h=e/2,d=Math.PI/2*t,u=e,f=2*d+u,g=n*2+r,x=s+1,m=new O,p=new O;for(let y=0;y<=g;y++){let w=0,_=0,S=0,T=0;if(y<=n){let M=y/n,A=M*Math.PI/2;_=-h-t*Math.cos(A),S=t*Math.sin(A),T=-t*Math.cos(A),w=M*d}else if(y<=n+r){let M=(y-n)/r;_=-h+M*e,S=t,T=0,w=d+M*u}else{let M=(y-n-r)/n,A=M*Math.PI/2;_=h+t*Math.sin(A),S=t*Math.cos(A),T=t*Math.sin(A),w=d+u+M*d}let C=Math.max(0,Math.min(1,w/f)),v=0;y===0?v=.5/s:y===g&&(v=-.5/s);for(let M=0;M<=s;M++){let A=M/s,R=A*Math.PI*2,P=Math.sin(R),D=Math.cos(R);p.x=-S*D,p.y=_,p.z=S*P,o.push(p.x,p.y,p.z),m.set(-S*D,T,S*P),m.normalize(),c.push(m.x,m.y,m.z),l.push(A+v,C)}if(y>0){let M=(y-1)*x;for(let A=0;A<s;A++){let R=M+A,P=M+A+1,D=y*x+A,L=y*x+A+1;a.push(R,P,D),a.push(P,L,D)}}}this.setIndex(a),this.setAttribute("position",new Xt(o,3)),this.setAttribute("normal",new Xt(c,3)),this.setAttribute("uv",new Xt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},os=class i extends me{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],c=[],l=new O,h=new Kt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=n+d/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Xt(a,3)),this.setAttribute("normal",new Xt(o,3)),this.setAttribute("uv",new Xt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},xi=class i extends me{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,x=[],m=n/2,p=0;y(),a===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new Xt(d,3)),this.setAttribute("normal",new Xt(u,3)),this.setAttribute("uv",new Xt(f,2));function y(){let _=new O,S=new O,T=0,C=(e-t)/n;for(let v=0;v<=r;v++){let M=[],A=v/r,R=A*(e-t)+t;for(let P=0;P<=s;P++){let D=P/s,L=D*c+o,B=Math.sin(L),q=Math.cos(L);S.x=R*B,S.y=-A*n+m,S.z=R*q,d.push(S.x,S.y,S.z),_.set(B,C,q).normalize(),u.push(_.x,_.y,_.z),f.push(D,1-A),M.push(g++)}x.push(M)}for(let v=0;v<s;v++)for(let M=0;M<r;M++){let A=x[M][v],R=x[M+1][v],P=x[M+1][v+1],D=x[M][v+1];(t>0||M!==0)&&(h.push(A,R,D),T+=3),(e>0||M!==r-1)&&(h.push(R,P,D),T+=3)}l.addGroup(p,T,0),p+=T}function w(_){let S=g,T=new Kt,C=new O,v=0,M=_===!0?t:e,A=_===!0?1:-1;for(let P=1;P<=s;P++)d.push(0,m*A,0),u.push(0,A,0),f.push(.5,.5),g++;let R=g;for(let P=0;P<=s;P++){let L=P/s*c+o,B=Math.cos(L),q=Math.sin(L);C.x=M*q,C.y=m*A,C.z=M*B,d.push(C.x,C.y,C.z),u.push(0,A,0),T.x=B*.5+.5,T.y=q*.5*A+.5,f.push(T.x,T.y),g++}for(let P=0;P<s;P++){let D=S+P,L=R+P;_===!0?h.push(L,L+1,D):h.push(L+1,L,D),v+=3}l.addGroup(p,v,_===!0?1:2),p+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Di=class i extends xi{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Ne=class i extends me{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=t/o,u=e/c,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let y=p*u-a;for(let w=0;w<l;w++){let _=w*d-r;g.push(_,-y,0),x.push(0,0,1),m.push(w/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<o;y++){let w=y+l*p,_=y+l*(p+1),S=y+1+l*(p+1),T=y+1+l*p;f.push(w,_,T),f.push(_,S,T)}this.setIndex(f),this.setAttribute("position",new Xt(g,3)),this.setAttribute("normal",new Xt(x,3)),this.setAttribute("uv",new Xt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},_i=class i extends me{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],c=[],l=[],h=[],d=t,u=(e-t)/s,f=new O,g=new Kt;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){let p=r+m/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<s;x++){let m=x*(n+1);for(let p=0;p<n;p++){let y=p+m,w=y,_=y+n+1,S=y+n+2,T=y+1;o.push(w,_,T),o.push(_,S,T)}}this.setIndex(o),this.setAttribute("position",new Xt(c,3)),this.setAttribute("normal",new Xt(l,3)),this.setAttribute("uv",new Xt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Mn=class i extends me{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],d=new O,u=new O,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let y=[],w=p/n,_=a+w*o,S=t*Math.cos(_),T=Math.sqrt(t*t-S*S),C=0;p===0&&a===0?C=.5/e:p===n&&c===Math.PI&&(C=-.5/e);for(let v=0;v<=e;v++){let M=v/e,A=s+M*r;d.x=-T*Math.cos(A),d.y=S,d.z=T*Math.sin(A),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(M+C,1-w),y.push(l++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){let w=h[p][y+1],_=h[p][y],S=h[p+1][y],T=h[p+1][y+1];(p!==0||a>0)&&f.push(w,_,T),(p!==n-1||c<Math.PI)&&f.push(_,S,T)}this.setIndex(f),this.setAttribute("position",new Xt(g,3)),this.setAttribute("normal",new Xt(x,3)),this.setAttribute("uv",new Xt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Hr=class i extends me{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let c=[],l=[],h=[],d=[],u=new O,f=new O,g=new O;for(let x=0;x<=n;x++){let m=a+x/n*o;for(let p=0;p<=s;p++){let y=p/s*r;f.x=(t+e*Math.cos(m))*Math.cos(y),f.y=(t+e*Math.cos(m))*Math.sin(y),f.z=e*Math.sin(m),l.push(f.x,f.y,f.z),u.x=t*Math.cos(y),u.y=t*Math.sin(y),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/s),d.push(x/n)}}for(let x=1;x<=n;x++)for(let m=1;m<=s;m++){let p=(s+1)*x+m-1,y=(s+1)*(x-1)+m-1,w=(s+1)*(x-1)+m,_=(s+1)*x+m;c.push(p,y,_),c.push(y,w,_)}this.setIndex(c),this.setAttribute("position",new Xt(l,3)),this.setAttribute("normal",new Xt(h,3)),this.setAttribute("uv",new Xt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function us(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Wd(s))s.isRenderTargetTexture?(Bt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Wd(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function rn(i){let t={};for(let e=0;e<i.length;e++){let n=us(i[e]);for(let s in n)t[s]=n[s]}return t}function Wd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function am(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Sh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}var Uf={clone:us,merge:rn},om=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ze=class extends mi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=om,this.fragmentShader=cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=us(t.uniforms),this.uniformsGroups=am(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Nt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Kt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new O().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Se().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Gt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new fe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},bo=class extends Ze{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},$e=class extends mi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tc,this.normalScale=new Kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Mo=class extends mi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},So=class extends mi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ks(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function ql(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var ki=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},To=class extends ki{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Jl,endingEnd:Jl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Kl:r=t,o=2*e-n;break;case Zl:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Kl:a=t,c=2*n-e;break;case Zl:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,p=-u*m+2*u*x-u*g,y=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*g+1,w=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let S=0;S!==o;++S)r[S]=p*a[h+S]+y*a[l+S]+w*a[c+S]+_*a[d+S];return r}},wo=class extends ki{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*d+a[c+u]*h;return r}},Eo=class extends ki{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ao=class extends ki{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-e)/(s-e),x=1-g;for(let m=0;m!==o;++m)r[m]=a[l+m]*x+a[c+m]*g;return r}let u=o*2,f=t-1;for(let g=0;g!==o;++g){let x=a[l+g],m=a[c+g],p=f*u+g*2,y=d[p],w=d[p+1],_=t*u+g*2,S=h[_],T=h[_+1],C=hm(n,e,y,S,s);r[g]=Ff(C,x,w,T,m)}return r}};function Ff(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function lm(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function hm(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=Ff(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let c=lm(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var Sn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ks(e,this.TimeBufferType),this.values=ks(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ks(t.times,Array),values:ks(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),ql(t.settings)&&(n.settings={inTangents:ks(t.settings.inTangents,Array),outTangents:ks(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Eo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new wo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new To(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ao(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ar:e=this.InterpolantFactoryMethodDiscrete;break;case mo:e=this.InterpolantFactoryMethodLinear;break;case so:e=this.InterpolantFactoryMethodSmooth;break;case Yl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Bt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ar;case this.InterpolantFactoryMethodLinear:return mo;case this.InterpolantFactoryMethodSmooth:return so;case this.InterpolantFactoryMethodBezier:return Yl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;ql(this.settings)&&(Xd(this.settings.inTangents,t),Xd(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ht("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ht("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ht("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){Ht("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&B0(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ht("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===so,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(s)c=!0;else{let d=o*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let x=e[d+g];if(x!==e[u+g]||x!==e[f+g]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,ql(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Xd(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Sn.prototype.ValueTypeName="";Sn.prototype.TimeBufferType=Float32Array;Sn.prototype.ValueBufferType=Float32Array;Sn.prototype.DefaultInterpolation=mo;var Ni=class extends Sn{constructor(t,e,n){super(t,e,n)}};Ni.prototype.ValueTypeName="bool";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=Ar;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var Co=class extends Sn{constructor(t,e,n,s){super(t,e,n,s)}};Co.prototype.ValueTypeName="color";var Ro=class extends Sn{constructor(t,e,n,s){super(t,e,n,s)}};Ro.prototype.ValueTypeName="number";var Po=class extends ki{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let h=l+o;l!==h;l+=4)Rn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Gr=class extends Sn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Po(this.times,this.values,this.getValueSize(),t)}};Gr.prototype.ValueTypeName="quaternion";Gr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ui=class extends Sn{constructor(t,e,n){super(t,e,n)}};Ui.prototype.ValueTypeName="string";Ui.prototype.ValueBufferType=Array;Ui.prototype.DefaultInterpolation=Ar;Ui.prototype.InterpolantFactoryMethodLinear=void 0;Ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Io=class extends Sn{constructor(t,e,n,s){super(t,e,n,s)}};Io.prototype.ValueTypeName="vector";var Lo=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Of=new Lo,Do=class{constructor(t){this.manager=t!==void 0?t:Of,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Do.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vr=class extends ke{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Fi=class extends Vr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},$l=new fe,qd=new O,$d=new O,ko=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Kt(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ws,this._frameExtents=new Kt(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;qd.setFromMatrixPosition(t.matrixWorld),e.position.copy(qd),$d.setFromMatrixPosition(t.target.matrixWorld),e.lookAt($d),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){$l.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix($l,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Bs||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply($l)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},no=new O,io=new Rn,Zn=new O,Wr=class extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(no,io,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(no,io,Zn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(no,io,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(no,io,Zn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ri=new O,Yd=new Kt,Jd=new Kt,Oe=class extends Wr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=go*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(wl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return go*2*Math.atan(Math.tan(wl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ri.x,Ri.y).multiplyScalar(-t/Ri.z),Ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ri.x,Ri.y).multiplyScalar(-t/Ri.z)}getViewSize(t,e){return this.getViewBounds(t,Yd,Jd),e.subVectors(Jd,Yd)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(wl*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var qs=class extends Wr{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ql=class extends ko{constructor(){super(new qs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Vn=class extends Vr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.target=new ke,this.shadow=new Ql}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Ns=-90,Us=1,No=class extends ke{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Oe(Ns,Us,t,e);s.layers=this.layers,this.add(s);let r=new Oe(Ns,Us,t,e);r.layers=this.layers,this.add(r);let a=new Oe(Ns,Us,t,e);a.layers=this.layers,this.add(a);let o=new Oe(Ns,Us,t,e);o.layers=this.layers,this.add(o);let c=new Oe(Ns,Us,t,e);c.layers=this.layers,this.add(c);let l=new Oe(Ns,Us,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Bs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Uo=class extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Th="\\[\\]\\.:\\/",um=new RegExp("["+Th+"]","g"),wh="[^"+Th+"]",dm="[^"+Th.replace("\\.","")+"]",fm=/((?:WC+[\/:])*)/.source.replace("WC",wh),pm=/(WCOD+)?/.source.replace("WCOD",dm),mm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wh),gm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wh),xm=new RegExp("^"+fm+pm+mm+gm+"$"),_m=["material","materials","bones","map"],th=class{constructor(t,e,n){let s=n||be.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},be=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(um,"")}static parseTrackName(t){let e=xm.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);_m.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Bt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Ht("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ht("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ht("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ht("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ht("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ht("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Ht("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;Ht("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ht("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ht("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};be.Composite=th;be.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};be.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};be.prototype.GetterByBindingType=[be.prototype._getValue_direct,be.prototype._getValue_array,be.prototype._getValue_arrayElement,be.prototype._getValue_toArray];be.prototype.SetterByBindingTypeAndVersioning=[[be.prototype._setValue_direct,be.prototype._setValue_direct_setNeedsUpdate,be.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[be.prototype._setValue_array,be.prototype._setValue_array_setNeedsUpdate,be.prototype._setValue_array_setMatrixWorldNeedsUpdate],[be.prototype._setValue_arrayElement,be.prototype._setValue_arrayElement_setNeedsUpdate,be.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[be.prototype._setValue_fromArray,be.prototype._setValue_fromArray_setNeedsUpdate,be.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Eb=new Float32Array(1);var Ih=class Ih{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Ih.prototype.isMatrix2=!0;var eh=Ih;function Eh(i,t,e,n){let s=vm(n);switch(e){case vh:return i*t;case Wo:return i*t/s.components*s.byteLength;case Xo:return i*t/s.components*s.byteLength;case Vi:return i*t*2/s.components*s.byteLength;case qo:return i*t*2/s.components*s.byteLength;case yh:return i*t*3/s.components*s.byteLength;case Ln:return i*t*4/s.components*s.byteLength;case $o:return i*t*4/s.components*s.byteLength;case Jr:case Kr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Zr:case jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Jo:case Zo:return Math.max(i,16)*Math.max(t,8)/4;case Yo:case Ko:return Math.max(i,8)*Math.max(t,8)/2;case jo:case Qo:case ec:case nc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case tc:case Qr:case ic:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case sc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case rc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ac:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case oc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case cc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case lc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case hc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case uc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case dc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case fc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case pc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case mc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case gc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case _c:case vc:case yc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case bc:case Mc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ta:case Sc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vm(i){switch(i){case xn:case mh:return{byteLength:1,components:1};case Ys:case gh:case qn:return{byteLength:2,components:1};case Go:case Vo:return{byteLength:2,components:4};case Xn:case Ho:case In:return{byteLength:4,components:1};case xh:case _h:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Bt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function ap(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Em(i){let t=new WeakMap;function e(o,c){let l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let x=d[f];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Am=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Rm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Im=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,km=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Um=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Om=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Gm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Vm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$m=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ym=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Jm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Km=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Zm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Qm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,eg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ng=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ig="gl_FragColor = linearToOutputTexel( gl_FragColor );",sg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ag=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,og=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ug=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,mg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_g=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,vg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,yg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,wg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Eg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ag=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rg=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Pg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ig=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ng=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ug=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Fg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Og=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Wg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,qg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$g=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Kg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Zg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ex=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ix=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ax=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ox=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,hx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ux=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,px=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_x=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Mx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ex=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ax=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Px=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,kx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Nx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ux=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ox=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Gx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$x=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Jx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,n_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,i_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,r_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,a_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:Am,alphahash_pars_fragment:Cm,alphamap_fragment:Rm,alphamap_pars_fragment:Pm,alphatest_fragment:Im,alphatest_pars_fragment:Lm,aomap_fragment:Dm,aomap_pars_fragment:km,batching_pars_vertex:Nm,batching_vertex:Um,begin_vertex:Fm,beginnormal_vertex:Om,bsdfs:Bm,iridescence_fragment:zm,bumpmap_pars_fragment:Hm,clipping_planes_fragment:Gm,clipping_planes_pars_fragment:Vm,clipping_planes_pars_vertex:Wm,clipping_planes_vertex:Xm,color_fragment:qm,color_pars_fragment:$m,color_pars_vertex:Ym,color_vertex:Jm,common:Km,cube_uv_reflection_fragment:Zm,defaultnormal_vertex:jm,displacementmap_pars_vertex:Qm,displacementmap_vertex:tg,emissivemap_fragment:eg,emissivemap_pars_fragment:ng,colorspace_fragment:ig,colorspace_pars_fragment:sg,envmap_fragment:rg,envmap_common_pars_fragment:ag,envmap_pars_fragment:og,envmap_pars_vertex:cg,envmap_physical_pars_fragment:vg,envmap_vertex:lg,fog_vertex:hg,fog_pars_vertex:ug,fog_fragment:dg,fog_pars_fragment:fg,gradientmap_pars_fragment:pg,lightmap_pars_fragment:mg,lights_lambert_fragment:gg,lights_lambert_pars_fragment:xg,lights_pars_begin:_g,lights_toon_fragment:yg,lights_toon_pars_fragment:bg,lights_phong_fragment:Mg,lights_phong_pars_fragment:Sg,lights_physical_fragment:Tg,lights_physical_pars_fragment:wg,lights_fragment_begin:Eg,lights_fragment_maps:Ag,lights_fragment_end:Cg,lightprobes_pars_fragment:Rg,logdepthbuf_fragment:Pg,logdepthbuf_pars_fragment:Ig,logdepthbuf_pars_vertex:Lg,logdepthbuf_vertex:Dg,map_fragment:kg,map_pars_fragment:Ng,map_particle_fragment:Ug,map_particle_pars_fragment:Fg,metalnessmap_fragment:Og,metalnessmap_pars_fragment:Bg,morphinstance_vertex:zg,morphcolor_vertex:Hg,morphnormal_vertex:Gg,morphtarget_pars_vertex:Vg,morphtarget_vertex:Wg,normal_fragment_begin:Xg,normal_fragment_maps:qg,normal_pars_fragment:$g,normal_pars_vertex:Yg,normal_vertex:Jg,normalmap_pars_fragment:Kg,clearcoat_normal_fragment_begin:Zg,clearcoat_normal_fragment_maps:jg,clearcoat_pars_fragment:Qg,iridescence_pars_fragment:tx,opaque_fragment:ex,packing:nx,premultiplied_alpha_fragment:ix,project_vertex:sx,dithering_fragment:rx,dithering_pars_fragment:ax,roughnessmap_fragment:ox,roughnessmap_pars_fragment:cx,shadowmap_pars_fragment:lx,shadowmap_pars_vertex:hx,shadowmap_vertex:ux,shadowmask_pars_fragment:dx,skinbase_vertex:fx,skinning_pars_vertex:px,skinning_vertex:mx,skinnormal_vertex:gx,specularmap_fragment:xx,specularmap_pars_fragment:_x,tonemapping_fragment:vx,tonemapping_pars_fragment:yx,transmission_fragment:bx,transmission_pars_fragment:Mx,uv_pars_fragment:Sx,uv_pars_vertex:Tx,uv_vertex:wx,worldpos_vertex:Ex,background_vert:Ax,background_frag:Cx,backgroundCube_vert:Rx,backgroundCube_frag:Px,cube_vert:Ix,cube_frag:Lx,depth_vert:Dx,depth_frag:kx,distance_vert:Nx,distance_frag:Ux,equirect_vert:Fx,equirect_frag:Ox,linedashed_vert:Bx,linedashed_frag:zx,meshbasic_vert:Hx,meshbasic_frag:Gx,meshlambert_vert:Vx,meshlambert_frag:Wx,meshmatcap_vert:Xx,meshmatcap_frag:qx,meshnormal_vert:$x,meshnormal_frag:Yx,meshphong_vert:Jx,meshphong_frag:Kx,meshphysical_vert:Zx,meshphysical_frag:jx,meshtoon_vert:Qx,meshtoon_frag:t_,points_vert:e_,points_frag:n_,shadow_vert:i_,shadow_frag:s_,sprite_vert:r_,sprite_frag:a_},ft={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new Kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},ii={basic:{uniforms:rn([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:rn([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Nt(0)},envMapIntensity:{value:1}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:rn([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:rn([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:rn([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new Nt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:rn([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:rn([ft.points,ft.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:rn([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:rn([ft.common,ft.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:rn([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:rn([ft.sprite,ft.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distance:{uniforms:rn([ft.common,ft.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distance_vert,fragmentShader:$t.distance_frag},shadow:{uniforms:rn([ft.lights,ft.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};ii.physical={uniforms:rn([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new Kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};var Ac={r:0,b:0,g:0},o_=new fe,op=new Gt;op.set(-1,0,0,0,1,0,0,0,1);function c_(i,t,e,n,s,r){let a=new Nt(0),o=s===!0?0:1,c,l,h=null,d=0,u=null;function f(y){let w=y.isScene===!0?y.background:null;if(w&&w.isTexture){let _=y.backgroundBlurriness>0;w=t.get(w,_)}return w}function g(y){let w=!1,_=f(y);_===null?m(a,o):_&&_.isColor&&(m(_,1),w=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(y,w){let _=f(w);_&&(_.isCubeTexture||_.mapping===$r)?(l===void 0&&(l=new Ot(new Pn(1,1,1),new Ze({name:"BackgroundCubeMaterial",uniforms:us(ii.backgroundCube.uniforms),vertexShader:ii.backgroundCube.vertexShader,fragmentShader:ii.backgroundCube.fragmentShader,side:je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(o_.makeRotationFromEuler(w.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(op),l.material.toneMapped=ee.getTransfer(_.colorSpace)!==he,(h!==_||d!==_.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Ot(new Ne(2,2),new Ze({name:"BackgroundMaterial",uniforms:us(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=ee.getTransfer(_.colorSpace)!==he,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,w){y.getRGB(Ac,Sh(i)),e.buffers.color.setClear(Ac.r,Ac.g,Ac.b,w,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,w=1){a.set(y),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:g,addToRenderList:x,dispose:p}}function l_(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(R,P,D,L,B){let q=!1,Y=d(R,L,D,P);r!==Y&&(r=Y,l(r.object)),q=f(R,L,D,B),q&&g(R,L,D,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,_(R,P,D,L),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return i.createVertexArray()}function l(R){return i.bindVertexArray(R)}function h(R){return i.deleteVertexArray(R)}function d(R,P,D,L){let B=L.wireframe===!0,q=n[P.id];q===void 0&&(q={},n[P.id]=q);let Y=R.isInstancedMesh===!0?R.id:0,st=q[Y];st===void 0&&(st={},q[Y]=st);let X=st[D.id];X===void 0&&(X={},st[D.id]=X);let Q=X[B];return Q===void 0&&(Q=u(c()),X[B]=Q),Q}function u(R){let P=[],D=[],L=[];for(let B=0;B<e;B++)P[B]=0,D[B]=0,L[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:D,attributeDivisors:L,object:R,attributes:{},index:null}}function f(R,P,D,L){let B=r.attributes,q=P.attributes,Y=0,st=D.getAttributes();for(let X in st)if(st[X].location>=0){let nt=B[X],yt=q[X];if(yt===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(yt=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(yt=R.instanceColor)),nt===void 0||nt.attribute!==yt||yt&&nt.data!==yt.data)return!0;Y++}return r.attributesNum!==Y||r.index!==L}function g(R,P,D,L){let B={},q=P.attributes,Y=0,st=D.getAttributes();for(let X in st)if(st[X].location>=0){let nt=q[X];nt===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(nt=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(nt=R.instanceColor));let yt={};yt.attribute=nt,nt&&nt.data&&(yt.data=nt.data),B[X]=yt,Y++}r.attributes=B,r.attributesNum=Y,r.index=L}function x(){let R=r.newAttributes;for(let P=0,D=R.length;P<D;P++)R[P]=0}function m(R){p(R,0)}function p(R,P){let D=r.newAttributes,L=r.enabledAttributes,B=r.attributeDivisors;D[R]=1,L[R]===0&&(i.enableVertexAttribArray(R),L[R]=1),B[R]!==P&&(i.vertexAttribDivisor(R,P),B[R]=P)}function y(){let R=r.newAttributes,P=r.enabledAttributes;for(let D=0,L=P.length;D<L;D++)P[D]!==R[D]&&(i.disableVertexAttribArray(D),P[D]=0)}function w(R,P,D,L,B,q,Y){Y===!0?i.vertexAttribIPointer(R,P,D,B,q):i.vertexAttribPointer(R,P,D,L,B,q)}function _(R,P,D,L){x();let B=L.attributes,q=D.getAttributes(),Y=P.defaultAttributeValues;for(let st in q){let X=q[st];if(X.location>=0){let Q=B[st];if(Q===void 0&&(st==="instanceMatrix"&&R.instanceMatrix&&(Q=R.instanceMatrix),st==="instanceColor"&&R.instanceColor&&(Q=R.instanceColor)),Q!==void 0){let nt=Q.normalized,yt=Q.itemSize,wt=t.get(Q);if(wt===void 0)continue;let ue=wt.buffer,Zt=wt.type,re=wt.bytesPerElement,K=Zt===i.INT||Zt===i.UNSIGNED_INT||Q.gpuType===Ho;if(Q.isInterleavedBufferAttribute){let et=Q.data,St=et.stride,Vt=Q.offset;if(et.isInstancedInterleavedBuffer){for(let bt=0;bt<X.locationSize;bt++)p(X.location+bt,et.meshPerAttribute);R.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let bt=0;bt<X.locationSize;bt++)m(X.location+bt);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let bt=0;bt<X.locationSize;bt++)w(X.location+bt,yt/X.locationSize,Zt,nt,St*re,(Vt+yt/X.locationSize*bt)*re,K)}else{if(Q.isInstancedBufferAttribute){for(let et=0;et<X.locationSize;et++)p(X.location+et,Q.meshPerAttribute);R.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let et=0;et<X.locationSize;et++)m(X.location+et);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let et=0;et<X.locationSize;et++)w(X.location+et,yt/X.locationSize,Zt,nt,yt*re,yt/X.locationSize*et*re,K)}}else if(Y!==void 0){let nt=Y[st];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(X.location,nt);break;case 3:i.vertexAttrib3fv(X.location,nt);break;case 4:i.vertexAttrib4fv(X.location,nt);break;default:i.vertexAttrib1fv(X.location,nt)}}}}y()}function S(){M();for(let R in n){let P=n[R];for(let D in P){let L=P[D];for(let B in L){let q=L[B];for(let Y in q)h(q[Y].object),delete q[Y];delete L[B]}}delete n[R]}}function T(R){if(n[R.id]===void 0)return;let P=n[R.id];for(let D in P){let L=P[D];for(let B in L){let q=L[B];for(let Y in q)h(q[Y].object),delete q[Y];delete L[B]}}delete n[R.id]}function C(R){for(let P in n){let D=n[P];for(let L in D){let B=D[L];if(B[R.id]===void 0)continue;let q=B[R.id];for(let Y in q)h(q[Y].object),delete q[Y];delete B[R.id]}}}function v(R){for(let P in n){let D=n[P],L=R.isInstancedMesh===!0?R.id:0,B=D[L];if(B!==void 0){for(let q in B){let Y=B[q];for(let st in Y)h(Y[st].object),delete Y[st];delete B[q]}delete D[L],Object.keys(D).length===0&&delete n[P]}}}function M(){A(),a=!0,r!==s&&(r=s,l(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:M,resetDefaultState:A,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function h_(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let f=0;f<h;f++)u+=l[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function u_(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Ln&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let v=C===qn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==xn&&C!==In&&!v&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(Bt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Bt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:_,maxSamples:S,samples:T}}function d_(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Bn,o=new Gt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let y=r?0:n,w=y*4,_=p.clippingState||null;c.value=_,_=h(g,u,w,f);for(let S=0;S!==w;++S)_[S]=e[S];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=f+x*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,_=f;w!==x;++w,_+=4)a.copy(d[w]).applyMatrix4(y,o),a.normal.toArray(m,_),m[_+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}var Zs=4,f_=6,p_=20,m_=256,ia=new qs,Bf=new Nt,Lh=null,Dh=0,kh=0,Nh=!1,g_=new O,ds=new O,Wi=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=g_}=r;Lh=this._renderer.getRenderTarget(),Dh=this._renderer.getActiveCubeFace(),kh=this._renderer.getActiveMipmapLevel(),Nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Lh,Dh,kh),this._renderer.xr.enabled=Nh,t.scissorTest=!1,Ks(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===zi||t.mapping===hs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Lh=this._renderer.getRenderTarget(),Dh=this._renderer.getActiveCubeFace(),kh=this._renderer.getActiveMipmapLevel(),Nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ke,minFilter:Ke,generateMipmaps:!1,type:qn,format:Ln,colorSpace:Cr,depthBuffer:!1},s=zf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zf(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=x_(r)),this._blurMaterial=v_(r,t,e),this._ggxMaterial=__(r,t,e)}return s}_compileMaterial(t){let e=new Ot(new me,t);this._renderer.compile(e,ia)}_sceneToCubeUV(t,e,n,s,r){let c=new Oe(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Bf),d.toneMapping=Wn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ot(new Pn,new se({name:"PMREM.Background",side:je,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,p=!1,y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,p=!0):(m.color.copy(Bf),p=!0);for(let w=0;w<6;w++){let _=w%3;_===0?(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[w],r.y,r.z)):_===1?(c.up.set(0,0,l[w]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[w],r.z)):(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[w]));let S=this._cubeSize;Ks(s,_*S,w>2?S:0,S,S),d.setRenderTarget(s),p&&d.render(x,c),d.render(t,c)}d.toneMapping=f,d.autoClear=u,t.background=y}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===zi||t.mapping===hs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;Ks(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,ia)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=l*1.25,f=d*u,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-Zs?n-g+Zs:0),p=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=g-e,Ks(r,m,p,3*x,2*x),s.setRenderTarget(r),s.render(o,ia),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,Ks(t,m,p,3*x,2*x),s.setRenderTarget(t),s.render(o,ia)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-Zs?s-this._lodMax+Zs:0),u=4*(this._cubeSize-h);Ks(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(c,ia)}};function x_(i){let t=[],e=[],n=i,s=i-Zs+1+f_;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,u=6,f=3,g=new Float32Array(f*u*d),x=new Float32Array(f*u*d);for(let p=0;p<d;p++){let y=p%3*2/3-1,w=p>2?0:-1,_=[y,w,0,y+2/3,w,0,y+2/3,w+1,0,y,w,0,y+2/3,w+1,0,y,w+1,0];g.set(_,f*u*p);for(let S=0;S<u;S++){let T=h[S*2]*2-1,C=h[S*2+1]*2-1;p===0?ds.set(1,C,T):p===1?ds.set(-T,1,-C):p===2?ds.set(-T,C,1):p===3?ds.set(-1,C,-T):p===4?ds.set(-T,-1,C):ds.set(T,C,-1),ds.toArray(x,(p*u+S)*f)}}let m=new me;m.setAttribute("position",new we(g,f)),m.setAttribute("outputDirection",new we(x,f)),e.push(new Ot(m,null)),n>Zs&&n--}return{lodMeshes:e,sizeLods:t}}function zf(i,t,e){let n=new sn(i,t,e);return n.texture.mapping=$r,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ks(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function __(i,t,e){return new Ze({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:m_,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ic(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function v_(i,t,e){return new Ze({name:"SphericalGaussianBlur",defines:{SAMPLES:p_,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ic(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Hf(){return new Ze({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ic(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Gf(){return new Ze({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ic(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Ic(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Rc=class extends sn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Br(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Pn(5,5,5),r=new Ze({name:"CubemapFromEquirect",uniforms:us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:je,blending:ei});r.uniforms.tEquirect.value=e;let a=new Ot(s,r),o=e.minFilter;return e.minFilter===Hi&&(e.minFilter=Ke),new No(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function y_(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===Oo||f===Bo)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let x=new Rc(g.height);return x.fromEquirectangularTexture(i,u),t.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===Oo||f===Bo,x=f===zi||f===hs;if(g||x){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Wi(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let y=u.image;return g&&y&&y.height>0||x&&y&&c(y)?(n===null&&(n=new Wi(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Oo?u.mapping=zi:f===Bo&&(u.mapping=hs),u}function c(u){let f=0,g=6;for(let x=0;x<g;x++)u[x]!==void 0&&f++;return f===g}function l(u){let f=u.target;f.removeEventListener("dispose",l);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function b_(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&is("WebGLRenderer: "+n+" extension not supported."),s}}}function M_(i,t,e,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function c(d){let u=d.attributes;for(let f in u)t.update(u[f],i.ARRAY_BUFFER)}function l(d){let u=[],f=d.index,g=d.attributes.position,x=0;if(g===void 0)return;if(f!==null){let y=f.array;x=f.version;for(let w=0,_=y.length;w<_;w+=3){let S=y[w+0],T=y[w+1],C=y[w+2];u.push(S,T,T,C,C,S)}}else{let y=g.array;x=g.version;for(let w=0,_=y.length/3-1;w<_;w+=3){let S=w+0,T=w+1,C=w+2;u.push(S,T,T,C,C,S)}}let m=new(g.count>=65535?Ur:Nr)(u,1);m.version=x;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function S_(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,u){i.drawElements(n,u,r,d*a),e.update(u,n,1)}function l(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let x=0;for(let m=0;m<f;m++)x+=u[m];e.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function T_(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Ht("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function w_(i,t,e){let n=new WeakMap,s=new Se;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let M=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],w=0;f===!0&&(w=1),g===!0&&(w=2),x===!0&&(w=3);let _=o.attributes.position.count*w,S=1;_>t.maxTextureSize&&(S=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let T=new Float32Array(_*S*4*d),C=new Ir(T,_,S,d);C.type=In,C.needsUpdate=!0;let v=w*4;for(let A=0;A<d;A++){let R=m[A],P=p[A],D=y[A],L=_*S*4*A;for(let B=0;B<R.count;B++){let q=B*v;f===!0&&(s.fromBufferAttribute(R,B),T[L+q+0]=s.x,T[L+q+1]=s.y,T[L+q+2]=s.z,T[L+q+3]=0),g===!0&&(s.fromBufferAttribute(P,B),T[L+q+4]=s.x,T[L+q+5]=s.y,T[L+q+6]=s.z,T[L+q+7]=0),x===!0&&(s.fromBufferAttribute(D,B),T[L+q+8]=s.x,T[L+q+9]=s.y,T[L+q+10]=s.z,T[L+q+11]=D.itemSize===4?s.w:1)}}u={count:d,texture:C,size:new Kt(_,S)},n.set(o,u),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function E_(i,t,e,n,s){let r=new WeakMap;function a(l){let h=s.render.frame,d=l.geometry,u=t.get(l,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var A_={[ch]:"LINEAR_TONE_MAPPING",[lh]:"REINHARD_TONE_MAPPING",[hh]:"CINEON_TONE_MAPPING",[qr]:"ACES_FILMIC_TONE_MAPPING",[dh]:"AGX_TONE_MAPPING",[fh]:"NEUTRAL_TONE_MAPPING",[uh]:"CUSTOM_TONE_MAPPING"};function C_(i,t,e,n,s,r){let a=new sn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new me;l.setAttribute("position",new Xt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Xt([0,2,0,0,2,0],2));let h=new bo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ot(l,h),u=new qs(-1,1,1,-1,0,1),f=null,g=null,x=!1,m,p=null,y=[],w=!1;this.setSize=function(_,S){a.setSize(_,S),o!==null&&o.setSize(_,S),c!==null&&c.setSize(_,S);for(let T=0;T<y.length;T++){let C=y[T];C.setSize&&C.setSize(_,S)}},this.setEffects=function(_){y=_,w=y.length>0&&y[0].isRenderPass===!0;let S=a.width,T=a.height;y.length>0&&o===null&&(o=new sn(S,T,{type:qn,depthBuffer:!1,stencilBuffer:!1}),c=new sn(S,T,{type:qn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<y.length;C++){let v=y[C];v.setSize&&v.setSize(S,T)}},this.begin=function(_,S){if(x||_.toneMapping===Wn&&y.length===0)return!1;if(p=S,S!==null){let T=S.width,C=S.height;(a.width!==T||a.height!==C)&&this.setSize(T,C)}return w===!1&&_.setRenderTarget(a),m=_.toneMapping,_.toneMapping=Wn,!0},this.hasRenderPass=function(){return w},this.end=function(_,S){_.toneMapping=m,x=!0;let T=a,C=o;for(let v=0;v<y.length;v++){let M=y[v];M.enabled!==!1&&(M.render(_,C,T,S),M.needsSwap!==!1&&(T=C,C=C===o?c:o))}if(f!==_.outputColorSpace||g!==_.toneMapping){f=_.outputColorSpace,g=_.toneMapping,h.defines={},ee.getTransfer(f)===he&&(h.defines.SRGB_TRANSFER="");let v=A_[g];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=T.texture,_.setRenderTarget(p),_.render(d,u),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var cp=new hn,Oh=new Li(1,1),lp=new Ir,hp=new vo,up=new Br,Vf=[],Wf=[],Xf=new Float32Array(16),qf=new Float32Array(9),$f=new Float32Array(4);function Qs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Vf[s];if(r===void 0&&(r=new Float32Array(s),Vf[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ze(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Lc(i,t){let e=Wf[t];e===void 0&&(e=new Int32Array(t),Wf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function R_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function P_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2fv(this.addr,t),ze(e,t)}}function I_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;i.uniform3fv(this.addr,t),ze(e,t)}}function L_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4fv(this.addr,t),ze(e,t)}}function D_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;$f.set(n),i.uniformMatrix2fv(this.addr,!1,$f),ze(e,n)}}function k_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;qf.set(n),i.uniformMatrix3fv(this.addr,!1,qf),ze(e,n)}}function N_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;Xf.set(n),i.uniformMatrix4fv(this.addr,!1,Xf),ze(e,n)}}function U_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function F_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2iv(this.addr,t),ze(e,t)}}function O_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3iv(this.addr,t),ze(e,t)}}function B_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4iv(this.addr,t),ze(e,t)}}function z_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function H_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2uiv(this.addr,t),ze(e,t)}}function G_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3uiv(this.addr,t),ze(e,t)}}function V_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4uiv(this.addr,t),ze(e,t)}}function W_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Oh.compareFunction=e.isReversedDepthBuffer()?Ec:wc,r=Oh):r=cp,e.setTexture2D(t||r,s)}function X_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||hp,s)}function q_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||up,s)}function $_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||lp,s)}function Y_(i){switch(i){case 5126:return R_;case 35664:return P_;case 35665:return I_;case 35666:return L_;case 35674:return D_;case 35675:return k_;case 35676:return N_;case 5124:case 35670:return U_;case 35667:case 35671:return F_;case 35668:case 35672:return O_;case 35669:case 35673:return B_;case 5125:return z_;case 36294:return H_;case 36295:return G_;case 36296:return V_;case 35678:case 36198:case 36298:case 36306:case 35682:return W_;case 35679:case 36299:case 36307:return X_;case 35680:case 36300:case 36308:case 36293:return q_;case 36289:case 36303:case 36311:case 36292:return $_}}function J_(i,t){i.uniform1fv(this.addr,t)}function K_(i,t){let e=Qs(t,this.size,2);i.uniform2fv(this.addr,e)}function Z_(i,t){let e=Qs(t,this.size,3);i.uniform3fv(this.addr,e)}function j_(i,t){let e=Qs(t,this.size,4);i.uniform4fv(this.addr,e)}function Q_(i,t){let e=Qs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function tv(i,t){let e=Qs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function ev(i,t){let e=Qs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function nv(i,t){i.uniform1iv(this.addr,t)}function iv(i,t){i.uniform2iv(this.addr,t)}function sv(i,t){i.uniform3iv(this.addr,t)}function rv(i,t){i.uniform4iv(this.addr,t)}function av(i,t){i.uniform1uiv(this.addr,t)}function ov(i,t){i.uniform2uiv(this.addr,t)}function cv(i,t){i.uniform3uiv(this.addr,t)}function lv(i,t){i.uniform4uiv(this.addr,t)}function hv(i,t,e){let n=this.cache,s=t.length,r=Lc(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Oh:a=cp;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function uv(i,t,e){let n=this.cache,s=t.length,r=Lc(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||hp,r[a])}function dv(i,t,e){let n=this.cache,s=t.length,r=Lc(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||up,r[a])}function fv(i,t,e){let n=this.cache,s=t.length,r=Lc(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||lp,r[a])}function pv(i){switch(i){case 5126:return J_;case 35664:return K_;case 35665:return Z_;case 35666:return j_;case 35674:return Q_;case 35675:return tv;case 35676:return ev;case 5124:case 35670:return nv;case 35667:case 35671:return iv;case 35668:case 35672:return sv;case 35669:case 35673:return rv;case 5125:return av;case 36294:return ov;case 36295:return cv;case 36296:return lv;case 35678:case 36198:case 36298:case 36306:case 35682:return hv;case 35679:case 36299:case 36307:return uv;case 35680:case 36300:case 36308:case 36293:return dv;case 36289:case 36303:case 36311:case 36292:return fv}}var Bh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Y_(e.type)}},zh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=pv(e.type)}},Hh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Uh=/(\w+)(\])?(\[|\.)?/g;function Yf(i,t){i.seq.push(t),i.map[t.id]=t}function mv(i,t,e){let n=i.name,s=n.length;for(Uh.lastIndex=0;;){let r=Uh.exec(n),a=Uh.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Yf(e,l===void 0?new Bh(o,i,t):new zh(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new Hh(o),Yf(e,d)),e=d}}}var js=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);mv(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Jf(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var gv=37297,xv=0;function _v(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Kf=new Gt;function vv(i){ee._getMatrix(Kf,ee.workingColorSpace,i);let t=`mat3( ${Kf.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case Rr:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return Bt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Zf(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+_v(i.getShaderSource(t),o)}else return r}function yv(i,t){let e=vv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var bv={[ch]:"Linear",[lh]:"Reinhard",[hh]:"Cineon",[qr]:"ACESFilmic",[dh]:"AgX",[fh]:"Neutral",[uh]:"Custom"};function Mv(i,t){let e=bv[t];return e===void 0?(Bt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Cc=new O;function Sv(){ee.getLuminanceCoefficients(Cc);let i=Cc.x.toFixed(4),t=Cc.y.toFixed(4),e=Cc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ra).join(`
`)}function wv(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Ev(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ra(i){return i!==""}function jf(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Qf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Av=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gh(i){return i.replace(Av,Rv)}var Cv=new Map;function Rv(i,t){let e=$t[t];if(e===void 0){let n=Cv.get(t);if(n!==void 0)e=$t[n],Bt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Gh(e)}var Pv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tp(i){return i.replace(Pv,Iv)}function Iv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ep(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Lv={[Xr]:"SHADOWMAP_TYPE_PCF",[$s]:"SHADOWMAP_TYPE_VSM"};function Dv(i){return Lv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var kv={[zi]:"ENVMAP_TYPE_CUBE",[hs]:"ENVMAP_TYPE_CUBE",[$r]:"ENVMAP_TYPE_CUBE_UV"};function Nv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":kv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Uv={[hs]:"ENVMAP_MODE_REFRACTION"};function Fv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Uv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Ov={[oh]:"ENVMAP_BLENDING_MULTIPLY",[_f]:"ENVMAP_BLENDING_MIX",[vf]:"ENVMAP_BLENDING_ADD"};function Bv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Ov[i.combine]||"ENVMAP_BLENDING_NONE"}function zv(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Hv(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=Dv(e),l=Nv(e),h=Fv(e),d=Bv(e),u=zv(e),f=Tv(e),g=wv(r),x=s.createProgram(),m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ra).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ra).join(`
`),p.length>0&&(p+=`
`)):(m=[ep(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ra).join(`
`),p=[ep(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wn?"#define TONE_MAPPING":"",e.toneMapping!==Wn?$t.tonemapping_pars_fragment:"",e.toneMapping!==Wn?Mv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,yv("linearToOutputTexel",e.outputColorSpace),Sv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ra).join(`
`)),a=Gh(a),a=jf(a,e),a=Qf(a,e),o=Gh(o),o=jf(o,e),o=Qf(o,e),a=tp(a),o=tp(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===bh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===bh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=y+m+a,_=y+p+o,S=Jf(s,s.VERTEX_SHADER,w),T=Jf(s,s.FRAGMENT_SHADER,_);s.attachShader(x,S),s.attachShader(x,T),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(R){if(i.debug.checkShaderErrors){let P=s.getProgramInfoLog(x)||"",D=s.getShaderInfoLog(S)||"",L=s.getShaderInfoLog(T)||"",B=P.trim(),q=D.trim(),Y=L.trim(),st=!0,X=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(st=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,S,T);else{let Q=Zf(s,S,"vertex"),nt=Zf(s,T,"fragment");Ht("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+B+`
`+Q+`
`+nt)}else B!==""?Bt("WebGLProgram: Program Info Log:",B):(q===""||Y==="")&&(X=!1);X&&(R.diagnostics={runnable:st,programLog:B,vertexShader:{log:q,prefix:m},fragmentShader:{log:Y,prefix:p}})}s.deleteShader(S),s.deleteShader(T),v=new js(s,x),M=Ev(s,x)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(x,gv)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=xv++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=T,this}var Gv=0,Vh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Wh(t),e.set(t,n)),n}},Wh=class{constructor(t){this.id=Gv++,this.code=t,this.usedTimes=0}};function Vv(i){return i===Vi||i===Qr||i===ta}function Wv(i,t,e,n,s,r){let a=new Lr,o=new Vh,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function x(v,M,A,R,P,D){let L=R.fog,B=P.geometry,q=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,Y=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,st=t.get(v.envMap||q,Y),X=st&&st.mapping===$r?st.image.height:null,Q=f[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Bt("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));let nt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,yt=nt!==void 0?nt.length:0,wt=0;B.morphAttributes.position!==void 0&&(wt=1),B.morphAttributes.normal!==void 0&&(wt=2),B.morphAttributes.color!==void 0&&(wt=3);let ue,Zt,re,K;if(Q){let _e=ii[Q];ue=_e.vertexShader,Zt=_e.fragmentShader}else{ue=v.vertexShader,Zt=v.fragmentShader;let _e=o.getVertexShaderStage(v),ce=o.getFragmentShaderStage(v);o.update(v,_e,ce),re=_e.id,K=ce.id}let et=i.getRenderTarget(),St=i.state.buffers.depth.getReversed(),Vt=P.isInstancedMesh===!0,bt=P.isBatchedMesh===!0,Jt=!!v.map,Fe=!!v.matcap,jt=!!st,ae=!!v.aoMap,xe=!!v.lightMap,te=!!v.bumpMap&&v.wireframe===!1,Me=!!v.normalMap,We=!!v.displacementMap,mn=!!v.emissiveMap,Te=!!v.metalnessMap,Ie=!!v.roughnessMap,F=v.anisotropy>0,Qe=v.clearcoat>0,de=v.dispersion>0,I=v.retroreflectivity>0,b=v.iridescence>0,z=v.sheen>0,V=v.transmission>0,J=F&&!!v.anisotropyMap,at=Qe&&!!v.clearcoatMap,ot=Qe&&!!v.clearcoatNormalMap,Z=Qe&&!!v.clearcoatRoughnessMap,tt=b&&!!v.iridescenceMap,ct=b&&!!v.iridescenceThicknessMap,Lt=z&&!!v.sheenColorMap,dt=z&&!!v.sheenRoughnessMap,lt=!!v.specularMap,Dt=!!v.specularColorMap,Ut=!!v.specularIntensityMap,Wt=V&&!!v.transmissionMap,U=V&&!!v.thicknessMap,ht=!!v.gradientMap,j=!!v.alphaMap,ut=v.alphaTest>0,xt=!!v.alphaHash,it=!!v.extensions,kt=Wn;v.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(kt=i.toneMapping);let Pt={shaderID:Q,shaderType:v.type,shaderName:v.name,vertexShader:ue,fragmentShader:Zt,defines:v.defines,customVertexShaderID:re,customFragmentShaderID:K,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:bt,batchingColor:bt&&P._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&P.instanceColor!==null,instancingMorph:Vt&&P.morphTexture!==null,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:ee.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Jt,matcap:Fe,envMap:jt,envMapMode:jt&&st.mapping,envMapCubeUVHeight:X,aoMap:ae,lightMap:xe,bumpMap:te,normalMap:Me,displacementMap:We,emissiveMap:mn,normalMapObjectSpace:Me&&v.normalMapType===Mf,normalMapTangentSpace:Me&&v.normalMapType===Tc,packedNormalMap:Me&&v.normalMapType===Tc&&Vv(v.normalMap.format),metalnessMap:Te,roughnessMap:Ie,anisotropy:F,anisotropyMap:J,clearcoat:Qe,clearcoatMap:at,clearcoatNormalMap:ot,clearcoatRoughnessMap:Z,dispersion:de,retroreflection:I,iridescence:b,iridescenceMap:tt,iridescenceThicknessMap:ct,sheen:z,sheenColorMap:Lt,sheenRoughnessMap:dt,specularMap:lt,specularColorMap:Dt,specularIntensityMap:Ut,transmission:V,transmissionMap:Wt,thicknessMap:U,gradientMap:ht,opaque:v.transparent===!1&&v.blending===Bi&&v.alphaToCoverage===!1,alphaMap:j,alphaTest:ut,alphaHash:xt,combine:v.combine,mapUv:Jt&&g(v.map.channel),aoMapUv:ae&&g(v.aoMap.channel),lightMapUv:xe&&g(v.lightMap.channel),bumpMapUv:te&&g(v.bumpMap.channel),normalMapUv:Me&&g(v.normalMap.channel),displacementMapUv:We&&g(v.displacementMap.channel),emissiveMapUv:mn&&g(v.emissiveMap.channel),metalnessMapUv:Te&&g(v.metalnessMap.channel),roughnessMapUv:Ie&&g(v.roughnessMap.channel),anisotropyMapUv:J&&g(v.anisotropyMap.channel),clearcoatMapUv:at&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ot&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:tt&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:Lt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:dt&&g(v.sheenRoughnessMap.channel),specularMapUv:lt&&g(v.specularMap.channel),specularColorMapUv:Dt&&g(v.specularColorMap.channel),specularIntensityMapUv:Ut&&g(v.specularIntensityMap.channel),transmissionMapUv:Wt&&g(v.transmissionMap.channel),thicknessMapUv:U&&g(v.thicknessMap.channel),alphaMapUv:j&&g(v.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Me||F),vertexNormals:!!B.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!B.attributes.uv&&(Jt||j),fog:!!L,useFog:v.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||B.attributes.normal===void 0&&Me===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:St,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:wt,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:kt,decodeVideoTexture:Jt&&v.map.isVideoTexture===!0&&ee.getTransfer(v.map.colorSpace)===he,decodeVideoTextureEmissive:mn&&v.emissiveMap.isVideoTexture===!0&&ee.getTransfer(v.emissiveMap.colorSpace)===he,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Re,flipSided:v.side===je,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:it&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&v.extensions.multiDraw===!0||bt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Pt.vertexUv1s=c.has(1),Pt.vertexUv2s=c.has(2),Pt.vertexUv3s=c.has(3),c.clear(),Pt}function m(v){let M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(let A in v.defines)M.push(A),M.push(v.defines[A]);return v.isRawShaderMaterial===!1&&(p(M,v),y(M,v),M.push(i.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function p(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapCubeUVHeight),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.morphAttributeCount),v.push(M.numSunLights),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numSunLightShadows),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function y(v,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function w(v){let M=f[v.type],A;if(M){let R=ii[M];A=Uf.clone(R.uniforms)}else A=v.uniforms;return A}function _(v,M){let A=h.get(M);return A!==void 0?++A.usedTimes:(A=new Hv(i,M,v,s),l.push(A),h.set(M,A)),A}function S(v){if(--v.usedTimes===0){let M=l.indexOf(v);l[M]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function T(v){o.remove(v)}function C(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:w,acquireProgram:_,releaseProgram:S,releaseShaderCache:T,programs:l,dispose:C}}function Xv(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function qv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function np(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function ip(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,x,m,p){let y=i[t];return y===void 0?(y={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:p},i[t]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=g,y.materialVariant=a(u),y.groupOrder=x,y.renderOrder=u.renderOrder,y.z=m,y.group=p),t++,y}function c(u,f,g,x,m,p,y){y.reversedDepth===!0&&(m=-m);let w=o(u,f,g,x,m,p);g.transmission>0?n.push(w):g.transparent===!0?s.push(w):e.push(w)}function l(u,f,g,x,m,p){let y=o(u,f,g,x,m,p);g.transmission>0?n.unshift(y):g.transparent===!0?s.unshift(y):e.unshift(y)}function h(u,f){e.length>1&&e.sort(u||qv),n.length>1&&n.sort(f||np),s.length>1&&s.sort(f||np)}function d(){for(let u=t,f=i.length;u<f;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function $v(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new ip,i.set(n,[a])):s>=r.length?(a=new ip,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Yv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new O,color:new Nt};break;case"SpotLight":e={position:new O,direction:new O,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new O,halfWidth:new O,halfHeight:new O};break}return i[t.id]=e,e}}}function Jv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Kv=0;function Zv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function jv(i){let t=new Yv,e=Jv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new O);let s=new O,r=new fe,a=new fe;function o(l){let h=0,d=0,u=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,y=0,w=0,_=0,S=0,T=0,C=0,v=0,M=0,A=0;l.sort(Zv);for(let P=0,D=l.length;P<D;P++){let L=l[P],B=L.color,q=L.intensity,Y=L.distance,st=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Vi?st=L.shadow.map.texture:st=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=B.r*q,d+=B.g*q,u+=B.b*q;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],q);A++}else if(L.isSunLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let Q=L.shadow,nt=e.get(L);nt.shadowIntensity=Q.intensity,nt.shadowBias=Q.bias,nt.shadowNormalBias=Q.normalBias,nt.shadowRadius=Q.radius,nt.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[g]=nt,n.sunShadowMap[g]=st;let yt=Q.getViewportCount();for(let wt=0;wt<yt;wt++)n.sunShadowMatrix[x+wt]=Q.getMatrix(wt),n.sunShadowCascade[x+wt]=Q._cascadeData[wt];x+=yt,g++}n.sun[f]=X,f++}else if(L.isDirectionalLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let Q=L.shadow,nt=e.get(L);nt.shadowIntensity=Q.intensity,nt.shadowBias=Q.bias,nt.shadowNormalBias=Q.normalBias,nt.shadowRadius=Q.radius,nt.shadowMapSize=Q.mapSize,n.directionalShadow[m]=nt,n.directionalShadowMap[m]=st,n.directionalShadowMatrix[m]=L.shadow.matrix,S++}n.directional[m]=X,m++}else if(L.isSpotLight){let X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(B).multiplyScalar(q),X.distance=Y,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[y]=X;let Q=L.shadow;if(L.map&&(n.spotLightMap[v]=L.map,v++,Q.updateMatrices(L),L.castShadow&&M++),n.spotLightMatrix[y]=Q.matrix,L.castShadow){let nt=e.get(L);nt.shadowIntensity=Q.intensity,nt.shadowBias=Q.bias,nt.shadowNormalBias=Q.normalBias,nt.shadowRadius=Q.radius,nt.shadowMapSize=Q.mapSize,n.spotShadow[y]=nt,n.spotShadowMap[y]=st,C++}y++}else if(L.isRectAreaLight){let X=t.get(L);X.color.copy(B).multiplyScalar(q),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[w]=X,w++}else if(L.isPointLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){let Q=L.shadow,nt=e.get(L);nt.shadowIntensity=Q.intensity,nt.shadowBias=Q.bias,nt.shadowNormalBias=Q.normalBias,nt.shadowRadius=Q.radius,nt.shadowMapSize=Q.mapSize,nt.shadowCameraNear=Q.camera.near,nt.shadowCameraFar=Q.camera.far,n.pointShadow[p]=nt,n.pointShadowMap[p]=st,n.pointShadowMatrix[p]=L.shadow.matrix,T++}n.point[p]=X,p++}else if(L.isHemisphereLight){let X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(q),X.groundColor.copy(L.groundColor).multiplyScalar(q),n.hemi[_]=X,_++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ft.LTC_FLOAT_1,n.rectAreaLTC2=ft.LTC_FLOAT_2):(n.rectAreaLTC1=ft.LTC_HALF_1,n.rectAreaLTC2=ft.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let R=n.hash;(R.sunLength!==f||R.directionalLength!==m||R.pointLength!==p||R.spotLength!==y||R.rectAreaLength!==w||R.hemiLength!==_||R.numSunShadows!==g||R.numDirectionalShadows!==S||R.numPointShadows!==T||R.numSpotShadows!==C||R.numSpotMaps!==v||R.numLightProbes!==A)&&(n.sun.length=f,n.directional.length=m,n.spot.length=y,n.rectArea.length=w,n.point.length=p,n.hemi.length=_,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+v-M,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=A,R.sunLength=f,R.directionalLength=m,R.pointLength=p,R.spotLength=y,R.rectAreaLength=w,R.hemiLength=_,R.numSunShadows=g,R.numDirectionalShadows=S,R.numPointShadows=T,R.numSpotShadows=C,R.numSpotMaps=v,R.numLightProbes=A,n.version=Kv++)}function c(l,h){let d=0,u=0,f=0,g=0,x=0,m=0,p=h.matrixWorldInverse;for(let y=0,w=l.length;y<w;y++){let _=l[y];if(_.isSunLight){let S=n.sun[d];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(p),d++}else if(_.isDirectionalLight){let S=n.directional[u];S.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),u++}else if(_.isSpotLight){let S=n.spot[g];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),g++}else if(_.isRectAreaLight){let S=n.rectArea[x];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(p),a.identity(),r.copy(_.matrixWorld),r.premultiply(p),a.extractRotation(r),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),x++}else if(_.isPointLight){let S=n.point[f];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(p),f++}else if(_.isHemisphereLight){let S=n.hemi[m];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(p),m++}}}return{setup:o,setupView:c,state:n}}function sp(i){let t=new jv(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function c(u){s.push(u)}function l(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Qv(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new sp(i),t.set(s,[o])):r>=a.length?(o=new sp(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var ty=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ey=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ny=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],iy=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],rp=new fe,sa=new O,Fh=new O;function sy(i,t,e){let n=new Ws,s=new Kt,r=new Kt,a=new Se,o=new Mo,c=new So,l={},h=e.maxTextureSize,d={[Oi]:je,[je]:Oi,[Re]:Re},u=new Ze({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Kt},radius:{value:4}},vertexShader:ty,fragmentShader:ey}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new me;g.setAttribute("position",new we(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ot(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xr;let p=this.type;this.render=function(T,C,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===jd&&(Bt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Xr);let M=i.getRenderTarget(),A=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),P=i.state;P.setBlending(ei),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);let D=p!==this.type;D&&C.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(B=>B.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,B=T.length;L<B;L++){let q=T[L],Y=q.shadow;if(Y===void 0){Bt("WebGLShadowMap:",q,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);let st=Y.getFrameExtents();s.multiply(st),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,Y.mapSize.y=r.y));let X=i.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=X,Y.map===null||D===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===$s){if(q.isPointLight){Bt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new sn(s.x,s.y,{format:Vi,type:qn,minFilter:Ke,magFilter:Ke,generateMipmaps:!1}),Y.map.texture.name=q.name+".shadowMap",Y.map.depthTexture=new Li(s.x,s.y,In),Y.map.depthTexture.name=q.name+".shadowMapDepth",Y.map.depthTexture.format=jn,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=qe,Y.map.depthTexture.magFilter=qe}else q.isPointLight?(Y.map=new Rc(s.x),Y.map.depthTexture=new yo(s.x,Xn)):(Y.map=new sn(s.x,s.y),Y.map.depthTexture=new Li(s.x,s.y,Xn)),Y.map.depthTexture.name=q.name+".shadowMap",Y.map.depthTexture.format=jn,this.type===Xr?(Y.map.depthTexture.compareFunction=X?Ec:wc,Y.map.depthTexture.minFilter=Ke,Y.map.depthTexture.magFilter=Ke):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=qe,Y.map.depthTexture.magFilter=qe);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==s.x||Y.map.height!==s.y)&&Y.map.setSize(s.x,s.y);let Q=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();q.isPointLight!==!0&&Y.updateMatrices(q,v);for(let nt=0;nt<Q;nt++){let yt=Y.getCamera(nt);if(q.isPointLight){let wt=Y.camera,ue=Y.matrix,Zt=q.distance||wt.far;Zt!==wt.far&&(wt.far=Zt,wt.updateProjectionMatrix()),sa.setFromMatrixPosition(q.matrixWorld),wt.position.copy(sa),Fh.copy(wt.position),Fh.add(ny[nt]),wt.up.copy(iy[nt]),wt.lookAt(Fh),wt.updateMatrixWorld(),ue.makeTranslation(-sa.x,-sa.y,-sa.z),rp.multiplyMatrices(wt.projectionMatrix,wt.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(rp,wt.coordinateSystem,wt.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)i.setRenderTarget(Y.map,nt),i.clear();else{nt===0&&(i.setRenderTarget(Y.map),i.clear());let wt=Y.getViewport(nt);a.set(r.x*wt.x,r.y*wt.y,r.x*wt.z,r.y*wt.w),P.viewport(a)}n=Y.getFrustum(nt),_(C,v,yt,q,this.type)}Y.isPointLightShadow!==!0&&this.type===$s&&y(Y,v),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,A,R)};function y(T,C){let v=t.update(x);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new sn(s.x,s.y,{format:Vi,type:qn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,v,u,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,v,f,x,null)}function w(T,C,v,M){let A=null,R=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)A=R;else if(A=v.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let P=A.uuid,D=C.uuid,L=l[P];L===void 0&&(L={},l[P]=L);let B=L[D];B===void 0&&(B=A.clone(),L[D]=B,C.addEventListener("dispose",S)),A=B}if(A.visible=C.visible,A.wireframe=C.wireframe,M===$s?A.side=C.shadowSide!==null?C.shadowSide:C.side:A.side=C.shadowSide!==null?C.shadowSide:d[C.side],A.alphaMap=C.alphaMap,A.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,A.map=C.map,A.clipShadows=C.clipShadows,A.clippingPlanes=C.clippingPlanes,A.clipIntersection=C.clipIntersection,A.displacementMap=C.displacementMap,A.displacementScale=C.displacementScale,A.displacementBias=C.displacementBias,A.wireframeLinewidth=C.wireframeLinewidth,A.linewidth=C.linewidth,v.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let P=i.properties.get(A);P.light=v}return A}function _(T,C,v,M,A){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&A===$s)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);let D=t.update(T),L=T.material;if(Array.isArray(L)){let B=D.groups;for(let q=0,Y=B.length;q<Y;q++){let st=B[q],X=L[st.materialIndex];if(X&&X.visible){let Q=w(T,X,M,A);T.onBeforeShadow(i,T,C,v,D,Q,st),i.renderBufferDirect(v,null,D,Q,T,st),T.onAfterShadow(i,T,C,v,D,Q,st)}}}else if(L.visible){let B=w(T,L,M,A);T.onBeforeShadow(i,T,C,v,D,B,null),i.renderBufferDirect(v,null,D,B,T,null),T.onAfterShadow(i,T,C,v,D,B,null)}}let P=T.children;for(let D=0,L=P.length;D<L;D++)_(P[D],C,v,M,A)}function S(T){T.target.removeEventListener("dispose",S);for(let v in l){let M=l[v],A=T.target.uuid;A in M&&(M[A].dispose(),delete M[A])}}}function ry(i,t){function e(){let U=!1,ht=new Se,j=null,ut=new Se(0,0,0,0);return{setMask:function(xt){j!==xt&&!U&&(i.colorMask(xt,xt,xt,xt),j=xt)},setLocked:function(xt){U=xt},setClear:function(xt,it,kt,Pt,_e){_e===!0&&(xt*=Pt,it*=Pt,kt*=Pt),ht.set(xt,it,kt,Pt),ut.equals(ht)===!1&&(i.clearColor(xt,it,kt,Pt),ut.copy(ht))},reset:function(){U=!1,j=null,ut.set(-1,0,0,0)}}}function n(){let U=!1,ht=!1,j=null,ut=null,xt=null;return{setReversed:function(it){if(ht!==it){let kt=t.get("EXT_clip_control");it?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT),ht=it;let Pt=xt;xt=null,this.setClear(Pt)}},getReversed:function(){return ht},setTest:function(it){it?et(i.DEPTH_TEST):St(i.DEPTH_TEST)},setMask:function(it){j!==it&&!U&&(i.depthMask(it),j=it)},setFunc:function(it){if(ht&&(it=kf[it]),ut!==it){switch(it){case ao:i.depthFunc(i.NEVER);break;case oo:i.depthFunc(i.ALWAYS);break;case co:i.depthFunc(i.LESS);break;case Os:i.depthFunc(i.LEQUAL);break;case lo:i.depthFunc(i.EQUAL);break;case ho:i.depthFunc(i.GEQUAL);break;case uo:i.depthFunc(i.GREATER);break;case fo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ut=it}},setLocked:function(it){U=it},setClear:function(it){xt!==it&&(xt=it,ht&&(it=1-it),i.clearDepth(it))},reset:function(){U=!1,j=null,ut=null,xt=null,ht=!1}}}function s(){let U=!1,ht=null,j=null,ut=null,xt=null,it=null,kt=null,Pt=null,_e=null;return{setTest:function(ce){U||(ce?et(i.STENCIL_TEST):St(i.STENCIL_TEST))},setMask:function(ce){ht!==ce&&!U&&(i.stencilMask(ce),ht=ce)},setFunc:function(ce,Nn,Jn){(j!==ce||ut!==Nn||xt!==Jn)&&(i.stencilFunc(ce,Nn,Jn),j=ce,ut=Nn,xt=Jn)},setOp:function(ce,Nn,Jn){(it!==ce||kt!==Nn||Pt!==Jn)&&(i.stencilOp(ce,Nn,Jn),it=ce,kt=Nn,Pt=Jn)},setLocked:function(ce){U=ce},setClear:function(ce){_e!==ce&&(i.clearStencil(ce),_e=ce)},reset:function(){U=!1,ht=null,j=null,ut=null,xt=null,it=null,kt=null,Pt=null,_e=null}}}let r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,y=null,w=null,_=null,S=null,T=null,C=null,v=new Nt(0,0,0),M=0,A=!1,R=null,P=null,D=null,L=null,B=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,st=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(X)[1]),Y=st>=1):X.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Y=st>=2);let Q=null,nt={},yt=i.getParameter(i.SCISSOR_BOX),wt=i.getParameter(i.VIEWPORT),ue=new Se().fromArray(yt),Zt=new Se().fromArray(wt);function re(U,ht,j,ut){let xt=new Uint8Array(4),it=i.createTexture();i.bindTexture(U,it),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let kt=0;kt<j;kt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ht,0,i.RGBA,1,1,ut,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(ht+kt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return it}let K={};K[i.TEXTURE_2D]=re(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(i.DEPTH_TEST),a.setFunc(Os),te(!1),Me(nh),et(i.CULL_FACE),ae(ei);function et(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function St(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Vt(U,ht){return u[U]!==ht?(i.bindFramebuffer(U,ht),u[U]=ht,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ht),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ht),!0):!1}function bt(U,ht){let j=g,ut=!1;if(U){j=f.get(ht),j===void 0&&(j=[],f.set(ht,j));let xt=U.textures;if(j.length!==xt.length||j[0]!==i.COLOR_ATTACHMENT0){for(let it=0,kt=xt.length;it<kt;it++)j[it]=i.COLOR_ATTACHMENT0+it;j.length=xt.length,ut=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,ut=!0);ut&&i.drawBuffers(j)}function Jt(U){return x!==U?(i.useProgram(U),x=U,!0):!1}let Fe={[ls]:i.FUNC_ADD,[tf]:i.FUNC_SUBTRACT,[ef]:i.FUNC_REVERSE_SUBTRACT};Fe[nf]=i.MIN,Fe[sf]=i.MAX;let jt={[rf]:i.ZERO,[af]:i.ONE,[of]:i.SRC_COLOR,[rh]:i.SRC_ALPHA,[ff]:i.SRC_ALPHA_SATURATE,[uf]:i.DST_COLOR,[lf]:i.DST_ALPHA,[cf]:i.ONE_MINUS_SRC_COLOR,[ah]:i.ONE_MINUS_SRC_ALPHA,[df]:i.ONE_MINUS_DST_COLOR,[hf]:i.ONE_MINUS_DST_ALPHA,[pf]:i.CONSTANT_COLOR,[mf]:i.ONE_MINUS_CONSTANT_COLOR,[gf]:i.CONSTANT_ALPHA,[xf]:i.ONE_MINUS_CONSTANT_ALPHA};function ae(U,ht,j,ut,xt,it,kt,Pt,_e,ce){if(U===ei){m===!0&&(St(i.BLEND),m=!1);return}if(m===!1&&(et(i.BLEND),m=!0),U!==Qd){if(U!==p||ce!==A){if((y!==ls||S!==ls)&&(i.blendEquation(i.FUNC_ADD),y=ls,S=ls),ce)switch(U){case Bi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cs:i.blendFunc(i.ONE,i.ONE);break;case ih:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case sh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ht("WebGLState: Invalid blending: ",U);break}else switch(U){case Bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ih:Ht("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case sh:Ht("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ht("WebGLState: Invalid blending: ",U);break}w=null,_=null,T=null,C=null,v.set(0,0,0),M=0,p=U,A=ce}return}xt=xt||ht,it=it||j,kt=kt||ut,(ht!==y||xt!==S)&&(i.blendEquationSeparate(Fe[ht],Fe[xt]),y=ht,S=xt),(j!==w||ut!==_||it!==T||kt!==C)&&(i.blendFuncSeparate(jt[j],jt[ut],jt[it],jt[kt]),w=j,_=ut,T=it,C=kt),(Pt.equals(v)===!1||_e!==M)&&(i.blendColor(Pt.r,Pt.g,Pt.b,_e),v.copy(Pt),M=_e),p=U,A=!1}function xe(U,ht){U.side===Re?St(i.CULL_FACE):et(i.CULL_FACE);let j=U.side===je;ht&&(j=!j),te(j),U.blending===Bi&&U.transparent===!1?ae(ei):ae(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let ut=U.stencilWrite;o.setTest(ut),ut&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),mn(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):St(i.SAMPLE_ALPHA_TO_COVERAGE)}function te(U){R!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),R=U)}function Me(U){U!==Kd?(et(i.CULL_FACE),U!==P&&(U===nh?i.cullFace(i.BACK):U===Zd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):St(i.CULL_FACE),P=U}function We(U){U!==D&&(Y&&i.lineWidth(U),D=U)}function mn(U,ht,j){U?(et(i.POLYGON_OFFSET_FILL),(L!==ht||B!==j)&&(L=ht,B=j,a.getReversed()&&(ht=-ht),i.polygonOffset(ht,j))):St(i.POLYGON_OFFSET_FILL)}function Te(U){U?et(i.SCISSOR_TEST):St(i.SCISSOR_TEST)}function Ie(U){U===void 0&&(U=i.TEXTURE0+q-1),Q!==U&&(i.activeTexture(U),Q=U)}function F(U,ht,j){j===void 0&&(Q===null?j=i.TEXTURE0+q-1:j=Q);let ut=nt[j];ut===void 0&&(ut={type:void 0,texture:void 0},nt[j]=ut),(ut.type!==U||ut.texture!==ht)&&(Q!==j&&(i.activeTexture(j),Q=j),i.bindTexture(U,ht||K[U]),ut.type=U,ut.texture=ht)}function Qe(){let U=nt[Q];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function de(){try{i.compressedTexImage2D(...arguments)}catch(U){Ht("WebGLState:",U)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(U){Ht("WebGLState:",U)}}function b(){try{i.texSubImage2D(...arguments)}catch(U){Ht("WebGLState:",U)}}function z(){try{i.texSubImage3D(...arguments)}catch(U){Ht("WebGLState:",U)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(U){Ht("WebGLState:",U)}}function J(){try{i.compressedTexSubImage3D(...arguments)}catch(U){Ht("WebGLState:",U)}}function at(){try{i.texStorage2D(...arguments)}catch(U){Ht("WebGLState:",U)}}function ot(){try{i.texStorage3D(...arguments)}catch(U){Ht("WebGLState:",U)}}function Z(){try{i.texImage2D(...arguments)}catch(U){Ht("WebGLState:",U)}}function tt(){try{i.texImage3D(...arguments)}catch(U){Ht("WebGLState:",U)}}function ct(U){return d[U]!==void 0?d[U]:i.getParameter(U)}function Lt(U,ht){d[U]!==ht&&(i.pixelStorei(U,ht),d[U]=ht)}function dt(U){ue.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ue.copy(U))}function lt(U){Zt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Zt.copy(U))}function Dt(U,ht){let j=l.get(ht);j===void 0&&(j=new WeakMap,l.set(ht,j));let ut=j.get(U);ut===void 0&&(ut=i.getUniformBlockIndex(ht,U.name),j.set(U,ut))}function Ut(U,ht){let ut=l.get(ht).get(U);c.get(ht)!==ut&&(i.uniformBlockBinding(ht,ut,U.__bindingPointIndex),c.set(ht,ut))}function Wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},Q=null,nt={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,y=null,w=null,_=null,S=null,T=null,C=null,v=new Nt(0,0,0),M=0,A=!1,R=null,P=null,D=null,L=null,B=null,ue.set(0,0,i.canvas.width,i.canvas.height),Zt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:St,bindFramebuffer:Vt,drawBuffers:bt,useProgram:Jt,setBlending:ae,setMaterial:xe,setFlipSided:te,setCullFace:Me,setLineWidth:We,setPolygonOffset:mn,setScissorTest:Te,activeTexture:Ie,bindTexture:F,unbindTexture:Qe,compressedTexImage2D:de,compressedTexImage3D:I,texImage2D:Z,texImage3D:tt,pixelStorei:Lt,getParameter:ct,updateUBOMapping:Dt,uniformBlockBinding:Ut,texStorage2D:at,texStorage3D:ot,texSubImage2D:b,texSubImage3D:z,compressedTexSubImage2D:V,compressedTexSubImage3D:J,scissor:dt,viewport:lt,reset:Wt}}function ay(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Kt,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(I,b){return g?new OffscreenCanvas(I,b):Pr("canvas")}function m(I,b,z){let V=1,J=de(I);if((J.width>z||J.height>z)&&(V=z/Math.max(J.width,J.height)),V<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let at=Math.floor(V*J.width),ot=Math.floor(V*J.height);u===void 0&&(u=x(at,ot));let Z=b?x(at,ot):u;return Z.width=at,Z.height=ot,Z.getContext("2d").drawImage(I,0,0,at,ot),Bt("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+at+"x"+ot+")."),Z}else return"data"in I&&Bt("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),I;return I}function p(I){return I.generateMipmaps}function y(I){i.generateMipmap(I)}function w(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(I,b,z,V,J,at=!1){if(I!==null){if(i[I]!==void 0)return i[I];Bt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ot;V&&(ot=t.get("EXT_texture_norm16"),ot||Bt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=b;if(b===i.RED&&(z===i.FLOAT&&(Z=i.R32F),z===i.HALF_FLOAT&&(Z=i.R16F),z===i.UNSIGNED_BYTE&&(Z=i.R8),z===i.UNSIGNED_SHORT&&ot&&(Z=ot.R16_EXT),z===i.SHORT&&ot&&(Z=ot.R16_SNORM_EXT)),b===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.R8UI),z===i.UNSIGNED_SHORT&&(Z=i.R16UI),z===i.UNSIGNED_INT&&(Z=i.R32UI),z===i.BYTE&&(Z=i.R8I),z===i.SHORT&&(Z=i.R16I),z===i.INT&&(Z=i.R32I)),b===i.RG&&(z===i.FLOAT&&(Z=i.RG32F),z===i.HALF_FLOAT&&(Z=i.RG16F),z===i.UNSIGNED_BYTE&&(Z=i.RG8),z===i.UNSIGNED_SHORT&&ot&&(Z=ot.RG16_EXT),z===i.SHORT&&ot&&(Z=ot.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RG8UI),z===i.UNSIGNED_SHORT&&(Z=i.RG16UI),z===i.UNSIGNED_INT&&(Z=i.RG32UI),z===i.BYTE&&(Z=i.RG8I),z===i.SHORT&&(Z=i.RG16I),z===i.INT&&(Z=i.RG32I)),b===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),z===i.UNSIGNED_INT&&(Z=i.RGB32UI),z===i.BYTE&&(Z=i.RGB8I),z===i.SHORT&&(Z=i.RGB16I),z===i.INT&&(Z=i.RGB32I)),b===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),z===i.UNSIGNED_INT&&(Z=i.RGBA32UI),z===i.BYTE&&(Z=i.RGBA8I),z===i.SHORT&&(Z=i.RGBA16I),z===i.INT&&(Z=i.RGBA32I)),b===i.RGB&&(z===i.UNSIGNED_SHORT&&ot&&(Z=ot.RGB16_EXT),z===i.SHORT&&ot&&(Z=ot.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),b===i.RGBA){let tt=at?Rr:ee.getTransfer(J);z===i.FLOAT&&(Z=i.RGBA32F),z===i.HALF_FLOAT&&(Z=i.RGBA16F),z===i.UNSIGNED_BYTE&&(Z=tt===he?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&ot&&(Z=ot.RGBA16_EXT),z===i.SHORT&&ot&&(Z=ot.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function S(I,b){let z;return I?b===null||b===Xn||b===Js?z=i.DEPTH24_STENCIL8:b===In?z=i.DEPTH32F_STENCIL8:b===Ys&&(z=i.DEPTH24_STENCIL8,Bt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Xn||b===Js?z=i.DEPTH_COMPONENT24:b===In?z=i.DEPTH_COMPONENT32F:b===Ys&&(z=i.DEPTH_COMPONENT16),z}function T(I,b){return p(I)===!0||I.isFramebufferTexture&&I.minFilter!==qe&&I.minFilter!==Ke?Math.log2(Math.max(b.width,b.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?b.mipmaps.length:1}function C(I){let b=I.target;b.removeEventListener("dispose",C),M(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&d.delete(b)}function v(I){let b=I.target;b.removeEventListener("dispose",v),R(b)}function M(I){let b=n.get(I);if(b.__webglInit===void 0)return;let z=I.source,V=f.get(z);if(V){let J=V[b.__cacheKey];J.usedTimes--,J.usedTimes===0&&A(I),Object.keys(V).length===0&&f.delete(z)}n.remove(I)}function A(I){let b=n.get(I);i.deleteTexture(b.__webglTexture);let z=I.source,V=f.get(z);delete V[b.__cacheKey],a.memory.textures--}function R(I){let b=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(b.__webglFramebuffer[V]))for(let J=0;J<b.__webglFramebuffer[V].length;J++)i.deleteFramebuffer(b.__webglFramebuffer[V][J]);else i.deleteFramebuffer(b.__webglFramebuffer[V]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[V])}else{if(Array.isArray(b.__webglFramebuffer))for(let V=0;V<b.__webglFramebuffer.length;V++)i.deleteFramebuffer(b.__webglFramebuffer[V]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let V=0;V<b.__webglColorRenderbuffer.length;V++)b.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[V]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let z=I.textures;for(let V=0,J=z.length;V<J;V++){let at=n.get(z[V]);at.__webglTexture&&(i.deleteTexture(at.__webglTexture),a.memory.textures--),n.remove(z[V])}n.remove(I)}let P=0;function D(){P=0}function L(){return P}function B(I){P=I}function q(){let I=P;return I>=s.maxTextures&&Bt("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,I}function Y(I){let b=[];return b.push(I.wrapS),b.push(I.wrapT),b.push(I.wrapR||0),b.push(I.magFilter),b.push(I.minFilter),b.push(I.anisotropy),b.push(I.internalFormat),b.push(I.format),b.push(I.type),b.push(I.generateMipmaps),b.push(I.premultiplyAlpha),b.push(I.flipY),b.push(I.unpackAlignment),b.push(I.colorSpace),b.join()}function st(I,b){let z=n.get(I);if(I.isVideoTexture&&F(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&z.__version!==I.version){let V=I.image;if(V===null)Bt("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Bt("WebGLRenderer: Texture marked for update but image is incomplete");else{St(z,I,b);return}}else I.isExternalTexture&&(z.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+b)}function X(I,b){let z=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){St(z,I,b);return}else I.isExternalTexture&&(z.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+b)}function Q(I,b){let z=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){St(z,I,b);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+b)}function nt(I,b){let z=n.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&z.__version!==I.version){Vt(z,I,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+b)}let yt={[ss]:i.REPEAT,[Cn]:i.CLAMP_TO_EDGE,[po]:i.MIRRORED_REPEAT},wt={[qe]:i.NEAREST,[yf]:i.NEAREST_MIPMAP_NEAREST,[Yr]:i.NEAREST_MIPMAP_LINEAR,[Ke]:i.LINEAR,[zo]:i.LINEAR_MIPMAP_NEAREST,[Hi]:i.LINEAR_MIPMAP_LINEAR},ue={[Tf]:i.NEVER,[Rf]:i.ALWAYS,[wf]:i.LESS,[wc]:i.LEQUAL,[Ef]:i.EQUAL,[Ec]:i.GEQUAL,[Af]:i.GREATER,[Cf]:i.NOTEQUAL};function Zt(I,b){if(b.type===In&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Ke||b.magFilter===zo||b.magFilter===Yr||b.magFilter===Hi||b.minFilter===Ke||b.minFilter===zo||b.minFilter===Yr||b.minFilter===Hi)&&Bt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,yt[b.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,yt[b.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,yt[b.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,wt[b.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,wt[b.minFilter]),b.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,ue[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===qe||b.minFilter!==Yr&&b.minFilter!==Hi||b.type===In&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function re(I,b){let z=!1;I.__webglInit===void 0&&(I.__webglInit=!0,b.addEventListener("dispose",C));let V=b.source,J=f.get(V);J===void 0&&(J={},f.set(V,J));let at=Y(b);if(at!==I.__cacheKey){J[at]===void 0&&(J[at]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),J[at].usedTimes++;let ot=J[I.__cacheKey];ot!==void 0&&(J[I.__cacheKey].usedTimes--,ot.usedTimes===0&&A(b)),I.__cacheKey=at,I.__webglTexture=J[at].texture}return z}function K(I,b,z){return Math.floor(Math.floor(I/z)/b)}function et(I,b,z,V){let at=I.updateRanges;if(at.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,z,V,b.data);else{at.sort((Lt,dt)=>Lt.start-dt.start);let ot=0;for(let Lt=1;Lt<at.length;Lt++){let dt=at[ot],lt=at[Lt],Dt=dt.start+dt.count,Ut=K(lt.start,b.width,4),Wt=K(dt.start,b.width,4);lt.start<=Dt+1&&Ut===Wt&&K(lt.start+lt.count-1,b.width,4)===Ut?dt.count=Math.max(dt.count,lt.start+lt.count-dt.start):(++ot,at[ot]=lt)}at.length=ot+1;let Z=e.getParameter(i.UNPACK_ROW_LENGTH),tt=e.getParameter(i.UNPACK_SKIP_PIXELS),ct=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let Lt=0,dt=at.length;Lt<dt;Lt++){let lt=at[Lt],Dt=Math.floor(lt.start/4),Ut=Math.ceil(lt.count/4),Wt=Dt%b.width,U=Math.floor(Dt/b.width),ht=Ut,j=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Wt),e.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,Wt,U,ht,j,z,V,b.data)}I.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(i.UNPACK_SKIP_ROWS,ct)}}function St(I,b,z){let V=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(V=i.TEXTURE_3D);let J=re(I,b),at=b.source;e.bindTexture(V,I.__webglTexture,i.TEXTURE0+z);let ot=n.get(at);if(at.version!==ot.__version||J===!0){if(e.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let j=ee.getPrimaries(ee.workingColorSpace),ut=b.colorSpace===vi?null:ee.getPrimaries(b.colorSpace),xt=b.colorSpace===vi||j===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt)}e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let tt=m(b.image,!1,s.maxTextureSize);tt=Qe(b,tt);let ct=r.convert(b.format,b.colorSpace),Lt=r.convert(b.type),dt=_(b.internalFormat,ct,Lt,b.normalized,b.colorSpace,b.isVideoTexture);Zt(V,b);let lt,Dt=b.mipmaps,Ut=b.isVideoTexture!==!0,Wt=ot.__version===void 0||J===!0,U=at.dataReady,ht=T(b,tt);if(b.isDepthTexture)dt=S(b.format===Gi,b.type),Wt&&(Ut?e.texStorage2D(i.TEXTURE_2D,1,dt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,dt,tt.width,tt.height,0,ct,Lt,null));else if(b.isDataTexture)if(Dt.length>0){Ut&&Wt&&e.texStorage2D(i.TEXTURE_2D,ht,dt,Dt[0].width,Dt[0].height);for(let j=0,ut=Dt.length;j<ut;j++)lt=Dt[j],Ut?U&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,lt.width,lt.height,ct,Lt,lt.data):e.texImage2D(i.TEXTURE_2D,j,dt,lt.width,lt.height,0,ct,Lt,lt.data);b.generateMipmaps=!1}else Ut?(Wt&&e.texStorage2D(i.TEXTURE_2D,ht,dt,tt.width,tt.height),U&&et(b,tt,ct,Lt)):e.texImage2D(i.TEXTURE_2D,0,dt,tt.width,tt.height,0,ct,Lt,tt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ut&&Wt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ht,dt,Dt[0].width,Dt[0].height,tt.depth);for(let j=0,ut=Dt.length;j<ut;j++)if(lt=Dt[j],b.format!==Ln)if(ct!==null)if(Ut){if(U)if(b.layerUpdates.size>0){let xt=Eh(lt.width,lt.height,b.format,b.type);for(let it of b.layerUpdates){let kt=lt.data.subarray(it*xt/lt.data.BYTES_PER_ELEMENT,(it+1)*xt/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,it,lt.width,lt.height,1,ct,kt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,lt.width,lt.height,tt.depth,ct,lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,dt,lt.width,lt.height,tt.depth,0,lt.data,0,0);else Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ut?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,lt.width,lt.height,tt.depth,ct,Lt,lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,j,dt,lt.width,lt.height,tt.depth,0,ct,Lt,lt.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{Ut&&Wt&&e.texStorage2D(i.TEXTURE_2D,ht,dt,Dt[0].width,Dt[0].height);for(let j=0,ut=Dt.length;j<ut;j++)lt=Dt[j],b.format!==Ln?ct!==null?Ut?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,lt.width,lt.height,ct,lt.data):e.compressedTexImage2D(i.TEXTURE_2D,j,dt,lt.width,lt.height,0,lt.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ut?U&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,lt.width,lt.height,ct,Lt,lt.data):e.texImage2D(i.TEXTURE_2D,j,dt,lt.width,lt.height,0,ct,Lt,lt.data)}else if(b.isDataArrayTexture)if(Ut){if(Wt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ht,dt,tt.width,tt.height,tt.depth),U)if(b.layerUpdates.size>0){let j=Eh(tt.width,tt.height,b.format,b.type);for(let ut of b.layerUpdates){let xt=tt.data.subarray(ut*j/tt.data.BYTES_PER_ELEMENT,(ut+1)*j/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ut,tt.width,tt.height,1,ct,Lt,xt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ct,Lt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,dt,tt.width,tt.height,tt.depth,0,ct,Lt,tt.data);else if(b.isData3DTexture)Ut?(Wt&&e.texStorage3D(i.TEXTURE_3D,ht,dt,tt.width,tt.height,tt.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ct,Lt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,dt,tt.width,tt.height,tt.depth,0,ct,Lt,tt.data);else if(b.isFramebufferTexture){if(Wt)if(Ut)e.texStorage2D(i.TEXTURE_2D,ht,dt,tt.width,tt.height);else{let j=tt.width,ut=tt.height;for(let xt=0;xt<ht;xt++)e.texImage2D(i.TEXTURE_2D,xt,dt,j,ut,0,ct,Lt,null),j>>=1,ut>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){let j=i.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),tt.parentNode!==j){j.appendChild(tt),d.add(b),j.onpaint=ut=>{let xt=ut.changedElements;for(let it of d)xt.includes(it.image)&&(it.needsUpdate=!0)},j.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,tt);else{let xt=i.RGBA,it=i.RGBA,kt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,xt,it,kt,tt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Dt.length>0){if(Ut&&Wt){let j=de(Dt[0]);e.texStorage2D(i.TEXTURE_2D,ht,dt,j.width,j.height)}for(let j=0,ut=Dt.length;j<ut;j++)lt=Dt[j],Ut?U&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,ct,Lt,lt):e.texImage2D(i.TEXTURE_2D,j,dt,ct,Lt,lt);b.generateMipmaps=!1}else if(Ut){if(Wt){let j=de(tt);e.texStorage2D(i.TEXTURE_2D,ht,dt,j.width,j.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ct,Lt,tt)}else e.texImage2D(i.TEXTURE_2D,0,dt,ct,Lt,tt);p(b)&&y(V),ot.__version=at.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function Vt(I,b,z){if(b.image.length!==6)return;let V=re(I,b),J=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+z);let at=n.get(J);if(J.version!==at.__version||V===!0){e.activeTexture(i.TEXTURE0+z);let ot=ee.getPrimaries(ee.workingColorSpace),Z=b.colorSpace===vi?null:ee.getPrimaries(b.colorSpace),tt=b.colorSpace===vi||ot===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let ct=b.isCompressedTexture||b.image[0].isCompressedTexture,Lt=b.image[0]&&b.image[0].isDataTexture,dt=[];for(let it=0;it<6;it++)!ct&&!Lt?dt[it]=m(b.image[it],!0,s.maxCubemapSize):dt[it]=Lt?b.image[it].image:b.image[it],dt[it]=Qe(b,dt[it]);let lt=dt[0],Dt=r.convert(b.format,b.colorSpace),Ut=r.convert(b.type),Wt=_(b.internalFormat,Dt,Ut,b.normalized,b.colorSpace),U=b.isVideoTexture!==!0,ht=at.__version===void 0||V===!0,j=J.dataReady,ut=T(b,lt);Zt(i.TEXTURE_CUBE_MAP,b);let xt;if(ct){U&&ht&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,Wt,lt.width,lt.height);for(let it=0;it<6;it++){xt=dt[it].mipmaps;for(let kt=0;kt<xt.length;kt++){let Pt=xt[kt];b.format!==Ln?Dt!==null?U?j&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,kt,0,0,Pt.width,Pt.height,Dt,Pt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,kt,Wt,Pt.width,Pt.height,0,Pt.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,kt,0,0,Pt.width,Pt.height,Dt,Ut,Pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,kt,Wt,Pt.width,Pt.height,0,Dt,Ut,Pt.data)}}}else{if(xt=b.mipmaps,U&&ht){xt.length>0&&ut++;let it=de(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,Wt,it.width,it.height)}for(let it=0;it<6;it++)if(Lt){U?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,dt[it].width,dt[it].height,Dt,Ut,dt[it].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Wt,dt[it].width,dt[it].height,0,Dt,Ut,dt[it].data);for(let kt=0;kt<xt.length;kt++){let _e=xt[kt].image[it].image;U?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,kt+1,0,0,_e.width,_e.height,Dt,Ut,_e.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,kt+1,Wt,_e.width,_e.height,0,Dt,Ut,_e.data)}}else{U?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Dt,Ut,dt[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Wt,Dt,Ut,dt[it]);for(let kt=0;kt<xt.length;kt++){let Pt=xt[kt];U?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,kt+1,0,0,Dt,Ut,Pt.image[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,kt+1,Wt,Dt,Ut,Pt.image[it])}}}p(b)&&y(i.TEXTURE_CUBE_MAP),at.__version=J.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function bt(I,b,z,V,J,at){let ot=r.convert(z.format,z.colorSpace),Z=r.convert(z.type),tt=_(z.internalFormat,ot,Z,z.normalized,z.colorSpace),ct=n.get(b),Lt=n.get(z);if(Lt.__renderTarget=b,!ct.__hasExternalTextures){let dt=Math.max(1,b.width>>at),lt=Math.max(1,b.height>>at);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,at,tt,dt,lt,b.depth,0,ot,Z,null):e.texImage2D(J,at,tt,dt,lt,0,ot,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),Ie(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,J,Lt.__webglTexture,0,Te(b)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,J,Lt.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Jt(I,b,z){if(i.bindRenderbuffer(i.RENDERBUFFER,I),b.depthBuffer){let V=b.depthTexture,J=V&&V.isDepthTexture?V.type:null,at=S(b.stencilBuffer,J),ot=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ie(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Te(b),at,b.width,b.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Te(b),at,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,at,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,I)}else{let V=b.textures;for(let J=0;J<V.length;J++){let at=V[J],ot=r.convert(at.format,at.colorSpace),Z=r.convert(at.type),tt=_(at.internalFormat,ot,Z,at.normalized,at.colorSpace);Ie(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Te(b),tt,b.width,b.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Te(b),tt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,tt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Fe(I,b,z){let V=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let J=n.get(b.depthTexture);if(J.__renderTarget=b,(!J.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),V){if(J.__webglInit===void 0&&(J.__webglInit=!0,b.depthTexture.addEventListener("dispose",C)),J.__webglTexture===void 0){J.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),Zt(i.TEXTURE_CUBE_MAP,b.depthTexture);let ct=r.convert(b.depthTexture.format),Lt=r.convert(b.depthTexture.type),dt;b.depthTexture.format===jn?dt=i.DEPTH_COMPONENT24:b.depthTexture.format===Gi&&(dt=i.DEPTH24_STENCIL8);for(let lt=0;lt<6;lt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,dt,b.width,b.height,0,ct,Lt,null)}}else st(b.depthTexture,0);let at=J.__webglTexture,ot=Te(b),Z=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,tt=b.depthTexture.format===Gi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===jn)Ie(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,Z,at,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,tt,Z,at,0);else if(b.depthTexture.format===Gi)Ie(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,Z,at,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,tt,Z,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function jt(I){let b=n.get(I),z=I.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==I.depthTexture){let V=I.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),V){let J=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,V.removeEventListener("dispose",J)};V.addEventListener("dispose",J),b.__depthDisposeCallback=J}b.__boundDepthTexture=V}if(I.depthTexture&&!b.__autoAllocateDepthBuffer)if(z)for(let V=0;V<6;V++)Fe(b.__webglFramebuffer[V],I,V);else{let V=I.texture.mipmaps;V&&V.length>0?Fe(b.__webglFramebuffer[0],I,0):Fe(b.__webglFramebuffer,I,0)}else if(z){b.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[V]),b.__webglDepthbuffer[V]===void 0)b.__webglDepthbuffer[V]=i.createRenderbuffer(),Jt(b.__webglDepthbuffer[V],I,!1);else{let J=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=b.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,at)}}else{let V=I.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Jt(b.__webglDepthbuffer,I,!1);else{let J=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,at)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(I,b,z){let V=n.get(I);b!==void 0&&bt(V.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&jt(I)}function xe(I){let b=I.texture,z=n.get(I),V=n.get(b);I.addEventListener("dispose",v);let J=I.textures,at=I.isWebGLCubeRenderTarget===!0,ot=J.length>1;if(ot||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=b.version,a.memory.textures++),at){z.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer[Z]=[];for(let tt=0;tt<b.mipmaps.length;tt++)z.__webglFramebuffer[Z][tt]=i.createFramebuffer()}else z.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer=[];for(let Z=0;Z<b.mipmaps.length;Z++)z.__webglFramebuffer[Z]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(ot)for(let Z=0,tt=J.length;Z<tt;Z++){let ct=n.get(J[Z]);ct.__webglTexture===void 0&&(ct.__webglTexture=i.createTexture(),a.memory.textures++)}if(I.samples>0&&Ie(I)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Z=0;Z<J.length;Z++){let tt=J[Z];z.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[Z]);let ct=r.convert(tt.format,tt.colorSpace),Lt=r.convert(tt.type),dt=_(tt.internalFormat,ct,Lt,tt.normalized,tt.colorSpace,I.isXRRenderTarget===!0),lt=Te(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,dt,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,z.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Jt(z.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Zt(i.TEXTURE_CUBE_MAP,b);for(let Z=0;Z<6;Z++)if(b.mipmaps&&b.mipmaps.length>0)for(let tt=0;tt<b.mipmaps.length;tt++)bt(z.__webglFramebuffer[Z][tt],I,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,tt);else bt(z.__webglFramebuffer[Z],I,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);p(b)&&y(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ot){for(let Z=0,tt=J.length;Z<tt;Z++){let ct=J[Z],Lt=n.get(ct),dt=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(dt=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,Lt.__webglTexture),Zt(dt,ct),bt(z.__webglFramebuffer,I,ct,i.COLOR_ATTACHMENT0+Z,dt,0),p(ct)&&y(dt)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Z=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,V.__webglTexture),Zt(Z,b),b.mipmaps&&b.mipmaps.length>0)for(let tt=0;tt<b.mipmaps.length;tt++)bt(z.__webglFramebuffer[tt],I,b,i.COLOR_ATTACHMENT0,Z,tt);else bt(z.__webglFramebuffer,I,b,i.COLOR_ATTACHMENT0,Z,0);p(b)&&y(Z),e.unbindTexture()}I.depthBuffer&&jt(I)}function te(I){let b=I.textures;for(let z=0,V=b.length;z<V;z++){let J=b[z];if(p(J)){let at=w(I),ot=n.get(J).__webglTexture;e.bindTexture(at,ot),y(at),e.unbindTexture()}}}let Me=[],We=[];function mn(I){if(I.samples>0){if(Ie(I)===!1){let b=I.textures,z=I.width,V=I.height,J=i.COLOR_BUFFER_BIT,at=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=n.get(I),Z=b.length>1;if(Z)for(let ct=0;ct<b.length;ct++)e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ot.__webglMultisampledFramebuffer);let tt=I.texture.mipmaps;tt&&tt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglFramebuffer);for(let ct=0;ct<b.length;ct++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ot.__webglColorRenderbuffer[ct]);let Lt=n.get(b[ct]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Lt,0)}i.blitFramebuffer(0,0,z,V,0,0,z,V,J,i.NEAREST),c===!0&&(Me.length=0,We.length=0,Me.push(i.COLOR_ATTACHMENT0+ct),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(Me.push(at),We.push(at),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,We)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Me))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ct=0;ct<b.length;ct++){e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,ot.__webglColorRenderbuffer[ct]);let Lt=n.get(b[ct]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,Lt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&c){let b=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function Te(I){return Math.min(s.maxSamples,I.samples)}function Ie(I){let b=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function F(I){let b=a.render.frame;h.get(I)!==b&&(h.set(I,b),I.update())}function Qe(I,b){let z=I.colorSpace,V=I.format,J=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||z!==Cr&&z!==vi&&(ee.getTransfer(z)===he?(V!==Ln||J!==xn)&&Bt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ht("WebGLTextures: Unsupported texture color space:",z)),b}function de(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=D,this.getTextureUnits=L,this.setTextureUnits=B,this.setTexture2D=st,this.setTexture2DArray=X,this.setTexture3D=Q,this.setTextureCube=nt,this.rebindTextures=ae,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=mn,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=Ie,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function oy(i,t){function e(n,s=vi){let r,a=ee.getTransfer(s);if(n===xn)return i.UNSIGNED_BYTE;if(n===Go)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Vo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===_h)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===mh)return i.BYTE;if(n===gh)return i.SHORT;if(n===Ys)return i.UNSIGNED_SHORT;if(n===Ho)return i.INT;if(n===Xn)return i.UNSIGNED_INT;if(n===In)return i.FLOAT;if(n===qn)return i.HALF_FLOAT;if(n===vh)return i.ALPHA;if(n===yh)return i.RGB;if(n===Ln)return i.RGBA;if(n===jn)return i.DEPTH_COMPONENT;if(n===Gi)return i.DEPTH_STENCIL;if(n===Wo)return i.RED;if(n===Xo)return i.RED_INTEGER;if(n===Vi)return i.RG;if(n===qo)return i.RG_INTEGER;if(n===$o)return i.RGBA_INTEGER;if(n===Jr||n===Kr||n===Zr||n===jr)if(a===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Jr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Jr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Yo||n===Jo||n===Ko||n===Zo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Yo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Jo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ko)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Zo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===jo||n===Qo||n===tc||n===ec||n===nc||n===Qr||n===ic)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===jo||n===Qo)return a===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===tc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ec)return r.COMPRESSED_R11_EAC;if(n===nc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Qr)return r.COMPRESSED_RG11_EAC;if(n===ic)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===sc||n===rc||n===ac||n===oc||n===cc||n===lc||n===hc||n===uc||n===dc||n===fc||n===pc||n===mc||n===gc||n===xc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===sc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===rc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ac)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===oc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===cc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===lc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===hc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===uc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===dc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===mc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===gc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xc)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===_c||n===vc||n===yc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===_c)return a===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===vc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===yc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bc||n===Mc||n===ta||n===Sc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===bc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Mc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ta)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Sc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Js?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var cy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ly=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Xh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new zr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ze({vertexShader:cy,fragmentShader:ly,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ot(new Ne(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qh=class extends Qn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new Xh,p={},y=e.getContextAttributes(),w=null,_=null,S=[],T=[],C=new Kt,v=null,M=null,A=new Oe;A.viewport=new Se;let R=new Oe;R.viewport=new Se;let P=[A,R],D=new Uo,L=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let et=S[K];return et===void 0&&(et=new Gs,S[K]=et),et.getTargetRaySpace()},this.getControllerGrip=function(K){let et=S[K];return et===void 0&&(et=new Gs,S[K]=et),et.getGripSpace()},this.getHand=function(K){let et=S[K];return et===void 0&&(et=new Gs,S[K]=et),et.getHandSpace()};function q(K){let et=T.indexOf(K.inputSource);if(et===-1)return;let St=S[et];St!==void 0&&(St.update(K.inputSource,K.frame,l||a),St.dispatchEvent({type:K.type,data:K.inputSource}))}function Y(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",st);for(let K=0;K<S.length;K++){let et=T[K];et!==null&&(T[K]=null,S[K].disconnect(et))}L=null,B=null,m.reset();for(let K in p)delete p[K];if(t.setRenderTarget(w),f=null,u=null,d=null,s=null,_=null,re.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(C.width,C.height,!1),M!==null){let K=M.camera;K.fov=M.fov,K.zoom=M.zoom,K.updateProjectionMatrix(),M=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Bt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&Bt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",st),y.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let St=null,Vt=null,bt=null;y.depth&&(bt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,St=y.stencil?Gi:jn,Vt=y.stencil?Js:Xn);let Jt={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Jt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new sn(u.textureWidth,u.textureHeight,{format:Ln,type:xn,depthTexture:new Li(u.textureWidth,u.textureHeight,Vt,void 0,void 0,void 0,void 0,void 0,void 0,St),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let St={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,St),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new sn(f.framebufferWidth,f.framebufferHeight,{format:Ln,type:xn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),re.setContext(s),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function st(K){for(let et=0;et<K.removed.length;et++){let St=K.removed[et],Vt=T.indexOf(St);Vt>=0&&(T[Vt]=null,S[Vt].disconnect(St))}for(let et=0;et<K.added.length;et++){let St=K.added[et],Vt=T.indexOf(St);if(Vt===-1){for(let Jt=0;Jt<S.length;Jt++)if(Jt>=T.length){T.push(St),Vt=Jt;break}else if(T[Jt]===null){T[Jt]=St,Vt=Jt;break}if(Vt===-1)break}let bt=S[Vt];bt&&bt.connect(St)}}let X=new O,Q=new O;function nt(K,et,St){X.setFromMatrixPosition(et.matrixWorld),Q.setFromMatrixPosition(St.matrixWorld);let Vt=X.distanceTo(Q),bt=et.projectionMatrix.elements,Jt=St.projectionMatrix.elements,Fe=bt[14]/(bt[10]-1),jt=bt[14]/(bt[10]+1),ae=(bt[9]+1)/bt[5],xe=(bt[9]-1)/bt[5],te=(bt[8]-1)/bt[0],Me=(Jt[8]+1)/Jt[0],We=Fe*te,mn=Fe*Me,Te=Vt/(-te+Me),Ie=Te*-te;if(et.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ie),K.translateZ(Te),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),bt[10]===-1)K.projectionMatrix.copy(et.projectionMatrix),K.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let F=Fe+Te,Qe=jt+Te,de=We-Ie,I=mn+(Vt-Ie),b=ae*jt/Qe*F,z=xe*jt/Qe*F;K.projectionMatrix.makePerspective(de,I,b,z,F,Qe),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function yt(K,et){et===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(et.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let et=K.near,St=K.far;m.texture!==null&&(m.depthNear>0&&(et=m.depthNear),m.depthFar>0&&(St=m.depthFar)),D.near=R.near=A.near=et,D.far=R.far=A.far=St,(L!==D.near||B!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),L=D.near,B=D.far),D.layers.mask=K.layers.mask|6,A.layers.mask=D.layers.mask&-5,R.layers.mask=D.layers.mask&-3;let Vt=K.parent,bt=D.cameras;yt(D,Vt);for(let Jt=0;Jt<bt.length;Jt++)yt(bt[Jt],Vt);bt.length===2?nt(D,A,R):D.projectionMatrix.copy(A.projectionMatrix),M===null&&K.isPerspectiveCamera&&(M={camera:K,fov:K.fov,zoom:K.zoom}),wt(K,D,Vt)};function wt(K,et,St){St===null?K.matrix.copy(et.matrixWorld):(K.matrix.copy(St.matrixWorld),K.matrix.invert(),K.matrix.multiply(et.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(et.projectionMatrix),K.projectionMatrixInverse.copy(et.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=go*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(K){return p[K]};let ue=null;function Zt(K,et){if(h=et.getViewerPose(l||a),g=et,h!==null){let St=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Vt=!1;St.length!==D.cameras.length&&(D.cameras.length=0,Vt=!0);for(let jt=0;jt<St.length;jt++){let ae=St[jt],xe=null;if(f!==null)xe=f.getViewport(ae);else{let Me=d.getViewSubImage(u,ae);xe=Me.viewport,jt===0&&(t.setRenderTargetTextures(_,Me.colorTexture,Me.depthStencilTexture),t.setRenderTarget(_))}let te=P[jt];te===void 0&&(te=new Oe,te.layers.enable(jt),te.viewport=new Se,P[jt]=te),te.matrix.fromArray(ae.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(ae.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(xe.x,xe.y,xe.width,xe.height),jt===0&&(D.matrix.copy(te.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Vt===!0&&D.cameras.push(te)}let bt=s.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let jt=d.getDepthInformation(St[0]);jt&&jt.isValid&&jt.texture&&m.init(jt,s.renderState)}if(bt&&bt.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let jt=0;jt<St.length;jt++){let ae=St[jt].camera;if(ae){let xe=p[ae];xe||(xe=new zr,p[ae]=xe);let te=d.getCameraImage(ae);xe.sourceTexture=te}}}}for(let St=0;St<S.length;St++){let Vt=T[St],bt=S[St];Vt!==null&&bt!==void 0&&bt.update(Vt,et,l||a)}ue&&ue(K,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}let re=new ap;re.setAnimationLoop(Zt),this.setAnimationLoop=function(K){ue=K},this.dispose=function(){}}},hy=new fe,dp=new Gt;dp.set(-1,0,0,0,1,0,0,0,1);function uy(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Sh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,w,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,y,w):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===je&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===je&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let y=t.get(p),w=y.envMap,_=y.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(hy.makeRotationFromEuler(_)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(dp),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=w*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===je&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function dy(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,S){let T=S.program;n.uniformBlockBinding(_,T)}function l(_,S){let T=s[_.id];T===void 0&&(m(_),T=h(_),s[_.id]=T,_.addEventListener("dispose",y));let C=S.program;n.updateUBOMapping(_,C);let v=t.render.frame;r[_.id]!==v&&(u(_),r[_.id]=v)}function h(_){let S=d();_.__bindingPointIndex=S;let T=i.createBuffer(),C=_.__size,v=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,C,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,T),T}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Ht("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){let S=s[_.id],T=_.uniforms,C=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let v=0,M=T.length;v<M;v++){let A=T[v];if(Array.isArray(A))for(let R=0,P=A.length;R<P;R++)f(A[R],v,R,C);else f(A,v,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,S,T,C){if(x(_,S,T,C)===!0){let v=_.__offset,M=_.value;if(Array.isArray(M)){let A=0;for(let R=0;R<M.length;R++){let P=M[R],D=p(P);g(P,_.__data,A),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(A+=D.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(M,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,_.__data)}}function g(_,S,T){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,T)}function x(_,S,T,C){let v=_.value,M=S+"_"+T;if(C[M]===void 0)return typeof v=="number"||typeof v=="boolean"?C[M]=v:ArrayBuffer.isView(v)?C[M]=v.slice():C[M]=v.clone(),!0;{let A=C[M];if(typeof v=="number"||typeof v=="boolean"){if(A!==v)return C[M]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(A.equals(v)===!1)return A.copy(v),!0}}return!1}function m(_){let S=_.uniforms,T=0,C=16;for(let M=0,A=S.length;M<A;M++){let R=Array.isArray(S[M])?S[M]:[S[M]];for(let P=0,D=R.length;P<D;P++){let L=R[P],B=Array.isArray(L.value)?L.value:[L.value];for(let q=0,Y=B.length;q<Y;q++){let st=B[q],X=p(st),Q=T%C,nt=Q%X.boundary,yt=Q+nt;T+=nt,yt!==0&&C-yt<X.storage&&(T+=C-yt),L.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=T,T+=X.storage}}}let v=T%C;return v>0&&(T+=C-v),_.__size=T,_.__cache={},this}function p(_){let S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?Bt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):Bt("WebGLRenderer: Unsupported uniform value type.",_),S}function y(_){let S=_.target;S.removeEventListener("dispose",y);let T=a.indexOf(S.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function w(){for(let _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:c,update:l,dispose:w}}var fy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ni=null;function py(){return ni===null&&(ni=new Or(fy,16,16,Vi,qn),ni.name="DFG_LUT",ni.minFilter=Ke,ni.magFilter=Ke,ni.wrapS=Cn,ni.wrapT=Cn,ni.generateMipmaps=!1,ni.needsUpdate=!0),ni}var Pc=class{constructor(t={}){let{canvas:e=If(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=xn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let x=f,m=new Set([$o,qo,Xo]),p=new Set([xn,Xn,Ys,Js,Go,Vo]),y=new Uint32Array(4),w=new Int32Array(4),_=new O,S=null,T=null,C=[],v=[],M=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,R=!1,P=null,D=null,L=null,B=null;this._outputColorSpace=Ce;let q=0,Y=0,st=null,X=-1,Q=null,nt=new Se,yt=new Se,wt=null,ue=new Nt(0),Zt=0,re=e.width,K=e.height,et=1,St=null,Vt=null,bt=new Se(0,0,re,K),Jt=new Se(0,0,re,K),Fe=!1,jt=new Ws,ae=!1,xe=!1,te=new fe,Me=new O,We=new Se,mn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function Ie(){return st===null?et:1}let F=n;function Qe(E,k){return e.getContext(E,k)}let de,I,b,z,V,J,at,ot,Z,tt,ct,Lt,dt,lt,Dt,Ut,Wt,U,ht,j,ut,xt,it;try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",_e,!1),e.addEventListener("webglcontextrestored",ce,!1),e.addEventListener("webglcontextcreationerror",Nn,!1),F===null){let k="webgl2";if(F=Qe(k,E),F===null)throw Qe(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}kt()}catch(E){throw e.removeEventListener("webglcontextlost",_e,!1),e.removeEventListener("webglcontextrestored",ce,!1),e.removeEventListener("webglcontextcreationerror",Nn,!1),Ht("WebGLRenderer: "+E.message),E}function kt(){de=new b_(F),de.init(),ut=new oy(F,de),I=new u_(F,de,t,ut),b=new ry(F,de),I.reversedDepthBuffer&&u&&b.buffers.depth.setReversed(!0),D=F.createFramebuffer(),L=F.createFramebuffer(),B=F.createFramebuffer(),z=new T_(F),V=new Xv,J=new ay(F,de,b,V,I,ut,z),at=new y_(A),ot=new Em(F),xt=new l_(F,ot),Z=new M_(F,ot,z,xt),tt=new E_(F,Z,ot,xt,z),U=new w_(F,I,J),Dt=new d_(V),ct=new Wv(A,at,de,I,xt,Dt),Lt=new uy(A,V),dt=new $v,lt=new Qv(de),Wt=new c_(A,at,b,tt,g,c),Ut=new sy(A,tt,I),it=new dy(F,z,I,b),ht=new h_(F,de,z),j=new S_(F,de,z),z.programs=ct.programs,A.capabilities=I,A.extensions=de,A.properties=V,A.renderLists=dt,A.shadowMap=Ut,A.state=b,A.info=z}x!==xn&&(M=new C_(x,e.width,e.height,o,s,r));let Pt=new qh(A,F);this.xr=Pt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let E=de.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=de.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(E){E!==void 0&&(et=E,this.setSize(re,K,!1))},this.getSize=function(E){return E.set(re,K)},this.setSize=function(E,k,$=!0){if(Pt.isPresenting){Bt("WebGLRenderer: Can't change size while VR device is presenting.");return}re=E,K=k,e.width=Math.floor(E*et),e.height=Math.floor(k*et),$===!0&&(e.style.width=E+"px",e.style.height=k+"px"),M!==null&&M.setSize(e.width,e.height),this.setViewport(0,0,E,k)},this.getDrawingBufferSize=function(E){return E.set(re*et,K*et).floor()},this.setDrawingBufferSize=function(E,k,$){re=E,K=k,et=$,e.width=Math.floor(E*$),e.height=Math.floor(k*$),this.setViewport(0,0,E,k)},this.setEffects=function(E){if(x===xn){Ht("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let k=0;k<E.length;k++)if(E[k].isOutputPass===!0){Bt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(nt)},this.getViewport=function(E){return E.copy(bt)},this.setViewport=function(E,k,$,H){E.isVector4?bt.set(E.x,E.y,E.z,E.w):bt.set(E,k,$,H),b.viewport(nt.copy(bt).multiplyScalar(et).round())},this.getScissor=function(E){return E.copy(Jt)},this.setScissor=function(E,k,$,H){E.isVector4?Jt.set(E.x,E.y,E.z,E.w):Jt.set(E,k,$,H),b.scissor(yt.copy(Jt).multiplyScalar(et).round())},this.getScissorTest=function(){return Fe},this.setScissorTest=function(E){b.setScissorTest(Fe=E)},this.setOpaqueSort=function(E){St=E},this.setTransparentSort=function(E){Vt=E},this.getClearColor=function(E){return E.copy(Wt.getClearColor())},this.setClearColor=function(){Wt.setClearColor(...arguments)},this.getClearAlpha=function(){return Wt.getClearAlpha()},this.setClearAlpha=function(){Wt.setClearAlpha(...arguments)},this.clear=function(E=!0,k=!0,$=!0){let H=0;if(E){let G=!1;if(st!==null){let gt=st.texture.format;G=m.has(gt)}if(G){let gt=st.texture.type,Mt=p.has(gt),mt=Wt.getClearColor(),Et=Wt.getClearAlpha(),It=mt.r,qt=mt.g,Qt=mt.b;Mt?(y[0]=It,y[1]=qt,y[2]=Qt,y[3]=Et,F.clearBufferuiv(F.COLOR,0,y)):(w[0]=It,w[1]=qt,w[2]=Qt,w[3]=Et,F.clearBufferiv(F.COLOR,0,w))}else H|=F.COLOR_BUFFER_BIT}k&&(H|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(H|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&F.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),P=E},this.dispose=function(){e.removeEventListener("webglcontextlost",_e,!1),e.removeEventListener("webglcontextrestored",ce,!1),e.removeEventListener("webglcontextcreationerror",Nn,!1),Wt.dispose(),dt.dispose(),lt.dispose(),V.dispose(),at.dispose(),tt.dispose(),xt.dispose(),it.dispose(),ct.dispose(),Pt.dispose(),Pt.removeEventListener("sessionstart",md),Pt.removeEventListener("sessionend",gd),ji.stop()};function _e(E){E.preventDefault(),Mh("WebGLRenderer: Context Lost."),R=!0}function ce(){Mh("WebGLRenderer: Context Restored."),R=!1;let E=z.autoReset,k=Ut.enabled,$=Ut.autoUpdate,H=Ut.needsUpdate,G=Ut.type;kt(),z.autoReset=E,Ut.enabled=k,Ut.autoUpdate=$,Ut.needsUpdate=H,Ut.type=G}function Nn(E){Ht("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Jn(E){let k=E.target;k.removeEventListener("dispose",Jn),S0(k)}function S0(E){T0(E),V.remove(E)}function T0(E){let k=V.get(E).programs;k!==void 0&&(k.forEach(function($){ct.releaseProgram($)}),E.isShaderMaterial&&ct.releaseShaderCache(E))}this.renderBufferDirect=function(E,k,$,H,G,gt){k===null&&(k=mn);let Mt=G.isMesh&&G.matrixWorld.determinantAffine()<0,mt=A0(E,k,$,H,G);b.setMaterial(H,Mt);let Et=$.index,It=1;if(H.wireframe===!0){if(Et=Z.getWireframeAttribute($),Et===void 0)return;It=2}let qt=$.drawRange,Qt=$.attributes.position,At=qt.start*It,le=(qt.start+qt.count)*It;gt!==null&&(At=Math.max(At,gt.start*It),le=Math.min(le,(gt.start+gt.count)*It)),Et!==null?(At=Math.max(At,0),le=Math.min(le,Et.count)):Qt!=null&&(At=Math.max(At,0),le=Math.min(le,Qt.count));let Le=le-At;if(Le<0||Le===1/0)return;xt.setup(G,H,mt,$,Et);let ye,ge=ht;if(Et!==null&&(ye=ot.get(Et),ge=j,ge.setIndex(ye)),G.isMesh)H.wireframe===!0?(b.setLineWidth(H.wireframeLinewidth*Ie()),ge.setMode(F.LINES)):ge.setMode(F.TRIANGLES);else if(G.isLine){let tn=H.linewidth;tn===void 0&&(tn=1),b.setLineWidth(tn*Ie()),G.isLineSegments?ge.setMode(F.LINES):G.isLineLoop?ge.setMode(F.LINE_LOOP):ge.setMode(F.LINE_STRIP)}else G.isPoints?ge.setMode(F.POINTS):G.isSprite&&ge.setMode(F.TRIANGLES);if(G.isBatchedMesh)if(de.get("WEBGL_multi_draw"))ge.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let tn=G._multiDrawStarts,_t=G._multiDrawCounts,ln=G._multiDrawCount,ie=Et?ot.get(Et).bytesPerElement:1,En=V.get(H).currentProgram.getUniforms();for(let Kn=0;Kn<ln;Kn++)En.setValue(F,"_gl_DrawID",Kn),ge.render(tn[Kn]/ie,_t[Kn])}else if(G.isInstancedMesh)ge.renderInstances(At,Le,G.count);else if($.isInstancedBufferGeometry){let tn=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,_t=Math.min($.instanceCount,tn);ge.renderInstances(At,Le,_t)}else ge.render(At,Le)};function pd(E,k,$,H){P!==null&&E.isNodeMaterial&&P.setObject(H,E),ae===!0&&Dt.setState(E,$,!1),E.transparent===!0&&E.side===Re&&E.forceSinglePass===!1?(E.side=je,E.needsUpdate=!0,Na(E,k,H),E.side=Oi,E.needsUpdate=!0,Na(E,k,H),E.side=Re):Na(E,k,H)}this.compile=function(E,k,$=null){$===null&&($=E),P!==null&&P.renderStart(E,k,$),T=lt.get($),T.init(k),v.push(T),$.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),E!==$&&E.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),T.setupLights(),P!==null&&P.updateLights(T.state.lightsArray),xe=this.localClippingEnabled,ae=Dt.init(this.clippingPlanes,xe),ae===!0&&Dt.setGlobalState(this.clippingPlanes,k),P!==null&&Ut.render(T.state.shadowsArray,$,k);let H=new Set;return E.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let gt=G.material;if(gt)if(Array.isArray(gt))for(let Mt=0;Mt<gt.length;Mt++){let mt=gt[Mt];pd(mt,$,k,G),H.add(mt)}else pd(gt,$,k,G),H.add(gt)}),T=v.pop(),P!==null&&P.renderEnd(),H},this.compileAsync=function(E,k,$=null){let H=this.compile(E,k,$);return new Promise(G=>{function gt(){if(H.forEach(function(Mt){let Et=V.get(Mt).currentProgram;(Et===void 0||Et.isReady())&&H.delete(Mt)}),H.size===0){G(E);return}setTimeout(gt,10)}de.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let Ml=null;function w0(E){Ml&&Ml(E)}function md(){ji.stop()}function gd(){ji.start()}let ji=new ap;ji.setAnimationLoop(w0),typeof self<"u"&&ji.setContext(self),this.setAnimationLoop=function(E){Ml=E,Pt.setAnimationLoop(E),E===null?ji.stop():ji.start()},Pt.addEventListener("sessionstart",md),Pt.addEventListener("sessionend",gd),this.render=function(E,k){if(k!==void 0&&k.isCamera!==!0){Ht("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;P!==null&&P.renderStart(E,k);let $=Pt.enabled===!0&&Pt.isPresenting===!0,H=M!==null&&(st===null||$)&&M.begin(A,st);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Pt.enabled===!0&&Pt.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(Pt.cameraAutoUpdate===!0&&Pt.updateCamera(k),k=Pt.getCamera()),E.isScene===!0&&E.onBeforeRender(A,E,k,st),T=lt.get(E,v.length),T.init(k),T.state.textureUnits=J.getTextureUnits(),v.push(T),te.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),jt.setFromProjectionMatrix(te,zn,k.reversedDepth),xe=this.localClippingEnabled,ae=Dt.init(this.clippingPlanes,xe),S=dt.get(E,C.length),S.init(),C.push(S),Pt.enabled===!0&&Pt.isPresenting===!0){let Mt=A.xr.getDepthSensingMesh();Mt!==null&&Sl(Mt,k,-1/0,A.sortObjects)}Sl(E,k,0,A.sortObjects),S.finish(),P!==null&&P.updateLights(T.state.lightsArray),A.sortObjects===!0&&S.sort(St,Vt),Te=Pt.enabled===!1||Pt.isPresenting===!1||Pt.hasDepthSensing()===!1,Te&&Wt.addToRenderList(S,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ae===!0&&Dt.beginShadows();let G=T.state.shadowsArray;if(Ut.render(G,E,k),ae===!0&&Dt.endShadows(),(H&&M.hasRenderPass())===!1){let Mt=S.opaque,mt=S.transmissive;if(T.setupLights(),k.isArrayCamera){let Et=k.cameras;if(mt.length>0)for(let It=0,qt=Et.length;It<qt;It++){let Qt=Et[It];_d(Mt,mt,E,Qt)}Te&&Wt.render(E);for(let It=0,qt=Et.length;It<qt;It++){let Qt=Et[It];xd(S,E,Qt,Qt.viewport)}}else mt.length>0&&_d(Mt,mt,E,k),Te&&Wt.render(E),xd(S,E,k)}st!==null&&Y===0&&(J.updateMultisampleRenderTarget(st),J.updateRenderTargetMipmap(st)),H&&M.end(A),E.isScene===!0&&E.onAfterRender(A,E,k),xt.resetDefaultState(),X=-1,Q=null,v.pop(),v.length>0?(T=v[v.length-1],J.setTextureUnits(T.state.textureUnits),ae===!0&&Dt.setGlobalState(A.clippingPlanes,T.state.camera)):T=null,C.pop(),C.length>0?S=C[C.length-1]:S=null,P!==null&&P.renderEnd()};function Sl(E,k,$,H){if(E.visible===!1)return;if(E.layers.test(k.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(k);else if(E.isLightProbeGrid)T.pushLightProbeGrid(E);else if(E.isLight)T.pushLight(E),E.castShadow&&T.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||E.intersectsFrustum(jt)){H&&We.setFromMatrixPosition(E.matrixWorld).applyMatrix4(te);let Mt=tt.update(E),mt=E.material;mt.visible&&S.push(E,Mt,mt,$,We.z,null,k)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||E.intersectsFrustum(jt))){let Mt=tt.update(E),mt=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),We.copy(E.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),We.copy(Mt.boundingSphere.center)),We.applyMatrix4(E.matrixWorld).applyMatrix4(te)),Array.isArray(mt)){let Et=Mt.groups;for(let It=0,qt=Et.length;It<qt;It++){let Qt=Et[It],At=mt[Qt.materialIndex];At&&At.visible&&S.push(E,Mt,At,$,We.z,Qt,k)}}else mt.visible&&S.push(E,Mt,mt,$,We.z,null,k)}}let gt=E.children;for(let Mt=0,mt=gt.length;Mt<mt;Mt++)Sl(gt[Mt],k,$,H)}function xd(E,k,$,H){let{opaque:G,transmissive:gt,transparent:Mt}=E;T.setupLightsView($),ae===!0&&Dt.setGlobalState(A.clippingPlanes,$),H&&b.viewport(nt.copy(H)),G.length>0&&ka(G,k,$),gt.length>0&&ka(gt,k,$),Mt.length>0&&ka(Mt,k,$),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function _d(E,k,$,H){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[H.id]===void 0){let At=de.has("EXT_color_buffer_half_float")||de.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[H.id]=new sn(1,1,{generateMipmaps:!0,type:At?qn:xn,minFilter:Hi,samples:Math.max(4,I.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ee.workingColorSpace})}let gt=T.state.transmissionRenderTarget[H.id],Mt=H.viewport||nt;gt.setSize(Mt.z*A.transmissionResolutionScale,Mt.w*A.transmissionResolutionScale);let mt=A.getRenderTarget(),Et=A.getActiveCubeFace(),It=A.getActiveMipmapLevel();A.setRenderTarget(gt),A.getClearColor(ue),Zt=A.getClearAlpha(),Zt<1&&A.setClearColor(16777215,.5),A.clear(),Te&&Wt.render($);let qt=A.toneMapping;A.toneMapping=Wn;let Qt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),T.setupLightsView(H),ae===!0&&Dt.setGlobalState(A.clippingPlanes,H),ka(E,$,H),J.updateMultisampleRenderTarget(gt),J.updateRenderTargetMipmap(gt),de.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let le=0,Le=k.length;le<Le;le++){let ye=k[le],{object:ge,geometry:tn,material:_t,group:ln}=ye;if(_t.side===Re&&ge.layers.test(H.layers)){let ie=_t.side;_t.side=je,_t.needsUpdate=!0,vd(ge,$,H,tn,_t,ln),_t.side=ie,_t.needsUpdate=!0,At=!0}}At===!0&&(J.updateMultisampleRenderTarget(gt),J.updateRenderTargetMipmap(gt))}A.setRenderTarget(mt,Et,It),A.setClearColor(ue,Zt),Qt!==void 0&&(H.viewport=Qt),A.toneMapping=qt}function ka(E,k,$){let H=k.isScene===!0?k.overrideMaterial:null;for(let G=0,gt=E.length;G<gt;G++){let Mt=E[G],{object:mt,geometry:Et,group:It}=Mt,qt=Mt.material;qt.allowOverride===!0&&H!==null&&(qt=H),mt.layers.test($.layers)&&vd(mt,k,$,Et,qt,It)}}function vd(E,k,$,H,G,gt){P!==null&&G.isNodeMaterial&&P.setObject(E,G),E.onBeforeRender(A,k,$,H,G,gt),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(A,k,$,H,E,gt),G.transparent===!0&&G.side===Re&&G.forceSinglePass===!1?(G.side=je,G.needsUpdate=!0,A.renderBufferDirect($,k,H,G,E,gt),G.side=Oi,G.needsUpdate=!0,A.renderBufferDirect($,k,H,G,E,gt),G.side=Re):A.renderBufferDirect($,k,H,G,E,gt),E.onAfterRender(A,k,$,H,G,gt)}function Na(E,k,$){k.isScene!==!0&&(k=mn);let H=V.get(E),G=T.state.lights,gt=T.state.shadowsArray,Mt=G.state.version,mt=ct.getParameters(E,G.state,gt,k,$,T.state.lightProbeGridArray),Et=ct.getProgramCacheKey(mt),It=H.programs;H.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?k.environment:null,H.fog=k.fog;let qt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;H.envMap=at.get(E.envMap||H.environment,qt),H.envMapRotation=H.environment!==null&&E.envMap===null?k.environmentRotation:E.envMapRotation,It===void 0&&(E.addEventListener("dispose",Jn),It=new Map,H.programs=It);let Qt=It.get(Et);if(Qt!==void 0){if(H.currentProgram===Qt&&H.lightsStateVersion===Mt)return bd(E,mt),Qt}else mt.uniforms=ct.getUniforms(E),P!==null&&E.isNodeMaterial&&P.build(E,$,mt),E.onBeforeCompile(mt,A),Qt=ct.acquireProgram(mt,Et),It.set(Et,Qt),H.uniforms=mt.uniforms;let At=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(At.clippingPlanes=Dt.uniform),bd(E,mt),H.needsLights=R0(E),H.lightsStateVersion=Mt,H.needsLights&&(At.ambientLightColor.value=G.state.ambient,At.lightProbe.value=G.state.probe,At.sunLights.value=G.state.sun,At.sunLightShadows.value=G.state.sunShadow,At.directionalLights.value=G.state.directional,At.directionalLightShadows.value=G.state.directionalShadow,At.spotLights.value=G.state.spot,At.spotLightShadows.value=G.state.spotShadow,At.rectAreaLights.value=G.state.rectArea,At.ltc_1.value=G.state.rectAreaLTC1,At.ltc_2.value=G.state.rectAreaLTC2,At.pointLights.value=G.state.point,At.pointLightShadows.value=G.state.pointShadow,At.hemisphereLights.value=G.state.hemi,At.sunShadowMatrix.value=G.state.sunShadowMatrix,At.sunShadowCascade.value=G.state.sunShadowCascade,At.directionalShadowMatrix.value=G.state.directionalShadowMatrix,At.spotLightMatrix.value=G.state.spotLightMatrix,At.spotLightMap.value=G.state.spotLightMap,At.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=T.state.lightProbeGridArray.length>0,H.currentProgram=Qt,H.uniformsList=null,Qt}function yd(E){if(E.uniformsList===null){let k=E.currentProgram.getUniforms();E.uniformsList=js.seqWithValue(k.seq,E.uniforms)}return E.uniformsList}function bd(E,k){let $=V.get(E);$.outputColorSpace=k.outputColorSpace,$.batching=k.batching,$.batchingColor=k.batchingColor,$.instancing=k.instancing,$.instancingColor=k.instancingColor,$.instancingMorph=k.instancingMorph,$.skinning=k.skinning,$.morphTargets=k.morphTargets,$.morphNormals=k.morphNormals,$.morphColors=k.morphColors,$.morphTargetsCount=k.morphTargetsCount,$.numClippingPlanes=k.numClippingPlanes,$.numIntersection=k.numClipIntersection,$.vertexAlphas=k.vertexAlphas,$.vertexTangents=k.vertexTangents,$.toneMapping=k.toneMapping}function E0(E,k){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;_.setFromMatrixPosition(k.matrixWorld);for(let $=0,H=E.length;$<H;$++){let G=E[$];if(G.texture!==null&&G.boundingBox.containsPoint(_))return G}return null}function A0(E,k,$,H,G){k.isScene!==!0&&(k=mn),J.resetTextureUnits();let gt=k.fog,Mt=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?k.environment:null,mt=st===null?A.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:ee.workingColorSpace,Et=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,It=at.get(H.envMap||Mt,Et),qt=H.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Qt=!!$.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),At=!!$.morphAttributes.position,le=!!$.morphAttributes.normal,Le=!!$.morphAttributes.color,ye=Wn;H.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(ye=A.toneMapping);let ge=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,tn=ge!==void 0?ge.length:0,_t=V.get(H),ln=T.state.lights;if(ae===!0&&(xe===!0||E!==Q)){let ve=E===Q&&H.id===X;Dt.setState(H,E,ve)}let ie=!1;H.version===_t.__version?(_t.needsLights&&_t.lightsStateVersion!==ln.state.version||_t.outputColorSpace!==mt||G.isBatchedMesh&&_t.batching===!1||!G.isBatchedMesh&&_t.batching===!0||G.isBatchedMesh&&_t.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&_t.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&_t.instancing===!1||!G.isInstancedMesh&&_t.instancing===!0||G.isSkinnedMesh&&_t.skinning===!1||!G.isSkinnedMesh&&_t.skinning===!0||G.isInstancedMesh&&_t.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&_t.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&_t.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&_t.instancingMorph===!1&&G.morphTexture!==null||_t.envMap!==It||H.fog===!0&&_t.fog!==gt||_t.numClippingPlanes!==void 0&&(_t.numClippingPlanes!==Dt.numPlanes||_t.numIntersection!==Dt.numIntersection)||_t.vertexAlphas!==qt||_t.vertexTangents!==Qt||_t.morphTargets!==At||_t.morphNormals!==le||_t.morphColors!==Le||_t.toneMapping!==ye||_t.morphTargetsCount!==tn||!!_t.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(ie=!0):(ie=!0,_t.__version=H.version);let En=_t.currentProgram;ie===!0&&(En=Na(H,k,G),P&&H.isNodeMaterial&&P.onUpdateProgram(H,En,_t));let Kn=!1,Mi=!1,bs=!1,pe=En.getUniforms(),Ae=_t.uniforms;if(b.useProgram(En.program)&&(Kn=!0,Mi=!0,bs=!0),H.id!==X&&(X=H.id,Mi=!0),_t.needsLights){let ve=E0(T.state.lightProbeGridArray,G);_t.lightProbeGrid!==ve&&(_t.lightProbeGrid=ve,Mi=!0)}if(Kn||Q!==E){b.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),pe.setValue(F,"projectionMatrix",E.projectionMatrix),pe.setValue(F,"viewMatrix",E.matrixWorldInverse);let Ti=pe.map.cameraPosition;Ti!==void 0&&Ti.setValue(F,Me.setFromMatrixPosition(E.matrixWorld)),I.logarithmicDepthBuffer&&pe.setValue(F,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&pe.setValue(F,"isOrthographic",E.isOrthographicCamera===!0),Q!==E&&(Q=E,Mi=!0,bs=!0)}if(_t.needsLights&&(ln.state.sunShadowMap.length>0&&pe.setValue(F,"sunShadowMap",ln.state.sunShadowMap,J),ln.state.directionalShadowMap.length>0&&pe.setValue(F,"directionalShadowMap",ln.state.directionalShadowMap,J),ln.state.spotShadowMap.length>0&&pe.setValue(F,"spotShadowMap",ln.state.spotShadowMap,J),ln.state.pointShadowMap.length>0&&pe.setValue(F,"pointShadowMap",ln.state.pointShadowMap,J)),G.isSkinnedMesh){pe.setOptional(F,G,"bindMatrix"),pe.setOptional(F,G,"bindMatrixInverse");let ve=G.skeleton;ve&&(ve.boneTexture===null&&ve.computeBoneTexture(),pe.setValue(F,"boneTexture",ve.boneTexture,J))}G.isBatchedMesh&&(pe.setOptional(F,G,"batchingTexture"),pe.setValue(F,"batchingTexture",G._matricesTexture,J),pe.setOptional(F,G,"batchingIdTexture"),pe.setValue(F,"batchingIdTexture",G._indirectTexture,J),pe.setOptional(F,G,"batchingColorTexture"),G._colorsTexture!==null&&pe.setValue(F,"batchingColorTexture",G._colorsTexture,J));let Si=$.morphAttributes;if((Si.position!==void 0||Si.normal!==void 0||Si.color!==void 0)&&U.update(G,$,En),(Mi||_t.receiveShadow!==G.receiveShadow)&&(_t.receiveShadow=G.receiveShadow,pe.setValue(F,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&k.environment!==null&&(Ae.envMapIntensity.value=k.environmentIntensity),Ae.dfgLUT!==void 0&&(Ae.dfgLUT.value=py()),Mi){if(pe.setValue(F,"toneMappingExposure",A.toneMappingExposure),_t.needsLights&&C0(Ae,bs),gt&&H.fog===!0&&Lt.refreshFogUniforms(Ae,gt),Lt.refreshMaterialUniforms(Ae,H,et,K,T.state.transmissionRenderTarget[E.id]),_t.needsLights&&_t.lightProbeGrid){let ve=_t.lightProbeGrid;Ae.probesSH.value=ve.texture,Ae.probesMin.value.copy(ve.boundingBox.min),Ae.probesMax.value.copy(ve.boundingBox.max),Ae.probesResolution.value.copy(ve.resolution)}js.upload(F,yd(_t),Ae,J)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(js.upload(F,yd(_t),Ae,J),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&pe.setValue(F,"center",G.center),pe.setValue(F,"modelViewMatrix",G.modelViewMatrix),pe.setValue(F,"normalMatrix",G.normalMatrix),pe.setValue(F,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){let ve=H.uniformsGroups;for(let Ti=0,Ms=ve.length;Ti<Ms;Ti++){let Sd=ve[Ti];it.update(Sd,En),it.bind(Sd,En)}}return En}function C0(E,k){E.ambientLightColor.needsUpdate=k,E.lightProbe.needsUpdate=k,E.sunLights.needsUpdate=k,E.sunLightShadows.needsUpdate=k,E.directionalLights.needsUpdate=k,E.directionalLightShadows.needsUpdate=k,E.pointLights.needsUpdate=k,E.pointLightShadows.needsUpdate=k,E.spotLights.needsUpdate=k,E.spotLightShadows.needsUpdate=k,E.rectAreaLights.needsUpdate=k,E.hemisphereLights.needsUpdate=k}function R0(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return st},this.setRenderTargetTextures=function(E,k,$){let H=V.get(E);H.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),V.get(E.texture).__webglTexture=k,V.get(E.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:$,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,k){let $=V.get(E);$.__webglFramebuffer=k,$.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(E,k=0,$=0){st=E,q=k,Y=$;let H=null,G=!1,gt=!1;if(E){let mt=V.get(E);if(mt.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(F.FRAMEBUFFER,mt.__webglFramebuffer),nt.copy(E.viewport),yt.copy(E.scissor),wt=E.scissorTest,b.viewport(nt),b.scissor(yt),b.setScissorTest(wt),X=-1;return}else if(mt.__webglFramebuffer===void 0)J.setupRenderTarget(E);else if(mt.__hasExternalTextures)J.rebindTextures(E,V.get(E.texture).__webglTexture,V.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let qt=E.depthTexture;if(mt.__boundDepthTexture!==qt){if(qt!==null&&V.has(qt)&&(E.width!==qt.image.width||E.height!==qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(E)}}let Et=E.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(gt=!0);let It=V.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(It[k])?H=It[k][$]:H=It[k],G=!0):E.samples>0&&J.useMultisampledRTT(E)===!1?H=V.get(E).__webglMultisampledFramebuffer:Array.isArray(It)?H=It[$]:H=It,nt.copy(E.viewport),yt.copy(E.scissor),wt=E.scissorTest}else nt.copy(bt).multiplyScalar(et).floor(),yt.copy(Jt).multiplyScalar(et).floor(),wt=Fe;if($!==0&&(H=D),b.bindFramebuffer(F.FRAMEBUFFER,H)&&b.drawBuffers(E,H),b.viewport(nt),b.scissor(yt),b.setScissorTest(wt),G){let mt=V.get(E.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+k,mt.__webglTexture,$)}else if(gt){let mt=k;for(let Et=0;Et<E.textures.length;Et++){let It=V.get(E.textures[Et]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Et,It.__webglTexture,$,mt)}}else if(E!==null&&$!==0){let mt=V.get(E.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,mt.__webglTexture,$)}X=-1};function Md(E){let k=V.get(E);return(k.__readFormat!==E.format||k.__readType!==E.type)&&(k.__readFormat=E.format,k.__readType=E.type,k.__formatReadable=I.textureFormatReadable(E.format),k.__typeReadable=I.textureTypeReadable(E.type)),k}this.readRenderTargetPixels=function(E,k,$,H,G,gt,Mt,mt=0){if(!(E&&E.isWebGLRenderTarget)){Ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=V.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Mt!==void 0&&(Et=Et[Mt]),Et){b.bindFramebuffer(F.FRAMEBUFFER,Et);try{let It=E.textures[mt],qt=It.format,Qt=It.type;E.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+mt);let At=Md(It);if(At.__formatReadable===!1){Ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(At.__typeReadable===!1){Ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=E.width-H&&$>=0&&$<=E.height-G&&F.readPixels(k,$,H,G,ut.convert(qt),ut.convert(Qt),gt)}finally{let It=st!==null?V.get(st).__webglFramebuffer:null;b.bindFramebuffer(F.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(E,k,$,H,G,gt,Mt,mt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=V.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Mt!==void 0&&(Et=Et[Mt]),Et)if(k>=0&&k<=E.width-H&&$>=0&&$<=E.height-G){b.bindFramebuffer(F.FRAMEBUFFER,Et);let It=E.textures[mt],qt=It.format,Qt=It.type;E.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+mt);let At=Md(It);if(At.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(At.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let le=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,le),F.bufferData(F.PIXEL_PACK_BUFFER,gt.byteLength,F.STREAM_READ),F.readPixels(k,$,H,G,ut.convert(qt),ut.convert(Qt),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Le=st!==null?V.get(st).__webglFramebuffer:null;b.bindFramebuffer(F.FRAMEBUFFER,Le);let ye=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Df(F,ye,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,le),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,gt),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(le),F.deleteSync(ye),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,k=null,$=0){let H=Math.pow(2,-$),G=Math.floor(E.image.width*H),gt=Math.floor(E.image.height*H),Mt=k!==null?k.x:0,mt=k!==null?k.y:0;J.setTexture2D(E,0),F.copyTexSubImage2D(F.TEXTURE_2D,$,0,0,Mt,mt,G,gt),b.unbindTexture()},this.copyTextureToTexture=function(E,k,$=null,H=null,G=0,gt=0){let Mt,mt,Et,It,qt,Qt,At,le,Le,ye=E.isCompressedTexture?E.mipmaps[gt]:E.image;if($!==null)Mt=$.max.x-$.min.x,mt=$.max.y-$.min.y,Et=$.isBox3?$.max.z-$.min.z:1,It=$.min.x,qt=$.min.y,Qt=$.isBox3?$.min.z:0;else{let Ae=Math.pow(2,-G);Mt=Math.floor(ye.width*Ae),mt=Math.floor(ye.height*Ae),E.isDataArrayTexture?Et=ye.depth:E.isData3DTexture?Et=Math.floor(ye.depth*Ae):Et=1,It=0,qt=0,Qt=0}H!==null?(At=H.x,le=H.y,Le=H.z):(At=0,le=0,Le=0);let ge=ut.convert(k.format),tn=ut.convert(k.type),_t;k.isData3DTexture?(J.setTexture3D(k,0),_t=F.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(J.setTexture2DArray(k,0),_t=F.TEXTURE_2D_ARRAY):(J.setTexture2D(k,0),_t=F.TEXTURE_2D),b.activeTexture(F.TEXTURE0),b.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,k.flipY),b.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),b.pixelStorei(F.UNPACK_ALIGNMENT,k.unpackAlignment);let ln=b.getParameter(F.UNPACK_ROW_LENGTH),ie=b.getParameter(F.UNPACK_IMAGE_HEIGHT),En=b.getParameter(F.UNPACK_SKIP_PIXELS),Kn=b.getParameter(F.UNPACK_SKIP_ROWS),Mi=b.getParameter(F.UNPACK_SKIP_IMAGES);b.pixelStorei(F.UNPACK_ROW_LENGTH,ye.width),b.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ye.height),b.pixelStorei(F.UNPACK_SKIP_PIXELS,It),b.pixelStorei(F.UNPACK_SKIP_ROWS,qt),b.pixelStorei(F.UNPACK_SKIP_IMAGES,Qt);let bs=E.isDataArrayTexture||E.isData3DTexture,pe=k.isDataArrayTexture||k.isData3DTexture;if(E.isDepthTexture){let Ae=V.get(E),Si=V.get(k),ve=V.get(Ae.__renderTarget),Ti=V.get(Si.__renderTarget);b.bindFramebuffer(F.READ_FRAMEBUFFER,ve.__webglFramebuffer),b.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ti.__webglFramebuffer);for(let Ms=0;Ms<Et;Ms++)bs&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,V.get(E).__webglTexture,G,Qt+Ms),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,V.get(k).__webglTexture,gt,Le+Ms)),F.blitFramebuffer(It,qt,Mt,mt,At,le,Mt,mt,F.DEPTH_BUFFER_BIT,F.NEAREST);b.bindFramebuffer(F.READ_FRAMEBUFFER,null),b.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(G!==0||E.isRenderTargetTexture||V.has(E)){let Ae=V.get(E),Si=V.get(k);b.bindFramebuffer(F.READ_FRAMEBUFFER,L),b.bindFramebuffer(F.DRAW_FRAMEBUFFER,B);for(let ve=0;ve<Et;ve++)bs?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ae.__webglTexture,G,Qt+ve):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ae.__webglTexture,G),pe?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Si.__webglTexture,gt,Le+ve):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Si.__webglTexture,gt),G!==0?F.blitFramebuffer(It,qt,Mt,mt,At,le,Mt,mt,F.COLOR_BUFFER_BIT,F.NEAREST):pe?F.copyTexSubImage3D(_t,gt,At,le,Le+ve,It,qt,Mt,mt):F.copyTexSubImage2D(_t,gt,At,le,It,qt,Mt,mt);b.bindFramebuffer(F.READ_FRAMEBUFFER,null),b.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else pe?E.isDataTexture||E.isData3DTexture?F.texSubImage3D(_t,gt,At,le,Le,Mt,mt,Et,ge,tn,ye.data):k.isCompressedArrayTexture?F.compressedTexSubImage3D(_t,gt,At,le,Le,Mt,mt,Et,ge,ye.data):F.texSubImage3D(_t,gt,At,le,Le,Mt,mt,Et,ge,tn,ye):E.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,gt,At,le,Mt,mt,ge,tn,ye.data):E.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,gt,At,le,ye.width,ye.height,ge,ye.data):F.texSubImage2D(F.TEXTURE_2D,gt,At,le,Mt,mt,ge,tn,ye);b.pixelStorei(F.UNPACK_ROW_LENGTH,ln),b.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ie),b.pixelStorei(F.UNPACK_SKIP_PIXELS,En),b.pixelStorei(F.UNPACK_SKIP_ROWS,Kn),b.pixelStorei(F.UNPACK_SKIP_IMAGES,Mi),gt===0&&k.generateMipmaps&&F.generateMipmap(_t),b.unbindTexture()},this.initRenderTarget=function(E){V.get(E).__webglFramebuffer===void 0&&J.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?J.setTextureCube(E,0):E.isData3DTexture?J.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?J.setTexture2DArray(E,0):J.setTexture2D(E,0),b.unbindTexture()},this.resetState=function(){q=0,Y=0,st=null,b.reset(),xt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}};var Ct={classMods:{Light:{S:-.5,A:1,H:.5,G:0,W:-2},Medium:{S:0,A:0,H:0,G:0,W:0},Heavy:{S:.8,A:-1,H:-.5,G:.2,W:2.5}},characters:[{id:1,name:"Pip Thistledown",cls:"Light",setname:"Meadow Folk",personality:"Bubbly scout who narrates everything she does out loud",idle:"hops in place, straightening her acorn cap",victory:"cartwheel while petals burst from her satchel",silhouette:"tall acorn cap with a feather tuft",free:!0,playable:!0},{id:2,name:"Bramble Quill",cls:"Medium",setname:"Meadow Folk",personality:"Grumpy hedgehog mechanic who secretly loves the cheering",idle:"polishes his spiky helmet with a rag",victory:"takes a deep bow and fans his quills like a peacock",silhouette:"spiky fan-shaped helmet",free:!0,playable:!0},{id:3,name:"Marigold Hoofsworth",cls:"Heavy",setname:"Meadow Folk",personality:"Gentle giant deer who bakes and hugs every rival after the race",idle:"chews a pastry, ears twitching",victory:"lifts the trophy overhead on her antlers",silhouette:"wide antler crown with ribbons",free:!0,playable:!0},{id:4,name:"Fennel Vix",cls:"Light",setname:"Meadow Folk",personality:"Sly fox courier who always claims she planned it",idle:"flicks her tail, checks a pocket watch",victory:"spins her tail like a fan and winks",silhouette:"huge swooshing tail",free:!0,playable:!0},{id:5,name:"Hobb Mossback",cls:"Heavy",setname:"Meadow Folk",personality:"Slow-talking tortoise farmer, completely unshakable",idle:"tucks head in and out of the shell",victory:"shell spins like a top with the trophy on it",silhouette:"domed moss-covered shell backpack",free:!0,playable:!1},{id:6,name:"Juniper Wren",cls:"Light",setname:"Meadow Folk",personality:"Songbird sprinter who hums the whole race",idle:"taps the steering wheel in rhythm",victory:"flaps up and lands on the kart nose, singing",silhouette:"tiny wings flared at the shoulders",free:!0,playable:!0},{id:7,name:"Clover Dash",cls:"Medium",setname:"Meadow Folk",personality:"Over-caffeinated bunny who speed-reads the map",idle:"bounces on her toes",victory:"triple back-flip with a fist pump",silhouette:"long ears streaming behind",free:!0,playable:!0},{id:9,name:"Sage Willowmere",cls:"Medium",setname:"Meadow Folk",personality:"Calm owl tactician who whispers race advice to himself",idle:"swivels his head almost all the way round",victory:"glides a slow victory loop with wings out",silhouette:"big round facial disc and ear tufts",free:!0,playable:!1},{id:10,name:"Barnaby Bruin",cls:"Heavy",setname:"Meadow Folk",personality:"Honey-loving bear who befriends every rival by lap two",idle:"licks honey off a paw",victory:"bear-hugs the trophy and a nearby official",silhouette:"round ears and a broad belly",free:!0,playable:!1},{id:11,name:"Captain Dusk Marlowe",cls:"Medium",setname:"Neon Harbor",personality:"Weathered tug pilot who calls everyone kid",idle:"leans on the wheel and sips tea",victory:"tips his cap as an air-horn sounds",silhouette:"peaked captain's cap and pipe",free:!0,playable:!0},{id:13,name:"Gus Gantry",cls:"Heavy",setname:"Neon Harbor",personality:"Patient crane operator who plans three turns ahead",idle:"swings an imaginary crane hook",victory:"picks up his own kart with a cheer (hook animation)",silhouette:"broad yellow hard hat and hi-vis vest",free:!0,playable:!0},{id:18,name:"Pearl Quayside",cls:"Light",setname:"Neon Harbor",personality:"Ferry-boat kid with a heart of gold and a fast hand",idle:"juggles three coins",victory:"coin shower from her oversized coat",silhouette:"tiny frame in a huge coat",free:!0,playable:!1}],bodies:[{name:"Corsa Standard",family:"Cruiser",S:6,A:5,H:6,G:5,W:5,desc:"The all-rounder every driver learns on: a red open-wheel with a friendly nose",price:0,slice:!0},{name:"Needle",family:"Dart",S:9,A:3,H:5,G:5,W:3,desc:"Ultra-narrow dart that wants a long straight",price:600,slice:!0},{name:"Slidewinder",family:"Drifter",S:4,A:5,H:6,G:7,W:4,desc:"Low serpent body with a spiral exhaust",price:0,slice:!0},{name:"Ironclad",family:"Bruiser",S:7,A:2,H:4,G:9,W:10,desc:"Armour-plated brick on tracks, nothing moves it",price:1e3,slice:!0},{name:"Pogo",family:"Rocket",S:3,A:9,H:5,G:5,W:2,desc:"Spring-loaded pogo kart that explodes off the line",price:0,slice:!0},{name:"Pumpkin Coach",family:"Oddball",S:6,A:4,H:6,G:6,W:6,desc:"Carved pumpkin carriage with lantern lights",price:1e3,slice:!0}],wheels:[{name:"Six-Spoke Standard",tire:"Street",S:0,A:0,H:0,G:0,W:0,off:0,desc:"Classic six-spoke alloy",price:0},{name:"Turbine Fan",tire:"Street",S:.3,A:-.2,H:0,G:0,W:0,off:0,desc:"Fan-blade rim, tuned for top speed",price:250},{name:"Mesh Classic",tire:"Street",S:0,A:.2,H:0,G:-.1,W:-.2,off:0,desc:"Lightweight mesh rim",price:250},{name:"Dish Deep",tire:"Racing",S:.2,A:0,H:.1,G:-.1,W:.2,off:0,desc:"Deep-dish chrome look",price:350},{name:"Starburst",tire:"Street",S:0,A:.1,H:.2,G:0,W:0,off:0,desc:"Ten-spoke star rim",price:300},{name:"Slick Racing",tire:"Slick",S:.2,A:0,H:0,G:.5,W:0,off:-.5,desc:"Slick compound, loves tarmac, hates dirt",price:500},{name:"Trail Grip",tire:"Trail",S:-.2,A:0,H:0,G:.1,W:.2,off:.6,desc:"Knobbly trail tyres for shortcuts",price:450},{name:"Mudder",tire:"Mud",S:-.3,A:0,H:0,G:.2,W:.4,off:1,desc:"Deep-lug mud tyres, best off-road",price:600},{name:"Balloon Soft",tire:"Balloon",S:-.3,A:.1,H:.2,G:0,W:.2,off:.3,desc:"Soft balloon tyres that absorb bumps",price:400},{name:"Featherweight",tire:"Carbon",S:.1,A:.4,H:0,G:-.2,W:-.5,off:-.2,desc:"Carbon rims, ultra light",price:700},{name:"Anvil Steel",tire:"Street",S:0,A:-.3,H:0,G:.2,W:.5,off:.1,desc:"Heavy steel rims, planted",price:400},{name:"Rally Grip",tire:"Trail",S:0,A:.1,H:.1,G:.3,W:0,off:.4,desc:"Rally compound all-rounder",price:550},{name:"Ice Studs",tire:"Studded",S:-.1,A:0,H:0,G:.3,W:.1,off:.2,desc:"Studded for slippery ice sections",price:500},{name:"Hover Pad",tire:"Hover",S:-.2,A:.2,H:.3,G:-.2,W:-.6,off:.5,desc:"Short hover pads, light but loose",price:900},{name:"Flywheel",tire:"Racing",S:.3,A:-.1,H:0,G:0,W:.3,off:0,desc:"Flywheel-balanced racing rim",price:650},{name:"Spinner Disc",tire:"Racing",S:.1,A:.1,H:.1,G:0,W:0,off:0,desc:"Disc cover with a spinner",price:500},{name:"Candy Cane",tire:"Street",S:0,A:0,H:.2,G:.1,W:0,off:0,desc:"Striped twisted spoke",price:350},{name:"Gearwheel",tire:"Street",S:0,A:.2,H:0,G:.1,W:.1,off:0,desc:"Cog-shaped rim, clanks on corners",price:450}],wheelSizes:[{size:'12"',S:-.4,A:.4,H:.2,G:.1,W:-.2},{size:'13"',S:-.2,A:.2,H:.1,G:.05,W:-.1},{size:'14"',S:0,A:0,H:0,G:0,W:0},{size:'15"',S:.2,A:-.2,H:-.1,G:-.05,W:.1},{size:'16"',S:.4,A:-.4,H:-.2,G:-.1,W:.2}],spoilers:[{name:"None",S:0,A:0,H:0,G:0,W:0,desc:"No wing",price:0},{name:"Low Lip",S:.1,A:0,H:0,G:.1,W:0,desc:"Small ducktail lip",price:100},{name:"Duck Tail",S:.1,A:.1,H:0,G:.1,W:.1,desc:"Classic ducktail",price:150},{name:"GT Wing",S:.2,A:-.1,H:0,G:.3,W:.1,desc:"Large wing, more grip at speed",price:300},{name:"Dual Plane",S:.3,A:-.2,H:0,G:.3,W:.2,desc:"Double-element wing for fast tracks",price:450},{name:"Swan Neck",S:.2,A:0,H:-.1,G:.4,W:.1,desc:"Swan-neck mount, strong downforce",price:500},{name:"Barn Door",S:-.1,A:-.3,H:.1,G:.6,W:.3,desc:"Huge barn-door wing, great grip but slow",price:450},{name:"Shark Fin",S:.1,A:.1,H:.3,G:0,W:0,desc:"Vertical fin for crisp handling",price:350},{name:"Roof Scoop",S:0,A:.3,H:0,G:0,W:.1,desc:"Intake scoop, helps accel",price:350},{name:"Twin Tail",S:.2,A:.1,H:.1,G:0,W:0,desc:"Twin-tail rudders",price:500},{name:"Pop-up Flap",S:.3,A:-.3,H:0,G:.1,W:0,desc:"Air-brake flap used on long straights",price:400},{name:"Feather Wing",S:.1,A:.2,H:0,G:-.1,W:-.3,desc:"Carbon feather-light wing",price:600}],exhausts:[{name:"Stock Pipe",S:0,A:0,H:0,G:0,W:0,desc:"Standard single tailpipe",price:0},{name:"Twin Chrome",S:.1,A:.1,H:0,G:0,W:.1,desc:"Twin chrome pipes",price:150},{name:"Side Pipes",S:0,A:.2,H:0,G:0,W:0,desc:"Side-exit pipes",price:200},{name:"Megaphone",S:.2,A:.1,H:0,G:0,W:.1,desc:"Loud megaphone exhaust",price:250},{name:"Upswept",S:.1,A:0,H:.1,G:0,W:0,desc:"Upswept pipe, tiny gain in clearance",price:250},{name:"Flame Thrower",S:0,A:.3,H:0,G:-.1,W:.1,desc:"Shoots flames on boost",price:400},{name:"Quad Stack",S:.3,A:.1,H:0,G:-.1,W:.2,desc:"Four-barrel stack",price:500},{name:"Turbo Whistle",S:.1,A:.3,H:0,G:0,W:0,desc:"Whistling turbo exhaust",price:550},{name:"Bubbler",S:0,A:.1,H:.1,G:.1,W:0,desc:"Blows bubbles on boost",price:400},{name:"Rocket Nozzle",S:.4,A:.3,H:-.1,G:-.1,W:.2,desc:"Single rocket nozzle, high power but demanding",price:700}],bumpers:[{name:"Stock Bumper",S:0,A:0,H:0,G:0,W:0,desc:"Standard bumper",price:0},{name:"Rubber Pusher",S:0,A:0,H:0,G:.1,W:.2,desc:"Soft rubber bumper that shrugs off bumps",price:200},{name:"Splitter",S:.1,A:0,H:.1,G:0,W:-.1,desc:"Aero splitter",price:300},{name:"Cow Catcher",S:-.1,A:-.1,H:0,G:0,W:.4,desc:"Heavy cow-catcher grille",price:350},{name:"Spike Guard",S:0,A:0,H:0,G:.1,W:.3,desc:"Decorative spikes, increases push-through",price:400},{name:"Tiny Bumper",S:.1,A:.1,H:.1,G:-.1,W:-.3,desc:"Minimal bumper for lightness",price:450},{name:"Rubber Duck Horn",S:0,A:.1,H:0,G:0,W:.1,desc:"Squeaky horn bumper (cosmetic horn sound)",price:250},{name:"Twin Prongs",S:.1,A:0,H:.2,G:0,W:.1,desc:"Forked prongs for light contact",price:500}],rimColors:[{name:"Chrome",hex:"#e8edf2"},{name:"Gunmetal",hex:"#5b6571"},{name:"Gold",hex:"#e5b84a"},{name:"Bronze",hex:"#b0793a"},{name:"Signal Red",hex:"#d7263d"},{name:"Cherry",hex:"#a31735"},{name:"Sunset Orange",hex:"#ff7a1a"},{name:"Lemon",hex:"#ffe347"},{name:"Lime",hex:"#8bd800"},{name:"Mint",hex:"#7fe0b0"},{name:"Teal",hex:"#13b3b3"},{name:"Sky Blue",hex:"#3fa9f5"},{name:"Cobalt",hex:"#2457d6"},{name:"Violet",hex:"#7d4fd1"},{name:"Hot Pink",hex:"#ff3f95"},{name:"Pearl White",hex:"#f4f1ea"},{name:"Jet Black",hex:"#16181d"},{name:"Rainbow Anodized",hex:"rainbow"}],rimFinishes:["Polished","Satin","Anodized"],paintColors:[{name:"Cherry Red",hex:"#d7263d"},{name:"Sunset Orange",hex:"#ff7a1a"},{name:"Marigold",hex:"#ffb400"},{name:"Lemon Zest",hex:"#ffe347"},{name:"Lime Pop",hex:"#8bd800"},{name:"Meadow Green",hex:"#2fae4a"},{name:"Mint Julep",hex:"#7fe0b0"},{name:"Teal Wave",hex:"#13b3b3"},{name:"Sky Blue",hex:"#3fa9f5"},{name:"Cobalt",hex:"#2457d6"},{name:"Indigo Night",hex:"#2a2f87"},{name:"Violet Haze",hex:"#7d4fd1"},{name:"Orchid",hex:"#b46ad8"},{name:"Hot Pink",hex:"#ff3f95"},{name:"Bubblegum",hex:"#ff9ec7"},{name:"Coral",hex:"#ff6b57"},{name:"Chocolate",hex:"#6b3f2a"},{name:"Sandstone",hex:"#d9b97a"},{name:"Pearl White",hex:"#f4f1ea"},{name:"Ice Silver",hex:"#c9d1d9"},{name:"Gunmetal",hex:"#5b6571"},{name:"Jet Black",hex:"#16181d"},{name:"Midnight Blue",hex:"#142a4f"},{name:"Forest",hex:"#1f5a34"},{name:"Rust",hex:"#a4472a"},{name:"Peach",hex:"#ffb08a"},{name:"Aqua",hex:"#41d8e8"},{name:"Lavender",hex:"#bda9ee"},{name:"Burgundy",hex:"#7d1633"},{name:"Olive",hex:"#7b7d2a"},{name:"Turquoise",hex:"#20c9b0"},{name:"Gold Leaf",hex:"#e5b84a"}],paintFinishes:["Gloss","Matte","Metallic","Pearl","Candy"],twoTone:["Hood Stripe","Split Down","Roof Cap","Fade Front-Back","Racing Number Panel","Bib","Lower Skirt","Diagonal"],decals:["Racing Stripes","Twin Stripes","Checker Flag","Lightning Bolt","Flame Licks","Polka Dots","Star Field","Camo Splash","Zigzag","Wave Crest","Honeycomb","Number 7","Number 42","Number 99","Sun Burst","Skull & Wrenches","Paw Prints","Leaf Pattern","Snowflakes","Circuit Lines","Candy Swirl","Tiger Stripes","Argyle","Galaxy Swirl"],modCap:1.5};var qi={meadow:{id:"meadow",name:"Buttercup Meadows",cup:"Seedling Cup",order:1,theme:"meadow",width:15,offroad:9,mapOrder:1,bpm:122,music:"buttercup",amb:"meadow",env:"open",shortcut:{pts:[[429.3,-7.02],[434.99,-26.77],[435.12,-72.97],[435.18,-96.77],[435.24,-120.57],[435.36,-166.76],[425.27,-181.66]],width:11,surface:"rough",s1:614,s2:894,side:1},rows:[.13,.3,.5,.7,.88],pads:[.22,.6],coinGroups:[.08,.2,.34,.45,.56,.66,.77,.9],hazards:[{type:"sheep",f:.38}],zones:[],landmark:{type:"windmill",f:.05,lat:70},prog:[["F",520],["L",90,60],["F",50],["R",50,60],["F",30],["L",50,60],["F",90],["L",90,45],["F",130],["R",80,30],["F",20],["L",80,30],["F",70],["L",90,50],["F",150],["L",90,60],["F",100]],fix:[0,14],start:150,scale:1.176},harbor:{id:"harbor",name:"Lantern Harbor",cup:"Seedling Cup",order:2,theme:"harbor",width:15,offroad:9,mapOrder:2,bpm:126,music:"lantern",amb:"harbor",env:"metal",shortcut:{pts:[[422.5,.62],[407.5,-9.38],[364.73,-51.83],[342.7,-73.69],[320.67,-95.56],[277.9,-138],[267.9,-153]],width:11,surface:"rough",s1:1088,s2:1388,side:1},rows:[.12,.33,.48,.66,.85],pads:[.2,.75],coinGroups:[.06,.18,.3,.42,.55,.68,.8,.92],hazards:[{type:"crane",f:.1},{type:"crane",f:.8},{type:"gate",at:"shortcut"}],zones:[],landmark:{type:"lighthouse",f:.4,lat:90},prog:[["F",400],["L",90,45],["F",150],["L",90,45],["F",260],["R",90,50],["F",90],["L",90,50],["F",120],["L",90,45],["F",300],["L",90,45],["F",100]],fix:[0,2],start:170,scale:1.1},mesa:{id:"mesa",name:"Mirage Mesa",cup:"Seedling Cup",order:3,theme:"mesa",width:16,offroad:9,mapOrder:3,bpm:118,music:"mirage",amb:"mesa",env:"canyon",shortcut:{pts:[[101.51,367.01],[119.03,371.28],[169.35,383.65],[195.28,390.02],[221.2,396.39],[271.52,408.77],[288.77,413.82]],width:11,surface:"sand",s1:286,s2:586,side:1},rows:[.14,.36,.55,.74,.9],pads:[.1,.63],coinGroups:[.05,.17,.28,.4,.5,.6,.72,.83],hazards:[{type:"boulder",f:.45},{type:"boulder",f:.62}],zones:[],landmark:{type:"arch",f:.2,lat:60},prog:[["F",250],["L",60,120],["R",40,90],["F",150],["L",110,70],["F",120],["R",60,80],["F",100],["L",90,60],["F",180],["L",80,90],["R",50,70],["F",140],["L",100,80],["F",160],["L",70,120],["F",100]],fix:[12,14],start:150,scale:.84},frost:{id:"frost",name:"Frostbite Pass",cup:"Seedling Cup",order:4,theme:"frost",width:15,offroad:9,mapOrder:4,bpm:110,music:"frost",amb:"frost",env:"ice",shortcut:{pts:[[133.87,466.92],[136.11,484.44],[175.89,495.21],[196.39,500.75],[216.88,506.3],[256.66,517.07],[266.23,531.89]],width:11,surface:"ice",s1:434,s2:664,side:1},rows:[.13,.32,.52,.72,.9],pads:[.2,.8],coinGroups:[.07,.19,.3,.42,.54,.65,.78,.89],hazards:[{type:"icicle",f:.28},{type:"icicle",f:.5},{type:"icicle",f:.86}],zones:[{f0:.55,f1:.62,surface:"ice",onlyRoad:!0,lat:[-4,8]}],landmark:{type:"waterfall",f:.6,lat:80},prog:[["F",250],["L",90,60],["F",120],["R",140,32],["F",40],["L",140,32],["F",100],["L",90,60],["F",250],["L",90,60],["F",160],["L",90,60],["F",100]],fix:[2,8],start:150,scale:1.2}};var $h=Math.PI/180;function fp(i,t=[0,0],e=14,n=null){let s=JSON.parse(JSON.stringify(i));if(n)for(let[y,w]of Object.entries(n))s[y][1]=w;let r=(y,w)=>{let _=0,S=0,T=0,C=w?[[_,S]]:null;for(let v of y)if(v[0]==="F"){let M=Math.max(1,Math.round(v[1]/e));for(let A=1;A<=M;A++){let R=v[1]/M;_+=Math.sin(T)*R,S+=Math.cos(T)*R,w&&C.push([_,S])}}else{let M=v[0]==="L",A=v[1]*$h,R=v[2],P=Math.max(1e-4,A*R),D=Math.max(2,Math.round(P/(e*.7))),L=M?1:-1,B=_+L*R*Math.cos(T),q=S-L*R*Math.sin(T);for(let Y=1;Y<=D;Y++){let st=T+L*A*(Y/D);_=B-L*R*Math.cos(st),S=q+L*R*Math.sin(st),w&&C.push([_,S])}T+=L*A}return{x:_,z:S,psi:T,pts:C}},a=0;for(let y of s)y[0]==="L"?a+=y[1]:y[0]==="R"&&(a-=y[1]);let o=r(s,!1),[c,l]=t,h=y=>{let w=0;for(let _=0;_<y;_++){let S=s[_];S[0]==="L"?w+=S[1]*$h:S[0]==="R"&&(w-=S[1]*$h)}return[Math.sin(w),Math.cos(w)]},d=h(c),u=h(l),f=d[0]*u[1]-d[1]*u[0];if(Math.abs(f)<.2)throw new Error("fix straights are parallel");let g=(-o.x*u[1]+o.z*u[0])/f,x=(-d[0]*o.z+d[1]*o.x)/f;if(s[c][1]+=g,s[l][1]+=x,s[c][1]<20||s[l][1]<20)throw new Error(`closure needs negative straight (${s[c][1].toFixed(0)}, ${s[l][1].toFixed(0)}), net turn ${a}`);let m=r(s,!0),p=m.pts;return p.pop(),{pts:p,net:a,adj:[g,x],end:[m.x,m.z],prog:s}}function pp(i,t){let e=0,n=0;for(let r=0;r<i.length;r++){let a=(r+1)%i.length,o=Math.hypot(i[a][0]-i[r][0],i[a][1]-i[r][1]);if(e+o>=t){n=r;break}e+=o}return i.slice(n).concat(i.slice(0,n))}var mp=Math.PI*2;function gp(i,t=24,e=!0,n=.5){let s=i.length,r=[],a=c=>e?i[(c%s+s)%s]:i[Math.max(0,Math.min(s-1,c))],o=e?s:s-1;for(let c=0;c<o;c++){let l=a(c-1),h=a(c),d=a(c+1),u=a(c+2),f=(y,w)=>Math.pow(Math.hypot(w[0]-y[0],w[1]-y[1])+1e-6,n),g=0,x=g+f(l,h),m=x+f(h,d),p=m+f(d,u);for(let y=0;y<t;y++){let w=x+(m-x)*(y/t),_=(A,R,P,D)=>[(A[0]*(D-w)+R[0]*(w-P))/(D-P),(A[1]*(D-w)+R[1]*(w-P))/(D-P)],S=_(l,h,g,x),T=_(h,d,x,m),C=_(d,u,m,p),v=_(S,T,g,m),M=_(T,C,x,p);r.push(_(v,M,x,m))}}return e||r.push(i[s-1].slice()),r}function xp(i,t,e=!0){let n=e?i.concat([i[0]]):i,s=[0];for(let h=1;h<n.length;h++)s.push(s[h-1]+Math.hypot(n[h][0]-n[h-1][0],n[h][1]-n[h-1][1]));let r=s[s.length-1],a=Math.max(8,Math.round(r/t)),o=r/a,c=[],l=0;for(let h=0;h<(e?a:a+1);h++){let d=h*o;for(;l<s.length-2&&s[l+1]<d;)l++;let u=(d-s[l])/(s[l+1]-s[l]+1e-9);c.push([n[l][0]+(n[l+1][0]-n[l][0])*u,n[l][1]+(n[l+1][1]-n[l][1])*u])}return{pts:c,length:r,step:o}}var Ye=(i,t)=>(i%t+t)%t,Dc=class{constructor(t,e={}){this.def=t,this.mirror=!!e.mirror,this.reverse=!!e.reverse;let n=t.pts.map(h=>[this.mirror?-h[0]:h[0],h[1]]),s=t.shortcut?t.shortcut.pts.map(h=>[this.mirror?-h[0]:h[0],h[1]]):null;this.reverse&&(n=n.slice().reverse(),s&&(s=s.slice().reverse())),this.halfW=t.width/2,this.off=t.offroad,this.limit=this.halfW+this.off,this.width=t.width;let r=gp(n,28,!0),a=xp(r,2,!0);this.p=a.pts,this.N=a.pts.length,this.length=a.length,this.step=a.step;let o=this.N;this.tx=new Float32Array(o),this.tz=new Float32Array(o),this.k=new Float32Array(o),this.s=new Float32Array(o);for(let h=0;h<o;h++){let d=this.p[Ye(h-1,o)],u=this.p[Ye(h+1,o)],f=u[0]-d[0],g=u[1]-d[1],x=Math.hypot(f,g);this.tx[h]=f/x,this.tz[h]=g/x,this.s[h]=h*this.step}for(let h=0;h<o;h++){let d=Ye(h+1,o),u=Ye(h-1,o),f=Math.atan2(this.tx[d],this.tz[d])-Math.atan2(this.tx[u],this.tz[u]);for(;f>Math.PI;)f-=mp;for(;f<-Math.PI;)f+=mp;this.k[h]=f/(2*this.step)}let c=this.k.slice();for(let h=0;h<3;h++)for(let d=0;d<o;d++)c[d]=(c[Ye(d-1,o)]+c[d]*2+c[Ye(d+1,o)])/4;this.k=c,this.cell=30,this.grid=new Map;for(let h=0;h<o;h++)this._ins(this.grid,this.p[h][0],this.p[h][1],h);if(this.sc=null,s){let h=xp(gp(s,20,!1),2,!1);this.sc={p:h.pts,n:h.pts.length,length:h.length,half:(t.shortcut.width||11)/2,surf:t.shortcut.surface||"rough",tx:[],tz:[]};for(let f=0;f<this.sc.n;f++){let g=h.pts[Math.max(0,f-1)],x=h.pts[Math.min(this.sc.n-1,f+1)],m=x[0]-g[0],p=x[1]-g[1],y=Math.hypot(m,p);this.sc.tx.push(m/y),this.sc.tz.push(p/y)}this.sc.grid=new Map;for(let f=0;f<this.sc.n;f++)this._ins(this.sc.grid,h.pts[f][0],h.pts[f][1],f);let d=this.nearestGlobal(h.pts[0][0],h.pts[0][1]),u=this.nearestGlobal(h.pts[this.sc.n-1][0],h.pts[this.sc.n-1][1]);if(this.sc.i1=d.i,this.sc.i2=u.i,this.sc.s1=this.s[d.i],this.sc.s2=this.s[u.i],this.sc.s2<this.sc.s1)throw new Error("shortcut spans start line in "+t.id)}let l=h=>(this.reverse?1-h:h)*this.length;this.zones=(t.zones||[]).map(h=>{let d=l(h.f0),u=l(h.f1);return d>u&&([d,u]=[u,d]),{...h,s0:d,s1:u}}),this._buildRacingLine()}_ins(t,e,n,s){let r=Math.floor(e/this.cell)*100003+Math.floor(n/this.cell),a=t.get(r);a||(a=[],t.set(r,a)),a.push(s)}_cands(t,e,n,s){s.length=0;let r=Math.floor(e/this.cell),a=Math.floor(n/this.cell);for(let o=-1;o<=1;o++)for(let c=-1;c<=1;c++){let l=t.get((r+o)*100003+a+c);if(l)for(let h of l)s.push(h)}return s}nearestGlobal(t,e){let n=this._cands(this.grid,t,e,this._tmp||(this._tmp=[])),s=-1,r=1e18;if(n.length)for(let a of n){let o=(this.p[a][0]-t)**2+(this.p[a][1]-e)**2;o<r&&(r=o,s=a)}else for(let a=0;a<this.N;a+=2){let o=(this.p[a][0]-t)**2+(this.p[a][1]-e)**2;o<r&&(r=o,s=a)}return this.refine(s,t,e)}nearestWindow(t,e,n,s=40){let r=n,a=1e18;for(let o=-s;o<=s;o++){let c=Ye(n+o,this.N),l=(this.p[c][0]-t)**2+(this.p[c][1]-e)**2;l<a&&(a=l,r=c)}return this.refine(r,t,e)}refine(t,e,n){let s=this.N,r=t,a=0,o=1e18;for(let p of[Ye(t-1,s),t]){let y=this.p[p],w=this.p[Ye(p+1,s)],_=w[0]-y[0],S=w[1]-y[1],T=_*_+S*S,C=((e-y[0])*_+(n-y[1])*S)/T;C=Math.max(0,Math.min(1,C));let v=y[0]+_*C,M=y[1]+S*C,A=(v-e)**2+(M-n)**2;A<o&&(o=A,r=p,a=C)}let c=Ye(r+1,s),l=this.tx[r]*(1-a)+this.tx[c]*a,h=this.tz[r]*(1-a)+this.tz[c]*a,d=Math.hypot(l,h)||1,u=this.p[r][0]+(this.p[c][0]-this.p[r][0])*a,f=this.p[r][1]+(this.p[c][1]-this.p[r][1])*a,g=h/d,x=-l/d,m=(e-u)*g+(n-f)*x;return{i:r,t:a,s:(r+a)*this.step,lat:m,d:Math.sqrt(o),tx:l/d,tz:h/d,nx:g,nz:x,px:u,pz:f,idx:r+a}}nearestSc(t,e){let n=this.sc,s=this._cands(n.grid,t,e,this._tmp2||(this._tmp2=[])),r=-1,a=1e18;for(let S of s){let T=(n.p[S][0]-t)**2+(n.p[S][1]-e)**2;T<a&&(a=T,r=S)}if(r<0)return null;let o=r,c=0,l=1e18;for(let S of[Math.max(0,r-1),r]){if(S+1>=n.n)continue;let T=n.p[S],C=n.p[S+1],v=C[0]-T[0],M=C[1]-T[1],A=v*v+M*M,R=((t-T[0])*v+(e-T[1])*M)/A;R=Math.max(0,Math.min(1,R));let P=T[0]+v*R,D=T[1]+M*R,L=(P-t)**2+(D-e)**2;L<l&&(l=L,o=S,c=R)}let h=Math.min(n.n-1,o+1),d=n.p[o],u=n.p[h],f=d[0]+(u[0]-d[0])*c,g=d[1]+(u[1]-d[1])*c,x=n.tx[o],m=n.tz[o],p=m,y=-x,w=(t-f)*p+(e-g)*y;return{u:(o+c)/(n.n-1),lat:w,d:Math.sqrt(l),tx:x,tz:m,nx:p,nz:y,px:f,pz:g,i:o}}query(t,e,n=-1,s={}){let r=n>=0?this.nearestWindow(t,e,n,45):this.nearestGlobal(t,e);s.m=r,s.s=r.s,s.lat=r.lat,s.idx=r.i,s.surface="road",s.wall=!1,s.sc=null,s.zone=null;let a=Math.abs(r.lat),o=!1;if(this.sc){let c=this.nearestSc(t,e);c&&Math.abs(c.lat)<this.sc.half+.5&&c.u>=0&&c.u<=1&&(a>this.limit-2||Math.abs(c.lat)<this.sc.half)&&a>this.halfW&&(o=!0,s.sc=c,s.s=this.sc.s1+(this.sc.s2-this.sc.s1)*c.u,s.surface=this.sc.surf)}if(o)Math.abs(s.sc.lat)>this.sc.half&&(s.wall=!0);else if(a<=this.halfW?s.surface="road":a<=this.limit?s.surface="off":(s.surface="off",s.wall=!0),s.wall&&this.sc){let c=this.nearestSc(t,e);c&&Math.abs(c.lat)<this.sc.half+.5&&c.u>-.02&&c.u<1.02&&(s.wall=!1,s.sc=c,s.surface=this.sc.surf)}for(let c of this.zones)r.s>=c.s0&&r.s<=c.s1&&(!c.onlyRoad||s.surface==="road")&&(c.lat===void 0||r.lat>=c.lat[0]&&r.lat<=c.lat[1])&&(s.zone=c,c.surface&&(s.surface=c.surface));return s}constrain(t,e,n=-1){let s=n>=0?this.nearestWindow(t,e,n,45):this.nearestGlobal(t,e),r=Math.abs(s.lat),a=r-this.limit,o=-Math.sign(s.lat)*s.nx,c=-Math.sign(s.lat)*s.nz;if(this.sc){let l=this.nearestSc(t,e);if(l&&l.u>-.02&&l.u<1.02){let h=Math.abs(l.lat)-this.sc.half;if(h<a||r>this.halfW&&h<0){if(h<=0&&a>0)return null;a=h,o=-Math.sign(l.lat)*l.nx,c=-Math.sign(l.lat)*l.nz}}}return a<=0?null:{x:t+o*a,z:e+c*a,nx:o,nz:c,pen:a}}at(t,e=0,n={}){t=(t%this.length+this.length)%this.length;let s=t/this.step,r=Math.floor(s)%this.N,a=s-Math.floor(s),o=Ye(r+1,this.N),c=this.p[r][0]+(this.p[o][0]-this.p[r][0])*a,l=this.p[r][1]+(this.p[o][1]-this.p[r][1])*a,h=this.tx[r]*(1-a)+this.tx[o]*a,d=this.tz[r]*(1-a)+this.tz[o]*a,u=Math.hypot(h,d)||1;return h/=u,d/=u,n.x=c+d*e,n.z=l-h*e,n.tx=h,n.tz=d,n.heading=Math.atan2(h,d),n.k=this.k[r]*(1-a)+this.k[o]*a,n.i=r,n}_buildRacingLine(){let t=this.N,e=this.halfW-3.2,n=new Float32Array(t);for(let c=0;c<400;c++)for(let l=0;l<t;l++){let h=Ye(l-3,t),d=Ye(l+3,t),u=this.p[h][0]+this.tz[h]*n[h],f=this.p[h][1]-this.tx[h]*n[h],g=this.p[d][0]+this.tz[d]*n[d],x=this.p[d][1]-this.tx[d]*n[d],m=(u+g)/2,p=(f+x)/2,y=this.tz[l],w=-this.tx[l],_=(m-this.p[l][0])*y+(p-this.p[l][1])*w;_=Math.max(-e,Math.min(e,_)),n[l]+=(_-n[l])*.4}this.lineOff=n;let s=24,r=60,a=22,o=new Float32Array(t);for(let c=0;c<t;c++){let l=Math.abs(this._lineK(c));o[c]=Math.min(r,l>1e-4?Math.sqrt(s/l):r)}for(let c=0;c<2;c++)for(let l=t*2;l>=0;l--){let h=Ye(l,t),d=Ye(l+1,t),u=Math.sqrt(o[d]*o[d]+2*a*this.step);o[h]>u&&(o[h]=u)}this.lineV=o}_lineK(t){let e=this.N,n=Ye(t-2,e),s=Ye(t+2,e),r=g=>[this.p[g][0]+this.tz[g]*this.lineOff[g],this.p[g][1]-this.tx[g]*this.lineOff[g]],a=r(n),o=r(t),c=r(s),l=Math.hypot(o[0]-a[0],o[1]-a[1]),h=Math.hypot(c[0]-o[0],c[1]-o[1]),d=Math.hypot(c[0]-a[0],c[1]-a[1]),u=Math.abs((o[0]-a[0])*(c[1]-a[1])-(o[1]-a[1])*(c[0]-a[0]))/2,f=l*h*d;return f>1e-6?-4*u/f*Math.sign((o[0]-a[0])*(c[1]-o[1])-(o[1]-a[1])*(c[0]-o[0])):0}linePoint(t,e=0,n={}){t=(t%this.length+this.length)%this.length;let s=t/this.step,r=Math.floor(s)%this.N,a=s-Math.floor(s),o=Ye(r+1,this.N),c=this.lineOff[r]*(1-a)+this.lineOff[o]*a+e;return this.at(t,c,n)}lineSpeed(t){let e=(t%this.length+this.length)%this.length/this.step,n=Math.floor(e)%this.N;return this.lineV[n]}lineCurv(t){let e=(t%this.length+this.length)%this.length/this.step,n=Math.floor(e)%this.N;return this._lineK(n)}minSeparation(){let t=1e9,e=null,n=this.N;for(let s=0;s<n;s+=2)for(let r=s+1;r<n;r+=2){if(Math.min(r-s,n-(r-s))*this.step<120)continue;let o=Math.hypot(this.p[s][0]-this.p[r][0],this.p[s][1]-this.p[r][1]);o<t&&(t=o,e=[s,r])}return{min:t,at:e}}};var tr=["meadow","harbor","mesa","frost"];function gy(i){let t=fp(i.prog,i.fix);return pp(t.pts,i.start||0).map(e=>[e[0]*(i.scale||1),e[1]*(i.scale||1)])}function kc(i,t={}){let e=qi[i],n={...e,pts:gy(e)},s=new Dc(n,t);s.id=i,s.theme=e.theme,s.meta=e;let r=s.length,a=c=>(t.reverse?1-c:c)*r,o=(c,l=70)=>{let h=c,d=1e9;for(let u=-l;u<=l;u+=4){let f=Math.abs(s.lineCurv(c+u))+Math.abs(s.k[(Math.round((c+u)/s.step)%s.N+s.N)%s.N])*.5+Math.abs(u)*4e-5;f<d&&(d=f,h=c+u)}return(h%r+r)%r};return s.rows=e.rows.map(c=>{let l=o(a(c));return(l<130||l>r-30)&&(l=140+(l<130,0)),l}).sort((c,l)=>c-l),s.pads=e.pads.map(c=>o(a(c),50)),s.coinGroups=e.coinGroups.map(c=>a(c)),s}var aa=new O;function Dn(i,t,e,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;aa.copy(t),aa[n]=0,aa.normalize();let l=.5*a/(a+o),h=1-aa.angleTo(i)/c;return Math.sign(aa[e])===1?h*l:o/(a+o)+l+l*(1-h)}var Nc=class i extends Pn{constructor(t=1,e=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new O,l=new O,h=new O(t,e,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,g=d.length/6,x=new O,m=.5/a;for(let p=0,y=0;p<d.length;p+=3,y+=2)switch(c.fromArray(d,p),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),d[p+0]=h.x*Math.sign(c.x)+l.x*r,d[p+1]=h.y*Math.sign(c.y)+l.y*r,d[p+2]=h.z*Math.sign(c.z)+l.z*r,u[p+0]=l.x,u[p+1]=l.y,u[p+2]=l.z,Math.floor(p/g)){case 0:x.set(1,0,0),f[y+0]=Dn(x,l,"z","y",r,n),f[y+1]=1-Dn(x,l,"y","z",r,e);break;case 1:x.set(-1,0,0),f[y+0]=1-Dn(x,l,"z","y",r,n),f[y+1]=1-Dn(x,l,"y","z",r,e);break;case 2:x.set(0,1,0),f[y+0]=1-Dn(x,l,"x","z",r,t),f[y+1]=Dn(x,l,"z","x",r,n);break;case 3:x.set(0,-1,0),f[y+0]=1-Dn(x,l,"x","z",r,t),f[y+1]=1-Dn(x,l,"z","x",r,n);break;case 4:x.set(0,0,1),f[y+0]=1-Dn(x,l,"x","y",r,t),f[y+1]=1-Dn(x,l,"y","x",r,e);break;case 5:x.set(0,0,-1),f[y+0]=Dn(x,l,"x","y",r,t),f[y+1]=1-Dn(x,l,"y","x",r,e);break}}static fromJSON(t){return new i(t.width,t.height,t.depth,t.segments,t.radius)}};function vp(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new me,l=0;for(let h=0;h<i.length;++h){let d=i[h],u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0,d=[];for(let u=0;u<i.length;++u){let f=i[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=i[u].attributes.position.count}c.setIndex(d)}for(let h in r){let d=_p(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][u]);let g=_p(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}}return c}function _p(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new we(a,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let d=c/e;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<e;g++){let x=h.getComponent(u,g);o.setComponent(u+d,g,x)}}else a.set(h.array,c);c+=h.count*e}return s!==void 0&&(o.gpuType=s),o}var N={box:new Nc(1,1,1,2,.18),sbox:new Pn(1,1,1),sph:new Mn(1,20,14),cyl:new xi(1,1,1,18,1),cone:new Di(1,1,16,1),tor:new Hr(1,.2,8,24),cap:new as(1,1,5,12),plane:new Ne(1,1)},yp=new fe,bp=new Rn,Mp=new Hn,Sp=new O,Tp=new O,Uc=new Nt,Rt=class{constructor(){this.geos=[]}add(t,e={}){let{p:n=[0,0,0],r:s=[0,0,0],s:r=[1,1,1],c:a=16777215}=e,o=t.index?t.toNonIndexed():t.clone();o.deleteAttribute("uv"),Mp.set(s[0],s[1],s[2]),bp.setFromEuler(Mp),Sp.set(n[0],n[1],n[2]),Tp.set(r[0],r[1],r[2]),yp.compose(Sp,bp,Tp),o.applyMatrix4(yp);let c=o.attributes.position.count,l=new Float32Array(c*3);Uc.set(a);for(let h=0;h<c;h++)l[h*3]=Uc.r,l[h*3+1]=Uc.g,l[h*3+2]=Uc.b;return o.setAttribute("color",new we(l,3)),this.geos.push(o),this}build(t){if(!this.geos.length)return null;let e=vp(this.geos,!1);return this.geos.forEach(n=>n.dispose()),this.geos=[],e.computeBoundingSphere(),new Ot(e,t)}};function si(i,t=16777215,e=2.6,n=.55){return i.userData.rim={color:t,power:e,strength:n},i.onBeforeCompile=s=>{s.uniforms.rimColor={value:new Nt(t)},s.fragmentShader=s.fragmentShader.replace("void main() {",`uniform vec3 rimColor;
void main() {`).replace("#include <opaque_fragment>",`
      float rimF = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vViewPosition)), 0.0, 1.0), ${e.toFixed(2)});
      outgoingLight += rimColor * rimF * ${n.toFixed(2)};
      #include <opaque_fragment>`)},i}var wp={Gloss:{r:.22,m:.15,e:1},Matte:{r:.85,m:0,e:.4},Metallic:{r:.28,m:.85,e:1.3},Pearl:{r:.3,m:.35,e:1.4},Candy:{r:.14,m:.55,e:1.2}};function Ep(i,t="Gloss"){let e=wp[t]||wp.Gloss,n=new $e({color:i,roughness:e.r,metalness:e.m,envMapIntensity:e.e});return t==="Pearl"&&(n.emissive=new Nt(i).multiplyScalar(.08)),si(n,13625599,2.4,.5)}var Yh=null;function Pp(){return Yh||(Yh=si(new $e({vertexColors:!0,roughness:.5,metalness:.35,envMapIntensity:.9}),14676223,2.6,.4)),Yh}var Jh=null;function xy(){return Jh||(Jh=si(new $e({vertexColors:!0,roughness:.78,metalness:0,envMapIntensity:.5}),16777215,2.2,.35)),Jh}var Kh=null;function _y(){return Kh||(Kh=si(new $e({vertexColors:!0,roughness:.45,metalness:.45,envMapIntensity:1}),14676223,2.6,.35)),Kh}var vy=()=>new se({vertexColors:!0}),yy={"Corsa Standard":{wx:.78,zf:.95,zr:-.9,R:.36,seat:[.62,-.25],front:[.46,1.55],rear:[.72,-1.25],ex:[.5,-1.35]},Needle:{wx:.7,zf:1.15,zr:-1,R:.33,seat:[.55,-.35],front:[.4,2.2],rear:[.9,-1.55],ex:[.46,-1.7]},Slidewinder:{wx:.82,zf:.95,zr:-.9,R:.35,seat:[.5,-.25],front:[.35,1.75],rear:[.62,-1.3],ex:[.42,-1.4]},Ironclad:{wx:.92,zf:.9,zr:-.85,R:.44,seat:[.88,-.2],front:[.55,1.5],rear:[1,-1.25],ex:[.9,-1.2]},Pogo:{wx:.7,zf:.85,zr:-.85,R:.34,seat:[.82,-.1],front:[.5,1.5],rear:[.9,-1.3],ex:[.5,-1.55]},"Pumpkin Coach":{wx:.88,zf:.9,zr:-.85,R:.4,seat:[.88,-.2],front:[.55,1.45],rear:[1.15,-1.2],ex:[.7,-1.3]}},He=1843760,un=13620959,oa=16773552;function by(i,t,e,n){let s=(a,o)=>t.add(a,o),r=(a,o)=>e.add(a,o);switch(i){case"Corsa Standard":s(N.box,{p:[0,.42,.05],s:[1.15,.3,2.3]}),s(N.box,{p:[0,.4,1.35],s:[.8,.22,.9]}),s(N.cone,{p:[0,.4,1.9],r:[Math.PI/2,0,0],s:[.3,.5,.2]}),s(N.box,{p:[-.68,.46,.15],s:[.34,.3,1.2]}),s(N.box,{p:[.68,.46,.15],s:[.34,.3,1.2]}),s(N.box,{p:[0,.72,-.85],s:[.85,.5,.75]}),r(N.box,{p:[0,.8,-.38],s:[.75,.55,.14],c:He}),r(N.cyl,{p:[0,.6,.35],r:[.4,0,0],s:[.07,.07,.07],c:He});for(let a of[-.32,.32])n.add(N.sph,{p:[a,.5,1.82],s:[.11,.11,.11],c:oa});r(N.cyl,{p:[0,.58,.55],r:[Math.PI/2,0,0],s:[.06,.5,.06],c:un});break;case"Needle":s(N.box,{p:[0,.38,0],s:[.78,.24,2.9]}),s(N.cone,{p:[0,.38,2.1],r:[Math.PI/2,0,0],s:[.28,1.3,.2]}),s(N.box,{p:[0,.78,-1.2],s:[.07,.65,.9]}),s(N.box,{p:[-.45,.4,-.3],s:[.2,.22,1.4]}),s(N.box,{p:[.45,.4,-.3],s:[.2,.22,1.4]}),r(N.sph,{p:[0,.62,-.1],s:[.32,.22,.55],c:He}),r(N.box,{p:[0,.72,-.5],s:[.5,.5,.1],c:He});for(let a of[-.3,.3])n.add(N.sph,{p:[a,.42,1.2],s:[.07,.07,.07],c:oa});break;case"Slidewinder":s(N.box,{p:[0,.36,0],s:[1.3,.22,2.5]}),s(N.sph,{p:[0,.42,1.5],s:[.5,.28,.7]}),s(N.box,{p:[-.72,.38,0],s:[.1,.24,1.7]}),s(N.box,{p:[.72,.38,0],s:[.1,.24,1.7]}),s(N.box,{p:[0,.6,-.9],s:[.8,.38,.9]});for(let a=0;a<4;a++)r(N.tor,{p:[0,.6,-1.35-a*.14],s:[.18-a*.02,.18-a*.02,.18],c:un});r(N.box,{p:[0,.68,-.38],s:[.7,.45,.12],c:He});for(let a of[-.22,.22])n.add(N.sph,{p:[a,.58,1.72],s:[.1,.07,.08],c:16765503});break;case"Ironclad":s(N.box,{p:[0,.6,0],s:[1.55,.55,2.2]}),s(N.box,{p:[0,.62,1.2],s:[1.55,.6,.28],r:[-.15,0,0]}),s(N.box,{p:[-.85,.7,.2],s:[.14,.55,1.5]}),s(N.box,{p:[.85,.7,.2],s:[.14,.55,1.5]}),r(N.cyl,{p:[-.55,1.2,-.3],s:[.05,.55,.05],c:un}),r(N.cyl,{p:[.55,1.2,-.3],s:[.05,.55,.05],c:un}),r(N.cyl,{p:[0,1.5,-.3],r:[0,0,Math.PI/2],s:[.05,.6,.05],c:un});for(let a of[-.7,.7])r(N.cyl,{p:[a,1,-1],s:[.1,.55,.1],c:He});r(N.box,{p:[0,.75,1.36],s:[1.2,.18,.1],c:He});for(let a of[-.5,.5])n.add(N.sph,{p:[a,.7,1.4],s:[.1,.1,.1],c:oa});break;case"Pogo":s(N.cap,{p:[0,.78,.1],r:[Math.PI/2,0,0],s:[.42,.7,.42]}),s(N.cone,{p:[0,.78,1.1],r:[Math.PI/2,0,0],s:[.3,.5,.3]});for(let a of[-.55,.55])s(N.box,{p:[a,.5,-.5],s:[.08,.5,.6],r:[0,0,a>0?.25:-.25]});for(let a=0;a<6;a++)r(N.tor,{p:[0,.6,-.95-a*.1],s:[.22,.22,.22],c:un});r(N.cone,{p:[0,.6,-1.7],r:[-Math.PI/2,0,0],s:[.22,.4,.22],c:He}),r(N.box,{p:[0,.44,0],s:[.9,.12,1.8],c:He}),n.add(N.sph,{p:[0,.8,1],s:[.1,.1,.1],c:oa});break;case"Pumpkin Coach":s(N.sph,{p:[0,.8,0],s:[1,.75,1.2]});for(let a=0;a<7;a++){let o=a/7*Math.PI;r(N.sph,{p:[Math.cos(o)*0,.8,0],s:[.03,.74,1.17],r:[0,o,0],c:13194762})}r(N.cyl,{p:[0,1.62,.1],s:[.1,.22,.1],r:[.2,0,0],c:3967534}),s(N.box,{p:[0,.4,0],s:[1.2,.2,2]});for(let a of[-.5,.5])n.add(N.sph,{p:[a,.95,1.1],s:[.12,.14,.1],c:oa});r(N.box,{p:[0,.78,-.35],s:[.8,.5,.12],c:6040074});break}}var Ap={"Six-Spoke Standard":{n:6,sw:.07,kind:"spoke"},"Turbine Fan":{n:10,sw:.05,kind:"blade",tw:.5},"Mesh Classic":{n:14,sw:.025,kind:"mesh"},"Dish Deep":{kind:"dish"},Starburst:{n:10,sw:.045,kind:"spoke",len:.8},"Slick Racing":{n:5,sw:.09,kind:"spoke",slick:!0},"Trail Grip":{n:8,sw:.05,kind:"spoke",knob:.07},Mudder:{kind:"disc",holes:8,knob:.12},"Balloon Soft":{kind:"disc",fat:!0},Featherweight:{n:3,sw:.16,kind:"spoke",carbon:!0},"Anvil Steel":{kind:"disc",bolts:6,steel:!0},"Rally Grip":{n:8,sw:.05,kind:"spoke",beadlock:!0},"Ice Studs":{n:7,sw:.06,kind:"spoke",studs:!0},"Hover Pad":{kind:"hover"},Flywheel:{kind:"rings"},"Spinner Disc":{kind:"disc",spinner:!0},"Candy Cane":{n:6,sw:.06,kind:"blade",tw:.9,candy:!0},Gearwheel:{kind:"gear"}};function My(i,t,e,n=.36,s="Polished"){let r=Ap[i]||Ap["Six-Spoke Standard"],a=[.82,.91,1,1.1,1.2][t]??1,o=n*a,c=(r.fat?.34:r.slick?.36:.28)*(.9+.1*a),l=new oe,h=new Rt,d=e==="rainbow"?null:e,u=(w=0)=>d||new Nt().setHSL(w*.13%1,.8,.55).getHex(),f=s==="Satin"?.82:1,g=1382172,x=Math.PI/2;if(r.kind!=="hover"){if(h.add(N.tor,{r:[0,x,0],s:[o*.86,o*.86,c*2.2],c:g}),h.add(N.cyl,{r:[0,0,x],s:[o*.99,c*.5,o*.99],c:g}),r.slick&&h.add(N.cyl,{r:[0,0,x],s:[o*1,c*.5,o*1],c:2830136}),r.knob)for(let w=0;w<14;w++){let _=w/14*Math.PI*2;h.add(N.sbox,{p:[0,Math.cos(_)*o,Math.sin(_)*o],r:[_,0,0],s:[c*.9,r.knob*1.3,r.knob*1.3],c:g})}if(r.studs)for(let w=0;w<16;w++){let _=w/16*Math.PI*2;h.add(N.sph,{p:[(w%2?1:-1)*c*.25,Math.cos(_)*o*1,Math.sin(_)*o*1],s:[.025,.025,.025],c:14673646})}}let m=o*.18,p=o*.74;if(r.kind==="spoke"||r.kind==="blade"||r.kind==="mesh"){h.add(N.cyl,{r:[0,0,x],s:[p,.03,p],c:2106412});for(let w=0;w<r.n;w++){let _=w/r.n*Math.PI*2,S=(r.len||1)*p,T=r.candy?w%2?16777215:14689338:r.carbon?2369067:u(w);h.add(N.sbox,{p:[c*.18,Math.cos(_)*S*.5,Math.sin(_)*S*.5],r:[_+(r.tw||0)*0,r.tw?r.tw:0,0],s:[r.kind==="blade"?.04:r.sw*1.4,S,r.kind==="blade"?r.sw*3:r.sw*2.4],c:T})}if(h.add(N.tor,{r:[0,x,0],p:[c*.14,0,0],s:[p,p,.5],c:r.carbon?2369067:u(1)}),r.kind==="mesh"&&h.add(N.tor,{r:[0,x,0],p:[c*.14,0,0],s:[p*.5,p*.5,.4],c:u(2)}),r.beadlock)for(let w=0;w<12;w++){let _=w/12*Math.PI*2;h.add(N.cyl,{p:[c*.22,Math.cos(_)*p*.97,Math.sin(_)*p*.97],r:[0,0,x],s:[.02,.03,.02],c:15133166})}}else if(r.kind==="dish")h.add(N.cyl,{p:[c*.05,0,0],r:[0,0,x],s:[p,c*.35,p],c:u(0)}),h.add(N.cyl,{p:[c*.22,0,0],r:[0,0,x],s:[p*.55,c*.25,p*.55],c:2106412});else if(r.kind==="disc"){if(h.add(N.cyl,{p:[c*.1,0,0],r:[0,0,x],s:[p*(r.fat?.62:1),c*.4,p*(r.fat?.62:1)],c:r.steel?7305090:u(0)}),r.bolts)for(let w=0;w<r.bolts;w++){let _=w/r.bolts*Math.PI*2;h.add(N.cyl,{p:[c*.34,Math.cos(_)*p*.6,Math.sin(_)*p*.6],r:[0,0,x],s:[.035,.03,.035],c:14672872})}if(r.holes)for(let w=0;w<r.holes;w++){let _=w/r.holes*Math.PI*2;h.add(N.cyl,{p:[c*.34,Math.cos(_)*p*.62,Math.sin(_)*p*.62],r:[0,0,x],s:[.05,.02,.05],c:1382172})}r.spinner&&h.add(N.box,{p:[c*.36,0,0],s:[.03,p*.9,p*.22],c:u(3)})}else if(r.kind==="rings"){for(let w=0;w<3;w++)h.add(N.tor,{r:[0,x,0],p:[c*.15,0,0],s:[p*(1-w*.28),p*(1-w*.28),.6],c:u(w)});h.add(N.cyl,{r:[0,0,x],s:[p*.2,c*.4,p*.2],c:2106412})}else if(r.kind==="gear"){h.add(N.cyl,{r:[0,0,x],p:[c*.1,0,0],s:[p,c*.3,p],c:u(0)});for(let w=0;w<12;w++){let _=w/12*Math.PI*2;h.add(N.sbox,{p:[c*.1,Math.cos(_)*p*1.05,Math.sin(_)*p*1.05],r:[_,0,0],s:[c*.5,.1,.07],c:u(1)})}}else r.kind==="hover"&&(h.add(N.cyl,{r:[0,0,x],s:[o*.85,c*.35,o*.85],c:2435637}),h.add(N.tor,{r:[0,x,0],p:[c*.18,0,0],s:[o*.8,o*.8,.6],c:7333887}));h.add(N.cyl,{p:[c*.38,0,0],r:[0,0,x],s:[m,.04,m],c:un});let y=h.build(_y());return l.add(y),l.userData.radius=o,l.userData.width=c,l}function Sy(i,t,e,n){let[s,r]=n,a=(c,l)=>t.add(c,l),o=(c,l)=>e.add(c,l);switch(i){case"None":return;case"Low Lip":a(N.box,{p:[0,s-.05,r],s:[1,.05,.22]});break;case"Duck Tail":a(N.box,{p:[0,s,r],s:[1,.06,.4],r:[.25,0,0]});break;case"GT Wing":a(N.box,{p:[0,s+.45,r],s:[1.3,.06,.4]});for(let c of[-.35,.35])o(N.box,{p:[c,s+.22,r],s:[.05,.45,.1],c:He});for(let c of[-.65,.65])a(N.box,{p:[c,s+.45,r],s:[.04,.22,.45]});break;case"Dual Plane":for(let c of[.4,.58])a(N.box,{p:[0,s+c,r-c*.1],s:[1.25,.05,.34]});for(let c of[-.4,.4])o(N.box,{p:[c,s+.2,r],s:[.05,.45,.1],c:He});for(let c of[-.64,.64])a(N.box,{p:[c,s+.5,r],s:[.04,.3,.42]});break;case"Swan Neck":a(N.box,{p:[0,s+.55,r],s:[1.35,.05,.42]});for(let c of[-.4,.4])o(N.cyl,{p:[c,s+.28,r-.1],r:[.4,0,0],s:[.035,.34,.035],c:un});break;case"Barn Door":a(N.box,{p:[0,s+.55,r],s:[1.6,.7,.07]});for(let c of[-.5,.5])o(N.box,{p:[c,s+.2,r],s:[.06,.45,.1],c:He});break;case"Shark Fin":a(N.cone,{p:[0,s+.45,r],r:[0,0,0],s:[.07,.6,.4]});break;case"Roof Scoop":a(N.cone,{p:[0,s+.3,r+.35],r:[Math.PI/2,0,0],s:[.22,.5,.22]}),o(N.box,{p:[0,s+.3,r+.62],s:[.3,.2,.05],c:He});break;case"Twin Tail":for(let c of[-.5,.5])a(N.box,{p:[c,s+.4,r],s:[.06,.55,.45]});a(N.box,{p:[0,s+.2,r],s:[1,.05,.18]});break;case"Pop-up Flap":a(N.box,{p:[0,s+.3,r],s:[1,.05,.4],r:[-.7,0,0]});for(let c of[-.4,.4])o(N.box,{p:[c,s+.15,r],s:[.04,.3,.06],c:He});break;case"Feather Wing":a(N.box,{p:[0,s+.4,r],s:[1.2,.025,.3],r:[.1,0,0]});for(let c of[-.3,.3])o(N.cyl,{p:[c,s+.2,r],s:[.02,.2,.02],c:2369067});break}}var Cp={"Stock Pipe":[1,.07,.35,0],"Twin Chrome":[2,.06,.4,0],"Side Pipes":[2,.06,.6,1],Megaphone:[1,.12,.45,0],Upswept:[2,.06,.4,2],"Flame Thrower":[2,.075,.5,0],"Quad Stack":[4,.055,.4,0],"Turbo Whistle":[1,.1,.45,3],Bubbler:[2,.08,.3,0],"Rocket Nozzle":[1,.18,.55,4]};function Ty(i,t,e){let[n,s,r,a]=Cp[i]||Cp["Stock Pipe"],[o,c]=e,l=[];for(let h=0;h<n;h++){let d=n===1?0:n===2?h?.28:-.28:(h-1.5)*.17,u=o,f=c;a===1&&(d=h?.8:-.8,f=c+.9,u=o-.1),t.add(N.cyl,{p:[d,u,f-r/2+.05],r:[Math.PI/2,0,0],s:[s,r/2,s],c:a===4?3817291:un}),(a===3||a===4)&&t.add(N.cone,{p:[d,u,f-r],r:[-Math.PI/2,0,0],s:[s*1.5,.25,s*1.5],c:a===4?1843760:15054922}),a===2&&t.add(N.cyl,{p:[d,u+.2,f-r+.05],s:[s,.2,s],c:un}),l.push([d,u,f-r-(a===3||a===4?.25:0)])}return l}function wy(i,t,e,n){let[s,r]=n,a=(c,l)=>t.add(c,l),o=(c,l)=>e.add(c,l);switch(i){case"Stock Bumper":o(N.box,{p:[0,s-.1,r],s:[1,.12,.12],c:He});break;case"Rubber Pusher":o(N.box,{p:[0,s-.08,r],s:[1.25,.2,.2],c:2764600});break;case"Splitter":a(N.box,{p:[0,s-.22,r-.05],s:[1.3,.04,.45]});break;case"Cow Catcher":for(let c=0;c<5;c++)o(N.cyl,{p:[(c-2)*.22,s-.1,r-.1],r:[.35,0,0],s:[.025,.35,.025],c:un});o(N.box,{p:[0,s+.1,r-.3],s:[1.1,.05,.05],c:un});break;case"Spike Guard":o(N.box,{p:[0,s-.1,r],s:[1.2,.14,.12],c:He});for(let c=0;c<5;c++)o(N.cone,{p:[(c-2)*.25,s-.1,r+.14],r:[Math.PI/2,0,0],s:[.05,.2,.05],c:un});break;case"Tiny Bumper":o(N.box,{p:[0,s-.12,r],s:[.5,.07,.07],c:He});break;case"Rubber Duck Horn":o(N.box,{p:[0,s-.1,r],s:[.9,.12,.12],c:He}),o(N.sph,{p:[0,s+.02,r+.05],s:[.13,.11,.13],c:16765503}),o(N.cone,{p:[0,s+0,r+.2],r:[Math.PI/2,0,0],s:[.05,.1,.03],c:16742938});break;case"Twin Prongs":for(let c of[-.3,.3])o(N.cone,{p:[c,s-.1,r+.1],r:[Math.PI/2,0,0],s:[.08,.5,.08],c:un});o(N.box,{p:[0,s-.1,r-.1],s:[.8,.1,.1],c:He});break}}var Zh=new Map;function Ey(i,t="#ffffff"){let e=i+t;if(Zh.has(e))return Zh.get(e);let n=document.createElement("canvas");n.width=n.height=256;let s=n.getContext("2d");s.clearRect(0,0,256,256),s.fillStyle=t,s.strokeStyle=t,s.lineWidth=14,s.lineCap="round";let r={"Racing Stripes":()=>{s.fillRect(100,0,22,256),s.fillRect(134,0,22,256)},"Twin Stripes":()=>{s.fillRect(70,0,16,256),s.fillRect(170,0,16,256)},"Checker Flag":()=>{for(let o=0;o<8;o++)for(let c=0;c<8;c++)(c+o)%2&&s.fillRect(48+c*20,48+o*20,20,20)},"Lightning Bolt":()=>{s.beginPath(),s.moveTo(150,20),s.lineTo(80,140),s.lineTo(124,140),s.lineTo(100,236),s.lineTo(180,110),s.lineTo(134,110),s.closePath(),s.fill()},"Flame Licks":()=>{for(let o=0;o<4;o++)s.beginPath(),s.moveTo(40+o*50,256),s.quadraticCurveTo(60+o*50,150-o*10,40+o*50,80),s.quadraticCurveTo(100+o*50,150,90+o*50,256),s.fill()},"Polka Dots":()=>{for(let o=0;o<25;o++)s.beginPath(),s.arc(30+o%5*50,30+Math.floor(o/5)*50,14,0,7),s.fill()},"Star Field":()=>{for(let o=0;o<9;o++)Ay(s,40+o%3*80,40+Math.floor(o/3)*80,20)},"Camo Splash":()=>{for(let o=0;o<14;o++)s.beginPath(),s.ellipse(30+o*53%200,30+o*91%200,28,16,o,0,7),s.fill()},Zigzag:()=>{s.beginPath(),s.moveTo(10,40);for(let o=0;o<6;o++)s.lineTo(o%2?40:216,40+o*38);s.stroke()},"Wave Crest":()=>{for(let o=0;o<4;o++){s.beginPath();for(let c=0;c<=256;c+=8)s.lineTo(c,50+o*50+Math.sin(c/18)*14);s.stroke()}},Honeycomb:()=>{for(let o=0;o<4;o++)for(let c=0;c<4;c++)Cy(s,40+c*60+o%2*30,40+o*52,24)},"Number 7":()=>{s.font="bold 190px sans-serif",s.textAlign="center",s.fillText("7",128,200)},"Number 42":()=>{s.font="bold 150px sans-serif",s.textAlign="center",s.fillText("42",128,180)},"Number 99":()=>{s.font="bold 150px sans-serif",s.textAlign="center",s.fillText("99",128,180)},"Sun Burst":()=>{for(let o=0;o<12;o++)s.save(),s.translate(128,128),s.rotate(o*Math.PI/6),s.fillRect(-8,30,16,90),s.restore();s.beginPath(),s.arc(128,128,26,0,7),s.fill()},"Skull & Wrenches":()=>{s.beginPath(),s.arc(128,110,52,0,7),s.fill(),s.fillRect(100,140,56,40),s.globalCompositeOperation="destination-out",s.beginPath(),s.arc(108,108,14,0,7),s.arc(148,108,14,0,7),s.fill(),s.globalCompositeOperation="source-over",s.save(),s.translate(128,200),s.rotate(.6),s.fillRect(-90,-6,180,12),s.rotate(-1.2),s.fillRect(-90,-6,180,12),s.restore()},"Paw Prints":()=>{for(let o=0;o<3;o++)Ry(s,70+o*60,60+o%2*90)},"Leaf Pattern":()=>{for(let o=0;o<6;o++)s.beginPath(),s.ellipse(50+o%3*75,60+Math.floor(o/3)*110,12,34,o-1,0,7),s.fill()},Snowflakes:()=>{for(let o=0;o<4;o++)Py(s,64+o%2*128,64+Math.floor(o/2)*128,40)},"Circuit Lines":()=>{s.lineWidth=8,s.beginPath(),s.moveTo(20,60),s.lineTo(100,60),s.lineTo(130,100),s.lineTo(230,100),s.moveTo(20,150),s.lineTo(80,150),s.lineTo(110,190),s.lineTo(230,190),s.stroke();for(let[o,c]of[[100,60],[230,100],[80,150],[230,190]])s.beginPath(),s.arc(o,c,10,0,7),s.fill()},"Candy Swirl":()=>{s.lineWidth=22,s.beginPath();for(let o=0;o<18;o+=.2)s.lineTo(128+Math.cos(o)*o*6,128+Math.sin(o)*o*6);s.stroke()},"Tiger Stripes":()=>{for(let o=0;o<6;o++)s.beginPath(),s.moveTo(20,20+o*40),s.quadraticCurveTo(128,50+o*40,236,20+o*40),s.lineTo(236,40+o*40),s.quadraticCurveTo(128,70+o*40,20,40+o*40),s.fill()},Argyle:()=>{for(let o=0;o<4;o++)for(let c=0;c<4;c++){s.beginPath();let l=32+c*64,h=32+o*64;s.moveTo(l,h-28),s.lineTo(l+28,h),s.lineTo(l,h+28),s.lineTo(l-28,h),s.closePath(),(c+o)%2&&s.fill()}},"Galaxy Swirl":()=>{for(let o=0;o<40;o+=.3)s.globalAlpha=1-o/45,s.beginPath(),s.arc(128+Math.cos(o)*o*3,128+Math.sin(o)*o*3,6+o/8,0,7),s.fill();s.globalAlpha=1}};(r[i]||r["Racing Stripes"])();let a=new gi(n);return a.colorSpace=Ce,a.anisotropy=4,Zh.set(e,a),a}function Ay(i,t,e,n){i.beginPath();for(let s=0;s<10;s++){let r=-Math.PI/2+s*Math.PI/5,a=s%2?n*.45:n;i.lineTo(t+Math.cos(r)*a,e+Math.sin(r)*a)}i.closePath(),i.fill()}function Cy(i,t,e,n){i.beginPath();for(let s=0;s<6;s++)i.lineTo(t+Math.cos(s*Math.PI/3)*n,e+Math.sin(s*Math.PI/3)*n);i.closePath(),i.lineWidth=6,i.stroke()}function Ry(i,t,e){i.beginPath(),i.ellipse(t,e+12,22,18,0,0,7),i.fill();for(let[n,s]of[[-22,-14],[-8,-28],[8,-28],[22,-14]])i.beginPath(),i.ellipse(t+n,e+s,8,11,0,0,7),i.fill()}function Py(i,t,e,n){i.lineWidth=6;for(let s=0;s<6;s++)i.save(),i.translate(t,e),i.rotate(s*Math.PI/3),i.beginPath(),i.moveTo(0,0),i.lineTo(0,-n),i.moveTo(0,-n*.6),i.lineTo(10,-n*.8),i.moveTo(0,-n*.6),i.lineTo(-10,-n*.8),i.stroke(),i.restore()}var Iy=[.82,.91,1,1.1,1.2];function er(i="Corsa Standard"){return{body:i,wheel:"Six-Spoke Standard",size:2,rim:0,rimFinish:0,spoiler:"None",exhaust:"Stock Pipe",bumper:"Stock Bumper",paint:0,finish:0,paint2:12,twoTone:-1,decal:-1,decalColor:"#ffffff"}}function nr(i,t=null){let e=yy[i.body],n=new oe,s=new oe;n.add(s);let r=new Rt,a=new Rt,o=new Rt,c=new Rt,l=r;by(i.body,l,o,c);let h=Ct.paintColors[i.paint],d=i.twoTone>=0,u=(A,R)=>a.add(A,R);if(d){let A=Ct.twoTone[i.twoTone];A==="Hood Stripe"?u(N.box,{p:[0,e.front[0]+0,e.front[1]-1],s:[.3,.06,1.4]}):A==="Split Down"?u(N.box,{p:[.32,.65,0],s:[.5,.06,2.1]}):A==="Roof Cap"?u(N.box,{p:[0,.98,-.85],s:[.9,.06,.8]}):A==="Fade Front-Back"?u(N.box,{p:[0,.62,1],s:[.95,.06,.7]}):A==="Racing Number Panel"?u(N.cyl,{p:[0,e.front[0]+.12,.7],s:[.28,.02,.28]}):A==="Bib"?u(N.box,{p:[0,.64,1.1],s:[.7,.05,.4]}):A==="Lower Skirt"?(u(N.box,{p:[-e.wx*.78,.36,0],s:[.06,.1,1.9]}),u(N.box,{p:[e.wx*.78,.36,0],s:[.06,.1,1.9]})):A==="Diagonal"&&u(N.box,{p:[0,.7,.1],r:[0,.5,0],s:[.14,.05,1.9]})}Sy(i.spoiler,r,o,e.rear);let f=Ty(i.exhaust,o,e.ex);wy(i.bumper,r,o,e.front);let g=Ep(h.hex,Ct.paintFinishes[i.finish]),x=r.build(g);x&&s.add(x);let m=null;if(d){m=Ep(Ct.paintColors[i.paint2].hex,Ct.paintFinishes[i.finish]);let A=a.build(m);A&&s.add(A)}let p=o.build(Pp());p&&s.add(p);let y=c.build(vy());y&&s.add(y);let w=null;if(i.decal>=0){let A=Ey(Ct.decals[i.decal],i.decalColor),R=new se({map:A,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,toneMapped:!1}),P=new Rt;w=new oe;let D=new Ot(N.plane,R);D.rotation.x=-Math.PI/2,D.position.set(0,e.front[0]+.03,.6),D.scale.set(.8,1.2,1),w.add(D),s.add(w)}let _=Ct.rimColors[i.rim].hex==="rainbow"?"rainbow":Ct.rimColors[i.rim].hex.replace("#","0x"),S=_==="rainbow"?"rainbow":parseInt(_,16),T=[],C=e.R;for(let[A,R]of[[-1,e.zf],[1,e.zf],[-1,e.zr],[1,e.zr]]){let P=My(i.wheel,i.size,S,C,Ct.rimFinishes[i.rimFinish]),D=P.userData.radius,L=new oe;L.position.set(A*e.wx,D,R),(i.body==="Ironclad"||i.body==="Pumpkin Coach")&&P.scale.setScalar(1.12),P.rotation.y=A>0?0:Math.PI,L.add(P),s.add(L),T.push({pivot:L,spin:P,front:R>0,sx:A,rad:D})}let v=Iy[i.size]??1;s.position.y=(v-1)*.35;let M=null;return t!==null&&(M=jh(t),M.root.position.set(0,e.seat[0],e.seat[1]),s.add(M.root)),{root:n,body:s,wheels:T,driver:M,flames:f,shape:e,paintMat:g,paint2Mat:m,decalMesh:w,radius:C*v,build:i}}var Rp={"Pip Thistledown":{skin:13208139,belly:15782560,shirt:4173402,hat:"acorn",ears:"round",nose:"small",tail:"bushy",ec:3810322},"Fennel Vix":{skin:15764012,belly:16773340,shirt:1287075,hat:"none",ears:"pointy",nose:"snout",tail:"huge",ec:2759180,scarf:1287075},"Juniper Wren":{skin:10119748,belly:15981752,shirt:3837414,hat:"tuft",ears:"none",nose:"beak",tail:"small",ec:1708040,wings:!0},"Pearl Quayside":{skin:14723452,belly:14723452,shirt:2060152,hat:"cap",ears:"human",nose:"small",tail:"none",ec:2759180,coat:!0,hair:7028509},"Bramble Quill":{skin:9071173,belly:15124896,shirt:5989745,hat:"quills",ears:"small",nose:"snout",tail:"none",ec:1708040,goggles:!0},"Clover Dash":{skin:16052458,belly:16777215,shirt:16762938,hat:"none",ears:"long",nose:"pink",tail:"puff",ec:2759212},"Captain Dusk Marlowe":{skin:14659208,belly:14659208,shirt:2046579,hat:"captain",ears:"human",nose:"big",tail:"none",ec:2759180,beard:15921906},"Sage Willowmere":{skin:10189395,belly:15786176,shirt:8003386,hat:"tufts",ears:"none",nose:"beak",tail:"small",ec:16765503,disc:16181968,cape:!0},"Marigold Hoofsworth":{skin:14262374,belly:16773340,shirt:16777215,hat:"antlers",ears:"deer",nose:"snout",tail:"puff",ec:2759180,apron:!0},"Hobb Mossback":{skin:7182930,belly:14214824,shirt:9067056,hat:"shell",ears:"none",nose:"small",tail:"none",ec:1708040},"Barnaby Bruin":{skin:9067056,belly:14267002,shirt:13120298,hat:"none",ears:"round",nose:"snout",tail:"puff",ec:1708040,honey:!0},"Gus Gantry":{skin:14262906,belly:14262906,shirt:16747034,hat:"hardhat",ears:"human",nose:"big",tail:"none",ec:2759180,stubble:!0}};function jh(i){let t=Rp[i]||Rp["Pip Thistledown"],e=new oe,n=new Rt,s=new Rt,r=new Rt,a=n,o=s;if(a.add(N.sph,{p:[0,.05,0],s:[t.coat?.46:.36,t.coat?.42:.34,.3],c:t.shirt}),t.apron&&a.add(N.box,{p:[0,0,.2],s:[.4,.45,.05],c:16777215}),t.cape&&a.add(N.box,{p:[0,.05,-.28],s:[.7,.6,.08],c:t.shirt}),t.shirt===16747034&&(a.add(N.box,{p:[0,.05,.2],s:[.46,.06,.04],c:15400762}),a.add(N.box,{p:[-.12,.1,.21],s:[.05,.34,.03],c:15400762}),a.add(N.box,{p:[.12,.1,.21],s:[.05,.34,.03],c:15400762})),t.scarf&&(a.add(N.tor,{p:[0,.33,0],r:[Math.PI/2,0,0],s:[.26,.26,.5],c:t.scarf}),a.add(N.box,{p:[.12,.2,.22],s:[.1,.3,.05],c:t.scarf})),t.honey&&(a.add(N.cyl,{p:[0,-.1,.34],s:[.15,.12,.15],c:15054922}),a.add(N.cyl,{p:[0,-.02,.34],s:[.12,.02,.12],c:16765503})),t.tail==="huge"?(a.add(N.sph,{p:[.3,.2,-.55],s:[.3,.3,.7],c:t.skin}),a.add(N.sph,{p:[.34,.25,-1],s:[.22,.22,.34],c:16773340})):t.tail==="bushy"?a.add(N.sph,{p:[0,.4,-.4],s:[.22,.45,.28],c:t.skin}):t.tail==="puff"?a.add(N.sph,{p:[0,.05,-.38],s:[.14,.14,.14],c:16777215}):t.tail==="small"&&a.add(N.cone,{p:[0,0,-.45],r:[-Math.PI/2,0,0],s:[.1,.3,.05],c:t.skin}),t.hat==="shell"){a.add(N.sph,{p:[0,.3,-.25],s:[.62,.55,.55],c:6261317});for(let M=0;M<5;M++)a.add(N.sph,{p:[Math.cos(M*1.26)*.28,.5+.01*M,-.25+Math.sin(M*1.26)*.2],s:[.14,.1,.14],c:4877876})}t.wings&&(a.add(N.sph,{p:[-.36,.1,-.1],s:[.06,.28,.2],c:8015663}),a.add(N.sph,{p:[.36,.1,-.1],s:[.06,.28,.2],c:8015663})),t.satchel&&a.add(N.box,{p:[.28,0,-.1],s:[.15,.2,.18],c:8015663});let c=.52,l=t.disc?.38:.34;o.add(N.sph,{p:[0,c,0],s:[l,l*.95,l],c:t.skin}),t.belly!==t.skin&&t.nose!=="beak"&&o.add(N.sph,{p:[0,c-.08,l*.5],s:[l*.62,l*.55,l*.55],c:t.belly});let h=c+.05,d=l*.78,u=l*.38,f=t.disc?1.6:1;for(let M of[-1,1])o.add(N.sph,{p:[M*u,h,d],s:[.1*f,.12*f,.06],c:(t.disc,16777215)}),o.add(N.sph,{p:[M*u,h-.005,d+.05],s:[.055*f,.07*f,.03],c:t.ec>15728640||t.disc?16765503:1448482}),o.add(N.sph,{p:[M*u+.02,h+.03,d+.075],s:[.02,.02,.01],c:16777215});t.disc&&o.add(N.sph,{p:[0,h,d-.02],s:[.34,.2,.05],c:t.disc}),t.nose==="snout"?(o.add(N.sph,{p:[0,c-.06,l*.95],s:[.15,.11,.18],c:t.belly}),o.add(N.sph,{p:[0,c-.02,l*1.1],s:[.06,.045,.045],c:1448482})):t.nose==="beak"?o.add(N.cone,{p:[0,c-.04,l*1.12],r:[Math.PI/2,0,0],s:[.11,.24,.07],c:16757274}):t.nose==="pink"?o.add(N.sph,{p:[0,c-.04,l*1],s:[.05,.04,.04],c:16748465}):t.nose==="big"?o.add(N.sph,{p:[0,c-.04,l*1],s:[.07,.07,.07],c:new Nt(t.skin).multiplyScalar(.85).getHex()}):o.add(N.sph,{p:[0,c-.04,l*1],s:[.04,.035,.035],c:1448482});let g=(M,A,R)=>o.add(A,{...R,p:[M*R.p[0],R.p[1],R.p[2]],r:R.r?[R.r[0],R.r[1]*M,R.r[2]*M]:[0,0,0]});for(let M of[-1,1])t.ears==="round"?(o.add(N.sph,{p:[M*.24,c+.27,-.02],s:[.12,.12,.06],c:t.skin}),o.add(N.sph,{p:[M*.24,c+.27,.02],s:[.07,.07,.04],c:t.belly})):t.ears==="pointy"?(o.add(N.cone,{p:[M*.2,c+.36,-.02],r:[0,0,-M*.15],s:[.12,.3,.07],c:t.skin}),o.add(N.cone,{p:[M*.2,c+.34,.02],r:[0,0,-M*.15],s:[.07,.2,.04],c:2759180})):t.ears==="long"?(o.add(N.cap,{p:[M*.14,c+.55,-.06],r:[-.25,0,-M*.12],s:[.07,.2,.05],c:t.skin}),o.add(N.cap,{p:[M*.14,c+.55,-.03],r:[-.25,0,-M*.12],s:[.04,.17,.03],c:16758217})):t.ears==="deer"?o.add(N.sph,{p:[M*.3,c+.14,-.04],r:[0,0,-M*.5],s:[.16,.08,.05],c:t.skin}):t.ears==="small"?o.add(N.sph,{p:[M*.27,c+.2,-.02],s:[.07,.07,.04],c:t.skin}):t.ears==="human"&&o.add(N.sph,{p:[M*.33,c,0],s:[.05,.08,.06],c:t.skin});switch(t.hat){case"acorn":o.add(N.sph,{p:[0,c+.3,0],s:[.3,.2,.3],c:9067051}),o.add(N.cyl,{p:[0,c+.5,0],s:[.03,.08,.03],c:7029795}),o.add(N.tor,{p:[0,c+.2,0],r:[Math.PI/2,0,0],s:[.3,.3,.4],c:7029795}),o.add(N.cone,{p:[.12,c+.58,0],r:[0,0,-.5],s:[.03,.2,.01],c:4173402});break;case"tuft":for(let M=-1;M<=1;M++)o.add(N.cone,{p:[M*.07,c+.38,-.04],r:[-.3,0,-M*.3],s:[.04,.2,.03],c:t.skin});break;case"cap":o.add(N.sph,{p:[0,c+.2,0],s:[.36,.2,.36],c:1319229}),o.add(N.box,{p:[0,c+.2,.34],s:[.4,.04,.2],c:1319229}),o.add(N.sph,{p:[0,c,-.2],s:[.35,.3,.2],c:t.hair});break;case"quills":for(let M=0;M<16;M++){let A=M/16*Math.PI*2,R=.26;o.add(N.cone,{p:[Math.cos(A)*R*.9,c+.28,Math.sin(A)*R-.05],r:[Math.sin(A)*.7,0,-Math.cos(A)*.7],s:[.045,.28,.045],c:M%2?6177830:3089430})}for(let M=0;M<5;M++)o.add(N.cone,{p:[(M-2)*.1,c+.34,-.1],r:[-.4,0,0],s:[.05,.3,.05],c:3089430});break;case"captain":o.add(N.cyl,{p:[0,c+.3,0],s:[.3,.12,.3],c:16052714}),o.add(N.cyl,{p:[0,c+.21,.02],s:[.33,.03,.33],c:1319229}),o.add(N.box,{p:[0,c+.2,.3],s:[.34,.03,.2],c:1118481}),o.add(N.sph,{p:[0,c+.27,.32],s:[.05,.05,.02],c:15054922});break;case"tufts":for(let M of[-1,1])o.add(N.cone,{p:[M*.2,c+.34,-.04],r:[0,0,-M*.4],s:[.07,.2,.05],c:8018488});break;case"antlers":for(let M of[-1,1])o.add(N.cap,{p:[M*.16,c+.5,-.04],r:[0,0,-M*.35],s:[.03,.2,.03],c:15325621}),o.add(N.cap,{p:[M*.27,c+.58,-.04],r:[0,0,-M*.9],s:[.025,.12,.025],c:15325621}),o.add(N.cap,{p:[M*.2,c+.45,-.04],r:[0,0,M*.8],s:[.025,.09,.025],c:15325621});o.add(N.box,{p:[0,c+.3,.1],s:[.5,.03,.03],c:16739226});break;case"hardhat":o.add(N.sph,{p:[0,c+.2,0],s:[.36,.24,.36],c:16765503}),o.add(N.box,{p:[0,c+.15,.3],s:[.4,.04,.2],c:16765503}),o.add(N.box,{p:[0,c+.34,0],s:[.08,.05,.3],c:14725888});break}t.goggles&&(o.add(N.tor,{p:[-u,h+.06,d+.02],s:[.13,.13,.6],c:4869978}),o.add(N.tor,{p:[u,h+.06,d+.02],s:[.13,.13,.6],c:4869978}),o.add(N.box,{p:[0,h+.08,d+0],s:[.1,.03,.03],c:4869978})),t.beard&&(o.add(N.sph,{p:[0,c-.15,l*.7],s:[.26,.2,.2],c:t.beard}),o.add(N.sph,{p:[0,c-.05,l*.98],s:[.18,.04,.05],c:t.beard})),t.stubble&&o.add(N.sph,{p:[0,c-.17,l*.66],s:[.24,.12,.2],c:9071186}),t.hair&&t.hat!=="cap"&&o.add(N.sph,{p:[0,c+.12,-.12],s:[.36,.28,.3],c:t.hair});let x=new Rt().add(N.tor,{p:[0,c-.14,l*.88],r:[0,0,Math.PI],s:[.07,.04,.4],c:3804944}),m=new Rt().add(N.sph,{p:[0,c-.15,l*.9],s:[.07,.085,.04],c:3804944}).add(N.sph,{p:[0,c-.2,l*.92],s:[.04,.03,.02],c:16739194});for(let M of[-1,1])r.add(N.cap,{p:[M*.28,0,.2],r:[Math.PI/2-.35,0,M*.12],s:[.075,.2,.075],c:t.shirt}),r.add(N.sph,{p:[M*.2,-.04,.44],s:[.085,.085,.085],c:t.skin});let p=xy(),y=n.build(p),w=new oe;w.add(s.build(p)),w.position.set(0,0,0);let _=x.build(new se({vertexColors:!0})),S=m.build(new se({vertexColors:!0}));S.visible=!1,w.add(_),w.add(S);let T=r.build(p);T.position.set(0,.15,.05);let C=new Rt;C.add(N.tor,{r:[0,0,0],s:[.2,.2,.6],c:1843760}),C.add(N.cyl,{r:[Math.PI/2,0,0],s:[.04,.2,.04],c:un});let v=new oe;return v.add(C.build(Pp())),v.position.set(0,.18,.5),v.rotation.x=-.9,e.add(y),e.add(w),e.add(T),e.add(v),{root:e,head:w,torso:y,arms:T,smile:_,open:S,wheel:v,name:i,cfg:t}}function Ip(i,t,e,n,s,r){i.head.rotation.z+=(-t*.28-i.head.rotation.z)*Math.min(1,s*9),i.head.rotation.y+=(-t*.22-i.head.rotation.y)*Math.min(1,s*9),i.head.position.y=Math.sin(r*12)*.006*e+e*.015,i.wheel.rotation.z+=(-t*.9-i.wheel.rotation.z)*Math.min(1,s*14),i.torso.rotation.z+=(-t*.1-i.torso.rotation.z)*Math.min(1,s*8),i.smile.visible=!n,i.open.visible=!!n}var vt=N;var Qh=Math.PI*2;function ca(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var ri=i=>new Nt(i),Ly={meadow:{skyTop:3117055,skyHor:13955071,sun:16773577,sunDir:[.5,.55,.3],ground:7127626,off:9678922,road:5198684,curb1:15220794,curb2:16777215,wall1:15911244,wall2:13933098,fog:13626111,fogD:.0016,hemiSky:13625599,hemiGnd:7051850,exposure:1},harbor:{skyTop:3428510,skyHor:16758922,sun:16761994,sunDir:[-.6,.28,.5],ground:5859194,off:8027e3,road:3883858,curb1:16753178,curb2:1911364,wall1:15029052,wall2:3117224,fog:15904908,fogD:.0017,hemiSky:16766128,hemiGnd:3951206,exposure:1.02},mesa:{skyTop:16751434,skyHor:16770992,sun:16773312,sunDir:[.3,.7,-.4],ground:14722650,off:13207112,road:9071186,curb1:11813932,curb2:16113584,wall1:11818298,wall2:9387818,fog:16767392,fogD:.0016,hemiSky:16769200,hemiGnd:11037242,exposure:1.05},frost:{skyTop:6990064,skyHor:15398399,sun:16054783,sunDir:[.2,.4,.7],ground:15660799,off:13230066,road:7043724,curb1:2795222,curb2:16777215,wall1:12576511,wall2:9226480,fog:14741243,fogD:.0018,hemiSky:15135743,hemiGnd:10138831,exposure:1}};function fs(i,t,e,n=!0){let s=document.createElement("canvas");s.width=i,s.height=t;let r=s.getContext("2d");e(r,i,t);let a=new gi(s);return a.colorSpace=Ce,a.anisotropy=4,n&&(a.wrapS=a.wrapT=ss),a}function Up(i,t,e,n,s,r){let a=ca(7);for(let o=0;o<n;o++){i.fillStyle=r[a()*r.length|0],i.globalAlpha=s*(.4+a()*.6);let c=1+a()*3;i.fillRect(a()*t,a()*e,c,c)}i.globalAlpha=1}function Lp(i){return fs(512,512,(t,e,n)=>{let s=ri(i.ground);t.fillStyle="#"+s.getHexString(),t.fillRect(0,0,e,n);let r=ca(11);for(let a=0;a<260;a++){let o=s.clone().offsetHSL((r()-.5)*.03,(r()-.5)*.06,(r()-.5)*.08);t.fillStyle="#"+o.getHexString(),t.globalAlpha=.35;let c=10+r()*38;t.beginPath(),t.arc(r()*e,r()*n,c,0,Qh),t.fill()}t.globalAlpha=1,Up(t,e,n,2500,.35,["#ffffff","#000000","#"+s.clone().offsetHSL(0,.1,-.1).getHexString()])})}function Dy(i,t){return fs(256,512,(e,n,s)=>{let r=ri(i.road);e.fillStyle="#"+r.getHexString(),e.fillRect(0,0,n,s),Up(e,n,s,5e3,.28,["#ffffff","#000000","#888888"]),e.globalAlpha=.12,e.fillStyle="#000",e.fillRect(n*.28,0,n*.1,s),e.fillRect(n*.62,0,n*.1,s),e.globalAlpha=1,e.fillStyle="rgba(255,255,255,0.9)",e.fillRect(n*.035,0,6,s),e.fillRect(n*.965-6,0,6,s),e.fillStyle=t==="mesa"?"rgba(255,240,200,0.8)":t==="harbor"?"rgba(255,200,80,0.85)":"rgba(255,255,255,0.8)";for(let a=0;a<s;a+=128)e.fillRect(n/2-3,a+16,6,64);if(t==="harbor"){e.globalAlpha=.07,e.fillStyle="#000";for(let a=0;a<s;a+=32)e.fillRect(0,a,n,2);e.globalAlpha=1}})}function ky(){return fs(128,32,(i,t,e)=>{for(let s=0;s<4;s++)for(let r=0;r<16;r++)i.fillStyle=(r+s)%2?"#101010":"#f5f5f5",i.fillRect(r*t/16,s*e/4,t/16,e/4)},!1)}function Dp(i,t=512,e=128,n="#101827",s="#ffffff",r="#ffd23f"){return fs(t,e,a=>{let o=a.createLinearGradient(0,0,t,0);o.addColorStop(0,n),o.addColorStop(1,n),a.fillStyle=o,a.fillRect(0,0,t,e),a.fillStyle=r,a.fillRect(0,0,t,8),a.fillRect(0,e-8,t,8),a.fillStyle=s,a.font="900 "+e*.5+"px system-ui,sans-serif",a.textAlign="center",a.textBaseline="middle",a.fillText(i,t/2,e/2+4)},!1)}function kp(){return fs(128,256,(i,t,e)=>{i.fillStyle="#0b2a52",i.fillRect(0,0,t,e);for(let n=0;n<3;n++){let s=n*85+10;i.fillStyle=n%2?"#38e1ff":"#ffd23f",i.beginPath(),i.moveTo(t*.1,s+70),i.lineTo(t*.5,s),i.lineTo(t*.9,s+70),i.lineTo(t*.9,s+90),i.lineTo(t*.5,s+28),i.lineTo(t*.1,s+90),i.fill()}})}function Ny(){return fs(128,128,(i,t,e)=>{let n=i.createLinearGradient(0,0,t,e);["#ff4d6d","#ffd23f","#37e08a","#35a7ff","#b66bff"].forEach((s,r,a)=>n.addColorStop(r/(a.length-1),s)),i.fillStyle=n,i.fillRect(0,0,t,e),i.fillStyle="rgba(255,255,255,0.28)",i.fillRect(0,0,t,10),i.fillRect(0,0,10,e),i.fillRect(t-10,0,10,e),i.fillRect(0,e-10,t,10),i.fillStyle="#fff",i.font="900 96px system-ui",i.textAlign="center",i.textBaseline="middle",i.shadowColor="#000a",i.shadowBlur=8,i.fillText("?",t/2,e/2+6)},!1)}function Fc(i,t,e,n,s,r=1,a=null){let o=i.N,c=[];for(let p=0;p<=o;p+=r)c.push(p%o);(c[c.length-1]!==0||c.length<2)&&c.push(0);let l=[],h=[],d=[],u=[],f=0,g=a?ri(a):null;c.forEach((p,y)=>{let w=i.p[p][0],_=i.p[p][1],S=i.tz[p],T=-i.tx[p],C=(y===c.length-1?i.length:p*i.step)/s;if(l.push(w+S*t,n,_+T*t,w+S*e,n,_+T*e),h.push(0,C,1,C),g&&u.push(g.r,g.g,g.b,g.r,g.g,g.b),y>0){let v=(y-1)*2;d.push(v,v+2,v+1,v+1,v+2,v+3)}});let x=new me;if(x.setAttribute("position",new Xt(l,3)),x.setAttribute("uv",new Xt(h,2)),g&&x.setAttribute("color",new Xt(u,3)),x.setIndex(d),x.computeVertexNormals(),x.attributes.normal.getY(0)<0){let p=x.index.array;for(let y=0;y<p.length;y+=3){let w=p[y+1];p[y+1]=p[y+2],p[y+2]=w}x.computeVertexNormals()}return x}function Uy(i,t,e,n,s,r,a){let o=[],c=[],l=[];i.forEach((d,u)=>{let f=e[u],g=-t[u];o.push(d[0]+f*n,r,d[1]+g*n,d[0]+f*s,r,d[1]+g*s);let x=u*2/a;if(c.push(0,x,1,x),u>0){let m=(u-1)*2;l.push(m,m+2,m+1,m+1,m+2,m+3)}});let h=new me;if(h.setAttribute("position",new Xt(o,3)),h.setAttribute("uv",new Xt(c,2)),h.setIndex(l),h.computeVertexNormals(),h.attributes.normal.getY(0)<0){let d=h.index.array;for(let u=0;u<d.length;u+=3){let f=d[u+1];d[u+1]=d[u+2],d[u+2]=f}h.computeVertexNormals()}return h}function Np(i,t,e,n,s,r,a=6,o=.9){let c=[],l=[],h=[],d=i.N,u=ri(n),f=ri(s),g=0,x=Math.sign(t);for(let p=0;p<d;p++){let y=(p+1)%d,w=(P,D)=>[i.p[P][0]+i.tz[P]*D,i.p[P][1]-i.tx[P]*D],_=w(p,t),S=w(y,t);if(r&&(r(_[0],_[1])||r(S[0],S[1])))continue;let T=w(p,t+x*o),C=w(y,t+x*o),v=Math.floor(p*i.step/a)%2?u:f,M=v.clone().multiplyScalar(.72),A=(P,D,L,B,q)=>{c.push(P[0],L,P[1],D[0],L,D[1],D[0],B,D[1],P[0],B,P[1]);for(let Y=0;Y<4;Y++)l.push(q.r,q.g,q.b);h.push(g,g+1,g+2,g,g+2,g+3,g,g+2,g+1,g,g+3,g+2),g+=4};A(_,S,0,e,v),A(T,C,0,e,M),A(_,S,e,e,v),c.push(_[0],e,_[1],S[0],e,S[1],C[0],e,C[1],T[0],e,T[1]);let R=v.clone().multiplyScalar(1.15);for(let P=0;P<4;P++)l.push(R.r,R.g,R.b);h.push(g,g+1,g+2,g,g+2,g+3,g,g+2,g+1,g,g+3,g+2),g+=4}let m=new me;return m.setAttribute("position",new Xt(c,3)),m.setAttribute("color",new Xt(l,3)),m.setIndex(h),m.computeVertexNormals(),m}function Fy(i,t,e){let n=i.N,s=[],r=[],a=[],o=0,c=ri(t.curb1),l=ri(t.curb2);for(let d of[-1,1])for(let u=0;u<n;u++){let f=(u+1)%n,g=Math.abs(i.k[u]);if(g<e)continue;let x=i.k[u]>0?1:-1;if(d!==x&&g<e*1.8)continue;let m=(v,M)=>[i.p[v][0]+i.tz[v]*M,i.p[v][1]-i.tx[v]*M],p=d*i.halfW,y=d*(i.halfW+1.3),w=m(u,p),_=m(f,p),S=m(f,y),T=m(u,y),C=Math.floor(u*i.step/3)%2?c:l;s.push(w[0],.07,w[1],_[0],.07,_[1],S[0],.07,S[1],T[0],.07,T[1]);for(let v=0;v<4;v++)r.push(C.r,C.g,C.b);a.push(o,o+1,o+2,o,o+2,o+3,o,o+2,o+1,o,o+3,o+2),o+=4}let h=new me;return h.setAttribute("position",new Xt(s,3)),h.setAttribute("color",new Xt(r,3)),h.setIndex(a),h.computeVertexNormals(),h}var Je=i=>new $e(i);function Pe(i){let t=i.build(new se);return t?t.geometry:null}var Yt={sph:new Mn(1,9,6),cyl:new xi(1,1,1,9,1),cone:new Di(1,1,9,1),cap:new as(1,1,2,7)},Oy={meadow:{tree:()=>{let i=new Rt;return i.add(Yt.cyl,{p:[0,1.2,0],s:[.35,1.2,.35],c:8014374}),i.add(Yt.sph,{p:[0,3.4,0],s:[1.9,1.7,1.9],c:4173380}),i.add(Yt.sph,{p:[.7,4.3,.2],s:[1.2,1.1,1.2],c:5817429}),Pe(i)},tree2:()=>{let i=new Rt;return i.add(Yt.cyl,{p:[0,1,0],s:[.3,1,.3],c:9067056}),i.add(Yt.cone,{p:[0,3.4,0],s:[1.6,3,1.6],c:3051338}),i.add(Yt.cone,{p:[0,4.8,0],s:[1.1,2.2,1.1],c:4040794}),Pe(i)},flower:()=>{let i=new Rt;for(let t=0;t<5;t++){let e=t*1.3;i.add(Yt.cyl,{p:[Math.sin(e)*.8,.3,Math.cos(e)*.8],s:[.04,.3,.04],c:3116858}),i.add(Yt.sph,{p:[Math.sin(e)*.8,.65,Math.cos(e)*.8],s:[.22,.22,.22],c:[16735631,16765503,16777215,11955199,16747066][t]})}return Pe(i)},bale:()=>{let i=new Rt;return i.add(Yt.cyl,{p:[0,.6,0],r:[0,0,Math.PI/2],s:[.6,.55,.6],c:15253578}),Pe(i)},rock:()=>{let i=new Rt;return i.add(Yt.sph,{p:[0,.4,0],s:[.9,.55,.7],c:10134440}),Pe(i)}},harbor:{lamp:()=>{let i=new Rt;return i.add(Yt.cyl,{p:[0,3,0],s:[.1,3,.1],c:2831430}),i.add(Yt.sph,{p:[0,6.2,0],s:[.45,.45,.45],c:16769946}),i.add(vt.box,{p:[0,.2,0],s:[.5,.4,.5],c:2831430}),Pe(i)},stack:()=>{let i=new Rt,t=[15029052,3117224,15906106,3825584,7321706];for(let e=0;e<6;e++){let n=e/3|0;i.add(vt.sbox,{p:[(e%3-1)*2.7,1.3+n*2.6,0],s:[2.6,2.5,6],c:t[(e*7+n*3)%5]})}return Pe(i)},crate:()=>{let i=new Rt;return i.add(vt.box,{p:[0,.8,0],s:[1.6,1.6,1.6],c:12094034}),i.add(vt.box,{p:[1.3,.5,.6],s:[1,1,1],c:11041346}),Pe(i)},bollard:()=>{let i=new Rt;return i.add(Yt.cyl,{p:[0,.5,0],s:[.32,.5,.32],c:16762938}),Pe(i)},bldg:()=>{let i=new Rt;i.add(vt.sbox,{p:[0,7,0],s:[8,14,8],c:3820136});for(let t=0;t<5;t++)for(let e=-1;e<=1;e++)i.add(vt.sbox,{p:[e*2.2,3+t*2.4,4.05],s:[1.2,1.2,.05],c:(e+t)%3?16767114:8030888});return Pe(i)},boat:()=>{let i=new Rt;return i.add(vt.box,{p:[0,.3,0],s:[2,.8,6],c:16117990}),i.add(Yt.cyl,{p:[0,3.5,0],s:[.08,3.2,.08],c:13620959}),i.add(Yt.cone,{p:[0,3.2,.4],s:[1.4,2.8,.1],c:16739162}),Pe(i)}},mesa:{pillar:()=>{let i=new Rt,t=[12739134,14253899,15114330,11818298];for(let e=0;e<4;e++)i.add(Yt.cyl,{p:[0,5+e*5,0],s:[8-e*.6+e%2*.8,5,8-e*.6+e%2*.8],c:t[e]});return i.add(Yt.cyl,{p:[0,20.4,0],s:[8.2,.5,8.2],c:15123066}),Pe(i)},cactus:()=>{let i=new Rt;return i.add(Yt.cap,{p:[0,1.6,0],s:[.45,1.5,.45],c:4168274}),i.add(Yt.cap,{p:[.8,2,0],s:[.28,.6,.28],c:4168274}),i.add(Yt.cyl,{p:[.4,1.5,0],r:[0,0,Math.PI/2],s:[.2,.4,.2],c:4168274}),i.add(Yt.cap,{p:[-.8,1.7,0],s:[.26,.5,.26],c:4168274}),i.add(Yt.cyl,{p:[-.4,1.3,0],r:[0,0,Math.PI/2],s:[.18,.4,.18],c:4168274}),Pe(i)},rock:()=>{let i=new Rt;return i.add(Yt.sph,{p:[0,.8,0],s:[1.8,1.1,1.4],c:11818298}),i.add(Yt.sph,{p:[1.2,.5,.4],s:[1,.7,.9],c:12739134}),Pe(i)},dune:()=>{let i=new Rt;return i.add(Yt.sph,{p:[0,0,0],s:[9,2.4,6],c:15316840}),Pe(i)},bones:()=>{let i=new Rt;return i.add(Yt.cap,{p:[0,.3,0],r:[0,0,Math.PI/2],s:[.12,1.2,.12],c:15854038}),i.add(Yt.sph,{p:[1.3,.3,0],s:[.3,.3,.3],c:15854038}),Pe(i)}},frost:{pine:()=>{let i=new Rt;i.add(Yt.cyl,{p:[0,.8,0],s:[.3,.8,.3],c:7031340});for(let t=0;t<4;t++)i.add(Yt.cone,{p:[0,2.2+t*1.4,0],s:[2-t*.4,2.4,2-t*.4],c:2783832}),i.add(Yt.cone,{p:[0,2.7+t*1.4,0],s:[1.5-t*.32,1.5,1.5-t*.32],c:15923711});return Pe(i)},crystal:()=>{let i=new Rt;return i.add(Yt.cone,{p:[0,2.2,0],s:[.8,4.4,.8],c:10476799}),i.add(Yt.cone,{p:[1,1.4,.3],r:[0,0,-.3],s:[.6,2.8,.6],c:12577535}),i.add(Yt.cone,{p:[-.9,1.1,-.2],r:[0,0,.35],s:[.5,2.2,.5],c:8375029}),Pe(i)},mound:()=>{let i=new Rt;return i.add(Yt.sph,{p:[0,0,0],s:[3.5,1.4,3],c:16777215}),Pe(i)},rock:()=>{let i=new Rt;return i.add(Yt.sph,{p:[0,.5,0],s:[1.3,.8,1],c:8095636}),i.add(Yt.sph,{p:[0,1,0],s:[1,.4,.8],c:16777215}),Pe(i)},igloo:()=>{let i=new Rt;return i.add(Yt.sph,{p:[0,0,0],s:[2.4,1.8,2.4],c:16055039}),i.add(Yt.cyl,{p:[0,.4,2.3],r:[Math.PI/2,0,0],s:[.7,.8,.7],c:14478584}),Pe(i)}}},By={meadow:[["tree",150,6,60,.9,1.7],["tree2",90,8,70,.9,1.6],["flower",260,1.5,22,.8,1.6],["bale",40,2,14,.9,1.2],["rock",40,5,50,.6,1.5]],harbor:[["lamp",90,2,5,1,1],["stack",26,12,55,.9,1.3],["crate",60,3,25,.8,1.3],["bollard",80,1.5,3.5,1,1.1],["bldg",22,60,130,.8,1.7]],mesa:[["pillar",28,22,140,.7,1.9],["cactus",120,4,60,.8,1.7],["rock",90,3,70,.7,1.9],["dune",22,25,90,.8,1.7],["bones",12,3,20,1,1.4]],frost:[["pine",210,5,75,.9,1.8],["crystal",50,4,45,.8,1.8],["mound",100,3,40,.8,1.6],["rock",50,5,40,.8,1.8],["igloo",4,16,40,1,1.2]]},Oc=class{constructor(t,e,n,s={}){this.tc=t,this.scene=e,this.group=new oe,e.add(this.group),this.th=Ly[t.theme],this.anim=[],this.hq=!!s.hq,this.disposables=[],this.tex={};let r=this.th;e.background=new Nt(r.fog),e.fog=new Dr(r.fog,r.fogD),this._sky(n),this._lights(),this._ground(),this._road(),this._curbsWalls(),this._shortcut(),this._startLine(),this._props(),this._landmark(),this._boxesCoinsPads(),this._water()}add(t){return this.group.add(t),t}_sky(t){let e=this.th,n=new O(...e.sunDir).normalize(),s=new Ze({side:je,depthWrite:!1,fog:!1,uniforms:{top:{value:ri(e.skyTop)},hor:{value:ri(e.skyHor)},sunDir:{value:n},sunCol:{value:ri(e.sun)},time:{value:0}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); gl_Position.z = gl_Position.w; }",fragmentShader:`varying vec3 vD; uniform vec3 top,hor,sunCol,sunDir; uniform float time;
      float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
      void main(){ vec3 d=normalize(vD); float t=clamp(d.y,0.0,1.0); vec3 c=mix(hor,top,pow(t,0.55));
        float s=max(dot(d,sunDir),0.0); c+=sunCol*(pow(s,600.0)*3.0+pow(s,12.0)*0.35);
        if(d.y>0.02){ vec2 uv=d.xz/(d.y+0.25)*2.2+vec2(time*0.01,0.0); float cl=n(uv)*0.55+n(uv*2.1)*0.3+n(uv*4.3)*0.15; cl=smoothstep(0.52,0.85,cl); c=mix(c,mix(vec3(1.0),hor,0.3),cl*0.75*smoothstep(0.02,0.25,d.y)); }
        gl_FragColor=vec4(c,1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`});this.skyMat=s,this.sky=new Ot(new Mn(1,24,16),s),this.sky.scale.setScalar(1500),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,this.group.add(this.sky);let r=new Wi(t),a=new Gn,o=s.clone();a.add(new Ot(new Mn(1,24,16),o)),this.envTex=r.fromScene(a,.02).texture,this.scene.environment=this.envTex,r.dispose()}_lights(){let t=this.th;this.hemi=new Fi(t.hemiSky,t.hemiGnd,1.15),this.sun=new Vn(t.sun,2.6);let e=new O(...t.sunDir).normalize();this.sun.position.copy(e).multiplyScalar(100),this.rimL=new Vn(12574975,.9),this.rimL.position.copy(e).multiplyScalar(-60).add(new O(0,40,0)),this.add(this.hemi),this.add(this.sun),this.add(this.rimL)}_ground(){let t=this.th,e=this.tc,n=Lp(t);n.repeat.set(120,120),this.tex.ground=n;let s=Je({map:n,roughness:.95,metalness:0,color:16777215});this.groundMat=s;let r=new Ot(new Ne(4e3,4e3),s);r.rotation.x=-Math.PI/2,r.position.y=-.02,this.add(r),this.groundMesh=r;let a=Je({color:t.off,roughness:1,metalness:0}),o=Lp({ground:t.off});o.repeat.set(1,1),a.map=o,this.add(new Ot(Fc(e,-e.limit,-e.halfW,.01,24),a)),this.add(new Ot(Fc(e,e.halfW,e.limit,.01,24),a)),o.wrapS=o.wrapT=ss,a.map.repeat.set(.6,1),a.map.needsUpdate=!0}_road(){let t=this.th,e=this.tc,n=Dy(t,e.id);this.tex.road=n,this.roadMat=Je({map:n,roughness:.82,metalness:0,envMapIntensity:.5});let s=new Ot(Fc(e,-e.halfW,e.halfW,.03,12,1),this.roadMat);this.add(s)}_curbsWalls(){let t=this.th,e=this.tc;this.add(new Ot(Fy(e,t,.0045),Je({vertexColors:!0,roughness:.7})));let n=e.sc?(a,o)=>{let c=e.nearestSc(a,o);return c&&c.d<e.sc.half+6&&c.u>-.05&&c.u<1.05&&(c.u<.12||c.u>.88)}:null,s=Je({vertexColors:!0,roughness:.8,metalness:.05,envMapIntensity:.6,side:Re}),r=e.theme==="mesa"?3.2:e.theme==="frost"?1.6:e.theme==="harbor"?1.4:1.1;this.add(new Ot(Np(e,e.limit,r,t.wall1,t.wall2,n,6,e.theme==="mesa"?6:1.2),s)),this.add(new Ot(Np(e,-e.limit,r,t.wall1,t.wall2,n,6,e.theme==="mesa"?6:1.2),s))}_shortcut(){let t=this.tc,e=t.sc;if(!e)return;let n=this.th,s={rough:11569754,sand:15188602,ice:12576511}[e.surf]||11569754,r=Je({color:s,roughness:e.surf==="ice"?.12:1,metalness:e.surf==="ice"?.2:0,envMapIntensity:e.surf==="ice"?1.6:.4});this.add(new Ot(Uy(e.p,e.tx,e.tz,-e.half,e.half,.04,14),r));let a=m=>{let p=new Rt;for(let y=0;y<e.n;y+=2){let w=e.p[y],_=e.tz[y],S=-e.tx[y],T=w[0]+_*(e.half+.7)*m,C=w[1]+S*(e.half+.7)*m;t.nearestGlobal(T,C).d<t.limit+2.5||(p.add(vt.cyl,{p:[T,.5,C],s:[.35,.5,.35],c:m>0?n.wall1:n.wall2}),p.add(vt.cyl,{p:[T,1.05,C],s:[.18,.18,.18],c:16777215}))}return p.build(Je({vertexColors:!0,roughness:.7}))},o=a(1),c=a(-1);o&&this.add(o),c&&this.add(c);let l=e.p[3],h=e.tx[3],d=e.tz[3],u=new Ot(new Ne(10,2.5),new se({map:Dp("SHORTCUT",512,128,"#14213d","#ffd23f","#ff4d6d"),toneMapped:!1,side:Re}));u.position.set(l[0],7.2,l[1]),u.rotation.y=Math.atan2(h,d)+Math.PI/2,this.add(u);let f=new Rt;for(let m of[-1,1])f.add(vt.cyl,{p:[l[0]+d*m*6.4,3.4,l[1]-h*m*6.4],s:[.35,3.4,.35],c:16765503});let g=f.build(Je({vertexColors:!0,roughness:.5}));g&&this.add(g);let x=new Ot(new Ne(2.6,5),new se({map:kp(),toneMapped:!1}));x.rotation.x=-Math.PI/2,x.position.set(l[0],.09,l[1]),x.rotation.z=-Math.atan2(h,d)+Math.PI,this.add(x)}_startLine(){let t=this.tc,e=this.th,n={};t.at(0,0,n);let s=ky();s.wrapS=s.wrapT=Cn;let r=new Ot(new Ne(t.width,3),new se({map:s,toneMapped:!1}));r.rotation.x=-Math.PI/2,r.rotation.z=-n.heading,r.position.set(n.x,.08,n.z),this.add(r);let a=new Rt,o=n.tz,c=-n.tx;for(let g of[-1,1])a.add(vt.box,{p:[n.x+o*g*(t.halfW+1.2),3.6,n.z+c*g*(t.halfW+1.2)],s:[1.1,7.2,1.1],c:2831430});a.add(vt.box,{p:[n.x,7.4,n.z],r:[0,n.heading,0],s:[t.width+3.6,1.2,1.1],c:2831430});let l=a.build(Je({vertexColors:!0,roughness:.4,metalness:.5}));this.add(l);let h=new Ot(new Ne(t.width+1,3.2),new se({map:Dp(t.meta.name.toUpperCase(),1024,200,"#0e1a33","#ffffff","#ffd23f"),toneMapped:!1,side:Re}));h.position.set(n.x,6.3,n.z),h.rotation.y=n.heading,this.add(h);let d=new Rt,u=ca(5);for(let g of[-1,1])for(let x=0;x<40;x++){let m=x/10|0,p=x%10,y=[16731501,16765503,3516415,3661962,11955199,16777215][u()*6|0];d.add(Yt.sph,{p:[n.x+o*g*(t.limit+3.5+m*1.8)+n.tx*(p-5)*1.5,1.4+m*1,n.z+c*g*(t.limit+3.5+m*1.8)+n.tz*(p-5)*1.5],s:[.5,.55,.5],c:y})}for(let g of[-1,1])d.add(vt.sbox,{p:[n.x+o*g*(t.limit+8),.8,n.z+c*g*(t.limit+8)],r:[0,n.heading,0],s:[1.2*0+17,1.4,6.5],c:4871016});let f=d.build(Je({vertexColors:!0,roughness:.8}));this.add(f),this.crowd=f}_props(){let t=this.tc,e=this.th,n=By[t.theme],s=Oy[t.theme],r=ca(t.theme.length*977+13),a=new $e({vertexColors:!0,roughness:.8,metalness:0,envMapIntensity:.6});si(a,16777215,2.4,.18);let o=new ke,c=t.length,l={};this.propMeshes=[];for(let[m,p,y,w,_,S]of n){let T=s[m](),C=[],v=0;for(;C.length<p&&v++<p*30;){let A=r()*c,R=r()<.5?-1:1,P=t.limit+y+r()*(w-y),D=t.at(A,R*P,{});if(!(t.nearestGlobal(D.x,D.z).d<t.limit+y-.5)){if(t.sc){let B=t.nearestSc(D.x,D.z);if(B&&B.d<t.sc.half+4)continue}C.push([D.x,D.z,r()*Qh,_+r()*(S-_),r()])}}if(!C.length)continue;let M=new Ii(T,a,C.length);if(C.forEach((A,R)=>{o.position.set(A[0],m==="dune"?-.4:0,A[1]),o.rotation.set(0,A[2],0),o.scale.setScalar(A[3]),(m==="dune"||m==="mound")&&o.scale.set(A[3],A[3]*(.8+A[4]*.5),A[3]),o.updateMatrix(),M.setMatrixAt(R,o.matrix);let P=new Nt().setHSL(0,0,.88+A[4]*.2);M.setColorAt(R,P)}),M.instanceMatrix.needsUpdate=!0,M.instanceColor&&(M.instanceColor.needsUpdate=!0),M.frustumCulled=!1,this.add(M),this.propMeshes.push(M),m==="lamp"&&t.theme==="harbor"){let A=new Ii(new Mn(.9,8,6),new se({color:16769946,transparent:!0,opacity:.35,depthWrite:!1,fog:!1}),C.length);C.forEach((R,P)=>{o.position.set(R[0],6.2*R[3],R[1]),o.rotation.set(0,0,0),o.scale.setScalar(R[3]),o.updateMatrix(),A.setMatrixAt(P,o.matrix)}),A.frustumCulled=!1,this.add(A)}}let h=new Rt,d={meadow:[6271818,4102735,8047451],harbor:[4543598,3491168,5662858],mesa:[13664319,11818298,14719572],frost:[13624309,11127014,15332607]}[t.theme],u=0,f=0;for(let m=0;m<t.N;m+=4)u+=t.p[m][0],f+=t.p[m][1];u/=Math.ceil(t.N/4),f/=Math.ceil(t.N/4);let g=0;for(let m=0;m<t.N;m+=4)g=Math.max(g,Math.hypot(t.p[m][0]-u,t.p[m][1]-f));this.center=[u,f],this.radius=g;for(let m=0;m<46;m++){let p=m/46*Qh+r()*.1,y=g+260+r()*220,w=60+r()*120,_=100+r()*140;h.add(Yt.sph,{p:[u+Math.cos(p)*y,-w*.35,f+Math.sin(p)*y],s:[_,w,_],c:d[r()*d.length|0]})}let x=h.build(Je({vertexColors:!0,roughness:1}));x&&this.add(x)}_water(){if(this.tc.theme!=="harbor")return;let t=this.tc,e=new Ot(new Ne(4e3,4e3,1,1),new $e({color:1866394,roughness:.18,metalness:.1,envMapIntensity:1.6}));e.rotation.x=-Math.PI/2,e.position.y=-.9,this.add(e),this.sea=e,this.groundMesh.visible=!1;let n=Je({map:this.tex.ground,color:16777215,roughness:.9});this.tex.ground.repeat.set(1,1),this.tex.ground.repeat.set(.07,.07);let s=new Ot(Fc(t,-(t.limit+70),t.limit+70,-.01,14),n);this.add(s)}_landmark(){let t=this.tc,e=t.meta.landmark;if(!e)return;let n=t.length,s=t.reverse?1-e.f:e.f,r=t.at(s*n,0,{}),a=r.tz,o=-r.tx,c=t.mirror?-1:1,l=r.x+a*e.lat*c,h=r.z+o*e.lat*c,d=new oe;if(d.position.set(l,0,h),this.add(d),this.landmark=d,e.type==="windmill"){let u=new Rt;u.add(vt.cyl,{p:[0,10,0],s:[4.2,10,4.2],c:16050900}),u.add(vt.cone,{p:[0,22.5,0],s:[5.4,5.2,5.4],c:13124398}),u.add(vt.cyl,{p:[0,1,0],s:[5,1.2,5],c:9407104}),u.add(vt.box,{p:[0,7,4.1],s:[2,3,.3],c:7031340}),d.add(u.build(Je({vertexColors:!0,roughness:.7})));let f=new oe;f.position.set(0,19.5,4.6);let g=new Rt;for(let x=0;x<4;x++){let m=x*Math.PI/2;g.add(vt.sbox,{p:[Math.cos(m)*8,Math.sin(m)*8,0],r:[0,0,m],s:[14,1.6,.3],c:15921906}),g.add(vt.sbox,{p:[Math.cos(m)*8,Math.sin(m)*8,-.05],r:[0,0,m],s:[14,.5,.4],c:13124398})}f.add(g.build(Je({vertexColors:!0,roughness:.7,side:Re}))),d.add(f),this.anim.push((x,m)=>{f.rotation.z=m*.5}),d.rotation.y=Math.atan2(-a*c,-o*c),d.scale.setScalar(1.4)}else if(e.type==="lighthouse"){let u=new Rt;for(let m=0;m<6;m++)u.add(vt.cyl,{p:[0,3+m*5,0],s:[6-m*.55,3.2,6-m*.55],c:m%2?16117990:15029052});u.add(vt.cyl,{p:[0,35,0],s:[4,.6,4],c:2831430}),u.add(vt.cone,{p:[0,40,0],s:[4,4,4],c:2831430}),u.add(vt.cyl,{p:[0,.5,0],s:[9,1,9],c:9080729}),d.add(u.build(Je({vertexColors:!0,roughness:.6})));let f=new Ot(new Mn(2.2,12,10),new se({color:16773552,fog:!1}));f.position.y=37,d.add(f);let g=new Ot(new Di(14,200,20,1,!0),new se({color:16773552,transparent:!0,opacity:.18,depthWrite:!1,side:Re,blending:cs,fog:!1})),x=new oe;g.rotation.z=Math.PI/2,g.position.x=100,x.add(g),x.position.y=37,d.add(x),this.anim.push((m,p)=>{x.rotation.y=p*.7}),d.scale.setScalar(1.3)}else if(e.type==="arch"){let u=new Rt,f=[12739134,14253899,11818298];u.add(vt.cyl,{p:[-14,14,0],s:[8,14,8],c:f[0]}),u.add(vt.cyl,{p:[14,12,0],s:[8,12,8],c:f[1]});for(let g=0;g<=12;g++){let x=g/12*Math.PI;u.add(vt.cyl,{p:[Math.cos(x)*-14,22+Math.sin(x)*8,0],s:[4.2,5,4.2],c:f[g%3]})}u.add(vt.cyl,{p:[0,33,0],s:[20,3,7],c:15114330}),d.add(u.build(Je({vertexColors:!0,roughness:.95}))),d.scale.setScalar(1.3),d.rotation.y=Math.atan2(-a*c,-o*c)}else if(e.type==="waterfall"){let u=new Rt;u.add(vt.sph,{p:[0,20,0],s:[34,34,22],c:10336468}),u.add(vt.sph,{p:[18,14,8],s:[18,20,14],c:12112102}),u.add(vt.sph,{p:[-20,12,6],s:[16,18,14],c:9416912}),d.add(u.build(Je({vertexColors:!0,roughness:.6})));let f=fs(64,256,(x,m,p)=>{let y=x.createLinearGradient(0,0,m,0);y.addColorStop(0,"#9fe4ff"),y.addColorStop(.5,"#ffffff"),y.addColorStop(1,"#9fe4ff"),x.fillStyle=y,x.fillRect(0,0,m,p);let w=ca(3);x.fillStyle="rgba(255,255,255,0.7)";for(let _=0;_<40;_++)x.fillRect(w()*m,w()*p,3,12+w()*30)}),g=new Ot(new Ne(14,32),new se({map:f,transparent:!0,opacity:.85,fog:!0}));g.position.set(0,18,12),d.add(g),this.anim.push(x=>{f.offset.y-=x*.6}),d.rotation.y=Math.atan2(-a*c,-o*c)}}_boxesCoinsPads(){let t=this.tc;this.boxes=[];let e=[-6,-3,0,3,6];for(let a of t.rows)for(let o of e){let c=t.at(a,o,{});this.boxes.push({x:c.x,z:c.z,s:a,active:!0,respawn:0,scale:1})}let n=new se({map:Ny(),transparent:!0,opacity:.93,toneMapped:!1});this.boxMesh=new Ii(new Pn(1.5,1.5,1.5),n,this.boxes.length),this.boxMesh.frustumCulled=!1,this.add(this.boxMesh),this.coins=[];for(let a of t.coinGroups)for(let o=0;o<5;o++){let c=a+o*6,l=t.at(c,Math.sin(o*.9+a)*4,{});this.coins.push({x:l.x,z:l.z,active:!0,respawn:0})}let s=new xi(.55,.55,.14,18);s.rotateX(Math.PI/2),this.coinMesh=new Ii(s,Je({color:16763176,emissive:11565568,emissiveIntensity:.6,metalness:.8,roughness:.25}),this.coins.length),this.coinMesh.frustumCulled=!1,this.add(this.coinMesh),this.pads=t.pads.map(a=>{let o=t.at(a,0,{});return{x:o.x,z:o.z,s:a,heading:o.heading,hw:3.4,hl:5}});let r=kp();this.padTex=r;for(let a of this.pads){let o=new Ot(new Ne(a.hw*2,a.hl*2),new se({map:r,toneMapped:!1}));o.rotation.x=-Math.PI/2,o.rotation.z=-a.heading+Math.PI,o.position.set(a.x,.09,a.z),this.add(o)}if(t.sc){let a=t.sc.p[1];this.scPad={x:a[0],z:a[1],heading:Math.atan2(t.sc.tx[1],t.sc.tz[1]),hw:2.4,hl:4.5},this.pads.push(this.scPad)}this.tmpO=new ke}update(t,e,n){this.skyMat.uniforms.time.value=e;for(let a of this.anim)a(t,e);this.padTex&&(this.padTex.offset.y=-(e*1.4%1));let s=this.tmpO,r=new Nt;this.boxes.forEach((a,o)=>{a.active||(a.respawn-=t,a.respawn<=0&&(a.active=!0,a.scale=.01)),a.active&&a.scale<1&&(a.scale=Math.min(1,a.scale+t*3)),s.position.set(a.x,1.5+Math.sin(e*2+o)*.18,a.z),s.rotation.set(e*.9+o,e*1.3,0);let c=a.active?a.scale:0;s.scale.setScalar(Math.max(c,1e-4)),s.updateMatrix(),this.boxMesh.setMatrixAt(o,s.matrix)}),this.boxMesh.instanceMatrix.needsUpdate=!0,this.coins.forEach((a,o)=>{a.active||(a.respawn-=t,a.respawn<=0&&(a.active=!0)),s.position.set(a.x,1,a.z),s.rotation.set(0,e*3+o*.7,0),s.scale.setScalar(a.active?1:1e-4),s.updateMatrix(),this.coinMesh.setMatrixAt(o,s.matrix)}),this.coinMesh.instanceMatrix.needsUpdate=!0,this.sea&&(this.sea.position.y=-.9+Math.sin(e*.8)*.08),this.sky&&n&&this.sky.position.copy(n),this.groundMesh&&n&&(this.groundMesh.position.x=n.x-n.x%33.33,this.groundMesh.position.z=n.z-n.z%33.33)}dispose(){this.scene.remove(this.group),this.group.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(n=>{n.map&&n.map.dispose(),n.dispose()})}),this.envTex&&this.envTex.dispose()}};var an={_comment:"Single source of truth for kart physics. Used by docs/01-game-design-document.md (generated) and by the game (src/config via esbuild JSON import).",units:"metres, seconds, radians internally; HUD speed = m/s x 4 (km/h-style readout)",topSpeed:{base:34,perStat:1.2,note:"vmax = base + perStat * S  (m/s)"},accel:{t90Base:6.4,t90PerStat:.38,note:"time to 90% of vmax on tarmac; a(v)=a0*(1-(v/vmax)^2), a0 = 1.472*vmax/t90"},brake:30,coastDrag:3,reverseMax:10,steer:{yawRateMaxDeg:105,yawPerStatDeg:3,latAccelBase:18,latAccelPerGrip:1.6,speedFade:.35,note:"yaw rate cap = (yawRateMax-ish) limited by lateral accel / v, so high speed turns wide"},grip:{normal:11,driftSlide:1.6,offroadGrip:7,note:"per-second lateral velocity decay rates"},drift:{minSpeed:17,hopImpulse:.9,angleDeg:32,innerYawMul:1.25,outerYawMul:.72,chargeSec:[.9,1.9,3.1],boostSec:[.8,1.5,2.3],boostMul:[1.14,1.22,1.3],chargeFullSteerMul:1,chargeNoSteerMul:.55,tiers:["Blue","Orange","Purple"],baseYaw:.62},startBoost:{windowSec:.28,boostSec:1.3,boostMul:1.25,earlyStallSec:1},offroad:{topMul:.55,accelMul:.6,rough:.8},boostPad:{sec:1.1,mul:1.28},item:{pod:{sec:1.8,mul:1.35},podTrio:{sec:1.4,mul:1.3,uses:3},disc:{speed:58,bounces:4,lifeSec:8,spinOutSec:1.2,speedLoss:.6},peel:{spinOutSec:.9,speedLoss:.25,throwDist:12},jolt:{armSec:1.5,shrinkSec:6,speedMul:.78,minRankToGet:6},nova:{sec:7,mul:1.2},veil:{sec:5,stealRange:25},spill:{radius:1.8,lifeSec:15,slipSec:1.2,speedLoss:.1},rocket:{speed:72,lockSec:2,spinOutSec:1.6,braceWindowSec:.25,minRankToGet:3}},bump:{kartRadius:1.15,restitution:.45,spinImpactSpeed:14,spinSec:.6,lightLoss:.15,heavyLoss:.03,massBase:.7,massPerWeight:.12,wallScrapeLoss:.08,wallHeadOnLoss:.5},draft:{minDist:4,maxDist:22,lateral:1.8,chargeSec:1.2,topMul:1.06,slingshotAfterSec:2,slingshotSec:1.2,slingshotMul:1.12},rubber:{cpuMulMin:.965,cpuMulMax:1.035,rangeM:90,cpuBaseMul:.97},class:{Light:{S:-.5,A:1,H:.5,G:0,W:-2},Medium:{S:0,A:0,H:0,G:0,W:0},Heavy:{S:.8,A:-1,H:-.5,G:.2,W:2.5}},modCapPerStat:1.5};var pt=an,tu=(i,t,e)=>Math.max(t,Math.min(e,i)),Fp=["S","A","H","G","W"];function Hy(i){return Ct.bodies.find(t=>t.name===i)||Ct.bodies[0]}function Gy(i){let t=Ct.wheels.find(o=>o.name===i.wheel)||Ct.wheels[0],e=Ct.wheelSizes[i.size??2],n=Ct.spoilers.find(o=>o.name===i.spoiler)||Ct.spoilers[0],s=Ct.exhausts.find(o=>o.name===i.exhaust)||Ct.exhausts[0],r=Ct.bumpers.find(o=>o.name===i.bumper)||Ct.bumpers[0],a={S:0,A:0,H:0,G:0,W:0};for(let o of Fp)a[o]=tu(t[o]+e[o]+n[o]+s[o]+r[o],-an.modCapPerStat,an.modCapPerStat);return{m:a,off:t.off,tire:t.tire}}function la(i,t="Medium"){let e=Hy(i.body),n=an.class[t],{m:s,off:r,tire:a}=Gy(i),o={};for(let c of Fp)o[c]=tu(e[c]+n[c]+s[c],1,10);return o.vmax=an.topSpeed.base+an.topSpeed.perStat*o.S,o.t90=an.accel.t90Base-an.accel.t90PerStat*o.A,o.a0=1.472*o.vmax/o.t90,o.yawMax=an.steer.yawRateMaxDeg*(.72+.03*o.H)*Math.PI/180,o.latAccel=an.steer.latAccelBase+an.steer.latAccelPerGrip*o.G,o.mass=an.bump.massBase+an.bump.massPerWeight*o.W,o.offTop=tu(an.offroad.topMul+.1125*r,.4,.95),o.tire=a,o.slipMul=a==="Trail"||a==="Mud"?.5:1,o.cls=t,o.base=e,o.driftGrip=an.grip.driftSlide+.1*(o.G-5),o}var Op=Math.PI*2,ha=(i,t,e)=>Math.max(t,Math.min(e,i)),eu=(i,t,e)=>i+(t-i)*e,ua=(i,t)=>{let e=i-t;for(;e>Math.PI;)e-=Op;for(;e<-Math.PI;)e+=Op;return e},Bc=class{constructor(t,e){this.st=t,this.track=e,this.x=0,this.z=0,this.th=0,this.phi=0,this.s=0,this.bx=0,this.bz=0,this.steer=0,this.drift={on:!1,dir:0,charge:0,tier:0,hopped:!1,hopT:0},this.hopY=0,this.hopV=0,this.grounded=!0,this.boostT=0,this.boostMul=1,this.boostKind="",this.spinT=0,this.spinTotal=0,this.spinDir=1,this.shrinkT=0,this.starT=0,this.ghostT=0,this.slipT=0,this.stallT=0,this.invulT=0,this.hint=0,this.q={},this.surf="road",this.lap=-1,this.lastS=0,this.prog=0,this.draft={t:0,on:!1,sling:0,slingT:0},this.topScale=1,this.wrongT=0,this.stuckT=0,this.scrape=0,this.shake=0,this.events=[],this.yawRate=0,this.lat=0,this.onSc=!1,this.slip=0,this.fwdSpeed=0,this.airT=0,this.lastRowId=-1,this.throttle=0}place(t,e,n){this.x=t,this.z=e,this.th=this.phi=n,this.s=0;let s=this.track.query(t,e,-1,this.q);this.hint=s.idx,this.lastS=s.s,this.prog=this.lap*this.track.length+s.s}ev(t,e){this.events.push({name:t,data:e})}get speedKmh(){return Math.abs(this.s)*4}get boosting(){return this.boostT>0}get protected(){return this.starT>0||this.ghostT>0||this.invulT>0}addBoost(t,e,n){(e>=this.boostMul||this.boostT<=0||t>this.boostT)&&(this.boostT<=0||e>=this.boostMul?(this.boostMul=Math.max(this.boostT>0?this.boostMul:1,e),this.boostT=Math.max(this.boostT,t),this.boostKind=n):this.boostT=Math.max(this.boostT,t))}spin(t,e=.5,n=0){return this.starT>0||this.ghostT>0||this.invulT>0&&t>.5?!1:(this.spinT=t,this.spinTotal=t,this.spinDir=n||(Math.random()<.5?-1:1),this.s*=1-e,this.drift.on=!1,this.drift.charge=0,this.drift.tier=0,this.boostT=Math.min(this.boostT,.2),this.invulT=t+.8,this.shake=Math.max(this.shake,.6),this.ev("spin",{sec:t}),!0)}step(t,e){let n=this.st,s=this.track,r=this.drift;this.events.length=0;let a=this.surf;for(let X of["boostT","spinT","shrinkT","starT","ghostT","slipT","stallT","invulT"])this[X]>0&&(this[X]-=t,this[X]<0&&(this[X]=0));this.boostT<=0&&(this.boostMul=1),this.shake>0&&(this.shake=Math.max(0,this.shake-t*2.4));let o=s.query(this.x,this.z,this.hint,this.q);this.hint=o.idx,this.surf=o.surface,this.lat=o.lat,this.onSc=!!o.sc;let c=1,l=1,h=1,d=1;this.starT<=0&&(this.surf==="off"?(c=n.offTop,l=pt.offroad.accelMul,h=.64,d=.75):this.surf==="rough"?(c=pt.offroad.rough,l=.85,h=.85):this.surf==="sand"?(c=.82,l=.85,h=.7,d=.8):this.surf==="ice"&&(c=1,l=.9,h=.3,d=.5)),this.boostT>0&&this.surf==="off"&&(c=eu(c,1,.5));let u=n.vmax*c*this.topScale;this.shrinkT>0&&(u*=pt.item.jolt.speedMul),this.starT>0&&(u*=pt.item.nova.mul),this.draft.on&&(u*=pt.draft.topMul),this.boostT>0&&(u=Math.max(u,n.vmax*this.topScale*this.boostMul*(this.surf==="off"&&this.starT<=0?.9:1))),this.draft.sling>0&&(u*=pt.draft.slingshotMul,this.draft.sling-=t);let f=this.spinT>0||this.stallT>0?0:e.throttle||0,g=e.brake||0;this.throttle=f;let x=this.boostT>0?2.4:this.draft.on?1.1:1,m=this.spinT>0?.3:1;if(f>0&&this.s>=-.1)if(this.s<u){let X=n.a0*(1-Math.pow(Math.max(0,this.s)/u,2))*l*x*f;this.s+=Math.max(X,1.5*l)*t}else this.s=Math.max(u,this.s-14*t);else this.s>u&&(this.s=Math.max(u,this.s-14*t));if(g>0)this.s>.5?this.s=Math.max(0,this.s-pt.brake*g*t):this.s=Math.max(-pt.reverseMax,this.s-9*g*t);else if(f<=0){let X=Math.sign(this.s);this.s-=X*pt.coastDrag*t*(this.spinT>0?3:1),Math.sign(this.s)!==X&&(this.s=0)}this.s<0&&f>.1&&(this.s=Math.min(0,this.s+pt.brake*t));let p=this.spinT>0?0:ha(e.steer||0,-1,1);this.steer+=(p-this.steer)*Math.min(1,t*(this.slipT>0?3:11));let y=this.steer;this.slipT>0&&(y=y*.2+Math.sin(this.slipT*14)*.7);let w=Math.abs(this.s),_=n.latAccel*d,S=Math.min(n.yawMax,_/Math.max(w,1))*Math.min(1,w/5),T=this.s>=0?1:-1;if(e.driftPressed&&this.grounded&&this.spinT<=0&&!r.on&&w>6&&(this.hopV=6.2,this.grounded=!1,this.hopY=.001,r.hopped=!0,r.hopT=.35,this.ev("hop",{})),r.hopped&&(r.hopT-=t,(!e.drift||r.hopT<-.35&&this.grounded)&&(r.hopped=!1),e.drift&&this.grounded&&!r.on&&w>=pt.drift.minSpeed&&Math.abs(y)>.2&&this.spinT<=0&&(r.on=!0,r.dir=y>0?1:-1,r.charge=0,r.tier=0,r.hopped=!1,this.ev("driftStart",{}))),r.on)if(!e.drift||w<11||this.spinT>0)this.endDrift();else{let X=y*r.dir,Q=pt.drift.chargeNoSteerMul+(pt.drift.chargeFullSteerMul-pt.drift.chargeNoSteerMul)*ha(X,0,1);this.surf!=="off"&&(r.charge+=t*Q);let nt=pt.drift.chargeSec,yt=r.charge>=nt[2]?3:r.charge>=nt[1]?2:r.charge>=nt[0]?1:0;yt>r.tier&&(r.tier=yt,this.ev("driftTier",{tier:yt}))}let C;if(r.on){let X=y*r.dir,Q=X>=0?eu(1,pt.drift.innerYawMul,X):eu(1,pt.drift.outerYawMul,-X);C=-r.dir*pt.drift.baseYaw*Math.min(n.yawMax*1.2,1.35*_/Math.max(w,1))*Q}else C=-y*S*T;this.yawRate=C,this.th+=C*t;let v=ua(this.th,this.phi),M=r.on?pt.drift.angleDeg*Math.PI/180*(.8+.3*ha(y*r.dir,-1,1)):.5;Math.abs(v)>M&&(this.th=this.phi+Math.sign(v)*M,v=Math.sign(v)*M);let A=r.on?n.driftGrip:pt.grip.normal*h*(this.slipT>0?.4:1);if(this.phi+=ua(this.th,this.phi)*Math.min(1,A*t),this.slip=Math.abs(ua(this.th,this.phi)),!r.on&&w>8){let X=Math.abs(C)*w/Math.max(_,1);this.s-=Math.sign(this.s)*Math.max(0,X-.8)*8*t}r.on&&(this.s-=Math.sign(this.s)*.4*t*(w/n.vmax)),this.spinT>0&&(this.th+=this.spinDir*(Math.PI*2*2/this.spinTotal)*t,this.phi+=ua(this.th,this.phi)*.02),this.grounded?this.airT=0:(this.hopY+=this.hopV*t,this.hopV-=28*t,this.hopY<=0&&(this.hopY=0,this.hopV=0,this.grounded=!0,this.ev("land",{})),this.airT+=t);let R=Math.sin(this.phi),P=Math.cos(this.phi);this.x+=(R*this.s+this.bx)*t,this.z+=(P*this.s+this.bz)*t;let D=Math.exp(-6*t);this.bx*=D,this.bz*=D,this.scrape=Math.max(0,this.scrape-t*4);let L=s.constrain(this.x,this.z,this.hint);if(L){let X=L.pen+1.1;this.x=L.x+L.nx*1.1,this.z=L.z+L.nz*1.1;let Q=R*this.s,nt=P*this.s,yt=Q*L.nx+nt*L.nz;if(yt<0){let wt=Math.abs(yt)/Math.max(w,.1);this.starT<=0;{if(wt<.42)this.s-=Math.sign(this.s)*pt.bump.wallScrapeLoss*w*t*6,this.scrape=1,this.ev("scrape",{v:w});else{let K=pt.bump.wallHeadOnLoss*ha((wt-.42)/.5,.2,1);this.s*=1-K,this.shake=Math.max(this.shake,ha(wt,.3,1)),this.ev("wallHit",{v:w,ang:wt})}let ue=Q-yt*L.nx*1,Zt=nt-yt*L.nz*1,re=Math.hypot(ue+L.nx*Math.abs(yt)*.25,Zt+L.nz*Math.abs(yt)*.25);this.phi=Math.atan2(ue+L.nx*Math.abs(yt)*.25,Zt+L.nz*Math.abs(yt)*.25),this.th+=ua(this.phi,this.th)*.35,this.drift.on&&wt>.42&&this.endDrift()}}this.s>=0&&this.s<4&&(this.s=Math.max(this.s,4*(f>0?1:0)))}let B=s.query(this.x,this.z,this.hint,this.q);this.hint=B.idx,this.surf=B.surface;let q=B.s,Y=s.length;this.lastS>.75*Y&&q<.25*Y?(this.lap++,this.ev("lap",{lap:this.lap})):this.lastS<.25*Y&&q>.75*Y&&this.lap--,this.lastS=q,this.prog=this.lap*Y+q;let st=R*B.m.tx+P*B.m.tz;!B.sc&&st<-.25&&w>8?this.wrongT+=t:this.wrongT=Math.max(0,this.wrongT-t*2),w<2&&this.spinT<=0?this.stuckT+=t:this.stuckT=0,this.fwdSpeed=this.s}endDrift(){let t=this.drift;if(!t.on)return;let e=t.tier;t.on=!1,t.charge=0,t.tier=0,e>=1?(this.addBoost(pt.drift.boostSec[e-1],pt.drift.boostMul[e-1],"drift"+e),this.ev("driftBoost",{tier:e}),this.shake=Math.max(this.shake,.15*e)):this.ev("driftCancel",{})}};var ir=(i,t,e)=>Math.max(t,Math.min(e,i)),Bp=Math.PI*2,Vy=(i,t)=>{let e=i-t;for(;e>Math.PI;)e-=Bp;for(;e<-Math.PI;)e+=Bp;return e},sr=class{constructor(t,e,n){this.k=t,this.race=e,this.skill=n,this.lane=(Math.random()-.5)*4,this.laneT=0,this.itemT=1+Math.random()*2,this.mode="main",this.driftHold=!1,this.dd=0,this.useSc=Math.random()<.35+n*.45,this.scDecided=!1,this.mistake=0,this.nextMistake=6+Math.random()*14,this.tmp={},this.startDelay=Math.random()*.18,this.stuckT=0}input(t){let e=this.k,n=e.sim,s=this.race,r=s.track,a={steer:0,throttle:1,brake:0,drift:!1,driftPressed:!1},o=Math.abs(n.s),c=r.length,l=n.lastS,h=9+o*.42,d,u,f=r.sc,g=f&&l>f.s1-40&&l<f.s1+6;if(f&&((l<f.s1-60||l>f.s2+10)&&(this.scDecided=!1,this.mode!=="main"&&!n.onSc&&(this.mode="main")),g&&!this.scDecided&&(this.scDecided=!0,this.mode=this.useSc&&s.hazardOkForCpu(e)?"sc":"main")),this.mode==="sc"&&f){let v=n.q&&n.q.sc?n.q.sc.u:0;n.q.sc||(v=0);let M=ir(Math.round(v*(f.n-1))+Math.round(h/2),0,f.n-1),A=f.p[M];d=A[0],u=A[1],n.q.sc&&v>.97&&(this.mode="main"),!n.q.sc&&l>f.s1+8&&(this.mode="main")}else{let v=r.linePoint(l+h,this.lane*ir(1-Math.abs(r.lineCurv(l+h))*80,.2,1),this.tmp);d=v.x,u=v.z}this.nextMistake-=t,this.nextMistake<0&&(this.mistake=1.2,this.nextMistake=8+Math.random()*18/(.3+this.skill),this.mistakeDir=Math.random()<.5?-1:1),this.mistake>0&&(this.mistake-=t);let x=Math.atan2(d-n.x,u-n.z),m=Vy(x,n.th),p=ir(-m*2.4,-1,1);this.mistake>0&&this.skill<.95&&(p=ir(p+this.mistakeDir*.35,-1,1));let y=r.lineSpeed(l+h*.9+o*.6)*(.9+this.skill*.12)*1.04;this.mode==="sc"&&(y=Math.min(y,40)),n.surf==="ice"&&(y*=.85),o>y*1.1&&!n.drift.on&&n.boostT<=0?(a.throttle=0,a.brake=ir((o-y*1.1)/8,0,.9)):o>y*1.02&&!n.drift.on&&(a.throttle=.4);let w=pt.drift.baseYaw*Math.min(n.st.yawMax*1.2,1.35*n.st.latAccel/Math.max(o,1)),_=r.lineCurv(l+12+o*.3),S=r.lineCurv(l+30+o*.3),T=r.lineCurv(l+46+o*.3),C=v=>{let M=Math.abs(v)*o;return M>.8*w&&M<1.25*w};if(n.drift.on){let v=r.lineCurv(l+6),M=Math.abs(r.lineCurv(l+14))<.006||o<14||n.drift.tier>=3&&Math.abs(v)<.01;a.drift=!M&&n.surf!=="off"&&Math.abs(n.lat)<r.halfW+1&&n.drift.charge<6,a.throttle=1,a.brake=0,p=ir(p,-1,1),this.skill<.9&&Math.random()<.0015&&(a.drift=!1)}else C(_)&&C(S)&&Math.sign(_)===Math.sign(S)&&Math.abs(T)>.006&&o>22&&n.grounded&&n.spinT<=0&&this.skill>.55&&!s.opts.noDrift&&n.surf!=="ice"&&!n.drift.hopped&&this.mode==="main"&&(!this.driftReq||this.driftReq<0)&&(this.driftReq=.6,a.driftPressed=!0,a.drift=!0,this.driftDir=_>0?-1:1);if(n.drift.hopped&&!n.drift.on&&this.driftDir&&(a.drift=!0,p=this.driftDir*Math.max(Math.abs(p),.3)),this.driftReq!==void 0&&(this.driftReq-=t),a.steer=p,s.state==="countdown"&&(a.throttle=0,s.cdT<.18+this.startDelay&&s.cdT>-.3&&this.skill>.6&&(a.throttle=1),s.cdT>.3&&(a.throttle=0)),o<3&&s.state==="racing"&&n.spinT<=0){if(this.stuckT+=t,this.stuckT>2.2){let v=r.at(n.lastS+6,0,this.tmp);n.x=v.x,n.z=v.z,n.th=n.phi=v.heading,n.s=8,this.stuckT=0,n.bx=n.bz=0}}else this.stuckT=0;return this.itemT-=t,e.item&&this.itemT<=0&&s.state==="racing"&&this.useItem(e,a),e.backHeld=!1,a}useItem(t,e){let n=this.race,s=t.sim,r=t.item.id,a=n.track.length,o=n.nearestAhead(t,45),c=n.nearestBehind(t,28),l=Math.abs(n.track.lineCurv(s.lastS+15))<.006,h=()=>{this.itemT=.6+Math.random()*1.8};r==="pod"||r==="trio"?l&&s.boostT<=0?(n.items.press(t),n.items.release(t),h()):this.itemT=.3:r==="nova"||r==="rocket"||r==="jolt"?(n.items.press(t),h()):r==="veil"?o||Math.random()<.02?(n.items.press(t),h()):this.itemT=.5:r==="disc"?o&&Math.abs(o.sim.lat-s.lat)<4?(t.backHeld=!1,n.items.press(t),t.holding&&(t.holding.t=.05),n.items.release(t),h()):c&&Math.abs(c.sim.lat-s.lat)<4?(t.backHeld=!0,n.items.press(t),n.items.release(t),t.backHeld=!1,h()):(t.holding||n.items.press(t),t.holdFor=(t.holdFor||0)+.5,this.itemT=.5,t.holdFor>8&&(n.items.release(t),t.holdFor=0,h())):(r==="peel"||r==="spill")&&(c||o&&r==="peel"&&Math.random()<.4?(n.items.press(t),t.holding&&(t.holding.t=.05),t.backHeld=r==="peel"?!o:!0,n.items.release(t),t.backHeld=!1,h()):(this.itemT=.8,t.holdFor=(t.holdFor||0)+.8,t.holdFor>10&&(n.items.press(t),n.items.release(t),t.holdFor=0,h())))}};var Wy="attribute float size; attribute vec4 pcolor; varying vec4 vC; uniform float scale; void main(){ vC=pcolor; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=size*scale/(-mv.z); gl_Position=projectionMatrix*mv; }",Xy="varying vec4 vC; void main(){ vec2 d=gl_PointCoord-0.5; float r=length(d)*2.0; if(r>1.0) discard; float a=smoothstep(1.0,0.2,r); gl_FragColor=vec4(vC.rgb, vC.a*a); }",zc=class{constructor(t,e,n){this.n=e,this.pos=new Float32Array(e*3),this.col=new Float32Array(e*4),this.size=new Float32Array(e),this.vel=new Float32Array(e*3),this.life=new Float32Array(e),this.age=new Float32Array(e),this.s0=new Float32Array(e),this.s1=new Float32Array(e),this.c0=new Float32Array(e*4),this.c1=new Float32Array(e*4),this.grav=new Float32Array(e),this.drag=new Float32Array(e),this.head=0;let s=new me;s.setAttribute("position",new we(this.pos,3).setUsage(ea)),s.setAttribute("pcolor",new we(this.col,4).setUsage(ea)),s.setAttribute("size",new we(this.size,1).setUsage(ea)),this.mat=new Ze({vertexShader:Wy,fragmentShader:Xy,transparent:!0,depthWrite:!1,blending:n?cs:Bi,uniforms:{scale:{value:600}}}),this.pts=new rs(s,this.mat),this.pts.frustumCulled=!1,this.pts.renderOrder=5,t.add(this.pts),this.g=s;for(let r=0;r<e;r++)this.life[r]=0,this.size[r]=0}emit(t,e,n,s,r,a,o,c,l,h,d,u=0,f=0){let g=this.head;this.head=(this.head+1)%this.n;let x=g*3,m=g*4;this.pos[x]=t,this.pos[x+1]=e,this.pos[x+2]=n,this.vel[x]=s,this.vel[x+1]=r,this.vel[x+2]=a,this.life[g]=o,this.age[g]=0,this.s0[g]=c,this.s1[g]=l,this.grav[g]=u,this.drag[g]=f;for(let p=0;p<4;p++)this.c0[m+p]=h[p],this.c1[m+p]=d[p],this.col[m+p]=h[p];this.size[g]=c}update(t){for(let e=0;e<this.n;e++){if(this.life[e]<=0){this.size[e]=0;continue}this.age[e]+=t;let n=this.age[e]/this.life[e];if(n>=1){this.life[e]=0,this.size[e]=0;continue}let s=e*3,r=e*4,a=Math.max(0,1-this.drag[e]*t);this.vel[s]*=a,this.vel[s+1]=this.vel[s+1]*a-this.grav[e]*t,this.vel[s+2]*=a,this.pos[s]+=this.vel[s]*t,this.pos[s+1]+=this.vel[s+1]*t,this.pos[s+2]+=this.vel[s+2]*t,this.pos[s+1]<.05&&this.grav[e]>0&&(this.pos[s+1]=.05,this.vel[s+1]*=-.3),this.size[e]=this.s0[e]+(this.s1[e]-this.s0[e])*n;for(let o=0;o<4;o++)this.col[r+o]=this.c0[r+o]+(this.c1[r+o]-this.c0[r+o])*n}this.g.attributes.position.needsUpdate=!0,this.g.attributes.pcolor.needsUpdate=!0,this.g.attributes.size.needsUpdate=!0}},_n=(i,t=1)=>[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255,t],Hc=class{constructor(t,e=1){this.add=new zc(t,Math.round(1400*e),!0),this.nor=new zc(t,Math.round(900*e),!1),this.q=e,this.rgba=_n}setScale(t){this.add.mat.uniforms.scale.value=t*.9,this.nor.mat.uniforms.scale.value=t*.9}spark(t,e,n,s,r,a){let c=[16773824,5093631,16751150,12676095][s];for(let l=0;l<(this.q<.7?1:2);l++)this.add.emit(t,e,n,r*.15+(Math.random()-.5)*4,2+Math.random()*3,a*.15+(Math.random()-.5)*4,.35+Math.random()*.2,.55,.1,_n(c,1),_n(c,0),14,1)}flame(t,e,n,s,r,a){this.add.emit(t,e,n,s*.6+(Math.random()-.5),.2+Math.random()*.6,r*.6+(Math.random()-.5),.28+Math.random()*.12,1,.15,_n(a,.9),_n(16777215,0),0,1.5)}dust(t,e,n,s,r,a=1){this.nor.emit(t,.15,e,(Math.random()-.5)*2+n*.1,.8+Math.random()*.8,(Math.random()-.5)*2+s*.1,.7+Math.random()*.4,.8*a,2.8*a,_n(r,.55),_n(r,0),0,1.2)}burst(t,e,n,s,r=16,a=8){for(let o=0;o<r;o++){let c=Math.random()*Math.PI*2,l=Math.random()*1.2;this.add.emit(t,e,n,Math.cos(c)*a*(.4+Math.random()),2+Math.random()*a*.5,Math.sin(c)*a*(.4+Math.random()),.5+Math.random()*.4,.9,.1,_n(s,1),_n(s,0),10,1.5)}}ring(t,e,n,s){for(let r=0;r<20;r++){let a=r/20*Math.PI*2;this.add.emit(t,e,n,Math.cos(a)*9,.3,Math.sin(a)*9,.5,.8,.1,_n(s,1),_n(s,0),0,3)}}update(t){this.add.update(t),this.nor.update(t)}dispose(t){t.remove(this.add.pts),t.remove(this.nor.pts),this.add.g.dispose(),this.nor.g.dispose()}};var zp=i=>{let t=Math.sin(i*12.9898+4.1414)*43758.5453;return t-Math.floor(t)},yi=(i={})=>si(new $e({vertexColors:!0,roughness:.7,metalness:.05,...i}),16777215,2.4,.2),Gc=class{constructor(t){this.race=t;let e=this.tc=t.track;this.scene=t.scene,this.list=[],this.group=new oe,this.scene.add(this.group);let n=e.length,s=o=>(e.reverse?1-o:o)*n,r=o=>{let c=o,l=1e9;for(let h=-50;h<=50;h+=4){let d=Math.abs(e.k[(Math.round((o+h)/e.step)%e.N+e.N)%e.N])+Math.abs(h)*5e-5;d<l&&(l=d,c=o+h)}return(c%n+n)%n},a=0;for(let o of e.meta.hazards||[]){let c=a++;o.type==="sheep"?this.list.push(this._sheep(c,r(s(o.f)))):o.type==="crane"?this.list.push(this._crane(c,r(s(o.f)))):o.type==="boulder"?this.list.push(this._boulder(c,r(s(o.f)))):o.type==="icicle"?this.list.push(this._icicle(c,r(s(o.f)))):o.type==="gate"&&e.sc&&this.list.push(this._gate(c))}}_sign(t,e=16765503){let n=this.tc.at(t-28,this.tc.halfW+2.2,{}),s=new Rt;s.add(vt.cyl,{p:[n.x,1.2,n.z],s:[.1,1.2,.1],c:3817290}),s.add(vt.cone,{p:[n.x,2.7,n.z],r:[0,Math.PI/6,0],s:[.95,.9,.95],c:e});let r=s.build(yi());this.group.add(r)}_sheep(t,e){let n=this.tc;this._sign(e);let s=[],r=new oe;this.group.add(r);let a=new Rt;a.add(vt.sph,{p:[0,.75,0],s:[.8,.65,1],c:16249834}),a.add(vt.sph,{p:[.3,1,-.2],s:[.45,.4,.45],c:16776436}),a.add(vt.sph,{p:[-.3,1,.2],s:[.45,.4,.45],c:16776436}),a.add(vt.sph,{p:[0,1,.95],s:[.34,.36,.4],c:2763312});for(let[c,l]of[[-.4,.5],[.4,.5],[-.4,-.5],[.4,-.5]])a.add(vt.cyl,{p:[c,.25,l],s:[.09,.25,.09],c:2763312});let o=a.build(yi());for(let c=0;c<4;c++){let l=o.clone();l.material=o.material,r.add(l),s.push(l)}return{type:"sheep",id:t,s:e,cycle:15,off:3+t*4,root:r,sheep:s,update:c=>this._upSheep(this.list.find(l=>l.id===t),c),check:(c,l)=>this._chkSheep(this.list.find(h=>h.id===t),c,l)}}_sheepPos(t,e,n){let s=this.tc,r=(e+t.off)%t.cycle,o=Math.floor((e+t.off)/t.cycle)%2?1:-1,c;r<8?c=-1:r<10?c=0:r<15?c=(r-10)/5:c=1;let l=s.limit-.5,h=r<10?o*(l+1):o*(l+1)-o*(l*2+2)*c,d=(n-1.5)*4.2;return{lat:h,ds:d,ph:r,u:c,hidden:r<8||r>=15}}_upSheep(t,e){let n=this.tc;t.sheep.forEach((s,r)=>{let a=this._sheepPos(t,e,r);if(s.visible=!a.hidden||a.ph>=15&&!1,a.hidden){s.visible=!1;return}let o=n.at(t.s+a.ds,a.lat,{});s.position.set(o.x,.08*Math.abs(Math.sin(e*9+r*2))*(a.ph>=10?1:0),o.z);let l=Math.floor((e+t.off)/t.cycle)%2?1:-1;s.rotation.y=Math.atan2(o.tz*0+-l*o.tz*-1,0)+o.heading+-l*Math.PI/2*1})}_chkSheep(t,e,n){let s=this.tc;for(let r=0;r<4;r++){let a=this._sheepPos(t,n,r);if(a.hidden||a.ph<10)continue;let o=s.at(t.s+a.ds,a.lat,{});if(Math.hypot(o.x-e.sim.x,o.z-e.sim.z)<1.9)return{x:o.x,z:o.z,kind:"sheep",spin:.8,loss:.4}}return null}_crane(t,e){let n=this.tc,r=n.at(e,1*(n.limit+3),{}),a=new oe;a.position.set(r.x,0,r.z),a.rotation.y=r.heading,this.group.add(a);let o=new Rt;o.add(vt.sbox,{p:[0,12,0],s:[1.6,24,1.6],c:16758812}),o.add(vt.sbox,{p:[0,24.5,0],s:[1.6,1.2,1.6],c:16758812}),o.add(vt.sbox,{p:[0,.6,0],s:[4,1.2,4],c:4869978});let c=n.limit+3;o.add(vt.sbox,{p:[-c/2+2,24.6,0],s:[c+8,.9,1],c:16758812});let l=o.build(yi({metalness:.2}));a.add(l);let h=new oe;a.add(h);let d=new Rt;d.add(vt.cyl,{p:[0,0,0],s:[.05,1,.05],c:2236962});let u=d.build(yi());h.add(u);let f=new Rt;f.add(vt.sbox,{p:[0,0,0],s:[3,2.6,5.4],c:[15029052,3117224,15906106][t%3]});for(let m=-2;m<=2;m++)f.add(vt.sbox,{p:[0,0,m*1],s:[3.06,2.4,.08],c:48});let g=f.build(yi({roughness:.5}));h.add(g);let x=new Ot(new _i(1.6,2.2,28),new se({color:16726832,transparent:!0,opacity:0,side:Re,depthWrite:!1}));return x.rotation.x=-Math.PI/2,x.position.y=.12,this.group.add(x),{type:"crane",id:t,s:e,cycle:6,off:t*2.3,hang:h,cable:u,box:g,ring:x,root:a,update:m=>this._upCrane(this.list.find(p=>p.id===t),m),check:(m,p)=>this._chkCrane(this.list.find(y=>y.id===t),m,p)}}_cranePos(t,e){let n=(e+t.off)%t.cycle,s=5.8*Math.sin((e+t.off)*.85),r=6.5,a=!1;n>2.3&&n<3?r=6.5-(n-2.3)/.7*5.2:n>=3&&n<4.4?(r=1.3,a=!0):n>=4.4&&n<5&&(r=1.3+(n-4.4)/.6*5.2);let o=n>1.4&&n<4.4;return{lat:s,y:r,danger:a,warn:o,ph:n}}_upCrane(t,e){let n=this.tc,s=this._cranePos(t,e),r=n.at(t.s,s.lat,{});t.hang.position.set(0,0,0);let a=t.root,o=new O(r.x,s.y,r.z);a.worldToLocal(o),t.hang.position.copy(o),t.hang.rotation.y=0,t.cable.position.y=12.5,t.cable.scale.set(1,12.5-s.y+1e-4,1),t.cable.position.y=(24.5-1.3)/2+.6,t.cable.scale.y=24.5-s.y,t.cable.position.set(0,(24.5+0)/2*0+(24.5-s.y)/2,0),t.cable.parent.updateMatrix(),t.ring.position.set(r.x,.12,r.z),t.ring.material.opacity=s.warn?.35+.35*Math.sin(e*14):0,t.ring.rotation.z=r.heading}_chkCrane(t,e,n){let s=this._cranePos(t,n);if(!s.danger)return null;let r=this.tc.at(t.s,s.lat,{});return Math.abs(r.x-e.sim.x)<2.4&&Math.abs(r.z-e.sim.z)<3.4&&Math.hypot(r.x-e.sim.x,r.z-e.sim.z)<3.6?{x:r.x,z:r.z,kind:"crane",spin:1,loss:.5}:null}_boulder(t,e){this._sign(e,16742954);let n=new oe,s=new Rt;s.add(vt.sph,{p:[0,0,0],s:[2.2,2.2,2.2],c:10119754}),s.add(vt.sph,{p:[1.2,1,.5],s:[.9,.9,.9],c:12091488}),s.add(vt.sph,{p:[-.8,-.9,1],s:[.8,.8,.8],c:8014384}),s.add(vt.sph,{p:[-1,.8,-1.1],s:[.7,.7,.7],c:11040856});let r=s.build(yi({roughness:.95}));n.add(r),this.group.add(n);let a=new Ot(new os(2.4,20),new se({color:0,transparent:!0,opacity:.35,depthWrite:!1}));return a.rotation.x=-Math.PI/2,a.position.y=.11,this.group.add(a),{type:"boulder",id:t,s:e,cycle:10,off:t*3.1,mesh:n,b:r,sh:a,update:o=>this._upBoulder(this.list.find(c=>c.id===t),o),check:(o,c)=>this._chkBoulder(this.list.find(l=>l.id===t),o,c)}}_boulderPos(t,e){let n=(e+t.off)%t.cycle,r=Math.floor((e+t.off)/t.cycle)%2?1:-1,a=this.tc.limit-1.8,o=n<2?-1:n<5?(n-2)/3:2;return{lat:r*a-r*2*a*Math.min(Math.max(o,0),1),rolling:o>=0&&o<=1,warn:n<2,u:o,side:r,ph:n}}_upBoulder(t,e){let n=this.tc,s=this._boulderPos(t,e),r=n.at(t.s,s.lat,{});if(t.mesh.visible=s.rolling||s.ph<2&&!1,s.rolling)t.mesh.position.set(r.x,2.2+Math.abs(Math.sin(e*6))*.15,r.z),t.b.rotation.x=-s.side*e*4,t.b.rotation.z=e*2;else if(s.warn){t.mesh.visible=!0;let a=n.at(t.s,s.side*(n.limit+3.5),{});t.mesh.position.set(a.x,2.2+2*Math.max(0,1-s.ph/2)*0,a.z),t.mesh.position.y=2.2+Math.sin(e*40)*.08}t.sh.visible=s.rolling||s.warn,t.sh.position.set(t.mesh.position.x,.11,t.mesh.position.z),t.sh.material.opacity=s.warn?.2+.2*Math.sin(e*12):.35}_chkBoulder(t,e,n){let s=this._boulderPos(t,n);if(!s.rolling)return null;let r=this.tc.at(t.s,s.lat,{});return Math.hypot(r.x-e.sim.x,r.z-e.sim.z)<3?{x:r.x,z:r.z,kind:"boulder",spin:1.2,loss:.6}:null}_icicle(t,e){let n=new Rt;n.add(vt.cone,{p:[0,0,0],r:[Math.PI,0,0],s:[1,5.4,1],c:13627903}),n.add(vt.cone,{p:[.8,-.8,.3],r:[Math.PI,0,.1],s:[.5,3.2,.5],c:11067647});let s=n.build(yi({roughness:.1,metalness:.1,envMapIntensity:1.6}));s.visible=!1,this.group.add(s);let r=new Ot(new _i(.6,1.1,24),new se({color:16726832,transparent:!0,opacity:0,side:Re,depthWrite:!1}));return r.rotation.x=-Math.PI/2,r.position.y=.12,this.group.add(r),{type:"icicle",id:t,s:e,cycle:7.5,off:t*2.1,ice:s,sh:r,fx:0,update:a=>this._upIcicle(this.list.find(o=>o.id===t),a),check:(a,o)=>this._chkIcicle(this.list.find(c=>c.id===t),a,o)}}_iciclePos(t,e){let n=(e+t.off)%t.cycle,s=Math.floor((e+t.off)/t.cycle),r=(zp(s*7+t.id)-.5)*2*(this.tc.halfW-3.2),a=(zp(s*3+t.id*5)-.5)*30;return{lat:r,sOff:a,ph:n,ci:s,warn:n<1.5,falling:n>=1.5&&n<1.7,down:n>=1.7&&n<3,impact:n>=1.5&&n<1.62}}_upIcicle(t,e){let n=this.tc,s=this._iciclePos(t,e),r=n.at(t.s+s.sOff,s.lat,{});t.sh.position.set(r.x,.12,r.z),t.sh.visible=s.warn||s.falling,t.sh.material.opacity=s.warn?.25+.5*(s.ph/1.5):0;let a=s.warn?.6+1.6*(s.ph/1.5):2.2;if(t.sh.scale.setScalar(a),s.falling||s.down){t.ice.visible=!0;let o=s.falling?24*(1-(s.ph-1.5)/.2)+2.6:2.6;t.ice.position.set(r.x,o,r.z),t.ice.scale.setScalar(s.down?Math.max(.01,1-(s.ph-2.4)/.6):1)}else t.ice.visible=!1;t.lastCi=s.ci}_chkIcicle(t,e,n){let s=this._iciclePos(t,n);if(!s.impact)return null;let r=this.tc.at(t.s+s.sOff,s.lat,{});return Math.hypot(r.x-e.sim.x,r.z-e.sim.z)<2.7?{x:r.x,z:r.z,kind:"icicle",spin:.9,loss:.5}:null}_gate(t){let e=this.tc,n=e.sc,s=9,r=n.p[s],a=n.tx[s],o=n.tz[s],c=new oe;c.position.set(r[0],0,r[1]),c.rotation.y=Math.atan2(a,o),this.group.add(c);let l=new Rt;for(let f of[-1,1])l.add(vt.sbox,{p:[f*(n.half+.6),1.5,0],s:[.9,3,.9],c:2831430});l.add(vt.sbox,{p:[n.half+.6,3.2,0],s:[.5,.9,.5],c:1711396}),c.add(l.build(yi()));let h=new oe;h.position.set(-(n.half+.6),1.9,0);let d=new Rt;for(let f=0;f<6;f++)d.add(vt.sbox,{p:[(f+.5)*(n.half*2+1.2)/6,0,0],s:[(n.half*2+1.2)/6,.45,.45],c:f%2?16777215:14694956});h.add(d.build(yi())),c.add(h);let u=new Ot(new Mn(.35,10,8),new se({color:3407718,fog:!1}));return u.position.set(n.half+.6,3.5,0),c.add(u),{type:"gate",id:t,i:s,arm:h,lamp:u,cycle:6,off:1,p:r,tx:a,tz:o,update:f=>this._upGate(this.list.find(g=>g.id===t),f),check:(f,g)=>this._chkGate(this.list.find(x=>x.id===t),f,g)}}_gateClosed(t,e){return(e+t.off)%t.cycle>=3.5}_gateAmt(t,e){let n=(e+t.off)%t.cycle;return n<3.2?0:n<3.5?(n-3.2)/.3:n<5.8?1:1-(n-5.8)/.2}_upGate(t,e){let n=this._gateAmt(t,e);t.arm.rotation.z=(1-n)*1.45,t.lamp.material.color.setHex(n>.5?16726832:3407718)}_chkGate(t,e,n){if(this._gateAmt(t,n)<.6)return null;let s=e.sim.x-t.p[0],r=e.sim.z-t.p[1],a=s*t.tx+r*t.tz,o=s*t.tz-r*t.tx;return Math.abs(a)<1.4&&Math.abs(o)<this.tc.sc.half?{x:t.p[0],z:t.p[1],kind:"gate",bounce:!0,along:Math.sign(a)||1,tx:t.tx,tz:t.tz}:null}update(t){for(let e of this.list)e.update(t)}check(t,e){for(let n of this.list){let s=n.check(t,e);if(s)return s.h=n,s}return null}telegraph(t){let e=[];for(let n of this.list){if(n.type==="sheep"){let s=this._sheepPos(n,t,0);s.ph>=8&&s.ph<8.05&&e.push({h:n,snd:"item_ready",s:n.s})}if(n.type==="crane"){let s=this._cranePos(n,t);s.ph>1.4&&s.ph<1.45&&e.push({h:n,snd:"horn",s:n.s})}if(n.type==="boulder"){let s=this._boulderPos(n,t);s.ph<.05&&e.push({h:n,snd:"wall_hit",s:n.s,lp:500}),s.ph>2&&s.ph<2.05&&e.push({h:n,snd:"crash_big",s:n.s,lp:900})}if(n.type==="icicle"){let s=this._iciclePos(n,t);s.ph>=1.5&&s.ph<1.53&&e.push({h:n,snd:"disc_pop",s:n.s,rate:1.6})}}return e}dispose(){this.scene.remove(this.group),this.group.traverse(t=>{t.geometry&&t.geometry.dispose()})}};var qy=(i,t,e)=>Math.max(t,Math.min(e,i)),nu={pod:{name:"Turbo Pod",color:"#37e08a"},trio:{name:"Pod Trio",color:"#37e08a"},disc:{name:"Rebound Disc",color:"#35a7ff"},peel:{name:"Peel Trap",color:"#ffd23f"},spill:{name:"Slick Spill",color:"#9b6bff"},rocket:{name:"Hornet Rocket",color:"#ff4d4d"},jolt:{name:"Storm Jolt",color:"#fff25a"},nova:{name:"Nova Core",color:"#ffb02e"},veil:{name:"Phantom Veil",color:"#b9a7ff"}},$y={1:{pod:16,trio:5,disc:22,peel:26,spill:15,veil:12},2:{pod:15,trio:10,disc:18,peel:12,spill:8,veil:12,nova:5,rocket:12},3:{pod:12,trio:14,disc:10,peel:6,spill:4,veil:10,nova:10,rocket:14,jolt:14},4:{pod:10,trio:16,disc:5,veil:8,nova:14,rocket:16,jolt:16}};function Yy(i,t,e=Math.random,n=!1){let s=i<=2?1:i<=5?2:i<=8?3:4,r={...$y[s]};t<=4&&(delete r.jolt,i>1&&(r.rocket=r.rocket||0)),i<pt.item.rocket.minRankToGet&&delete r.rocket,i<pt.item.jolt.minRankToGet&&delete r.jolt,n&&delete r.jolt;let a=0;for(let c in r)a+=r[c];let o=e()*a;for(let c in r)if(o-=r[c],o<=0)return c;return"pod"}var Wc=(i,t={})=>i.build(si(new $e({vertexColors:!0,roughness:.4,metalness:.25,...t}),16777215,2.2,.5));function Jy(){let i=new Rt;return i.add(vt.cyl,{p:[0,.3,0],s:[.75,.12,.75],c:3516415}),i.add(vt.tor,{p:[0,.3,0],r:[Math.PI/2,0,0],s:[.78,.78,1.2],c:16777215}),i.add(vt.cyl,{p:[0,.38,0],s:[.3,.1,.3],c:16765503}),Wc(i,{emissive:670310,emissiveIntensity:.8})}function Ky(){let i=new Rt;for(let t=0;t<4;t++){let e=t*Math.PI/2;i.add(vt.cone,{p:[Math.sin(e)*.35,.3,Math.cos(e)*.35],r:[.5*Math.cos(e),0,-.5*Math.sin(e)],s:[.22,.75,.22],c:16765503})}return i.add(vt.sph,{p:[0,.2,0],s:[.35,.2,.35],c:15775744}),Wc(i)}function Zy(){let i=new Rt;return i.add(vt.cyl,{p:[0,.04,0],s:[1.8,.04,1.8],c:2101306}),i.add(vt.cyl,{p:[.4,.08,.2],s:[.8,.04,.7],c:6962128}),i.add(vt.sph,{p:[-.8,.12,-.5],s:[.28,.12,.28],c:10185727}),Wc(i,{roughness:.1,metalness:.6,envMapIntensity:1.6})}function jy(){let i=new Rt;i.add(vt.cap,{p:[0,0,0],r:[Math.PI/2,0,0],s:[.38,.9,.38],c:16119285}),i.add(vt.cone,{p:[0,0,1.05],r:[Math.PI/2,0,0],s:[.4,.8,.4],c:16731469});for(let n=0;n<3;n++){let s=n*2.094;i.add(vt.sbox,{p:[Math.sin(s)*.35,Math.cos(s)*.35,-.9],r:[0,0,-s],s:[.05,.5,.5],c:16731469})}let t=Wc(i),e=new oe;return e.add(t),e}var Vc=class{constructor(t){this.race=t,this.objs=[],this.nextId=1,this.group=new oe,t.scene.add(this.group),this.jolt=null,this.meshes={disc:Jy(),peel:Ky(),spill:Zy(),rocket:jy()},this.beepT=0}dispose(){this.race.scene.remove(this.group)}startRoll(t){t.item||t.roll||(t.roll={t:0,dur:1.5,last:-1},this.race.onEvent("roll",{k:t}))}updateRoll(t,e){if(!t.roll)return;t.roll.t+=e;let n=Math.floor(t.roll.t/.09);if(n!==t.roll.last&&(t.roll.last=n,this.race.onEvent("rollTick",{k:t,tick:n})),t.roll.t>=t.roll.dur){let s=t.place,r=this.race.karts.length,a=Yy(s,r,this.race.rnd,!!this.jolt);t.roll=null,t.item={id:a,n:a==="trio"?3:1},this.race.onEvent("itemGot",{k:t,id:a})}}press(t){t.sim.spinT>0;let e=this.race;if(t.lockT>0&&t.item&&t.sim.protected===!1){for(let s of this.objs)if(s.type==="rocket"&&s.target===t&&!s.dead&&s.tProg-s.rs<26){t.braceT=pt.item.rocket.braceWindowSec+.2,t.item.n--,t.item.n<=0&&(t.item=null),e.onEvent("braceTry",{k:t});return}}if(!t.item)return;let n=t.item.id;if(t.pressT=e.t,n==="disc"||n==="peel"){t.holding={id:n,t:0};return}this.fire(t,n,{})}release(t){if(!t.holding)return;let e=t.holding;t.holding=null,!(!t.item||t.item.id!==e.id)&&this.fire(t,e.id,{held:e.t>.22,back:!!t.backHeld})}tickHold(t,e){t.holding&&(t.holding.t+=e,t.holding.t>.22&&!t.shield&&(t.shield=t.holding.id,this.race.onEvent("shieldUp",{k:t}))),!t.holding&&t.shield&&(t.shield=null)}fire(t,e,n){let s=this.race,r=t.sim;s.net&&t.auth&&s.net.send("use",{k:t.id,id:e,back:!!n.back,held:!!n.held});let a=()=>{t.item.n--,t.item.n<=0&&(t.item=null),t.shield=null};switch(e){case"pod":r.addBoost(pt.item.pod.sec,pt.item.pod.mul,"pod"),r.ev("podBoost",{}),a(),s.onEvent("use",{k:t,id:e});break;case"trio":if(t.trioCd>0)return;r.addBoost(pt.item.podTrio.sec,pt.item.podTrio.mul,"pod"),t.trioCd=.6,a(),s.onEvent("use",{k:t,id:e});break;case"nova":r.starT=pt.item.nova.sec,r.shrinkT=0,a(),s.onEvent("use",{k:t,id:e});break;case"veil":{r.ghostT=pt.item.veil.sec,a();let o=null,c=pt.item.veil.stealRange;for(let l of s.karts){if(l===t||!l.item||l.sim.starT>0||l.shield)continue;let h=l.sim.prog-r.prog;h>0&&h<c&&Math.hypot(l.sim.x-r.x,l.sim.z-r.z)<c+5&&(c=h,o=l)}o&&(t.item=o.item,o.item=null,o.roll=null,s.onEvent("steal",{k:t,from:o})),s.onEvent("use",{k:t,id:e});break}case"jolt":this.jolt={owner:t,t:pt.item.jolt.armSec},a(),s.onEvent("use",{k:t,id:e}),s.onEvent("joltArm",{k:t});break;case"disc":this.spawnDisc(t,n.back),a(),s.onEvent("use",{k:t,id:e});break;case"peel":n.held&&!n.back?this.spawnPeel(t,!0):this.spawnPeel(t,!1),a(),s.onEvent("use",{k:t,id:e});break;case"spill":this.spawnSpill(t),a(),s.onEvent("use",{k:t,id:e});break;case"rocket":this.spawnRocket(t),a(),s.onEvent("use",{k:t,id:e});break}}_add(t){return t.id=t.id||this.race.netId+"-"+this.nextId++,this.objs.push(t),t.mesh&&this.group.add(t.mesh),t}spawnDisc(t,e,n){let s=t.sim,r=s.th+(e?Math.PI:0),a=pt.item.disc.speed,o=this.meshes.disc.clone();return o.material=this.meshes.disc.material,this._add({type:"disc",owner:t,x:s.x+Math.sin(r)*2.4,z:s.z+Math.cos(r)*2.4,vx:Math.sin(r)*a,vz:Math.cos(r)*a,bounces:pt.item.disc.bounces,life:pt.item.disc.lifeSec,arm:.15,mesh:o,id:n&&n.id})}spawnPeel(t,e){let n=t.sim,s=this.meshes.peel.clone();s.material=this.meshes.peel.material;let r={type:"peel",owner:t,mesh:s,arm:.35,life:60};return e?(r.x=n.x+Math.sin(n.th)*2.5,r.z=n.z+Math.cos(n.th)*2.5,r.tx=n.x+Math.sin(n.th)*pt.item.peel.throwDist,r.tz=n.z+Math.cos(n.th)*pt.item.peel.throwDist,r.fx=r.x,r.fz=r.z,r.flight=.6,r.ft=0):(r.x=n.x-Math.sin(n.th)*2.6,r.z=n.z-Math.cos(n.th)*2.6),this._add(r)}spawnSpill(t){let e=t.sim,n=this.meshes.spill.clone();return n.material=this.meshes.spill.material,this._add({type:"spill",owner:t,x:e.x-Math.sin(e.th)*2.8,z:e.z-Math.cos(e.th)*2.8,arm:.3,life:pt.item.spill.lifeSec,mesh:n})}spawnRocket(t){let e=this.race,n=t.sim,s=e.ranked,r=null,a=s.indexOf(t);a>0&&(r=s[a-1]);let o=this.meshes.rocket.clone(),c={type:"rocket",owner:t,rs:n.prog+3,lat:n.lat,speed:pt.item.rocket.speed,target:r,straight:!r,life:r?9:3.5,mesh:o,dir:n.th,x:n.x,z:n.z};return r&&(r.lockT=pt.item.rocket.lockSec+1.2,e.onEvent("lock",{k:r,by:t})),this._add(c)}update(t){let e=this.race,n=e.track,s=e.t;if(this.jolt&&(this.jolt.t-=t,this.jolt.t<=0)){let r=this.jolt.owner;for(let a of e.karts)if(!(a===r||a.sim.prog<=r.sim.prog)){if(a.sim.starT>0||a.sim.ghostT>0){e.onEvent("joltBlocked",{k:a});continue}a.sim.shrinkT=pt.item.jolt.shrinkSec,a.sim.s*=.82,a.shield=null,a.holding=null,a.item&&(a.item.id==="disc"||a.item.id),e.onEvent("joltHit",{k:a})}e.onEvent("joltFire",{k:r}),this.jolt=null}for(let r=this.objs.length-1;r>=0;r--){let a=this.objs[r];if(a.life-=t,a.arm>0&&(a.arm-=t),a.type==="disc"){a.x+=a.vx*t,a.z+=a.vz*t;let o=n.constrain(a.x,a.z,a.hint);if(o){a.x=o.x+o.nx*.8,a.z=o.z+o.nz*.8;let c=a.vx*o.nx+a.vz*o.nz;a.vx-=2*c*o.nx,a.vz-=2*c*o.nz,a.bounces--,e.onEvent("discBounce",{o:a}),a.bounces<0&&(a.dead=!0,e.onEvent("discPop",{o:a}))}if(!a.dead&&a.arm<=0){for(let c of e.karts)if(c.auth&&Math.hypot(c.sim.x-a.x,c.sim.z-a.z)<1.6){this.hitKart(c,a,pt.item.disc.spinOutSec,pt.item.disc.speedLoss,"disc"),a.dead=!0;break}}if(!a.dead)for(let c of this.objs)c!==a&&c.type==="disc"&&!c.dead&&Math.hypot(c.x-a.x,c.z-a.z)<1.3&&a.arm<=0&&c.arm<=0&&(a.dead=c.dead=!0,e.onEvent("discPop",{o:a}));a.mesh&&(a.mesh.position.set(a.x,.2,a.z),a.mesh.rotation.y+=t*14)}else if(a.type==="peel"){if(a.flight){a.ft+=t;let o=Math.min(1,a.ft/a.flight);a.x=a.fx+(a.tx-a.fx)*o,a.z=a.fz+(a.tz-a.fz)*o,a.y=Math.sin(o*Math.PI)*2.2,o>=1&&(a.flight=0,a.y=0,e.onEvent("peelLand",{o:a}))}else a.y=0;if(a.arm<=0&&!a.flight){for(let o of e.karts)if(o.auth&&Math.hypot(o.sim.x-a.x,o.sim.z-a.z)<1.5){this.hitKart(o,a,pt.item.peel.spinOutSec,pt.item.peel.speedLoss,"peel"),a.dead=!0;break}}a.mesh&&(a.mesh.position.set(a.x,a.y||0,a.z),a.mesh.rotation.y+=t*2)}else if(a.type==="spill"){if(a.arm<=0)for(let o of e.karts)o.auth&&o.sim.slipT<=0&&o.sim.ghostT<=0&&o.sim.starT<=0&&o.sim.grounded&&Math.hypot(o.sim.x-a.x,o.sim.z-a.z)<pt.item.spill.radius&&(o.sim.slipT=pt.item.spill.slipSec,o.sim.s*=1-pt.item.spill.speedLoss,e.onEvent("slip",{k:o,o:a}));a.mesh&&(a.mesh.position.set(a.x,.04,a.z),a.mesh.scale.setScalar(Math.min(1,a.life<2?a.life/2:1)))}else a.type==="rocket"&&this.updateRocket(a,t);(a.life<=0||a.dead)&&(a.mesh&&this.group.remove(a.mesh),this.objs.splice(r,1))}for(let r of e.karts)r.lockT>0&&(r.lockT-=t),r.braceT>0&&(r.braceT-=t),r.trioCd>0&&(r.trioCd-=t)}hitKart(t,e,n,s,r){let a=this.race;t.sim.protected&&!(t.sim.invulT>0&&t.sim.starT<=0&&t.sim.ghostT<=0&&!1)&&(t.sim.starT>0||t.sim.ghostT>0)||t.sim.spin(n,s)&&(t.lastHitBy=e.owner,t.shield=null,t.holding=null,a.onEvent("hit",{k:t,o:e,kind:r}),e.owner&&e.owner!==t&&a.onEvent("hitOther",{k:e.owner,victim:t,kind:r}))}updateRocket(t,e){let n=this.race,s=n.track,r=s.length,a=t.target,o=!1;if(t.straight){t.rs+=t.speed*e;let l=s.at(t.rs,t.lat,{});t.x=l.x,t.z=l.z,t.dir=l.heading;for(let h of n.karts)if(h!==t.owner&&h.auth&&Math.hypot(h.sim.x-t.x,h.sim.z-t.z)<2.2){Hp(this,h,t),t.dead=!0;break}}else{t.tProg=a.sim.prog,t.rs+=t.speed*e;let l=t.tProg-t.rs;t.lat+=(a.sim.lat-t.lat)*Math.min(1,e*3.5);let h=s.at(t.rs,t.lat,{});if(t.x=h.x,t.z=h.z,t.dir=h.heading,l<4){let d=a.sim.x-t.x,u=a.sim.z-t.z,f=Math.hypot(d,u);t.x+=d*Math.min(1,.5),t.z+=u*Math.min(1,.5),t.dir=Math.atan2(d,u),(f<3.2||l<-1)&&(o=!0)}if(a.braceT>0&&l<22&&l>-2){t.dead=!0,n.onEvent("braceOk",{k:a,o:t}),a.braceT=0,a.item=a.item;return}o&&(t.dead=!0,a.auth?Hp(this,a,t):n.onEvent("rocketHitRemote",{k:a,o:t})),!t.dead&&t.rs-t.owner.sim.prog>420&&(t.dead=!0)}t.mesh&&(t.mesh.position.set(t.x,.9,t.z),t.mesh.rotation.y=t.dir),this.beepT-=e;let c=n.localKart;if(c&&t.target===c&&this.beepT<=0){let l=t.tProg-t.rs;this.beepT=qy(l/220,.07,.4),n.onEvent("rocketBeep",{k:c,gap:l})}}};function Hp(i,t,e){let n=i.race;if(t.sim.starT>0||t.sim.ghostT>0){n.onEvent("rocketBlocked",{k:t});return}if(t.braceT>0){n.onEvent("braceOk",{k:t,o:e}),t.braceT=0;return}t.sim.spin(pt.item.rocket.spinOutSec,.7)&&(t.lastHitBy=e.owner,t.shield=null,t.holding=null,n.onEvent("hit",{k:t,o:e,kind:"rocket"}),n.onEvent("rocketExplode",{k:t,o:e}),e.owner!==t&&n.onEvent("hitOther",{k:e.owner,victim:t,kind:"rocket"}))}var Ee=(i,t,e)=>Math.max(t,Math.min(e,i)),Tn=(i,t,e)=>i+(t-i)*e,Gp=Math.PI*2,da=(i,t)=>{let e=i-t;for(;e>Math.PI;)e-=Gp;for(;e<-Math.PI;)e+=Gp;return e},fa=1/60;var Xc=null;function Qy(){if(Xc)return Xc;let i=document.createElement("canvas");i.width=i.height=64;let t=i.getContext("2d"),e=t.createRadialGradient(32,32,2,32,32,31);return e.addColorStop(0,"rgba(0,0,0,0.55)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Xc=new gi(i),Xc}var Vp={road:12106948,off:10259034,rough:11901546,sand:14926467,ice:15267583},qc=class{constructor(t){Object.assign(this,{scene:t.scene,renderer:t.renderer,camera:t.camera,audio:t.audio,ui:t.ui||(()=>{}),net:t.net||null}),this.opts=t,this.laps=t.laps||3,this.itemsOn=t.itemsOn!==!1,this.rnd=t.rnd||Math.random,this.netId=t.netId||"L",this.quality=t.quality||1,this.t=0,this.state="grid",this.cdT=3.999,this.stateT=0,this.acc=0,this.goTime=0,this.finishedCount=0,this.results=null,this.cam={yaw:0,pos:new O,look:new O,fov:62,shake:0,back:!1,introT:0},this.track=kc(t.trackId,{mirror:!!t.mirror,reverse:!!t.reverse}),this.view=new Oc(this.track,this.scene,this.renderer,{hq:t.hq}),this.fx=new Hc(this.scene,this.quality),this.hazards=new Gc(this),this.items=new Vc(this),this.karts=[],this.ranked=[],this.localKart=null,this.input={steer:0,throttle:0,brake:0,drift:!1,driftPressed:!1,itemDown:!1,itemUp:!1,look:!1,gas:!1},this.shadowMat=new se({map:Qy(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3}),this.shadowGeo=new Ne(1,1),this.shadowGeo.rotateX(-Math.PI/2),this.rivalEng=[null,null,null],this.sfxCd=new Map,this.statsRace={coins:0,hits:0,boosts:0,drifts:0,shortcuts:0,maxTier:0},this.announced={},this.lastPosCall=0,this.timeline=[];let e=this.track.length;this.L=e,this.hazOk=!0,t.players.forEach((n,s)=>this.addKart(n,s)),this.rank(),this.setupAudio(),this.cam.introT=0,this.updateVisuals(0),this.positionCamera(0,!0)}addKart(t,e){let n=this.track,s=Ct.characters.find(x=>x.name===t.name)||Ct.characters[0],r=la(t.build,s.cls),a=new Bc(r,n),o=Math.floor(e/2),c=e%2,l=n.length-7-o*8.5-(c?3:0),h=c?3.6:-3.6,d=n.at(l,h,{});a.lap=-1,a.place(d.x,d.z,d.heading);let u=nr(t.build,t.name);this.scene.add(u.root);let f=new Ot(this.shadowGeo,this.shadowMat);f.scale.set(3.4,1,4.6),f.position.y=.06,this.scene.add(f);let g={id:t.id??e,name:t.name,cls:s.cls,build:t.build,st:r,sim:a,vis:u,shadow:f,slot:e,human:!!t.human,local:!!t.local,remote:!!t.remote,auth:!t.remote,cpu:!t.human,ai:null,item:null,roll:null,holding:null,shield:null,lockT:0,braceT:0,coins:0,place:e+1,finished:!1,finishT:0,finishOrder:0,lastHitBy:null,shieldMesh:null,dispName:t.dispName||t.name,rev:0,rpm:.1,gear:0,gasAt:null,startRes:null,padCd:0,hazCd:0,lastBumpSnd:0,tgt:null,lastLap:-1,auto:!1,bark:{}};return g.cpu&&g.auth&&(g.ai=new sr(g,this,t.skill??.82+this.rnd()*.16)),g.local&&(this.localKart=g),this.karts.push(g),g}hazardOkForCpu(t){let e=this.hazards.list.find(s=>s.type==="gate");return e?(this.t+e.off)%e.cycle<1.8||Math.random()<.15:!0}nearestAhead(t,e){let n=null,s=e;for(let r of this.karts){if(r===t)continue;let a=r.sim.prog-t.sim.prog;a>0&&a<s&&Math.abs(r.sim.lat-t.sim.lat)<8&&(s=a,n=r)}return n}nearestBehind(t,e){let n=null,s=e;for(let r of this.karts){if(r===t)continue;let a=t.sim.prog-r.sim.prog;a>0&&a<s&&Math.abs(r.sim.lat-t.sim.lat)<8&&(s=a,n=r)}return n}setupAudio(){let t=this.audio;if(!t||!t.ready)return;this.snd={};let e=this.localKart;this.audioOn=!0,e&&(this.engine=t.createEngine(e.cls,{vol:1})),t.setReverb(this.track.theme),t.startAmbience(this.track.meta.amb);let n=s=>t.loop(s,{vol:0});this.loops={wind:n("wind_loop"),skid_road:n("skid_road"),skid_snow:n("skid_snow"),skid_sand:n("skid_sand"),spark:n("spark_loop"),off:n("offroad_loop"),draft:n("draft_loop"),nova:n("nova_loop"),crowd:n("crowd_loop")},t.setMusicState("grid",!1)}sfx(t,e,n={}){let s=this.audio;!s||!s.ready||(!e||e===this.localKart?s.play(t,{...n}):s.at(t,e.sim.x,e.sim.z,n))}sfxPos(t,e,n,s={}){let r=this.audio;r&&r.ready&&r.at(t,e,n,s)}say(t,e){let n=this.audio;n&&n.ready&&n.announce(t,e)}bark(t,e,n){t===this.localKart&&this.audio&&this.audio.ready?this.audio.bark(t.name,e,n):t&&t.auth!==void 0&&this.audio&&this.audio.ready&&Math.hypot(t.sim.x-this.localKart.sim.x,t.sim.z-this.localKart.sim.z)<30&&this.audio.bark(t.name,e,{...n,cooldown:14,vol:.5,pan:0})}start(){this.state="grid",this.stateT=0,this.cam.introT=0,this.audio&&this.audio.ready&&this.say("get_ready",{force:!0})}beginCountdown(){this.state="countdown",this.cdT=3.999,this.stateT=0,this.cdLast=4,this.audio&&this.audio.ready&&this.audio.setMusicState("grid")}update(t){let e=Math.min(t,.1);this.acc+=e;let n=0;for(;this.acc>=fa&&n<6;)this.step(fa),this.acc-=fa,n++;n>=6&&(this.acc=0),this.view.update(e,this.t,this.camera.position),this.updateVisuals(e),this.positionCamera(e),this.fx.update(e),this.updateAudio(e)}step(t){if(this.stateT+=t,this.state==="grid"&&(this.cam.introT+=t,this.cam.introT>(this.opts.introSec??2.6)&&this.beginCountdown()),this.state==="countdown"){this.cdT-=t;let e=Math.ceil(this.cdT);e!==this.cdLast&&e>=0&&e<=3&&(this.cdLast=e,e>0&&(this.say(["","one","two","three"][e],{force:!0}),this.audio&&this.audio.ready&&this.audio.play("cd_beep"),this.ui("cd",{n:e})));for(let n of this.karts){if(!n.auth)continue;let s=this.getInput(n);s.throttle>.1&&n.gasAt===null&&(n.gasAt=this.cdT),n.rev=Tn(n.rev,s.throttle>.1?1:0,.15)}this.cdT<=0&&this.go()}if((this.state==="racing"||this.state==="finished")&&(this.t+=t),this.state==="racing"||this.state==="finished")this.simKarts(t);else for(let e of this.karts)e.remote||e.sim.step(0,{throttle:0});if(this.hazards.update(this.t),this.state!=="grid"&&this.state!=="countdown"){this.items.update(t);for(let e of this.hazards.telegraph(this.t)){let n=this.track.at(e.s,0,{});this.sfxPos(e.snd,n.x,n.z,{ref:40,vol:.9,rate:e.rate||1})}}}go(){this.state="racing",this.t=0,this.goTime=performance.now(),this.say("go",{force:!0}),this.audio&&this.audio.ready&&(this.audio.play("cd_go"),this.audio.setMusicState("race",!1,this.musicOpts()),this.audio.musicDuckFor(.8,.7)),this.ui("go",{});for(let t of this.karts){if(!t.auth)continue;let e=pt.startBoost.windowSec;t.gasAt!==null&&t.gasAt>e?(t.sim.stallT=pt.startBoost.earlyStallSec,t.startRes="stall",this.sfx("start_stall",t),t===this.localKart&&this.ui("start",{res:"stall"})):t.gasAt!==null&&t.gasAt>=-.12?(t.sim.addBoost(pt.startBoost.boostSec,pt.startBoost.boostMul,"start"),t.startRes="boost",t.sim.s=Math.max(t.sim.s,2),this.sfx("start_boost",t),t===this.localKart&&(this.ui("start",{res:"boost"}),this.say("perfect_start",{delay:.6}),this.statsRace.boosts++)):t.startRes="none",t.pendingStart=t.gasAt===null}}getInput(t){if(t.ai&&!t.auto||t.auto&&t.ai)return t.ai.input(fa);if(t===this.localKart){let e=this.input;return{steer:e.steer,throttle:e.throttle,brake:e.brake,drift:e.drift,driftPressed:e.driftPressed,look:e.look}}return{steer:0,throttle:0,brake:0,drift:!1}}simKarts(t){let e=this.L,n=this.input,s=this.localKart?this.localKart.sim.prog:this.karts[0]&&this.karts[0].sim.prog;for(let r of this.karts){if(r.remote){this.stepRemote(r,t);continue}let a=r.sim,o=this.getInput(r);if(r===this.localKart&&(n.itemDown&&(this.items.press(r),n.itemDown=!1),n.itemUp&&(this.items.release(r),n.itemUp=!1),r.backHeld=n.brake>.5,n.driftPressed=!1,this.state==="racing"&&r.pendingStart&&o.throttle>.1&&this.t<.12&&r.gasAt===null&&(a.addBoost(pt.startBoost.boostSec,pt.startBoost.boostMul,"start"),r.pendingStart=!1,this.ui("start",{res:"boost"}),this.sfx("start_boost",r))),r.ai&&!r.auto&&this.state==="racing"&&this.opts.rubber!==!1){let c=a.prog-s,l=pt.rubber,h=Ee(c/l.rangeM,-1,1);a.topScale=l.cpuBaseMul*(h>0?Tn(1,l.cpuMulMin,h):Tn(1,l.cpuMulMax,-h))*(.97+.04*r.ai.skill),this.state==="racing"&&r.ai.skill>.98&&(a.topScale*=1)}else r.ai&&r.auto&&(a.topScale=.9);(!r.finished||r.auto)&&this.itemsOn&&(this.items.updateRoll(r,t),this.items.tickHold(r,t)),a.step(t,o),r.holding&&(r.holding.t=r.holding.t),this.afterStep(r,t)}this.collisions(t),this.rank(),this.updateDraft(t),this.state==="racing"&&this.checkEnd(t)}stepRemote(t,e){let n=t.sim,s=t.tgt;if(!s)return;let r=Math.min(.25,(performance.now()-s.at)/1e3),a=s.x+Math.sin(s.phi)*s.s*r,o=s.z+Math.cos(s.phi)*s.s*r,c=Math.min(1,e*12),l=a-n.x,h=o-n.z;l*l+h*h>2500?(n.x=a,n.z=o):(n.x+=l*c,n.z+=h*c),n.th+=da(s.th,n.th)*c,n.phi+=da(s.phi,n.phi)*c,n.s=Tn(n.s,s.s,c),n.steer=Tn(n.steer,s.steer,c),n.hopY=s.hopY,n.drift.on=s.dr>0,n.drift.dir=s.dd,n.drift.tier=s.dr>0?s.dr-1:0,n.boostT=s.boost?.2:0,n.boostMul=1.2,n.spinT=s.spin,n.starT=s.star,n.ghostT=s.ghost,n.shrinkT=s.shrink,n.lap=s.lap,n.prog=s.prog,n.lastS=s.ls,n.lat=s.lat,n.surf=s.surf||"road",t.finished=s.fin,t.item=s.item?{id:s.item,n:1}:null,t.shield=s.shield,n.slipT=s.slip||0}afterStep(t,e){let n=t.sim,s=this.track,r=t===this.localKart,a=n.events,o=this.audio;for(let c of a)this.simEvent(t,c);if(t.padCd-=e,t.hazCd-=e,this.itemsOn&&!t.roll&&!t.item)for(let c of this.view.boxes){if(!c.active)continue;let l=c.x-n.x,h=c.z-n.z;if(l*l+h*h<4.4){c.active=!1,c.respawn=6,this.items.startRoll(t),this.net&&this.net.send("box",{i:this.view.boxes.indexOf(c)}),this.fx.burst(c.x,1.5,c.z,16765503,14,7),this.sfx("itembox",t);break}}else if(this.itemsOn)for(let c of this.view.boxes){if(!c.active)continue;let l=c.x-n.x,h=c.z-n.z;l*l+h*h<4.4&&(c.active=!1,c.respawn=6,this.net&&this.net.send("box",{i:this.view.boxes.indexOf(c)}),this.fx.burst(c.x,1.5,c.z,16765503,10,6),this.sfx("itembox",t,{vol:.5}))}for(let c of this.view.coins){if(!c.active)continue;let l=c.x-n.x,h=c.z-n.z;l*l+h*h<4.5&&(c.active=!1,c.respawn=40,t.coins++,r&&(this.statsRace.coins++,this.sfx("coin",t,{rate:1+Math.min(.5,this.statsRace.coins%8*.04)}),this.ui("coin",{})))}if(t.padCd<=0&&n.grounded)for(let c of this.view.pads){let l=n.x-c.x,h=n.z-c.z,d=Math.sin(c.heading),u=Math.cos(c.heading),f=l*d+h*u,g=l*u-h*d;if(Math.abs(f)<c.hl&&Math.abs(g)<c.hw){n.addBoost(pt.boostPad.sec,pt.boostPad.mul,"pad"),t.padCd=.8,this.sfx("boost_pad",t),this.fx.ring(c.x,.4,c.z,3727871),r&&this.shakeCam(.25),this.view.scPad;break}}if(t.hazCd<=0&&!n.protected){let c=this.hazards.check(t,this.t);c&&(t.hazCd=1,c.bounce?(n.s=-Math.abs(n.s)*.25*c.along*-1,n.s=Math.min(n.s,3),n.x-=c.tx*c.along*2.2,n.z-=c.tz*c.along*2.2,n.shake=.7,this.sfx("wall_hit",t),this.sfx("horn",t,{vol:.6})):n.spin(c.spin,c.loss)&&this.onEvent("hit",{k:t,o:{x:c.x,z:c.z},kind:c.kind}))}r&&(n.onSc&&!t.inSc?(t.inSc=!0,this.statsRace.shortcuts++,this.sfx("shortcut_found",t),this.say("shortcut",{delay:.2}),this.ui("shortcut",{})):n.onSc||(t.inSc=!1),n.wrongT>2&&this.state==="racing"?(this.say("wrong_way"),this.ui("wrong",{})):this.ui("wrongOff",{})),!t.finished&&n.lap>=this.laps&&this.state!=="grid"&&(t.finished=!0,t.finishT=this.t,t.finishOrder=++this.finishedCount,t.ai&&(t.auto=!0),this.onEvent("finish",{k:t})),n.lap!==t.lastLap&&(t.lastLap=n.lap,n.lap>=1&&!t.finished&&this.onEvent("lap",{k:t,lap:n.lap}))}simEvent(t,e){let n=t.sim,s=t===this.localKart,r=this.audio;switch(e.name){case"hop":this.sfx("hop",t);break;case"land":this.sfx("land",t,{vol:.5});break;case"driftStart":this.sfx("drift_tick1",t,{vol:.35,rate:.7});break;case"driftTier":this.sfx("drift_tick"+e.data.tier,t),s&&(this.ui("tier",{tier:e.data.tier}),e.data.tier===3&&(this.statsRace.maxTier=3));break;case"driftBoost":this.sfx("boost_t"+e.data.tier,t),s&&(this.statsRace.boosts++,this.statsRace.drifts++,this.shakeCam(.2+.12*e.data.tier),this.bark(t,e.data.tier>=2?"boost2":"boost1",{cooldown:9}),e.data.tier===3&&this.say("great_drift",{}),this.ui("boost",{tier:e.data.tier}));break;case"spin":s&&(this.shakeCam(.6),r&&r.ready&&r.musicMuffle(1.4,700)),this.sfx("spin_whirl",t);break;case"wallHit":this.sfx("wall_hit",t,{vol:Ee(e.data.ang*1.1,.4,1)}),e.data.v>25&&this.sfx("crash_big",t,{vol:.5}),s&&this.shakeCam(Ee(e.data.ang,.3,.9)),this.fx.burst(n.x,.8,n.z,16769952,6,5);break;case"scrape":this.sfx("wall_scrape",t,{min:.18,vol:Ee(e.data.v/40,.2,.8)}),this.fx.spark(n.x,.6,n.z,0,Math.sin(n.phi)*n.s,Math.cos(n.phi)*n.s);break;case"podBoost":this.sfx("pod_use",t);break}}onEvent(t,e){let n=this.audio,s=this.localKart,r=e.k,a=r===s;switch(t){case"roll":a&&this.ui("roll",{});break;case"rollTick":a&&this.sfx("roulette_tick",r,{rate:.9+e.tick%5*.06,vol:.5});break;case"itemGot":a&&(this.sfx("item_ready",r),this.ui("item",{id:e.id}));break;case"use":{let o=e.id,c={pod:null,trio:"pod_use",nova:"nova_start",veil:"veil_on",jolt:"jolt_arm",disc:"disc_launch",peel:"peel_drop",spill:"spill_drop",rocket:"rocket_launch"};c[o]&&this.sfx(c[o],r),o==="nova"&&(this.bark(r,"item",{cooldown:3}),a&&n&&n.ready&&n.setMusicState("race",!1,this.musicOpts({star:!0}))),o==="rocket"||o==="disc"?this.bark(r,"attack",{cooldown:8}):(o==="pod"||o==="trio"||o==="veil")&&this.bark(r,"item",{cooldown:12}),a&&this.ui("use",{id:o}),this.net&&r.auth&&this.net.send("use",{k:r.id,id:o,tid:o==="rocket"?this.lastRocketTarget:void 0});break}case"steal":this.sfx("steal",e.k),e.from===s&&(this.ui("stolen",{}),this.bark(s,"overtaken",{cooldown:5}));break;case"shieldUp":this.sfx("shield_up",r,{vol:.6});break;case"discBounce":this.sfxPos("disc_bounce",e.o.x,e.o.z,{ref:25});break;case"discPop":this.sfxPos("disc_pop",e.o.x,e.o.z,{ref:25}),this.fx.burst(e.o.x,.6,e.o.z,7324671,10,6);break;case"peelLand":this.sfxPos("peel_throw",e.o.x,e.o.z,{ref:25,vol:.5});break;case"slip":this.sfx("spill_slip",r),a&&this.shakeCam(.2);break;case"hit":{let o=e.kind,c={disc:"disc_hit",peel:"peel_hit",rocket:"rocket_explode",sheep:"bump_heavy_a",crane:"crash_big",boulder:"crash_big",icicle:"wall_hit",gate:"wall_hit"}[o]||"bump_med_a";this.sfx(c,r),this.fx.burst(r.sim.x,1,r.sim.z,o==="rocket"?16742954:16769162,22,9),o==="rocket"&&this.fx.ring(r.sim.x,.6,r.sim.z,16742954),a?(this.statsRace.hits++,this.bark(r,"hit",{cooldown:3}),this.ui("hit",{kind:o})):this.bark(r,"spin",{cooldown:12}),this.net&&r.auth&&this.net.send("hit",{k:r.id,by:e.o&&e.o.owner?e.o.owner.id:-1,kind:o});break}case"hitOther":e.k===s&&(this.bark(s,"taunt",{cooldown:6}),this.ui("hitOther",{}));break;case"rocketExplode":this.fx.burst(e.k.sim.x,1.2,e.k.sim.z,16753226,30,12);break;case"lock":e.k===s&&(this.say("rocket_incoming"),this.ui("lock",{}),this.sfx("rocket_lock",s));break;case"rocketBeep":this.sfx("rocket_lock",s,{vol:.55,rate:1.3,min:.05});break;case"rocketBlocked":this.sfx("brace_ok",e.k,{vol:.5});break;case"braceOk":this.sfx("brace_ok",e.k),this.fx.ring(e.k.sim.x,1,e.k.sim.z,7332863),e.k===s&&(this.ui("brace",{}),this.bark(s,"item",{cooldown:4}));break;case"joltArm":s&&s.sim.prog>e.k.sim.prog&&this.say("storm_incoming"),this.ui("joltArm",{});break;case"joltFire":this.sfx("jolt_zap",s);break;case"joltHit":this.sfx("jolt_shrink",e.k),e.k===s&&(this.shakeCam(.5),this.ui("hit",{kind:"jolt"}),this.bark(s,"hit",{cooldown:3}),n&&n.ready&&n.musicMuffle(1.2,900));break;case"joltBlocked":this.sfx("brace_ok",e.k,{vol:.5});break;case"lap":{if(!e.k.auth)break;if(a){let o=e.lap;o===this.laps-1?(this.say("final_lap",{force:!0}),this.sfx("finallap",r),n&&n.ready&&n.setMusicState("race",!1,this.musicOpts({finalLap:!0})),this.bark(r,"final",{cooldown:2}),this.ui("finalLap",{})):(this.say("lap_"+(o+1)),this.sfx("lap_chime",r),this.ui("lapMsg",{lap:o+1})),this.timeline.push({lap:o,t:this.t}),this.lapSplit=this.t,this.lastPosCall=this.t+2.6,setTimeout(()=>{this.state==="racing"&&r.place<=12&&r.place>=1&&this.say("pos_"+r.place,{})},2600)}break}case"finish":{if(!e.k.auth)break;this.ui("finishKart",{k:e.k}),a&&(this.say("race_complete",{force:!0}),this.sfx(e.k.place<=3?"fanfare_win":e.k.place<=8?"fanfare_mid":"fanfare_lose",r),this.bark(r,e.k.place<=3?"win":"lose",{cooldown:1}),n&&n.ready&&n.setMusicState("results"),setTimeout(()=>this.say(e.k.place===1?"you_win":e.k.place<=6?"pos_"+e.k.place:"better_luck"),1800)),this.net&&this.net.send("fin",{k:e.k.id,t:e.k.finishT});break}}}musicOpts(t={}){let e=this.localKart;return{pos:e?e.place:6,n:this.karts.length,finalLap:e&&e.sim.lap>=this.laps-1,...t}}shakeCam(t){this.cam.shake=Math.max(this.cam.shake,t)}collisions(t){let e=pt.bump.kartRadius*2,n=this.karts;for(let s=0;s<n.length;s++)for(let r=s+1;r<n.length;r++){let a=n[s],o=n[r];if(!a.auth&&!o.auth)continue;let c=a.sim,l=o.sim;if(c.ghostT>0||l.ghostT>0)continue;let h=l.x-c.x,d=l.z-c.z,u=h*h+d*d;if(u>e*e||u<1e-6)continue;let f=Math.sqrt(u),g=h/f,x=d/f,m={x:Math.sin(c.phi)*c.s+c.bx,z:Math.cos(c.phi)*c.s+c.bz},p={x:Math.sin(l.phi)*l.s+l.bx,z:Math.cos(l.phi)*l.s+l.bz},y=(p.x-m.x)*g+(p.z-m.z)*x,w=e-f,_=c.st.mass*(c.shrinkT>0?.6:1),S=l.st.mass*(l.shrinkT>0?.6:1);if(a.auth&&(c.x-=g*w*(S/(_+S)),c.z-=x*w*(S/(_+S))),o.auth&&(l.x+=g*w*(_/(_+S)),l.z+=x*w*(_/(_+S))),y<0){let T=-(1+pt.bump.restitution)*y/(1/_+1/S);a.auth&&(c.bx-=T/_*g,c.bz-=T/_*x),o.auth&&(l.bx+=T/S*g,l.bz+=T/S*x);let C=-y,v=Tn(pt.bump.heavyLoss,pt.bump.lightLoss,S/(_+S)),M=Tn(pt.bump.heavyLoss,pt.bump.lightLoss,_/(_+S));if(a.auth&&C>2&&(c.s*=1-v*Ee(C/12,.2,1)),o.auth&&C>2&&(l.s*=1-M*Ee(C/12,.2,1)),c.starT>0&&l.starT<=0&&o.auth&&(l.spin(1.2,.5),l.shrinkT=0,this.onEvent("hit",{k:o,o:{owner:a,x:l.x,z:l.z},kind:"star"}),this.onEvent("hitOther",{k:a,victim:o,kind:"star"})),l.starT>0&&c.starT<=0&&a.auth&&(c.spin(1.2,.5),this.onEvent("hit",{k:a,o:{owner:o,x:c.x,z:c.z},kind:"star"}),this.onEvent("hitOther",{k:o,victim:a,kind:"star"})),C>pt.bump.spinImpactSpeed&&c.starT<=0&&l.starT<=0){let R=_<S*.95?a:S<_*.95?o:null;R&&R.auth&&R.sim.spin(pt.bump.spinSec,.2)}let A=this.t;if(A-a.lastBumpSnd>.25&&A-o.lastBumpSnd>.25){a.lastBumpSnd=o.lastBumpSnd=A;let R=_+S>3.6,P=C>12?R?"bump_heavy_":"bump_med_":C>5?"bump_med_":"bump_light_",D=a===this.localKart||o===this.localKart?this.localKart:a;this.sfx(P+(Math.random()<.5?"a":"b"),D,{vol:Ee(C/10,.3,1)}),D===this.localKart&&(this.shakeCam(Ee(C/22,.1,.5)),this.bark(D,"overtaken",{cooldown:15})),this.fx.burst((c.x+l.x)/2,.8,(c.z+l.z)/2,16773296,6,4)}}}}updateDraft(t){let e=pt.draft;for(let n of this.karts){if(!n.auth)continue;let s=n.sim,r=!1;for(let a of this.karts){if(a===n)continue;let o=a.sim.x-s.x,c=a.sim.z-s.z,l=o*Math.sin(s.phi)+c*Math.cos(s.phi);if(l<e.minDist||l>e.maxDist)continue;if(Math.abs(o*Math.cos(s.phi)-c*Math.sin(s.phi))<e.lateral&&a.sim.s>14&&s.s>14){r=!0;break}}r?s.draft.t+=t:(s.draft.t>e.slingshotAfterSec&&s.s>14&&(s.draft.sling=e.slingshotSec,n===this.localKart&&this.sfx("slingshot",n)),s.draft.t=Math.max(0,s.draft.t-t*2)),s.draft.on=s.draft.t>e.chargeSec}}rank(){let t=this.karts.slice();t.sort((e,n)=>e.finished&&n.finished?e.finishOrder-n.finishOrder:e.finished?-1:n.finished?1:n.sim.prog-e.sim.prog),t.forEach((e,n)=>{let s=e.place;e.place=n+1,e===this.localKart&&s!==e.place&&this.state==="racing"&&(e.place<s?(this.sfx("pos_up",e,{vol:.5}),e.place===1?(this.say("lead"),this.bark(e,"overtake",{cooldown:5})):this.bark(e,"overtake",{cooldown:12})):e.place>s&&s>0&&this.sfx("pos_down",e,{vol:.4}),this.audio&&this.audio.ready&&!e.finished&&this.audio.setMusicState("race",!1,this.musicOpts()))}),this.ranked=t}checkEnd(t){let e=this.karts.filter(s=>s.human&&!s.cpu);(e.length?e.every(s=>s.finished):this.karts.every(s=>s.finished))&&!this.endT&&(this.endT=this.t),!this.endT&&this.karts.filter(s=>s.finished).length>=1&&e.length&&this.t-Math.min(...this.karts.filter(s=>s.finished).map(s=>s.finishT))>50&&(this.endT=this.t),this.endT&&this.t-this.endT>(e.length?3.2:1)&&this.finishRace()}finishRace(){if(this.state==="finished")return;this.state="finished";let t=this.ranked.map((e,n)=>({id:e.id,name:e.name,disp:e.dispName,place:n+1,time:e.finished?e.finishT:null,human:e.human,local:e.local,coins:e.coins,prog:e.sim.prog}));this.results=t,this.ui("results",{results:t})}updateVisuals(t){let e=this.t,n=this.camera.position;for(let s of this.karts){let r=s.sim,a=s.vis,o=Math.hypot(r.x-n.x,r.z-n.z)<160;if(a.root.visible=o,s.shadow.visible=o,!o)continue;let c=r.th;a.root.position.set(r.x,r.hopY,r.z),a.root.rotation.y=c;let l=Ee(-r.steer*.05-(r.drift.on?-r.drift.dir*.09:0),-.2,.2);a.body.rotation.z=Tn(a.body.rotation.z,l,Math.min(1,t*10));let h=Ee((r.boostT>0?.05:0)+(s.throttleLast||0)*.02,0,.1);a.body.rotation.x=Tn(a.body.rotation.x,-h+Ee(r.hopY*.12,0,.1),Math.min(1,t*8));let d=r.shrinkT>0?.55:1;s.scaleCur=Tn(s.scaleCur??1,d,Math.min(1,t*8)),a.root.scale.setScalar(s.scaleCur);for(let f of a.wheels)f.front&&(f.pivot.rotation.y=-r.steer*.5+(r.drift.on?-r.drift.dir*.2:0)),f.spin.rotation.x+=r.s/f.rad*t;a.driver&&Ip(a.driver,r.steer,r.spinT>0||r.shake>.3?1:0,s.place===1?1:0,t,e),r.starT>0?(a.paintMat.emissive.setHSL(e*1.6%1,1,.45),a.paintMat.emissiveIntensity=.9):a.paintMat.emissiveIntensity>0&&a.paintMat.userData.star&&(a.paintMat.emissiveIntensity=0),a.paintMat.userData.star=r.starT>0,r.starT<=0&&!a.paintMat.userData.pearl&&a.paintMat.emissive.setHex(0),a.root.traverse(f=>{f.material&&f.material.transparent!==r.ghostT>0&&f.material.userData.keep}),s.shadow.position.set(r.x,.06,r.z),s.shadow.rotation.y=c;let u=s.scaleCur*(1-Ee(r.hopY*.2,0,.4));if(s.shadow.scale.set(3.4*u,1,4.6*u),s.shield){if(!s.shieldMesh){let g=s.shield==="disc"?this.items.meshes.disc:this.items.meshes.peel;s.shieldMesh=g.clone(),s.shieldMesh.material=g.material,this.scene.add(s.shieldMesh),s.shieldKind=s.shield}let f=e*5;s.shieldMesh.position.set(r.x-Math.sin(r.th)*2.4+Math.cos(f)*.3,.5,r.z-Math.cos(r.th)*2.4+Math.sin(f)*.3),s.shieldMesh.rotation.y=f}else s.shieldMesh&&(this.scene.remove(s.shieldMesh),s.shieldMesh=null);this.kartFx(s,t)}}kartFx(t,e){let n=t.sim,s=this.fx,r=this.camera.position;if(Math.hypot(n.x-r.x,n.z-r.z)>70)return;let a=Math.sin(n.th),o=Math.cos(n.th),c=o,l=-a,h=t.vis.shape.zr,d=t.vis.shape.wx,u=Math.sin(n.phi)*n.s,f=Math.cos(n.phi)*n.s;if(n.drift.on&&n.grounded){let g=n.drift.tier;for(let x of[-1,1]){let m=n.x+a*(h-.2)-c*x*d*-1,p=n.z+o*(h-.2)-l*x*d*-1;Math.random()<.9&&s.spark(m,.15,p,g,u,f)}Math.random()<.4&&s.dust(n.x-a*1.2,n.z-o*1.2,u,f,Vp[n.surf]||12106948,.8)}if(n.boostT>0){let g=n.boostKind==="drift3"?12676095:n.boostKind==="drift2"?16751150:n.boostKind==="pad"?3727871:n.boostKind==="start"?16777215:n.boostKind==="pod"?3661962:5093631;for(let x of[-.45,.45])s.flame(n.x+a*(t.vis.shape.ex[1]-.2)+c*x,.5,n.z+o*(t.vis.shape.ex[1]-.2)+l*x,-u*.3,-f*.3,g)}n.starT>0&&Math.random()<.5&&s.add.emit(n.x+(Math.random()-.5)*2,.8+Math.random(),n.z+(Math.random()-.5)*2,0,1.5,0,.5,.8,.1,_n(16769354,1),_n(16739029,0),0,1),n.spinT>0&&Math.random()<.5&&s.dust(n.x,n.z,0,0,16773328,.9),(n.surf==="off"||n.surf==="sand"||n.surf==="rough")&&n.s>8&&Math.random()<.6?s.dust(n.x-a*1.1,n.z-o*1.1,u,f,Vp[n.surf],1):n.surf==="ice"&&n.s>10&&Math.random()<.3&&s.dust(n.x-a*1.1,n.z-o*1.1,u,f,15398655,.7),this.track.theme==="frost"&&n.surf==="road"&&n.s>15&&Math.random()<.15&&s.dust(n.x-a*1.1,n.z-o*1.1,u,f,16777215,.6)}positionCamera(t,e){let n=this.localKart||this.karts[0];if(!n)return;let s=n.sim,r=this.cam,a=this.camera,c=a.aspect<1;if(this.state==="grid"&&!e){let A=Ee(r.introT/(this.opts.introSec??2.6),0,1),R=A*A*(3-2*A),P=this.track.at(this.L-20,0,{}),D=Tn(2.6,0,R),L=Tn(22,c?9.5:7.4,R),B=Tn(11,c?4:3.2,R),q=s.th+D;r.pos.set(s.x-Math.sin(q)*L,B,s.z-Math.cos(q)*L),r.look.set(s.x+Math.sin(s.th)*4,1.2,s.z+Math.cos(s.th)*4),r.yaw=s.th,a.position.copy(r.pos),a.lookAt(r.look),a.fov=60,a.updateProjectionMatrix();return}let l=this.input.look,h=da(s.th*.45+s.phi*.55,0),d=s.th+da(s.phi,s.th)*.55;e?r.yaw=d:r.yaw+=da(d,r.yaw)*(1-Math.exp(-t*(s.drift.on?4:6.5)));let u=r.yaw+(l?Math.PI:0),f=Ee(Math.abs(s.s)/(s.st.vmax*1.2),0,1),g=(c?8.6:6.4)+f*.9+(s.boostT>0?.6:0),x=(c?4.1:3)+f*.3,m=s.x-Math.sin(u)*g,p=s.z-Math.cos(u)*g,y=e?1:1-Math.exp(-t*12);r.pos.x+=(m-r.pos.x)*y,r.pos.y+=(x+s.hopY*.5-r.pos.y)*y,r.pos.z+=(p-r.pos.z)*y;let w=s.x+Math.sin(u)*5.5,_=s.z+Math.cos(u)*5.5;r.look.x+=(w-r.look.x)*y,r.look.y=1.2+s.hopY*.3,r.look.z+=(_-r.look.z)*y,r.shake=Math.max(r.shake-t*2.2,s.shake*.5);let S=r.shake*.35,T=(Math.random()-.5)*S,C=(Math.random()-.5)*S;a.position.set(r.pos.x+T,r.pos.y+C,r.pos.z),a.lookAt(r.look);let v=(c?68:60)+f*7+(s.boostT>0?8:0)+(s.draft.on?2:0);r.fov+=(v-r.fov)*(e?1:1-Math.exp(-t*5)),Math.abs(a.fov-r.fov)>.05&&(a.fov=r.fov,a.updateProjectionMatrix());let M=this.renderer.domElement.height;this.fx.setScale(M/(2*Math.tan(a.fov*Math.PI/360)))}updateAudio(t){let e=this.audio;if(!e||!e.ready)return;let n=this.localKart;if(!n)return;let s=n.sim;e.setListener(this.camera.position.x,this.camera.position.z,this.cam.yaw);let r=Math.abs(s.s)/(s.st.vmax*1.08),a=this.state==="countdown"?n.rev:s.spinT>0?.1:this.input.throttle||(this.input.gas?1:0),o=[0,.2,.4,.6,.8,1.2],c=0;for(;c<4&&r>o[c+1];)c++;let l=Ee((r-o[c])/(o[c+1]-o[c]),0,1),h=this.state==="countdown"?.12+.55*n.rev:.2+c*.1+l*.34+(s.boostT>0?.05:0);r<.04&&(h=.1+.08*a),s.stallT>0&&(h=.09),n.rpm+=(h-n.rpm)*(1-Math.exp(-t*(h>n.rpm?9:4.5))),n.throttleLast=a,this.engine&&this.engine.update(n.rpm,a,s.boostT>0?1:0,1);let d=this.loops||{},u=(m,p,y)=>{m&&(m.setVol(p,.07),y&&m.setRate(y,.1))};u(d.wind,Ee(r*r*.55,0,.55),.8+r*.6);let f=Ee((s.slip-.12)*4,0,1)*(s.s>8?1:0),g=(s.drift.on?.45:0)+f*.35,x=s.surf==="ice"?"skid_snow":s.surf==="sand"||s.surf==="off"?"skid_sand":"skid_road";for(let m of["skid_road","skid_snow","skid_sand"])u(d[m],m===x&&s.grounded?Ee(g,0,.6):0,.9+r*.25);u(d.spark,s.drift.on&&s.drift.tier>0?.25+.12*s.drift.tier:0,.9+.1*s.drift.tier),u(d.off,(s.surf==="off"||s.surf==="rough"||s.surf==="sand")&&s.s>4?Ee(r*.7,0,.6):0),u(d.draft,s.draft.on?.45:0),u(d.nova,s.starT>0?.4:0),u(d.crowd,this.crowdVol()),this.rivalT=(this.rivalT||0)-t,this.rivalT<=0&&this.state!=="grid"&&(this.rivalT=.6,this.karts.filter(p=>p!==n).map(p=>({k:p,d:Math.hypot(p.sim.x-s.x,p.sim.z-s.z)})).sort((p,y)=>p.d-y.d).slice(0,3).forEach((p,y)=>{let w=this.rivalEng[y];if(!w||w.kart!==p.k){w&&w.eng&&w.eng.stop();let _=e.createEngine(p.k.cls,{spatial:!0,vol:.6});this.rivalEng[y]=_?{kart:p.k,eng:_}:null}}));for(let m of this.rivalEng){if(!m)continue;let p=m.kart,y=p.sim,w=Math.hypot(y.x-this.camera.position.x,y.z-this.camera.position.z),_=Math.abs(y.s)/(y.st.vmax*1.08),S=0;for(;S<4&&_>o[S+1];)S++;let T=Ee((_-o[S])/(o[S+1]-o[S]),0,1),C=this.state==="countdown"?.12:.2+S*.1+T*.34,v=Ee(1/(1+w/12),0,1)*.9,M=-Math.cos(this.cam.yaw),A=Math.sin(this.cam.yaw),R=w>.5?((y.x-this.camera.position.x)*M+(y.z-this.camera.position.z)*A)/w:0;m.eng.setPan(R*.85),m.eng.update(C,.8,y.boostT>0?1:0,v)}}crowdVol(){let t=this.localKart;if(!t)return 0;let e=this.track.at(0,0,{}),n=Math.hypot(t.sim.x-e.x,t.sim.z-e.z);return Ee(1-n/140,0,1)*.5}snapshot(t){let e=t.sim;return{x:e.x,z:e.z,th:e.th,phi:e.phi,s:e.s,steer:e.steer,hopY:e.hopY,dr:e.drift.on?e.drift.tier+1:0,dd:e.drift.dir,boost:e.boostT>0,spin:e.spinT,star:e.starT,ghost:e.ghostT,shrink:e.shrinkT,lap:e.lap,prog:e.prog,ls:e.lastS,lat:e.lat,surf:e.surf,fin:t.finished,item:t.item?t.item.id:null,shield:t.shield,slip:e.slipT,ft:t.finishT}}applySnapshot(t,e){let n=this.karts.find(s=>s.id===t);!n||!n.remote||(n.tgt={...e,at:performance.now()},e.fin&&!n.finished&&(n.finished=!0,n.finishT=e.ft,n.finishOrder=++this.finishedCount))}dispose(){for(let t of this.karts)this.scene.remove(t.vis.root),this.scene.remove(t.shadow),t.shieldMesh&&this.scene.remove(t.shieldMesh);this.view.dispose(),this.hazards.dispose(),this.items.dispose(),this.fx.dispose(this.scene),this.engine&&this.engine.stop();for(let t of this.rivalEng)t&&t.eng.stop();this.audio&&this.audio.ready&&(this.audio.stopAllLoops(),this.audio.stopAmbience())}};var $c=(i,t,e)=>Math.max(t,Math.min(e,i)),pa={"Pip Thistledown":"pip","Fennel Vix":"fennel","Juniper Wren":"juniper","Pearl Quayside":"pearl","Bramble Quill":"bramble","Clover Dash":"clover","Captain Dusk Marlowe":"dusk","Sage Willowmere":"sage","Marigold Hoofsworth":"marigold","Hobb Mossback":"hobb","Barnaby Bruin":"barnaby","Gus Gantry":"gus"},tb={three:5,two:5,one:5,go:6,final_lap:4,race_complete:6,you_win:6,better_luck:6,wrong_way:3,lead:2,great_drift:1,shortcut:1,perfect_start:3,rocket_incoming:4,storm_incoming:4,record:4},Yc=class{constructor(t={}){this.base=t.base||"audio/",this.hqBase=t.hqBase||null,this.hq=!1,this.ctx=null,this.buffers=new Map,this.pending=new Map,this.vol={master:1,sfx:1,music:.8,voice:1,engine:1},this.ready=!1,this.lastPlay=new Map,this.voices=0,this.listener={x:0,z:0,h:0},this.musicState=null,this.annBusyUntil=0,this.barkAt=new Map,this.loopsActive=[],this.stats={decoded:0,bytes:0,failed:[]},this.hqPacks={},this.loadingCount=0}get time(){return this.ctx?this.ctx.currentTime:0}async unlock(){if(this.ctx||this._build(),this.ctx.state!=="running")try{await this.ctx.resume()}catch{}if(!this._unlocked){this._unlocked=!0;let t=this.ctx.createBuffer(1,1,22050),e=this.ctx.createBufferSource();e.buffer=t,e.connect(this.ctx.destination),e.start(0)}return this.ctx.state}_build(){let t=window.AudioContext||window.webkitAudioContext,e=this.ctx=new t({latencyHint:"interactive"}),n=(s=1)=>{let r=e.createGain();return r.gain.value=s,r};this.bus={sfx:n(1),engine:n(.9),music:n(.8),voice:n(1),amb:n(.7),ui:n(.9)},this.duck=n(1),this.musicFilter=e.createBiquadFilter(),this.musicFilter.type="lowpass",this.musicFilter.frequency.value=2e4,this.musicFilter.Q.value=.7,this.mix=n(.46),this.glue=e.createDynamicsCompressor(),this.glue.threshold.value=-16,this.glue.knee.value=14,this.glue.ratio.value=2.5,this.glue.attack.value=.012,this.glue.release.value=.22,this.limiter=e.createDynamicsCompressor(),this.limiter.threshold.value=-2.5,this.limiter.knee.value=0,this.limiter.ratio.value=20,this.limiter.attack.value=.002,this.limiter.release.value=.09,this.masterGain=n(this.vol.master),this.analyser=e.createAnalyser(),this.analyser.fftSize=2048,this.bus.music.connect(this.musicFilter),this.musicFilter.connect(this.duck),this.duck.connect(this.mix);for(let s of["sfx","engine","voice","amb","ui"])this.bus[s].connect(this.mix);this.mix.connect(this.glue),this.glue.connect(this.limiter),this.limiter.connect(this.masterGain),this.masterGain.connect(e.destination),this.masterGain.connect(this.analyser),this.reverb=e.createConvolver(),this.revSend=n(0),this.revReturn=n(.5),this.bus.sfx.connect(this.revSend),this.bus.voice.connect(this.revSend),this.revSend.connect(this.reverb),this.reverb.connect(this.revReturn),this.revReturn.connect(this.mix),this.setReverb("meadow"),this.dest=null,this.ready=!0}setReverb(t){let e={meadow:[.7,3500,.12],harbor:[1.4,4500,.2],mesa:[2.4,2600,.28],frost:[1.9,6500,.22],menu:[1.1,5e3,.14]}[t]||[1,4e3,.15],n=this.ctx,s=Math.floor(n.sampleRate*e[0]),r=n.createBuffer(2,s,n.sampleRate);for(let a=0;a<2;a++){let o=r.getChannelData(a),c=0,l=Math.exp(-2*Math.PI*e[1]/n.sampleRate);for(let h=0;h<s;h++){let d=h/s,u=(Math.random()*2-1)*Math.pow(1-d,3.2);c=c*l+u*(1-l),o[h]=c*3.2*(h<400?h/400:1)}}this.reverb.buffer=r,this.revSend.gain.value=e[2]}captureStream(){return this.dest||(this.dest=this.ctx.createMediaStreamDestination(),this.masterGain.connect(this.dest)),this.dest.stream}setVolumes(t){Object.assign(this.vol,t),this.ctx&&(this.masterGain.gain.setTargetAtTime(this.vol.master,this.time,.05),this.bus.sfx.gain.setTargetAtTime(this.vol.sfx,this.time,.05),this.bus.ui.gain.setTargetAtTime(.9*this.vol.sfx,this.time,.05),this.bus.amb.gain.setTargetAtTime(.7*this.vol.sfx,this.time,.05),this.bus.engine.gain.setTargetAtTime(.9*(this.vol.engine??1),this.time,.05),this.bus.music.gain.setTargetAtTime(this.vol.music,this.time,.05),this.bus.voice.gain.setTargetAtTime(this.vol.voice,this.time,.05))}async _fetchBuf(t){let e;try{e=await fetch(t,{cache:"force-cache"})}catch{return null}if(!e.ok)return null;let n=await e.arrayBuffer();return this.stats.bytes+=n.byteLength,n}async _hqFetch(t){try{if("caches"in window){let e=await caches.open("sdgp-hq-v1"),n=await e.match(t);if(!n){if(n=await fetch(t,{mode:"cors"}),!n.ok)return null;await e.put(t,n.clone())}let s=await n.arrayBuffer();return this.stats.bytes+=s.byteLength,s}}catch{}return this._fetchBuf(t)}async load(t,e){let n=this.hq&&e?"H:"+e:t;if(this.buffers.has(n))return this.buffers.get(n);if(this.pending.has(n))return this.pending.get(n);let s=(async()=>{this.loadingCount++;let r=null;try{let a=null;this.hq&&e&&this.hqBase&&(a=await this._hqFetch(this.hqBase(e))),a||(a=await this._fetchBuf(this.base+t)),a&&(r=await new Promise((o,c)=>{let l=this.ctx.decodeAudioData(a,o,c);l&&l.catch&&l.catch(c)}),this.stats.decoded++)}catch(a){this.stats.failed.push(t+": "+(a&&a.message))}return this.loadingCount--,r&&this.buffers.set(n,r),this.pending.delete(n),r})();return this.pending.set(n,s),s}async loadManifest(){let t=await fetch(this.base+"sfx/manifest.json");this.sfxMan=await t.json();let e=await fetch(this.base+"engine/manifest.json");this.engMan=await e.json();let n=await fetch(this.base+"voice/manifest.json");this.voiceMan=await n.json()}sfxPath(t){let e=this.sfxMan&&this.sfxMan[t];return e?["sfx/"+e.file,"sfx/"+e.file.replace(".wav",".flac")]:null}async preloadSfx(t){let e=t.map(n=>{let s=this.sfxPath(n);return s?this.load(s[0],s[1]):null});await Promise.all(e)}async preloadVoices(t,e){let n=[];for(let s of t)for(let r of e)n.push(this.load(`voice/${s}/${r}.wav`,`voice/${s}/${r}.flac`));await Promise.all(n)}async preloadAnnouncer(t){await Promise.all(t.map(e=>this.load(`voice/announcer/${e}.wav`,`voice/announcer/${e}.flac`)))}async preloadEngines(t){let e=[];for(let n of t)for(let s=0;s<6;s++)e.push(this.load(`engine/${n}_${s}.wav`,`engine/${n}_${s}.flac`));await Promise.all(e)}_panner(t){let e=this.ctx.createStereoPanner();return e.pan.value=$c(t,-1,1),e}play(t,e={}){if(!this.ready)return null;let n=this.sfxPath(t);if(!n)return null;let s=this.hq?"H:"+n[1]:n[0],r=this.buffers.get(s)||this.buffers.get(n[0]);if(!r)return this.load(n[0],n[1]),null;let a=this.time,o=e.min??.035,c=this.lastPlay.get(t)||-9;return a-c<o||this.voices>52?null:(this.lastPlay.set(t,a),this._src(r,e,this.bus[e.bus||"sfx"],this.sfxMan[t]&&this.sfxMan[t].loop))}_src(t,e,n,s=!1){let r=this.ctx,a=r.createBufferSource();a.buffer=t;let o=(e.rate||1)*(e.rand?1+(Math.random()-.5)*e.rand:1);a.playbackRate.value=o,(s||e.loop)&&(a.loop=!0);let c=r.createGain();c.gain.value=e.vol??1;let l=a;if(l.connect(c),l=c,e.pan!==void 0&&e.pan!==0){let h=this._panner(e.pan);l.connect(h),l=h}if(e.lp){let h=r.createBiquadFilter();h.type="lowpass",h.frequency.value=e.lp,l.connect(h),l=h}return l.connect(n),this.voices++,a.onended=()=>{this.voices--;try{c.disconnect()}catch{}},a.start(r.currentTime+(e.delay||0),e.offset||0),{src:a,gain:c,stop:(h=.05)=>{try{c.gain.setTargetAtTime(0,r.currentTime,h/3),a.stop(r.currentTime+h+.05)}catch{}},setVol:(h,d=.05)=>c.gain.setTargetAtTime(h,r.currentTime,d),setRate:(h,d=.05)=>a.playbackRate.setTargetAtTime(h,r.currentTime,d)}}at(t,e,n,s={}){let r=this.listener,a=e-r.x,o=n-r.z,c=Math.hypot(a,o),l=-Math.cos(r.h),h=Math.sin(r.h),d=c>.5?(a*l+o*h)/c:0,u=(s.vol??1)/(1+c/(s.ref||14));return u<.02?null:this.play(t,{...s,vol:u,pan:d*.85,lp:c>40?Math.max(1500,12e3-c*60):void 0})}loop(t,e={}){if(!this.ready)return null;let n=this.sfxPath(t),s=n&&(this.buffers.get(this.hq?"H:"+n[1]:n[0])||this.buffers.get(n[0]));if(!s)return n&&this.load(n[0],n[1]),null;let r=this._src(s,{vol:e.vol??0,rate:e.rate||1,loop:!0,pan:e.pan},this.bus[e.bus||"sfx"],!0);return r&&(r.src.onended=null,this.loopsActive.push(r)),r}stopAllLoops(){for(let t of this.loopsActive)t.stop(.1);this.loopsActive=[]}createEngine(t,e={}){if(!this.ready)return null;let n=t.toLowerCase(),s=this.ctx,r=[],a=[];for(let x=0;x<6;x++){let m=this.buffers.get(`engine/${n}_${x}.wav`)||this.buffers.get(`H:engine/${n}_${x}.flac`);if(!m)return null;a.push(this.engMan[`${n}_${x}`].fund),r.push(m)}let o=s.createGain();o.gain.value=e.vol??1;let c=s.createBiquadFilter();c.type="lowpass",c.frequency.value=6e3,c.Q.value=.6,c.connect(o);let l=o,h=null;e.spatial&&(h=this._panner(0),o.connect(h),l=h),l.connect(this.bus.engine);let d=r.map((x,m)=>{let p=s.createBufferSource();p.buffer=x,p.loop=!0,p.loopStart=0,p.loopEnd=x.duration;let y=s.createGain();return y.gain.value=0,p.connect(y),y.connect(c),p.start(s.currentTime,Math.random()*x.duration*.9),{s:p,g:y}}),u=a[0]*.9,f=a[5]*1.05,g={out:o,lp:c,srcs:d,fund:a,pan:h,cls:n,rpm:.2,gear:0,dead:!1,mutedUntil:0,shiftT:0};return g.update=(x,m,p,y=1)=>{let w=s.currentTime,_=u*Math.pow(f/u,$c(x,0,1)),S=0,T=[];for(let v=0;v<6;v++){let M=Math.abs(Math.log2(_/a[v])),A=Math.max(0,1-M/1.05);T.push(A),S+=A}S<.01&&(S=1);let C=.5+.5*m;for(let v=0;v<6;v++){let M=T[v]/S,A=Math.sqrt(M)*.55*C*(1+.25*p);d[v].g.gain.setTargetAtTime(A*y,w,.04),d[v].s.playbackRate.setTargetAtTime($c(_/a[v],.55,2),w,.03)}c.frequency.setTargetAtTime(1800+7500*(.25+.75*m)*(.5+.5*x)+p*3e3,w,.06)},g.setPan=x=>{h&&h.pan.setTargetAtTime($c(x,-1,1),s.currentTime,.05)},g.setVol=x=>o.gain.setTargetAtTime(x,s.currentTime,.05),g.stop=()=>{g.dead||(g.dead=!0,o.gain.setTargetAtTime(0,s.currentTime,.04),setTimeout(()=>{d.forEach(x=>{try{x.s.stop()}catch{}});try{o.disconnect()}catch{}},300))},g}async startAmbience(t){if(!this.ready)return;this.stopAmbience();let e=await this.load(`amb/${t}.wav`,`amb/${t}.flac`);if(!e)return;let n=this._src(e,{vol:0,loop:!0},this.bus.amb,!0);n.src.onended=null,n.setVol(.9,1),this.amb=n}stopAmbience(){this.amb&&(this.amb.stop(.8),this.amb=null)}async loadMusic(t){let e=["drums","bass","chords","lead","counter","fx"],n=await(await fetch(this.base+`music/${t}/meta.json`)).json(),s=await Promise.all(e.map(r=>this.load(`music/${t}/${r}.m4a`,`music/${t}/${r}.flac`)));return s.some(r=>!r)?(this.stats.failed.push("music "+t),!1):(this.musicMeta={...n,piece:t},this.musicBufs=s,!0)}startMusic(t,e="menu"){if(!this.ready||!this.musicBufs)return;this.stopMusic(.3);let n=this.ctx,s=n.currentTime+.06,r=["drums","bass","chords","lead","counter","fx"],a={},o=n.createGain();o.gain.value=1,o.connect(this.bus.music);let c=Math.min(...this.musicBufs.map(l=>l.duration));this.musicBufs.forEach((l,h)=>{let d=n.createBufferSource();d.buffer=l,d.loop=!0,d.loopStart=0,d.loopEnd=c;let u=n.createGain();u.gain.value=0,d.connect(u),u.connect(o),d.start(s),a[r[h]]={s:d,g:u}}),this.music={piece:t,stems:a,mg:o,t0:s,rate:1,dur:c,state:null},this.setMusicState(e,!0)}stopMusic(t=1){let e=this.music;e&&(this.music=null,e.mg.gain.setTargetAtTime(0,this.time,t/3),setTimeout(()=>{for(let n in e.stems)try{e.stems[n].s.stop()}catch{}try{e.mg.disconnect()}catch{}},t*1e3+200))}setMusicState(t,e=!1,n={}){let s=this.music;if(!s)return;s.state=t;let r=this.time,a=e?.001:.5,o={drums:0,bass:0,chords:0,lead:0,counter:0,fx:0},c=n.pos||6,l=n.n||12;if(t==="menu")Object.assign(o,{drums:.5,bass:.9,chords:1,lead:.75,counter:0,fx:.4});else if(t==="grid")Object.assign(o,{drums:0,bass:0,chords:.9,lead:0,counter:0,fx:.9});else if(t==="race"){let d=c<=2,u=c>l*.6;Object.assign(o,{drums:1,bass:1,chords:.9,lead:d?1:.8,counter:u||n.finalLap?.95:c<=4?0:.45,fx:n.finalLap||n.star?1:.55}),n.finalLap&&(o.counter=1,o.chords=1)}else t==="results"&&Object.assign(o,{drums:0,bass:.7,chords:1,lead:1,counter:0,fx:.3});for(let d in o)s.stems[d].g.gain.setTargetAtTime(o[d]*(d==="drums"?.95:1),r,a);let h=t==="race"&&n.finalLap?1.06:1;if(Math.abs(h-s.rate)>.001){s.rate=h;for(let d in s.stems)s.stems[d].s.playbackRate.setTargetAtTime(h,r,.8)}}musicMuffle(t=1.2,e=900){if(!this.ready)return;let n=this.musicFilter.frequency,s=this.time;n.cancelScheduledValues(s),n.setTargetAtTime(e,s,.03),n.setTargetAtTime(2e4,s+t,.25)}musicDuckFor(t,e=.45){if(!this.ready)return;let n=this.duck.gain,s=this.time;n.cancelScheduledValues(s),n.setTargetAtTime(e,s,.04),n.setTargetAtTime(1,s+t,.3)}announce(t,e={}){if(!this.ready)return!1;let n=this.buffers.get(`voice/announcer/${t}.wav`)||this.buffers.get(`H:voice/announcer/${t}.flac`);if(!n)return this.load(`voice/announcer/${t}.wav`,`voice/announcer/${t}.flac`),!1;let s=this.time,r=tb[t]??(t.startsWith("pos_"),1);if(s<this.annBusyUntil&&r<(this._annPr||0)&&!e.force)return!1;this.curAnn&&r>=(this._annPr||0)&&s<this.annBusyUntil&&this.curAnn.stop(.05);let a=this._src(n,{vol:1.15,delay:e.delay||0},this.bus.voice);return this.curAnn=a,this._annPr=r,this.annBusyUntil=s+n.duration+(e.delay||0),this.musicDuckFor(n.duration+.1+(e.delay||0),.5),!0}bark(t,e,n={}){if(!this.ready||!t)return!1;let s=pa[t]||t,r=n.cooldown??6,a=this.time,o=this.barkAt.get(s+e)||-99;if(a-o<r||this.barkBusy&&a<this.barkBusy)return!1;let c=this.buffers.get(`voice/${s}/${e}.wav`)||this.buffers.get(`H:voice/${s}/${e}.flac`);return c?(this.barkAt.set(s+e,a),this.barkBusy=a+c.duration*.8,this._src(c,{vol:n.vol??.9,pan:n.pan,delay:n.delay||0},this.bus.voice),!0):(this.load(`voice/${s}/${e}.wav`,`voice/${s}/${e}.flac`),!1)}setListener(t,e,n){this.listener.x=t,this.listener.z=e,this.listener.h=n}level(){if(!this.analyser)return 0;let t=new Float32Array(this.analyser.fftSize);this.analyser.getFloatTimeDomainData(t);let e=0;for(let n of t)e+=n*n;return Math.sqrt(e/t.length)}};var ma=(i,t,e)=>Math.max(t,Math.min(e,i)),Jc=class{constructor(t,e){this.s=e,this.root=t,this.state={steer:0,throttle:0,brake:0,drift:!1,driftPressed:!1,itemDown:!1,itemUp:!1,look:!1,gas:!1},this.keys=new Set,this.touch={steer:0,gas:!1,brake:!1,drift:!1,look:!1,item:!1},this.pad={steer:0,gas:!1,brake:!1,drift:!1,look:!1,item:!1,start:!1},this.tilt=0,this.prev={drift:!1,item:!1},this.active=!1,this.slider=null,this.padPrev={},this.buildTouch(),this.bindKeys(),this.bindTilt()}buildTouch(){let t=this.root;t.innerHTML=`
      <div class="tc-slider" id="tcSlider"><div class="tc-track"></div><div class="tc-thumb" id="tcThumb"></div><div class="tc-hint">STEER</div></div>
      <button class="tc-btn tc-drift" id="tcDrift"><span>DRIFT</span></button>
      <button class="tc-btn tc-item" id="tcItem"><span>ITEM</span></button>
      <button class="tc-btn tc-gas" id="tcGas"><span>GAS</span></button>
      <button class="tc-btn tc-brake" id="tcBrake"><span>BRAKE</span></button>
      <button class="tc-btn tc-look" id="tcLook"><span>BACK</span></button>`;let e=t.querySelector("#tcSlider"),n=t.querySelector("#tcThumb"),s=null,r=c=>{let l=e.getBoundingClientRect(),h=ma((c.clientX-l.left)/l.width,0,1),d=(h-.5)*2,u=.04;this.touch.steer=Math.abs(d)<u?0:ma((d-Math.sign(d)*u)/(1-u)*(this.s.steerSens||1.15),-1,1),n.style.left=h*100+"%"};e.addEventListener("pointerdown",c=>{s=c.pointerId,e.setPointerCapture(s),r(c),e.classList.add("on"),c.preventDefault()}),e.addEventListener("pointermove",c=>{c.pointerId===s&&(r(c),c.preventDefault())});let a=c=>{c.pointerId===s&&(s=null,this.touch.steer=0,n.style.left="50%",e.classList.remove("on"))};e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a),e.addEventListener("lostpointercapture",a);let o=(c,l)=>{let h=t.querySelector(c),d=f=>{this.touch[l]=!0,h.classList.add("on"),f.preventDefault();try{h.setPointerCapture(f.pointerId)}catch{}},u=f=>{this.touch[l]=!1,h.classList.remove("on"),f.preventDefault()};h.addEventListener("pointerdown",d),h.addEventListener("pointerup",u),h.addEventListener("pointercancel",u),h.addEventListener("lostpointercapture",u),h.addEventListener("contextmenu",f=>f.preventDefault())};o("#tcDrift","drift"),o("#tcItem","item"),o("#tcGas","gas"),o("#tcBrake","brake"),o("#tcLook","look"),this.elItem=t.querySelector("#tcItem")}bindKeys(){let t={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowUp:"gas",KeyW:"gas",ArrowDown:"brake",KeyS:"brake",Space:"drift",ShiftLeft:"drift",ShiftRight:"drift",KeyE:"item",KeyQ:"item",KeyC:"look",KeyB:"look"};addEventListener("keydown",e=>{let n=t[e.code];n&&(this.keys.add(n),this.active&&e.preventDefault()),(e.code==="Escape"||e.code==="KeyP")&&this.onPause&&this.onPause()}),addEventListener("keyup",e=>{let n=t[e.code];n&&this.keys.delete(n)}),addEventListener("blur",()=>this.keys.clear())}bindTilt(){this.tiltOn=!1,this._to=t=>{if(t.gamma===null)return;let n=(screen.orientation&&screen.orientation.type||"").startsWith("landscape")?screen.orientation.angle===270?-t.beta:t.beta:t.gamma;this.tilt=ma(n/28,-1,1)}}async enableTilt(t){if(t)try{return typeof DeviceOrientationEvent<"u"&&DeviceOrientationEvent.requestPermission&&await DeviceOrientationEvent.requestPermission()!=="granted"?!1:(addEventListener("deviceorientation",this._to),this.tiltOn=!0,!0)}catch{return!1}return removeEventListener("deviceorientation",this._to),this.tiltOn=!1,this.tilt=0,!0}pollPad(){let t=navigator.getGamepads?navigator.getGamepads():[],e=null;for(let o of t)if(o&&o.connected){e=o;break}this.padConnected=!!e;let n=this.pad;if(!e){n.steer=0,n.gas=n.brake=n.drift=n.look=n.item=!1;return}let s=e.axes[0]||0;n.steer=Math.abs(s)<.12?0:ma((s-Math.sign(s)*.12)/.88,-1,1);let r=o=>e.buttons[o]&&(e.buttons[o].pressed||e.buttons[o].value>.5);n.gas=r(0)||r(7)||e.buttons[7]&&e.buttons[7].value>.2,n.brake=r(1)&&!r(5)?!0:r(6),n.drift=r(5)||r(1)&&!1||r(4)&&!1||r(2),n.item=r(3)||r(4)||r(2)&&!1,n.look=r(10)||r(11),e.axes[1]>.7&&e.axes[3]>.7&&(n.look=!0);let a=r(9);a&&!this.padPrev.start&&this.onPause&&this.onPause(),this.padPrev.start=a,n.start=a,r(14)&&(n.steer=-1),r(15)&&(n.steer=1)}poll(t){this.pollPad();let e=this.keys,n=this.touch,s=this.pad,r=this.state,a=n.steer;e.has("left")&&(a=-1),e.has("right")&&(a=1),Math.abs(s.steer)>Math.abs(a)&&(a=s.steer),this.tiltOn&&Math.abs(this.tilt)>Math.abs(a)&&(a=this.tilt),r.steer=ma(a,-1,1);let o=n.gas||e.has("gas")||s.gas;r.gas=o,r.throttle=o||t&&this.autoOn?1:0,r.brake=n.brake||e.has("brake")||s.brake?1:0,r.brake&&(r.throttle=0);let c=n.drift||e.has("drift")||s.drift;c&&!this.prev.drift&&(r.driftPressed=!0),r.drift=c,this.prev.drift=c;let l=n.item||e.has("item")||s.item;return l&&!this.prev.item&&(r.itemDown=!0),!l&&this.prev.item&&(r.itemUp=!0),this.prev.item=l,r.look=n.look||e.has("look")||s.look,r}reset(){this.state.itemDown=this.state.itemUp=this.state.driftPressed=!1,this.prev.drift=this.prev.item=!1}};var Kc=class{constructor(t){this.renderer=t,this.scene=new Gn,this.cam=new Oe(34,1,.1,100),this.t=0,this.kart=null,this.spin=!0,this.rot=.6,this.zoom=1,this.focus="kart",this.scene.background=new Nt(857648);let e=new kr(857648,18,48);this.scene.fog=e;let n=new Wi(t),s=new Gn;s.background=new Nt(2109536);let r=(f,g,x,m,p,y,w)=>{let _=new Ot(new Ne(m,p),new se({color:new Nt(y).multiplyScalar(w),side:Re}));_.position.set(f,g,x),_.lookAt(0,0,0),s.add(_)};r(8,6,6,8,3,16777215,6),r(-9,4,-3,6,6,7320831,3),r(0,10,-8,12,2,16767130,4),r(0,3,10,14,2,16743080,2),this.scene.environment=n.fromScene(s,.03).texture,n.dispose(),this.scene.add(new Fi(11192575,1712192,.9));let a=new Vn(16773341,2.4);a.position.set(5,8,6),this.scene.add(a);let o=new Vn(7317759,2.2);o.position.set(-6,4,-5),this.scene.add(o);let c=new Ot(new os(30,48),new $e({color:1582150,roughness:.35,metalness:.6,envMapIntensity:.8}));c.rotation.x=-Math.PI/2,this.scene.add(c);let l=new Ot(new _i(3.4,3.55,64),new se({color:5093631,transparent:!0,opacity:.8}));l.rotation.x=-Math.PI/2,l.position.y=.02,this.scene.add(l);let h=new Ot(new _i(4.3,4.34,64),new se({color:16765503,transparent:!0,opacity:.5}));h.rotation.x=-Math.PI/2,h.position.y=.02,this.scene.add(h),this.ring=l;let d=new Float32Array(300*3);for(let f=0;f<300;f++){let g=Math.random()*6.28,x=6+Math.random()*20;d[f*3]=Math.cos(g)*x,d[f*3+1]=Math.random()*10,d[f*3+2]=Math.sin(g)*x}let u=new me;u.setAttribute("position",new we(d,3)),this.stars=new rs(u,new Xs({color:10473727,size:.12,transparent:!0,opacity:.7})),this.scene.add(this.stars),this.portraitRT=new sn(256,256,{colorSpace:Ce}),this.portraits=new Map}setKart(t,e){this.kart&&this.scene.remove(this.kart.root),this.kart=nr(t,e),this.scene.add(this.kart.root),this.kart.root.rotation.y=this.rot}render(t,e,n,s=0){if(this.t+=t,this.kart){this.spin&&(this.rot+=t*.5),this.kart.root.rotation.y=this.rot;for(let c of this.kart.wheels)c.spin.rotation.x+=t*2;this.kart.driver&&(this.kart.driver.root.rotation.y=Math.sin(this.t*1.5)*.12),this.kart.body.position.y+=Math.sin(this.t*2)*.012-(this.kart.body.userData.by||0),this.kart.body.userData.by=Math.sin(this.t*2)*.012}this.stars.rotation.y+=t*.02;let r=e/n;this.cam.aspect=r;let a=(r<1?15.5:10.5)*this.zoom,o=.5;this.cam.position.set(Math.sin(o)*a*.35,a*.26,Math.cos(o)*a*.95),this.cam.lookAt(r<1?0:-0,r<1?.2:.6,0),r>=1?this.cam.setViewOffset(e,n,-e*.16*(s||0),0,e,n):this.cam.clearViewOffset(),this.cam.updateProjectionMatrix(),this.renderer.render(this.scene,this.cam)}portrait(t,e=256){let n=t+e;if(this.portraits.has(n))return this.portraits.get(n);let s=jh(t),r=new Gn;r.background=new Nt(2375802),r.environment=this.scene.environment,r.add(new Fi(13623551,3820160,1.2));let a=new Vn(16773341,2.6);a.position.set(2,3,4),r.add(a);let o=new Vn(8368383,2.2);o.position.set(-3,2,-2),r.add(o),s.root.position.set(0,-1.1,0),s.root.rotation.y=Math.PI+.35,r.add(s.root);let c=new Oe(30,1,.1,20);c.position.set(-.7,.45,-3.1),s.root.rotation.y=0,c.position.set(1,.5,3.3),c.lookAt(0,.1,0),s.root.rotation.y=-.2,e!==this.portraitRT.width&&this.portraitRT.setSize(e,e);let l=this.renderer,h=l.getRenderTarget();l.setRenderTarget(this.portraitRT),l.render(r,c);let d=new Uint8Array(e*e*4);l.readRenderTargetPixels(this.portraitRT,0,0,e,e,d),l.setRenderTarget(h);let u=document.createElement("canvas");u.width=u.height=e;let f=u.getContext("2d"),g=f.createImageData(e,e);for(let m=0;m<e;m++)g.data.set(d.subarray((e-1-m)*e*4,(e-m)*e*4),m*e*4);f.putImageData(g,0,0);let x=u.toDataURL("image/png");return this.portraits.set(n,x),x}};var $n=i=>`<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">${i}</svg>`,kn={pod:$n('<defs><linearGradient id="gp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7bffb0"/><stop offset="1" stop-color="#14a05a"/></linearGradient></defs><path d="M24 4c8 6 11 14 11 22 0 6-3 12-11 18-8-6-11-12-11-18 0-8 3-16 11-22z" fill="url(#gp)" stroke="#0b5e33" stroke-width="2"/><circle cx="24" cy="20" r="5" fill="#eafff3"/><path d="M17 36c2 4 4 6 7 8 3-2 5-4 7-8-4 2-10 2-14 0z" fill="#ffd23f"/>'),trio:$n('<g fill="#3fe08a" stroke="#0b5e33" stroke-width="2"><path d="M10 10c5 3 7 8 7 13 0 4-2 8-7 12-5-4-7-8-7-12 0-5 2-10 7-13z"/><path d="M24 6c6 4 8 10 8 16 0 5-3 10-8 14-5-4-8-9-8-14 0-6 2-12 8-16z"/><path d="M38 10c5 3 7 8 7 13 0 4-2 8-7 12-5-4-7-8-7-12 0-5 2-10 7-13z"/></g><g fill="#ffd23f"><circle cx="10" cy="39" r="3"/><circle cx="24" cy="41" r="3.4"/><circle cx="38" cy="39" r="3"/></g>'),disc:$n('<circle cx="24" cy="24" r="19" fill="#35a7ff" stroke="#0b3f7a" stroke-width="2.5"/><circle cx="24" cy="24" r="13" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="8 5"/><circle cx="24" cy="24" r="5.5" fill="#ffd23f" stroke="#7a5a00" stroke-width="2"/>'),peel:$n('<path d="M8 30C10 14 24 6 40 10c-6 2-12 8-12 18 0 4 2 8 4 10-8 2-18 0-24-8z" fill="#ffd23f" stroke="#8a6200" stroke-width="2.5" stroke-linejoin="round"/><path d="M36 8l5-3" stroke="#6b4a1e" stroke-width="4" stroke-linecap="round"/><path d="M14 30c4 4 10 6 16 5" fill="none" stroke="#fff3b0" stroke-width="2.5" stroke-linecap="round"/>'),spill:$n('<path d="M24 5c4 7 14 13 14 23a14 14 0 0 1-28 0C10 18 20 12 24 5z" fill="#7d4be0" stroke="#2d1470" stroke-width="2.5"/><ellipse cx="18" cy="26" rx="3.4" ry="5.5" fill="#caa8ff" opacity=".8" transform="rotate(20 18 26)"/><circle cx="31" cy="33" r="2.6" fill="#caa8ff" opacity=".7"/>'),rocket:$n('<path d="M24 3c7 5 9 12 9 19v10H15V22c0-7 2-14 9-19z" fill="#f4f4f4" stroke="#444" stroke-width="2"/><path d="M24 3c4 3 6 7 7 11H17c1-4 3-8 7-11z" fill="#ff4d4d"/><circle cx="24" cy="21" r="4" fill="#4db8ff" stroke="#234" stroke-width="1.6"/><path d="M15 26l-7 9 7-2zM33 26l7 9-7-2z" fill="#ff4d4d" stroke="#7a1a1a" stroke-width="1.6"/><path d="M19 33c0 6 2 9 5 12 3-3 5-6 5-12z" fill="#ffb02e"/>'),jolt:$n('<path d="M28 2L10 27h11l-4 19L38 19H26z" fill="#fff25a" stroke="#8a6a00" stroke-width="2.6" stroke-linejoin="round"/>'),nova:$n('<path d="M24 3l5.5 12.5L43 17l-10 9.5L35.5 40 24 33l-11.5 7L15 26.5 5 17l13.5-1.5z" fill="#ffb02e" stroke="#8a4a00" stroke-width="2.4" stroke-linejoin="round"/><circle cx="24" cy="24" r="5" fill="#fff4c0"/>'),veil:$n('<path d="M8 42V22C8 11 15 5 24 5s16 6 16 17v20l-5-5-5 5-6-5-6 5-5-5z" fill="#e5dcff" stroke="#5a49a8" stroke-width="2.4" stroke-linejoin="round"/><circle cx="18" cy="22" r="3.2" fill="#3a2f78"/><circle cx="30" cy="22" r="3.2" fill="#3a2f78"/><path d="M19 30c3 3 7 3 10 0" fill="none" stroke="#3a2f78" stroke-width="2.4" stroke-linecap="round"/>'),coin:$n('<circle cx="24" cy="24" r="20" fill="#ffc928" stroke="#8a5a00" stroke-width="2.5"/><circle cx="24" cy="24" r="13" fill="none" stroke="#fff0a0" stroke-width="2.5"/><path d="M24 14v20M19 19h8a4 4 0 0 1 0 6h-6a4 4 0 0 0 0 6h8" fill="none" stroke="#8a5a00" stroke-width="3" stroke-linecap="round"/>'),lock:$n('<rect x="9" y="21" width="30" height="22" rx="4" fill="#c9d3e6" stroke="#4a5a7a" stroke-width="2.4"/><path d="M15 21v-6a9 9 0 0 1 18 0v6" fill="none" stroke="#4a5a7a" stroke-width="4"/><circle cx="24" cy="32" r="3.4" fill="#4a5a7a"/>')};var jc={};_r(jc,{PART_FIELDS:()=>qp,STARTER_COINS:()=>Wp,buy:()=>au,charPrice:()=>$p,fmtTime:()=>rr,load:()=>su,owns:()=>$i,priceOf:()=>ga,reset:()=>ru,save:()=>Zc});var iu="sparkdrift.save.v1",Wp=600;function Xp(){let i={};for(let t of Ct.bodies)i[t.name]=er(t.name);return{v:1,coins:Wp,chars:Ct.characters.filter(t=>t.free&&t.playable).map(t=>t.name),bodies:Ct.bodies.filter(t=>!t.price).map(t=>t.name),parts:{wheel:["Six-Spoke Standard"],spoiler:["None"],exhaust:["Stock Pipe"],bumper:["Stock Bumper"]},unlockAll:!1,sel:{char:"Pip Thistledown",body:"Corsa Standard"},builds:i,settings:{master:1,music:.8,sfx:1,voice:1,engine:1,quality:"standard",autoGas:!0,steerSens:1.15,tilt:!1,hq:!1,shake:!0,fps:"auto"},bests:{},ghosts:{},stats:{races:0,wins:0,coinsEarned:0},daily:{},created:Date.now()}}function su(){let i;try{i=JSON.parse(localStorage.getItem(iu))}catch{i=null}let t=Xp();return!i||i.v!==1?t:(i={...t,...i,settings:{...t.settings,...i.settings||{}},parts:{...t.parts,...i.parts||{}},sel:{...t.sel,...i.sel||{}},builds:{...t.builds,...i.builds||{}}},i)}function Zc(i){try{localStorage.setItem(iu,JSON.stringify(i))}catch{}}function ru(){try{localStorage.removeItem(iu)}catch{}return Xp()}var qp={wheel:"wheels",spoiler:"spoilers",exhaust:"exhausts",bumper:"bumpers"};function $p(i){return i.free?0:900}function $i(i,t,e){return i.unlockAll?!0:t==="char"?i.chars.includes(e):t==="body"?i.bodies.includes(e):(i.parts[t]||[]).includes(e)}function ga(i,t){if(i==="char"){let n=Ct.characters.find(s=>s.name===t);return n?$p(n):0}return i==="body"?(Ct.bodies.find(n=>n.name===t)||{}).price||0:((Ct[qp[i]]||[]).find(n=>n.name===t)||{}).price||0}function au(i,t,e){if($i(i,t,e))return!0;let n=ga(t,e);return i.coins<n?!1:(i.coins-=n,t==="char"?i.chars.push(e):t==="body"?i.bodies.push(e):i.parts[t].push(e),Zc(i),!0)}function rr(i){if(i==null)return"--:--.---";let t=Math.floor(i/60),e=i-t*60;return t+":"+(e<10?"0":"")+e.toFixed(3)}var eb={S:"Speed",A:"Accel",H:"Handling",G:"Grip",W:"Weight"},Yp=i=>(i>0?"+":"")+i.toFixed(1);function Jp(i,t){let e=i.save,n=i.audio,s=i.showroom,r=i.screenEl(),a=i.garageTab||"racer",o=e.sel.body,c=e.sel.char,l={...e.builds[o]},h=()=>Ct.characters.find(A=>A.name===c),d=()=>la(l,h().cls),u=()=>la(er(o),h().cls),f=()=>{let A=[];$i(e,"body",o)||A.push(["body",o]);for(let R of["wheel","spoiler","exhaust","bumper"])$i(e,R,l[R])||A.push([R,l[R]]);return A},g=()=>f().reduce((A,[R,P])=>A+ga(R,P),0),x=()=>{f().length===0&&(e.builds[o]={...l},e.sel.body=o,e.sel.char=c,i.persist())},m=()=>s.setKart(l,c),p=(A,R)=>{let P=ga(A,R);return $i(e,A,R)?P?'<div class="pr" style="color:#7bffb0">Owned</div>':'<div class="pr" style="color:#7bffb0">Free</div>':`<div class="pr">${kn.coin}${P}</div>`},y=(A,R,P)=>R.map(D=>{let L=["S","A","H","G","W"].filter(q=>D[q]).map(q=>`${q}${Yp(D[q])}`).join(" "),B=$i(e,A,D.name);return`<div class="chip ${P===D.name?"on":""} ${B?"":"locked"}" data-kind="${A}" data-name="${D.name}">${B?"":`<div class="lk">${kn.lock}</div>`}<div class="n">${D.name}</div><div class="d">${L||"no change"}${D.off?" \xB7 off-road "+Yp(D.off):""}</div>${p(A,D.name)}</div>`}).join(""),w=(A,R,P)=>A.map((D,L)=>`<div class="sw ${R===L?"on":""}" ${P}="${L}" title="${D.name}" style="background:${D.hex==="rainbow"?"conic-gradient(red,orange,yellow,lime,cyan,blue,magenta,red)":D.hex}"></div>`).join(""),_=()=>a==="racer"?`<div class="chips">${Ct.characters.filter(A=>A.playable).map(A=>`<div class="pcard ${A.name===c?"on":""}" data-char="${A.name}"><img src="${s.portrait(A.name)}" alt=""><div class="n">${A.name}<br><span class="pill ${A.cls}">${A.cls}</span></div></div>`).join("")}</div><div style="font-size:12px;color:var(--mut)" id="charInfo"></div>`:a==="kart"?`<div class="chips">${Ct.bodies.map(A=>{let R=$i(e,"body",A.name);return`<div class="chip ${A.name===o?"on":""} ${R?"":"locked"}" data-body="${A.name}" style="min-width:150px">${R?"":`<div class="lk">${kn.lock}</div>`}<div class="n">${A.name}</div><div class="d">${A.family} \xB7 S${A.S} A${A.A} H${A.H} G${A.G} W${A.W}</div><div class="d">${A.desc}</div>${p("body",A.name)}</div>`}).join("")}</div>`:a==="wheels"?`<div class="chips">${y("wheel",Ct.wheels,l.wheel)}</div><div class="row wrap" style="gap:14px"><div><div class="d" style="font-size:11px;color:var(--mut);font-weight:800">SIZE</div><div class="seg" id="sizes">${Ct.wheelSizes.map((A,R)=>`<button data-size="${R}" class="${l.size===R?"on":""}">${A.size}</button>`).join("")}</div></div><div><div style="font-size:11px;color:var(--mut);font-weight:800">RIM FINISH</div><div class="seg" id="rimfin">${Ct.rimFinishes.map((A,R)=>`<button data-rf="${R}" class="${l.rimFinish===R?"on":""}">${A}</button>`).join("")}</div></div></div><div style="font-size:11px;color:var(--mut);font-weight:800">RIM COLOUR</div><div class="chips">${w(Ct.rimColors,l.rim,"data-rim")}</div>`:a==="wing"?`<div class="chips">${y("spoiler",Ct.spoilers,l.spoiler)}</div>`:a==="exhaust"?`<div class="chips">${y("exhaust",Ct.exhausts,l.exhaust)}</div>`:a==="bumper"?`<div class="chips">${y("bumper",Ct.bumpers,l.bumper)}</div>`:a==="paint"?`<div style="font-size:11px;color:var(--mut);font-weight:800">PAINT</div><div class="chips">${w(Ct.paintColors,l.paint,"data-paint")}</div><div class="row wrap" style="gap:14px"><div><div style="font-size:11px;color:var(--mut);font-weight:800">FINISH</div><div class="seg" id="fin">${Ct.paintFinishes.map((A,R)=>`<button data-fin="${R}" class="${l.finish===R?"on":""}">${A}</button>`).join("")}</div></div><div><div style="font-size:11px;color:var(--mut);font-weight:800">TWO-TONE</div><div class="chips" style="padding:0"><div class="chip ${l.twoTone<0?"on":""}" data-tt="-1" style="min-width:60px"><div class="n">None</div></div>${Ct.twoTone.map((A,R)=>`<div class="chip ${l.twoTone===R?"on":""}" data-tt="${R}" style="min-width:90px"><div class="n">${A}</div></div>`).join("")}</div></div></div>${l.twoTone>=0?`<div style="font-size:11px;color:var(--mut);font-weight:800">ACCENT COLOUR</div><div class="chips">${w(Ct.paintColors,l.paint2,"data-paint2")}</div>`:""}`:a==="decals"?`<div class="chips"><div class="chip ${l.decal<0?"on":""}" data-decal="-1" style="min-width:60px"><div class="n">None</div></div>${Ct.decals.map((A,R)=>`<div class="chip ${l.decal===R?"on":""}" data-decal="${R}" style="min-width:110px"><div class="n">${A}</div></div>`).join("")}</div><div style="font-size:11px;color:var(--mut);font-weight:800">DECAL COLOUR</div><div class="chips">${["#ffffff","#111111","#ffd23f","#ff4d6d","#4db8ff","#37e08a","#b66bff","#ff8a2e"].map(A=>`<div class="sw ${l.decalColor===A?"on":""}" data-dc="${A}" style="background:${A}"></div>`).join("")}</div>`:"",S=()=>{let A=d(),R=u();return["S","A","H","G","W"].map(P=>{let D=A[P]-R[P];return`<div class="stat"><span>${eb[P]}</span><div class="bar"><i style="width:${A[P]*10}%"></i>${D>.05?`<i class="d" style="position:absolute;left:${R[P]*10}%;top:0;width:${D*10}%;background:#7bffb0"></i>`:""}</div><span>${A[P].toFixed(1)}</span></div>`}).join("")+`<div style="font-size:11px;color:var(--mut);margin-top:2px">Top ${Math.round(A.vmax*4)} km/h \xB7 0\u219290% in ${A.t90.toFixed(1)}s \xB7 class ${h().cls}</div>`},T=()=>{let A=f(),R=g();r.innerHTML=`<div class="topbar"><h2>Garage</h2>${t.html(document.createElement("div"),i.coinsBadge()).innerHTML}</div><div class="grow" id="spacer"></div>
    <div class="panel col" id="gpanel" style="padding:10px 12px;gap:8px;max-height:56vh"><div class="tabs">${["racer","kart","wheels","wing","exhaust","bumper","paint","decals"].map(P=>`<div class="tab ${a===P?"on":""}" data-tab="${P}">${P}</div>`).join("")}</div>
    <div class="row wrap" style="align-items:flex-start;gap:14px"><div class="col grow scroll" id="gbody" style="min-width:min(100%,360px);flex:2;gap:6px;max-height:34vh">${_()}</div><div class="col" style="flex:1;min-width:210px;gap:5px">${S()}</div></div>
    <div class="row"><button class="btn ghost" id="back">Back</button><div class="grow"></div>${A.length?`<button class="btn" id="buy" ${e.coins<R?"disabled":""}>Buy & equip \xB7 ${R}\u25C9</button>`:'<span style="font-weight:800;color:#7bffb0">Saved \u2713</span>'}</div></div>`,r.querySelector(".topbar").lastElementChild.id="coinsBadge",v()},C=(A,R)=>r.querySelectorAll(A).forEach(P=>P.onclick=()=>{i.ui("ui_click"),R(P)}),v=()=>{C("[data-tab]",P=>{a=P.dataset.tab,i.garageTab=a,T()}),C("[data-char]",P=>{c=P.dataset.char,e.sel.char=c,i.persist(),T(),m();let D=pa[c];i.audio.preloadVoices([D],["ready","taunt","win"]).then(()=>i.audio.bark(c,"ready",{cooldown:0}))}),C("[data-body]",P=>{o=P.dataset.body,l={...e.builds[o]},T(),m()}),C("[data-kind]",P=>{l[P.dataset.kind]=P.dataset.name,x(),T(),m()}),C("[data-size]",P=>{l.size=+P.dataset.size,x(),T(),m()}),C("[data-rf]",P=>{l.rimFinish=+P.dataset.rf,x(),T(),m()}),C("[data-rim]",P=>{l.rim=+P.dataset.rim,x(),T(),m()}),C("[data-paint]",P=>{l.paint=+P.dataset.paint,x(),T(),m()}),C("[data-paint2]",P=>{l.paint2=+P.dataset.paint2,x(),T(),m()}),C("[data-fin]",P=>{l.finish=+P.dataset.fin,x(),T(),m()}),C("[data-tt]",P=>{l.twoTone=+P.dataset.tt,x(),T(),m()}),C("[data-decal]",P=>{l.decal=+P.dataset.decal,x(),T(),m()}),C("[data-dc]",P=>{l.decalColor=P.dataset.dc,x(),T(),m()});let A=r.querySelector("#charInfo");if(A){let P=h();A.innerHTML=`<b>${P.name}</b> \xB7 ${P.cls} \xB7 ${P.setname}<br>${P.personality}`}let R=r.querySelector("#buy");R&&(R.onclick=()=>{let P=!0;for(let[D,L]of f())P=au(e,D,L)&&P;P?(i.ui("ui_buy"),x(),i.toast("Purchased!")):i.ui("ui_error"),T()}),r.querySelector("#back").onclick=()=>{i.ui("ui_back"),f().length&&(l={...e.builds[o]}),i.show("menu")}};T(),m(),s.spin=!0,i.garagePanel=r.querySelector("#gpanel");let M=()=>{}}var ou=class{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(t){this.flush(),this._parts.push(t)}append(t){this._pieces.push(t)}flush(){if(this._pieces.length>0){let t=new Uint8Array(this._pieces);this._parts.push(t),this._pieces=[]}}toArrayBuffer(){let t=[];for(let e of this._parts)t.push(e);return nb(t).buffer}};function nb(i){let t=0;for(let s of i)t+=s.byteLength;let e=new Uint8Array(t),n=0;for(let s of i){let r=new Uint8Array(s.buffer,s.byteOffset,s.byteLength);e.set(r,n),n+=s.byteLength}return e}function hu(i){return new cu(i).unpack()}function uu(i){let t=new lu,e=t.pack(i);return e instanceof Promise?e.then(()=>t.getBuffer()):t.getBuffer()}var cu=class{constructor(t){this.index=0,this.dataBuffer=t,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){let t=this.unpack_uint8();if(t<128)return t;if((t^224)<32)return(t^224)-32;let e;if((e=t^160)<=15)return this.unpack_raw(e);if((e=t^176)<=15)return this.unpack_string(e);if((e=t^144)<=15)return this.unpack_array(e);if((e=t^128)<=15)return this.unpack_map(e);switch(t){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return e=this.unpack_uint16(),this.unpack_string(e);case 217:return e=this.unpack_uint32(),this.unpack_string(e);case 218:return e=this.unpack_uint16(),this.unpack_raw(e);case 219:return e=this.unpack_uint32(),this.unpack_raw(e);case 220:return e=this.unpack_uint16(),this.unpack_array(e);case 221:return e=this.unpack_uint32(),this.unpack_array(e);case 222:return e=this.unpack_uint16(),this.unpack_map(e);case 223:return e=this.unpack_uint32(),this.unpack_map(e)}}unpack_uint8(){let t=this.dataView[this.index]&255;return this.index++,t}unpack_uint16(){let t=this.read(2),e=(t[0]&255)*256+(t[1]&255);return this.index+=2,e}unpack_uint32(){let t=this.read(4),e=((t[0]*256+t[1])*256+t[2])*256+t[3];return this.index+=4,e}unpack_uint64(){let t=this.read(8),e=((((((t[0]*256+t[1])*256+t[2])*256+t[3])*256+t[4])*256+t[5])*256+t[6])*256+t[7];return this.index+=8,e}unpack_int8(){let t=this.unpack_uint8();return t<128?t:t-256}unpack_int16(){let t=this.unpack_uint16();return t<32768?t:t-65536}unpack_int32(){let t=this.unpack_uint32();return t<2**31?t:t-2**32}unpack_int64(){let t=this.unpack_uint64();return t<2**63?t:t-2**64}unpack_raw(t){if(this.length<this.index+t)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${t} ${this.length}`);let e=this.dataBuffer.slice(this.index,this.index+t);return this.index+=t,e}unpack_string(t){let e=this.read(t),n=0,s="",r,a;for(;n<t;)r=e[n],r<160?(a=r,n++):(r^192)<32?(a=(r&31)<<6|e[n+1]&63,n+=2):(r^224)<16?(a=(r&15)<<12|(e[n+1]&63)<<6|e[n+2]&63,n+=3):(a=(r&7)<<18|(e[n+1]&63)<<12|(e[n+2]&63)<<6|e[n+3]&63,n+=4),s+=String.fromCodePoint(a);return this.index+=t,s}unpack_array(t){let e=new Array(t);for(let n=0;n<t;n++)e[n]=this.unpack();return e}unpack_map(t){let e={};for(let n=0;n<t;n++){let s=this.unpack();e[s]=this.unpack()}return e}unpack_float(){let t=this.unpack_uint32(),e=t>>31,n=(t>>23&255)-127,s=t&8388607|8388608;return(e===0?1:-1)*s*2**(n-23)}unpack_double(){let t=this.unpack_uint32(),e=this.unpack_uint32(),n=t>>31,s=(t>>20&2047)-1023,a=(t&1048575|1048576)*2**(s-20)+e*2**(s-52);return(n===0?1:-1)*a}read(t){let e=this.index;if(e+t<=this.length)return this.dataView.subarray(e,e+t);throw new Error("BinaryPackFailure: read index out of range")}},lu=class{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(t){if(typeof t=="string")this.pack_string(t);else if(typeof t=="number")Math.floor(t)===t?this.pack_integer(t):this.pack_double(t);else if(typeof t=="boolean")t===!0?this._bufferBuilder.append(195):t===!1&&this._bufferBuilder.append(194);else if(t===void 0)this._bufferBuilder.append(192);else if(typeof t=="object")if(t===null)this._bufferBuilder.append(192);else{let e=t.constructor;if(t instanceof Array){let n=this.pack_array(t);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else if(t instanceof ArrayBuffer)this.pack_bin(new Uint8Array(t));else if("BYTES_PER_ELEMENT"in t){let n=t;this.pack_bin(new Uint8Array(n.buffer,n.byteOffset,n.byteLength))}else if(t instanceof Date)this.pack_string(t.toString());else{if(t instanceof Blob)return t.arrayBuffer().then(n=>{this.pack_bin(new Uint8Array(n)),this._bufferBuilder.flush()});if(e==Object||e.toString().startsWith("class")){let n=this.pack_object(t);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${e.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof t}" not yet supported`);this._bufferBuilder.flush()}pack_bin(t){let e=t.length;if(e<=15)this.pack_uint8(160+e);else if(e<=65535)this._bufferBuilder.append(218),this.pack_uint16(e);else if(e<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(e);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_string(t){let e=this._textEncoder.encode(t),n=e.length;if(n<=15)this.pack_uint8(176+n);else if(n<=65535)this._bufferBuilder.append(216),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(n);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_array(t){let e=t.length;if(e<=15)this.pack_uint8(144+e);else if(e<=65535)this._bufferBuilder.append(220),this.pack_uint16(e);else if(e<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(e);else throw new Error("Invalid length");let n=s=>{if(s<e){let r=this.pack(t[s]);return r instanceof Promise?r.then(()=>n(s+1)):n(s+1)}};return n(0)}pack_integer(t){if(t>=-32&&t<=127)this._bufferBuilder.append(t&255);else if(t>=0&&t<=255)this._bufferBuilder.append(204),this.pack_uint8(t);else if(t>=-128&&t<=127)this._bufferBuilder.append(208),this.pack_int8(t);else if(t>=0&&t<=65535)this._bufferBuilder.append(205),this.pack_uint16(t);else if(t>=-32768&&t<=32767)this._bufferBuilder.append(209),this.pack_int16(t);else if(t>=0&&t<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(t);else if(t>=-2147483648&&t<=2147483647)this._bufferBuilder.append(210),this.pack_int32(t);else if(t>=-9223372036854776e3&&t<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(t);else if(t>=0&&t<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(t);else throw new Error("Invalid integer")}pack_double(t){let e=0;t<0&&(e=1,t=-t);let n=Math.floor(Math.log(t)/Math.LN2),s=t/2**n-1,r=Math.floor(s*2**52),a=2**32,o=e<<31|n+1023<<20|r/a&1048575,c=r%a;this._bufferBuilder.append(203),this.pack_int32(o),this.pack_int32(c)}pack_object(t){let e=Object.keys(t),n=e.length;if(n<=15)this.pack_uint8(128+n);else if(n<=65535)this._bufferBuilder.append(222),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(n);else throw new Error("Invalid length");let s=r=>{if(r<e.length){let a=e[r];if(t.hasOwnProperty(a)){this.pack(a);let o=this.pack(t[a]);if(o instanceof Promise)return o.then(()=>s(r+1))}return s(r+1)}};return s(0)}pack_uint8(t){this._bufferBuilder.append(t)}pack_uint16(t){this._bufferBuilder.append(t>>8),this._bufferBuilder.append(t&255)}pack_uint32(t){let e=t&4294967295;this._bufferBuilder.append((e&4278190080)>>>24),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_uint64(t){let e=t/4294967296,n=t%2**32;this._bufferBuilder.append((e&4278190080)>>>24),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}pack_int8(t){this._bufferBuilder.append(t&255)}pack_int16(t){this._bufferBuilder.append((t&65280)>>8),this._bufferBuilder.append(t&255)}pack_int32(t){this._bufferBuilder.append(t>>>24&255),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_int64(t){let e=Math.floor(t/4294967296),n=t%2**32;this._bufferBuilder.append((e&4278190080)>>>24),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}constructor(){this._bufferBuilder=new ou,this._textEncoder=new TextEncoder}};var Zp=!0,jp=!0;function ar(i,t,e){let n=i.match(t);return n&&n.length>=e&&parseFloat(n[e],10)}function ai(i,t,e){if(!i.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){xa("Unable to polyfill events");return}let s=i.RTCPeerConnection.prototype,r=s.addEventListener;s.addEventListener=function(o,c){if(o!==t)return r.apply(this,arguments);let l=h=>{let d=e(h);d&&(c.handleEvent?c.handleEvent(d):c(d))};return this._eventMap=this._eventMap||{},this._eventMap[t]||(this._eventMap[t]=new Map),this._eventMap[t].set(c,l),r.apply(this,[o,l])};let a=s.removeEventListener;s.removeEventListener=function(o,c){if(o!==t||!this._eventMap||!this._eventMap[t])return a.apply(this,arguments);if(!this._eventMap[t].has(c))return a.apply(this,arguments);let l=this._eventMap[t].get(c);return this._eventMap[t].delete(c),this._eventMap[t].size===0&&delete this._eventMap[t],Object.keys(this._eventMap).length===0&&delete this._eventMap,a.apply(this,[o,l])},Object.defineProperty(s,"on"+t,{get(){return this["_on"+t]},set(o){this["_on"+t]&&(this.removeEventListener(t,this["_on"+t]),delete this["_on"+t]),o&&this.addEventListener(t,this["_on"+t]=o)},enumerable:!0,configurable:!0})}function Qp(i){return typeof i!="boolean"?new Error("Argument type: "+typeof i+". Please use a boolean."):(Zp=i,i?"adapter.js logging disabled":"adapter.js logging enabled")}function t0(i){return typeof i!="boolean"?new Error("Argument type: "+typeof i+". Please use a boolean."):(jp=!i,"adapter.js deprecation warnings "+(i?"disabled":"enabled"))}function xa(){if(typeof window=="object"){if(Zp)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function or(i,t){jp&&console.warn(i+" is deprecated, please use "+t+" instead.")}function e0(i){let t={browser:null,version:null};if(typeof i>"u"||!i.navigator||!i.navigator.userAgent)return t.browser="Not a browser.",t;let{navigator:e}=i;if(e.userAgentData&&e.userAgentData.brands){let n=e.userAgentData.brands.find(s=>s.brand==="Chromium");if(n){let s=parseInt(n.version,10);if(s>=90)return{browser:"chrome",version:s}}}if(e.mozGetUserMedia)t.browser="firefox",t.version=parseInt(ar(e.userAgent,/Firefox\/(\d+)\./,1));else if(e.webkitGetUserMedia||i.isSecureContext===!1&&i.webkitRTCPeerConnection)t.browser="chrome",t.version=parseInt(ar(e.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(i.RTCPeerConnection&&e.userAgent.match(/AppleWebKit\/(\d+)\./))t.browser="safari",t.version=parseInt(ar(e.userAgent,/AppleWebKit\/(\d+)\./,1)),t.supportsUnifiedPlan=i.RTCRtpTransceiver&&"currentDirection"in i.RTCRtpTransceiver.prototype,t._safariVersion=ar(e.userAgent,/Version\/(\d+(\.?\d+))/,1);else return t.browser="Not a supported browser.",t;return t}function Kp(i){return Object.prototype.toString.call(i)==="[object Object]"}function fu(i){return Kp(i)?Object.keys(i).reduce(function(t,e){let n=Kp(i[e]),s=n?fu(i[e]):i[e],r=n&&!Object.keys(s).length;return s===void 0||r?t:Object.assign(t,{[e]:s})},{}):i}function du(i,t,e){!t||e.has(t.id)||(e.set(t.id,t),Object.keys(t).forEach(n=>{n.endsWith("Id")?du(i,i.get(t[n]),e):n.endsWith("Ids")&&t[n].forEach(s=>{du(i,i.get(s),e)})}))}function pu(i,t,e){let n=e?"outbound-rtp":"inbound-rtp",s=new Map;if(t===null)return s;let r=[];return i.forEach(a=>{a.type==="track"&&a.trackIdentifier===t.id&&r.push(a)}),r.forEach(a=>{i.forEach(o=>{o.type===n&&o.trackId===a.id&&du(i,o,s)})}),s}var el={};_r(el,{fixNegotiationNeeded:()=>yu,shimAddTrackRemoveTrack:()=>vu,shimAddTrackRemoveTrackWithNative:()=>i0,shimGetSendersWithDtmf:()=>xu,shimGetUserMedia:()=>Qc,shimMediaStream:()=>mu,shimOnTrack:()=>gu,shimPeerConnection:()=>tl,shimSenderReceiverGetStats:()=>_u});var n0=xa;function Qc(i,t){if(t.version>=64)return;let e=i&&i.navigator;if(!e.mediaDevices)return;let n=function(o){if(typeof o!="object"||o.mandatory||o.optional)return o;let c={};return Object.keys(o).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;let h=typeof o[l]=="object"?o[l]:{ideal:o[l]};h.exact!==void 0&&typeof h.exact=="number"&&(h.min=h.max=h.exact);let d=function(u,f){return u?u+f.charAt(0).toUpperCase()+f.slice(1):f==="deviceId"?"sourceId":f};if(h.ideal!==void 0){c.optional=c.optional||[];let u={};typeof h.ideal=="number"?(u[d("min",l)]=h.ideal,c.optional.push(u),u={},u[d("max",l)]=h.ideal,c.optional.push(u)):(u[d("",l)]=h.ideal,c.optional.push(u))}h.exact!==void 0&&typeof h.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[d("",l)]=h.exact):["min","max"].forEach(u=>{h[u]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[d(u,l)]=h[u])})}),o.advanced&&(c.optional=(c.optional||[]).concat(o.advanced)),c},s=function(o,c){if(t.version>=61)return c(o);if(o=JSON.parse(JSON.stringify(o)),o&&typeof o.audio=="object"){let l=function(h,d,u){d in h&&!(u in h)&&(h[u]=h[d],delete h[d])};o=JSON.parse(JSON.stringify(o)),l(o.audio,"autoGainControl","googAutoGainControl"),l(o.audio,"noiseSuppression","googNoiseSuppression"),o.audio=n(o.audio)}if(o&&typeof o.video=="object"){let l=o.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});let h=t.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(e.mediaDevices.getSupportedConstraints&&e.mediaDevices.getSupportedConstraints().facingMode&&!h)){delete o.video.facingMode;let d;if(l.exact==="environment"||l.ideal==="environment"?d=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(d=["front"]),d)return e.mediaDevices.enumerateDevices().then(u=>{u=u.filter(g=>g.kind==="videoinput");let f=u.find(g=>d.some(x=>g.label.toLowerCase().includes(x)));return!f&&u.length&&d.includes("back")&&(f=u[u.length-1]),f&&(o.video.deviceId=l.exact?{exact:f.deviceId}:{ideal:f.deviceId}),o.video=n(o.video),n0("chrome: "+JSON.stringify(o)),c(o)})}o.video=n(o.video)}return n0("chrome: "+JSON.stringify(o)),c(o)},r=function(o){return t.version>=64?o:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[o.name]||o.name,message:o.message,constraint:o.constraint||o.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},a=function(o,c,l){s(o,h=>{e.webkitGetUserMedia(h,c,d=>{l&&l(r(d))})})};if(e.getUserMedia=a.bind(e),e.mediaDevices.getUserMedia){let o=e.mediaDevices.getUserMedia.bind(e.mediaDevices);e.mediaDevices.getUserMedia=function(c){return s(c,l=>o(l).then(h=>{if(l.audio&&!h.getAudioTracks().length||l.video&&!h.getVideoTracks().length)throw h.getTracks().forEach(d=>{d.stop()}),new DOMException("","NotFoundError");return h},h=>Promise.reject(r(h))))}}}function mu(i){i.MediaStream=i.MediaStream||i.webkitMediaStream}function gu(i,t){if(!(t.version>102))if(typeof i=="object"&&i.RTCPeerConnection&&!("ontrack"in i.RTCPeerConnection.prototype)){Object.defineProperty(i.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(n){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=n)},enumerable:!0,configurable:!0});let e=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=s=>{s.stream.addEventListener("addtrack",r=>{let a;i.RTCPeerConnection.prototype.getReceivers?a=this.getReceivers().find(c=>c.track&&c.track.id===r.track.id):a={track:r.track};let o=new Event("track");o.track=r.track,o.receiver=a,o.transceiver={receiver:a},o.streams=[s.stream],this.dispatchEvent(o)}),s.stream.getTracks().forEach(r=>{let a;i.RTCPeerConnection.prototype.getReceivers?a=this.getReceivers().find(c=>c.track&&c.track.id===r.id):a={track:r};let o=new Event("track");o.track=r,o.receiver=a,o.transceiver={receiver:a},o.streams=[s.stream],this.dispatchEvent(o)})},this.addEventListener("addstream",this._ontrackpoly)),e.apply(this,arguments)}}else ai(i,"track",e=>(e.transceiver||Object.defineProperty(e,"transceiver",{value:{receiver:e.receiver}}),e))}function xu(i){if(typeof i=="object"&&i.RTCPeerConnection&&!("getSenders"in i.RTCPeerConnection.prototype)&&"createDTMFSender"in i.RTCPeerConnection.prototype){let t=function(s,r){return{track:r,get dtmf(){return this._dtmf===void 0&&(r.kind==="audio"?this._dtmf=s.createDTMFSender(r):this._dtmf=null),this._dtmf},_pc:s}};if(!i.RTCPeerConnection.prototype.getSenders){i.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};let s=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addTrack=function(o,c){let l=s.apply(this,arguments);return l||(l=t(this,o),this._senders.push(l)),l};let r=i.RTCPeerConnection.prototype.removeTrack;i.RTCPeerConnection.prototype.removeTrack=function(o){r.apply(this,arguments);let c=this._senders.indexOf(o);c!==-1&&this._senders.splice(c,1)}}let e=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(r){this._senders=this._senders||[],e.apply(this,[r]),r.getTracks().forEach(a=>{this._senders.push(t(this,a))})};let n=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(r){this._senders=this._senders||[],n.apply(this,[r]),r.getTracks().forEach(a=>{let o=this._senders.find(c=>c.track===a);o&&this._senders.splice(this._senders.indexOf(o),1)})}}else if(typeof i=="object"&&i.RTCPeerConnection&&"getSenders"in i.RTCPeerConnection.prototype&&"createDTMFSender"in i.RTCPeerConnection.prototype&&i.RTCRtpSender&&!("dtmf"in i.RTCRtpSender.prototype)){let t=i.RTCPeerConnection.prototype.getSenders;i.RTCPeerConnection.prototype.getSenders=function(){let n=t.apply(this,[]);return n.forEach(s=>s._pc=this),n},Object.defineProperty(i.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function _u(i,t){if(t.version>=67||!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender&&i.RTCRtpReceiver))return;if(!("getStats"in i.RTCRtpSender.prototype)){let n=i.RTCPeerConnection.prototype.getSenders;n&&(i.RTCPeerConnection.prototype.getSenders=function(){let a=n.apply(this,[]);return a.forEach(o=>o._pc=this),a});let s=i.RTCPeerConnection.prototype.addTrack;s&&(i.RTCPeerConnection.prototype.addTrack=function(){let a=s.apply(this,arguments);return a._pc=this,a}),i.RTCRtpSender.prototype.getStats=function(){let a=this;return this._pc.getStats().then(o=>pu(o,a.track,!0))}}if(!("getStats"in i.RTCRtpReceiver.prototype)){let n=i.RTCPeerConnection.prototype.getReceivers;n&&(i.RTCPeerConnection.prototype.getReceivers=function(){let r=n.apply(this,[]);return r.forEach(a=>a._pc=this),r}),ai(i,"track",s=>(s.receiver._pc=s.srcElement,s)),i.RTCRtpReceiver.prototype.getStats=function(){let r=this;return this._pc.getStats().then(a=>pu(a,r.track,!1))}}if(!("getStats"in i.RTCRtpSender.prototype&&"getStats"in i.RTCRtpReceiver.prototype))return;let e=i.RTCPeerConnection.prototype.getStats;i.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof i.MediaStreamTrack){let s=arguments[0],r,a,o;return this.getSenders().forEach(c=>{c.track===s&&(r?o=!0:r=c)}),this.getReceivers().forEach(c=>(c.track===s&&(a?o=!0:a=c),c.track===s)),o||r&&a?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):r?r.getStats():a?a.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return e.apply(this,arguments)}}function i0(i){i.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(a=>this._shimmedLocalStreams[a][0])};let t=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addTrack=function(a,o){if(!o)return t.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};let c=t.apply(this,arguments);return this._shimmedLocalStreams[o.id]?this._shimmedLocalStreams[o.id].indexOf(c)===-1&&this._shimmedLocalStreams[o.id].push(c):this._shimmedLocalStreams[o.id]=[o,c],c};let e=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(a){this._shimmedLocalStreams=this._shimmedLocalStreams||{},a.getTracks().forEach(l=>{if(this.getSenders().find(d=>d.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});let o=this.getSenders();e.apply(this,arguments);let c=this.getSenders().filter(l=>o.indexOf(l)===-1);this._shimmedLocalStreams[a.id]=[a].concat(c)};let n=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(a){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[a.id],n.apply(this,arguments)};let s=i.RTCPeerConnection.prototype.removeTrack;i.RTCPeerConnection.prototype.removeTrack=function(a){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},a&&Object.keys(this._shimmedLocalStreams).forEach(o=>{let c=this._shimmedLocalStreams[o].indexOf(a);c!==-1&&this._shimmedLocalStreams[o].splice(c,1),this._shimmedLocalStreams[o].length===1&&delete this._shimmedLocalStreams[o]}),s.apply(this,arguments)}}function vu(i,t){if(!i.RTCPeerConnection)return;if(i.RTCPeerConnection.prototype.addTrack&&t.version>=65)return i0(i);let e=i.RTCPeerConnection.prototype.getLocalStreams;i.RTCPeerConnection.prototype.getLocalStreams=function(){let h=e.apply(this);return this._reverseStreams=this._reverseStreams||{},h.map(d=>this._reverseStreams[d.id])};let n=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(h){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},h.getTracks().forEach(d=>{if(this.getSenders().find(f=>f.track===d))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[h.id]){let d=new i.MediaStream(h.getTracks());this._streams[h.id]=d,this._reverseStreams[d.id]=h,h=d}n.apply(this,[h])};let s=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(h){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},s.apply(this,[this._streams[h.id]||h]),delete this._reverseStreams[this._streams[h.id]?this._streams[h.id].id:h.id],delete this._streams[h.id]},i.RTCPeerConnection.prototype.addTrack=function(h,d){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");let u=[].slice.call(arguments,1);if(u.length!==1||!u[0].getTracks().find(x=>x===h))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(x=>x.track===h))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};let g=this._streams[d.id];if(g)g.addTrack(h),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{let x=new i.MediaStream([h]);this._streams[d.id]=x,this._reverseStreams[x.id]=d,this.addStream(x)}return this.getSenders().find(x=>x.track===h)};function r(l,h){let d=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(u=>{let f=l._reverseStreams[u],g=l._streams[f.id];d=d.replace(new RegExp(g.id,"g"),f.id)}),new RTCSessionDescription({type:h.type,sdp:d})}function a(l,h){let d=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(u=>{let f=l._reverseStreams[u],g=l._streams[f.id];d=d.replace(new RegExp(f.id,"g"),g.id)}),new RTCSessionDescription({type:h.type,sdp:d})}["createOffer","createAnswer"].forEach(function(l){let h=i.RTCPeerConnection.prototype[l],d={[l](){let u=arguments;return arguments.length&&typeof arguments[0]=="function"?h.apply(this,[g=>{let x=r(this,g);u[0].apply(null,[x])},g=>{u[1]&&u[1].apply(null,g)},arguments[2]]):h.apply(this,arguments).then(g=>r(this,g))}};i.RTCPeerConnection.prototype[l]=d[l]});let o=i.RTCPeerConnection.prototype.setLocalDescription;i.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?o.apply(this,arguments):(arguments[0]=a(this,arguments[0]),o.apply(this,arguments))};let c=Object.getOwnPropertyDescriptor(i.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(i.RTCPeerConnection.prototype,"localDescription",{get(){let l=c.get.apply(this);return l.type===""?l:r(this,l)}}),i.RTCPeerConnection.prototype.removeTrack=function(h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!h._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(h._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let u;Object.keys(this._streams).forEach(f=>{this._streams[f].getTracks().find(x=>h.track===x)&&(u=this._streams[f])}),u&&(u.getTracks().length===1?this.removeStream(this._reverseStreams[u.id]):u.removeTrack(h.track),this.dispatchEvent(new Event("negotiationneeded")))}}function tl(i,t){!i.RTCPeerConnection&&i.webkitRTCPeerConnection&&(i.RTCPeerConnection=i.webkitRTCPeerConnection),i.RTCPeerConnection&&t.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(e){let n=i.RTCPeerConnection.prototype[e],s={[e](){return arguments[0]=new(e==="addIceCandidate"?i.RTCIceCandidate:i.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};i.RTCPeerConnection.prototype[e]=s[e]})}function yu(i,t){t.version>102||ai(i,"negotiationneeded",e=>{let n=e.target;if(!((t.version<72||n.getConfiguration&&n.getConfiguration().sdpSemantics==="plan-b")&&n.signalingState!=="stable"))return e})}var sl={};_r(sl,{shimAddTransceiver:()=>Au,shimCreateAnswer:()=>Pu,shimCreateOffer:()=>Ru,shimGetDisplayMedia:()=>s0,shimGetParameters:()=>Cu,shimGetStats:()=>Mu,shimGetUserMedia:()=>nl,shimOnTrack:()=>bu,shimPeerConnection:()=>il,shimRTCDataChannel:()=>Eu,shimReceiverGetStats:()=>Tu,shimRemoveStream:()=>wu,shimSenderGetStats:()=>Su});function nl(i,t){let e=i&&i.navigator;if(!e.mediaDevices)return;let n=i&&i.MediaStreamTrack;if(e.getUserMedia=function(s,r,a){or("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),e.mediaDevices.getUserMedia(s).then(r,a)},!(t.version>55&&"autoGainControl"in e.mediaDevices.getSupportedConstraints())){let s=function(a,o,c){o in a&&!(c in a)&&(a[c]=a[o],delete a[o])},r=e.mediaDevices.getUserMedia.bind(e.mediaDevices);if(e.mediaDevices.getUserMedia=function(a){return typeof a=="object"&&typeof a.audio=="object"&&(a=JSON.parse(JSON.stringify(a)),s(a.audio,"autoGainControl","mozAutoGainControl"),s(a.audio,"noiseSuppression","mozNoiseSuppression")),r(a)},n&&n.prototype.getSettings){let a=n.prototype.getSettings;n.prototype.getSettings=function(){let o=a.apply(this,arguments);return s(o,"mozAutoGainControl","autoGainControl"),s(o,"mozNoiseSuppression","noiseSuppression"),o}}if(n&&n.prototype.applyConstraints){let a=n.prototype.applyConstraints;n.prototype.applyConstraints=function(o){return this.kind==="audio"&&typeof o=="object"&&(o=JSON.parse(JSON.stringify(o)),s(o,"autoGainControl","mozAutoGainControl"),s(o,"noiseSuppression","mozNoiseSuppression")),a.apply(this,[o])}}}}function s0(i,t){i.navigator.mediaDevices&&(i.navigator.mediaDevices&&"getDisplayMedia"in i.navigator.mediaDevices||(i.navigator.mediaDevices.getDisplayMedia=function(n){if(!(n&&n.video)){let s=new DOMException("getDisplayMedia without video constraints is undefined");return s.name="NotFoundError",s.code=8,Promise.reject(s)}return n.video===!0?n.video={mediaSource:t}:n.video.mediaSource=t,i.navigator.mediaDevices.getUserMedia(n)}))}function bu(i){typeof i=="object"&&i.RTCTrackEvent&&"receiver"in i.RTCTrackEvent.prototype&&!("transceiver"in i.RTCTrackEvent.prototype)&&Object.defineProperty(i.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function il(i,t){typeof i!="object"||!(i.RTCPeerConnection||i.mozRTCPeerConnection)||(!i.RTCPeerConnection&&i.mozRTCPeerConnection&&(i.RTCPeerConnection=i.mozRTCPeerConnection),t.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(e){let n=i.RTCPeerConnection.prototype[e],s={[e](){return arguments[0]=new(e==="addIceCandidate"?i.RTCIceCandidate:i.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};i.RTCPeerConnection.prototype[e]=s[e]}))}function Mu(i,t){if(typeof i!="object"||!(i.RTCPeerConnection||i.mozRTCPeerConnection)||t.version>=151)return;let e={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},n=i.RTCPeerConnection.prototype.getStats;i.RTCPeerConnection.prototype.getStats=function(){let[r,a,o]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):n.apply(this,[r||null]).then(c=>{if(t.version<53&&!a)try{c.forEach(l=>{l.type=e[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((h,d)=>{c.set(d,Object.assign({},h,{type:e[h.type]||h.type}))})}return c}).then(a,o)}}function Su(i){if(!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender)||i.RTCRtpSender&&"getStats"in i.RTCRtpSender.prototype)return;let t=i.RTCPeerConnection.prototype.getSenders;t&&(i.RTCPeerConnection.prototype.getSenders=function(){let s=t.apply(this,[]);return s.forEach(r=>r._pc=this),s});let e=i.RTCPeerConnection.prototype.addTrack;e&&(i.RTCPeerConnection.prototype.addTrack=function(){let s=e.apply(this,arguments);return s._pc=this,s}),i.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function Tu(i){if(!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender)||i.RTCRtpSender&&"getStats"in i.RTCRtpReceiver.prototype)return;let t=i.RTCPeerConnection.prototype.getReceivers;t&&(i.RTCPeerConnection.prototype.getReceivers=function(){let n=t.apply(this,[]);return n.forEach(s=>s._pc=this),n}),ai(i,"track",e=>(e.receiver._pc=e.srcElement,e)),i.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function wu(i){!i.RTCPeerConnection||"removeStream"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.removeStream=function(e){or("removeStream","removeTrack"),this.getSenders().forEach(n=>{n.track&&e.getTracks().includes(n.track)&&this.removeTrack(n)})})}function Eu(i){i.DataChannel&&!i.RTCDataChannel&&(i.RTCDataChannel=i.DataChannel)}function Au(i,t){if(!(typeof i=="object"&&i.RTCPeerConnection)||t.version>=110)return;let e=i.RTCPeerConnection.prototype.addTransceiver;e&&(i.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let s=arguments[1]&&arguments[1].sendEncodings;s===void 0&&(s=[]),s=[...s];let r=s.length>0;r&&s.forEach(o=>{if("rid"in o&&!/^[a-z0-9]{0,16}$/i.test(o.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in o&&!(parseFloat(o.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in o&&!(parseFloat(o.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});let a=e.apply(this,arguments);if(r){let{sender:o}=a,c=o.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=s,o.sendEncodings=s,this.setParametersPromises.push(o.setParameters(c).then(()=>{delete o.sendEncodings}).catch(()=>{delete o.sendEncodings})))}return a})}function Cu(i,t){if(!(typeof i=="object"&&i.RTCRtpSender)||t.version>=110)return;let e=i.RTCRtpSender.prototype.getParameters;e&&(i.RTCRtpSender.prototype.getParameters=function(){let s=e.apply(this,arguments);return"encodings"in s||(s.encodings=[].concat(this.sendEncodings||[{}])),s})}function Ru(i,t){if(!(typeof i=="object"&&i.RTCPeerConnection)||t.version>=110)return;let e=i.RTCPeerConnection.prototype.createOffer;i.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>e.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):e.apply(this,arguments)}}function Pu(i,t){if(!(typeof i=="object"&&i.RTCPeerConnection)||t.version>=110)return;let e=i.RTCPeerConnection.prototype.createAnswer;i.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>e.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):e.apply(this,arguments)}}var rl={};_r(rl,{shimAudioContext:()=>Ou,shimCallbacksAPI:()=>Du,shimConstraints:()=>r0,shimCreateOfferLegacy:()=>Fu,shimGetUserMedia:()=>ku,shimLocalStreamsAPI:()=>Iu,shimRTCIceServerUrls:()=>Nu,shimRemoteStreamsAPI:()=>Lu,shimTrackEventTransceiver:()=>Uu});function Iu(i){if(!(typeof i!="object"||!i.RTCPeerConnection)){if("getLocalStreams"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in i.RTCPeerConnection.prototype)){let t=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addStream=function(n){this._localStreams||(this._localStreams=[]),this._localStreams.includes(n)||this._localStreams.push(n),n.getAudioTracks().forEach(s=>t.call(this,s,n)),n.getVideoTracks().forEach(s=>t.call(this,s,n))},i.RTCPeerConnection.prototype.addTrack=function(n,...s){return s&&s.forEach(r=>{this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]}),t.apply(this,arguments)}}"removeStream"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.removeStream=function(e){this._localStreams||(this._localStreams=[]);let n=this._localStreams.indexOf(e);if(n===-1)return;this._localStreams.splice(n,1);let s=e.getTracks();this.getSenders().forEach(r=>{s.includes(r.track)&&this.removeTrack(r)})})}}function Lu(i){if(!(typeof i!="object"||!i.RTCPeerConnection)&&("getRemoteStreams"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in i.RTCPeerConnection.prototype))){Object.defineProperty(i.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(e){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=e),this.addEventListener("track",this._onaddstreampoly=n=>{n.streams.forEach(s=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(s))return;this._remoteStreams.push(s);let r=new Event("addstream");r.stream=s,this.dispatchEvent(r)})})}});let t=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){let n=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(s){s.streams.forEach(r=>{if(n._remoteStreams||(n._remoteStreams=[]),n._remoteStreams.indexOf(r)>=0)return;n._remoteStreams.push(r);let a=new Event("addstream");a.stream=r,n.dispatchEvent(a)})}),t.apply(n,arguments)}}}function Du(i){if(typeof i!="object"||!i.RTCPeerConnection)return;let t=i.RTCPeerConnection.prototype,e=t.createOffer,n=t.createAnswer,s=t.setLocalDescription,r=t.setRemoteDescription,a=t.addIceCandidate;t.createOffer=function(l,h){let d=arguments.length>=2?arguments[2]:arguments[0],u=e.apply(this,[d]);return h?(u.then(l,h),Promise.resolve()):u},t.createAnswer=function(l,h){let d=arguments.length>=2?arguments[2]:arguments[0],u=n.apply(this,[d]);return h?(u.then(l,h),Promise.resolve()):u};let o=function(c,l,h){let d=s.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d};t.setLocalDescription=o,o=function(c,l,h){let d=r.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d},t.setRemoteDescription=o,o=function(c,l,h){let d=a.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d},t.addIceCandidate=o}function ku(i){let t=i&&i.navigator;if(t.mediaDevices&&t.mediaDevices.getUserMedia){let e=t.mediaDevices,n=e.getUserMedia.bind(e);t.mediaDevices.getUserMedia=s=>n(r0(s))}!t.getUserMedia&&t.mediaDevices&&t.mediaDevices.getUserMedia&&(t.getUserMedia=function(n,s,r){t.mediaDevices.getUserMedia(n).then(s,r)}.bind(t))}function r0(i){return i&&i.video!==void 0?Object.assign({},i,{video:fu(i.video)}):i}function Nu(i){if(!i.RTCPeerConnection)return;let t=i.RTCPeerConnection;i.RTCPeerConnection=function(n,s){if(n&&n.iceServers){let r=[];for(let a=0;a<n.iceServers.length;a++){let o=n.iceServers[a];o.urls===void 0&&o.url?(or("RTCIceServer.url","RTCIceServer.urls"),o=JSON.parse(JSON.stringify(o)),o.urls=o.url,delete o.url,r.push(o)):r.push(n.iceServers[a])}n.iceServers=r}return new t(n,s)},i.RTCPeerConnection.prototype=t.prototype,"generateCertificate"in t&&Object.defineProperty(i.RTCPeerConnection,"generateCertificate",{get(){return t.generateCertificate}})}function Uu(i){typeof i=="object"&&i.RTCTrackEvent&&"receiver"in i.RTCTrackEvent.prototype&&!("transceiver"in i.RTCTrackEvent.prototype)&&Object.defineProperty(i.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Fu(i){let t=i.RTCPeerConnection.prototype.createOffer;i.RTCPeerConnection.prototype.createOffer=function(n){if(n){typeof n.offerToReceiveAudio<"u"&&(n.offerToReceiveAudio=!!n.offerToReceiveAudio);let s=this.getTransceivers().find(a=>a.receiver.track.kind==="audio");n.offerToReceiveAudio===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):n.offerToReceiveAudio===!0&&!s&&this.addTransceiver("audio",{direction:"recvonly"}),typeof n.offerToReceiveVideo<"u"&&(n.offerToReceiveVideo=!!n.offerToReceiveVideo);let r=this.getTransceivers().find(a=>a.receiver.track.kind==="video");n.offerToReceiveVideo===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):n.offerToReceiveVideo===!0&&!r&&this.addTransceiver("video",{direction:"recvonly"})}return t.apply(this,arguments)}}function Ou(i){typeof i!="object"||i.AudioContext||(i.AudioContext=i.webkitAudioContext)}var Hu={};_r(Hu,{removeExtmapAllowMixed:()=>cl,shimAddIceCandidateNullOrEmpty:()=>ba,shimConnectionState:()=>ol,shimMaxMessageSize:()=>va,shimParameterlessSetLocalDescription:()=>Ma,shimRTCIceCandidate:()=>_a,shimRTCIceCandidateRelayProtocol:()=>al,shimSendThrowTypeError:()=>ya});var cr=Td(zu());function _a(i){if(!i.RTCIceCandidate||i.RTCIceCandidate&&"foundation"in i.RTCIceCandidate.prototype)return;let t=i.RTCIceCandidate;i.RTCIceCandidate=function(n){if(typeof n=="object"&&n.candidate&&n.candidate.indexOf("a=")===0&&(n=JSON.parse(JSON.stringify(n)),n.candidate=n.candidate.substring(2)),n.candidate&&n.candidate.length){let s=new t(n),r=cr.default.parseCandidate(n.candidate);for(let a in r)a in s||Object.defineProperty(s,a,{value:r[a]});return s.toJSON=function(){return{candidate:s.candidate,sdpMid:s.sdpMid,sdpMLineIndex:s.sdpMLineIndex,usernameFragment:s.usernameFragment}},s}return new t(n)},i.RTCIceCandidate.prototype=t.prototype,ai(i,"icecandidate",e=>(e.candidate&&Object.defineProperty(e,"candidate",{value:new i.RTCIceCandidate(e.candidate),writable:"false"}),e))}function al(i){!i.RTCIceCandidate||i.RTCIceCandidate&&"relayProtocol"in i.RTCIceCandidate.prototype||ai(i,"icecandidate",t=>{if(t.candidate){let e=cr.default.parseCandidate(t.candidate.candidate);e.type==="relay"&&(t.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[e.priority>>24])}return t})}function va(i,t){if(!i.RTCPeerConnection||t.browser==="chrome"&&t.version>102||t.browser==="firefox"&&t.version>=113)return;"sctp"in i.RTCPeerConnection.prototype||Object.defineProperty(i.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});let e=function(o){if(!o||!o.sdp)return!1;let c=cr.default.splitSections(o.sdp);return c.shift(),c.some(l=>{let h=cr.default.parseMLine(l);return h&&h.kind==="application"&&h.protocol.indexOf("SCTP")!==-1})},n=function(o){let c=o.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;let l=parseInt(c[1],10);return l!==l?-1:l},s=function(o){let c=65536;return t.browser==="firefox"&&(t.version<57?o===-1?c=16384:c=2147483637:t.version<60?c=t.version===57?65535:65536:c=2147483637),c},r=function(o,c){let l=65536;t.browser==="firefox"&&t.version===57&&(l=65535);let h=cr.default.matchPrefix(o.sdp,"a=max-message-size:");return h.length>0?l=parseInt(h[0].substring(19),10):t.browser==="firefox"&&c!==-1&&(l=2147483637),l},a=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,t.browser==="chrome"&&t.version>=76){let{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(e(arguments[0])){let c=n(arguments[0]),l=s(c),h=r(arguments[0],c),d;l===0&&h===0?d=Number.POSITIVE_INFINITY:l===0||h===0?d=Math.max(l,h):d=Math.min(l,h);let u={};Object.defineProperty(u,"maxMessageSize",{get(){return d}}),this._sctp=u}return a.apply(this,arguments)}}function ya(i,t){if(!(i.RTCPeerConnection&&"createDataChannel"in i.RTCPeerConnection.prototype)||t.browser==="chrome"&&t.version>=149||t.browser==="firefox"&&t.version>60)return;function e(s,r){let a=s.send;s.send=function(){let c=arguments[0],l=c.length||c.size||c.byteLength;if(s.readyState==="open"&&r.sctp&&l>r.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+r.sctp.maxMessageSize+" bytes)");return a.apply(s,arguments)}}let n=i.RTCPeerConnection.prototype.createDataChannel;i.RTCPeerConnection.prototype.createDataChannel=function(){let r=n.apply(this,arguments);return e(r,this),r},ai(i,"datachannel",s=>(e(s.channel,s.target),s))}function ol(i){if(!i.RTCPeerConnection||"connectionState"in i.RTCPeerConnection.prototype)return;let t=i.RTCPeerConnection.prototype;Object.defineProperty(t,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(t,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(e){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),e&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=e)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(e=>{let n=t[e];t[e]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=s=>{let r=s.target;if(r._lastConnectionState!==r.connectionState){r._lastConnectionState=r.connectionState;let a=new Event("connectionstatechange",s);r.dispatchEvent(a)}return s},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),n.apply(this,arguments)}})}function cl(i,t){if(!i.RTCPeerConnection||t.browser==="chrome"&&t.version>=71||t.browser==="safari"&&t._safariVersion>=13.1)return;let e=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(s){if(s&&s.sdp&&s.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){let r=s.sdp.split(`
`).filter(a=>a.trim()!=="a=extmap-allow-mixed").join(`
`);i.RTCSessionDescription&&s instanceof i.RTCSessionDescription?arguments[0]=new i.RTCSessionDescription({type:s.type,sdp:r}):s.sdp=r}return e.apply(this,arguments)}}function ba(i,t){if(!(i.RTCPeerConnection&&i.RTCPeerConnection.prototype))return;let e=i.RTCPeerConnection.prototype.addIceCandidate;!e||e.length===0||(i.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(t.browser==="chrome"&&t.version<78||t.browser==="firefox"&&t.version<68||t.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():e.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function Ma(i,t){if(!(i.RTCPeerConnection&&i.RTCPeerConnection.prototype))return;let e=i.RTCPeerConnection.prototype.setLocalDescription;!e||e.length===0||(i.RTCPeerConnection.prototype.setLocalDescription=function(){let s=arguments[0]||{};if(typeof s!="object"||s.type&&s.sdp)return e.apply(this,arguments);if(s={type:s.type,sdp:s.sdp},!s.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":s.type="offer";break;default:s.type="answer";break}return s.sdp||s.type!=="offer"&&s.type!=="answer"?e.apply(this,[s]):(s.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(a=>e.apply(this,[a]))})}var ib=Td(zu());function a0({window:i}={},t={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){let e=xa,n=e0(i),s={browserDetails:n,commonShim:Hu,extractVersion:ar,disableLog:Qp,disableWarnings:t0,sdp:ib};switch(n.browser){case"chrome":if(!el||!tl||!t.shimChrome)return e("Chrome shim is not included in this adapter release."),s;if(n.version===null)return e("Chrome shim can not determine version, not shimming."),s;e("adapter.js shimming chrome."),s.browserShim=el,ba(i,n),Ma(i,n),Qc(i,n),mu(i,n),tl(i,n),gu(i,n),vu(i,n),xu(i,n),_u(i,n),yu(i,n),_a(i,n),al(i,n),ol(i,n),va(i,n),ya(i,n),cl(i,n);break;case"firefox":if(!sl||!il||!t.shimFirefox)return e("Firefox shim is not included in this adapter release."),s;e("adapter.js shimming firefox."),s.browserShim=sl,ba(i,n),Ma(i,n),nl(i,n),il(i,n),Mu(i,n),bu(i,n),wu(i,n),Su(i,n),Tu(i,n),Eu(i,n),Au(i,n),Cu(i,n),Ru(i,n),Pu(i,n),_a(i,n),ol(i,n),va(i,n),ya(i,n);break;case"safari":if(!rl||!t.shimSafari)return e("Safari shim is not included in this adapter release."),s;e("adapter.js shimming safari."),s.browserShim=rl,ba(i,n),Ma(i,n),Nu(i,n),Fu(i,n),Du(i,n),Iu(i,n),Lu(i,n),Uu(i,n),ku(i,n),Ou(i,n),_a(i,n),al(i,n),va(i,n),ya(i,n),cl(i,n);break;default:e("Unsupported browser!");break}return s}var sb=a0({window:typeof window>"u"?void 0:window}),Gu=sb;function gs(i,t,e,n){Object.defineProperty(i,t,{get:e,set:n,enumerable:!0,configurable:!0})}var hl=class{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=t=>{let e=[],n=t.byteLength,s=Math.ceil(n/this.chunkedMTU),r=0,a=0;for(;a<n;){let o=Math.min(n,a+this.chunkedMTU),c=t.slice(a,o),l={__peerData:this._dataCount,n:r,data:c,total:s};e.push(l),a=o,r++}return this._dataCount++,e}}};function rb(i){let t=0;for(let s of i)t+=s.byteLength;let e=new Uint8Array(t),n=0;for(let s of i)e.set(s,n),n+=s.byteLength;return e}var Vu=Gu.default||Gu,Sa=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){let i=this.getBrowser(),t=this.getVersion();return this.supportedBrowsers.includes(i)?i==="chrome"?t>=this.minChromeVersion:i==="firefox"?t>=this.minFirefoxVersion:i==="safari"?!this.isIOS&&t>=this.minSafariVersion:!1:!1}getBrowser(){return Vu.browserDetails.browser}getVersion(){return Vu.browserDetails.version||0}isUnifiedPlanSupported(){let i=this.getBrowser(),t=Vu.browserDetails.version||0;if(i==="chrome"&&t<this.minChromeVersion)return!1;if(i==="firefox"&&t>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let e,n=!1;try{e=new RTCPeerConnection,e.addTransceiver("audio"),n=!0}catch{}finally{e&&e.close()}return n}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},ab=i=>!i||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(i),c0=()=>Math.random().toString(36).slice(2),o0={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"},Wu=class extends hl{noop(){}blobToArrayBuffer(t,e){let n=new FileReader;return n.onload=function(s){s.target&&e(s.target.result)},n.readAsArrayBuffer(t),n}binaryStringToArrayBuffer(t){let e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n)&255;return e.buffer}isSecure(){return location.protocol==="https:"}constructor(...t){super(...t),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=o0,this.browser=Sa.getBrowser(),this.browserVersion=Sa.getVersion(),this.pack=uu,this.unpack=hu,this.supports=(function(){let e={browser:Sa.isBrowserSupported(),webRTC:Sa.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!e.webRTC)return e;let n;try{n=new RTCPeerConnection(o0),e.audioVideo=!0;let s;try{s=n.createDataChannel("_PEERJSTEST",{ordered:!0}),e.data=!0,e.reliable=!!s.ordered;try{s.binaryType="blob",e.binaryBlob=!Sa.isIOS}catch{}}catch{}finally{s&&s.close()}}catch{}finally{n&&n.close()}return e})(),this.validateId=ab,this.randomToken=c0}},vn=new Wu,ob="PeerJS: ";var Xu=class{get logLevel(){return this._logLevel}set logLevel(t){this._logLevel=t}log(...t){this._logLevel>=3&&this._print(3,...t)}warn(...t){this._logLevel>=2&&this._print(2,...t)}error(...t){this._logLevel>=1&&this._print(1,...t)}setLogFunction(t){this._print=t}_print(t,...e){let n=[ob,...e];for(let s in n)n[s]instanceof Error&&(n[s]="("+n[s].name+") "+n[s].message);t>=3?console.log(...n):t>=2?console.warn("WARNING",...n):t>=1&&console.error("ERROR",...n)}constructor(){this._logLevel=0}},Tt=new Xu,nd={},cb=Object.prototype.hasOwnProperty,dn="~";function Aa(){}Object.create&&(Aa.prototype=Object.create(null),new Aa().__proto__||(dn=!1));function lb(i,t,e){this.fn=i,this.context=t,this.once=e||!1}function l0(i,t,e,n,s){if(typeof e!="function")throw new TypeError("The listener must be a function");var r=new lb(e,n||i,s),a=dn?dn+t:t;return i._events[a]?i._events[a].fn?i._events[a]=[i._events[a],r]:i._events[a].push(r):(i._events[a]=r,i._eventsCount++),i}function ll(i,t){--i._eventsCount===0?i._events=new Aa:delete i._events[t]}function cn(){this._events=new Aa,this._eventsCount=0}cn.prototype.eventNames=function(){var t=[],e,n;if(this._eventsCount===0)return t;for(n in e=this._events)cb.call(e,n)&&t.push(dn?n.slice(1):n);return Object.getOwnPropertySymbols?t.concat(Object.getOwnPropertySymbols(e)):t};cn.prototype.listeners=function(t){var e=dn?dn+t:t,n=this._events[e];if(!n)return[];if(n.fn)return[n.fn];for(var s=0,r=n.length,a=new Array(r);s<r;s++)a[s]=n[s].fn;return a};cn.prototype.listenerCount=function(t){var e=dn?dn+t:t,n=this._events[e];return n?n.fn?1:n.length:0};cn.prototype.emit=function(t,e,n,s,r,a){var o=dn?dn+t:t;if(!this._events[o])return!1;var c=this._events[o],l=arguments.length,h,d;if(c.fn){switch(c.once&&this.removeListener(t,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,e),!0;case 3:return c.fn.call(c.context,e,n),!0;case 4:return c.fn.call(c.context,e,n,s),!0;case 5:return c.fn.call(c.context,e,n,s,r),!0;case 6:return c.fn.call(c.context,e,n,s,r,a),!0}for(d=1,h=new Array(l-1);d<l;d++)h[d-1]=arguments[d];c.fn.apply(c.context,h)}else{var u=c.length,f;for(d=0;d<u;d++)switch(c[d].once&&this.removeListener(t,c[d].fn,void 0,!0),l){case 1:c[d].fn.call(c[d].context);break;case 2:c[d].fn.call(c[d].context,e);break;case 3:c[d].fn.call(c[d].context,e,n);break;case 4:c[d].fn.call(c[d].context,e,n,s);break;default:if(!h)for(f=1,h=new Array(l-1);f<l;f++)h[f-1]=arguments[f];c[d].fn.apply(c[d].context,h)}}return!0};cn.prototype.on=function(t,e,n){return l0(this,t,e,n,!1)};cn.prototype.once=function(t,e,n){return l0(this,t,e,n,!0)};cn.prototype.removeListener=function(t,e,n,s){var r=dn?dn+t:t;if(!this._events[r])return this;if(!e)return ll(this,r),this;var a=this._events[r];if(a.fn)a.fn===e&&(!s||a.once)&&(!n||a.context===n)&&ll(this,r);else{for(var o=0,c=[],l=a.length;o<l;o++)(a[o].fn!==e||s&&!a[o].once||n&&a[o].context!==n)&&c.push(a[o]);c.length?this._events[r]=c.length===1?c[0]:c:ll(this,r)}return this};cn.prototype.removeAllListeners=function(t){var e;return t?(e=dn?dn+t:t,this._events[e]&&ll(this,e)):(this._events=new Aa,this._eventsCount=0),this};cn.prototype.off=cn.prototype.removeListener;cn.prototype.addListener=cn.prototype.on;cn.prefixed=dn;cn.EventEmitter=cn;nd=cn;var xs={};gs(xs,"ConnectionType",()=>Ji);gs(xs,"PeerErrorType",()=>Ue);gs(xs,"BaseConnectionErrorType",()=>qu);gs(xs,"DataConnectionErrorType",()=>id);gs(xs,"SerializationType",()=>gl);gs(xs,"SocketEventType",()=>Yi);gs(xs,"ServerMessageType",()=>on);var Ji=(function(i){return i.Data="data",i.Media="media",i})({}),Ue=(function(i){return i.BrowserIncompatible="browser-incompatible",i.Disconnected="disconnected",i.InvalidID="invalid-id",i.InvalidKey="invalid-key",i.Network="network",i.PeerUnavailable="peer-unavailable",i.SslUnavailable="ssl-unavailable",i.ServerError="server-error",i.SocketError="socket-error",i.SocketClosed="socket-closed",i.UnavailableID="unavailable-id",i.WebRTC="webrtc",i})({}),qu=(function(i){return i.NegotiationFailed="negotiation-failed",i.ConnectionClosed="connection-closed",i})({}),id=(function(i){return i.NotOpenYet="not-open-yet",i.MessageToBig="message-too-big",i})({}),gl=(function(i){return i.Binary="binary",i.BinaryUTF8="binary-utf8",i.JSON="json",i.None="raw",i})({}),Yi=(function(i){return i.Message="message",i.Disconnected="disconnected",i.Error="error",i.Close="close",i})({}),on=(function(i){return i.Heartbeat="HEARTBEAT",i.Candidate="CANDIDATE",i.Offer="OFFER",i.Answer="ANSWER",i.Open="OPEN",i.Error="ERROR",i.IdTaken="ID-TAKEN",i.InvalidKey="INVALID-KEY",i.Leave="LEAVE",i.Expire="EXPIRE",i})({}),h0="1.5.5",$u=class extends nd.EventEmitter{constructor(t,e,n,s,r,a=5e3){super(),this.pingInterval=a,this._disconnected=!0,this._messagesQueue=[];let o=t?"wss://":"ws://";this._baseUrl=o+e+":"+n+s+"peerjs?key="+r}start(t,e){this._id=t;let n=`${this._baseUrl}&id=${t}&token=${e}`;this._socket||!this._disconnected||(this._socket=new WebSocket(n+"&version="+h0),this._disconnected=!1,this._socket.onmessage=s=>{let r;try{r=JSON.parse(s.data),Tt.log("Server message received:",r)}catch{Tt.log("Invalid server message",s.data);return}this.emit(Yi.Message,r)},this._socket.onclose=s=>{this._disconnected||(Tt.log("Socket closed.",s),this._cleanup(),this._disconnected=!0,this.emit(Yi.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),Tt.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){Tt.log("Cannot send heartbeat, because socket closed");return}let t=JSON.stringify({type:on.Heartbeat});this._socket.send(t),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){let t=[...this._messagesQueue];this._messagesQueue=[];for(let e of t)this.send(e)}send(t){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(t);return}if(!t.type){this.emit(Yi.Error,"Invalid message");return}if(!this._wsOpen())return;let e=JSON.stringify(t);this._socket.send(e)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}},ul=class{constructor(t){this.connection=t}startConnection(t){let e=this._startPeerConnection();if(this.connection.peerConnection=e,this.connection.type===Ji.Media&&t._stream&&this._addTracksToConnection(t._stream,e),t.originator){let n=this.connection,s={ordered:!!t.reliable},r=e.createDataChannel(n.label,s);n._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",t.sdp)}_startPeerConnection(){Tt.log("Creating RTCPeerConnection.");let t=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(t),t}_setupListeners(t){let e=this.connection.peer,n=this.connection.connectionId,s=this.connection.type,r=this.connection.provider;Tt.log("Listening for ICE candidates."),t.onicecandidate=a=>{!a.candidate||!a.candidate.candidate||(Tt.log(`Received ICE candidates for ${e}:`,a.candidate),r.socket.send({type:on.Candidate,payload:{candidate:a.candidate,type:s,connectionId:n},dst:e}))},t.oniceconnectionstatechange=()=>{switch(t.iceConnectionState){case"failed":Tt.log("iceConnectionState is failed, closing connections to "+e),this.connection.emitError(qu.NegotiationFailed,"Negotiation of connection to "+e+" failed."),this.connection.close();break;case"closed":Tt.log("iceConnectionState is closed, closing connections to "+e),this.connection.emitError(qu.ConnectionClosed,"Connection to "+e+" closed."),this.connection.close();break;case"disconnected":Tt.log("iceConnectionState changed to disconnected on the connection with "+e);break;case"completed":t.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",t.iceConnectionState)},Tt.log("Listening for data channel"),t.ondatachannel=a=>{Tt.log("Received data channel");let o=a.channel;r.getConnection(e,n)._initializeDataChannel(o)},Tt.log("Listening for remote stream"),t.ontrack=a=>{Tt.log("Received remote stream");let o=a.streams[0],c=r.getConnection(e,n);if(c.type===Ji.Media){let l=c;this._addStreamToMediaConnection(o,l)}}}cleanup(){Tt.log("Cleaning up PeerConnection to "+this.connection.peer);let t=this.connection.peerConnection;if(!t)return;this.connection.peerConnection=null,t.onicecandidate=t.oniceconnectionstatechange=t.ondatachannel=t.ontrack=()=>{};let e=t.signalingState!=="closed",n=!1,s=this.connection.dataChannel;s&&(n=!!s.readyState&&s.readyState!=="closed"),(e||n)&&t.close()}async _makeOffer(){let t=this.connection.peerConnection,e=this.connection.provider;try{let n=await t.createOffer(this.connection.options.constraints);Tt.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await t.setLocalDescription(n),Tt.log("Set localDescription:",n,`for:${this.connection.peer}`);let s={sdp:n,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===Ji.Data){let r=this.connection;s={...s,label:r.label,reliable:r.reliable,serialization:r.serialization}}e.socket.send({type:on.Offer,payload:s,dst:this.connection.peer})}catch(s){s!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(e.emitError(Ue.WebRTC,s),Tt.log("Failed to setLocalDescription, ",s))}}catch(n){e.emitError(Ue.WebRTC,n),Tt.log("Failed to createOffer, ",n)}}async _makeAnswer(){let t=this.connection.peerConnection,e=this.connection.provider;try{let n=await t.createAnswer();Tt.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await t.setLocalDescription(n),Tt.log("Set localDescription:",n,`for:${this.connection.peer}`),e.socket.send({type:on.Answer,payload:{sdp:n,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(s){e.emitError(Ue.WebRTC,s),Tt.log("Failed to setLocalDescription, ",s)}}catch(n){e.emitError(Ue.WebRTC,n),Tt.log("Failed to create answer, ",n)}}async handleSDP(t,e){e=new RTCSessionDescription(e);let n=this.connection.peerConnection,s=this.connection.provider;Tt.log("Setting remote description",e);let r=this;try{await n.setRemoteDescription(e),Tt.log(`Set remoteDescription:${t} for:${this.connection.peer}`),t==="OFFER"&&await r._makeAnswer()}catch(a){s.emitError(Ue.WebRTC,a),Tt.log("Failed to setRemoteDescription, ",a)}}async handleCandidate(t){Tt.log("handleCandidate:",t);try{await this.connection.peerConnection.addIceCandidate(t),Tt.log(`Added ICE candidate for:${this.connection.peer}`)}catch(e){this.connection.provider.emitError(Ue.WebRTC,e),Tt.log("Failed to handleCandidate, ",e)}}_addTracksToConnection(t,e){if(Tt.log(`add tracks from stream ${t.id} to peer connection`),!e.addTrack)return Tt.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");t.getTracks().forEach(n=>{e.addTrack(n,t)})}_addStreamToMediaConnection(t,e){Tt.log(`add stream ${t.id} to media connection ${e.connectionId}`),e.addStream(t)}},dl=class extends nd.EventEmitter{emitError(t,e){Tt.error("Error:",e),this.emit("error",new Yu(`${t}`,e))}},Yu=class extends Error{constructor(t,e){typeof e=="string"?super(e):(super(),Object.assign(this,e)),this.type=t}},fl=class extends dl{get open(){return this._open}constructor(t,e,n){super(),this.peer=t,this.provider=e,this.options=n,this._open=!1,this.metadata=n.metadata}},ju,wa=class wa extends fl{get type(){return Ji.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(t,e,n){super(t,e,n),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||wa.ID_PREFIX+vn.randomToken(),this._negotiator=new ul(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(t){this.dataChannel=t,this.dataChannel.onopen=()=>{Tt.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{Tt.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(t){Tt.log("Receiving stream",t),this._remoteStream=t,super.emit("stream",t)}handleMessage(t){let e=t.type,n=t.payload;switch(t.type){case on.Answer:this._negotiator.handleSDP(e,n.sdp),this._open=!0;break;case on.Candidate:this._negotiator.handleCandidate(n.candidate);break;default:Tt.warn(`Unrecognized message type:${e} from peer:${this.peer}`);break}}answer(t,e={}){if(this._localStream){Tt.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=t,e&&e.sdpTransform&&(this.options.sdpTransform=e.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:t});let n=this.provider._getMessages(this.connectionId);for(let s of n)this.handleMessage(s);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};ju=new WeakMap,vr(wa,ju,wa.ID_PREFIX="mc_");var pl=wa,Ju=class{constructor(t){this._options=t}_buildRequest(t){let e=this._options.secure?"https":"http",{host:n,port:s,path:r,key:a}=this._options,o=new URL(`${e}://${n}:${s}${r}${a}/${t}`);return o.searchParams.set("ts",`${Date.now()}${Math.random()}`),o.searchParams.set("version",h0),fetch(o.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{let t=await this._buildRequest("id");if(t.status!==200)throw new Error(`Error. Status:${t.status}`);return t.text()}catch(t){Tt.error("Error retrieving ID",t);let e="";throw this._options.path==="/"&&this._options.host!==vn.CLOUD_HOST&&(e=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+e)}}async listAllPeers(){try{let t=await this._buildRequest("peers");if(t.status!==200){if(t.status===401){let e="";throw this._options.host===vn.CLOUD_HOST?e="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":e="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+e)}throw new Error(`Error. Status:${t.status}`)}return t.json()}catch(t){throw Tt.error("Error retrieving list peers",t),new Error("Could not get list peers from the server."+t)}}},Qu,td,ms=class ms extends fl{get type(){return Ji.Data}constructor(t,e,n){super(t,e,n),this.connectionId=this.options.connectionId||ms.ID_PREFIX+c0(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new ul(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(t){this.dataChannel=t,this.dataChannel.onopen=()=>{Tt.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=e=>{Tt.log(`DC#${this.connectionId} dc onmessage:`,e.data)},this.dataChannel.onclose=()=>{Tt.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(t){if(t?.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(t,e=!1){if(!this.open){this.emitError(id.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(t,e)}async handleMessage(t){let e=t.payload;switch(t.type){case on.Answer:await this._negotiator.handleSDP(t.type,e.sdp);break;case on.Candidate:await this._negotiator.handleCandidate(e.candidate);break;default:Tt.warn("Unrecognized message type:",t.type,"from peer:",this.peer);break}}};Qu=new WeakMap,td=new WeakMap,vr(ms,Qu,ms.ID_PREFIX="dc_"),vr(ms,td,ms.MAX_BUFFERED_AMOUNT=8388608);var ml=ms,Ca=class extends ml{get bufferSize(){return this._bufferSize}_initializeDataChannel(t){super._initializeDataChannel(t),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",e=>this._handleDataMessage(e))}_bufferedSend(t){(this._buffering||!this._trySend(t))&&(this._buffer.push(t),this._bufferSize=this._buffer.length)}_trySend(t){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>ml.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(t)}catch(e){return Tt.error(`DC#:${this.connectionId} Error when sending:`,e),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;let t=this._buffer[0];this._trySend(t)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(t){if(t?.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...t){super(...t),this._buffer=[],this._bufferSize=0,this._buffering=!1}},Ta=class extends Ca{close(t){super.close(t),this._chunkedData={}}constructor(t,e,n){super(t,e,n),this.chunker=new hl,this.serialization=gl.Binary,this._chunkedData={}}_handleDataMessage({data:t}){let e=hu(t),n=e.__peerData;if(n){if(n.type==="close"){this.close();return}this._handleChunk(e);return}this.emit("data",e)}_handleChunk(t){let e=t.__peerData,n=this._chunkedData[e]||{data:[],count:0,total:t.total};if(n.data[t.n]=new Uint8Array(t.data),n.count++,this._chunkedData[e]=n,n.total===n.count){delete this._chunkedData[e];let s=rb(n.data);this._handleDataMessage({data:s})}}_send(t,e){let n=uu(t);if(n instanceof Promise)return this._send_blob(n);if(!e&&n.byteLength>this.chunker.chunkedMTU){this._sendChunks(n);return}this._bufferedSend(n)}async _send_blob(t){let e=await t;if(e.byteLength>this.chunker.chunkedMTU){this._sendChunks(e);return}this._bufferedSend(e)}_sendChunks(t){let e=this.chunker.chunk(t);Tt.log(`DC#${this.connectionId} Try to send ${e.length} chunks...`);for(let n of e)this.send(n,!0)}},Ku=class extends Ca{_handleDataMessage({data:t}){super.emit("data",t)}_send(t,e){this._bufferedSend(t)}constructor(...t){super(...t),this.serialization=gl.None}},Zu=class extends Ca{_handleDataMessage({data:t}){let e=this.parse(this.decoder.decode(t)),n=e.__peerData;if(n&&n.type==="close"){this.close();return}this.emit("data",e)}_send(t,e){let n=this.encoder.encode(this.stringify(t));if(n.byteLength>=vn.chunkedMTU){this.emitError(id.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(n)}constructor(...t){super(...t),this.serialization=gl.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}};var ed,Ea=class Ea extends dl{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){let t=Object.create(null);for(let[e,n]of this._connections)t[e]=n;return t}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(t,e){super(),this._serializers={raw:Ku,json:Zu,binary:Ta,"binary-utf8":Ta,default:Ta},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let n;if(t&&t.constructor==Object?e=t:t&&(n=t.toString()),e={debug:0,host:vn.CLOUD_HOST,port:vn.CLOUD_PORT,path:"/",key:Ea.DEFAULT_KEY,token:vn.randomToken(),config:vn.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...e},this._options=e,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==vn.CLOUD_HOST?this._options.secure=vn.isSecure():this._options.host==vn.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&Tt.setLogFunction(this._options.logFunction),Tt.logLevel=this._options.debug||0,this._api=new Ju(e),this._socket=this._createServerConnection(),!vn.supports.audioVideo&&!vn.supports.data){this._delayedAbort(Ue.BrowserIncompatible,"The current browser does not support WebRTC");return}if(n&&!vn.validateId(n)){this._delayedAbort(Ue.InvalidID,`ID "${n}" is invalid`);return}n?this._initialize(n):this._api.retrieveId().then(s=>this._initialize(s)).catch(s=>this._abort(Ue.ServerError,s))}_createServerConnection(){let t=new $u(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return t.on(Yi.Message,e=>{this._handleMessage(e)}),t.on(Yi.Error,e=>{this._abort(Ue.SocketError,e)}),t.on(Yi.Disconnected,()=>{this.disconnected||(this.emitError(Ue.Network,"Lost connection to server."),this.disconnect())}),t.on(Yi.Close,()=>{this.disconnected||this._abort(Ue.SocketClosed,"Underlying socket is already closed.")}),t}_initialize(t){this._id=t,this.socket.start(t,this._options.token)}_handleMessage(t){let e=t.type,n=t.payload,s=t.src;switch(e){case on.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case on.Error:this._abort(Ue.ServerError,n.msg);break;case on.IdTaken:this._abort(Ue.UnavailableID,`ID "${this.id}" is taken`);break;case on.InvalidKey:this._abort(Ue.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case on.Leave:Tt.log(`Received leave message from ${s}`),this._cleanupPeer(s),this._connections.delete(s);break;case on.Expire:this.emitError(Ue.PeerUnavailable,`Could not connect to peer ${s}`);break;case on.Offer:{let r=n.connectionId,a=this.getConnection(s,r);if(a&&(a.close(),Tt.warn(`Offer received for existing Connection ID:${r}`)),n.type===Ji.Media){let c=new pl(s,this,{connectionId:r,_payload:n,metadata:n.metadata});a=c,this._addConnection(s,a),this.emit("call",c)}else if(n.type===Ji.Data){let c=new this._serializers[n.serialization](s,this,{connectionId:r,_payload:n,metadata:n.metadata,label:n.label,serialization:n.serialization,reliable:n.reliable});a=c,this._addConnection(s,a),this.emit("connection",c)}else{Tt.warn(`Received malformed connection type:${n.type}`);return}let o=this._getMessages(r);for(let c of o)a.handleMessage(c);break}default:{if(!n){Tt.warn(`You received a malformed message from ${s} of type ${e}`);return}let r=n.connectionId,a=this.getConnection(s,r);a&&a.peerConnection?a.handleMessage(t):r?this._storeMessage(r,t):Tt.warn("You received an unrecognized message:",t);break}}}_storeMessage(t,e){this._lostMessages.has(t)||this._lostMessages.set(t,[]),this._lostMessages.get(t).push(e)}_getMessages(t){let e=this._lostMessages.get(t);return e?(this._lostMessages.delete(t),e):[]}connect(t,e={}){if(e={serialization:"default",...e},this.disconnected){Tt.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(Ue.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}let n=new this._serializers[e.serialization](t,this,e);return this._addConnection(t,n),n}call(t,e,n={}){if(this.disconnected){Tt.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(Ue.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!e){Tt.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}let s=new pl(t,this,{...n,_stream:e});return this._addConnection(t,s),s}_addConnection(t,e){Tt.log(`add connection ${e.type}:${e.connectionId} to peerId:${t}`),this._connections.has(t)||this._connections.set(t,[]),this._connections.get(t).push(e)}_removeConnection(t){let e=this._connections.get(t.peer);if(e){let n=e.indexOf(t);n!==-1&&e.splice(n,1)}this._lostMessages.delete(t.connectionId)}getConnection(t,e){let n=this._connections.get(t);if(!n)return null;for(let s of n)if(s.connectionId===e)return s;return null}_delayedAbort(t,e){setTimeout(()=>{this._abort(t,e)},0)}_abort(t,e){Tt.error("Aborting!"),this.emitError(t,e),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(Tt.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(let t of this._connections.keys())this._cleanupPeer(t),this._connections.delete(t);this.socket.removeAllListeners()}_cleanupPeer(t){let e=this._connections.get(t);if(e)for(let n of e)n.close()}disconnect(){if(this.disconnected)return;let t=this.id;Tt.log(`Disconnect peer with ID:${t}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=t,this._id=null,this.emit("disconnected",t)}reconnect(){if(this.disconnected&&!this.destroyed)Tt.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)Tt.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(t=e=>{}){this._api.listAllPeers().then(e=>t(e)).catch(e=>this._abort(Ue.ServerError,e))}};ed=new WeakMap,vr(Ea,ed,Ea.DEFAULT_KEY="peerjs");var Ra=Ea;var xl=Ra;var u0=Ra||xl&&(xl.Peer||xl),sd="ACDEFHJKMNPRTUWXY347",lr=4;function ub(){let i="",t=new Uint32Array(6);crypto.getRandomValues(t);for(let e=0;e<6;e++)i+=sd[t[e]%sd.length];return i}function rd(i){return(i||"").toUpperCase().split("").filter(t=>sd.includes(t)).join("").slice(0,6)}var Ia=i=>i.slice(0,3)+" "+i.slice(3);function db(i){return function(){i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var fb=i=>typeof i=="number"?Math.round(i*1e3)/1e3:i,d0=9e3,Pa=class{constructor(t){this.app=t,this.role=null,this.status="idle",this.error="",this.code="",this.peer=null,this.members=[],this.conns=new Map,this.hostConn=null,this.cfg={track:"meadow",laps:3,items:!0,cpu:!0},this.myPid=0,this.onChange=()=>{},this.race=null,this.players=null,this.myId=0,this.rnd=Math.random,this.profile=null,this.timer=null,this.link={send:(e,n)=>this.send(e,n)},this.loadedSet=new Set,this.goResolve=null,this.stats={sent:0,recv:0,rtt:0},this.starting=!1,this.closed=!1}_change(){try{this.onChange(this)}catch(t){console.warn(t)}}_fail(t){this.status="error",this.error=t,this._change()}host(t,e=0){this.role="host",this.profile=t,this.status="connecting",this.error="",this.code=ub(),this.myPid=0,this._change(),this.members=[{pid:0,name:t.name,build:t.build,ready:!0}];let n;try{n=new u0("sdgp-"+this.code,{debug:0})}catch(r){return this._fail("WebRTC unavailable: "+r.message)}this.peer=n;let s=setTimeout(()=>{this.status==="connecting"&&this._fail("Could not reach the PeerJS signalling server (timeout).")},d0);n.on("open",()=>{clearTimeout(s),this.status="open",this._change()}),n.on("error",r=>{if(clearTimeout(s),r.type==="unavailable-id"&&e<5){try{n.destroy()}catch{}return this.host(t,e+1)}this.status!=="open"?this._fail("Signalling error: "+r.type):console.warn("peer error",r.type)}),n.on("disconnected",()=>{try{n.reconnect()}catch{}}),n.on("connection",r=>{r.on("open",()=>{if(this.members.length>=lr||this.starting){r.send({t:"full"}),setTimeout(()=>r.close(),300);return}}),r.on("data",a=>this._hostMsg(r,a)),r.on("close",()=>this._hostDrop(r)),r.on("error",()=>this._hostDrop(r))})}_pidOf(t){for(let[e,n]of this.conns)if(n===t)return e;return-1}_hostMsg(t,e){switch(this.stats.recv++,e.t){case"hello":{if(this._pidOf(t)>=0||this.members.length>=lr||this.starting)return;let n=1;for(;this.members.some(s=>s.pid===n);)n++;this.conns.set(n,t),this.members.push({pid:n,name:e.name,build:e.build,ready:!1}),this.app.ui&&this.app.ui("lobby_join"),this._lobbyBroadcast();break}case"ready":{let n=this._pidOf(t),s=this.members.find(r=>r.pid===n);s&&(s.ready=!!e.v,this.app.ui&&this.app.ui("lobby_ready"),this._lobbyBroadcast());break}case"profile":{let n=this._pidOf(t),s=this.members.find(r=>r.pid===n);s&&(s.name=e.name,s.build=e.build,this._lobbyBroadcast());break}case"loaded":{this.loadedSet.add(this._pidOf(t)),this._checkGo();break}case"ping":t.send({t:"pong",ts:e.ts});break;case"k":case"use":case"box":{let n=this._pidOf(t);this._recvGame(e);for(let[s,r]of this.conns)s!==n&&r.open&&r.send(e);break}}}_hostDrop(t){let e=this._pidOf(t);if(!(e<0)){if(this.conns.delete(e),this.members=this.members.filter(n=>n.pid!==e),this.app.ui&&this.app.ui("lobby_leave"),this.race){let n=this.race.karts.find(s=>s.id===e);n&&n.remote&&(n.remote=!1,n.auth=!0,n.human=!1,n.cpu=!0,n.ai=new sr(n,this.race,.9),this.app.toast&&this.app.toast(`${n.dispName||n.name} disconnected \u2014 CPU takes over`,"#ffd23f")),this.loadedSet.delete(e),this._checkGo()}this._lobbyBroadcast()}}_lobbyBroadcast(){this._change();let t={t:"lobby",members:this.members,cfg:this.cfg};for(let[e,n]of this.conns)n.open&&n.send({...t,you:e})}setCfg(t){this.role==="host"&&(Object.assign(this.cfg,t),this._lobbyBroadcast())}join(t,e){this.role="client",this.profile=e,this.status="connecting",this.error="",this.code=t,this._change();let n;try{n=new u0({debug:0})}catch(a){return this._fail("WebRTC unavailable: "+a.message)}this.peer=n;let s=!1,r=setTimeout(()=>{s||this._fail(this.peer&&this.peer.open?"Room not reachable (NAT/firewall or wrong code).":"Could not reach the PeerJS signalling server (timeout).")},d0+4e3);n.on("error",a=>{clearTimeout(r),a.type==="peer-unavailable"?this._fail("No room with that code. Check the code and ask the host to keep the lobby open."):s?console.warn("peer error",a.type):this._fail("Signalling error: "+a.type)}),n.on("open",()=>{let a=n.connect("sdgp-"+t,{reliable:!0,serialization:"json"});this.hostConn=a,a.on("open",()=>{s=!0,clearTimeout(r),this.status="open",a.send({t:"hello",name:e.name,build:e.build}),this._ping(),this._change()}),a.on("data",o=>this._clientMsg(o)),a.on("close",()=>this._hostLost()),a.on("error",()=>this._hostLost())})}_ping(){this.closed||!this.hostConn||(this.hostConn.open&&this.hostConn.send({t:"ping",ts:performance.now()}),setTimeout(()=>this._ping(),2e3))}_hostLost(){this.closed||this.status==="lost"||(this.status="lost",this.error="The host left the room.",this._change(),this.app.onHostLost&&this.app.onHostLost(this))}_clientMsg(t){switch(this.stats.recv++,t.t){case"lobby":{let e=!this.members.length;this.members=t.members,this.cfg=t.cfg,this.myPid=t.you,this._change(),e&&this.app.ui&&this.app.ui("lobby_join");break}case"full":this._fail("That room is full (4 players max).");break;case"pong":this.stats.rtt=performance.now()-t.ts;break;case"start":this._onStart(t);break;case"go":this.goResolve&&(this.goResolve(),this.goResolve=null);break;case"k":case"use":case"box":this._recvGame(t);break}}hostStart(t,e){if(this.role!=="host"||this.starting)return!1;this.starting=!0;let n=Math.random()*2**31|0,s=this.members.map(c=>({id:c.pid,name:c.name,build:c.build,human:!0})),r=[];if(this.cfg.cpu){let c=0,l=new Set(s.map(d=>d.name)),h=e.filter(d=>!l.has(d));for(;s.length+r.length<12;)r.push({id:4+r.length,name:h[c%h.length],build:t(c+3),human:!1,cpu:!0,skill:.84+Math.random()*.15}),c++}let a=[...r,...s];for(let c=a.length-1;c>0;c--);let o={t:"start",seed:n,cfg:this.cfg,players:a};this.loadedSet=new Set;for(let[c,l]of this.conns)l.open&&l.send(o);return this._onStart(o),!0}_onStart(t){this.starting=!0,this.rnd=db(t.seed),this.myId=this.myPid,Object.assign(this.app.cfg,{track:t.cfg.track,laps:t.cfg.laps,items:t.cfg.items,mirror:!1,reverse:!1}),this.players=t.players.map(e=>e.id===this.myPid&&e.human?{...e,local:!0}:{...e,remote:!0}),this.app.mode="versus",this.goP=new Promise(e=>{this.goResolve=e}),this.app.startRace({net:this})}loaded(){this.role==="host"?(this.loadedSet.add(0),this._checkGo(),this._goTimer||(this._goTimer=setTimeout(()=>this._sendGo(),3e4))):this.hostConn&&this.hostConn.open&&this.hostConn.send({t:"loaded"})}_checkGo(){if(this.role!=="host"||!this.players||this.goSent)return;this.members.map(e=>e.pid).every(e=>this.loadedSet.has(e))&&this._sendGo()}_sendGo(){if(!this.goSent){this.goSent=!0,clearTimeout(this._goTimer);for(let[,t]of this.conns)t.open&&t.send({t:"go"});this.goResolve&&(this.goResolve(),this.goResolve=null)}}attach(t){this.race=t,clearInterval(this.timer),this.timer=setInterval(()=>{if(!this.race||this.race.state==="finished"&&!1)return;let e=[];for(let n of this.race.karts)if(n.auth){let s=this.race.snapshot(n);for(let r in s)s[r]=fb(s[r]);e.push({id:n.id,s})}e.length&&this.send("k",{a:e})},50)}detach(){clearInterval(this.timer),this.timer=null,this.race=null,this.players=null,this.starting=!1,this.goSent=!1,this.loadedSet=new Set}send(t,e){let n={t,...e};if(this.stats.sent++,this.role==="host")for(let[,s]of this.conns)s.open&&s.send(n);else this.hostConn&&this.hostConn.open&&this.hostConn.send(n)}_recvGame(t){let e=this.race;if(e){if(t.t==="k")for(let n of t.a)e.applySnapshot(n.id,n.s);else if(t.t==="use"){let n=e.karts.find(s=>s.id===t.k);if(n&&n.remote){n.item={id:t.id,n:t.id==="trio"?3:1};try{e.items.fire(n,t.id,{back:t.back,held:t.held})}catch(s){console.warn(s)}}}else if(t.t==="box"){let n=e.view.boxes[t.i];n&&n.active&&(n.active=!1,n.respawn=6)}}}ready(t){this.role==="client"&&this.hostConn&&this.hostConn.open&&this.hostConn.send({t:"ready",v:t});let e=this.members.find(n=>n.pid===this.myPid);e&&(e.ready=t),this._change()}sendProfile(t){this.profile=t,this.role==="client"&&this.hostConn&&this.hostConn.open?this.hostConn.send({t:"profile",...t}):this.role==="host"&&(this.members[0].name=t.name,this.members[0].build=t.build,this._lobbyBroadcast())}close(){this.closed=!0,this.detach();try{this.hostConn&&this.hostConn.close();for(let[,t]of this.conns)t.close();this.peer&&this.peer.destroy()}catch{}this.status="idle",this.conns.clear(),this.members=[]}};function f0(i,t){let e=i.screenEl(),n=i.ui,s=i.save,r=()=>({name:s.sel.char,build:s.builds[s.sel.body]}),a=i.net,o=p=>String(p).replace(/[&<>]/g,y=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[y]),c=`<div style="font-size:11px;color:var(--mut);margin-top:8px;line-height:1.4">Peer-to-peer over WebRTC (PeerJS broker for the handshake + Google STUN). Up to ${lr} players; CPU racers fill the grid to 12. No TURN relay, so some strict mobile/corporate networks cannot connect. Host must keep this screen open.</div>`,l=()=>{n("ui_back"),i.net&&(i.net.close(),i.net=null),i.show("menu")},h='<button class="btn blue" id="fb">Offline fallback: race 11 CPU rivals</button>',d=()=>{let p=e.querySelector("#fb");p&&(p.onclick=()=>{n("ui_confirm"),i.net&&(i.net.close(),i.net=null),i.mode="quick",i.show("setup")})};if(!a){let p=i.pendingRoom||"";e.innerHTML=`<div class="topbar"><h2>Versus \xB7 room code</h2>${i.coinsBadge?i.coinsBadge():""}</div>
    <div class="grow col scroll" style="gap:10px"><div class="panel" style="padding:14px"><b>Host a room</b><div style="font-size:12px;color:var(--mut);margin:4px 0 10px">You get a 6-character code to share with up to 3 friends.</div><button class="btn" id="host">Create room</button></div>
    <div class="panel" style="padding:14px"><b>Join a room</b><div class="row" style="margin-top:8px;gap:8px"><input id="code" maxlength="7" placeholder="ABC 123" value="${p}" autocomplete="off" autocapitalize="characters" spellcheck="false" style="flex:1;font-size:26px;font-weight:900;letter-spacing:.2em;text-align:center;text-transform:uppercase;padding:10px;border-radius:12px;border:2px solid rgba(255,255,255,.25);background:rgba(0,0,0,.35);color:#fff;min-width:0"><button class="btn blue" id="join">Join</button></div>${c}</div></div>
    <div class="row"><button class="btn ghost" id="back">Back</button></div>`,e.querySelector("#back").onclick=l,e.querySelector("#host").onclick=()=>{n("ui_confirm");let _=i.net=new Pa(i);_.onChange=()=>i.screen==="lobby"&&i.show("lobby"),_.cfg.track=i.cfg.track||"meadow",_.cfg.laps=i.cfg.laps||3,_.host(r()),i.show("lobby")};let y=()=>{let _=rd(e.querySelector("#code").value);if(_.length!==6){n("ui_error"),i.toast("Enter the 6-character code","#ff8a8a");return}n("ui_confirm");let S=i.net=new Pa(i);S.onChange=()=>i.screen==="lobby"&&i.show("lobby"),S.join(_,r()),i.show("lobby")};e.querySelector("#join").onclick=y;let w=e.querySelector("#code");w.oninput=()=>{let _=rd(w.value);w.value=_.length>3?_.slice(0,3)+" "+_.slice(3):_},p&&(i.pendingRoom="",setTimeout(y,50));return}if(a.status==="connecting"){e.innerHTML=`<div class="topbar"><h2>Versus \xB7 room code</h2></div><div class="grow row" style="justify-content:center;align-items:center"><div class="panel" style="padding:20px;text-align:center"><b>${a.role==="host"?"Opening room\u2026":"Connecting to "+Ia(a.code)+"\u2026"}</b><div style="font-size:12px;color:var(--mut);margin-top:6px">Contacting the PeerJS signalling server</div></div></div><div class="row"><button class="btn ghost" id="back">Cancel</button></div>`,e.querySelector("#back").onclick=l;return}if(a.status==="error"||a.status==="lost"){e.innerHTML=`<div class="topbar"><h2>Versus \xB7 room code</h2></div><div class="grow col" style="justify-content:center;gap:10px"><div class="panel" style="padding:16px"><b style="color:#ff8a8a">Online unavailable</b><div style="margin-top:6px;font-size:13px">${o(a.error)}</div>${c}</div>${h}</div><div class="row"><button class="btn ghost" id="back">Back</button><div class="grow"></div><button class="btn" id="retry">Try again</button></div>`,e.querySelector("#back").onclick=l,e.querySelector("#retry").onclick=()=>{n("ui_click"),i.net.close(),i.net=null,i.show("lobby")},d();return}let u=a.role==="host",f=a.cfg,g={meadow:"#6bc24a",harbor:"#2f6f8a",mesa:"#e0a65a",frost:"#cfe6ff"},x=[];for(let p=0;p<lr;p++){let y=a.members[p];x.push(y?`<div class="pl"><span class="dot" style="background:${y.ready?"#5be37d":"#ffd23f"}"></span><b>${o(y.name)}</b>${y.pid===a.myPid?"<em> (you)</em>":""}${y.pid===0?"<em> \xB7 host</em>":""}<span class="r">${y.ready?"ready":"waiting"}</span></div>`:'<div class="pl empty"><span class="dot" style="background:#456"></span>open slot</div>')}let m=a.members.filter(p=>p.ready).length;e.innerHTML=`<style>.pl{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:10px;background:rgba(255,255,255,.08);margin-bottom:6px;font-size:14px}.pl.empty{opacity:.45}.pl .dot{width:10px;height:10px;border-radius:50%}.pl em{font-style:normal;opacity:.65;font-size:12px}.pl .r{margin-left:auto;font-size:11px;opacity:.7}.codebig{font-size:44px;font-weight:900;letter-spacing:.14em;line-height:1;color:var(--y);text-shadow:0 3px 0 rgba(0,0,0,.35)}</style>
  <div class="topbar"><h2>${u?"Your room":"Room"} \xB7 <span style="color:var(--y)">${Ia(a.code)}</span></h2><span class="pill" style="background:#1f7a3d">${a.stats.rtt?Math.round(a.stats.rtt)+" ms":"connected"}</span></div>
  <div class="grow row wrap scroll" style="gap:10px;align-items:flex-start"><div class="panel" style="padding:12px;flex:1;min-width:250px">${u?`<div class="row sp" style="align-items:center"><div><div style="font-size:11px;color:var(--mut);font-weight:800">ROOM CODE</div><div class="codebig">${Ia(a.code)}</div></div><button class="btn blue" id="share" style="padding:8px 14px">Share</button></div><div style="height:10px"></div>`:""}<div style="font-size:11px;color:var(--mut);font-weight:800;margin-bottom:6px">PLAYERS (${a.members.length}/${lr})</div>${x.join("")}</div>
  <div class="panel" style="padding:12px;flex:1;min-width:250px"><div style="font-size:11px;color:var(--mut);font-weight:800">TRACK</div><div class="row wrap" style="gap:6px;margin:6px 0">${["meadow","harbor","mesa","frost"].map(p=>`<button class="btn ${f.track===p?"":"ghost"}" data-t="${p}" ${u?"":"disabled"} style="padding:8px 12px;font-size:13px">${i.TRACK_DEFS[p].name}</button>`).join("")}</div>
  <div class="row wrap" style="gap:14px"><div><div style="font-size:11px;color:var(--mut);font-weight:800">LAPS</div><div class="seg" id="laps">${[1,2,3,4,5].map(p=>`<button data-n="${p}" class="${f.laps===p?"on":""}" ${u?"":"disabled"}>${p}</button>`).join("")}</div></div>
  <div class="toggle" style="gap:8px"><span>Items</span><div class="sw2 ${f.items?"on":""}" data-o="items"></div></div><div class="toggle" style="gap:8px"><span>CPU fill to 12</span><div class="sw2 ${f.cpu?"on":""}" data-o="cpu"></div></div></div>${c}</div></div>
  <div class="row"><button class="btn ghost" id="back">Leave</button><div class="grow"></div>${u?`<span style="font-size:12px;color:var(--mut);align-self:center">${m}/${a.members.length} ready</span><button class="btn" id="start" style="font-size:18px;padding:14px 34px">Start race</button>`:`<button class="btn ${a.members.find(p=>p.pid===a.myPid)?.ready?"blue":""}" id="rdy" style="font-size:18px;padding:14px 34px">${a.members.find(p=>p.pid===a.myPid)?.ready?"Ready \u2713":"I'm ready"}</button>`}</div>`,e.querySelector("#back").onclick=l,u?(e.querySelectorAll("[data-t]").forEach(p=>p.onclick=()=>{n("ui_click"),a.setCfg({track:p.dataset.t})}),e.querySelectorAll("#laps button").forEach(p=>p.onclick=()=>{n("ui_toggle"),a.setCfg({laps:+p.dataset.n})}),e.querySelectorAll("[data-o]").forEach(p=>p.onclick=()=>{n("ui_toggle"),a.setCfg({[p.dataset.o]:!f[p.dataset.o]})}),e.querySelector("#start").onclick=()=>{if(a.members.length<2&&!f.cpu){n("ui_error"),i.toast("Need another player or CPU fill","#ff8a8a");return}n("ui_confirm"),a.hostStart(i.makeCpuBuild,i.CPU_NAMES)},e.querySelector("#share").onclick=async()=>{n("ui_click");let p=location.origin+location.pathname+"?room="+a.code;try{navigator.share?await navigator.share({title:"Sparkdrift GP",text:"Join my kart race! Code "+Ia(a.code),url:p}):(await navigator.clipboard.writeText(p),i.toast("Link copied"))}catch{try{await navigator.clipboard.writeText(p),i.toast("Link copied")}catch{i.toast(p)}}}):e.querySelector("#rdy").onclick=()=>{let p=a.members.find(y=>y.pid===a.myPid);n("lobby_ready"),a.ready(!(p&&p.ready))}}var Ft=(i,t=document)=>t.querySelector(i),pb=(i,t,e)=>Math.max(t,Math.min(e,i)),vl=i=>i+["th","st","nd","rd"][i%100>10&&i%100<14?0:i%10<4?i%10:0],W={v:"1.0.0",save:su(),screen:"boot",race:null,quality:1,ghost:null,cup:null,mode:"quick",cfg:{},hqState:{on:!1,bytes:0}};window.__app=W;var dr=new URLSearchParams(location.search),mb=Ft("#gl"),oi=new Pc({canvas:mb,antialias:!0,powerPreference:"high-performance",alpha:!1,preserveDrawingBuffer:dr.has("shot")});oi.outputColorSpace=Ce;oi.toneMapping=qr;oi.toneMappingExposure=1.05;var pr=new Gn,mr=new Oe(62,1,.3,2600);W.renderer=oi;W.scene=pr;W.camera=mr;var Yn=Math.min(window.devicePixelRatio||1,W.save.settings.quality==="high"?2.5:1.75),yl=Yn;W.pr=()=>Yn;function gr(){let i=innerWidth,t=innerHeight;oi.setPixelRatio(Yn),oi.setSize(i,t,!1),mr.aspect=i/t,mr.updateProjectionMatrix();let e=Ft("#rotate"),n=t>i;e&&e.classList.toggle("hidden",!0)}addEventListener("resize",gr);addEventListener("orientationchange",()=>setTimeout(gr,200));gr();var bl=new Kc(oi);W.showroom=bl;var zt=new Yc({base:"audio/"});W.audio=zt;window.__audio=zt;var pn=new Jc(Ft("#touch"),W.save.settings);W.input=pn;pn.autoOn=W.save.settings.autoGas;pn.onPause=()=>{W.race&&W.race.state==="racing"&&!W.paused&&b0()};var ld={fmt:rr,ord:vl,icon:i=>kn[i]||"",coinSvg:kn.coin,html(i,t){return i.innerHTML=t,i}};function bi(i,t,e,n){Ft("#loading").classList.toggle("hidden",!i),t&&(Ft("#ldTitle").textContent=t),e!==void 0&&(Ft("#ldFill").style.width=Math.round(e*100)+"%"),Ft("#ldSub").textContent=n||""}W.setLoading=bi;function fn(i,t){let e=document.createElement("div");for(e.className="toast",e.textContent=i,t&&(e.style.color=t),Ft("#toasts").appendChild(e),setTimeout(()=>e.remove(),2e3);Ft("#toasts").children.length>3;)Ft("#toasts").firstChild.remove()}W.toast=fn;function Ki(i,t=1100){let e=Ft("#center");e.innerHTML=i,clearTimeout(Ki.t),Ki.t=setTimeout(()=>{e.innerHTML=""},t)}function _s(){Zc(W.save)}W.persist=_s;function wn(i){zt.ready&&zt.play(i,{bus:"ui",min:.03})}W.ui=wn;function fr(){let i=W.save.settings;zt.setVolumes({master:i.master,music:i.music,sfx:i.sfx,voice:i.voice,engine:i.engine}),pn.autoOn=i.autoGas,pn.s.steerSens=i.steerSens}W.applySettings=fr;var hd=Ft("#screens");function Ve(i,t){W.screen=i,hd.innerHTML="",Ft("#hud").classList.add("hidden"),Ft("#touch").classList.add("hidden");let e=vs[i];e&&e(t||{})}W.show=Ve;W.TRACK_DEFS=qi;W.onHostLost=()=>{W.race&&(Zi(),La()),W.toast("The host left the room","#ff8a8a"),W.net&&(W.net.close(),W.net=null),Ve("menu")};var vs={};function ys(i=""){let t=document.createElement("div");return t.className="screen "+i,hd.appendChild(t),t}W.screenEl=ys;function Da(){return`<div class="coins" id="coinsBadge">${kn.coin}<span>${W.save.coins}</span></div>`}W.coinsBadge=Da;W.refreshCoins=()=>{let i=Ft("#coinsBadge span");i&&(i.textContent=W.save.coins)};vs.title=()=>{let i=ys("center");i.style.justifyContent="center",i.style.alignItems="center",i.style.textAlign="center",i.innerHTML=`<div class="col" style="align-items:center;gap:18px"><div class="logo" style="font-size:min(15vw,84px)"><span class="a">Spark</span><span class="b">drift</span><br><span class="a" style="font-size:.55em;letter-spacing:.3em">GP</span></div>
  <div style="color:var(--mut);font-weight:700;max-width:420px">Arcade kart racing built for phones. Drift, boost, outsmart 11 rivals.</div>
  <button class="btn" id="goBtn" style="font-size:20px;padding:16px 38px">Tap to start</button>
  <div style="font-size:12px;color:var(--mut)">\u{1F3A7} Headphones recommended \u2014 the sound is half the game.<br>v${W.v} \xB7 vertical slice \xB7 free & open (see CREDITS)</div></div>`,Ft("#goBtn").onclick=async()=>{await ud();let t=dr.get("room");t?(W.pendingRoom=t,Ve("lobby")):Ve("menu")}};async function ud(){bi(!0,"Warming up the engines",.05,"Starting audio");try{await zt.unlock(),await zt.loadManifest(),fr(),bi(!0,"Warming up the engines",.3,"Loading menu sounds"),await zt.preloadSfx(["ui_click","ui_hover","ui_confirm","ui_back","ui_error","ui_toggle","ui_tick","ui_buy","ui_unlock","ui_whoosh","coin","lobby_join","lobby_leave","lobby_ready"]),bi(!0,"Warming up the engines",.6,"Loading menu music"),await zt.loadMusic("menu")&&zt.startMusic("menu","menu"),zt.startAmbience("menu"),zt.setReverb("menu")}catch(i){console.warn("audio boot",i)}bi(!1)}W.bootAudio=ud;vs.menu=()=>{let i=ys(),t=W.save;bl.setKart(t.builds[t.sel.body],t.sel.char),bl.spin=!0,i.innerHTML=`<div class="topbar"><div class="logo" style="font-size:34px"><span class="a">Spark</span><span class="b">drift</span> <span class="a" style="font-size:.6em">GP</span></div>${Da()}</div>
  <div class="grow row" style="align-items:flex-end;padding-bottom:6px"><div class="col" style="width:min(100%,320px)" id="menuBtns">
    <button class="btn" data-a="gp">Grand Prix <span style="opacity:.7;font-size:12px">\xB7 Seedling Cup</span></button>
    <button class="btn blue" data-a="quick">Quick race</button>
    <button class="btn blue" data-a="tt">Time trial \xB7 ghost</button>
    <button class="btn blue" data-a="daily">Daily challenge</button>
    <button class="btn blue" data-a="online">Versus \xB7 room code</button>
    <div class="row"><button class="btn ghost grow" data-a="garage">Garage</button><button class="btn ghost grow" data-a="settings">Settings</button></div>
  </div></div>`,i.querySelectorAll("[data-a]").forEach(e=>e.onclick=()=>{wn("ui_confirm");let n=e.dataset.a;n==="garage"?Ve("garage"):n==="settings"?Ve("settings"):n==="online"?Ve("lobby"):(W.mode=n,Ve("setup"))})};vs.garage=()=>Jp(W,ld);vs.lobby=()=>f0(W,ld);vs.settings=()=>{let i=W.save.settings,t=ys(),e=(s,r)=>`<div><div class="row sp"><b>${r}</b><span id="v_${s}">${Math.round(i[s]*100)}%</span></div><input type="range" min="0" max="100" value="${Math.round(i[s]*100)}" data-k="${s}"></div>`;t.innerHTML=`<div class="topbar"><h2>Settings</h2>${Da()}</div><div class="panel grow scroll" style="padding:14px;margin-bottom:10px"><div class="col">
  ${e("master","Master volume")}${e("music","Music")}${e("sfx","Effects")}${e("engine","Engines")}${e("voice","Voices & announcer")}
  <div class="toggle"><span>Auto-accelerate after GO<br><small style="color:var(--mut)">GAS pedal still works for the start boost</small></span><div class="sw2 ${i.autoGas?"on":""}" data-t="autoGas"></div></div>
  <div class="toggle"><span>Tilt steering (phone)<br><small style="color:var(--mut)">Overrides the slider when you tilt</small></span><div class="sw2 ${i.tilt?"on":""}" data-t="tilt"></div></div>
  <div class="toggle"><span>Screen shake</span><div class="sw2 ${i.shake?"on":""}" data-t="shake"></div></div>
  <div><div class="row sp"><b>Steering sensitivity</b><span id="v_ss">${i.steerSens.toFixed(2)}</span></div><input type="range" min="80" max="160" value="${Math.round(i.steerSens*100)}" id="ss"></div>
  <div><b>Graphics & audio quality</b><div class="seg" style="margin-top:6px" id="qSeg"><button data-q="standard" class="${i.quality==="standard"?"on":""}">Standard</button><button data-q="high" class="${i.quality==="high"?"on":""}">High</button></div>
  <div style="font-size:12px;color:var(--mut);margin-top:6px" id="hqInfo"></div><div class="row" style="margin-top:8px"><button class="btn small blue" id="hqBtn">Download high-quality pack</button><span id="hqStat" style="font-size:12px;color:var(--mut)"></span></div></div>
  <div class="toggle"><span>Unlock everything (demo)<br><small style="color:var(--mut)">Marks all parts as owned \u2014 for testing the garage</small></span><div class="sw2 ${W.save.unlockAll?"on":""}" data-t="unlockAll"></div></div>
  <div class="row wrap"><button class="btn small ghost" id="rst">Reset save</button><button class="btn small ghost" id="cred">Credits</button></div>
  <div style="font-size:11px;color:var(--mut)">Sparkdrift GP v${W.v} \xB7 pad: left stick steer \xB7 A/RT gas \xB7 X drift \xB7 Y item \xB7 B brake \xB7 LB/RB look back \xB7 Start pause. Keys: arrows/WASD, Space drift, E item, C look back.</div>
  </div></div><div class="row"><button class="btn ghost" id="back">Back</button></div>`,t.querySelectorAll("input[data-k]").forEach(s=>s.oninput=()=>{i[s.dataset.k]=s.value/100,Ft("#v_"+s.dataset.k).textContent=s.value+"%",fr(),_s()}),Ft("#ss").oninput=s=>{i.steerSens=s.target.value/100,Ft("#v_ss").textContent=i.steerSens.toFixed(2),fr(),_s()},t.querySelectorAll("[data-t]").forEach(s=>s.onclick=async()=>{let r=s.dataset.t;wn("ui_toggle"),r==="unlockAll"?(W.save.unlockAll=!W.save.unlockAll,s.classList.toggle("on",W.save.unlockAll)):(i[r]=!i[r],s.classList.toggle("on",i[r])),r==="tilt"&&(await pn.enableTilt(i.tilt)||(i.tilt=!1,s.classList.remove("on"),fn("Tilt not available"))),fr(),_s()});let n=()=>{Ft("#hqInfo").textContent=W.hqState.manifest?`High quality uses lossless 48 kHz stems (\u2248${(W.hqState.manifest.totalBytes/1048576).toFixed(0)} MB total across the 4 tracks and menu, fetched per track on demand and cached) plus 2K/4K textures. Recommended on desktop / recent iPad & iPhone Pro; it needs ~300 MB RAM during a race.`:"High quality pack manifest not loaded.",Ft("#qSeg").querySelectorAll("button").forEach(s=>s.classList.toggle("on",s.dataset.q===i.quality))};Ft("#qSeg").querySelectorAll("button").forEach(s=>s.onclick=async()=>{wn("ui_click"),i.quality=s.dataset.q,await fd(i.quality),_s(),n()}),Ft("#hqBtn").onclick=async()=>{wn("ui_confirm"),await g0((s,r)=>{Ft("#hqStat").textContent=r})},dd().then(n),n(),Ft("#rst").onclick=()=>{confirm("Reset all progress?")&&(W.save=ru(),_s(),Ve("menu"))},Ft("#cred").onclick=()=>{window.open("CREDITS.md","_blank")},Ft("#back").onclick=()=>{wn("ui_back"),Ve("menu")}};async function dd(){if(W.hqState.manifest)return W.hqState.manifest;try{let i=await fetch("hq-manifest.json");W.hqState.manifest=await i.json(),zt.hqBase=t=>{let e=W.hqState.manifest,n=e.files[t]||e.files[t.replace(".wav",".flac")];return n?e.repos[n.r]+t:e.repos[e.default]+t}}catch{W.hqState.manifest=null}return W.hqState.manifest}async function fd(i){let t=i==="high";W.save.settings.hq=t,zt.hq=t,t&&await dd(),yl=Math.min(window.devicePixelRatio||1,t?2.5:1.75),Yn=Math.min(Yn,yl),gr()}async function g0(i){let t=await dd();if(!t){i(0,"HQ manifest unavailable");return}let e=Object.keys(t.files).filter(c=>c.startsWith("music/")||c.startsWith("voice/announcer")),n=0,s=0,r=e.reduce((c,l)=>c+t.files[l].b,0);await zt.unlock();let a=e.slice(),o=async()=>{for(;a.length;){let c=a.shift(),l=zt.hqBase(c);try{let h=await caches.open("sdgp-hq-v1"),d=await h.match(l);d||(d=await fetch(l,{mode:"cors"}),d.ok&&await h.put(l,d.clone())),d.ok&&await d.arrayBuffer()}catch{}s+=t.files[c].b,n++,i(s/r,`${(s/1048576).toFixed(0)} / ${(r/1048576).toFixed(0)} MB`)}};await Promise.all([o(),o(),o(),o()]),i(1,"Downloaded & cached")}vs.setup=()=>{let i=W.cfg={track:W.cfg.track||"meadow",laps:W.cfg.laps||3,mirror:!1,reverse:!1,items:!0,...W.cfg},t=W.mode,e=ys(),n={gp:"Grand Prix \xB7 Seedling Cup",quick:"Quick race",tt:"Time trial",daily:"Daily challenge"}[t];if(t==="daily"){let a=Math.floor(Date.now()/864e5),o=c=>{let l=Math.sin(a*12.9898+c*78.233)*43758.5453;return l-Math.floor(l)};i.track=tr[a%4],i.mirror=o(1)>.5,i.reverse=o(2)>.7,i.laps=2,i.items=!0,i.daily=a}let s={meadow:"linear-gradient(#5db8ff,#c9ecff 55%,#6bc24a 56%)",harbor:"linear-gradient(#34509e,#ffb88a 55%,#2f6f8a 56%)",mesa:"linear-gradient(#ff9b4a,#ffe7b0 55%,#e0a65a 56%)",frost:"linear-gradient(#6aa8f0,#eaf5ff 55%,#eef6ff 56%)"},r=tr.map(a=>{let o=qi[a],c=W.save.bests[a+(i.mirror?"m":"")+(i.reverse?"r":"")];return`<div class="card ${i.track===a?"on":""}" data-t="${a}"><div class="art" style="background:${s[a]}"></div><div class="t"><b>${o.name}</b><span>${o.cup} \xB7 ${o.theme} \xB7 ${(gb(a)/1e3).toFixed(2)} km</span><br><span>Best: ${rr(c)}</span></div></div>`}).join("");e.innerHTML=`<div class="topbar"><h2>${n}</h2>${Da()}</div>
  <div class="grow col scroll" style="gap:10px"><div class="row wrap" id="cards" style="align-items:stretch">${t==="gp"?tr.map((a,o)=>`<div class="card on" style="min-width:140px;cursor:default"><div class="art" style="background:${s[a]};height:60px"></div><div class="t"><b>${o+1}. ${qi[a].name}</b></div></div>`).join(""):r}</div>
  <div class="panel" style="padding:12px"><div class="row wrap" style="gap:14px"><div><div style="font-size:11px;color:var(--mut);font-weight:800">LAPS</div><div class="seg" id="laps">${[1,2,3,4,5].map(a=>`<button data-n="${a}" class="${i.laps===a?"on":""}">${a}</button>`).join("")}</div></div>
  ${t==="tt"||t==="daily"?"":`<div class="toggle" style="gap:8px"><span>Items</span><div class="sw2 ${i.items?"on":""}" data-o="items"></div></div>`}
  ${t==="gp"||t==="daily"?"":`<div class="toggle" style="gap:8px"><span>Mirror</span><div class="sw2 ${i.mirror?"on":""}" data-o="mirror"></div></div><div class="toggle" style="gap:8px"><span>Reverse</span><div class="sw2 ${i.reverse?"on":""}" data-o="reverse"></div></div>`}</div>
  <div style="font-size:12px;color:var(--mut);margin-top:6px">${t==="tt"?"Solo run against your best ghost. No items, no rivals.":t==="daily"?"Today's fixed track & setup (same for everyone on this date). Leaderboard: <b>local to this device</b> \u2014 an online board needs the backend described in the production plan.":"12 racers: you + 11 CPU rivals with light rubber-banding."}</div></div></div>
  <div class="row"><button class="btn ghost" id="back">Back</button><div class="grow"></div><button class="btn" id="go" style="font-size:18px;padding:14px 34px">Start</button></div>`,e.querySelectorAll("[data-t]").forEach(a=>a.onclick=()=>{wn("ui_click"),i.track=a.dataset.t,Ve("setup")}),e.querySelectorAll("#laps button").forEach(a=>a.onclick=()=>{wn("ui_toggle"),i.laps=+a.dataset.n,e.querySelectorAll("#laps button").forEach(o=>o.classList.toggle("on",o===a))}),e.querySelectorAll("[data-o]").forEach(a=>a.onclick=()=>{wn("ui_toggle"),i[a.dataset.o]=!i[a.dataset.o],Ve("setup")}),Ft("#back").onclick=()=>{wn("ui_back"),Ve("menu")},Ft("#go").onclick=()=>{wn("ui_confirm"),t==="gp"&&(W.cup={idx:0,pts:{},results:[]},i.track=tr[0],i.mirror=i.reverse=!1),xr()}};var ad={};function gb(i){return ad[i]||(ad[i]=kc(i).length),ad[i]}var x0=Ct.characters.filter(i=>i.free).map(i=>i.name);W.CPU_NAMES=x0;function _0(i){let t=Ct.bodies.map(s=>s.name),e=s=>Math.floor(Math.random()*s),n=er(t[i%t.length]);return n.paint=e(Ct.paintColors.length),n.finish=e(5),n.wheel=Ct.wheels[e(Ct.wheels.length)].name,n.size=1+e(3),n.rim=e(Ct.rimColors.length),n.spoiler=Ct.spoilers[e(Ct.spoilers.length)].name,n.exhaust=Ct.exhausts[e(Ct.exhausts.length)].name,n.bumper=Ct.bumpers[e(Ct.bumpers.length)].name,e(3)===0&&(n.twoTone=e(8),n.paint2=e(32)),e(2)===0&&(n.decal=e(24),n.decalColor="#ffffff"),n}async function xb(i,t,e){if(!zt.ready)return;let n=qi[i],s=[],r=Object.keys(zt.sfxMan),a=Object.keys(zt.voiceMan.announcer).filter(u=>!u.startsWith("welcome")&&u!=="room_ready"&&u!=="player_joined"&&u!=="player_left"&&u!=="unlocked"&&u!=="pod_ready"),o=0,c=5,l=u=>{o++,e&&e(o/c,u)};await zt.preloadSfx(r),l("Sound effects"),await zt.preloadEngines(["light","medium","heavy"]),l("Engines"),await zt.preloadAnnouncer(a),l("Announcer");let h=["boost1","boost2","hit","spin","item","attack","overtake","overtaken","final","lose","shortcut","ready","taunt","win"],d=t.map(u=>u.id);await Promise.all(t.map(u=>zt.preloadVoices([u.id],u.local?h:["spin","overtake","overtaken","taunt","hit"]))),l("Voices"),await zt.load(`amb/${n.amb}.wav`,`amb/${n.amb}.flac`),await zt.loadMusic(n.music),l("Music")}async function xr(i={}){let t=W.cfg,e=W.save,n=t.track,s=qi[n];bi(!0,s.name,.02,"Preparing race"),await new Promise(g=>setTimeout(g,30)),W.race&&Zi();let r=W.mode==="tt",a=e.builds[e.sel.body],o={id:0,name:e.sel.char,build:a,human:!0,local:!0},c=[o],l=r?0:6;if(!r){let g=x0.filter(p=>p!==e.sel.char),x=[],m=0;for(;x.length<11;)x.push({id:x.length+1,name:g[m%g.length],build:_0(m+3),cpu:!0,human:!1,skill:.84+Math.random()*.15}),m++;c=x.slice(),c.splice(l,0,o)}let h=i.net||null;h&&(c=h.players);let d=c.map(g=>({id:pa[g.name],local:!!g.local})).filter((g,x,m)=>m.findIndex(p=>p.id===g.id)===x);await xb(n,d,(g,x)=>bi(!0,s.name,.1+g*.8,"Loading "+x));let u=W.quality;await new Promise(g=>setTimeout(g,10));let f=new qc({scene:pr,renderer:oi,camera:mr,audio:zt,trackId:n,laps:t.laps,mirror:t.mirror,reverse:t.reverse,itemsOn:r?!1:t.items,players:c,quality:u,hq:e.settings.hq,ui:Sb,netId:h?h.myId:"L",rnd:h?h.rnd:Math.random,introSec:2.6});if(f.net=h?h.link:null,W.race=f,W.paused=!1,h&&(h.attach(f),bi(!0,s.name,.95,"Waiting for other racers\u2026"),h.loaded(),await h.goP),r){let g=v0(),x=e.ghosts[g];x?W.ghost=_b(x,a,e.sel.char):W.ghost=null,W.rec={t:0,a:[]}}else W.ghost=null;f.state="grid",hd.innerHTML="",bi(!1),bb(f),Ft("#hud").classList.remove("hidden"),Ft("#touch").classList.remove("hidden"),pn.active=!0,pn.reset(),f.input=pn.state,W.screen="race",W.resultsShown=!1,zt.stopMusic(.6),zt.musicBufs&&zt.musicMeta&&zt.musicMeta.piece===s.music&&zt.startMusic(s.music,"grid"),f.start()}W.startRace=xr;W.makeCpuBuild=_0;function v0(){let i=W.cfg;return i.track+(i.mirror?"m":"")+(i.reverse?"r":"")+i.laps}function _b(i,t,e){let n=nr(t,e);return n.root.traverse(s=>{if(s.material){let r=s.material.clone();r.transparent=!0,r.opacity=.38,r.depthWrite=!1,s.material=r}}),pr.add(n.root),n.root.visible=!1,{k:n,d:i,i:0}}function vb(i){let t=W.ghost;if(!t||i.state!=="racing")return;let e=i.t*10,n=Math.floor(e),s=t.d;if(n+1>=s.length/3){t.k.root.visible=!1;return}let r=e-n,a=s[n*3]/10,o=s[n*3+1]/10,c=s[n*3+2]/100,l=s[n*3+3]/10,h=s[n*3+4]/10,u=s[n*3+5]/100-c;for(;u>Math.PI;)u-=6.2832;for(;u<-Math.PI;)u+=6.2832;t.k.root.visible=!0,t.k.root.position.set(a+(l-a)*r,0,o+(h-o)*r),t.k.root.rotation.y=c+u*r;for(let f of t.k.wheels)f.spin.rotation.x+=.5}function yb(i,t){let e=W.rec;if(!e||i.state!=="racing")return;e.t+=t;let n=i.localKart;for(;e.a.length/3<Math.floor(i.t*10)+1;)e.a.push(Math.round(n.sim.x*10),Math.round(n.sim.z*10),Math.round(n.sim.th*100))}function Zi(){W.race&&(W.ghost&&(pr.remove(W.ghost.k.root),W.ghost=null),W.net&&W.net.detach&&W.net.detach(),W.race.dispose(),W.race=null,pn.active=!1,Ft("#center").innerHTML="",Ft("#fxlines").classList.add("hidden"))}W.endRace=Zi;var Ge={};function bb(i){let t=Ft("#hud");t.innerHTML=`<div class="pos" id="hPos">7<small>th</small><span class="of">/12</span></div><div class="lap" id="hLap">LAP 1/3</div><div class="time" id="hTime">0:00.00</div>
  <div class="slot" id="hSlot"></div><div class="lock" id="hLock">\u25B2 ROCKET LOCK \u25B2</div><div class="mini"><canvas id="hMini" width="248" height="248"></canvas></div><div class="coin" id="hCoin">${kn.coin}<span>0</span></div>
  <div class="charge" id="hCharge"><i></i><i></i><i></i></div><div class="spd"><span id="hSpd">0</span><small>KM/H</small></div>`;let e=document.createElement("button");e.className="pausebtn",e.textContent="II",e.onclick=()=>b0(),t.appendChild(e),e.style.pointerEvents="auto",e.style.display="block",Ge={pos:Ft("#hPos"),lap:Ft("#hLap"),time:Ft("#hTime"),slot:Ft("#hSlot"),lock:Ft("#hLock"),mini:Ft("#hMini"),coin:Ft("#hCoin span"),charge:Ft("#hCharge"),spd:Ft("#hSpd"),last:{}};let n=i.track,s=Ge.mini,r=s.getContext("2d");Ge.g=r;let a=n.p,o=1e9,c=-1e9,l=1e9,h=-1e9;for(let _ of a)o=Math.min(o,_[0]),c=Math.max(c,_[0]),l=Math.min(l,_[1]),h=Math.max(h,_[1]);let d=s.width,u=22,f=(d-u*2)/Math.max(c-o,h-l);Ge.map={sc:f,ox:u+(d-u*2-(c-o)*f)/2,oz:u+(d-u*2-(h-l)*f)/2,minx:o,maxz:h,minz:l,maxx:c};let g=document.createElement("canvas");g.width=g.height=d;let x=g.getContext("2d");x.lineJoin="round",x.lineCap="round";let m=_=>y0(_[0],_[1]),p=(_,S,T)=>{x.beginPath(),_.forEach((C,v)=>{let M=m(C);v?x.lineTo(M[0],M[1]):x.moveTo(M[0],M[1])}),x.closePath(),x.lineWidth=S,x.strokeStyle=T,x.stroke()};p(a.filter((_,S)=>S%2===0),15,"rgba(255,255,255,.25)"),p(a.filter((_,S)=>S%2===0),10,"rgba(255,255,255,.9)"),n.sc&&(x.beginPath(),n.sc.p.forEach((_,S)=>{let T=m(_);S?x.lineTo(T[0],T[1]):x.moveTo(T[0],T[1])}),x.setLineDash([6,6]),x.lineWidth=6,x.strokeStyle="#ffd23f",x.stroke(),x.setLineDash([]));let y=n.at(0,0,{}),w=m([y.x,y.z]);x.fillStyle="#ff4d6d",x.fillRect(w[0]-7,w[1]-7,14,14),Ge.mapBase=g}function y0(i,t){let e=Ge.map;return[e.ox+(i-e.minx)*e.sc,e.oz+(e.maxz-t)*e.sc]}function Mb(i,t){let e=i.localKart;if(!e||!Ge.last)return;let n=e.sim,s=Ge.last,r=e.place;s.pos!==r&&(s.pos=r,Ge.pos.innerHTML=`${r}<small>${vl(r).replace(/^\d+/,"")}</small><span class="of">/${i.karts.length}</span>`);let o=`LAP ${pb(n.lap+1,1,i.laps)}/${i.laps}`;s.lap!==o&&(s.lap=o,Ge.lap.textContent=o),Ge.time.textContent=i.state==="racing"||i.state==="finished"?rr(i.t).slice(0,-1):"0:00.00";let c=Math.round(Math.abs(n.s)*4);s.sp!==c&&(s.sp=c,Ge.spd.textContent=c);let l=e.roll?"roll:"+Math.floor(e.roll.t/.09)%8:e.item?e.item.id+e.item.n:"";if(s.item!==l){s.item=l;let y=Ge.slot;if(y.classList.toggle("roll",!!e.roll),y.classList.toggle("has",!!e.item),e.roll){let w=["pod","disc","peel","rocket","nova","spill","jolt","veil"];y.innerHTML=kn[w[Math.floor(e.roll.t/.09)%8]]}else e.item?y.innerHTML=kn[e.item.id]+(e.item.n>1?`<span class="cnt">${e.item.n}</span>`:""):y.innerHTML='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="14" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3" stroke-dasharray="4 5"/></svg>';pn.elItem&&pn.elItem.classList.toggle("has",!!e.item)}Ge.coin.textContent=i.statsRace.coins;let h=Ge.charge,d=n.drift,u=d.on?"c"+d.tier:"";s.ch!==u&&(s.ch=u,h.classList.toggle("on",d.on),h.children[0].className=d.tier>=1?"f1":"",h.children[1].className=d.tier>=2?"f2":"",h.children[2].className=d.tier>=3?"f3":""),Ge.lock.classList.toggle("on",e.lockT>0);let f=Ft("#fxlines"),g=n.boostT>0||n.starT>0;f.classList.remove("hidden"),f.classList.toggle("on",g),f.classList.toggle("hit",n.spinT>.6);let x=Ge.g,m=Ge.mini.width;x.clearRect(0,0,m,m),x.drawImage(Ge.mapBase,0,0);let p=(y,w)=>{let _=y0(y.sim.x,y.sim.z);x.beginPath(),x.fillStyle=w?"#ffd23f":y.place<e.place?"#ff6b6b":"#7fd0ff",x.arc(_[0],_[1],w?8:5.5,0,6.3),x.fill(),x.lineWidth=w?3:1.5,x.strokeStyle=w?"#fff":"rgba(0,0,0,.6)",x.stroke(),w&&(x.beginPath(),x.moveTo(_[0]+Math.sin(y.sim.th)*14,_[1]-Math.cos(y.sim.th)*14),x.lineTo(_[0]+Math.sin(y.sim.th+2.5)*8,_[1]-Math.cos(y.sim.th+2.5)*8),x.lineTo(_[0]+Math.sin(y.sim.th-2.5)*8,_[1]-Math.cos(y.sim.th-2.5)*8),x.fillStyle="#fff",x.fill())};for(let y of i.karts)y!==e&&p(y,!1);p(e,!0)}function Sb(i,t){let e=W.race&&W.race.localKart;switch(i){case"cd":Ki(`<div class="big">${t.n}</div>`,900);break;case"go":Ki('<div class="big" style="color:#37e08a">GO!</div>',900);break;case"start":t.res==="boost"?fn("\u26A1 Perfect start!","#7bffb0"):t.res==="stall"&&fn("Too early \u2014 wheelspin!","#ff8a8a");break;case"tier":fn(["","Blue spark","Orange spark","PURPLE spark!"][t.tier],["","#4db8ff","#ff9a2e","#c16bff"][t.tier]);break;case"boost":fn(["","Mini-turbo","Super-turbo","ULTRA TURBO"][t.tier],"#fff");break;case"lapMsg":Ki(`<div class="msg">Lap ${t.lap}</div>`,1300);break;case"finalLap":Ki('<div class="msg" style="color:#ff6b6b">Final lap!</div>',1700);break;case"shortcut":fn("Shortcut!","#ffd23f");break;case"wrong":Ki('<div class="msg" style="color:#ff6b6b">Wrong way</div>',600);break;case"hit":fn(t.kind==="rocket"?"Hit by a rocket!":t.kind==="jolt"?"Storm Jolt!":"Spun out!","#ff8a8a");break;case"hitOther":fn("Direct hit!","#7bffb0");break;case"lock":fn("Rocket lock! Hit ITEM to brace","#ff4d4d");break;case"brace":fn("Perfect brace!","#7bffb0");break;case"stolen":fn("Item stolen!","#b9a7ff");break;case"coin":break;case"item":t.id&&fn(nu[t.id].name,nu[t.id].color);break;case"joltArm":fn("Storm Jolt charging\u2026","#fff25a");break;case"results":Tb(t.results);break}}function b0(){if(!W.race||W.paused)return;let t=!!W.net;t||(W.paused=!0);let e=ys("center");e.style.justifyContent="center",e.style.alignItems="center",e.style.background="rgba(5,10,24,.6)",e.innerHTML=`<div class="panel col" style="padding:18px;min-width:min(86vw,320px)"><h2>Paused</h2><button class="btn" id="rs">Resume</button>${t?'<div style="font-size:12px;color:var(--mut)">Online race keeps running while this menu is open.</div>':'<button class="btn blue" id="rt">Restart race</button>'}<button class="btn ghost" id="qt">Quit to menu</button></div>`,zt.ctx&&!t&&zt.ctx.suspend(),Ft("#rs").onclick=()=>{W.paused=!1,e.remove(),zt.ctx&&zt.ctx.resume()},Ft("#rt")&&(Ft("#rt").onclick=()=>{W.paused=!1,e.remove(),zt.ctx&&zt.ctx.resume(),!W.net&&xr()}),Ft("#qt").onclick=async()=>{W.paused=!1,e.remove(),zt.ctx&&await zt.ctx.resume(),Zi(),W.net&&(W.net.close(),W.net=null),La(),Ve("menu")}}async function La(){zt.stopMusic(.5),zt.stopAllLoops(),zt.setReverb("menu"),await zt.loadMusic("menu")&&zt.startMusic("menu","menu"),zt.startAmbience("menu")}function Tb(i){if(W.resultsShown)return;W.resultsShown=!0;let t=W.save,e=i.find(f=>f.local),n=W.mode==="tt",s=e.place,r=W.cfg,a=[15,12,10,8,7,6,5,4,3,2,1,0],o=[80,60,45,35,28,22,18,14,10,7,4,2],c=n?20+e.coins:(o[s-1]||0)+e.coins+20;t.coins+=c,t.stats.races++,s===1&&t.stats.wins++,t.stats.coinsEarned+=c;let l=r.track+(r.mirror?"m":"")+(r.reverse?"r":""),h=!1;if(e.time&&(!t.bests[l]||r.laps===3&&e.time<t.bests[l])&&r.laps===3&&(t.bests[l]=e.time,h=!0),n&&e.time){let f=v0();(!t.ghosts[f]||e.time<t.ghosts[f+"t"])&&(t.ghosts[f]=W.rec.a,t.ghosts[f+"t"]=e.time,h=!0)}if(r.daily){let f="d"+r.daily;t.daily[f]=t.daily[f]&&t.daily[f]<e.time?t.daily[f]:e.time}let d="",u=W.net?"Back to lobby":"Race again";if(W.mode==="gp"&&W.cup){let f=W.cup;for(let m of i)f.pts[m.name]=(f.pts[m.name]||0)+a[m.place-1];f.idx++;let g=Object.entries(f.pts).sort((m,p)=>p[1]-m[1]),x=f.idx>=4;if(u=x?"Finish cup":"Next race",d=`<div class="panel" style="padding:10px"><b>Cup standings (${f.idx}/4)</b><table class="res">${g.slice(0,6).map(([m,p],y)=>`<tr class="${m===t.sel.char?"me":""}"><td>${y+1}</td><td>${m}</td><td>${p} pts</td></tr>`).join("")}</table></div>`,x){let m=g.findIndex(y=>y[0]===t.sel.char)+1,p=m===1?"Gold":m===2?"Silver":m===3?"Bronze":"None";d+=`<div class="panel" style="padding:10px"><b>Seedling Cup result: ${vl(m)} \u2014 ${p} trophy</b></div>`,m<=3&&(t.coins+=[300,200,120][m-1])}}_s(),zt.ready&&zt.setMusicState("results"),setTimeout(()=>{let f=ys();f.style.background="linear-gradient(rgba(5,10,24,.35),rgba(5,10,24,.85))",f.innerHTML=`<div class="topbar"><h2>${s===1?"\u{1F3C6} Victory!":"Race complete"} \u2014 ${vl(s)}</h2>${Da()}</div>
    <div class="grow row wrap scroll" style="align-items:flex-start;gap:10px"><div class="panel grow" style="padding:10px;min-width:260px"><table class="res">${i.slice(0,12).map(g=>`<tr class="${g.local?"me":""}"><td>${g.place}</td><td>${g.disp}</td><td class="n">${g.time?rr(g.time):"\u2014"}</td></tr>`).join("")}</table></div>
    <div class="col" style="min-width:230px;flex:1"><div class="panel" style="padding:12px"><div class="row sp"><b>Coins earned</b><span class="coins">${kn.coin}+${c}</span></div><div style="font-size:12px;color:var(--mut);margin-top:6px">${e.coins} collected \xB7 placing bonus ${n?0:o[s-1]} \xB7 finish +20${h?'<br><b style="color:var(--y)">New personal best!</b>':""}</div></div>${d}</div></div>
    <div class="row wrap"><button class="btn ghost" id="mn">Menu</button><div class="grow"></div><button class="btn" id="nx">${u}</button></div>`,Ft("#mn").onclick=async()=>{wn("ui_back"),Zi(),W.net&&(W.net.close(),W.net=null),W.cup=null,await La(),Ve("menu")},Ft("#nx").onclick=async()=>{if(wn("ui_confirm"),W.net){Zi(),await La(),Ve("lobby");return}if(W.mode==="gp"&&W.cup){if(W.cup.idx>=4){Zi(),W.cup=null,await La(),Ve("menu");return}W.cfg.track=tr[W.cup.idx]}xr()},zt.ready&&zt.play(s<=3?"fanfare_win":"fanfare_mid",{bus:"ui",vol:.6})},1200)}var p0=performance.now(),_l=0,od=0,hr=0,ur=0;var cd=0;W.fps=60;W.frameSkip=!1;function M0(i){requestAnimationFrame(M0);let t=(i-p0)/1e3;p0=i,t>.25&&(t=.25),cd++;let e=W.race;if(e&&!W.paused){if(pn.poll(e.state==="racing"&&pn.autoOn),e.update(t),vb(e),yb(e,t),(cd%2===0||!W.frameSkip)&&Mb(e,t),W.frameSkip&&cd%2){m0(t);return}oi.render(pr,mr)}else e?oi.render(pr,mr):["menu","garage","title","setup","settings","lobby","boot","results"].includes(W.screen)&&bl.render(t,innerWidth,innerHeight,W.screen==="garage"?0:W.screen==="menu"?.9:0);m0(t)}function m0(i){if(_l+=i,od++,_l<.5)return;let t=od/_l;if(W.fps=t,_l=0,od=0,!W.race||W.paused){hr=ur=0;return}let e=W.frameSkip?30:60;t<e*.86?(hr+=.5,ur=0):t>e*.97?(ur+=.5,hr=0):hr=ur=0,hr>=1.5?(hr=0,Yn>.62?(Yn=Math.max(.62,Yn-.15),gr()):W.frameSkip||(W.frameSkip=!0)):ur>=8&&Yn<yl&&!W.frameSkip&&(ur=0,Yn=Math.min(yl,Yn+.1),gr())}requestAnimationFrame(M0);(async function(){fr(),W.save.settings.quality==="high"&&await fd("high"),Ft("#loading").classList.add("hidden"),Ve("title"),dr.has("autostart")&&setTimeout(async()=>{await ud(),W.mode=dr.get("mode")||"quick",W.cfg.track=dr.get("track")||"meadow",W.cfg.laps=+(dr.get("laps")||3),xr()},100)})();window.__test={startRace:xr,show:Ve,endRace:Zi,toast:fn,centerMsg:Ki,input:pn,T:ld,SAVE:jc,setQuality:fd,prefetchHQ:g0};export{ld as T,W as app};
