import{c as nu}from"./index-BJdoYWcy.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sp=nu("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vp=nu("GraduationCap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]),Al=()=>{};var zo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},wl=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],l=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},su={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,m=o>>2,y=(o&3)<<4|l>>4;let w=(l&15)<<2|f>>6,P=f&63;h||(P=64,a||(w=64)),r.push(e[m],e[y],e[w],e[P])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(ru(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):wl(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],l=s<n.length?e[n.charAt(s)]:0;++s;const f=s<n.length?e[n.charAt(s)]:64;++s;const y=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||l==null||f==null||y==null)throw new Rl;const w=o<<2|l>>4;if(r.push(w),f!==64){const P=l<<4&240|f>>2;if(r.push(P),y!==64){const N=f<<6&192|y;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Rl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Sl=function(n){const t=ru(n);return su.encodeByteArray(t,!0)},gr=function(n){return Sl(n).replace(/\./g,"")},Vl=function(n){try{return su.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cl=()=>Pl().__FIREBASE_DEFAULTS__,bl=()=>{if(typeof process>"u"||typeof zo>"u")return;const n=zo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Dl=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Vl(n[1]);return t&&JSON.parse(t)},Zs=()=>{try{return Al()||Cl()||bl()||Dl()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Nl=n=>{var t,e;return(e=(t=Zs())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},kl=n=>{const t=Nl(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},iu=()=>{var n;return(n=Zs())==null?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[gr(JSON.stringify(e)),gr(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ml(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ll(){var t;const n=(t=Zs())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Fl(){return!Ll()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ul(){try{return typeof indexedDB=="object"}catch{return!1}}function Bl(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)==null?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jl="FirebaseError";class je extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=jl,Object.setPrototypeOf(this,je.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ou.prototype.create)}}class ou{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?ql(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new je(s,l,r)}}function ql(n,t){return n.replace($l,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const $l=/\{\$([^}]+)}/g;function _r(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(Go(o)&&Go(a)){if(!_r(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Go(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function au(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function zl(n){return(await fetch(n,{credentials:"include"})).ok}class Tn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Ol;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Hl(t))try{this.getOrInitializeService({instanceIdentifier:ye})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=ye){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=ye){return this.instances.has(t)}getOptions(t=ye){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&t(o,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Kl(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=ye){return this.component?this.component.multipleInstances?t:ye:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Kl(n){return n===ye?void 0:n}function Hl(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Gl(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})($||($={}));const Ql={debug:$.DEBUG,verbose:$.VERBOSE,info:$.INFO,warn:$.WARN,error:$.ERROR,silent:$.SILENT},Xl=$.INFO,Jl={[$.DEBUG]:"log",[$.VERBOSE]:"log",[$.INFO]:"info",[$.WARN]:"warn",[$.ERROR]:"error"},Yl=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=Jl[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class uu{constructor(t){this.name=t,this._logLevel=Xl,this._logHandler=Yl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in $))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Ql[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,$.DEBUG,...t),this._logHandler(this,$.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,$.VERBOSE,...t),this._logHandler(this,$.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,$.INFO,...t),this._logHandler(this,$.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,$.WARN,...t),this._logHandler(this,$.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,$.ERROR,...t),this._logHandler(this,$.ERROR,...t)}}const Zl=(n,t)=>t.some(e=>n instanceof e);let Ko,Ho;function th(){return Ko||(Ko=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function eh(){return Ho||(Ho=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const cu=new WeakMap,Ns=new WeakMap,lu=new WeakMap,Is=new WeakMap,ti=new WeakMap;function nh(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(Zt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&cu.set(e,n)}).catch(()=>{}),ti.set(t,n),t}function rh(n){if(Ns.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Ns.set(n,t)}let ks={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Ns.get(n);if(t==="objectStoreNames")return n.objectStoreNames||lu.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Zt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function sh(n){ks=n(ks)}function ih(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(vs(this),t,...e);return lu.set(r,t.sort?t.sort():[t]),Zt(r)}:eh().includes(n)?function(...t){return n.apply(vs(this),t),Zt(cu.get(this))}:function(...t){return Zt(n.apply(vs(this),t))}}function oh(n){return typeof n=="function"?ih(n):(n instanceof IDBTransaction&&rh(n),Zl(n,th())?new Proxy(n,ks):n)}function Zt(n){if(n instanceof IDBRequest)return nh(n);if(Is.has(n))return Is.get(n);const t=oh(n);return t!==n&&(Is.set(n,t),ti.set(t,n)),t}const vs=n=>ti.get(n);function ah(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),l=Zt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Zt(a.result),h.oldVersion,h.newVersion,Zt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),l}const uh=["get","getKey","getAll","getAllKeys","count"],ch=["put","add","delete","clear"],As=new Map;function Wo(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(As.get(t))return As.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=ch.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||uh.includes(e)))return;const o=async function(a,...l){const h=this.transaction(a,s?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(l.shift())),(await Promise.all([f[e](...l),s&&h.done]))[0]};return As.set(t,o),o}sh(n=>({...n,get:(t,e,r)=>Wo(t,e)||n.get(t,e,r),has:(t,e)=>!!Wo(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(hh(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function hh(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Os="@firebase/app",Qo="0.14.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $t=new uu("@firebase/app"),fh="@firebase/app-compat",dh="@firebase/analytics-compat",mh="@firebase/analytics",ph="@firebase/app-check-compat",gh="@firebase/app-check",_h="@firebase/auth",yh="@firebase/auth-compat",Eh="@firebase/database",Th="@firebase/data-connect",Ih="@firebase/database-compat",vh="@firebase/functions",Ah="@firebase/functions-compat",wh="@firebase/installations",Rh="@firebase/installations-compat",Sh="@firebase/messaging",Vh="@firebase/messaging-compat",Ph="@firebase/performance",Ch="@firebase/performance-compat",bh="@firebase/remote-config",Dh="@firebase/remote-config-compat",Nh="@firebase/storage",kh="@firebase/storage-compat",Oh="@firebase/firestore",xh="@firebase/ai",Mh="@firebase/firestore-compat",Lh="firebase",Fh="12.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs="[DEFAULT]",Uh={[Os]:"fire-core",[fh]:"fire-core-compat",[mh]:"fire-analytics",[dh]:"fire-analytics-compat",[gh]:"fire-app-check",[ph]:"fire-app-check-compat",[_h]:"fire-auth",[yh]:"fire-auth-compat",[Eh]:"fire-rtdb",[Th]:"fire-data-connect",[Ih]:"fire-rtdb-compat",[vh]:"fire-fn",[Ah]:"fire-fn-compat",[wh]:"fire-iid",[Rh]:"fire-iid-compat",[Sh]:"fire-fcm",[Vh]:"fire-fcm-compat",[Ph]:"fire-perf",[Ch]:"fire-perf-compat",[bh]:"fire-rc",[Dh]:"fire-rc-compat",[Nh]:"fire-gcs",[kh]:"fire-gcs-compat",[Oh]:"fire-fst",[Mh]:"fire-fst-compat",[xh]:"fire-vertex","fire-js":"fire-js",[Lh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In=new Map,Bh=new Map,Ms=new Map;function Xo(n,t){try{n.container.addComponent(t)}catch(e){$t.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function yr(n){const t=n.name;if(Ms.has(t))return $t.debug(`There were multiple attempts to register component ${t}.`),!1;Ms.set(t,n);for(const e of In.values())Xo(e,n);for(const e of Bh.values())Xo(e,n);return!0}function jh(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function qh(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},te=new ou("app","Firebase",$h);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Tn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw te.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh=Fh;function hu(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:xs,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw te.create("bad-app-name",{appName:String(s)});if(e||(e=iu()),!e)throw te.create("no-options");const o=In.get(s);if(o){if(_r(e,o.options)&&_r(r,o.config))return o;throw te.create("duplicate-app",{appName:s})}const a=new Wl(s);for(const h of Ms.values())a.addComponent(h);const l=new zh(e,r,a);return In.set(s,l),l}function Kh(n=xs){const t=In.get(n);if(!t&&n===xs&&iu())return hu();if(!t)throw te.create("no-app",{appName:n});return t}function Jo(){return Array.from(In.values())}function ke(n,t,e){let r=Uh[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const a=[`Unable to register library "${r}" with version "${t}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),$t.warn(a.join(" "));return}yr(new Tn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh="firebase-heartbeat-database",Wh=1,vn="firebase-heartbeat-store";let ws=null;function fu(){return ws||(ws=ah(Hh,Wh,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(vn)}catch(e){console.warn(e)}}}}).catch(n=>{throw te.create("idb-open",{originalErrorMessage:n.message})})),ws}async function Qh(n){try{const e=(await fu()).transaction(vn),r=await e.objectStore(vn).get(du(n));return await e.done,r}catch(t){if(t instanceof je)$t.warn(t.message);else{const e=te.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});$t.warn(e.message)}}}async function Yo(n,t){try{const r=(await fu()).transaction(vn,"readwrite");await r.objectStore(vn).put(t,du(n)),await r.done}catch(e){if(e instanceof je)$t.warn(e.message);else{const r=te.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});$t.warn(r.message)}}}function du(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh=1024,Jh=30;class Yh{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new tf(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Zo();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>Jh){const a=ef(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){$t.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Zo(),{heartbeatsToSend:r,unsentEntries:s}=Zh(this._heartbeatsCache.heartbeats),o=gr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return $t.warn(e),""}}}function Zo(){return new Date().toISOString().substring(0,10)}function Zh(n,t=Xh){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),ta(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),ta(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class tf{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ul()?Bl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Qh(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Yo(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Yo(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function ta(n){return gr(JSON.stringify({version:2,heartbeats:n})).length}function ef(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nf(n){yr(new Tn("platform-logger",t=>new lh(t),"PRIVATE")),yr(new Tn("heartbeat",t=>new Yh(t),"PRIVATE")),ke(Os,Qo,n),ke(Os,Qo,"esm2020"),ke("fire-js","")}nf("");var ea=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ee,mu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,p){function _(){}_.prototype=p.prototype,T.F=p.prototype,T.prototype=new _,T.prototype.constructor=T,T.D=function(I,E,A){for(var g=Array(arguments.length-2),vt=2;vt<arguments.length;vt++)g[vt-2]=arguments[vt];return p.prototype[E].apply(I,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,p,_){_||(_=0);const I=Array(16);if(typeof p=="string")for(var E=0;E<16;++E)I[E]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(E=0;E<16;++E)I[E]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=T.g[0],_=T.g[1],E=T.g[2];let A=T.g[3],g;g=p+(A^_&(E^A))+I[0]+3614090360&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(E^p&(_^E))+I[1]+3905402710&4294967295,A=p+(g<<12&4294967295|g>>>20),g=E+(_^A&(p^_))+I[2]+606105819&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(p^E&(A^p))+I[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(A^_&(E^A))+I[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(E^p&(_^E))+I[5]+1200080426&4294967295,A=p+(g<<12&4294967295|g>>>20),g=E+(_^A&(p^_))+I[6]+2821735955&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(p^E&(A^p))+I[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(A^_&(E^A))+I[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(E^p&(_^E))+I[9]+2336552879&4294967295,A=p+(g<<12&4294967295|g>>>20),g=E+(_^A&(p^_))+I[10]+4294925233&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(p^E&(A^p))+I[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(A^_&(E^A))+I[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=A+(E^p&(_^E))+I[13]+4254626195&4294967295,A=p+(g<<12&4294967295|g>>>20),g=E+(_^A&(p^_))+I[14]+2792965006&4294967295,E=A+(g<<17&4294967295|g>>>15),g=_+(p^E&(A^p))+I[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(E^A&(_^E))+I[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(p^_))+I[6]+3225465664&4294967295,A=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(A^p))+I[11]+643717713&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(E^A))+I[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^A&(_^E))+I[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(p^_))+I[10]+38016083&4294967295,A=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(A^p))+I[15]+3634488961&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(E^A))+I[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^A&(_^E))+I[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(p^_))+I[14]+3275163606&4294967295,A=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(A^p))+I[3]+4107603335&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(E^A))+I[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^A&(_^E))+I[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=A+(_^E&(p^_))+I[2]+4243563512&4294967295,A=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(A^p))+I[7]+1735328473&4294967295,E=A+(g<<14&4294967295|g>>>18),g=_+(A^p&(E^A))+I[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(_^E^A)+I[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^E)+I[8]+2272392833&4294967295,A=p+(g<<11&4294967295|g>>>21),g=E+(A^p^_)+I[11]+1839030562&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^p)+I[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^A)+I[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^E)+I[4]+1272893353&4294967295,A=p+(g<<11&4294967295|g>>>21),g=E+(A^p^_)+I[7]+4139469664&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^p)+I[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^A)+I[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^E)+I[0]+3936430074&4294967295,A=p+(g<<11&4294967295|g>>>21),g=E+(A^p^_)+I[3]+3572445317&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^p)+I[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^A)+I[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=A+(p^_^E)+I[12]+3873151461&4294967295,A=p+(g<<11&4294967295|g>>>21),g=E+(A^p^_)+I[15]+530742520&4294967295,E=A+(g<<16&4294967295|g>>>16),g=_+(E^A^p)+I[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(E^(_|~A))+I[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~E))+I[7]+1126891415&4294967295,A=p+(g<<10&4294967295|g>>>22),g=E+(p^(A|~_))+I[14]+2878612391&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~p))+I[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~A))+I[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~E))+I[3]+2399980690&4294967295,A=p+(g<<10&4294967295|g>>>22),g=E+(p^(A|~_))+I[10]+4293915773&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~p))+I[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~A))+I[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~E))+I[15]+4264355552&4294967295,A=p+(g<<10&4294967295|g>>>22),g=E+(p^(A|~_))+I[6]+2734768916&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~p))+I[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~A))+I[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=A+(_^(p|~E))+I[11]+3174756917&4294967295,A=p+(g<<10&4294967295|g>>>22),g=E+(p^(A|~_))+I[2]+718787259&4294967295,E=A+(g<<15&4294967295|g>>>17),g=_+(A^(E|~p))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+p&4294967295,T.g[1]=T.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+A&4294967295}r.prototype.v=function(T,p){p===void 0&&(p=T.length);const _=p-this.blockSize,I=this.C;let E=this.h,A=0;for(;A<p;){if(E==0)for(;A<=_;)s(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<p;)if(I[E++]=T.charCodeAt(A++),E==this.blockSize){s(this,I),E=0;break}}else for(;A<p;)if(I[E++]=T[A++],E==this.blockSize){s(this,I),E=0;break}}this.h=E,this.o+=p},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var p=1;p<T.length-8;++p)T[p]=0;p=this.o*8;for(var _=T.length-8;_<T.length;++_)T[_]=p&255,p/=256;for(this.v(T),T=Array(16),p=0,_=0;_<4;++_)for(let I=0;I<32;I+=8)T[p++]=this.g[_]>>>I&255;return T};function o(T,p){var _=l;return Object.prototype.hasOwnProperty.call(_,T)?_[T]:_[T]=p(T)}function a(T,p){this.h=p;const _=[];let I=!0;for(let E=T.length-1;E>=0;E--){const A=T[E]|0;I&&A==p||(_[E]=A,I=!1)}this.g=_}var l={};function h(T){return-128<=T&&T<128?o(T,function(p){return new a([p|0],p<0?-1:0)}):new a([T|0],T<0?-1:0)}function f(T){if(isNaN(T)||!isFinite(T))return y;if(T<0)return k(f(-T));const p=[];let _=1;for(let I=0;T>=_;I++)p[I]=T/_|0,_*=4294967296;return new a(p,0)}function m(T,p){if(T.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(T.charAt(0)=="-")return k(m(T.substring(1),p));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=f(Math.pow(p,8));let I=y;for(let A=0;A<T.length;A+=8){var E=Math.min(8,T.length-A);const g=parseInt(T.substring(A,A+E),p);E<8?(E=f(Math.pow(p,E)),I=I.j(E).add(f(g))):(I=I.j(_),I=I.add(f(g)))}return I}var y=h(0),w=h(1),P=h(16777216);n=a.prototype,n.m=function(){if(O(this))return-k(this).m();let T=0,p=1;for(let _=0;_<this.g.length;_++){const I=this.i(_);T+=(I>=0?I:4294967296+I)*p,p*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(N(this))return"0";if(O(this))return"-"+k(this).toString(T);const p=f(Math.pow(T,6));var _=this;let I="";for(;;){const E=Vt(_,p).g;_=H(_,E.j(p));let A=((_.g.length>0?_.g[0]:_.h)>>>0).toString(T);if(_=E,N(_))return A+I;for(;A.length<6;)A="0"+A;I=A+I}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function N(T){if(T.h!=0)return!1;for(let p=0;p<T.g.length;p++)if(T.g[p]!=0)return!1;return!0}function O(T){return T.h==-1}n.l=function(T){return T=H(this,T),O(T)?-1:N(T)?0:1};function k(T){const p=T.g.length,_=[];for(let I=0;I<p;I++)_[I]=~T.g[I];return new a(_,~T.h).add(w)}n.abs=function(){return O(this)?k(this):this},n.add=function(T){const p=Math.max(this.g.length,T.g.length),_=[];let I=0;for(let E=0;E<=p;E++){let A=I+(this.i(E)&65535)+(T.i(E)&65535),g=(A>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);I=g>>>16,A&=65535,g&=65535,_[E]=g<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function H(T,p){return T.add(k(p))}n.j=function(T){if(N(this)||N(T))return y;if(O(this))return O(T)?k(this).j(k(T)):k(k(this).j(T));if(O(T))return k(this.j(k(T)));if(this.l(P)<0&&T.l(P)<0)return f(this.m()*T.m());const p=this.g.length+T.g.length,_=[];for(var I=0;I<2*p;I++)_[I]=0;for(I=0;I<this.g.length;I++)for(let E=0;E<T.g.length;E++){const A=this.i(I)>>>16,g=this.i(I)&65535,vt=T.i(E)>>>16,fe=T.i(E)&65535;_[2*I+2*E]+=g*fe,G(_,2*I+2*E),_[2*I+2*E+1]+=A*fe,G(_,2*I+2*E+1),_[2*I+2*E+1]+=g*vt,G(_,2*I+2*E+1),_[2*I+2*E+2]+=A*vt,G(_,2*I+2*E+2)}for(T=0;T<p;T++)_[T]=_[2*T+1]<<16|_[2*T];for(T=p;T<2*p;T++)_[T]=0;return new a(_,0)};function G(T,p){for(;(T[p]&65535)!=T[p];)T[p+1]+=T[p]>>>16,T[p]&=65535,p++}function Y(T,p){this.g=T,this.h=p}function Vt(T,p){if(N(p))throw Error("division by zero");if(N(T))return new Y(y,y);if(O(T))return p=Vt(k(T),p),new Y(k(p.g),k(p.h));if(O(p))return p=Vt(T,k(p)),new Y(k(p.g),p.h);if(T.g.length>30){if(O(T)||O(p))throw Error("slowDivide_ only works with positive integers.");for(var _=w,I=p;I.l(T)<=0;)_=ft(_),I=ft(I);var E=dt(_,1),A=dt(I,1);for(I=dt(I,2),_=dt(_,2);!N(I);){var g=A.add(I);g.l(T)<=0&&(E=E.add(_),A=g),I=dt(I,1),_=dt(_,1)}return p=H(T,E.j(p)),new Y(E,p)}for(E=y;T.l(p)>=0;){for(_=Math.max(1,Math.floor(T.m()/p.m())),I=Math.ceil(Math.log(_)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),A=f(_),g=A.j(p);O(g)||g.l(T)>0;)_-=I,A=f(_),g=A.j(p);N(A)&&(A=w),E=E.add(A),T=H(T,g)}return new Y(E,T)}n.B=function(T){return Vt(this,T).h},n.and=function(T){const p=Math.max(this.g.length,T.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)&T.i(I);return new a(_,this.h&T.h)},n.or=function(T){const p=Math.max(this.g.length,T.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)|T.i(I);return new a(_,this.h|T.h)},n.xor=function(T){const p=Math.max(this.g.length,T.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)^T.i(I);return new a(_,this.h^T.h)};function ft(T){const p=T.g.length+1,_=[];for(let I=0;I<p;I++)_[I]=T.i(I)<<1|T.i(I-1)>>>31;return new a(_,T.h)}function dt(T,p){const _=p>>5;p%=32;const I=T.g.length-_,E=[];for(let A=0;A<I;A++)E[A]=p>0?T.i(A+_)>>>p|T.i(A+_+1)<<32-p:T.i(A+_);return new a(E,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,mu=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=m,ee=a}).apply(typeof ea<"u"?ea:typeof self<"u"?self:typeof window<"u"?window:{});var sr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var pu,fn,gu,cr,Ls,_u,yu,Eu;(function(){var n,t=Object.defineProperty;function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof sr=="object"&&sr];for(var u=0;u<i.length;++u){var c=i[u];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=e(this);function s(i,u){if(u)t:{var c=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var v=i[d];if(!(v in c))break t;c=c[v]}i=i[i.length-1],d=c[i],u=u(d),u!=d&&u!=null&&t(c,i,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(u){var c=[],d;for(d in u)Object.prototype.hasOwnProperty.call(u,d)&&c.push([d,u[d]]);return c}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(i){var u=typeof i;return u=="object"&&i!=null||u=="function"}function h(i,u,c){return i.call.apply(i.bind,arguments)}function f(i,u,c){return f=h,f.apply(null,arguments)}function m(i,u){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function y(i,u){function c(){}c.prototype=u.prototype,i.Z=u.prototype,i.prototype=new c,i.prototype.constructor=i,i.Ob=function(d,v,R){for(var C=Array(arguments.length-2),U=2;U<arguments.length;U++)C[U-2]=arguments[U];return u.prototype[v].apply(d,C)}}var w=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function P(i){const u=i.length;if(u>0){const c=Array(u);for(let d=0;d<u;d++)c[d]=i[d];return c}return[]}function N(i,u){for(let d=1;d<arguments.length;d++){const v=arguments[d];var c=typeof v;if(c=c!="object"?c:v?Array.isArray(v)?"array":c:"null",c=="array"||c=="object"&&typeof v.length=="number"){c=i.length||0;const R=v.length||0;i.length=c+R;for(let C=0;C<R;C++)i[c+C]=v[C]}else i.push(v)}}class O{constructor(u,c){this.i=u,this.j=c,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function k(i){a.setTimeout(()=>{throw i},0)}function H(){var i=T;let u=null;return i.g&&(u=i.g,i.g=i.g.next,i.g||(i.h=null),u.next=null),u}class G{constructor(){this.h=this.g=null}add(u,c){const d=Y.get();d.set(u,c),this.h?this.h.next=d:this.g=d,this.h=d}}var Y=new O(()=>new Vt,i=>i.reset());class Vt{constructor(){this.next=this.g=this.h=null}set(u,c){this.h=u,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let ft,dt=!1,T=new G,p=()=>{const i=Promise.resolve(void 0);ft=()=>{i.then(_)}};function _(){for(var i;i=H();){try{i.h.call(i.g)}catch(c){k(c)}var u=Y;u.j(i),u.h<100&&(u.h++,i.next=u.g,u.g=i)}dt=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(i,u){this.type=i,this.g=this.target=u,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,u=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};a.addEventListener("test",c,u),a.removeEventListener("test",c,u)}catch{}return i}();function g(i){return/^[\s\xa0]*$/.test(i)}function vt(i,u){E.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,u)}y(vt,E),vt.prototype.init=function(i,u){const c=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=u,u=i.relatedTarget,u||(c=="mouseover"?u=i.fromElement:c=="mouseout"&&(u=i.toElement)),this.relatedTarget=u,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&vt.Z.h.call(this)},vt.prototype.h=function(){vt.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var fe="closure_listenable_"+(Math.random()*1e6|0),Gc=0;function Kc(i,u,c,d,v){this.listener=i,this.proxy=null,this.src=u,this.type=c,this.capture=!!d,this.ha=v,this.key=++Gc,this.da=this.fa=!1}function $n(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function zn(i,u,c){for(const d in i)u.call(c,i[d],d,i)}function Hc(i,u){for(const c in i)u.call(void 0,i[c],c,i)}function qi(i){const u={};for(const c in i)u[c]=i[c];return u}const $i="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function zi(i,u){let c,d;for(let v=1;v<arguments.length;v++){d=arguments[v];for(c in d)i[c]=d[c];for(let R=0;R<$i.length;R++)c=$i[R],Object.prototype.hasOwnProperty.call(d,c)&&(i[c]=d[c])}}function Gn(i){this.src=i,this.g={},this.h=0}Gn.prototype.add=function(i,u,c,d,v){const R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);const C=Yr(i,u,d,v);return C>-1?(u=i[C],c||(u.fa=!1)):(u=new Kc(u,this.src,R,!!d,v),u.fa=c,i.push(u)),u};function Jr(i,u){const c=u.type;if(c in i.g){var d=i.g[c],v=Array.prototype.indexOf.call(d,u,void 0),R;(R=v>=0)&&Array.prototype.splice.call(d,v,1),R&&($n(u),i.g[c].length==0&&(delete i.g[c],i.h--))}}function Yr(i,u,c,d){for(let v=0;v<i.length;++v){const R=i[v];if(!R.da&&R.listener==u&&R.capture==!!c&&R.ha==d)return v}return-1}var Zr="closure_lm_"+(Math.random()*1e6|0),ts={};function Gi(i,u,c,d,v){if(Array.isArray(u)){for(let R=0;R<u.length;R++)Gi(i,u[R],c,d,v);return null}return c=Wi(c),i&&i[fe]?i.J(u,c,l(d)?!!d.capture:!1,v):Wc(i,u,c,!1,d,v)}function Wc(i,u,c,d,v,R){if(!u)throw Error("Invalid event type");const C=l(v)?!!v.capture:!!v;let U=ns(i);if(U||(i[Zr]=U=new Gn(i)),c=U.add(u,c,d,C,R),c.proxy)return c;if(d=Qc(),c.proxy=d,d.src=i,d.listener=c,i.addEventListener)A||(v=C),v===void 0&&(v=!1),i.addEventListener(u.toString(),d,v);else if(i.attachEvent)i.attachEvent(Hi(u.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return c}function Qc(){function i(c){return u.call(i.src,i.listener,c)}const u=Xc;return i}function Ki(i,u,c,d,v){if(Array.isArray(u))for(var R=0;R<u.length;R++)Ki(i,u[R],c,d,v);else d=l(d)?!!d.capture:!!d,c=Wi(c),i&&i[fe]?(i=i.i,R=String(u).toString(),R in i.g&&(u=i.g[R],c=Yr(u,c,d,v),c>-1&&($n(u[c]),Array.prototype.splice.call(u,c,1),u.length==0&&(delete i.g[R],i.h--)))):i&&(i=ns(i))&&(u=i.g[u.toString()],i=-1,u&&(i=Yr(u,c,d,v)),(c=i>-1?u[i]:null)&&es(c))}function es(i){if(typeof i!="number"&&i&&!i.da){var u=i.src;if(u&&u[fe])Jr(u.i,i);else{var c=i.type,d=i.proxy;u.removeEventListener?u.removeEventListener(c,d,i.capture):u.detachEvent?u.detachEvent(Hi(c),d):u.addListener&&u.removeListener&&u.removeListener(d),(c=ns(u))?(Jr(c,i),c.h==0&&(c.src=null,u[Zr]=null)):$n(i)}}}function Hi(i){return i in ts?ts[i]:ts[i]="on"+i}function Xc(i,u){if(i.da)i=!0;else{u=new vt(u,this);const c=i.listener,d=i.ha||i.src;i.fa&&es(i),i=c.call(d,u)}return i}function ns(i){return i=i[Zr],i instanceof Gn?i:null}var rs="__closure_events_fn_"+(Math.random()*1e9>>>0);function Wi(i){return typeof i=="function"?i:(i[rs]||(i[rs]=function(u){return i.handleEvent(u)}),i[rs])}function mt(){I.call(this),this.i=new Gn(this),this.M=this,this.G=null}y(mt,I),mt.prototype[fe]=!0,mt.prototype.removeEventListener=function(i,u,c,d){Ki(this,i,u,c,d)};function yt(i,u){var c,d=i.G;if(d)for(c=[];d;d=d.G)c.push(d);if(i=i.M,d=u.type||u,typeof u=="string")u=new E(u,i);else if(u instanceof E)u.target=u.target||i;else{var v=u;u=new E(d,i),zi(u,v)}v=!0;let R,C;if(c)for(C=c.length-1;C>=0;C--)R=u.g=c[C],v=Kn(R,d,!0,u)&&v;if(R=u.g=i,v=Kn(R,d,!0,u)&&v,v=Kn(R,d,!1,u)&&v,c)for(C=0;C<c.length;C++)R=u.g=c[C],v=Kn(R,d,!1,u)&&v}mt.prototype.N=function(){if(mt.Z.N.call(this),this.i){var i=this.i;for(const u in i.g){const c=i.g[u];for(let d=0;d<c.length;d++)$n(c[d]);delete i.g[u],i.h--}}this.G=null},mt.prototype.J=function(i,u,c,d){return this.i.add(String(i),u,!1,c,d)},mt.prototype.K=function(i,u,c,d){return this.i.add(String(i),u,!0,c,d)};function Kn(i,u,c,d){if(u=i.i.g[String(u)],!u)return!0;u=u.concat();let v=!0;for(let R=0;R<u.length;++R){const C=u[R];if(C&&!C.da&&C.capture==c){const U=C.listener,it=C.ha||C.src;C.fa&&Jr(i.i,C),v=U.call(it,d)!==!1&&v}}return v&&!d.defaultPrevented}function Jc(i,u){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=f(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(i,u||0)}function Qi(i){i.g=Jc(()=>{i.g=null,i.i&&(i.i=!1,Qi(i))},i.l);const u=i.h;i.h=null,i.m.apply(null,u)}class Yc extends I{constructor(u,c){super(),this.m=u,this.l=c,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Qi(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function He(i){I.call(this),this.h=i,this.g={}}y(He,I);var Xi=[];function Ji(i){zn(i.g,function(u,c){this.g.hasOwnProperty(c)&&es(u)},i),i.g={}}He.prototype.N=function(){He.Z.N.call(this),Ji(this)},He.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ss=a.JSON.stringify,Zc=a.JSON.parse,tl=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function Yi(){}function Zi(){}var We={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function is(){E.call(this,"d")}y(is,E);function os(){E.call(this,"c")}y(os,E);var de={},to=null;function Hn(){return to=to||new mt}de.Ia="serverreachability";function eo(i){E.call(this,de.Ia,i)}y(eo,E);function Qe(i){const u=Hn();yt(u,new eo(u))}de.STAT_EVENT="statevent";function no(i,u){E.call(this,de.STAT_EVENT,i),this.stat=u}y(no,E);function Et(i){const u=Hn();yt(u,new no(u,i))}de.Ja="timingevent";function ro(i,u){E.call(this,de.Ja,i),this.size=u}y(ro,E);function Xe(i,u){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},u)}function Je(){this.g=!0}Je.prototype.ua=function(){this.g=!1};function el(i,u,c,d,v,R){i.info(function(){if(i.g)if(R){var C="",U=R.split("&");for(let K=0;K<U.length;K++){var it=U[K].split("=");if(it.length>1){const at=it[0];it=it[1];const kt=at.split("_");C=kt.length>=2&&kt[1]=="type"?C+(at+"="+it+"&"):C+(at+"=redacted&")}}}else C=null;else C=R;return"XMLHTTP REQ ("+d+") [attempt "+v+"]: "+u+`
`+c+`
`+C})}function nl(i,u,c,d,v,R,C){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+v+"]: "+u+`
`+c+`
`+R+" "+C})}function Se(i,u,c,d){i.info(function(){return"XMLHTTP TEXT ("+u+"): "+sl(i,c)+(d?" "+d:"")})}function rl(i,u){i.info(function(){return"TIMEOUT: "+u})}Je.prototype.info=function(){};function sl(i,u){if(!i.g)return u;if(!u)return null;try{const R=JSON.parse(u);if(R){for(i=0;i<R.length;i++)if(Array.isArray(R[i])){var c=R[i];if(!(c.length<2)){var d=c[1];if(Array.isArray(d)&&!(d.length<1)){var v=d[0];if(v!="noop"&&v!="stop"&&v!="close")for(let C=1;C<d.length;C++)d[C]=""}}}}return ss(R)}catch{return u}}var Wn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},so={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},io;function as(){}y(as,Yi),as.prototype.g=function(){return new XMLHttpRequest},io=new as;function Ye(i){return encodeURIComponent(String(i))}function il(i){var u=1;i=i.split(":");const c=[];for(;u>0&&i.length;)c.push(i.shift()),u--;return i.length&&c.push(i.join(":")),c}function Ht(i,u,c,d){this.j=i,this.i=u,this.l=c,this.S=d||1,this.V=new He(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new oo}function oo(){this.i=null,this.g="",this.h=!1}var ao={},us={};function cs(i,u,c){i.M=1,i.A=Xn(Nt(u)),i.u=c,i.R=!0,uo(i,null)}function uo(i,u){i.F=Date.now(),Qn(i),i.B=Nt(i.A);var c=i.B,d=i.S;Array.isArray(d)||(d=[String(d)]),vo(c.i,"t",d),i.C=0,c=i.j.L,i.h=new oo,i.g=Bo(i.j,c?u:null,!i.u),i.P>0&&(i.O=new Yc(f(i.Y,i,i.g),i.P)),u=i.V,c=i.g,d=i.ba;var v="readystatechange";Array.isArray(v)||(v&&(Xi[0]=v.toString()),v=Xi);for(let R=0;R<v.length;R++){const C=Gi(c,v[R],d||u.handleEvent,!1,u.h||u);if(!C)break;u.g[C.key]=C}u=i.J?qi(i.J):{},i.u?(i.v||(i.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,u)):(i.v="GET",i.g.ea(i.B,i.v,null,u)),Qe(),el(i.i,i.v,i.B,i.l,i.S,i.u)}Ht.prototype.ba=function(i){i=i.target;const u=this.O;u&&Xt(i)==3?u.j():this.Y(i)},Ht.prototype.Y=function(i){try{if(i==this.g)t:{const U=Xt(this.g),it=this.g.ya(),K=this.g.ca();if(!(U<3)&&(U!=3||this.g&&(this.h.h||this.g.la()||Co(this.g)))){this.K||U!=4||it==7||(it==8||K<=0?Qe(3):Qe(2)),ls(this);var u=this.g.ca();this.X=u;var c=ol(this);if(this.o=u==200,nl(this.i,this.v,this.B,this.l,this.S,U,u),this.o){if(this.U&&!this.L){e:{if(this.g){var d,v=this.g;if((d=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(d)){var R=d;break e}}R=null}if(i=R)Se(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,hs(this,i);else{this.o=!1,this.m=3,Et(12),me(this),Ze(this);break t}}if(this.R){i=!0;let at;for(;!this.K&&this.C<c.length;)if(at=al(this,c),at==us){U==4&&(this.m=4,Et(14),i=!1),Se(this.i,this.l,null,"[Incomplete Response]");break}else if(at==ao){this.m=4,Et(15),Se(this.i,this.l,c,"[Invalid Chunk]"),i=!1;break}else Se(this.i,this.l,at,null),hs(this,at);if(co(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),U!=4||c.length!=0||this.h.h||(this.m=1,Et(16),i=!1),this.o=this.o&&i,!i)Se(this.i,this.l,c,"[Invalid Chunked Response]"),me(this),Ze(this);else if(c.length>0&&!this.W){this.W=!0;var C=this.j;C.g==this&&C.aa&&!C.P&&(C.j.info("Great, no buffering proxy detected. Bytes received: "+c.length),Es(C),C.P=!0,Et(11))}}else Se(this.i,this.l,c,null),hs(this,c);U==4&&me(this),this.o&&!this.K&&(U==4?Mo(this.j,this):(this.o=!1,Qn(this)))}else Il(this.g),u==400&&c.indexOf("Unknown SID")>0?(this.m=3,Et(12)):(this.m=0,Et(13)),me(this),Ze(this)}}}catch{}finally{}};function ol(i){if(!co(i))return i.g.la();const u=Co(i.g);if(u==="")return"";let c="";const d=u.length,v=Xt(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return me(i),Ze(i),"";i.h.i=new a.TextDecoder}for(let R=0;R<d;R++)i.h.h=!0,c+=i.h.i.decode(u[R],{stream:!(v&&R==d-1)});return u.length=0,i.h.g+=c,i.C=0,i.h.g}function co(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function al(i,u){var c=i.C,d=u.indexOf(`
`,c);return d==-1?us:(c=Number(u.substring(c,d)),isNaN(c)?ao:(d+=1,d+c>u.length?us:(u=u.slice(d,d+c),i.C=d+c,u)))}Ht.prototype.cancel=function(){this.K=!0,me(this)};function Qn(i){i.T=Date.now()+i.H,lo(i,i.H)}function lo(i,u){if(i.D!=null)throw Error("WatchDog timer not null");i.D=Xe(f(i.aa,i),u)}function ls(i){i.D&&(a.clearTimeout(i.D),i.D=null)}Ht.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(rl(this.i,this.B),this.M!=2&&(Qe(),Et(17)),me(this),this.m=2,Ze(this)):lo(this,this.T-i)};function Ze(i){i.j.I==0||i.K||Mo(i.j,i)}function me(i){ls(i);var u=i.O;u&&typeof u.dispose=="function"&&u.dispose(),i.O=null,Ji(i.V),i.g&&(u=i.g,i.g=null,u.abort(),u.dispose())}function hs(i,u){try{var c=i.j;if(c.I!=0&&(c.g==i||fs(c.h,i))){if(!i.L&&fs(c.h,i)&&c.I==3){try{var d=c.Ba.g.parse(u)}catch{d=null}if(Array.isArray(d)&&d.length==3){var v=d;if(v[0]==0){t:if(!c.v){if(c.g)if(c.g.F+3e3<i.F)er(c),Zn(c);else break t;ys(c),Et(18)}}else c.xa=v[1],0<c.xa-c.K&&v[2]<37500&&c.F&&c.A==0&&!c.C&&(c.C=Xe(f(c.Va,c),6e3));mo(c.h)<=1&&c.ta&&(c.ta=void 0)}else ge(c,11)}else if((i.L||c.g==i)&&er(c),!g(u))for(v=c.Ba.g.parse(u),u=0;u<v.length;u++){let K=v[u];const at=K[0];if(!(at<=c.K))if(c.K=at,K=K[1],c.I==2)if(K[0]=="c"){c.M=K[1],c.ba=K[2];const kt=K[3];kt!=null&&(c.ka=kt,c.j.info("VER="+c.ka));const _e=K[4];_e!=null&&(c.za=_e,c.j.info("SVER="+c.za));const Jt=K[5];Jt!=null&&typeof Jt=="number"&&Jt>0&&(d=1.5*Jt,c.O=d,c.j.info("backChannelRequestTimeoutMs_="+d)),d=c;const Yt=i.g;if(Yt){const rr=Yt.g?Yt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(rr){var R=d.h;R.g||rr.indexOf("spdy")==-1&&rr.indexOf("quic")==-1&&rr.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(ds(R,R.h),R.h=null))}if(d.G){const Ts=Yt.g?Yt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ts&&(d.wa=Ts,Q(d.J,d.G,Ts))}}c.I=3,c.l&&c.l.ra(),c.aa&&(c.T=Date.now()-i.F,c.j.info("Handshake RTT: "+c.T+"ms")),d=c;var C=i;if(d.na=Uo(d,d.L?d.ba:null,d.W),C.L){po(d.h,C);var U=C,it=d.O;it&&(U.H=it),U.D&&(ls(U),Qn(U)),d.g=C}else Oo(d);c.i.length>0&&tr(c)}else K[0]!="stop"&&K[0]!="close"||ge(c,7);else c.I==3&&(K[0]=="stop"||K[0]=="close"?K[0]=="stop"?ge(c,7):_s(c):K[0]!="noop"&&c.l&&c.l.qa(K),c.A=0)}}Qe(4)}catch{}}var ul=class{constructor(i,u){this.g=i,this.map=u}};function ho(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function fo(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function mo(i){return i.h?1:i.g?i.g.size:0}function fs(i,u){return i.h?i.h==u:i.g?i.g.has(u):!1}function ds(i,u){i.g?i.g.add(u):i.h=u}function po(i,u){i.h&&i.h==u?i.h=null:i.g&&i.g.has(u)&&i.g.delete(u)}ho.prototype.cancel=function(){if(this.i=go(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function go(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let u=i.i;for(const c of i.g.values())u=u.concat(c.G);return u}return P(i.i)}var _o=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function cl(i,u){if(i){i=i.split("&");for(let c=0;c<i.length;c++){const d=i[c].indexOf("=");let v,R=null;d>=0?(v=i[c].substring(0,d),R=i[c].substring(d+1)):v=i[c],u(v,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Wt(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;i instanceof Wt?(this.l=i.l,tn(this,i.j),this.o=i.o,this.g=i.g,en(this,i.u),this.h=i.h,ms(this,Ao(i.i)),this.m=i.m):i&&(u=String(i).match(_o))?(this.l=!1,tn(this,u[1]||"",!0),this.o=nn(u[2]||""),this.g=nn(u[3]||"",!0),en(this,u[4]),this.h=nn(u[5]||"",!0),ms(this,u[6]||"",!0),this.m=nn(u[7]||"")):(this.l=!1,this.i=new sn(null,this.l))}Wt.prototype.toString=function(){const i=[];var u=this.j;u&&i.push(rn(u,yo,!0),":");var c=this.g;return(c||u=="file")&&(i.push("//"),(u=this.o)&&i.push(rn(u,yo,!0),"@"),i.push(Ye(c).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.u,c!=null&&i.push(":",String(c))),(c=this.h)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(rn(c,c.charAt(0)=="/"?fl:hl,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",rn(c,ml)),i.join("")},Wt.prototype.resolve=function(i){const u=Nt(this);let c=!!i.j;c?tn(u,i.j):c=!!i.o,c?u.o=i.o:c=!!i.g,c?u.g=i.g:c=i.u!=null;var d=i.h;if(c)en(u,i.u);else if(c=!!i.h){if(d.charAt(0)!="/")if(this.g&&!this.h)d="/"+d;else{var v=u.h.lastIndexOf("/");v!=-1&&(d=u.h.slice(0,v+1)+d)}if(v=d,v==".."||v==".")d="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){d=v.lastIndexOf("/",0)==0,v=v.split("/");const R=[];for(let C=0;C<v.length;){const U=v[C++];U=="."?d&&C==v.length&&R.push(""):U==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),d&&C==v.length&&R.push("")):(R.push(U),d=!0)}d=R.join("/")}else d=v}return c?u.h=d:c=i.i.toString()!=="",c?ms(u,Ao(i.i)):c=!!i.m,c&&(u.m=i.m),u};function Nt(i){return new Wt(i)}function tn(i,u,c){i.j=c?nn(u,!0):u,i.j&&(i.j=i.j.replace(/:$/,""))}function en(i,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);i.u=u}else i.u=null}function ms(i,u,c){u instanceof sn?(i.i=u,pl(i.i,i.l)):(c||(u=rn(u,dl)),i.i=new sn(u,i.l))}function Q(i,u,c){i.i.set(u,c)}function Xn(i){return Q(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function nn(i,u){return i?u?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function rn(i,u,c){return typeof i=="string"?(i=encodeURI(i).replace(u,ll),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function ll(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var yo=/[#\/\?@]/g,hl=/[#\?:]/g,fl=/[#\?]/g,dl=/[#\?@]/g,ml=/#/g;function sn(i,u){this.h=this.g=null,this.i=i||null,this.j=!!u}function pe(i){i.g||(i.g=new Map,i.h=0,i.i&&cl(i.i,function(u,c){i.add(decodeURIComponent(u.replace(/\+/g," ")),c)}))}n=sn.prototype,n.add=function(i,u){pe(this),this.i=null,i=Ve(this,i);let c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(u),this.h+=1,this};function Eo(i,u){pe(i),u=Ve(i,u),i.g.has(u)&&(i.i=null,i.h-=i.g.get(u).length,i.g.delete(u))}function To(i,u){return pe(i),u=Ve(i,u),i.g.has(u)}n.forEach=function(i,u){pe(this),this.g.forEach(function(c,d){c.forEach(function(v){i.call(u,v,d,this)},this)},this)};function Io(i,u){pe(i);let c=[];if(typeof u=="string")To(i,u)&&(c=c.concat(i.g.get(Ve(i,u))));else for(i=Array.from(i.g.values()),u=0;u<i.length;u++)c=c.concat(i[u]);return c}n.set=function(i,u){return pe(this),this.i=null,i=Ve(this,i),To(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[u]),this.h+=1,this},n.get=function(i,u){return i?(i=Io(this,i),i.length>0?String(i[0]):u):u};function vo(i,u,c){Eo(i,u),c.length>0&&(i.i=null,i.g.set(Ve(i,u),P(c)),i.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],u=Array.from(this.g.keys());for(let d=0;d<u.length;d++){var c=u[d];const v=Ye(c);c=Io(this,c);for(let R=0;R<c.length;R++){let C=v;c[R]!==""&&(C+="="+Ye(c[R])),i.push(C)}}return this.i=i.join("&")};function Ao(i){const u=new sn;return u.i=i.i,i.g&&(u.g=new Map(i.g),u.h=i.h),u}function Ve(i,u){return u=String(u),i.j&&(u=u.toLowerCase()),u}function pl(i,u){u&&!i.j&&(pe(i),i.i=null,i.g.forEach(function(c,d){const v=d.toLowerCase();d!=v&&(Eo(this,d),vo(this,v,c))},i)),i.j=u}function gl(i,u){const c=new Je;if(a.Image){const d=new Image;d.onload=m(Qt,c,"TestLoadImage: loaded",!0,u,d),d.onerror=m(Qt,c,"TestLoadImage: error",!1,u,d),d.onabort=m(Qt,c,"TestLoadImage: abort",!1,u,d),d.ontimeout=m(Qt,c,"TestLoadImage: timeout",!1,u,d),a.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else u(!1)}function _l(i,u){const c=new Je,d=new AbortController,v=setTimeout(()=>{d.abort(),Qt(c,"TestPingServer: timeout",!1,u)},1e4);fetch(i,{signal:d.signal}).then(R=>{clearTimeout(v),R.ok?Qt(c,"TestPingServer: ok",!0,u):Qt(c,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(v),Qt(c,"TestPingServer: error",!1,u)})}function Qt(i,u,c,d,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),d(c)}catch{}}function yl(){this.g=new tl}function ps(i){this.i=i.Sb||null,this.h=i.ab||!1}y(ps,Yi),ps.prototype.g=function(){return new Jn(this.i,this.h)};function Jn(i,u){mt.call(this),this.H=i,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}y(Jn,mt),n=Jn.prototype,n.open=function(i,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=u,this.readyState=1,an(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(u.body=i),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,on(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,an(this)),this.g&&(this.readyState=3,an(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;wo(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function wo(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var u=i.value?i.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!i.done}))&&(this.response=this.responseText+=u)}i.done?on(this):an(this),this.readyState==3&&wo(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,on(this))},n.Na=function(i){this.g&&(this.response=i,on(this))},n.ga=function(){this.g&&on(this)};function on(i){i.readyState=4,i.l=null,i.j=null,i.B=null,an(i)}n.setRequestHeader=function(i,u){this.A.append(i,u)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],u=this.h.entries();for(var c=u.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=u.next();return i.join(`\r
`)};function an(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Jn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Ro(i){let u="";return zn(i,function(c,d){u+=d,u+=":",u+=c,u+=`\r
`}),u}function gs(i,u,c){t:{for(d in c){var d=!1;break t}d=!0}d||(c=Ro(c),typeof i=="string"?c!=null&&Ye(c):Q(i,u,c))}function Z(i){mt.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}y(Z,mt);var El=/^https?$/i,Tl=["POST","PUT"];n=Z.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,u,c,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);u=u?u.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():io.g(),this.g.onreadystatechange=w(f(this.Ca,this));try{this.B=!0,this.g.open(u,String(i),!0),this.B=!1}catch(R){So(this,R);return}if(i=c||"",c=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var v in d)c.set(v,d[v]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const R of d.keys())c.set(R,d.get(R));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(c.keys()).find(R=>R.toLowerCase()=="content-type"),v=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(Tl,u,void 0)>=0)||d||v||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,C]of c)this.g.setRequestHeader(R,C);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(R){So(this,R)}};function So(i,u){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=u,i.o=5,Vo(i),Yn(i)}function Vo(i){i.A||(i.A=!0,yt(i,"complete"),yt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,yt(this,"complete"),yt(this,"abort"),Yn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Yn(this,!0)),Z.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Po(this):this.Xa())},n.Xa=function(){Po(this)};function Po(i){if(i.h&&typeof o<"u"){if(i.v&&Xt(i)==4)setTimeout(i.Ca.bind(i),0);else if(yt(i,"readystatechange"),Xt(i)==4){i.h=!1;try{const R=i.ca();t:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var c;if(!(c=u)){var d;if(d=R===0){let C=String(i.D).match(_o)[1]||null;!C&&a.self&&a.self.location&&(C=a.self.location.protocol.slice(0,-1)),d=!El.test(C?C.toLowerCase():"")}c=d}if(c)yt(i,"complete"),yt(i,"success");else{i.o=6;try{var v=Xt(i)>2?i.g.statusText:""}catch{v=""}i.l=v+" ["+i.ca()+"]",Vo(i)}}finally{Yn(i)}}}}function Yn(i,u){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const c=i.g;i.g=null,u||yt(i,"ready");try{c.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Xt(i){return i.g?i.g.readyState:0}n.ca=function(){try{return Xt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var u=this.g.responseText;return i&&u.indexOf(i)==0&&(u=u.substring(i.length)),Zc(u)}};function Co(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Il(i){const u={};i=(i.g&&Xt(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(g(i[d]))continue;var c=il(i[d]);const v=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const R=u[v]||[];u[v]=R,R.push(c)}Hc(u,function(d){return d.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function un(i,u,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||u}function bo(i){this.za=0,this.i=[],this.j=new Je,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=un("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=un("baseRetryDelayMs",5e3,i),this.Za=un("retryDelaySeedMs",1e4,i),this.Ta=un("forwardChannelMaxRetries",2,i),this.va=un("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new ho(i&&i.concurrentRequestLimit),this.Ba=new yl,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=bo.prototype,n.ka=8,n.I=1,n.connect=function(i,u,c,d){Et(0),this.W=i,this.H=u||{},c&&d!==void 0&&(this.H.OSID=c,this.H.OAID=d),this.F=this.X,this.J=Uo(this,null,this.W),tr(this)};function _s(i){if(Do(i),i.I==3){var u=i.V++,c=Nt(i.J);if(Q(c,"SID",i.M),Q(c,"RID",u),Q(c,"TYPE","terminate"),cn(i,c),u=new Ht(i,i.j,u),u.M=2,u.A=Xn(Nt(c)),c=!1,a.navigator&&a.navigator.sendBeacon)try{c=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!c&&a.Image&&(new Image().src=u.A,c=!0),c||(u.g=Bo(u.j,null),u.g.ea(u.A)),u.F=Date.now(),Qn(u)}Fo(i)}function Zn(i){i.g&&(Es(i),i.g.cancel(),i.g=null)}function Do(i){Zn(i),i.v&&(a.clearTimeout(i.v),i.v=null),er(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function tr(i){if(!fo(i.h)&&!i.m){i.m=!0;var u=i.Ea;ft||p(),dt||(ft(),dt=!0),T.add(u,i),i.D=0}}function vl(i,u){return mo(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=u.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=Xe(f(i.Ea,i,u),Lo(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const v=new Ht(this,this.j,i);let R=this.o;if(this.U&&(R?(R=qi(R),zi(R,this.U)):R=this.U),this.u!==null||this.R||(v.J=R,R=null),this.S)t:{for(var u=0,c=0;c<this.i.length;c++){e:{var d=this.i[c];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(u+=d,u>4096){u=c;break t}if(u===4096||c===this.i.length-1){u=c+1;break t}}u=1e3}else u=1e3;u=ko(this,v,u),c=Nt(this.J),Q(c,"RID",i),Q(c,"CVER",22),this.G&&Q(c,"X-HTTP-Session-Id",this.G),cn(this,c),R&&(this.R?u="headers="+Ye(Ro(R))+"&"+u:this.u&&gs(c,this.u,R)),ds(this.h,v),this.Ra&&Q(c,"TYPE","init"),this.S?(Q(c,"$req",u),Q(c,"SID","null"),v.U=!0,cs(v,c,null)):cs(v,c,u),this.I=2}}else this.I==3&&(i?No(this,i):this.i.length==0||fo(this.h)||No(this))};function No(i,u){var c;u?c=u.l:c=i.V++;const d=Nt(i.J);Q(d,"SID",i.M),Q(d,"RID",c),Q(d,"AID",i.K),cn(i,d),i.u&&i.o&&gs(d,i.u,i.o),c=new Ht(i,i.j,c,i.D+1),i.u===null&&(c.J=i.o),u&&(i.i=u.G.concat(i.i)),u=ko(i,c,1e3),c.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),ds(i.h,c),cs(c,d,u)}function cn(i,u){i.H&&zn(i.H,function(c,d){Q(u,d,c)}),i.l&&zn({},function(c,d){Q(u,d,c)})}function ko(i,u,c){c=Math.min(i.i.length,c);const d=i.l?f(i.l.Ka,i.l,i):null;t:{var v=i.i;let U=-1;for(;;){const it=["count="+c];U==-1?c>0?(U=v[0].g,it.push("ofs="+U)):U=0:it.push("ofs="+U);let K=!0;for(let at=0;at<c;at++){var R=v[at].g;const kt=v[at].map;if(R-=U,R<0)U=Math.max(0,v[at].g-100),K=!1;else try{R="req"+R+"_"||"";try{var C=kt instanceof Map?kt:Object.entries(kt);for(const[_e,Jt]of C){let Yt=Jt;l(Jt)&&(Yt=ss(Jt)),it.push(R+_e+"="+encodeURIComponent(Yt))}}catch(_e){throw it.push(R+"type="+encodeURIComponent("_badmap")),_e}}catch{d&&d(kt)}}if(K){C=it.join("&");break t}}C=void 0}return i=i.i.splice(0,c),u.G=i,C}function Oo(i){if(!i.g&&!i.v){i.Y=1;var u=i.Da;ft||p(),dt||(ft(),dt=!0),T.add(u,i),i.A=0}}function ys(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=Xe(f(i.Da,i),Lo(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,xo(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=Xe(f(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Et(10),Zn(this),xo(this))};function Es(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function xo(i){i.g=new Ht(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var u=Nt(i.na);Q(u,"RID","rpc"),Q(u,"SID",i.M),Q(u,"AID",i.K),Q(u,"CI",i.F?"0":"1"),!i.F&&i.ia&&Q(u,"TO",i.ia),Q(u,"TYPE","xmlhttp"),cn(i,u),i.u&&i.o&&gs(u,i.u,i.o),i.O&&(i.g.H=i.O);var c=i.g;i=i.ba,c.M=1,c.A=Xn(Nt(u)),c.u=null,c.R=!0,uo(c,i)}n.Va=function(){this.C!=null&&(this.C=null,Zn(this),ys(this),Et(19))};function er(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function Mo(i,u){var c=null;if(i.g==u){er(i),Es(i),i.g=null;var d=2}else if(fs(i.h,u))c=u.G,po(i.h,u),d=1;else return;if(i.I!=0){if(u.o)if(d==1){c=u.u?u.u.length:0,u=Date.now()-u.F;var v=i.D;d=Hn(),yt(d,new ro(d,c)),tr(i)}else Oo(i);else if(v=u.m,v==3||v==0&&u.X>0||!(d==1&&vl(i,u)||d==2&&ys(i)))switch(c&&c.length>0&&(u=i.h,u.i=u.i.concat(c)),v){case 1:ge(i,5);break;case 4:ge(i,10);break;case 3:ge(i,6);break;default:ge(i,2)}}}function Lo(i,u){let c=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(c*=2),c*u}function ge(i,u){if(i.j.info("Error code "+u),u==2){var c=f(i.bb,i),d=i.Ua;const v=!d;d=new Wt(d||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||tn(d,"https"),Xn(d),v?gl(d.toString(),c):_l(d.toString(),c)}else Et(2);i.I=0,i.l&&i.l.pa(u),Fo(i),Do(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),Et(2)):(this.j.info("Failed to ping google.com"),Et(1))};function Fo(i){if(i.I=0,i.ja=[],i.l){const u=go(i.h);(u.length!=0||i.i.length!=0)&&(N(i.ja,u),N(i.ja,i.i),i.h.i.length=0,P(i.i),i.i.length=0),i.l.oa()}}function Uo(i,u,c){var d=c instanceof Wt?Nt(c):new Wt(c);if(d.g!="")u&&(d.g=u+"."+d.g),en(d,d.u);else{var v=a.location;d=v.protocol,u=u?u+"."+v.hostname:v.hostname,v=+v.port;const R=new Wt(null);d&&tn(R,d),u&&(R.g=u),v&&en(R,v),c&&(R.h=c),d=R}return c=i.G,u=i.wa,c&&u&&Q(d,c,u),Q(d,"VER",i.ka),cn(i,d),d}function Bo(i,u,c){if(u&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=i.Aa&&!i.ma?new Z(new ps({ab:c})):new Z(i.ma),u.Fa(i.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function jo(){}n=jo.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function nr(){}nr.prototype.g=function(i,u){return new Rt(i,u)};function Rt(i,u){mt.call(this),this.g=new bo(u),this.l=i,this.h=u&&u.messageUrlParams||null,i=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(i?i["X-WebChannel-Content-Type"]=u.messageContentType:i={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(i?i["X-WebChannel-Client-Profile"]=u.sa:i={"X-WebChannel-Client-Profile":u.sa}),this.g.U=i,(i=u&&u.Qb)&&!g(i)&&(this.g.u=i),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!g(u)&&(this.g.G=u,i=this.h,i!==null&&u in i&&(i=this.h,u in i&&delete i[u])),this.j=new Pe(this)}y(Rt,mt),Rt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Rt.prototype.close=function(){_s(this.g)},Rt.prototype.o=function(i){var u=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.v&&(c={},c.__data__=ss(i),i=c);u.i.push(new ul(u.Ya++,i)),u.I==3&&tr(u)},Rt.prototype.N=function(){this.g.l=null,delete this.j,_s(this.g),delete this.g,Rt.Z.N.call(this)};function qo(i){is.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var u=i.__sm__;if(u){t:{for(const c in u){i=c;break t}i=void 0}(this.i=i)&&(i=this.i,u=u!==null&&i in u?u[i]:void 0),this.data=u}else this.data=i}y(qo,is);function $o(){os.call(this),this.status=1}y($o,os);function Pe(i){this.g=i}y(Pe,jo),Pe.prototype.ra=function(){yt(this.g,"a")},Pe.prototype.qa=function(i){yt(this.g,new qo(i))},Pe.prototype.pa=function(i){yt(this.g,new $o)},Pe.prototype.oa=function(){yt(this.g,"b")},nr.prototype.createWebChannel=nr.prototype.g,Rt.prototype.send=Rt.prototype.o,Rt.prototype.open=Rt.prototype.m,Rt.prototype.close=Rt.prototype.close,Eu=function(){return new nr},yu=function(){return Hn()},_u=de,Ls={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Wn.NO_ERROR=0,Wn.TIMEOUT=8,Wn.HTTP_ERROR=6,cr=Wn,so.COMPLETE="complete",gu=so,Zi.EventType=We,We.OPEN="a",We.CLOSE="b",We.ERROR="c",We.MESSAGE="d",mt.prototype.listen=mt.prototype.J,fn=Zi,Z.prototype.listenOnce=Z.prototype.K,Z.prototype.getLastError=Z.prototype.Ha,Z.prototype.getLastErrorCode=Z.prototype.ya,Z.prototype.getStatus=Z.prototype.ca,Z.prototype.getResponseJson=Z.prototype.La,Z.prototype.getResponseText=Z.prototype.la,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Fa,pu=Z}).apply(typeof sr<"u"?sr:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}gt.UNAUTHENTICATED=new gt(null),gt.GOOGLE_CREDENTIALS=new gt("google-credentials-uid"),gt.FIRST_PARTY=new gt("first-party-uid"),gt.MOCK_USER=new gt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qe="12.14.0";function rf(n){qe=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ve=new uu("@firebase/firestore");function Ce(){return ve.logLevel}function b(n,...t){if(ve.logLevel<=$.DEBUG){const e=t.map(ei);ve.debug(`Firestore (${qe}): ${n}`,...e)}}function zt(n,...t){if(ve.logLevel<=$.ERROR){const e=t.map(ei);ve.error(`Firestore (${qe}): ${n}`,...e)}}function Ae(n,...t){if(ve.logLevel<=$.WARN){const e=t.map(ei);ve.warn(`Firestore (${qe}): ${n}`,...e)}}function ei(n){if(typeof n=="string")return n;try{return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,Tu(n,r,e)}function Tu(n,t,e){let r=`FIRESTORE (${qe}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw zt(r),new Error(r)}function z(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||Tu(t,s,r)}function F(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends je{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class sf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(gt.UNAUTHENTICATED))}shutdown(){}}class of{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class af{constructor(t){this.t=t,this.currentUser=gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){z(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new qt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new qt,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},l=h=>{b("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>l(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(b("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new qt)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(b("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(z(typeof r.accessToken=="string",31837,{l:r}),new Iu(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return z(t===null||typeof t=="string",2055,{h:t}),new gt(t)}}class uf{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=gt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class cf{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new uf(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(gt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class na{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class lf{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,qh(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){z(this.o===void 0,3512);const r=o=>{o.error!=null&&b("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,b("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const s=o=>{b("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):b("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new na(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(z(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new na(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hf(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=hf(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function B(n,t){return n<t?-1:n>t?1:0}function Fs(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),o=t.charAt(r);if(s!==o)return Rs(s)===Rs(o)?B(s,o):Rs(s)?1:-1}return B(n.length,t.length)}const ff=55296,df=57343;function Rs(n){const t=n.charCodeAt(0);return t>=ff&&t<=df}function Me(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra="__name__";class Ot{constructor(t,e,r){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&M(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Ot.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ot?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=Ot.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return B(t.length,e.length)}static compareSegments(t,e){const r=Ot.isNumericId(t),s=Ot.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?Ot.extractNumericId(t).compare(Ot.extractNumericId(e)):Fs(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return ee.fromString(t.substring(4,t.length-2))}}class W extends Ot{construct(t,e,r){return new W(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new D(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new W(e)}static emptyPath(){return new W([])}}const mf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class lt extends Ot{construct(t,e,r){return new lt(t,e,r)}static isValidIdentifier(t){return mf.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),lt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ra}static keyField(){return new lt([ra])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new D(S.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new D(S.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new D(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(o(),s++)}if(o(),a)throw new D(S.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new lt(e)}static emptyPath(){return new lt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(t){this.path=t}static fromPath(t){return new x(W.fromString(t))}static fromName(t){return new x(W.fromString(t).popFirst(5))}static empty(){return new x(W.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&W.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return W.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new x(new W(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vu(n,t,e){if(!e)throw new D(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function pf(n,t,e,r){if(t===!0&&r===!0)throw new D(S.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function sa(n){if(!x.isDocumentKey(n))throw new D(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ia(n){if(x.isDocumentKey(n))throw new D(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Au(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function kr(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function Tt(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new D(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=kr(n);throw new D(S.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(n,t){const e={typeString:n};return t&&(e.value=t),e}function kn(n,t){if(!Au(n))throw new D(S.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new D(S.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa=-62135596800,aa=1e6;class X{static now(){return X.fromMillis(Date.now())}static fromDate(t){return X.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*aa);return new X(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new D(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new D(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<oa)throw new D(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new D(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/aa}_compareTo(t){return this.seconds===t.seconds?B(this.nanoseconds,t.nanoseconds):B(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:X._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(kn(t,X._jsonSchema))return new X(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-oa;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}X._jsonSchemaVersion="firestore/timestamp/1.0",X._jsonSchema={type:st("string",X._jsonSchemaVersion),seconds:st("number"),nanoseconds:st("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new X(0,0))}static max(){return new L(new X(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An=-1;function gf(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=L.fromTimestamp(r===1e9?new X(e+1,0):new X(e,r));return new re(s,x.empty(),t)}function _f(n){return new re(n.readTime,n.key,An)}class re{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new re(L.min(),x.empty(),An)}static max(){return new re(L.max(),x.empty(),An)}}function yf(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=x.comparator(n.documentKey,t.documentKey),e!==0?e:B(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ef="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Tf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $e(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==Ef)throw n;b("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new V((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof V?e:V.resolve(e)}catch(e){return V.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):V.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):V.reject(e)}static resolve(t){return new V((e,r)=>{e(t)})}static reject(t){return new V((e,r)=>{r(t)})}static waitFor(t){return new V((e,r)=>{let s=0,o=0,a=!1;t.forEach(l=>{++s,l.next(()=>{++o,a&&o===s&&e()},h=>r(h))}),a=!0,o===s&&e()})}static or(t){let e=V.resolve(!1);for(const r of t)e=e.next(s=>s?V.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,o)=>{r.push(e.call(this,s,o))}),this.waitFor(r)}static mapArray(t,e){return new V((r,s)=>{const o=t.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next(m=>{a[f]=m,++l,l===o&&r(a)},m=>s(m))}})}static doWhile(t,e){return new V((r,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):r()};o()})}}function If(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function ze(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Or.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ri=-1;function xr(n){return n==null}function Er(n){return n===0&&1/n==-1/0}function vf(n){return typeof n=="number"&&Number.isInteger(n)&&!Er(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wu="";function Af(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=ua(t)),t=wf(n.get(e),t);return ua(t)}function wf(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case wu:e+="";break;default:e+=o}}return e}function ua(n){return n+wu+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ca(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function le(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Ru(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(t,e){this.comparator=t,this.root=e||ct.EMPTY}insert(t,e){return new J(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ct.BLACK,null,null))}remove(t){return new J(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ct.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new ir(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new ir(this.root,t,this.comparator,!1)}getReverseIterator(){return new ir(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new ir(this.root,t,this.comparator,!0)}}class ir{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ct{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??ct.RED,this.left=s??ct.EMPTY,this.right=o??ct.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new ct(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ct.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return ct.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ct.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ct.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}}ct.EMPTY=null,ct.RED=!0,ct.BLACK=!1;ct.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new ct(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(t){this.comparator=t,this.data=new J(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new la(this.data.getIterator())}getIteratorFrom(t){return new la(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof ot)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new ot(this.comparator);return e.data=t,e}}class la{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t){this.fields=t,t.sort(lt.comparator)}static empty(){return new St([])}unionWith(t){let e=new ot(lt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new St(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Me(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Su("Invalid base64 string: "+o):o}}(t);return new ht(e)}static fromUint8Array(t){const e=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(t);return new ht(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return B(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const Rf=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function se(n){if(z(!!n,39018),typeof n=="string"){let t=0;const e=Rf.exec(n);if(z(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:et(n.seconds),nanos:et(n.nanos)}}function et(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ie(n){return typeof n=="string"?ht.fromBase64String(n):ht.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vu="server_timestamp",Pu="__type__",Cu="__previous_value__",bu="__local_write_time__";function si(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Pu])==null?void 0:r.stringValue)===Vu}function Mr(n){const t=n.mapValue.fields[Cu];return si(t)?Mr(t):t}function wn(n){const t=se(n.mapValue.fields[bu].timestampValue);return new X(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf{constructor(t,e,r,s,o,a,l,h,f,m,y){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=m,this.apiKey=y}}const Tr="(default)";class Rn{constructor(t,e){this.projectId=t,this.database=e||Tr}static empty(){return new Rn("","")}get isDefaultDatabase(){return this.database===Tr}isEqual(t){return t instanceof Rn&&t.projectId===this.projectId&&t.database===this.database}}function Vf(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new D(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Rn(n.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Du="__type__",Pf="__max__",or={mapValue:{}},Nu="__vector__",Ir="value";function oe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?si(n)?4:bf(n)?9007199254740991:Cf(n)?10:11:M(28295,{value:n})}function Ft(n,t){if(n===t)return!0;const e=oe(n);if(e!==oe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return wn(n).isEqual(wn(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=se(s.timestampValue),l=se(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,o){return ie(s.bytesValue).isEqual(ie(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,o){return et(s.geoPointValue.latitude)===et(o.geoPointValue.latitude)&&et(s.geoPointValue.longitude)===et(o.geoPointValue.longitude)}(n,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return et(s.integerValue)===et(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=et(s.doubleValue),l=et(o.doubleValue);return a===l?Er(a)===Er(l):isNaN(a)&&isNaN(l)}return!1}(n,t);case 9:return Me(n.arrayValue.values||[],t.arrayValue.values||[],Ft);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},l=o.mapValue.fields||{};if(ca(a)!==ca(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Ft(a[h],l[h])))return!1;return!0}(n,t);default:return M(52216,{left:n})}}function Sn(n,t){return(n.values||[]).find(e=>Ft(e,t))!==void 0}function Le(n,t){if(n===t)return 0;const e=oe(n),r=oe(t);if(e!==r)return B(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return B(n.booleanValue,t.booleanValue);case 2:return function(o,a){const l=et(o.integerValue||o.doubleValue),h=et(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1}(n,t);case 3:return ha(n.timestampValue,t.timestampValue);case 4:return ha(wn(n),wn(t));case 5:return Fs(n.stringValue,t.stringValue);case 6:return function(o,a){const l=ie(o),h=ie(a);return l.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){const l=o.split("/"),h=a.split("/");for(let f=0;f<l.length&&f<h.length;f++){const m=B(l[f],h[f]);if(m!==0)return m}return B(l.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){const l=B(et(o.latitude),et(a.latitude));return l!==0?l:B(et(o.longitude),et(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return fa(n.arrayValue,t.arrayValue);case 10:return function(o,a){var w,P,N,O;const l=o.fields||{},h=a.fields||{},f=(w=l[Ir])==null?void 0:w.arrayValue,m=(P=h[Ir])==null?void 0:P.arrayValue,y=B(((N=f==null?void 0:f.values)==null?void 0:N.length)||0,((O=m==null?void 0:m.values)==null?void 0:O.length)||0);return y!==0?y:fa(f,m)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===or.mapValue&&a===or.mapValue)return 0;if(o===or.mapValue)return 1;if(a===or.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),f=a.fields||{},m=Object.keys(f);h.sort(),m.sort();for(let y=0;y<h.length&&y<m.length;++y){const w=Fs(h[y],m[y]);if(w!==0)return w;const P=Le(l[h[y]],f[m[y]]);if(P!==0)return P}return B(h.length,m.length)}(n.mapValue,t.mapValue);default:throw M(23264,{he:e})}}function ha(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return B(n,t);const e=se(n),r=se(t),s=B(e.seconds,r.seconds);return s!==0?s:B(e.nanos,r.nanos)}function fa(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=Le(e[s],r[s]);if(o)return o}return B(e.length,r.length)}function Fe(n){return Us(n)}function Us(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=se(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return ie(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return x.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=Us(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${Us(e.fields[a])}`;return s+"}"}(n.mapValue):M(61005,{value:n})}function lr(n){switch(oe(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Mr(n);return t?16+lr(t):16;case 5:return 2*n.stringValue.length;case 6:return ie(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,o)=>s+lr(o),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return le(r.fields,(o,a)=>{s+=o.length+lr(a)}),s}(n.mapValue);default:throw M(13486,{value:n})}}function da(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function Vn(n){return!!n&&"integerValue"in n}function ku(n){return Vn(n)||function(e){return!!e&&"doubleValue"in e}(n)}function ii(n){return!!n&&"arrayValue"in n}function ma(n){return!!n&&"nullValue"in n}function pa(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function hr(n){return!!n&&"mapValue"in n}function Cf(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Du])==null?void 0:r.stringValue)===Nu}function gn(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return le(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=gn(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=gn(n.arrayValue.values[e]);return t}return{...n}}function bf(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Pf}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.value=t}static empty(){return new wt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!hr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=gn(e)}setAll(t){let e=lt.emptyPath(),r={},s=[];t.forEach((a,l)=>{if(!e.isImmediateParentOf(l)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=l.popLast()}a?r[l.lastSegment()]=gn(a):s.push(l.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());hr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ft(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];hr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){le(e,(s,o)=>t[s]=o);for(const s of r)delete t[s]}clone(){return new wt(gn(this.value))}}function Ou(n){const t=[];return le(n.fields,(e,r)=>{const s=new lt([e]);if(hr(r)){const o=Ou(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)}),new St(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(t,e,r,s,o,a,l){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new _t(t,0,L.min(),L.min(),L.min(),wt.empty(),0)}static newFoundDocument(t,e,r,s){return new _t(t,1,e,L.min(),r,s,0)}static newNoDocument(t,e){return new _t(t,2,e,L.min(),L.min(),wt.empty(),0)}static newUnknownDocument(t,e){return new _t(t,3,e,L.min(),L.min(),wt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=wt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=wt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof _t&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new _t(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(t,e){this.position=t,this.inclusive=e}}function ga(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=x.comparator(x.fromName(a.referenceValue),e.key):r=Le(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function _a(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Ft(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(t,e="asc"){this.field=t,this.dir=e}}function Df(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{}class rt extends xu{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new kf(t,e,r):e==="array-contains"?new Mf(t,r):e==="in"?new Lf(t,r):e==="not-in"?new Ff(t,r):e==="array-contains-any"?new Uf(t,r):new rt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Of(t,r):new xf(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Le(e,this.value)):e!==null&&oe(this.value)===oe(e)&&this.matchesComparison(Le(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Dt extends xu{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Dt(t,e)}matches(t){return Mu(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Mu(n){return n.op==="and"}function Lu(n){return Nf(n)&&Mu(n)}function Nf(n){for(const t of n.filters)if(t instanceof Dt)return!1;return!0}function Bs(n){if(n instanceof rt)return n.field.canonicalString()+n.op.toString()+Fe(n.value);if(Lu(n))return n.filters.map(t=>Bs(t)).join(",");{const t=n.filters.map(e=>Bs(e)).join(",");return`${n.op}(${t})`}}function Fu(n,t){return n instanceof rt?function(r,s){return s instanceof rt&&r.op===s.op&&r.field.isEqual(s.field)&&Ft(r.value,s.value)}(n,t):n instanceof Dt?function(r,s){return s instanceof Dt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,l)=>o&&Fu(a,s.filters[l]),!0):!1}(n,t):void M(19439)}function Uu(n){return n instanceof rt?function(e){return`${e.field.canonicalString()} ${e.op} ${Fe(e.value)}`}(n):n instanceof Dt?function(e){return e.op.toString()+" {"+e.getFilters().map(Uu).join(" ,")+"}"}(n):"Filter"}class kf extends rt{constructor(t,e,r){super(t,e,r),this.key=x.fromName(r.referenceValue)}matches(t){const e=x.comparator(t.key,this.key);return this.matchesComparison(e)}}class Of extends rt{constructor(t,e){super(t,"in",e),this.keys=Bu("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class xf extends rt{constructor(t,e){super(t,"not-in",e),this.keys=Bu("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Bu(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(r=>x.fromName(r.referenceValue))}class Mf extends rt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return ii(e)&&Sn(e.arrayValue,this.value)}}class Lf extends rt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Sn(this.value.arrayValue,e)}}class Ff extends rt{constructor(t,e){super(t,"not-in",e)}matches(t){if(Sn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Sn(this.value.arrayValue,e)}}class Uf extends rt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!ii(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Sn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(t,e=null,r=[],s=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=l,this.Te=null}}function ya(n,t=null,e=[],r=[],s=null,o=null,a=null){return new Bf(n,t,e,r,s,o,a)}function oi(n){const t=F(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>Bs(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),xr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>Fe(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>Fe(r)).join(",")),t.Te=e}return t.Te}function ai(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Df(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Fu(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!_a(n.startAt,t.startAt)&&_a(n.endAt,t.endAt)}function js(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(t,e=null,r=[],s=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function jf(n,t,e,r,s,o,a,l){return new Ge(n,t,e,r,s,o,a,l)}function Lr(n){return new Ge(n)}function Ea(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function qf(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function ju(n){return n.collectionGroup!==null}function _n(n){const t=F(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ie.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ot(lt.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(l=l.add(f.field))})}),l})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ie.push(new Pn(o,r))}),e.has(lt.keyField().canonicalString())||t.Ie.push(new Pn(lt.keyField(),r))}return t.Ie}function xt(n){const t=F(n);return t.Ee||(t.Ee=$f(t,_n(n))),t.Ee}function $f(n,t){if(n.limitType==="F")return ya(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new Pn(s.field,o)});const e=n.endAt?new vr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new vr(n.startAt.position,n.startAt.inclusive):null;return ya(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function qs(n,t){const e=n.filters.concat([t]);return new Ge(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function zf(n,t){const e=n.explicitOrderBy.concat([t]);return new Ge(n.path,n.collectionGroup,e,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function Ar(n,t,e){return new Ge(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Fr(n,t){return ai(xt(n),xt(t))&&n.limitType===t.limitType}function qu(n){return`${oi(xt(n))}|lt:${n.limitType}`}function be(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>Uu(s)).join(", ")}]`),xr(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>Fe(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>Fe(s)).join(",")),`Target(${r})`}(xt(n))}; limitType=${n.limitType})`}function Ur(n,t){return t.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):x.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,s){for(const o of _n(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(a,l,h){const f=ga(a,l,h);return a.inclusive?f<=0:f<0}(r.startAt,_n(r),s)||r.endAt&&!function(a,l,h){const f=ga(a,l,h);return a.inclusive?f>=0:f>0}(r.endAt,_n(r),s))}(n,t)}function Gf(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function $u(n){return(t,e)=>{let r=!1;for(const s of _n(n)){const o=Kf(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Kf(n,t,e){const r=n.field.isKeyField()?x.comparator(t.key,e.key):function(o,a,l){const h=a.data.field(o),f=l.data.field(o);return h!==null&&f!==null?Le(h,f):M(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){le(this.inner,(e,r)=>{for(const[s,o]of r)t(s,o)})}isEmpty(){return Ru(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hf=new J(x.comparator);function Gt(){return Hf}const zu=new J(x.comparator);function dn(...n){let t=zu;for(const e of n)t=t.insert(e.key,e);return t}function Gu(n){let t=zu;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function Ee(){return yn()}function Ku(){return yn()}function yn(){return new we(n=>n.toString(),(n,t)=>n.isEqual(t))}const Wf=new J(x.comparator),Qf=new ot(x.comparator);function j(...n){let t=Qf;for(const e of n)t=t.add(e);return t}const Xf=new ot(B);function Jf(){return Xf}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Er(t)?"-0":t}}function ui(n){return{integerValue:""+n}}function Yf(n,t){return vf(t)?ui(t):Br(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(){this._=void 0}}function Zf(n,t,e){return n instanceof Cn?function(s,o){const a={fields:{[Pu]:{stringValue:Vu},[bu]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&si(o)&&(o=Mr(o)),o&&(a.fields[Cu]=o),{mapValue:a}}(e,t):n instanceof bn?Wu(n,t):n instanceof Dn?Qu(n,t):n instanceof Nn?function(s,o){const a=Hu(s,o),l=Sr(a)+Sr(s.Ae);return Vn(a)&&Vn(s.Ae)?ui(l):Br(s.serializer,l)}(n,t):n instanceof wr?function(s,o){return Ta(s,o,Math.min)}(n,t):n instanceof Rr?function(s,o){return Ta(s,o,Math.max)}(n,t):void 0}function td(n,t,e){return n instanceof bn?Wu(n,t):n instanceof Dn?Qu(n,t):e}function Hu(n,t){return n instanceof Nn?ku(t)?t:{integerValue:0}:null}class Cn extends jr{}class bn extends jr{constructor(t){super(),this.elements=t}}function Wu(n,t){const e=Xu(t);for(const r of n.elements)e.some(s=>Ft(s,r))||e.push(r);return{arrayValue:{values:e}}}class Dn extends jr{constructor(t){super(),this.elements=t}}function Qu(n,t){let e=Xu(t);for(const r of n.elements)e=e.filter(s=>!Ft(s,r));return{arrayValue:{values:e}}}class ci extends jr{constructor(t,e){super(),this.serializer=t,this.Ae=e}}class Nn extends ci{}class wr extends ci{}class Rr extends ci{}function Ta(n,t,e){if(!ku(t))return n.Ae;const r=e(Sr(t),Sr(n.Ae));return Vn(t)&&Vn(n.Ae)?ui(r):Br(n.serializer,r)}function Sr(n){return et(n.integerValue||n.doubleValue)}function Xu(n){return ii(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed{constructor(t,e){this.field=t,this.transform=e}}function nd(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof bn&&s instanceof bn||r instanceof Dn&&s instanceof Dn?Me(r.elements,s.elements,Ft):r instanceof Nn&&s instanceof Nn||r instanceof wr&&s instanceof wr||r instanceof Rr&&s instanceof Rr?Ft(r.Ae,s.Ae):r instanceof Cn&&s instanceof Cn}(n.transform,t.transform)}class rd{constructor(t,e){this.version=t,this.transformResults=e}}class It{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new It}static exists(t){return new It(void 0,t)}static updateTime(t){return new It(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function fr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class qr{}function Ju(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new $r(n.key,It.none()):new On(n.key,n.data,It.none());{const e=n.data,r=wt.empty();let s=new ot(lt.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new he(n.key,r,new St(s.toArray()),It.none())}}function sd(n,t,e){n instanceof On?function(s,o,a){const l=s.value.clone(),h=va(s.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,t,e):n instanceof he?function(s,o,a){if(!fr(s.precondition,o))return void o.convertToUnknownDocument(a.version);const l=va(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Yu(s)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function En(n,t,e,r){return n instanceof On?function(o,a,l,h){if(!fr(o.precondition,a))return l;const f=o.value.clone(),m=Aa(o.fieldTransforms,h,a);return f.setAll(m),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,t,e,r):n instanceof he?function(o,a,l,h){if(!fr(o.precondition,a))return l;const f=Aa(o.fieldTransforms,h,a),m=a.data;return m.setAll(Yu(o)),m.setAll(f),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(y=>y.field))}(n,t,e,r):function(o,a,l){return fr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,t,e)}function id(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=Hu(r.transform,s||null);o!=null&&(e===null&&(e=wt.empty()),e.set(r.field,o))}return e||null}function Ia(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Me(r,s,(o,a)=>nd(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class On extends qr{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class he extends qr{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Yu(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function va(n,t,e){const r=new Map;z(n.length===e.length,32656,{Ve:e.length,de:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,l=t.data.field(o.field);r.set(o.field,td(a,l,e[s]))}return r}function Aa(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,Zf(o,a,t))}return r}class $r extends qr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class od extends qr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ad{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&sd(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=En(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=En(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=Ku();return this.mutations.forEach(s=>{const o=t.get(s.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=e.has(s.key)?null:l;const h=Ju(a,l);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(L.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),j())}isEqual(t){return this.batchId===t.batchId&&Me(this.mutations,t.mutations,(e,r)=>Ia(e,r))&&Me(this.baseMutations,t.baseMutations,(e,r)=>Ia(e,r))}}class li{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){z(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=function(){return Wf}();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new li(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cd{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nt,q;function ld(n){switch(n){case S.OK:return M(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function Zu(n){if(n===void 0)return zt("GRPC error has no .code"),S.UNKNOWN;switch(n){case nt.OK:return S.OK;case nt.CANCELLED:return S.CANCELLED;case nt.UNKNOWN:return S.UNKNOWN;case nt.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case nt.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case nt.INTERNAL:return S.INTERNAL;case nt.UNAVAILABLE:return S.UNAVAILABLE;case nt.UNAUTHENTICATED:return S.UNAUTHENTICATED;case nt.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case nt.NOT_FOUND:return S.NOT_FOUND;case nt.ALREADY_EXISTS:return S.ALREADY_EXISTS;case nt.PERMISSION_DENIED:return S.PERMISSION_DENIED;case nt.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case nt.ABORTED:return S.ABORTED;case nt.OUT_OF_RANGE:return S.OUT_OF_RANGE;case nt.UNIMPLEMENTED:return S.UNIMPLEMENTED;case nt.DATA_LOSS:return S.DATA_LOSS;default:return M(39323,{code:n})}}(q=nt||(nt={}))[q.OK=0]="OK",q[q.CANCELLED=1]="CANCELLED",q[q.UNKNOWN=2]="UNKNOWN",q[q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",q[q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",q[q.NOT_FOUND=5]="NOT_FOUND",q[q.ALREADY_EXISTS=6]="ALREADY_EXISTS",q[q.PERMISSION_DENIED=7]="PERMISSION_DENIED",q[q.UNAUTHENTICATED=16]="UNAUTHENTICATED",q[q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",q[q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",q[q.ABORTED=10]="ABORTED",q[q.OUT_OF_RANGE=11]="OUT_OF_RANGE",q[q.UNIMPLEMENTED=12]="UNIMPLEMENTED",q[q.INTERNAL=13]="INTERNAL",q[q.UNAVAILABLE=14]="UNAVAILABLE",q[q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hd(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fd=new ee([4294967295,4294967295],0);function wa(n){const t=hd().encode(n),e=new mu;return e.update(t),new Uint8Array(e.digest())}function Ra(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new ee([e,r],0),new ee([s,o],0)]}class hi{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new mn(`Invalid padding: ${e}`);if(r<0)throw new mn(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new mn(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new mn(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=ee.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply(ee.fromNumber(r)));return s.compare(fd)===1&&(s=new ee([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=wa(t),[r,s]=Ra(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);if(!this.we(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new hi(o,s,e);return r.forEach(l=>a.insert(l)),a}insert(t){if(this.ge===0)return;const e=wa(t),[r,s]=Ra(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);this.Se(a)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class mn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,Mn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new xn(L.min(),s,new J(B),Gt(),j())}}class Mn{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new Mn(r,e,j(),j(),j())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(t,e,r,s){this.be=t,this.removedTargetIds=e,this.key=r,this.De=s}}class tc{constructor(t,e){this.targetId=t,this.Ce=e}}class ec{constructor(t,e,r=ht.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Sa{constructor(t){this.targetId=t,this.ve=0,this.Fe=Va(),this.Me=ht.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=j(),e=j(),r=j();return this.Fe.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:M(38017,{changeType:o})}}),new Mn(this.Me,this.xe,t,e,r)}qe(){this.Oe=!1,this.Fe=Va()}Ke(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,z(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const ln="WatchChangeAggregator";class dd{constructor(t){this.Ge=t,this.ze=new Map,this.je=Gt(),this.Je=ar(),this.He=ar(),this.Ze=new J(B)}Xe(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const r=this.ze.get(e);if(r)switch(t.state){case 0:this.nt(e)&&r.Le(t.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(t.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(e);break;case 3:this.nt(e)&&(r.Qe(),r.Le(t.resumeToken));break;case 4:this.nt(e)&&(this.rt(e),r.Le(t.resumeToken));break;default:M(56790,{state:t.state})}else b(ln,`handleTargetChange received targetChange for untracked target ID (${e}) with state (${t.state})`)})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((r,s)=>{this.nt(s)&&e(s)})}it(t){const e=t.targetId,r=t.Ce.count,s=this.st(e);if(s){const o=s.target;if(js(o))if(r===0){const a=new x(o.path);this.et(e,a,_t.newNoDocument(a,L.min()))}else z(r===1,20013,{expectedCount:r});else{const a=this.ot(e);if(a!==r){const l=this._t(t),h=l?this.ut(l,t,a):1;if(h!==0){this.rt(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,f)}}}}}_t(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,l;try{a=ie(r).toUint8Array()}catch(h){if(h instanceof Su)return Ae("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new hi(a,s,o)}catch(h){return Ae(h instanceof mn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.ge===0?null:l}ut(t,e,r){return e.Ce.count===r-this.ht(t,e.targetId)?0:2}ht(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach(o=>{const a=this.Ge.lt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.et(e,o,null),s++)}),s}Pt(t){const e=new Map;this.ze.forEach((o,a)=>{const l=this.st(a);if(l){if(o.current&&js(l.target)){const h=new x(l.target.path);this.Tt(h).has(a)||this.It(a,h)||this.et(a,h,_t.newNoDocument(h,t))}o.Be&&(e.set(a,o.ke()),o.qe())}});let r=j();this.He.forEach((o,a)=>{let l=!0;a.forEachWhile(h=>{const f=this.st(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(o))}),this.je.forEach((o,a)=>a.setReadTime(t));const s=new xn(t,e,this.Ze,this.je,r);return this.je=Gt(),this.Je=ar(),this.He=ar(),this.Ze=new J(B),s}Ye(t,e){const r=this.ze.get(t);if(!r||!this.nt(t))return void b(ln,`addDocumentToTarget received document for unknown inactive target (${t})`);const s=this.It(t,e.key)?2:0;r.Ke(e.key,s),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Tt(e.key).add(t)),this.He=this.He.insert(e.key,this.Et(e.key).add(t))}et(t,e,r){const s=this.ze.get(t);s&&this.nt(t)?(this.It(t,e)?s.Ke(e,1):s.Ue(e),this.He=this.He.insert(e,this.Et(e).delete(t)),this.He=this.He.insert(e,this.Et(e).add(t)),r&&(this.je=this.je.insert(e,r))):b(ln,`removeDocumentFromTarget received document for unknown or inactive target (${t})`)}removeTarget(t){this.ze.delete(t)}ot(t){const e=this.ze.get(t);if(!e)return 0;const r=e.ke();return this.Ge.getRemoteKeysForTarget(t).size+r.addedDocuments.size-r.removedDocuments.size}$e(t){let e=this.ze.get(t);e||(b(ln,`recordPendingTargetRequest set up tracking for target ID ${t}`),e=new Sa(t),this.ze.set(t,e)),e.$e()}Et(t){let e=this.He.get(t);return e||(e=new ot(B),this.He=this.He.insert(t,e)),e}Tt(t){let e=this.Je.get(t);return e||(e=new ot(B),this.Je=this.Je.insert(t,e)),e}nt(t){const e=this.st(t)!==null;return e||b(ln,"Detected inactive target",t),e}st(t){const e=this.ze.get(t);return e===void 0||e.Ne?null:this.Ge.Rt(t)}rt(t){this.ze.set(t,new Sa(t)),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}It(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function ar(){return new J(x.comparator)}function Va(){return new J(x.comparator)}const md={asc:"ASCENDING",desc:"DESCENDING"},pd={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},gd={and:"AND",or:"OR"};class _d{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function $s(n,t){return n.useProto3Json||xr(t)?t:{value:t}}function Vr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function nc(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function yd(n,t){return Vr(n,t.toTimestamp())}function Mt(n){return z(!!n,49232),L.fromTimestamp(function(e){const r=se(e);return new X(r.seconds,r.nanos)}(n))}function fi(n,t){return zs(n,t).canonicalString()}function zs(n,t){const e=function(s){return new W(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function rc(n){const t=W.fromString(n);return z(uc(t),10190,{key:t.toString()}),t}function Gs(n,t){return fi(n.databaseId,t.path)}function Ss(n,t){const e=rc(t);if(e.get(1)!==n.databaseId.projectId)throw new D(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new D(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new x(ic(e))}function sc(n,t){return fi(n.databaseId,t)}function Ed(n){const t=rc(n);return t.length===4?W.emptyPath():ic(t)}function Ks(n){return new W(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ic(n){return z(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Pa(n,t,e){return{name:Gs(n,t),fields:e.value.mapValue.fields}}function Td(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:M(39313,{state:f})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(f,m){return f.useProto3Json?(z(m===void 0||typeof m=="string",58123),ht.fromBase64String(m||"")):(z(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),ht.fromUint8Array(m||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&function(f){const m=f.code===void 0?S.UNKNOWN:Zu(f.code);return new D(m,f.message||"")}(a);e=new ec(r,s,o,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ss(n,r.document.name),o=Mt(r.document.updateTime),a=r.document.createTime?Mt(r.document.createTime):L.min(),l=new wt({mapValue:{fields:r.document.fields}}),h=_t.newFoundDocument(s,o,a,l),f=r.targetIds||[],m=r.removedTargetIds||[];e=new dr(f,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Ss(n,r.document),o=r.readTime?Mt(r.readTime):L.min(),a=_t.newNoDocument(s,o),l=r.removedTargetIds||[];e=new dr([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Ss(n,r.document),o=r.removedTargetIds||[];e=new dr([],o,s,null)}else{if(!("filter"in t))return M(11601,{At:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new cd(s,o),l=r.targetId;e=new tc(l,a)}}return e}function Id(n,t){let e;if(t instanceof On)e={update:Pa(n,t.key,t.value)};else if(t instanceof $r)e={delete:Gs(n,t.key)};else if(t instanceof he)e={update:Pa(n,t.key,t.data),updateMask:bd(t.fieldMask)};else{if(!(t instanceof od))return M(16599,{Vt:t.type});e={verify:Gs(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,a){const l=a.transform;if(l instanceof Cn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof bn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Dn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Nn)return{fieldPath:a.field.canonicalString(),increment:l.Ae};if(l instanceof wr)return{fieldPath:a.field.canonicalString(),minimum:l.Ae};if(l instanceof Rr)return{fieldPath:a.field.canonicalString(),maximum:l.Ae};throw M(20930,{transform:a.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:yd(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:M(27497)}(n,t.precondition)),e}function vd(n,t){return n&&n.length>0?(z(t!==void 0,14353),n.map(e=>function(s,o){let a=s.updateTime?Mt(s.updateTime):Mt(o);return a.isEqual(L.min())&&(a=Mt(o)),new rd(a,s.transformResults||[])}(e,t))):[]}function Ad(n,t){return{documents:[sc(n,t.path)]}}function wd(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=sc(n,s);const o=function(f){if(f.length!==0)return ac(Dt.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(f){if(f.length!==0)return f.map(m=>function(w){return{field:De(w.field),direction:Vd(w.dir)}}(m))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=$s(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{dt:e,parent:s}}function Rd(n){let t=Ed(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){z(r===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=function(y){const w=oc(y);return w instanceof Dt&&Lu(w)?w.getFilters():[w]}(e.where));let a=[];e.orderBy&&(a=function(y){return y.map(w=>function(N){return new Pn(Ne(N.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(w))}(e.orderBy));let l=null;e.limit&&(l=function(y){let w;return w=typeof y=="object"?y.value:y,xr(w)?null:w}(e.limit));let h=null;e.startAt&&(h=function(y){const w=!!y.before,P=y.values||[];return new vr(P,w)}(e.startAt));let f=null;return e.endAt&&(f=function(y){const w=!y.before,P=y.values||[];return new vr(P,w)}(e.endAt)),jf(t,s,a,o,l,"F",h,f)}function Sd(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function oc(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Ne(e.unaryFilter.field);return rt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ne(e.unaryFilter.field);return rt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ne(e.unaryFilter.field);return rt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ne(e.unaryFilter.field);return rt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(n):n.fieldFilter!==void 0?function(e){return rt.create(Ne(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Dt.create(e.compositeFilter.filters.map(r=>oc(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(e.compositeFilter.op))}(n):M(30097,{filter:n})}function Vd(n){return md[n]}function Pd(n){return pd[n]}function Cd(n){return gd[n]}function De(n){return{fieldPath:n.canonicalString()}}function Ne(n){return lt.fromServerFormat(n.fieldPath)}function ac(n){return n instanceof rt?function(e){if(e.op==="=="){if(pa(e.value))return{unaryFilter:{field:De(e.field),op:"IS_NAN"}};if(ma(e.value))return{unaryFilter:{field:De(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(pa(e.value))return{unaryFilter:{field:De(e.field),op:"IS_NOT_NAN"}};if(ma(e.value))return{unaryFilter:{field:De(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:De(e.field),op:Pd(e.op),value:e.value}}}(n):n instanceof Dt?function(e){const r=e.getFilters().map(s=>ac(s));return r.length===1?r[0]:{compositeFilter:{op:Cd(e.op),filters:r}}}(n):M(54877,{filter:n})}function bd(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function uc(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function cc(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(t,e,r,s,o=L.min(),a=L.min(),l=ht.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new jt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{constructor(t){this.gt=t}}function Nd(n){const t=Rd({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ar(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(){this.Sn=new Od}addToCollectionParentIndex(t,e){return this.Sn.add(e),V.resolve()}getCollectionParents(t,e){return V.resolve(this.Sn.getEntries(e))}addFieldIndex(t,e){return V.resolve()}deleteFieldIndex(t,e){return V.resolve()}deleteAllFieldIndexes(t){return V.resolve()}createTargetIndexes(t,e){return V.resolve()}getDocumentsMatchingTarget(t,e){return V.resolve(null)}getIndexType(t,e){return V.resolve(0)}getFieldIndexes(t,e){return V.resolve([])}getNextCollectionGroupToUpdate(t){return V.resolve(null)}getMinOffset(t,e){return V.resolve(re.min())}getMinOffsetFromCollectionGroup(t,e){return V.resolve(re.min())}updateCollectionGroup(t,e,r){return V.resolve()}updateIndexEntries(t,e){return V.resolve()}}class Od{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new ot(W.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new ot(W.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ca={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},lc=41943040;class At{static withCacheSize(t){return new At(t,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */At.DEFAULT_COLLECTION_PERCENTILE=10,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,At.DEFAULT=new At(lc,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),At.DISABLED=new At(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(t){this.ir=t}next(){return this.ir+=2,this.ir}static sr(){return new ae(0)}static _r(){return new ae(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ba="LruGarbageCollector",xd=1048576;function Da([n,t],[e,r]){const s=B(n,e);return s===0?B(t,r):s}class Md{constructor(t){this.hr=t,this.buffer=new ot(Da),this.Pr=0}Tr(){return++this.Pr}Ir(t){const e=[t,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Da(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Ld{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return this.Er!==null}Rr(t){b(ba,`Garbage collection scheduled in ${t}ms`),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){ze(e)?b(ba,"Ignoring IndexedDB error during garbage collection: ",e):await $e(e)}await this.Rr(3e5)})}}class Fd{constructor(t,e){this.Ar=t,this.params=e}calculateTargetCount(t,e){return this.Ar.Vr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return V.resolve(Or.ce);const r=new Md(e);return this.Ar.forEachTarget(t,s=>r.Ir(s.sequenceNumber)).next(()=>this.Ar.dr(t,s=>r.Ir(s))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.Ar.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Ar.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(b("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve(Ca)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(b("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ca):this.mr(t,e))}getCacheSize(t){return this.Ar.getCacheSize(t)}mr(t,e){let r,s,o,a,l,h,f;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(y=>(y>this.params.maximumSequenceNumbersToCollect?(b("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${y}`),s=this.params.maximumSequenceNumbersToCollect):s=y,a=Date.now(),this.nthSequenceNumber(t,s))).next(y=>(r=y,l=Date.now(),this.removeTargets(t,r,e))).next(y=>(o=y,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(y=>(f=Date.now(),Ce()<=$.DEBUG&&b("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${y} documents in `+(f-h)+`ms
Total Duration: ${f-m}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:y})))}}function Ud(n,t){return new Fd(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{constructor(){this.changes=new we(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,_t.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?V.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jd{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&En(r.mutation,s,St.empty(),X.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,j()).next(()=>r))}getLocalViewOfDocuments(t,e,r=j()){const s=Ee();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(o=>{let a=dn();return o.forEach((l,h)=>{a=a.insert(l,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const r=Ee();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,j()))}populateOverlays(t,e,r){const s=[];return r.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((a,l)=>{e.set(a,l)})})}computeViews(t,e,r,s){let o=Gt();const a=yn(),l=function(){return yn()}();return e.forEach((h,f)=>{const m=r.get(f.key);s.has(f.key)&&(m===void 0||m.mutation instanceof he)?o=o.insert(f.key,f):m!==void 0?(a.set(f.key,m.mutation.getFieldMask()),En(m.mutation,f,m.mutation.getFieldMask(),X.now())):a.set(f.key,St.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,m)=>a.set(f,m)),e.forEach((f,m)=>l.set(f,new jd(m,a.get(f)??null))),l))}recalculateAndSaveOverlays(t,e){const r=yn();let s=new J((a,l)=>a-l),o=j();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const l of a)l.keys().forEach(h=>{const f=e.get(h);if(f===null)return;let m=r.get(h)||St.empty();m=l.applyToLocalView(f,m),r.set(h,m);const y=(s.get(l.batchId)||j()).add(h);s=s.insert(l.batchId,y)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),f=h.key,m=h.value,y=Ku();m.forEach(w=>{if(!o.has(w)){const P=Ju(e.get(w),r.get(w));P!==null&&y.set(w,P),o=o.add(w)}}),a.push(this.documentOverlayCache.saveOverlays(t,f,y))}return V.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return qf(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):ju(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):V.resolve(Ee());let l=An,h=o;return a.next(f=>V.forEach(f,(m,y)=>(l<y.largestBatchId&&(l=y.largestBatchId),o.get(m)?V.resolve():this.remoteDocumentCache.getEntry(t,m).next(w=>{h=h.insert(m,w)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,j())).next(m=>({batchId:l,changes:Gu(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new x(e)).next(r=>{let s=dn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=dn();return this.indexManager.getCollectionParents(t,o).next(l=>V.forEach(l,h=>{const f=function(y,w){return new Ge(w,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,s).next(m=>{m.forEach((y,w)=>{a=a.insert(y,w)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s))).next(a=>{o.forEach((h,f)=>{const m=f.getKey();a.get(m)===null&&(a=a.insert(m,_t.newInvalidDocument(m)))});let l=dn();return a.forEach((h,f)=>{const m=o.get(h);m!==void 0&&En(m.mutation,f,St.empty(),X.now()),Ur(e,f)&&(l=l.insert(h,f))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(t){this.serializer=t,this.Or=new Map,this.Nr=new Map}getBundleMetadata(t,e){return V.resolve(this.Or.get(e))}saveBundleMetadata(t,e){return this.Or.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Mt(s.createTime)}}(e)),V.resolve()}getNamedQuery(t,e){return V.resolve(this.Nr.get(e))}saveNamedQuery(t,e){return this.Nr.set(e.name,function(s){return{name:s.name,query:Nd(s.bundledQuery),readTime:Mt(s.readTime)}}(e)),V.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(){this.overlays=new J(x.comparator),this.Br=new Map}getOverlay(t,e){return V.resolve(this.overlays.get(e))}getOverlays(t,e){const r=Ee();return V.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,o)=>{this.wt(t,e,o)}),V.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Br.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Br.delete(r)),V.resolve()}getOverlaysForCollection(t,e,r){const s=Ee(),o=e.length+1,a=new x(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return V.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new J((f,m)=>f-m);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let m=o.get(f.largestBatchId);m===null&&(m=Ee(),o=o.insert(f.largestBatchId,m)),m.set(f.getKey(),f)}}const l=Ee(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,m)=>l.set(f,m)),!(l.size()>=s)););return V.resolve(l)}wt(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Br.get(s.largestBatchId).delete(r.key);this.Br.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new ud(e,r));let o=this.Br.get(e);o===void 0&&(o=j(),this.Br.set(e,o)),this.Br.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(t){return V.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,V.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(){this.Lr=new ot(ut.kr),this.qr=new ot(ut.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(t,e){const r=new ut(t,e);this.Lr=this.Lr.add(r),this.qr=this.qr.add(r)}Ur(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.$r(new ut(t,e))}Wr(t,e){t.forEach(r=>this.removeReference(r,e))}Qr(t){const e=new x(new W([])),r=new ut(e,t),s=new ut(e,t+1),o=[];return this.qr.forEachInRange([r,s],a=>{this.$r(a),o.push(a.key)}),o}Gr(){this.Lr.forEach(t=>this.$r(t))}$r(t){this.Lr=this.Lr.delete(t),this.qr=this.qr.delete(t)}zr(t){const e=new x(new W([])),r=new ut(e,t),s=new ut(e,t+1);let o=j();return this.qr.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new ut(t,0),r=this.Lr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class ut{constructor(t,e){this.key=t,this.jr=e}static kr(t,e){return x.comparator(t.key,e.key)||B(t.jr,e.jr)}static Kr(t,e){return B(t.jr,e.jr)||x.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Xn=1,this.Jr=new ot(ut.kr)}checkEmpty(t){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new ad(o,e,r,s);this.mutationQueue.push(a);for(const l of s)this.Jr=this.Jr.add(new ut(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return V.resolve(a)}lookupMutationBatch(t,e){return V.resolve(this.Hr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.Zr(r),o=s<0?0:s;return V.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?ri:this.Xn-1)}getAllMutationBatches(t){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new ut(e,0),s=new ut(e,Number.POSITIVE_INFINITY),o=[];return this.Jr.forEachInRange([r,s],a=>{const l=this.Hr(a.jr);o.push(l)}),V.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new ot(B);return e.forEach(s=>{const o=new ut(s,0),a=new ut(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([o,a],l=>{r=r.add(l.jr)})}),V.resolve(this.Xr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;x.isDocumentKey(o)||(o=o.child(""));const a=new ut(new x(o),0);let l=new ot(B);return this.Jr.forEachWhile(h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(l=l.add(h.jr)),!0)},a),V.resolve(this.Xr(l))}Xr(t){const e=[];return t.forEach(r=>{const s=this.Hr(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){z(this.Yr(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return V.forEach(e.mutations,s=>{const o=new ut(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Jr=r})}tr(t){}containsKey(t,e){const r=new ut(e,0),s=this.Jr.firstAfterOrEqual(r);return V.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,V.resolve()}Yr(t,e){return this.Zr(t)}Zr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Hr(t){const e=this.Zr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(t){this.ei=t,this.docs=function(){return new J(x.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ei(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return V.resolve(r?r.document.mutableCopy():_t.newInvalidDocument(e))}getEntries(t,e){let r=Gt();return e.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():_t.newInvalidDocument(s))}),V.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=Gt();const a=e.path,l=new x(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:f,value:{document:m}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||yf(_f(m),r)<=0||(s.has(m.key)||Ur(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return V.resolve(o)}getAllFromCollectionGroup(t,e,r,s){M(9500)}ti(t,e){return V.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new Wd(this)}getSize(t){return V.resolve(this.size)}}class Wd extends Bd{constructor(t){super(),this.Fr=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this.Fr.addEntry(t,s)):this.Fr.removeEntry(r)}),V.waitFor(e)}getFromCache(t,e){return this.Fr.getEntry(t,e)}getAllFromCache(t,e){return this.Fr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(t){this.persistence=t,this.ni=new we(e=>oi(e),ai),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.ri=0,this.ii=new di,this.targetCount=0,this.si=ae.sr()}forEachTarget(t,e){return this.ni.forEach((r,s)=>e(s)),V.resolve()}getLastRemoteSnapshotVersion(t){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return V.resolve(this.ri)}allocateTargetId(t){return this.highestTargetId=this.si.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.ri&&(this.ri=e),V.resolve()}cr(t){this.ni.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.si=new ae(e),this.highestTargetId=e),t.sequenceNumber>this.ri&&(this.ri=t.sequenceNumber)}addTargetData(t,e){return this.cr(e),this.targetCount+=1,V.resolve()}updateTargetData(t,e){return this.cr(e),V.resolve()}removeTargetData(t,e){return this.ni.delete(e.target),this.ii.Qr(e.targetId),this.targetCount-=1,V.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.ni.forEach((a,l)=>{l.sequenceNumber<=e&&r.get(l.targetId)===null&&(this.ni.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)}),V.waitFor(o).next(()=>s)}getTargetCount(t){return V.resolve(this.targetCount)}getTargetData(t,e){const r=this.ni.get(e)||null;return V.resolve(r)}addMatchingKeys(t,e,r){return this.ii.Ur(e,r),V.resolve()}removeMatchingKeys(t,e,r){this.ii.Wr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(a=>{o.push(s.markPotentiallyOrphaned(t,a))}),V.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.ii.Qr(e),V.resolve()}getMatchingKeysForTargetId(t,e){const r=this.ii.zr(e);return V.resolve(r)}containsKey(t,e){return V.resolve(this.ii.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(t,e){this.oi={},this.overlays={},this._i=new Or(0),this.ai=!1,this.ai=!0,this.ui=new Gd,this.referenceDelegate=t(this),this.ci=new Qd(this),this.indexManager=new kd,this.remoteDocumentCache=function(s){return new Hd(s)}(r=>this.referenceDelegate.li(r)),this.serializer=new Dd(e),this.hi=new $d(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new zd,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.oi[t.toKey()];return r||(r=new Kd(e,this.referenceDelegate),this.oi[t.toKey()]=r),r}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(t,e,r){b("MemoryPersistence","Starting transaction:",t);const s=new Xd(this._i.next());return this.referenceDelegate.Pi(),r(s).next(o=>this.referenceDelegate.Ti(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Ii(t,e){return V.or(Object.values(this.oi).map(r=>()=>r.containsKey(t,e)))}}class Xd extends Tf{constructor(t){super(),this.currentSequenceNumber=t}}class mi{constructor(t){this.persistence=t,this.Ei=new di,this.Ri=null}static Ai(t){return new mi(t)}get Vi(){if(this.Ri)return this.Ri;throw M(60996)}addReference(t,e,r){return this.Ei.addReference(r,e),this.Vi.delete(r.toString()),V.resolve()}removeReference(t,e,r){return this.Ei.removeReference(r,e),this.Vi.add(r.toString()),V.resolve()}markPotentiallyOrphaned(t,e){return this.Vi.add(e.toString()),V.resolve()}removeTarget(t,e){this.Ei.Qr(e.targetId).forEach(s=>this.Vi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.Vi.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}Pi(){this.Ri=new Set}Ti(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.Vi,r=>{const s=x.fromPath(r);return this.di(t,s).next(o=>{o||e.removeEntry(s,L.min())})}).next(()=>(this.Ri=null,e.apply(t)))}updateLimboDocument(t,e){return this.di(t,e).next(r=>{r?this.Vi.delete(e.toString()):this.Vi.add(e.toString())})}li(t){return 0}di(t,e){return V.or([()=>V.resolve(this.Ei.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ii(t,e)])}}class Pr{constructor(t,e){this.persistence=t,this.mi=new we(r=>Af(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Ud(this,e)}static Ai(t,e){return new Pr(t,e)}Pi(){}Ti(t){return V.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}Vr(t){const e=this.gr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(s=>r+s))}gr(t){let e=0;return this.dr(t,r=>{e++}).next(()=>e)}dr(t,e){return V.forEach(this.mi,(r,s)=>this.yr(t,r,s).next(o=>o?V.resolve():e(s)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ti(t,a=>this.yr(t,a,e).next(l=>{l||(r++,o.removeEntry(a,L.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.mi.set(e,t.currentSequenceNumber),V.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.mi.set(r,t.currentSequenceNumber),V.resolve()}removeReference(t,e,r){return this.mi.set(r,t.currentSequenceNumber),V.resolve()}updateLimboDocument(t,e){return this.mi.set(e,t.currentSequenceNumber),V.resolve()}li(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=lr(t.data.value)),e}yr(t,e,r){return V.or([()=>this.persistence.Ii(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.mi.get(e);return V.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Ps=r,this.Ts=s}static Is(t,e){let r=j(),s=j();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new pi(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yd{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=function(){return Fl()?8:If(Ml())>0?6:4}()}initialize(t,e){this.ds=t,this.indexManager=e,this.Es=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.fs(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.gs(t,e,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new Jd;return this.ps(t,e,a).next(l=>{if(o.result=l,this.Rs)return this.ys(t,e,a,l.size)})}).next(()=>o.result)}ys(t,e,r,s){return r.documentReadCount<this.As?(Ce()<=$.DEBUG&&b("QueryEngine","SDK will not create cache indexes for query:",be(e),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),V.resolve()):(Ce()<=$.DEBUG&&b("QueryEngine","Query:",be(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Vs*s?(Ce()<=$.DEBUG&&b("QueryEngine","The SDK decides to create cache indexes for query:",be(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,xt(e))):V.resolve())}fs(t,e){if(Ea(e))return V.resolve(null);let r=xt(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=Ar(e,null,"F"),r=xt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const a=j(...o);return this.ds.getDocuments(t,a).next(l=>this.indexManager.getMinOffset(t,r).next(h=>{const f=this.ws(e,l);return this.Ss(e,f,a,h.readTime)?this.fs(t,Ar(e,null,"F")):this.bs(t,f,e,h)}))})))}gs(t,e,r,s){return Ea(e)||s.isEqual(L.min())?V.resolve(null):this.ds.getDocuments(t,r).next(o=>{const a=this.ws(e,o);return this.Ss(e,a,r,s)?V.resolve(null):(Ce()<=$.DEBUG&&b("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),be(e)),this.bs(t,a,e,gf(s,An)).next(l=>l))})}ws(t,e){let r=new ot($u(t));return e.forEach((s,o)=>{Ur(t,o)&&(r=r.add(o))}),r}Ss(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}ps(t,e,r){return Ce()<=$.DEBUG&&b("QueryEngine","Using full collection scan to execute query:",be(e)),this.ds.getDocumentsMatchingQuery(t,e,re.min(),r)}bs(t,e,r,s){return this.ds.getDocumentsMatchingQuery(t,r,s).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gi="LocalStore",Zd=3e8;class tm{constructor(t,e,r,s){this.persistence=t,this.Ds=e,this.serializer=s,this.Cs=new J(B),this.vs=new we(o=>oi(o),ai),this.Fs=new Map,this.Ms=t.getRemoteDocumentCache(),this.ci=t.getTargetCache(),this.hi=t.getBundleCache(),this.xs(r)}xs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new qd(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Cs))}}function em(n,t,e,r){return new tm(n,t,e,r)}async function fc(n,t){const e=F(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,e.xs(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],l=[];let h=j();for(const f of s){a.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}for(const f of o){l.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next(f=>({Os:f,removedBatchIds:a,addedBatchIds:l}))})})}function nm(n,t){const e=F(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=t.batch.keys(),o=e.Ms.newChangeBuffer({trackRemovals:!0});return function(l,h,f,m){const y=f.batch,w=y.keys();let P=V.resolve();return w.forEach(N=>{P=P.next(()=>m.getEntry(h,N)).next(O=>{const k=f.docVersions.get(N);z(k!==null,48541),O.version.compareTo(k)<0&&(y.applyToRemoteDocument(O,f),O.isValidDocument()&&(O.setReadTime(f.commitVersion),m.addEntry(O)))})}),P.next(()=>l.mutationQueue.removeMutationBatch(h,y))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let h=j();for(let f=0;f<l.mutationResults.length;++f)l.mutationResults[f].transformResults.length>0&&(h=h.add(l.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,s))})}function dc(n){const t=F(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.ci.getLastRemoteSnapshotVersion(e))}function rm(n,t){const e=F(n),r=t.snapshotVersion;let s=e.Cs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.Ms.newChangeBuffer({trackRemovals:!0});s=e.Cs;const l=[];t.targetChanges.forEach((m,y)=>{const w=s.get(y);if(!w)return;l.push(e.ci.removeMatchingKeys(o,m.removedDocuments,y).next(()=>e.ci.addMatchingKeys(o,m.addedDocuments,y)));let P=w.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(y)!==null?P=P.withResumeToken(ht.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):m.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(m.resumeToken,r)),s=s.insert(y,P),function(O,k,H){return O.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=Zd?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0}(w,P,m)&&l.push(e.ci.updateTargetData(o,P))});let h=Gt(),f=j();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))}),l.push(sm(o,a,t.documentUpdates).next(m=>{h=m.Ns,f=m.Bs})),!r.isEqual(L.min())){const m=e.ci.getLastRemoteSnapshotVersion(o).next(y=>e.ci.setTargetsMetadata(o,o.currentSequenceNumber,r));l.push(m)}return V.waitFor(l).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.Cs=s,o))}function sm(n,t,e){let r=j(),s=j();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=Gt();return e.forEach((l,h)=>{const f=o.get(l);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(l)),h.isNoDocument()&&h.version.isEqual(L.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):b(gi,"Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",h.version)}),{Ns:a,Bs:s}})}function im(n,t){const e=F(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=ri),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function om(n,t){const e=F(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return e.ci.getTargetData(r,t).next(o=>o?(s=o,V.resolve(s)):e.ci.allocateTargetId(r).next(a=>(s=new jt(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.ci.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=e.Cs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Cs=e.Cs.insert(r.targetId,r),e.vs.set(t,r.targetId)),r})}async function Hs(n,t,e){const r=F(n),s=r.Cs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!ze(a))throw a;b(gi,`Failed to update sequence numbers for target ${t}: ${a}`)}r.Cs=r.Cs.remove(t),r.vs.delete(s.target)}function Na(n,t,e){const r=F(n);let s=L.min(),o=j();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,m){const y=F(h),w=y.vs.get(m);return w!==void 0?V.resolve(y.Cs.get(w)):y.ci.getTargetData(f,m)}(r,a,xt(t)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.ci.getMatchingKeysForTargetId(a,l.targetId).next(h=>{o=h})}).next(()=>r.Ds.getDocumentsMatchingQuery(a,t,e?s:L.min(),e?o:j())).next(l=>(am(r,Gf(t),l),{documents:l,Ls:o})))}function am(n,t,e){let r=n.Fs.get(t)||L.min();e.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.Fs.set(t,r)}class ka{constructor(){this.activeTargetIds=Jf()}Ws(t){this.activeTargetIds=this.activeTargetIds.add(t)}Qs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}$s(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class um{constructor(){this.Co=new ka,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Co.Ws(t),this.vo[t]||"not-current"}updateQueryState(t,e,r){this.vo[t]=e}removeLocalQueryTarget(t){this.Co.Qs(t)}isLocalQueryTarget(t){return this.Co.activeTargetIds.has(t)}clearQueryState(t){delete this.vo[t]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(t){return this.Co.activeTargetIds.has(t)}start(){return this.Co=new ka,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cm{Fo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oa="ConnectivityMonitor";class xa{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(t){this.Bo.push(t)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){b(Oa,"Network connectivity changed: AVAILABLE");for(const t of this.Bo)t(0)}No(){b(Oa,"Network connectivity changed: UNAVAILABLE");for(const t of this.Bo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ur=null;function Ws(){return ur===null?ur=function(){return 268435456+Math.round(2147483648*Math.random())}():ur++,"0x"+ur.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vs="RestConnection",lm={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class hm{get ko(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=e+"://"+t.host,this.Ko=`projects/${r}/databases/${s}`,this.Uo=this.databaseId.database===Tr?`project_id=${r}`:`project_id=${r}&database_id=${s}`}$o(t,e,r,s,o){const a=Ws(),l=this.Wo(t,e.toUriEncodedString());b(Vs,`Sending RPC '${t}' ${a}:`,l,r);const h={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(h,s,o);const{host:f}=new URL(l),m=au(f);return this.Go(t,l,h,r,m).then(y=>(b(Vs,`Received RPC '${t}' ${a}: `,y),y),y=>{throw Ae(Vs,`RPC '${t}' ${a} failed with error: `,y,"url: ",l,"request:",r),y})}zo(t,e,r,s,o,a){return this.$o(t,e,r,s,o)}Qo(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+qe}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,o)=>t[o]=s),r&&r.headers.forEach((s,o)=>t[o]=s)}Wo(t,e){const r=lm[t];let s=`${this.qo}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{constructor(t){this.jo=t.jo,this.Jo=t.Jo}Ho(t){this.Zo=t}Xo(t){this.Yo=t}e_(t){this.t_=t}onMessage(t){this.n_=t}close(){this.Jo()}send(t){this.jo(t)}r_(){this.Zo()}i_(){this.Yo()}s_(t){this.t_(t)}o_(t){this.n_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt="WebChannelConnection",hn=(n,t,e)=>{n.listen(t,r=>{try{e(r)}catch(s){setTimeout(()=>{throw s},0)}})};class Oe extends hm{constructor(t){super(t),this.__=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static a_(){if(!Oe.u_){const t=yu();hn(t,_u.STAT_EVENT,e=>{e.stat===Ls.PROXY?b(pt,"STAT_EVENT: detected buffering proxy"):e.stat===Ls.NOPROXY&&b(pt,"STAT_EVENT: detected no buffering proxy")}),Oe.u_=!0}}Go(t,e,r,s,o){const a=Ws();return new Promise((l,h)=>{const f=new pu;f.setWithCredentials(!0),f.listenOnce(gu.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case cr.NO_ERROR:const y=f.getResponseJson();b(pt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(y)),l(y);break;case cr.TIMEOUT:b(pt,`RPC '${t}' ${a} timed out`),h(new D(S.DEADLINE_EXCEEDED,"Request time out"));break;case cr.HTTP_ERROR:const w=f.getStatus();if(b(pt,`RPC '${t}' ${a} failed with status:`,w,"response text:",f.getResponseText()),w>0){let P=f.getResponseJson();Array.isArray(P)&&(P=P[0]);const N=P==null?void 0:P.error;if(N&&N.status&&N.message){const O=function(H){const G=H.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(G)>=0?G:S.UNKNOWN}(N.status);h(new D(O,N.message))}else h(new D(S.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new D(S.UNAVAILABLE,"Connection failed."));break;default:M(9055,{c_:t,streamId:a,l_:f.getLastErrorCode(),h_:f.getLastError()})}}finally{b(pt,`RPC '${t}' ${a} completed.`)}});const m=JSON.stringify(s);b(pt,`RPC '${t}' ${a} sending request:`,s),f.send(e,"POST",m,r,15)})}P_(t,e,r){const s=Ws(),o=[this.qo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Qo(l.initMessageHeaders,e,r),l.encodeInitMessageHeaders=!0;const f=o.join("");b(pt,`Creating RPC '${t}' stream ${s}: ${f}`,l);const m=a.createWebChannel(f,l);this.T_(m);let y=!1,w=!1;const P=new fm({jo:N=>{w?b(pt,`Not sending because RPC '${t}' stream ${s} is closed:`,N):(y||(b(pt,`Opening RPC '${t}' stream ${s} transport.`),m.open(),y=!0),b(pt,`RPC '${t}' stream ${s} sending:`,N),m.send(N))},Jo:()=>m.close()});return hn(m,fn.EventType.OPEN,()=>{w||(b(pt,`RPC '${t}' stream ${s} transport opened.`),P.r_())}),hn(m,fn.EventType.CLOSE,()=>{w||(w=!0,b(pt,`RPC '${t}' stream ${s} transport closed`),P.s_(),this.I_(m))}),hn(m,fn.EventType.ERROR,N=>{w||(w=!0,Ae(pt,`RPC '${t}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),P.s_(new D(S.UNAVAILABLE,"The operation could not be completed")))}),hn(m,fn.EventType.MESSAGE,N=>{var O;if(!w){const k=N.data[0];z(!!k,16349);const H=k,G=(H==null?void 0:H.error)||((O=H[0])==null?void 0:O.error);if(G){b(pt,`RPC '${t}' stream ${s} received error:`,G);const Y=G.status;let Vt=function(T){const p=nt[T];if(p!==void 0)return Zu(p)}(Y),ft=G.message;Y==="NOT_FOUND"&&ft.includes("database")&&ft.includes("does not exist")&&ft.includes(this.databaseId.database)&&Ae(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Vt===void 0&&(Vt=S.INTERNAL,ft="Unknown error status: "+Y+" with message "+G.message),w=!0,P.s_(new D(Vt,ft)),m.close()}else b(pt,`RPC '${t}' stream ${s} received:`,k),P.o_(k)}}),Oe.a_(),setTimeout(()=>{P.i_()},0),P}terminate(){this.__.forEach(t=>t.close()),this.__=[]}T_(t){this.__.push(t)}I_(t){this.__=this.__.filter(e=>e===t)}Qo(t,e,r){super.Qo(t,e,r),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Eu()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dm(n){return new Oe(n)}function Ps(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zr(n){return new _d(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Oe.u_=!1;class mc{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Di=t,this.timerId=e,this.E_=r,this.R_=s,this.A_=o,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(t){this.cancel();const e=Math.floor(this.V_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,e-r);s>0&&b("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),t())),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma="PersistentStream";class pc{constructor(t,e,r,s,o,a,l,h){this.Di=t,this.w_=r,this.S_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new mc(t,e)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(t){this.q_(),this.stream.send(t)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(t,e){this.q_(),this.K_(),this.F_.cancel(),this.b_++,t!==4?this.F_.reset():e&&e.code===S.RESOURCE_EXHAUSTED?(zt(e.toString()),zt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):e&&e.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.e_(e)}U_(){}auth(){this.state=1;const t=this.W_(this.b_),e=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.b_===e&&this.Q_(r,s)},r=>{t(()=>{const s=new D(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)})})}Q_(t,e){const r=this.W_(this.b_);this.stream=this.z_(t,e),this.stream.Ho(()=>{r(()=>this.listener.Ho())}),this.stream.Xo(()=>{r(()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.Xo()))}),this.stream.e_(s=>{r(()=>this.G_(s))}),this.stream.onMessage(s=>{r(()=>++this.v_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(t){return b(Ma,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Di.enqueueAndForget(()=>this.b_===t?e():(b(Ma,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class mm extends pc{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}z_(t,e){return this.connection.P_("Listen",t,e)}j_(t){return this.onNext(t)}onNext(t){this.F_.reset();const e=Td(this.serializer,t),r=function(o){if(!("targetChange"in o))return L.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?L.min():a.readTime?Mt(a.readTime):L.min()}(t);return this.listener.J_(e,r)}H_(t){const e={};e.database=Ks(this.serializer),e.addTarget=function(o,a){let l;const h=a.target;if(l=js(h)?{documents:Ad(o,h)}:{query:wd(o,h).dt},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=nc(o,a.resumeToken);const f=$s(o,a.expectedCount);f!==null&&(l.expectedCount=f)}else if(a.snapshotVersion.compareTo(L.min())>0){l.readTime=Vr(o,a.snapshotVersion.toTimestamp());const f=$s(o,a.expectedCount);f!==null&&(l.expectedCount=f)}return l}(this.serializer,t);const r=Sd(this.serializer,t);r&&(e.labels=r),this.k_(e)}Z_(t){const e={};e.database=Ks(this.serializer),e.removeTarget=t,this.k_(e)}}class pm extends pc{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get X_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.X_&&this.Y_([])}z_(t,e){return this.connection.P_("Write",t,e)}j_(t){return z(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,z(!t.writeResults||t.writeResults.length===0,55816),this.listener.ea()}onNext(t){z(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.F_.reset();const e=vd(t.writeResults,t.commitTime),r=Mt(t.commitTime);return this.listener.ta(r,e)}na(){const t={};t.database=Ks(this.serializer),this.k_(t)}Y_(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>Id(this.serializer,r))};this.k_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{}class _m extends gm{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new D(S.FAILED_PRECONDITION,"The client has already been terminated.")}$o(t,e,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.$o(t,zs(e,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(S.UNKNOWN,o.toString())})}zo(t,e,r,s,o){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.zo(t,zs(e,r),s,a,l,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new D(S.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}function ym(n,t,e,r){return new _m(n,t,e,r)}class Em{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(t){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ua("Offline")))}set(t){this.ha(),this.sa=0,t==="Online"&&(this._a=!1),this.ua(t)}ua(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ca(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(zt(e),this._a=!1):b("OnlineStateTracker",e)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut="RemoteStore";class Tm{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new ae(1e3),this.Aa=new ae(1001),this.Va=new Set,this.da=[],this.ma=o,this.ma.Fo(a=>{r.enqueueAndForget(async()=>{Re(this)&&(b(Ut,"Restarting streams for network reachability change."),await async function(h){const f=F(h);f.Va.add(4),await Ln(f),f.fa.set("Unknown"),f.Va.delete(4),await Gr(f)}(this))})}),this.fa=new Em(r,s)}}async function Gr(n){if(Re(n))for(const t of n.da)await t(!0)}async function Ln(n){for(const t of n.da)await t(!1)}function Qs(n,t){return n.Ia.get(t)||void 0}function gc(n,t){const e=F(n),r=Qs(e,t.targetId);if(r!==void 0&&e.Ta.has(r))return;const s=function(l,h){const f=Qs(l,h);f!==void 0&&l.Ea.delete(f);const m=function(w,P){return P%2!=0?w.Aa.next():w.Ra.next()}(l,h);return l.Ia.set(h,m),l.Ea.set(m,h),m}(e,t.targetId);b(Ut,"remoteStoreListen mapping SDK target ID to remote",t.targetId,s);const o=new jt(t.target,s,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);e.Ta.set(s,o),Ti(e)?Ei(e):Ke(e).x_()&&yi(e,o)}function _i(n,t){const e=F(n),r=Ke(e),s=Qs(e,t);b(Ut,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,s),e.Ta.delete(s),e.Ia.delete(t),e.Ea.delete(s),r.x_()&&_c(e,s),e.Ta.size===0&&(r.x_()?r.B_():Re(e)&&e.fa.set("Unknown"))}function yi(n,t){if(n.ga.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=n.Ea.get(t.targetId);if(e===void 0)return void b(Ut,"SDK target ID not found for remote ID: "+t.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(e).size;t=t.withExpectedCount(r)}Ke(n).H_(t)}function _c(n,t){n.ga.$e(t),Ke(n).Z_(t)}function Ei(n){n.ga=new dd({getRemoteKeysForTarget:t=>{const e=n.Ea.get(t);return e!==void 0?n.remoteSyncer.getRemoteKeysForTarget(e):j()},Rt:t=>n.Ta.get(t)||null,lt:()=>n.datastore.serializer.databaseId}),Ke(n).start(),n.fa.aa()}function Ti(n){return Re(n)&&!Ke(n).M_()&&n.Ta.size>0}function Re(n){return F(n).Va.size===0}function yc(n){n.ga=void 0}async function Im(n){n.fa.set("Online")}async function vm(n){n.Ta.forEach((t,e)=>{yi(n,t)})}async function Am(n,t){yc(n),Ti(n)?(n.fa.la(t),Ei(n)):n.fa.set("Unknown")}async function wm(n,t,e){if(n.fa.set("Online"),t instanceof ec&&t.state===2&&t.cause)try{await async function(s,o){const a=o.cause;for(const l of o.targetIds){if(s.Ta.has(l)){const h=s.Ea.get(l);h!==void 0&&(await s.remoteSyncer.rejectListen(h,a),s.Ia.delete(h),s.Ea.delete(l)),s.Ta.delete(l)}s.ga.removeTarget(l)}}(n,t)}catch(r){b(Ut,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Cr(n,r)}else if(t instanceof dr?n.ga.Xe(t):t instanceof tc?n.ga.it(t):n.ga.tt(t),!e.isEqual(L.min()))try{const r=await dc(n.localStore);e.compareTo(r)>=0&&await function(o,a){const l=o.ga.Pt(a);l.targetChanges.forEach((f,m)=>{if(f.resumeToken.approximateByteSize()>0){const y=o.Ta.get(m);y&&o.Ta.set(m,y.withResumeToken(f.resumeToken,a))}}),l.targetMismatches.forEach((f,m)=>{const y=o.Ta.get(f);if(!y)return;o.Ta.set(f,y.withResumeToken(ht.EMPTY_BYTE_STRING,y.snapshotVersion)),_c(o,f);const w=new jt(y.target,f,m,y.sequenceNumber);yi(o,w)});const h=function(m,y){const w=new Map;y.targetChanges.forEach((N,O)=>{const k=m.Ea.get(O);k!==void 0&&w.set(k,N)});let P=new J(B);return y.targetMismatches.forEach((N,O)=>{const k=m.Ea.get(N);k!==void 0&&(P=P.insert(k,O))}),new xn(y.snapshotVersion,w,P,y.documentUpdates,y.resolvedLimboDocuments)}(o,l);return o.remoteSyncer.applyRemoteEvent(h)}(n,e)}catch(r){b(Ut,"Failed to raise snapshot:",r),await Cr(n,r)}}async function Cr(n,t,e){if(!ze(t))throw t;n.Va.add(1),await Ln(n),n.fa.set("Offline"),e||(e=()=>dc(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{b(Ut,"Retrying IndexedDB access"),await e(),n.Va.delete(1),await Gr(n)})}function Ec(n,t){return t().catch(e=>Cr(n,e,t))}async function Kr(n){const t=F(n),e=ue(t);let r=t.Pa.length>0?t.Pa[t.Pa.length-1].batchId:ri;for(;Rm(t);)try{const s=await im(t.localStore,r);if(s===null){t.Pa.length===0&&e.B_();break}r=s.batchId,Sm(t,s)}catch(s){await Cr(t,s)}Tc(t)&&Ic(t)}function Rm(n){return Re(n)&&n.Pa.length<10}function Sm(n,t){n.Pa.push(t);const e=ue(n);e.x_()&&e.X_&&e.Y_(t.mutations)}function Tc(n){return Re(n)&&!ue(n).M_()&&n.Pa.length>0}function Ic(n){ue(n).start()}async function Vm(n){ue(n).na()}async function Pm(n){const t=ue(n);for(const e of n.Pa)t.Y_(e.mutations)}async function Cm(n,t,e){const r=n.Pa.shift(),s=li.from(r,t,e);await Ec(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Kr(n)}async function bm(n,t){t&&ue(n).X_&&await async function(r,s){if(function(a){return ld(a)&&a!==S.ABORTED}(s.code)){const o=r.Pa.shift();ue(r).N_(),await Ec(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await Kr(r)}}(n,t),Tc(n)&&Ic(n)}async function La(n,t){const e=F(n);e.asyncQueue.verifyOperationInProgress(),b(Ut,"RemoteStore received new credentials");const r=Re(e);e.Va.add(3),await Ln(e),r&&e.fa.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Va.delete(3),await Gr(e)}async function Dm(n,t){const e=F(n);t?(e.Va.delete(2),await Gr(e)):t||(e.Va.add(2),await Ln(e),e.fa.set("Unknown"))}function Ke(n){return n.pa||(n.pa=function(e,r,s){const o=F(e);return o.ia(),new mm(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Ho:Im.bind(null,n),Xo:vm.bind(null,n),e_:Am.bind(null,n),J_:wm.bind(null,n)}),n.da.push(async t=>{t?(n.pa.N_(),Ti(n)?Ei(n):n.fa.set("Unknown")):(await n.pa.stop(),yc(n))})),n.pa}function ue(n){return n.ya||(n.ya=function(e,r,s){const o=F(e);return o.ia(),new pm(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Ho:()=>Promise.resolve(),Xo:Vm.bind(null,n),e_:bm.bind(null,n),ea:Pm.bind(null,n),ta:Cm.bind(null,n)}),n.da.push(async t=>{t?(n.ya.N_(),await Kr(n)):(await n.ya.stop(),n.Pa.length>0&&(b(Ut,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ya}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new qt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,l=new Ii(t,e,a,s,o);return l.start(r),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(S.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function vi(n,t){if(zt("AsyncQueue",`${t}: ${n}`),ze(n))return new D(S.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{static emptySet(t){return new xe(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||x.comparator(e.key,r.key):(e,r)=>x.comparator(e.key,r.key),this.keyedMap=dn(),this.sortedSet=new J(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof xe)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new xe;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa{constructor(){this.wa=new J(x.comparator)}track(t){const e=t.doc.key,r=this.wa.get(e);r?t.type!==0&&r.type===3?this.wa=this.wa.insert(e,t):t.type===3&&r.type!==1?this.wa=this.wa.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.wa=this.wa.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.wa=this.wa.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.wa=this.wa.remove(e):t.type===1&&r.type===2?this.wa=this.wa.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.wa=this.wa.insert(e,{type:2,doc:t.doc}):M(63341,{At:t,Sa:r}):this.wa=this.wa.insert(e,t)}ba(){const t=[];return this.wa.inorderTraversal((e,r)=>{t.push(r)}),t}}class Ue{constructor(t,e,r,s,o,a,l,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach(l=>{a.push({type:0,doc:l})}),new Ue(t,e,xe.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Fr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nm{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some(t=>t.Fa())}}class km{constructor(){this.queries=Ua(),this.onlineState="Unknown",this.Ma=new Set}terminate(){(function(e,r){const s=F(e),o=s.queries;s.queries=Ua(),o.forEach((a,l)=>{for(const h of l.Ca)h.onError(r)})})(this,new D(S.ABORTED,"Firestore shutting down"))}}function Ua(){return new we(n=>qu(n),Fr)}async function Ai(n,t){const e=F(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.va()&&t.Fa()&&(r=2):(o=new Nm,r=t.Fa()?0:1);try{switch(r){case 0:o.Da=await e.onListen(s,!0);break;case 1:o.Da=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const l=vi(a,`Initialization of query '${be(t.query)}' failed`);return void t.onError(l)}e.queries.set(s,o),o.Ca.push(t),t.xa(e.onlineState),o.Da&&t.Oa(o.Da)&&Ri(e)}async function wi(n,t){const e=F(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.Ca.indexOf(t);a>=0&&(o.Ca.splice(a,1),o.Ca.length===0?s=t.Fa()?0:1:!o.va()&&t.Fa()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Om(n,t){const e=F(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const l of a.Ca)l.Oa(s)&&(r=!0);a.Da=s}}r&&Ri(e)}function xm(n,t,e){const r=F(n),s=r.queries.get(t);if(s)for(const o of s.Ca)o.onError(e);r.queries.delete(t)}function Ri(n){n.Ma.forEach(t=>{t.next()})}var Xs,Ba;(Ba=Xs||(Xs={})).Na="default",Ba.Cache="cache";class Si{constructor(t,e,r){this.query=t,this.Ba=e,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=r||{}}Oa(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Ue(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.La?this.qa(t)&&(this.Ba.next(t),e=!0):this.Ka(t,this.onlineState)&&(this.Ua(t),e=!0),this.ka=t,e}onError(t){this.Ba.error(t)}xa(t){this.onlineState=t;let e=!1;return this.ka&&!this.La&&this.Ka(this.ka,t)&&(this.Ua(this.ka),e=!0),e}Ka(t,e){if(!t.fromCache||!this.Fa())return!0;const r=e!=="Offline";return(!this.options.$a||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}qa(t){if(t.docChanges.length>0)return!0;const e=this.ka&&this.ka.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}Ua(t){t=Ue.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.La=!0,this.Ba.next(t)}Fa(){return this.options.source!==Xs.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(t){this.key=t}}class Ac{constructor(t){this.key=t}}class Mm{constructor(t,e){this.query=t,this.eu=e,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=j(),this.mutatedKeys=j(),this.ru=$u(t),this.iu=new xe(this.ru)}get su(){return this.eu}ou(t,e){const r=e?e._u:new Fa,s=e?e.iu:this.iu;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,l=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((m,y)=>{const w=s.get(m),P=Ur(this.query,y)?y:null,N=!!w&&this.mutatedKeys.has(w.key),O=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let k=!1;w&&P?w.data.isEqual(P.data)?N!==O&&(r.track({type:3,doc:P}),k=!0):this.au(w,P)||(r.track({type:2,doc:P}),k=!0,(h&&this.ru(P,h)>0||f&&this.ru(P,f)<0)&&(l=!0)):!w&&P?(r.track({type:0,doc:P}),k=!0):w&&!P&&(r.track({type:1,doc:w}),k=!0,(h||f)&&(l=!0)),k&&(P?(a=a.add(P),o=O?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{iu:a,_u:r,Ss:l,mutatedKeys:o}}au(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.iu;this.iu=t.iu,this.mutatedKeys=t.mutatedKeys;const a=t._u.ba();a.sort((m,y)=>function(P,N){const O=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{At:k})}};return O(P)-O(N)}(m.type,y.type)||this.ru(m.doc,y.doc)),this.uu(r),s=s??!1;const l=e&&!s?this.cu():[],h=this.nu.size===0&&this.current&&!s?1:0,f=h!==this.tu;return this.tu=h,a.length!==0||f?{snapshot:new Ue(this.query,t.iu,o,a,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),lu:l}:{lu:l}}xa(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({iu:this.iu,_u:new Fa,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(t){return!this.eu.has(t)&&!!this.iu.has(t)&&!this.iu.get(t).hasLocalMutations}uu(t){t&&(t.addedDocuments.forEach(e=>this.eu=this.eu.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.eu=this.eu.delete(e)),this.current=t.current)}cu(){if(!this.current)return[];const t=this.nu;this.nu=j(),this.iu.forEach(r=>{this.hu(r.key)&&(this.nu=this.nu.add(r.key))});const e=[];return t.forEach(r=>{this.nu.has(r)||e.push(new Ac(r))}),this.nu.forEach(r=>{t.has(r)||e.push(new vc(r))}),e}Pu(t){this.eu=t.Ls,this.nu=j();const e=this.ou(t.documents);return this.applyChanges(e,!0)}Tu(){return Ue.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,this.tu===0,this.hasCachedResults)}}const Vi="SyncEngine";class Lm{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Fm{constructor(t){this.key=t,this.Iu=!1}}class Um{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Eu={},this.Ru=new we(l=>qu(l),Fr),this.Au=new Map,this.Vu=new Set,this.du=new J(x.comparator),this.mu=new Map,this.fu=new di,this.gu={},this.pu=new Map,this.yu=ae._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return this.wu===!0}}async function Bm(n,t,e=!0){const r=Cc(n);let s;const o=r.Ru.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.Tu()):s=await wc(r,t,e,!0),s}async function jm(n,t){const e=Cc(n);await wc(e,t,!0,!1)}async function wc(n,t,e,r){const s=await om(n.localStore,xt(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let l;return r&&(l=await qm(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&gc(n.remoteStore,s),l}async function qm(n,t,e,r,s){n.Su=(y,w,P)=>async function(O,k,H,G){let Y=k.view.ou(H);Y.Ss&&(Y=await Na(O.localStore,k.query,!1).then(({documents:T})=>k.view.ou(T,Y)));const Vt=G&&G.targetChanges.get(k.targetId),ft=G&&G.targetMismatches.get(k.targetId)!=null,dt=k.view.applyChanges(Y,O.isPrimaryClient,Vt,ft);return qa(O,k.targetId,dt.lu),dt.snapshot}(n,y,w,P);const o=await Na(n.localStore,t,!0),a=new Mm(t,o.Ls),l=a.ou(o.documents),h=Mn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),f=a.applyChanges(l,n.isPrimaryClient,h);qa(n,e,f.lu);const m=new Lm(t,e,a);return n.Ru.set(t,m),n.Au.has(e)?n.Au.get(e).push(t):n.Au.set(e,[t]),f.snapshot}async function $m(n,t,e){const r=F(n),s=r.Ru.get(t),o=r.Au.get(s.targetId);if(o.length>1)return r.Au.set(s.targetId,o.filter(a=>!Fr(a,t))),void r.Ru.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Hs(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),e&&_i(r.remoteStore,s.targetId),Js(r,s.targetId)}).catch($e)):(Js(r,s.targetId),await Hs(r.localStore,s.targetId,!0))}async function zm(n,t){const e=F(n),r=e.Ru.get(t),s=e.Au.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),_i(e.remoteStore,r.targetId))}async function Gm(n,t,e){const r=Ym(n);try{const s=await function(a,l){const h=F(a),f=X.now(),m=l.reduce((P,N)=>P.add(N.key),j());let y,w;return h.persistence.runTransaction("Locally write mutations","readwrite",P=>{let N=Gt(),O=j();return h.Ms.getEntries(P,m).next(k=>{N=k,N.forEach((H,G)=>{G.isValidDocument()||(O=O.add(H))})}).next(()=>h.localDocuments.getOverlayedDocuments(P,N)).next(k=>{y=k;const H=[];for(const G of l){const Y=id(G,y.get(G.key).overlayedDocument);Y!=null&&H.push(new he(G.key,Y,Ou(Y.value.mapValue),It.exists(!0)))}return h.mutationQueue.addMutationBatch(P,f,H,l)}).next(k=>{w=k;const H=k.applyToLocalDocumentSet(y,O);return h.documentOverlayCache.saveOverlays(P,k.batchId,H)})}).then(()=>({batchId:w.batchId,changes:Gu(y)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,h){let f=a.gu[a.currentUser.toKey()];f||(f=new J(B)),f=f.insert(l,h),a.gu[a.currentUser.toKey()]=f}(r,s.batchId,e),await Fn(r,s.changes),await Kr(r.remoteStore)}catch(s){const o=vi(s,"Failed to persist write");e.reject(o)}}async function Rc(n,t){const e=F(n);try{const r=await rm(e.localStore,t);t.targetChanges.forEach((s,o)=>{const a=e.mu.get(o);a&&(z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Iu=!0:s.modifiedDocuments.size>0?z(a.Iu,14607):s.removedDocuments.size>0&&(z(a.Iu,42227),a.Iu=!1))}),await Fn(e,r,t)}catch(r){await $e(r)}}function ja(n,t,e){const r=F(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Ru.forEach((o,a)=>{const l=a.view.xa(t);l.snapshot&&s.push(l.snapshot)}),function(a,l){const h=F(a);h.onlineState=l;let f=!1;h.queries.forEach((m,y)=>{for(const w of y.Ca)w.xa(l)&&(f=!0)}),f&&Ri(h)}(r.eventManager,t),s.length&&r.Eu.J_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Km(n,t,e){const r=F(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.mu.get(t),o=s&&s.key;if(o){let a=new J(x.comparator);a=a.insert(o,_t.newNoDocument(o,L.min()));const l=j().add(o),h=new xn(L.min(),new Map,new J(B),a,l);await Rc(r,h),r.du=r.du.remove(o),r.mu.delete(t),Pi(r)}else await Hs(r.localStore,t,!1).then(()=>Js(r,t,e)).catch($e)}async function Hm(n,t){const e=F(n),r=t.batch.batchId;try{const s=await nm(e.localStore,t);Vc(e,r,null),Sc(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await Fn(e,s)}catch(s){await $e(s)}}async function Wm(n,t,e){const r=F(n);try{const s=await function(a,l){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let m;return h.mutationQueue.lookupMutationBatch(f,l).next(y=>(z(y!==null,37113),m=y.keys(),h.mutationQueue.removeMutationBatch(f,y))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,m,l)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,m)).next(()=>h.localDocuments.getDocuments(f,m))})}(r.localStore,t);Vc(r,t,e),Sc(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await Fn(r,s)}catch(s){await $e(s)}}function Sc(n,t){(n.pu.get(t)||[]).forEach(e=>{e.resolve()}),n.pu.delete(t)}function Vc(n,t,e){const r=F(n);let s=r.gu[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.gu[r.currentUser.toKey()]=s}}function Js(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Au.get(t))n.Ru.delete(r),e&&n.Eu.bu(r,e);n.Au.delete(t),n.isPrimaryClient&&n.fu.Qr(t).forEach(r=>{n.fu.containsKey(r)||Pc(n,r)})}function Pc(n,t){n.Vu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(_i(n.remoteStore,e),n.du=n.du.remove(t),n.mu.delete(e),Pi(n))}function qa(n,t,e){for(const r of e)r instanceof vc?(n.fu.addReference(r.key,t),Qm(n,r)):r instanceof Ac?(b(Vi,"Document no longer in limbo: "+r.key),n.fu.removeReference(r.key,t),n.fu.containsKey(r.key)||Pc(n,r.key)):M(19791,{Du:r})}function Qm(n,t){const e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Vu.has(r)||(b(Vi,"New document in limbo: "+e),n.Vu.add(r),Pi(n))}function Pi(n){for(;n.Vu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Vu.values().next().value;n.Vu.delete(t);const e=new x(W.fromString(t)),r=n.yu.next();n.mu.set(r,new Fm(e)),n.du=n.du.insert(e,r),gc(n.remoteStore,new jt(xt(Lr(e.path)),r,"TargetPurposeLimboResolution",Or.ce))}}async function Fn(n,t,e){const r=F(n),s=[],o=[],a=[];r.Ru.isEmpty()||(r.Ru.forEach((l,h)=>{a.push(r.Su(h,t,e).then(f=>{var m;if((f||e)&&r.isPrimaryClient){const y=f?!f.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))==null?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,y?"current":"not-current")}if(f){s.push(f);const y=pi.Is(h.targetId,f);o.push(y)}}))}),await Promise.all(a),r.Eu.J_(s),await async function(h,f){const m=F(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>V.forEach(f,w=>V.forEach(w.Ps,P=>m.persistence.referenceDelegate.addReference(y,w.targetId,P)).next(()=>V.forEach(w.Ts,P=>m.persistence.referenceDelegate.removeReference(y,w.targetId,P)))))}catch(y){if(!ze(y))throw y;b(gi,"Failed to update sequence numbers: "+y)}for(const y of f){const w=y.targetId;if(!y.fromCache){const P=m.Cs.get(w),N=P.snapshotVersion,O=P.withLastLimboFreeSnapshotVersion(N);m.Cs=m.Cs.insert(w,O)}}}(r.localStore,o))}async function Xm(n,t){const e=F(n);if(!e.currentUser.isEqual(t)){b(Vi,"User change. New user:",t.toKey());const r=await fc(e.localStore,t);e.currentUser=t,function(o,a){o.pu.forEach(l=>{l.forEach(h=>{h.reject(new D(S.CANCELLED,a))})}),o.pu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Fn(e,r.Os)}}function Jm(n,t){const e=F(n),r=e.mu.get(t);if(r&&r.Iu)return j().add(r.key);{let s=j();const o=e.Au.get(t);if(!o)return s;for(const a of o){const l=e.Ru.get(a);s=s.unionWith(l.view.su)}return s}}function Cc(n){const t=F(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Rc.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Jm.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Km.bind(null,t),t.Eu.J_=Om.bind(null,t.eventManager),t.Eu.bu=xm.bind(null,t.eventManager),t}function Ym(n){const t=F(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Hm.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Wm.bind(null,t),t}class br{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=zr(t.databaseInfo.databaseId),this.sharedClientState=this.Fu(t),this.persistence=this.Mu(t),await this.persistence.start(),this.localStore=this.xu(t),this.gcScheduler=this.Ou(t,this.localStore),this.indexBackfillerScheduler=this.Nu(t,this.localStore)}Ou(t,e){return null}Nu(t,e){return null}xu(t){return em(this.persistence,new Yd,t.initialUser,this.serializer)}Mu(t){return new hc(mi.Ai,this.serializer)}Fu(t){return new um}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}br.provider={build:()=>new br};class Zm extends br{constructor(t){super(),this.cacheSizeBytes=t}Ou(t,e){z(this.persistence.referenceDelegate instanceof Pr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Ld(r,t.asyncQueue,e)}Mu(t){const e=this.cacheSizeBytes!==void 0?At.withCacheSize(this.cacheSizeBytes):At.DEFAULT;return new hc(r=>Pr.Ai(r,e),this.serializer)}}class Ys{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>ja(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Xm.bind(null,this.syncEngine),await Dm(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new km}()}createDatastore(t){const e=zr(t.databaseInfo.databaseId),r=dm(t.databaseInfo);return ym(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,o,a,l){return new Tm(r,s,o,a,l)}(this.localStore,this.datastore,t.asyncQueue,e=>ja(this.syncEngine,e,0),function(){return xa.v()?new xa:new cm}())}createSyncEngine(t,e){return function(s,o,a,l,h,f,m){const y=new Um(s,o,a,l,h,f);return m&&(y.wu=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=F(s);b(Ut,"RemoteStore shutting down."),o.Va.add(5),await Ln(o),o.ma.shutdown(),o.fa.set("Unknown")}(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}Ys.provider={build:()=>new Ys};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Lu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Lu(this.observer.error,t):zt("Uncaught Error in snapshot listener:",t.toString()))}ku(){this.muted=!0}Lu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce="FirestoreClient";class tp{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this._databaseInfo=s,this.user=gt.UNAUTHENTICATED,this.clientId=ni.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{b(ce,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(b(ce,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new qt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=vi(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function Cs(n,t){n.asyncQueue.verifyOperationInProgress(),b(ce,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await fc(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function $a(n,t){n.asyncQueue.verifyOperationInProgress();const e=await ep(n);b(ce,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>La(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>La(t.remoteStore,s)),n._onlineComponents=t}async function ep(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){b(ce,"Using user provided OfflineComponentProvider");try{await Cs(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;Ae("Error using user provided cache. Falling back to memory cache: "+e),await Cs(n,new br)}}else b(ce,"Using default OfflineComponentProvider"),await Cs(n,new Zm(void 0));return n._offlineComponents}async function bc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(b(ce,"Using user provided OnlineComponentProvider"),await $a(n,n._uninitializedComponentsProvider._online)):(b(ce,"Using default OnlineComponentProvider"),await $a(n,new Ys))),n._onlineComponents}function np(n){return bc(n).then(t=>t.syncEngine)}async function Dr(n){const t=await bc(n),e=t.eventManager;return e.onListen=Bm.bind(null,t.syncEngine),e.onUnlisten=$m.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=jm.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=zm.bind(null,t.syncEngine),e}function rp(n,t,e,r){const s=new Ci(r),o=new Si(t,s,e);return n.asyncQueue.enqueueAndForget(async()=>Ai(await Dr(n),o)),()=>{s.ku(),n.asyncQueue.enqueueAndForget(async()=>wi(await Dr(n),o))}}function sp(n,t,e={}){const r=new qt;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,l,h,f){const m=new Ci({next:w=>{m.ku(),a.enqueueAndForget(()=>wi(o,y));const P=w.docs.has(l);!P&&w.fromCache?f.reject(new D(S.UNAVAILABLE,"Failed to get document because the client is offline.")):P&&w.fromCache&&h&&h.source==="server"?f.reject(new D(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):f.resolve(w)},error:w=>f.reject(w)}),y=new Si(Lr(l.path),m,{includeMetadataChanges:!0,$a:!0});return Ai(o,y)}(await Dr(n),n.asyncQueue,t,e,r)),r.promise}function ip(n,t,e={}){const r=new qt;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,l,h,f){const m=new Ci({next:w=>{m.ku(),a.enqueueAndForget(()=>wi(o,y)),w.fromCache&&h.source==="server"?f.reject(new D(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(w)},error:w=>f.reject(w)}),y=new Si(l,m,{includeMetadataChanges:!0,$a:!0});return Ai(o,y)}(await Dr(n),n.asyncQueue,t,e,r)),r.promise}function op(n,t){const e=new qt;return n.asyncQueue.enqueueAndForget(async()=>Gm(await np(n),t,e)),e.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dc(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ap="ComponentProvider",za=new Map;function up(n,t,e,r,s){return new Sf(n,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Dc(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nc="firestore.googleapis.com",Ga=!0;class Ka{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new D(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Nc,this.ssl=Ga}else this.host=t.host,this.ssl=t.ssl??Ga;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=lc;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<xd)throw new D(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}pf("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Dc(t.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Hr{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ka({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new D(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ka(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new sf;switch(r.type){case"firstParty":return new cf(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=za.get(e);r&&(b(ap,"Removing Datastore"),za.delete(e),r.terminate())}(this),Promise.resolve()}}function cp(n,t,e,r={}){var f;n=Tt(n,Hr);const s=au(t),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},l=`${t}:${e}`;s&&zl(`https://${l}`),o.host!==Nc&&o.host!==l&&Ae("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:l,ssl:s,emulatorOptions:r};if(!_r(h,a)&&(n._setSettings(h),r.mockUserToken)){let m,y;if(typeof r.mockUserToken=="string")m=r.mockUserToken,y=gt.MOCK_USER;else{m=xl(r.mockUserToken,(f=n._app)==null?void 0:f.options.projectId);const w=r.mockUserToken.sub||r.mockUserToken.user_id;if(!w)throw new D(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");y=new gt(w)}n._authCredentials=new of(new Iu(m,y))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Kt(this.firestore,t,this._query)}}class tt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ne(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new tt(this.firestore,t,this._key)}toJSON(){return{type:tt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(kn(e,tt._jsonSchema))return new tt(t,r||null,new x(W.fromString(e.referencePath)))}}tt._jsonSchemaVersion="firestore/documentReference/1.0",tt._jsonSchema={type:st("string",tt._jsonSchemaVersion),referencePath:st("string")};class ne extends Kt{constructor(t,e,r){super(t,e,Lr(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new tt(this.firestore,null,new x(t))}withConverter(t){return new ne(this.firestore,t,this._path)}}function Cp(n,t,...e){if(n=Ct(n),vu("collection","path",t),n instanceof Hr){const r=W.fromString(t,...e);return ia(r),new ne(n,null,r)}{if(!(n instanceof tt||n instanceof ne))throw new D(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(W.fromString(t,...e));return ia(r),new ne(n.firestore,null,r)}}function lp(n,t,...e){if(n=Ct(n),arguments.length===1&&(t=ni.newId()),vu("doc","path",t),n instanceof Hr){const r=W.fromString(t,...e);return sa(r),new tt(n,null,new x(r))}{if(!(n instanceof tt||n instanceof ne))throw new D(S.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(W.fromString(t,...e));return sa(r),new tt(n.firestore,n instanceof ne?n.converter:null,new x(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ha="AsyncQueue";class Wa{constructor(t=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new mc(this,"async_queue_retry"),this.cc=()=>{const r=Ps();r&&b(Ha,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this.lc=t;const e=Ps();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.hc(),this.Pc(t)}enterRestrictedMode(t){if(!this.rc){this.rc=!0,this.ac=t||!1;const e=Ps();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.cc)}}enqueue(t){if(this.hc(),this.rc)return new Promise(()=>{});const e=new qt;return this.Pc(()=>this.rc&&this.ac?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.nc.push(t),this.Tc()))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(t){if(!ze(t))throw t;b(Ha,"Operation failed with retryable error: "+t)}this.nc.length>0&&this.F_.g_(()=>this.Tc())}}Pc(t){const e=this.lc.then(()=>(this._c=!0,t().catch(r=>{throw this.oc=r,this._c=!1,zt("INTERNAL UNHANDLED ERROR: ",Qa(r)),r}).then(r=>(this._c=!1,r))));return this.lc=e,e}enqueueAfterDelay(t,e,r){this.hc(),this.uc.indexOf(t)>-1&&(e=0);const s=Ii.createAndSchedule(this,t,e,r,o=>this.Ic(o));return this.sc.push(s),s}hc(){this.oc&&M(47125,{Ec:Qa(this.oc)})}verifyOperationInProgress(){}async Rc(){let t;do t=this.lc,await t;while(t!==this.lc)}Ac(t){for(const e of this.sc)if(e.timerId===t)return!0;return!1}Vc(t){return this.Rc().then(()=>{this.sc.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.sc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Rc()})}dc(t){this.uc.push(t)}Ic(t){const e=this.sc.indexOf(t);this.sc.splice(e,1)}}function Qa(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Bt extends Hr{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new Wa,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Wa(t),this._firestoreClient=void 0,await t}}}function hp(n,t){const e=typeof n=="object"?n:Kh(),r=typeof n=="string"?n:Tr,s=jh(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=kl("firestore");o&&cp(s,...o)}return s}function Un(n){if(n._terminated)throw new D(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||fp(n),n._firestoreClient}function fp(n){var r,s,o,a;const t=n._freezeSettings(),e=up(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,t);n._componentsProvider||(o=t.localCache)!=null&&o._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new tp(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&function(h){const f=h==null?void 0:h._online.build();return{_offline:h==null?void 0:h._offline.build(f),_online:f}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Pt(ht.fromBase64String(t))}catch(e){throw new D(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Pt(ht.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Pt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(kn(t,Pt._jsonSchema))return Pt.fromBase64String(t.bytes)}}Pt._jsonSchemaVersion="firestore/bytes/1.0",Pt._jsonSchema={type:st("string",Pt._jsonSchemaVersion),bytes:st("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new D(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new lt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new D(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new D(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return B(this._lat,t._lat)||B(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Lt._jsonSchemaVersion}}static fromJSON(t){if(kn(t,Lt._jsonSchema))return new Lt(t.latitude,t.longitude)}}Lt._jsonSchemaVersion="firestore/geoPoint/1.0",Lt._jsonSchema={type:st("string",Lt._jsonSchemaVersion),latitude:st("number"),longitude:st("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,t._values)}toJSON(){return{type:bt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(kn(t,bt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new bt(t.vectorValues);throw new D(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}bt._jsonSchemaVersion="firestore/vectorValue/1.0",bt._jsonSchema={type:st("string",bt._jsonSchemaVersion),vectorValues:st("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dp=/^__.*__$/;class mp{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new he(t,this.data,this.fieldMask,e,this.fieldTransforms):new On(t,this.data,e,this.fieldTransforms)}}class kc{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new he(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Oc(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{dataSource:n})}}class bi{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.mc(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(t){return new bi({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}gc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.i({path:e,arrayElement:!1});return r.yc(t),r}wc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.i({path:e,arrayElement:!1});return r.mc(),r}Sc(t){return this.i({path:void 0,arrayElement:!0})}bc(t){return Nr(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}mc(){if(this.path)for(let t=0;t<this.path.length;t++)this.yc(this.path.get(t))}yc(t){if(t.length===0)throw this.bc("Document fields must not be empty");if(Oc(this.dataSource)&&dp.test(t))throw this.bc('Document fields cannot begin and end with "__"')}}class pp{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||zr(t)}V(t,e,r,s=!1){return new bi({dataSource:t,methodName:e,targetDoc:r,path:lt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Bn(n){const t=n._freezeSettings(),e=zr(n._databaseId);return new pp(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Di(n,t,e,r,s,o={}){const a=n.V(o.merge||o.mergeFields?2:0,t,e,s);ki("Data must be an object, but it was:",a,r);const l=Lc(r,a);let h,f;if(o.merge)h=new St(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const y of o.mergeFields){const w=Be(t,y,e);if(!a.contains(w))throw new D(S.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Bc(m,w)||m.push(w)}h=new St(m),f=a.fieldTransforms.filter(y=>h.covers(y.field))}else h=null,f=a.fieldTransforms;return new mp(new wt(l),h,f)}class Xr extends Qr{_toFieldTransform(t){if(t.dataSource!==2)throw t.dataSource===1?t.bc(`${this._methodName}() can only appear at the top level of your update data`):t.bc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Xr}}class Ni extends Qr{_toFieldTransform(t){return new ed(t.path,new Cn)}isEqual(t){return t instanceof Ni}}function xc(n,t,e,r){const s=n.V(1,t,e);ki("Data must be an object, but it was:",s,r);const o=[],a=wt.empty();le(r,(h,f)=>{const m=Uc(t,h,e);f=Ct(f);const y=s.wc(m);if(f instanceof Xr)o.push(m);else{const w=jn(f,y);w!=null&&(o.push(m),a.set(m,w))}});const l=new St(o);return new kc(a,l,s.fieldTransforms)}function Mc(n,t,e,r,s,o){const a=n.V(1,t,e),l=[Be(t,r,e)],h=[s];if(o.length%2!=0)throw new D(S.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<o.length;w+=2)l.push(Be(t,o[w])),h.push(o[w+1]);const f=[],m=wt.empty();for(let w=l.length-1;w>=0;--w)if(!Bc(f,l[w])){const P=l[w];let N=h[w];N=Ct(N);const O=a.wc(P);if(N instanceof Xr)f.push(P);else{const k=jn(N,O);k!=null&&(f.push(P),m.set(P,k))}}const y=new St(f);return new kc(m,y,a.fieldTransforms)}function gp(n,t,e,r=!1){return jn(e,n.V(r?4:3,t))}function jn(n,t){if(Fc(n=Ct(n)))return ki("Unsupported field value:",t,n),Lc(n,t);if(n instanceof Qr)return function(r,s){if(!Oc(s.dataSource))throw s.bc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.bc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.bc("Nested arrays are not supported");return function(r,s){const o=[];let a=0;for(const l of r){let h=jn(l,s.Sc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,s){if((r=Ct(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Yf(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=X.fromDate(r);return{timestampValue:Vr(s.serializer,o)}}if(r instanceof X){const o=new X(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Vr(s.serializer,o)}}if(r instanceof Lt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Pt)return{bytesValue:nc(s.serializer,r._byteString)};if(r instanceof tt){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.bc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:fi(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof bt)return function(a,l){const h=a instanceof bt?a.toArray():a;return{mapValue:{fields:{[Du]:{stringValue:Nu},[Ir]:{arrayValue:{values:h.map(m=>{if(typeof m!="number")throw l.bc("VectorValues must only contain numeric values.");return Br(l.serializer,m)})}}}}}}(r,s);if(cc(r))return r._toProto(s.serializer);throw s.bc(`Unsupported field value: ${kr(r)}`)}(n,t)}function Lc(n,t){const e={};return Ru(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):le(n,(r,s)=>{const o=jn(s,t.gc(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function Fc(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof X||n instanceof Lt||n instanceof Pt||n instanceof tt||n instanceof Qr||n instanceof bt||cc(n))}function ki(n,t,e){if(!Fc(e)||!Au(e)){const r=kr(e);throw r==="an object"?t.bc(n+" a custom object"):t.bc(n+" "+r)}}function Be(n,t,e){if((t=Ct(t))instanceof Wr)return t._internalPath;if(typeof t=="string")return Uc(n,t);throw Nr("Field path arguments must be of type string or ",n,!1,void 0,e)}const _p=new RegExp("[~\\*/\\[\\]]");function Uc(n,t,e){if(t.search(_p)>=0)throw Nr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Wr(...t.split("."))._internalPath}catch{throw Nr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Nr(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new D(S.INVALID_ARGUMENT,l+n+h)}function Bc(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{convertValue(t,e="none"){switch(oe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return et(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ie(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return le(t,(s,o)=>{r[s]=this.convertValue(o,e)}),r}convertVectorValue(t){var r,s,o;const e=(o=(s=(r=t.fields)==null?void 0:r[Ir].arrayValue)==null?void 0:s.values)==null?void 0:o.map(a=>et(a.doubleValue));return new bt(e)}convertGeoPoint(t){return new Lt(et(t.latitude),et(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Mr(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(wn(t));default:return null}}convertTimestamp(t){const e=se(t);return new X(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=W.fromString(t);z(uc(r),9688,{name:t});const s=new Rn(r.get(1),r.get(3)),o=new x(r.popFirst(5));return s.isEqual(e)||zt(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi extends yp{constructor(t){super(),this.firestore=t}convertBytes(t){return new Pt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new tt(this.firestore,null,e)}}function bp(){return new Ni("serverTimestamp")}const Xa="@firebase/firestore",Ja="4.15.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(n){return function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const o of r)if(o in s&&typeof s[o]=="function")return!0;return!1}(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new tt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Ep(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(Be("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Ep extends jc{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qc(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class xi{}class Mi extends xi{}function Dp(n,t,...e){let r=[];t instanceof xi&&r.push(t),r=r.concat(e),function(o){const a=o.filter(h=>h instanceof Fi).length,l=o.filter(h=>h instanceof Li).length;if(a>1||a>0&&l>0)throw new D(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Li extends Mi{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new Li(t,e,r)}_apply(t){const e=this._parse(t);return $c(t._query,e),new Kt(t.firestore,t.converter,qs(t._query,e))}_parse(t){const e=Bn(t.firestore);return function(o,a,l,h,f,m,y){let w;if(f.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new D(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){tu(y,m);const N=[];for(const O of y)N.push(Za(h,o,O));w={arrayValue:{values:N}}}else w=Za(h,o,y)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||tu(y,m),w=gp(l,a,y,m==="in"||m==="not-in");return rt.create(f,m,w)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}class Fi extends xi{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Fi(t,e)}_parse(t){const e=this._queryConstraints.map(r=>r._parse(t)).filter(r=>r.getFilters().length>0);return e.length===1?e[0]:Dt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,o){let a=s;const l=o.getFlattenedFilters();for(const h of l)$c(a,h),a=qs(a,h)}(t._query,e),new Kt(t.firestore,t.converter,qs(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ui extends Mi{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Ui(t,e)}_apply(t){const e=function(s,o,a){if(s.startAt!==null)throw new D(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Pn(o,a)}(t._query,this._field,this._direction);return new Kt(t.firestore,t.converter,zf(t._query,e))}}function Np(n,t="asc"){const e=t,r=Be("orderBy",n);return Ui._create(r,e)}class Bi extends Mi{constructor(t,e,r){super(),this.type=t,this._limit=e,this._limitType=r}static _create(t,e,r){return new Bi(t,e,r)}_apply(t){return new Kt(t.firestore,t.converter,Ar(t._query,this._limit,this._limitType))}}function kp(n){return Bi._create("limit",n,"F")}function Za(n,t,e){if(typeof(e=Ct(e))=="string"){if(e==="")throw new D(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!ju(t)&&e.indexOf("/")!==-1)throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(W.fromString(e));if(!x.isDocumentKey(r))throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return da(n,new x(r))}if(e instanceof tt)return da(n,e._key);throw new D(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${kr(e)}.`)}function tu(n,t){if(!Array.isArray(n)||n.length===0)throw new D(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function $c(n,t){const e=function(s,o){for(const a of s)for(const l of a.getFlattenedFilters())if(o.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new D(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new D(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function ji(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class pn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Te extends jc{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new mr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Be("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Te._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Te._jsonSchemaVersion="firestore/documentSnapshot/1.0",Te._jsonSchema={type:st("string",Te._jsonSchemaVersion),bundleSource:st("string","DocumentSnapshot"),bundleName:st("string"),bundle:st("string")};class mr extends Te{data(t={}){return super.data(t)}}class Ie{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new pn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new mr(this._firestore,this._userDataWriter,r.key,r,new pn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new D(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const h=new mr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new pn(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>o||l.type!==3).map(l=>{const h=new mr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new pn(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,m=-1;return l.type!==0&&(f=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),m=a.indexOf(l.doc.key)),{type:Tp(l.type),doc:h,oldIndex:f,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Ie._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=ni.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach(o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function Tp(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ie._jsonSchemaVersion="firestore/querySnapshot/1.0",Ie._jsonSchema={type:st("string",Ie._jsonSchemaVersion),bundleSource:st("string","QuerySnapshot"),bundleName:st("string"),bundle:st("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=Bn(t)}set(t,e,r){this._verifyNotCommitted();const s=bs(t,this._firestore),o=ji(s.converter,e,r),a=Di(this._dataReader,"WriteBatch.set",s._key,o,s.converter!==null,r);return this._mutations.push(a.toMutation(s._key,It.none())),this}update(t,e,r,...s){this._verifyNotCommitted();const o=bs(t,this._firestore);let a;return a=typeof(e=Ct(e))=="string"||e instanceof Wr?Mc(this._dataReader,"WriteBatch.update",o._key,e,r,s):xc(this._dataReader,"WriteBatch.update",o._key,e),this._mutations.push(a.toMutation(o._key,It.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=bs(t,this._firestore);return this._mutations=this._mutations.concat(new $r(e._key,It.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(S.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function bs(n,t){if((n=Ct(n)).firestore!==t)throw new D(S.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Op(n){n=Tt(n,tt);const t=Tt(n.firestore,Bt),e=Un(t);return sp(e,n._key).then(r=>zc(t,n,r))}function xp(n){n=Tt(n,Kt);const t=Tt(n.firestore,Bt),e=Un(t),r=new Oi(t);return qc(n._query),ip(e,n._query).then(s=>new Ie(t,r,n,s))}function Mp(n,t,e){n=Tt(n,tt);const r=Tt(n.firestore,Bt),s=ji(n.converter,t,e),o=Bn(r);return qn(r,[Di(o,"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,It.none())])}function Lp(n,t,e,...r){n=Tt(n,tt);const s=Tt(n.firestore,Bt),o=Bn(s);let a;return a=typeof(t=Ct(t))=="string"||t instanceof Wr?Mc(o,"updateDoc",n._key,t,e,r):xc(o,"updateDoc",n._key,t),qn(s,[a.toMutation(n._key,It.exists(!0))])}function Fp(n){return qn(Tt(n.firestore,Bt),[new $r(n._key,It.none())])}function Up(n,t){const e=Tt(n.firestore,Bt),r=lp(n),s=ji(n.converter,t),o=Bn(n.firestore);return qn(e,[Di(o,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,It.exists(!1))]).then(()=>r)}function Bp(n,...t){var f,m,y;n=Ct(n);let e={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||Ya(t[r])||(e=t[r++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(Ya(t[r])){const w=t[r];t[r]=(f=w.next)==null?void 0:f.bind(w),t[r+1]=(m=w.error)==null?void 0:m.bind(w),t[r+2]=(y=w.complete)==null?void 0:y.bind(w)}let o,a,l;if(n instanceof tt)a=Tt(n.firestore,Bt),l=Lr(n._key.path),o={next:w=>{t[r]&&t[r](zc(a,n,w))},error:t[r+1],complete:t[r+2]};else{const w=Tt(n,Kt);a=Tt(w.firestore,Bt),l=w._query;const P=new Oi(a);o={next:N=>{t[r]&&t[r](new Ie(a,P,w,N))},error:t[r+1],complete:t[r+2]},qc(n._query)}const h=Un(a);return rp(h,l,s,o)}function qn(n,t){const e=Un(n);return op(e,t)}function zc(n,t,e){const r=e.docs.get(t._key),s=new Oi(n);return new Te(n,s,t._key,r,new pn(e.hasPendingWrites,e.fromCache),t.converter)}function jp(n){return n=Tt(n,Bt),Un(n),new Ip(n,t=>qn(n,t))}(function(t,e=!0){rf(Gh),yr(new Tn("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),l=new Bt(new af(r.getProvider("auth-internal")),new lf(a,r.getProvider("app-check-internal")),Vf(a,s),a);return o={useFetchStreams:e,...o},l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),ke(Xa,Ja,t),ke(Xa,Ja,"esm2020")})();var vp="firebase",Ap="12.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ke(vp,Ap,"app");const pr={apiKey:"your-api-key",authDomain:"your-project.firebaseapp.com",projectId:"your-project-id",storageBucket:"your-project.appspot.com",messagingSenderId:"123456789",appId:"1:123456789:web:abc123"},wp=!!(pr.apiKey&&pr.projectId&&!pr.apiKey.startsWith("your-"));let Ds,eu;wp?(Ds=Jo().length===0?hu(pr):Jo()[0],eu=hp(Ds)):(console.warn(`[Firebase] No valid config found. Copy .env.example → .env.local and fill in your values.
The app will run without Firestore until then.`),Ds={},eu={});export{yp as A,Pt as B,Sp as C,tt as D,Bi as E,Wr as F,Vp as G,Ui as H,Ie as I,ht as J,Rn as K,x as L,sf as M,lt as N,Tt as O,Ae as P,Kt as Q,pf as R,pn as S,X as T,cp as U,bt as V,Ip as W,Un as X,qn as Y,hp as Z,ni as _,bp as a,eu as b,xp as c,lp as d,Cp as e,Np as f,Op as g,Up as h,wp as i,Fp as j,ne as k,kp as l,Te as m,Qr as n,Bp as o,Bt as p,Dp as q,D as r,Mp as s,Lt as t,Lp as u,Fi as v,jp as w,Mi as x,mr as y,Li as z};
