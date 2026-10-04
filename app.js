var hf=Object.defineProperty;var uf=(s,t)=>{for(var e in t)hf(s,e,{get:t[e],enumerable:!0})};var Zh=0,tc=1,Kh=2;var Sr=1,Jh=2,Ls=3,Cn=0,Ye=1,Ae=2,$i=0,Pn=1,Kn=2,ec=3,ic=4,jh=5;var Jn=100,Qh=101,tu=102,eu=103,iu=104,nu=200,su=201,ru=202,au=203,nc=204,sc=205,ou=206,lu=207,cu=208,hu=209,uu=210,du=211,fu=212,pu=213,mu=214,Sa=0,wa=1,Ta=2,Ss=3,Ea=4,Aa=5,Ra=6,Ca=7,rc=0,gu=1,xu=2,Fi=0,ac=1,oc=2,lc=3,wr=4,cc=5,hc=6,uc=7;var dc=300,In=301,jn=302,to=303,eo=304,Tr=306,qn=1e3,yi=1001,Pa=1002,He=1003,_u=1004;var Er=1005;var qe=1006,io=1007;var Ln=1008;var hi=1009,fc=1010,pc=1011,Ds=1012,no=1013,Bi=1014,Si=1015,ki=1016,so=1017,ro=1018,Ns=1020,mc=35902,gc=35899,xc=1021,_c=1022,wi=1023,Wi=1026,Dn=1027,ao=1028,oo=1029,Nn=1030,lo=1031;var co=1033,Ar=33776,Rr=33777,Cr=33778,Pr=33779,ho=35840,uo=35841,fo=35842,po=35843,mo=36196,go=37492,xo=37496,_o=37488,vo=37489,Ir=37490,yo=37491,bo=37808,Mo=37809,So=37810,wo=37811,To=37812,Eo=37813,Ao=37814,Ro=37815,Co=37816,Po=37817,Io=37818,Lo=37819,Do=37820,No=37821,Uo=36492,Fo=36494,Bo=36495,ko=36283,Oo=36284,Lr=36285,zo=36286;var rr=2300,Ia=2301,ba=2302,ql=2303,$l=2400,Yl=2401,Zl=2402;var vu=3200;var Ho=0,yu=1,un="",Ee="srgb",ar="srgb-linear",or="linear",le="srgb";var Ma=7680;var bu=519,Mu=512,Su=513,wu=514,Go=515,Tu=516,Eu=517,Vo=518,Au=519,Ru=35044,Dr=35048;var vc="300 es",Li=2e3,ws=2001;function df(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ff(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function lr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Cu(){let s=lr("canvas");return s.style.display="block",s}var wh={},Ts=null;function yc(...s){let t="THREE."+s.shift();Ts?Ts("log",t,...s):console.log(t,...s)}function Pu(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Bt(...s){s=Pu(s);let t="THREE."+s.shift();if(Ts)Ts("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Ot(...s){s=Pu(s);let t="THREE."+s.shift();if(Ts)Ts("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Xn(...s){let t=s.join(" ");t in wh||(wh[t]=!0,Bt(...s))}function Iu(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var Lu={[Sa]:wa,[Ta]:Ra,[Ea]:Ca,[Ss]:Aa,[wa]:Sa,[Ra]:Ta,[Ca]:Ea,[Aa]:Ss},Xi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let n=i[t];if(n!==void 0){let r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,t);t.target=null}}},Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Sl=Math.PI/180,La=180/Math.PI;function Nr(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Je[s&255]+Je[s>>8&255]+Je[s>>16&255]+Je[s>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[i&255]+Je[i>>8&255]+Je[i>>16&255]+Je[i>>24&255]).toLowerCase()}function te(s,t,e){return Math.max(t,Math.min(e,s))}function pf(s,t){return(s%t+t)%t}function wl(s,t,e){return(1-e)*s+e*t}function js(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ci(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Tc=class Tc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*n+t.x,this.y=r*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Tc.prototype.isVector2=!0;var Yt=Tc,bi=class{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],d=i[n+3],u=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(d!==x||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*x;m<0&&(u=-u,f=-f,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){let y=Math.acos(m),A=Math.sin(y);p=Math.sin(p*y)/A,o=Math.sin(o*y)/A,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+x*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+x*o;let y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,n,r,a){let o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-o*f,t[e+2]=c*g+h*f+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,n=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),d=o(r/2),u=l(i/2),f=l(n/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Bt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],n=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-n)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-n)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ec=class Ec{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Th.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Th.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,n=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*n-o*i),h=2*(o*e-r*n),d=2*(r*i-a*e);return this.x=e+l*c+a*d-o*h,this.y=i+l*h+o*c-r*d,this.z=n+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,n=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Tl.copy(this).projectOnVector(t),this.sub(Tl)}reflect(t){return this.sub(Tl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ec.prototype.isVector3=!0;var k=Ec,Tl=new k,Th=new bi,Ac=class Ac{constructor(t,e,i,n,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c)}set(t,e,i,n,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=n,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],x=n[0],m=n[3],p=n[6],y=n[1],A=n[4],v=n[7],S=n[2],w=n[5],R=n[8];return r[0]=a*x+o*y+l*S,r[3]=a*m+o*A+l*w,r[6]=a*p+o*v+l*R,r[1]=c*x+h*y+d*S,r[4]=c*m+h*A+d*w,r[7]=c*p+h*v+d*R,r[2]=u*x+f*y+g*S,r[5]=u*m+f*A+g*w,r[8]=u*p+f*v+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=e*d+i*u+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(n*c-h*i)*x,t[2]=(o*i-n*a)*x,t[3]=u*x,t[4]=(h*e-n*l)*x,t[5]=(n*r-o*e)*x,t[6]=f*x,t[7]=(i*l-c*e)*x,t[8]=(a*e-i*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-n*c,n*l,-n*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Xn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(El.makeScale(t,e)),this}rotate(t){return Xn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(El.makeRotation(-t)),this}translate(t,e){return Xn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(El.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Ac.prototype.isMatrix3=!0;var zt=Ac,El=new zt,Eh=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ah=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function mf(){let s={enabled:!0,workingColorSpace:ar,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===le&&(n.r=rn(n.r),n.g=rn(n.g),n.b=rn(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===le&&(n.r=Ms(n.r),n.g=Ms(n.g),n.b=Ms(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===un?or:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return Xn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return Xn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[ar]:{primaries:t,whitePoint:i,transfer:or,toXYZ:Eh,fromXYZ:Ah,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:t,whitePoint:i,transfer:le,toXYZ:Eh,fromXYZ:Ah,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}}),s}var Qt=mf();function rn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ms(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var ls,Da=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ls===void 0&&(ls=lr("canvas")),ls.width=t.width,ls.height=t.height;let n=ls.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=ls}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=lr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=rn(r[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(rn(e[i]/255)*255):e[i]=rn(e[i]);return{data:e,width:t.width,height:t.height}}else return Bt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},gf=0,Es=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=Nr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Al(n[a].image)):r.push(Al(n[a]))}else r=Al(n);i.url=r}return e||(t.images[this.uuid]=i),i}};function Al(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Da.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Bt("Texture: Unable to serialize Texture."),{})}var xf=0,Rl=new k,si=class s extends Xi{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,i=yi,n=yi,r=qe,a=Ln,o=wi,l=hi,c=s.DEFAULT_ANISOTROPY,h=un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=Nr(),this.name="",this.source=new Es(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Yt(0,0),this.repeat=new Yt(1,1),this.center=new Yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Rl).x}get height(){return this.source.getSize(Rl).y}get depth(){return this.source.getSize(Rl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Bt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Bt(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case qn:t.x=t.x-Math.floor(t.x);break;case yi:t.x=t.x<0?0:1;break;case Pa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case qn:t.y=t.y-Math.floor(t.y);break;case yi:t.y=t.y<0?0:1;break;case Pa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};si.DEFAULT_IMAGE=null;si.DEFAULT_MAPPING=dc;si.DEFAULT_ANISOTROPY=1;var Rc=class Rc{constructor(t=0,e=0,i=0,n=1){this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let A=(c+1)/2,v=(f+1)/2,S=(p+1)/2,w=(h+u)/4,R=(d+x)/4,_=(g+m)/4;return A>v&&A>S?A<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(A),n=w/i,r=R/i):v>S?v<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(v),i=w/n,r=_/n):S<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(S),i=R/r,n=_/r),this.set(i,n,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-x)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this.w=te(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this.w=te(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Rc.prototype.isVector4=!0;var be=Rc,Na=class extends Xi{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e),this.textures=[];let n={width:t,height:e,depth:i.depth},r=new si(n),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:qe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let n=Object.assign({},t.textures[e].image);this.textures[e].source=new Es(n)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qe=class extends Na{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},cr=class extends si{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=He,this.minFilter=He,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ua=class extends si{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=He,this.minFilter=He,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Qa=class Qa{constructor(t,e,i,n,r,a,o,l,c,h,d,u,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c,h,d,u,f,g,x,m)}set(t,e,i,n,r,a,o,l,c,h,d,u,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qa().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,n=1/cs.setFromMatrixColumn(t,0).length(),r=1/cs.setFromMatrixColumn(t,1).length(),a=1/cs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,n=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,f=a*d,g=o*h,x=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-x*c,e[9]=-o*l,e[2]=x-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,x=c*d;e[0]=u+x*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=x+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,x=c*d;e[0]=u-x*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=x-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*d,g=o*h,x=o*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+x,e[1]=l*d,e[5]=x*c+u,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=x-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-x*d}else if(t.order==="XZY"){let u=a*l,f=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+x,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_f,t,vf)}lookAt(t,e,i){let n=this.elements;return di.subVectors(t,e),di.lengthSq()===0&&(di.z=1),di.normalize(),gn.crossVectors(i,di),gn.lengthSq()===0&&(Math.abs(i.z)===1?di.x+=1e-4:di.z+=1e-4,di.normalize(),gn.crossVectors(i,di)),gn.normalize(),Qr.crossVectors(di,gn),n[0]=gn.x,n[4]=Qr.x,n[8]=di.x,n[1]=gn.y,n[5]=Qr.y,n[9]=di.y,n[2]=gn.z,n[6]=Qr.z,n[10]=di.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],x=i[6],m=i[10],p=i[14],y=i[3],A=i[7],v=i[11],S=i[15],w=n[0],R=n[4],_=n[8],M=n[12],E=n[1],C=n[5],P=n[9],D=n[13],L=n[2],O=n[6],X=n[10],$=n[14],st=n[3],W=n[7],Q=n[11],it=n[15];return r[0]=a*w+o*E+l*L+c*st,r[4]=a*R+o*C+l*O+c*W,r[8]=a*_+o*P+l*X+c*Q,r[12]=a*M+o*D+l*$+c*it,r[1]=h*w+d*E+u*L+f*st,r[5]=h*R+d*C+u*O+f*W,r[9]=h*_+d*P+u*X+f*Q,r[13]=h*M+d*D+u*$+f*it,r[2]=g*w+x*E+m*L+p*st,r[6]=g*R+x*C+m*O+p*W,r[10]=g*_+x*P+m*X+p*Q,r[14]=g*M+x*D+m*$+p*it,r[3]=y*w+A*E+v*L+S*st,r[7]=y*R+A*C+v*O+S*W,r[11]=y*_+A*P+v*X+S*Q,r[15]=y*M+A*D+v*$+S*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15],y=l*f-c*u,A=o*f-c*d,v=o*u-l*d,S=a*f-c*h,w=a*u-l*h,R=a*d-o*h;return e*(x*y-m*A+p*v)-i*(g*y-m*S+p*w)+n*(g*A-x*S+p*R)-r*(g*v-x*w+m*R)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+n*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],y=e*o-i*a,A=e*l-n*a,v=e*c-r*a,S=i*l-n*o,w=i*c-r*o,R=n*c-r*l,_=h*x-d*g,M=h*m-u*g,E=h*p-f*g,C=d*m-u*x,P=d*p-f*x,D=u*p-f*m,L=y*D-A*P+v*C+S*E-w*M+R*_;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/L;return t[0]=(o*D-l*P+c*C)*O,t[1]=(n*P-i*D-r*C)*O,t[2]=(x*R-m*w+p*S)*O,t[3]=(u*w-d*R-f*S)*O,t[4]=(l*E-a*D-c*M)*O,t[5]=(e*D-n*E+r*M)*O,t[6]=(m*v-g*R-p*A)*O,t[7]=(h*R-u*v+f*A)*O,t[8]=(a*P-o*E+c*_)*O,t[9]=(i*E-e*P-r*_)*O,t[10]=(g*w-x*v+p*y)*O,t[11]=(d*v-h*w-f*y)*O,t[12]=(o*M-a*C-l*_)*O,t[13]=(e*C-i*M+n*_)*O,t[14]=(x*A-g*S-m*y)*O,t[15]=(h*S-d*A+u*y)*O,this}scale(t){let e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),n=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,a){return this.set(1,i,r,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){let n=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,x=a*h,m=a*d,p=o*d,y=l*c,A=l*h,v=l*d,S=i.x,w=i.y,R=i.z;return n[0]=(1-(x+p))*S,n[1]=(f+v)*S,n[2]=(g-A)*S,n[3]=0,n[4]=(f-v)*w,n[5]=(1-(u+p))*w,n[6]=(m+y)*w,n[7]=0,n[8]=(g+A)*R,n[9]=(m-y)*R,n[10]=(1-(u+x))*R,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){let n=this.elements;t.x=n[12],t.y=n[13],t.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=cs.set(n[0],n[1],n[2]).length(),o=cs.set(n[4],n[5],n[6]).length(),l=cs.set(n[8],n[9],n[10]).length();r<0&&(a=-a),Ri.copy(this);let c=1/a,h=1/o,d=1/l;return Ri.elements[0]*=c,Ri.elements[1]*=c,Ri.elements[2]*=c,Ri.elements[4]*=h,Ri.elements[5]*=h,Ri.elements[6]*=h,Ri.elements[8]*=d,Ri.elements[9]*=d,Ri.elements[10]*=d,e.setFromRotationMatrix(Ri),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,n,r,a,o=Li,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(i-n),u=(e+t)/(e-t),f=(i+n)/(i-n),g,x;if(l)g=r/(a-r),x=a*r/(a-r);else if(o===Li)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===ws)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,r,a,o=Li,l=!1){let c=this.elements,h=2/(e-t),d=2/(i-n),u=-(e+t)/(e-t),f=-(i+n)/(i-n),g,x;if(l)g=1/(a-r),x=a/(a-r);else if(o===Li)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===ws)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Qa.prototype.isMatrix4=!0;var ue=Qa,cs=new k,Ri=new ue,_f=new k(0,0,0),vf=new k(1,1,1),gn=new k,Qr=new k,di=new k,Rh=new ue,Ch=new bi,Di=class s{constructor(t=0,e=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let n=t.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],d=n[2],u=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-te(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Bt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Rh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ch.setFromEuler(this),this.setFromQuaternion(Ch,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Di.DEFAULT_ORDER="XYZ";var hr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},yf=0,Ph=new k,hs=new bi,Qi=new ue,ta=new k,Qs=new k,bf=new k,Mf=new bi,Ih=new k(1,0,0),Lh=new k(0,1,0),Dh=new k(0,0,1),Nh={type:"added"},Sf={type:"removed"},us={type:"childadded",child:null},Cl={type:"childremoved",child:null},Le=class s extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=Nr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new k,e=new Di,i=new bi,n=new k(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new ue},normalMatrix:{value:new zt}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return hs.setFromAxisAngle(t,e),this.quaternion.multiply(hs),this}rotateOnWorldAxis(t,e){return hs.setFromAxisAngle(t,e),this.quaternion.premultiply(hs),this}rotateX(t){return this.rotateOnAxis(Ih,t)}rotateY(t){return this.rotateOnAxis(Lh,t)}rotateZ(t){return this.rotateOnAxis(Dh,t)}translateOnAxis(t,e){return Ph.copy(t).applyQuaternion(this.quaternion),this.position.add(Ph.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ih,t)}translateY(t){return this.translateOnAxis(Lh,t)}translateZ(t){return this.translateOnAxis(Dh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Qi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ta.copy(t):ta.set(t,e,i);let n=this.parent;this.updateWorldMatrix(!0,!1),Qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qi.lookAt(Qs,ta,this.up):Qi.lookAt(ta,Qs,this.up),this.quaternion.setFromRotationMatrix(Qi),n&&(Qi.extractRotation(n.matrixWorld),hs.setFromRotationMatrix(Qi),this.quaternion.premultiply(hs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ot("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Nh),us.child=t,this.dispatchEvent(us),us.child=null):Ot("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Sf),Cl.child=t,this.dispatchEvent(Cl),Cl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Qi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Qi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Qi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Nh),us.child=t,this.dispatchEvent(us),us.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,t,bf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,Mf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,n=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*n,r[13]+=i-r[1]*e-r[5]*i-r[9]*n,r[14]+=n-r[2]*e-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));n.material=o}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];n.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let n=t.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Le.DEFAULT_UP=new k(0,1,0);Le.DEFAULT_MATRIX_AUTO_UPDATE=!0;Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var re=class extends Le{constructor(){super(),this.isGroup=!0,this.type="Group"}},wf={type:"move"},As=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wf)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new re;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Du={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xn={h:0,s:0,l:0},ea={h:0,s:0,l:0};function Pl(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Dt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Qt.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=Qt.workingColorSpace){if(t=pf(t,1),e=te(e,0,1),i=te(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Pl(a,r,t+1/3),this.g=Pl(a,r,t),this.b=Pl(a,r,t-1/3)}return Qt.colorSpaceToWorking(this,n),this}setStyle(t,e=Ee){function i(r){r!==void 0&&parseFloat(r)<1&&Bt("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Bt("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Bt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){let i=Du[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Bt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=rn(t.r),this.g=rn(t.g),this.b=rn(t.b),this}copyLinearToSRGB(t){return this.r=Ms(t.r),this.g=Ms(t.g),this.b=Ms(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return Qt.workingToColorSpace(je.copy(this),t),Math.round(te(je.r*255,0,255))*65536+Math.round(te(je.g*255,0,255))*256+Math.round(te(je.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.workingToColorSpace(je.copy(this),e);let i=je.r,n=je.g,r=je.b,a=Math.max(i,n,r),o=Math.min(i,n,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(n-r)/d+(n<r?6:0);break;case n:l=(r-i)/d+2;break;case r:l=(i-n)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.workingToColorSpace(je.copy(this),e),t.r=je.r,t.g=je.g,t.b=je.b,t}getStyle(t=Ee){Qt.workingToColorSpace(je.copy(this),t);let e=je.r,i=je.g,n=je.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(xn),this.setHSL(xn.h+t,xn.s+e,xn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(xn),t.getHSL(ea);let i=wl(xn.h,ea.h,e),n=wl(xn.s,ea.s,e),r=wl(xn.l,ea.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},je=new Dt;Dt.NAMES=Du;var ur=class s{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Dt(t),this.density=e}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},dr=class s{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Dt(t),this.near=e,this.far=i}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ni=class extends Le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Di,this.environmentIntensity=1,this.environmentRotation=new Di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Ci=new k,tn=new k,Il=new k,en=new k,ds=new k,fs=new k,Uh=new k,Ll=new k,Dl=new k,Nl=new k,Ul=new be,Fl=new be,Bl=new be,bn=class s{constructor(t=new k,e=new k,i=new k){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),Ci.subVectors(t,e),n.cross(Ci);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){Ci.subVectors(n,e),tn.subVectors(i,e),Il.subVectors(t,e);let a=Ci.dot(Ci),o=Ci.dot(tn),l=Ci.dot(Il),c=tn.dot(tn),h=tn.dot(Il),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,en)===null?!1:en.x>=0&&en.y>=0&&en.x+en.y<=1}static getInterpolation(t,e,i,n,r,a,o,l){return this.getBarycoord(t,e,i,n,en)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,en.x),l.addScaledVector(a,en.y),l.addScaledVector(o,en.z),l)}static getInterpolatedAttribute(t,e,i,n,r,a){return Ul.setScalar(0),Fl.setScalar(0),Bl.setScalar(0),Ul.fromBufferAttribute(t,e),Fl.fromBufferAttribute(t,i),Bl.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(Ul,r.x),a.addScaledVector(Fl,r.y),a.addScaledVector(Bl,r.z),a}static isFrontFacing(t,e,i,n){return Ci.subVectors(i,e),tn.subVectors(t,e),Ci.cross(tn).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ci.subVectors(this.c,this.b),tn.subVectors(this.a,this.b),Ci.cross(tn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return s.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,n=this.b,r=this.c,a,o;ds.subVectors(n,i),fs.subVectors(r,i),Ll.subVectors(t,i);let l=ds.dot(Ll),c=fs.dot(Ll);if(l<=0&&c<=0)return e.copy(i);Dl.subVectors(t,n);let h=ds.dot(Dl),d=fs.dot(Dl);if(h>=0&&d<=h)return e.copy(n);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(ds,a);Nl.subVectors(t,r);let f=ds.dot(Nl),g=fs.dot(Nl);if(g>=0&&f<=g)return e.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(fs,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Uh.subVectors(r,n),o=(d-h)/(d-h+(f-g)),e.copy(n).addScaledVector(Uh,o);let p=1/(m+x+u);return a=x*p,o=u*p,e.copy(i).addScaledVector(ds,a).addScaledVector(fs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},qi=class{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Pi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Pi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Pi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Pi):Pi.fromBufferAttribute(r,a),Pi.applyMatrix4(t.matrixWorld),this.expandByPoint(Pi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ia.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ia.copy(i.boundingBox)),ia.applyMatrix4(t.matrixWorld),this.union(ia)}let n=t.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Pi),Pi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(tr),na.subVectors(this.max,tr),ps.subVectors(t.a,tr),ms.subVectors(t.b,tr),gs.subVectors(t.c,tr),_n.subVectors(ms,ps),vn.subVectors(gs,ms),Hn.subVectors(ps,gs);let e=[0,-_n.z,_n.y,0,-vn.z,vn.y,0,-Hn.z,Hn.y,_n.z,0,-_n.x,vn.z,0,-vn.x,Hn.z,0,-Hn.x,-_n.y,_n.x,0,-vn.y,vn.x,0,-Hn.y,Hn.x,0];return!kl(e,ps,ms,gs,na)||(e=[1,0,0,0,1,0,0,0,1],!kl(e,ps,ms,gs,na))?!1:(sa.crossVectors(_n,vn),e=[sa.x,sa.y,sa.z],kl(e,ps,ms,gs,na))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Pi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Pi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},nn=[new k,new k,new k,new k,new k,new k,new k,new k],Pi=new k,ia=new qi,ps=new k,ms=new k,gs=new k,_n=new k,vn=new k,Hn=new k,tr=new k,na=new k,sa=new k,Gn=new k;function kl(s,t,e,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){Gn.fromArray(s,r);let o=n.x*Math.abs(Gn.x)+n.y*Math.abs(Gn.y)+n.z*Math.abs(Gn.z),l=t.dot(Gn),c=e.dot(Gn),h=i.dot(Gn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ie=new k,ra=new Yt,Tf=0,Se=class extends Xi{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Tf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ru,this.updateRanges=[],this.gpuType=Si,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ra.fromBufferAttribute(this,e),ra.applyMatrix3(t),this.setXY(e,ra.x,ra.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=js(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ci(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=js(e,this.array)),e}setX(t,e){return this.normalized&&(e=ci(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=js(e,this.array)),e}setY(t,e){return this.normalized&&(e=ci(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=js(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ci(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=js(e,this.array)),e}setW(t,e){return this.normalized&&(e=ci(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ci(e,this.array),i=ci(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ci(e,this.array),i=ci(i,this.array),n=ci(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=ci(e,this.array),i=ci(i,this.array),n=ci(n,this.array),r=ci(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var fr=class extends Se{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var pr=class extends Se{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Vt=class extends Se{constructor(t,e,i){super(new Float32Array(t),e,i)}},Ef=new qi,er=new k,Ol=new k,an=class{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Ef.setFromPoints(t).getCenter(i);let n=0;for(let r=0,a=t.length;r<a;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;er.subVectors(t,this.center);let e=er.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(er,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ol.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(er.copy(t.center).add(Ol)),this.expandByPoint(er.copy(t.center).sub(Ol))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Af=0,vi=new ue,zl=new Le,xs=new k,fi=new qi,ir=new qi,ze=new k,fe=class s extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=Nr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(df(t)?pr:fr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new zt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return vi.makeRotationFromQuaternion(t),this.applyMatrix4(vi),this}rotateX(t){return vi.makeRotationX(t),this.applyMatrix4(vi),this}rotateY(t){return vi.makeRotationY(t),this.applyMatrix4(vi),this}rotateZ(t){return vi.makeRotationZ(t),this.applyMatrix4(vi),this}translate(t,e,i){return vi.makeTranslation(t,e,i),this.applyMatrix4(vi),this}scale(t,e,i){return vi.makeScale(t,e,i),this.applyMatrix4(vi),this}lookAt(t){return zl.lookAt(t),zl.updateMatrix(),this.applyMatrix4(zl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xs).negate(),this.translate(xs.x,xs.y,xs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let n=0,r=t.length;n<r;n++){let a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Vt(i,3))}else{let i=Math.min(t.length,e.count);for(let n=0;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&Bt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){let r=e[i];fi.setFromBufferAttribute(r),this.morphTargetsRelative?(ze.addVectors(this.boundingBox.min,fi.min),this.boundingBox.expandByPoint(ze),ze.addVectors(this.boundingBox.max,fi.max),this.boundingBox.expandByPoint(ze)):(this.boundingBox.expandByPoint(fi.min),this.boundingBox.expandByPoint(fi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new an);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){let i=this.boundingSphere.center;if(fi.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];ir.setFromBufferAttribute(o),this.morphTargetsRelative?(ze.addVectors(fi.min,ir.min),fi.expandByPoint(ze),ze.addVectors(fi.max,ir.max),fi.expandByPoint(ze)):(fi.expandByPoint(ir.min),fi.expandByPoint(ir.max))}fi.getCenter(i);let n=0;for(let r=0,a=t.count;r<a;r++)ze.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(ze));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ze.fromBufferAttribute(o,c),l&&(xs.fromBufferAttribute(t,c),ze.add(xs)),n=Math.max(n,i.distanceToSquared(ze))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,n=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Se(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new k,l[_]=new k;let c=new k,h=new k,d=new k,u=new Yt,f=new Yt,g=new Yt,x=new k,m=new k;function p(_,M,E){c.fromBufferAttribute(i,_),h.fromBufferAttribute(i,M),d.fromBufferAttribute(i,E),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,E),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(C),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(C),o[_].add(x),o[M].add(x),o[E].add(x),l[_].add(m),l[M].add(m),l[E].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let _=0,M=y.length;_<M;++_){let E=y[_],C=E.start,P=E.count;for(let D=C,L=C+P;D<L;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let A=new k,v=new k,S=new k,w=new k;function R(_){S.fromBufferAttribute(n,_),w.copy(S);let M=o[_];A.copy(M),A.sub(S.multiplyScalar(S.dot(M))).normalize(),v.crossVectors(w,M);let C=v.dot(l[_])<0?-1:1;a.setXYZW(_,A.x,A.y,A.z,C)}for(let _=0,M=y.length;_<M;++_){let E=y[_],C=E.start,P=E.count;for(let D=C,L=C+P;D<L;D+=3)R(t.getX(D+0)),R(t.getX(D+1)),R(t.getX(D+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new Se(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let n=new k,r=new k,a=new k,o=new k,l=new k,c=new k,h=new k,d=new k;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);n.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(n,r),h.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)n.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(n,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ze.fromBufferAttribute(t,e),ze.normalize(),t.setXYZ(e,ze.x,ze.y,ze.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new Se(u,h,d)}if(this.index===null)return Bt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,i=this.index.array,n=this.attributes;for(let o in n){let l=n[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let n={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(n[l]=h,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let n=t.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Hl=new k,Rf=new k,Cf=new zt,Ii=class{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let n=Hl.subVectors(i,e).cross(Rf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let n=t.delta(Hl),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Cf.getNormalMatrix(t),n=this.coplanarPoint(Hl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Pf=0,on=class extends Xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=Nr(),this.name="",this.type="Material",this.blending=Pn,this.side=Cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nc,this.blendDst=sc,this.blendEquation=Jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=Ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ma,this.stencilZFail=Ma,this.stencilZPass=Ma,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Bt(`Material: parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Bt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=n(t.textures),a=n(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Dt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Ii().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Yt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Yt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var sn=new k,Gl=new k,aa=new k,oa=new k,mr=class{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(sn.copy(this.origin).addScaledVector(this.direction,e),sn.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){Gl.copy(t).add(e).multiplyScalar(.5),aa.copy(e).sub(t).normalize(),oa.copy(this.origin).sub(Gl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(aa),o=oa.dot(this.direction),l=-oa.dot(aa),c=oa.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let x=1/h;d*=x,u*=x,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(Gl).addScaledVector(aa,u),f}intersectSphere(t,e){if(t.radius<0)return null;sn.subVectors(t.center,this.origin);let i=sn.dot(this.direction),n=sn.dot(sn)-i*i,r=t.radius*t.radius;if(n>r)return null;let a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,n=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,n=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,sn)!==null}intersectTriangle(t,e,i,n,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,g=e.x-a.x,x=e.y-a.y,m=e.z-a.z,p=i.x-a.x,y=i.y-a.y,A=i.z-a.z,v=Math.abs(l),S=Math.abs(c),w=Math.abs(h),R,_,M,E,C,P,D,L,O,X,$,st;if(v>=S&&v>=w?(M=l,P=d,O=g,st=p,l>=0?(R=c,_=h,E=u,C=f,D=x,L=m,X=y,$=A):(R=h,_=c,E=f,C=u,D=m,L=x,X=A,$=y)):S>=w?(M=c,P=u,O=x,st=y,c>=0?(R=h,_=l,E=f,C=d,D=m,L=g,X=A,$=p):(R=l,_=h,E=d,C=f,D=g,L=m,X=p,$=A)):(M=h,P=f,O=m,st=A,h>=0?(R=l,_=c,E=d,C=u,D=g,L=x,X=p,$=y):(R=c,_=l,E=u,C=d,D=x,L=g,X=y,$=p)),M===0)return null;let W=R/M,Q=_/M,it=1/M,vt=E-W*P,St=C-Q*P,ce=D-W*O,Zt=L-Q*O,ne=X-W*st,Z=$-Q*st,et=ne*Zt-Z*ce,Mt=vt*Z-St*ne,Ht=ce*St-Zt*vt;if(n){if(et<0||Mt<0||Ht<0)return null}else if((et<0||Mt<0||Ht<0)&&(et>0||Mt>0||Ht>0))return null;let yt=et+Mt+Ht;if(yt===0)return null;let $t=it*(et*P+Mt*O+Ht*st);return(yt>0?$t<0:$t>0)?null:this.at($t/yt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ie=class extends on{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.combine=rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Fh=new ue,Vn=new mr,la=new an,Bh=new k,ca=new k,ha=new k,ua=new k,Vl=new k,da=new k,kh=new k,fa=new k,Ut=class extends Le{constructor(t=new fe,e=new ie){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);let o=this.morphTargetInfluences;if(r&&o){da.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(Vl.fromBufferAttribute(d,t),a?da.addScaledVector(Vl,h):da.addScaledVector(Vl.sub(e),h))}e.add(da)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),la.copy(i.boundingSphere),la.applyMatrix4(r),Vn.copy(t.ray).recast(t.near),!(la.containsPoint(Vn.origin)===!1&&(Vn.intersectSphere(la,Bh)===null||Vn.origin.distanceToSquared(Bh)>(t.far-t.near)**2))&&(Fh.copy(r).invert(),Vn.copy(t.ray).applyMatrix4(Fh),!(i.boundingBox!==null&&Vn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Vn)))}_computeIntersections(t,e,i){let n,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),A=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=y,S=A;v<S;v+=3){let w=o.getX(v),R=o.getX(v+1),_=o.getX(v+2);n=pa(this,p,t,i,c,h,d,w,R,_),n&&(n.faceIndex=Math.floor(v/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let y=o.getX(m),A=o.getX(m+1),v=o.getX(m+2);n=pa(this,a,t,i,c,h,d,y,A,v),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),A=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=y,S=A;v<S;v+=3){let w=v,R=v+1,_=v+2;n=pa(this,p,t,i,c,h,d,w,R,_),n&&(n.faceIndex=Math.floor(v/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let y=m,A=m+1,v=m+2;n=pa(this,a,t,i,c,h,d,y,A,v),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}};function If(s,t,e,i,n,r,a,o){let l;if(t.side===Ye?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,t.side===Cn,o),l===null)return null;fa.copy(o),fa.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(fa);return c<e.near||c>e.far?null:{distance:c,point:fa.clone(),object:s}}function pa(s,t,e,i,n,r,a,o,l,c){s.getVertexPosition(o,ca),s.getVertexPosition(l,ha),s.getVertexPosition(c,ua);let h=If(s,t,e,i,ca,ha,ua,kh);if(h){let d=new k;bn.getBarycoord(kh,ca,ha,ua,d),n&&(h.uv=bn.getInterpolatedAttribute(n,o,l,c,d,new Yt)),r&&(h.uv1=bn.getInterpolatedAttribute(r,o,l,c,d,new Yt)),a&&(h.normal=bn.getInterpolatedAttribute(a,o,l,c,d,new k),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new k,materialIndex:0};bn.getNormal(ca,ha,ua,u.normal),h.face=u,h.barycoord=d}return h}var gr=class extends si{constructor(t=null,e=1,i=1,n,r,a,o,l,c=He,h=He,d,u){super(null,a,o,l,c,h,n,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rs=class extends Se{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},_s=new ue,Oh=new ue,ma=[],zh=new qi,Lf=new ue,nr=new Ut,sr=new an,Mn=class extends Ut{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Rs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,Lf)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new qi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,_s),zh.copy(t.boundingBox).applyMatrix4(_s),this.boundingBox.union(zh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new an),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,_s),sr.copy(t.boundingSphere).applyMatrix4(_s),this.boundingSphere.union(sr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){let i=this.matrixWorld,n=this.count;if(nr.geometry=this.geometry,nr.material=this.material,nr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sr.copy(this.boundingSphere),sr.applyMatrix4(i),t.ray.intersectsSphere(sr)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,_s),Oh.multiplyMatrices(i,_s),nr.matrixWorld=Oh,nr.raycast(t,ma);for(let a=0,o=ma.length;a<o;a++){let l=ma[a];l.instanceId=r,l.object=this,e.push(l)}ma.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Rs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new gr(new Float32Array(n*this.count),n,this.count,ao,Si));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=n*t;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Wn=new an,Df=new Yt(.5,.5),ga=new k,Cs=class{constructor(t=new Ii,e=new Ii,i=new Ii,n=new Ii,r=new Ii,a=new Ii){this.planes=[t,e,i,n,r,a]}set(t,e,i,n,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Li,i=!1){let n=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],y=r[12],A=r[13],v=r[14],S=r[15];if(n[0].setComponents(c-a,f-h,p-g,S-y).normalize(),n[1].setComponents(c+a,f+h,p+g,S+y).normalize(),n[2].setComponents(c+o,f+d,p+x,S+A).normalize(),n[3].setComponents(c-o,f-d,p-x,S-A).normalize(),i)n[4].setComponents(l,u,m,v).normalize(),n[5].setComponents(c-l,f-u,p-m,S-v).normalize();else if(n[4].setComponents(c-l,f-u,p-m,S-v).normalize(),e===Li)n[5].setComponents(c+l,f+u,p+m,S+v).normalize();else if(e===ws)n[5].setComponents(l,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Wn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Wn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Wn)}intersectsSprite(t){Wn.center.set(0,0,0);let e=Df.distanceTo(t.center);return Wn.radius=.7071067811865476+e,Wn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Wn)}intersectsSphere(t){let e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let n=e[i];if(ga.x=n.normal.x>0?t.max.x:t.min.x,ga.y=n.normal.y>0?t.max.y:t.min.y,ga.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(ga)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ps=class extends on{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Dt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Hh=new ue,Kl=new mr,xa=new an,_a=new k,$n=class extends Le{constructor(t=new fe,e=new Ps){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),xa.copy(i.boundingSphere),xa.applyMatrix4(n),xa.radius+=r,t.ray.intersectsSphere(xa)===!1)return;Hh.copy(n).invert(),Kl.copy(t.ray).applyMatrix4(Hh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,x=f;g<x;g++){let m=c.getX(g);_a.fromBufferAttribute(d,m),Gh(_a,m,l,n,t,e,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,x=f;g<x;g++)_a.fromBufferAttribute(d,g),Gh(_a,g,l,n,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Gh(s,t,e,i,n,r,a){let o=Kl.distanceSqToPoint(s);if(o<e){let l=new k;Kl.closestPointToPoint(s,l),l.applyMatrix4(i);let c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var xr=class extends si{constructor(t=[],e=In,i,n,r,a,o,l,c,h){super(t,e,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ln=class extends si{constructor(t,e,i,n,r,a,o,l,c){super(t,e,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Sn=class extends si{constructor(t,e,i=Bi,n,r,a,o=He,l=He,c,h=Wi,d=1){if(h!==Wi&&h!==Dn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Es(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Fa=class extends Sn{constructor(t,e=Bi,i=In,n,r,a=He,o=He,l,c=Wi){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,i,n,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},_r=class extends si{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Mi=class s extends fe{constructor(t=1,e=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};let o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,r,4),g("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(h,3)),this.setAttribute("uv",new Vt(d,2));function g(x,m,p,y,A,v,S,w,R,_,M){let E=v/R,C=S/_,P=v/2,D=S/2,L=w/2,O=R+1,X=_+1,$=0,st=0,W=new k;for(let Q=0;Q<X;Q++){let it=Q*C-D;for(let vt=0;vt<O;vt++){let St=vt*E-P;W[x]=St*y,W[m]=it*A,W[p]=L,c.push(W.x,W.y,W.z),W[x]=0,W[m]=0,W[p]=w>0?1:-1,h.push(W.x,W.y,W.z),d.push(vt/R),d.push(1-Q/_),$+=1}}for(let Q=0;Q<_;Q++)for(let it=0;it<R;it++){let vt=u+it+O*Q,St=u+it+O*(Q+1),ce=u+(it+1)+O*(Q+1),Zt=u+(it+1)+O*Q;l.push(vt,St,Zt),l.push(St,ce,Zt),st+=6}o.addGroup(f,st,M),f+=st,u+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Yn=class s extends fe{constructor(t=1,e=1,i=4,n=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:n,heightSegments:r},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),n=Math.max(3,Math.floor(n)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=e/2,d=Math.PI/2*t,u=e,f=2*d+u,g=i*2+r,x=n+1,m=new k,p=new k;for(let y=0;y<=g;y++){let A=0,v=0,S=0,w=0;if(y<=i){let M=y/i,E=M*Math.PI/2;v=-h-t*Math.cos(E),S=t*Math.sin(E),w=-t*Math.cos(E),A=M*d}else if(y<=i+r){let M=(y-i)/r;v=-h+M*e,S=t,w=0,A=d+M*u}else{let M=(y-i-r)/i,E=M*Math.PI/2;v=h+t*Math.sin(E),S=t*Math.cos(E),w=t*Math.sin(E),A=d+u+M*d}let R=Math.max(0,Math.min(1,A/f)),_=0;y===0?_=.5/n:y===g&&(_=-.5/n);for(let M=0;M<=n;M++){let E=M/n,C=E*Math.PI*2,P=Math.sin(C),D=Math.cos(C);p.x=-S*D,p.y=v,p.z=S*P,o.push(p.x,p.y,p.z),m.set(-S*D,w,S*P),m.normalize(),l.push(m.x,m.y,m.z),c.push(E+_,R)}if(y>0){let M=(y-1)*x;for(let E=0;E<n;E++){let C=M+E,P=M+E+1,D=y*x+E,L=y*x+E+1;a.push(C,P,D),a.push(P,L,D)}}}this.setIndex(a),this.setAttribute("position",new Vt(o,3)),this.setAttribute("normal",new Vt(l,3)),this.setAttribute("uv",new Vt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Zn=class s extends fe{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new k,h=new Yt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=i+d/e*n;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Vt(a,3)),this.setAttribute("normal",new Vt(o,3)),this.setAttribute("uv",new Vt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},cn=class s extends fe{constructor(t=1,e=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;n=Math.floor(n),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,x=[],m=i/2,p=0;y(),a===!1&&(t>0&&A(!0),e>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new Vt(d,3)),this.setAttribute("normal",new Vt(u,3)),this.setAttribute("uv",new Vt(f,2));function y(){let v=new k,S=new k,w=0,R=(e-t)/i;for(let _=0;_<=r;_++){let M=[],E=_/r,C=E*(e-t)+t;for(let P=0;P<=n;P++){let D=P/n,L=D*l+o,O=Math.sin(L),X=Math.cos(L);S.x=C*O,S.y=-E*i+m,S.z=C*X,d.push(S.x,S.y,S.z),v.set(O,R,X).normalize(),u.push(v.x,v.y,v.z),f.push(D,1-E),M.push(g++)}x.push(M)}for(let _=0;_<n;_++)for(let M=0;M<r;M++){let E=x[M][_],C=x[M+1][_],P=x[M+1][_+1],D=x[M][_+1];(t>0||M!==0)&&(h.push(E,C,D),w+=3),(e>0||M!==r-1)&&(h.push(C,P,D),w+=3)}c.addGroup(p,w,0),p+=w}function A(v){let S=g,w=new Yt,R=new k,_=0,M=v===!0?t:e,E=v===!0?1:-1;for(let P=1;P<=n;P++)d.push(0,m*E,0),u.push(0,E,0),f.push(.5,.5),g++;let C=g;for(let P=0;P<=n;P++){let L=P/n*l+o,O=Math.cos(L),X=Math.sin(L);R.x=M*X,R.y=m*E,R.z=M*O,d.push(R.x,R.y,R.z),u.push(0,E,0),w.x=O*.5+.5,w.y=X*.5*E+.5,f.push(w.x,w.y),g++}for(let P=0;P<n;P++){let D=S+P,L=C+P;v===!0?h.push(L,L+1,D):h.push(L+1,L,D),_+=3}c.addGroup(p,_,v===!0?1:2),p+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},wn=class s extends cn{constructor(t=1,e=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var De=class s extends fe{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,d=t/o,u=e/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let y=p*u-a;for(let A=0;A<c;A++){let v=A*d-r;g.push(v,-y,0),x.push(0,0,1),m.push(A/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){let A=y+c*p,v=y+c*(p+1),S=y+1+c*(p+1),w=y+1+c*p;f.push(A,v,w),f.push(v,S,w)}this.setIndex(f),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(x,3)),this.setAttribute("uv",new Vt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},hn=class s extends fe{constructor(t=.5,e=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);let o=[],l=[],c=[],h=[],d=t,u=(e-t)/n,f=new k,g=new Yt;for(let x=0;x<=n;x++){for(let m=0;m<=i;m++){let p=r+m/i*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<n;x++){let m=x*(i+1);for(let p=0;p<i;p++){let y=p+m,A=y,v=y+i+1,S=y+i+2,w=y+1;o.push(A,v,w),o.push(v,S,w)}}this.setIndex(o),this.setAttribute("position",new Vt(l,3)),this.setAttribute("normal",new Vt(c,3)),this.setAttribute("uv",new Vt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var pi=class s extends fe{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new k,u=new k,f=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){let y=[],A=p/i,v=a+A*o,S=t*Math.cos(v),w=Math.sqrt(t*t-S*S),R=0;p===0&&a===0?R=.5/e:p===i&&l===Math.PI&&(R=-.5/e);for(let _=0;_<=e;_++){let M=_/e,E=n+M*r;d.x=-w*Math.cos(E),d.y=S,d.z=w*Math.sin(E),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(M+R,1-A),y.push(c++)}h.push(y)}for(let p=0;p<i;p++)for(let y=0;y<e;y++){let A=h[p][y+1],v=h[p][y],S=h[p+1][y],w=h[p+1][y+1];(p!==0||a>0)&&f.push(A,v,w),(p!==i-1||l<Math.PI)&&f.push(v,S,w)}this.setIndex(f),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(x,3)),this.setAttribute("uv",new Vt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var vr=class s extends fe{constructor(t=1,e=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);let l=[],c=[],h=[],d=[],u=new k,f=new k,g=new k;for(let x=0;x<=i;x++){let m=a+x/i*o;for(let p=0;p<=n;p++){let y=p/n*r;f.x=(t+e*Math.cos(m))*Math.cos(y),f.y=(t+e*Math.cos(m))*Math.sin(y),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),u.x=t*Math.cos(y),u.y=t*Math.sin(y),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/n),d.push(x/i)}}for(let x=1;x<=i;x++)for(let m=1;m<=n;m++){let p=(n+1)*x+m-1,y=(n+1)*(x-1)+m-1,A=(n+1)*(x-1)+m,v=(n+1)*x+m;l.push(p,y,v),l.push(y,A,v)}this.setIndex(l),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(h,3)),this.setAttribute("uv",new Vt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Qn(s){let t={};for(let e in s){t[e]={};for(let i in s[e]){let n=s[e][i];if(Vh(n))n.isRenderTargetTexture?(Bt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone();else if(Array.isArray(n))if(Vh(n[0])){let r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();t[e][i]=r}else t[e][i]=n.slice();else t[e][i]=n}}return t}function ti(s){let t={};for(let e=0;e<s.length;e++){let i=Qn(s[e]);for(let n in i)t[n]=i[n]}return t}function Vh(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Nf(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function bc(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}var Nu={clone:Qn,merge:ti},Uf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ff=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$e=class extends on{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uf,this.fragmentShader=Ff,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qn(t.uniforms),this.uniformsGroups=Nf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let n in this.uniforms){let a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let n=t.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=e[n.value]||null;break;case"c":this.uniforms[i].value=new Dt().setHex(n.value);break;case"v2":this.uniforms[i].value=new Yt().fromArray(n.value);break;case"v3":this.uniforms[i].value=new k().fromArray(n.value);break;case"v4":this.uniforms[i].value=new be().fromArray(n.value);break;case"m3":this.uniforms[i].value=new zt().fromArray(n.value);break;case"m4":this.uniforms[i].value=new ue().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ba=class extends $e{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ge=class extends on{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ho,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var ka=class extends on{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Oa=class extends on{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function vs(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Wl(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var Tn=class{constructor(t,e,i,n){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,n=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<n)){for(let o=i+2;;){if(n===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=n,n=e[++i],t<n)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(n=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,t,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=t*n;for(let a=0;a!==n;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},za=class extends Tn{constructor(t,e,i,n){super(t,e,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$l,endingEnd:$l}}intervalChanged_(t,e,i){let n=this.parameterPositions,r=t-2,a=t+1,o=n[r],l=n[a];if(o===void 0)switch(this.getSettings_().endingStart){case Yl:r=t,o=2*e-i;break;case Zl:r=n.length-2,o=e+n[r]-n[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Yl:a=t,l=2*i-e;break;case Zl:a=1,l=i+n[1]-n[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(i-e)/(n-e),x=g*g,m=x*g,p=-u*m+2*u*x-u*g,y=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*g+1,A=(-1-f)*m+(1.5+f)*x+.5*g,v=f*m-f*x;for(let S=0;S!==o;++S)r[S]=p*a[h+S]+y*a[c+S]+A*a[l+S]+v*a[d+S];return r}},Ha=class extends Tn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(n-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},Ga=class extends Tn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t){return this.copySampleValue_(t-1)}},Va=class extends Tn{interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(i-e)/(n-e),x=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*x+a[l+m]*g;return r}let u=o*2,f=t-1;for(let g=0;g!==o;++g){let x=a[c+g],m=a[l+g],p=f*u+g*2,y=d[p],A=d[p+1],v=t*u+g*2,S=h[v],w=h[v+1],R=kf(i,e,y,S,n);r[g]=Uu(R,x,A,w,m)}return r}};function Uu(s,t,e,i,n){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*i+s*s*s*n}function Bf(s,t,e,i,n){let r=1-s;return 3*r*r*(e-t)+6*r*s*(i-e)+3*s*s*(n-i)}function kf(s,t,e,i,n){let r=(s-t)/(n-t);for(let a=0;a<8;a++){let o=Uu(r,t,e,i,n)-s;if(Math.abs(o)<1e-10)break;let l=Bf(r,t,e,i,n);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var mi=class{constructor(t,e,i,n){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=vs(e,this.TimeBufferType),this.values=vs(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:vs(t.times,Array),values:vs(t.values,Array)};let n=t.getInterpolation();n!==t.DefaultInterpolation&&(i.interpolation=n),Wl(t.settings)&&(i.settings={inTangents:vs(t.settings.inTangents,Array),outTangents:vs(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Ga(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ha(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new za(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Va(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case rr:e=this.InterpolantFactoryMethodDiscrete;break;case Ia:e=this.InterpolantFactoryMethodLinear;break;case ba:e=this.InterpolantFactoryMethodSmooth;break;case ql:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Bt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return rr;case this.InterpolantFactoryMethodLinear:return Ia;case this.InterpolantFactoryMethodSmooth:return ba;case this.InterpolantFactoryMethodBezier:return ql}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]*=t;Wl(this.settings)&&(Wh(this.settings.inTangents,t),Wh(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,n=i.length,r=0,a=n-1;for(;r!==n&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==n){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ot("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,n=this.values,r=i.length;r===0&&(Ot("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Ot("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Ot("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(n!==void 0&&ff(n))for(let o=0,l=n.length;o!==l;++o){let c=n[o];if(isNaN(c)){Ot("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===ba,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(n)l=!0;else{let d=o*i,u=d-i,f=d+i;for(let g=0;g!==i;++g){let x=e[d+g];if(x!==e[u+g]||x!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*i,u=a*i;for(let f=0;f!==i;++f)e[u+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,n=new i(this.name,t,e);return n.createInterpolant=this.createInterpolant,Wl(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Wh(s,t){for(let e=0,i=s.length;e!==i;e+=2)s[e]*=t}mi.prototype.ValueTypeName="";mi.prototype.TimeBufferType=Float32Array;mi.prototype.ValueBufferType=Float32Array;mi.prototype.DefaultInterpolation=Ia;var En=class extends mi{constructor(t,e,i){super(t,e,i)}};En.prototype.ValueTypeName="bool";En.prototype.ValueBufferType=Array;En.prototype.DefaultInterpolation=rr;En.prototype.InterpolantFactoryMethodLinear=void 0;En.prototype.InterpolantFactoryMethodSmooth=void 0;var Wa=class extends mi{constructor(t,e,i,n){super(t,e,i,n)}};Wa.prototype.ValueTypeName="color";var Xa=class extends mi{constructor(t,e,i,n){super(t,e,i,n)}};Xa.prototype.ValueTypeName="number";var qa=class extends Tn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(n-e),c=t*o;for(let h=c+o;c!==h;c+=4)bi.slerpFlat(r,0,a,c-o,a,c,l);return r}},yr=class extends mi{constructor(t,e,i,n){super(t,e,i,n)}InterpolantFactoryMethodLinear(t){return new qa(this.times,this.values,this.getValueSize(),t)}};yr.prototype.ValueTypeName="quaternion";yr.prototype.InterpolantFactoryMethodSmooth=void 0;var An=class extends mi{constructor(t,e,i){super(t,e,i)}};An.prototype.ValueTypeName="string";An.prototype.ValueBufferType=Array;An.prototype.DefaultInterpolation=rr;An.prototype.InterpolantFactoryMethodLinear=void 0;An.prototype.InterpolantFactoryMethodSmooth=void 0;var $a=class extends mi{constructor(t,e,i,n){super(t,e,i,n)}};$a.prototype.ValueTypeName="vector";var Ya=class{constructor(t,e,i){let n=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Fu=new Ya,Za=class{constructor(t){this.manager=t!==void 0?t:Fu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(n,r){i.load(t,n,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Za.DEFAULT_MATERIAL_NAME="__DEFAULT";var br=class extends Le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Dt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Rn=class extends br{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Xl=new ue,Xh=new k,qh=new k,Ka=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Yt(512,512),this.mapType=hi,this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cs,this._frameExtents=new Yt(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Xh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Xh),qh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(qh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,n){Xl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Xl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=n?n.z/r.x:1,o=n?n.w/r.y:1,l=n?n.x/r.x:0,c=n?n.y/r.y:0;t.coordinateSystem===ws||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Xl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},va=new k,ya=new bi,Vi=new k,Mr=class extends Le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=Li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(va,ya,Vi),Vi.x===1&&Vi.y===1&&Vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,ya,Vi.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(va,ya,Vi),Vi.x===1&&Vi.y===1&&Vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,ya,Vi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},yn=new k,$h=new Yt,Yh=new Yt,Ue=class extends Mr{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=La*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Sl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return La*2*Math.atan(Math.tan(Sl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(yn.x,yn.y).multiplyScalar(-t/yn.z),yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(yn.x,yn.y).multiplyScalar(-t/yn.z)}getViewSize(t,e){return this.getViewBounds(t,$h,Yh),e.subVectors(Yh,$h)}setViewOffset(t,e,i,n,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Sl*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,e-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Is=class extends Mr{constructor(t=-1,e=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-t,a=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Jl=class extends Ka{constructor(){super(new Is(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ui=class extends br{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.shadow=new Jl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var ys=-90,bs=1,Ja=class extends Le{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new Ue(ys,bs,t,e);n.layers=this.layers,this.add(n);let r=new Ue(ys,bs,t,e);r.layers=this.layers,this.add(r);let a=new Ue(ys,bs,t,e);a.layers=this.layers,this.add(a);let o=new Ue(ys,bs,t,e);o.layers=this.layers,this.add(o);let l=new Ue(ys,bs,t,e);l.layers=this.layers,this.add(l);let c=new Ue(ys,bs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,n,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Li)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ws)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},ja=class extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Mc="\\[\\]\\.:\\/",Of=new RegExp("["+Mc+"]","g"),Sc="[^"+Mc+"]",zf="[^"+Mc.replace("\\.","")+"]",Hf=/((?:WC+[\/:])*)/.source.replace("WC",Sc),Gf=/(WCOD+)?/.source.replace("WCOD",zf),Vf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Sc),Wf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Sc),Xf=new RegExp("^"+Hf+Gf+Vf+Wf+"$"),qf=["material","materials","bones","map"],jl=class{constructor(t,e,i){let n=i||ve.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,n)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},ve=class s{constructor(t,e,i){this.path=e,this.parsedPath=i||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,i):new s(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Of,"")}static parseTrackName(t){let e=Xf.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);qf.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},n=i(t.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)t[e++]=i[n]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,n=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Bt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ot("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ot("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ot("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Ot("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Ot("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[n];if(a===void 0){let c=e.nodeName;Ot("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!t.geometry){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ve.Composite=jl;ve.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ve.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ve.prototype.GetterByBindingType=[ve.prototype._getValue_direct,ve.prototype._getValue_array,ve.prototype._getValue_arrayElement,ve.prototype._getValue_toArray];ve.prototype.SetterByBindingTypeAndVersioning=[[ve.prototype._setValue_direct,ve.prototype._setValue_direct_setNeedsUpdate,ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_array,ve.prototype._setValue_array_setNeedsUpdate,ve.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_arrayElement,ve.prototype._setValue_arrayElement_setNeedsUpdate,ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_fromArray,ve.prototype._setValue_fromArray_setNeedsUpdate,ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var W_=new Float32Array(1);var Cc=class Cc{constructor(t,e,i,n){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,n){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=n,this}};Cc.prototype.isMatrix2=!0;var Ql=Cc;function wc(s,t,e,i){let n=$f(i);switch(e){case xc:return s*t;case ao:return s*t/n.components*n.byteLength;case oo:return s*t/n.components*n.byteLength;case Nn:return s*t*2/n.components*n.byteLength;case lo:return s*t*2/n.components*n.byteLength;case _c:return s*t*3/n.components*n.byteLength;case wi:return s*t*4/n.components*n.byteLength;case co:return s*t*4/n.components*n.byteLength;case Ar:case Rr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Cr:case Pr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case uo:case po:return Math.max(s,16)*Math.max(t,8)/4;case ho:case fo:return Math.max(s,8)*Math.max(t,8)/2;case mo:case go:case _o:case vo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case xo:case Ir:case yo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case bo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Mo:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case So:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case wo:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case To:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Eo:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Ao:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Ro:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Co:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Po:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Io:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Lo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Do:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case No:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Uo:case Fo:case Bo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case ko:case Oo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Lr:case zo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function $f(s){switch(s){case hi:case fc:return{byteLength:1,components:1};case Ds:case pc:case ki:return{byteLength:2,components:1};case so:case ro:return{byteLength:2,components:4};case Bi:case no:case Si:return{byteLength:4,components:1};case mc:case gc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Bt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function sd(){let s=null,t=!1,e=null,i=null;function n(r,a){i=s.requestAnimationFrame(n),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function tp(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let x=d[f];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}var ep=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ip=`#ifdef USE_ALPHAHASH
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
#endif`,np=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ap=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,op=`#ifdef USE_AOMAP
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
#endif`,lp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cp=`#ifdef USE_BATCHING
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
#endif`,hp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,up=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,pp=`#ifdef USE_IRIDESCENCE
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
#endif`,mp=`#ifdef USE_BUMPMAP
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
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,bp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Sp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,wp=`#define PI 3.141592653589793
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
} // validated`,Tp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ep=`vec3 transformedNormal = objectNormal;
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
#endif`,Ap=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ip="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dp=`#ifdef USE_ENVMAP
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
#endif`,Np=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Up=`#ifdef USE_ENVMAP
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
#endif`,Fp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bp=`#ifdef USE_ENVMAP
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
#endif`,kp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Op=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gp=`#ifdef USE_GRADIENTMAP
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
}`,Vp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,$p=`#ifdef USE_ENVMAP
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
#endif`,Yp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Kp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jp=`PhysicalMaterial material;
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
#endif`,Qp=`uniform sampler2D dfgLUT;
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
}`,t0=`
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
#endif`,e0=`#if defined( RE_IndirectDiffuse )
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
#endif`,i0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,n0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,s0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,r0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,a0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,o0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,l0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,c0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,h0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,u0=`#if defined( USE_POINTS_UV )
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
#endif`,d0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,f0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,p0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,m0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,g0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,x0=`#ifdef USE_MORPHTARGETS
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
#endif`,_0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,v0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,y0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,b0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,M0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,S0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,w0=`#ifdef USE_NORMALMAP
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
#endif`,T0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,E0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,A0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,R0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,C0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,P0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,I0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,L0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,D0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,N0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,U0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,F0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,B0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,k0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,O0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,z0=`float getShadowMask() {
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
}`,H0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,G0=`#ifdef USE_SKINNING
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
#endif`,V0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,W0=`#ifdef USE_SKINNING
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
#endif`,X0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,q0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Y0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Z0=`#ifdef USE_TRANSMISSION
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
#endif`,K0=`#ifdef USE_TRANSMISSION
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
#endif`,J0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,j0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,em=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,im=`uniform sampler2D t2D;
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
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,am=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,om=`#include <common>
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
}`,lm=`#if DEPTH_PACKING == 3200
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
}`,cm=`#define DISTANCE
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
}`,hm=`#define DISTANCE
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
}`,um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fm=`uniform float scale;
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
}`,pm=`uniform vec3 diffuse;
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
}`,mm=`#include <common>
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
}`,gm=`uniform vec3 diffuse;
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
}`,xm=`#define LAMBERT
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
}`,_m=`#define LAMBERT
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
}`,vm=`#define MATCAP
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
}`,ym=`#define MATCAP
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
}`,bm=`#define NORMAL
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
}`,Mm=`#define NORMAL
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
}`,Sm=`#define PHONG
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
}`,wm=`#define PHONG
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
}`,Tm=`#define STANDARD
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
}`,Em=`#define STANDARD
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
}`,Am=`#define TOON
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
}`,Rm=`#define TOON
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
}`,Cm=`uniform float size;
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
}`,Pm=`uniform vec3 diffuse;
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
}`,Im=`#include <common>
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
}`,Lm=`uniform vec3 color;
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
}`,Dm=`uniform float rotation;
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
}`,Nm=`uniform vec3 diffuse;
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
}`,Xt={alphahash_fragment:ep,alphahash_pars_fragment:ip,alphamap_fragment:np,alphamap_pars_fragment:sp,alphatest_fragment:rp,alphatest_pars_fragment:ap,aomap_fragment:op,aomap_pars_fragment:lp,batching_pars_vertex:cp,batching_vertex:hp,begin_vertex:up,beginnormal_vertex:dp,bsdfs:fp,iridescence_fragment:pp,bumpmap_pars_fragment:mp,clipping_planes_fragment:gp,clipping_planes_pars_fragment:xp,clipping_planes_pars_vertex:_p,clipping_planes_vertex:vp,color_fragment:yp,color_pars_fragment:bp,color_pars_vertex:Mp,color_vertex:Sp,common:wp,cube_uv_reflection_fragment:Tp,defaultnormal_vertex:Ep,displacementmap_pars_vertex:Ap,displacementmap_vertex:Rp,emissivemap_fragment:Cp,emissivemap_pars_fragment:Pp,colorspace_fragment:Ip,colorspace_pars_fragment:Lp,envmap_fragment:Dp,envmap_common_pars_fragment:Np,envmap_pars_fragment:Up,envmap_pars_vertex:Fp,envmap_physical_pars_fragment:$p,envmap_vertex:Bp,fog_vertex:kp,fog_pars_vertex:Op,fog_fragment:zp,fog_pars_fragment:Hp,gradientmap_pars_fragment:Gp,lightmap_pars_fragment:Vp,lights_lambert_fragment:Wp,lights_lambert_pars_fragment:Xp,lights_pars_begin:qp,lights_toon_fragment:Yp,lights_toon_pars_fragment:Zp,lights_phong_fragment:Kp,lights_phong_pars_fragment:Jp,lights_physical_fragment:jp,lights_physical_pars_fragment:Qp,lights_fragment_begin:t0,lights_fragment_maps:e0,lights_fragment_end:i0,lightprobes_pars_fragment:n0,logdepthbuf_fragment:s0,logdepthbuf_pars_fragment:r0,logdepthbuf_pars_vertex:a0,logdepthbuf_vertex:o0,map_fragment:l0,map_pars_fragment:c0,map_particle_fragment:h0,map_particle_pars_fragment:u0,metalnessmap_fragment:d0,metalnessmap_pars_fragment:f0,morphinstance_vertex:p0,morphcolor_vertex:m0,morphnormal_vertex:g0,morphtarget_pars_vertex:x0,morphtarget_vertex:_0,normal_fragment_begin:v0,normal_fragment_maps:y0,normal_pars_fragment:b0,normal_pars_vertex:M0,normal_vertex:S0,normalmap_pars_fragment:w0,clearcoat_normal_fragment_begin:T0,clearcoat_normal_fragment_maps:E0,clearcoat_pars_fragment:A0,iridescence_pars_fragment:R0,opaque_fragment:C0,packing:P0,premultiplied_alpha_fragment:I0,project_vertex:L0,dithering_fragment:D0,dithering_pars_fragment:N0,roughnessmap_fragment:U0,roughnessmap_pars_fragment:F0,shadowmap_pars_fragment:B0,shadowmap_pars_vertex:k0,shadowmap_vertex:O0,shadowmask_pars_fragment:z0,skinbase_vertex:H0,skinning_pars_vertex:G0,skinning_vertex:V0,skinnormal_vertex:W0,specularmap_fragment:X0,specularmap_pars_fragment:q0,tonemapping_fragment:$0,tonemapping_pars_fragment:Y0,transmission_fragment:Z0,transmission_pars_fragment:K0,uv_pars_fragment:J0,uv_pars_vertex:j0,uv_vertex:Q0,worldpos_vertex:tm,background_vert:em,background_frag:im,backgroundCube_vert:nm,backgroundCube_frag:sm,cube_vert:rm,cube_frag:am,depth_vert:om,depth_frag:lm,distance_vert:cm,distance_frag:hm,equirect_vert:um,equirect_frag:dm,linedashed_vert:fm,linedashed_frag:pm,meshbasic_vert:mm,meshbasic_frag:gm,meshlambert_vert:xm,meshlambert_frag:_m,meshmatcap_vert:vm,meshmatcap_frag:ym,meshnormal_vert:bm,meshnormal_frag:Mm,meshphong_vert:Sm,meshphong_frag:wm,meshphysical_vert:Tm,meshphysical_frag:Em,meshtoon_vert:Am,meshtoon_frag:Rm,points_vert:Cm,points_frag:Pm,shadow_vert:Im,shadow_frag:Lm,sprite_vert:Dm,sprite_frag:Nm},dt={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new Yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new Yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},Zi={basic:{uniforms:ti([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:ti([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Dt(0)},envMapIntensity:{value:1}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:ti([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:ti([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:ti([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:ti([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:ti([dt.points,dt.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:ti([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:ti([dt.common,dt.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:ti([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:ti([dt.sprite,dt.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distance:{uniforms:ti([dt.common,dt.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distance_vert,fragmentShader:Xt.distance_frag},shadow:{uniforms:ti([dt.lights,dt.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};Zi.physical={uniforms:ti([Zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new Yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new Yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new Yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};var Wo={r:0,b:0,g:0},Um=new ue,rd=new zt;rd.set(-1,0,0,0,1,0,0,0,1);function Fm(s,t,e,i,n,r){let a=new Dt(0),o=n===!0?0:1,l,c,h=null,d=0,u=null;function f(y){let A=y.isScene===!0?y.background:null;if(A&&A.isTexture){let v=y.backgroundBlurriness>0;A=t.get(A,v)}return A}function g(y){let A=!1,v=f(y);v===null?m(a,o):v&&v.isColor&&(m(v,1),A=!0);let S=s.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||A)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(y,A){let v=f(A);v&&(v.isCubeTexture||v.mapping===Tr)?(c===void 0&&(c=new Ut(new Mi(1,1,1),new $e({name:"BackgroundCubeMaterial",uniforms:Qn(Zi.backgroundCube.uniforms),vertexShader:Zi.backgroundCube.vertexShader,fragmentShader:Zi.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Um.makeRotationFromEuler(A.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(rd),c.material.toneMapped=Qt.getTransfer(v.colorSpace)!==le,(h!==v||d!==v.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Ut(new De(2,2),new $e({name:"BackgroundMaterial",uniforms:Qn(Zi.background.uniforms),vertexShader:Zi.background.vertexShader,fragmentShader:Zi.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=Qt.getTransfer(v.colorSpace)!==le,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,A){y.getRGB(Wo,bc(s)),e.buffers.color.setClear(Wo.r,Wo.g,Wo.b,A,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,A=1){a.set(y),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:g,addToRenderList:x,dispose:p}}function Bm(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=u(null),r=n,a=!1;function o(C,P,D,L,O){let X=!1,$=d(C,L,D,P);r!==$&&(r=$,c(r.object)),X=f(C,L,D,O),X&&g(C,L,D,O),O!==null&&t.update(O,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,v(C,P,D,L),O!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return s.createVertexArray()}function c(C){return s.bindVertexArray(C)}function h(C){return s.deleteVertexArray(C)}function d(C,P,D,L){let O=L.wireframe===!0,X=i[P.id];X===void 0&&(X={},i[P.id]=X);let $=C.isInstancedMesh===!0?C.id:0,st=X[$];st===void 0&&(st={},X[$]=st);let W=st[D.id];W===void 0&&(W={},st[D.id]=W);let Q=W[O];return Q===void 0&&(Q=u(l()),W[O]=Q),Q}function u(C){let P=[],D=[],L=[];for(let O=0;O<e;O++)P[O]=0,D[O]=0,L[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:D,attributeDivisors:L,object:C,attributes:{},index:null}}function f(C,P,D,L){let O=r.attributes,X=P.attributes,$=0,st=D.getAttributes();for(let W in st)if(st[W].location>=0){let it=O[W],vt=X[W];if(vt===void 0&&(W==="instanceMatrix"&&C.instanceMatrix&&(vt=C.instanceMatrix),W==="instanceColor"&&C.instanceColor&&(vt=C.instanceColor)),it===void 0||it.attribute!==vt||vt&&it.data!==vt.data)return!0;$++}return r.attributesNum!==$||r.index!==L}function g(C,P,D,L){let O={},X=P.attributes,$=0,st=D.getAttributes();for(let W in st)if(st[W].location>=0){let it=X[W];it===void 0&&(W==="instanceMatrix"&&C.instanceMatrix&&(it=C.instanceMatrix),W==="instanceColor"&&C.instanceColor&&(it=C.instanceColor));let vt={};vt.attribute=it,it&&it.data&&(vt.data=it.data),O[W]=vt,$++}r.attributes=O,r.attributesNum=$,r.index=L}function x(){let C=r.newAttributes;for(let P=0,D=C.length;P<D;P++)C[P]=0}function m(C){p(C,0)}function p(C,P){let D=r.newAttributes,L=r.enabledAttributes,O=r.attributeDivisors;D[C]=1,L[C]===0&&(s.enableVertexAttribArray(C),L[C]=1),O[C]!==P&&(s.vertexAttribDivisor(C,P),O[C]=P)}function y(){let C=r.newAttributes,P=r.enabledAttributes;for(let D=0,L=P.length;D<L;D++)P[D]!==C[D]&&(s.disableVertexAttribArray(D),P[D]=0)}function A(C,P,D,L,O,X,$){$===!0?s.vertexAttribIPointer(C,P,D,O,X):s.vertexAttribPointer(C,P,D,L,O,X)}function v(C,P,D,L){x();let O=L.attributes,X=D.getAttributes(),$=P.defaultAttributeValues;for(let st in X){let W=X[st];if(W.location>=0){let Q=O[st];if(Q===void 0&&(st==="instanceMatrix"&&C.instanceMatrix&&(Q=C.instanceMatrix),st==="instanceColor"&&C.instanceColor&&(Q=C.instanceColor)),Q!==void 0){let it=Q.normalized,vt=Q.itemSize,St=t.get(Q);if(St===void 0)continue;let ce=St.buffer,Zt=St.type,ne=St.bytesPerElement,Z=Zt===s.INT||Zt===s.UNSIGNED_INT||Q.gpuType===no;if(Q.isInterleavedBufferAttribute){let et=Q.data,Mt=et.stride,Ht=Q.offset;if(et.isInstancedInterleavedBuffer){for(let yt=0;yt<W.locationSize;yt++)p(W.location+yt,et.meshPerAttribute);C.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let yt=0;yt<W.locationSize;yt++)m(W.location+yt);s.bindBuffer(s.ARRAY_BUFFER,ce);for(let yt=0;yt<W.locationSize;yt++)A(W.location+yt,vt/W.locationSize,Zt,it,Mt*ne,(Ht+vt/W.locationSize*yt)*ne,Z)}else{if(Q.isInstancedBufferAttribute){for(let et=0;et<W.locationSize;et++)p(W.location+et,Q.meshPerAttribute);C.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let et=0;et<W.locationSize;et++)m(W.location+et);s.bindBuffer(s.ARRAY_BUFFER,ce);for(let et=0;et<W.locationSize;et++)A(W.location+et,vt/W.locationSize,Zt,it,vt*ne,vt/W.locationSize*et*ne,Z)}}else if($!==void 0){let it=$[st];if(it!==void 0)switch(it.length){case 2:s.vertexAttrib2fv(W.location,it);break;case 3:s.vertexAttrib3fv(W.location,it);break;case 4:s.vertexAttrib4fv(W.location,it);break;default:s.vertexAttrib1fv(W.location,it)}}}}y()}function S(){M();for(let C in i){let P=i[C];for(let D in P){let L=P[D];for(let O in L){let X=L[O];for(let $ in X)h(X[$].object),delete X[$];delete L[O]}}delete i[C]}}function w(C){if(i[C.id]===void 0)return;let P=i[C.id];for(let D in P){let L=P[D];for(let O in L){let X=L[O];for(let $ in X)h(X[$].object),delete X[$];delete L[O]}}delete i[C.id]}function R(C){for(let P in i){let D=i[P];for(let L in D){let O=D[L];if(O[C.id]===void 0)continue;let X=O[C.id];for(let $ in X)h(X[$].object),delete X[$];delete O[C.id]}}}function _(C){for(let P in i){let D=i[P],L=C.isInstancedMesh===!0?C.id:0,O=D[L];if(O!==void 0){for(let X in O){let $=O[X];for(let st in $)h($[st].object),delete $[st];delete O[X]}delete D[L],Object.keys(D).length===0&&delete i[P]}}}function M(){E(),a=!0,r!==n&&(r=n,c(r.object))}function E(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:M,resetDefaultState:E,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function km(s,t,e){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Om(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(R){return!(R!==wi&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let _=R===ki&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==hi&&R!==Si&&!_&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Bt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Bt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),A=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=s.getParameter(s.MAX_SAMPLES),w=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:A,maxFragmentUniforms:v,maxSamples:S,samples:w}}function zm(s){let t=this,e=null,i=0,n=!1,r=!1,a=new Ii,o=new zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!n||g===null||g.length===0||r&&!m)r?h(null):c();else{let y=r?0:i,A=y*4,v=p.clippingState||null;l.value=v,v=h(g,u,A,f);for(let S=0;S!==A;++S)v[S]=e[S];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let A=0,v=f;A!==x;++A,v+=4)a.copy(d[A]).applyMatrix4(y,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}var Fs=4,Hm=6,Gm=20,Vm=256,Ur=new Is,Bu=new Dt,Pc=null,Ic=0,Lc=0,Dc=!1,Wm=new k,ts=new k,Un=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,r={}){let{size:a=256,position:o=Wm}=r;Pc=this._renderer.getRenderTarget(),Ic=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),Dc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ou(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Pc,Ic,Lc),this._renderer.xr.enabled=Dc,t.scissorTest=!1,Us(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===In||t.mapping===jn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Pc=this._renderer.getRenderTarget(),Ic=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),Dc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:qe,minFilter:qe,generateMipmaps:!1,type:ki,format:wi,colorSpace:ar,depthBuffer:!1},n=ku(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ku(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Xm(r)),this._blurMaterial=$m(r,t,e),this._ggxMaterial=qm(r,t,e)}return n}_compileMaterial(t){let e=new Ut(new fe,t);this._renderer.compile(e,Ur)}_sceneToCubeUV(t,e,i,n,r){let l=new Ue(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Bu),d.toneMapping=Fi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(n),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ut(new Mi,new ie({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,p=!1,y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,p=!0):(m.color.copy(Bu),p=!0);for(let A=0;A<6;A++){let v=A%3;v===0?(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[A],r.y,r.z)):v===1?(l.up.set(0,0,c[A]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[A],r.z)):(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[A]));let S=this._cubeSize;Us(n,v*S,A>2?S:0,S,S),d.setRenderTarget(n),p&&d.render(x,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=y}_textureToCubeUV(t,e){let i=this._renderer,n=t.mapping===In||t.mapping===jn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=zu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ou());let r=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Us(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Ur)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let n=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-Fs?i-g+Fs:0),p=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,Us(r,m,p,3*x,2*x),n.setRenderTarget(r),n.render(o,Ur),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,Us(t,m,p,3*x,2*x),n.setRenderTarget(t),n.render(o,Ur)}_blur(t,e,i,n){let r=this._pingPongRenderTarget,a=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,n,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[n];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[n],d=3*h*(n>this._lodMax-Fs?n-this._lodMax+Fs:0),u=4*(this._cubeSize-h);Us(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(l,Ur)}};function Xm(s){let t=[],e=[],i=s,n=s-Fs+1+Hm;for(let r=0;r<n;r++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,g=new Float32Array(f*u*d),x=new Float32Array(f*u*d);for(let p=0;p<d;p++){let y=p%3*2/3-1,A=p>2?0:-1,v=[y,A,0,y+2/3,A,0,y+2/3,A+1,0,y,A,0,y+2/3,A+1,0,y,A+1,0];g.set(v,f*u*p);for(let S=0;S<u;S++){let w=h[S*2]*2-1,R=h[S*2+1]*2-1;p===0?ts.set(1,R,w):p===1?ts.set(-w,1,-R):p===2?ts.set(-w,R,1):p===3?ts.set(-1,R,-w):p===4?ts.set(-w,-1,R):ts.set(w,R,-1),ts.toArray(x,(p*u+S)*f)}}let m=new fe;m.setAttribute("position",new Se(g,f)),m.setAttribute("outputDirection",new Se(x,f)),e.push(new Ut(m,null)),i>Fs&&i--}return{lodMeshes:e,sizeLods:t}}function ku(s,t,e){let i=new Qe(s,t,e);return i.texture.mapping=Tr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Us(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function qm(s,t,e){return new $e({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Vm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Yo(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function $m(s,t,e){return new $e({name:"SphericalGaussianBlur",defines:{SAMPLES:Gm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Yo(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Ou(){return new $e({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yo(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function zu(){return new $e({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Yo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var qo=class extends Qe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new xr(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Mi(5,5,5),r=new $e({name:"CubemapFromEquirect",uniforms:Qn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ye,blending:$i});r.uniforms.tEquirect.value=e;let a=new Ut(n,r),o=e.minFilter;return e.minFilter===Ln&&(e.minFilter=qe),new Ja(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(r)}};function Ym(s){let t=new WeakMap,e=new WeakMap,i=null;function n(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===to||f===eo)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let x=new qo(g.height);return x.fromEquirectangularTexture(s,u),t.set(u,x),u.addEventListener("dispose",c),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===to||f===eo,x=f===In||f===jn;if(g||x){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Un(s)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let y=u.image;return g&&y&&y.height>0||x&&y&&l(y)?(i===null&&(i=new Un(s)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===to?u.mapping=In:f===eo&&(u.mapping=jn),u}function l(u){let f=0,g=6;for(let x=0;x<g;x++)u[x]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:d}}function Zm(s){let t={};function e(i){if(t[i]!==void 0)return t[i];let n=s.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let n=e(i);return n===null&&Xn("WebGLRenderer: "+i+" extension not supported."),n}}}function Km(s,t,e,i){let n={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete n[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return n[u.id]===!0||(u.addEventListener("dispose",a),n[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],s.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,x=0;if(g===void 0)return;if(f!==null){let y=f.array;x=f.version;for(let A=0,v=y.length;A<v;A+=3){let S=y[A+0],w=y[A+1],R=y[A+2];u.push(S,w,w,R,R,S)}}else{let y=g.array;x=g.version;for(let A=0,v=y.length/3-1;A<v;A+=3){let S=A+0,w=A+1,R=A+2;u.push(S,w,w,R,R,S)}}let m=new(g.count>=65535?pr:fr)(u,1);m.version=x;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Jm(s,t,e){let i;function n(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){s.drawElements(i,u,r,d*a),e.update(u,i,1)}function c(d,u,f){f!==0&&(s.drawElementsInstanced(i,u,r,d*a,f),e.update(u,i,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,d,0,f);let x=0;for(let m=0;m<f;m++)x+=u[m];e.update(x,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function jm(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Ot("WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Qm(s,t,e){let i=new WeakMap,n=new be;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let M=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],A=0;f===!0&&(A=1),g===!0&&(A=2),x===!0&&(A=3);let v=o.attributes.position.count*A,S=1;v>t.maxTextureSize&&(S=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let w=new Float32Array(v*S*4*d),R=new cr(w,v,S,d);R.type=Si,R.needsUpdate=!0;let _=A*4;for(let E=0;E<d;E++){let C=m[E],P=p[E],D=y[E],L=v*S*4*E;for(let O=0;O<C.count;O++){let X=O*_;f===!0&&(n.fromBufferAttribute(C,O),w[L+X+0]=n.x,w[L+X+1]=n.y,w[L+X+2]=n.z,w[L+X+3]=0),g===!0&&(n.fromBufferAttribute(P,O),w[L+X+4]=n.x,w[L+X+5]=n.y,w[L+X+6]=n.z,w[L+X+7]=0),x===!0&&(n.fromBufferAttribute(D,O),w[L+X+8]=n.x,w[L+X+9]=n.y,w[L+X+10]=n.z,w[L+X+11]=D.itemSize===4?n.w:1)}}u={count:d,texture:R,size:new Yt(v,S)},i.set(o,u),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function tg(s,t,e,i,n){let r=new WeakMap;function a(c){let h=n.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var eg={[ac]:"LINEAR_TONE_MAPPING",[oc]:"REINHARD_TONE_MAPPING",[lc]:"CINEON_TONE_MAPPING",[wr]:"ACES_FILMIC_TONE_MAPPING",[hc]:"AGX_TONE_MAPPING",[uc]:"NEUTRAL_TONE_MAPPING",[cc]:"CUSTOM_TONE_MAPPING"};function ig(s,t,e,i,n,r){let a=new Qe(t,e,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new fe;c.setAttribute("position",new Vt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Vt([0,2,0,0,2,0],2));let h=new Ba({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Ut(c,h),u=new Is(-1,1,1,-1,0,1),f=null,g=null,x=!1,m,p=null,y=[],A=!1;this.setSize=function(v,S){a.setSize(v,S),o!==null&&o.setSize(v,S),l!==null&&l.setSize(v,S);for(let w=0;w<y.length;w++){let R=y[w];R.setSize&&R.setSize(v,S)}},this.setEffects=function(v){y=v,A=y.length>0&&y[0].isRenderPass===!0;let S=a.width,w=a.height;y.length>0&&o===null&&(o=new Qe(S,w,{type:ki,depthBuffer:!1,stencilBuffer:!1}),l=new Qe(S,w,{type:ki,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<y.length;R++){let _=y[R];_.setSize&&_.setSize(S,w)}},this.begin=function(v,S){if(x||v.toneMapping===Fi&&y.length===0)return!1;if(p=S,S!==null){let w=S.width,R=S.height;(a.width!==w||a.height!==R)&&this.setSize(w,R)}return A===!1&&v.setRenderTarget(a),m=v.toneMapping,v.toneMapping=Fi,!0},this.hasRenderPass=function(){return A},this.end=function(v,S){v.toneMapping=m,x=!0;let w=a,R=o;for(let _=0;_<y.length;_++){let M=y[_];M.enabled!==!1&&(M.render(v,R,w,S),M.needsSwap!==!1&&(w=R,R=R===o?l:o))}if(f!==v.outputColorSpace||g!==v.toneMapping){f=v.outputColorSpace,g=v.toneMapping,h.defines={},Qt.getTransfer(f)===le&&(h.defines.SRGB_TRANSFER="");let _=eg[g];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,v.setRenderTarget(p),v.render(d,u),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var ad=new si,Fc=new Sn(1,1),od=new cr,ld=new Ua,cd=new xr,Hu=[],Gu=[],Vu=new Float32Array(16),Wu=new Float32Array(9),Xu=new Float32Array(4);function ks(s,t,e){let i=s[0];if(i<=0||i>0)return s;let n=t*e,r=Hu[n];if(r===void 0&&(r=new Float32Array(n),Hu[n]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Fe(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function Be(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function Zo(s,t){let e=Gu[t];e===void 0&&(e=new Int32Array(t),Gu[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function ng(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function sg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;s.uniform2fv(this.addr,t),Be(e,t)}}function rg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;s.uniform3fv(this.addr,t),Be(e,t)}}function ag(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;s.uniform4fv(this.addr,t),Be(e,t)}}function og(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(Fe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Be(e,t)}else{if(Fe(e,i))return;Xu.set(i),s.uniformMatrix2fv(this.addr,!1,Xu),Be(e,i)}}function lg(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(Fe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Be(e,t)}else{if(Fe(e,i))return;Wu.set(i),s.uniformMatrix3fv(this.addr,!1,Wu),Be(e,i)}}function cg(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(Fe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Be(e,t)}else{if(Fe(e,i))return;Vu.set(i),s.uniformMatrix4fv(this.addr,!1,Vu),Be(e,i)}}function hg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function ug(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;s.uniform2iv(this.addr,t),Be(e,t)}}function dg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;s.uniform3iv(this.addr,t),Be(e,t)}}function fg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;s.uniform4iv(this.addr,t),Be(e,t)}}function pg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function mg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;s.uniform2uiv(this.addr,t),Be(e,t)}}function gg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;s.uniform3uiv(this.addr,t),Be(e,t)}}function xg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;s.uniform4uiv(this.addr,t),Be(e,t)}}function _g(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(Fc.compareFunction=e.isReversedDepthBuffer()?Vo:Go,r=Fc):r=ad,e.setTexture2D(t||r,n)}function vg(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||ld,n)}function yg(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||cd,n)}function bg(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||od,n)}function Mg(s){switch(s){case 5126:return ng;case 35664:return sg;case 35665:return rg;case 35666:return ag;case 35674:return og;case 35675:return lg;case 35676:return cg;case 5124:case 35670:return hg;case 35667:case 35671:return ug;case 35668:case 35672:return dg;case 35669:case 35673:return fg;case 5125:return pg;case 36294:return mg;case 36295:return gg;case 36296:return xg;case 35678:case 36198:case 36298:case 36306:case 35682:return _g;case 35679:case 36299:case 36307:return vg;case 35680:case 36300:case 36308:case 36293:return yg;case 36289:case 36303:case 36311:case 36292:return bg}}function Sg(s,t){s.uniform1fv(this.addr,t)}function wg(s,t){let e=ks(t,this.size,2);s.uniform2fv(this.addr,e)}function Tg(s,t){let e=ks(t,this.size,3);s.uniform3fv(this.addr,e)}function Eg(s,t){let e=ks(t,this.size,4);s.uniform4fv(this.addr,e)}function Ag(s,t){let e=ks(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Rg(s,t){let e=ks(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Cg(s,t){let e=ks(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Pg(s,t){s.uniform1iv(this.addr,t)}function Ig(s,t){s.uniform2iv(this.addr,t)}function Lg(s,t){s.uniform3iv(this.addr,t)}function Dg(s,t){s.uniform4iv(this.addr,t)}function Ng(s,t){s.uniform1uiv(this.addr,t)}function Ug(s,t){s.uniform2uiv(this.addr,t)}function Fg(s,t){s.uniform3uiv(this.addr,t)}function Bg(s,t){s.uniform4uiv(this.addr,t)}function kg(s,t,e){let i=this.cache,n=t.length,r=Zo(e,n);Fe(i,r)||(s.uniform1iv(this.addr,r),Be(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Fc:a=ad;for(let o=0;o!==n;++o)e.setTexture2D(t[o]||a,r[o])}function Og(s,t,e){let i=this.cache,n=t.length,r=Zo(e,n);Fe(i,r)||(s.uniform1iv(this.addr,r),Be(i,r));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||ld,r[a])}function zg(s,t,e){let i=this.cache,n=t.length,r=Zo(e,n);Fe(i,r)||(s.uniform1iv(this.addr,r),Be(i,r));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||cd,r[a])}function Hg(s,t,e){let i=this.cache,n=t.length,r=Zo(e,n);Fe(i,r)||(s.uniform1iv(this.addr,r),Be(i,r));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||od,r[a])}function Gg(s){switch(s){case 5126:return Sg;case 35664:return wg;case 35665:return Tg;case 35666:return Eg;case 35674:return Ag;case 35675:return Rg;case 35676:return Cg;case 5124:case 35670:return Pg;case 35667:case 35671:return Ig;case 35668:case 35672:return Lg;case 35669:case 35673:return Dg;case 5125:return Ng;case 36294:return Ug;case 36295:return Fg;case 36296:return Bg;case 35678:case 36198:case 36298:case 36306:case 35682:return kg;case 35679:case 36299:case 36307:return Og;case 35680:case 36300:case 36308:case 36293:return zg;case 36289:case 36303:case 36311:case 36292:return Hg}}var Bc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Mg(e.type)}},kc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Gg(e.type)}},Oc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let n=this.seq;for(let r=0,a=n.length;r!==a;++r){let o=n[r];o.setValue(t,e[o.id],i)}}},Nc=/(\w+)(\])?(\[|\.)?/g;function qu(s,t){s.seq.push(t),s.map[t.id]=t}function Vg(s,t,e){let i=s.name,n=i.length;for(Nc.lastIndex=0;;){let r=Nc.exec(i),a=Nc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){qu(e,c===void 0?new Bc(o,s,t):new kc(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new Oc(o),qu(e,d)),e=d}}}var Bs=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Vg(o,l,this)}let n=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(t,e,i,n){let r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){let n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){let i=[];for(let n=0,r=t.length;n!==r;++n){let a=t[n];a.id in e&&i.push(a)}return i}};function $u(s,t,e){let i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}var Wg=37297,Xg=0;function qg(s,t){let e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=n;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Yu=new zt;function $g(s){Qt._getMatrix(Yu,Qt.workingColorSpace,s);let t=`mat3( ${Yu.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(s)){case or:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return Bt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Zu(s,t,e){let i=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+qg(s.getShaderSource(t),o)}else return r}function Yg(s,t){let e=$g(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Zg={[ac]:"Linear",[oc]:"Reinhard",[lc]:"Cineon",[wr]:"ACESFilmic",[hc]:"AgX",[uc]:"Neutral",[cc]:"Custom"};function Kg(s,t){let e=Zg[t];return e===void 0?(Bt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Xo=new k;function Jg(){Qt.getLuminanceCoefficients(Xo);let s=Xo.x.toFixed(4),t=Xo.y.toFixed(4),e=Xo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Br).join(`
`)}function Qg(s){let t=[];for(let e in s){let i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function tx(s,t){let e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(t,n),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Br(s){return s!==""}function Ku(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ju(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ex=/^[ \t]*#include +<([\w\d./]+)>/gm;function zc(s){return s.replace(ex,nx)}var ix=new Map;function nx(s,t){let e=Xt[t];if(e===void 0){let i=ix.get(t);if(i!==void 0)e=Xt[i],Bt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return zc(e)}var sx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ju(s){return s.replace(sx,rx)}function rx(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Qu(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var ax={[Sr]:"SHADOWMAP_TYPE_PCF",[Ls]:"SHADOWMAP_TYPE_VSM"};function ox(s){return ax[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var lx={[In]:"ENVMAP_TYPE_CUBE",[jn]:"ENVMAP_TYPE_CUBE",[Tr]:"ENVMAP_TYPE_CUBE_UV"};function cx(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":lx[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var hx={[jn]:"ENVMAP_MODE_REFRACTION"};function ux(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":hx[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var dx={[rc]:"ENVMAP_BLENDING_MULTIPLY",[gu]:"ENVMAP_BLENDING_MIX",[xu]:"ENVMAP_BLENDING_ADD"};function fx(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":dx[s.combine]||"ENVMAP_BLENDING_NONE"}function px(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function mx(s,t,e,i){let n=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=ox(e),c=cx(e),h=ux(e),d=fx(e),u=px(e),f=jg(e),g=Qg(r),x=n.createProgram(),m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Br).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Br).join(`
`),p.length>0&&(p+=`
`)):(m=[Qu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Br).join(`
`),p=[Qu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Fi?"#define TONE_MAPPING":"",e.toneMapping!==Fi?Xt.tonemapping_pars_fragment:"",e.toneMapping!==Fi?Kg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,Yg("linearToOutputTexel",e.outputColorSpace),Jg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Br).join(`
`)),a=zc(a),a=Ku(a,e),a=Ju(a,e),o=zc(o),o=Ku(o,e),o=Ju(o,e),a=ju(a),o=ju(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===vc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===vc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let A=y+m+a,v=y+p+o,S=$u(n,n.VERTEX_SHADER,A),w=$u(n,n.FRAGMENT_SHADER,v);n.attachShader(x,S),n.attachShader(x,w),e.index0AttributeName!==void 0?n.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function R(C){if(s.debug.checkShaderErrors){let P=n.getProgramInfoLog(x)||"",D=n.getShaderInfoLog(S)||"",L=n.getShaderInfoLog(w)||"",O=P.trim(),X=D.trim(),$=L.trim(),st=!0,W=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(st=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,x,S,w);else{let Q=Zu(n,S,"vertex"),it=Zu(n,w,"fragment");Ot("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+O+`
`+Q+`
`+it)}else O!==""?Bt("WebGLProgram: Program Info Log:",O):(X===""||$==="")&&(W=!1);W&&(C.diagnostics={runnable:st,programLog:O,vertexShader:{log:X,prefix:m},fragmentShader:{log:$,prefix:p}})}n.deleteShader(S),n.deleteShader(w),_=new Bs(n,x),M=tx(n,x)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=n.getProgramParameter(x,Wg)),E},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Xg++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=w,this}var gx=0,Hc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let n=this._getShaderCacheForMaterial(t);return n.has(e)===!1&&(n.add(e),e.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Gc(t),e.set(t,i)),i}},Gc=class{constructor(t){this.id=gx++,this.code=t,this.usedTimes=0}};function xx(s){return s===Nn||s===Ir||s===Lr}function _x(s,t,e,i,n,r){let a=new hr,o=new Hc,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,M,E,C,P,D){let L=C.fog,O=P.geometry,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?C.environment:null,$=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,st=t.get(_.envMap||X,$),W=st&&st.mapping===Tr?st.image.height:null,Q=f[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Bt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let it=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,vt=it!==void 0?it.length:0,St=0;O.morphAttributes.position!==void 0&&(St=1),O.morphAttributes.normal!==void 0&&(St=2),O.morphAttributes.color!==void 0&&(St=3);let ce,Zt,ne,Z;if(Q){let ge=Zi[Q];ce=ge.vertexShader,Zt=ge.fragmentShader}else{ce=_.vertexShader,Zt=_.fragmentShader;let ge=o.getVertexShaderStage(_),ae=o.getFragmentShaderStage(_);o.update(_,ge,ae),ne=ge.id,Z=ae.id}let et=s.getRenderTarget(),Mt=s.state.buffers.depth.getReversed(),Ht=P.isInstancedMesh===!0,yt=P.isBatchedMesh===!0,$t=!!_.map,Ne=!!_.matcap,Kt=!!st,se=!!_.aoMap,me=!!_.lightMap,jt=!!_.bumpMap&&_.wireframe===!1,ye=!!_.normalMap,Oe=!!_.displacementMap,li=!!_.emissiveMap,Me=!!_.metalnessMap,Ce=!!_.roughnessMap,B=_.anisotropy>0,Ze=_.clearcoat>0,he=_.dispersion>0,I=_.retroreflectivity>0,b=_.iridescence>0,z=_.sheen>0,V=_.transmission>0,Y=B&&!!_.anisotropyMap,rt=Ze&&!!_.clearcoatMap,at=Ze&&!!_.clearcoatNormalMap,J=Ze&&!!_.clearcoatRoughnessMap,tt=b&&!!_.iridescenceMap,ot=b&&!!_.iridescenceThicknessMap,Pt=z&&!!_.sheenColorMap,ut=z&&!!_.sheenRoughnessMap,lt=!!_.specularMap,It=!!_.specularColorMap,Nt=!!_.specularIntensityMap,Gt=V&&!!_.transmissionMap,F=V&&!!_.thicknessMap,ct=!!_.gradientMap,j=!!_.alphaMap,ht=_.alphaTest>0,gt=!!_.alphaHash,nt=!!_.extensions,Lt=Fi;_.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Lt=s.toneMapping);let Rt={shaderID:Q,shaderType:_.type,shaderName:_.name,vertexShader:ce,fragmentShader:Zt,defines:_.defines,customVertexShaderID:ne,customFragmentShaderID:Z,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:yt,batchingColor:yt&&P._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&P.instanceColor!==null,instancingMorph:Ht&&P.morphTexture!==null,outputColorSpace:et===null?s.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Qt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:$t,matcap:Ne,envMap:Kt,envMapMode:Kt&&st.mapping,envMapCubeUVHeight:W,aoMap:se,lightMap:me,bumpMap:jt,normalMap:ye,displacementMap:Oe,emissiveMap:li,normalMapObjectSpace:ye&&_.normalMapType===yu,normalMapTangentSpace:ye&&_.normalMapType===Ho,packedNormalMap:ye&&_.normalMapType===Ho&&xx(_.normalMap.format),metalnessMap:Me,roughnessMap:Ce,anisotropy:B,anisotropyMap:Y,clearcoat:Ze,clearcoatMap:rt,clearcoatNormalMap:at,clearcoatRoughnessMap:J,dispersion:he,retroreflection:I,iridescence:b,iridescenceMap:tt,iridescenceThicknessMap:ot,sheen:z,sheenColorMap:Pt,sheenRoughnessMap:ut,specularMap:lt,specularColorMap:It,specularIntensityMap:Nt,transmission:V,transmissionMap:Gt,thicknessMap:F,gradientMap:ct,opaque:_.transparent===!1&&_.blending===Pn&&_.alphaToCoverage===!1,alphaMap:j,alphaTest:ht,alphaHash:gt,combine:_.combine,mapUv:$t&&g(_.map.channel),aoMapUv:se&&g(_.aoMap.channel),lightMapUv:me&&g(_.lightMap.channel),bumpMapUv:jt&&g(_.bumpMap.channel),normalMapUv:ye&&g(_.normalMap.channel),displacementMapUv:Oe&&g(_.displacementMap.channel),emissiveMapUv:li&&g(_.emissiveMap.channel),metalnessMapUv:Me&&g(_.metalnessMap.channel),roughnessMapUv:Ce&&g(_.roughnessMap.channel),anisotropyMapUv:Y&&g(_.anisotropyMap.channel),clearcoatMapUv:rt&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:at&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:tt&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:ut&&g(_.sheenRoughnessMap.channel),specularMapUv:lt&&g(_.specularMap.channel),specularColorMapUv:It&&g(_.specularColorMap.channel),specularIntensityMapUv:Nt&&g(_.specularIntensityMap.channel),transmissionMapUv:Gt&&g(_.transmissionMap.channel),thicknessMapUv:F&&g(_.thicknessMap.channel),alphaMapUv:j&&g(_.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ye||B),vertexNormals:!!O.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!O.attributes.uv&&($t||j),fog:!!L,useFog:_.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||O.attributes.normal===void 0&&ye===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Mt,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:St,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:s.shadowMap.enabled&&E.length>0,shadowMapType:s.shadowMap.type,toneMapping:Lt,decodeVideoTexture:$t&&_.map.isVideoTexture===!0&&Qt.getTransfer(_.map.colorSpace)===le,decodeVideoTextureEmissive:li&&_.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(_.emissiveMap.colorSpace)===le,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Ae,flipSided:_.side===Ye,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:nt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&_.extensions.multiDraw===!0||yt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Rt.vertexUv1s=l.has(1),Rt.vertexUv2s=l.has(2),Rt.vertexUv3s=l.has(3),l.clear(),Rt}function m(_){let M=[];if(_.shaderID?M.push(_.shaderID):(M.push(_.customVertexShaderID),M.push(_.customFragmentShaderID)),_.defines!==void 0)for(let E in _.defines)M.push(E),M.push(_.defines[E]);return _.isRawShaderMaterial===!1&&(p(M,_),y(M,_),M.push(s.outputColorSpace)),M.push(_.customProgramCacheKey),M.join()}function p(_,M){_.push(M.precision),_.push(M.outputColorSpace),_.push(M.envMapMode),_.push(M.envMapCubeUVHeight),_.push(M.mapUv),_.push(M.alphaMapUv),_.push(M.lightMapUv),_.push(M.aoMapUv),_.push(M.bumpMapUv),_.push(M.normalMapUv),_.push(M.displacementMapUv),_.push(M.emissiveMapUv),_.push(M.metalnessMapUv),_.push(M.roughnessMapUv),_.push(M.anisotropyMapUv),_.push(M.clearcoatMapUv),_.push(M.clearcoatNormalMapUv),_.push(M.clearcoatRoughnessMapUv),_.push(M.iridescenceMapUv),_.push(M.iridescenceThicknessMapUv),_.push(M.sheenColorMapUv),_.push(M.sheenRoughnessMapUv),_.push(M.specularMapUv),_.push(M.specularColorMapUv),_.push(M.specularIntensityMapUv),_.push(M.transmissionMapUv),_.push(M.thicknessMapUv),_.push(M.combine),_.push(M.fogExp2),_.push(M.sizeAttenuation),_.push(M.morphTargetsCount),_.push(M.morphAttributeCount),_.push(M.numSunLights),_.push(M.numDirLights),_.push(M.numPointLights),_.push(M.numSpotLights),_.push(M.numSpotLightMaps),_.push(M.numHemiLights),_.push(M.numRectAreaLights),_.push(M.numSunLightShadows),_.push(M.numDirLightShadows),_.push(M.numPointLightShadows),_.push(M.numSpotLightShadows),_.push(M.numSpotLightShadowsWithMaps),_.push(M.numLightProbes),_.push(M.shadowMapType),_.push(M.toneMapping),_.push(M.numClippingPlanes),_.push(M.numClipIntersection),_.push(M.depthPacking)}function y(_,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function A(_){let M=f[_.type],E;if(M){let C=Zi[M];E=Nu.clone(C.uniforms)}else E=_.uniforms;return E}function v(_,M){let E=h.get(M);return E!==void 0?++E.usedTimes:(E=new mx(s,M,_,n),c.push(E),h.set(M,E)),E}function S(_){if(--_.usedTimes===0){let M=c.indexOf(_);c[M]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function w(_){o.remove(_)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:A,acquireProgram:v,releaseProgram:S,releaseShaderCache:w,programs:c,dispose:R}}function vx(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function yx(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function td(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function ed(){let s=[],t=0,e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,x,m,p){let y=s[t];return y===void 0?(y={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:p},s[t]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=g,y.materialVariant=a(u),y.groupOrder=x,y.renderOrder=u.renderOrder,y.z=m,y.group=p),t++,y}function l(u,f,g,x,m,p,y){y.reversedDepth===!0&&(m=-m);let A=o(u,f,g,x,m,p);g.transmission>0?i.push(A):g.transparent===!0?n.push(A):e.push(A)}function c(u,f,g,x,m,p){let y=o(u,f,g,x,m,p);g.transmission>0?i.unshift(y):g.transparent===!0?n.unshift(y):e.unshift(y)}function h(u,f){e.length>1&&e.sort(u||yx),i.length>1&&i.sort(f||td),n.length>1&&n.sort(f||td)}function d(){for(let u=t,f=s.length;u<f;u++){let g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:d,sort:h}}function bx(){let s=new WeakMap;function t(i,n){let r=s.get(i),a;return r===void 0?(a=new ed,s.set(i,[a])):n>=r.length?(a=new ed,r.push(a)):a=r[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Mx(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new k,color:new Dt};break;case"SpotLight":e={position:new k,direction:new k,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":e={color:new Dt,position:new k,halfWidth:new k,halfHeight:new k};break}return s[t.id]=e,e}}}function Sx(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var wx=0;function Tx(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Ex(s){let t=new Mx,e=Sx(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);let n=new k,r=new ue,a=new ue;function o(c){let h=0,d=0,u=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,y=0,A=0,v=0,S=0,w=0,R=0,_=0,M=0,E=0;c.sort(Tx);for(let P=0,D=c.length;P<D;P++){let L=c[P],O=L.color,X=L.intensity,$=L.distance,st=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Nn?st=L.shadow.map.texture:st=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=O.r*X,d+=O.g*X,u+=O.b*X;else if(L.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(L.sh.coefficients[W],X);E++}else if(L.isSunLight){let W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let Q=L.shadow,it=e.get(L);it.shadowIntensity=Q.intensity,it.shadowBias=Q.bias,it.shadowNormalBias=Q.normalBias,it.shadowRadius=Q.radius,it.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),i.sunShadow[g]=it,i.sunShadowMap[g]=st;let vt=Q.getViewportCount();for(let St=0;St<vt;St++)i.sunShadowMatrix[x+St]=Q.getMatrix(St),i.sunShadowCascade[x+St]=Q._cascadeData[St];x+=vt,g++}i.sun[f]=W,f++}else if(L.isDirectionalLight){let W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let Q=L.shadow,it=e.get(L);it.shadowIntensity=Q.intensity,it.shadowBias=Q.bias,it.shadowNormalBias=Q.normalBias,it.shadowRadius=Q.radius,it.shadowMapSize=Q.mapSize,i.directionalShadow[m]=it,i.directionalShadowMap[m]=st,i.directionalShadowMatrix[m]=L.shadow.matrix,S++}i.directional[m]=W,m++}else if(L.isSpotLight){let W=t.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(O).multiplyScalar(X),W.distance=$,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,i.spot[y]=W;let Q=L.shadow;if(L.map&&(i.spotLightMap[_]=L.map,_++,Q.updateMatrices(L),L.castShadow&&M++),i.spotLightMatrix[y]=Q.matrix,L.castShadow){let it=e.get(L);it.shadowIntensity=Q.intensity,it.shadowBias=Q.bias,it.shadowNormalBias=Q.normalBias,it.shadowRadius=Q.radius,it.shadowMapSize=Q.mapSize,i.spotShadow[y]=it,i.spotShadowMap[y]=st,R++}y++}else if(L.isRectAreaLight){let W=t.get(L);W.color.copy(O).multiplyScalar(X),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),i.rectArea[A]=W,A++}else if(L.isPointLight){let W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),W.distance=L.distance,W.decay=L.decay,L.castShadow){let Q=L.shadow,it=e.get(L);it.shadowIntensity=Q.intensity,it.shadowBias=Q.bias,it.shadowNormalBias=Q.normalBias,it.shadowRadius=Q.radius,it.shadowMapSize=Q.mapSize,it.shadowCameraNear=Q.camera.near,it.shadowCameraFar=Q.camera.far,i.pointShadow[p]=it,i.pointShadowMap[p]=st,i.pointShadowMatrix[p]=L.shadow.matrix,w++}i.point[p]=W,p++}else if(L.isHemisphereLight){let W=t.get(L);W.skyColor.copy(L.color).multiplyScalar(X),W.groundColor.copy(L.groundColor).multiplyScalar(X),i.hemi[v]=W,v++}}A>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=dt.LTC_FLOAT_1,i.rectAreaLTC2=dt.LTC_FLOAT_2):(i.rectAreaLTC1=dt.LTC_HALF_1,i.rectAreaLTC2=dt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let C=i.hash;(C.sunLength!==f||C.directionalLength!==m||C.pointLength!==p||C.spotLength!==y||C.rectAreaLength!==A||C.hemiLength!==v||C.numSunShadows!==g||C.numDirectionalShadows!==S||C.numPointShadows!==w||C.numSpotShadows!==R||C.numSpotMaps!==_||C.numLightProbes!==E)&&(i.sun.length=f,i.directional.length=m,i.spot.length=y,i.rectArea.length=A,i.point.length=p,i.hemi.length=v,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.directionalShadowMatrix.length=S,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=R,i.spotShadowMap.length=R,i.spotLightMatrix.length=R+_-M,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=E,C.sunLength=f,C.directionalLength=m,C.pointLength=p,C.spotLength=y,C.rectAreaLength=A,C.hemiLength=v,C.numSunShadows=g,C.numDirectionalShadows=S,C.numPointShadows=w,C.numSpotShadows=R,C.numSpotMaps=_,C.numLightProbes=E,i.version=wx++)}function l(c,h){let d=0,u=0,f=0,g=0,x=0,m=0,p=h.matrixWorldInverse;for(let y=0,A=c.length;y<A;y++){let v=c[y];if(v.isSunLight){let S=i.sun[d];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(p),d++}else if(v.isDirectionalLight){let S=i.directional[u];S.direction.setFromMatrixPosition(v.matrixWorld),n.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(p),u++}else if(v.isSpotLight){let S=i.spot[g];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(v.matrixWorld),n.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(p),g++}else if(v.isRectAreaLight){let S=i.rectArea[x];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),a.identity(),r.copy(v.matrixWorld),r.premultiply(p),a.extractRotation(r),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),x++}else if(v.isPointLight){let S=i.point[f];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){let S=i.hemi[m];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:i}}function id(s){let t=new Ex(s),e=[],i=[],n=[];function r(u){d.camera=u,e.length=0,i.length=0,n.length=0}function a(u){e.push(u)}function o(u){i.push(u)}function l(u){n.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Ax(s){let t=new WeakMap;function e(n,r=0){let a=t.get(n),o;return a===void 0?(o=new id(s),t.set(n,[o])):r>=a.length?(o=new id(s),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var Rx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cx=`uniform sampler2D shadow_pass;
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
}`,Px=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],Ix=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],nd=new ue,Fr=new k,Uc=new k;function Lx(s,t,e){let i=new Cs,n=new Yt,r=new Yt,a=new be,o=new ka,l=new Oa,c={},h=e.maxTextureSize,d={[Cn]:Ye,[Ye]:Cn,[Ae]:Ae},u=new $e({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Yt},radius:{value:4}},vertexShader:Rx,fragmentShader:Cx}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new fe;g.setAttribute("position",new Se(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ut(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sr;let p=this.type;this.render=function(w,R,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Jh&&(Bt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Sr);let M=s.getRenderTarget(),E=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),P=s.state;P.setBlending($i),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);let D=p!==this.type;D&&R.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(O=>O.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,O=w.length;L<O;L++){let X=w[L],$=X.shadow;if($===void 0){Bt("WebGLShadowMap:",X,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;n.copy($.mapSize);let st=$.getFrameExtents();n.multiply(st),r.copy($.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/st.x),n.x=r.x*st.x,$.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/st.y),n.y=r.y*st.y,$.mapSize.y=r.y));let W=s.state.buffers.depth.getReversed();if($.camera._reversedDepth=W,$.map===null||D===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===Ls){if(X.isPointLight){Bt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new Qe(n.x,n.y,{format:Nn,type:ki,minFilter:qe,magFilter:qe,generateMipmaps:!1}),$.map.texture.name=X.name+".shadowMap",$.map.depthTexture=new Sn(n.x,n.y,Si),$.map.depthTexture.name=X.name+".shadowMapDepth",$.map.depthTexture.format=Wi,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=He,$.map.depthTexture.magFilter=He}else X.isPointLight?($.map=new qo(n.x),$.map.depthTexture=new Fa(n.x,Bi)):($.map=new Qe(n.x,n.y),$.map.depthTexture=new Sn(n.x,n.y,Bi)),$.map.depthTexture.name=X.name+".shadowMap",$.map.depthTexture.format=Wi,this.type===Sr?($.map.depthTexture.compareFunction=W?Vo:Go,$.map.depthTexture.minFilter=qe,$.map.depthTexture.magFilter=qe):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=He,$.map.depthTexture.magFilter=He);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==n.x||$.map.height!==n.y)&&$.map.setSize(n.x,n.y);let Q=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();X.isPointLight!==!0&&$.updateMatrices(X,_);for(let it=0;it<Q;it++){let vt=$.getCamera(it);if(X.isPointLight){let St=$.camera,ce=$.matrix,Zt=X.distance||St.far;Zt!==St.far&&(St.far=Zt,St.updateProjectionMatrix()),Fr.setFromMatrixPosition(X.matrixWorld),St.position.copy(Fr),Uc.copy(St.position),Uc.add(Px[it]),St.up.copy(Ix[it]),St.lookAt(Uc),St.updateMatrixWorld(),ce.makeTranslation(-Fr.x,-Fr.y,-Fr.z),nd.multiplyMatrices(St.projectionMatrix,St.matrixWorldInverse),$._frustum.setFromProjectionMatrix(nd,St.coordinateSystem,St.reversedDepth)}if($.map.isWebGLCubeRenderTarget)s.setRenderTarget($.map,it),s.clear();else{it===0&&(s.setRenderTarget($.map),s.clear());let St=$.getViewport(it);a.set(r.x*St.x,r.y*St.y,r.x*St.z,r.y*St.w),P.viewport(a)}i=$.getFrustum(it),v(R,_,vt,X,this.type)}$.isPointLightShadow!==!0&&this.type===Ls&&y($,_),$.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(M,E,C)};function y(w,R){let _=t.update(x);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new Qe(n.x,n.y,{format:Nn,type:ki}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(R,null,_,u,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(R,null,_,f,x,null)}function A(w,R,_,M){let E=null,C=_.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)E=C;else if(E=_.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let P=E.uuid,D=R.uuid,L=c[P];L===void 0&&(L={},c[P]=L);let O=L[D];O===void 0&&(O=E.clone(),L[D]=O,R.addEventListener("dispose",S)),E=O}if(E.visible=R.visible,E.wireframe=R.wireframe,M===Ls?E.side=R.shadowSide!==null?R.shadowSide:R.side:E.side=R.shadowSide!==null?R.shadowSide:d[R.side],E.alphaMap=R.alphaMap,E.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,E.map=R.map,E.clipShadows=R.clipShadows,E.clippingPlanes=R.clippingPlanes,E.clipIntersection=R.clipIntersection,E.displacementMap=R.displacementMap,E.displacementScale=R.displacementScale,E.displacementBias=R.displacementBias,E.wireframeLinewidth=R.wireframeLinewidth,E.linewidth=R.linewidth,_.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let P=s.properties.get(E);P.light=_}return E}function v(w,R,_,M,E){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&E===Ls)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,w.matrixWorld);let D=t.update(w),L=w.material;if(Array.isArray(L)){let O=D.groups;for(let X=0,$=O.length;X<$;X++){let st=O[X],W=L[st.materialIndex];if(W&&W.visible){let Q=A(w,W,M,E);w.onBeforeShadow(s,w,R,_,D,Q,st),s.renderBufferDirect(_,null,D,Q,w,st),w.onAfterShadow(s,w,R,_,D,Q,st)}}}else if(L.visible){let O=A(w,L,M,E);w.onBeforeShadow(s,w,R,_,D,O,null),s.renderBufferDirect(_,null,D,O,w,null),w.onAfterShadow(s,w,R,_,D,O,null)}}let P=w.children;for(let D=0,L=P.length;D<L;D++)v(P[D],R,_,M,E)}function S(w){w.target.removeEventListener("dispose",S);for(let _ in c){let M=c[_],E=w.target.uuid;E in M&&(M[E].dispose(),delete M[E])}}}function Dx(s,t){function e(){let F=!1,ct=new be,j=null,ht=new be(0,0,0,0);return{setMask:function(gt){j!==gt&&!F&&(s.colorMask(gt,gt,gt,gt),j=gt)},setLocked:function(gt){F=gt},setClear:function(gt,nt,Lt,Rt,ge){ge===!0&&(gt*=Rt,nt*=Rt,Lt*=Rt),ct.set(gt,nt,Lt,Rt),ht.equals(ct)===!1&&(s.clearColor(gt,nt,Lt,Rt),ht.copy(ct))},reset:function(){F=!1,j=null,ht.set(-1,0,0,0)}}}function i(){let F=!1,ct=!1,j=null,ht=null,gt=null;return{setReversed:function(nt){if(ct!==nt){let Lt=t.get("EXT_clip_control");nt?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT),ct=nt;let Rt=gt;gt=null,this.setClear(Rt)}},getReversed:function(){return ct},setTest:function(nt){nt?et(s.DEPTH_TEST):Mt(s.DEPTH_TEST)},setMask:function(nt){j!==nt&&!F&&(s.depthMask(nt),j=nt)},setFunc:function(nt){if(ct&&(nt=Lu[nt]),ht!==nt){switch(nt){case Sa:s.depthFunc(s.NEVER);break;case wa:s.depthFunc(s.ALWAYS);break;case Ta:s.depthFunc(s.LESS);break;case Ss:s.depthFunc(s.LEQUAL);break;case Ea:s.depthFunc(s.EQUAL);break;case Aa:s.depthFunc(s.GEQUAL);break;case Ra:s.depthFunc(s.GREATER);break;case Ca:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ht=nt}},setLocked:function(nt){F=nt},setClear:function(nt){gt!==nt&&(gt=nt,ct&&(nt=1-nt),s.clearDepth(nt))},reset:function(){F=!1,j=null,ht=null,gt=null,ct=!1}}}function n(){let F=!1,ct=null,j=null,ht=null,gt=null,nt=null,Lt=null,Rt=null,ge=null;return{setTest:function(ae){F||(ae?et(s.STENCIL_TEST):Mt(s.STENCIL_TEST))},setMask:function(ae){ct!==ae&&!F&&(s.stencilMask(ae),ct=ae)},setFunc:function(ae,Ai,Hi){(j!==ae||ht!==Ai||gt!==Hi)&&(s.stencilFunc(ae,Ai,Hi),j=ae,ht=Ai,gt=Hi)},setOp:function(ae,Ai,Hi){(nt!==ae||Lt!==Ai||Rt!==Hi)&&(s.stencilOp(ae,Ai,Hi),nt=ae,Lt=Ai,Rt=Hi)},setLocked:function(ae){F=ae},setClear:function(ae){ge!==ae&&(s.clearStencil(ae),ge=ae)},reset:function(){F=!1,ct=null,j=null,ht=null,gt=null,nt=null,Lt=null,Rt=null,ge=null}}}let r=new e,a=new i,o=new n,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,y=null,A=null,v=null,S=null,w=null,R=null,_=new Dt(0,0,0),M=0,E=!1,C=null,P=null,D=null,L=null,O=null,X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,st=0,W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(W)[1]),$=st>=1):W.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),$=st>=2);let Q=null,it={},vt=s.getParameter(s.SCISSOR_BOX),St=s.getParameter(s.VIEWPORT),ce=new be().fromArray(vt),Zt=new be().fromArray(St);function ne(F,ct,j,ht){let gt=new Uint8Array(4),nt=s.createTexture();s.bindTexture(F,nt),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Lt=0;Lt<j;Lt++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(ct,0,s.RGBA,1,1,ht,0,s.RGBA,s.UNSIGNED_BYTE,gt):s.texImage2D(ct+Lt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,gt);return nt}let Z={};Z[s.TEXTURE_2D]=ne(s.TEXTURE_2D,s.TEXTURE_2D,1),Z[s.TEXTURE_CUBE_MAP]=ne(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[s.TEXTURE_2D_ARRAY]=ne(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Z[s.TEXTURE_3D]=ne(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(s.DEPTH_TEST),a.setFunc(Ss),jt(!1),ye(tc),et(s.CULL_FACE),se($i);function et(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function Mt(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function Ht(F,ct){return u[F]!==ct?(s.bindFramebuffer(F,ct),u[F]=ct,F===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ct),F===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ct),!0):!1}function yt(F,ct){let j=g,ht=!1;if(F){j=f.get(ct),j===void 0&&(j=[],f.set(ct,j));let gt=F.textures;if(j.length!==gt.length||j[0]!==s.COLOR_ATTACHMENT0){for(let nt=0,Lt=gt.length;nt<Lt;nt++)j[nt]=s.COLOR_ATTACHMENT0+nt;j.length=gt.length,ht=!0}}else j[0]!==s.BACK&&(j[0]=s.BACK,ht=!0);ht&&s.drawBuffers(j)}function $t(F){return x!==F?(s.useProgram(F),x=F,!0):!1}let Ne={[Jn]:s.FUNC_ADD,[Qh]:s.FUNC_SUBTRACT,[tu]:s.FUNC_REVERSE_SUBTRACT};Ne[eu]=s.MIN,Ne[iu]=s.MAX;let Kt={[nu]:s.ZERO,[su]:s.ONE,[ru]:s.SRC_COLOR,[nc]:s.SRC_ALPHA,[uu]:s.SRC_ALPHA_SATURATE,[cu]:s.DST_COLOR,[ou]:s.DST_ALPHA,[au]:s.ONE_MINUS_SRC_COLOR,[sc]:s.ONE_MINUS_SRC_ALPHA,[hu]:s.ONE_MINUS_DST_COLOR,[lu]:s.ONE_MINUS_DST_ALPHA,[du]:s.CONSTANT_COLOR,[fu]:s.ONE_MINUS_CONSTANT_COLOR,[pu]:s.CONSTANT_ALPHA,[mu]:s.ONE_MINUS_CONSTANT_ALPHA};function se(F,ct,j,ht,gt,nt,Lt,Rt,ge,ae){if(F===$i){m===!0&&(Mt(s.BLEND),m=!1);return}if(m===!1&&(et(s.BLEND),m=!0),F!==jh){if(F!==p||ae!==E){if((y!==Jn||S!==Jn)&&(s.blendEquation(s.FUNC_ADD),y=Jn,S=Jn),ae)switch(F){case Pn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Kn:s.blendFunc(s.ONE,s.ONE);break;case ec:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ic:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ot("WebGLState: Invalid blending: ",F);break}else switch(F){case Pn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Kn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case ec:Ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ic:Ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ot("WebGLState: Invalid blending: ",F);break}A=null,v=null,w=null,R=null,_.set(0,0,0),M=0,p=F,E=ae}return}gt=gt||ct,nt=nt||j,Lt=Lt||ht,(ct!==y||gt!==S)&&(s.blendEquationSeparate(Ne[ct],Ne[gt]),y=ct,S=gt),(j!==A||ht!==v||nt!==w||Lt!==R)&&(s.blendFuncSeparate(Kt[j],Kt[ht],Kt[nt],Kt[Lt]),A=j,v=ht,w=nt,R=Lt),(Rt.equals(_)===!1||ge!==M)&&(s.blendColor(Rt.r,Rt.g,Rt.b,ge),_.copy(Rt),M=ge),p=F,E=!1}function me(F,ct){F.side===Ae?Mt(s.CULL_FACE):et(s.CULL_FACE);let j=F.side===Ye;ct&&(j=!j),jt(j),F.blending===Pn&&F.transparent===!1?se($i):se(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);let ht=F.stencilWrite;o.setTest(ht),ht&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),li(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?et(s.SAMPLE_ALPHA_TO_COVERAGE):Mt(s.SAMPLE_ALPHA_TO_COVERAGE)}function jt(F){C!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),C=F)}function ye(F){F!==Zh?(et(s.CULL_FACE),F!==P&&(F===tc?s.cullFace(s.BACK):F===Kh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Mt(s.CULL_FACE),P=F}function Oe(F){F!==D&&($&&s.lineWidth(F),D=F)}function li(F,ct,j){F?(et(s.POLYGON_OFFSET_FILL),(L!==ct||O!==j)&&(L=ct,O=j,a.getReversed()&&(ct=-ct),s.polygonOffset(ct,j))):Mt(s.POLYGON_OFFSET_FILL)}function Me(F){F?et(s.SCISSOR_TEST):Mt(s.SCISSOR_TEST)}function Ce(F){F===void 0&&(F=s.TEXTURE0+X-1),Q!==F&&(s.activeTexture(F),Q=F)}function B(F,ct,j){j===void 0&&(Q===null?j=s.TEXTURE0+X-1:j=Q);let ht=it[j];ht===void 0&&(ht={type:void 0,texture:void 0},it[j]=ht),(ht.type!==F||ht.texture!==ct)&&(Q!==j&&(s.activeTexture(j),Q=j),s.bindTexture(F,ct||Z[F]),ht.type=F,ht.texture=ct)}function Ze(){let F=it[Q];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function he(){try{s.compressedTexImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function I(){try{s.compressedTexImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function b(){try{s.texSubImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function z(){try{s.texSubImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function V(){try{s.compressedTexSubImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function Y(){try{s.compressedTexSubImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function rt(){try{s.texStorage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function at(){try{s.texStorage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function J(){try{s.texImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function tt(){try{s.texImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function ot(F){return d[F]!==void 0?d[F]:s.getParameter(F)}function Pt(F,ct){d[F]!==ct&&(s.pixelStorei(F,ct),d[F]=ct)}function ut(F){ce.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),ce.copy(F))}function lt(F){Zt.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),Zt.copy(F))}function It(F,ct){let j=c.get(ct);j===void 0&&(j=new WeakMap,c.set(ct,j));let ht=j.get(F);ht===void 0&&(ht=s.getUniformBlockIndex(ct,F.name),j.set(F,ht))}function Nt(F,ct){let ht=c.get(ct).get(F);l.get(ct)!==ht&&(s.uniformBlockBinding(ct,ht,F.__bindingPointIndex),l.set(ct,ht))}function Gt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},Q=null,it={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,y=null,A=null,v=null,S=null,w=null,R=null,_=new Dt(0,0,0),M=0,E=!1,C=null,P=null,D=null,L=null,O=null,ce.set(0,0,s.canvas.width,s.canvas.height),Zt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:Mt,bindFramebuffer:Ht,drawBuffers:yt,useProgram:$t,setBlending:se,setMaterial:me,setFlipSided:jt,setCullFace:ye,setLineWidth:Oe,setPolygonOffset:li,setScissorTest:Me,activeTexture:Ce,bindTexture:B,unbindTexture:Ze,compressedTexImage2D:he,compressedTexImage3D:I,texImage2D:J,texImage3D:tt,pixelStorei:Pt,getParameter:ot,updateUBOMapping:It,uniformBlockBinding:Nt,texStorage2D:rt,texStorage3D:at,texSubImage2D:b,texSubImage3D:z,compressedTexSubImage2D:V,compressedTexSubImage3D:Y,scissor:ut,viewport:lt,reset:Gt}}function Nx(s,t,e,i,n,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Yt,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(I,b){return g?new OffscreenCanvas(I,b):lr("canvas")}function m(I,b,z){let V=1,Y=he(I);if((Y.width>z||Y.height>z)&&(V=z/Math.max(Y.width,Y.height)),V<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let rt=Math.floor(V*Y.width),at=Math.floor(V*Y.height);u===void 0&&(u=x(rt,at));let J=b?x(rt,at):u;return J.width=rt,J.height=at,J.getContext("2d").drawImage(I,0,0,rt,at),Bt("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+rt+"x"+at+")."),J}else return"data"in I&&Bt("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),I;return I}function p(I){return I.generateMipmaps}function y(I){s.generateMipmap(I)}function A(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(I,b,z,V,Y,rt=!1){if(I!==null){if(s[I]!==void 0)return s[I];Bt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let at;V&&(at=t.get("EXT_texture_norm16"),at||Bt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=b;if(b===s.RED&&(z===s.FLOAT&&(J=s.R32F),z===s.HALF_FLOAT&&(J=s.R16F),z===s.UNSIGNED_BYTE&&(J=s.R8),z===s.UNSIGNED_SHORT&&at&&(J=at.R16_EXT),z===s.SHORT&&at&&(J=at.R16_SNORM_EXT)),b===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(J=s.R8UI),z===s.UNSIGNED_SHORT&&(J=s.R16UI),z===s.UNSIGNED_INT&&(J=s.R32UI),z===s.BYTE&&(J=s.R8I),z===s.SHORT&&(J=s.R16I),z===s.INT&&(J=s.R32I)),b===s.RG&&(z===s.FLOAT&&(J=s.RG32F),z===s.HALF_FLOAT&&(J=s.RG16F),z===s.UNSIGNED_BYTE&&(J=s.RG8),z===s.UNSIGNED_SHORT&&at&&(J=at.RG16_EXT),z===s.SHORT&&at&&(J=at.RG16_SNORM_EXT)),b===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(J=s.RG8UI),z===s.UNSIGNED_SHORT&&(J=s.RG16UI),z===s.UNSIGNED_INT&&(J=s.RG32UI),z===s.BYTE&&(J=s.RG8I),z===s.SHORT&&(J=s.RG16I),z===s.INT&&(J=s.RG32I)),b===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(J=s.RGB8UI),z===s.UNSIGNED_SHORT&&(J=s.RGB16UI),z===s.UNSIGNED_INT&&(J=s.RGB32UI),z===s.BYTE&&(J=s.RGB8I),z===s.SHORT&&(J=s.RGB16I),z===s.INT&&(J=s.RGB32I)),b===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(J=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(J=s.RGBA16UI),z===s.UNSIGNED_INT&&(J=s.RGBA32UI),z===s.BYTE&&(J=s.RGBA8I),z===s.SHORT&&(J=s.RGBA16I),z===s.INT&&(J=s.RGBA32I)),b===s.RGB&&(z===s.UNSIGNED_SHORT&&at&&(J=at.RGB16_EXT),z===s.SHORT&&at&&(J=at.RGB16_SNORM_EXT),z===s.UNSIGNED_INT_5_9_9_9_REV&&(J=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(J=s.R11F_G11F_B10F)),b===s.RGBA){let tt=rt?or:Qt.getTransfer(Y);z===s.FLOAT&&(J=s.RGBA32F),z===s.HALF_FLOAT&&(J=s.RGBA16F),z===s.UNSIGNED_BYTE&&(J=tt===le?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT&&at&&(J=at.RGBA16_EXT),z===s.SHORT&&at&&(J=at.RGBA16_SNORM_EXT),z===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function S(I,b){let z;return I?b===null||b===Bi||b===Ns?z=s.DEPTH24_STENCIL8:b===Si?z=s.DEPTH32F_STENCIL8:b===Ds&&(z=s.DEPTH24_STENCIL8,Bt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Bi||b===Ns?z=s.DEPTH_COMPONENT24:b===Si?z=s.DEPTH_COMPONENT32F:b===Ds&&(z=s.DEPTH_COMPONENT16),z}function w(I,b){return p(I)===!0||I.isFramebufferTexture&&I.minFilter!==He&&I.minFilter!==qe?Math.log2(Math.max(b.width,b.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?b.mipmaps.length:1}function R(I){let b=I.target;b.removeEventListener("dispose",R),M(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&d.delete(b)}function _(I){let b=I.target;b.removeEventListener("dispose",_),C(b)}function M(I){let b=i.get(I);if(b.__webglInit===void 0)return;let z=I.source,V=f.get(z);if(V){let Y=V[b.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&E(I),Object.keys(V).length===0&&f.delete(z)}i.remove(I)}function E(I){let b=i.get(I);s.deleteTexture(b.__webglTexture);let z=I.source,V=f.get(z);delete V[b.__cacheKey],a.memory.textures--}function C(I){let b=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(b.__webglFramebuffer[V]))for(let Y=0;Y<b.__webglFramebuffer[V].length;Y++)s.deleteFramebuffer(b.__webglFramebuffer[V][Y]);else s.deleteFramebuffer(b.__webglFramebuffer[V]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[V])}else{if(Array.isArray(b.__webglFramebuffer))for(let V=0;V<b.__webglFramebuffer.length;V++)s.deleteFramebuffer(b.__webglFramebuffer[V]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let V=0;V<b.__webglColorRenderbuffer.length;V++)b.__webglColorRenderbuffer[V]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[V]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let z=I.textures;for(let V=0,Y=z.length;V<Y;V++){let rt=i.get(z[V]);rt.__webglTexture&&(s.deleteTexture(rt.__webglTexture),a.memory.textures--),i.remove(z[V])}i.remove(I)}let P=0;function D(){P=0}function L(){return P}function O(I){P=I}function X(){let I=P;return I>=n.maxTextures&&Bt("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+n.maxTextures),P+=1,I}function $(I){let b=[];return b.push(I.wrapS),b.push(I.wrapT),b.push(I.wrapR||0),b.push(I.magFilter),b.push(I.minFilter),b.push(I.anisotropy),b.push(I.internalFormat),b.push(I.format),b.push(I.type),b.push(I.generateMipmaps),b.push(I.premultiplyAlpha),b.push(I.flipY),b.push(I.unpackAlignment),b.push(I.colorSpace),b.join()}function st(I,b){let z=i.get(I);if(I.isVideoTexture&&B(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&z.__version!==I.version){let V=I.image;if(V===null)Bt("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Bt("WebGLRenderer: Texture marked for update but image is incomplete");else{Mt(z,I,b);return}}else I.isExternalTexture&&(z.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+b)}function W(I,b){let z=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){Mt(z,I,b);return}else I.isExternalTexture&&(z.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+b)}function Q(I,b){let z=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){Mt(z,I,b);return}e.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+b)}function it(I,b){let z=i.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&z.__version!==I.version){Ht(z,I,b);return}e.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+b)}let vt={[qn]:s.REPEAT,[yi]:s.CLAMP_TO_EDGE,[Pa]:s.MIRRORED_REPEAT},St={[He]:s.NEAREST,[_u]:s.NEAREST_MIPMAP_NEAREST,[Er]:s.NEAREST_MIPMAP_LINEAR,[qe]:s.LINEAR,[io]:s.LINEAR_MIPMAP_NEAREST,[Ln]:s.LINEAR_MIPMAP_LINEAR},ce={[Mu]:s.NEVER,[Au]:s.ALWAYS,[Su]:s.LESS,[Go]:s.LEQUAL,[wu]:s.EQUAL,[Vo]:s.GEQUAL,[Tu]:s.GREATER,[Eu]:s.NOTEQUAL};function Zt(I,b){if(b.type===Si&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===qe||b.magFilter===io||b.magFilter===Er||b.magFilter===Ln||b.minFilter===qe||b.minFilter===io||b.minFilter===Er||b.minFilter===Ln)&&Bt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,vt[b.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,vt[b.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,vt[b.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,St[b.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,St[b.minFilter]),b.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,ce[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===He||b.minFilter!==Er&&b.minFilter!==Ln||b.type===Si&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");s.texParameterf(I,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,n.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function ne(I,b){let z=!1;I.__webglInit===void 0&&(I.__webglInit=!0,b.addEventListener("dispose",R));let V=b.source,Y=f.get(V);Y===void 0&&(Y={},f.set(V,Y));let rt=$(b);if(rt!==I.__cacheKey){Y[rt]===void 0&&(Y[rt]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Y[rt].usedTimes++;let at=Y[I.__cacheKey];at!==void 0&&(Y[I.__cacheKey].usedTimes--,at.usedTimes===0&&E(b)),I.__cacheKey=rt,I.__webglTexture=Y[rt].texture}return z}function Z(I,b,z){return Math.floor(Math.floor(I/z)/b)}function et(I,b,z,V){let rt=I.updateRanges;if(rt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,b.width,b.height,z,V,b.data);else{rt.sort((Pt,ut)=>Pt.start-ut.start);let at=0;for(let Pt=1;Pt<rt.length;Pt++){let ut=rt[at],lt=rt[Pt],It=ut.start+ut.count,Nt=Z(lt.start,b.width,4),Gt=Z(ut.start,b.width,4);lt.start<=It+1&&Nt===Gt&&Z(lt.start+lt.count-1,b.width,4)===Nt?ut.count=Math.max(ut.count,lt.start+lt.count-ut.start):(++at,rt[at]=lt)}rt.length=at+1;let J=e.getParameter(s.UNPACK_ROW_LENGTH),tt=e.getParameter(s.UNPACK_SKIP_PIXELS),ot=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,b.width);for(let Pt=0,ut=rt.length;Pt<ut;Pt++){let lt=rt[Pt],It=Math.floor(lt.start/4),Nt=Math.ceil(lt.count/4),Gt=It%b.width,F=Math.floor(It/b.width),ct=Nt,j=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,Gt),e.pixelStorei(s.UNPACK_SKIP_ROWS,F),e.texSubImage2D(s.TEXTURE_2D,0,Gt,F,ct,j,z,V,b.data)}I.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,J),e.pixelStorei(s.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(s.UNPACK_SKIP_ROWS,ot)}}function Mt(I,b,z){let V=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(V=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(V=s.TEXTURE_3D);let Y=ne(I,b),rt=b.source;e.bindTexture(V,I.__webglTexture,s.TEXTURE0+z);let at=i.get(rt);if(rt.version!==at.__version||Y===!0){if(e.activeTexture(s.TEXTURE0+z),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let j=Qt.getPrimaries(Qt.workingColorSpace),ht=b.colorSpace===un?null:Qt.getPrimaries(b.colorSpace),gt=b.colorSpace===un||j===ht?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt)}e.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment);let tt=m(b.image,!1,n.maxTextureSize);tt=Ze(b,tt);let ot=r.convert(b.format,b.colorSpace),Pt=r.convert(b.type),ut=v(b.internalFormat,ot,Pt,b.normalized,b.colorSpace,b.isVideoTexture);Zt(V,b);let lt,It=b.mipmaps,Nt=b.isVideoTexture!==!0,Gt=at.__version===void 0||Y===!0,F=rt.dataReady,ct=w(b,tt);if(b.isDepthTexture)ut=S(b.format===Dn,b.type),Gt&&(Nt?e.texStorage2D(s.TEXTURE_2D,1,ut,tt.width,tt.height):e.texImage2D(s.TEXTURE_2D,0,ut,tt.width,tt.height,0,ot,Pt,null));else if(b.isDataTexture)if(It.length>0){Nt&&Gt&&e.texStorage2D(s.TEXTURE_2D,ct,ut,It[0].width,It[0].height);for(let j=0,ht=It.length;j<ht;j++)lt=It[j],Nt?F&&e.texSubImage2D(s.TEXTURE_2D,j,0,0,lt.width,lt.height,ot,Pt,lt.data):e.texImage2D(s.TEXTURE_2D,j,ut,lt.width,lt.height,0,ot,Pt,lt.data);b.generateMipmaps=!1}else Nt?(Gt&&e.texStorage2D(s.TEXTURE_2D,ct,ut,tt.width,tt.height),F&&et(b,tt,ot,Pt)):e.texImage2D(s.TEXTURE_2D,0,ut,tt.width,tt.height,0,ot,Pt,tt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Nt&&Gt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ct,ut,It[0].width,It[0].height,tt.depth);for(let j=0,ht=It.length;j<ht;j++)if(lt=It[j],b.format!==wi)if(ot!==null)if(Nt){if(F)if(b.layerUpdates.size>0){let gt=wc(lt.width,lt.height,b.format,b.type);for(let nt of b.layerUpdates){let Lt=lt.data.subarray(nt*gt/lt.data.BYTES_PER_ELEMENT,(nt+1)*gt/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,nt,lt.width,lt.height,1,ot,Lt)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,lt.width,lt.height,tt.depth,ot,lt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,j,ut,lt.width,lt.height,tt.depth,0,lt.data,0,0);else Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Nt?F&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,lt.width,lt.height,tt.depth,ot,Pt,lt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,j,ut,lt.width,lt.height,tt.depth,0,ot,Pt,lt.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{Nt&&Gt&&e.texStorage2D(s.TEXTURE_2D,ct,ut,It[0].width,It[0].height);for(let j=0,ht=It.length;j<ht;j++)lt=It[j],b.format!==wi?ot!==null?Nt?F&&e.compressedTexSubImage2D(s.TEXTURE_2D,j,0,0,lt.width,lt.height,ot,lt.data):e.compressedTexImage2D(s.TEXTURE_2D,j,ut,lt.width,lt.height,0,lt.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?F&&e.texSubImage2D(s.TEXTURE_2D,j,0,0,lt.width,lt.height,ot,Pt,lt.data):e.texImage2D(s.TEXTURE_2D,j,ut,lt.width,lt.height,0,ot,Pt,lt.data)}else if(b.isDataArrayTexture)if(Nt){if(Gt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ct,ut,tt.width,tt.height,tt.depth),F)if(b.layerUpdates.size>0){let j=wc(tt.width,tt.height,b.format,b.type);for(let ht of b.layerUpdates){let gt=tt.data.subarray(ht*j/tt.data.BYTES_PER_ELEMENT,(ht+1)*j/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ht,tt.width,tt.height,1,ot,Pt,gt)}b.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ot,Pt,tt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,ut,tt.width,tt.height,tt.depth,0,ot,Pt,tt.data);else if(b.isData3DTexture)Nt?(Gt&&e.texStorage3D(s.TEXTURE_3D,ct,ut,tt.width,tt.height,tt.depth),F&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ot,Pt,tt.data)):e.texImage3D(s.TEXTURE_3D,0,ut,tt.width,tt.height,tt.depth,0,ot,Pt,tt.data);else if(b.isFramebufferTexture){if(Gt)if(Nt)e.texStorage2D(s.TEXTURE_2D,ct,ut,tt.width,tt.height);else{let j=tt.width,ht=tt.height;for(let gt=0;gt<ct;gt++)e.texImage2D(s.TEXTURE_2D,gt,ut,j,ht,0,ot,Pt,null),j>>=1,ht>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in s){let j=s.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),tt.parentNode!==j){j.appendChild(tt),d.add(b),j.onpaint=ht=>{let gt=ht.changedElements;for(let nt of d)gt.includes(nt.image)&&(nt.needsUpdate=!0)},j.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,tt);else{let gt=s.RGBA,nt=s.RGBA,Lt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,gt,nt,Lt,tt)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(It.length>0){if(Nt&&Gt){let j=he(It[0]);e.texStorage2D(s.TEXTURE_2D,ct,ut,j.width,j.height)}for(let j=0,ht=It.length;j<ht;j++)lt=It[j],Nt?F&&e.texSubImage2D(s.TEXTURE_2D,j,0,0,ot,Pt,lt):e.texImage2D(s.TEXTURE_2D,j,ut,ot,Pt,lt);b.generateMipmaps=!1}else if(Nt){if(Gt){let j=he(tt);e.texStorage2D(s.TEXTURE_2D,ct,ut,j.width,j.height)}F&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ot,Pt,tt)}else e.texImage2D(s.TEXTURE_2D,0,ut,ot,Pt,tt);p(b)&&y(V),at.__version=rt.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function Ht(I,b,z){if(b.image.length!==6)return;let V=ne(I,b),Y=b.source;e.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+z);let rt=i.get(Y);if(Y.version!==rt.__version||V===!0){e.activeTexture(s.TEXTURE0+z);let at=Qt.getPrimaries(Qt.workingColorSpace),J=b.colorSpace===un?null:Qt.getPrimaries(b.colorSpace),tt=b.colorSpace===un||at===J?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let ot=b.isCompressedTexture||b.image[0].isCompressedTexture,Pt=b.image[0]&&b.image[0].isDataTexture,ut=[];for(let nt=0;nt<6;nt++)!ot&&!Pt?ut[nt]=m(b.image[nt],!0,n.maxCubemapSize):ut[nt]=Pt?b.image[nt].image:b.image[nt],ut[nt]=Ze(b,ut[nt]);let lt=ut[0],It=r.convert(b.format,b.colorSpace),Nt=r.convert(b.type),Gt=v(b.internalFormat,It,Nt,b.normalized,b.colorSpace),F=b.isVideoTexture!==!0,ct=rt.__version===void 0||V===!0,j=Y.dataReady,ht=w(b,lt);Zt(s.TEXTURE_CUBE_MAP,b);let gt;if(ot){F&&ct&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ht,Gt,lt.width,lt.height);for(let nt=0;nt<6;nt++){gt=ut[nt].mipmaps;for(let Lt=0;Lt<gt.length;Lt++){let Rt=gt[Lt];b.format!==wi?It!==null?F?j&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt,0,0,Rt.width,Rt.height,It,Rt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt,Gt,Rt.width,Rt.height,0,Rt.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?j&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt,0,0,Rt.width,Rt.height,It,Nt,Rt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt,Gt,Rt.width,Rt.height,0,It,Nt,Rt.data)}}}else{if(gt=b.mipmaps,F&&ct){gt.length>0&&ht++;let nt=he(ut[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ht,Gt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(Pt){F?j&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,ut[nt].width,ut[nt].height,It,Nt,ut[nt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Gt,ut[nt].width,ut[nt].height,0,It,Nt,ut[nt].data);for(let Lt=0;Lt<gt.length;Lt++){let ge=gt[Lt].image[nt].image;F?j&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt+1,0,0,ge.width,ge.height,It,Nt,ge.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt+1,Gt,ge.width,ge.height,0,It,Nt,ge.data)}}else{F?j&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,It,Nt,ut[nt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Gt,It,Nt,ut[nt]);for(let Lt=0;Lt<gt.length;Lt++){let Rt=gt[Lt];F?j&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt+1,0,0,It,Nt,Rt.image[nt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt+1,Gt,It,Nt,Rt.image[nt])}}}p(b)&&y(s.TEXTURE_CUBE_MAP),rt.__version=Y.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function yt(I,b,z,V,Y,rt){let at=r.convert(z.format,z.colorSpace),J=r.convert(z.type),tt=v(z.internalFormat,at,J,z.normalized,z.colorSpace),ot=i.get(b),Pt=i.get(z);if(Pt.__renderTarget=b,!ot.__hasExternalTextures){let ut=Math.max(1,b.width>>rt),lt=Math.max(1,b.height>>rt);Y===s.TEXTURE_3D||Y===s.TEXTURE_2D_ARRAY?e.texImage3D(Y,rt,tt,ut,lt,b.depth,0,at,J,null):e.texImage2D(Y,rt,tt,ut,lt,0,at,J,null)}e.bindFramebuffer(s.FRAMEBUFFER,I),Ce(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,V,Y,Pt.__webglTexture,0,Me(b)):(Y===s.TEXTURE_2D||Y>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,V,Y,Pt.__webglTexture,rt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function $t(I,b,z){if(s.bindRenderbuffer(s.RENDERBUFFER,I),b.depthBuffer){let V=b.depthTexture,Y=V&&V.isDepthTexture?V.type:null,rt=S(b.stencilBuffer,Y),at=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Ce(b)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Me(b),rt,b.width,b.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,Me(b),rt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,rt,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,at,s.RENDERBUFFER,I)}else{let V=b.textures;for(let Y=0;Y<V.length;Y++){let rt=V[Y],at=r.convert(rt.format,rt.colorSpace),J=r.convert(rt.type),tt=v(rt.internalFormat,at,J,rt.normalized,rt.colorSpace);Ce(b)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Me(b),tt,b.width,b.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,Me(b),tt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,tt,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ne(I,b,z){let V=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,I),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=i.get(b.depthTexture);if(Y.__renderTarget=b,(!Y.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),V){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,b.depthTexture.addEventListener("dispose",R)),Y.__webglTexture===void 0){Y.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),Zt(s.TEXTURE_CUBE_MAP,b.depthTexture);let ot=r.convert(b.depthTexture.format),Pt=r.convert(b.depthTexture.type),ut;b.depthTexture.format===Wi?ut=s.DEPTH_COMPONENT24:b.depthTexture.format===Dn&&(ut=s.DEPTH24_STENCIL8);for(let lt=0;lt<6;lt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,ut,b.width,b.height,0,ot,Pt,null)}}else st(b.depthTexture,0);let rt=Y.__webglTexture,at=Me(b),J=V?s.TEXTURE_CUBE_MAP_POSITIVE_X+z:s.TEXTURE_2D,tt=b.depthTexture.format===Dn?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(b.depthTexture.format===Wi)Ce(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,tt,J,rt,0,at):s.framebufferTexture2D(s.FRAMEBUFFER,tt,J,rt,0);else if(b.depthTexture.format===Dn)Ce(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,tt,J,rt,0,at):s.framebufferTexture2D(s.FRAMEBUFFER,tt,J,rt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Kt(I){let b=i.get(I),z=I.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==I.depthTexture){let V=I.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),V){let Y=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,V.removeEventListener("dispose",Y)};V.addEventListener("dispose",Y),b.__depthDisposeCallback=Y}b.__boundDepthTexture=V}if(I.depthTexture&&!b.__autoAllocateDepthBuffer)if(z)for(let V=0;V<6;V++)Ne(b.__webglFramebuffer[V],I,V);else{let V=I.texture.mipmaps;V&&V.length>0?Ne(b.__webglFramebuffer[0],I,0):Ne(b.__webglFramebuffer,I,0)}else if(z){b.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[V]),b.__webglDepthbuffer[V]===void 0)b.__webglDepthbuffer[V]=s.createRenderbuffer(),$t(b.__webglDepthbuffer[V],I,!1);else{let Y=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,rt=b.__webglDepthbuffer[V];s.bindRenderbuffer(s.RENDERBUFFER,rt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,rt)}}else{let V=I.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),$t(b.__webglDepthbuffer,I,!1);else{let Y=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,rt=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,rt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,rt)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function se(I,b,z){let V=i.get(I);b!==void 0&&yt(V.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&Kt(I)}function me(I){let b=I.texture,z=i.get(I),V=i.get(b);I.addEventListener("dispose",_);let Y=I.textures,rt=I.isWebGLCubeRenderTarget===!0,at=Y.length>1;if(at||(V.__webglTexture===void 0&&(V.__webglTexture=s.createTexture()),V.__version=b.version,a.memory.textures++),rt){z.__webglFramebuffer=[];for(let J=0;J<6;J++)if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer[J]=[];for(let tt=0;tt<b.mipmaps.length;tt++)z.__webglFramebuffer[J][tt]=s.createFramebuffer()}else z.__webglFramebuffer[J]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer=[];for(let J=0;J<b.mipmaps.length;J++)z.__webglFramebuffer[J]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(at)for(let J=0,tt=Y.length;J<tt;J++){let ot=i.get(Y[J]);ot.__webglTexture===void 0&&(ot.__webglTexture=s.createTexture(),a.memory.textures++)}if(I.samples>0&&Ce(I)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let J=0;J<Y.length;J++){let tt=Y[J];z.__webglColorRenderbuffer[J]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[J]);let ot=r.convert(tt.format,tt.colorSpace),Pt=r.convert(tt.type),ut=v(tt.internalFormat,ot,Pt,tt.normalized,tt.colorSpace,I.isXRRenderTarget===!0),lt=Me(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,lt,ut,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+J,s.RENDERBUFFER,z.__webglColorRenderbuffer[J])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),$t(z.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(rt){e.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture),Zt(s.TEXTURE_CUBE_MAP,b);for(let J=0;J<6;J++)if(b.mipmaps&&b.mipmaps.length>0)for(let tt=0;tt<b.mipmaps.length;tt++)yt(z.__webglFramebuffer[J][tt],I,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+J,tt);else yt(z.__webglFramebuffer[J],I,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);p(b)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(at){for(let J=0,tt=Y.length;J<tt;J++){let ot=Y[J],Pt=i.get(ot),ut=s.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ut=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ut,Pt.__webglTexture),Zt(ut,ot),yt(z.__webglFramebuffer,I,ot,s.COLOR_ATTACHMENT0+J,ut,0),p(ot)&&y(ut)}e.unbindTexture()}else{let J=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(J=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(J,V.__webglTexture),Zt(J,b),b.mipmaps&&b.mipmaps.length>0)for(let tt=0;tt<b.mipmaps.length;tt++)yt(z.__webglFramebuffer[tt],I,b,s.COLOR_ATTACHMENT0,J,tt);else yt(z.__webglFramebuffer,I,b,s.COLOR_ATTACHMENT0,J,0);p(b)&&y(J),e.unbindTexture()}I.depthBuffer&&Kt(I)}function jt(I){let b=I.textures;for(let z=0,V=b.length;z<V;z++){let Y=b[z];if(p(Y)){let rt=A(I),at=i.get(Y).__webglTexture;e.bindTexture(rt,at),y(rt),e.unbindTexture()}}}let ye=[],Oe=[];function li(I){if(I.samples>0){if(Ce(I)===!1){let b=I.textures,z=I.width,V=I.height,Y=s.COLOR_BUFFER_BIT,rt=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,at=i.get(I),J=b.length>1;if(J)for(let ot=0;ot<b.length;ot++)e.bindFramebuffer(s.FRAMEBUFFER,at.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,at.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,at.__webglMultisampledFramebuffer);let tt=I.texture.mipmaps;tt&&tt.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,at.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,at.__webglFramebuffer);for(let ot=0;ot<b.length;ot++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(Y|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(Y|=s.STENCIL_BUFFER_BIT)),J){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,at.__webglColorRenderbuffer[ot]);let Pt=i.get(b[ot]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Pt,0)}s.blitFramebuffer(0,0,z,V,0,0,z,V,Y,s.NEAREST),l===!0&&(ye.length=0,Oe.length=0,ye.push(s.COLOR_ATTACHMENT0+ot),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(ye.push(rt),Oe.push(rt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Oe)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ye))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),J)for(let ot=0;ot<b.length;ot++){e.bindFramebuffer(s.FRAMEBUFFER,at.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.RENDERBUFFER,at.__webglColorRenderbuffer[ot]);let Pt=i.get(b[ot]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,at.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ot,s.TEXTURE_2D,Pt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,at.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&l){let b=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function Me(I){return Math.min(n.maxSamples,I.samples)}function Ce(I){let b=i.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function B(I){let b=a.render.frame;h.get(I)!==b&&(h.set(I,b),I.update())}function Ze(I,b){let z=I.colorSpace,V=I.format,Y=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||z!==ar&&z!==un&&(Qt.getTransfer(z)===le?(V!==wi||Y!==hi)&&Bt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ot("WebGLTextures: Unsupported texture color space:",z)),b}function he(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=D,this.getTextureUnits=L,this.setTextureUnits=O,this.setTexture2D=st,this.setTexture2DArray=W,this.setTexture3D=Q,this.setTextureCube=it,this.rebindTextures=se,this.setupRenderTarget=me,this.updateRenderTargetMipmap=jt,this.updateMultisampleRenderTarget=li,this.setupDepthRenderbuffer=Kt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=Ce,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Ux(s,t){function e(i,n=un){let r,a=Qt.getTransfer(n);if(i===hi)return s.UNSIGNED_BYTE;if(i===so)return s.UNSIGNED_SHORT_4_4_4_4;if(i===ro)return s.UNSIGNED_SHORT_5_5_5_1;if(i===mc)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===gc)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===fc)return s.BYTE;if(i===pc)return s.SHORT;if(i===Ds)return s.UNSIGNED_SHORT;if(i===no)return s.INT;if(i===Bi)return s.UNSIGNED_INT;if(i===Si)return s.FLOAT;if(i===ki)return s.HALF_FLOAT;if(i===xc)return s.ALPHA;if(i===_c)return s.RGB;if(i===wi)return s.RGBA;if(i===Wi)return s.DEPTH_COMPONENT;if(i===Dn)return s.DEPTH_STENCIL;if(i===ao)return s.RED;if(i===oo)return s.RED_INTEGER;if(i===Nn)return s.RG;if(i===lo)return s.RG_INTEGER;if(i===co)return s.RGBA_INTEGER;if(i===Ar||i===Rr||i===Cr||i===Pr)if(a===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ar)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ar)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Cr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Pr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ho||i===uo||i===fo||i===po)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ho)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===uo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===po)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===mo||i===go||i===xo||i===_o||i===vo||i===Ir||i===yo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===mo||i===go)return a===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===xo)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===_o)return r.COMPRESSED_R11_EAC;if(i===vo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ir)return r.COMPRESSED_RG11_EAC;if(i===yo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===bo||i===Mo||i===So||i===wo||i===To||i===Eo||i===Ao||i===Ro||i===Co||i===Po||i===Io||i===Lo||i===Do||i===No)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===bo)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Mo)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===So)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===wo)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===To)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Eo)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ao)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ro)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Co)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Po)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Io)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Lo)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Do)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===No)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Uo||i===Fo||i===Bo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Uo)return a===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Fo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Bo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ko||i===Oo||i===Lr||i===zo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ko)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Oo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Lr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===zo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ns?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}var Fx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Bx=`
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

}`,Vc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new _r(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new $e({vertexShader:Fx,fragmentShader:Bx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ut(new De(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Wc=class extends Xi{constructor(t,e){super();let i=this,n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new Vc,p={},y=e.getContextAttributes(),A=null,v=null,S=[],w=[],R=new Yt,_=null,M=null,E=new Ue;E.viewport=new be;let C=new Ue;C.viewport=new be;let P=[E,C],D=new ja,L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let et=S[Z];return et===void 0&&(et=new As,S[Z]=et),et.getTargetRaySpace()},this.getControllerGrip=function(Z){let et=S[Z];return et===void 0&&(et=new As,S[Z]=et),et.getGripSpace()},this.getHand=function(Z){let et=S[Z];return et===void 0&&(et=new As,S[Z]=et),et.getHandSpace()};function X(Z){let et=w.indexOf(Z.inputSource);if(et===-1)return;let Mt=S[et];Mt!==void 0&&(Mt.update(Z.inputSource,Z.frame,c||a),Mt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function $(){n.removeEventListener("select",X),n.removeEventListener("selectstart",X),n.removeEventListener("selectend",X),n.removeEventListener("squeeze",X),n.removeEventListener("squeezestart",X),n.removeEventListener("squeezeend",X),n.removeEventListener("end",$),n.removeEventListener("inputsourceschange",st);for(let Z=0;Z<S.length;Z++){let et=w[Z];et!==null&&(w[Z]=null,S[Z].disconnect(et))}L=null,O=null,m.reset();for(let Z in p)delete p[Z];if(t.setRenderTarget(A),f=null,u=null,d=null,n=null,v=null,ne.stop(),i.isPresenting=!1,t.setPixelRatio(_),t.setSize(R.width,R.height,!1),M!==null){let Z=M.camera;Z.fov=M.fov,Z.zoom=M.zoom,Z.updateProjectionMatrix(),M=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,i.isPresenting===!0&&Bt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Bt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(n,e)),d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(Z){if(n=Z,n!==null){if(A=t.getRenderTarget(),n.addEventListener("select",X),n.addEventListener("selectstart",X),n.addEventListener("selectend",X),n.addEventListener("squeeze",X),n.addEventListener("squeezestart",X),n.addEventListener("squeezeend",X),n.addEventListener("end",$),n.addEventListener("inputsourceschange",st),y.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,Ht=null,yt=null;y.depth&&(yt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=y.stencil?Dn:Wi,Ht=y.stencil?Ns:Bi);let $t={colorFormat:e.RGBA8,depthFormat:yt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer($t),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new Qe(u.textureWidth,u.textureHeight,{format:wi,type:hi,depthTexture:new Sn(u.textureWidth,u.textureHeight,Ht,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let Mt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(n,e,Mt),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Qe(f.framebufferWidth,f.framebufferHeight,{format:wi,type:hi,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),ne.setContext(n),ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function st(Z){for(let et=0;et<Z.removed.length;et++){let Mt=Z.removed[et],Ht=w.indexOf(Mt);Ht>=0&&(w[Ht]=null,S[Ht].disconnect(Mt))}for(let et=0;et<Z.added.length;et++){let Mt=Z.added[et],Ht=w.indexOf(Mt);if(Ht===-1){for(let $t=0;$t<S.length;$t++)if($t>=w.length){w.push(Mt),Ht=$t;break}else if(w[$t]===null){w[$t]=Mt,Ht=$t;break}if(Ht===-1)break}let yt=S[Ht];yt&&yt.connect(Mt)}}let W=new k,Q=new k;function it(Z,et,Mt){W.setFromMatrixPosition(et.matrixWorld),Q.setFromMatrixPosition(Mt.matrixWorld);let Ht=W.distanceTo(Q),yt=et.projectionMatrix.elements,$t=Mt.projectionMatrix.elements,Ne=yt[14]/(yt[10]-1),Kt=yt[14]/(yt[10]+1),se=(yt[9]+1)/yt[5],me=(yt[9]-1)/yt[5],jt=(yt[8]-1)/yt[0],ye=($t[8]+1)/$t[0],Oe=Ne*jt,li=Ne*ye,Me=Ht/(-jt+ye),Ce=Me*-jt;if(et.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ce),Z.translateZ(Me),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),yt[10]===-1)Z.projectionMatrix.copy(et.projectionMatrix),Z.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let B=Ne+Me,Ze=Kt+Me,he=Oe-Ce,I=li+(Ht-Ce),b=se*Kt/Ze*B,z=me*Kt/Ze*B;Z.projectionMatrix.makePerspective(he,I,b,z,B,Ze),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function vt(Z,et){et===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(et.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(n===null)return;let et=Z.near,Mt=Z.far;m.texture!==null&&(m.depthNear>0&&(et=m.depthNear),m.depthFar>0&&(Mt=m.depthFar)),D.near=C.near=E.near=et,D.far=C.far=E.far=Mt,(L!==D.near||O!==D.far)&&(n.updateRenderState({depthNear:D.near,depthFar:D.far}),L=D.near,O=D.far),D.layers.mask=Z.layers.mask|6,E.layers.mask=D.layers.mask&-5,C.layers.mask=D.layers.mask&-3;let Ht=Z.parent,yt=D.cameras;vt(D,Ht);for(let $t=0;$t<yt.length;$t++)vt(yt[$t],Ht);yt.length===2?it(D,E,C):D.projectionMatrix.copy(E.projectionMatrix),M===null&&Z.isPerspectiveCamera&&(M={camera:Z,fov:Z.fov,zoom:Z.zoom}),St(Z,D,Ht)};function St(Z,et,Mt){Mt===null?Z.matrix.copy(et.matrixWorld):(Z.matrix.copy(Mt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(et.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(et.projectionMatrix),Z.projectionMatrixInverse.copy(et.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=La*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(Z){return p[Z]};let ce=null;function Zt(Z,et){if(h=et.getViewerPose(c||a),g=et,h!==null){let Mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let Ht=!1;Mt.length!==D.cameras.length&&(D.cameras.length=0,Ht=!0);for(let Kt=0;Kt<Mt.length;Kt++){let se=Mt[Kt],me=null;if(f!==null)me=f.getViewport(se);else{let ye=d.getViewSubImage(u,se);me=ye.viewport,Kt===0&&(t.setRenderTargetTextures(v,ye.colorTexture,ye.depthStencilTexture),t.setRenderTarget(v))}let jt=P[Kt];jt===void 0&&(jt=new Ue,jt.layers.enable(Kt),jt.viewport=new be,P[Kt]=jt),jt.matrix.fromArray(se.transform.matrix),jt.matrix.decompose(jt.position,jt.quaternion,jt.scale),jt.projectionMatrix.fromArray(se.projectionMatrix),jt.projectionMatrixInverse.copy(jt.projectionMatrix).invert(),jt.viewport.set(me.x,me.y,me.width,me.height),Kt===0&&(D.matrix.copy(jt.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Ht===!0&&D.cameras.push(jt)}let yt=n.enabledFeatures;if(yt&&yt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){d=i.getBinding();let Kt=d.getDepthInformation(Mt[0]);Kt&&Kt.isValid&&Kt.texture&&m.init(Kt,n.renderState)}if(yt&&yt.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let Kt=0;Kt<Mt.length;Kt++){let se=Mt[Kt].camera;if(se){let me=p[se];me||(me=new _r,p[se]=me);let jt=d.getCameraImage(se);me.sourceTexture=jt}}}}for(let Mt=0;Mt<S.length;Mt++){let Ht=w[Mt],yt=S[Mt];Ht!==null&&yt!==void 0&&yt.update(Ht,et,c||a)}ce&&ce(Z,et),et.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:et}),g=null}let ne=new sd;ne.setAnimationLoop(Zt),this.setAnimationLoop=function(Z){ce=Z},this.dispose=function(){}}},kx=new ue,hd=new zt;hd.set(-1,0,0,0,1,0,0,0,1);function Ox(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,bc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,y,A,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,A):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ye&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ye&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let y=t.get(p),A=y.envMap,v=y.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(kx.makeRotationFromEuler(v)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(hd),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,A){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=A*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ye&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function zx(s,t,e,i){let n={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,S){let w=S.program;i.uniformBlockBinding(v,w)}function c(v,S){let w=n[v.id];w===void 0&&(m(v),w=h(v),n[v.id]=w,v.addEventListener("dispose",y));let R=S.program;i.updateUBOMapping(v,R);let _=t.render.frame;r[v.id]!==_&&(u(v),r[v.id]=_)}function h(v){let S=d();v.__bindingPointIndex=S;let w=s.createBuffer(),R=v.__size,_=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,R,_),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,S,w),w}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let S=n[v.id],w=v.uniforms,R=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let _=0,M=w.length;_<M;_++){let E=w[_];if(Array.isArray(E))for(let C=0,P=E.length;C<P;C++)f(E[C],_,C,R);else f(E,_,0,R)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(v,S,w,R){if(x(v,S,w,R)===!0){let _=v.__offset,M=v.value;if(Array.isArray(M)){let E=0;for(let C=0;C<M.length;C++){let P=M[C],D=p(P);g(P,v.__data,E),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(E+=D.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(M,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,_,v.__data)}}function g(v,S,w){typeof v=="number"||typeof v=="boolean"?S[0]=v:v.isMatrix3?(S[0]=v.elements[0],S[1]=v.elements[1],S[2]=v.elements[2],S[3]=0,S[4]=v.elements[3],S[5]=v.elements[4],S[6]=v.elements[5],S[7]=0,S[8]=v.elements[6],S[9]=v.elements[7],S[10]=v.elements[8],S[11]=0):ArrayBuffer.isView(v)?S.set(new v.constructor(v.buffer,v.byteOffset,S.length)):v.toArray(S,w)}function x(v,S,w,R){let _=v.value,M=S+"_"+w;if(R[M]===void 0)return typeof _=="number"||typeof _=="boolean"?R[M]=_:ArrayBuffer.isView(_)?R[M]=_.slice():R[M]=_.clone(),!0;{let E=R[M];if(typeof _=="number"||typeof _=="boolean"){if(E!==_)return R[M]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(E.equals(_)===!1)return E.copy(_),!0}}return!1}function m(v){let S=v.uniforms,w=0,R=16;for(let M=0,E=S.length;M<E;M++){let C=Array.isArray(S[M])?S[M]:[S[M]];for(let P=0,D=C.length;P<D;P++){let L=C[P],O=Array.isArray(L.value)?L.value:[L.value];for(let X=0,$=O.length;X<$;X++){let st=O[X],W=p(st),Q=w%R,it=Q%W.boundary,vt=Q+it;w+=it,vt!==0&&R-vt<W.storage&&(w+=R-vt),L.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=w,w+=W.storage}}}let _=w%R;return _>0&&(w+=R-_),v.__size=w,v.__cache={},this}function p(v){let S={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=48,S.storage=48):v.isMatrix4?(S.boundary=64,S.storage=64):v.isTexture?Bt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(S.boundary=16,S.storage=v.byteLength):Bt("WebGLRenderer: Unsupported uniform value type.",v),S}function y(v){let S=v.target;S.removeEventListener("dispose",y);let w=a.indexOf(S.__bindingPointIndex);a.splice(w,1),s.deleteBuffer(n[S.id]),delete n[S.id],delete r[S.id]}function A(){for(let v in n)s.deleteBuffer(n[v]);a=[],n={},r={}}return{bind:l,update:c,dispose:A}}var Hx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Yi=null;function Gx(){return Yi===null&&(Yi=new gr(Hx,16,16,Nn,ki),Yi.name="DFG_LUT",Yi.minFilter=qe,Yi.magFilter=qe,Yi.wrapS=yi,Yi.wrapT=yi,Yi.generateMipmaps=!1,Yi.needsUpdate=!0),Yi}var $o=class{constructor(t={}){let{canvas:e=Cu(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=hi}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let x=f,m=new Set([co,lo,oo]),p=new Set([hi,Bi,Ds,Ns,so,ro]),y=new Uint32Array(4),A=new Int32Array(4),v=new k,S=null,w=null,R=[],_=[],M=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Fi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let E=this,C=!1,P=null,D=null,L=null,O=null;this._outputColorSpace=Ee;let X=0,$=0,st=null,W=-1,Q=null,it=new be,vt=new be,St=null,ce=new Dt(0),Zt=0,ne=e.width,Z=e.height,et=1,Mt=null,Ht=null,yt=new be(0,0,ne,Z),$t=new be(0,0,ne,Z),Ne=!1,Kt=new Cs,se=!1,me=!1,jt=new ue,ye=new k,Oe=new be,li={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Me=!1;function Ce(){return st===null?et:1}let B=i;function Ze(T,N){return e.getContext(T,N)}let he,I,b,z,V,Y,rt,at,J,tt,ot,Pt,ut,lt,It,Nt,Gt,F,ct,j,ht,gt,nt;try{let T={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ge,!1),e.addEventListener("webglcontextrestored",ae,!1),e.addEventListener("webglcontextcreationerror",Ai,!1),B===null){let N="webgl2";if(B=Ze(N,T),B===null)throw Ze(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Lt()}catch(T){throw e.removeEventListener("webglcontextlost",ge,!1),e.removeEventListener("webglcontextrestored",ae,!1),e.removeEventListener("webglcontextcreationerror",Ai,!1),Ot("WebGLRenderer: "+T.message),T}function Lt(){he=new Zm(B),he.init(),ht=new Ux(B,he),I=new Om(B,he,t,ht),b=new Dx(B,he),I.reversedDepthBuffer&&u&&b.buffers.depth.setReversed(!0),D=B.createFramebuffer(),L=B.createFramebuffer(),O=B.createFramebuffer(),z=new jm(B),V=new vx,Y=new Nx(B,he,b,V,I,ht,z),rt=new Ym(E),at=new tp(B),gt=new Bm(B,at),J=new Km(B,at,z,gt),tt=new tg(B,J,at,gt,z),F=new Qm(B,I,Y),It=new zm(V),ot=new _x(E,rt,he,I,gt,It),Pt=new Ox(E,V),ut=new bx,lt=new Ax(he),Gt=new Fm(E,rt,b,tt,g,l),Nt=new Lx(E,tt,I),nt=new zx(B,z,I,b),ct=new km(B,he,z),j=new Jm(B,he,z),z.programs=ot.programs,E.capabilities=I,E.extensions=he,E.properties=V,E.renderLists=ut,E.shadowMap=Nt,E.state=b,E.info=z}x!==hi&&(M=new ig(x,e.width,e.height,o,n,r));let Rt=new Wc(E,B);this.xr=Rt,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let T=he.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=he.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(T){T!==void 0&&(et=T,this.setSize(ne,Z,!1))},this.getSize=function(T){return T.set(ne,Z)},this.setSize=function(T,N,q=!0){if(Rt.isPresenting){Bt("WebGLRenderer: Can't change size while VR device is presenting.");return}ne=T,Z=N,e.width=Math.floor(T*et),e.height=Math.floor(N*et),q===!0&&(e.style.width=T+"px",e.style.height=N+"px"),M!==null&&M.setSize(e.width,e.height),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(ne*et,Z*et).floor()},this.setDrawingBufferSize=function(T,N,q){ne=T,Z=N,et=q,e.width=Math.floor(T*q),e.height=Math.floor(N*q),this.setViewport(0,0,T,N)},this.setEffects=function(T){if(x===hi){Ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let N=0;N<T.length;N++)if(T[N].isOutputPass===!0){Bt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(it)},this.getViewport=function(T){return T.copy(yt)},this.setViewport=function(T,N,q,H){T.isVector4?yt.set(T.x,T.y,T.z,T.w):yt.set(T,N,q,H),b.viewport(it.copy(yt).multiplyScalar(et).round())},this.getScissor=function(T){return T.copy($t)},this.setScissor=function(T,N,q,H){T.isVector4?$t.set(T.x,T.y,T.z,T.w):$t.set(T,N,q,H),b.scissor(vt.copy($t).multiplyScalar(et).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(T){b.setScissorTest(Ne=T)},this.setOpaqueSort=function(T){Mt=T},this.setTransparentSort=function(T){Ht=T},this.getClearColor=function(T){return T.copy(Gt.getClearColor())},this.setClearColor=function(){Gt.setClearColor(...arguments)},this.getClearAlpha=function(){return Gt.getClearAlpha()},this.setClearAlpha=function(){Gt.setClearAlpha(...arguments)},this.clear=function(T=!0,N=!0,q=!0){let H=0;if(T){let G=!1;if(st!==null){let mt=st.texture.format;G=m.has(mt)}if(G){let mt=st.texture.type,bt=p.has(mt),pt=Gt.getClearColor(),wt=Gt.getClearAlpha(),Ct=pt.r,Wt=pt.g,Jt=pt.b;bt?(y[0]=Ct,y[1]=Wt,y[2]=Jt,y[3]=wt,B.clearBufferuiv(B.COLOR,0,y)):(A[0]=Ct,A[1]=Wt,A[2]=Jt,A[3]=wt,B.clearBufferiv(B.COLOR,0,A))}else H|=B.COLOR_BUFFER_BIT}N&&(H|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(H|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&B.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),P=T},this.dispose=function(){e.removeEventListener("webglcontextlost",ge,!1),e.removeEventListener("webglcontextrestored",ae,!1),e.removeEventListener("webglcontextcreationerror",Ai,!1),Gt.dispose(),ut.dispose(),lt.dispose(),V.dispose(),rt.dispose(),tt.dispose(),gt.dispose(),nt.dispose(),ot.dispose(),Rt.dispose(),Rt.removeEventListener("sessionstart",mh),Rt.removeEventListener("sessionend",gh),zn.stop()};function ge(T){T.preventDefault(),yc("WebGLRenderer: Context Lost."),C=!0}function ae(){yc("WebGLRenderer: Context Restored."),C=!1;let T=z.autoReset,N=Nt.enabled,q=Nt.autoUpdate,H=Nt.needsUpdate,G=Nt.type;Lt(),z.autoReset=T,Nt.enabled=N,Nt.autoUpdate=q,Nt.needsUpdate=H,Nt.type=G}function Ai(T){Ot("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Hi(T){let N=T.target;N.removeEventListener("dispose",Hi),nf(N)}function nf(T){sf(T),V.remove(T)}function sf(T){let N=V.get(T).programs;N!==void 0&&(N.forEach(function(q){ot.releaseProgram(q)}),T.isShaderMaterial&&ot.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,q,H,G,mt){N===null&&(N=li);let bt=G.isMesh&&G.matrixWorld.determinantAffine()<0,pt=of(T,N,q,H,G);b.setMaterial(H,bt);let wt=q.index,Ct=1;if(H.wireframe===!0){if(wt=J.getWireframeAttribute(q),wt===void 0)return;Ct=2}let Wt=q.drawRange,Jt=q.attributes.position,Tt=Wt.start*Ct,oe=(Wt.start+Wt.count)*Ct;mt!==null&&(Tt=Math.max(Tt,mt.start*Ct),oe=Math.min(oe,(mt.start+mt.count)*Ct)),wt!==null?(Tt=Math.max(Tt,0),oe=Math.min(oe,wt.count)):Jt!=null&&(Tt=Math.max(Tt,0),oe=Math.min(oe,Jt.count));let Pe=oe-Tt;if(Pe<0||Pe===1/0)return;gt.setup(G,H,pt,q,wt);let _e,pe=ct;if(wt!==null&&(_e=at.get(wt),pe=j,pe.setIndex(_e)),G.isMesh)H.wireframe===!0?(b.setLineWidth(H.wireframeLinewidth*Ce()),pe.setMode(B.LINES)):pe.setMode(B.TRIANGLES);else if(G.isLine){let Ke=H.linewidth;Ke===void 0&&(Ke=1),b.setLineWidth(Ke*Ce()),G.isLineSegments?pe.setMode(B.LINES):G.isLineLoop?pe.setMode(B.LINE_LOOP):pe.setMode(B.LINE_STRIP)}else G.isPoints?pe.setMode(B.POINTS):G.isSprite&&pe.setMode(B.TRIANGLES);if(G.isBatchedMesh)if(he.get("WEBGL_multi_draw"))pe.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Ke=G._multiDrawStarts,xt=G._multiDrawCounts,ni=G._multiDrawCount,ee=wt?at.get(wt).bytesPerElement:1,_i=V.get(H).currentProgram.getUniforms();for(let Gi=0;Gi<ni;Gi++)_i.setValue(B,"_gl_DrawID",Gi),pe.render(Ke[Gi]/ee,xt[Gi])}else if(G.isInstancedMesh)pe.renderInstances(Tt,Pe,G.count);else if(q.isInstancedBufferGeometry){let Ke=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,xt=Math.min(q.instanceCount,Ke);pe.renderInstances(Tt,Pe,xt)}else pe.render(Tt,Pe)};function ph(T,N,q,H){P!==null&&T.isNodeMaterial&&P.setObject(H,T),se===!0&&It.setState(T,q,!1),T.transparent===!0&&T.side===Ae&&T.forceSinglePass===!1?(T.side=Ye,T.needsUpdate=!0,jr(T,N,H),T.side=Cn,T.needsUpdate=!0,jr(T,N,H),T.side=Ae):jr(T,N,H)}this.compile=function(T,N,q=null){q===null&&(q=T),P!==null&&P.renderStart(T,N,q),w=lt.get(q),w.init(N),_.push(w),q.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(w.pushLight(G),G.castShadow&&w.pushShadow(G))}),T!==q&&T.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(w.pushLight(G),G.castShadow&&w.pushShadow(G))}),w.setupLights(),P!==null&&P.updateLights(w.state.lightsArray),me=this.localClippingEnabled,se=It.init(this.clippingPlanes,me),se===!0&&It.setGlobalState(this.clippingPlanes,N),P!==null&&Nt.render(w.state.shadowsArray,q,N);let H=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let mt=G.material;if(mt)if(Array.isArray(mt))for(let bt=0;bt<mt.length;bt++){let pt=mt[bt];ph(pt,q,N,G),H.add(pt)}else ph(mt,q,N,G),H.add(mt)}),w=_.pop(),P!==null&&P.renderEnd(),H},this.compileAsync=function(T,N,q=null){let H=this.compile(T,N,q);return new Promise(G=>{function mt(){if(H.forEach(function(bt){let wt=V.get(bt).currentProgram;(wt===void 0||wt.isReady())&&H.delete(bt)}),H.size===0){G(T);return}setTimeout(mt,10)}he.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let bl=null;function rf(T){bl&&bl(T)}function mh(){zn.stop()}function gh(){zn.start()}let zn=new sd;zn.setAnimationLoop(rf),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(T){bl=T,Rt.setAnimationLoop(T),T===null?zn.stop():zn.start()},Rt.addEventListener("sessionstart",mh),Rt.addEventListener("sessionend",gh),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){Ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;P!==null&&P.renderStart(T,N);let q=Rt.enabled===!0&&Rt.isPresenting===!0,H=M!==null&&(st===null||q)&&M.begin(E,st);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Rt.enabled===!0&&Rt.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(Rt.cameraAutoUpdate===!0&&Rt.updateCamera(N),N=Rt.getCamera()),T.isScene===!0&&T.onBeforeRender(E,T,N,st),w=lt.get(T,_.length),w.init(N),w.state.textureUnits=Y.getTextureUnits(),_.push(w),jt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Kt.setFromProjectionMatrix(jt,Li,N.reversedDepth),me=this.localClippingEnabled,se=It.init(this.clippingPlanes,me),S=ut.get(T,R.length),S.init(),R.push(S),Rt.enabled===!0&&Rt.isPresenting===!0){let bt=E.xr.getDepthSensingMesh();bt!==null&&Ml(bt,N,-1/0,E.sortObjects)}Ml(T,N,0,E.sortObjects),S.finish(),P!==null&&P.updateLights(w.state.lightsArray),E.sortObjects===!0&&S.sort(Mt,Ht),Me=Rt.enabled===!1||Rt.isPresenting===!1||Rt.hasDepthSensing()===!1,Me&&Gt.addToRenderList(S,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),se===!0&&It.beginShadows();let G=w.state.shadowsArray;if(Nt.render(G,T,N),se===!0&&It.endShadows(),(H&&M.hasRenderPass())===!1){let bt=S.opaque,pt=S.transmissive;if(w.setupLights(),N.isArrayCamera){let wt=N.cameras;if(pt.length>0)for(let Ct=0,Wt=wt.length;Ct<Wt;Ct++){let Jt=wt[Ct];_h(bt,pt,T,Jt)}Me&&Gt.render(T);for(let Ct=0,Wt=wt.length;Ct<Wt;Ct++){let Jt=wt[Ct];xh(S,T,Jt,Jt.viewport)}}else pt.length>0&&_h(bt,pt,T,N),Me&&Gt.render(T),xh(S,T,N)}st!==null&&$===0&&(Y.updateMultisampleRenderTarget(st),Y.updateRenderTargetMipmap(st)),H&&M.end(E),T.isScene===!0&&T.onAfterRender(E,T,N),gt.resetDefaultState(),W=-1,Q=null,_.pop(),_.length>0?(w=_[_.length-1],Y.setTextureUnits(w.state.textureUnits),se===!0&&It.setGlobalState(E.clippingPlanes,w.state.camera)):w=null,R.pop(),R.length>0?S=R[R.length-1]:S=null,P!==null&&P.renderEnd()};function Ml(T,N,q,H){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)q=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLightProbeGrid)w.pushLightProbeGrid(T);else if(T.isLight)w.pushLight(T),T.castShadow&&w.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Kt)){H&&Oe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(jt);let bt=tt.update(T),pt=T.material;pt.visible&&S.push(T,bt,pt,q,Oe.z,null,N)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(Kt))){let bt=tt.update(T),pt=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Oe.copy(T.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Oe.copy(bt.boundingSphere.center)),Oe.applyMatrix4(T.matrixWorld).applyMatrix4(jt)),Array.isArray(pt)){let wt=bt.groups;for(let Ct=0,Wt=wt.length;Ct<Wt;Ct++){let Jt=wt[Ct],Tt=pt[Jt.materialIndex];Tt&&Tt.visible&&S.push(T,bt,Tt,q,Oe.z,Jt,N)}}else pt.visible&&S.push(T,bt,pt,q,Oe.z,null,N)}}let mt=T.children;for(let bt=0,pt=mt.length;bt<pt;bt++)Ml(mt[bt],N,q,H)}function xh(T,N,q,H){let{opaque:G,transmissive:mt,transparent:bt}=T;w.setupLightsView(q),se===!0&&It.setGlobalState(E.clippingPlanes,q),H&&b.viewport(it.copy(H)),G.length>0&&Jr(G,N,q),mt.length>0&&Jr(mt,N,q),bt.length>0&&Jr(bt,N,q),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function _h(T,N,q,H){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[H.id]===void 0){let Tt=he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[H.id]=new Qe(1,1,{generateMipmaps:!0,type:Tt?ki:hi,minFilter:Ln,samples:Math.max(4,I.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qt.workingColorSpace})}let mt=w.state.transmissionRenderTarget[H.id],bt=H.viewport||it;mt.setSize(bt.z*E.transmissionResolutionScale,bt.w*E.transmissionResolutionScale);let pt=E.getRenderTarget(),wt=E.getActiveCubeFace(),Ct=E.getActiveMipmapLevel();E.setRenderTarget(mt),E.getClearColor(ce),Zt=E.getClearAlpha(),Zt<1&&E.setClearColor(16777215,.5),E.clear(),Me&&Gt.render(q);let Wt=E.toneMapping;E.toneMapping=Fi;let Jt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),w.setupLightsView(H),se===!0&&It.setGlobalState(E.clippingPlanes,H),Jr(T,q,H),Y.updateMultisampleRenderTarget(mt),Y.updateRenderTargetMipmap(mt),he.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let oe=0,Pe=N.length;oe<Pe;oe++){let _e=N[oe],{object:pe,geometry:Ke,material:xt,group:ni}=_e;if(xt.side===Ae&&pe.layers.test(H.layers)){let ee=xt.side;xt.side=Ye,xt.needsUpdate=!0,vh(pe,q,H,Ke,xt,ni),xt.side=ee,xt.needsUpdate=!0,Tt=!0}}Tt===!0&&(Y.updateMultisampleRenderTarget(mt),Y.updateRenderTargetMipmap(mt))}E.setRenderTarget(pt,wt,Ct),E.setClearColor(ce,Zt),Jt!==void 0&&(H.viewport=Jt),E.toneMapping=Wt}function Jr(T,N,q){let H=N.isScene===!0?N.overrideMaterial:null;for(let G=0,mt=T.length;G<mt;G++){let bt=T[G],{object:pt,geometry:wt,group:Ct}=bt,Wt=bt.material;Wt.allowOverride===!0&&H!==null&&(Wt=H),pt.layers.test(q.layers)&&vh(pt,N,q,wt,Wt,Ct)}}function vh(T,N,q,H,G,mt){P!==null&&G.isNodeMaterial&&P.setObject(T,G),T.onBeforeRender(E,N,q,H,G,mt),T.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(E,N,q,H,T,mt),G.transparent===!0&&G.side===Ae&&G.forceSinglePass===!1?(G.side=Ye,G.needsUpdate=!0,E.renderBufferDirect(q,N,H,G,T,mt),G.side=Cn,G.needsUpdate=!0,E.renderBufferDirect(q,N,H,G,T,mt),G.side=Ae):E.renderBufferDirect(q,N,H,G,T,mt),T.onAfterRender(E,N,q,H,G,mt)}function jr(T,N,q){N.isScene!==!0&&(N=li);let H=V.get(T),G=w.state.lights,mt=w.state.shadowsArray,bt=G.state.version,pt=ot.getParameters(T,G.state,mt,N,q,w.state.lightProbeGridArray),wt=ot.getProgramCacheKey(pt),Ct=H.programs;H.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?N.environment:null,H.fog=N.fog;let Wt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;H.envMap=rt.get(T.envMap||H.environment,Wt),H.envMapRotation=H.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,Ct===void 0&&(T.addEventListener("dispose",Hi),Ct=new Map,H.programs=Ct);let Jt=Ct.get(wt);if(Jt!==void 0){if(H.currentProgram===Jt&&H.lightsStateVersion===bt)return bh(T,pt),Jt}else pt.uniforms=ot.getUniforms(T),P!==null&&T.isNodeMaterial&&P.build(T,q,pt),T.onBeforeCompile(pt,E),Jt=ot.acquireProgram(pt,wt),Ct.set(wt,Jt),H.uniforms=pt.uniforms;let Tt=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Tt.clippingPlanes=It.uniform),bh(T,pt),H.needsLights=cf(T),H.lightsStateVersion=bt,H.needsLights&&(Tt.ambientLightColor.value=G.state.ambient,Tt.lightProbe.value=G.state.probe,Tt.sunLights.value=G.state.sun,Tt.sunLightShadows.value=G.state.sunShadow,Tt.directionalLights.value=G.state.directional,Tt.directionalLightShadows.value=G.state.directionalShadow,Tt.spotLights.value=G.state.spot,Tt.spotLightShadows.value=G.state.spotShadow,Tt.rectAreaLights.value=G.state.rectArea,Tt.ltc_1.value=G.state.rectAreaLTC1,Tt.ltc_2.value=G.state.rectAreaLTC2,Tt.pointLights.value=G.state.point,Tt.pointLightShadows.value=G.state.pointShadow,Tt.hemisphereLights.value=G.state.hemi,Tt.sunShadowMatrix.value=G.state.sunShadowMatrix,Tt.sunShadowCascade.value=G.state.sunShadowCascade,Tt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Tt.spotLightMatrix.value=G.state.spotLightMatrix,Tt.spotLightMap.value=G.state.spotLightMap,Tt.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=w.state.lightProbeGridArray.length>0,H.currentProgram=Jt,H.uniformsList=null,Jt}function yh(T){if(T.uniformsList===null){let N=T.currentProgram.getUniforms();T.uniformsList=Bs.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function bh(T,N){let q=V.get(T);q.outputColorSpace=N.outputColorSpace,q.batching=N.batching,q.batchingColor=N.batchingColor,q.instancing=N.instancing,q.instancingColor=N.instancingColor,q.instancingMorph=N.instancingMorph,q.skinning=N.skinning,q.morphTargets=N.morphTargets,q.morphNormals=N.morphNormals,q.morphColors=N.morphColors,q.morphTargetsCount=N.morphTargetsCount,q.numClippingPlanes=N.numClippingPlanes,q.numIntersection=N.numClipIntersection,q.vertexAlphas=N.vertexAlphas,q.vertexTangents=N.vertexTangents,q.toneMapping=N.toneMapping}function af(T,N){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;v.setFromMatrixPosition(N.matrixWorld);for(let q=0,H=T.length;q<H;q++){let G=T[q];if(G.texture!==null&&G.boundingBox.containsPoint(v))return G}return null}function of(T,N,q,H,G){N.isScene!==!0&&(N=li),Y.resetTextureUnits();let mt=N.fog,bt=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?N.environment:null,pt=st===null?E.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:Qt.workingColorSpace,wt=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ct=rt.get(H.envMap||bt,wt),Wt=H.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Jt=!!q.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Tt=!!q.morphAttributes.position,oe=!!q.morphAttributes.normal,Pe=!!q.morphAttributes.color,_e=Fi;H.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(_e=E.toneMapping);let pe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Ke=pe!==void 0?pe.length:0,xt=V.get(H),ni=w.state.lights;if(se===!0&&(me===!0||T!==Q)){let xe=T===Q&&H.id===W;It.setState(H,T,xe)}let ee=!1;H.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==ni.state.version||xt.outputColorSpace!==pt||G.isBatchedMesh&&xt.batching===!1||!G.isBatchedMesh&&xt.batching===!0||G.isBatchedMesh&&xt.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&xt.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&xt.instancing===!1||!G.isInstancedMesh&&xt.instancing===!0||G.isSkinnedMesh&&xt.skinning===!1||!G.isSkinnedMesh&&xt.skinning===!0||G.isInstancedMesh&&xt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&xt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&xt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&xt.instancingMorph===!1&&G.morphTexture!==null||xt.envMap!==Ct||H.fog===!0&&xt.fog!==mt||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==It.numPlanes||xt.numIntersection!==It.numIntersection)||xt.vertexAlphas!==Wt||xt.vertexTangents!==Jt||xt.morphTargets!==Tt||xt.morphNormals!==oe||xt.morphColors!==Pe||xt.toneMapping!==_e||xt.morphTargetsCount!==Ke||!!xt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ee=!0):(ee=!0,xt.__version=H.version);let _i=xt.currentProgram;ee===!0&&(_i=jr(H,N,G),P&&H.isNodeMaterial&&P.onUpdateProgram(H,_i,xt));let Gi=!1,fn=!1,as=!1,de=_i.getUniforms(),Te=xt.uniforms;if(b.useProgram(_i.program)&&(Gi=!0,fn=!0,as=!0),H.id!==W&&(W=H.id,fn=!0),xt.needsLights){let xe=af(w.state.lightProbeGridArray,G);xt.lightProbeGrid!==xe&&(xt.lightProbeGrid=xe,fn=!0)}if(Gi||Q!==T){b.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),de.setValue(B,"projectionMatrix",T.projectionMatrix),de.setValue(B,"viewMatrix",T.matrixWorldInverse);let mn=de.map.cameraPosition;mn!==void 0&&mn.setValue(B,ye.setFromMatrixPosition(T.matrixWorld)),I.logarithmicDepthBuffer&&de.setValue(B,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&de.setValue(B,"isOrthographic",T.isOrthographicCamera===!0),Q!==T&&(Q=T,fn=!0,as=!0)}if(xt.needsLights&&(ni.state.sunShadowMap.length>0&&de.setValue(B,"sunShadowMap",ni.state.sunShadowMap,Y),ni.state.directionalShadowMap.length>0&&de.setValue(B,"directionalShadowMap",ni.state.directionalShadowMap,Y),ni.state.spotShadowMap.length>0&&de.setValue(B,"spotShadowMap",ni.state.spotShadowMap,Y),ni.state.pointShadowMap.length>0&&de.setValue(B,"pointShadowMap",ni.state.pointShadowMap,Y)),G.isSkinnedMesh){de.setOptional(B,G,"bindMatrix"),de.setOptional(B,G,"bindMatrixInverse");let xe=G.skeleton;xe&&(xe.boneTexture===null&&xe.computeBoneTexture(),de.setValue(B,"boneTexture",xe.boneTexture,Y))}G.isBatchedMesh&&(de.setOptional(B,G,"batchingTexture"),de.setValue(B,"batchingTexture",G._matricesTexture,Y),de.setOptional(B,G,"batchingIdTexture"),de.setValue(B,"batchingIdTexture",G._indirectTexture,Y),de.setOptional(B,G,"batchingColorTexture"),G._colorsTexture!==null&&de.setValue(B,"batchingColorTexture",G._colorsTexture,Y));let pn=q.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&F.update(G,q,_i),(fn||xt.receiveShadow!==G.receiveShadow)&&(xt.receiveShadow=G.receiveShadow,de.setValue(B,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&N.environment!==null&&(Te.envMapIntensity.value=N.environmentIntensity),Te.dfgLUT!==void 0&&(Te.dfgLUT.value=Gx()),fn){if(de.setValue(B,"toneMappingExposure",E.toneMappingExposure),xt.needsLights&&lf(Te,as),mt&&H.fog===!0&&Pt.refreshFogUniforms(Te,mt),Pt.refreshMaterialUniforms(Te,H,et,Z,w.state.transmissionRenderTarget[T.id]),xt.needsLights&&xt.lightProbeGrid){let xe=xt.lightProbeGrid;Te.probesSH.value=xe.texture,Te.probesMin.value.copy(xe.boundingBox.min),Te.probesMax.value.copy(xe.boundingBox.max),Te.probesResolution.value.copy(xe.resolution)}Bs.upload(B,yh(xt),Te,Y)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Bs.upload(B,yh(xt),Te,Y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&de.setValue(B,"center",G.center),de.setValue(B,"modelViewMatrix",G.modelViewMatrix),de.setValue(B,"normalMatrix",G.normalMatrix),de.setValue(B,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){let xe=H.uniformsGroups;for(let mn=0,os=xe.length;mn<os;mn++){let Sh=xe[mn];nt.update(Sh,_i),nt.bind(Sh,_i)}}return _i}function lf(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.sunLights.needsUpdate=N,T.sunLightShadows.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function cf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return st},this.setRenderTargetTextures=function(T,N,q){let H=V.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),V.get(T.texture).__webglTexture=N,V.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:q,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,N){let q=V.get(T);q.__webglFramebuffer=N,q.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(T,N=0,q=0){st=T,X=N,$=q;let H=null,G=!1,mt=!1;if(T){let pt=V.get(T);if(pt.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(B.FRAMEBUFFER,pt.__webglFramebuffer),it.copy(T.viewport),vt.copy(T.scissor),St=T.scissorTest,b.viewport(it),b.scissor(vt),b.setScissorTest(St),W=-1;return}else if(pt.__webglFramebuffer===void 0)Y.setupRenderTarget(T);else if(pt.__hasExternalTextures)Y.rebindTextures(T,V.get(T.texture).__webglTexture,V.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Wt=T.depthTexture;if(pt.__boundDepthTexture!==Wt){if(Wt!==null&&V.has(Wt)&&(T.width!==Wt.image.width||T.height!==Wt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(T)}}let wt=T.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(mt=!0);let Ct=V.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ct[N])?H=Ct[N][q]:H=Ct[N],G=!0):T.samples>0&&Y.useMultisampledRTT(T)===!1?H=V.get(T).__webglMultisampledFramebuffer:Array.isArray(Ct)?H=Ct[q]:H=Ct,it.copy(T.viewport),vt.copy(T.scissor),St=T.scissorTest}else it.copy(yt).multiplyScalar(et).floor(),vt.copy($t).multiplyScalar(et).floor(),St=Ne;if(q!==0&&(H=D),b.bindFramebuffer(B.FRAMEBUFFER,H)&&b.drawBuffers(T,H),b.viewport(it),b.scissor(vt),b.setScissorTest(St),G){let pt=V.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+N,pt.__webglTexture,q)}else if(mt){let pt=N;for(let wt=0;wt<T.textures.length;wt++){let Ct=V.get(T.textures[wt]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+wt,Ct.__webglTexture,q,pt)}}else if(T!==null&&q!==0){let pt=V.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,pt.__webglTexture,q)}W=-1};function Mh(T){let N=V.get(T);return(N.__readFormat!==T.format||N.__readType!==T.type)&&(N.__readFormat=T.format,N.__readType=T.type,N.__formatReadable=I.textureFormatReadable(T.format),N.__typeReadable=I.textureTypeReadable(T.type)),N}this.readRenderTargetPixels=function(T,N,q,H,G,mt,bt,pt=0){if(!(T&&T.isWebGLRenderTarget)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&bt!==void 0&&(wt=wt[bt]),wt){b.bindFramebuffer(B.FRAMEBUFFER,wt);try{let Ct=T.textures[pt],Wt=Ct.format,Jt=Ct.type;T.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+pt);let Tt=Mh(Ct);if(Tt.__formatReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Tt.__typeReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-H&&q>=0&&q<=T.height-G&&B.readPixels(N,q,H,G,ht.convert(Wt),ht.convert(Jt),mt)}finally{let Ct=st!==null?V.get(st).__webglFramebuffer:null;b.bindFramebuffer(B.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(T,N,q,H,G,mt,bt,pt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&bt!==void 0&&(wt=wt[bt]),wt)if(N>=0&&N<=T.width-H&&q>=0&&q<=T.height-G){b.bindFramebuffer(B.FRAMEBUFFER,wt);let Ct=T.textures[pt],Wt=Ct.format,Jt=Ct.type;T.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+pt);let Tt=Mh(Ct);if(Tt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Tt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let oe=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,oe),B.bufferData(B.PIXEL_PACK_BUFFER,mt.byteLength,B.STREAM_READ),B.readPixels(N,q,H,G,ht.convert(Wt),ht.convert(Jt),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let Pe=st!==null?V.get(st).__webglFramebuffer:null;b.bindFramebuffer(B.FRAMEBUFFER,Pe);let _e=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Iu(B,_e,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,oe),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,mt),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(oe),B.deleteSync(_e),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,N=null,q=0){let H=Math.pow(2,-q),G=Math.floor(T.image.width*H),mt=Math.floor(T.image.height*H),bt=N!==null?N.x:0,pt=N!==null?N.y:0;Y.setTexture2D(T,0),B.copyTexSubImage2D(B.TEXTURE_2D,q,0,0,bt,pt,G,mt),b.unbindTexture()},this.copyTextureToTexture=function(T,N,q=null,H=null,G=0,mt=0){let bt,pt,wt,Ct,Wt,Jt,Tt,oe,Pe,_e=T.isCompressedTexture?T.mipmaps[mt]:T.image;if(q!==null)bt=q.max.x-q.min.x,pt=q.max.y-q.min.y,wt=q.isBox3?q.max.z-q.min.z:1,Ct=q.min.x,Wt=q.min.y,Jt=q.isBox3?q.min.z:0;else{let Te=Math.pow(2,-G);bt=Math.floor(_e.width*Te),pt=Math.floor(_e.height*Te),T.isDataArrayTexture?wt=_e.depth:T.isData3DTexture?wt=Math.floor(_e.depth*Te):wt=1,Ct=0,Wt=0,Jt=0}H!==null?(Tt=H.x,oe=H.y,Pe=H.z):(Tt=0,oe=0,Pe=0);let pe=ht.convert(N.format),Ke=ht.convert(N.type),xt;N.isData3DTexture?(Y.setTexture3D(N,0),xt=B.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Y.setTexture2DArray(N,0),xt=B.TEXTURE_2D_ARRAY):(Y.setTexture2D(N,0),xt=B.TEXTURE_2D),b.activeTexture(B.TEXTURE0),b.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,N.flipY),b.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),b.pixelStorei(B.UNPACK_ALIGNMENT,N.unpackAlignment);let ni=b.getParameter(B.UNPACK_ROW_LENGTH),ee=b.getParameter(B.UNPACK_IMAGE_HEIGHT),_i=b.getParameter(B.UNPACK_SKIP_PIXELS),Gi=b.getParameter(B.UNPACK_SKIP_ROWS),fn=b.getParameter(B.UNPACK_SKIP_IMAGES);b.pixelStorei(B.UNPACK_ROW_LENGTH,_e.width),b.pixelStorei(B.UNPACK_IMAGE_HEIGHT,_e.height),b.pixelStorei(B.UNPACK_SKIP_PIXELS,Ct),b.pixelStorei(B.UNPACK_SKIP_ROWS,Wt),b.pixelStorei(B.UNPACK_SKIP_IMAGES,Jt);let as=T.isDataArrayTexture||T.isData3DTexture,de=N.isDataArrayTexture||N.isData3DTexture;if(T.isDepthTexture){let Te=V.get(T),pn=V.get(N),xe=V.get(Te.__renderTarget),mn=V.get(pn.__renderTarget);b.bindFramebuffer(B.READ_FRAMEBUFFER,xe.__webglFramebuffer),b.bindFramebuffer(B.DRAW_FRAMEBUFFER,mn.__webglFramebuffer);for(let os=0;os<wt;os++)as&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,V.get(T).__webglTexture,G,Jt+os),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,V.get(N).__webglTexture,mt,Pe+os)),B.blitFramebuffer(Ct,Wt,bt,pt,Tt,oe,bt,pt,B.DEPTH_BUFFER_BIT,B.NEAREST);b.bindFramebuffer(B.READ_FRAMEBUFFER,null),b.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(G!==0||T.isRenderTargetTexture||V.has(T)){let Te=V.get(T),pn=V.get(N);b.bindFramebuffer(B.READ_FRAMEBUFFER,L),b.bindFramebuffer(B.DRAW_FRAMEBUFFER,O);for(let xe=0;xe<wt;xe++)as?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Te.__webglTexture,G,Jt+xe):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Te.__webglTexture,G),de?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,pn.__webglTexture,mt,Pe+xe):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,pn.__webglTexture,mt),G!==0?B.blitFramebuffer(Ct,Wt,bt,pt,Tt,oe,bt,pt,B.COLOR_BUFFER_BIT,B.NEAREST):de?B.copyTexSubImage3D(xt,mt,Tt,oe,Pe+xe,Ct,Wt,bt,pt):B.copyTexSubImage2D(xt,mt,Tt,oe,Ct,Wt,bt,pt);b.bindFramebuffer(B.READ_FRAMEBUFFER,null),b.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else de?T.isDataTexture||T.isData3DTexture?B.texSubImage3D(xt,mt,Tt,oe,Pe,bt,pt,wt,pe,Ke,_e.data):N.isCompressedArrayTexture?B.compressedTexSubImage3D(xt,mt,Tt,oe,Pe,bt,pt,wt,pe,_e.data):B.texSubImage3D(xt,mt,Tt,oe,Pe,bt,pt,wt,pe,Ke,_e):T.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,mt,Tt,oe,bt,pt,pe,Ke,_e.data):T.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,mt,Tt,oe,_e.width,_e.height,pe,_e.data):B.texSubImage2D(B.TEXTURE_2D,mt,Tt,oe,bt,pt,pe,Ke,_e);b.pixelStorei(B.UNPACK_ROW_LENGTH,ni),b.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ee),b.pixelStorei(B.UNPACK_SKIP_PIXELS,_i),b.pixelStorei(B.UNPACK_SKIP_ROWS,Gi),b.pixelStorei(B.UNPACK_SKIP_IMAGES,fn),mt===0&&N.generateMipmaps&&B.generateMipmap(xt),b.unbindTexture()},this.initRenderTarget=function(T){V.get(T).__webglFramebuffer===void 0&&Y.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Y.setTextureCube(T,0):T.isData3DTexture?Y.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Y.setTexture2DArray(T,0):Y.setTexture2D(T,0),b.unbindTexture()},this.resetState=function(){X=0,$=0,st=null,b.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}};var Et={classMods:{Light:{S:-.5,A:1,H:.5,G:0,W:-2},Medium:{S:0,A:0,H:0,G:0,W:0},Heavy:{S:.8,A:-1,H:-.5,G:.2,W:2.5}},characters:[{id:1,name:"Pip Thistledown",cls:"Light",setname:"Meadow Folk",personality:"Bubbly scout who narrates everything she does out loud",idle:"hops in place, straightening her acorn cap",victory:"cartwheel while petals burst from her satchel",silhouette:"tall acorn cap with a feather tuft",free:!0,playable:!0},{id:2,name:"Bramble Quill",cls:"Medium",setname:"Meadow Folk",personality:"Grumpy hedgehog mechanic who secretly loves the cheering",idle:"polishes his spiky helmet with a rag",victory:"takes a deep bow and fans his quills like a peacock",silhouette:"spiky fan-shaped helmet",free:!0,playable:!0},{id:3,name:"Marigold Hoofsworth",cls:"Heavy",setname:"Meadow Folk",personality:"Gentle giant deer who bakes and hugs every rival after the race",idle:"chews a pastry, ears twitching",victory:"lifts the trophy overhead on her antlers",silhouette:"wide antler crown with ribbons",free:!0,playable:!0},{id:4,name:"Fennel Vix",cls:"Light",setname:"Meadow Folk",personality:"Sly fox courier who always claims she planned it",idle:"flicks her tail, checks a pocket watch",victory:"spins her tail like a fan and winks",silhouette:"huge swooshing tail",free:!0,playable:!0},{id:5,name:"Hobb Mossback",cls:"Heavy",setname:"Meadow Folk",personality:"Slow-talking tortoise farmer, completely unshakable",idle:"tucks head in and out of the shell",victory:"shell spins like a top with the trophy on it",silhouette:"domed moss-covered shell backpack",free:!0,playable:!1},{id:6,name:"Juniper Wren",cls:"Light",setname:"Meadow Folk",personality:"Songbird sprinter who hums the whole race",idle:"taps the steering wheel in rhythm",victory:"flaps up and lands on the kart nose, singing",silhouette:"tiny wings flared at the shoulders",free:!0,playable:!0},{id:7,name:"Clover Dash",cls:"Medium",setname:"Meadow Folk",personality:"Over-caffeinated bunny who speed-reads the map",idle:"bounces on her toes",victory:"triple back-flip with a fist pump",silhouette:"long ears streaming behind",free:!0,playable:!0},{id:9,name:"Sage Willowmere",cls:"Medium",setname:"Meadow Folk",personality:"Calm owl tactician who whispers race advice to himself",idle:"swivels his head almost all the way round",victory:"glides a slow victory loop with wings out",silhouette:"big round facial disc and ear tufts",free:!0,playable:!1},{id:10,name:"Barnaby Bruin",cls:"Heavy",setname:"Meadow Folk",personality:"Honey-loving bear who befriends every rival by lap two",idle:"licks honey off a paw",victory:"bear-hugs the trophy and a nearby official",silhouette:"round ears and a broad belly",free:!0,playable:!1},{id:11,name:"Captain Dusk Marlowe",cls:"Medium",setname:"Neon Harbor",personality:"Weathered tug pilot who calls everyone kid",idle:"leans on the wheel and sips tea",victory:"tips his cap as an air-horn sounds",silhouette:"peaked captain's cap and pipe",free:!0,playable:!0},{id:13,name:"Gus Gantry",cls:"Heavy",setname:"Neon Harbor",personality:"Patient crane operator who plans three turns ahead",idle:"swings an imaginary crane hook",victory:"picks up his own kart with a cheer (hook animation)",silhouette:"broad yellow hard hat and hi-vis vest",free:!0,playable:!0},{id:18,name:"Pearl Quayside",cls:"Light",setname:"Neon Harbor",personality:"Ferry-boat kid with a heart of gold and a fast hand",idle:"juggles three coins",victory:"coin shower from her oversized coat",silhouette:"tiny frame in a huge coat",free:!0,playable:!1}],bodies:[{name:"Corsa Standard",family:"Cruiser",S:6,A:5,H:6,G:5,W:5,desc:"The all-rounder every driver learns on: a red open-wheel with a friendly nose",price:0,slice:!0},{name:"Needle",family:"Dart",S:9,A:3,H:5,G:5,W:3,desc:"Ultra-narrow dart that wants a long straight",price:600,slice:!0},{name:"Slidewinder",family:"Drifter",S:4,A:5,H:6,G:7,W:4,desc:"Low serpent body with a spiral exhaust",price:0,slice:!0},{name:"Ironclad",family:"Bruiser",S:7,A:2,H:4,G:9,W:10,desc:"Armour-plated brick on tracks, nothing moves it",price:1e3,slice:!0},{name:"Pogo",family:"Rocket",S:3,A:9,H:5,G:5,W:2,desc:"Spring-loaded pogo kart that explodes off the line",price:0,slice:!0},{name:"Pumpkin Coach",family:"Oddball",S:6,A:4,H:6,G:6,W:6,desc:"Carved pumpkin carriage with lantern lights",price:1e3,slice:!0}],wheels:[{name:"Six-Spoke Standard",tire:"Street",S:0,A:0,H:0,G:0,W:0,off:0,desc:"Classic six-spoke alloy",price:0},{name:"Turbine Fan",tire:"Street",S:.3,A:-.2,H:0,G:0,W:0,off:0,desc:"Fan-blade rim, tuned for top speed",price:250},{name:"Mesh Classic",tire:"Street",S:0,A:.2,H:0,G:-.1,W:-.2,off:0,desc:"Lightweight mesh rim",price:250},{name:"Dish Deep",tire:"Racing",S:.2,A:0,H:.1,G:-.1,W:.2,off:0,desc:"Deep-dish chrome look",price:350},{name:"Starburst",tire:"Street",S:0,A:.1,H:.2,G:0,W:0,off:0,desc:"Ten-spoke star rim",price:300},{name:"Slick Racing",tire:"Slick",S:.2,A:0,H:0,G:.5,W:0,off:-.5,desc:"Slick compound, loves tarmac, hates dirt",price:500},{name:"Trail Grip",tire:"Trail",S:-.2,A:0,H:0,G:.1,W:.2,off:.6,desc:"Knobbly trail tyres for shortcuts",price:450},{name:"Mudder",tire:"Mud",S:-.3,A:0,H:0,G:.2,W:.4,off:1,desc:"Deep-lug mud tyres, best off-road",price:600},{name:"Balloon Soft",tire:"Balloon",S:-.3,A:.1,H:.2,G:0,W:.2,off:.3,desc:"Soft balloon tyres that absorb bumps",price:400},{name:"Featherweight",tire:"Carbon",S:.1,A:.4,H:0,G:-.2,W:-.5,off:-.2,desc:"Carbon rims, ultra light",price:700},{name:"Anvil Steel",tire:"Street",S:0,A:-.3,H:0,G:.2,W:.5,off:.1,desc:"Heavy steel rims, planted",price:400},{name:"Rally Grip",tire:"Trail",S:0,A:.1,H:.1,G:.3,W:0,off:.4,desc:"Rally compound all-rounder",price:550},{name:"Ice Studs",tire:"Studded",S:-.1,A:0,H:0,G:.3,W:.1,off:.2,desc:"Studded for slippery ice sections",price:500},{name:"Hover Pad",tire:"Hover",S:-.2,A:.2,H:.3,G:-.2,W:-.6,off:.5,desc:"Short hover pads, light but loose",price:900},{name:"Flywheel",tire:"Racing",S:.3,A:-.1,H:0,G:0,W:.3,off:0,desc:"Flywheel-balanced racing rim",price:650},{name:"Spinner Disc",tire:"Racing",S:.1,A:.1,H:.1,G:0,W:0,off:0,desc:"Disc cover with a spinner",price:500},{name:"Candy Cane",tire:"Street",S:0,A:0,H:.2,G:.1,W:0,off:0,desc:"Striped twisted spoke",price:350},{name:"Gearwheel",tire:"Street",S:0,A:.2,H:0,G:.1,W:.1,off:0,desc:"Cog-shaped rim, clanks on corners",price:450}],wheelSizes:[{size:'12"',S:-.4,A:.4,H:.2,G:.1,W:-.2},{size:'13"',S:-.2,A:.2,H:.1,G:.05,W:-.1},{size:'14"',S:0,A:0,H:0,G:0,W:0},{size:'15"',S:.2,A:-.2,H:-.1,G:-.05,W:.1},{size:'16"',S:.4,A:-.4,H:-.2,G:-.1,W:.2}],spoilers:[{name:"None",S:0,A:0,H:0,G:0,W:0,desc:"No wing",price:0},{name:"Low Lip",S:.1,A:0,H:0,G:.1,W:0,desc:"Small ducktail lip",price:100},{name:"Duck Tail",S:.1,A:.1,H:0,G:.1,W:.1,desc:"Classic ducktail",price:150},{name:"GT Wing",S:.2,A:-.1,H:0,G:.3,W:.1,desc:"Large wing, more grip at speed",price:300},{name:"Dual Plane",S:.3,A:-.2,H:0,G:.3,W:.2,desc:"Double-element wing for fast tracks",price:450},{name:"Swan Neck",S:.2,A:0,H:-.1,G:.4,W:.1,desc:"Swan-neck mount, strong downforce",price:500},{name:"Barn Door",S:-.1,A:-.3,H:.1,G:.6,W:.3,desc:"Huge barn-door wing, great grip but slow",price:450},{name:"Shark Fin",S:.1,A:.1,H:.3,G:0,W:0,desc:"Vertical fin for crisp handling",price:350},{name:"Roof Scoop",S:0,A:.3,H:0,G:0,W:.1,desc:"Intake scoop, helps accel",price:350},{name:"Twin Tail",S:.2,A:.1,H:.1,G:0,W:0,desc:"Twin-tail rudders",price:500},{name:"Pop-up Flap",S:.3,A:-.3,H:0,G:.1,W:0,desc:"Air-brake flap used on long straights",price:400},{name:"Feather Wing",S:.1,A:.2,H:0,G:-.1,W:-.3,desc:"Carbon feather-light wing",price:600}],exhausts:[{name:"Stock Pipe",S:0,A:0,H:0,G:0,W:0,desc:"Standard single tailpipe",price:0},{name:"Twin Chrome",S:.1,A:.1,H:0,G:0,W:.1,desc:"Twin chrome pipes",price:150},{name:"Side Pipes",S:0,A:.2,H:0,G:0,W:0,desc:"Side-exit pipes",price:200},{name:"Megaphone",S:.2,A:.1,H:0,G:0,W:.1,desc:"Loud megaphone exhaust",price:250},{name:"Upswept",S:.1,A:0,H:.1,G:0,W:0,desc:"Upswept pipe, tiny gain in clearance",price:250},{name:"Flame Thrower",S:0,A:.3,H:0,G:-.1,W:.1,desc:"Shoots flames on boost",price:400},{name:"Quad Stack",S:.3,A:.1,H:0,G:-.1,W:.2,desc:"Four-barrel stack",price:500},{name:"Turbo Whistle",S:.1,A:.3,H:0,G:0,W:0,desc:"Whistling turbo exhaust",price:550},{name:"Bubbler",S:0,A:.1,H:.1,G:.1,W:0,desc:"Blows bubbles on boost",price:400},{name:"Rocket Nozzle",S:.4,A:.3,H:-.1,G:-.1,W:.2,desc:"Single rocket nozzle, high power but demanding",price:700}],bumpers:[{name:"Stock Bumper",S:0,A:0,H:0,G:0,W:0,desc:"Standard bumper",price:0},{name:"Rubber Pusher",S:0,A:0,H:0,G:.1,W:.2,desc:"Soft rubber bumper that shrugs off bumps",price:200},{name:"Splitter",S:.1,A:0,H:.1,G:0,W:-.1,desc:"Aero splitter",price:300},{name:"Cow Catcher",S:-.1,A:-.1,H:0,G:0,W:.4,desc:"Heavy cow-catcher grille",price:350},{name:"Spike Guard",S:0,A:0,H:0,G:.1,W:.3,desc:"Decorative spikes, increases push-through",price:400},{name:"Tiny Bumper",S:.1,A:.1,H:.1,G:-.1,W:-.3,desc:"Minimal bumper for lightness",price:450},{name:"Rubber Duck Horn",S:0,A:.1,H:0,G:0,W:.1,desc:"Squeaky horn bumper (cosmetic horn sound)",price:250},{name:"Twin Prongs",S:.1,A:0,H:.2,G:0,W:.1,desc:"Forked prongs for light contact",price:500}],rimColors:[{name:"Chrome",hex:"#e8edf2"},{name:"Gunmetal",hex:"#5b6571"},{name:"Gold",hex:"#e5b84a"},{name:"Bronze",hex:"#b0793a"},{name:"Signal Red",hex:"#d7263d"},{name:"Cherry",hex:"#a31735"},{name:"Sunset Orange",hex:"#ff7a1a"},{name:"Lemon",hex:"#ffe347"},{name:"Lime",hex:"#8bd800"},{name:"Mint",hex:"#7fe0b0"},{name:"Teal",hex:"#13b3b3"},{name:"Sky Blue",hex:"#3fa9f5"},{name:"Cobalt",hex:"#2457d6"},{name:"Violet",hex:"#7d4fd1"},{name:"Hot Pink",hex:"#ff3f95"},{name:"Pearl White",hex:"#f4f1ea"},{name:"Jet Black",hex:"#16181d"},{name:"Rainbow Anodized",hex:"rainbow"}],rimFinishes:["Polished","Satin","Anodized"],paintColors:[{name:"Cherry Red",hex:"#d7263d"},{name:"Sunset Orange",hex:"#ff7a1a"},{name:"Marigold",hex:"#ffb400"},{name:"Lemon Zest",hex:"#ffe347"},{name:"Lime Pop",hex:"#8bd800"},{name:"Meadow Green",hex:"#2fae4a"},{name:"Mint Julep",hex:"#7fe0b0"},{name:"Teal Wave",hex:"#13b3b3"},{name:"Sky Blue",hex:"#3fa9f5"},{name:"Cobalt",hex:"#2457d6"},{name:"Indigo Night",hex:"#2a2f87"},{name:"Violet Haze",hex:"#7d4fd1"},{name:"Orchid",hex:"#b46ad8"},{name:"Hot Pink",hex:"#ff3f95"},{name:"Bubblegum",hex:"#ff9ec7"},{name:"Coral",hex:"#ff6b57"},{name:"Chocolate",hex:"#6b3f2a"},{name:"Sandstone",hex:"#d9b97a"},{name:"Pearl White",hex:"#f4f1ea"},{name:"Ice Silver",hex:"#c9d1d9"},{name:"Gunmetal",hex:"#5b6571"},{name:"Jet Black",hex:"#16181d"},{name:"Midnight Blue",hex:"#142a4f"},{name:"Forest",hex:"#1f5a34"},{name:"Rust",hex:"#a4472a"},{name:"Peach",hex:"#ffb08a"},{name:"Aqua",hex:"#41d8e8"},{name:"Lavender",hex:"#bda9ee"},{name:"Burgundy",hex:"#7d1633"},{name:"Olive",hex:"#7b7d2a"},{name:"Turquoise",hex:"#20c9b0"},{name:"Gold Leaf",hex:"#e5b84a"}],paintFinishes:["Gloss","Matte","Metallic","Pearl","Candy"],twoTone:["Hood Stripe","Split Down","Roof Cap","Fade Front-Back","Racing Number Panel","Bib","Lower Skirt","Diagonal"],decals:["Racing Stripes","Twin Stripes","Checker Flag","Lightning Bolt","Flame Licks","Polka Dots","Star Field","Camo Splash","Zigzag","Wave Crest","Honeycomb","Number 7","Number 42","Number 99","Sun Burst","Skull & Wrenches","Paw Prints","Leaf Pattern","Snowflakes","Circuit Lines","Candy Swirl","Tiger Stripes","Argyle","Galaxy Swirl"],modCap:1.5};var es={meadow:{id:"meadow",name:"Buttercup Meadows",cup:"Seedling Cup",order:1,theme:"meadow",width:15,offroad:9,mapOrder:1,bpm:122,music:"buttercup",amb:"meadow",env:"open",shortcut:{pts:[[429.3,-7.02],[434.99,-26.77],[435.12,-72.97],[435.18,-96.77],[435.24,-120.57],[435.36,-166.76],[425.27,-181.66]],width:11,surface:"rough",s1:614,s2:894,side:1},rows:[.13,.3,.5,.7,.88],pads:[.22,.6],coinGroups:[.08,.2,.34,.45,.56,.66,.77,.9],hazards:[{type:"sheep",f:.38}],zones:[],landmark:{type:"windmill",f:.05,lat:70},prog:[["F",520],["L",90,60],["F",50],["R",50,60],["F",30],["L",50,60],["F",90],["L",90,45],["F",130],["R",80,30],["F",20],["L",80,30],["F",70],["L",90,50],["F",150],["L",90,60],["F",100]],fix:[0,14],start:150,scale:1.176},harbor:{id:"harbor",name:"Lantern Harbor",cup:"Seedling Cup",order:2,theme:"harbor",width:15,offroad:9,mapOrder:2,bpm:126,music:"lantern",amb:"harbor",env:"metal",shortcut:{pts:[[422.5,.62],[407.5,-9.38],[364.73,-51.83],[342.7,-73.69],[320.67,-95.56],[277.9,-138],[267.9,-153]],width:11,surface:"rough",s1:1088,s2:1388,side:1},rows:[.12,.33,.48,.66,.85],pads:[.2,.75],coinGroups:[.06,.18,.3,.42,.55,.68,.8,.92],hazards:[{type:"crane",f:.1},{type:"crane",f:.8},{type:"gate",at:"shortcut"}],zones:[],landmark:{type:"lighthouse",f:.4,lat:90},prog:[["F",400],["L",90,45],["F",150],["L",90,45],["F",260],["R",90,50],["F",90],["L",90,50],["F",120],["L",90,45],["F",300],["L",90,45],["F",100]],fix:[0,2],start:170,scale:1.1},mesa:{id:"mesa",name:"Mirage Mesa",cup:"Seedling Cup",order:3,theme:"mesa",width:16,offroad:9,mapOrder:3,bpm:118,music:"mirage",amb:"mesa",env:"canyon",shortcut:{pts:[[101.51,367.01],[119.03,371.28],[169.35,383.65],[195.28,390.02],[221.2,396.39],[271.52,408.77],[288.77,413.82]],width:11,surface:"sand",s1:286,s2:586,side:1},rows:[.14,.36,.55,.74,.9],pads:[.1,.63],coinGroups:[.05,.17,.28,.4,.5,.6,.72,.83],hazards:[{type:"boulder",f:.45},{type:"boulder",f:.62}],zones:[],landmark:{type:"arch",f:.2,lat:60},prog:[["F",250],["L",60,120],["R",40,90],["F",150],["L",110,70],["F",120],["R",60,80],["F",100],["L",90,60],["F",180],["L",80,90],["R",50,70],["F",140],["L",100,80],["F",160],["L",70,120],["F",100]],fix:[12,14],start:150,scale:.84},frost:{id:"frost",name:"Frostbite Pass",cup:"Seedling Cup",order:4,theme:"frost",width:15,offroad:9,mapOrder:4,bpm:110,music:"frost",amb:"frost",env:"ice",shortcut:{pts:[[133.87,466.92],[136.11,484.44],[175.89,495.21],[196.39,500.75],[216.88,506.3],[256.66,517.07],[266.23,531.89]],width:11,surface:"ice",s1:434,s2:664,side:1},rows:[.13,.32,.52,.72,.9],pads:[.2,.8],coinGroups:[.07,.19,.3,.42,.54,.65,.78,.89],hazards:[{type:"icicle",f:.28},{type:"icicle",f:.5},{type:"icicle",f:.86}],zones:[{f0:.55,f1:.62,surface:"ice",onlyRoad:!0,lat:[-4,8]}],landmark:{type:"waterfall",f:.6,lat:80},prog:[["F",250],["L",90,60],["F",120],["R",140,32],["F",40],["L",140,32],["F",100],["L",90,60],["F",250],["L",90,60],["F",160],["L",90,60],["F",100]],fix:[2,8],start:150,scale:1.2}};var Xc=Math.PI/180;function ud(s,t=[0,0],e=14,i=null){let n=JSON.parse(JSON.stringify(s));if(i)for(let[y,A]of Object.entries(i))n[y][1]=A;let r=(y,A)=>{let v=0,S=0,w=0,R=A?[[v,S]]:null;for(let _ of y)if(_[0]==="F"){let M=Math.max(1,Math.round(_[1]/e));for(let E=1;E<=M;E++){let C=_[1]/M;v+=Math.sin(w)*C,S+=Math.cos(w)*C,A&&R.push([v,S])}}else{let M=_[0]==="L",E=_[1]*Xc,C=_[2],P=Math.max(1e-4,E*C),D=Math.max(2,Math.round(P/(e*.7))),L=M?1:-1,O=v+L*C*Math.cos(w),X=S-L*C*Math.sin(w);for(let $=1;$<=D;$++){let st=w+L*E*($/D);v=O-L*C*Math.cos(st),S=X+L*C*Math.sin(st),A&&R.push([v,S])}w+=L*E}return{x:v,z:S,psi:w,pts:R}},a=0;for(let y of n)y[0]==="L"?a+=y[1]:y[0]==="R"&&(a-=y[1]);let o=r(n,!1),[l,c]=t,h=y=>{let A=0;for(let v=0;v<y;v++){let S=n[v];S[0]==="L"?A+=S[1]*Xc:S[0]==="R"&&(A-=S[1]*Xc)}return[Math.sin(A),Math.cos(A)]},d=h(l),u=h(c),f=d[0]*u[1]-d[1]*u[0];if(Math.abs(f)<.2)throw new Error("fix straights are parallel");let g=(-o.x*u[1]+o.z*u[0])/f,x=(-d[0]*o.z+d[1]*o.x)/f;if(n[l][1]+=g,n[c][1]+=x,n[l][1]<20||n[c][1]<20)throw new Error(`closure needs negative straight (${n[l][1].toFixed(0)}, ${n[c][1].toFixed(0)}), net turn ${a}`);let m=r(n,!0),p=m.pts;return p.pop(),{pts:p,net:a,adj:[g,x],end:[m.x,m.z],prog:n}}function dd(s,t){let e=0,i=0;for(let r=0;r<s.length;r++){let a=(r+1)%s.length,o=Math.hypot(s[a][0]-s[r][0],s[a][1]-s[r][1]);if(e+o>=t){i=r;break}e+=o}return s.slice(i).concat(s.slice(0,i))}var fd=Math.PI*2;function pd(s,t=24,e=!0,i=.5){let n=s.length,r=[],a=l=>e?s[(l%n+n)%n]:s[Math.max(0,Math.min(n-1,l))],o=e?n:n-1;for(let l=0;l<o;l++){let c=a(l-1),h=a(l),d=a(l+1),u=a(l+2),f=(y,A)=>Math.pow(Math.hypot(A[0]-y[0],A[1]-y[1])+1e-6,i),g=0,x=g+f(c,h),m=x+f(h,d),p=m+f(d,u);for(let y=0;y<t;y++){let A=x+(m-x)*(y/t),v=(E,C,P,D)=>[(E[0]*(D-A)+C[0]*(A-P))/(D-P),(E[1]*(D-A)+C[1]*(A-P))/(D-P)],S=v(c,h,g,x),w=v(h,d,x,m),R=v(d,u,m,p),_=v(S,w,g,m),M=v(w,R,x,p);r.push(v(_,M,x,m))}}return e||r.push(s[n-1].slice()),r}function md(s,t,e=!0){let i=e?s.concat([s[0]]):s,n=[0];for(let h=1;h<i.length;h++)n.push(n[h-1]+Math.hypot(i[h][0]-i[h-1][0],i[h][1]-i[h-1][1]));let r=n[n.length-1],a=Math.max(8,Math.round(r/t)),o=r/a,l=[],c=0;for(let h=0;h<(e?a:a+1);h++){let d=h*o;for(;c<n.length-2&&n[c+1]<d;)c++;let u=(d-n[c])/(n[c+1]-n[c]+1e-9);l.push([i[c][0]+(i[c+1][0]-i[c][0])*u,i[c][1]+(i[c+1][1]-i[c][1])*u])}return{pts:l,length:r,step:o}}var Ve=(s,t)=>(s%t+t)%t,Ko=class{constructor(t,e={}){this.def=t,this.mirror=!!e.mirror,this.reverse=!!e.reverse;let i=t.pts.map(h=>[this.mirror?-h[0]:h[0],h[1]]),n=t.shortcut?t.shortcut.pts.map(h=>[this.mirror?-h[0]:h[0],h[1]]):null;this.reverse&&(i=i.slice().reverse(),n&&(n=n.slice().reverse())),this.halfW=t.width/2,this.off=t.offroad,this.limit=this.halfW+this.off,this.width=t.width;let r=pd(i,28,!0),a=md(r,2,!0);this.p=a.pts,this.N=a.pts.length,this.length=a.length,this.step=a.step;let o=this.N;this.tx=new Float32Array(o),this.tz=new Float32Array(o),this.k=new Float32Array(o),this.s=new Float32Array(o);for(let h=0;h<o;h++){let d=this.p[Ve(h-1,o)],u=this.p[Ve(h+1,o)],f=u[0]-d[0],g=u[1]-d[1],x=Math.hypot(f,g);this.tx[h]=f/x,this.tz[h]=g/x,this.s[h]=h*this.step}for(let h=0;h<o;h++){let d=Ve(h+1,o),u=Ve(h-1,o),f=Math.atan2(this.tx[d],this.tz[d])-Math.atan2(this.tx[u],this.tz[u]);for(;f>Math.PI;)f-=fd;for(;f<-Math.PI;)f+=fd;this.k[h]=f/(2*this.step)}let l=this.k.slice();for(let h=0;h<3;h++)for(let d=0;d<o;d++)l[d]=(l[Ve(d-1,o)]+l[d]*2+l[Ve(d+1,o)])/4;this.k=l,this.cell=30,this.grid=new Map;for(let h=0;h<o;h++)this._ins(this.grid,this.p[h][0],this.p[h][1],h);if(this.sc=null,n){let h=md(pd(n,20,!1),2,!1);this.sc={p:h.pts,n:h.pts.length,length:h.length,half:(t.shortcut.width||11)/2,surf:t.shortcut.surface||"rough",tx:[],tz:[]};for(let f=0;f<this.sc.n;f++){let g=h.pts[Math.max(0,f-1)],x=h.pts[Math.min(this.sc.n-1,f+1)],m=x[0]-g[0],p=x[1]-g[1],y=Math.hypot(m,p);this.sc.tx.push(m/y),this.sc.tz.push(p/y)}this.sc.grid=new Map;for(let f=0;f<this.sc.n;f++)this._ins(this.sc.grid,h.pts[f][0],h.pts[f][1],f);let d=this.nearestGlobal(h.pts[0][0],h.pts[0][1]),u=this.nearestGlobal(h.pts[this.sc.n-1][0],h.pts[this.sc.n-1][1]);if(this.sc.i1=d.i,this.sc.i2=u.i,this.sc.s1=this.s[d.i],this.sc.s2=this.s[u.i],this.sc.s2<this.sc.s1)throw new Error("shortcut spans start line in "+t.id)}let c=h=>(this.reverse?1-h:h)*this.length;this.zones=(t.zones||[]).map(h=>{let d=c(h.f0),u=c(h.f1);return d>u&&([d,u]=[u,d]),{...h,s0:d,s1:u}}),this._buildRacingLine()}_ins(t,e,i,n){let r=Math.floor(e/this.cell)*100003+Math.floor(i/this.cell),a=t.get(r);a||(a=[],t.set(r,a)),a.push(n)}_cands(t,e,i,n){n.length=0;let r=Math.floor(e/this.cell),a=Math.floor(i/this.cell);for(let o=-1;o<=1;o++)for(let l=-1;l<=1;l++){let c=t.get((r+o)*100003+a+l);if(c)for(let h of c)n.push(h)}return n}nearestGlobal(t,e){let i=this._cands(this.grid,t,e,this._tmp||(this._tmp=[])),n=-1,r=1e18;if(i.length)for(let a of i){let o=(this.p[a][0]-t)**2+(this.p[a][1]-e)**2;o<r&&(r=o,n=a)}else for(let a=0;a<this.N;a+=2){let o=(this.p[a][0]-t)**2+(this.p[a][1]-e)**2;o<r&&(r=o,n=a)}return this.refine(n,t,e)}nearestWindow(t,e,i,n=40){let r=i,a=1e18;for(let o=-n;o<=n;o++){let l=Ve(i+o,this.N),c=(this.p[l][0]-t)**2+(this.p[l][1]-e)**2;c<a&&(a=c,r=l)}return this.refine(r,t,e)}refine(t,e,i){let n=this.N,r=t,a=0,o=1e18;for(let p of[Ve(t-1,n),t]){let y=this.p[p],A=this.p[Ve(p+1,n)],v=A[0]-y[0],S=A[1]-y[1],w=v*v+S*S,R=((e-y[0])*v+(i-y[1])*S)/w;R=Math.max(0,Math.min(1,R));let _=y[0]+v*R,M=y[1]+S*R,E=(_-e)**2+(M-i)**2;E<o&&(o=E,r=p,a=R)}let l=Ve(r+1,n),c=this.tx[r]*(1-a)+this.tx[l]*a,h=this.tz[r]*(1-a)+this.tz[l]*a,d=Math.hypot(c,h)||1,u=this.p[r][0]+(this.p[l][0]-this.p[r][0])*a,f=this.p[r][1]+(this.p[l][1]-this.p[r][1])*a,g=h/d,x=-c/d,m=(e-u)*g+(i-f)*x;return{i:r,t:a,s:(r+a)*this.step,lat:m,d:Math.sqrt(o),tx:c/d,tz:h/d,nx:g,nz:x,px:u,pz:f,idx:r+a}}nearestSc(t,e){let i=this.sc,n=this._cands(i.grid,t,e,this._tmp2||(this._tmp2=[])),r=-1,a=1e18;for(let S of n){let w=(i.p[S][0]-t)**2+(i.p[S][1]-e)**2;w<a&&(a=w,r=S)}if(r<0)return null;let o=r,l=0,c=1e18;for(let S of[Math.max(0,r-1),r]){if(S+1>=i.n)continue;let w=i.p[S],R=i.p[S+1],_=R[0]-w[0],M=R[1]-w[1],E=_*_+M*M,C=((t-w[0])*_+(e-w[1])*M)/E;C=Math.max(0,Math.min(1,C));let P=w[0]+_*C,D=w[1]+M*C,L=(P-t)**2+(D-e)**2;L<c&&(c=L,o=S,l=C)}let h=Math.min(i.n-1,o+1),d=i.p[o],u=i.p[h],f=d[0]+(u[0]-d[0])*l,g=d[1]+(u[1]-d[1])*l,x=i.tx[o],m=i.tz[o],p=m,y=-x,A=(t-f)*p+(e-g)*y;return{u:(o+l)/(i.n-1),lat:A,d:Math.sqrt(c),tx:x,tz:m,nx:p,nz:y,px:f,pz:g,i:o}}query(t,e,i=-1,n={}){let r=i>=0?this.nearestWindow(t,e,i,45):this.nearestGlobal(t,e);n.m=r,n.s=r.s,n.lat=r.lat,n.idx=r.i,n.surface="road",n.wall=!1,n.sc=null,n.zone=null;let a=Math.abs(r.lat),o=!1;if(this.sc){let l=this.nearestSc(t,e);l&&Math.abs(l.lat)<this.sc.half+.5&&l.u>=0&&l.u<=1&&(a>this.limit-2||Math.abs(l.lat)<this.sc.half)&&a>this.halfW&&(o=!0,n.sc=l,n.s=this.sc.s1+(this.sc.s2-this.sc.s1)*l.u,n.surface=this.sc.surf)}if(o)Math.abs(n.sc.lat)>this.sc.half&&(n.wall=!0);else if(a<=this.halfW?n.surface="road":a<=this.limit?n.surface="off":(n.surface="off",n.wall=!0),n.wall&&this.sc){let l=this.nearestSc(t,e);l&&Math.abs(l.lat)<this.sc.half+.5&&l.u>-.02&&l.u<1.02&&(n.wall=!1,n.sc=l,n.surface=this.sc.surf)}for(let l of this.zones)r.s>=l.s0&&r.s<=l.s1&&(!l.onlyRoad||n.surface==="road")&&(l.lat===void 0||r.lat>=l.lat[0]&&r.lat<=l.lat[1])&&(n.zone=l,l.surface&&(n.surface=l.surface));return n}constrain(t,e,i=-1){let n=i>=0?this.nearestWindow(t,e,i,45):this.nearestGlobal(t,e),r=Math.abs(n.lat),a=r-this.limit,o=-Math.sign(n.lat)*n.nx,l=-Math.sign(n.lat)*n.nz;if(this.sc){let c=this.nearestSc(t,e);if(c&&c.u>-.02&&c.u<1.02){let h=Math.abs(c.lat)-this.sc.half;if(h<a||r>this.halfW&&h<0){if(h<=0&&a>0)return null;a=h,o=-Math.sign(c.lat)*c.nx,l=-Math.sign(c.lat)*c.nz}}}return a<=0?null:{x:t+o*a,z:e+l*a,nx:o,nz:l,pen:a}}at(t,e=0,i={}){t=(t%this.length+this.length)%this.length;let n=t/this.step,r=Math.floor(n)%this.N,a=n-Math.floor(n),o=Ve(r+1,this.N),l=this.p[r][0]+(this.p[o][0]-this.p[r][0])*a,c=this.p[r][1]+(this.p[o][1]-this.p[r][1])*a,h=this.tx[r]*(1-a)+this.tx[o]*a,d=this.tz[r]*(1-a)+this.tz[o]*a,u=Math.hypot(h,d)||1;return h/=u,d/=u,i.x=l+d*e,i.z=c-h*e,i.tx=h,i.tz=d,i.heading=Math.atan2(h,d),i.k=this.k[r]*(1-a)+this.k[o]*a,i.i=r,i}_buildRacingLine(){let t=this.N,e=this.halfW-3.2,i=new Float32Array(t);for(let l=0;l<400;l++)for(let c=0;c<t;c++){let h=Ve(c-3,t),d=Ve(c+3,t),u=this.p[h][0]+this.tz[h]*i[h],f=this.p[h][1]-this.tx[h]*i[h],g=this.p[d][0]+this.tz[d]*i[d],x=this.p[d][1]-this.tx[d]*i[d],m=(u+g)/2,p=(f+x)/2,y=this.tz[c],A=-this.tx[c],v=(m-this.p[c][0])*y+(p-this.p[c][1])*A;v=Math.max(-e,Math.min(e,v)),i[c]+=(v-i[c])*.4}this.lineOff=i;let n=24,r=60,a=22,o=new Float32Array(t);for(let l=0;l<t;l++){let c=Math.abs(this._lineK(l));o[l]=Math.min(r,c>1e-4?Math.sqrt(n/c):r)}for(let l=0;l<2;l++)for(let c=t*2;c>=0;c--){let h=Ve(c,t),d=Ve(c+1,t),u=Math.sqrt(o[d]*o[d]+2*a*this.step);o[h]>u&&(o[h]=u)}this.lineV=o}_lineK(t){let e=this.N,i=Ve(t-2,e),n=Ve(t+2,e),r=g=>[this.p[g][0]+this.tz[g]*this.lineOff[g],this.p[g][1]-this.tx[g]*this.lineOff[g]],a=r(i),o=r(t),l=r(n),c=Math.hypot(o[0]-a[0],o[1]-a[1]),h=Math.hypot(l[0]-o[0],l[1]-o[1]),d=Math.hypot(l[0]-a[0],l[1]-a[1]),u=Math.abs((o[0]-a[0])*(l[1]-a[1])-(o[1]-a[1])*(l[0]-a[0]))/2,f=c*h*d;return f>1e-6?-4*u/f*Math.sign((o[0]-a[0])*(l[1]-o[1])-(o[1]-a[1])*(l[0]-o[0])):0}linePoint(t,e=0,i={}){t=(t%this.length+this.length)%this.length;let n=t/this.step,r=Math.floor(n)%this.N,a=n-Math.floor(n),o=Ve(r+1,this.N),l=this.lineOff[r]*(1-a)+this.lineOff[o]*a+e;return this.at(t,l,i)}lineSpeed(t){let e=(t%this.length+this.length)%this.length/this.step,i=Math.floor(e)%this.N;return this.lineV[i]}lineCurv(t){let e=(t%this.length+this.length)%this.length/this.step,i=Math.floor(e)%this.N;return this._lineK(i)}minSeparation(){let t=1e9,e=null,i=this.N;for(let n=0;n<i;n+=2)for(let r=n+1;r<i;r+=2){if(Math.min(r-n,i-(r-n))*this.step<120)continue;let o=Math.hypot(this.p[n][0]-this.p[r][0],this.p[n][1]-this.p[r][1]);o<t&&(t=o,e=[n,r])}return{min:t,at:e}}};var Os=["meadow","harbor","mesa","frost"];function Wx(s){let t=ud(s.prog,s.fix);return dd(t.pts,s.start||0).map(e=>[e[0]*(s.scale||1),e[1]*(s.scale||1)])}function Jo(s,t={}){let e=es[s],i={...e,pts:Wx(e)},n=new Ko(i,t);n.id=s,n.theme=e.theme,n.meta=e;let r=n.length,a=l=>(t.reverse?1-l:l)*r,o=(l,c=70)=>{let h=l,d=1e9;for(let u=-c;u<=c;u+=4){let f=Math.abs(n.lineCurv(l+u))+Math.abs(n.k[(Math.round((l+u)/n.step)%n.N+n.N)%n.N])*.5+Math.abs(u)*4e-5;f<d&&(d=f,h=l+u)}return(h%r+r)%r};return n.rows=e.rows.map(l=>{let c=o(a(l));return(c<130||c>r-30)&&(c=140+(c<130,0)),c}).sort((l,c)=>l-c),n.pads=e.pads.map(l=>o(a(l),50)),n.coinGroups=e.coinGroups.map(l=>a(l)),n}var kr=new k;function Ti(s,t,e,i,n,r){let a=2*Math.PI*n/4,o=Math.max(r-2*n,0),l=Math.PI/4;kr.copy(t),kr[i]=0,kr.normalize();let c=.5*a/(a+o),h=1-kr.angleTo(s)/l;return Math.sign(kr[e])===1?h*c:o/(a+o)+c+c*(1-h)}var jo=class s extends Mi{constructor(t=1,e=1,i=1,n=2,r=.1){let a=n*2+1;if(r=Math.min(t/2,e/2,i/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:i,segments:n,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new k,c=new k,h=new k(t,e,i).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,g=d.length/6,x=new k,m=.5/a;for(let p=0,y=0;p<d.length;p+=3,y+=2)switch(l.fromArray(d,p),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),d[p+0]=h.x*Math.sign(l.x)+c.x*r,d[p+1]=h.y*Math.sign(l.y)+c.y*r,d[p+2]=h.z*Math.sign(l.z)+c.z*r,u[p+0]=c.x,u[p+1]=c.y,u[p+2]=c.z,Math.floor(p/g)){case 0:x.set(1,0,0),f[y+0]=Ti(x,c,"z","y",r,i),f[y+1]=1-Ti(x,c,"y","z",r,e);break;case 1:x.set(-1,0,0),f[y+0]=1-Ti(x,c,"z","y",r,i),f[y+1]=1-Ti(x,c,"y","z",r,e);break;case 2:x.set(0,1,0),f[y+0]=1-Ti(x,c,"x","z",r,t),f[y+1]=Ti(x,c,"z","x",r,i);break;case 3:x.set(0,-1,0),f[y+0]=1-Ti(x,c,"x","z",r,t),f[y+1]=1-Ti(x,c,"z","x",r,i);break;case 4:x.set(0,0,1),f[y+0]=1-Ti(x,c,"x","y",r,t),f[y+1]=1-Ti(x,c,"y","x",r,e);break;case 5:x.set(0,0,-1),f[y+0]=Ti(x,c,"x","y",r,t),f[y+1]=1-Ti(x,c,"y","x",r,e);break}}static fromJSON(t){return new s(t.width,t.height,t.depth,t.segments,t.radius)}};function xd(s,t=!1){let e=s[0].index!==null,i=new Set(Object.keys(s[0].attributes)),n=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new fe,c=0;for(let h=0;h<s.length;++h){let d=s[h],u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0,d=[];for(let u=0;u<s.length;++u){let f=s[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=s[u].attributes.position.count}l.setIndex(d)}for(let h in r){let d=gd(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][u]);let g=gd(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function gd(s){let t,e,i,n=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=h.gpuType),n!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new Se(a,e,i),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let d=l/e;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<e;g++){let x=h.getComponent(u,g);o.setComponent(u+d,g,x)}}else a.set(h.array,l);l+=h.count*e}return n!==void 0&&(o.gpuType=n),o}var U={box:new jo(1,1,1,2,.18),sbox:new Mi(1,1,1),sph:new pi(1,20,14),cyl:new cn(1,1,1,18,1),cone:new wn(1,1,16,1),tor:new vr(1,.2,8,24),cap:new Yn(1,1,5,12),plane:new De(1,1)},_d=new ue,vd=new bi,yd=new Di,bd=new k,Md=new k,Qo=new Dt,At=class{constructor(){this.geos=[]}add(t,e={}){let{p:i=[0,0,0],r:n=[0,0,0],s:r=[1,1,1],c:a=16777215}=e,o=t.index?t.toNonIndexed():t.clone();o.deleteAttribute("uv"),yd.set(n[0],n[1],n[2]),vd.setFromEuler(yd),bd.set(i[0],i[1],i[2]),Md.set(r[0],r[1],r[2]),_d.compose(bd,vd,Md),o.applyMatrix4(_d);let l=o.attributes.position.count,c=new Float32Array(l*3);Qo.set(a);for(let h=0;h<l;h++)c[h*3]=Qo.r,c[h*3+1]=Qo.g,c[h*3+2]=Qo.b;return o.setAttribute("color",new Se(c,3)),this.geos.push(o),this}build(t){if(!this.geos.length)return null;let e=xd(this.geos,!1);return this.geos.forEach(i=>i.dispose()),this.geos=[],e.computeBoundingSphere(),new Ut(e,t)}};function Ki(s,t=16777215,e=2.6,i=.55){return s.userData.rim={color:t,power:e,strength:i},s.onBeforeCompile=n=>{n.uniforms.rimColor={value:new Dt(t)},n.fragmentShader=n.fragmentShader.replace("void main() {",`uniform vec3 rimColor;
void main() {`).replace("#include <opaque_fragment>",`
      float rimF = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vViewPosition)), 0.0, 1.0), ${e.toFixed(2)});
      outgoingLight += rimColor * rimF * ${i.toFixed(2)};
      #include <opaque_fragment>`)},s}var Sd={Gloss:{r:.22,m:.15,e:1},Matte:{r:.85,m:0,e:.4},Metallic:{r:.28,m:.85,e:1.3},Pearl:{r:.3,m:.35,e:1.4},Candy:{r:.14,m:.55,e:1.2}};function wd(s,t="Gloss"){let e=Sd[t]||Sd.Gloss,i=new Ge({color:s,roughness:e.r,metalness:e.m,envMapIntensity:e.e});return t==="Pearl"&&(i.emissive=new Dt(s).multiplyScalar(.08)),Ki(i,13625599,2.4,.5)}var qc=null;function Rd(){return qc||(qc=Ki(new Ge({vertexColors:!0,roughness:.5,metalness:.35,envMapIntensity:.9}),14676223,2.6,.4)),qc}var $c=null;function Xx(){return $c||($c=Ki(new Ge({vertexColors:!0,roughness:.78,metalness:0,envMapIntensity:.5}),16777215,2.2,.35)),$c}var Yc=null;function qx(){return Yc||(Yc=Ki(new Ge({vertexColors:!0,roughness:.45,metalness:.45,envMapIntensity:1}),14676223,2.6,.35)),Yc}var $x=()=>new ie({vertexColors:!0}),Yx={"Corsa Standard":{wx:.78,zf:.95,zr:-.9,R:.36,seat:[.62,-.25],front:[.46,1.55],rear:[.72,-1.25],ex:[.5,-1.35]},Needle:{wx:.7,zf:1.15,zr:-1,R:.33,seat:[.55,-.35],front:[.4,2.2],rear:[.9,-1.55],ex:[.46,-1.7]},Slidewinder:{wx:.82,zf:.95,zr:-.9,R:.35,seat:[.5,-.25],front:[.35,1.75],rear:[.62,-1.3],ex:[.42,-1.4]},Ironclad:{wx:.92,zf:.9,zr:-.85,R:.44,seat:[.88,-.2],front:[.55,1.5],rear:[1,-1.25],ex:[.9,-1.2]},Pogo:{wx:.7,zf:.85,zr:-.85,R:.34,seat:[.82,-.1],front:[.5,1.5],rear:[.9,-1.3],ex:[.5,-1.55]},"Pumpkin Coach":{wx:.88,zf:.9,zr:-.85,R:.4,seat:[.88,-.2],front:[.55,1.45],rear:[1.15,-1.2],ex:[.7,-1.3]}},ke=1843760,ri=13620959,Or=16773552;function Zx(s,t,e,i){let n=(a,o)=>t.add(a,o),r=(a,o)=>e.add(a,o);switch(s){case"Corsa Standard":n(U.box,{p:[0,.42,.05],s:[1.15,.3,2.3]}),n(U.box,{p:[0,.4,1.35],s:[.8,.22,.9]}),n(U.cone,{p:[0,.4,1.9],r:[Math.PI/2,0,0],s:[.3,.5,.2]}),n(U.box,{p:[-.68,.46,.15],s:[.34,.3,1.2]}),n(U.box,{p:[.68,.46,.15],s:[.34,.3,1.2]}),n(U.box,{p:[0,.72,-.85],s:[.85,.5,.75]}),r(U.box,{p:[0,.8,-.38],s:[.75,.55,.14],c:ke}),r(U.cyl,{p:[0,.6,.35],r:[.4,0,0],s:[.07,.07,.07],c:ke});for(let a of[-.32,.32])i.add(U.sph,{p:[a,.5,1.82],s:[.11,.11,.11],c:Or});r(U.cyl,{p:[0,.58,.55],r:[Math.PI/2,0,0],s:[.06,.5,.06],c:ri});break;case"Needle":n(U.box,{p:[0,.38,0],s:[.78,.24,2.9]}),n(U.cone,{p:[0,.38,2.1],r:[Math.PI/2,0,0],s:[.28,1.3,.2]}),n(U.box,{p:[0,.78,-1.2],s:[.07,.65,.9]}),n(U.box,{p:[-.45,.4,-.3],s:[.2,.22,1.4]}),n(U.box,{p:[.45,.4,-.3],s:[.2,.22,1.4]}),r(U.sph,{p:[0,.62,-.1],s:[.32,.22,.55],c:ke}),r(U.box,{p:[0,.72,-.5],s:[.5,.5,.1],c:ke});for(let a of[-.3,.3])i.add(U.sph,{p:[a,.42,1.2],s:[.07,.07,.07],c:Or});break;case"Slidewinder":n(U.box,{p:[0,.36,0],s:[1.3,.22,2.5]}),n(U.sph,{p:[0,.42,1.5],s:[.5,.28,.7]}),n(U.box,{p:[-.72,.38,0],s:[.1,.24,1.7]}),n(U.box,{p:[.72,.38,0],s:[.1,.24,1.7]}),n(U.box,{p:[0,.6,-.9],s:[.8,.38,.9]});for(let a=0;a<4;a++)r(U.tor,{p:[0,.6,-1.35-a*.14],s:[.18-a*.02,.18-a*.02,.18],c:ri});r(U.box,{p:[0,.68,-.38],s:[.7,.45,.12],c:ke});for(let a of[-.22,.22])i.add(U.sph,{p:[a,.58,1.72],s:[.1,.07,.08],c:16765503});break;case"Ironclad":n(U.box,{p:[0,.6,0],s:[1.55,.55,2.2]}),n(U.box,{p:[0,.62,1.2],s:[1.55,.6,.28],r:[-.15,0,0]}),n(U.box,{p:[-.85,.7,.2],s:[.14,.55,1.5]}),n(U.box,{p:[.85,.7,.2],s:[.14,.55,1.5]}),r(U.cyl,{p:[-.55,1.2,-.3],s:[.05,.55,.05],c:ri}),r(U.cyl,{p:[.55,1.2,-.3],s:[.05,.55,.05],c:ri}),r(U.cyl,{p:[0,1.5,-.3],r:[0,0,Math.PI/2],s:[.05,.6,.05],c:ri});for(let a of[-.7,.7])r(U.cyl,{p:[a,1,-1],s:[.1,.55,.1],c:ke});r(U.box,{p:[0,.75,1.36],s:[1.2,.18,.1],c:ke});for(let a of[-.5,.5])i.add(U.sph,{p:[a,.7,1.4],s:[.1,.1,.1],c:Or});break;case"Pogo":n(U.cap,{p:[0,.78,.1],r:[Math.PI/2,0,0],s:[.42,.7,.42]}),n(U.cone,{p:[0,.78,1.1],r:[Math.PI/2,0,0],s:[.3,.5,.3]});for(let a of[-.55,.55])n(U.box,{p:[a,.5,-.5],s:[.08,.5,.6],r:[0,0,a>0?.25:-.25]});for(let a=0;a<6;a++)r(U.tor,{p:[0,.6,-.95-a*.1],s:[.22,.22,.22],c:ri});r(U.cone,{p:[0,.6,-1.7],r:[-Math.PI/2,0,0],s:[.22,.4,.22],c:ke}),r(U.box,{p:[0,.44,0],s:[.9,.12,1.8],c:ke}),i.add(U.sph,{p:[0,.8,1],s:[.1,.1,.1],c:Or});break;case"Pumpkin Coach":n(U.sph,{p:[0,.8,0],s:[1,.75,1.2]});for(let a=0;a<7;a++){let o=a/7*Math.PI;r(U.sph,{p:[Math.cos(o)*0,.8,0],s:[.03,.74,1.17],r:[0,o,0],c:13194762})}r(U.cyl,{p:[0,1.62,.1],s:[.1,.22,.1],r:[.2,0,0],c:3967534}),n(U.box,{p:[0,.4,0],s:[1.2,.2,2]});for(let a of[-.5,.5])i.add(U.sph,{p:[a,.95,1.1],s:[.12,.14,.1],c:Or});r(U.box,{p:[0,.78,-.35],s:[.8,.5,.12],c:6040074});break}}var Td={"Six-Spoke Standard":{n:6,sw:.07,kind:"spoke"},"Turbine Fan":{n:10,sw:.05,kind:"blade",tw:.5},"Mesh Classic":{n:14,sw:.025,kind:"mesh"},"Dish Deep":{kind:"dish"},Starburst:{n:10,sw:.045,kind:"spoke",len:.8},"Slick Racing":{n:5,sw:.09,kind:"spoke",slick:!0},"Trail Grip":{n:8,sw:.05,kind:"spoke",knob:.07},Mudder:{kind:"disc",holes:8,knob:.12},"Balloon Soft":{kind:"disc",fat:!0},Featherweight:{n:3,sw:.16,kind:"spoke",carbon:!0},"Anvil Steel":{kind:"disc",bolts:6,steel:!0},"Rally Grip":{n:8,sw:.05,kind:"spoke",beadlock:!0},"Ice Studs":{n:7,sw:.06,kind:"spoke",studs:!0},"Hover Pad":{kind:"hover"},Flywheel:{kind:"rings"},"Spinner Disc":{kind:"disc",spinner:!0},"Candy Cane":{n:6,sw:.06,kind:"blade",tw:.9,candy:!0},Gearwheel:{kind:"gear"}};function Kx(s,t,e,i=.36,n="Polished"){let r=Td[s]||Td["Six-Spoke Standard"],a=[.82,.91,1,1.1,1.2][t]??1,o=i*a,l=(r.fat?.34:r.slick?.36:.28)*(.9+.1*a),c=new re,h=new At,d=e==="rainbow"?null:e,u=(A=0)=>d||new Dt().setHSL(A*.13%1,.8,.55).getHex(),f=n==="Satin"?.82:1,g=1382172,x=Math.PI/2;if(r.kind!=="hover"){if(h.add(U.tor,{r:[0,x,0],s:[o*.86,o*.86,l*2.2],c:g}),h.add(U.cyl,{r:[0,0,x],s:[o*.99,l*.5,o*.99],c:g}),r.slick&&h.add(U.cyl,{r:[0,0,x],s:[o*1,l*.5,o*1],c:2830136}),r.knob)for(let A=0;A<14;A++){let v=A/14*Math.PI*2;h.add(U.sbox,{p:[0,Math.cos(v)*o,Math.sin(v)*o],r:[v,0,0],s:[l*.9,r.knob*1.3,r.knob*1.3],c:g})}if(r.studs)for(let A=0;A<16;A++){let v=A/16*Math.PI*2;h.add(U.sph,{p:[(A%2?1:-1)*l*.25,Math.cos(v)*o*1,Math.sin(v)*o*1],s:[.025,.025,.025],c:14673646})}}let m=o*.18,p=o*.74;if(r.kind==="spoke"||r.kind==="blade"||r.kind==="mesh"){h.add(U.cyl,{r:[0,0,x],s:[p,.03,p],c:2106412});for(let A=0;A<r.n;A++){let v=A/r.n*Math.PI*2,S=(r.len||1)*p,w=r.candy?A%2?16777215:14689338:r.carbon?2369067:u(A);h.add(U.sbox,{p:[l*.18,Math.cos(v)*S*.5,Math.sin(v)*S*.5],r:[v+(r.tw||0)*0,r.tw?r.tw:0,0],s:[r.kind==="blade"?.04:r.sw*1.4,S,r.kind==="blade"?r.sw*3:r.sw*2.4],c:w})}if(h.add(U.tor,{r:[0,x,0],p:[l*.14,0,0],s:[p,p,.5],c:r.carbon?2369067:u(1)}),r.kind==="mesh"&&h.add(U.tor,{r:[0,x,0],p:[l*.14,0,0],s:[p*.5,p*.5,.4],c:u(2)}),r.beadlock)for(let A=0;A<12;A++){let v=A/12*Math.PI*2;h.add(U.cyl,{p:[l*.22,Math.cos(v)*p*.97,Math.sin(v)*p*.97],r:[0,0,x],s:[.02,.03,.02],c:15133166})}}else if(r.kind==="dish")h.add(U.cyl,{p:[l*.05,0,0],r:[0,0,x],s:[p,l*.35,p],c:u(0)}),h.add(U.cyl,{p:[l*.22,0,0],r:[0,0,x],s:[p*.55,l*.25,p*.55],c:2106412});else if(r.kind==="disc"){if(h.add(U.cyl,{p:[l*.1,0,0],r:[0,0,x],s:[p*(r.fat?.62:1),l*.4,p*(r.fat?.62:1)],c:r.steel?7305090:u(0)}),r.bolts)for(let A=0;A<r.bolts;A++){let v=A/r.bolts*Math.PI*2;h.add(U.cyl,{p:[l*.34,Math.cos(v)*p*.6,Math.sin(v)*p*.6],r:[0,0,x],s:[.035,.03,.035],c:14672872})}if(r.holes)for(let A=0;A<r.holes;A++){let v=A/r.holes*Math.PI*2;h.add(U.cyl,{p:[l*.34,Math.cos(v)*p*.62,Math.sin(v)*p*.62],r:[0,0,x],s:[.05,.02,.05],c:1382172})}r.spinner&&h.add(U.box,{p:[l*.36,0,0],s:[.03,p*.9,p*.22],c:u(3)})}else if(r.kind==="rings"){for(let A=0;A<3;A++)h.add(U.tor,{r:[0,x,0],p:[l*.15,0,0],s:[p*(1-A*.28),p*(1-A*.28),.6],c:u(A)});h.add(U.cyl,{r:[0,0,x],s:[p*.2,l*.4,p*.2],c:2106412})}else if(r.kind==="gear"){h.add(U.cyl,{r:[0,0,x],p:[l*.1,0,0],s:[p,l*.3,p],c:u(0)});for(let A=0;A<12;A++){let v=A/12*Math.PI*2;h.add(U.sbox,{p:[l*.1,Math.cos(v)*p*1.05,Math.sin(v)*p*1.05],r:[v,0,0],s:[l*.5,.1,.07],c:u(1)})}}else r.kind==="hover"&&(h.add(U.cyl,{r:[0,0,x],s:[o*.85,l*.35,o*.85],c:2435637}),h.add(U.tor,{r:[0,x,0],p:[l*.18,0,0],s:[o*.8,o*.8,.6],c:7333887}));h.add(U.cyl,{p:[l*.38,0,0],r:[0,0,x],s:[m,.04,m],c:ri});let y=h.build(qx());return c.add(y),c.userData.radius=o,c.userData.width=l,c}function Jx(s,t,e,i){let[n,r]=i,a=(l,c)=>t.add(l,c),o=(l,c)=>e.add(l,c);switch(s){case"None":return;case"Low Lip":a(U.box,{p:[0,n-.05,r],s:[1,.05,.22]});break;case"Duck Tail":a(U.box,{p:[0,n,r],s:[1,.06,.4],r:[.25,0,0]});break;case"GT Wing":a(U.box,{p:[0,n+.45,r],s:[1.3,.06,.4]});for(let l of[-.35,.35])o(U.box,{p:[l,n+.22,r],s:[.05,.45,.1],c:ke});for(let l of[-.65,.65])a(U.box,{p:[l,n+.45,r],s:[.04,.22,.45]});break;case"Dual Plane":for(let l of[.4,.58])a(U.box,{p:[0,n+l,r-l*.1],s:[1.25,.05,.34]});for(let l of[-.4,.4])o(U.box,{p:[l,n+.2,r],s:[.05,.45,.1],c:ke});for(let l of[-.64,.64])a(U.box,{p:[l,n+.5,r],s:[.04,.3,.42]});break;case"Swan Neck":a(U.box,{p:[0,n+.55,r],s:[1.35,.05,.42]});for(let l of[-.4,.4])o(U.cyl,{p:[l,n+.28,r-.1],r:[.4,0,0],s:[.035,.34,.035],c:ri});break;case"Barn Door":a(U.box,{p:[0,n+.55,r],s:[1.6,.7,.07]});for(let l of[-.5,.5])o(U.box,{p:[l,n+.2,r],s:[.06,.45,.1],c:ke});break;case"Shark Fin":a(U.cone,{p:[0,n+.45,r],r:[0,0,0],s:[.07,.6,.4]});break;case"Roof Scoop":a(U.cone,{p:[0,n+.3,r+.35],r:[Math.PI/2,0,0],s:[.22,.5,.22]}),o(U.box,{p:[0,n+.3,r+.62],s:[.3,.2,.05],c:ke});break;case"Twin Tail":for(let l of[-.5,.5])a(U.box,{p:[l,n+.4,r],s:[.06,.55,.45]});a(U.box,{p:[0,n+.2,r],s:[1,.05,.18]});break;case"Pop-up Flap":a(U.box,{p:[0,n+.3,r],s:[1,.05,.4],r:[-.7,0,0]});for(let l of[-.4,.4])o(U.box,{p:[l,n+.15,r],s:[.04,.3,.06],c:ke});break;case"Feather Wing":a(U.box,{p:[0,n+.4,r],s:[1.2,.025,.3],r:[.1,0,0]});for(let l of[-.3,.3])o(U.cyl,{p:[l,n+.2,r],s:[.02,.2,.02],c:2369067});break}}var Ed={"Stock Pipe":[1,.07,.35,0],"Twin Chrome":[2,.06,.4,0],"Side Pipes":[2,.06,.6,1],Megaphone:[1,.12,.45,0],Upswept:[2,.06,.4,2],"Flame Thrower":[2,.075,.5,0],"Quad Stack":[4,.055,.4,0],"Turbo Whistle":[1,.1,.45,3],Bubbler:[2,.08,.3,0],"Rocket Nozzle":[1,.18,.55,4]};function jx(s,t,e){let[i,n,r,a]=Ed[s]||Ed["Stock Pipe"],[o,l]=e,c=[];for(let h=0;h<i;h++){let d=i===1?0:i===2?h?.28:-.28:(h-1.5)*.17,u=o,f=l;a===1&&(d=h?.8:-.8,f=l+.9,u=o-.1),t.add(U.cyl,{p:[d,u,f-r/2+.05],r:[Math.PI/2,0,0],s:[n,r/2,n],c:a===4?3817291:ri}),(a===3||a===4)&&t.add(U.cone,{p:[d,u,f-r],r:[-Math.PI/2,0,0],s:[n*1.5,.25,n*1.5],c:a===4?1843760:15054922}),a===2&&t.add(U.cyl,{p:[d,u+.2,f-r+.05],s:[n,.2,n],c:ri}),c.push([d,u,f-r-(a===3||a===4?.25:0)])}return c}function Qx(s,t,e,i){let[n,r]=i,a=(l,c)=>t.add(l,c),o=(l,c)=>e.add(l,c);switch(s){case"Stock Bumper":o(U.box,{p:[0,n-.1,r],s:[1,.12,.12],c:ke});break;case"Rubber Pusher":o(U.box,{p:[0,n-.08,r],s:[1.25,.2,.2],c:2764600});break;case"Splitter":a(U.box,{p:[0,n-.22,r-.05],s:[1.3,.04,.45]});break;case"Cow Catcher":for(let l=0;l<5;l++)o(U.cyl,{p:[(l-2)*.22,n-.1,r-.1],r:[.35,0,0],s:[.025,.35,.025],c:ri});o(U.box,{p:[0,n+.1,r-.3],s:[1.1,.05,.05],c:ri});break;case"Spike Guard":o(U.box,{p:[0,n-.1,r],s:[1.2,.14,.12],c:ke});for(let l=0;l<5;l++)o(U.cone,{p:[(l-2)*.25,n-.1,r+.14],r:[Math.PI/2,0,0],s:[.05,.2,.05],c:ri});break;case"Tiny Bumper":o(U.box,{p:[0,n-.12,r],s:[.5,.07,.07],c:ke});break;case"Rubber Duck Horn":o(U.box,{p:[0,n-.1,r],s:[.9,.12,.12],c:ke}),o(U.sph,{p:[0,n+.02,r+.05],s:[.13,.11,.13],c:16765503}),o(U.cone,{p:[0,n+0,r+.2],r:[Math.PI/2,0,0],s:[.05,.1,.03],c:16742938});break;case"Twin Prongs":for(let l of[-.3,.3])o(U.cone,{p:[l,n-.1,r+.1],r:[Math.PI/2,0,0],s:[.08,.5,.08],c:ri});o(U.box,{p:[0,n-.1,r-.1],s:[.8,.1,.1],c:ke});break}}var Zc=new Map;function t_(s,t="#ffffff"){let e=s+t;if(Zc.has(e))return Zc.get(e);let i=document.createElement("canvas");i.width=i.height=256;let n=i.getContext("2d");n.clearRect(0,0,256,256),n.fillStyle=t,n.strokeStyle=t,n.lineWidth=14,n.lineCap="round";let r={"Racing Stripes":()=>{n.fillRect(100,0,22,256),n.fillRect(134,0,22,256)},"Twin Stripes":()=>{n.fillRect(70,0,16,256),n.fillRect(170,0,16,256)},"Checker Flag":()=>{for(let o=0;o<8;o++)for(let l=0;l<8;l++)(l+o)%2&&n.fillRect(48+l*20,48+o*20,20,20)},"Lightning Bolt":()=>{n.beginPath(),n.moveTo(150,20),n.lineTo(80,140),n.lineTo(124,140),n.lineTo(100,236),n.lineTo(180,110),n.lineTo(134,110),n.closePath(),n.fill()},"Flame Licks":()=>{for(let o=0;o<4;o++)n.beginPath(),n.moveTo(40+o*50,256),n.quadraticCurveTo(60+o*50,150-o*10,40+o*50,80),n.quadraticCurveTo(100+o*50,150,90+o*50,256),n.fill()},"Polka Dots":()=>{for(let o=0;o<25;o++)n.beginPath(),n.arc(30+o%5*50,30+Math.floor(o/5)*50,14,0,7),n.fill()},"Star Field":()=>{for(let o=0;o<9;o++)e_(n,40+o%3*80,40+Math.floor(o/3)*80,20)},"Camo Splash":()=>{for(let o=0;o<14;o++)n.beginPath(),n.ellipse(30+o*53%200,30+o*91%200,28,16,o,0,7),n.fill()},Zigzag:()=>{n.beginPath(),n.moveTo(10,40);for(let o=0;o<6;o++)n.lineTo(o%2?40:216,40+o*38);n.stroke()},"Wave Crest":()=>{for(let o=0;o<4;o++){n.beginPath();for(let l=0;l<=256;l+=8)n.lineTo(l,50+o*50+Math.sin(l/18)*14);n.stroke()}},Honeycomb:()=>{for(let o=0;o<4;o++)for(let l=0;l<4;l++)i_(n,40+l*60+o%2*30,40+o*52,24)},"Number 7":()=>{n.font="bold 190px sans-serif",n.textAlign="center",n.fillText("7",128,200)},"Number 42":()=>{n.font="bold 150px sans-serif",n.textAlign="center",n.fillText("42",128,180)},"Number 99":()=>{n.font="bold 150px sans-serif",n.textAlign="center",n.fillText("99",128,180)},"Sun Burst":()=>{for(let o=0;o<12;o++)n.save(),n.translate(128,128),n.rotate(o*Math.PI/6),n.fillRect(-8,30,16,90),n.restore();n.beginPath(),n.arc(128,128,26,0,7),n.fill()},"Skull & Wrenches":()=>{n.beginPath(),n.arc(128,110,52,0,7),n.fill(),n.fillRect(100,140,56,40),n.globalCompositeOperation="destination-out",n.beginPath(),n.arc(108,108,14,0,7),n.arc(148,108,14,0,7),n.fill(),n.globalCompositeOperation="source-over",n.save(),n.translate(128,200),n.rotate(.6),n.fillRect(-90,-6,180,12),n.rotate(-1.2),n.fillRect(-90,-6,180,12),n.restore()},"Paw Prints":()=>{for(let o=0;o<3;o++)n_(n,70+o*60,60+o%2*90)},"Leaf Pattern":()=>{for(let o=0;o<6;o++)n.beginPath(),n.ellipse(50+o%3*75,60+Math.floor(o/3)*110,12,34,o-1,0,7),n.fill()},Snowflakes:()=>{for(let o=0;o<4;o++)s_(n,64+o%2*128,64+Math.floor(o/2)*128,40)},"Circuit Lines":()=>{n.lineWidth=8,n.beginPath(),n.moveTo(20,60),n.lineTo(100,60),n.lineTo(130,100),n.lineTo(230,100),n.moveTo(20,150),n.lineTo(80,150),n.lineTo(110,190),n.lineTo(230,190),n.stroke();for(let[o,l]of[[100,60],[230,100],[80,150],[230,190]])n.beginPath(),n.arc(o,l,10,0,7),n.fill()},"Candy Swirl":()=>{n.lineWidth=22,n.beginPath();for(let o=0;o<18;o+=.2)n.lineTo(128+Math.cos(o)*o*6,128+Math.sin(o)*o*6);n.stroke()},"Tiger Stripes":()=>{for(let o=0;o<6;o++)n.beginPath(),n.moveTo(20,20+o*40),n.quadraticCurveTo(128,50+o*40,236,20+o*40),n.lineTo(236,40+o*40),n.quadraticCurveTo(128,70+o*40,20,40+o*40),n.fill()},Argyle:()=>{for(let o=0;o<4;o++)for(let l=0;l<4;l++){n.beginPath();let c=32+l*64,h=32+o*64;n.moveTo(c,h-28),n.lineTo(c+28,h),n.lineTo(c,h+28),n.lineTo(c-28,h),n.closePath(),(l+o)%2&&n.fill()}},"Galaxy Swirl":()=>{for(let o=0;o<40;o+=.3)n.globalAlpha=1-o/45,n.beginPath(),n.arc(128+Math.cos(o)*o*3,128+Math.sin(o)*o*3,6+o/8,0,7),n.fill();n.globalAlpha=1}};(r[s]||r["Racing Stripes"])();let a=new ln(i);return a.colorSpace=Ee,a.anisotropy=4,Zc.set(e,a),a}function e_(s,t,e,i){s.beginPath();for(let n=0;n<10;n++){let r=-Math.PI/2+n*Math.PI/5,a=n%2?i*.45:i;s.lineTo(t+Math.cos(r)*a,e+Math.sin(r)*a)}s.closePath(),s.fill()}function i_(s,t,e,i){s.beginPath();for(let n=0;n<6;n++)s.lineTo(t+Math.cos(n*Math.PI/3)*i,e+Math.sin(n*Math.PI/3)*i);s.closePath(),s.lineWidth=6,s.stroke()}function n_(s,t,e){s.beginPath(),s.ellipse(t,e+12,22,18,0,0,7),s.fill();for(let[i,n]of[[-22,-14],[-8,-28],[8,-28],[22,-14]])s.beginPath(),s.ellipse(t+i,e+n,8,11,0,0,7),s.fill()}function s_(s,t,e,i){s.lineWidth=6;for(let n=0;n<6;n++)s.save(),s.translate(t,e),s.rotate(n*Math.PI/3),s.beginPath(),s.moveTo(0,0),s.lineTo(0,-i),s.moveTo(0,-i*.6),s.lineTo(10,-i*.8),s.moveTo(0,-i*.6),s.lineTo(-10,-i*.8),s.stroke(),s.restore()}var r_=[.82,.91,1,1.1,1.2];function zs(s="Corsa Standard"){return{body:s,wheel:"Six-Spoke Standard",size:2,rim:0,rimFinish:0,spoiler:"None",exhaust:"Stock Pipe",bumper:"Stock Bumper",paint:0,finish:0,paint2:12,twoTone:-1,decal:-1,decalColor:"#ffffff"}}function Hs(s,t=null){let e=Yx[s.body],i=new re,n=new re;i.add(n);let r=new At,a=new At,o=new At,l=new At,c=r;Zx(s.body,c,o,l);let h=Et.paintColors[s.paint],d=s.twoTone>=0,u=(E,C)=>a.add(E,C);if(d){let E=Et.twoTone[s.twoTone];E==="Hood Stripe"?u(U.box,{p:[0,e.front[0]+0,e.front[1]-1],s:[.3,.06,1.4]}):E==="Split Down"?u(U.box,{p:[.32,.65,0],s:[.5,.06,2.1]}):E==="Roof Cap"?u(U.box,{p:[0,.98,-.85],s:[.9,.06,.8]}):E==="Fade Front-Back"?u(U.box,{p:[0,.62,1],s:[.95,.06,.7]}):E==="Racing Number Panel"?u(U.cyl,{p:[0,e.front[0]+.12,.7],s:[.28,.02,.28]}):E==="Bib"?u(U.box,{p:[0,.64,1.1],s:[.7,.05,.4]}):E==="Lower Skirt"?(u(U.box,{p:[-e.wx*.78,.36,0],s:[.06,.1,1.9]}),u(U.box,{p:[e.wx*.78,.36,0],s:[.06,.1,1.9]})):E==="Diagonal"&&u(U.box,{p:[0,.7,.1],r:[0,.5,0],s:[.14,.05,1.9]})}Jx(s.spoiler,r,o,e.rear);let f=jx(s.exhaust,o,e.ex);Qx(s.bumper,r,o,e.front);let g=wd(h.hex,Et.paintFinishes[s.finish]),x=r.build(g);x&&n.add(x);let m=null;if(d){m=wd(Et.paintColors[s.paint2].hex,Et.paintFinishes[s.finish]);let E=a.build(m);E&&n.add(E)}let p=o.build(Rd());p&&n.add(p);let y=l.build($x());y&&n.add(y);let A=null;if(s.decal>=0){let E=t_(Et.decals[s.decal],s.decalColor),C=new ie({map:E,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,toneMapped:!1}),P=new At;A=new re;let D=new Ut(U.plane,C);D.rotation.x=-Math.PI/2,D.position.set(0,e.front[0]+.03,.6),D.scale.set(.8,1.2,1),A.add(D),n.add(A)}let v=Et.rimColors[s.rim].hex==="rainbow"?"rainbow":Et.rimColors[s.rim].hex.replace("#","0x"),S=v==="rainbow"?"rainbow":parseInt(v,16),w=[],R=e.R;for(let[E,C]of[[-1,e.zf],[1,e.zf],[-1,e.zr],[1,e.zr]]){let P=Kx(s.wheel,s.size,S,R,Et.rimFinishes[s.rimFinish]),D=P.userData.radius,L=new re;L.position.set(E*e.wx,D,C),(s.body==="Ironclad"||s.body==="Pumpkin Coach")&&P.scale.setScalar(1.12),P.rotation.y=E>0?0:Math.PI,L.add(P),n.add(L),w.push({pivot:L,spin:P,front:C>0,sx:E,rad:D})}let _=r_[s.size]??1;n.position.y=(_-1)*.35;let M=null;return t!==null&&(M=Kc(t),M.root.position.set(0,e.seat[0],e.seat[1]),n.add(M.root)),{root:i,body:n,wheels:w,driver:M,flames:f,shape:e,paintMat:g,paint2Mat:m,decalMesh:A,radius:R*_,build:s}}var Ad={"Pip Thistledown":{skin:13208139,belly:15782560,shirt:4173402,hat:"acorn",ears:"round",nose:"small",tail:"bushy",ec:3810322},"Fennel Vix":{skin:15764012,belly:16773340,shirt:1287075,hat:"none",ears:"pointy",nose:"snout",tail:"huge",ec:2759180,scarf:1287075},"Juniper Wren":{skin:10119748,belly:15981752,shirt:3837414,hat:"tuft",ears:"none",nose:"beak",tail:"small",ec:1708040,wings:!0},"Pearl Quayside":{skin:14723452,belly:14723452,shirt:2060152,hat:"cap",ears:"human",nose:"small",tail:"none",ec:2759180,coat:!0,hair:7028509},"Bramble Quill":{skin:9071173,belly:15124896,shirt:5989745,hat:"quills",ears:"small",nose:"snout",tail:"none",ec:1708040,goggles:!0},"Clover Dash":{skin:16052458,belly:16777215,shirt:16762938,hat:"none",ears:"long",nose:"pink",tail:"puff",ec:2759212},"Captain Dusk Marlowe":{skin:14659208,belly:14659208,shirt:2046579,hat:"captain",ears:"human",nose:"big",tail:"none",ec:2759180,beard:15921906},"Sage Willowmere":{skin:10189395,belly:15786176,shirt:8003386,hat:"tufts",ears:"none",nose:"beak",tail:"small",ec:16765503,disc:16181968,cape:!0},"Marigold Hoofsworth":{skin:14262374,belly:16773340,shirt:16777215,hat:"antlers",ears:"deer",nose:"snout",tail:"puff",ec:2759180,apron:!0},"Hobb Mossback":{skin:7182930,belly:14214824,shirt:9067056,hat:"shell",ears:"none",nose:"small",tail:"none",ec:1708040},"Barnaby Bruin":{skin:9067056,belly:14267002,shirt:13120298,hat:"none",ears:"round",nose:"snout",tail:"puff",ec:1708040,honey:!0},"Gus Gantry":{skin:14262906,belly:14262906,shirt:16747034,hat:"hardhat",ears:"human",nose:"big",tail:"none",ec:2759180,stubble:!0}};function Kc(s){let t=Ad[s]||Ad["Pip Thistledown"],e=new re,i=new At,n=new At,r=new At,a=i,o=n;if(a.add(U.sph,{p:[0,.05,0],s:[t.coat?.46:.36,t.coat?.42:.34,.3],c:t.shirt}),t.apron&&a.add(U.box,{p:[0,0,.2],s:[.4,.45,.05],c:16777215}),t.cape&&a.add(U.box,{p:[0,.05,-.28],s:[.7,.6,.08],c:t.shirt}),t.shirt===16747034&&(a.add(U.box,{p:[0,.05,.2],s:[.46,.06,.04],c:15400762}),a.add(U.box,{p:[-.12,.1,.21],s:[.05,.34,.03],c:15400762}),a.add(U.box,{p:[.12,.1,.21],s:[.05,.34,.03],c:15400762})),t.scarf&&(a.add(U.tor,{p:[0,.33,0],r:[Math.PI/2,0,0],s:[.26,.26,.5],c:t.scarf}),a.add(U.box,{p:[.12,.2,.22],s:[.1,.3,.05],c:t.scarf})),t.honey&&(a.add(U.cyl,{p:[0,-.1,.34],s:[.15,.12,.15],c:15054922}),a.add(U.cyl,{p:[0,-.02,.34],s:[.12,.02,.12],c:16765503})),t.tail==="huge"?(a.add(U.sph,{p:[.3,.2,-.55],s:[.3,.3,.7],c:t.skin}),a.add(U.sph,{p:[.34,.25,-1],s:[.22,.22,.34],c:16773340})):t.tail==="bushy"?a.add(U.sph,{p:[0,.4,-.4],s:[.22,.45,.28],c:t.skin}):t.tail==="puff"?a.add(U.sph,{p:[0,.05,-.38],s:[.14,.14,.14],c:16777215}):t.tail==="small"&&a.add(U.cone,{p:[0,0,-.45],r:[-Math.PI/2,0,0],s:[.1,.3,.05],c:t.skin}),t.hat==="shell"){a.add(U.sph,{p:[0,.3,-.25],s:[.62,.55,.55],c:6261317});for(let M=0;M<5;M++)a.add(U.sph,{p:[Math.cos(M*1.26)*.28,.5+.01*M,-.25+Math.sin(M*1.26)*.2],s:[.14,.1,.14],c:4877876})}t.wings&&(a.add(U.sph,{p:[-.36,.1,-.1],s:[.06,.28,.2],c:8015663}),a.add(U.sph,{p:[.36,.1,-.1],s:[.06,.28,.2],c:8015663})),t.satchel&&a.add(U.box,{p:[.28,0,-.1],s:[.15,.2,.18],c:8015663});let l=.52,c=t.disc?.38:.34;o.add(U.sph,{p:[0,l,0],s:[c,c*.95,c],c:t.skin}),t.belly!==t.skin&&t.nose!=="beak"&&o.add(U.sph,{p:[0,l-.08,c*.5],s:[c*.62,c*.55,c*.55],c:t.belly});let h=l+.05,d=c*.78,u=c*.38,f=t.disc?1.6:1;for(let M of[-1,1])o.add(U.sph,{p:[M*u,h,d],s:[.1*f,.12*f,.06],c:(t.disc,16777215)}),o.add(U.sph,{p:[M*u,h-.005,d+.05],s:[.055*f,.07*f,.03],c:t.ec>15728640||t.disc?16765503:1448482}),o.add(U.sph,{p:[M*u+.02,h+.03,d+.075],s:[.02,.02,.01],c:16777215});t.disc&&o.add(U.sph,{p:[0,h,d-.02],s:[.34,.2,.05],c:t.disc}),t.nose==="snout"?(o.add(U.sph,{p:[0,l-.06,c*.95],s:[.15,.11,.18],c:t.belly}),o.add(U.sph,{p:[0,l-.02,c*1.1],s:[.06,.045,.045],c:1448482})):t.nose==="beak"?o.add(U.cone,{p:[0,l-.04,c*1.12],r:[Math.PI/2,0,0],s:[.11,.24,.07],c:16757274}):t.nose==="pink"?o.add(U.sph,{p:[0,l-.04,c*1],s:[.05,.04,.04],c:16748465}):t.nose==="big"?o.add(U.sph,{p:[0,l-.04,c*1],s:[.07,.07,.07],c:new Dt(t.skin).multiplyScalar(.85).getHex()}):o.add(U.sph,{p:[0,l-.04,c*1],s:[.04,.035,.035],c:1448482});let g=(M,E,C)=>o.add(E,{...C,p:[M*C.p[0],C.p[1],C.p[2]],r:C.r?[C.r[0],C.r[1]*M,C.r[2]*M]:[0,0,0]});for(let M of[-1,1])t.ears==="round"?(o.add(U.sph,{p:[M*.24,l+.27,-.02],s:[.12,.12,.06],c:t.skin}),o.add(U.sph,{p:[M*.24,l+.27,.02],s:[.07,.07,.04],c:t.belly})):t.ears==="pointy"?(o.add(U.cone,{p:[M*.2,l+.36,-.02],r:[0,0,-M*.15],s:[.12,.3,.07],c:t.skin}),o.add(U.cone,{p:[M*.2,l+.34,.02],r:[0,0,-M*.15],s:[.07,.2,.04],c:2759180})):t.ears==="long"?(o.add(U.cap,{p:[M*.14,l+.55,-.06],r:[-.25,0,-M*.12],s:[.07,.2,.05],c:t.skin}),o.add(U.cap,{p:[M*.14,l+.55,-.03],r:[-.25,0,-M*.12],s:[.04,.17,.03],c:16758217})):t.ears==="deer"?o.add(U.sph,{p:[M*.3,l+.14,-.04],r:[0,0,-M*.5],s:[.16,.08,.05],c:t.skin}):t.ears==="small"?o.add(U.sph,{p:[M*.27,l+.2,-.02],s:[.07,.07,.04],c:t.skin}):t.ears==="human"&&o.add(U.sph,{p:[M*.33,l,0],s:[.05,.08,.06],c:t.skin});switch(t.hat){case"acorn":o.add(U.sph,{p:[0,l+.3,0],s:[.3,.2,.3],c:9067051}),o.add(U.cyl,{p:[0,l+.5,0],s:[.03,.08,.03],c:7029795}),o.add(U.tor,{p:[0,l+.2,0],r:[Math.PI/2,0,0],s:[.3,.3,.4],c:7029795}),o.add(U.cone,{p:[.12,l+.58,0],r:[0,0,-.5],s:[.03,.2,.01],c:4173402});break;case"tuft":for(let M=-1;M<=1;M++)o.add(U.cone,{p:[M*.07,l+.38,-.04],r:[-.3,0,-M*.3],s:[.04,.2,.03],c:t.skin});break;case"cap":o.add(U.sph,{p:[0,l+.2,0],s:[.36,.2,.36],c:1319229}),o.add(U.box,{p:[0,l+.2,.34],s:[.4,.04,.2],c:1319229}),o.add(U.sph,{p:[0,l,-.2],s:[.35,.3,.2],c:t.hair});break;case"quills":for(let M=0;M<16;M++){let E=M/16*Math.PI*2,C=.26;o.add(U.cone,{p:[Math.cos(E)*C*.9,l+.28,Math.sin(E)*C-.05],r:[Math.sin(E)*.7,0,-Math.cos(E)*.7],s:[.045,.28,.045],c:M%2?6177830:3089430})}for(let M=0;M<5;M++)o.add(U.cone,{p:[(M-2)*.1,l+.34,-.1],r:[-.4,0,0],s:[.05,.3,.05],c:3089430});break;case"captain":o.add(U.cyl,{p:[0,l+.3,0],s:[.3,.12,.3],c:16052714}),o.add(U.cyl,{p:[0,l+.21,.02],s:[.33,.03,.33],c:1319229}),o.add(U.box,{p:[0,l+.2,.3],s:[.34,.03,.2],c:1118481}),o.add(U.sph,{p:[0,l+.27,.32],s:[.05,.05,.02],c:15054922});break;case"tufts":for(let M of[-1,1])o.add(U.cone,{p:[M*.2,l+.34,-.04],r:[0,0,-M*.4],s:[.07,.2,.05],c:8018488});break;case"antlers":for(let M of[-1,1])o.add(U.cap,{p:[M*.16,l+.5,-.04],r:[0,0,-M*.35],s:[.03,.2,.03],c:15325621}),o.add(U.cap,{p:[M*.27,l+.58,-.04],r:[0,0,-M*.9],s:[.025,.12,.025],c:15325621}),o.add(U.cap,{p:[M*.2,l+.45,-.04],r:[0,0,M*.8],s:[.025,.09,.025],c:15325621});o.add(U.box,{p:[0,l+.3,.1],s:[.5,.03,.03],c:16739226});break;case"hardhat":o.add(U.sph,{p:[0,l+.2,0],s:[.36,.24,.36],c:16765503}),o.add(U.box,{p:[0,l+.15,.3],s:[.4,.04,.2],c:16765503}),o.add(U.box,{p:[0,l+.34,0],s:[.08,.05,.3],c:14725888});break}t.goggles&&(o.add(U.tor,{p:[-u,h+.06,d+.02],s:[.13,.13,.6],c:4869978}),o.add(U.tor,{p:[u,h+.06,d+.02],s:[.13,.13,.6],c:4869978}),o.add(U.box,{p:[0,h+.08,d+0],s:[.1,.03,.03],c:4869978})),t.beard&&(o.add(U.sph,{p:[0,l-.15,c*.7],s:[.26,.2,.2],c:t.beard}),o.add(U.sph,{p:[0,l-.05,c*.98],s:[.18,.04,.05],c:t.beard})),t.stubble&&o.add(U.sph,{p:[0,l-.17,c*.66],s:[.24,.12,.2],c:9071186}),t.hair&&t.hat!=="cap"&&o.add(U.sph,{p:[0,l+.12,-.12],s:[.36,.28,.3],c:t.hair});let x=new At().add(U.tor,{p:[0,l-.14,c*.88],r:[0,0,Math.PI],s:[.07,.04,.4],c:3804944}),m=new At().add(U.sph,{p:[0,l-.15,c*.9],s:[.07,.085,.04],c:3804944}).add(U.sph,{p:[0,l-.2,c*.92],s:[.04,.03,.02],c:16739194});for(let M of[-1,1])r.add(U.cap,{p:[M*.28,0,.2],r:[Math.PI/2-.35,0,M*.12],s:[.075,.2,.075],c:t.shirt}),r.add(U.sph,{p:[M*.2,-.04,.44],s:[.085,.085,.085],c:t.skin});let p=Xx(),y=i.build(p),A=new re;A.add(n.build(p)),A.position.set(0,0,0);let v=x.build(new ie({vertexColors:!0})),S=m.build(new ie({vertexColors:!0}));S.visible=!1,A.add(v),A.add(S);let w=r.build(p);w.position.set(0,.15,.05);let R=new At;R.add(U.tor,{r:[0,0,0],s:[.2,.2,.6],c:1843760}),R.add(U.cyl,{r:[Math.PI/2,0,0],s:[.04,.2,.04],c:ri});let _=new re;return _.add(R.build(Rd())),_.position.set(0,.18,.5),_.rotation.x=-.9,e.add(y),e.add(A),e.add(w),e.add(_),{root:e,head:A,torso:y,arms:w,smile:v,open:S,wheel:_,name:s,cfg:t}}function Cd(s,t,e,i,n,r){s.head.rotation.z+=(-t*.28-s.head.rotation.z)*Math.min(1,n*9),s.head.rotation.y+=(-t*.22-s.head.rotation.y)*Math.min(1,n*9),s.head.position.y=Math.sin(r*12)*.006*e+e*.015,s.wheel.rotation.z+=(-t*.9-s.wheel.rotation.z)*Math.min(1,n*14),s.torso.rotation.z+=(-t*.1-s.torso.rotation.z)*Math.min(1,n*8),s.smile.visible=!i,s.open.visible=!!i}var _t=U;var Jc=Math.PI*2;function zr(s){let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var Ji=s=>new Dt(s),a_={meadow:{skyTop:3117055,skyHor:13955071,sun:16773577,sunDir:[.5,.55,.3],ground:7127626,off:9678922,road:5198684,curb1:15220794,curb2:16777215,wall1:15911244,wall2:13933098,fog:13626111,fogD:.0016,hemiSky:13625599,hemiGnd:7051850,exposure:1},harbor:{skyTop:3428510,skyHor:16758922,sun:16761994,sunDir:[-.6,.28,.5],ground:5859194,off:8027e3,road:3883858,curb1:16753178,curb2:1911364,wall1:15029052,wall2:3117224,fog:15904908,fogD:.0017,hemiSky:16766128,hemiGnd:3951206,exposure:1.02},mesa:{skyTop:16751434,skyHor:16770992,sun:16773312,sunDir:[.3,.7,-.4],ground:14722650,off:13207112,road:9071186,curb1:11813932,curb2:16113584,wall1:11818298,wall2:9387818,fog:16767392,fogD:.0016,hemiSky:16769200,hemiGnd:11037242,exposure:1.05},frost:{skyTop:6990064,skyHor:15398399,sun:16054783,sunDir:[.2,.4,.7],ground:15660799,off:13230066,road:7043724,curb1:2795222,curb2:16777215,wall1:12576511,wall2:9226480,fog:14741243,fogD:.0018,hemiSky:15135743,hemiGnd:10138831,exposure:1}};function is(s,t,e,i=!0){let n=document.createElement("canvas");n.width=s,n.height=t;let r=n.getContext("2d");e(r,s,t);let a=new ln(n);return a.colorSpace=Ee,a.anisotropy=4,i&&(a.wrapS=a.wrapT=qn),a}function Nd(s,t,e,i,n,r){let a=zr(7);for(let o=0;o<i;o++){s.fillStyle=r[a()*r.length|0],s.globalAlpha=n*(.4+a()*.6);let l=1+a()*3;s.fillRect(a()*t,a()*e,l,l)}s.globalAlpha=1}function Pd(s){return is(512,512,(t,e,i)=>{let n=Ji(s.ground);t.fillStyle="#"+n.getHexString(),t.fillRect(0,0,e,i);let r=zr(11);for(let a=0;a<260;a++){let o=n.clone().offsetHSL((r()-.5)*.03,(r()-.5)*.06,(r()-.5)*.08);t.fillStyle="#"+o.getHexString(),t.globalAlpha=.35;let l=10+r()*38;t.beginPath(),t.arc(r()*e,r()*i,l,0,Jc),t.fill()}t.globalAlpha=1,Nd(t,e,i,2500,.35,["#ffffff","#000000","#"+n.clone().offsetHSL(0,.1,-.1).getHexString()])})}function o_(s,t){return is(256,512,(e,i,n)=>{let r=Ji(s.road);e.fillStyle="#"+r.getHexString(),e.fillRect(0,0,i,n),Nd(e,i,n,5e3,.28,["#ffffff","#000000","#888888"]),e.globalAlpha=.12,e.fillStyle="#000",e.fillRect(i*.28,0,i*.1,n),e.fillRect(i*.62,0,i*.1,n),e.globalAlpha=1,e.fillStyle="rgba(255,255,255,0.9)",e.fillRect(i*.035,0,6,n),e.fillRect(i*.965-6,0,6,n),e.fillStyle=t==="mesa"?"rgba(255,240,200,0.8)":t==="harbor"?"rgba(255,200,80,0.85)":"rgba(255,255,255,0.8)";for(let a=0;a<n;a+=128)e.fillRect(i/2-3,a+16,6,64);if(t==="harbor"){e.globalAlpha=.07,e.fillStyle="#000";for(let a=0;a<n;a+=32)e.fillRect(0,a,i,2);e.globalAlpha=1}})}function l_(){return is(128,32,(s,t,e)=>{for(let n=0;n<4;n++)for(let r=0;r<16;r++)s.fillStyle=(r+n)%2?"#101010":"#f5f5f5",s.fillRect(r*t/16,n*e/4,t/16,e/4)},!1)}function Id(s,t=512,e=128,i="#101827",n="#ffffff",r="#ffd23f"){return is(t,e,a=>{let o=a.createLinearGradient(0,0,t,0);o.addColorStop(0,i),o.addColorStop(1,i),a.fillStyle=o,a.fillRect(0,0,t,e),a.fillStyle=r,a.fillRect(0,0,t,8),a.fillRect(0,e-8,t,8),a.fillStyle=n,a.font="900 "+e*.5+"px system-ui,sans-serif",a.textAlign="center",a.textBaseline="middle",a.fillText(s,t/2,e/2+4)},!1)}function Ld(){return is(128,256,(s,t,e)=>{s.fillStyle="#0b2a52",s.fillRect(0,0,t,e);for(let i=0;i<3;i++){let n=i*85+10;s.fillStyle=i%2?"#38e1ff":"#ffd23f",s.beginPath(),s.moveTo(t*.1,n+70),s.lineTo(t*.5,n),s.lineTo(t*.9,n+70),s.lineTo(t*.9,n+90),s.lineTo(t*.5,n+28),s.lineTo(t*.1,n+90),s.fill()}})}function c_(){return is(128,128,(s,t,e)=>{let i=s.createLinearGradient(0,0,t,e);["#ff4d6d","#ffd23f","#37e08a","#35a7ff","#b66bff"].forEach((n,r,a)=>i.addColorStop(r/(a.length-1),n)),s.fillStyle=i,s.fillRect(0,0,t,e),s.fillStyle="rgba(255,255,255,0.28)",s.fillRect(0,0,t,10),s.fillRect(0,0,10,e),s.fillRect(t-10,0,10,e),s.fillRect(0,e-10,t,10),s.fillStyle="#fff",s.font="900 96px system-ui",s.textAlign="center",s.textBaseline="middle",s.shadowColor="#000a",s.shadowBlur=8,s.fillText("?",t/2,e/2+6)},!1)}function tl(s,t,e,i,n,r=1,a=null){let o=s.N,l=[];for(let p=0;p<=o;p+=r)l.push(p%o);(l[l.length-1]!==0||l.length<2)&&l.push(0);let c=[],h=[],d=[],u=[],f=0,g=a?Ji(a):null;l.forEach((p,y)=>{let A=s.p[p][0],v=s.p[p][1],S=s.tz[p],w=-s.tx[p],R=(y===l.length-1?s.length:p*s.step)/n;if(c.push(A+S*t,i,v+w*t,A+S*e,i,v+w*e),h.push(0,R,1,R),g&&u.push(g.r,g.g,g.b,g.r,g.g,g.b),y>0){let _=(y-1)*2;d.push(_,_+2,_+1,_+1,_+2,_+3)}});let x=new fe;if(x.setAttribute("position",new Vt(c,3)),x.setAttribute("uv",new Vt(h,2)),g&&x.setAttribute("color",new Vt(u,3)),x.setIndex(d),x.computeVertexNormals(),x.attributes.normal.getY(0)<0){let p=x.index.array;for(let y=0;y<p.length;y+=3){let A=p[y+1];p[y+1]=p[y+2],p[y+2]=A}x.computeVertexNormals()}return x}function h_(s,t,e,i,n,r,a){let o=[],l=[],c=[];s.forEach((d,u)=>{let f=e[u],g=-t[u];o.push(d[0]+f*i,r,d[1]+g*i,d[0]+f*n,r,d[1]+g*n);let x=u*2/a;if(l.push(0,x,1,x),u>0){let m=(u-1)*2;c.push(m,m+2,m+1,m+1,m+2,m+3)}});let h=new fe;if(h.setAttribute("position",new Vt(o,3)),h.setAttribute("uv",new Vt(l,2)),h.setIndex(c),h.computeVertexNormals(),h.attributes.normal.getY(0)<0){let d=h.index.array;for(let u=0;u<d.length;u+=3){let f=d[u+1];d[u+1]=d[u+2],d[u+2]=f}h.computeVertexNormals()}return h}function Dd(s,t,e,i,n,r,a=6,o=.9){let l=[],c=[],h=[],d=s.N,u=Ji(i),f=Ji(n),g=0,x=Math.sign(t);for(let p=0;p<d;p++){let y=(p+1)%d,A=(P,D)=>[s.p[P][0]+s.tz[P]*D,s.p[P][1]-s.tx[P]*D],v=A(p,t),S=A(y,t);if(r&&(r(v[0],v[1])||r(S[0],S[1])))continue;let w=A(p,t+x*o),R=A(y,t+x*o),_=Math.floor(p*s.step/a)%2?u:f,M=_.clone().multiplyScalar(.72),E=(P,D,L,O,X)=>{l.push(P[0],L,P[1],D[0],L,D[1],D[0],O,D[1],P[0],O,P[1]);for(let $=0;$<4;$++)c.push(X.r,X.g,X.b);h.push(g,g+1,g+2,g,g+2,g+3,g,g+2,g+1,g,g+3,g+2),g+=4};E(v,S,0,e,_),E(w,R,0,e,M),E(v,S,e,e,_),l.push(v[0],e,v[1],S[0],e,S[1],R[0],e,R[1],w[0],e,w[1]);let C=_.clone().multiplyScalar(1.15);for(let P=0;P<4;P++)c.push(C.r,C.g,C.b);h.push(g,g+1,g+2,g,g+2,g+3,g,g+2,g+1,g,g+3,g+2),g+=4}let m=new fe;return m.setAttribute("position",new Vt(l,3)),m.setAttribute("color",new Vt(c,3)),m.setIndex(h),m.computeVertexNormals(),m}function u_(s,t,e){let i=s.N,n=[],r=[],a=[],o=0,l=Ji(t.curb1),c=Ji(t.curb2);for(let d of[-1,1])for(let u=0;u<i;u++){let f=(u+1)%i,g=Math.abs(s.k[u]);if(g<e)continue;let x=s.k[u]>0?1:-1;if(d!==x&&g<e*1.8)continue;let m=(_,M)=>[s.p[_][0]+s.tz[_]*M,s.p[_][1]-s.tx[_]*M],p=d*s.halfW,y=d*(s.halfW+1.3),A=m(u,p),v=m(f,p),S=m(f,y),w=m(u,y),R=Math.floor(u*s.step/3)%2?l:c;n.push(A[0],.07,A[1],v[0],.07,v[1],S[0],.07,S[1],w[0],.07,w[1]);for(let _=0;_<4;_++)r.push(R.r,R.g,R.b);a.push(o,o+1,o+2,o,o+2,o+3,o,o+2,o+1,o,o+3,o+2),o+=4}let h=new fe;return h.setAttribute("position",new Vt(n,3)),h.setAttribute("color",new Vt(r,3)),h.setIndex(a),h.computeVertexNormals(),h}var We=s=>new Ge(s);function Re(s){let t=s.build(new ie);return t?t.geometry:null}var qt={sph:new pi(1,9,6),cyl:new cn(1,1,1,9,1),cone:new wn(1,1,9,1),cap:new Yn(1,1,2,7)},d_={meadow:{tree:()=>{let s=new At;return s.add(qt.cyl,{p:[0,1.2,0],s:[.35,1.2,.35],c:8014374}),s.add(qt.sph,{p:[0,3.4,0],s:[1.9,1.7,1.9],c:4173380}),s.add(qt.sph,{p:[.7,4.3,.2],s:[1.2,1.1,1.2],c:5817429}),Re(s)},tree2:()=>{let s=new At;return s.add(qt.cyl,{p:[0,1,0],s:[.3,1,.3],c:9067056}),s.add(qt.cone,{p:[0,3.4,0],s:[1.6,3,1.6],c:3051338}),s.add(qt.cone,{p:[0,4.8,0],s:[1.1,2.2,1.1],c:4040794}),Re(s)},flower:()=>{let s=new At;for(let t=0;t<5;t++){let e=t*1.3;s.add(qt.cyl,{p:[Math.sin(e)*.8,.3,Math.cos(e)*.8],s:[.04,.3,.04],c:3116858}),s.add(qt.sph,{p:[Math.sin(e)*.8,.65,Math.cos(e)*.8],s:[.22,.22,.22],c:[16735631,16765503,16777215,11955199,16747066][t]})}return Re(s)},bale:()=>{let s=new At;return s.add(qt.cyl,{p:[0,.6,0],r:[0,0,Math.PI/2],s:[.6,.55,.6],c:15253578}),Re(s)},rock:()=>{let s=new At;return s.add(qt.sph,{p:[0,.4,0],s:[.9,.55,.7],c:10134440}),Re(s)}},harbor:{lamp:()=>{let s=new At;return s.add(qt.cyl,{p:[0,3,0],s:[.1,3,.1],c:2831430}),s.add(qt.sph,{p:[0,6.2,0],s:[.45,.45,.45],c:16769946}),s.add(_t.box,{p:[0,.2,0],s:[.5,.4,.5],c:2831430}),Re(s)},stack:()=>{let s=new At,t=[15029052,3117224,15906106,3825584,7321706];for(let e=0;e<6;e++){let i=e/3|0;s.add(_t.sbox,{p:[(e%3-1)*2.7,1.3+i*2.6,0],s:[2.6,2.5,6],c:t[(e*7+i*3)%5]})}return Re(s)},crate:()=>{let s=new At;return s.add(_t.box,{p:[0,.8,0],s:[1.6,1.6,1.6],c:12094034}),s.add(_t.box,{p:[1.3,.5,.6],s:[1,1,1],c:11041346}),Re(s)},bollard:()=>{let s=new At;return s.add(qt.cyl,{p:[0,.5,0],s:[.32,.5,.32],c:16762938}),Re(s)},bldg:()=>{let s=new At;s.add(_t.sbox,{p:[0,7,0],s:[8,14,8],c:3820136});for(let t=0;t<5;t++)for(let e=-1;e<=1;e++)s.add(_t.sbox,{p:[e*2.2,3+t*2.4,4.05],s:[1.2,1.2,.05],c:(e+t)%3?16767114:8030888});return Re(s)},boat:()=>{let s=new At;return s.add(_t.box,{p:[0,.3,0],s:[2,.8,6],c:16117990}),s.add(qt.cyl,{p:[0,3.5,0],s:[.08,3.2,.08],c:13620959}),s.add(qt.cone,{p:[0,3.2,.4],s:[1.4,2.8,.1],c:16739162}),Re(s)}},mesa:{pillar:()=>{let s=new At,t=[12739134,14253899,15114330,11818298];for(let e=0;e<4;e++)s.add(qt.cyl,{p:[0,5+e*5,0],s:[8-e*.6+e%2*.8,5,8-e*.6+e%2*.8],c:t[e]});return s.add(qt.cyl,{p:[0,20.4,0],s:[8.2,.5,8.2],c:15123066}),Re(s)},cactus:()=>{let s=new At;return s.add(qt.cap,{p:[0,1.6,0],s:[.45,1.5,.45],c:4168274}),s.add(qt.cap,{p:[.8,2,0],s:[.28,.6,.28],c:4168274}),s.add(qt.cyl,{p:[.4,1.5,0],r:[0,0,Math.PI/2],s:[.2,.4,.2],c:4168274}),s.add(qt.cap,{p:[-.8,1.7,0],s:[.26,.5,.26],c:4168274}),s.add(qt.cyl,{p:[-.4,1.3,0],r:[0,0,Math.PI/2],s:[.18,.4,.18],c:4168274}),Re(s)},rock:()=>{let s=new At;return s.add(qt.sph,{p:[0,.8,0],s:[1.8,1.1,1.4],c:11818298}),s.add(qt.sph,{p:[1.2,.5,.4],s:[1,.7,.9],c:12739134}),Re(s)},dune:()=>{let s=new At;return s.add(qt.sph,{p:[0,0,0],s:[9,2.4,6],c:15316840}),Re(s)},bones:()=>{let s=new At;return s.add(qt.cap,{p:[0,.3,0],r:[0,0,Math.PI/2],s:[.12,1.2,.12],c:15854038}),s.add(qt.sph,{p:[1.3,.3,0],s:[.3,.3,.3],c:15854038}),Re(s)}},frost:{pine:()=>{let s=new At;s.add(qt.cyl,{p:[0,.8,0],s:[.3,.8,.3],c:7031340});for(let t=0;t<4;t++)s.add(qt.cone,{p:[0,2.2+t*1.4,0],s:[2-t*.4,2.4,2-t*.4],c:2783832}),s.add(qt.cone,{p:[0,2.7+t*1.4,0],s:[1.5-t*.32,1.5,1.5-t*.32],c:15923711});return Re(s)},crystal:()=>{let s=new At;return s.add(qt.cone,{p:[0,2.2,0],s:[.8,4.4,.8],c:10476799}),s.add(qt.cone,{p:[1,1.4,.3],r:[0,0,-.3],s:[.6,2.8,.6],c:12577535}),s.add(qt.cone,{p:[-.9,1.1,-.2],r:[0,0,.35],s:[.5,2.2,.5],c:8375029}),Re(s)},mound:()=>{let s=new At;return s.add(qt.sph,{p:[0,0,0],s:[3.5,1.4,3],c:16777215}),Re(s)},rock:()=>{let s=new At;return s.add(qt.sph,{p:[0,.5,0],s:[1.3,.8,1],c:8095636}),s.add(qt.sph,{p:[0,1,0],s:[1,.4,.8],c:16777215}),Re(s)},igloo:()=>{let s=new At;return s.add(qt.sph,{p:[0,0,0],s:[2.4,1.8,2.4],c:16055039}),s.add(qt.cyl,{p:[0,.4,2.3],r:[Math.PI/2,0,0],s:[.7,.8,.7],c:14478584}),Re(s)}}},f_={meadow:[["tree",150,6,60,.9,1.7],["tree2",90,8,70,.9,1.6],["flower",260,1.5,22,.8,1.6],["bale",40,2,14,.9,1.2],["rock",40,5,50,.6,1.5]],harbor:[["lamp",90,2,5,1,1],["stack",26,12,55,.9,1.3],["crate",60,3,25,.8,1.3],["bollard",80,1.5,3.5,1,1.1],["bldg",22,60,130,.8,1.7]],mesa:[["pillar",28,22,140,.7,1.9],["cactus",120,4,60,.8,1.7],["rock",90,3,70,.7,1.9],["dune",22,25,90,.8,1.7],["bones",12,3,20,1,1.4]],frost:[["pine",210,5,75,.9,1.8],["crystal",50,4,45,.8,1.8],["mound",100,3,40,.8,1.6],["rock",50,5,40,.8,1.8],["igloo",4,16,40,1,1.2]]},el=class{constructor(t,e,i,n={}){this.tc=t,this.scene=e,this.group=new re,e.add(this.group),this.th=a_[t.theme],this.anim=[],this.hq=!!n.hq,this.disposables=[],this.tex={};let r=this.th;e.background=new Dt(r.fog),e.fog=new ur(r.fog,r.fogD),this._sky(i),this._lights(),this._ground(),this._road(),this._curbsWalls(),this._shortcut(),this._startLine(),this._props(),this._landmark(),this._boxesCoinsPads(),this._water()}add(t){return this.group.add(t),t}_sky(t){let e=this.th,i=new k(...e.sunDir).normalize(),n=new $e({side:Ye,depthWrite:!1,fog:!1,uniforms:{top:{value:Ji(e.skyTop)},hor:{value:Ji(e.skyHor)},sunDir:{value:i},sunCol:{value:Ji(e.sun)},time:{value:0}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); gl_Position.z = gl_Position.w; }",fragmentShader:`varying vec3 vD; uniform vec3 top,hor,sunCol,sunDir; uniform float time;
      float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
      void main(){ vec3 d=normalize(vD); float t=clamp(d.y,0.0,1.0); vec3 c=mix(hor,top,pow(t,0.55));
        float s=max(dot(d,sunDir),0.0); c+=sunCol*(pow(s,600.0)*3.0+pow(s,12.0)*0.35);
        if(d.y>0.02){ vec2 uv=d.xz/(d.y+0.25)*2.2+vec2(time*0.01,0.0); float cl=n(uv)*0.55+n(uv*2.1)*0.3+n(uv*4.3)*0.15; cl=smoothstep(0.52,0.85,cl); c=mix(c,mix(vec3(1.0),hor,0.3),cl*0.75*smoothstep(0.02,0.25,d.y)); }
        gl_FragColor=vec4(c,1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`});this.skyMat=n,this.sky=new Ut(new pi(1,24,16),n),this.sky.scale.setScalar(1500),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,this.group.add(this.sky);let r=new Un(t),a=new Ni,o=n.clone();a.add(new Ut(new pi(1,24,16),o)),this.envTex=r.fromScene(a,.02).texture,this.scene.environment=this.envTex,r.dispose()}_lights(){let t=this.th;this.hemi=new Rn(t.hemiSky,t.hemiGnd,1.15),this.sun=new Ui(t.sun,2.6);let e=new k(...t.sunDir).normalize();this.sun.position.copy(e).multiplyScalar(100),this.rimL=new Ui(12574975,.9),this.rimL.position.copy(e).multiplyScalar(-60).add(new k(0,40,0)),this.add(this.hemi),this.add(this.sun),this.add(this.rimL)}_ground(){let t=this.th,e=this.tc,i=Pd(t);i.repeat.set(120,120),this.tex.ground=i;let n=We({map:i,roughness:.95,metalness:0,color:16777215});this.groundMat=n;let r=new Ut(new De(4e3,4e3),n);r.rotation.x=-Math.PI/2,r.position.y=-.02,this.add(r),this.groundMesh=r;let a=We({color:t.off,roughness:1,metalness:0}),o=Pd({ground:t.off});o.repeat.set(1,1),a.map=o,this.add(new Ut(tl(e,-e.limit,-e.halfW,.01,24),a)),this.add(new Ut(tl(e,e.halfW,e.limit,.01,24),a)),o.wrapS=o.wrapT=qn,a.map.repeat.set(.6,1),a.map.needsUpdate=!0}_road(){let t=this.th,e=this.tc,i=o_(t,e.id);this.tex.road=i,this.roadMat=We({map:i,roughness:.82,metalness:0,envMapIntensity:.5});let n=new Ut(tl(e,-e.halfW,e.halfW,.03,12,1),this.roadMat);this.add(n)}_curbsWalls(){let t=this.th,e=this.tc;this.add(new Ut(u_(e,t,.0045),We({vertexColors:!0,roughness:.7})));let i=e.sc?(a,o)=>{let l=e.nearestSc(a,o);return l&&l.d<e.sc.half+6&&l.u>-.05&&l.u<1.05&&(l.u<.12||l.u>.88)}:null,n=We({vertexColors:!0,roughness:.8,metalness:.05,envMapIntensity:.6,side:Ae}),r=e.theme==="mesa"?3.2:e.theme==="frost"?1.6:e.theme==="harbor"?1.4:1.1;this.add(new Ut(Dd(e,e.limit,r,t.wall1,t.wall2,i,6,e.theme==="mesa"?6:1.2),n)),this.add(new Ut(Dd(e,-e.limit,r,t.wall1,t.wall2,i,6,e.theme==="mesa"?6:1.2),n))}_shortcut(){let t=this.tc,e=t.sc;if(!e)return;let i=this.th,n={rough:11569754,sand:15188602,ice:12576511}[e.surf]||11569754,r=We({color:n,roughness:e.surf==="ice"?.12:1,metalness:e.surf==="ice"?.2:0,envMapIntensity:e.surf==="ice"?1.6:.4});this.add(new Ut(h_(e.p,e.tx,e.tz,-e.half,e.half,.04,14),r));let a=m=>{let p=new At;for(let y=0;y<e.n;y+=2){let A=e.p[y],v=e.tz[y],S=-e.tx[y],w=A[0]+v*(e.half+.7)*m,R=A[1]+S*(e.half+.7)*m;t.nearestGlobal(w,R).d<t.limit+2.5||(p.add(_t.cyl,{p:[w,.5,R],s:[.35,.5,.35],c:m>0?i.wall1:i.wall2}),p.add(_t.cyl,{p:[w,1.05,R],s:[.18,.18,.18],c:16777215}))}return p.build(We({vertexColors:!0,roughness:.7}))},o=a(1),l=a(-1);o&&this.add(o),l&&this.add(l);let c=e.p[3],h=e.tx[3],d=e.tz[3],u=new Ut(new De(10,2.5),new ie({map:Id("SHORTCUT",512,128,"#14213d","#ffd23f","#ff4d6d"),toneMapped:!1,side:Ae}));u.position.set(c[0],7.2,c[1]),u.rotation.y=Math.atan2(h,d)+Math.PI/2,this.add(u);let f=new At;for(let m of[-1,1])f.add(_t.cyl,{p:[c[0]+d*m*6.4,3.4,c[1]-h*m*6.4],s:[.35,3.4,.35],c:16765503});let g=f.build(We({vertexColors:!0,roughness:.5}));g&&this.add(g);let x=new Ut(new De(2.6,5),new ie({map:Ld(),toneMapped:!1}));x.rotation.x=-Math.PI/2,x.position.set(c[0],.09,c[1]),x.rotation.z=-Math.atan2(h,d)+Math.PI,this.add(x)}_startLine(){let t=this.tc,e=this.th,i={};t.at(0,0,i);let n=l_();n.wrapS=n.wrapT=yi;let r=new Ut(new De(t.width,3),new ie({map:n,toneMapped:!1}));r.rotation.x=-Math.PI/2,r.rotation.z=-i.heading,r.position.set(i.x,.08,i.z),this.add(r);let a=new At,o=i.tz,l=-i.tx;for(let g of[-1,1])a.add(_t.box,{p:[i.x+o*g*(t.halfW+1.2),3.6,i.z+l*g*(t.halfW+1.2)],s:[1.1,7.2,1.1],c:2831430});a.add(_t.box,{p:[i.x,7.4,i.z],r:[0,i.heading,0],s:[t.width+3.6,1.2,1.1],c:2831430});let c=a.build(We({vertexColors:!0,roughness:.4,metalness:.5}));this.add(c);let h=new Ut(new De(t.width+1,3.2),new ie({map:Id(t.meta.name.toUpperCase(),1024,200,"#0e1a33","#ffffff","#ffd23f"),toneMapped:!1,side:Ae}));h.position.set(i.x,6.3,i.z),h.rotation.y=i.heading,this.add(h);let d=new At,u=zr(5);for(let g of[-1,1])for(let x=0;x<40;x++){let m=x/10|0,p=x%10,y=[16731501,16765503,3516415,3661962,11955199,16777215][u()*6|0];d.add(qt.sph,{p:[i.x+o*g*(t.limit+3.5+m*1.8)+i.tx*(p-5)*1.5,1.4+m*1,i.z+l*g*(t.limit+3.5+m*1.8)+i.tz*(p-5)*1.5],s:[.5,.55,.5],c:y})}for(let g of[-1,1])d.add(_t.sbox,{p:[i.x+o*g*(t.limit+8),.8,i.z+l*g*(t.limit+8)],r:[0,i.heading,0],s:[1.2*0+17,1.4,6.5],c:4871016});let f=d.build(We({vertexColors:!0,roughness:.8}));this.add(f),this.crowd=f}_props(){let t=this.tc,e=this.th,i=f_[t.theme],n=d_[t.theme],r=zr(t.theme.length*977+13),a=new Ge({vertexColors:!0,roughness:.8,metalness:0,envMapIntensity:.6});Ki(a,16777215,2.4,.18);let o=new Le,l=t.length,c={};this.propMeshes=[];for(let[m,p,y,A,v,S]of i){let w=n[m](),R=[],_=0;for(;R.length<p&&_++<p*30;){let E=r()*l,C=r()<.5?-1:1,P=t.limit+y+r()*(A-y),D=t.at(E,C*P,{});if(!(t.nearestGlobal(D.x,D.z).d<t.limit+y-.5)){if(t.sc){let O=t.nearestSc(D.x,D.z);if(O&&O.d<t.sc.half+4)continue}R.push([D.x,D.z,r()*Jc,v+r()*(S-v),r()])}}if(!R.length)continue;let M=new Mn(w,a,R.length);if(R.forEach((E,C)=>{o.position.set(E[0],m==="dune"?-.4:0,E[1]),o.rotation.set(0,E[2],0),o.scale.setScalar(E[3]),(m==="dune"||m==="mound")&&o.scale.set(E[3],E[3]*(.8+E[4]*.5),E[3]),o.updateMatrix(),M.setMatrixAt(C,o.matrix);let P=new Dt().setHSL(0,0,.88+E[4]*.2);M.setColorAt(C,P)}),M.instanceMatrix.needsUpdate=!0,M.instanceColor&&(M.instanceColor.needsUpdate=!0),M.frustumCulled=!1,this.add(M),this.propMeshes.push(M),m==="lamp"&&t.theme==="harbor"){let E=new Mn(new pi(.9,8,6),new ie({color:16769946,transparent:!0,opacity:.35,depthWrite:!1,fog:!1}),R.length);R.forEach((C,P)=>{o.position.set(C[0],6.2*C[3],C[1]),o.rotation.set(0,0,0),o.scale.setScalar(C[3]),o.updateMatrix(),E.setMatrixAt(P,o.matrix)}),E.frustumCulled=!1,this.add(E)}}let h=new At,d={meadow:[6271818,4102735,8047451],harbor:[4543598,3491168,5662858],mesa:[13664319,11818298,14719572],frost:[13624309,11127014,15332607]}[t.theme],u=0,f=0;for(let m=0;m<t.N;m+=4)u+=t.p[m][0],f+=t.p[m][1];u/=Math.ceil(t.N/4),f/=Math.ceil(t.N/4);let g=0;for(let m=0;m<t.N;m+=4)g=Math.max(g,Math.hypot(t.p[m][0]-u,t.p[m][1]-f));this.center=[u,f],this.radius=g;for(let m=0;m<46;m++){let p=m/46*Jc+r()*.1,y=g+260+r()*220,A=60+r()*120,v=100+r()*140;h.add(qt.sph,{p:[u+Math.cos(p)*y,-A*.35,f+Math.sin(p)*y],s:[v,A,v],c:d[r()*d.length|0]})}let x=h.build(We({vertexColors:!0,roughness:1}));x&&this.add(x)}_water(){if(this.tc.theme!=="harbor")return;let t=this.tc,e=new Ut(new De(4e3,4e3,1,1),new Ge({color:1866394,roughness:.18,metalness:.1,envMapIntensity:1.6}));e.rotation.x=-Math.PI/2,e.position.y=-.9,this.add(e),this.sea=e,this.groundMesh.visible=!1;let i=We({map:this.tex.ground,color:16777215,roughness:.9});this.tex.ground.repeat.set(1,1),this.tex.ground.repeat.set(.07,.07);let n=new Ut(tl(t,-(t.limit+70),t.limit+70,-.01,14),i);this.add(n)}_landmark(){let t=this.tc,e=t.meta.landmark;if(!e)return;let i=t.length,n=t.reverse?1-e.f:e.f,r=t.at(n*i,0,{}),a=r.tz,o=-r.tx,l=t.mirror?-1:1,c=r.x+a*e.lat*l,h=r.z+o*e.lat*l,d=new re;if(d.position.set(c,0,h),this.add(d),this.landmark=d,e.type==="windmill"){let u=new At;u.add(_t.cyl,{p:[0,10,0],s:[4.2,10,4.2],c:16050900}),u.add(_t.cone,{p:[0,22.5,0],s:[5.4,5.2,5.4],c:13124398}),u.add(_t.cyl,{p:[0,1,0],s:[5,1.2,5],c:9407104}),u.add(_t.box,{p:[0,7,4.1],s:[2,3,.3],c:7031340}),d.add(u.build(We({vertexColors:!0,roughness:.7})));let f=new re;f.position.set(0,19.5,4.6);let g=new At;for(let x=0;x<4;x++){let m=x*Math.PI/2;g.add(_t.sbox,{p:[Math.cos(m)*8,Math.sin(m)*8,0],r:[0,0,m],s:[14,1.6,.3],c:15921906}),g.add(_t.sbox,{p:[Math.cos(m)*8,Math.sin(m)*8,-.05],r:[0,0,m],s:[14,.5,.4],c:13124398})}f.add(g.build(We({vertexColors:!0,roughness:.7,side:Ae}))),d.add(f),this.anim.push((x,m)=>{f.rotation.z=m*.5}),d.rotation.y=Math.atan2(-a*l,-o*l),d.scale.setScalar(1.4)}else if(e.type==="lighthouse"){let u=new At;for(let m=0;m<6;m++)u.add(_t.cyl,{p:[0,3+m*5,0],s:[6-m*.55,3.2,6-m*.55],c:m%2?16117990:15029052});u.add(_t.cyl,{p:[0,35,0],s:[4,.6,4],c:2831430}),u.add(_t.cone,{p:[0,40,0],s:[4,4,4],c:2831430}),u.add(_t.cyl,{p:[0,.5,0],s:[9,1,9],c:9080729}),d.add(u.build(We({vertexColors:!0,roughness:.6})));let f=new Ut(new pi(2.2,12,10),new ie({color:16773552,fog:!1}));f.position.y=37,d.add(f);let g=new Ut(new wn(14,200,20,1,!0),new ie({color:16773552,transparent:!0,opacity:.18,depthWrite:!1,side:Ae,blending:Kn,fog:!1})),x=new re;g.rotation.z=Math.PI/2,g.position.x=100,x.add(g),x.position.y=37,d.add(x),this.anim.push((m,p)=>{x.rotation.y=p*.7}),d.scale.setScalar(1.3)}else if(e.type==="arch"){let u=new At,f=[12739134,14253899,11818298];u.add(_t.cyl,{p:[-14,14,0],s:[8,14,8],c:f[0]}),u.add(_t.cyl,{p:[14,12,0],s:[8,12,8],c:f[1]});for(let g=0;g<=12;g++){let x=g/12*Math.PI;u.add(_t.cyl,{p:[Math.cos(x)*-14,22+Math.sin(x)*8,0],s:[4.2,5,4.2],c:f[g%3]})}u.add(_t.cyl,{p:[0,33,0],s:[20,3,7],c:15114330}),d.add(u.build(We({vertexColors:!0,roughness:.95}))),d.scale.setScalar(1.3),d.rotation.y=Math.atan2(-a*l,-o*l)}else if(e.type==="waterfall"){let u=new At;u.add(_t.sph,{p:[0,20,0],s:[34,34,22],c:10336468}),u.add(_t.sph,{p:[18,14,8],s:[18,20,14],c:12112102}),u.add(_t.sph,{p:[-20,12,6],s:[16,18,14],c:9416912}),d.add(u.build(We({vertexColors:!0,roughness:.6})));let f=is(64,256,(x,m,p)=>{let y=x.createLinearGradient(0,0,m,0);y.addColorStop(0,"#9fe4ff"),y.addColorStop(.5,"#ffffff"),y.addColorStop(1,"#9fe4ff"),x.fillStyle=y,x.fillRect(0,0,m,p);let A=zr(3);x.fillStyle="rgba(255,255,255,0.7)";for(let v=0;v<40;v++)x.fillRect(A()*m,A()*p,3,12+A()*30)}),g=new Ut(new De(14,32),new ie({map:f,transparent:!0,opacity:.85,fog:!0}));g.position.set(0,18,12),d.add(g),this.anim.push(x=>{f.offset.y-=x*.6}),d.rotation.y=Math.atan2(-a*l,-o*l)}}_boxesCoinsPads(){let t=this.tc;this.boxes=[];let e=[-6,-3,0,3,6];for(let a of t.rows)for(let o of e){let l=t.at(a,o,{});this.boxes.push({x:l.x,z:l.z,s:a,active:!0,respawn:0,scale:1})}let i=new ie({map:c_(),transparent:!0,opacity:.93,toneMapped:!1});this.boxMesh=new Mn(new Mi(1.5,1.5,1.5),i,this.boxes.length),this.boxMesh.frustumCulled=!1,this.add(this.boxMesh),this.coins=[];for(let a of t.coinGroups)for(let o=0;o<5;o++){let l=a+o*6,c=t.at(l,Math.sin(o*.9+a)*4,{});this.coins.push({x:c.x,z:c.z,active:!0,respawn:0})}let n=new cn(.55,.55,.14,18);n.rotateX(Math.PI/2),this.coinMesh=new Mn(n,We({color:16763176,emissive:11565568,emissiveIntensity:.6,metalness:.8,roughness:.25}),this.coins.length),this.coinMesh.frustumCulled=!1,this.add(this.coinMesh),this.pads=t.pads.map(a=>{let o=t.at(a,0,{});return{x:o.x,z:o.z,s:a,heading:o.heading,hw:3.4,hl:5}});let r=Ld();this.padTex=r;for(let a of this.pads){let o=new Ut(new De(a.hw*2,a.hl*2),new ie({map:r,toneMapped:!1}));o.rotation.x=-Math.PI/2,o.rotation.z=-a.heading+Math.PI,o.position.set(a.x,.09,a.z),this.add(o)}if(t.sc){let a=t.sc.p[1];this.scPad={x:a[0],z:a[1],heading:Math.atan2(t.sc.tx[1],t.sc.tz[1]),hw:2.4,hl:4.5},this.pads.push(this.scPad)}this.tmpO=new Le}update(t,e,i){this.skyMat.uniforms.time.value=e;for(let a of this.anim)a(t,e);this.padTex&&(this.padTex.offset.y=-(e*1.4%1));let n=this.tmpO,r=new Dt;this.boxes.forEach((a,o)=>{a.active||(a.respawn-=t,a.respawn<=0&&(a.active=!0,a.scale=.01)),a.active&&a.scale<1&&(a.scale=Math.min(1,a.scale+t*3)),n.position.set(a.x,1.5+Math.sin(e*2+o)*.18,a.z),n.rotation.set(e*.9+o,e*1.3,0);let l=a.active?a.scale:0;n.scale.setScalar(Math.max(l,1e-4)),n.updateMatrix(),this.boxMesh.setMatrixAt(o,n.matrix)}),this.boxMesh.instanceMatrix.needsUpdate=!0,this.coins.forEach((a,o)=>{a.active||(a.respawn-=t,a.respawn<=0&&(a.active=!0)),n.position.set(a.x,1,a.z),n.rotation.set(0,e*3+o*.7,0),n.scale.setScalar(a.active?1:1e-4),n.updateMatrix(),this.coinMesh.setMatrixAt(o,n.matrix)}),this.coinMesh.instanceMatrix.needsUpdate=!0,this.sea&&(this.sea.position.y=-.9+Math.sin(e*.8)*.08),this.sky&&i&&this.sky.position.copy(i),this.groundMesh&&i&&(this.groundMesh.position.x=i.x-i.x%33.33,this.groundMesh.position.z=i.z-i.z%33.33)}dispose(){this.scene.remove(this.group),this.group.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>{i.map&&i.map.dispose(),i.dispose()})}),this.envTex&&this.envTex.dispose()}};var ei={_comment:"Single source of truth for kart physics. Used by docs/01-game-design-document.md (generated) and by the game (src/config via esbuild JSON import).",units:"metres, seconds, radians internally; HUD speed = m/s x 4 (km/h-style readout)",topSpeed:{base:34,perStat:1.2,note:"vmax = base + perStat * S  (m/s)"},accel:{t90Base:6.4,t90PerStat:.38,note:"time to 90% of vmax on tarmac; a(v)=a0*(1-(v/vmax)^2), a0 = 1.472*vmax/t90"},brake:30,coastDrag:3,reverseMax:10,steer:{yawRateMaxDeg:105,yawPerStatDeg:3,latAccelBase:18,latAccelPerGrip:1.6,speedFade:.35,note:"yaw rate cap = (yawRateMax-ish) limited by lateral accel / v, so high speed turns wide"},grip:{normal:11,driftSlide:1.6,offroadGrip:7,note:"per-second lateral velocity decay rates"},drift:{minSpeed:17,hopImpulse:.9,angleDeg:32,innerYawMul:1.25,outerYawMul:.72,chargeSec:[.9,1.9,3.1],boostSec:[.8,1.5,2.3],boostMul:[1.14,1.22,1.3],chargeFullSteerMul:1,chargeNoSteerMul:.55,tiers:["Blue","Orange","Purple"],baseYaw:.62},startBoost:{windowSec:.28,boostSec:1.3,boostMul:1.25,earlyStallSec:1},offroad:{topMul:.55,accelMul:.6,rough:.8},boostPad:{sec:1.1,mul:1.28},item:{pod:{sec:1.8,mul:1.35},podTrio:{sec:1.4,mul:1.3,uses:3},disc:{speed:58,bounces:4,lifeSec:8,spinOutSec:1.2,speedLoss:.6},peel:{spinOutSec:.9,speedLoss:.25,throwDist:12},jolt:{armSec:1.5,shrinkSec:6,speedMul:.78,minRankToGet:6},nova:{sec:7,mul:1.2},veil:{sec:5,stealRange:25},spill:{radius:1.8,lifeSec:15,slipSec:1.2,speedLoss:.1},rocket:{speed:72,lockSec:2,spinOutSec:1.6,braceWindowSec:.25,minRankToGet:3}},bump:{kartRadius:1.15,restitution:.45,spinImpactSpeed:14,spinSec:.6,lightLoss:.15,heavyLoss:.03,massBase:.7,massPerWeight:.12,wallScrapeLoss:.08,wallHeadOnLoss:.5},draft:{minDist:4,maxDist:22,lateral:1.8,chargeSec:1.2,topMul:1.06,slingshotAfterSec:2,slingshotSec:1.2,slingshotMul:1.12},rubber:{cpuMulMin:.965,cpuMulMax:1.035,rangeM:90,cpuBaseMul:.97},class:{Light:{S:-.5,A:1,H:.5,G:0,W:-2},Medium:{S:0,A:0,H:0,G:0,W:0},Heavy:{S:.8,A:-1,H:-.5,G:.2,W:2.5}},modCapPerStat:1.5};var ft=ei,jc=(s,t,e)=>Math.max(t,Math.min(e,s)),Ud=["S","A","H","G","W"];function m_(s){return Et.bodies.find(t=>t.name===s)||Et.bodies[0]}function g_(s){let t=Et.wheels.find(o=>o.name===s.wheel)||Et.wheels[0],e=Et.wheelSizes[s.size??2],i=Et.spoilers.find(o=>o.name===s.spoiler)||Et.spoilers[0],n=Et.exhausts.find(o=>o.name===s.exhaust)||Et.exhausts[0],r=Et.bumpers.find(o=>o.name===s.bumper)||Et.bumpers[0],a={S:0,A:0,H:0,G:0,W:0};for(let o of Ud)a[o]=jc(t[o]+e[o]+i[o]+n[o]+r[o],-ei.modCapPerStat,ei.modCapPerStat);return{m:a,off:t.off,tire:t.tire}}function Hr(s,t="Medium"){let e=m_(s.body),i=ei.class[t],{m:n,off:r,tire:a}=g_(s),o={};for(let l of Ud)o[l]=jc(e[l]+i[l]+n[l],1,10);return o.vmax=ei.topSpeed.base+ei.topSpeed.perStat*o.S,o.t90=ei.accel.t90Base-ei.accel.t90PerStat*o.A,o.a0=1.472*o.vmax/o.t90,o.yawMax=ei.steer.yawRateMaxDeg*(.72+.03*o.H)*Math.PI/180,o.latAccel=ei.steer.latAccelBase+ei.steer.latAccelPerGrip*o.G,o.mass=ei.bump.massBase+ei.bump.massPerWeight*o.W,o.offTop=jc(ei.offroad.topMul+.1125*r,.4,.95),o.tire=a,o.slipMul=a==="Trail"||a==="Mud"?.5:1,o.cls=t,o.base=e,o.driftGrip=ei.grip.driftSlide+.1*(o.G-5),o}var Fd=Math.PI*2,Gr=(s,t,e)=>Math.max(t,Math.min(e,s)),Qc=(s,t,e)=>s+(t-s)*e,Vr=(s,t)=>{let e=s-t;for(;e>Math.PI;)e-=Fd;for(;e<-Math.PI;)e+=Fd;return e},il=class{constructor(t,e){this.st=t,this.track=e,this.x=0,this.z=0,this.th=0,this.phi=0,this.s=0,this.bx=0,this.bz=0,this.steer=0,this.drift={on:!1,dir:0,charge:0,tier:0,hopped:!1,hopT:0},this.hopY=0,this.hopV=0,this.grounded=!0,this.boostT=0,this.boostMul=1,this.boostKind="",this.spinT=0,this.spinTotal=0,this.spinDir=1,this.shrinkT=0,this.starT=0,this.ghostT=0,this.slipT=0,this.stallT=0,this.invulT=0,this.hint=0,this.q={},this.surf="road",this.lap=-1,this.lastS=0,this.prog=0,this.draft={t:0,on:!1,sling:0,slingT:0},this.topScale=1,this.wrongT=0,this.stuckT=0,this.scrape=0,this.shake=0,this.events=[],this.yawRate=0,this.lat=0,this.onSc=!1,this.slip=0,this.fwdSpeed=0,this.airT=0,this.lastRowId=-1,this.throttle=0}place(t,e,i){this.x=t,this.z=e,this.th=this.phi=i,this.s=0;let n=this.track.query(t,e,-1,this.q);this.hint=n.idx,this.lastS=n.s,this.prog=this.lap*this.track.length+n.s}ev(t,e){this.events.push({name:t,data:e})}get speedKmh(){return Math.abs(this.s)*4}get boosting(){return this.boostT>0}get protected(){return this.starT>0||this.ghostT>0||this.invulT>0}addBoost(t,e,i){(e>=this.boostMul||this.boostT<=0||t>this.boostT)&&(this.boostT<=0||e>=this.boostMul?(this.boostMul=Math.max(this.boostT>0?this.boostMul:1,e),this.boostT=Math.max(this.boostT,t),this.boostKind=i):this.boostT=Math.max(this.boostT,t))}spin(t,e=.5,i=0){return this.starT>0||this.ghostT>0||this.invulT>0&&t>.5?!1:(this.spinT=t,this.spinTotal=t,this.spinDir=i||(Math.random()<.5?-1:1),this.s*=1-e,this.drift.on=!1,this.drift.charge=0,this.drift.tier=0,this.boostT=Math.min(this.boostT,.2),this.invulT=t+.8,this.shake=Math.max(this.shake,.6),this.ev("spin",{sec:t}),!0)}step(t,e){let i=this.st,n=this.track,r=this.drift;this.events.length=0;let a=this.surf;for(let W of["boostT","spinT","shrinkT","starT","ghostT","slipT","stallT","invulT"])this[W]>0&&(this[W]-=t,this[W]<0&&(this[W]=0));this.boostT<=0&&(this.boostMul=1),this.shake>0&&(this.shake=Math.max(0,this.shake-t*2.4));let o=n.query(this.x,this.z,this.hint,this.q);this.hint=o.idx,this.surf=o.surface,this.lat=o.lat,this.onSc=!!o.sc;let l=1,c=1,h=1,d=1;this.starT<=0&&(this.surf==="off"?(l=i.offTop,c=ft.offroad.accelMul,h=.64,d=.75):this.surf==="rough"?(l=ft.offroad.rough,c=.85,h=.85):this.surf==="sand"?(l=.82,c=.85,h=.7,d=.8):this.surf==="ice"&&(l=1,c=.9,h=.3,d=.5)),this.boostT>0&&this.surf==="off"&&(l=Qc(l,1,.5));let u=i.vmax*l*this.topScale;this.shrinkT>0&&(u*=ft.item.jolt.speedMul),this.starT>0&&(u*=ft.item.nova.mul),this.draft.on&&(u*=ft.draft.topMul),this.boostT>0&&(u=Math.max(u,i.vmax*this.topScale*this.boostMul*(this.surf==="off"&&this.starT<=0?.9:1))),this.draft.sling>0&&(u*=ft.draft.slingshotMul,this.draft.sling-=t);let f=this.spinT>0||this.stallT>0?0:e.throttle||0,g=e.brake||0;this.throttle=f;let x=this.boostT>0?2.4:this.draft.on?1.1:1,m=this.spinT>0?.3:1;if(f>0&&this.s>=-.1)if(this.s<u){let W=i.a0*(1-Math.pow(Math.max(0,this.s)/u,2))*c*x*f;this.s+=Math.max(W,1.5*c)*t}else this.s=Math.max(u,this.s-14*t);else this.s>u&&(this.s=Math.max(u,this.s-14*t));if(g>0)this.s>.5?this.s=Math.max(0,this.s-ft.brake*g*t):this.s=Math.max(-ft.reverseMax,this.s-9*g*t);else if(f<=0){let W=Math.sign(this.s);this.s-=W*ft.coastDrag*t*(this.spinT>0?3:1),Math.sign(this.s)!==W&&(this.s=0)}this.s<0&&f>.1&&(this.s=Math.min(0,this.s+ft.brake*t));let p=this.spinT>0?0:Gr(e.steer||0,-1,1);this.steer+=(p-this.steer)*Math.min(1,t*(this.slipT>0?3:11));let y=this.steer;this.slipT>0&&(y=y*.2+Math.sin(this.slipT*14)*.7);let A=Math.abs(this.s),v=i.latAccel*d,S=Math.min(i.yawMax,v/Math.max(A,1))*Math.min(1,A/5),w=this.s>=0?1:-1;if(e.driftPressed&&this.grounded&&this.spinT<=0&&!r.on&&A>6&&(this.hopV=6.2,this.grounded=!1,this.hopY=.001,r.hopped=!0,r.hopT=.35,this.ev("hop",{})),r.hopped&&(r.hopT-=t,(!e.drift||r.hopT<-.35&&this.grounded)&&(r.hopped=!1),e.drift&&this.grounded&&!r.on&&A>=ft.drift.minSpeed&&Math.abs(y)>.2&&this.spinT<=0&&(r.on=!0,r.dir=y>0?1:-1,r.charge=0,r.tier=0,r.hopped=!1,this.ev("driftStart",{}))),r.on)if(!e.drift||A<11||this.spinT>0)this.endDrift();else{let W=y*r.dir,Q=ft.drift.chargeNoSteerMul+(ft.drift.chargeFullSteerMul-ft.drift.chargeNoSteerMul)*Gr(W,0,1);this.surf!=="off"&&(r.charge+=t*Q);let it=ft.drift.chargeSec,vt=r.charge>=it[2]?3:r.charge>=it[1]?2:r.charge>=it[0]?1:0;vt>r.tier&&(r.tier=vt,this.ev("driftTier",{tier:vt}))}let R;if(r.on){let W=y*r.dir,Q=W>=0?Qc(1,ft.drift.innerYawMul,W):Qc(1,ft.drift.outerYawMul,-W);R=-r.dir*ft.drift.baseYaw*Math.min(i.yawMax*1.2,1.35*v/Math.max(A,1))*Q}else R=-y*S*w;this.yawRate=R,this.th+=R*t;let _=Vr(this.th,this.phi),M=r.on?ft.drift.angleDeg*Math.PI/180*(.8+.3*Gr(y*r.dir,-1,1)):.5;Math.abs(_)>M&&(this.th=this.phi+Math.sign(_)*M,_=Math.sign(_)*M);let E=r.on?i.driftGrip:ft.grip.normal*h*(this.slipT>0?.4:1);if(this.phi+=Vr(this.th,this.phi)*Math.min(1,E*t),this.slip=Math.abs(Vr(this.th,this.phi)),!r.on&&A>8){let W=Math.abs(R)*A/Math.max(v,1);this.s-=Math.sign(this.s)*Math.max(0,W-.8)*8*t}r.on&&(this.s-=Math.sign(this.s)*.4*t*(A/i.vmax)),this.spinT>0&&(this.th+=this.spinDir*(Math.PI*2*2/this.spinTotal)*t,this.phi+=Vr(this.th,this.phi)*.02),this.grounded?this.airT=0:(this.hopY+=this.hopV*t,this.hopV-=28*t,this.hopY<=0&&(this.hopY=0,this.hopV=0,this.grounded=!0,this.ev("land",{})),this.airT+=t);let C=Math.sin(this.phi),P=Math.cos(this.phi);this.x+=(C*this.s+this.bx)*t,this.z+=(P*this.s+this.bz)*t;let D=Math.exp(-6*t);this.bx*=D,this.bz*=D,this.scrape=Math.max(0,this.scrape-t*4);let L=n.constrain(this.x,this.z,this.hint);if(L){let W=L.pen+1.1;this.x=L.x+L.nx*1.1,this.z=L.z+L.nz*1.1;let Q=C*this.s,it=P*this.s,vt=Q*L.nx+it*L.nz;if(vt<0){let St=Math.abs(vt)/Math.max(A,.1);this.starT<=0;{if(St<.42)this.s-=Math.sign(this.s)*ft.bump.wallScrapeLoss*A*t*6,this.scrape=1,this.ev("scrape",{v:A});else{let Z=ft.bump.wallHeadOnLoss*Gr((St-.42)/.5,.2,1);this.s*=1-Z,this.shake=Math.max(this.shake,Gr(St,.3,1)),this.ev("wallHit",{v:A,ang:St})}let ce=Q-vt*L.nx*1,Zt=it-vt*L.nz*1,ne=Math.hypot(ce+L.nx*Math.abs(vt)*.25,Zt+L.nz*Math.abs(vt)*.25);this.phi=Math.atan2(ce+L.nx*Math.abs(vt)*.25,Zt+L.nz*Math.abs(vt)*.25),this.th+=Vr(this.phi,this.th)*.35,this.drift.on&&St>.42&&this.endDrift()}}this.s>=0&&this.s<4&&(this.s=Math.max(this.s,4*(f>0?1:0)))}let O=n.query(this.x,this.z,this.hint,this.q);this.hint=O.idx,this.surf=O.surface;let X=O.s,$=n.length;this.lastS>.75*$&&X<.25*$?(this.lap++,this.ev("lap",{lap:this.lap})):this.lastS<.25*$&&X>.75*$&&this.lap--,this.lastS=X,this.prog=this.lap*$+X;let st=C*O.m.tx+P*O.m.tz;!O.sc&&st<-.25&&A>8?this.wrongT+=t:this.wrongT=Math.max(0,this.wrongT-t*2),A<2&&this.spinT<=0?this.stuckT+=t:this.stuckT=0,this.fwdSpeed=this.s}endDrift(){let t=this.drift;if(!t.on)return;let e=t.tier;t.on=!1,t.charge=0,t.tier=0,e>=1?(this.addBoost(ft.drift.boostSec[e-1],ft.drift.boostMul[e-1],"drift"+e),this.ev("driftBoost",{tier:e}),this.shake=Math.max(this.shake,.15*e)):this.ev("driftCancel",{})}};var Gs=(s,t,e)=>Math.max(t,Math.min(e,s)),Bd=Math.PI*2,x_=(s,t)=>{let e=s-t;for(;e>Math.PI;)e-=Bd;for(;e<-Math.PI;)e+=Bd;return e},nl=class{constructor(t,e,i){this.k=t,this.race=e,this.skill=i,this.lane=(Math.random()-.5)*4,this.laneT=0,this.itemT=1+Math.random()*2,this.mode="main",this.driftHold=!1,this.dd=0,this.useSc=Math.random()<.35+i*.45,this.scDecided=!1,this.mistake=0,this.nextMistake=6+Math.random()*14,this.tmp={},this.startDelay=Math.random()*.18,this.stuckT=0}input(t){let e=this.k,i=e.sim,n=this.race,r=n.track,a={steer:0,throttle:1,brake:0,drift:!1,driftPressed:!1},o=Math.abs(i.s),l=r.length,c=i.lastS,h=9+o*.42,d,u,f=r.sc,g=f&&c>f.s1-40&&c<f.s1+6;if(f&&((c<f.s1-60||c>f.s2+10)&&(this.scDecided=!1,this.mode!=="main"&&!i.onSc&&(this.mode="main")),g&&!this.scDecided&&(this.scDecided=!0,this.mode=this.useSc&&n.hazardOkForCpu(e)?"sc":"main")),this.mode==="sc"&&f){let _=i.q&&i.q.sc?i.q.sc.u:0;i.q.sc||(_=0);let M=Gs(Math.round(_*(f.n-1))+Math.round(h/2),0,f.n-1),E=f.p[M];d=E[0],u=E[1],i.q.sc&&_>.97&&(this.mode="main"),!i.q.sc&&c>f.s1+8&&(this.mode="main")}else{let _=r.linePoint(c+h,this.lane*Gs(1-Math.abs(r.lineCurv(c+h))*80,.2,1),this.tmp);d=_.x,u=_.z}this.nextMistake-=t,this.nextMistake<0&&(this.mistake=1.2,this.nextMistake=8+Math.random()*18/(.3+this.skill),this.mistakeDir=Math.random()<.5?-1:1),this.mistake>0&&(this.mistake-=t);let x=Math.atan2(d-i.x,u-i.z),m=x_(x,i.th),p=Gs(-m*2.4,-1,1);this.mistake>0&&this.skill<.95&&(p=Gs(p+this.mistakeDir*.35,-1,1));let y=r.lineSpeed(c+h*.9+o*.6)*(.9+this.skill*.12)*1.04;this.mode==="sc"&&(y=Math.min(y,40)),i.surf==="ice"&&(y*=.85),o>y*1.1&&!i.drift.on&&i.boostT<=0?(a.throttle=0,a.brake=Gs((o-y*1.1)/8,0,.9)):o>y*1.02&&!i.drift.on&&(a.throttle=.4);let A=ft.drift.baseYaw*Math.min(i.st.yawMax*1.2,1.35*i.st.latAccel/Math.max(o,1)),v=r.lineCurv(c+12+o*.3),S=r.lineCurv(c+30+o*.3),w=r.lineCurv(c+46+o*.3),R=_=>{let M=Math.abs(_)*o;return M>.8*A&&M<1.25*A};if(i.drift.on){let _=r.lineCurv(c+6),M=Math.abs(r.lineCurv(c+14))<.006||o<14||i.drift.tier>=3&&Math.abs(_)<.01;a.drift=!M&&i.surf!=="off"&&Math.abs(i.lat)<r.halfW+1&&i.drift.charge<6,a.throttle=1,a.brake=0,p=Gs(p,-1,1),this.skill<.9&&Math.random()<.0015&&(a.drift=!1)}else R(v)&&R(S)&&Math.sign(v)===Math.sign(S)&&Math.abs(w)>.006&&o>22&&i.grounded&&i.spinT<=0&&this.skill>.55&&!n.opts.noDrift&&i.surf!=="ice"&&!i.drift.hopped&&this.mode==="main"&&(!this.driftReq||this.driftReq<0)&&(this.driftReq=.6,a.driftPressed=!0,a.drift=!0,this.driftDir=v>0?-1:1);if(i.drift.hopped&&!i.drift.on&&this.driftDir&&(a.drift=!0,p=this.driftDir*Math.max(Math.abs(p),.3)),this.driftReq!==void 0&&(this.driftReq-=t),a.steer=p,n.state==="countdown"&&(a.throttle=0,n.cdT<.18+this.startDelay&&n.cdT>-.3&&this.skill>.6&&(a.throttle=1),n.cdT>.3&&(a.throttle=0)),o<3&&n.state==="racing"&&i.spinT<=0){if(this.stuckT+=t,this.stuckT>2.2){let _=r.at(i.lastS+6,0,this.tmp);i.x=_.x,i.z=_.z,i.th=i.phi=_.heading,i.s=8,this.stuckT=0,i.bx=i.bz=0}}else this.stuckT=0;return this.itemT-=t,e.item&&this.itemT<=0&&n.state==="racing"&&this.useItem(e,a),e.backHeld=!1,a}useItem(t,e){let i=this.race,n=t.sim,r=t.item.id,a=i.track.length,o=i.nearestAhead(t,45),l=i.nearestBehind(t,28),c=Math.abs(i.track.lineCurv(n.lastS+15))<.006,h=()=>{this.itemT=.6+Math.random()*1.8};r==="pod"||r==="trio"?c&&n.boostT<=0?(i.items.press(t),i.items.release(t),h()):this.itemT=.3:r==="nova"||r==="rocket"||r==="jolt"?(i.items.press(t),h()):r==="veil"?o||Math.random()<.02?(i.items.press(t),h()):this.itemT=.5:r==="disc"?o&&Math.abs(o.sim.lat-n.lat)<4?(t.backHeld=!1,i.items.press(t),t.holding&&(t.holding.t=.05),i.items.release(t),h()):l&&Math.abs(l.sim.lat-n.lat)<4?(t.backHeld=!0,i.items.press(t),i.items.release(t),t.backHeld=!1,h()):(t.holding||i.items.press(t),t.holdFor=(t.holdFor||0)+.5,this.itemT=.5,t.holdFor>8&&(i.items.release(t),t.holdFor=0,h())):(r==="peel"||r==="spill")&&(l||o&&r==="peel"&&Math.random()<.4?(i.items.press(t),t.holding&&(t.holding.t=.05),t.backHeld=r==="peel"?!o:!0,i.items.release(t),t.backHeld=!1,h()):(this.itemT=.8,t.holdFor=(t.holdFor||0)+.8,t.holdFor>10&&(i.items.press(t),i.items.release(t),t.holdFor=0,h())))}};var __="attribute float size; attribute vec4 pcolor; varying vec4 vC; uniform float scale; void main(){ vC=pcolor; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=size*scale/(-mv.z); gl_Position=projectionMatrix*mv; }",v_="varying vec4 vC; void main(){ vec2 d=gl_PointCoord-0.5; float r=length(d)*2.0; if(r>1.0) discard; float a=smoothstep(1.0,0.2,r); gl_FragColor=vec4(vC.rgb, vC.a*a); }",sl=class{constructor(t,e,i){this.n=e,this.pos=new Float32Array(e*3),this.col=new Float32Array(e*4),this.size=new Float32Array(e),this.vel=new Float32Array(e*3),this.life=new Float32Array(e),this.age=new Float32Array(e),this.s0=new Float32Array(e),this.s1=new Float32Array(e),this.c0=new Float32Array(e*4),this.c1=new Float32Array(e*4),this.grav=new Float32Array(e),this.drag=new Float32Array(e),this.head=0;let n=new fe;n.setAttribute("position",new Se(this.pos,3).setUsage(Dr)),n.setAttribute("pcolor",new Se(this.col,4).setUsage(Dr)),n.setAttribute("size",new Se(this.size,1).setUsage(Dr)),this.mat=new $e({vertexShader:__,fragmentShader:v_,transparent:!0,depthWrite:!1,blending:i?Kn:Pn,uniforms:{scale:{value:600}}}),this.pts=new $n(n,this.mat),this.pts.frustumCulled=!1,this.pts.renderOrder=5,t.add(this.pts),this.g=n;for(let r=0;r<e;r++)this.life[r]=0,this.size[r]=0}emit(t,e,i,n,r,a,o,l,c,h,d,u=0,f=0){let g=this.head;this.head=(this.head+1)%this.n;let x=g*3,m=g*4;this.pos[x]=t,this.pos[x+1]=e,this.pos[x+2]=i,this.vel[x]=n,this.vel[x+1]=r,this.vel[x+2]=a,this.life[g]=o,this.age[g]=0,this.s0[g]=l,this.s1[g]=c,this.grav[g]=u,this.drag[g]=f;for(let p=0;p<4;p++)this.c0[m+p]=h[p],this.c1[m+p]=d[p],this.col[m+p]=h[p];this.size[g]=l}update(t){for(let e=0;e<this.n;e++){if(this.life[e]<=0){this.size[e]=0;continue}this.age[e]+=t;let i=this.age[e]/this.life[e];if(i>=1){this.life[e]=0,this.size[e]=0;continue}let n=e*3,r=e*4,a=Math.max(0,1-this.drag[e]*t);this.vel[n]*=a,this.vel[n+1]=this.vel[n+1]*a-this.grav[e]*t,this.vel[n+2]*=a,this.pos[n]+=this.vel[n]*t,this.pos[n+1]+=this.vel[n+1]*t,this.pos[n+2]+=this.vel[n+2]*t,this.pos[n+1]<.05&&this.grav[e]>0&&(this.pos[n+1]=.05,this.vel[n+1]*=-.3),this.size[e]=this.s0[e]+(this.s1[e]-this.s0[e])*i;for(let o=0;o<4;o++)this.col[r+o]=this.c0[r+o]+(this.c1[r+o]-this.c0[r+o])*i}this.g.attributes.position.needsUpdate=!0,this.g.attributes.pcolor.needsUpdate=!0,this.g.attributes.size.needsUpdate=!0}},ui=(s,t=1)=>[(s>>16&255)/255,(s>>8&255)/255,(s&255)/255,t],rl=class{constructor(t,e=1){this.add=new sl(t,Math.round(1400*e),!0),this.nor=new sl(t,Math.round(900*e),!1),this.q=e,this.rgba=ui}setScale(t){this.add.mat.uniforms.scale.value=t*.9,this.nor.mat.uniforms.scale.value=t*.9}spark(t,e,i,n,r,a){let l=[16773824,5093631,16751150,12676095][n];for(let c=0;c<(this.q<.7?1:2);c++)this.add.emit(t,e,i,r*.15+(Math.random()-.5)*4,2+Math.random()*3,a*.15+(Math.random()-.5)*4,.35+Math.random()*.2,.55,.1,ui(l,1),ui(l,0),14,1)}flame(t,e,i,n,r,a){this.add.emit(t,e,i,n*.6+(Math.random()-.5),.2+Math.random()*.6,r*.6+(Math.random()-.5),.28+Math.random()*.12,1,.15,ui(a,.9),ui(16777215,0),0,1.5)}dust(t,e,i,n,r,a=1){this.nor.emit(t,.15,e,(Math.random()-.5)*2+i*.1,.8+Math.random()*.8,(Math.random()-.5)*2+n*.1,.7+Math.random()*.4,.8*a,2.8*a,ui(r,.55),ui(r,0),0,1.2)}burst(t,e,i,n,r=16,a=8){for(let o=0;o<r;o++){let l=Math.random()*Math.PI*2,c=Math.random()*1.2;this.add.emit(t,e,i,Math.cos(l)*a*(.4+Math.random()),2+Math.random()*a*.5,Math.sin(l)*a*(.4+Math.random()),.5+Math.random()*.4,.9,.1,ui(n,1),ui(n,0),10,1.5)}}ring(t,e,i,n){for(let r=0;r<20;r++){let a=r/20*Math.PI*2;this.add.emit(t,e,i,Math.cos(a)*9,.3,Math.sin(a)*9,.5,.8,.1,ui(n,1),ui(n,0),0,3)}}update(t){this.add.update(t),this.nor.update(t)}dispose(t){t.remove(this.add.pts),t.remove(this.nor.pts),this.add.g.dispose(),this.nor.g.dispose()}};var kd=s=>{let t=Math.sin(s*12.9898+4.1414)*43758.5453;return t-Math.floor(t)},dn=(s={})=>Ki(new Ge({vertexColors:!0,roughness:.7,metalness:.05,...s}),16777215,2.4,.2),al=class{constructor(t){this.race=t;let e=this.tc=t.track;this.scene=t.scene,this.list=[],this.group=new re,this.scene.add(this.group);let i=e.length,n=o=>(e.reverse?1-o:o)*i,r=o=>{let l=o,c=1e9;for(let h=-50;h<=50;h+=4){let d=Math.abs(e.k[(Math.round((o+h)/e.step)%e.N+e.N)%e.N])+Math.abs(h)*5e-5;d<c&&(c=d,l=o+h)}return(l%i+i)%i},a=0;for(let o of e.meta.hazards||[]){let l=a++;o.type==="sheep"?this.list.push(this._sheep(l,r(n(o.f)))):o.type==="crane"?this.list.push(this._crane(l,r(n(o.f)))):o.type==="boulder"?this.list.push(this._boulder(l,r(n(o.f)))):o.type==="icicle"?this.list.push(this._icicle(l,r(n(o.f)))):o.type==="gate"&&e.sc&&this.list.push(this._gate(l))}}_sign(t,e=16765503){let i=this.tc.at(t-28,this.tc.halfW+2.2,{}),n=new At;n.add(_t.cyl,{p:[i.x,1.2,i.z],s:[.1,1.2,.1],c:3817290}),n.add(_t.cone,{p:[i.x,2.7,i.z],r:[0,Math.PI/6,0],s:[.95,.9,.95],c:e});let r=n.build(dn());this.group.add(r)}_sheep(t,e){let i=this.tc;this._sign(e);let n=[],r=new re;this.group.add(r);let a=new At;a.add(_t.sph,{p:[0,.75,0],s:[.8,.65,1],c:16249834}),a.add(_t.sph,{p:[.3,1,-.2],s:[.45,.4,.45],c:16776436}),a.add(_t.sph,{p:[-.3,1,.2],s:[.45,.4,.45],c:16776436}),a.add(_t.sph,{p:[0,1,.95],s:[.34,.36,.4],c:2763312});for(let[l,c]of[[-.4,.5],[.4,.5],[-.4,-.5],[.4,-.5]])a.add(_t.cyl,{p:[l,.25,c],s:[.09,.25,.09],c:2763312});let o=a.build(dn());for(let l=0;l<4;l++){let c=o.clone();c.material=o.material,r.add(c),n.push(c)}return{type:"sheep",id:t,s:e,cycle:15,off:3+t*4,root:r,sheep:n,update:l=>this._upSheep(this.list.find(c=>c.id===t),l),check:(l,c)=>this._chkSheep(this.list.find(h=>h.id===t),l,c)}}_sheepPos(t,e,i){let n=this.tc,r=(e+t.off)%t.cycle,o=Math.floor((e+t.off)/t.cycle)%2?1:-1,l;r<8?l=-1:r<10?l=0:r<15?l=(r-10)/5:l=1;let c=n.limit-.5,h=r<10?o*(c+1):o*(c+1)-o*(c*2+2)*l,d=(i-1.5)*4.2;return{lat:h,ds:d,ph:r,u:l,hidden:r<8||r>=15}}_upSheep(t,e){let i=this.tc;t.sheep.forEach((n,r)=>{let a=this._sheepPos(t,e,r);if(n.visible=!a.hidden||a.ph>=15&&!1,a.hidden){n.visible=!1;return}let o=i.at(t.s+a.ds,a.lat,{});n.position.set(o.x,.08*Math.abs(Math.sin(e*9+r*2))*(a.ph>=10?1:0),o.z);let c=Math.floor((e+t.off)/t.cycle)%2?1:-1;n.rotation.y=Math.atan2(o.tz*0+-c*o.tz*-1,0)+o.heading+-c*Math.PI/2*1})}_chkSheep(t,e,i){let n=this.tc;for(let r=0;r<4;r++){let a=this._sheepPos(t,i,r);if(a.hidden||a.ph<10)continue;let o=n.at(t.s+a.ds,a.lat,{});if(Math.hypot(o.x-e.sim.x,o.z-e.sim.z)<1.9)return{x:o.x,z:o.z,kind:"sheep",spin:.8,loss:.4}}return null}_crane(t,e){let i=this.tc,r=i.at(e,1*(i.limit+3),{}),a=new re;a.position.set(r.x,0,r.z),a.rotation.y=r.heading,this.group.add(a);let o=new At;o.add(_t.sbox,{p:[0,12,0],s:[1.6,24,1.6],c:16758812}),o.add(_t.sbox,{p:[0,24.5,0],s:[1.6,1.2,1.6],c:16758812}),o.add(_t.sbox,{p:[0,.6,0],s:[4,1.2,4],c:4869978});let l=i.limit+3;o.add(_t.sbox,{p:[-l/2+2,24.6,0],s:[l+8,.9,1],c:16758812});let c=o.build(dn({metalness:.2}));a.add(c);let h=new re;a.add(h);let d=new At;d.add(_t.cyl,{p:[0,0,0],s:[.05,1,.05],c:2236962});let u=d.build(dn());h.add(u);let f=new At;f.add(_t.sbox,{p:[0,0,0],s:[3,2.6,5.4],c:[15029052,3117224,15906106][t%3]});for(let m=-2;m<=2;m++)f.add(_t.sbox,{p:[0,0,m*1],s:[3.06,2.4,.08],c:48});let g=f.build(dn({roughness:.5}));h.add(g);let x=new Ut(new hn(1.6,2.2,28),new ie({color:16726832,transparent:!0,opacity:0,side:Ae,depthWrite:!1}));return x.rotation.x=-Math.PI/2,x.position.y=.12,this.group.add(x),{type:"crane",id:t,s:e,cycle:6,off:t*2.3,hang:h,cable:u,box:g,ring:x,root:a,update:m=>this._upCrane(this.list.find(p=>p.id===t),m),check:(m,p)=>this._chkCrane(this.list.find(y=>y.id===t),m,p)}}_cranePos(t,e){let i=(e+t.off)%t.cycle,n=5.8*Math.sin((e+t.off)*.85),r=6.5,a=!1;i>2.3&&i<3?r=6.5-(i-2.3)/.7*5.2:i>=3&&i<4.4?(r=1.3,a=!0):i>=4.4&&i<5&&(r=1.3+(i-4.4)/.6*5.2);let o=i>1.4&&i<4.4;return{lat:n,y:r,danger:a,warn:o,ph:i}}_upCrane(t,e){let i=this.tc,n=this._cranePos(t,e),r=i.at(t.s,n.lat,{});t.hang.position.set(0,0,0);let a=t.root,o=new k(r.x,n.y,r.z);a.worldToLocal(o),t.hang.position.copy(o),t.hang.rotation.y=0,t.cable.position.y=12.5,t.cable.scale.set(1,12.5-n.y+1e-4,1),t.cable.position.y=(24.5-1.3)/2+.6,t.cable.scale.y=24.5-n.y,t.cable.position.set(0,(24.5+0)/2*0+(24.5-n.y)/2,0),t.cable.parent.updateMatrix(),t.ring.position.set(r.x,.12,r.z),t.ring.material.opacity=n.warn?.35+.35*Math.sin(e*14):0,t.ring.rotation.z=r.heading}_chkCrane(t,e,i){let n=this._cranePos(t,i);if(!n.danger)return null;let r=this.tc.at(t.s,n.lat,{});return Math.abs(r.x-e.sim.x)<2.4&&Math.abs(r.z-e.sim.z)<3.4&&Math.hypot(r.x-e.sim.x,r.z-e.sim.z)<3.6?{x:r.x,z:r.z,kind:"crane",spin:1,loss:.5}:null}_boulder(t,e){this._sign(e,16742954);let i=new re,n=new At;n.add(_t.sph,{p:[0,0,0],s:[2.2,2.2,2.2],c:10119754}),n.add(_t.sph,{p:[1.2,1,.5],s:[.9,.9,.9],c:12091488}),n.add(_t.sph,{p:[-.8,-.9,1],s:[.8,.8,.8],c:8014384}),n.add(_t.sph,{p:[-1,.8,-1.1],s:[.7,.7,.7],c:11040856});let r=n.build(dn({roughness:.95}));i.add(r),this.group.add(i);let a=new Ut(new Zn(2.4,20),new ie({color:0,transparent:!0,opacity:.35,depthWrite:!1}));return a.rotation.x=-Math.PI/2,a.position.y=.11,this.group.add(a),{type:"boulder",id:t,s:e,cycle:10,off:t*3.1,mesh:i,b:r,sh:a,update:o=>this._upBoulder(this.list.find(l=>l.id===t),o),check:(o,l)=>this._chkBoulder(this.list.find(c=>c.id===t),o,l)}}_boulderPos(t,e){let i=(e+t.off)%t.cycle,r=Math.floor((e+t.off)/t.cycle)%2?1:-1,a=this.tc.limit-1.8,o=i<2?-1:i<5?(i-2)/3:2;return{lat:r*a-r*2*a*Math.min(Math.max(o,0),1),rolling:o>=0&&o<=1,warn:i<2,u:o,side:r,ph:i}}_upBoulder(t,e){let i=this.tc,n=this._boulderPos(t,e),r=i.at(t.s,n.lat,{});if(t.mesh.visible=n.rolling||n.ph<2&&!1,n.rolling)t.mesh.position.set(r.x,2.2+Math.abs(Math.sin(e*6))*.15,r.z),t.b.rotation.x=-n.side*e*4,t.b.rotation.z=e*2;else if(n.warn){t.mesh.visible=!0;let a=i.at(t.s,n.side*(i.limit+3.5),{});t.mesh.position.set(a.x,2.2+2*Math.max(0,1-n.ph/2)*0,a.z),t.mesh.position.y=2.2+Math.sin(e*40)*.08}t.sh.visible=n.rolling||n.warn,t.sh.position.set(t.mesh.position.x,.11,t.mesh.position.z),t.sh.material.opacity=n.warn?.2+.2*Math.sin(e*12):.35}_chkBoulder(t,e,i){let n=this._boulderPos(t,i);if(!n.rolling)return null;let r=this.tc.at(t.s,n.lat,{});return Math.hypot(r.x-e.sim.x,r.z-e.sim.z)<3?{x:r.x,z:r.z,kind:"boulder",spin:1.2,loss:.6}:null}_icicle(t,e){let i=new At;i.add(_t.cone,{p:[0,0,0],r:[Math.PI,0,0],s:[1,5.4,1],c:13627903}),i.add(_t.cone,{p:[.8,-.8,.3],r:[Math.PI,0,.1],s:[.5,3.2,.5],c:11067647});let n=i.build(dn({roughness:.1,metalness:.1,envMapIntensity:1.6}));n.visible=!1,this.group.add(n);let r=new Ut(new hn(.6,1.1,24),new ie({color:16726832,transparent:!0,opacity:0,side:Ae,depthWrite:!1}));return r.rotation.x=-Math.PI/2,r.position.y=.12,this.group.add(r),{type:"icicle",id:t,s:e,cycle:7.5,off:t*2.1,ice:n,sh:r,fx:0,update:a=>this._upIcicle(this.list.find(o=>o.id===t),a),check:(a,o)=>this._chkIcicle(this.list.find(l=>l.id===t),a,o)}}_iciclePos(t,e){let i=(e+t.off)%t.cycle,n=Math.floor((e+t.off)/t.cycle),r=(kd(n*7+t.id)-.5)*2*(this.tc.halfW-3.2),a=(kd(n*3+t.id*5)-.5)*30;return{lat:r,sOff:a,ph:i,ci:n,warn:i<1.5,falling:i>=1.5&&i<1.7,down:i>=1.7&&i<3,impact:i>=1.5&&i<1.62}}_upIcicle(t,e){let i=this.tc,n=this._iciclePos(t,e),r=i.at(t.s+n.sOff,n.lat,{});t.sh.position.set(r.x,.12,r.z),t.sh.visible=n.warn||n.falling,t.sh.material.opacity=n.warn?.25+.5*(n.ph/1.5):0;let a=n.warn?.6+1.6*(n.ph/1.5):2.2;if(t.sh.scale.setScalar(a),n.falling||n.down){t.ice.visible=!0;let o=n.falling?24*(1-(n.ph-1.5)/.2)+2.6:2.6;t.ice.position.set(r.x,o,r.z),t.ice.scale.setScalar(n.down?Math.max(.01,1-(n.ph-2.4)/.6):1)}else t.ice.visible=!1;t.lastCi=n.ci}_chkIcicle(t,e,i){let n=this._iciclePos(t,i);if(!n.impact)return null;let r=this.tc.at(t.s+n.sOff,n.lat,{});return Math.hypot(r.x-e.sim.x,r.z-e.sim.z)<2.7?{x:r.x,z:r.z,kind:"icicle",spin:.9,loss:.5}:null}_gate(t){let e=this.tc,i=e.sc,n=9,r=i.p[n],a=i.tx[n],o=i.tz[n],l=new re;l.position.set(r[0],0,r[1]),l.rotation.y=Math.atan2(a,o),this.group.add(l);let c=new At;for(let f of[-1,1])c.add(_t.sbox,{p:[f*(i.half+.6),1.5,0],s:[.9,3,.9],c:2831430});c.add(_t.sbox,{p:[i.half+.6,3.2,0],s:[.5,.9,.5],c:1711396}),l.add(c.build(dn()));let h=new re;h.position.set(-(i.half+.6),1.9,0);let d=new At;for(let f=0;f<6;f++)d.add(_t.sbox,{p:[(f+.5)*(i.half*2+1.2)/6,0,0],s:[(i.half*2+1.2)/6,.45,.45],c:f%2?16777215:14694956});h.add(d.build(dn())),l.add(h);let u=new Ut(new pi(.35,10,8),new ie({color:3407718,fog:!1}));return u.position.set(i.half+.6,3.5,0),l.add(u),{type:"gate",id:t,i:n,arm:h,lamp:u,cycle:6,off:1,p:r,tx:a,tz:o,update:f=>this._upGate(this.list.find(g=>g.id===t),f),check:(f,g)=>this._chkGate(this.list.find(x=>x.id===t),f,g)}}_gateClosed(t,e){return(e+t.off)%t.cycle>=3.5}_gateAmt(t,e){let i=(e+t.off)%t.cycle;return i<3.2?0:i<3.5?(i-3.2)/.3:i<5.8?1:1-(i-5.8)/.2}_upGate(t,e){let i=this._gateAmt(t,e);t.arm.rotation.z=(1-i)*1.45,t.lamp.material.color.setHex(i>.5?16726832:3407718)}_chkGate(t,e,i){if(this._gateAmt(t,i)<.6)return null;let n=e.sim.x-t.p[0],r=e.sim.z-t.p[1],a=n*t.tx+r*t.tz,o=n*t.tz-r*t.tx;return Math.abs(a)<1.4&&Math.abs(o)<this.tc.sc.half?{x:t.p[0],z:t.p[1],kind:"gate",bounce:!0,along:Math.sign(a)||1,tx:t.tx,tz:t.tz}:null}update(t){for(let e of this.list)e.update(t)}check(t,e){for(let i of this.list){let n=i.check(t,e);if(n)return n.h=i,n}return null}telegraph(t){let e=[];for(let i of this.list){if(i.type==="sheep"){let n=this._sheepPos(i,t,0);n.ph>=8&&n.ph<8.05&&e.push({h:i,snd:"item_ready",s:i.s})}if(i.type==="crane"){let n=this._cranePos(i,t);n.ph>1.4&&n.ph<1.45&&e.push({h:i,snd:"horn",s:i.s})}if(i.type==="boulder"){let n=this._boulderPos(i,t);n.ph<.05&&e.push({h:i,snd:"wall_hit",s:i.s,lp:500}),n.ph>2&&n.ph<2.05&&e.push({h:i,snd:"crash_big",s:i.s,lp:900})}if(i.type==="icicle"){let n=this._iciclePos(i,t);n.ph>=1.5&&n.ph<1.53&&e.push({h:i,snd:"disc_pop",s:i.s,rate:1.6})}}return e}dispose(){this.scene.remove(this.group),this.group.traverse(t=>{t.geometry&&t.geometry.dispose()})}};var y_=(s,t,e)=>Math.max(t,Math.min(e,s)),th={pod:{name:"Turbo Pod",color:"#37e08a"},trio:{name:"Pod Trio",color:"#37e08a"},disc:{name:"Rebound Disc",color:"#35a7ff"},peel:{name:"Peel Trap",color:"#ffd23f"},spill:{name:"Slick Spill",color:"#9b6bff"},rocket:{name:"Hornet Rocket",color:"#ff4d4d"},jolt:{name:"Storm Jolt",color:"#fff25a"},nova:{name:"Nova Core",color:"#ffb02e"},veil:{name:"Phantom Veil",color:"#b9a7ff"}},b_={1:{pod:16,trio:5,disc:22,peel:26,spill:15,veil:12},2:{pod:15,trio:10,disc:18,peel:12,spill:8,veil:12,nova:5,rocket:12},3:{pod:12,trio:14,disc:10,peel:6,spill:4,veil:10,nova:10,rocket:14,jolt:14},4:{pod:10,trio:16,disc:5,veil:8,nova:14,rocket:16,jolt:16}};function M_(s,t,e=Math.random,i=!1){let n=s<=2?1:s<=5?2:s<=8?3:4,r={...b_[n]};t<=4&&(delete r.jolt,s>1&&(r.rocket=r.rocket||0)),s<ft.item.rocket.minRankToGet&&delete r.rocket,s<ft.item.jolt.minRankToGet&&delete r.jolt,i&&delete r.jolt;let a=0;for(let l in r)a+=r[l];let o=e()*a;for(let l in r)if(o-=r[l],o<=0)return l;return"pod"}var ll=(s,t={})=>s.build(Ki(new Ge({vertexColors:!0,roughness:.4,metalness:.25,...t}),16777215,2.2,.5));function S_(){let s=new At;return s.add(_t.cyl,{p:[0,.3,0],s:[.75,.12,.75],c:3516415}),s.add(_t.tor,{p:[0,.3,0],r:[Math.PI/2,0,0],s:[.78,.78,1.2],c:16777215}),s.add(_t.cyl,{p:[0,.38,0],s:[.3,.1,.3],c:16765503}),ll(s,{emissive:670310,emissiveIntensity:.8})}function w_(){let s=new At;for(let t=0;t<4;t++){let e=t*Math.PI/2;s.add(_t.cone,{p:[Math.sin(e)*.35,.3,Math.cos(e)*.35],r:[.5*Math.cos(e),0,-.5*Math.sin(e)],s:[.22,.75,.22],c:16765503})}return s.add(_t.sph,{p:[0,.2,0],s:[.35,.2,.35],c:15775744}),ll(s)}function T_(){let s=new At;return s.add(_t.cyl,{p:[0,.04,0],s:[1.8,.04,1.8],c:2101306}),s.add(_t.cyl,{p:[.4,.08,.2],s:[.8,.04,.7],c:6962128}),s.add(_t.sph,{p:[-.8,.12,-.5],s:[.28,.12,.28],c:10185727}),ll(s,{roughness:.1,metalness:.6,envMapIntensity:1.6})}function E_(){let s=new At;s.add(_t.cap,{p:[0,0,0],r:[Math.PI/2,0,0],s:[.38,.9,.38],c:16119285}),s.add(_t.cone,{p:[0,0,1.05],r:[Math.PI/2,0,0],s:[.4,.8,.4],c:16731469});for(let i=0;i<3;i++){let n=i*2.094;s.add(_t.sbox,{p:[Math.sin(n)*.35,Math.cos(n)*.35,-.9],r:[0,0,-n],s:[.05,.5,.5],c:16731469})}let t=ll(s),e=new re;return e.add(t),e}var ol=class{constructor(t){this.race=t,this.objs=[],this.nextId=1,this.group=new re,t.scene.add(this.group),this.jolt=null,this.meshes={disc:S_(),peel:w_(),spill:T_(),rocket:E_()},this.beepT=0}dispose(){this.race.scene.remove(this.group)}startRoll(t){t.item||t.roll||(t.roll={t:0,dur:1.5,last:-1},this.race.onEvent("roll",{k:t}))}updateRoll(t,e){if(!t.roll)return;t.roll.t+=e;let i=Math.floor(t.roll.t/.09);if(i!==t.roll.last&&(t.roll.last=i,this.race.onEvent("rollTick",{k:t,tick:i})),t.roll.t>=t.roll.dur){let n=t.place,r=this.race.karts.length,a=M_(n,r,this.race.rnd,!!this.jolt);t.roll=null,t.item={id:a,n:a==="trio"?3:1},this.race.onEvent("itemGot",{k:t,id:a})}}press(t){t.sim.spinT>0;let e=this.race;if(t.lockT>0&&t.item&&t.sim.protected===!1){for(let n of this.objs)if(n.type==="rocket"&&n.target===t&&!n.dead&&n.tProg-n.rs<26){t.braceT=ft.item.rocket.braceWindowSec+.2,t.item.n--,t.item.n<=0&&(t.item=null),e.onEvent("braceTry",{k:t});return}}if(!t.item)return;let i=t.item.id;if(t.pressT=e.t,i==="disc"||i==="peel"){t.holding={id:i,t:0};return}this.fire(t,i,{})}release(t){if(!t.holding)return;let e=t.holding;t.holding=null,!(!t.item||t.item.id!==e.id)&&this.fire(t,e.id,{held:e.t>.22,back:!!t.backHeld})}tickHold(t,e){t.holding&&(t.holding.t+=e,t.holding.t>.22&&!t.shield&&(t.shield=t.holding.id,this.race.onEvent("shieldUp",{k:t}))),!t.holding&&t.shield&&(t.shield=null)}fire(t,e,i){let n=this.race,r=t.sim,a=()=>{t.item.n--,t.item.n<=0&&(t.item=null),t.shield=null};switch(e){case"pod":r.addBoost(ft.item.pod.sec,ft.item.pod.mul,"pod"),r.ev("podBoost",{}),a(),n.onEvent("use",{k:t,id:e});break;case"trio":if(t.trioCd>0)return;r.addBoost(ft.item.podTrio.sec,ft.item.podTrio.mul,"pod"),t.trioCd=.6,a(),n.onEvent("use",{k:t,id:e});break;case"nova":r.starT=ft.item.nova.sec,r.shrinkT=0,a(),n.onEvent("use",{k:t,id:e});break;case"veil":{r.ghostT=ft.item.veil.sec,a();let o=null,l=ft.item.veil.stealRange;for(let c of n.karts){if(c===t||!c.item||c.sim.starT>0||c.shield)continue;let h=c.sim.prog-r.prog;h>0&&h<l&&Math.hypot(c.sim.x-r.x,c.sim.z-r.z)<l+5&&(l=h,o=c)}o&&(t.item=o.item,o.item=null,o.roll=null,n.onEvent("steal",{k:t,from:o})),n.onEvent("use",{k:t,id:e});break}case"jolt":this.jolt={owner:t,t:ft.item.jolt.armSec},a(),n.onEvent("use",{k:t,id:e}),n.onEvent("joltArm",{k:t});break;case"disc":this.spawnDisc(t,i.back),a(),n.onEvent("use",{k:t,id:e});break;case"peel":i.held&&!i.back?this.spawnPeel(t,!0):this.spawnPeel(t,!1),a(),n.onEvent("use",{k:t,id:e});break;case"spill":this.spawnSpill(t),a(),n.onEvent("use",{k:t,id:e});break;case"rocket":this.spawnRocket(t),a(),n.onEvent("use",{k:t,id:e});break}}_add(t){return t.id=t.id||this.race.netId+"-"+this.nextId++,this.objs.push(t),t.mesh&&this.group.add(t.mesh),t}spawnDisc(t,e,i){let n=t.sim,r=n.th+(e?Math.PI:0),a=ft.item.disc.speed,o=this.meshes.disc.clone();return o.material=this.meshes.disc.material,this._add({type:"disc",owner:t,x:n.x+Math.sin(r)*2.4,z:n.z+Math.cos(r)*2.4,vx:Math.sin(r)*a,vz:Math.cos(r)*a,bounces:ft.item.disc.bounces,life:ft.item.disc.lifeSec,arm:.15,mesh:o,id:i&&i.id})}spawnPeel(t,e){let i=t.sim,n=this.meshes.peel.clone();n.material=this.meshes.peel.material;let r={type:"peel",owner:t,mesh:n,arm:.35,life:60};return e?(r.x=i.x+Math.sin(i.th)*2.5,r.z=i.z+Math.cos(i.th)*2.5,r.tx=i.x+Math.sin(i.th)*ft.item.peel.throwDist,r.tz=i.z+Math.cos(i.th)*ft.item.peel.throwDist,r.fx=r.x,r.fz=r.z,r.flight=.6,r.ft=0):(r.x=i.x-Math.sin(i.th)*2.6,r.z=i.z-Math.cos(i.th)*2.6),this._add(r)}spawnSpill(t){let e=t.sim,i=this.meshes.spill.clone();return i.material=this.meshes.spill.material,this._add({type:"spill",owner:t,x:e.x-Math.sin(e.th)*2.8,z:e.z-Math.cos(e.th)*2.8,arm:.3,life:ft.item.spill.lifeSec,mesh:i})}spawnRocket(t){let e=this.race,i=t.sim,n=e.ranked,r=null,a=n.indexOf(t);a>0&&(r=n[a-1]);let o=this.meshes.rocket.clone(),l={type:"rocket",owner:t,rs:i.prog+3,lat:i.lat,speed:ft.item.rocket.speed,target:r,straight:!r,life:r?9:3.5,mesh:o,dir:i.th,x:i.x,z:i.z};return r&&(r.lockT=ft.item.rocket.lockSec+1.2,e.onEvent("lock",{k:r,by:t})),this._add(l)}update(t){let e=this.race,i=e.track,n=e.t;if(this.jolt&&(this.jolt.t-=t,this.jolt.t<=0)){let r=this.jolt.owner;for(let a of e.karts)if(!(a===r||a.sim.prog<=r.sim.prog)){if(a.sim.starT>0||a.sim.ghostT>0){e.onEvent("joltBlocked",{k:a});continue}a.sim.shrinkT=ft.item.jolt.shrinkSec,a.sim.s*=.82,a.shield=null,a.holding=null,a.item&&(a.item.id==="disc"||a.item.id),e.onEvent("joltHit",{k:a})}e.onEvent("joltFire",{k:r}),this.jolt=null}for(let r=this.objs.length-1;r>=0;r--){let a=this.objs[r];if(a.life-=t,a.arm>0&&(a.arm-=t),a.type==="disc"){a.x+=a.vx*t,a.z+=a.vz*t;let o=i.constrain(a.x,a.z,a.hint);if(o){a.x=o.x+o.nx*.8,a.z=o.z+o.nz*.8;let l=a.vx*o.nx+a.vz*o.nz;a.vx-=2*l*o.nx,a.vz-=2*l*o.nz,a.bounces--,e.onEvent("discBounce",{o:a}),a.bounces<0&&(a.dead=!0,e.onEvent("discPop",{o:a}))}if(!a.dead&&a.arm<=0){for(let l of e.karts)if(l.auth&&Math.hypot(l.sim.x-a.x,l.sim.z-a.z)<1.6){this.hitKart(l,a,ft.item.disc.spinOutSec,ft.item.disc.speedLoss,"disc"),a.dead=!0;break}}if(!a.dead)for(let l of this.objs)l!==a&&l.type==="disc"&&!l.dead&&Math.hypot(l.x-a.x,l.z-a.z)<1.3&&a.arm<=0&&l.arm<=0&&(a.dead=l.dead=!0,e.onEvent("discPop",{o:a}));a.mesh&&(a.mesh.position.set(a.x,.2,a.z),a.mesh.rotation.y+=t*14)}else if(a.type==="peel"){if(a.flight){a.ft+=t;let o=Math.min(1,a.ft/a.flight);a.x=a.fx+(a.tx-a.fx)*o,a.z=a.fz+(a.tz-a.fz)*o,a.y=Math.sin(o*Math.PI)*2.2,o>=1&&(a.flight=0,a.y=0,e.onEvent("peelLand",{o:a}))}else a.y=0;if(a.arm<=0&&!a.flight){for(let o of e.karts)if(o.auth&&Math.hypot(o.sim.x-a.x,o.sim.z-a.z)<1.5){this.hitKart(o,a,ft.item.peel.spinOutSec,ft.item.peel.speedLoss,"peel"),a.dead=!0;break}}a.mesh&&(a.mesh.position.set(a.x,a.y||0,a.z),a.mesh.rotation.y+=t*2)}else if(a.type==="spill"){if(a.arm<=0)for(let o of e.karts)o.auth&&o.sim.slipT<=0&&o.sim.ghostT<=0&&o.sim.starT<=0&&o.sim.grounded&&Math.hypot(o.sim.x-a.x,o.sim.z-a.z)<ft.item.spill.radius&&(o.sim.slipT=ft.item.spill.slipSec,o.sim.s*=1-ft.item.spill.speedLoss,e.onEvent("slip",{k:o,o:a}));a.mesh&&(a.mesh.position.set(a.x,.04,a.z),a.mesh.scale.setScalar(Math.min(1,a.life<2?a.life/2:1)))}else a.type==="rocket"&&this.updateRocket(a,t);(a.life<=0||a.dead)&&(a.mesh&&this.group.remove(a.mesh),this.objs.splice(r,1))}for(let r of e.karts)r.lockT>0&&(r.lockT-=t),r.braceT>0&&(r.braceT-=t),r.trioCd>0&&(r.trioCd-=t)}hitKart(t,e,i,n,r){let a=this.race;t.sim.protected&&!(t.sim.invulT>0&&t.sim.starT<=0&&t.sim.ghostT<=0&&!1)&&(t.sim.starT>0||t.sim.ghostT>0)||t.sim.spin(i,n)&&(t.lastHitBy=e.owner,t.shield=null,t.holding=null,a.onEvent("hit",{k:t,o:e,kind:r}),e.owner&&e.owner!==t&&a.onEvent("hitOther",{k:e.owner,victim:t,kind:r}))}updateRocket(t,e){let i=this.race,n=i.track,r=n.length,a=t.target,o=!1;if(t.straight){t.rs+=t.speed*e;let c=n.at(t.rs,t.lat,{});t.x=c.x,t.z=c.z,t.dir=c.heading;for(let h of i.karts)if(h!==t.owner&&h.auth&&Math.hypot(h.sim.x-t.x,h.sim.z-t.z)<2.2){Od(this,h,t),t.dead=!0;break}}else{t.tProg=a.sim.prog,t.rs+=t.speed*e;let c=t.tProg-t.rs;t.lat+=(a.sim.lat-t.lat)*Math.min(1,e*3.5);let h=n.at(t.rs,t.lat,{});if(t.x=h.x,t.z=h.z,t.dir=h.heading,c<4){let d=a.sim.x-t.x,u=a.sim.z-t.z,f=Math.hypot(d,u);t.x+=d*Math.min(1,.5),t.z+=u*Math.min(1,.5),t.dir=Math.atan2(d,u),(f<3.2||c<-1)&&(o=!0)}if(a.braceT>0&&c<22&&c>-2){t.dead=!0,i.onEvent("braceOk",{k:a,o:t}),a.braceT=0,a.item=a.item;return}o&&(t.dead=!0,a.auth?Od(this,a,t):i.onEvent("rocketHitRemote",{k:a,o:t})),!t.dead&&t.rs-t.owner.sim.prog>420&&(t.dead=!0)}t.mesh&&(t.mesh.position.set(t.x,.9,t.z),t.mesh.rotation.y=t.dir),this.beepT-=e;let l=i.localKart;if(l&&t.target===l&&this.beepT<=0){let c=t.tProg-t.rs;this.beepT=y_(c/220,.07,.4),i.onEvent("rocketBeep",{k:l,gap:c})}}};function Od(s,t,e){let i=s.race;if(t.sim.starT>0||t.sim.ghostT>0){i.onEvent("rocketBlocked",{k:t});return}if(t.braceT>0){i.onEvent("braceOk",{k:t,o:e}),t.braceT=0;return}t.sim.spin(ft.item.rocket.spinOutSec,.7)&&(t.lastHitBy=e.owner,t.shield=null,t.holding=null,i.onEvent("hit",{k:t,o:e,kind:"rocket"}),i.onEvent("rocketExplode",{k:t,o:e}),e.owner!==t&&i.onEvent("hitOther",{k:e.owner,victim:t,kind:"rocket"}))}var we=(s,t,e)=>Math.max(t,Math.min(e,s)),gi=(s,t,e)=>s+(t-s)*e,zd=Math.PI*2,Wr=(s,t)=>{let e=s-t;for(;e>Math.PI;)e-=zd;for(;e<-Math.PI;)e+=zd;return e},Xr=1/60;var cl=null;function A_(){if(cl)return cl;let s=document.createElement("canvas");s.width=s.height=64;let t=s.getContext("2d"),e=t.createRadialGradient(32,32,2,32,32,31);return e.addColorStop(0,"rgba(0,0,0,0.55)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),cl=new ln(s),cl}var Hd={road:12106948,off:10259034,rough:11901546,sand:14926467,ice:15267583},hl=class{constructor(t){Object.assign(this,{scene:t.scene,renderer:t.renderer,camera:t.camera,audio:t.audio,ui:t.ui||(()=>{}),net:t.net||null}),this.opts=t,this.laps=t.laps||3,this.itemsOn=t.itemsOn!==!1,this.rnd=t.rnd||Math.random,this.netId=t.netId||"L",this.quality=t.quality||1,this.t=0,this.state="grid",this.cdT=3.999,this.stateT=0,this.acc=0,this.goTime=0,this.finishedCount=0,this.results=null,this.cam={yaw:0,pos:new k,look:new k,fov:62,shake:0,back:!1,introT:0},this.track=Jo(t.trackId,{mirror:!!t.mirror,reverse:!!t.reverse}),this.view=new el(this.track,this.scene,this.renderer,{hq:t.hq}),this.fx=new rl(this.scene,this.quality),this.hazards=new al(this),this.items=new ol(this),this.karts=[],this.ranked=[],this.localKart=null,this.input={steer:0,throttle:0,brake:0,drift:!1,driftPressed:!1,itemDown:!1,itemUp:!1,look:!1,gas:!1},this.shadowMat=new ie({map:A_(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3}),this.shadowGeo=new De(1,1),this.shadowGeo.rotateX(-Math.PI/2),this.rivalEng=[null,null,null],this.sfxCd=new Map,this.statsRace={coins:0,hits:0,boosts:0,drifts:0,shortcuts:0,maxTier:0},this.announced={},this.lastPosCall=0,this.timeline=[];let e=this.track.length;this.L=e,this.hazOk=!0,t.players.forEach((i,n)=>this.addKart(i,n)),this.rank(),this.setupAudio(),this.cam.introT=0,this.updateVisuals(0),this.positionCamera(0,!0)}addKart(t,e){let i=this.track,n=Et.characters.find(x=>x.name===t.name)||Et.characters[0],r=Hr(t.build,n.cls),a=new il(r,i),o=Math.floor(e/2),l=e%2,c=i.length-7-o*8.5-(l?3:0),h=l?3.6:-3.6,d=i.at(c,h,{});a.lap=-1,a.place(d.x,d.z,d.heading);let u=Hs(t.build,t.name);this.scene.add(u.root);let f=new Ut(this.shadowGeo,this.shadowMat);f.scale.set(3.4,1,4.6),f.position.y=.06,this.scene.add(f);let g={id:t.id??e,name:t.name,cls:n.cls,build:t.build,st:r,sim:a,vis:u,shadow:f,slot:e,human:!!t.human,local:!!t.local,remote:!!t.remote,auth:!t.remote,cpu:!t.human,ai:null,item:null,roll:null,holding:null,shield:null,lockT:0,braceT:0,coins:0,place:e+1,finished:!1,finishT:0,finishOrder:0,lastHitBy:null,shieldMesh:null,dispName:t.dispName||t.name,rev:0,rpm:.1,gear:0,gasAt:null,startRes:null,padCd:0,hazCd:0,lastBumpSnd:0,tgt:null,lastLap:-1,auto:!1,bark:{}};return g.cpu&&g.auth&&(g.ai=new nl(g,this,t.skill??.82+this.rnd()*.16)),g.local&&(this.localKart=g),this.karts.push(g),g}hazardOkForCpu(t){let e=this.hazards.list.find(n=>n.type==="gate");return e?(this.t+e.off)%e.cycle<1.8||Math.random()<.15:!0}nearestAhead(t,e){let i=null,n=e;for(let r of this.karts){if(r===t)continue;let a=r.sim.prog-t.sim.prog;a>0&&a<n&&Math.abs(r.sim.lat-t.sim.lat)<8&&(n=a,i=r)}return i}nearestBehind(t,e){let i=null,n=e;for(let r of this.karts){if(r===t)continue;let a=t.sim.prog-r.sim.prog;a>0&&a<n&&Math.abs(r.sim.lat-t.sim.lat)<8&&(n=a,i=r)}return i}setupAudio(){let t=this.audio;if(!t||!t.ready)return;this.snd={};let e=this.localKart;this.audioOn=!0,e&&(this.engine=t.createEngine(e.cls,{vol:1})),t.setReverb(this.track.theme),t.startAmbience(this.track.meta.amb);let i=n=>t.loop(n,{vol:0});this.loops={wind:i("wind_loop"),skid_road:i("skid_road"),skid_snow:i("skid_snow"),skid_sand:i("skid_sand"),spark:i("spark_loop"),off:i("offroad_loop"),draft:i("draft_loop"),nova:i("nova_loop"),crowd:i("crowd_loop")},t.setMusicState("grid",!1)}sfx(t,e,i={}){let n=this.audio;!n||!n.ready||(!e||e===this.localKart?n.play(t,{...i}):n.at(t,e.sim.x,e.sim.z,i))}sfxPos(t,e,i,n={}){let r=this.audio;r&&r.ready&&r.at(t,e,i,n)}say(t,e){let i=this.audio;i&&i.ready&&i.announce(t,e)}bark(t,e,i){t===this.localKart&&this.audio&&this.audio.ready?this.audio.bark(t.name,e,i):t&&t.auth!==void 0&&this.audio&&this.audio.ready&&Math.hypot(t.sim.x-this.localKart.sim.x,t.sim.z-this.localKart.sim.z)<30&&this.audio.bark(t.name,e,{...i,cooldown:14,vol:.5,pan:0})}start(){this.state="grid",this.stateT=0,this.cam.introT=0,this.audio&&this.audio.ready&&this.say("get_ready",{force:!0})}beginCountdown(){this.state="countdown",this.cdT=3.999,this.stateT=0,this.cdLast=4,this.audio&&this.audio.ready&&this.audio.setMusicState("grid")}update(t){let e=Math.min(t,.1);this.acc+=e;let i=0;for(;this.acc>=Xr&&i<6;)this.step(Xr),this.acc-=Xr,i++;i>=6&&(this.acc=0),this.view.update(e,this.t,this.camera.position),this.updateVisuals(e),this.positionCamera(e),this.fx.update(e),this.updateAudio(e)}step(t){if(this.stateT+=t,this.state==="grid"&&(this.cam.introT+=t,this.cam.introT>(this.opts.introSec??2.6)&&this.beginCountdown()),this.state==="countdown"){this.cdT-=t;let e=Math.ceil(this.cdT);e!==this.cdLast&&e>=0&&e<=3&&(this.cdLast=e,e>0&&(this.say(["","one","two","three"][e],{force:!0}),this.audio&&this.audio.ready&&this.audio.play("cd_beep"),this.ui("cd",{n:e})));for(let i of this.karts){if(!i.auth)continue;let n=this.getInput(i);n.throttle>.1&&i.gasAt===null&&(i.gasAt=this.cdT),i.rev=gi(i.rev,n.throttle>.1?1:0,.15)}this.cdT<=0&&this.go()}if((this.state==="racing"||this.state==="finished")&&(this.t+=t),this.state==="racing"||this.state==="finished")this.simKarts(t);else for(let e of this.karts)e.remote||e.sim.step(0,{throttle:0});if(this.hazards.update(this.t),this.state!=="grid"&&this.state!=="countdown"){this.items.update(t);for(let e of this.hazards.telegraph(this.t)){let i=this.track.at(e.s,0,{});this.sfxPos(e.snd,i.x,i.z,{ref:40,vol:.9,rate:e.rate||1})}}}go(){this.state="racing",this.t=0,this.goTime=performance.now(),this.say("go",{force:!0}),this.audio&&this.audio.ready&&(this.audio.play("cd_go"),this.audio.setMusicState("race",!1,this.musicOpts()),this.audio.musicDuckFor(.8,.7)),this.ui("go",{});for(let t of this.karts){if(!t.auth)continue;let e=ft.startBoost.windowSec;t.gasAt!==null&&t.gasAt>e?(t.sim.stallT=ft.startBoost.earlyStallSec,t.startRes="stall",this.sfx("start_stall",t),t===this.localKart&&this.ui("start",{res:"stall"})):t.gasAt!==null&&t.gasAt>=-.12?(t.sim.addBoost(ft.startBoost.boostSec,ft.startBoost.boostMul,"start"),t.startRes="boost",t.sim.s=Math.max(t.sim.s,2),this.sfx("start_boost",t),t===this.localKart&&(this.ui("start",{res:"boost"}),this.say("perfect_start",{delay:.6}),this.statsRace.boosts++)):t.startRes="none",t.pendingStart=t.gasAt===null}}getInput(t){if(t.ai&&!t.auto||t.auto&&t.ai)return t.ai.input(Xr);if(t===this.localKart){let e=this.input;return{steer:e.steer,throttle:e.throttle,brake:e.brake,drift:e.drift,driftPressed:e.driftPressed,look:e.look}}return{steer:0,throttle:0,brake:0,drift:!1}}simKarts(t){let e=this.L,i=this.input,n=this.localKart?this.localKart.sim.prog:this.karts[0]&&this.karts[0].sim.prog;for(let r of this.karts){if(r.remote){this.stepRemote(r,t);continue}let a=r.sim,o=this.getInput(r);if(r===this.localKart&&(i.itemDown&&(this.items.press(r),i.itemDown=!1),i.itemUp&&(this.items.release(r),i.itemUp=!1),r.backHeld=i.brake>.5,i.driftPressed=!1,this.state==="racing"&&r.pendingStart&&o.throttle>.1&&this.t<.12&&r.gasAt===null&&(a.addBoost(ft.startBoost.boostSec,ft.startBoost.boostMul,"start"),r.pendingStart=!1,this.ui("start",{res:"boost"}),this.sfx("start_boost",r))),r.ai&&!r.auto&&this.state==="racing"&&this.opts.rubber!==!1){let l=a.prog-n,c=ft.rubber,h=we(l/c.rangeM,-1,1);a.topScale=c.cpuBaseMul*(h>0?gi(1,c.cpuMulMin,h):gi(1,c.cpuMulMax,-h))*(.97+.04*r.ai.skill),this.state==="racing"&&r.ai.skill>.98&&(a.topScale*=1)}else r.ai&&r.auto&&(a.topScale=.9);(!r.finished||r.auto)&&this.itemsOn&&(this.items.updateRoll(r,t),this.items.tickHold(r,t)),a.step(t,o),r.holding&&(r.holding.t=r.holding.t),this.afterStep(r,t)}this.collisions(t),this.rank(),this.updateDraft(t),this.state==="racing"&&this.checkEnd(t)}stepRemote(t,e){let i=t.sim,n=t.tgt;if(!n)return;let r=Math.min(.25,(performance.now()-n.at)/1e3),a=n.x+Math.sin(n.phi)*n.s*r,o=n.z+Math.cos(n.phi)*n.s*r,l=Math.min(1,e*12),c=a-i.x,h=o-i.z;c*c+h*h>2500?(i.x=a,i.z=o):(i.x+=c*l,i.z+=h*l),i.th+=Wr(n.th,i.th)*l,i.phi+=Wr(n.phi,i.phi)*l,i.s=gi(i.s,n.s,l),i.steer=gi(i.steer,n.steer,l),i.hopY=n.hopY,i.drift.on=n.dr>0,i.drift.dir=n.dd,i.drift.tier=n.dr>0?n.dr-1:0,i.boostT=n.boost?.2:0,i.boostMul=1.2,i.spinT=n.spin,i.starT=n.star,i.ghostT=n.ghost,i.shrinkT=n.shrink,i.lap=n.lap,i.prog=n.prog,i.lastS=n.ls,i.lat=n.lat,i.surf=n.surf||"road",t.finished=n.fin,t.item=n.item?{id:n.item,n:1}:null,t.shield=n.shield,i.slipT=n.slip||0}afterStep(t,e){let i=t.sim,n=this.track,r=t===this.localKart,a=i.events,o=this.audio;for(let l of a)this.simEvent(t,l);if(t.padCd-=e,t.hazCd-=e,this.itemsOn&&!t.roll&&!t.item)for(let l of this.view.boxes){if(!l.active)continue;let c=l.x-i.x,h=l.z-i.z;if(c*c+h*h<4.4){l.active=!1,l.respawn=6,this.items.startRoll(t),this.net&&this.net.send("box",{i:this.view.boxes.indexOf(l)}),this.fx.burst(l.x,1.5,l.z,16765503,14,7),this.sfx("itembox",t);break}}else if(this.itemsOn)for(let l of this.view.boxes){if(!l.active)continue;let c=l.x-i.x,h=l.z-i.z;c*c+h*h<4.4&&(l.active=!1,l.respawn=6,this.net&&this.net.send("box",{i:this.view.boxes.indexOf(l)}),this.fx.burst(l.x,1.5,l.z,16765503,10,6),this.sfx("itembox",t,{vol:.5}))}for(let l of this.view.coins){if(!l.active)continue;let c=l.x-i.x,h=l.z-i.z;c*c+h*h<4.5&&(l.active=!1,l.respawn=40,t.coins++,r&&(this.statsRace.coins++,this.sfx("coin",t,{rate:1+Math.min(.5,this.statsRace.coins%8*.04)}),this.ui("coin",{})))}if(t.padCd<=0&&i.grounded)for(let l of this.view.pads){let c=i.x-l.x,h=i.z-l.z,d=Math.sin(l.heading),u=Math.cos(l.heading),f=c*d+h*u,g=c*u-h*d;if(Math.abs(f)<l.hl&&Math.abs(g)<l.hw){i.addBoost(ft.boostPad.sec,ft.boostPad.mul,"pad"),t.padCd=.8,this.sfx("boost_pad",t),this.fx.ring(l.x,.4,l.z,3727871),r&&this.shakeCam(.25),this.view.scPad;break}}if(t.hazCd<=0&&!i.protected){let l=this.hazards.check(t,this.t);l&&(t.hazCd=1,l.bounce?(i.s=-Math.abs(i.s)*.25*l.along*-1,i.s=Math.min(i.s,3),i.x-=l.tx*l.along*2.2,i.z-=l.tz*l.along*2.2,i.shake=.7,this.sfx("wall_hit",t),this.sfx("horn",t,{vol:.6})):i.spin(l.spin,l.loss)&&this.onEvent("hit",{k:t,o:{x:l.x,z:l.z},kind:l.kind}))}r&&(i.onSc&&!t.inSc?(t.inSc=!0,this.statsRace.shortcuts++,this.sfx("shortcut_found",t),this.say("shortcut",{delay:.2}),this.ui("shortcut",{})):i.onSc||(t.inSc=!1),i.wrongT>2&&this.state==="racing"?(this.say("wrong_way"),this.ui("wrong",{})):this.ui("wrongOff",{})),!t.finished&&i.lap>=this.laps&&this.state!=="grid"&&(t.finished=!0,t.finishT=this.t,t.finishOrder=++this.finishedCount,t.ai&&(t.auto=!0),this.onEvent("finish",{k:t})),i.lap!==t.lastLap&&(t.lastLap=i.lap,i.lap>=1&&!t.finished&&this.onEvent("lap",{k:t,lap:i.lap}))}simEvent(t,e){let i=t.sim,n=t===this.localKart,r=this.audio;switch(e.name){case"hop":this.sfx("hop",t);break;case"land":this.sfx("land",t,{vol:.5});break;case"driftStart":this.sfx("drift_tick1",t,{vol:.35,rate:.7});break;case"driftTier":this.sfx("drift_tick"+e.data.tier,t),n&&(this.ui("tier",{tier:e.data.tier}),e.data.tier===3&&(this.statsRace.maxTier=3));break;case"driftBoost":this.sfx("boost_t"+e.data.tier,t),n&&(this.statsRace.boosts++,this.statsRace.drifts++,this.shakeCam(.2+.12*e.data.tier),this.bark(t,e.data.tier>=2?"boost2":"boost1",{cooldown:9}),e.data.tier===3&&this.say("great_drift",{}),this.ui("boost",{tier:e.data.tier}));break;case"spin":n&&(this.shakeCam(.6),r&&r.ready&&r.musicMuffle(1.4,700)),this.sfx("spin_whirl",t);break;case"wallHit":this.sfx("wall_hit",t,{vol:we(e.data.ang*1.1,.4,1)}),e.data.v>25&&this.sfx("crash_big",t,{vol:.5}),n&&this.shakeCam(we(e.data.ang,.3,.9)),this.fx.burst(i.x,.8,i.z,16769952,6,5);break;case"scrape":this.sfx("wall_scrape",t,{min:.18,vol:we(e.data.v/40,.2,.8)}),this.fx.spark(i.x,.6,i.z,0,Math.sin(i.phi)*i.s,Math.cos(i.phi)*i.s);break;case"podBoost":this.sfx("pod_use",t);break}}onEvent(t,e){let i=this.audio,n=this.localKart,r=e.k,a=r===n;switch(t){case"roll":a&&this.ui("roll",{});break;case"rollTick":a&&this.sfx("roulette_tick",r,{rate:.9+e.tick%5*.06,vol:.5});break;case"itemGot":a&&(this.sfx("item_ready",r),this.ui("item",{id:e.id}));break;case"use":{let o=e.id,l={pod:null,trio:"pod_use",nova:"nova_start",veil:"veil_on",jolt:"jolt_arm",disc:"disc_launch",peel:"peel_drop",spill:"spill_drop",rocket:"rocket_launch"};l[o]&&this.sfx(l[o],r),o==="nova"&&(this.bark(r,"item",{cooldown:3}),a&&i&&i.ready&&i.setMusicState("race",!1,this.musicOpts({star:!0}))),o==="rocket"||o==="disc"?this.bark(r,"attack",{cooldown:8}):(o==="pod"||o==="trio"||o==="veil")&&this.bark(r,"item",{cooldown:12}),a&&this.ui("use",{id:o}),this.net&&r.auth&&this.net.send("use",{k:r.id,id:o,tid:o==="rocket"?this.lastRocketTarget:void 0});break}case"steal":this.sfx("steal",e.k),e.from===n&&(this.ui("stolen",{}),this.bark(n,"overtaken",{cooldown:5}));break;case"shieldUp":this.sfx("shield_up",r,{vol:.6});break;case"discBounce":this.sfxPos("disc_bounce",e.o.x,e.o.z,{ref:25});break;case"discPop":this.sfxPos("disc_pop",e.o.x,e.o.z,{ref:25}),this.fx.burst(e.o.x,.6,e.o.z,7324671,10,6);break;case"peelLand":this.sfxPos("peel_throw",e.o.x,e.o.z,{ref:25,vol:.5});break;case"slip":this.sfx("spill_slip",r),a&&this.shakeCam(.2);break;case"hit":{let o=e.kind,l={disc:"disc_hit",peel:"peel_hit",rocket:"rocket_explode",sheep:"bump_heavy_a",crane:"crash_big",boulder:"crash_big",icicle:"wall_hit",gate:"wall_hit"}[o]||"bump_med_a";this.sfx(l,r),this.fx.burst(r.sim.x,1,r.sim.z,o==="rocket"?16742954:16769162,22,9),o==="rocket"&&this.fx.ring(r.sim.x,.6,r.sim.z,16742954),a?(this.statsRace.hits++,this.bark(r,"hit",{cooldown:3}),this.ui("hit",{kind:o})):this.bark(r,"spin",{cooldown:12}),this.net&&r.auth&&this.net.send("hit",{k:r.id,by:e.o&&e.o.owner?e.o.owner.id:-1,kind:o});break}case"hitOther":e.k===n&&(this.bark(n,"taunt",{cooldown:6}),this.ui("hitOther",{}));break;case"rocketExplode":this.fx.burst(e.k.sim.x,1.2,e.k.sim.z,16753226,30,12);break;case"lock":e.k===n&&(this.say("rocket_incoming"),this.ui("lock",{}),this.sfx("rocket_lock",n));break;case"rocketBeep":this.sfx("rocket_lock",n,{vol:.55,rate:1.3,min:.05});break;case"rocketBlocked":this.sfx("brace_ok",e.k,{vol:.5});break;case"braceOk":this.sfx("brace_ok",e.k),this.fx.ring(e.k.sim.x,1,e.k.sim.z,7332863),e.k===n&&(this.ui("brace",{}),this.bark(n,"item",{cooldown:4}));break;case"joltArm":n&&n.sim.prog>e.k.sim.prog&&this.say("storm_incoming"),this.ui("joltArm",{});break;case"joltFire":this.sfx("jolt_zap",n);break;case"joltHit":this.sfx("jolt_shrink",e.k),e.k===n&&(this.shakeCam(.5),this.ui("hit",{kind:"jolt"}),this.bark(n,"hit",{cooldown:3}),i&&i.ready&&i.musicMuffle(1.2,900));break;case"joltBlocked":this.sfx("brace_ok",e.k,{vol:.5});break;case"lap":{if(!e.k.auth)break;if(a){let o=e.lap;o===this.laps-1?(this.say("final_lap",{force:!0}),this.sfx("finallap",r),i&&i.ready&&i.setMusicState("race",!1,this.musicOpts({finalLap:!0})),this.bark(r,"final",{cooldown:2}),this.ui("finalLap",{})):(this.say("lap_"+(o+1)),this.sfx("lap_chime",r),this.ui("lapMsg",{lap:o+1})),this.timeline.push({lap:o,t:this.t}),this.lapSplit=this.t,this.lastPosCall=this.t+2.6,setTimeout(()=>{this.state==="racing"&&r.place<=12&&r.place>=1&&this.say("pos_"+r.place,{})},2600)}break}case"finish":{if(!e.k.auth)break;this.ui("finishKart",{k:e.k}),a&&(this.say("race_complete",{force:!0}),this.sfx(e.k.place<=3?"fanfare_win":e.k.place<=8?"fanfare_mid":"fanfare_lose",r),this.bark(r,e.k.place<=3?"win":"lose",{cooldown:1}),i&&i.ready&&i.setMusicState("results"),setTimeout(()=>this.say(e.k.place===1?"you_win":e.k.place<=6?"pos_"+e.k.place:"better_luck"),1800)),this.net&&this.net.send("fin",{k:e.k.id,t:e.k.finishT});break}}}musicOpts(t={}){let e=this.localKart;return{pos:e?e.place:6,n:this.karts.length,finalLap:e&&e.sim.lap>=this.laps-1,...t}}shakeCam(t){this.cam.shake=Math.max(this.cam.shake,t)}collisions(t){let e=ft.bump.kartRadius*2,i=this.karts;for(let n=0;n<i.length;n++)for(let r=n+1;r<i.length;r++){let a=i[n],o=i[r];if(!a.auth&&!o.auth)continue;let l=a.sim,c=o.sim;if(l.ghostT>0||c.ghostT>0)continue;let h=c.x-l.x,d=c.z-l.z,u=h*h+d*d;if(u>e*e||u<1e-6)continue;let f=Math.sqrt(u),g=h/f,x=d/f,m={x:Math.sin(l.phi)*l.s+l.bx,z:Math.cos(l.phi)*l.s+l.bz},p={x:Math.sin(c.phi)*c.s+c.bx,z:Math.cos(c.phi)*c.s+c.bz},y=(p.x-m.x)*g+(p.z-m.z)*x,A=e-f,v=l.st.mass*(l.shrinkT>0?.6:1),S=c.st.mass*(c.shrinkT>0?.6:1);if(a.auth&&(l.x-=g*A*(S/(v+S)),l.z-=x*A*(S/(v+S))),o.auth&&(c.x+=g*A*(v/(v+S)),c.z+=x*A*(v/(v+S))),y<0){let w=-(1+ft.bump.restitution)*y/(1/v+1/S);a.auth&&(l.bx-=w/v*g,l.bz-=w/v*x),o.auth&&(c.bx+=w/S*g,c.bz+=w/S*x);let R=-y,_=gi(ft.bump.heavyLoss,ft.bump.lightLoss,S/(v+S)),M=gi(ft.bump.heavyLoss,ft.bump.lightLoss,v/(v+S));if(a.auth&&R>2&&(l.s*=1-_*we(R/12,.2,1)),o.auth&&R>2&&(c.s*=1-M*we(R/12,.2,1)),l.starT>0&&c.starT<=0&&o.auth&&(c.spin(1.2,.5),c.shrinkT=0,this.onEvent("hit",{k:o,o:{owner:a,x:c.x,z:c.z},kind:"star"}),this.onEvent("hitOther",{k:a,victim:o,kind:"star"})),c.starT>0&&l.starT<=0&&a.auth&&(l.spin(1.2,.5),this.onEvent("hit",{k:a,o:{owner:o,x:l.x,z:l.z},kind:"star"}),this.onEvent("hitOther",{k:o,victim:a,kind:"star"})),R>ft.bump.spinImpactSpeed&&l.starT<=0&&c.starT<=0){let C=v<S*.95?a:S<v*.95?o:null;C&&C.auth&&C.sim.spin(ft.bump.spinSec,.2)}let E=this.t;if(E-a.lastBumpSnd>.25&&E-o.lastBumpSnd>.25){a.lastBumpSnd=o.lastBumpSnd=E;let C=v+S>3.6,P=R>12?C?"bump_heavy_":"bump_med_":R>5?"bump_med_":"bump_light_",D=a===this.localKart||o===this.localKart?this.localKart:a;this.sfx(P+(Math.random()<.5?"a":"b"),D,{vol:we(R/10,.3,1)}),D===this.localKart&&(this.shakeCam(we(R/22,.1,.5)),this.bark(D,"overtaken",{cooldown:15})),this.fx.burst((l.x+c.x)/2,.8,(l.z+c.z)/2,16773296,6,4)}}}}updateDraft(t){let e=ft.draft;for(let i of this.karts){if(!i.auth)continue;let n=i.sim,r=!1;for(let a of this.karts){if(a===i)continue;let o=a.sim.x-n.x,l=a.sim.z-n.z,c=o*Math.sin(n.phi)+l*Math.cos(n.phi);if(c<e.minDist||c>e.maxDist)continue;if(Math.abs(o*Math.cos(n.phi)-l*Math.sin(n.phi))<e.lateral&&a.sim.s>14&&n.s>14){r=!0;break}}r?n.draft.t+=t:(n.draft.t>e.slingshotAfterSec&&n.s>14&&(n.draft.sling=e.slingshotSec,i===this.localKart&&this.sfx("slingshot",i)),n.draft.t=Math.max(0,n.draft.t-t*2)),n.draft.on=n.draft.t>e.chargeSec}}rank(){let t=this.karts.slice();t.sort((e,i)=>e.finished&&i.finished?e.finishOrder-i.finishOrder:e.finished?-1:i.finished?1:i.sim.prog-e.sim.prog),t.forEach((e,i)=>{let n=e.place;e.place=i+1,e===this.localKart&&n!==e.place&&this.state==="racing"&&(e.place<n?(this.sfx("pos_up",e,{vol:.5}),e.place===1?(this.say("lead"),this.bark(e,"overtake",{cooldown:5})):this.bark(e,"overtake",{cooldown:12})):e.place>n&&n>0&&this.sfx("pos_down",e,{vol:.4}),this.audio&&this.audio.ready&&!e.finished&&this.audio.setMusicState("race",!1,this.musicOpts()))}),this.ranked=t}checkEnd(t){let e=this.karts.filter(n=>n.human&&!n.cpu);(e.length?e.every(n=>n.finished):this.karts.every(n=>n.finished))&&!this.endT&&(this.endT=this.t),!this.endT&&this.karts.filter(n=>n.finished).length>=1&&e.length&&this.t-Math.min(...this.karts.filter(n=>n.finished).map(n=>n.finishT))>50&&(this.endT=this.t),this.endT&&this.t-this.endT>(e.length?3.2:1)&&this.finishRace()}finishRace(){if(this.state==="finished")return;this.state="finished";let t=this.ranked.map((e,i)=>({id:e.id,name:e.name,disp:e.dispName,place:i+1,time:e.finished?e.finishT:null,human:e.human,local:e.local,coins:e.coins,prog:e.sim.prog}));this.results=t,this.ui("results",{results:t})}updateVisuals(t){let e=this.t,i=this.camera.position;for(let n of this.karts){let r=n.sim,a=n.vis,o=Math.hypot(r.x-i.x,r.z-i.z)<160;if(a.root.visible=o,n.shadow.visible=o,!o)continue;let l=r.th;a.root.position.set(r.x,r.hopY,r.z),a.root.rotation.y=l;let c=we(-r.steer*.05-(r.drift.on?-r.drift.dir*.09:0),-.2,.2);a.body.rotation.z=gi(a.body.rotation.z,c,Math.min(1,t*10));let h=we((r.boostT>0?.05:0)+(n.throttleLast||0)*.02,0,.1);a.body.rotation.x=gi(a.body.rotation.x,-h+we(r.hopY*.12,0,.1),Math.min(1,t*8));let d=r.shrinkT>0?.55:1;n.scaleCur=gi(n.scaleCur??1,d,Math.min(1,t*8)),a.root.scale.setScalar(n.scaleCur);for(let f of a.wheels)f.front&&(f.pivot.rotation.y=-r.steer*.5+(r.drift.on?-r.drift.dir*.2:0)),f.spin.rotation.x+=r.s/f.rad*t;a.driver&&Cd(a.driver,r.steer,r.spinT>0||r.shake>.3?1:0,n.place===1?1:0,t,e),r.starT>0?(a.paintMat.emissive.setHSL(e*1.6%1,1,.45),a.paintMat.emissiveIntensity=.9):a.paintMat.emissiveIntensity>0&&a.paintMat.userData.star&&(a.paintMat.emissiveIntensity=0),a.paintMat.userData.star=r.starT>0,r.starT<=0&&!a.paintMat.userData.pearl&&a.paintMat.emissive.setHex(0),a.root.traverse(f=>{f.material&&f.material.transparent!==r.ghostT>0&&f.material.userData.keep}),n.shadow.position.set(r.x,.06,r.z),n.shadow.rotation.y=l;let u=n.scaleCur*(1-we(r.hopY*.2,0,.4));if(n.shadow.scale.set(3.4*u,1,4.6*u),n.shield){if(!n.shieldMesh){let g=n.shield==="disc"?this.items.meshes.disc:this.items.meshes.peel;n.shieldMesh=g.clone(),n.shieldMesh.material=g.material,this.scene.add(n.shieldMesh),n.shieldKind=n.shield}let f=e*5;n.shieldMesh.position.set(r.x-Math.sin(r.th)*2.4+Math.cos(f)*.3,.5,r.z-Math.cos(r.th)*2.4+Math.sin(f)*.3),n.shieldMesh.rotation.y=f}else n.shieldMesh&&(this.scene.remove(n.shieldMesh),n.shieldMesh=null);this.kartFx(n,t)}}kartFx(t,e){let i=t.sim,n=this.fx,r=this.camera.position;if(Math.hypot(i.x-r.x,i.z-r.z)>70)return;let a=Math.sin(i.th),o=Math.cos(i.th),l=o,c=-a,h=t.vis.shape.zr,d=t.vis.shape.wx,u=Math.sin(i.phi)*i.s,f=Math.cos(i.phi)*i.s;if(i.drift.on&&i.grounded){let g=i.drift.tier;for(let x of[-1,1]){let m=i.x+a*(h-.2)-l*x*d*-1,p=i.z+o*(h-.2)-c*x*d*-1;Math.random()<.9&&n.spark(m,.15,p,g,u,f)}Math.random()<.4&&n.dust(i.x-a*1.2,i.z-o*1.2,u,f,Hd[i.surf]||12106948,.8)}if(i.boostT>0){let g=i.boostKind==="drift3"?12676095:i.boostKind==="drift2"?16751150:i.boostKind==="pad"?3727871:i.boostKind==="start"?16777215:i.boostKind==="pod"?3661962:5093631;for(let x of[-.45,.45])n.flame(i.x+a*(t.vis.shape.ex[1]-.2)+l*x,.5,i.z+o*(t.vis.shape.ex[1]-.2)+c*x,-u*.3,-f*.3,g)}i.starT>0&&Math.random()<.5&&n.add.emit(i.x+(Math.random()-.5)*2,.8+Math.random(),i.z+(Math.random()-.5)*2,0,1.5,0,.5,.8,.1,ui(16769354,1),ui(16739029,0),0,1),i.spinT>0&&Math.random()<.5&&n.dust(i.x,i.z,0,0,16773328,.9),(i.surf==="off"||i.surf==="sand"||i.surf==="rough")&&i.s>8&&Math.random()<.6?n.dust(i.x-a*1.1,i.z-o*1.1,u,f,Hd[i.surf],1):i.surf==="ice"&&i.s>10&&Math.random()<.3&&n.dust(i.x-a*1.1,i.z-o*1.1,u,f,15398655,.7),this.track.theme==="frost"&&i.surf==="road"&&i.s>15&&Math.random()<.15&&n.dust(i.x-a*1.1,i.z-o*1.1,u,f,16777215,.6)}positionCamera(t,e){let i=this.localKart||this.karts[0];if(!i)return;let n=i.sim,r=this.cam,a=this.camera,l=a.aspect<1;if(this.state==="grid"&&!e){let E=we(r.introT/(this.opts.introSec??2.6),0,1),C=E*E*(3-2*E),P=this.track.at(this.L-20,0,{}),D=gi(2.6,0,C),L=gi(22,l?9.5:7.4,C),O=gi(11,l?4:3.2,C),X=n.th+D;r.pos.set(n.x-Math.sin(X)*L,O,n.z-Math.cos(X)*L),r.look.set(n.x+Math.sin(n.th)*4,1.2,n.z+Math.cos(n.th)*4),r.yaw=n.th,a.position.copy(r.pos),a.lookAt(r.look),a.fov=60,a.updateProjectionMatrix();return}let c=this.input.look,h=Wr(n.th*.45+n.phi*.55,0),d=n.th+Wr(n.phi,n.th)*.55;e?r.yaw=d:r.yaw+=Wr(d,r.yaw)*(1-Math.exp(-t*(n.drift.on?4:6.5)));let u=r.yaw+(c?Math.PI:0),f=we(Math.abs(n.s)/(n.st.vmax*1.2),0,1),g=(l?8.6:6.4)+f*.9+(n.boostT>0?.6:0),x=(l?4.1:3)+f*.3,m=n.x-Math.sin(u)*g,p=n.z-Math.cos(u)*g,y=e?1:1-Math.exp(-t*12);r.pos.x+=(m-r.pos.x)*y,r.pos.y+=(x+n.hopY*.5-r.pos.y)*y,r.pos.z+=(p-r.pos.z)*y;let A=n.x+Math.sin(u)*5.5,v=n.z+Math.cos(u)*5.5;r.look.x+=(A-r.look.x)*y,r.look.y=1.2+n.hopY*.3,r.look.z+=(v-r.look.z)*y,r.shake=Math.max(r.shake-t*2.2,n.shake*.5);let S=r.shake*.35,w=(Math.random()-.5)*S,R=(Math.random()-.5)*S;a.position.set(r.pos.x+w,r.pos.y+R,r.pos.z),a.lookAt(r.look);let _=(l?68:60)+f*7+(n.boostT>0?8:0)+(n.draft.on?2:0);r.fov+=(_-r.fov)*(e?1:1-Math.exp(-t*5)),Math.abs(a.fov-r.fov)>.05&&(a.fov=r.fov,a.updateProjectionMatrix());let M=this.renderer.domElement.height;this.fx.setScale(M/(2*Math.tan(a.fov*Math.PI/360)))}updateAudio(t){let e=this.audio;if(!e||!e.ready)return;let i=this.localKart;if(!i)return;let n=i.sim;e.setListener(this.camera.position.x,this.camera.position.z,this.cam.yaw);let r=Math.abs(n.s)/(n.st.vmax*1.08),a=this.state==="countdown"?i.rev:n.spinT>0?.1:this.input.throttle||(this.input.gas?1:0),o=[0,.2,.4,.6,.8,1.2],l=0;for(;l<4&&r>o[l+1];)l++;let c=we((r-o[l])/(o[l+1]-o[l]),0,1),h=this.state==="countdown"?.12+.55*i.rev:.2+l*.1+c*.34+(n.boostT>0?.05:0);r<.04&&(h=.1+.08*a),n.stallT>0&&(h=.09),i.rpm+=(h-i.rpm)*(1-Math.exp(-t*(h>i.rpm?9:4.5))),i.throttleLast=a,this.engine&&this.engine.update(i.rpm,a,n.boostT>0?1:0,1);let d=this.loops||{},u=(m,p,y)=>{m&&(m.setVol(p,.07),y&&m.setRate(y,.1))};u(d.wind,we(r*r*.55,0,.55),.8+r*.6);let f=we((n.slip-.12)*4,0,1)*(n.s>8?1:0),g=(n.drift.on?.45:0)+f*.35,x=n.surf==="ice"?"skid_snow":n.surf==="sand"||n.surf==="off"?"skid_sand":"skid_road";for(let m of["skid_road","skid_snow","skid_sand"])u(d[m],m===x&&n.grounded?we(g,0,.6):0,.9+r*.25);u(d.spark,n.drift.on&&n.drift.tier>0?.25+.12*n.drift.tier:0,.9+.1*n.drift.tier),u(d.off,(n.surf==="off"||n.surf==="rough"||n.surf==="sand")&&n.s>4?we(r*.7,0,.6):0),u(d.draft,n.draft.on?.45:0),u(d.nova,n.starT>0?.4:0),u(d.crowd,this.crowdVol()),this.rivalT=(this.rivalT||0)-t,this.rivalT<=0&&this.state!=="grid"&&(this.rivalT=.6,this.karts.filter(p=>p!==i).map(p=>({k:p,d:Math.hypot(p.sim.x-n.x,p.sim.z-n.z)})).sort((p,y)=>p.d-y.d).slice(0,3).forEach((p,y)=>{let A=this.rivalEng[y];if(!A||A.kart!==p.k){A&&A.eng&&A.eng.stop();let v=e.createEngine(p.k.cls,{spatial:!0,vol:.6});this.rivalEng[y]=v?{kart:p.k,eng:v}:null}}));for(let m of this.rivalEng){if(!m)continue;let p=m.kart,y=p.sim,A=Math.hypot(y.x-this.camera.position.x,y.z-this.camera.position.z),v=Math.abs(y.s)/(y.st.vmax*1.08),S=0;for(;S<4&&v>o[S+1];)S++;let w=we((v-o[S])/(o[S+1]-o[S]),0,1),R=this.state==="countdown"?.12:.2+S*.1+w*.34,_=we(1/(1+A/12),0,1)*.9,M=-Math.cos(this.cam.yaw),E=Math.sin(this.cam.yaw),C=A>.5?((y.x-this.camera.position.x)*M+(y.z-this.camera.position.z)*E)/A:0;m.eng.setPan(C*.85),m.eng.update(R,.8,y.boostT>0?1:0,_)}}crowdVol(){let t=this.localKart;if(!t)return 0;let e=this.track.at(0,0,{}),i=Math.hypot(t.sim.x-e.x,t.sim.z-e.z);return we(1-i/140,0,1)*.5}snapshot(t){let e=t.sim;return{x:e.x,z:e.z,th:e.th,phi:e.phi,s:e.s,steer:e.steer,hopY:e.hopY,dr:e.drift.on?e.drift.tier+1:0,dd:e.drift.dir,boost:e.boostT>0,spin:e.spinT,star:e.starT,ghost:e.ghostT,shrink:e.shrinkT,lap:e.lap,prog:e.prog,ls:e.lastS,lat:e.lat,surf:e.surf,fin:t.finished,item:t.item?t.item.id:null,shield:t.shield,slip:e.slipT,ft:t.finishT}}applySnapshot(t,e){let i=this.karts.find(n=>n.id===t);!i||!i.remote||(i.tgt={...e,at:performance.now()},e.fin&&!i.finished&&(i.finished=!0,i.finishT=e.ft,i.finishOrder=++this.finishedCount))}dispose(){for(let t of this.karts)this.scene.remove(t.vis.root),this.scene.remove(t.shadow),t.shieldMesh&&this.scene.remove(t.shieldMesh);this.view.dispose(),this.hazards.dispose(),this.items.dispose(),this.fx.dispose(this.scene),this.engine&&this.engine.stop();for(let t of this.rivalEng)t&&t.eng.stop();this.audio&&this.audio.ready&&(this.audio.stopAllLoops(),this.audio.stopAmbience())}};var ul=(s,t,e)=>Math.max(t,Math.min(e,s)),qr={"Pip Thistledown":"pip","Fennel Vix":"fennel","Juniper Wren":"juniper","Pearl Quayside":"pearl","Bramble Quill":"bramble","Clover Dash":"clover","Captain Dusk Marlowe":"dusk","Sage Willowmere":"sage","Marigold Hoofsworth":"marigold","Hobb Mossback":"hobb","Barnaby Bruin":"barnaby","Gus Gantry":"gus"},R_={three:5,two:5,one:5,go:6,final_lap:4,race_complete:6,you_win:6,better_luck:6,wrong_way:3,lead:2,great_drift:1,shortcut:1,perfect_start:3,rocket_incoming:4,storm_incoming:4,record:4},dl=class{constructor(t={}){this.base=t.base||"audio/",this.hqBase=t.hqBase||null,this.hq=!1,this.ctx=null,this.buffers=new Map,this.pending=new Map,this.vol={master:1,sfx:1,music:.8,voice:1,engine:1},this.ready=!1,this.lastPlay=new Map,this.voices=0,this.listener={x:0,z:0,h:0},this.musicState=null,this.annBusyUntil=0,this.barkAt=new Map,this.loopsActive=[],this.stats={decoded:0,bytes:0,failed:[]},this.hqPacks={},this.loadingCount=0}get time(){return this.ctx?this.ctx.currentTime:0}async unlock(){if(this.ctx||this._build(),this.ctx.state!=="running")try{await this.ctx.resume()}catch{}if(!this._unlocked){this._unlocked=!0;let t=this.ctx.createBuffer(1,1,22050),e=this.ctx.createBufferSource();e.buffer=t,e.connect(this.ctx.destination),e.start(0)}return this.ctx.state}_build(){let t=window.AudioContext||window.webkitAudioContext,e=this.ctx=new t({latencyHint:"interactive"}),i=(n=1)=>{let r=e.createGain();return r.gain.value=n,r};this.bus={sfx:i(1),engine:i(.9),music:i(.8),voice:i(1),amb:i(.7),ui:i(.9)},this.duck=i(1),this.musicFilter=e.createBiquadFilter(),this.musicFilter.type="lowpass",this.musicFilter.frequency.value=2e4,this.musicFilter.Q.value=.7,this.mix=i(1),this.glue=e.createDynamicsCompressor(),this.glue.threshold.value=-16,this.glue.knee.value=14,this.glue.ratio.value=2.5,this.glue.attack.value=.012,this.glue.release.value=.22,this.limiter=e.createDynamicsCompressor(),this.limiter.threshold.value=-2.5,this.limiter.knee.value=0,this.limiter.ratio.value=20,this.limiter.attack.value=.002,this.limiter.release.value=.09,this.masterGain=i(this.vol.master),this.analyser=e.createAnalyser(),this.analyser.fftSize=2048,this.bus.music.connect(this.musicFilter),this.musicFilter.connect(this.duck),this.duck.connect(this.mix);for(let n of["sfx","engine","voice","amb","ui"])this.bus[n].connect(this.mix);this.mix.connect(this.glue),this.glue.connect(this.limiter),this.limiter.connect(this.masterGain),this.masterGain.connect(e.destination),this.masterGain.connect(this.analyser),this.reverb=e.createConvolver(),this.revSend=i(0),this.revReturn=i(.5),this.bus.sfx.connect(this.revSend),this.bus.voice.connect(this.revSend),this.revSend.connect(this.reverb),this.reverb.connect(this.revReturn),this.revReturn.connect(this.mix),this.setReverb("meadow"),this.dest=null,this.ready=!0}setReverb(t){let e={meadow:[.7,3500,.12],harbor:[1.4,4500,.2],mesa:[2.4,2600,.28],frost:[1.9,6500,.22],menu:[1.1,5e3,.14]}[t]||[1,4e3,.15],i=this.ctx,n=Math.floor(i.sampleRate*e[0]),r=i.createBuffer(2,n,i.sampleRate);for(let a=0;a<2;a++){let o=r.getChannelData(a),l=0,c=Math.exp(-2*Math.PI*e[1]/i.sampleRate);for(let h=0;h<n;h++){let d=h/n,u=(Math.random()*2-1)*Math.pow(1-d,3.2);l=l*c+u*(1-c),o[h]=l*3.2*(h<400?h/400:1)}}this.reverb.buffer=r,this.revSend.gain.value=e[2]}captureStream(){return this.dest||(this.dest=this.ctx.createMediaStreamDestination(),this.masterGain.connect(this.dest)),this.dest.stream}setVolumes(t){Object.assign(this.vol,t),this.ctx&&(this.masterGain.gain.setTargetAtTime(this.vol.master,this.time,.05),this.bus.sfx.gain.setTargetAtTime(this.vol.sfx,this.time,.05),this.bus.ui.gain.setTargetAtTime(.9*this.vol.sfx,this.time,.05),this.bus.amb.gain.setTargetAtTime(.7*this.vol.sfx,this.time,.05),this.bus.engine.gain.setTargetAtTime(.9*(this.vol.engine??1),this.time,.05),this.bus.music.gain.setTargetAtTime(this.vol.music,this.time,.05),this.bus.voice.gain.setTargetAtTime(this.vol.voice,this.time,.05))}async _fetchBuf(t){let e;try{e=await fetch(t,{cache:"force-cache"})}catch{return null}if(!e.ok)return null;let i=await e.arrayBuffer();return this.stats.bytes+=i.byteLength,i}async _hqFetch(t){try{if("caches"in window){let e=await caches.open("sdgp-hq-v1"),i=await e.match(t);if(!i){if(i=await fetch(t,{mode:"cors"}),!i.ok)return null;await e.put(t,i.clone())}let n=await i.arrayBuffer();return this.stats.bytes+=n.byteLength,n}}catch{}return this._fetchBuf(t)}async load(t,e){let i=this.hq&&e?"H:"+e:t;if(this.buffers.has(i))return this.buffers.get(i);if(this.pending.has(i))return this.pending.get(i);let n=(async()=>{this.loadingCount++;let r=null;try{let a=null;this.hq&&e&&this.hqBase&&(a=await this._hqFetch(this.hqBase(e))),a||(a=await this._fetchBuf(this.base+t)),a&&(r=await new Promise((o,l)=>{let c=this.ctx.decodeAudioData(a,o,l);c&&c.catch&&c.catch(l)}),this.stats.decoded++)}catch(a){this.stats.failed.push(t+": "+(a&&a.message))}return this.loadingCount--,r&&this.buffers.set(i,r),this.pending.delete(i),r})();return this.pending.set(i,n),n}async loadManifest(){let t=await fetch(this.base+"sfx/manifest.json");this.sfxMan=await t.json();let e=await fetch(this.base+"engine/manifest.json");this.engMan=await e.json();let i=await fetch(this.base+"voice/manifest.json");this.voiceMan=await i.json()}sfxPath(t){let e=this.sfxMan&&this.sfxMan[t];return e?["sfx/"+e.file,"sfx/"+e.file.replace(".wav",".flac")]:null}async preloadSfx(t){let e=t.map(i=>{let n=this.sfxPath(i);return n?this.load(n[0],n[1]):null});await Promise.all(e)}async preloadVoices(t,e){let i=[];for(let n of t)for(let r of e)i.push(this.load(`voice/${n}/${r}.wav`,`voice/${n}/${r}.flac`));await Promise.all(i)}async preloadAnnouncer(t){await Promise.all(t.map(e=>this.load(`voice/announcer/${e}.wav`,`voice/announcer/${e}.flac`)))}async preloadEngines(t){let e=[];for(let i of t)for(let n=0;n<6;n++)e.push(this.load(`engine/${i}_${n}.wav`,`engine/${i}_${n}.flac`));await Promise.all(e)}_panner(t){let e=this.ctx.createStereoPanner();return e.pan.value=ul(t,-1,1),e}play(t,e={}){if(!this.ready)return null;let i=this.sfxPath(t);if(!i)return null;let n=this.hq?"H:"+i[1]:i[0],r=this.buffers.get(n)||this.buffers.get(i[0]);if(!r)return this.load(i[0],i[1]),null;let a=this.time,o=e.min??.035,l=this.lastPlay.get(t)||-9;return a-l<o||this.voices>52?null:(this.lastPlay.set(t,a),this._src(r,e,this.bus[e.bus||"sfx"],this.sfxMan[t]&&this.sfxMan[t].loop))}_src(t,e,i,n=!1){let r=this.ctx,a=r.createBufferSource();a.buffer=t;let o=(e.rate||1)*(e.rand?1+(Math.random()-.5)*e.rand:1);a.playbackRate.value=o,(n||e.loop)&&(a.loop=!0);let l=r.createGain();l.gain.value=e.vol??1;let c=a;if(c.connect(l),c=l,e.pan!==void 0&&e.pan!==0){let h=this._panner(e.pan);c.connect(h),c=h}if(e.lp){let h=r.createBiquadFilter();h.type="lowpass",h.frequency.value=e.lp,c.connect(h),c=h}return c.connect(i),this.voices++,a.onended=()=>{this.voices--;try{l.disconnect()}catch{}},a.start(r.currentTime+(e.delay||0),e.offset||0),{src:a,gain:l,stop:(h=.05)=>{try{l.gain.setTargetAtTime(0,r.currentTime,h/3),a.stop(r.currentTime+h+.05)}catch{}},setVol:(h,d=.05)=>l.gain.setTargetAtTime(h,r.currentTime,d),setRate:(h,d=.05)=>a.playbackRate.setTargetAtTime(h,r.currentTime,d)}}at(t,e,i,n={}){let r=this.listener,a=e-r.x,o=i-r.z,l=Math.hypot(a,o),c=-Math.cos(r.h),h=Math.sin(r.h),d=l>.5?(a*c+o*h)/l:0,u=(n.vol??1)/(1+l/(n.ref||14));return u<.02?null:this.play(t,{...n,vol:u,pan:d*.85,lp:l>40?Math.max(1500,12e3-l*60):void 0})}loop(t,e={}){if(!this.ready)return null;let i=this.sfxPath(t),n=i&&(this.buffers.get(this.hq?"H:"+i[1]:i[0])||this.buffers.get(i[0]));if(!n)return i&&this.load(i[0],i[1]),null;let r=this._src(n,{vol:e.vol??0,rate:e.rate||1,loop:!0,pan:e.pan},this.bus[e.bus||"sfx"],!0);return r&&(r.src.onended=null,this.loopsActive.push(r)),r}stopAllLoops(){for(let t of this.loopsActive)t.stop(.1);this.loopsActive=[]}createEngine(t,e={}){if(!this.ready)return null;let i=t.toLowerCase(),n=this.ctx,r=[],a=[];for(let x=0;x<6;x++){let m=this.buffers.get(`engine/${i}_${x}.wav`)||this.buffers.get(`H:engine/${i}_${x}.flac`);if(!m)return null;a.push(this.engMan[`${i}_${x}`].fund),r.push(m)}let o=n.createGain();o.gain.value=e.vol??1;let l=n.createBiquadFilter();l.type="lowpass",l.frequency.value=6e3,l.Q.value=.6,l.connect(o);let c=o,h=null;e.spatial&&(h=this._panner(0),o.connect(h),c=h),c.connect(this.bus.engine);let d=r.map((x,m)=>{let p=n.createBufferSource();p.buffer=x,p.loop=!0,p.loopStart=0,p.loopEnd=x.duration;let y=n.createGain();return y.gain.value=0,p.connect(y),y.connect(l),p.start(n.currentTime,Math.random()*x.duration*.9),{s:p,g:y}}),u=a[0]*.9,f=a[5]*1.05,g={out:o,lp:l,srcs:d,fund:a,pan:h,cls:i,rpm:.2,gear:0,dead:!1,mutedUntil:0,shiftT:0};return g.update=(x,m,p,y=1)=>{let A=n.currentTime,v=u*Math.pow(f/u,ul(x,0,1)),S=0,w=[];for(let _=0;_<6;_++){let M=Math.abs(Math.log2(v/a[_])),E=Math.max(0,1-M/1.05);w.push(E),S+=E}S<.01&&(S=1);let R=.5+.5*m;for(let _=0;_<6;_++){let M=w[_]/S,E=Math.sqrt(M)*.55*R*(1+.25*p);d[_].g.gain.setTargetAtTime(E*y,A,.04),d[_].s.playbackRate.setTargetAtTime(ul(v/a[_],.55,2),A,.03)}l.frequency.setTargetAtTime(1800+7500*(.25+.75*m)*(.5+.5*x)+p*3e3,A,.06)},g.setPan=x=>{h&&h.pan.setTargetAtTime(ul(x,-1,1),n.currentTime,.05)},g.setVol=x=>o.gain.setTargetAtTime(x,n.currentTime,.05),g.stop=()=>{g.dead||(g.dead=!0,o.gain.setTargetAtTime(0,n.currentTime,.04),setTimeout(()=>{d.forEach(x=>{try{x.s.stop()}catch{}});try{o.disconnect()}catch{}},300))},g}async startAmbience(t){if(!this.ready)return;this.stopAmbience();let e=await this.load(`amb/${t}.wav`,`amb/${t}.flac`);if(!e)return;let i=this._src(e,{vol:0,loop:!0},this.bus.amb,!0);i.src.onended=null,i.setVol(.9,1),this.amb=i}stopAmbience(){this.amb&&(this.amb.stop(.8),this.amb=null)}async loadMusic(t){let e=["drums","bass","chords","lead","counter","fx"],i=await(await fetch(this.base+`music/${t}/meta.json`)).json(),n=await Promise.all(e.map(r=>this.load(`music/${t}/${r}.m4a`,`music/${t}/${r}.flac`)));return n.some(r=>!r)?(this.stats.failed.push("music "+t),!1):(this.musicMeta={...i,piece:t},this.musicBufs=n,!0)}startMusic(t,e="menu"){if(!this.ready||!this.musicBufs)return;this.stopMusic(.3);let i=this.ctx,n=i.currentTime+.06,r=["drums","bass","chords","lead","counter","fx"],a={},o=i.createGain();o.gain.value=1,o.connect(this.bus.music);let l=Math.min(...this.musicBufs.map(c=>c.duration));this.musicBufs.forEach((c,h)=>{let d=i.createBufferSource();d.buffer=c,d.loop=!0,d.loopStart=0,d.loopEnd=l;let u=i.createGain();u.gain.value=0,d.connect(u),u.connect(o),d.start(n),a[r[h]]={s:d,g:u}}),this.music={piece:t,stems:a,mg:o,t0:n,rate:1,dur:l,state:null},this.setMusicState(e,!0)}stopMusic(t=1){let e=this.music;e&&(this.music=null,e.mg.gain.setTargetAtTime(0,this.time,t/3),setTimeout(()=>{for(let i in e.stems)try{e.stems[i].s.stop()}catch{}try{e.mg.disconnect()}catch{}},t*1e3+200))}setMusicState(t,e=!1,i={}){let n=this.music;if(!n)return;n.state=t;let r=this.time,a=e?.001:.5,o={drums:0,bass:0,chords:0,lead:0,counter:0,fx:0},l=i.pos||6,c=i.n||12;if(t==="menu")Object.assign(o,{drums:.5,bass:.9,chords:1,lead:.75,counter:0,fx:.4});else if(t==="grid")Object.assign(o,{drums:0,bass:0,chords:.9,lead:0,counter:0,fx:.9});else if(t==="race"){let d=l<=2,u=l>c*.6;Object.assign(o,{drums:1,bass:1,chords:.9,lead:d?1:.8,counter:u||i.finalLap?.95:l<=4?0:.45,fx:i.finalLap||i.star?1:.55}),i.finalLap&&(o.counter=1,o.chords=1)}else t==="results"&&Object.assign(o,{drums:0,bass:.7,chords:1,lead:1,counter:0,fx:.3});for(let d in o)n.stems[d].g.gain.setTargetAtTime(o[d]*(d==="drums"?.95:1),r,a);let h=t==="race"&&i.finalLap?1.06:1;if(Math.abs(h-n.rate)>.001){n.rate=h;for(let d in n.stems)n.stems[d].s.playbackRate.setTargetAtTime(h,r,.8)}}musicMuffle(t=1.2,e=900){if(!this.ready)return;let i=this.musicFilter.frequency,n=this.time;i.cancelScheduledValues(n),i.setTargetAtTime(e,n,.03),i.setTargetAtTime(2e4,n+t,.25)}musicDuckFor(t,e=.45){if(!this.ready)return;let i=this.duck.gain,n=this.time;i.cancelScheduledValues(n),i.setTargetAtTime(e,n,.04),i.setTargetAtTime(1,n+t,.3)}announce(t,e={}){if(!this.ready)return!1;let i=this.buffers.get(`voice/announcer/${t}.wav`)||this.buffers.get(`H:voice/announcer/${t}.flac`);if(!i)return this.load(`voice/announcer/${t}.wav`,`voice/announcer/${t}.flac`),!1;let n=this.time,r=R_[t]??(t.startsWith("pos_"),1);if(n<this.annBusyUntil&&r<(this._annPr||0)&&!e.force)return!1;this.curAnn&&r>=(this._annPr||0)&&n<this.annBusyUntil&&this.curAnn.stop(.05);let a=this._src(i,{vol:1.15,delay:e.delay||0},this.bus.voice);return this.curAnn=a,this._annPr=r,this.annBusyUntil=n+i.duration+(e.delay||0),this.musicDuckFor(i.duration+.1+(e.delay||0),.5),!0}bark(t,e,i={}){if(!this.ready||!t)return!1;let n=qr[t]||t,r=i.cooldown??6,a=this.time,o=this.barkAt.get(n+e)||-99;if(a-o<r||this.barkBusy&&a<this.barkBusy)return!1;let l=this.buffers.get(`voice/${n}/${e}.wav`)||this.buffers.get(`H:voice/${n}/${e}.flac`);return l?(this.barkAt.set(n+e,a),this.barkBusy=a+l.duration*.8,this._src(l,{vol:i.vol??.9,pan:i.pan,delay:i.delay||0},this.bus.voice),!0):(this.load(`voice/${n}/${e}.wav`,`voice/${n}/${e}.flac`),!1)}setListener(t,e,i){this.listener.x=t,this.listener.z=e,this.listener.h=i}level(){if(!this.analyser)return 0;let t=new Float32Array(this.analyser.fftSize);this.analyser.getFloatTimeDomainData(t);let e=0;for(let i of t)e+=i*i;return Math.sqrt(e/t.length)}};var $r=(s,t,e)=>Math.max(t,Math.min(e,s)),fl=class{constructor(t,e){this.s=e,this.root=t,this.state={steer:0,throttle:0,brake:0,drift:!1,driftPressed:!1,itemDown:!1,itemUp:!1,look:!1,gas:!1},this.keys=new Set,this.touch={steer:0,gas:!1,brake:!1,drift:!1,look:!1,item:!1},this.pad={steer:0,gas:!1,brake:!1,drift:!1,look:!1,item:!1,start:!1},this.tilt=0,this.prev={drift:!1,item:!1},this.active=!1,this.slider=null,this.padPrev={},this.buildTouch(),this.bindKeys(),this.bindTilt()}buildTouch(){let t=this.root;t.innerHTML=`
      <div class="tc-slider" id="tcSlider"><div class="tc-track"></div><div class="tc-thumb" id="tcThumb"></div><div class="tc-hint">STEER</div></div>
      <button class="tc-btn tc-drift" id="tcDrift"><span>DRIFT</span></button>
      <button class="tc-btn tc-item" id="tcItem"><span>ITEM</span></button>
      <button class="tc-btn tc-gas" id="tcGas"><span>GAS</span></button>
      <button class="tc-btn tc-brake" id="tcBrake"><span>BRAKE</span></button>
      <button class="tc-btn tc-look" id="tcLook"><span>BACK</span></button>`;let e=t.querySelector("#tcSlider"),i=t.querySelector("#tcThumb"),n=null,r=l=>{let c=e.getBoundingClientRect(),h=$r((l.clientX-c.left)/c.width,0,1),d=(h-.5)*2,u=.04;this.touch.steer=Math.abs(d)<u?0:$r((d-Math.sign(d)*u)/(1-u)*(this.s.steerSens||1.15),-1,1),i.style.left=h*100+"%"};e.addEventListener("pointerdown",l=>{n=l.pointerId,e.setPointerCapture(n),r(l),e.classList.add("on"),l.preventDefault()}),e.addEventListener("pointermove",l=>{l.pointerId===n&&(r(l),l.preventDefault())});let a=l=>{l.pointerId===n&&(n=null,this.touch.steer=0,i.style.left="50%",e.classList.remove("on"))};e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a),e.addEventListener("lostpointercapture",a);let o=(l,c)=>{let h=t.querySelector(l),d=f=>{this.touch[c]=!0,h.classList.add("on"),f.preventDefault();try{h.setPointerCapture(f.pointerId)}catch{}},u=f=>{this.touch[c]=!1,h.classList.remove("on"),f.preventDefault()};h.addEventListener("pointerdown",d),h.addEventListener("pointerup",u),h.addEventListener("pointercancel",u),h.addEventListener("lostpointercapture",u),h.addEventListener("contextmenu",f=>f.preventDefault())};o("#tcDrift","drift"),o("#tcItem","item"),o("#tcGas","gas"),o("#tcBrake","brake"),o("#tcLook","look"),this.elItem=t.querySelector("#tcItem")}bindKeys(){let t={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowUp:"gas",KeyW:"gas",ArrowDown:"brake",KeyS:"brake",Space:"drift",ShiftLeft:"drift",ShiftRight:"drift",KeyE:"item",KeyQ:"item",KeyC:"look",KeyB:"look"};addEventListener("keydown",e=>{let i=t[e.code];i&&(this.keys.add(i),this.active&&e.preventDefault()),(e.code==="Escape"||e.code==="KeyP")&&this.onPause&&this.onPause()}),addEventListener("keyup",e=>{let i=t[e.code];i&&this.keys.delete(i)}),addEventListener("blur",()=>this.keys.clear())}bindTilt(){this.tiltOn=!1,this._to=t=>{if(t.gamma===null)return;let i=(screen.orientation&&screen.orientation.type||"").startsWith("landscape")?screen.orientation.angle===270?-t.beta:t.beta:t.gamma;this.tilt=$r(i/28,-1,1)}}async enableTilt(t){if(t)try{return typeof DeviceOrientationEvent<"u"&&DeviceOrientationEvent.requestPermission&&await DeviceOrientationEvent.requestPermission()!=="granted"?!1:(addEventListener("deviceorientation",this._to),this.tiltOn=!0,!0)}catch{return!1}return removeEventListener("deviceorientation",this._to),this.tiltOn=!1,this.tilt=0,!0}pollPad(){let t=navigator.getGamepads?navigator.getGamepads():[],e=null;for(let o of t)if(o&&o.connected){e=o;break}this.padConnected=!!e;let i=this.pad;if(!e){i.steer=0,i.gas=i.brake=i.drift=i.look=i.item=!1;return}let n=e.axes[0]||0;i.steer=Math.abs(n)<.12?0:$r((n-Math.sign(n)*.12)/.88,-1,1);let r=o=>e.buttons[o]&&(e.buttons[o].pressed||e.buttons[o].value>.5);i.gas=r(0)||r(7)||e.buttons[7]&&e.buttons[7].value>.2,i.brake=r(1)&&!r(5)?!0:r(6),i.drift=r(5)||r(1)&&!1||r(4)&&!1||r(2),i.item=r(3)||r(4)||r(2)&&!1,i.look=r(10)||r(11),e.axes[1]>.7&&e.axes[3]>.7&&(i.look=!0);let a=r(9);a&&!this.padPrev.start&&this.onPause&&this.onPause(),this.padPrev.start=a,i.start=a,r(14)&&(i.steer=-1),r(15)&&(i.steer=1)}poll(t){this.pollPad();let e=this.keys,i=this.touch,n=this.pad,r=this.state,a=i.steer;e.has("left")&&(a=-1),e.has("right")&&(a=1),Math.abs(n.steer)>Math.abs(a)&&(a=n.steer),this.tiltOn&&Math.abs(this.tilt)>Math.abs(a)&&(a=this.tilt),r.steer=$r(a,-1,1);let o=i.gas||e.has("gas")||n.gas;r.gas=o,r.throttle=o||t&&this.autoOn?1:0,r.brake=i.brake||e.has("brake")||n.brake?1:0,r.brake&&(r.throttle=0);let l=i.drift||e.has("drift")||n.drift;l&&!this.prev.drift&&(r.driftPressed=!0),r.drift=l,this.prev.drift=l;let c=i.item||e.has("item")||n.item;return c&&!this.prev.item&&(r.itemDown=!0),!c&&this.prev.item&&(r.itemUp=!0),this.prev.item=c,r.look=i.look||e.has("look")||n.look,r}reset(){this.state.itemDown=this.state.itemUp=this.state.driftPressed=!1,this.prev.drift=this.prev.item=!1}};var pl=class{constructor(t){this.renderer=t,this.scene=new Ni,this.cam=new Ue(34,1,.1,100),this.t=0,this.kart=null,this.spin=!0,this.rot=.6,this.zoom=1,this.focus="kart",this.scene.background=new Dt(857648);let e=new dr(857648,18,48);this.scene.fog=e;let i=new Un(t),n=new Ni;n.background=new Dt(2109536);let r=(f,g,x,m,p,y,A)=>{let v=new Ut(new De(m,p),new ie({color:new Dt(y).multiplyScalar(A),side:Ae}));v.position.set(f,g,x),v.lookAt(0,0,0),n.add(v)};r(8,6,6,8,3,16777215,6),r(-9,4,-3,6,6,7320831,3),r(0,10,-8,12,2,16767130,4),r(0,3,10,14,2,16743080,2),this.scene.environment=i.fromScene(n,.03).texture,i.dispose(),this.scene.add(new Rn(11192575,1712192,.9));let a=new Ui(16773341,2.4);a.position.set(5,8,6),this.scene.add(a);let o=new Ui(7317759,2.2);o.position.set(-6,4,-5),this.scene.add(o);let l=new Ut(new Zn(30,48),new Ge({color:1582150,roughness:.35,metalness:.6,envMapIntensity:.8}));l.rotation.x=-Math.PI/2,this.scene.add(l);let c=new Ut(new hn(3.4,3.55,64),new ie({color:5093631,transparent:!0,opacity:.8}));c.rotation.x=-Math.PI/2,c.position.y=.02,this.scene.add(c);let h=new Ut(new hn(4.3,4.34,64),new ie({color:16765503,transparent:!0,opacity:.5}));h.rotation.x=-Math.PI/2,h.position.y=.02,this.scene.add(h),this.ring=c;let d=new Float32Array(300*3);for(let f=0;f<300;f++){let g=Math.random()*6.28,x=6+Math.random()*20;d[f*3]=Math.cos(g)*x,d[f*3+1]=Math.random()*10,d[f*3+2]=Math.sin(g)*x}let u=new fe;u.setAttribute("position",new Se(d,3)),this.stars=new $n(u,new Ps({color:10473727,size:.12,transparent:!0,opacity:.7})),this.scene.add(this.stars),this.portraitRT=new Qe(256,256,{colorSpace:Ee}),this.portraits=new Map}setKart(t,e){this.kart&&this.scene.remove(this.kart.root),this.kart=Hs(t,e),this.scene.add(this.kart.root),this.kart.root.rotation.y=this.rot}render(t,e,i,n=0){if(this.t+=t,this.kart){this.spin&&(this.rot+=t*.5),this.kart.root.rotation.y=this.rot;for(let l of this.kart.wheels)l.spin.rotation.x+=t*2;this.kart.driver&&(this.kart.driver.root.rotation.y=Math.sin(this.t*1.5)*.12),this.kart.body.position.y+=Math.sin(this.t*2)*.012-(this.kart.body.userData.by||0),this.kart.body.userData.by=Math.sin(this.t*2)*.012}this.stars.rotation.y+=t*.02;let r=e/i;this.cam.aspect=r;let a=(r<1?15.5:10.5)*this.zoom,o=.5;this.cam.position.set(Math.sin(o)*a*.35,a*.26,Math.cos(o)*a*.95),this.cam.lookAt(r<1?0:-0,r<1?.2:.6,0),r>=1?this.cam.setViewOffset(e,i,-e*.16*(n||0),0,e,i):this.cam.clearViewOffset(),this.cam.updateProjectionMatrix(),this.renderer.render(this.scene,this.cam)}portrait(t,e=256){let i=t+e;if(this.portraits.has(i))return this.portraits.get(i);let n=Kc(t),r=new Ni;r.background=new Dt(2375802),r.environment=this.scene.environment,r.add(new Rn(13623551,3820160,1.2));let a=new Ui(16773341,2.6);a.position.set(2,3,4),r.add(a);let o=new Ui(8368383,2.2);o.position.set(-3,2,-2),r.add(o),n.root.position.set(0,-1.1,0),n.root.rotation.y=Math.PI+.35,r.add(n.root);let l=new Ue(30,1,.1,20);l.position.set(-.7,.45,-3.1),n.root.rotation.y=0,l.position.set(1,.5,3.3),l.lookAt(0,.1,0),n.root.rotation.y=-.2,e!==this.portraitRT.width&&this.portraitRT.setSize(e,e);let c=this.renderer,h=c.getRenderTarget();c.setRenderTarget(this.portraitRT),c.render(r,l);let d=new Uint8Array(e*e*4);c.readRenderTargetPixels(this.portraitRT,0,0,e,e,d),c.setRenderTarget(h);let u=document.createElement("canvas");u.width=u.height=e;let f=u.getContext("2d"),g=f.createImageData(e,e);for(let m=0;m<e;m++)g.data.set(d.subarray((e-1-m)*e*4,(e-m)*e*4),m*e*4);f.putImageData(g,0,0);let x=u.toDataURL("image/png");return this.portraits.set(i,x),x}};var Oi=s=>`<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">${s}</svg>`,Ei={pod:Oi('<defs><linearGradient id="gp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7bffb0"/><stop offset="1" stop-color="#14a05a"/></linearGradient></defs><path d="M24 4c8 6 11 14 11 22 0 6-3 12-11 18-8-6-11-12-11-18 0-8 3-16 11-22z" fill="url(#gp)" stroke="#0b5e33" stroke-width="2"/><circle cx="24" cy="20" r="5" fill="#eafff3"/><path d="M17 36c2 4 4 6 7 8 3-2 5-4 7-8-4 2-10 2-14 0z" fill="#ffd23f"/>'),trio:Oi('<g fill="#3fe08a" stroke="#0b5e33" stroke-width="2"><path d="M10 10c5 3 7 8 7 13 0 4-2 8-7 12-5-4-7-8-7-12 0-5 2-10 7-13z"/><path d="M24 6c6 4 8 10 8 16 0 5-3 10-8 14-5-4-8-9-8-14 0-6 2-12 8-16z"/><path d="M38 10c5 3 7 8 7 13 0 4-2 8-7 12-5-4-7-8-7-12 0-5 2-10 7-13z"/></g><g fill="#ffd23f"><circle cx="10" cy="39" r="3"/><circle cx="24" cy="41" r="3.4"/><circle cx="38" cy="39" r="3"/></g>'),disc:Oi('<circle cx="24" cy="24" r="19" fill="#35a7ff" stroke="#0b3f7a" stroke-width="2.5"/><circle cx="24" cy="24" r="13" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="8 5"/><circle cx="24" cy="24" r="5.5" fill="#ffd23f" stroke="#7a5a00" stroke-width="2"/>'),peel:Oi('<path d="M8 30C10 14 24 6 40 10c-6 2-12 8-12 18 0 4 2 8 4 10-8 2-18 0-24-8z" fill="#ffd23f" stroke="#8a6200" stroke-width="2.5" stroke-linejoin="round"/><path d="M36 8l5-3" stroke="#6b4a1e" stroke-width="4" stroke-linecap="round"/><path d="M14 30c4 4 10 6 16 5" fill="none" stroke="#fff3b0" stroke-width="2.5" stroke-linecap="round"/>'),spill:Oi('<path d="M24 5c4 7 14 13 14 23a14 14 0 0 1-28 0C10 18 20 12 24 5z" fill="#7d4be0" stroke="#2d1470" stroke-width="2.5"/><ellipse cx="18" cy="26" rx="3.4" ry="5.5" fill="#caa8ff" opacity=".8" transform="rotate(20 18 26)"/><circle cx="31" cy="33" r="2.6" fill="#caa8ff" opacity=".7"/>'),rocket:Oi('<path d="M24 3c7 5 9 12 9 19v10H15V22c0-7 2-14 9-19z" fill="#f4f4f4" stroke="#444" stroke-width="2"/><path d="M24 3c4 3 6 7 7 11H17c1-4 3-8 7-11z" fill="#ff4d4d"/><circle cx="24" cy="21" r="4" fill="#4db8ff" stroke="#234" stroke-width="1.6"/><path d="M15 26l-7 9 7-2zM33 26l7 9-7-2z" fill="#ff4d4d" stroke="#7a1a1a" stroke-width="1.6"/><path d="M19 33c0 6 2 9 5 12 3-3 5-6 5-12z" fill="#ffb02e"/>'),jolt:Oi('<path d="M28 2L10 27h11l-4 19L38 19H26z" fill="#fff25a" stroke="#8a6a00" stroke-width="2.6" stroke-linejoin="round"/>'),nova:Oi('<path d="M24 3l5.5 12.5L43 17l-10 9.5L35.5 40 24 33l-11.5 7L15 26.5 5 17l13.5-1.5z" fill="#ffb02e" stroke="#8a4a00" stroke-width="2.4" stroke-linejoin="round"/><circle cx="24" cy="24" r="5" fill="#fff4c0"/>'),veil:Oi('<path d="M8 42V22C8 11 15 5 24 5s16 6 16 17v20l-5-5-5 5-6-5-6 5-5-5z" fill="#e5dcff" stroke="#5a49a8" stroke-width="2.4" stroke-linejoin="round"/><circle cx="18" cy="22" r="3.2" fill="#3a2f78"/><circle cx="30" cy="22" r="3.2" fill="#3a2f78"/><path d="M19 30c3 3 7 3 10 0" fill="none" stroke="#3a2f78" stroke-width="2.4" stroke-linecap="round"/>'),coin:Oi('<circle cx="24" cy="24" r="20" fill="#ffc928" stroke="#8a5a00" stroke-width="2.5"/><circle cx="24" cy="24" r="13" fill="none" stroke="#fff0a0" stroke-width="2.5"/><path d="M24 14v20M19 19h8a4 4 0 0 1 0 6h-6a4 4 0 0 0 0 6h8" fill="none" stroke="#8a5a00" stroke-width="3" stroke-linecap="round"/>'),lock:Oi('<rect x="9" y="21" width="30" height="22" rx="4" fill="#c9d3e6" stroke="#4a5a7a" stroke-width="2.4"/><path d="M15 21v-6a9 9 0 0 1 18 0v6" fill="none" stroke="#4a5a7a" stroke-width="4"/><circle cx="24" cy="32" r="3.4" fill="#4a5a7a"/>')};var gl={};uf(gl,{PART_FIELDS:()=>Wd,STARTER_COINS:()=>Gd,buy:()=>sh,charPrice:()=>Xd,fmtTime:()=>Vs,load:()=>ih,owns:()=>Bn,priceOf:()=>Yr,reset:()=>nh,save:()=>ml});var eh="sparkdrift.save.v1",Gd=600;function Vd(){let s={};for(let t of Et.bodies)s[t.name]=zs(t.name);return{v:1,coins:Gd,chars:Et.characters.filter(t=>t.free&&t.playable).map(t=>t.name),bodies:Et.bodies.filter(t=>!t.price).map(t=>t.name),parts:{wheel:["Six-Spoke Standard"],spoiler:["None"],exhaust:["Stock Pipe"],bumper:["Stock Bumper"]},unlockAll:!1,sel:{char:"Pip Thistledown",body:"Corsa Standard"},builds:s,settings:{master:1,music:.8,sfx:1,voice:1,engine:1,quality:"standard",autoGas:!0,steerSens:1.15,tilt:!1,hq:!1,shake:!0,fps:"auto"},bests:{},ghosts:{},stats:{races:0,wins:0,coinsEarned:0},daily:{},created:Date.now()}}function ih(){let s;try{s=JSON.parse(localStorage.getItem(eh))}catch{s=null}let t=Vd();return!s||s.v!==1?t:(s={...t,...s,settings:{...t.settings,...s.settings||{}},parts:{...t.parts,...s.parts||{}},sel:{...t.sel,...s.sel||{}},builds:{...t.builds,...s.builds||{}}},s)}function ml(s){try{localStorage.setItem(eh,JSON.stringify(s))}catch{}}function nh(){try{localStorage.removeItem(eh)}catch{}return Vd()}var Wd={wheel:"wheels",spoiler:"spoilers",exhaust:"exhausts",bumper:"bumpers"};function Xd(s){return s.free?0:900}function Bn(s,t,e){return s.unlockAll?!0:t==="char"?s.chars.includes(e):t==="body"?s.bodies.includes(e):(s.parts[t]||[]).includes(e)}function Yr(s,t){if(s==="char"){let i=Et.characters.find(n=>n.name===t);return i?Xd(i):0}return s==="body"?(Et.bodies.find(i=>i.name===t)||{}).price||0:((Et[Wd[s]]||[]).find(i=>i.name===t)||{}).price||0}function sh(s,t,e){if(Bn(s,t,e))return!0;let i=Yr(t,e);return s.coins<i?!1:(s.coins-=i,t==="char"?s.chars.push(e):t==="body"?s.bodies.push(e):s.parts[t].push(e),ml(s),!0)}function Vs(s){if(s==null)return"--:--.---";let t=Math.floor(s/60),e=s-t*60;return t+":"+(e<10?"0":"")+e.toFixed(3)}var C_={S:"Speed",A:"Accel",H:"Handling",G:"Grip",W:"Weight"},qd=s=>(s>0?"+":"")+s.toFixed(1);function $d(s,t){let e=s.save,i=s.audio,n=s.showroom,r=s.screenEl(),a=s.garageTab||"racer",o=e.sel.body,l=e.sel.char,c={...e.builds[o]},h=()=>Et.characters.find(E=>E.name===l),d=()=>Hr(c,h().cls),u=()=>Hr(zs(o),h().cls),f=()=>{let E=[];Bn(e,"body",o)||E.push(["body",o]);for(let C of["wheel","spoiler","exhaust","bumper"])Bn(e,C,c[C])||E.push([C,c[C]]);return E},g=()=>f().reduce((E,[C,P])=>E+Yr(C,P),0),x=()=>{f().length===0&&(e.builds[o]={...c},e.sel.body=o,e.sel.char=l,s.persist())},m=()=>n.setKart(c,l),p=(E,C)=>{let P=Yr(E,C);return Bn(e,E,C)?P?'<div class="pr" style="color:#7bffb0">Owned</div>':'<div class="pr" style="color:#7bffb0">Free</div>':`<div class="pr">${Ei.coin}${P}</div>`},y=(E,C,P)=>C.map(D=>{let L=["S","A","H","G","W"].filter(X=>D[X]).map(X=>`${X}${qd(D[X])}`).join(" "),O=Bn(e,E,D.name);return`<div class="chip ${P===D.name?"on":""} ${O?"":"locked"}" data-kind="${E}" data-name="${D.name}">${O?"":`<div class="lk">${Ei.lock}</div>`}<div class="n">${D.name}</div><div class="d">${L||"no change"}${D.off?" \xB7 off-road "+qd(D.off):""}</div>${p(E,D.name)}</div>`}).join(""),A=(E,C,P)=>E.map((D,L)=>`<div class="sw ${C===L?"on":""}" ${P}="${L}" title="${D.name}" style="background:${D.hex==="rainbow"?"conic-gradient(red,orange,yellow,lime,cyan,blue,magenta,red)":D.hex}"></div>`).join(""),v=()=>a==="racer"?`<div class="chips">${Et.characters.filter(E=>E.playable).map(E=>`<div class="pcard ${E.name===l?"on":""}" data-char="${E.name}"><img src="${n.portrait(E.name)}" alt=""><div class="n">${E.name}<br><span class="pill ${E.cls}">${E.cls}</span></div></div>`).join("")}</div><div style="font-size:12px;color:var(--mut)" id="charInfo"></div>`:a==="kart"?`<div class="chips">${Et.bodies.map(E=>{let C=Bn(e,"body",E.name);return`<div class="chip ${E.name===o?"on":""} ${C?"":"locked"}" data-body="${E.name}" style="min-width:150px">${C?"":`<div class="lk">${Ei.lock}</div>`}<div class="n">${E.name}</div><div class="d">${E.family} \xB7 S${E.S} A${E.A} H${E.H} G${E.G} W${E.W}</div><div class="d">${E.desc}</div>${p("body",E.name)}</div>`}).join("")}</div>`:a==="wheels"?`<div class="chips">${y("wheel",Et.wheels,c.wheel)}</div><div class="row wrap" style="gap:14px"><div><div class="d" style="font-size:11px;color:var(--mut);font-weight:800">SIZE</div><div class="seg" id="sizes">${Et.wheelSizes.map((E,C)=>`<button data-size="${C}" class="${c.size===C?"on":""}">${E.size}</button>`).join("")}</div></div><div><div style="font-size:11px;color:var(--mut);font-weight:800">RIM FINISH</div><div class="seg" id="rimfin">${Et.rimFinishes.map((E,C)=>`<button data-rf="${C}" class="${c.rimFinish===C?"on":""}">${E}</button>`).join("")}</div></div></div><div style="font-size:11px;color:var(--mut);font-weight:800">RIM COLOUR</div><div class="chips">${A(Et.rimColors,c.rim,"data-rim")}</div>`:a==="wing"?`<div class="chips">${y("spoiler",Et.spoilers,c.spoiler)}</div>`:a==="exhaust"?`<div class="chips">${y("exhaust",Et.exhausts,c.exhaust)}</div>`:a==="bumper"?`<div class="chips">${y("bumper",Et.bumpers,c.bumper)}</div>`:a==="paint"?`<div style="font-size:11px;color:var(--mut);font-weight:800">PAINT</div><div class="chips">${A(Et.paintColors,c.paint,"data-paint")}</div><div class="row wrap" style="gap:14px"><div><div style="font-size:11px;color:var(--mut);font-weight:800">FINISH</div><div class="seg" id="fin">${Et.paintFinishes.map((E,C)=>`<button data-fin="${C}" class="${c.finish===C?"on":""}">${E}</button>`).join("")}</div></div><div><div style="font-size:11px;color:var(--mut);font-weight:800">TWO-TONE</div><div class="chips" style="padding:0"><div class="chip ${c.twoTone<0?"on":""}" data-tt="-1" style="min-width:60px"><div class="n">None</div></div>${Et.twoTone.map((E,C)=>`<div class="chip ${c.twoTone===C?"on":""}" data-tt="${C}" style="min-width:90px"><div class="n">${E}</div></div>`).join("")}</div></div></div>${c.twoTone>=0?`<div style="font-size:11px;color:var(--mut);font-weight:800">ACCENT COLOUR</div><div class="chips">${A(Et.paintColors,c.paint2,"data-paint2")}</div>`:""}`:a==="decals"?`<div class="chips"><div class="chip ${c.decal<0?"on":""}" data-decal="-1" style="min-width:60px"><div class="n">None</div></div>${Et.decals.map((E,C)=>`<div class="chip ${c.decal===C?"on":""}" data-decal="${C}" style="min-width:110px"><div class="n">${E}</div></div>`).join("")}</div><div style="font-size:11px;color:var(--mut);font-weight:800">DECAL COLOUR</div><div class="chips">${["#ffffff","#111111","#ffd23f","#ff4d6d","#4db8ff","#37e08a","#b66bff","#ff8a2e"].map(E=>`<div class="sw ${c.decalColor===E?"on":""}" data-dc="${E}" style="background:${E}"></div>`).join("")}</div>`:"",S=()=>{let E=d(),C=u();return["S","A","H","G","W"].map(P=>{let D=E[P]-C[P];return`<div class="stat"><span>${C_[P]}</span><div class="bar"><i style="width:${E[P]*10}%"></i>${D>.05?`<i class="d" style="position:absolute;left:${C[P]*10}%;top:0;width:${D*10}%;background:#7bffb0"></i>`:""}</div><span>${E[P].toFixed(1)}</span></div>`}).join("")+`<div style="font-size:11px;color:var(--mut);margin-top:2px">Top ${Math.round(E.vmax*4)} km/h \xB7 0\u219290% in ${E.t90.toFixed(1)}s \xB7 class ${h().cls}</div>`},w=()=>{let E=f(),C=g();r.innerHTML=`<div class="topbar"><h2>Garage</h2>${t.html(document.createElement("div"),s.coinsBadge()).innerHTML}</div><div class="grow" id="spacer"></div>
    <div class="panel col" id="gpanel" style="padding:10px 12px;gap:8px;max-height:56vh"><div class="tabs">${["racer","kart","wheels","wing","exhaust","bumper","paint","decals"].map(P=>`<div class="tab ${a===P?"on":""}" data-tab="${P}">${P}</div>`).join("")}</div>
    <div class="row wrap" style="align-items:flex-start;gap:14px"><div class="col grow scroll" id="gbody" style="min-width:min(100%,360px);flex:2;gap:6px;max-height:34vh">${v()}</div><div class="col" style="flex:1;min-width:210px;gap:5px">${S()}</div></div>
    <div class="row"><button class="btn ghost" id="back">Back</button><div class="grow"></div>${E.length?`<button class="btn" id="buy" ${e.coins<C?"disabled":""}>Buy & equip \xB7 ${C}\u25C9</button>`:'<span style="font-weight:800;color:#7bffb0">Saved \u2713</span>'}</div></div>`,r.querySelector(".topbar").lastElementChild.id="coinsBadge",_()},R=(E,C)=>r.querySelectorAll(E).forEach(P=>P.onclick=()=>{s.ui("ui_click"),C(P)}),_=()=>{R("[data-tab]",P=>{a=P.dataset.tab,s.garageTab=a,w()}),R("[data-char]",P=>{l=P.dataset.char,e.sel.char=l,s.persist(),w(),m();let D=qr[l];s.audio.preloadVoices([D],["ready","taunt","win"]).then(()=>s.audio.bark(l,"ready",{cooldown:0}))}),R("[data-body]",P=>{o=P.dataset.body,c={...e.builds[o]},w(),m()}),R("[data-kind]",P=>{c[P.dataset.kind]=P.dataset.name,x(),w(),m()}),R("[data-size]",P=>{c.size=+P.dataset.size,x(),w(),m()}),R("[data-rf]",P=>{c.rimFinish=+P.dataset.rf,x(),w(),m()}),R("[data-rim]",P=>{c.rim=+P.dataset.rim,x(),w(),m()}),R("[data-paint]",P=>{c.paint=+P.dataset.paint,x(),w(),m()}),R("[data-paint2]",P=>{c.paint2=+P.dataset.paint2,x(),w(),m()}),R("[data-fin]",P=>{c.finish=+P.dataset.fin,x(),w(),m()}),R("[data-tt]",P=>{c.twoTone=+P.dataset.tt,x(),w(),m()}),R("[data-decal]",P=>{c.decal=+P.dataset.decal,x(),w(),m()}),R("[data-dc]",P=>{c.decalColor=P.dataset.dc,x(),w(),m()});let E=r.querySelector("#charInfo");if(E){let P=h();E.innerHTML=`<b>${P.name}</b> \xB7 ${P.cls} \xB7 ${P.setname}<br>${P.personality}`}let C=r.querySelector("#buy");C&&(C.onclick=()=>{let P=!0;for(let[D,L]of f())P=sh(e,D,L)&&P;P?(s.ui("ui_buy"),x(),s.toast("Purchased!")):s.ui("ui_error"),w()}),r.querySelector("#back").onclick=()=>{s.ui("ui_back"),f().length&&(c={...e.builds[o]}),s.show("menu")}};w(),m(),n.spin=!0,s.garagePanel=r.querySelector("#gpanel");let M=()=>{}}function Yd(s,t){let e=s.screenEl();e.innerHTML='<div class="topbar"><h2>Versus \xB7 room code</h2></div><div class="panel" style="padding:14px">Online lobby loading\u2026</div><div class="row"><button class="btn ghost" id="back">Back</button></div>',e.querySelector("#back").onclick=()=>s.show("menu")}var Ft=(s,t=document)=>t.querySelector(s),P_=(s,t,e)=>Math.max(t,Math.min(e,s)),_l=s=>s+["th","st","nd","rd"][s%100>10&&s%100<14?0:s%10<4?s%10:0],K={v:"1.0.0",save:ih(),screen:"boot",race:null,quality:1,ghost:null,cup:null,mode:"quick",cfg:{},hqState:{on:!1,bytes:0}};window.__app=K;var Zr=new URLSearchParams(location.search),I_=Ft("#gl"),ji=new $o({canvas:I_,antialias:!0,powerPreference:"high-performance",alpha:!1,preserveDrawingBuffer:Zr.has("shot")});ji.outputColorSpace=Ee;ji.toneMapping=wr;ji.toneMappingExposure=1.05;var $s=new Ni,Ys=new Ue(62,1,.3,2600);K.renderer=ji;K.scene=$s;K.camera=Ys;var zi=Math.min(window.devicePixelRatio||1,K.save.settings.quality==="high"?2.5:1.75),vl=zi;K.pr=()=>zi;function Zs(){let s=innerWidth,t=innerHeight;ji.setPixelRatio(zi),ji.setSize(s,t,!1),Ys.aspect=s/t,Ys.updateProjectionMatrix();let e=Ft("#rotate"),i=t>s;e&&e.classList.toggle("hidden",!0)}addEventListener("resize",Zs);addEventListener("orientationchange",()=>setTimeout(Zs,200));Zs();var yl=new pl(ji);K.showroom=yl;var kt=new dl({base:"audio/"});K.audio=kt;window.__audio=kt;var oi=new fl(Ft("#touch"),K.save.settings);K.input=oi;oi.autoOn=K.save.settings.autoGas;oi.onPause=()=>{K.race&&K.race.state==="racing"&&!K.paused&&tf()};var ch={fmt:Vs,ord:_l,icon:s=>Ei[s]||"",coinSvg:Ei.coin,html(s,t){return s.innerHTML=t,s}};function On(s,t,e,i){Ft("#loading").classList.toggle("hidden",!s),t&&(Ft("#ldTitle").textContent=t),e!==void 0&&(Ft("#ldFill").style.width=Math.round(e*100)+"%"),Ft("#ldSub").textContent=i||""}K.setLoading=On;function ai(s,t){let e=document.createElement("div");for(e.className="toast",e.textContent=s,t&&(e.style.color=t),Ft("#toasts").appendChild(e),setTimeout(()=>e.remove(),2e3);Ft("#toasts").children.length>3;)Ft("#toasts").firstChild.remove()}K.toast=ai;function kn(s,t=1100){let e=Ft("#center");e.innerHTML=s,clearTimeout(kn.t),kn.t=setTimeout(()=>{e.innerHTML=""},t)}function ns(){ml(K.save)}K.persist=ns;function xi(s){kt.ready&&kt.play(s,{bus:"ui",min:.03})}K.ui=xi;function qs(){let s=K.save.settings;kt.setVolumes({master:s.master,music:s.music,sfx:s.sfx,voice:s.voice,engine:s.engine}),oi.autoOn=s.autoGas,oi.s.steerSens=s.steerSens}K.applySettings=qs;var hh=Ft("#screens");function ii(s,t){K.screen=s,hh.innerHTML="",Ft("#hud").classList.add("hidden"),Ft("#touch").classList.add("hidden");let e=ss[s];e&&e(t||{})}K.show=ii;var ss={};function rs(s=""){let t=document.createElement("div");return t.className="screen "+s,hh.appendChild(t),t}K.screenEl=rs;function Kr(){return`<div class="coins" id="coinsBadge">${Ei.coin}<span>${K.save.coins}</span></div>`}K.coinsBadge=Kr;K.refreshCoins=()=>{let s=Ft("#coinsBadge span");s&&(s.textContent=K.save.coins)};ss.title=()=>{let s=rs("center");s.style.justifyContent="center",s.style.alignItems="center",s.style.textAlign="center",s.innerHTML=`<div class="col" style="align-items:center;gap:18px"><div class="logo" style="font-size:min(15vw,84px)"><span class="a">Spark</span><span class="b">drift</span><br><span class="a" style="font-size:.55em;letter-spacing:.3em">GP</span></div>
  <div style="color:var(--mut);font-weight:700;max-width:420px">Arcade kart racing built for phones. Drift, boost, outsmart 11 rivals.</div>
  <button class="btn" id="goBtn" style="font-size:20px;padding:16px 38px">Tap to start</button>
  <div style="font-size:12px;color:var(--mut)">\u{1F3A7} Headphones recommended \u2014 the sound is half the game.<br>v${K.v} \xB7 vertical slice \xB7 free & open (see CREDITS)</div></div>`,Ft("#goBtn").onclick=async()=>{await uh(),ii("menu")}};async function uh(){On(!0,"Warming up the engines",.05,"Starting audio");try{await kt.unlock(),await kt.loadManifest(),qs(),On(!0,"Warming up the engines",.3,"Loading menu sounds"),await kt.preloadSfx(["ui_click","ui_hover","ui_confirm","ui_back","ui_error","ui_toggle","ui_tick","ui_buy","ui_unlock","ui_whoosh","coin","lobby_join","lobby_leave","lobby_ready"]),On(!0,"Warming up the engines",.6,"Loading menu music"),await kt.loadMusic("menu")&&kt.startMusic("menu","menu"),kt.startAmbience("menu"),kt.setReverb("menu")}catch(s){console.warn("audio boot",s)}On(!1)}K.bootAudio=uh;ss.menu=()=>{let s=rs(),t=K.save;yl.setKart(t.builds[t.sel.body],t.sel.char),yl.spin=!0,s.innerHTML=`<div class="topbar"><div class="logo" style="font-size:34px"><span class="a">Spark</span><span class="b">drift</span> <span class="a" style="font-size:.6em">GP</span></div>${Kr()}</div>
  <div class="grow row" style="align-items:flex-end;padding-bottom:6px"><div class="col" style="width:min(100%,320px)" id="menuBtns">
    <button class="btn" data-a="gp">Grand Prix <span style="opacity:.7;font-size:12px">\xB7 Seedling Cup</span></button>
    <button class="btn blue" data-a="quick">Quick race</button>
    <button class="btn blue" data-a="tt">Time trial \xB7 ghost</button>
    <button class="btn blue" data-a="daily">Daily challenge</button>
    <button class="btn blue" data-a="online">Versus \xB7 room code</button>
    <div class="row"><button class="btn ghost grow" data-a="garage">Garage</button><button class="btn ghost grow" data-a="settings">Settings</button></div>
  </div></div>`,s.querySelectorAll("[data-a]").forEach(e=>e.onclick=()=>{xi("ui_confirm");let i=e.dataset.a;i==="garage"?ii("garage"):i==="settings"?ii("settings"):i==="online"?ii("lobby"):(K.mode=i,ii("setup"))})};ss.garage=()=>$d(K,ch);ss.lobby=()=>Yd(K,ch);ss.settings=()=>{let s=K.save.settings,t=rs(),e=(n,r)=>`<div><div class="row sp"><b>${r}</b><span id="v_${n}">${Math.round(s[n]*100)}%</span></div><input type="range" min="0" max="100" value="${Math.round(s[n]*100)}" data-k="${n}"></div>`;t.innerHTML=`<div class="topbar"><h2>Settings</h2>${Kr()}</div><div class="panel grow scroll" style="padding:14px;margin-bottom:10px"><div class="col">
  ${e("master","Master volume")}${e("music","Music")}${e("sfx","Effects")}${e("engine","Engines")}${e("voice","Voices & announcer")}
  <div class="toggle"><span>Auto-accelerate after GO<br><small style="color:var(--mut)">GAS pedal still works for the start boost</small></span><div class="sw2 ${s.autoGas?"on":""}" data-t="autoGas"></div></div>
  <div class="toggle"><span>Tilt steering (phone)<br><small style="color:var(--mut)">Overrides the slider when you tilt</small></span><div class="sw2 ${s.tilt?"on":""}" data-t="tilt"></div></div>
  <div class="toggle"><span>Screen shake</span><div class="sw2 ${s.shake?"on":""}" data-t="shake"></div></div>
  <div><div class="row sp"><b>Steering sensitivity</b><span id="v_ss">${s.steerSens.toFixed(2)}</span></div><input type="range" min="80" max="160" value="${Math.round(s.steerSens*100)}" id="ss"></div>
  <div><b>Graphics & audio quality</b><div class="seg" style="margin-top:6px" id="qSeg"><button data-q="standard" class="${s.quality==="standard"?"on":""}">Standard</button><button data-q="high" class="${s.quality==="high"?"on":""}">High</button></div>
  <div style="font-size:12px;color:var(--mut);margin-top:6px" id="hqInfo"></div><div class="row" style="margin-top:8px"><button class="btn small blue" id="hqBtn">Download high-quality pack</button><span id="hqStat" style="font-size:12px;color:var(--mut)"></span></div></div>
  <div class="toggle"><span>Unlock everything (demo)<br><small style="color:var(--mut)">Marks all parts as owned \u2014 for testing the garage</small></span><div class="sw2 ${K.save.unlockAll?"on":""}" data-t="unlockAll"></div></div>
  <div class="row wrap"><button class="btn small ghost" id="rst">Reset save</button><button class="btn small ghost" id="cred">Credits</button></div>
  <div style="font-size:11px;color:var(--mut)">Sparkdrift GP v${K.v} \xB7 pad: left stick steer \xB7 A/RT gas \xB7 X drift \xB7 Y item \xB7 B brake \xB7 LB/RB look back \xB7 Start pause. Keys: arrows/WASD, Space drift, E item, C look back.</div>
  </div></div><div class="row"><button class="btn ghost" id="back">Back</button></div>`,t.querySelectorAll("input[data-k]").forEach(n=>n.oninput=()=>{s[n.dataset.k]=n.value/100,Ft("#v_"+n.dataset.k).textContent=n.value+"%",qs(),ns()}),Ft("#ss").oninput=n=>{s.steerSens=n.target.value/100,Ft("#v_ss").textContent=s.steerSens.toFixed(2),qs(),ns()},t.querySelectorAll("[data-t]").forEach(n=>n.onclick=async()=>{let r=n.dataset.t;xi("ui_toggle"),r==="unlockAll"?(K.save.unlockAll=!K.save.unlockAll,n.classList.toggle("on",K.save.unlockAll)):(s[r]=!s[r],n.classList.toggle("on",s[r])),r==="tilt"&&(await oi.enableTilt(s.tilt)||(s.tilt=!1,n.classList.remove("on"),ai("Tilt not available"))),qs(),ns()});let i=()=>{Ft("#hqInfo").textContent=K.hqState.manifest?`High quality uses lossless 48 kHz stems (\u2248${(K.hqState.manifest.totalBytes/1048576).toFixed(0)} MB total across the 4 tracks and menu, fetched per track on demand and cached) plus 2K/4K textures. Recommended on desktop / recent iPad & iPhone Pro; it needs ~300 MB RAM during a race.`:"High quality pack manifest not loaded.",Ft("#qSeg").querySelectorAll("button").forEach(n=>n.classList.toggle("on",n.dataset.q===s.quality))};Ft("#qSeg").querySelectorAll("button").forEach(n=>n.onclick=async()=>{xi("ui_click"),s.quality=n.dataset.q,await fh(s.quality),ns(),i()}),Ft("#hqBtn").onclick=async()=>{xi("ui_confirm"),await Jd((n,r)=>{Ft("#hqStat").textContent=r})},dh().then(i),i(),Ft("#rst").onclick=()=>{confirm("Reset all progress?")&&(K.save=nh(),ns(),ii("menu"))},Ft("#cred").onclick=()=>{window.open("CREDITS.md","_blank")},Ft("#back").onclick=()=>{xi("ui_back"),ii("menu")}};async function dh(){if(K.hqState.manifest)return K.hqState.manifest;try{let s=await fetch("hq-manifest.json");K.hqState.manifest=await s.json(),kt.hqBase=t=>{let e=K.hqState.manifest,i=e.files[t]||e.files[t.replace(".wav",".flac")];return i?e.repos[i.r]+t:e.repos[e.default]+t}}catch{K.hqState.manifest=null}return K.hqState.manifest}async function fh(s){let t=s==="high";K.save.settings.hq=t,kt.hq=t,t&&await dh(),vl=Math.min(window.devicePixelRatio||1,t?2.5:1.75),zi=Math.min(zi,vl),Zs()}async function Jd(s){let t=await dh();if(!t){s(0,"HQ manifest unavailable");return}let e=Object.keys(t.files).filter(l=>l.startsWith("music/")||l.startsWith("voice/announcer")),i=0,n=0,r=e.reduce((l,c)=>l+t.files[c].b,0);await kt.unlock();let a=e.slice(),o=async()=>{for(;a.length;){let l=a.shift(),c=kt.hqBase(l);try{let h=await caches.open("sdgp-hq-v1"),d=await h.match(c);d||(d=await fetch(c,{mode:"cors"}),d.ok&&await h.put(c,d.clone())),d.ok&&await d.arrayBuffer()}catch{}n+=t.files[l].b,i++,s(n/r,`${(n/1048576).toFixed(0)} / ${(r/1048576).toFixed(0)} MB`)}};await Promise.all([o(),o(),o(),o()]),s(1,"Downloaded & cached")}ss.setup=()=>{let s=K.cfg={track:K.cfg.track||"meadow",laps:K.cfg.laps||3,mirror:!1,reverse:!1,items:!0,...K.cfg},t=K.mode,e=rs(),i={gp:"Grand Prix \xB7 Seedling Cup",quick:"Quick race",tt:"Time trial",daily:"Daily challenge"}[t];if(t==="daily"){let a=Math.floor(Date.now()/864e5),o=l=>{let c=Math.sin(a*12.9898+l*78.233)*43758.5453;return c-Math.floor(c)};s.track=Os[a%4],s.mirror=o(1)>.5,s.reverse=o(2)>.7,s.laps=2,s.items=!0,s.daily=a}let n={meadow:"linear-gradient(#5db8ff,#c9ecff 55%,#6bc24a 56%)",harbor:"linear-gradient(#34509e,#ffb88a 55%,#2f6f8a 56%)",mesa:"linear-gradient(#ff9b4a,#ffe7b0 55%,#e0a65a 56%)",frost:"linear-gradient(#6aa8f0,#eaf5ff 55%,#eef6ff 56%)"},r=Os.map(a=>{let o=es[a],l=K.save.bests[a+(s.mirror?"m":"")+(s.reverse?"r":"")];return`<div class="card ${s.track===a?"on":""}" data-t="${a}"><div class="art" style="background:${n[a]}"></div><div class="t"><b>${o.name}</b><span>${o.cup} \xB7 ${o.theme} \xB7 ${(L_(a)/1e3).toFixed(2)} km</span><br><span>Best: ${Vs(l)}</span></div></div>`}).join("");e.innerHTML=`<div class="topbar"><h2>${i}</h2>${Kr()}</div>
  <div class="grow col scroll" style="gap:10px"><div class="row wrap" id="cards" style="align-items:stretch">${t==="gp"?Os.map((a,o)=>`<div class="card on" style="min-width:140px;cursor:default"><div class="art" style="background:${n[a]};height:60px"></div><div class="t"><b>${o+1}. ${es[a].name}</b></div></div>`).join(""):r}</div>
  <div class="panel" style="padding:12px"><div class="row wrap" style="gap:14px"><div><div style="font-size:11px;color:var(--mut);font-weight:800">LAPS</div><div class="seg" id="laps">${[1,2,3,4,5].map(a=>`<button data-n="${a}" class="${s.laps===a?"on":""}">${a}</button>`).join("")}</div></div>
  ${t==="tt"||t==="daily"?"":`<div class="toggle" style="gap:8px"><span>Items</span><div class="sw2 ${s.items?"on":""}" data-o="items"></div></div>`}
  ${t==="gp"||t==="daily"?"":`<div class="toggle" style="gap:8px"><span>Mirror</span><div class="sw2 ${s.mirror?"on":""}" data-o="mirror"></div></div><div class="toggle" style="gap:8px"><span>Reverse</span><div class="sw2 ${s.reverse?"on":""}" data-o="reverse"></div></div>`}</div>
  <div style="font-size:12px;color:var(--mut);margin-top:6px">${t==="tt"?"Solo run against your best ghost. No items, no rivals.":t==="daily"?"Today's fixed track & setup (same for everyone on this date). Leaderboard: <b>local to this device</b> \u2014 an online board needs the backend described in the production plan.":"12 racers: you + 11 CPU rivals with light rubber-banding."}</div></div></div>
  <div class="row"><button class="btn ghost" id="back">Back</button><div class="grow"></div><button class="btn" id="go" style="font-size:18px;padding:14px 34px">Start</button></div>`,e.querySelectorAll("[data-t]").forEach(a=>a.onclick=()=>{xi("ui_click"),s.track=a.dataset.t,ii("setup")}),e.querySelectorAll("#laps button").forEach(a=>a.onclick=()=>{xi("ui_toggle"),s.laps=+a.dataset.n,e.querySelectorAll("#laps button").forEach(o=>o.classList.toggle("on",o===a))}),e.querySelectorAll("[data-o]").forEach(a=>a.onclick=()=>{xi("ui_toggle"),s[a.dataset.o]=!s[a.dataset.o],ii("setup")}),Ft("#back").onclick=()=>{xi("ui_back"),ii("menu")},Ft("#go").onclick=()=>{xi("ui_confirm"),t==="gp"&&(K.cup={idx:0,pts:{},results:[]},s.track=Os[0],s.mirror=s.reverse=!1),Js()}};var rh={};function L_(s){return rh[s]||(rh[s]=Jo(s).length),rh[s]}var D_=Et.characters.filter(s=>s.free).map(s=>s.name);function N_(s){let t=Et.bodies.map(n=>n.name),e=n=>Math.floor(Math.random()*n),i=zs(t[s%t.length]);return i.paint=e(Et.paintColors.length),i.finish=e(5),i.wheel=Et.wheels[e(Et.wheels.length)].name,i.size=1+e(3),i.rim=e(Et.rimColors.length),i.spoiler=Et.spoilers[e(Et.spoilers.length)].name,i.exhaust=Et.exhausts[e(Et.exhausts.length)].name,i.bumper=Et.bumpers[e(Et.bumpers.length)].name,e(3)===0&&(i.twoTone=e(8),i.paint2=e(32)),e(2)===0&&(i.decal=e(24),i.decalColor="#ffffff"),i}async function U_(s,t,e){if(!kt.ready)return;let i=es[s],n=[],r=Object.keys(kt.sfxMan),a=Object.keys(kt.voiceMan.announcer).filter(u=>!u.startsWith("welcome")&&u!=="room_ready"&&u!=="player_joined"&&u!=="player_left"&&u!=="unlocked"&&u!=="pod_ready"),o=0,l=5,c=u=>{o++,e&&e(o/l,u)};await kt.preloadSfx(r),c("Sound effects"),await kt.preloadEngines(["light","medium","heavy"]),c("Engines"),await kt.preloadAnnouncer(a),c("Announcer");let h=["boost1","boost2","hit","spin","item","attack","overtake","overtaken","final","lose","shortcut","ready","taunt","win"],d=t.map(u=>u.id);await Promise.all(t.map(u=>kt.preloadVoices([u.id],u.local?h:["spin","overtake","overtaken","taunt","hit"]))),c("Voices"),await kt.load(`amb/${i.amb}.wav`,`amb/${i.amb}.flac`),await kt.loadMusic(i.music),c("Music")}async function Js(s={}){let t=K.cfg,e=K.save,i=t.track,n=es[i];On(!0,n.name,.02,"Preparing race"),await new Promise(g=>setTimeout(g,30)),K.race&&Ks();let r=K.mode==="tt",a=e.builds[e.sel.body],o={id:0,name:e.sel.char,build:a,human:!0,local:!0},l=[o],c=r?0:6;if(!r){let g=D_.filter(p=>p!==e.sel.char),x=[],m=0;for(;x.length<11;)x.push({id:x.length+1,name:g[m%g.length],build:N_(m+3),cpu:!0,human:!1,skill:.84+Math.random()*.15}),m++;l=x.slice(),l.splice(c,0,o)}let h=s.net||null;h&&(l=h.players);let d=l.map(g=>({id:qr[g.name],local:!!g.local})).filter((g,x,m)=>m.findIndex(p=>p.id===g.id)===x);await U_(i,d,(g,x)=>On(!0,n.name,.1+g*.8,"Loading "+x));let u=K.quality;await new Promise(g=>setTimeout(g,10));let f=new hl({scene:$s,renderer:ji,camera:Ys,audio:kt,trackId:i,laps:t.laps,mirror:t.mirror,reverse:t.reverse,itemsOn:r?!1:t.items,players:l,quality:u,hq:e.settings.hq,ui:H_,netId:h?h.myId:"L",rnd:h?h.rnd:Math.random,introSec:2.6});if(f.net=h?h.link:null,K.race=f,K.paused=!1,h&&h.attach(f),r){let g=jd(),x=e.ghosts[g];x?K.ghost=F_(x,a,e.sel.char):K.ghost=null,K.rec={t:0,a:[]}}else K.ghost=null;f.state="grid",hh.innerHTML="",On(!1),O_(f),Ft("#hud").classList.remove("hidden"),Ft("#touch").classList.remove("hidden"),oi.active=!0,oi.reset(),f.input=oi.state,K.screen="race",K.resultsShown=!1,kt.stopMusic(.6),kt.musicBufs&&kt.musicMeta&&kt.musicMeta.piece===n.music&&kt.startMusic(n.music,"grid"),f.start()}K.startRace=Js;function jd(){let s=K.cfg;return s.track+(s.mirror?"m":"")+(s.reverse?"r":"")+s.laps}function F_(s,t,e){let i=Hs(t,e);return i.root.traverse(n=>{if(n.material){let r=n.material.clone();r.transparent=!0,r.opacity=.38,r.depthWrite=!1,n.material=r}}),$s.add(i.root),i.root.visible=!1,{k:i,d:s,i:0}}function B_(s){let t=K.ghost;if(!t||s.state!=="racing")return;let e=s.t*10,i=Math.floor(e),n=t.d;if(i+1>=n.length/3){t.k.root.visible=!1;return}let r=e-i,a=n[i*3]/10,o=n[i*3+1]/10,l=n[i*3+2]/100,c=n[i*3+3]/10,h=n[i*3+4]/10,u=n[i*3+5]/100-l;for(;u>Math.PI;)u-=6.2832;for(;u<-Math.PI;)u+=6.2832;t.k.root.visible=!0,t.k.root.position.set(a+(c-a)*r,0,o+(h-o)*r),t.k.root.rotation.y=l+u*r;for(let f of t.k.wheels)f.spin.rotation.x+=.5}function k_(s,t){let e=K.rec;if(!e||s.state!=="racing")return;e.t+=t;let i=s.localKart;for(;e.a.length/3<Math.floor(s.t*10)+1;)e.a.push(Math.round(i.sim.x*10),Math.round(i.sim.z*10),Math.round(i.sim.th*100))}function Ks(){K.race&&(K.ghost&&($s.remove(K.ghost.k.root),K.ghost=null),K.net&&K.net.detach&&K.net.detach(),K.race.dispose(),K.race=null,oi.active=!1,Ft("#center").innerHTML="",Ft("#fxlines").classList.add("hidden"))}K.endRace=Ks;var Xe={};function O_(s){let t=Ft("#hud");t.innerHTML=`<div class="pos" id="hPos">7<small>th</small><span class="of">/12</span></div><div class="lap" id="hLap">LAP 1/3</div><div class="time" id="hTime">0:00.00</div>
  <div class="slot" id="hSlot"></div><div class="lock" id="hLock">\u25B2 ROCKET LOCK \u25B2</div><div class="mini"><canvas id="hMini" width="248" height="248"></canvas></div><div class="coin" id="hCoin">${Ei.coin}<span>0</span></div>
  <div class="charge" id="hCharge"><i></i><i></i><i></i></div><div class="spd"><span id="hSpd">0</span><small>KM/H</small></div>`;let e=document.createElement("button");e.className="pausebtn",e.textContent="II",e.onclick=()=>tf(),t.appendChild(e),e.style.pointerEvents="auto",e.style.display="block",Xe={pos:Ft("#hPos"),lap:Ft("#hLap"),time:Ft("#hTime"),slot:Ft("#hSlot"),lock:Ft("#hLock"),mini:Ft("#hMini"),coin:Ft("#hCoin span"),charge:Ft("#hCharge"),spd:Ft("#hSpd"),last:{}};let i=s.track,n=Xe.mini,r=n.getContext("2d");Xe.g=r;let a=i.p,o=1e9,l=-1e9,c=1e9,h=-1e9;for(let v of a)o=Math.min(o,v[0]),l=Math.max(l,v[0]),c=Math.min(c,v[1]),h=Math.max(h,v[1]);let d=n.width,u=22,f=(d-u*2)/Math.max(l-o,h-c);Xe.map={sc:f,ox:u+(d-u*2-(l-o)*f)/2,oz:u+(d-u*2-(h-c)*f)/2,minx:o,maxz:h,minz:c,maxx:l};let g=document.createElement("canvas");g.width=g.height=d;let x=g.getContext("2d");x.lineJoin="round",x.lineCap="round";let m=v=>Qd(v[0],v[1]),p=(v,S,w)=>{x.beginPath(),v.forEach((R,_)=>{let M=m(R);_?x.lineTo(M[0],M[1]):x.moveTo(M[0],M[1])}),x.closePath(),x.lineWidth=S,x.strokeStyle=w,x.stroke()};p(a.filter((v,S)=>S%2===0),15,"rgba(255,255,255,.25)"),p(a.filter((v,S)=>S%2===0),10,"rgba(255,255,255,.9)"),i.sc&&(x.beginPath(),i.sc.p.forEach((v,S)=>{let w=m(v);S?x.lineTo(w[0],w[1]):x.moveTo(w[0],w[1])}),x.setLineDash([6,6]),x.lineWidth=6,x.strokeStyle="#ffd23f",x.stroke(),x.setLineDash([]));let y=i.at(0,0,{}),A=m([y.x,y.z]);x.fillStyle="#ff4d6d",x.fillRect(A[0]-7,A[1]-7,14,14),Xe.mapBase=g}function Qd(s,t){let e=Xe.map;return[e.ox+(s-e.minx)*e.sc,e.oz+(e.maxz-t)*e.sc]}function z_(s,t){let e=s.localKart;if(!e)return;let i=e.sim,n=Xe.last,r=e.place;n.pos!==r&&(n.pos=r,Xe.pos.innerHTML=`${r}<small>${_l(r).replace(/^\d+/,"")}</small><span class="of">/${s.karts.length}</span>`);let o=`LAP ${P_(i.lap+1,1,s.laps)}/${s.laps}`;n.lap!==o&&(n.lap=o,Xe.lap.textContent=o),Xe.time.textContent=s.state==="racing"||s.state==="finished"?Vs(s.t).slice(0,-1):"0:00.00";let l=Math.round(Math.abs(i.s)*4);n.sp!==l&&(n.sp=l,Xe.spd.textContent=l);let c=e.roll?"roll:"+Math.floor(e.roll.t/.09)%8:e.item?e.item.id+e.item.n:"";if(n.item!==c){n.item=c;let y=Xe.slot;if(y.classList.toggle("roll",!!e.roll),y.classList.toggle("has",!!e.item),e.roll){let A=["pod","disc","peel","rocket","nova","spill","jolt","veil"];y.innerHTML=Ei[A[Math.floor(e.roll.t/.09)%8]]}else e.item?y.innerHTML=Ei[e.item.id]+(e.item.n>1?`<span class="cnt">${e.item.n}</span>`:""):y.innerHTML='<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="14" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3" stroke-dasharray="4 5"/></svg>';oi.elItem&&oi.elItem.classList.toggle("has",!!e.item)}Xe.coin.textContent=s.statsRace.coins;let h=Xe.charge,d=i.drift,u=d.on?"c"+d.tier:"";n.ch!==u&&(n.ch=u,h.classList.toggle("on",d.on),h.children[0].className=d.tier>=1?"f1":"",h.children[1].className=d.tier>=2?"f2":"",h.children[2].className=d.tier>=3?"f3":""),Xe.lock.classList.toggle("on",e.lockT>0);let f=Ft("#fxlines"),g=i.boostT>0||i.starT>0;f.classList.remove("hidden"),f.classList.toggle("on",g),f.classList.toggle("hit",i.spinT>.6);let x=Xe.g,m=Xe.mini.width;x.clearRect(0,0,m,m),x.drawImage(Xe.mapBase,0,0);let p=(y,A)=>{let v=Qd(y.sim.x,y.sim.z);x.beginPath(),x.fillStyle=A?"#ffd23f":y.place<e.place?"#ff6b6b":"#7fd0ff",x.arc(v[0],v[1],A?8:5.5,0,6.3),x.fill(),x.lineWidth=A?3:1.5,x.strokeStyle=A?"#fff":"rgba(0,0,0,.6)",x.stroke(),A&&(x.beginPath(),x.moveTo(v[0]+Math.sin(y.sim.th)*14,v[1]-Math.cos(y.sim.th)*14),x.lineTo(v[0]+Math.sin(y.sim.th+2.5)*8,v[1]-Math.cos(y.sim.th+2.5)*8),x.lineTo(v[0]+Math.sin(y.sim.th-2.5)*8,v[1]-Math.cos(y.sim.th-2.5)*8),x.fillStyle="#fff",x.fill())};for(let y of s.karts)y!==e&&p(y,!1);p(e,!0)}function H_(s,t){let e=K.race&&K.race.localKart;switch(s){case"cd":kn(`<div class="big">${t.n}</div>`,900);break;case"go":kn('<div class="big" style="color:#37e08a">GO!</div>',900);break;case"start":t.res==="boost"?ai("\u26A1 Perfect start!","#7bffb0"):t.res==="stall"&&ai("Too early \u2014 wheelspin!","#ff8a8a");break;case"tier":ai(["","Blue spark","Orange spark","PURPLE spark!"][t.tier],["","#4db8ff","#ff9a2e","#c16bff"][t.tier]);break;case"boost":ai(["","Mini-turbo","Super-turbo","ULTRA TURBO"][t.tier],"#fff");break;case"lapMsg":kn(`<div class="msg">Lap ${t.lap}</div>`,1300);break;case"finalLap":kn('<div class="msg" style="color:#ff6b6b">Final lap!</div>',1700);break;case"shortcut":ai("Shortcut!","#ffd23f");break;case"wrong":kn('<div class="msg" style="color:#ff6b6b">Wrong way</div>',600);break;case"hit":ai(t.kind==="rocket"?"Hit by a rocket!":t.kind==="jolt"?"Storm Jolt!":"Spun out!","#ff8a8a");break;case"hitOther":ai("Direct hit!","#7bffb0");break;case"lock":ai("Rocket lock! Hit ITEM to brace","#ff4d4d");break;case"brace":ai("Perfect brace!","#7bffb0");break;case"stolen":ai("Item stolen!","#b9a7ff");break;case"coin":break;case"item":t.id&&ai(th[t.id].name,th[t.id].color);break;case"joltArm":ai("Storm Jolt charging\u2026","#fff25a");break;case"results":G_(t.results);break}}function tf(){if(!K.race||K.paused)return;K.paused=!0;let t=rs("center");t.style.justifyContent="center",t.style.alignItems="center",t.style.background="rgba(5,10,24,.6)",t.innerHTML='<div class="panel col" style="padding:18px;min-width:min(86vw,320px)"><h2>Paused</h2><button class="btn" id="rs">Resume</button><button class="btn blue" id="rt">Restart race</button><button class="btn ghost" id="qt">Quit to menu</button></div>',kt.ctx&&kt.ctx.suspend(),Ft("#rs").onclick=()=>{K.paused=!1,t.remove(),kt.ctx&&kt.ctx.resume()},Ft("#rt").onclick=()=>{K.paused=!1,t.remove(),kt.ctx&&kt.ctx.resume(),!K.net&&Js()},Ft("#qt").onclick=async()=>{K.paused=!1,t.remove(),kt.ctx&&await kt.ctx.resume(),Ks(),lh(),ii("menu")}}async function lh(){kt.stopMusic(.5),kt.stopAllLoops(),kt.setReverb("menu"),await kt.loadMusic("menu")&&kt.startMusic("menu","menu"),kt.startAmbience("menu")}function G_(s){if(K.resultsShown)return;K.resultsShown=!0;let t=K.save,e=s.find(f=>f.local),i=K.mode==="tt",n=e.place,r=K.cfg,a=[15,12,10,8,7,6,5,4,3,2,1,0],o=[80,60,45,35,28,22,18,14,10,7,4,2],l=i?20+e.coins:(o[n-1]||0)+e.coins+20;t.coins+=l,t.stats.races++,n===1&&t.stats.wins++,t.stats.coinsEarned+=l;let c=r.track+(r.mirror?"m":"")+(r.reverse?"r":""),h=!1;if(e.time&&(!t.bests[c]||r.laps===3&&e.time<t.bests[c])&&r.laps===3&&(t.bests[c]=e.time,h=!0),i&&e.time){let f=jd();(!t.ghosts[f]||e.time<t.ghosts[f+"t"])&&(t.ghosts[f]=K.rec.a,t.ghosts[f+"t"]=e.time,h=!0)}if(r.daily){let f="d"+r.daily;t.daily[f]=t.daily[f]&&t.daily[f]<e.time?t.daily[f]:e.time}let d="",u="Race again";if(K.mode==="gp"&&K.cup){let f=K.cup;for(let m of s)f.pts[m.name]=(f.pts[m.name]||0)+a[m.place-1];f.idx++;let g=Object.entries(f.pts).sort((m,p)=>p[1]-m[1]),x=f.idx>=4;if(u=x?"Finish cup":"Next race",d=`<div class="panel" style="padding:10px"><b>Cup standings (${f.idx}/4)</b><table class="res">${g.slice(0,6).map(([m,p],y)=>`<tr class="${m===t.sel.char?"me":""}"><td>${y+1}</td><td>${m}</td><td>${p} pts</td></tr>`).join("")}</table></div>`,x){let m=g.findIndex(y=>y[0]===t.sel.char)+1,p=m===1?"Gold":m===2?"Silver":m===3?"Bronze":"None";d+=`<div class="panel" style="padding:10px"><b>Seedling Cup result: ${_l(m)} \u2014 ${p} trophy</b></div>`,m<=3&&(t.coins+=[300,200,120][m-1])}}ns(),kt.ready&&kt.setMusicState("results"),setTimeout(()=>{let f=rs();f.style.background="linear-gradient(rgba(5,10,24,.35),rgba(5,10,24,.85))",f.innerHTML=`<div class="topbar"><h2>${n===1?"\u{1F3C6} Victory!":"Race complete"} \u2014 ${_l(n)}</h2>${Kr()}</div>
    <div class="grow row wrap scroll" style="align-items:flex-start;gap:10px"><div class="panel grow" style="padding:10px;min-width:260px"><table class="res">${s.slice(0,12).map(g=>`<tr class="${g.local?"me":""}"><td>${g.place}</td><td>${g.disp}</td><td class="n">${g.time?Vs(g.time):"\u2014"}</td></tr>`).join("")}</table></div>
    <div class="col" style="min-width:230px;flex:1"><div class="panel" style="padding:12px"><div class="row sp"><b>Coins earned</b><span class="coins">${Ei.coin}+${l}</span></div><div style="font-size:12px;color:var(--mut);margin-top:6px">${e.coins} collected \xB7 placing bonus ${i?0:o[n-1]} \xB7 finish +20${h?'<br><b style="color:var(--y)">New personal best!</b>':""}</div></div>${d}</div></div>
    <div class="row wrap"><button class="btn ghost" id="mn">Menu</button><div class="grow"></div><button class="btn" id="nx">${u}</button></div>`,Ft("#mn").onclick=async()=>{xi("ui_back"),Ks(),K.cup=null,await lh(),ii("menu")},Ft("#nx").onclick=async()=>{if(xi("ui_confirm"),K.mode==="gp"&&K.cup){if(K.cup.idx>=4){Ks(),K.cup=null,await lh(),ii("menu");return}K.cfg.track=Os[K.cup.idx]}Js()},kt.ready&&kt.play(n<=3?"fanfare_win":"fanfare_mid",{bus:"ui",vol:.6})},1200)}var Zd=performance.now(),xl=0,ah=0,Ws=0,Xs=0;var oh=0;K.fps=60;K.frameSkip=!1;function ef(s){requestAnimationFrame(ef);let t=(s-Zd)/1e3;Zd=s,t>.25&&(t=.25),oh++;let e=K.race;if(e&&!K.paused){if(oi.poll(e.state==="racing"&&oi.autoOn),e.update(t),B_(e),k_(e,t),(oh%2===0||!K.frameSkip)&&z_(e,t),K.frameSkip&&oh%2){Kd(t);return}ji.render($s,Ys)}else e?ji.render($s,Ys):["menu","garage","title","setup","settings","lobby","boot","results"].includes(K.screen)&&yl.render(t,innerWidth,innerHeight,K.screen==="garage"?0:K.screen==="menu"?.9:0);Kd(t)}function Kd(s){if(xl+=s,ah++,xl<.5)return;let t=ah/xl;if(K.fps=t,xl=0,ah=0,!K.race||K.paused){Ws=Xs=0;return}let e=K.frameSkip?30:60;t<e*.86?(Ws+=.5,Xs=0):t>e*.97?(Xs+=.5,Ws=0):Ws=Xs=0,Ws>=1.5?(Ws=0,zi>.62?(zi=Math.max(.62,zi-.15),Zs()):K.frameSkip||(K.frameSkip=!0)):Xs>=8&&zi<vl&&!K.frameSkip&&(Xs=0,zi=Math.min(vl,zi+.1),Zs())}requestAnimationFrame(ef);(async function(){qs(),K.save.settings.quality==="high"&&await fh("high"),Ft("#loading").classList.add("hidden"),ii("title"),Zr.has("autostart")&&setTimeout(async()=>{await uh(),K.mode=Zr.get("mode")||"quick",K.cfg.track=Zr.get("track")||"meadow",K.cfg.laps=+(Zr.get("laps")||3),Js()},100)})();window.__test={startRace:Js,show:ii,endRace:Ks,toast:ai,centerMsg:kn,input:oi,T:ch,SAVE:gl,setQuality:fh,prefetchHQ:Jd};export{ch as T,K as app};
