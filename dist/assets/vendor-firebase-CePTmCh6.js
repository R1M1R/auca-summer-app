const vf=()=>{};var Ou={};/**
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
 */const ml=function(r){const t=[];let e=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Af=function(r){const t=[];let e=0,n=0;for(;e<r.length;){const s=r[e++];if(s<128)t[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[e++];t[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[e++],a=r[e++],u=r[e++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;t[n++]=String.fromCharCode(55296+(l>>10)),t[n++]=String.fromCharCode(56320+(l&1023))}else{const i=r[e++],a=r[e++];t[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return t.join("")},gl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,t){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],a=s+1<r.length,u=a?r[s+1]:0,l=s+2<r.length,d=l?r[s+2]:0,f=i>>2,g=(i&3)<<4|u>>4;let I=(u&15)<<2|d>>6,S=d&63;l||(S=64,a||(I=64)),n.push(e[f],e[g],e[I],e[S])}return n.join("")},encodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(r):this.encodeByteArray(ml(r),t)},decodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(r):Af(this.decodeStringToByteArray(r,t))},decodeStringToByteArray(r,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=e[r.charAt(s++)],u=s<r.length?e[r.charAt(s)]:0;++s;const d=s<r.length?e[r.charAt(s)]:64;++s;const g=s<r.length?e[r.charAt(s)]:64;if(++s,i==null||u==null||d==null||g==null)throw new Rf;const I=i<<2|u>>4;if(n.push(I),d!==64){const S=u<<4&240|d>>2;if(n.push(S),g!==64){const D=d<<6&192|g;n.push(D)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Rf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const bf=function(r){const t=ml(r);return gl.encodeByteArray(t,!0)},pl=function(r){return bf(r).replace(/\./g,"")},Sf=function(r){try{return gl.decodeString(r,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function _l(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Vf=()=>_l().__FIREBASE_DEFAULTS__,Pf=()=>{if(typeof process>"u"||typeof Ou>"u")return;const r=Ou.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Cf=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=r&&Sf(r[1]);return t&&JSON.parse(t)},yl=()=>{try{return vf()||Vf()||Pf()||Cf()}catch(r){console.info("Unable to get __FIREBASE_DEFAULTS__ due to: ".concat(r));return}},Df=()=>{var r;return(r=yl())==null?void 0:r.config};/**
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
 */class xf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}}/**
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
 */function Os(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Il(){var t;const r=(t=yl())==null?void 0:t.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch(e){return!1}}function El(){return!Il()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Tl(){return!Il()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function wl(){try{return typeof indexedDB=="object"}catch(r){return!1}}function Nf(){return new Promise((r,t)=>{try{let e=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)==null?void 0:i.message)||"")}}catch(e){t(e)}})}/**
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
 */const kf="FirebaseError";class Mn extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name=kf,Object.setPrototypeOf(this,Mn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,vl.prototype.create)}}class vl{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s="".concat(this.service,"/").concat(t),i=this.errors[t],a=i?Of(i,n):"Error",u="".concat(this.serviceName,": ").concat(a," (").concat(s,").");return new Mn(s,u,n)}}function Of(r,t){return r.replace(Mf,(e,n)=>{const s=t[n];return s!=null?String(s):"<".concat(n,"?>")})}const Mf=/\{\$([^}]+)}/g;function Ms(r,t){if(r===t)return!0;const e=Object.keys(r),n=Object.keys(t);for(const s of e){if(!n.includes(s))return!1;const i=r[s],a=t[s];if(Mu(i)&&Mu(a)){if(!Ms(i,a))return!1}else if(i!==a)return!1}for(const s of n)if(!e.includes(s))return!1;return!0}function Mu(r){return r!==null&&typeof r=="object"}/**
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
 */function Bt(r){return r&&r._delegate?r._delegate:r}/**
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
 */function Al(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch(t){return!1}}async function Ff(r){return(await fetch(r,{credentials:"include"})).ok}class vr{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const ke="[DEFAULT]";/**
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
 */class Lf{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new xf;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&n.resolve(s)}catch(s){}}return this.instancesDeferred.get(e).promise}getImmediate(t){var s;const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),n=(s=t==null?void 0:t.optional)!=null?s:!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(i){if(n)return null;throw i}else{if(n)return null;throw Error("Service ".concat(this.name," is not available"))}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error("Mismatching Component ".concat(t.name," for Provider ").concat(this.name,"."));if(this.component)throw Error("Component for ".concat(this.name," has already been provided"));if(this.component=t,!!this.shouldAutoInitialize()){if(Uf(t))try{this.getOrInitializeService({instanceIdentifier:ke})}catch(e){}for(const[e,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch(i){}}}}clearInstance(t=ke){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=ke){return this.instances.has(t)}getOptions(t=ke){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error("".concat(this.name,"(").concat(n,") has already been initialized"));if(!this.isComponentSet())throw Error("Component ".concat(this.name," has not been registered yet"));const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[i,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);n===u&&a.resolve(s)}return s}onInit(t,e){var a;const n=this.normalizeInstanceIdentifier(e),s=(a=this.onInitCallbacks.get(n))!=null?a:new Set;s.add(t),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&t(i,n),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch(i){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Bf(t),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch(s){}return n||null}normalizeInstanceIdentifier(t=ke){return this.component?this.component.multipleInstances?t:ke:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Bf(r){return r===ke?void 0:r}function Uf(r){return r.instantiationMode==="EAGER"}/**
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
 */class qf{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error("Component ".concat(t.name," has already been registered with ").concat(this.name));e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Lf(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var H;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(H||(H={}));const jf={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},zf=H.INFO,$f={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},Kf=(r,t,...e)=>{if(t<r.logLevel)return;const n=new Date().toISOString(),s=$f[t];if(s)console[s]("[".concat(n,"]  ").concat(r.name,":"),...e);else throw new Error("Attempted to log a message with an invalid logType (value: ".concat(t,")"))};class Rl{constructor(t){this.name=t,this._logLevel=zf,this._logHandler=Kf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in H))throw new TypeError('Invalid value "'.concat(t,'" assigned to `logLevel`'));this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?jf[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...t),this._logHandler(this,H.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...t),this._logHandler(this,H.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,H.INFO,...t),this._logHandler(this,H.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,H.WARN,...t),this._logHandler(this,H.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...t),this._logHandler(this,H.ERROR,...t)}}const Gf=(r,t)=>t.some(e=>r instanceof e);let Fu,Lu;function Qf(){return Fu||(Fu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Hf(){return Lu||(Lu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const bl=new WeakMap,oo=new WeakMap,Sl=new WeakMap,Hi=new WeakMap,Oo=new WeakMap;function Wf(r){const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",a)},i=()=>{e(_e(r.result)),s()},a=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&bl.set(e,r)}).catch(()=>{}),Oo.set(t,r),t}function Jf(r){if(oo.has(r))return;const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",a),r.removeEventListener("abort",a)},i=()=>{e(),s()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",a),r.addEventListener("abort",a)});oo.set(r,t)}let ao={get(r,t,e){if(r instanceof IDBTransaction){if(t==="done")return oo.get(r);if(t==="objectStoreNames")return r.objectStoreNames||Sl.get(r);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return _e(r[t])},set(r,t,e){return r[t]=e,!0},has(r,t){return r instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in r}};function Xf(r){ao=r(ao)}function Yf(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const n=r.call(Wi(this),t,...e);return Sl.set(n,t.sort?t.sort():[t]),_e(n)}:Hf().includes(r)?function(...t){return r.apply(Wi(this),t),_e(bl.get(this))}:function(...t){return _e(r.apply(Wi(this),t))}}function Zf(r){return typeof r=="function"?Yf(r):(r instanceof IDBTransaction&&Jf(r),Gf(r,Qf())?new Proxy(r,ao):r)}function _e(r){if(r instanceof IDBRequest)return Wf(r);if(Hi.has(r))return Hi.get(r);const t=Zf(r);return t!==r&&(Hi.set(r,t),Oo.set(t,r)),t}const Wi=r=>Oo.get(r);function tm(r,t,{blocked:e,upgrade:n,blocking:s,terminated:i}={}){const a=indexedDB.open(r,t),u=_e(a);return n&&a.addEventListener("upgradeneeded",l=>{n(_e(a.result),l.oldVersion,l.newVersion,_e(a.transaction),l)}),e&&a.addEventListener("blocked",l=>e(l.oldVersion,l.newVersion,l)),u.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}const em=["get","getKey","getAll","getAllKeys","count"],nm=["put","add","delete","clear"],Ji=new Map;function Bu(r,t){if(!(r instanceof IDBDatabase&&!(t in r)&&typeof t=="string"))return;if(Ji.get(t))return Ji.get(t);const e=t.replace(/FromIndex$/,""),n=t!==e,s=nm.includes(e);if(!(e in(n?IDBIndex:IDBObjectStore).prototype)||!(s||em.includes(e)))return;const i=async function(a,...u){const l=this.transaction(a,s?"readwrite":"readonly");let d=l.store;return n&&(d=d.index(u.shift())),(await Promise.all([d[e](...u),s&&l.done]))[0]};return Ji.set(t,i),i}Xf(r=>({...r,get:(t,e,n)=>Bu(t,e)||r.get(t,e,n),has:(t,e)=>!!Bu(t,e)||r.has(t,e)}));/**
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
 */class rm{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(sm(e)){const n=e.getImmediate();return"".concat(n.library,"/").concat(n.version)}else return null}).filter(e=>e).join(" ")}}function sm(r){const t=r.getComponent();return(t==null?void 0:t.type)==="VERSION"}const uo="@firebase/app",Uu="0.14.13";/**
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
 */const Zt=new Rl("@firebase/app"),im="@firebase/app-compat",om="@firebase/analytics-compat",am="@firebase/analytics",um="@firebase/app-check-compat",cm="@firebase/app-check",lm="@firebase/auth",hm="@firebase/auth-compat",dm="@firebase/database",fm="@firebase/data-connect",mm="@firebase/database-compat",gm="@firebase/functions",pm="@firebase/functions-compat",_m="@firebase/installations",ym="@firebase/installations-compat",Im="@firebase/messaging",Em="@firebase/messaging-compat",Tm="@firebase/performance",wm="@firebase/performance-compat",vm="@firebase/remote-config",Am="@firebase/remote-config-compat",Rm="@firebase/storage",bm="@firebase/storage-compat",Sm="@firebase/firestore",Vm="@firebase/ai",Pm="@firebase/firestore-compat",Cm="firebase",Dm="12.14.0";/**
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
 */const xm="[DEFAULT]",Nm={[uo]:"fire-core",[im]:"fire-core-compat",[am]:"fire-analytics",[om]:"fire-analytics-compat",[cm]:"fire-app-check",[um]:"fire-app-check-compat",[lm]:"fire-auth",[hm]:"fire-auth-compat",[dm]:"fire-rtdb",[fm]:"fire-data-connect",[mm]:"fire-rtdb-compat",[gm]:"fire-fn",[pm]:"fire-fn-compat",[_m]:"fire-iid",[ym]:"fire-iid-compat",[Im]:"fire-fcm",[Em]:"fire-fcm-compat",[Tm]:"fire-perf",[wm]:"fire-perf-compat",[vm]:"fire-rc",[Am]:"fire-rc-compat",[Rm]:"fire-gcs",[bm]:"fire-gcs-compat",[Sm]:"fire-fst",[Pm]:"fire-fst-compat",[Vm]:"fire-vertex","fire-js":"fire-js",[Cm]:"fire-js-all"};/**
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
 */const Fs=new Map,km=new Map,co=new Map;function qu(r,t){try{r.container.addComponent(t)}catch(e){Zt.debug("Component ".concat(t.name," failed to register with FirebaseApp ").concat(r.name),e)}}function Ls(r){const t=r.name;if(co.has(t))return Zt.debug("There were multiple attempts to register component ".concat(t,".")),!1;co.set(t,r);for(const e of Fs.values())qu(e,r);for(const e of km.values())qu(e,r);return!0}function Om(r,t){const e=r.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),r.container.getProvider(t)}function Mm(r){return r==null?!1:r.settings!==void 0}/**
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
 */const Fm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},je=new vl("app","Firebase",Fm);/**
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
 */class Lm{constructor(t,e,n){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new vr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw je.create("app-deleted",{appName:this._name})}}/**
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
 */const Bm=Dm;function My(r,t={}){let e=r;typeof t!="object"&&(t={name:t});const n={name:xm,automaticDataCollectionEnabled:!0,...t},s=n.name;if(typeof s!="string"||!s)throw je.create("bad-app-name",{appName:String(s)});if(e||(e=Df()),!e)throw je.create("no-options");const i=Fs.get(s);if(i){if(Ms(e,i.options)&&Ms(n,i.config))return i;throw je.create("duplicate-app",{appName:s})}const a=new qf(s);for(const l of co.values())a.addComponent(l);const u=new Lm(e,n,a);return Fs.set(s,u),u}function Fy(){return Array.from(Fs.values())}function pn(r,t,e){var a;let n=(a=Nm[r])!=null?a:r;e&&(n+="-".concat(e));const s=n.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const u=['Unable to register library "'.concat(n,'" with version "').concat(t,'":')];s&&u.push('library name "'.concat(n,'" contains illegal characters (whitespace or "/")')),s&&i&&u.push("and"),i&&u.push('version name "'.concat(t,'" contains illegal characters (whitespace or "/")')),Zt.warn(u.join(" "));return}Ls(new vr("".concat(n,"-version"),()=>({library:n,version:t}),"VERSION"))}/**
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
 */const Um="firebase-heartbeat-database",qm=1,Ar="firebase-heartbeat-store";let Xi=null;function Vl(){return Xi||(Xi=tm(Um,qm,{upgrade:(r,t)=>{switch(t){case 0:try{r.createObjectStore(Ar)}catch(e){console.warn(e)}}}}).catch(r=>{throw je.create("idb-open",{originalErrorMessage:r.message})})),Xi}async function jm(r){try{const e=(await Vl()).transaction(Ar),n=await e.objectStore(Ar).get(Pl(r));return await e.done,n}catch(t){if(t instanceof Mn)Zt.warn(t.message);else{const e=je.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Zt.warn(e.message)}}}async function ju(r,t){try{const n=(await Vl()).transaction(Ar,"readwrite");await n.objectStore(Ar).put(t,Pl(r)),await n.done}catch(e){if(e instanceof Mn)Zt.warn(e.message);else{const n=je.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Zt.warn(n.message)}}}function Pl(r){return"".concat(r.name,"!").concat(r.options.appId)}/**
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
 */const zm=1024,$m=30;class Km{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Qm(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=zu();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>$m){const a=Hm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){Zt.warn(n)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=zu(),{heartbeatsToSend:n,unsentEntries:s}=Gm(this._heartbeatsCache.heartbeats),i=pl(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Zt.warn(e),""}}}function zu(){return new Date().toISOString().substring(0,10)}function Gm(r,t=zm){const e=[];let n=r.slice();for(const s of r){const i=e.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),$u(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),$u(e)>t){e.pop();break}n=n.slice(1)}return{heartbeatsToSend:e,unsentEntries:n}}class Qm{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wl()?Nf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await jm(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return ju(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!=null?n:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return ju(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!=null?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function $u(r){return pl(JSON.stringify({version:2,heartbeats:r})).length}function Hm(r){if(r.length===0)return-1;let t=0,e=r[0].date;for(let n=1;n<r.length;n++)r[n].date<e&&(e=r[n].date,t=n);return t}/**
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
 */function Wm(r){Ls(new vr("platform-logger",t=>new rm(t),"PRIVATE")),Ls(new vr("heartbeat",t=>new Km(t),"PRIVATE")),pn(uo,Uu,r),pn(uo,Uu,"esm2020"),pn("fire-js","")}Wm("");var Ku=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ye,Cl;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,p){function y(){}y.prototype=p.prototype,E.F=p.prototype,E.prototype=new y,E.prototype.constructor=E,E.D=function(w,T,R){for(var _=Array(arguments.length-2),Pt=2;Pt<arguments.length;Pt++)_[Pt-2]=arguments[Pt];return p.prototype[T].apply(w,_)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(n,e),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,p,y){y||(y=0);const w=Array(16);if(typeof p=="string")for(var T=0;T<16;++T)w[T]=p.charCodeAt(y++)|p.charCodeAt(y++)<<8|p.charCodeAt(y++)<<16|p.charCodeAt(y++)<<24;else for(T=0;T<16;++T)w[T]=p[y++]|p[y++]<<8|p[y++]<<16|p[y++]<<24;p=E.g[0],y=E.g[1],T=E.g[2];let R=E.g[3],_;_=p+(R^y&(T^R))+w[0]+3614090360&4294967295,p=y+(_<<7&4294967295|_>>>25),_=R+(T^p&(y^T))+w[1]+3905402710&4294967295,R=p+(_<<12&4294967295|_>>>20),_=T+(y^R&(p^y))+w[2]+606105819&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(p^T&(R^p))+w[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(R^y&(T^R))+w[4]+4118548399&4294967295,p=y+(_<<7&4294967295|_>>>25),_=R+(T^p&(y^T))+w[5]+1200080426&4294967295,R=p+(_<<12&4294967295|_>>>20),_=T+(y^R&(p^y))+w[6]+2821735955&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(p^T&(R^p))+w[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(R^y&(T^R))+w[8]+1770035416&4294967295,p=y+(_<<7&4294967295|_>>>25),_=R+(T^p&(y^T))+w[9]+2336552879&4294967295,R=p+(_<<12&4294967295|_>>>20),_=T+(y^R&(p^y))+w[10]+4294925233&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(p^T&(R^p))+w[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(R^y&(T^R))+w[12]+1804603682&4294967295,p=y+(_<<7&4294967295|_>>>25),_=R+(T^p&(y^T))+w[13]+4254626195&4294967295,R=p+(_<<12&4294967295|_>>>20),_=T+(y^R&(p^y))+w[14]+2792965006&4294967295,T=R+(_<<17&4294967295|_>>>15),_=y+(p^T&(R^p))+w[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(T^R&(y^T))+w[1]+4129170786&4294967295,p=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(p^y))+w[6]+3225465664&4294967295,R=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(R^p))+w[11]+643717713&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^p&(T^R))+w[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^R&(y^T))+w[5]+3593408605&4294967295,p=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(p^y))+w[10]+38016083&4294967295,R=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(R^p))+w[15]+3634488961&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^p&(T^R))+w[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^R&(y^T))+w[9]+568446438&4294967295,p=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(p^y))+w[14]+3275163606&4294967295,R=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(R^p))+w[3]+4107603335&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^p&(T^R))+w[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^R&(y^T))+w[13]+2850285829&4294967295,p=y+(_<<5&4294967295|_>>>27),_=R+(y^T&(p^y))+w[2]+4243563512&4294967295,R=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(R^p))+w[7]+1735328473&4294967295,T=R+(_<<14&4294967295|_>>>18),_=y+(R^p&(T^R))+w[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(y^T^R)+w[5]+4294588738&4294967295,p=y+(_<<4&4294967295|_>>>28),_=R+(p^y^T)+w[8]+2272392833&4294967295,R=p+(_<<11&4294967295|_>>>21),_=T+(R^p^y)+w[11]+1839030562&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^p)+w[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^R)+w[1]+2763975236&4294967295,p=y+(_<<4&4294967295|_>>>28),_=R+(p^y^T)+w[4]+1272893353&4294967295,R=p+(_<<11&4294967295|_>>>21),_=T+(R^p^y)+w[7]+4139469664&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^p)+w[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^R)+w[13]+681279174&4294967295,p=y+(_<<4&4294967295|_>>>28),_=R+(p^y^T)+w[0]+3936430074&4294967295,R=p+(_<<11&4294967295|_>>>21),_=T+(R^p^y)+w[3]+3572445317&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^p)+w[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^R)+w[9]+3654602809&4294967295,p=y+(_<<4&4294967295|_>>>28),_=R+(p^y^T)+w[12]+3873151461&4294967295,R=p+(_<<11&4294967295|_>>>21),_=T+(R^p^y)+w[15]+530742520&4294967295,T=R+(_<<16&4294967295|_>>>16),_=y+(T^R^p)+w[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(T^(y|~R))+w[0]+4096336452&4294967295,p=y+(_<<6&4294967295|_>>>26),_=R+(y^(p|~T))+w[7]+1126891415&4294967295,R=p+(_<<10&4294967295|_>>>22),_=T+(p^(R|~y))+w[14]+2878612391&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~p))+w[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~R))+w[12]+1700485571&4294967295,p=y+(_<<6&4294967295|_>>>26),_=R+(y^(p|~T))+w[3]+2399980690&4294967295,R=p+(_<<10&4294967295|_>>>22),_=T+(p^(R|~y))+w[10]+4293915773&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~p))+w[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~R))+w[8]+1873313359&4294967295,p=y+(_<<6&4294967295|_>>>26),_=R+(y^(p|~T))+w[15]+4264355552&4294967295,R=p+(_<<10&4294967295|_>>>22),_=T+(p^(R|~y))+w[6]+2734768916&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~p))+w[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~R))+w[4]+4149444226&4294967295,p=y+(_<<6&4294967295|_>>>26),_=R+(y^(p|~T))+w[11]+3174756917&4294967295,R=p+(_<<10&4294967295|_>>>22),_=T+(p^(R|~y))+w[2]+718787259&4294967295,T=R+(_<<15&4294967295|_>>>17),_=y+(R^(T|~p))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+R&4294967295}n.prototype.v=function(E,p){p===void 0&&(p=E.length);const y=p-this.blockSize,w=this.C;let T=this.h,R=0;for(;R<p;){if(T==0)for(;R<=y;)s(this,E,R),R+=this.blockSize;if(typeof E=="string"){for(;R<p;)if(w[T++]=E.charCodeAt(R++),T==this.blockSize){s(this,w),T=0;break}}else for(;R<p;)if(w[T++]=E[R++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=p},n.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;p=this.o*8;for(var y=E.length-8;y<E.length;++y)E[y]=p&255,p/=256;for(this.v(E),E=Array(16),p=0,y=0;y<4;++y)for(let w=0;w<32;w+=8)E[p++]=this.g[y]>>>w&255;return E};function i(E,p){var y=u;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=p(E)}function a(E,p){this.h=p;const y=[];let w=!0;for(let T=E.length-1;T>=0;T--){const R=E[T]|0;w&&R==p||(y[T]=R,w=!1)}this.g=y}var u={};function l(E){return-128<=E&&E<128?i(E,function(p){return new a([p|0],p<0?-1:0)}):new a([E|0],E<0?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return g;if(E<0)return N(d(-E));const p=[];let y=1;for(let w=0;E>=y;w++)p[w]=E/y|0,y*=4294967296;return new a(p,0)}function f(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return N(f(E.substring(1),p));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=d(Math.pow(p,8));let w=g;for(let R=0;R<E.length;R+=8){var T=Math.min(8,E.length-R);const _=parseInt(E.substring(R,R+T),p);T<8?(T=d(Math.pow(p,T)),w=w.j(T).add(d(_))):(w=w.j(y),w=w.add(d(_)))}return w}var g=l(0),I=l(1),S=l(16777216);r=a.prototype,r.m=function(){if(k(this))return-N(this).m();let E=0,p=1;for(let y=0;y<this.g.length;y++){const w=this.i(y);E+=(w>=0?w:4294967296+w)*p,p*=4294967296}return E},r.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(D(this))return"0";if(k(this))return"-"+N(this).toString(E);const p=d(Math.pow(E,6));var y=this;let w="";for(;;){const T=nt(y,p).g;y=G(y,T.j(p));let R=((y.g.length>0?y.g[0]:y.h)>>>0).toString(E);if(y=T,D(y))return R+w;for(;R.length<6;)R="0"+R;w=R+w}},r.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function D(E){if(E.h!=0)return!1;for(let p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function k(E){return E.h==-1}r.l=function(E){return E=G(this,E),k(E)?-1:D(E)?0:1};function N(E){const p=E.g.length,y=[];for(let w=0;w<p;w++)y[w]=~E.g[w];return new a(y,~E.h).add(I)}r.abs=function(){return k(this)?N(this):this},r.add=function(E){const p=Math.max(this.g.length,E.g.length),y=[];let w=0;for(let T=0;T<=p;T++){let R=w+(this.i(T)&65535)+(E.i(T)&65535),_=(R>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=_>>>16,R&=65535,_&=65535,y[T]=_<<16|R}return new a(y,y[y.length-1]&-2147483648?-1:0)};function G(E,p){return E.add(N(p))}r.j=function(E){if(D(this)||D(E))return g;if(k(this))return k(E)?N(this).j(N(E)):N(N(this).j(E));if(k(E))return N(this.j(N(E)));if(this.l(S)<0&&E.l(S)<0)return d(this.m()*E.m());const p=this.g.length+E.g.length,y=[];for(var w=0;w<2*p;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(let T=0;T<E.g.length;T++){const R=this.i(w)>>>16,_=this.i(w)&65535,Pt=E.i(T)>>>16,Se=E.i(T)&65535;y[2*w+2*T]+=_*Se,j(y,2*w+2*T),y[2*w+2*T+1]+=R*Se,j(y,2*w+2*T+1),y[2*w+2*T+1]+=_*Pt,j(y,2*w+2*T+1),y[2*w+2*T+2]+=R*Pt,j(y,2*w+2*T+2)}for(E=0;E<p;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=p;E<2*p;E++)y[E]=0;return new a(y,0)};function j(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function U(E,p){this.g=E,this.h=p}function nt(E,p){if(D(p))throw Error("division by zero");if(D(E))return new U(g,g);if(k(E))return p=nt(N(E),p),new U(N(p.g),N(p.h));if(k(p))return p=nt(E,N(p)),new U(N(p.g),p.h);if(E.g.length>30){if(k(E)||k(p))throw Error("slowDivide_ only works with positive integers.");for(var y=I,w=p;w.l(E)<=0;)y=W(y),w=W(w);var T=J(y,1),R=J(w,1);for(w=J(w,2),y=J(y,2);!D(w);){var _=R.add(w);_.l(E)<=0&&(T=T.add(y),R=_),w=J(w,1),y=J(y,1)}return p=G(E,T.j(p)),new U(T,p)}for(T=g;E.l(p)>=0;){for(y=Math.max(1,Math.floor(E.m()/p.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),R=d(y),_=R.j(p);k(_)||_.l(E)>0;)y-=w,R=d(y),_=R.j(p);D(R)&&(R=I),T=T.add(R),E=G(E,_)}return new U(T,E)}r.B=function(E){return nt(this,E).h},r.and=function(E){const p=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<p;w++)y[w]=this.i(w)&E.i(w);return new a(y,this.h&E.h)},r.or=function(E){const p=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<p;w++)y[w]=this.i(w)|E.i(w);return new a(y,this.h|E.h)},r.xor=function(E){const p=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<p;w++)y[w]=this.i(w)^E.i(w);return new a(y,this.h^E.h)};function W(E){const p=E.g.length+1,y=[];for(let w=0;w<p;w++)y[w]=E.i(w)<<1|E.i(w-1)>>>31;return new a(y,E.h)}function J(E,p){const y=p>>5;p%=32;const w=E.g.length-y,T=[];for(let R=0;R<w;R++)T[R]=p>0?E.i(R+y)>>>p|E.i(R+y+1)<<32-p:E.i(R+y);return new a(T,E.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Cl=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,ye=a}).apply(typeof Ku<"u"?Ku:typeof self<"u"?self:typeof window<"u"?window:{});var ps=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Dl,lr,xl,vs,lo,Nl,kl,Ol;(function(){var r,t=Object.defineProperty;function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ps=="object"&&ps];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var n=e(this);function s(o,c){if(c)t:{var h=n;o=o.split(".");for(var m=0;m<o.length-1;m++){var A=o[m];if(!(A in h))break t;h=h[A]}o=o[o.length-1],m=h[o],c=c(m),c!=m&&c!=null&&t(h,o,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(c){var h=[],m;for(m in c)Object.prototype.hasOwnProperty.call(c,m)&&h.push([m,c[m]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function u(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function l(o,c,h){return o.call.apply(o.bind,arguments)}function d(o,c,h){return d=l,d.apply(null,arguments)}function f(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var m=h.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function g(o,c){function h(){}h.prototype=c.prototype,o.Z=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(m,A,b){for(var x=Array(arguments.length-2),z=2;z<arguments.length;z++)x[z-2]=arguments[z];return c.prototype[A].apply(m,x)}}var I=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function S(o){const c=o.length;if(c>0){const h=Array(c);for(let m=0;m<c;m++)h[m]=o[m];return h}return[]}function D(o,c){for(let m=1;m<arguments.length;m++){const A=arguments[m];var h=typeof A;if(h=h!="object"?h:A?Array.isArray(A)?"array":h:"null",h=="array"||h=="object"&&typeof A.length=="number"){h=o.length||0;const b=A.length||0;o.length=h+b;for(let x=0;x<b;x++)o[h+x]=A[x]}else o.push(A)}}class k{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function N(o){a.setTimeout(()=>{throw o},0)}function G(){var o=E;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class j{constructor(){this.h=this.g=null}add(c,h){const m=U.get();m.set(c,h),this.h?this.h.next=m:this.g=m,this.h=m}}var U=new k(()=>new nt,o=>o.reset());class nt{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let W,J=!1,E=new j,p=()=>{const o=Promise.resolve(void 0);W=()=>{o.then(y)}};function y(){for(var o;o=G();){try{o.h.call(o.g)}catch(h){N(h)}var c=U;c.j(o),c.h<100&&(c.h++,o.next=c.g,c.g=o)}J=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var R=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,c),a.removeEventListener("test",h,c)}catch(h){}return o}();function _(o){return/^[\s\xa0]*$/.test(o)}function Pt(o,c){T.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,c)}g(Pt,T),Pt.prototype.init=function(o,c){const h=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget,c||(h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement)),this.relatedTarget=c,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Pt.Z.h.call(this)},Pt.prototype.h=function(){Pt.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Se="closure_listenable_"+(Math.random()*1e6|0),$d=0;function Kd(o,c,h,m,A){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!m,this.ha=A,this.key=++$d,this.da=this.fa=!1}function es(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ns(o,c,h){for(const m in o)c.call(h,o[m],m,o)}function Gd(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function ka(o){const c={};for(const h in o)c[h]=o[h];return c}const Oa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ma(o,c){let h,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(h in m)o[h]=m[h];for(let b=0;b<Oa.length;b++)h=Oa[b],Object.prototype.hasOwnProperty.call(m,h)&&(o[h]=m[h])}}function rs(o){this.src=o,this.g={},this.h=0}rs.prototype.add=function(o,c,h,m,A){const b=o.toString();o=this.g[b],o||(o=this.g[b]=[],this.h++);const x=Ri(o,c,m,A);return x>-1?(c=o[x],h||(c.fa=!1)):(c=new Kd(c,this.src,b,!!m,A),c.fa=h,o.push(c)),c};function Ai(o,c){const h=c.type;if(h in o.g){var m=o.g[h],A=Array.prototype.indexOf.call(m,c,void 0),b;(b=A>=0)&&Array.prototype.splice.call(m,A,1),b&&(es(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Ri(o,c,h,m){for(let A=0;A<o.length;++A){const b=o[A];if(!b.da&&b.listener==c&&b.capture==!!h&&b.ha==m)return A}return-1}var bi="closure_lm_"+(Math.random()*1e6|0),Si={};function Fa(o,c,h,m,A){if(Array.isArray(c)){for(let b=0;b<c.length;b++)Fa(o,c[b],h,m,A);return null}return h=Ua(h),o&&o[Se]?o.J(c,h,u(m)?!!m.capture:!1,A):Qd(o,c,h,!1,m,A)}function Qd(o,c,h,m,A,b){if(!c)throw Error("Invalid event type");const x=u(A)?!!A.capture:!!A;let z=Pi(o);if(z||(o[bi]=z=new rs(o)),h=z.add(c,h,m,x,b),h.proxy)return h;if(m=Hd(),h.proxy=m,m.src=o,m.listener=h,o.addEventListener)R||(A=x),A===void 0&&(A=!1),o.addEventListener(c.toString(),m,A);else if(o.attachEvent)o.attachEvent(Ba(c.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Hd(){function o(h){return c.call(o.src,o.listener,h)}const c=Wd;return o}function La(o,c,h,m,A){if(Array.isArray(c))for(var b=0;b<c.length;b++)La(o,c[b],h,m,A);else m=u(m)?!!m.capture:!!m,h=Ua(h),o&&o[Se]?(o=o.i,b=String(c).toString(),b in o.g&&(c=o.g[b],h=Ri(c,h,m,A),h>-1&&(es(c[h]),Array.prototype.splice.call(c,h,1),c.length==0&&(delete o.g[b],o.h--)))):o&&(o=Pi(o))&&(c=o.g[c.toString()],o=-1,c&&(o=Ri(c,h,m,A)),(h=o>-1?c[o]:null)&&Vi(h))}function Vi(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Se])Ai(c.i,o);else{var h=o.type,m=o.proxy;c.removeEventListener?c.removeEventListener(h,m,o.capture):c.detachEvent?c.detachEvent(Ba(h),m):c.addListener&&c.removeListener&&c.removeListener(m),(h=Pi(c))?(Ai(h,o),h.h==0&&(h.src=null,c[bi]=null)):es(o)}}}function Ba(o){return o in Si?Si[o]:Si[o]="on"+o}function Wd(o,c){if(o.da)o=!0;else{c=new Pt(c,this);const h=o.listener,m=o.ha||o.src;o.fa&&Vi(o),o=h.call(m,c)}return o}function Pi(o){return o=o[bi],o instanceof rs?o:null}var Ci="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ua(o){return typeof o=="function"?o:(o[Ci]||(o[Ci]=function(c){return o.handleEvent(c)}),o[Ci])}function It(){w.call(this),this.i=new rs(this),this.M=this,this.G=null}g(It,w),It.prototype[Se]=!0,It.prototype.removeEventListener=function(o,c,h,m){La(this,o,c,h,m)};function At(o,c){var h,m=o.G;if(m)for(h=[];m;m=m.G)h.push(m);if(o=o.M,m=c.type||c,typeof c=="string")c=new T(c,o);else if(c instanceof T)c.target=c.target||o;else{var A=c;c=new T(m,o),Ma(c,A)}A=!0;let b,x;if(h)for(x=h.length-1;x>=0;x--)b=c.g=h[x],A=ss(b,m,!0,c)&&A;if(b=c.g=o,A=ss(b,m,!0,c)&&A,A=ss(b,m,!1,c)&&A,h)for(x=0;x<h.length;x++)b=c.g=h[x],A=ss(b,m,!1,c)&&A}It.prototype.N=function(){if(It.Z.N.call(this),this.i){var o=this.i;for(const c in o.g){const h=o.g[c];for(let m=0;m<h.length;m++)es(h[m]);delete o.g[c],o.h--}}this.G=null},It.prototype.J=function(o,c,h,m){return this.i.add(String(o),c,!1,h,m)},It.prototype.K=function(o,c,h,m){return this.i.add(String(o),c,!0,h,m)};function ss(o,c,h,m){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();let A=!0;for(let b=0;b<c.length;++b){const x=c[b];if(x&&!x.da&&x.capture==h){const z=x.listener,ft=x.ha||x.src;x.fa&&Ai(o.i,x),A=z.call(ft,m)!==!1&&A}}return A&&!m.defaultPrevented}function Jd(o,c){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(o,c||0)}function qa(o){o.g=Jd(()=>{o.g=null,o.i&&(o.i=!1,qa(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class Xd extends w{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:qa(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function qn(o){w.call(this),this.h=o,this.g={}}g(qn,w);var ja=[];function za(o){ns(o.g,function(c,h){this.g.hasOwnProperty(h)&&Vi(c)},o),o.g={}}qn.prototype.N=function(){qn.Z.N.call(this),za(this)},qn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Di=a.JSON.stringify,Yd=a.JSON.parse,Zd=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function $a(){}function Ka(){}var jn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function xi(){T.call(this,"d")}g(xi,T);function Ni(){T.call(this,"c")}g(Ni,T);var Ve={},Ga=null;function is(){return Ga=Ga||new It}Ve.Ia="serverreachability";function Qa(o){T.call(this,Ve.Ia,o)}g(Qa,T);function zn(o){const c=is();At(c,new Qa(c))}Ve.STAT_EVENT="statevent";function Ha(o,c){T.call(this,Ve.STAT_EVENT,o),this.stat=c}g(Ha,T);function Rt(o){const c=is();At(c,new Ha(c,o))}Ve.Ja="timingevent";function Wa(o,c){T.call(this,Ve.Ja,o),this.size=c}g(Wa,T);function $n(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},c)}function Kn(){this.g=!0}Kn.prototype.ua=function(){this.g=!1};function tf(o,c,h,m,A,b){o.info(function(){if(o.g)if(b){var x="",z=b.split("&");for(let et=0;et<z.length;et++){var ft=z[et].split("=");if(ft.length>1){const pt=ft[0];ft=ft[1];const zt=pt.split("_");x=zt.length>=2&&zt[1]=="type"?x+(pt+"="+ft+"&"):x+(pt+"=redacted&")}}}else x=null;else x=b;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+c+"\n"+h+"\n"+x})}function ef(o,c,h,m,A,b,x){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+c+"\n"+h+"\n"+b+" "+x})}function en(o,c,h,m){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+rf(o,h)+(m?" "+m:"")})}function nf(o,c){o.info(function(){return"TIMEOUT: "+c})}Kn.prototype.info=function(){};function rf(o,c){if(!o.g)return c;if(!c)return null;try{const b=JSON.parse(c);if(b){for(o=0;o<b.length;o++)if(Array.isArray(b[o])){var h=b[o];if(!(h.length<2)){var m=h[1];if(Array.isArray(m)&&!(m.length<1)){var A=m[0];if(A!="noop"&&A!="stop"&&A!="close")for(let x=1;x<m.length;x++)m[x]=""}}}}return Di(b)}catch(b){return c}}var os={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ja={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Xa;function ki(){}g(ki,$a),ki.prototype.g=function(){return new XMLHttpRequest},Xa=new ki;function Gn(o){return encodeURIComponent(String(o))}function sf(o){var c=1;o=o.split(":");const h=[];for(;c>0&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function oe(o,c,h,m){this.j=o,this.i=c,this.l=h,this.S=m||1,this.V=new qn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ya}function Ya(){this.i=null,this.g="",this.h=!1}var Za={},Oi={};function Mi(o,c,h){o.M=1,o.A=us(jt(c)),o.u=h,o.R=!0,tu(o,null)}function tu(o,c){o.F=Date.now(),as(o),o.B=jt(o.A);var h=o.B,m=o.S;Array.isArray(m)||(m=[String(m)]),fu(h.i,"t",m),o.C=0,h=o.j.L,o.h=new Ya,o.g=Du(o.j,h?c:null,!o.u),o.P>0&&(o.O=new Xd(d(o.Y,o,o.g),o.P)),c=o.V,h=o.g,m=o.ba;var A="readystatechange";Array.isArray(A)||(A&&(ja[0]=A.toString()),A=ja);for(let b=0;b<A.length;b++){const x=Fa(h,A[b],m||c.handleEvent,!1,c.h||c);if(!x)break;c.g[x.key]=x}c=o.J?ka(o.J):{},o.u?(o.v||(o.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,c)):(o.v="GET",o.g.ea(o.B,o.v,null,c)),zn(),tf(o.i,o.v,o.B,o.l,o.S,o.u)}oe.prototype.ba=function(o){o=o.target;const c=this.O;c&&ce(o)==3?c.j():this.Y(o)},oe.prototype.Y=function(o){try{if(o==this.g)t:{const z=ce(this.g),ft=this.g.ya(),et=this.g.ca();if(!(z<3)&&(z!=3||this.g&&(this.h.h||this.g.la()||Eu(this.g)))){this.K||z!=4||ft==7||(ft==8||et<=0?zn(3):zn(2)),Fi(this);var c=this.g.ca();this.X=c;var h=of(this);if(this.o=c==200,ef(this.i,this.v,this.B,this.l,this.S,z,c),this.o){if(this.U&&!this.L){e:{if(this.g){var m,A=this.g;if((m=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(m)){var b=m;break e}}b=null}if(o=b)en(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Li(this,o);else{this.o=!1,this.m=3,Rt(12),Pe(this),Qn(this);break t}}if(this.R){o=!0;let pt;for(;!this.K&&this.C<h.length;)if(pt=af(this,h),pt==Oi){z==4&&(this.m=4,Rt(14),o=!1),en(this.i,this.l,null,"[Incomplete Response]");break}else if(pt==Za){this.m=4,Rt(15),en(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else en(this.i,this.l,pt,null),Li(this,pt);if(eu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),z!=4||h.length!=0||this.h.h||(this.m=1,Rt(16),o=!1),this.o=this.o&&o,!o)en(this.i,this.l,h,"[Invalid Chunked Response]"),Pe(this),Qn(this);else if(h.length>0&&!this.W){this.W=!0;var x=this.j;x.g==this&&x.aa&&!x.P&&(x.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),Gi(x),x.P=!0,Rt(11))}}else en(this.i,this.l,h,null),Li(this,h);z==4&&Pe(this),this.o&&!this.K&&(z==4?Su(this.j,this):(this.o=!1,as(this)))}else Tf(this.g),c==400&&h.indexOf("Unknown SID")>0?(this.m=3,Rt(12)):(this.m=0,Rt(13)),Pe(this),Qn(this)}}}catch(z){}finally{}};function of(o){if(!eu(o))return o.g.la();const c=Eu(o.g);if(c==="")return"";let h="";const m=c.length,A=ce(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Pe(o),Qn(o),"";o.h.i=new a.TextDecoder}for(let b=0;b<m;b++)o.h.h=!0,h+=o.h.i.decode(c[b],{stream:!(A&&b==m-1)});return c.length=0,o.h.g+=h,o.C=0,o.h.g}function eu(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function af(o,c){var h=o.C,m=c.indexOf("\n",h);return m==-1?Oi:(h=Number(c.substring(h,m)),isNaN(h)?Za:(m+=1,m+h>c.length?Oi:(c=c.slice(m,m+h),o.C=m+h,c)))}oe.prototype.cancel=function(){this.K=!0,Pe(this)};function as(o){o.T=Date.now()+o.H,nu(o,o.H)}function nu(o,c){if(o.D!=null)throw Error("WatchDog timer not null");o.D=$n(d(o.aa,o),c)}function Fi(o){o.D&&(a.clearTimeout(o.D),o.D=null)}oe.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(nf(this.i,this.B),this.M!=2&&(zn(),Rt(17)),Pe(this),this.m=2,Qn(this)):nu(this,this.T-o)};function Qn(o){o.j.I==0||o.K||Su(o.j,o)}function Pe(o){Fi(o);var c=o.O;c&&typeof c.dispose=="function"&&c.dispose(),o.O=null,za(o.V),o.g&&(c=o.g,o.g=null,c.abort(),c.dispose())}function Li(o,c){try{var h=o.j;if(h.I!=0&&(h.g==o||Bi(h.h,o))){if(!o.L&&Bi(h.h,o)&&h.I==3){try{var m=h.Ba.g.parse(c)}catch(et){m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){t:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)fs(h),hs(h);else break t;Ki(h),Rt(18)}}else h.xa=A[1],0<h.xa-h.K&&A[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=$n(d(h.Va,h),6e3));iu(h.h)<=1&&h.ta&&(h.ta=void 0)}else De(h,11)}else if((o.L||h.g==o)&&fs(h),!_(c))for(A=h.Ba.g.parse(c),c=0;c<A.length;c++){let et=A[c];const pt=et[0];if(!(pt<=h.K))if(h.K=pt,et=et[1],h.I==2)if(et[0]=="c"){h.M=et[1],h.ba=et[2];const zt=et[3];zt!=null&&(h.ka=zt,h.j.info("VER="+h.ka));const xe=et[4];xe!=null&&(h.za=xe,h.j.info("SVER="+h.za));const le=et[5];le!=null&&typeof le=="number"&&le>0&&(m=1.5*le,h.O=m,h.j.info("backChannelRequestTimeoutMs_="+m)),m=h;const he=o.g;if(he){const gs=he.g?he.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(gs){var b=m.h;b.g||gs.indexOf("spdy")==-1&&gs.indexOf("quic")==-1&&gs.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(Ui(b,b.h),b.h=null))}if(m.G){const Qi=he.g?he.g.getResponseHeader("X-HTTP-Session-Id"):null;Qi&&(m.wa=Qi,rt(m.J,m.G,Qi))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),m=h;var x=o;if(m.na=Cu(m,m.L?m.ba:null,m.W),x.L){ou(m.h,x);var z=x,ft=m.O;ft&&(z.H=ft),z.D&&(Fi(z),as(z)),m.g=x}else Ru(m);h.i.length>0&&ds(h)}else et[0]!="stop"&&et[0]!="close"||De(h,7);else h.I==3&&(et[0]=="stop"||et[0]=="close"?et[0]=="stop"?De(h,7):$i(h):et[0]!="noop"&&h.l&&h.l.qa(et),h.A=0)}}zn(4)}catch(et){}}var uf=class{constructor(o,c){this.g=o,this.map=c}};function ru(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function su(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function iu(o){return o.h?1:o.g?o.g.size:0}function Bi(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Ui(o,c){o.g?o.g.add(c):o.h=c}function ou(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}ru.prototype.cancel=function(){if(this.i=au(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function au(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.G);return c}return S(o.i)}var uu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function cf(o,c){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const m=o[h].indexOf("=");let A,b=null;m>=0?(A=o[h].substring(0,m),b=o[h].substring(m+1)):A=o[h],c(A,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function ae(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;o instanceof ae?(this.l=o.l,Hn(this,o.j),this.o=o.o,this.g=o.g,Wn(this,o.u),this.h=o.h,qi(this,mu(o.i)),this.m=o.m):o&&(c=String(o).match(uu))?(this.l=!1,Hn(this,c[1]||"",!0),this.o=Jn(c[2]||""),this.g=Jn(c[3]||"",!0),Wn(this,c[4]),this.h=Jn(c[5]||"",!0),qi(this,c[6]||"",!0),this.m=Jn(c[7]||"")):(this.l=!1,this.i=new Yn(null,this.l))}ae.prototype.toString=function(){const o=[];var c=this.j;c&&o.push(Xn(c,cu,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(Xn(c,cu,!0),"@"),o.push(Gn(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Xn(h,h.charAt(0)=="/"?df:hf,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Xn(h,mf)),o.join("")},ae.prototype.resolve=function(o){const c=jt(this);let h=!!o.j;h?Hn(c,o.j):h=!!o.o,h?c.o=o.o:h=!!o.g,h?c.g=o.g:h=o.u!=null;var m=o.h;if(h)Wn(c,o.u);else if(h=!!o.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var A=c.h.lastIndexOf("/");A!=-1&&(m=c.h.slice(0,A+1)+m)}if(A=m,A==".."||A==".")m="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){m=A.lastIndexOf("/",0)==0,A=A.split("/");const b=[];for(let x=0;x<A.length;){const z=A[x++];z=="."?m&&x==A.length&&b.push(""):z==".."?((b.length>1||b.length==1&&b[0]!="")&&b.pop(),m&&x==A.length&&b.push("")):(b.push(z),m=!0)}m=b.join("/")}else m=A}return h?c.h=m:h=o.i.toString()!=="",h?qi(c,mu(o.i)):h=!!o.m,h&&(c.m=o.m),c};function jt(o){return new ae(o)}function Hn(o,c,h){o.j=h?Jn(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Wn(o,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);o.u=c}else o.u=null}function qi(o,c,h){c instanceof Yn?(o.i=c,gf(o.i,o.l)):(h||(c=Xn(c,ff)),o.i=new Yn(c,o.l))}function rt(o,c,h){o.i.set(c,h)}function us(o){return rt(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Jn(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Xn(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,lf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function lf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var cu=/[#\/\?@]/g,hf=/[#\?:]/g,df=/[#\?]/g,ff=/[#\?@]/g,mf=/#/g;function Yn(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function Ce(o){o.g||(o.g=new Map,o.h=0,o.i&&cf(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}r=Yn.prototype,r.add=function(o,c){Ce(this),this.i=null,o=nn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function lu(o,c){Ce(o),c=nn(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function hu(o,c){return Ce(o),c=nn(o,c),o.g.has(c)}r.forEach=function(o,c){Ce(this),this.g.forEach(function(h,m){h.forEach(function(A){o.call(c,A,m,this)},this)},this)};function du(o,c){Ce(o);let h=[];if(typeof c=="string")hu(o,c)&&(h=h.concat(o.g.get(nn(o,c))));else for(o=Array.from(o.g.values()),c=0;c<o.length;c++)h=h.concat(o[c]);return h}r.set=function(o,c){return Ce(this),this.i=null,o=nn(this,o),hu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},r.get=function(o,c){return o?(o=du(this,o),o.length>0?String(o[0]):c):c};function fu(o,c,h){lu(o,c),h.length>0&&(o.i=null,o.g.set(nn(o,c),S(h)),o.h+=h.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(let m=0;m<c.length;m++){var h=c[m];const A=Gn(h);h=du(this,h);for(let b=0;b<h.length;b++){let x=A;h[b]!==""&&(x+="="+Gn(h[b])),o.push(x)}}return this.i=o.join("&")};function mu(o){const c=new Yn;return c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),c}function nn(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function gf(o,c){c&&!o.j&&(Ce(o),o.i=null,o.g.forEach(function(h,m){const A=m.toLowerCase();m!=A&&(lu(this,m),fu(this,A,h))},o)),o.j=c}function pf(o,c){const h=new Kn;if(a.Image){const m=new Image;m.onload=f(ue,h,"TestLoadImage: loaded",!0,c,m),m.onerror=f(ue,h,"TestLoadImage: error",!1,c,m),m.onabort=f(ue,h,"TestLoadImage: abort",!1,c,m),m.ontimeout=f(ue,h,"TestLoadImage: timeout",!1,c,m),a.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else c(!1)}function _f(o,c){const h=new Kn,m=new AbortController,A=setTimeout(()=>{m.abort(),ue(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:m.signal}).then(b=>{clearTimeout(A),b.ok?ue(h,"TestPingServer: ok",!0,c):ue(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(A),ue(h,"TestPingServer: error",!1,c)})}function ue(o,c,h,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(h)}catch(b){}}function yf(){this.g=new Zd}function ji(o){this.i=o.Sb||null,this.h=o.ab||!1}g(ji,$a),ji.prototype.g=function(){return new cs(this.i,this.h)};function cs(o,c){It.call(this),this.H=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}g(cs,It),r=cs.prototype,r.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=c,this.readyState=1,tr(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(c.body=o),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Zn(this)),this.readyState=0},r.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,tr(this)),this.g&&(this.readyState=3,tr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;gu(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function gu(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}r.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Zn(this):tr(this),this.readyState==3&&gu(this)}},r.Oa=function(o){this.g&&(this.response=this.responseText=o,Zn(this))},r.Na=function(o){this.g&&(this.response=o,Zn(this))},r.ga=function(){this.g&&Zn(this)};function Zn(o){o.readyState=4,o.l=null,o.j=null,o.B=null,tr(o)}r.setRequestHeader=function(o,c){this.A.append(o,c)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join("\r\n")};function tr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(cs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function pu(o){let c="";return ns(o,function(h,m){c+=m,c+=":",c+=h,c+="\r\n"}),c}function zi(o,c,h){t:{for(m in h){var m=!1;break t}m=!0}m||(h=pu(h),typeof o=="string"?h!=null&&Gn(h):rt(o,c,h))}function at(o){It.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}g(at,It);var If=/^https?$/i,Ef=["POST","PUT"];r=at.prototype,r.Fa=function(o){this.H=o},r.ea=function(o,c,h,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Xa.g(),this.g.onreadystatechange=I(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(b){_u(this,b);return}if(o=h||"",h=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)h.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const b of m.keys())h.set(b,m.get(b));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(h.keys()).find(b=>b.toLowerCase()=="content-type"),A=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Ef,c,void 0)>=0)||m||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,x]of h)this.g.setRequestHeader(b,x);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(b){_u(this,b)}};function _u(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.o=5,yu(o),ls(o)}function yu(o){o.A||(o.A=!0,At(o,"complete"),At(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,At(this,"complete"),At(this,"abort"),ls(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ls(this,!0)),at.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Iu(this):this.Xa())},r.Xa=function(){Iu(this)};function Iu(o){if(o.h&&typeof i<"u"){if(o.v&&ce(o)==4)setTimeout(o.Ca.bind(o),0);else if(At(o,"readystatechange"),ce(o)==4){o.h=!1;try{const b=o.ca();t:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var h;if(!(h=c)){var m;if(m=b===0){let x=String(o.D).match(uu)[1]||null;!x&&a.self&&a.self.location&&(x=a.self.location.protocol.slice(0,-1)),m=!If.test(x?x.toLowerCase():"")}h=m}if(h)At(o,"complete"),At(o,"success");else{o.o=6;try{var A=ce(o)>2?o.g.statusText:""}catch(x){A=""}o.l=A+" ["+o.ca()+"]",yu(o)}}finally{ls(o)}}}}function ls(o,c){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,c||At(o,"ready");try{h.onreadystatechange=null}catch(m){}}}r.isActive=function(){return!!this.g};function ce(o){return o.g?o.g.readyState:0}r.ca=function(){try{return ce(this)>2?this.g.status:-1}catch(o){return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch(o){return""}},r.La=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),Yd(c)}};function Eu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch(c){return null}}function Tf(o){const c={};o=(o.g&&ce(o)>=2&&o.g.getAllResponseHeaders()||"").split("\r\n");for(let m=0;m<o.length;m++){if(_(o[m]))continue;var h=sf(o[m]);const A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const b=c[A]||[];c[A]=b,b.push(h)}Gd(c,function(m){return m.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function er(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function Tu(o){this.za=0,this.i=[],this.j=new Kn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=er("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=er("baseRetryDelayMs",5e3,o),this.Za=er("retryDelaySeedMs",1e4,o),this.Ta=er("forwardChannelMaxRetries",2,o),this.va=er("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new ru(o&&o.concurrentRequestLimit),this.Ba=new yf,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Tu.prototype,r.ka=8,r.I=1,r.connect=function(o,c,h,m){Rt(0),this.W=o,this.H=c||{},h&&m!==void 0&&(this.H.OSID=h,this.H.OAID=m),this.F=this.X,this.J=Cu(this,null,this.W),ds(this)};function $i(o){if(wu(o),o.I==3){var c=o.V++,h=jt(o.J);if(rt(h,"SID",o.M),rt(h,"RID",c),rt(h,"TYPE","terminate"),nr(o,h),c=new oe(o,o.j,c),c.M=2,c.A=us(jt(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(c.A.toString(),"")}catch(m){}!h&&a.Image&&(new Image().src=c.A,h=!0),h||(c.g=Du(c.j,null),c.g.ea(c.A)),c.F=Date.now(),as(c)}Pu(o)}function hs(o){o.g&&(Gi(o),o.g.cancel(),o.g=null)}function wu(o){hs(o),o.v&&(a.clearTimeout(o.v),o.v=null),fs(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function ds(o){if(!su(o.h)&&!o.m){o.m=!0;var c=o.Ea;W||p(),J||(W(),J=!0),E.add(c,o),o.D=0}}function wf(o,c){return iu(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=c.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=$n(d(o.Ea,o,c),Vu(o,o.D)),o.D++,!0)}r.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const A=new oe(this,this.j,o);let b=this.o;if(this.U&&(b?(b=ka(b),Ma(b,this.U)):b=this.U),this.u!==null||this.R||(A.J=b,b=null),this.S)t:{for(var c=0,h=0;h<this.i.length;h++){e:{var m=this.i[h];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break e}m=void 0}if(m===void 0)break;if(c+=m,c>4096){c=h;break t}if(c===4096||h===this.i.length-1){c=h+1;break t}}c=1e3}else c=1e3;c=Au(this,A,c),h=jt(this.J),rt(h,"RID",o),rt(h,"CVER",22),this.G&&rt(h,"X-HTTP-Session-Id",this.G),nr(this,h),b&&(this.R?c="headers="+Gn(pu(b))+"&"+c:this.u&&zi(h,this.u,b)),Ui(this.h,A),this.Ra&&rt(h,"TYPE","init"),this.S?(rt(h,"$req",c),rt(h,"SID","null"),A.U=!0,Mi(A,h,null)):Mi(A,h,c),this.I=2}}else this.I==3&&(o?vu(this,o):this.i.length==0||su(this.h)||vu(this))};function vu(o,c){var h;c?h=c.l:h=o.V++;const m=jt(o.J);rt(m,"SID",o.M),rt(m,"RID",h),rt(m,"AID",o.K),nr(o,m),o.u&&o.o&&zi(m,o.u,o.o),h=new oe(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),c&&(o.i=c.G.concat(o.i)),c=Au(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Ui(o.h,h),Mi(h,m,c)}function nr(o,c){o.H&&ns(o.H,function(h,m){rt(c,m,h)}),o.l&&ns({},function(h,m){rt(c,m,h)})}function Au(o,c,h){h=Math.min(o.i.length,h);const m=o.l?d(o.l.Ka,o.l,o):null;t:{var A=o.i;let z=-1;for(;;){const ft=["count="+h];z==-1?h>0?(z=A[0].g,ft.push("ofs="+z)):z=0:ft.push("ofs="+z);let et=!0;for(let pt=0;pt<h;pt++){var b=A[pt].g;const zt=A[pt].map;if(b-=z,b<0)z=Math.max(0,A[pt].g-100),et=!1;else try{b="req"+b+"_"||"";try{var x=zt instanceof Map?zt:Object.entries(zt);for(const[xe,le]of x){let he=le;u(le)&&(he=Di(le)),ft.push(b+xe+"="+encodeURIComponent(he))}}catch(xe){throw ft.push(b+"type="+encodeURIComponent("_badmap")),xe}}catch(xe){m&&m(zt)}}if(et){x=ft.join("&");break t}}x=void 0}return o=o.i.splice(0,h),c.G=o,x}function Ru(o){if(!o.g&&!o.v){o.Y=1;var c=o.Da;W||p(),J||(W(),J=!0),E.add(c,o),o.A=0}}function Ki(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=$n(d(o.Da,o),Vu(o,o.A)),o.A++,!0)}r.Da=function(){if(this.v=null,bu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=$n(d(this.Wa,this),o)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Rt(10),hs(this),bu(this))};function Gi(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function bu(o){o.g=new oe(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var c=jt(o.na);rt(c,"RID","rpc"),rt(c,"SID",o.M),rt(c,"AID",o.K),rt(c,"CI",o.F?"0":"1"),!o.F&&o.ia&&rt(c,"TO",o.ia),rt(c,"TYPE","xmlhttp"),nr(o,c),o.u&&o.o&&zi(c,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=us(jt(c)),h.u=null,h.R=!0,tu(h,o)}r.Va=function(){this.C!=null&&(this.C=null,hs(this),Ki(this),Rt(19))};function fs(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Su(o,c){var h=null;if(o.g==c){fs(o),Gi(o),o.g=null;var m=2}else if(Bi(o.h,c))h=c.G,ou(o.h,c),m=1;else return;if(o.I!=0){if(c.o)if(m==1){h=c.u?c.u.length:0,c=Date.now()-c.F;var A=o.D;m=is(),At(m,new Wa(m,h)),ds(o)}else Ru(o);else if(A=c.m,A==3||A==0&&c.X>0||!(m==1&&wf(o,c)||m==2&&Ki(o)))switch(h&&h.length>0&&(c=o.h,c.i=c.i.concat(h)),A){case 1:De(o,5);break;case 4:De(o,10);break;case 3:De(o,6);break;default:De(o,2)}}}function Vu(o,c){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*c}function De(o,c){if(o.j.info("Error code "+c),c==2){var h=d(o.bb,o),m=o.Ua;const A=!m;m=new ae(m||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Hn(m,"https"),us(m),A?pf(m.toString(),h):_f(m.toString(),h)}else Rt(2);o.I=0,o.l&&o.l.pa(c),Pu(o),wu(o)}r.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Rt(2)):(this.j.info("Failed to ping google.com"),Rt(1))};function Pu(o){if(o.I=0,o.ja=[],o.l){const c=au(o.h);(c.length!=0||o.i.length!=0)&&(D(o.ja,c),D(o.ja,o.i),o.h.i.length=0,S(o.i),o.i.length=0),o.l.oa()}}function Cu(o,c,h){var m=h instanceof ae?jt(h):new ae(h);if(m.g!="")c&&(m.g=c+"."+m.g),Wn(m,m.u);else{var A=a.location;m=A.protocol,c=c?c+"."+A.hostname:A.hostname,A=+A.port;const b=new ae(null);m&&Hn(b,m),c&&(b.g=c),A&&Wn(b,A),h&&(b.h=h),m=b}return h=o.G,c=o.wa,h&&c&&rt(m,h,c),rt(m,"VER",o.ka),nr(o,m),m}function Du(o,c,h){if(c&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Aa&&!o.ma?new at(new ji({ab:h})):new at(o.ma),c.Fa(o.L),c}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function xu(){}r=xu.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function ms(){}ms.prototype.g=function(o,c){return new xt(o,c)};function xt(o,c){It.call(this),this.g=new Tu(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(o?o["X-WebChannel-Client-Profile"]=c.sa:o={"X-WebChannel-Client-Profile":c.sa}),this.g.U=o,(o=c&&c.Qb)&&!_(o)&&(this.g.u=o),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!_(c)&&(this.g.G=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new rn(this)}g(xt,It),xt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},xt.prototype.close=function(){$i(this.g)},xt.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=Di(o),o=h);c.i.push(new uf(c.Ya++,o)),c.I==3&&ds(c)},xt.prototype.N=function(){this.g.l=null,delete this.j,$i(this.g),delete this.g,xt.Z.N.call(this)};function Nu(o){xi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){t:{for(const h in c){o=h;break t}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}g(Nu,xi);function ku(){Ni.call(this),this.status=1}g(ku,Ni);function rn(o){this.g=o}g(rn,xu),rn.prototype.ra=function(){At(this.g,"a")},rn.prototype.qa=function(o){At(this.g,new Nu(o))},rn.prototype.pa=function(o){At(this.g,new ku)},rn.prototype.oa=function(){At(this.g,"b")},ms.prototype.createWebChannel=ms.prototype.g,xt.prototype.send=xt.prototype.o,xt.prototype.open=xt.prototype.m,xt.prototype.close=xt.prototype.close,Ol=function(){return new ms},kl=function(){return is()},Nl=Ve,lo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},os.NO_ERROR=0,os.TIMEOUT=8,os.HTTP_ERROR=6,vs=os,Ja.COMPLETE="complete",xl=Ja,Ka.EventType=jn,jn.OPEN="a",jn.CLOSE="b",jn.ERROR="c",jn.MESSAGE="d",It.prototype.listen=It.prototype.J,lr=Ka,at.prototype.listenOnce=at.prototype.K,at.prototype.getLastError=at.prototype.Ha,at.prototype.getLastErrorCode=at.prototype.ya,at.prototype.getStatus=at.prototype.ca,at.prototype.getResponseJson=at.prototype.La,at.prototype.getResponseText=at.prototype.la,at.prototype.send=at.prototype.ea,at.prototype.setWithCredentials=at.prototype.Fa,Dl=at}).apply(typeof ps<"u"?ps:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class bt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}bt.UNAUTHENTICATED=new bt(null),bt.GOOGLE_CREDENTIALS=new bt("google-credentials-uid"),bt.FIRST_PARTY=new bt("first-party-uid"),bt.MOCK_USER=new bt("mock-user");/**
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
 */let Fn="12.14.0";function Jm(r){Fn=r}/**
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
 */const He=new Rl("@firebase/firestore");function hn(){return He.logLevel}function P(r,...t){if(He.logLevel<=H.DEBUG){const e=t.map(Mo);He.debug("Firestore (".concat(Fn,"): ").concat(r),...e)}}function St(r,...t){if(He.logLevel<=H.ERROR){const e=t.map(Mo);He.error("Firestore (".concat(Fn,"): ").concat(r),...e)}}function In(r,...t){if(He.logLevel<=H.WARN){const e=t.map(Mo);He.warn("Firestore (".concat(Fn,"): ").concat(r),...e)}}function Mo(r){if(typeof r=="string")return r;try{return function(e){return JSON.stringify(e)}(r)}catch(t){return r}}/**
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
 */function M(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,Ml(r,n,e)}function Ml(r,t,e){let n="FIRESTORE (".concat(Fn,") INTERNAL ASSERTION FAILED: ").concat(t," (ID: ").concat(r.toString(16),")");if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch(s){n+=" CONTEXT: "+e}throw St(n),new Error(n)}function F(r,t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,r||Ml(t,s,n)}function q(r,t){return r}/**
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
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class C extends Mn{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>"".concat(this.name,": [code=").concat(this.code,"]: ").concat(this.message)}}/**
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
 */class Ht{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
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
 */class Xm{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization","Bearer ".concat(t))}}class Ym{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(bt.UNAUTHENTICATED))}shutdown(){}}class Zm{constructor(t){this.t=t,this.currentUser=bt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){F(this.o===void 0,42304);let n=this.i;const s=l=>this.i!==n?(n=this.i,e(l)):Promise.resolve();let i=new Ht;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ht,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=i;t.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},u=l=>{P("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>u(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?u(l):(P("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ht)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(P("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(F(typeof n.accessToken=="string",31837,{l:n}),new Xm(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return F(t===null||typeof t=="string",2055,{h:t}),new bt(t)}}class tg{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=bt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class eg{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new tg(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(bt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Gu{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ng{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Mm(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){F(this.o===void 0,3512);const n=i=>{i.error!=null&&P("FirebaseAppCheckTokenProvider","Error getting App Check token; using placeholder token instead. Error: ".concat(i.error.message));const a=i.token!==this.m;return this.m=i.token,P("FirebaseAppCheckTokenProvider","Received ".concat(a?"new":"existing"," token.")),a?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable(()=>n(i))};const s=i=>{P("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):P("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Gu(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(F(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Gu(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function rg(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
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
 */class Fo{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=rg(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%62))}return n}}function B(r,t){return r<t?-1:r>t?1:0}function ho(r,t){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++){const s=r.charAt(n),i=t.charAt(n);if(s!==i)return Yi(s)===Yi(i)?B(s,i):Yi(s)?1:-1}return B(r.length,t.length)}const sg=55296,ig=57343;function Yi(r){const t=r.charCodeAt(0);return t>=sg&&t<=ig}function En(r,t,e){return r.length===t.length&&r.every((n,s)=>e(n,t[s]))}function Fl(r){return r+"\0"}/**
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
 */const Qu="__name__";class $t{constructor(t,e,n){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&M(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return $t.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof $t?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const i=$t.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return B(t.length,e.length)}static compareSegments(t,e){const n=$t.isNumericId(t),s=$t.isNumericId(e);return n&&!s?-1:!n&&s?1:n&&s?$t.extractNumericId(t).compare($t.extractNumericId(e)):ho(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return ye.fromString(t.substring(4,t.length-2))}}class X extends $t{construct(t,e,n){return new X(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new C(V.INVALID_ARGUMENT,"Invalid segment (".concat(n,"). Paths must not contain // in them."));e.push(...n.split("/").filter(s=>s.length>0))}return new X(e)}static emptyPath(){return new X([])}}const og=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ot extends $t{construct(t,e,n){return new ot(t,e,n)}static isValidIdentifier(t){return og.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ot.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Qu}static keyField(){return new ot([Qu])}static fromServerFormat(t){const e=[];let n="",s=0;const i=()=>{if(n.length===0)throw new C(V.INVALID_ARGUMENT,"Invalid field path (".concat(t,"). Paths must not be empty, begin with '.', end with '.', or contain '..'"));e.push(n),n=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new C(V.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const l=t[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new C(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=l,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(n+=u,s++):(i(),s++)}if(i(),a)throw new C(V.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ot(e)}static emptyPath(){return new ot([])}}/**
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
 */class O{constructor(t){this.path=t}static fromPath(t){return new O(X.fromString(t))}static fromName(t){return new O(X.fromString(t).popFirst(5))}static empty(){return new O(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&X.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return X.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new O(new X(t.slice()))}}/**
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
 */function Ll(r,t,e){if(!e)throw new C(V.INVALID_ARGUMENT,"Function ".concat(r,"() cannot be called with an empty ").concat(t,"."))}function ag(r,t,e,n){if(t===!0&&n===!0)throw new C(V.INVALID_ARGUMENT,"".concat(r," and ").concat(e," cannot be used together."))}function Hu(r){if(!O.isDocumentKey(r))throw new C(V.INVALID_ARGUMENT,"Invalid document reference. Document references must have an even number of segments, but ".concat(r," has ").concat(r.length,"."))}function Wu(r){if(O.isDocumentKey(r))throw new C(V.INVALID_ARGUMENT,"Invalid collection reference. Collection references must have an odd number of segments, but ".concat(r," has ").concat(r.length,"."))}function Bl(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function si(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r="".concat(r.substring(0,20),"...")),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?"a custom ".concat(t," object"):"an object"}}return typeof r=="function"?"a function":M(12329,{type:typeof r})}function Dt(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new C(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=si(r);throw new C(V.INVALID_ARGUMENT,"Expected type '".concat(t.name,"', but it was: ").concat(e))}}return r}/**
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
 */function ht(r,t){const e={typeString:r};return t&&(e.value=t),e}function Ur(r,t){if(!Bl(r))throw new C(V.INVALID_ARGUMENT,"JSON must be an object");let e;for(const n in t)if(t[n]){const s=t[n].typeString,i="value"in t[n]?{value:t[n].value}:void 0;if(!(n in r)){e="JSON missing required field: '".concat(n,"'");break}const a=r[n];if(s&&typeof a!==s){e="JSON field '".concat(n,"' must be a ").concat(s,".");break}if(i!==void 0&&a!==i.value){e="Expected '".concat(n,"' field to equal '").concat(i.value,"'");break}}if(e)throw new C(V.INVALID_ARGUMENT,e);return!0}/**
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
 */const Ju=-62135596800,Xu=1e6;class Y{static now(){return Y.fromMillis(Date.now())}static fromDate(t){return Y.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Xu);return new Y(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new C(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new C(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Ju)throw new C(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new C(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Xu}_compareTo(t){return this.seconds===t.seconds?B(this.nanoseconds,t.nanoseconds):B(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Y._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Ur(t,Y._jsonSchema))return new Y(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Ju;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Y._jsonSchemaVersion="firestore/timestamp/1.0",Y._jsonSchema={type:ht("string",Y._jsonSchemaVersion),seconds:ht("number"),nanoseconds:ht("number")};/**
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
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new Y(0,0))}static max(){return new L(new Y(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Rr=-1;class Bs{constructor(t,e,n,s){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=s}}function fo(r){return r.fields.find(t=>t.kind===2)}function Oe(r){return r.fields.filter(t=>t.kind!==2)}Bs.UNKNOWN_ID=-1;class As{constructor(t,e){this.fieldPath=t,this.kind=e}}class br{constructor(t,e){this.sequenceNumber=t,this.offset=e}static empty(){return new br(0,Ot.min())}}function ug(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=L.fromTimestamp(n===1e9?new Y(e+1,0):new Y(e,n));return new Ot(s,O.empty(),t)}function Ul(r){return new Ot(r.readTime,r.key,Rr)}class Ot{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Ot(L.min(),O.empty(),Rr)}static max(){return new Ot(L.max(),O.empty(),Rr)}}function Lo(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=O.comparator(r.documentKey,t.documentKey),e!==0?e:B(r.largestBatchId,t.largestBatchId))}/**
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
 */const ql="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class jl{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
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
 */async function Ze(r){if(r.code!==V.FAILED_PRECONDITION||r.message!==ql)throw r;P("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class v{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new v((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(n,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof v?e:v.resolve(e)}catch(e){return v.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):v.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):v.reject(e)}static resolve(t){return new v((e,n)=>{e(t)})}static reject(t){return new v((e,n)=>{n(t)})}static waitFor(t){return new v((e,n)=>{let s=0,i=0,a=!1;t.forEach(u=>{++s,u.next(()=>{++i,a&&i===s&&e()},l=>n(l))}),a=!0,i===s&&e()})}static or(t){let e=v.resolve(!1);for(const n of t)e=e.next(s=>s?v.resolve(s):n());return e}static forEach(t,e){const n=[];return t.forEach((s,i)=>{n.push(e.call(this,s,i))}),this.waitFor(n)}static mapArray(t,e){return new v((n,s)=>{const i=t.length,a=new Array(i);let u=0;for(let l=0;l<i;l++){const d=l;e(t[d]).next(f=>{a[d]=f,++u,u===i&&n(a)},f=>s(f))}})}static doWhile(t,e){return new v((n,s)=>{const i=()=>{t()===!0?e().next(()=>{i()},s):n()};i()})}}/**
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
 */const Nt="SimpleDb";class ii{static open(t,e,n,s){try{return new ii(e,t.transaction(s,n))}catch(i){throw new gr(e,i)}}constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.S=new Ht,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{e.error?this.S.reject(new gr(t,e.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=Bo(n.target.error);this.S.reject(new gr(t,s))}}get D(){return this.S.promise}abort(t){t&&this.S.reject(t),this.aborted||(P(Nt,"Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const e=this.transaction.objectStore(t);return new lg(e)}}class Ie{static delete(t){return P(Nt,"Removing database:",t),Fe(_l().indexedDB.deleteDatabase(t)).toPromise()}static v(){if(!wl())return!1;if(Ie.F())return!0;const t=Os(),e=Ie.M(t),n=0<e&&e<10,s=zl(t),i=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static F(){var t;return typeof process<"u"&&((t=process.__PRIVATE_env)==null?void 0:t.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(t,e){return t.store(e)}static M(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(t,e,n){this.name=t,this.version=e,this.N=n,this.B=null,Ie.M(Os())===12.2&&St("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(t){return this.db||(P(Nt,"Opening database:",this.name),this.db=await new Promise((e,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;e(a)},s.onblocked=()=>{n(new gr(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?n(new C(V.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new C(V.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new gr(t,a))},s.onupgradeneeded=i=>{P(Nt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;this.N.k(a,s.transaction,i.oldVersion,this.version).next(()=>{P(Nt,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}K(t){this.q=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,s){const i=e==="readonly";let a=0;for(;;){++a;try{this.db=await this.L(t);const u=ii.open(this.db,t,i?"readonly":"readwrite",n),l=s(u).next(d=>(u.C(),d)).catch(d=>(u.abort(d),v.reject(d))).toPromise();return l.catch(()=>{}),await u.D,l}catch(u){const l=u,d=l.name!=="FirebaseError"&&a<3;if(P(Nt,"Transaction failed with error:",l.message,"Retrying:",d),this.close(),!d)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function zl(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}class cg{constructor(t){this.U=t,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(t){this.U=t}done(){this.$=!0}j(t){this.W=t}delete(){return Fe(this.U.delete())}}class gr extends C{constructor(t,e){super(V.UNAVAILABLE,"IndexedDB transaction '".concat(t,"' failed: ").concat(e)),this.name="IndexedDbTransactionError"}}function Re(r){return r.name==="IndexedDbTransactionError"}class lg{constructor(t){this.store=t}put(t,e){let n;return e!==void 0?(P(Nt,"PUT",this.store.name,t,e),n=this.store.put(e,t)):(P(Nt,"PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),Fe(n)}add(t){return P(Nt,"ADD",this.store.name,t,t),Fe(this.store.add(t))}get(t){return Fe(this.store.get(t)).next(e=>(e===void 0&&(e=null),P(Nt,"GET",this.store.name,t,e),e))}delete(t){return P(Nt,"DELETE",this.store.name,t),Fe(this.store.delete(t))}count(){return P(Nt,"COUNT",this.store.name),Fe(this.store.count())}J(t,e){const n=this.options(t,e),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new v((a,u)=>{i.onerror=l=>{u(l.target.error)},i.onsuccess=l=>{a(l.target.result)}})}{const i=this.cursor(n),a=[];return this.H(i,(u,l)=>{a.push(l)}).next(()=>a)}}Z(t,e){const n=this.store.getAll(t,e===null?void 0:e);return new v((s,i)=>{n.onerror=a=>{i(a.target.error)},n.onsuccess=a=>{s(a.target.result)}})}X(t,e){P(Nt,"DELETE ALL",this.store.name);const n=this.options(t,e);n.Y=!1;const s=this.cursor(n);return this.H(s,(i,a,u)=>u.delete())}ee(t,e){let n;e?n=t:(n={},e=t);const s=this.cursor(n);return this.H(s,e)}te(t){const e=this.cursor({});return new v((n,s)=>{e.onerror=i=>{const a=Bo(i.target.error);s(a)},e.onsuccess=i=>{const a=i.target.result;a?t(a.primaryKey,a.value).next(u=>{u?a.continue():n()}):n()}})}H(t,e){const n=[];return new v((s,i)=>{t.onerror=a=>{i(a.target.error)},t.onsuccess=a=>{const u=a.target.result;if(!u)return void s();const l=new cg(u),d=e(u.primaryKey,u.value,l);if(d instanceof v){const f=d.catch(g=>(l.done(),v.reject(g)));n.push(f)}l.isDone?s():l.G===null?u.continue():u.continue(l.G)}}).next(()=>v.waitFor(n))}options(t,e){let n;return t!==void 0&&(typeof t=="string"?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.Y?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function Fe(r){return new v((t,e)=>{r.onsuccess=n=>{const s=n.target.result;t(s)},r.onerror=n=>{const s=Bo(n.target.error);e(s)}})}let Yu=!1;function Bo(r){const t=Ie.M(Os());if(t>=12.2&&t<13){const e="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(e)>=0){const n=new C("internal","IOS_INDEXEDDB_BUG1: IndexedDb has thrown '".concat(e,"'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround."));return Yu||(Yu=!0,setTimeout(()=>{throw n},0)),n}}return r}const pr="IndexBackfiller";class hg{constructor(t,e){this.asyncQueue=t,this.ne=e,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(t){P(pr,"Scheduled in ".concat(t,"ms")),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",t,async()=>{this.task=null;try{const e=await this.ne.ie();P(pr,"Documents written: ".concat(e))}catch(e){Re(e)?P(pr,"Ignoring IndexedDB error during index backfill: ",e):await Ze(e)}await this.re(6e4)})}}class dg{constructor(t,e){this.localStore=t,this.persistence=e}async ie(t=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",e=>this.se(e,t))}se(t,e){const n=new Set;let s=e,i=!0;return v.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next(a=>{if(a!==null&&!n.has(a))return P(pr,"Processing collection: ".concat(a)),this.oe(t,a,s).next(u=>{s-=u,n.add(a)});i=!1})).next(()=>e-s)}oe(t,e,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t,e).next(s=>this.localStore.localDocuments.getNextDocuments(t,e,s,n).next(i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(t,a).next(()=>this._e(s,i)).next(u=>(P(pr,"Updating offset: ".concat(u)),this.localStore.indexManager.updateCollectionGroup(t,e,u))).next(()=>a.size)}))}_e(t,e){let n=t;return e.changes.forEach((s,i)=>{const a=Ul(i);Lo(a,n)>0&&(n=a)}),new Ot(n.readTime,n.documentKey,Math.max(e.batchId,t.largestBatchId))}}/**
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
 */class Ft{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>e.writeSequenceNumber(n))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Ft.ce=-1;/**
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
 */const ze=-1;function oi(r){return r==null}function Sr(r){return r===0&&1/r==-1/0}function fg(r){return typeof r=="number"&&Number.isInteger(r)&&!Sr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */const Us="";function vt(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=Zu(t)),t=mg(r.get(e),t);return Zu(t)}function mg(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":e+="";break;case Us:e+="";break;default:e+=i}}return e}function Zu(r){return r+Us+""}function Kt(r){const t=r.length;if(F(t>=2,64408,{path:r}),t===2)return F(r.charAt(0)===Us&&r.charAt(1)==="",56145,{path:r}),X.emptyPath();const e=t-2,n=[];let s="";for(let i=0;i<t;){const a=r.indexOf(Us,i);switch((a<0||a>e)&&M(50515,{path:r}),r.charAt(a+1)){case"":const u=r.substring(i,a);let l;s.length===0?l=u:(s+=u,l=s,s=""),n.push(l);break;case"":s+=r.substring(i,a),s+="\0";break;case"":s+=r.substring(i,a+1);break;default:M(61167,{path:r})}i=a+2}return new X(n)}/**
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
 */const Me="remoteDocuments",qr="owner",sn="owner",Vr="mutationQueues",gg="userId",Ut="mutations",tc="batchId",qe="userMutationsIndex",ec=["userId","batchId"];/**
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
 */function Rs(r,t){return[r,vt(t)]}function $l(r,t,e){return[r,vt(t),e]}const pg={},Tn="documentMutations",qs="remoteDocumentsV14",_g=["prefixPath","collectionGroup","readTime","documentId"],bs="documentKeyIndex",yg=["prefixPath","collectionGroup","documentId"],Kl="collectionGroupIndex",Ig=["collectionGroup","readTime","prefixPath","documentId"],Pr="remoteDocumentGlobal",mo="remoteDocumentGlobalKey",wn="targets",Gl="queryTargetsIndex",Eg=["canonicalId","targetId"],vn="targetDocuments",Tg=["targetId","path"],Uo="documentTargetsIndex",wg=["path","targetId"],js="targetGlobalKey",$e="targetGlobal",Cr="collectionParents",vg=["collectionId","parent"],An="clientMetadata",Ag="clientId",ai="bundles",Rg="bundleId",ui="namedQueries",bg="name",qo="indexConfiguration",Sg="indexId",go="collectionGroupIndex",Vg="collectionGroup",_r="indexState",Pg=["indexId","uid"],Ql="sequenceNumberIndex",Cg=["uid","sequenceNumber"],yr="indexEntries",Dg=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Hl="documentKeyIndex",xg=["indexId","uid","orderedDocumentKey"],ci="documentOverlays",Ng=["userId","collectionPath","documentId"],po="collectionPathOverlayIndex",kg=["userId","collectionPath","largestBatchId"],Wl="collectionGroupOverlayIndex",Og=["userId","collectionGroup","largestBatchId"],jo="globals",Mg="name",Jl=[Vr,Ut,Tn,Me,wn,qr,$e,vn,An,Pr,Cr,ai,ui],Fg=[...Jl,ci],Xl=[Vr,Ut,Tn,qs,wn,qr,$e,vn,An,Pr,Cr,ai,ui,ci],Yl=Xl,zo=[...Yl,qo,_r,yr],Lg=zo,Zl=[...zo,jo],Bg=Zl;/**
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
 */class _o extends jl{constructor(t,e){super(),this.le=t,this.currentSequenceNumber=e}}function gt(r,t){const e=q(r);return Ie.O(e.le,t)}/**
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
 */function nc(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function be(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function th(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
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
 */class st{constructor(t,e){this.comparator=t,this.root=e||yt.EMPTY}insert(t,e){return new st(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,yt.BLACK,null,null))}remove(t){return new st(this.comparator,this.root.remove(t,this.comparator).copy(null,null,yt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push("".concat(e,":").concat(n)),!1)),"{".concat(t.join(", "),"}")}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new _s(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new _s(this.root,t,this.comparator,!1)}getReverseIterator(){return new _s(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new _s(this.root,t,this.comparator,!0)}}class _s{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class yt{constructor(t,e,n,s,i){this.key=t,this.value=e,this.color=n!=null?n:yt.RED,this.left=s!=null?s:yt.EMPTY,this.right=i!=null?i:yt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,i){return new yt(t!=null?t:this.key,e!=null?e:this.value,n!=null?n:this.color,s!=null?s:this.left,i!=null?i:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return yt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return yt.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,yt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,yt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}}yt.EMPTY=null,yt.RED=!0,yt.BLACK=!1;yt.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,n,s,i){return this}insert(t,e,n){return new yt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class tt{constructor(t){this.comparator=t,this.data=new st(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new rc(this.data.getIterator())}getIteratorFrom(t){return new rc(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof tt)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new tt(this.comparator);return e.data=t,e}}class rc{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function on(r){return r.hasNext()?r.getNext():void 0}/**
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
 */class Ct{constructor(t){this.fields=t,t.sort(ot.comparator)}static empty(){return new Ct([])}unionWith(t){let e=new tt(ot.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Ct(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return En(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
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
 */class eh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class dt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new eh("Invalid base64 string: "+i):i}}(t);return new dt(e)}static fromUint8Array(t){const e=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(t);return new dt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return B(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}dt.EMPTY_BYTE_STRING=new dt("");const Ug=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function te(r){if(F(!!r,39018),typeof r=="string"){let t=0;const e=Ug.exec(r);if(F(!!e,46558,{timestamp:r}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:it(r.seconds),nanos:it(r.nanos)}}function it(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ee(r){return typeof r=="string"?dt.fromBase64String(r):dt.fromUint8Array(r)}/**
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
 */const nh="server_timestamp",rh="__type__",sh="__previous_value__",ih="__local_write_time__";function $o(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[rh])==null?void 0:n.stringValue)===nh}function li(r){const t=r.mapValue.fields[sh];return $o(t)?li(t):t}function Dr(r){const t=te(r.mapValue.fields[ih].timestampValue);return new Y(t.seconds,t.nanos)}/**
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
 */class qg{constructor(t,e,n,s,i,a,u,l,d,f,g){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=f,this.apiKey=g}}const zs="(default)";class We{constructor(t,e){this.projectId=t,this.database=e||zs}static empty(){return new We("","")}get isDefaultDatabase(){return this.database===zs}isEqual(t){return t instanceof We&&t.projectId===this.projectId&&t.database===this.database}}function jg(r,t){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new C(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new We(r.options.projectId,t)}/**
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
 */const Ko="__type__",oh="__max__",pe={mapValue:{fields:{__type__:{stringValue:oh}}}},Go="__vector__",Rn="value",Ss={nullValue:"NULL_VALUE"};function Te(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?$o(r)?4:uh(r)?9007199254740991:hi(r)?10:11:M(28295,{value:r})}function Jt(r,t){if(r===t)return!0;const e=Te(r);if(e!==Te(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return Dr(r).isEqual(Dr(t));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=te(s.timestampValue),u=te(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(s,i){return ee(s.bytesValue).isEqual(ee(i.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(s,i){return it(s.geoPointValue.latitude)===it(i.geoPointValue.latitude)&&it(s.geoPointValue.longitude)===it(i.geoPointValue.longitude)}(r,t);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return it(s.integerValue)===it(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=it(s.doubleValue),u=it(i.doubleValue);return a===u?Sr(a)===Sr(u):isNaN(a)&&isNaN(u)}return!1}(r,t);case 9:return En(r.arrayValue.values||[],t.arrayValue.values||[],Jt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(nc(a)!==nc(u))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(u[l]===void 0||!Jt(a[l],u[l])))return!1;return!0}(r,t);default:return M(52216,{left:r})}}function xr(r,t){return(r.values||[]).find(e=>Jt(e,t))!==void 0}function we(r,t){if(r===t)return 0;const e=Te(r),n=Te(t);if(e!==n)return B(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return B(r.booleanValue,t.booleanValue);case 2:return function(i,a){const u=it(i.integerValue||i.doubleValue),l=it(a.integerValue||a.doubleValue);return u<l?-1:u>l?1:u===l?0:isNaN(u)?isNaN(l)?0:-1:1}(r,t);case 3:return sc(r.timestampValue,t.timestampValue);case 4:return sc(Dr(r),Dr(t));case 5:return ho(r.stringValue,t.stringValue);case 6:return function(i,a){const u=ee(i),l=ee(a);return u.compareTo(l)}(r.bytesValue,t.bytesValue);case 7:return function(i,a){const u=i.split("/"),l=a.split("/");for(let d=0;d<u.length&&d<l.length;d++){const f=B(u[d],l[d]);if(f!==0)return f}return B(u.length,l.length)}(r.referenceValue,t.referenceValue);case 8:return function(i,a){const u=B(it(i.latitude),it(a.latitude));return u!==0?u:B(it(i.longitude),it(a.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return ic(r.arrayValue,t.arrayValue);case 10:return function(i,a){var I,S,D,k;const u=i.fields||{},l=a.fields||{},d=(I=u[Rn])==null?void 0:I.arrayValue,f=(S=l[Rn])==null?void 0:S.arrayValue,g=B(((D=d==null?void 0:d.values)==null?void 0:D.length)||0,((k=f==null?void 0:f.values)==null?void 0:k.length)||0);return g!==0?g:ic(d,f)}(r.mapValue,t.mapValue);case 11:return function(i,a){if(i===pe.mapValue&&a===pe.mapValue)return 0;if(i===pe.mapValue)return 1;if(a===pe.mapValue)return-1;const u=i.fields||{},l=Object.keys(u),d=a.fields||{},f=Object.keys(d);l.sort(),f.sort();for(let g=0;g<l.length&&g<f.length;++g){const I=ho(l[g],f[g]);if(I!==0)return I;const S=we(u[l[g]],d[f[g]]);if(S!==0)return S}return B(l.length,f.length)}(r.mapValue,t.mapValue);default:throw M(23264,{he:e})}}function sc(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return B(r,t);const e=te(r),n=te(t),s=B(e.seconds,n.seconds);return s!==0?s:B(e.nanos,n.nanos)}function ic(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const i=we(e[s],n[s]);if(i)return i}return B(e.length,n.length)}function bn(r){return yo(r)}function yo(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=te(e);return"time(".concat(n.seconds,",").concat(n.nanos,")")}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return ee(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return O.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return"geo(".concat(e.latitude,",").concat(e.longitude,")")}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",s=!0;for(const i of e.values||[])s?s=!1:n+=",",n+=yo(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+="".concat(a,":").concat(yo(e.fields[a]));return s+"}"}(r.mapValue):M(61005,{value:r})}function Vs(r){switch(Te(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=li(r);return t?16+Vs(t):16;case 5:return 2*r.stringValue.length;case 6:return ee(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+Vs(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return be(n.fields,(i,a)=>{s+=i.length+Vs(a)}),s}(r.mapValue);default:throw M(13486,{value:r})}}function Nr(r,t){return{referenceValue:"projects/".concat(r.projectId,"/databases/").concat(r.database,"/documents/").concat(t.path.canonicalString())}}function kr(r){return!!r&&"integerValue"in r}function ah(r){return kr(r)||function(e){return!!e&&"doubleValue"in e}(r)}function Or(r){return!!r&&"arrayValue"in r}function oc(r){return!!r&&"nullValue"in r}function ac(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Ps(r){return!!r&&"mapValue"in r}function hi(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[Ko])==null?void 0:n.stringValue)===Go}function Ir(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const t={mapValue:{fields:{}}};return be(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=Ir(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Ir(r.arrayValue.values[e]);return t}return{...r}}function uh(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===oh}const ch={mapValue:{fields:{[Ko]:{stringValue:Go},[Rn]:{arrayValue:{}}}}};function zg(r){return"nullValue"in r?Ss:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?Nr(We.empty(),O.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?hi(r)?ch:{mapValue:{}}:M(35942,{value:r})}function $g(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?Nr(We.empty(),O.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?ch:"mapValue"in r?hi(r)?{mapValue:{}}:pe:M(61959,{value:r})}function uc(r,t){const e=we(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?-1:!r.inclusive&&t.inclusive?1:0}function cc(r,t){const e=we(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?1:!r.inclusive&&t.inclusive?-1:0}/**
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
 */class wt{constructor(t){this.value=t}static empty(){return new wt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Ps(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Ir(e)}setAll(t){let e=ot.emptyPath(),n={},s=[];t.forEach((a,u)=>{if(!e.isImmediateParentOf(u)){const l=this.getFieldsMap(e);this.applyChanges(l,n,s),n={},s=[],e=u.popLast()}a?n[u.lastSegment()]=Ir(a):s.push(u.lastSegment())});const i=this.getFieldsMap(e);this.applyChanges(i,n,s)}delete(t){const e=this.field(t.popLast());Ps(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Jt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];Ps(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){be(e,(s,i)=>t[s]=i);for(const s of n)delete t[s]}clone(){return new wt(Ir(this.value))}}function lh(r){const t=[];return be(r.fields,(e,n)=>{const s=new ot([e]);if(Ps(n)){const i=lh(n.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)}),new Ct(t)}/**
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
 */class ut{constructor(t,e,n,s,i,a,u){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(t){return new ut(t,0,L.min(),L.min(),L.min(),wt.empty(),0)}static newFoundDocument(t,e,n,s){return new ut(t,1,e,L.min(),n,s,0)}static newNoDocument(t,e){return new ut(t,2,e,L.min(),L.min(),wt.empty(),0)}static newUnknownDocument(t,e){return new ut(t,3,e,L.min(),L.min(),wt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=wt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=wt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof ut&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new ut(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return"Document(".concat(this.key,", ").concat(this.version,", ").concat(JSON.stringify(this.data.value),", {createTime: ").concat(this.createTime,"}), {documentType: ").concat(this.documentType,"}), {documentState: ").concat(this.documentState,"})")}}/**
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
 */class Sn{constructor(t,e){this.position=t,this.inclusive=e}}function lc(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const i=t[s],a=r.position[s];if(i.field.isKeyField()?n=O.comparator(O.fromName(a.referenceValue),e.key):n=we(a,e.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function hc(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!Jt(r.position[e],t.position[e]))return!1;return!0}/**
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
 */class Mr{constructor(t,e="asc"){this.field=t,this.dir=e}}function Kg(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
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
 */class hh{}class K extends hh{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Gg(t,e,n):e==="array-contains"?new Wg(t,n):e==="in"?new _h(t,n):e==="not-in"?new Jg(t,n):e==="array-contains-any"?new Xg(t,n):new K(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new Qg(t,n):new Hg(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(we(e,this.value)):e!==null&&Te(this.value)===Te(e)&&this.matchesComparison(we(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Z extends hh{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Z(t,e)}matches(t){return Vn(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Vn(r){return r.op==="and"}function Io(r){return r.op==="or"}function Qo(r){return dh(r)&&Vn(r)}function dh(r){for(const t of r.filters)if(t instanceof Z)return!1;return!0}function Eo(r){if(r instanceof K)return r.field.canonicalString()+r.op.toString()+bn(r.value);if(Qo(r))return r.filters.map(t=>Eo(t)).join(",");{const t=r.filters.map(e=>Eo(e)).join(",");return"".concat(r.op,"(").concat(t,")")}}function fh(r,t){return r instanceof K?function(n,s){return s instanceof K&&n.op===s.op&&n.field.isEqual(s.field)&&Jt(n.value,s.value)}(r,t):r instanceof Z?function(n,s){return s instanceof Z&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,a,u)=>i&&fh(a,s.filters[u]),!0):!1}(r,t):void M(19439)}function mh(r,t){const e=r.filters.concat(t);return Z.create(e,r.op)}function gh(r){return r instanceof K?function(e){return"".concat(e.field.canonicalString()," ").concat(e.op," ").concat(bn(e.value))}(r):r instanceof Z?function(e){return e.op.toString()+" {"+e.getFilters().map(gh).join(" ,")+"}"}(r):"Filter"}class Gg extends K{constructor(t,e,n){super(t,e,n),this.key=O.fromName(n.referenceValue)}matches(t){const e=O.comparator(t.key,this.key);return this.matchesComparison(e)}}class Qg extends K{constructor(t,e){super(t,"in",e),this.keys=ph("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Hg extends K{constructor(t,e){super(t,"not-in",e),this.keys=ph("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function ph(r,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(n=>O.fromName(n.referenceValue))}class Wg extends K{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Or(e)&&xr(e.arrayValue,this.value)}}class _h extends K{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&xr(this.value.arrayValue,e)}}class Jg extends K{constructor(t,e){super(t,"not-in",e)}matches(t){if(xr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!xr(this.value.arrayValue,e)}}class Xg extends K{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Or(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>xr(this.value.arrayValue,n))}}/**
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
 */class Yg{constructor(t,e=null,n=[],s=[],i=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Te=null}}function To(r,t=null,e=[],n=[],s=null,i=null,a=null){return new Yg(r,t,e,n,s,i,a)}function Je(r){const t=q(r);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>Eo(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),oi(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>bn(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>bn(n)).join(",")),t.Te=e}return t.Te}function jr(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!Kg(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!fh(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!hc(r.startAt,t.startAt)&&hc(r.endAt,t.endAt)}function $s(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Ks(r,t){return r.filters.filter(e=>e instanceof K&&e.field.isEqual(t))}function dc(r,t,e){let n=Ss,s=!0;for(const i of Ks(r,t)){let a=Ss,u=!0;switch(i.op){case"<":case"<=":a=zg(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,u=!1;break;case"!=":case"not-in":a=Ss}uc({value:n,inclusive:s},{value:a,inclusive:u})<0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];uc({value:n,inclusive:s},{value:a,inclusive:e.inclusive})<0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}function fc(r,t,e){let n=pe,s=!0;for(const i of Ks(r,t)){let a=pe,u=!0;switch(i.op){case">=":case">":a=$g(i.value),u=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,u=!1;break;case"!=":case"not-in":a=pe}cc({value:n,inclusive:s},{value:a,inclusive:u})>0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];cc({value:n,inclusive:s},{value:a,inclusive:e.inclusive})>0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}/**
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
 */class Ln{constructor(t,e=null,n=[],s=[],i=null,a="F",u=null,l=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=l,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Zg(r,t,e,n,s,i,a,u){return new Ln(r,t,e,n,s,i,a,u)}function zr(r){return new Ln(r)}function mc(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function tp(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function yh(r){return r.collectionGroup!==null}function Er(r){const t=q(r);if(t.Ie===null){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new tt(ot.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(u=u.add(d.field))})}),u})(t).forEach(i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ie.push(new Mr(i,n))}),e.has(ot.keyField().canonicalString())||t.Ie.push(new Mr(ot.keyField(),n))}return t.Ie}function Lt(r){const t=q(r);return t.Ee||(t.Ee=ep(t,Er(r))),t.Ee}function ep(r,t){if(r.limitType==="F")return To(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Mr(s.field,i)});const e=r.endAt?new Sn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Sn(r.startAt.position,r.startAt.inclusive):null;return To(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function wo(r,t){const e=r.filters.concat([t]);return new Ln(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function np(r,t){const e=r.explicitOrderBy.concat([t]);return new Ln(r.path,r.collectionGroup,e,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function Gs(r,t,e){return new Ln(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function di(r,t){return jr(Lt(r),Lt(t))&&r.limitType===t.limitType}function Ih(r){return"".concat(Je(Lt(r)),"|lt:").concat(r.limitType)}function dn(r){return"Query(target=".concat(function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=", filters: [".concat(e.filters.map(s=>gh(s)).join(", "),"]")),oi(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=", orderBy: [".concat(e.orderBy.map(s=>function(a){return"".concat(a.field.canonicalString()," (").concat(a.dir,")")}(s)).join(", "),"]")),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>bn(s)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>bn(s)).join(",")),"Target(".concat(n,")")}(Lt(r)),"; limitType=").concat(r.limitType,")")}function $r(r,t){return t.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):O.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,t)&&function(n,s){for(const i of Er(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,t)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,t)&&function(n,s){return!(n.startAt&&!function(a,u,l){const d=lc(a,u,l);return a.inclusive?d<=0:d<0}(n.startAt,Er(n),s)||n.endAt&&!function(a,u,l){const d=lc(a,u,l);return a.inclusive?d>=0:d>0}(n.endAt,Er(n),s))}(r,t)}function rp(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Eh(r){return(t,e)=>{let n=!1;for(const s of Er(r)){const i=sp(s,t,e);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function sp(r,t,e){const n=r.field.isKeyField()?O.comparator(t.key,e.key):function(i,a,u){const l=a.data.field(i),d=u.data.field(i);return l!==null&&d!==null?we(l,d):M(42886)}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M(19790,{direction:r.dir})}}/**
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
 */class re{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){be(this.inner,(e,n)=>{for(const[s,i]of n)t(s,i)})}isEmpty(){return th(this.inner)}size(){return this.innerSize}}/**
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
 */const ip=new st(O.comparator);function kt(){return ip}const Th=new st(O.comparator);function hr(...r){let t=Th;for(const e of r)t=t.insert(e.key,e);return t}function wh(r){let t=Th;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Gt(){return Tr()}function vh(){return Tr()}function Tr(){return new re(r=>r.toString(),(r,t)=>r.isEqual(t))}const op=new st(O.comparator),ap=new tt(O.comparator);function $(...r){let t=ap;for(const e of r)t=t.add(e);return t}const up=new tt(B);function cp(){return up}/**
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
 */function fi(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Sr(t)?"-0":t}}function Ho(r){return{integerValue:""+r}}function lp(r,t){return fg(t)?Ho(t):fi(r,t)}/**
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
 */class mi{constructor(){this._=void 0}}function hp(r,t,e){return r instanceof Pn?function(s,i){const a={fields:{[rh]:{stringValue:nh},[ih]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&$o(i)&&(i=li(i)),i&&(a.fields[sh]=i),{mapValue:a}}(e,t):r instanceof Cn?Rh(r,t):r instanceof Dn?bh(r,t):r instanceof xn?function(s,i){const a=Ah(s,i),u=Qs(a)+Qs(s.Ae);return kr(a)&&kr(s.Ae)?Ho(u):fi(s.serializer,u)}(r,t):r instanceof Fr?function(s,i){return gc(s,i,Math.min)}(r,t):r instanceof Lr?function(s,i){return gc(s,i,Math.max)}(r,t):void 0}function dp(r,t,e){return r instanceof Cn?Rh(r,t):r instanceof Dn?bh(r,t):e}function Ah(r,t){return r instanceof xn?ah(t)?t:{integerValue:0}:null}class Pn extends mi{}class Cn extends mi{constructor(t){super(),this.elements=t}}function Rh(r,t){const e=Sh(t);for(const n of r.elements)e.some(s=>Jt(s,n))||e.push(n);return{arrayValue:{values:e}}}class Dn extends mi{constructor(t){super(),this.elements=t}}function bh(r,t){let e=Sh(t);for(const n of r.elements)e=e.filter(s=>!Jt(s,n));return{arrayValue:{values:e}}}class Wo extends mi{constructor(t,e){super(),this.serializer=t,this.Ae=e}}class xn extends Wo{}class Fr extends Wo{}class Lr extends Wo{}function gc(r,t,e){if(!ah(t))return r.Ae;const n=e(Qs(t),Qs(r.Ae));return kr(t)&&kr(r.Ae)?Ho(n):fi(r.serializer,n)}function Qs(r){return it(r.integerValue||r.doubleValue)}function Sh(r){return Or(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
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
 */class Vh{constructor(t,e){this.field=t,this.transform=e}}function fp(r,t){return r.field.isEqual(t.field)&&function(n,s){return n instanceof Cn&&s instanceof Cn||n instanceof Dn&&s instanceof Dn?En(n.elements,s.elements,Jt):n instanceof xn&&s instanceof xn||n instanceof Fr&&s instanceof Fr||n instanceof Lr&&s instanceof Lr?Jt(n.Ae,s.Ae):n instanceof Pn&&s instanceof Pn}(r.transform,t.transform)}class mp{constructor(t,e){this.version=t,this.transformResults=e}}class mt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new mt}static exists(t){return new mt(void 0,t)}static updateTime(t){return new mt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Cs(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class gi{}function Ph(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new Kr(r.key,mt.none()):new Bn(r.key,r.data,mt.none());{const e=r.data,n=wt.empty();let s=new tt(ot.comparator);for(let i of t.fields)if(!s.has(i)){let a=e.field(i);a===null&&i.length>1&&(i=i.popLast(),a=e.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new se(r.key,n,new Ct(s.toArray()),mt.none())}}function gp(r,t,e){r instanceof Bn?function(s,i,a){const u=s.value.clone(),l=_c(s.fieldTransforms,i,a.transformResults);u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(r,t,e):r instanceof se?function(s,i,a){if(!Cs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=_c(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(Ch(s)),l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(r,t,e):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function wr(r,t,e,n){return r instanceof Bn?function(i,a,u,l){if(!Cs(i.precondition,a))return u;const d=i.value.clone(),f=yc(i.fieldTransforms,l,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(r,t,e,n):r instanceof se?function(i,a,u,l){if(!Cs(i.precondition,a))return u;const d=yc(i.fieldTransforms,l,a),f=a.data;return f.setAll(Ch(i)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(g=>g.field))}(r,t,e,n):function(i,a,u){return Cs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(r,t,e)}function pp(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),i=Ah(n.transform,s||null);i!=null&&(e===null&&(e=wt.empty()),e.set(n.field,i))}return e||null}function pc(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&En(n,s,(i,a)=>fp(i,a))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class Bn extends gi{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class se extends gi{constructor(t,e,n,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Ch(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function _c(r,t,e){const n=new Map;F(r.length===e.length,32656,{Ve:e.length,de:r.length});for(let s=0;s<e.length;s++){const i=r[s],a=i.transform,u=t.data.field(i.field);n.set(i.field,dp(a,u,e[s]))}return n}function yc(r,t,e){const n=new Map;for(const s of r){const i=s.transform,a=e.data.field(s.field);n.set(s.field,hp(i,a,t))}return n}class Kr extends gi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Dh extends gi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Jo{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&gp(i,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=wr(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=wr(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=vh();return this.mutations.forEach(s=>{const i=t.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=e.has(s.key)?null:u;const l=Ph(a,u);l!==null&&n.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(L.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),$())}isEqual(t){return this.batchId===t.batchId&&En(this.mutations,t.mutations,(e,n)=>pc(e,n))&&En(this.baseMutations,t.baseMutations,(e,n)=>pc(e,n))}}class Xo{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){F(t.mutations.length===n.length,58842,{me:t.mutations.length,fe:n.length});let s=function(){return op}();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new Xo(t,e,n,s)}}/**
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
 */class Yo{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return"Overlay{\n      largestBatchId: ".concat(this.largestBatchId,",\n      mutation: ").concat(this.mutation.toString(),"\n    }")}}/**
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
 */class _p{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var lt,Q;function yp(r){switch(r){case V.OK:return M(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return M(15467,{code:r})}}function xh(r){if(r===void 0)return St("GRPC error has no .code"),V.UNKNOWN;switch(r){case lt.OK:return V.OK;case lt.CANCELLED:return V.CANCELLED;case lt.UNKNOWN:return V.UNKNOWN;case lt.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case lt.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case lt.INTERNAL:return V.INTERNAL;case lt.UNAVAILABLE:return V.UNAVAILABLE;case lt.UNAUTHENTICATED:return V.UNAUTHENTICATED;case lt.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case lt.NOT_FOUND:return V.NOT_FOUND;case lt.ALREADY_EXISTS:return V.ALREADY_EXISTS;case lt.PERMISSION_DENIED:return V.PERMISSION_DENIED;case lt.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case lt.ABORTED:return V.ABORTED;case lt.OUT_OF_RANGE:return V.OUT_OF_RANGE;case lt.UNIMPLEMENTED:return V.UNIMPLEMENTED;case lt.DATA_LOSS:return V.DATA_LOSS;default:return M(39323,{code:r})}}(Q=lt||(lt={}))[Q.OK=0]="OK",Q[Q.CANCELLED=1]="CANCELLED",Q[Q.UNKNOWN=2]="UNKNOWN",Q[Q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Q[Q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Q[Q.NOT_FOUND=5]="NOT_FOUND",Q[Q.ALREADY_EXISTS=6]="ALREADY_EXISTS",Q[Q.PERMISSION_DENIED=7]="PERMISSION_DENIED",Q[Q.UNAUTHENTICATED=16]="UNAUTHENTICATED",Q[Q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Q[Q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Q[Q.ABORTED=10]="ABORTED",Q[Q.OUT_OF_RANGE=11]="OUT_OF_RANGE",Q[Q.UNIMPLEMENTED=12]="UNIMPLEMENTED",Q[Q.INTERNAL=13]="INTERNAL",Q[Q.UNAVAILABLE=14]="UNAVAILABLE",Q[Q.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Ip(){return new TextEncoder}/**
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
 */const Ep=new ye([4294967295,4294967295],0);function Ic(r){const t=Ip().encode(r),e=new Cl;return e.update(t),new Uint8Array(e.digest())}function Ec(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new ye([e,n],0),new ye([s,i],0)]}class Zo{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new dr("Invalid padding: ".concat(e));if(n<0)throw new dr("Invalid hash count: ".concat(n));if(t.length>0&&this.hashCount===0)throw new dr("Invalid hash count: ".concat(n));if(t.length===0&&e!==0)throw new dr("Invalid padding when bitmap length is 0: ".concat(e));this.ge=8*t.length-e,this.pe=ye.fromNumber(this.ge)}ye(t,e,n){let s=t.add(e.multiply(ye.fromNumber(n)));return s.compare(Ep)===1&&(s=new ye([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Ic(t),[n,s]=Ec(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);if(!this.we(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new Zo(i,s,e);return n.forEach(u=>a.insert(u)),a}insert(t){if(this.ge===0)return;const e=Ic(t),[n,s]=Ec(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);this.Se(a)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class dr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Gr{constructor(t,e,n,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,Qr.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new Gr(L.min(),s,new st(B),kt(),$())}}class Qr{constructor(t,e,n,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Qr(n,e,$(),$(),$())}}/**
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
 */class Ds{constructor(t,e,n,s){this.be=t,this.removedTargetIds=e,this.key=n,this.De=s}}class Nh{constructor(t,e){this.targetId=t,this.Ce=e}}class kh{constructor(t,e,n=dt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class Tc{constructor(t){this.targetId=t,this.ve=0,this.Fe=wc(),this.Me=dt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=$(),e=$(),n=$();return this.Fe.forEach((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:M(38017,{changeType:i})}}),new Qr(this.Me,this.xe,t,e,n)}qe(){this.Oe=!1,this.Fe=wc()}Ke(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,F(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const rr="WatchChangeAggregator";class Tp{constructor(t){this.Ge=t,this.ze=new Map,this.je=kt(),this.Je=ys(),this.He=ys(),this.Ze=new st(B)}Xe(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const n=this.ze.get(e);if(n)switch(t.state){case 0:this.nt(e)&&n.Le(t.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(t.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(e);break;case 3:this.nt(e)&&(n.Qe(),n.Le(t.resumeToken));break;case 4:this.nt(e)&&(this.rt(e),n.Le(t.resumeToken));break;default:M(56790,{state:t.state})}else P(rr,"handleTargetChange received targetChange for untracked target ID (".concat(e,") with state (").concat(t.state,")"))})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((n,s)=>{this.nt(s)&&e(s)})}it(t){const e=t.targetId,n=t.Ce.count,s=this.st(e);if(s){const i=s.target;if($s(i))if(n===0){const a=new O(i.path);this.et(e,a,ut.newNoDocument(a,L.min()))}else F(n===1,20013,{expectedCount:n});else{const a=this.ot(e);if(a!==n){const u=this._t(t),l=u?this.ut(u,t,a):1;if(l!==0){this.rt(e);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,d)}}}}}_t(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=e;let a,u;try{a=ee(n).toUint8Array()}catch(l){if(l instanceof eh)return In("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{u=new Zo(a,s,i)}catch(l){return In(l instanceof dr?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return u.ge===0?null:u}ut(t,e,n){return e.Ce.count===n-this.ht(t,e.targetId)?0:2}ht(t,e){const n=this.Ge.getRemoteKeysForTarget(e);let s=0;return n.forEach(i=>{const a=this.Ge.lt(),u="projects/".concat(a.projectId,"/databases/").concat(a.database,"/documents/").concat(i.path.canonicalString());t.mightContain(u)||(this.et(e,i,null),s++)}),s}Pt(t){const e=new Map;this.ze.forEach((i,a)=>{const u=this.st(a);if(u){if(i.current&&$s(u.target)){const l=new O(u.target.path);this.Tt(l).has(a)||this.It(a,l)||this.et(a,l,ut.newNoDocument(l,t))}i.Be&&(e.set(a,i.ke()),i.qe())}});let n=$();this.He.forEach((i,a)=>{let u=!0;a.forEachWhile(l=>{const d=this.st(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(n=n.add(i))}),this.je.forEach((i,a)=>a.setReadTime(t));const s=new Gr(t,e,this.Ze,this.je,n);return this.je=kt(),this.Je=ys(),this.He=ys(),this.Ze=new st(B),s}Ye(t,e){const n=this.ze.get(t);if(!n||!this.nt(t))return void P(rr,"addDocumentToTarget received document for unknown inactive target (".concat(t,")"));const s=this.It(t,e.key)?2:0;n.Ke(e.key,s),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Tt(e.key).add(t)),this.He=this.He.insert(e.key,this.Et(e.key).add(t))}et(t,e,n){const s=this.ze.get(t);s&&this.nt(t)?(this.It(t,e)?s.Ke(e,1):s.Ue(e),this.He=this.He.insert(e,this.Et(e).delete(t)),this.He=this.He.insert(e,this.Et(e).add(t)),n&&(this.je=this.je.insert(e,n))):P(rr,"removeDocumentFromTarget received document for unknown or inactive target (".concat(t,")"))}removeTarget(t){this.ze.delete(t)}ot(t){const e=this.ze.get(t);if(!e)return 0;const n=e.ke();return this.Ge.getRemoteKeysForTarget(t).size+n.addedDocuments.size-n.removedDocuments.size}$e(t){let e=this.ze.get(t);e||(P(rr,"recordPendingTargetRequest set up tracking for target ID ".concat(t)),e=new Tc(t),this.ze.set(t,e)),e.$e()}Et(t){let e=this.He.get(t);return e||(e=new tt(B),this.He=this.He.insert(t,e)),e}Tt(t){let e=this.Je.get(t);return e||(e=new tt(B),this.Je=this.Je.insert(t,e)),e}nt(t){const e=this.st(t)!==null;return e||P(rr,"Detected inactive target",t),e}st(t){const e=this.ze.get(t);return e===void 0||e.Ne?null:this.Ge.Rt(t)}rt(t){this.ze.set(t,new Tc(t)),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}It(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function ys(){return new st(O.comparator)}function wc(){return new st(O.comparator)}const wp={asc:"ASCENDING",desc:"DESCENDING"},vp={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Ap={and:"AND",or:"OR"};class Rp{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function vo(r,t){return r.useProto3Json||oi(t)?t:{value:t}}function Nn(r,t){return r.useProto3Json?"".concat(new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z",""),".").concat(("000000000"+t.nanoseconds).slice(-9),"Z"):{seconds:""+t.seconds,nanos:t.nanoseconds}}function Oh(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function bp(r,t){return Nn(r,t.toTimestamp())}function Vt(r){return F(!!r,49232),L.fromTimestamp(function(e){const n=te(e);return new Y(n.seconds,n.nanos)}(r))}function ta(r,t){return Ao(r,t).canonicalString()}function Ao(r,t){const e=function(s){return new X(["projects",s.projectId,"databases",s.database])}(r).child("documents");return t===void 0?e:e.child(t)}function Mh(r){const t=X.fromString(r);return F(Kh(t),10190,{key:t.toString()}),t}function Hs(r,t){return ta(r.databaseId,t.path)}function Ke(r,t){const e=Mh(t);if(e.get(1)!==r.databaseId.projectId)throw new C(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new C(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new O(Bh(e))}function Fh(r,t){return ta(r.databaseId,t)}function Lh(r){const t=Mh(r);return t.length===4?X.emptyPath():Bh(t)}function Ro(r){return new X(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Bh(r){return F(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function vc(r,t,e){return{name:Hs(r,t),fields:e.value.mapValue.fields}}function Sp(r,t,e){const n=Ke(r,t.name),s=Vt(t.updateTime),i=t.createTime?Vt(t.createTime):L.min(),a=new wt({mapValue:{fields:t.fields}}),u=ut.newFoundDocument(n,s,i,a);return e&&u.setHasCommittedMutations(),e?u.setHasCommittedMutations():u}function Vp(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:M(39313,{state:d})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(F(f===void 0||typeof f=="string",58123),dt.fromBase64String(f||"")):(F(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),dt.fromUint8Array(f||new Uint8Array))}(r,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&function(d){const f=d.code===void 0?V.UNKNOWN:xh(d.code);return new C(f,d.message||"")}(a);e=new kh(n,s,i,u||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=Ke(r,n.document.name),i=Vt(n.document.updateTime),a=n.document.createTime?Vt(n.document.createTime):L.min(),u=new wt({mapValue:{fields:n.document.fields}}),l=ut.newFoundDocument(s,i,a,u),d=n.targetIds||[],f=n.removedTargetIds||[];e=new Ds(d,f,l.key,l)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=Ke(r,n.document),i=n.readTime?Vt(n.readTime):L.min(),a=ut.newNoDocument(s,i),u=n.removedTargetIds||[];e=new Ds([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=Ke(r,n.document),i=n.removedTargetIds||[];e=new Ds([],i,s,null)}else{if(!("filter"in t))return M(11601,{At:t});{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new _p(s,i),u=n.targetId;e=new Nh(u,a)}}return e}function Ws(r,t){let e;if(t instanceof Bn)e={update:vc(r,t.key,t.value)};else if(t instanceof Kr)e={delete:Hs(r,t.key)};else if(t instanceof se)e={update:vc(r,t.key,t.data),updateMask:kp(t.fieldMask)};else{if(!(t instanceof Dh))return M(16599,{Vt:t.type});e={verify:Hs(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(i,a){const u=a.transform;if(u instanceof Pn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Cn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Dn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof xn)return{fieldPath:a.field.canonicalString(),increment:u.Ae};if(u instanceof Fr)return{fieldPath:a.field.canonicalString(),minimum:u.Ae};if(u instanceof Lr)return{fieldPath:a.field.canonicalString(),maximum:u.Ae};throw M(20930,{transform:a.transform})}(0,n))),t.precondition.isNone||(e.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:bp(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:M(27497)}(r,t.precondition)),e}function bo(r,t){const e=t.currentDocument?function(i){return i.updateTime!==void 0?mt.updateTime(Vt(i.updateTime)):i.exists!==void 0?mt.exists(i.exists):mt.none()}(t.currentDocument):mt.none(),n=t.updateTransforms?t.updateTransforms.map(s=>function(a,u){let l=null;if("setToServerValue"in u)F(u.setToServerValue==="REQUEST_TIME",16630,{proto:u}),l=new Pn;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];l=new Cn(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];l=new Dn(f)}else"increment"in u?l=new xn(a,u.increment):"minimum"in u?l=new Fr(a,u.minimum):"maximum"in u?l=new Lr(a,u.maximum):M(16584,{proto:u});const d=ot.fromServerFormat(u.fieldPath);return new Vh(d,l)}(r,s)):[];if(t.update){t.update.name;const s=Ke(r,t.update.name),i=new wt({mapValue:{fields:t.update.fields}});if(t.updateMask){const a=function(l){const d=l.fieldPaths||[];return new Ct(d.map(f=>ot.fromServerFormat(f)))}(t.updateMask);return new se(s,i,a,e,n)}return new Bn(s,i,e,n)}if(t.delete){const s=Ke(r,t.delete);return new Kr(s,e)}if(t.verify){const s=Ke(r,t.verify);return new Dh(s,e)}return M(1463,{proto:t})}function Pp(r,t){return r&&r.length>0?(F(t!==void 0,14353),r.map(e=>function(s,i){let a=s.updateTime?Vt(s.updateTime):Vt(i);return a.isEqual(L.min())&&(a=Vt(i)),new mp(a,s.transformResults||[])}(e,t))):[]}function Uh(r,t){return{documents:[Fh(r,t.path)]}}function qh(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=Fh(r,s);const i=function(d){if(d.length!==0)return $h(Z.create(d,"and"))}(t.filters);i&&(e.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(f=>function(I){return{field:fn(I.field),direction:Dp(I.dir)}}(f))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=vo(r,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{dt:e,parent:s}}function jh(r){let t=Lh(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){F(n===1,65062);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let i=[];e.where&&(i=function(g){const I=zh(g);return I instanceof Z&&Qo(I)?I.getFilters():[I]}(e.where));let a=[];e.orderBy&&(a=function(g){return g.map(I=>function(D){return new Mr(mn(D.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(I))}(e.orderBy));let u=null;e.limit&&(u=function(g){let I;return I=typeof g=="object"?g.value:g,oi(I)?null:I}(e.limit));let l=null;e.startAt&&(l=function(g){const I=!!g.before,S=g.values||[];return new Sn(S,I)}(e.startAt));let d=null;return e.endAt&&(d=function(g){const I=!g.before,S=g.values||[];return new Sn(S,I)}(e.endAt)),Zg(t,s,a,i,u,"F",l,d)}function Cp(r,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function zh(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=mn(e.unaryFilter.field);return K.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=mn(e.unaryFilter.field);return K.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=mn(e.unaryFilter.field);return K.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=mn(e.unaryFilter.field);return K.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(r):r.fieldFilter!==void 0?function(e){return K.create(mn(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return Z.create(e.compositeFilter.filters.map(n=>zh(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(e.compositeFilter.op))}(r):M(30097,{filter:r})}function Dp(r){return wp[r]}function xp(r){return vp[r]}function Np(r){return Ap[r]}function fn(r){return{fieldPath:r.canonicalString()}}function mn(r){return ot.fromServerFormat(r.fieldPath)}function $h(r){return r instanceof K?function(e){if(e.op==="=="){if(ac(e.value))return{unaryFilter:{field:fn(e.field),op:"IS_NAN"}};if(oc(e.value))return{unaryFilter:{field:fn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(ac(e.value))return{unaryFilter:{field:fn(e.field),op:"IS_NOT_NAN"}};if(oc(e.value))return{unaryFilter:{field:fn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:fn(e.field),op:xp(e.op),value:e.value}}}(r):r instanceof Z?function(e){const n=e.getFilters().map(s=>$h(s));return n.length===1?n[0]:{compositeFilter:{op:Np(e.op),filters:n}}}(r):M(54877,{filter:r})}function kp(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Kh(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function Gh(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
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
 */class Qt{constructor(t,e,n,s,i=L.min(),a=L.min(),u=dt.EMPTY_BYTE_STRING,l=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=l}withSequenceNumber(t){return new Qt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class Qh{constructor(t){this.gt=t}}function Op(r,t){let e;if(t.document)e=Sp(r.gt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const n=O.fromSegments(t.noDocument.path),s=Ye(t.noDocument.readTime);e=ut.newNoDocument(n,s),t.hasCommittedMutations&&e.setHasCommittedMutations()}else{if(!t.unknownDocument)return M(56709);{const n=O.fromSegments(t.unknownDocument.path),s=Ye(t.unknownDocument.version);e=ut.newUnknownDocument(n,s)}}return t.readTime&&e.setReadTime(function(s){const i=new Y(s[0],s[1]);return L.fromTimestamp(i)}(t.readTime)),e}function Ac(r,t){const e=t.key,n={prefixPath:e.getCollectionPath().popLast().toArray(),collectionGroup:e.collectionGroup,documentId:e.path.lastSegment(),readTime:Js(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())n.document=function(i,a){return{name:Hs(i,a.key),fields:a.data.value.mapValue.fields,updateTime:Nn(i,a.version.toTimestamp()),createTime:Nn(i,a.createTime.toTimestamp())}}(r.gt,t);else if(t.isNoDocument())n.noDocument={path:e.path.toArray(),readTime:Xe(t.version)};else{if(!t.isUnknownDocument())return M(57904,{document:t});n.unknownDocument={path:e.path.toArray(),version:Xe(t.version)}}return n}function Js(r){const t=r.toTimestamp();return[t.seconds,t.nanoseconds]}function Xe(r){const t=r.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function Ye(r){const t=new Y(r.seconds,r.nanoseconds);return L.fromTimestamp(t)}function Le(r,t){const e=(t.baseMutations||[]).map(i=>bo(r.gt,i));for(let i=0;i<t.mutations.length-1;++i){const a=t.mutations[i];if(i+1<t.mutations.length&&t.mutations[i+1].transform!==void 0){const u=t.mutations[i+1];a.updateTransforms=u.transform.fieldTransforms,t.mutations.splice(i+1,1),++i}}const n=t.mutations.map(i=>bo(r.gt,i)),s=Y.fromMillis(t.localWriteTimeMs);return new Jo(t.batchId,s,e,n)}function fr(r){const t=Ye(r.readTime),e=r.lastLimboFreeSnapshotVersion!==void 0?Ye(r.lastLimboFreeSnapshotVersion):L.min();let n;return n=function(i){return i.documents!==void 0}(r.query)?function(i){const a=i.documents.length;return F(a===1,1966,{count:a}),Lt(zr(Lh(i.documents[0])))}(r.query):function(i){return Lt(jh(i))}(r.query),new Qt(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,t,e,dt.fromBase64String(r.resumeToken))}function Hh(r,t){const e=Xe(t.snapshotVersion),n=Xe(t.lastLimboFreeSnapshotVersion);let s;s=$s(t.target)?Uh(r.gt,t.target):qh(r.gt,t.target).dt;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:Je(t.target),readTime:e,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Wh(r){const t=jh({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Gs(t,t.limit,"L"):t}function Zi(r,t){return new Yo(t.largestBatchId,bo(r.gt,t.overlayMutation))}function Rc(r,t){const e=t.path.lastSegment();return[r,vt(t.path.popLast()),e]}function bc(r,t,e,n){return{indexId:r,uid:t,sequenceNumber:e,readTime:Xe(n.readTime),documentKey:vt(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class Mp{getBundleMetadata(t,e){return Sc(t).get(e).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:Ye(i.createTime),version:i.version}}(n)})}saveBundleMetadata(t,e){return Sc(t).put(function(s){return{bundleId:s.id,createTime:Xe(Vt(s.createTime)),version:s.version}}(e))}getNamedQuery(t,e){return Vc(t).get(e).next(n=>{if(n)return function(i){return{name:i.name,query:Wh(i.bundledQuery),readTime:Ye(i.readTime)}}(n)})}saveNamedQuery(t,e){return Vc(t).put(function(s){return{name:s.name,readTime:Xe(Vt(s.readTime)),bundledQuery:s.bundledQuery}}(e))}}function Sc(r){return gt(r,ai)}function Vc(r){return gt(r,ui)}/**
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
 */class pi{constructor(t,e){this.serializer=t,this.userId=e}static yt(t,e){const n=e.uid||"";return new pi(t,n)}getOverlay(t,e){return sr(t).get(Rc(this.userId,e)).next(n=>n?Zi(this.serializer,n):null)}getOverlays(t,e){const n=Gt();return v.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){const s=[];return n.forEach((i,a)=>{const u=new Yo(e,a);s.push(this.wt(t,u))}),v.waitFor(s)}removeOverlaysForBatchId(t,e,n){const s=new Set;e.forEach(a=>s.add(vt(a.getCollectionPath())));const i=[];return s.forEach(a=>{const u=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);i.push(sr(t).X(po,u))}),v.waitFor(i)}getOverlaysForCollection(t,e,n){const s=Gt(),i=vt(e),a=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return sr(t).J(po,a).next(u=>{for(const l of u){const d=Zi(this.serializer,l);s.set(d.getKey(),d)}return s})}getOverlaysForCollectionGroup(t,e,n,s){const i=Gt();let a;const u=IDBKeyRange.bound([this.userId,e,n],[this.userId,e,Number.POSITIVE_INFINITY],!0);return sr(t).ee({index:Wl,range:u},(l,d,f)=>{const g=Zi(this.serializer,d);i.size()<s||g.largestBatchId===a?(i.set(g.getKey(),g),a=g.largestBatchId):f.done()}).next(()=>i)}wt(t,e){return sr(t).put(function(s,i,a){const[u,l,d]=Rc(i,a.mutation.key);return{userId:i,collectionPath:l,documentId:d,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:Ws(s.gt,a.mutation)}}(this.serializer,this.userId,e))}}function sr(r){return gt(r,ci)}/**
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
 */class Fp{St(t){return gt(t,jo)}getSessionToken(t){return this.St(t).get("sessionToken").next(e=>{const n=e==null?void 0:e.value;return n?dt.fromUint8Array(n):dt.EMPTY_BYTE_STRING})}setSessionToken(t,e){return this.St(t).put({name:"sessionToken",value:e.toUint8Array()})}}/**
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
 */class Be{constructor(){}bt(t,e){this.Dt(t,e),e.Ct()}Dt(t,e){if("nullValue"in t)this.vt(e,5);else if("booleanValue"in t)this.vt(e,10),e.Ft(t.booleanValue?1:0);else if("integerValue"in t)this.vt(e,15),e.Ft(it(t.integerValue));else if("doubleValue"in t){const n=it(t.doubleValue);isNaN(n)?this.vt(e,13):(this.vt(e,15),Sr(n)?e.Ft(0):e.Ft(n))}else if("timestampValue"in t){let n=t.timestampValue;this.vt(e,20),typeof n=="string"&&(n=te(n)),e.Mt("".concat(n.seconds||"")),e.Ft(n.nanos||0)}else if("stringValue"in t)this.xt(t.stringValue,e),this.Ot(e);else if("bytesValue"in t)this.vt(e,30),e.Nt(ee(t.bytesValue)),this.Ot(e);else if("referenceValue"in t)this.Bt(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.vt(e,45),e.Ft(n.latitude||0),e.Ft(n.longitude||0)}else"mapValue"in t?uh(t)?this.vt(e,Number.MAX_SAFE_INTEGER):hi(t)?this.Lt(t.mapValue,e):(this.kt(t.mapValue,e),this.Ot(e)):"arrayValue"in t?(this.qt(t.arrayValue,e),this.Ot(e)):M(19022,{Kt:t})}xt(t,e){this.vt(e,25),this.Ut(t,e)}Ut(t,e){e.Mt(t)}kt(t,e){const n=t.fields||{};this.vt(e,55);for(const s of Object.keys(n))this.xt(s,e),this.Dt(n[s],e)}Lt(t,e){var a,u;const n=t.fields||{};this.vt(e,53);const s=Rn,i=((u=(a=n[s].arrayValue)==null?void 0:a.values)==null?void 0:u.length)||0;this.vt(e,15),e.Ft(it(i)),this.xt(s,e),this.Dt(n[s],e)}qt(t,e){const n=t.values||[];this.vt(e,50);for(const s of n)this.Dt(s,e)}Bt(t,e){this.vt(e,37),O.fromName(t).path.forEach(n=>{this.vt(e,60),this.Ut(n,e)})}vt(t,e){t.Ft(e)}Ot(t){t.Ft(2)}}Be.$t=new Be;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an=255;function Lp(r){if(r===0)return 8;let t=0;return r>>4||(t+=4,r<<=4),r>>6||(t+=2,r<<=2),r>>7||(t+=1),t}function Pc(r){const t=64-function(n){let s=0;for(let i=0;i<8;++i){const a=Lp(255&n[i]);if(s+=a,a!==8)break}return s}(r);return Math.ceil(t/8)}class Bp{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Wt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Qt(n.value),n=e.next();this.Gt()}zt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.jt(n.value),n=e.next();this.Jt()}Ht(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Qt(n);else if(n<2048)this.Qt(960|n>>>6),this.Qt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Qt(480|n>>>12),this.Qt(128|63&n>>>6),this.Qt(128|63&n);else{const s=e.codePointAt(0);this.Qt(240|s>>>18),this.Qt(128|63&s>>>12),this.Qt(128|63&s>>>6),this.Qt(128|63&s)}}this.Gt()}Zt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.jt(n);else if(n<2048)this.jt(960|n>>>6),this.jt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.jt(480|n>>>12),this.jt(128|63&n>>>6),this.jt(128|63&n);else{const s=e.codePointAt(0);this.jt(240|s>>>18),this.jt(128|63&s>>>12),this.jt(128|63&s>>>6),this.jt(128|63&s)}}this.Jt()}Xt(t){const e=this.Yt(t),n=Pc(e);this.en(1+n),this.buffer[this.position++]=255&n;for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=255&e[s]}tn(t){const e=this.Yt(t),n=Pc(e);this.en(1+n),this.buffer[this.position++]=~(255&n);for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=~(255&e[s])}nn(){this.rn(an),this.rn(255)}sn(){this._n(an),this._n(255)}reset(){this.position=0}seed(t){this.en(t.length),this.buffer.set(t,this.position),this.position+=t.length}an(){return this.buffer.slice(0,this.position)}Yt(t){const e=function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)}(t),n=!!(128&e[0]);e[0]^=n?255:128;for(let s=1;s<e.length;++s)e[s]^=n?255:0;return e}Qt(t){const e=255&t;e===0?(this.rn(0),this.rn(255)):e===an?(this.rn(an),this.rn(0)):this.rn(e)}jt(t){const e=255&t;e===0?(this._n(0),this._n(255)):e===an?(this._n(an),this._n(0)):this._n(t)}Gt(){this.rn(0),this.rn(1)}Jt(){this._n(0),this._n(1)}rn(t){this.en(1),this.buffer[this.position++]=t}_n(t){this.en(1),this.buffer[this.position++]=~t}en(t){const e=t+this.position;if(e<=this.buffer.length)return;let n=2*this.buffer.length;n<e&&(n=e);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class Up{constructor(t){this.un=t}Nt(t){this.un.Wt(t)}Mt(t){this.un.Ht(t)}Ft(t){this.un.Xt(t)}Ct(){this.un.nn()}}class qp{constructor(t){this.un=t}Nt(t){this.un.zt(t)}Mt(t){this.un.Zt(t)}Ft(t){this.un.tn(t)}Ct(){this.un.sn()}}class ir{constructor(){this.un=new Bp,this.ascending=new Up(this.un),this.descending=new qp(this.un)}seed(t){this.un.seed(t)}cn(t){return t===0?this.ascending:this.descending}an(){return this.un.an()}reset(){this.un.reset()}}/**
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
 */class Ue{constructor(t,e,n,s){this.ln=t,this.hn=e,this.Pn=n,this.Tn=s}In(){const t=this.Tn.length,e=t===0||this.Tn[t-1]===255?t+1:t,n=new Uint8Array(e);return n.set(this.Tn,0),e!==t?n.set([0],this.Tn.length):++n[n.length-1],new Ue(this.ln,this.hn,this.Pn,n)}En(t,e,n){return{indexId:this.ln,uid:t,arrayValue:xs(this.Pn),directionalValue:xs(this.Tn),orderedDocumentKey:xs(e),documentKey:n.path.toArray()}}Rn(t,e,n){const s=this.En(t,e,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function de(r,t){let e=r.ln-t.ln;return e!==0?e:(e=Cc(r.Pn,t.Pn),e!==0?e:(e=Cc(r.Tn,t.Tn),e!==0?e:O.comparator(r.hn,t.hn)))}function Cc(r,t){for(let e=0;e<r.length&&e<t.length;++e){const n=r[e]-t[e];if(n!==0)return n}return r.length-t.length}function xs(r){return Tl()?function(e){let n="";for(let s=0;s<e.length;s++)n+=String.fromCharCode(e[s]);return n}(r):r}function Dc(r){return typeof r!="string"?r:function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(r)}class xc{constructor(t){this.An=new tt((e,n)=>ot.comparator(e.field,n.field)),this.collectionId=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment(),this.Vn=t.orderBy,this.dn=[];for(const e of t.filters){const n=e;n.isInequality()?this.An=this.An.add(n):this.dn.push(n)}}get mn(){return this.An.size>1}fn(t){if(F(t.collectionGroup===this.collectionId,49279),this.mn)return!1;const e=fo(t);if(e!==void 0&&!this.gn(e))return!1;const n=Oe(t);let s=new Set,i=0,a=0;for(;i<n.length&&this.gn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.An.size>0){const u=this.An.getIterator().getNext();if(!s.has(u.field.canonicalString())){const l=n[i];if(!this.pn(u,l)||!this.yn(this.Vn[a++],l))return!1}++i}for(;i<n.length;++i){const u=n[i];if(a>=this.Vn.length||!this.yn(this.Vn[a++],u))return!1}return!0}wn(){if(this.mn)return null;let t=new tt(ot.comparator);const e=[];for(const n of this.dn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")e.push(new As(n.field,2));else{if(t.has(n.field))continue;t=t.add(n.field),e.push(new As(n.field,0))}for(const n of this.Vn)n.field.isKeyField()||t.has(n.field)||(t=t.add(n.field),e.push(new As(n.field,n.dir==="asc"?0:1)));return new Bs(Bs.UNKNOWN_ID,this.collectionId,e,br.empty())}gn(t){for(const e of this.dn)if(this.pn(e,t))return!0;return!1}pn(t,e){if(t===void 0||!t.field.isEqual(e.fieldPath))return!1;const n=t.op==="array-contains"||t.op==="array-contains-any";return e.kind===2===n}yn(t,e){return!!t.field.isEqual(e.fieldPath)&&(e.kind===0&&t.dir==="asc"||e.kind===1&&t.dir==="desc")}}/**
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
 */function Jh(r){var e,n;if(F(r instanceof K||r instanceof Z,20012),r instanceof K){if(r instanceof _h){const s=((n=(e=r.value.arrayValue)==null?void 0:e.values)==null?void 0:n.map(i=>K.create(r.field,"==",i)))||[];return Z.create(s,"or")}return r}const t=r.filters.map(s=>Jh(s));return Z.create(t,r.op)}function jp(r){if(r.getFilters().length===0)return[];const t=Po(Jh(r));return F(Xh(t),7391),So(t)||Vo(t)?[t]:t.getFilters()}function So(r){return r instanceof K}function Vo(r){return r instanceof Z&&Qo(r)}function Xh(r){return So(r)||Vo(r)||function(e){if(e instanceof Z&&Io(e)){for(const n of e.getFilters())if(!So(n)&&!Vo(n))return!1;return!0}return!1}(r)}function Po(r){if(F(r instanceof K||r instanceof Z,34018),r instanceof K)return r;if(r.filters.length===1)return Po(r.filters[0]);const t=r.filters.map(n=>Po(n));let e=Z.create(t,r.op);return e=Xs(e),Xh(e)?e:(F(e instanceof Z,64498),F(Vn(e),40251),F(e.filters.length>1,57927),e.filters.reduce((n,s)=>ea(n,s)))}function ea(r,t){let e;return F(r instanceof K||r instanceof Z,38388),F(t instanceof K||t instanceof Z,25473),e=r instanceof K?t instanceof K?function(s,i){return Z.create([s,i],"and")}(r,t):Nc(r,t):t instanceof K?Nc(t,r):function(s,i){if(F(s.filters.length>0&&i.filters.length>0,48005),Vn(s)&&Vn(i))return mh(s,i.getFilters());const a=Io(s)?s:i,u=Io(s)?i:s,l=a.filters.map(d=>ea(d,u));return Z.create(l,"or")}(r,t),Xs(e)}function Nc(r,t){if(Vn(t))return mh(t,r.getFilters());{const e=t.filters.map(n=>ea(r,n));return Z.create(e,"or")}}function Xs(r){if(F(r instanceof K||r instanceof Z,11850),r instanceof K)return r;const t=r.getFilters();if(t.length===1)return Xs(t[0]);if(dh(r))return r;const e=t.map(s=>Xs(s)),n=[];return e.forEach(s=>{s instanceof K?n.push(s):s instanceof Z&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:Z.create(n,r.op)}/**
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
 */class zp{constructor(){this.Sn=new na}addToCollectionParentIndex(t,e){return this.Sn.add(e),v.resolve()}getCollectionParents(t,e){return v.resolve(this.Sn.getEntries(e))}addFieldIndex(t,e){return v.resolve()}deleteFieldIndex(t,e){return v.resolve()}deleteAllFieldIndexes(t){return v.resolve()}createTargetIndexes(t,e){return v.resolve()}getDocumentsMatchingTarget(t,e){return v.resolve(null)}getIndexType(t,e){return v.resolve(0)}getFieldIndexes(t,e){return v.resolve([])}getNextCollectionGroupToUpdate(t){return v.resolve(null)}getMinOffset(t,e){return v.resolve(Ot.min())}getMinOffsetFromCollectionGroup(t,e){return v.resolve(Ot.min())}updateCollectionGroup(t,e,n){return v.resolve()}updateIndexEntries(t,e){return v.resolve()}}class na{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new tt(X.comparator),i=!s.has(n);return this.index[e]=s.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new tt(X.comparator)).toArray()}}/**
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
 */const kc="IndexedDbIndexManager",Is=new Uint8Array(0);class $p{constructor(t,e){this.databaseId=e,this.bn=new na,this.Dn=new re(n=>Je(n),(n,s)=>jr(n,s)),this.uid=t.uid||""}addToCollectionParentIndex(t,e){if(!this.bn.has(e)){const n=e.lastSegment(),s=e.popLast();t.addOnCommittedListener(()=>{this.bn.add(e)});const i={collectionId:n,parent:vt(s)};return Oc(t).put(i)}return v.resolve()}getCollectionParents(t,e){const n=[],s=IDBKeyRange.bound([e,""],[Fl(e),""],!1,!0);return Oc(t).J(s).next(i=>{for(const a of i){if(a.collectionId!==e)break;n.push(Kt(a.parent))}return n})}addFieldIndex(t,e){const n=or(t),s=function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(e);delete s.indexId;const i=n.add(s);if(e.indexState){const a=cn(t);return i.next(u=>{a.put(bc(u,this.uid,e.indexState.sequenceNumber,e.indexState.offset))})}return i.next()}deleteFieldIndex(t,e){const n=or(t),s=cn(t),i=un(t);return n.delete(e.indexId).next(()=>s.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0)))}deleteAllFieldIndexes(t){const e=or(t),n=un(t),s=cn(t);return e.X().next(()=>n.X()).next(()=>s.X())}createTargetIndexes(t,e){return v.forEach(this.Cn(e),n=>this.getIndexType(t,n).next(s=>{if(s===0||s===1){const i=new xc(n).wn();if(i!=null)return this.addFieldIndex(t,i)}}))}getDocumentsMatchingTarget(t,e){const n=un(t);let s=!0;const i=new Map;return v.forEach(this.Cn(e),a=>this.vn(t,a).next(u=>{s&&(s=!!u),i.set(a,u)})).next(()=>{if(s){let a=$();const u=[];return v.forEach(i,(l,d)=>{P(kc,"Using index ".concat(function(U){return"id=".concat(U.indexId,"|cg=").concat(U.collectionGroup,"|f=").concat(U.fields.map(nt=>"".concat(nt.fieldPath,":").concat(nt.kind)).join(","))}(l)," to execute ").concat(Je(e)));const f=function(U,nt){const W=fo(nt);if(W===void 0)return null;for(const J of Ks(U,W.fieldPath))switch(J.op){case"array-contains-any":return J.value.arrayValue.values||[];case"array-contains":return[J.value]}return null}(d,l),g=function(U,nt){const W=new Map;for(const J of Oe(nt))for(const E of Ks(U,J.fieldPath))switch(E.op){case"==":case"in":W.set(J.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return W.set(J.fieldPath.canonicalString(),E.value),Array.from(W.values())}return null}(d,l),I=function(U,nt){const W=[];let J=!0;for(const E of Oe(nt)){const p=E.kind===0?dc(U,E.fieldPath,U.startAt):fc(U,E.fieldPath,U.startAt);W.push(p.value),J&&(J=p.inclusive)}return new Sn(W,J)}(d,l),S=function(U,nt){const W=[];let J=!0;for(const E of Oe(nt)){const p=E.kind===0?fc(U,E.fieldPath,U.endAt):dc(U,E.fieldPath,U.endAt);W.push(p.value),J&&(J=p.inclusive)}return new Sn(W,J)}(d,l),D=this.Fn(l,d,I),k=this.Fn(l,d,S),N=this.Mn(l,d,g),G=this.xn(l.indexId,f,D,I.inclusive,k,S.inclusive,N);return v.forEach(G,j=>n.Z(j,e.limit).next(U=>{U.forEach(nt=>{const W=O.fromSegments(nt.documentKey);a.has(W)||(a=a.add(W),u.push(W))})}))}).next(()=>u)}return v.resolve(null)})}Cn(t){let e=this.Dn.get(t);return e||(t.filters.length===0?e=[t]:e=jp(Z.create(t.filters,"and")).map(n=>To(t.path,t.collectionGroup,t.orderBy,n.getFilters(),t.limit,t.startAt,t.endAt)),this.Dn.set(t,e),e)}xn(t,e,n,s,i,a,u){const l=(e!=null?e.length:1)*Math.max(n.length,i.length),d=l/(e!=null?e.length:1),f=[];for(let g=0;g<l;++g){const I=e?this.On(e[g/d]):Is,S=this.Nn(t,I,n[g%d],s),D=this.Bn(t,I,i[g%d],a),k=u.map(N=>this.Nn(t,I,N,!0));f.push(...this.createRange(S,D,k))}return f}Nn(t,e,n,s){const i=new Ue(t,O.empty(),e,n);return s?i:i.In()}Bn(t,e,n,s){const i=new Ue(t,O.empty(),e,n);return s?i.In():i}vn(t,e){const n=new xc(e),s=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment();return this.getFieldIndexes(t,s).next(i=>{let a=null;for(const u of i)n.fn(u)&&(!a||u.fields.length>a.fields.length)&&(a=u);return a})}getIndexType(t,e){let n=2;const s=this.Cn(e);return v.forEach(s,i=>this.vn(t,i).next(a=>{a?n!==0&&a.fields.length<function(l){let d=new tt(ot.comparator),f=!1;for(const g of l.filters)for(const I of g.getFlattenedFilters())I.field.isKeyField()||(I.op==="array-contains"||I.op==="array-contains-any"?f=!0:d=d.add(I.field));for(const g of l.orderBy)g.field.isKeyField()||(d=d.add(g.field));return d.size+(f?1:0)}(i)&&(n=1):n=0})).next(()=>function(a){return a.limit!==null}(e)&&s.length>1&&n===2?1:n)}Ln(t,e){const n=new ir;for(const s of Oe(t)){const i=e.data.field(s.fieldPath);if(i==null)return null;const a=n.cn(s.kind);Be.$t.bt(i,a)}return n.an()}On(t){const e=new ir;return Be.$t.bt(t,e.cn(0)),e.an()}kn(t,e){const n=new ir;return Be.$t.bt(Nr(this.databaseId,e),n.cn(function(i){const a=Oe(i);return a.length===0?0:a[a.length-1].kind}(t))),n.an()}Mn(t,e,n){if(n===null)return[];let s=[];s.push(new ir);let i=0;for(const a of Oe(t)){const u=n[i++];for(const l of s)if(this.qn(e,a.fieldPath)&&Or(u))s=this.Kn(s,a,u);else{const d=l.cn(a.kind);Be.$t.bt(u,d)}}return this.Un(s)}Fn(t,e,n){return this.Mn(t,e,n.position)}Un(t){const e=[];for(let n=0;n<t.length;++n)e[n]=t[n].an();return e}Kn(t,e,n){const s=[...t],i=[];for(const a of n.arrayValue.values||[])for(const u of s){const l=new ir;l.seed(u.an()),Be.$t.bt(a,l.cn(e.kind)),i.push(l)}return i}qn(t,e){return!!t.filters.find(n=>n instanceof K&&n.field.isEqual(e)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(t,e){const n=or(t),s=cn(t);return(e?n.J(go,IDBKeyRange.bound(e,e)):n.J()).next(i=>{const a=[];return v.forEach(i,u=>s.get([u.indexId,this.uid]).next(l=>{a.push(function(f,g){const I=g?new br(g.sequenceNumber,new Ot(Ye(g.readTime),new O(Kt(g.documentKey)),g.largestBatchId)):br.empty(),S=f.fields.map(([D,k])=>new As(ot.fromServerFormat(D),k));return new Bs(f.indexId,f.collectionGroup,S,I)}(u,l))})).next(()=>a)})}getNextCollectionGroupToUpdate(t){return this.getFieldIndexes(t).next(e=>e.length===0?null:(e.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:B(n.collectionGroup,s.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(t,e,n){const s=or(t),i=cn(t);return this.$n(t).next(a=>s.J(go,IDBKeyRange.bound(e,e)).next(u=>v.forEach(u,l=>i.put(bc(l.indexId,this.uid,a,n)))))}updateIndexEntries(t,e){const n=new Map;return v.forEach(e,(s,i)=>{const a=n.get(s.collectionGroup);return(a?v.resolve(a):this.getFieldIndexes(t,s.collectionGroup)).next(u=>(n.set(s.collectionGroup,u),v.forEach(u,l=>this.Wn(t,s,l).next(d=>{const f=this.Qn(i,l);return d.isEqual(f)?v.resolve():this.Gn(t,i,l,d,f)}))))})}zn(t,e,n,s){return un(t).put(s.En(this.uid,this.kn(n,e.key),e.key))}jn(t,e,n,s){return un(t).delete(s.Rn(this.uid,this.kn(n,e.key),e.key))}Wn(t,e,n){const s=un(t);let i=new tt(de);return s.ee({index:Hl,range:IDBKeyRange.only([n.indexId,this.uid,xs(this.kn(n,e))])},(a,u)=>{i=i.add(new Ue(n.indexId,e,Dc(u.arrayValue),Dc(u.directionalValue)))}).next(()=>i)}Qn(t,e){let n=new tt(de);const s=this.Ln(e,t);if(s==null)return n;const i=fo(e);if(i!=null){const a=t.data.field(i.fieldPath);if(Or(a))for(const u of a.arrayValue.values||[])n=n.add(new Ue(e.indexId,t.key,this.On(u),s))}else n=n.add(new Ue(e.indexId,t.key,Is,s));return n}Gn(t,e,n,s,i){P(kc,"Updating index entries for document '%s'",e.key);const a=[];return function(l,d,f,g,I){const S=l.getIterator(),D=d.getIterator();let k=on(S),N=on(D);for(;k||N;){let G=!1,j=!1;if(k&&N){const U=f(k,N);U<0?j=!0:U>0&&(G=!0)}else k!=null?j=!0:G=!0;G?(g(N),N=on(D)):j?(I(k),k=on(S)):(k=on(S),N=on(D))}}(s,i,de,u=>{a.push(this.zn(t,e,n,u))},u=>{a.push(this.jn(t,e,n,u))}),v.waitFor(a)}$n(t){let e=1;return cn(t).ee({index:Ql,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),e=s.sequenceNumber+1}).next(()=>e)}createRange(t,e,n){n=n.sort((a,u)=>de(a,u)).filter((a,u,l)=>!u||de(a,l[u-1])!==0);const s=[];s.push(t);for(const a of n){const u=de(a,t),l=de(a,e);if(u===0)s[0]=t.In();else if(u>0&&l<0)s.push(a),s.push(a.In());else if(l>0)break}s.push(e);const i=[];for(let a=0;a<s.length;a+=2){if(this.Jn(s[a],s[a+1]))return[];const u=s[a].Rn(this.uid,Is,O.empty()),l=s[a+1].Rn(this.uid,Is,O.empty());i.push(IDBKeyRange.bound(u,l))}return i}Jn(t,e){return de(t,e)>0}getMinOffsetFromCollectionGroup(t,e){return this.getFieldIndexes(t,e).next(Mc)}getMinOffset(t,e){return v.mapArray(this.Cn(e),n=>this.vn(t,n).next(s=>s||M(44426))).next(Mc)}}function Oc(r){return gt(r,Cr)}function un(r){return gt(r,yr)}function or(r){return gt(r,qo)}function cn(r){return gt(r,_r)}function Mc(r){F(r.length!==0,28825);let t=r[0].indexState.offset,e=t.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;Lo(s,t)<0&&(t=s),e<s.largestBatchId&&(e=s.largestBatchId)}return new Ot(t.readTime,t.documentKey,e)}/**
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
 */const Fc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Yh=41943040;class Tt{static withCacheSize(t){return new Tt(t,Tt.DEFAULT_COLLECTION_PERCENTILE,Tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
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
 */function Zh(r,t,e){const n=r.store(Ut),s=r.store(Tn),i=[],a=IDBKeyRange.only(e.batchId);let u=0;const l=n.ee({range:a},(f,g,I)=>(u++,I.delete()));i.push(l.next(()=>{F(u===1,47070,{batchId:e.batchId})}));const d=[];for(const f of e.mutations){const g=$l(t,f.key.path,e.batchId);i.push(s.delete(g)),d.push(f.key)}return v.waitFor(i).next(()=>d)}function Ys(r){if(!r)return 0;let t;if(r.document)t=r.document;else if(r.unknownDocument)t=r.unknownDocument;else{if(!r.noDocument)throw M(14731);t=r.noDocument}return JSON.stringify(t).length}/**
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
 */Tt.DEFAULT_COLLECTION_PERCENTILE=10,Tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Tt.DEFAULT=new Tt(Yh,Tt.DEFAULT_COLLECTION_PERCENTILE,Tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Tt.DISABLED=new Tt(-1,0,0);class _i{constructor(t,e,n,s){this.userId=t,this.serializer=e,this.indexManager=n,this.referenceDelegate=s,this.Hn={}}static yt(t,e,n,s){F(t.uid!=="",64387);const i=t.isAuthenticated()?t.uid:"";return new _i(i,e,n,s)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return fe(t).ee({index:qe,range:n},(s,i,a)=>{e=!1,a.done()}).next(()=>e)}addMutationBatch(t,e,n,s){const i=gn(t),a=fe(t);return a.add({}).next(u=>{F(typeof u=="number",49019);const l=new Jo(u,e,n,s),d=function(S,D,k){const N=k.baseMutations.map(j=>Ws(S.gt,j)),G=k.mutations.map(j=>Ws(S.gt,j));return{userId:D,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:N,mutations:G}}(this.serializer,this.userId,l),f=[];let g=new tt((I,S)=>B(I.canonicalString(),S.canonicalString()));for(const I of s){const S=$l(this.userId,I.key.path,u);g=g.add(I.key.path.popLast()),f.push(a.put(d)),f.push(i.put(S,pg))}return g.forEach(I=>{f.push(this.indexManager.addToCollectionParentIndex(t,I))}),t.addOnCommittedListener(()=>{this.Hn[u]=l.keys()}),v.waitFor(f).next(()=>l)})}lookupMutationBatch(t,e){return fe(t).get(e).next(n=>n?(F(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:e}),Le(this.serializer,n)):null)}Zn(t,e){return this.Hn[e]?v.resolve(this.Hn[e]):this.lookupMutationBatch(t,e).next(n=>{if(n){const s=n.keys();return this.Hn[e]=s,s}return null})}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return fe(t).ee({index:qe,range:s},(a,u,l)=>{u.userId===this.userId&&(F(u.batchId>=n,47524,{Xn:n}),i=Le(this.serializer,u)),l.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=ze;return fe(t).ee({index:qe,range:e,reverse:!0},(s,i,a)=>{n=i.batchId,a.done()}).next(()=>n)}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,ze],[this.userId,Number.POSITIVE_INFINITY]);return fe(t).J(qe,e).next(n=>n.map(s=>Le(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=Rs(this.userId,e.path),s=IDBKeyRange.lowerBound(n),i=[];return gn(t).ee({range:s},(a,u,l)=>{const[d,f,g]=a,I=Kt(f);if(d===this.userId&&e.path.isEqual(I))return fe(t).get(g).next(S=>{if(!S)throw M(61480,{Yn:a,batchId:g});F(S.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:S.userId,batchId:g}),i.push(Le(this.serializer,S))});l.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new tt(B);const s=[];return e.forEach(i=>{const a=Rs(this.userId,i.path),u=IDBKeyRange.lowerBound(a),l=gn(t).ee({range:u},(d,f,g)=>{const[I,S,D]=d,k=Kt(S);I===this.userId&&i.path.isEqual(k)?n=n.add(D):g.done()});s.push(l)}),v.waitFor(s).next(()=>this.er(t,n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1,i=Rs(this.userId,n),a=IDBKeyRange.lowerBound(i);let u=new tt(B);return gn(t).ee({range:a},(l,d,f)=>{const[g,I,S]=l,D=Kt(I);g===this.userId&&n.isPrefixOf(D)?D.length===s&&(u=u.add(S)):f.done()}).next(()=>this.er(t,u))}er(t,e){const n=[],s=[];return e.forEach(i=>{s.push(fe(t).get(i).next(a=>{if(a===null)throw M(35274,{batchId:i});F(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:i}),n.push(Le(this.serializer,a))}))}),v.waitFor(s).next(()=>n)}removeMutationBatch(t,e){return Zh(t.le,this.userId,e).next(n=>(t.addOnCommittedListener(()=>{this.tr(e.batchId)}),v.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(t,s))))}tr(t){delete this.Hn[t]}performConsistencyCheck(t){return this.checkEmpty(t).next(e=>{if(!e)return v.resolve();const n=IDBKeyRange.lowerBound(function(a){return[a]}(this.userId)),s=[];return gn(t).ee({range:n},(i,a,u)=>{if(i[0]===this.userId){const l=Kt(i[1]);s.push(l)}else u.done()}).next(()=>{F(s.length===0,56720,{nr:s.map(i=>i.canonicalString())})})})}containsKey(t,e){return td(t,this.userId,e)}rr(t){return ed(t).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:ze,lastStreamToken:""})}}function td(r,t,e){const n=Rs(t,e.path),s=n[1],i=IDBKeyRange.lowerBound(n);let a=!1;return gn(r).ee({range:i,Y:!0},(u,l,d)=>{const[f,g,I]=u;f===t&&g===s&&(a=!0),d.done()}).next(()=>a)}function fe(r){return gt(r,Ut)}function gn(r){return gt(r,Tn)}function ed(r){return gt(r,Vr)}/**
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
 */class ne{constructor(t){this.ir=t}next(){return this.ir+=2,this.ir}static sr(){return new ne(0)}static _r(){return new ne(-1)}}/**
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
 */class Kp{constructor(t,e){this.referenceDelegate=t,this.serializer=e}allocateTargetId(t){return this.ar(t).next(e=>{const n=new ne(e.highestTargetId);return e.highestTargetId=n.next(),this.ur(t,e).next(()=>e.highestTargetId)})}getLastRemoteSnapshotVersion(t){return this.ar(t).next(e=>L.fromTimestamp(new Y(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(t){return this.ar(t).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(t,e,n){return this.ar(t).next(s=>(s.highestListenSequenceNumber=e,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),e>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=e),this.ur(t,s)))}addTargetData(t,e){return this.cr(t,e).next(()=>this.ar(t).next(n=>(n.targetCount+=1,this.lr(e,n),this.ur(t,n))))}updateTargetData(t,e){return this.cr(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next(()=>ln(t).delete(e.targetId)).next(()=>this.ar(t)).next(n=>(F(n.targetCount>0,8065),n.targetCount-=1,this.ur(t,n)))}removeTargets(t,e,n){let s=0;const i=[];return ln(t).ee((a,u)=>{const l=fr(u);l.sequenceNumber<=e&&n.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(t,l)))}).next(()=>v.waitFor(i)).next(()=>s)}forEachTarget(t,e){return ln(t).ee((n,s)=>{const i=fr(s);e(i)})}ar(t){return Lc(t).get(js).next(e=>(F(e!==null,2888),e))}ur(t,e){return Lc(t).put(js,e)}cr(t,e){return ln(t).put(Hh(this.serializer,e))}lr(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.ar(t).next(e=>e.targetCount)}getTargetData(t,e){const n=Je(e),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return ln(t).ee({range:s,index:Gl},(a,u,l)=>{const d=fr(u);jr(e,d.target)&&(i=d,l.done())}).next(()=>i)}addMatchingKeys(t,e,n){const s=[],i=ge(t);return e.forEach(a=>{const u=vt(a.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(t,n,a))}),v.waitFor(s)}removeMatchingKeys(t,e,n){const s=ge(t);return v.forEach(e,i=>{const a=vt(i.path);return v.waitFor([s.delete([n,a]),this.referenceDelegate.removeReference(t,n,i)])})}removeMatchingKeysForTargetId(t,e){const n=ge(t),s=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),s=ge(t);let i=$();return s.ee({range:n,Y:!0},(a,u,l)=>{const d=Kt(a[1]),f=new O(d);i=i.add(f)}).next(()=>i)}containsKey(t,e){const n=vt(e.path),s=IDBKeyRange.bound([n],[Fl(n)],!1,!0);let i=0;return ge(t).ee({index:Uo,Y:!0,range:s},([a,u],l,d)=>{a!==0&&(i++,d.done())}).next(()=>i>0)}Rt(t,e){return ln(t).get(e).next(n=>n?fr(n):null)}}function ln(r){return gt(r,wn)}function Lc(r){return gt(r,$e)}function ge(r){return gt(r,vn)}/**
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
 */const Bc="LruGarbageCollector",nd=1048576;function Uc([r,t],[e,n]){const s=B(r,e);return s===0?B(t,n):s}class Gp{constructor(t){this.hr=t,this.buffer=new tt(Uc),this.Pr=0}Tr(){return++this.Pr}Ir(t){const e=[t,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Uc(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class rd{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return this.Er!==null}Rr(t){P(Bc,"Garbage collection scheduled in ".concat(t,"ms")),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Re(e)?P(Bc,"Ignoring IndexedDB error during garbage collection: ",e):await Ze(e)}await this.Rr(3e5)})}}class Qp{constructor(t,e){this.Ar=t,this.params=e}calculateTargetCount(t,e){return this.Ar.Vr(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return v.resolve(Ft.ce);const n=new Gp(e);return this.Ar.forEachTarget(t,s=>n.Ir(s.sequenceNumber)).next(()=>this.Ar.dr(t,s=>n.Ir(s))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Ar.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Ar.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(P("LruGarbageCollector","Garbage collection skipped; disabled"),v.resolve(Fc)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(P("LruGarbageCollector","Garbage collection skipped; Cache size ".concat(n," is lower than threshold ").concat(this.params.cacheSizeCollectionThreshold)),Fc):this.mr(t,e))}getCacheSize(t){return this.Ar.getCacheSize(t)}mr(t,e){let n,s,i,a,u,l,d;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(P("LruGarbageCollector","Capping sequence numbers to collect down to the maximum of ".concat(this.params.maximumSequenceNumbersToCollect," from ").concat(g)),s=this.params.maximumSequenceNumbersToCollect):s=g,a=Date.now(),this.nthSequenceNumber(t,s))).next(g=>(n=g,u=Date.now(),this.removeTargets(t,n,e))).next(g=>(i=g,l=Date.now(),this.removeOrphanedDocuments(t,n))).next(g=>(d=Date.now(),hn()<=H.DEBUG&&P("LruGarbageCollector","LRU Garbage Collection\n	Counted targets in ".concat(a-f,"ms\n	Determined least recently used ").concat(s," in ")+(u-a)+"ms\n"+"	Removed ".concat(i," targets in ")+(l-u)+"ms\n"+"	Removed ".concat(g," documents in ")+(d-l)+"ms\n"+"Total Duration: ".concat(d-f,"ms")),v.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:g})))}}function sd(r,t){return new Qp(r,t)}/**
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
 */class Hp{constructor(t,e){this.db=t,this.garbageCollector=sd(this,e)}Vr(t){const e=this.gr(t);return this.db.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}gr(t){let e=0;return this.dr(t,n=>{e++}).next(()=>e)}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}dr(t,e){return this.pr(t,(n,s)=>e(s))}addReference(t,e,n){return Es(t,n)}removeReference(t,e,n){return Es(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return Es(t,e)}yr(t,e){return function(s,i){let a=!1;return ed(s).te(u=>td(s,u,i).next(l=>(l&&(a=!0),v.resolve(!l)))).next(()=>a)}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.pr(t,(a,u)=>{if(u<=e){const l=this.yr(t,a).next(d=>{if(!d)return i++,n.getEntry(t,a).next(()=>(n.removeEntry(a,L.min()),ge(t).delete(function(g){return[0,vt(g.path)]}(a))))});s.push(l)}}).next(()=>v.waitFor(s)).next(()=>n.apply(t)).next(()=>i)}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return Es(t,e)}pr(t,e){const n=ge(t);let s,i=Ft.ce;return n.ee({index:Uo},([a,u],{path:l,sequenceNumber:d})=>{a===0?(i!==Ft.ce&&e(new O(Kt(s)),i),i=d,s=l):i=Ft.ce}).next(()=>{i!==Ft.ce&&e(new O(Kt(s)),i)})}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function Es(r,t){return ge(r).put(function(n,s){return{targetId:0,path:vt(n.path),sequenceNumber:s}}(t,r.currentSequenceNumber))}/**
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
 */class id{constructor(){this.changes=new re(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,ut.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?v.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class Wp{constructor(t){this.serializer=t}setIndexManager(t){this.indexManager=t}addEntry(t,e,n){return Ne(t).put(n)}removeEntry(t,e,n){return Ne(t).delete(function(i,a){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],Js(a),u[u.length-1]]}(e,n))}updateMetadata(t,e){return this.getMetadata(t).next(n=>(n.byteSize+=e,this.wr(t,n)))}getEntry(t,e){let n=ut.newInvalidDocument(e);return Ne(t).ee({index:bs,range:IDBKeyRange.only(ar(e))},(s,i)=>{n=this.Sr(e,i)}).next(()=>n)}br(t,e){let n={size:0,document:ut.newInvalidDocument(e)};return Ne(t).ee({index:bs,range:IDBKeyRange.only(ar(e))},(s,i)=>{n={document:this.Sr(e,i),size:Ys(i)}}).next(()=>n)}getEntries(t,e){let n=kt();return this.Dr(t,e,(s,i)=>{const a=this.Sr(s,i);n=n.insert(s,a)}).next(()=>n)}Cr(t,e){let n=kt(),s=new st(O.comparator);return this.Dr(t,e,(i,a)=>{const u=this.Sr(i,a);n=n.insert(i,u),s=s.insert(i,Ys(a))}).next(()=>({documents:n,vr:s}))}Dr(t,e,n){if(e.isEmpty())return v.resolve();let s=new tt(zc);e.forEach(l=>s=s.add(l));const i=IDBKeyRange.bound(ar(s.first()),ar(s.last())),a=s.getIterator();let u=a.getNext();return Ne(t).ee({index:bs,range:i},(l,d,f)=>{const g=O.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;u&&zc(u,g)<0;)n(u,null),u=a.getNext();u&&u.isEqual(g)&&(n(u,d),u=a.hasNext()?a.getNext():null),u?f.j(ar(u)):f.done()}).next(()=>{for(;u;)n(u,null),u=a.hasNext()?a.getNext():null})}getDocumentsMatchingQuery(t,e,n,s,i){const a=e.path,u=[a.popLast().toArray(),a.lastSegment(),Js(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],l=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Ne(t).J(IDBKeyRange.bound(u,l,!0)).next(d=>{i==null||i.incrementDocumentReadCount(d.length);let f=kt();for(const g of d){const I=this.Sr(O.fromSegments(g.prefixPath.concat(g.collectionGroup,g.documentId)),g);I.isFoundDocument()&&($r(e,I)||s.has(I.key))&&(f=f.insert(I.key,I))}return f})}getAllFromCollectionGroup(t,e,n,s){let i=kt();const a=jc(e,n),u=jc(e,Ot.max());return Ne(t).ee({index:Kl,range:IDBKeyRange.bound(a,u,!0)},(l,d,f)=>{const g=this.Sr(O.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);i=i.insert(g.key,g),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(t){return new Jp(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next(e=>e.byteSize)}getMetadata(t){return qc(t).get(mo).next(e=>(F(!!e,20021),e))}wr(t,e){return qc(t).put(mo,e)}Sr(t,e){if(e){const n=Op(this.serializer,e);if(!(n.isNoDocument()&&n.version.isEqual(L.min())))return n}return ut.newInvalidDocument(t)}}function od(r){return new Wp(r)}class Jp extends id{constructor(t,e){super(),this.Fr=t,this.trackRemovals=e,this.Mr=new re(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(t){const e=[];let n=0,s=new tt((i,a)=>B(i.canonicalString(),a.canonicalString()));return this.changes.forEach((i,a)=>{const u=this.Mr.get(i);if(e.push(this.Fr.removeEntry(t,i,u.readTime)),a.isValidDocument()){const l=Ac(this.Fr.serializer,a);s=s.add(i.path.popLast());const d=Ys(l);n+=d-u.size,e.push(this.Fr.addEntry(t,i,l))}else if(n-=u.size,this.trackRemovals){const l=Ac(this.Fr.serializer,a.convertToNoDocument(L.min()));e.push(this.Fr.addEntry(t,i,l))}}),s.forEach(i=>{e.push(this.Fr.indexManager.addToCollectionParentIndex(t,i))}),e.push(this.Fr.updateMetadata(t,n)),v.waitFor(e)}getFromCache(t,e){return this.Fr.br(t,e).next(n=>(this.Mr.set(e,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(t,e){return this.Fr.Cr(t,e).next(({documents:n,vr:s})=>(s.forEach((i,a)=>{this.Mr.set(i,{size:a,readTime:n.get(i).readTime})}),n))}}function qc(r){return gt(r,Pr)}function Ne(r){return gt(r,qs)}function ar(r){const t=r.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function jc(r,t){const e=t.documentKey.path.toArray();return[r,Js(t.readTime),e.slice(0,e.length-2),e.length>0?e[e.length-1]:""]}function zc(r,t){const e=r.path.toArray(),n=t.path.toArray();let s=0;for(let i=0;i<e.length-2&&i<n.length-2;++i)if(s=B(e[i],n[i]),s)return s;return s=B(e.length,n.length),s||(s=B(e[e.length-2],n[n.length-2]),s||B(e[e.length-1],n[n.length-1]))}/**
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
 */class Xp{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class ad{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(n=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(n!==null&&wr(n.mutation,s,Ct.empty(),Y.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,$()).next(()=>n))}getLocalViewOfDocuments(t,e,n=$()){const s=Gt();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,n).next(i=>{let a=hr();return i.forEach((u,l)=>{a=a.insert(u,l.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const n=Gt();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,$()))}populateOverlays(t,e,n){const s=[];return n.forEach(i=>{e.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(t,s).next(i=>{i.forEach((a,u)=>{e.set(a,u)})})}computeViews(t,e,n,s){let i=kt();const a=Tr(),u=function(){return Tr()}();return e.forEach((l,d)=>{const f=n.get(d.key);s.has(d.key)&&(f===void 0||f.mutation instanceof se)?i=i.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),wr(f.mutation,d,f.mutation.getFieldMask(),Y.now())):a.set(d.key,Ct.empty())}),this.recalculateAndSaveOverlays(t,i).next(l=>(l.forEach((d,f)=>a.set(d,f)),e.forEach((d,f)=>{var g;return u.set(d,new Xp(f,(g=a.get(d))!=null?g:null))}),u))}recalculateAndSaveOverlays(t,e){const n=Tr();let s=new st((a,u)=>a-u),i=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const u of a)u.keys().forEach(l=>{const d=e.get(l);if(d===null)return;let f=n.get(l)||Ct.empty();f=u.applyToLocalView(d,f),n.set(l,f);const g=(s.get(u.batchId)||$()).add(l);s=s.insert(u.batchId,g)})}).next(()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const l=u.getNext(),d=l.key,f=l.value,g=vh();f.forEach(I=>{if(!i.has(I)){const S=Ph(e.get(I),n.get(I));S!==null&&g.set(I,S),i=i.add(I)}}),a.push(this.documentOverlayCache.saveOverlays(t,d,g))}return v.waitFor(a)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,s){return tp(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):yh(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-i.size):v.resolve(Gt());let u=Rr,l=i;return a.next(d=>v.forEach(d,(f,g)=>(u<g.largestBatchId&&(u=g.largestBatchId),i.get(f)?v.resolve():this.remoteDocumentCache.getEntry(t,f).next(I=>{l=l.insert(f,I)}))).next(()=>this.populateOverlays(t,d,i)).next(()=>this.computeViews(t,l,d,$())).next(f=>({batchId:u,changes:wh(f)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new O(e)).next(n=>{let s=hr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const i=e.collectionGroup;let a=hr();return this.indexManager.getCollectionParents(t,i).next(u=>v.forEach(u,l=>{const d=function(g,I){return new Ln(I,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(e,l.child(i));return this.getDocumentsMatchingCollectionQuery(t,d,n,s).next(f=>{f.forEach((g,I)=>{a=a.insert(g,I)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,i,s))).next(a=>{i.forEach((l,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,ut.newInvalidDocument(f)))});let u=hr();return a.forEach((l,d)=>{const f=i.get(l);f!==void 0&&wr(f.mutation,d,Ct.empty(),Y.now()),$r(e,d)&&(u=u.insert(l,d))}),u})}}/**
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
 */class Yp{constructor(t){this.serializer=t,this.Or=new Map,this.Nr=new Map}getBundleMetadata(t,e){return v.resolve(this.Or.get(e))}saveBundleMetadata(t,e){return this.Or.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Vt(s.createTime)}}(e)),v.resolve()}getNamedQuery(t,e){return v.resolve(this.Nr.get(e))}saveNamedQuery(t,e){return this.Nr.set(e.name,function(s){return{name:s.name,query:Wh(s.bundledQuery),readTime:Vt(s.readTime)}}(e)),v.resolve()}}/**
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
 */class Zp{constructor(){this.overlays=new st(O.comparator),this.Br=new Map}getOverlay(t,e){return v.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Gt();return v.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((s,i)=>{this.wt(t,e,i)}),v.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Br.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Br.delete(n)),v.resolve()}getOverlaysForCollection(t,e,n){const s=Gt(),i=e.length+1,a=new O(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const l=u.getNext().value,d=l.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===i&&l.largestBatchId>n&&s.set(l.getKey(),l)}return v.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let i=new st((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>n){let f=i.get(d.largestBatchId);f===null&&(f=Gt(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const u=Gt(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,f)=>u.set(d,f)),!(u.size()>=s)););return v.resolve(u)}wt(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.Br.get(s.largestBatchId).delete(n.key);this.Br.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Yo(e,n));let i=this.Br.get(e);i===void 0&&(i=$(),this.Br.set(e,i)),this.Br.set(e,i.add(n.key))}}/**
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
 */class t_{constructor(){this.sessionToken=dt.EMPTY_BYTE_STRING}getSessionToken(t){return v.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,v.resolve()}}/**
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
 */class ra{constructor(){this.Lr=new tt(_t.kr),this.qr=new tt(_t.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(t,e){const n=new _t(t,e);this.Lr=this.Lr.add(n),this.qr=this.qr.add(n)}Ur(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.$r(new _t(t,e))}Wr(t,e){t.forEach(n=>this.removeReference(n,e))}Qr(t){const e=new O(new X([])),n=new _t(e,t),s=new _t(e,t+1),i=[];return this.qr.forEachInRange([n,s],a=>{this.$r(a),i.push(a.key)}),i}Gr(){this.Lr.forEach(t=>this.$r(t))}$r(t){this.Lr=this.Lr.delete(t),this.qr=this.qr.delete(t)}zr(t){const e=new O(new X([])),n=new _t(e,t),s=new _t(e,t+1);let i=$();return this.qr.forEachInRange([n,s],a=>{i=i.add(a.key)}),i}containsKey(t){const e=new _t(t,0),n=this.Lr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class _t{constructor(t,e){this.key=t,this.jr=e}static kr(t,e){return O.comparator(t.key,e.key)||B(t.jr,e.jr)}static Kr(t,e){return B(t.jr,e.jr)||O.comparator(t.key,e.key)}}/**
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
 */class e_{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Xn=1,this.Jr=new tt(_t.kr)}checkEmpty(t){return v.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const i=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Jo(i,e,n,s);this.mutationQueue.push(a);for(const u of s)this.Jr=this.Jr.add(new _t(u.key,i)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return v.resolve(a)}lookupMutationBatch(t,e){return v.resolve(this.Hr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.Zr(n),i=s<0?0:s;return v.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return v.resolve(this.mutationQueue.length===0?ze:this.Xn-1)}getAllMutationBatches(t){return v.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new _t(e,0),s=new _t(e,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([n,s],a=>{const u=this.Hr(a.jr);i.push(u)}),v.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new tt(B);return e.forEach(s=>{const i=new _t(s,0),a=new _t(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,a],u=>{n=n.add(u.jr)})}),v.resolve(this.Xr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let i=n;O.isDocumentKey(i)||(i=i.child(""));const a=new _t(new O(i),0);let u=new tt(B);return this.Jr.forEachWhile(l=>{const d=l.key.path;return!!n.isPrefixOf(d)&&(d.length===s&&(u=u.add(l.jr)),!0)},a),v.resolve(this.Xr(u))}Xr(t){const e=[];return t.forEach(n=>{const s=this.Hr(n);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){F(this.Yr(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Jr;return v.forEach(e.mutations,s=>{const i=new _t(s.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Jr=n})}tr(t){}containsKey(t,e){const n=new _t(e,0),s=this.Jr.firstAfterOrEqual(n);return v.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,v.resolve()}Yr(t,e){return this.Zr(t)}Zr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Hr(t){const e=this.Zr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class n_{constructor(t){this.ei=t,this.docs=function(){return new st(O.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),i=s?s.size:0,a=this.ei(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return v.resolve(n?n.document.mutableCopy():ut.newInvalidDocument(e))}getEntries(t,e){let n=kt();return e.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():ut.newInvalidDocument(s))}),v.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let i=kt();const a=e.path,u=new O(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){const{key:d,value:{document:f}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Lo(Ul(f),n)<=0||(s.has(f.key)||$r(e,f))&&(i=i.insert(f.key,f.mutableCopy()))}return v.resolve(i)}getAllFromCollectionGroup(t,e,n,s){M(9500)}ti(t,e){return v.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new r_(this)}getSize(t){return v.resolve(this.size)}}class r_ extends id{constructor(t){super(),this.Fr=t}applyChanges(t){const e=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?e.push(this.Fr.addEntry(t,s)):this.Fr.removeEntry(n)}),v.waitFor(e)}getFromCache(t,e){return this.Fr.getEntry(t,e)}getAllFromCache(t,e){return this.Fr.getEntries(t,e)}}/**
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
 */class s_{constructor(t){this.persistence=t,this.ni=new re(e=>Je(e),jr),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.ri=0,this.ii=new ra,this.targetCount=0,this.si=ne.sr()}forEachTarget(t,e){return this.ni.forEach((n,s)=>e(s)),v.resolve()}getLastRemoteSnapshotVersion(t){return v.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return v.resolve(this.ri)}allocateTargetId(t){return this.highestTargetId=this.si.next(),v.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ri&&(this.ri=e),v.resolve()}cr(t){this.ni.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.si=new ne(e),this.highestTargetId=e),t.sequenceNumber>this.ri&&(this.ri=t.sequenceNumber)}addTargetData(t,e){return this.cr(e),this.targetCount+=1,v.resolve()}updateTargetData(t,e){return this.cr(e),v.resolve()}removeTargetData(t,e){return this.ni.delete(e.target),this.ii.Qr(e.targetId),this.targetCount-=1,v.resolve()}removeTargets(t,e,n){let s=0;const i=[];return this.ni.forEach((a,u)=>{u.sequenceNumber<=e&&n.get(u.targetId)===null&&(this.ni.delete(a),i.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)}),v.waitFor(i).next(()=>s)}getTargetCount(t){return v.resolve(this.targetCount)}getTargetData(t,e){const n=this.ni.get(e)||null;return v.resolve(n)}addMatchingKeys(t,e,n){return this.ii.Ur(e,n),v.resolve()}removeMatchingKeys(t,e,n){this.ii.Wr(e,n);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach(a=>{i.push(s.markPotentiallyOrphaned(t,a))}),v.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.ii.Qr(e),v.resolve()}getMatchingKeysForTargetId(t,e){const n=this.ii.zr(e);return v.resolve(n)}containsKey(t,e){return v.resolve(this.ii.containsKey(e))}}/**
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
 */class sa{constructor(t,e){this.oi={},this.overlays={},this._i=new Ft(0),this.ai=!1,this.ai=!0,this.ui=new t_,this.referenceDelegate=t(this),this.ci=new s_(this),this.indexManager=new zp,this.remoteDocumentCache=function(s){return new n_(s)}(n=>this.referenceDelegate.li(n)),this.serializer=new Qh(e),this.hi=new Yp(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Zp,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.oi[t.toKey()];return n||(n=new e_(e,this.referenceDelegate),this.oi[t.toKey()]=n),n}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(t,e,n){P("MemoryPersistence","Starting transaction:",t);const s=new i_(this._i.next());return this.referenceDelegate.Pi(),n(s).next(i=>this.referenceDelegate.Ti(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ii(t,e){return v.or(Object.values(this.oi).map(n=>()=>n.containsKey(t,e)))}}class i_ extends jl{constructor(t){super(),this.currentSequenceNumber=t}}class yi{constructor(t){this.persistence=t,this.Ei=new ra,this.Ri=null}static Ai(t){return new yi(t)}get Vi(){if(this.Ri)return this.Ri;throw M(60996)}addReference(t,e,n){return this.Ei.addReference(n,e),this.Vi.delete(n.toString()),v.resolve()}removeReference(t,e,n){return this.Ei.removeReference(n,e),this.Vi.add(n.toString()),v.resolve()}markPotentiallyOrphaned(t,e){return this.Vi.add(e.toString()),v.resolve()}removeTarget(t,e){this.Ei.Qr(e.targetId).forEach(s=>this.Vi.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(i=>this.Vi.add(i.toString()))}).next(()=>n.removeTargetData(t,e))}Pi(){this.Ri=new Set}Ti(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return v.forEach(this.Vi,n=>{const s=O.fromPath(n);return this.di(t,s).next(i=>{i||e.removeEntry(s,L.min())})}).next(()=>(this.Ri=null,e.apply(t)))}updateLimboDocument(t,e){return this.di(t,e).next(n=>{n?this.Vi.delete(e.toString()):this.Vi.add(e.toString())})}li(t){return 0}di(t,e){return v.or([()=>v.resolve(this.Ei.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ii(t,e)])}}class Zs{constructor(t,e){this.persistence=t,this.mi=new re(n=>vt(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=sd(this,e)}static Ai(t,e){return new Zs(t,e)}Pi(){}Ti(t){return v.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}Vr(t){const e=this.gr(t);return this.persistence.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}gr(t){let e=0;return this.dr(t,n=>{e++}).next(()=>e)}dr(t,e){return v.forEach(this.mi,(n,s)=>this.yr(t,n,s).next(i=>i?v.resolve():e(s)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ti(t,a=>this.yr(t,a,e).next(u=>{u||(n++,i.removeEntry(a,L.min()))})).next(()=>i.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.mi.set(e,t.currentSequenceNumber),v.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.mi.set(n,t.currentSequenceNumber),v.resolve()}removeReference(t,e,n){return this.mi.set(n,t.currentSequenceNumber),v.resolve()}updateLimboDocument(t,e){return this.mi.set(e,t.currentSequenceNumber),v.resolve()}li(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Vs(t.data.value)),e}yr(t,e,n){return v.or([()=>this.persistence.Ii(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.mi.get(e);return v.resolve(s!==void 0&&s>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class o_{constructor(t){this.serializer=t}k(t,e,n,s){const i=new ii("createOrUpgrade",e);n<1&&s>=1&&(function(l){l.createObjectStore(qr)}(t),function(l){l.createObjectStore(Vr,{keyPath:gg}),l.createObjectStore(Ut,{keyPath:tc,autoIncrement:!0}).createIndex(qe,ec,{unique:!0}),l.createObjectStore(Tn)}(t),$c(t),function(l){l.createObjectStore(Me)}(t));let a=v.resolve();return n<3&&s>=3&&(n!==0&&(function(l){l.deleteObjectStore(vn),l.deleteObjectStore(wn),l.deleteObjectStore($e)}(t),$c(t)),a=a.next(()=>function(l){const d=l.store($e),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:L.min().toTimestamp(),targetCount:0};return d.put(js,f)}(i))),n<4&&s>=4&&(n!==0&&(a=a.next(()=>function(l,d){return d.store(Ut).J().next(g=>{l.deleteObjectStore(Ut),l.createObjectStore(Ut,{keyPath:tc,autoIncrement:!0}).createIndex(qe,ec,{unique:!0});const I=d.store(Ut),S=g.map(D=>I.put(D));return v.waitFor(S)})}(t,i))),a=a.next(()=>{(function(l){l.createObjectStore(An,{keyPath:Ag})})(t)})),n<5&&s>=5&&(a=a.next(()=>this.fi(i))),n<6&&s>=6&&(a=a.next(()=>(function(l){l.createObjectStore(Pr)}(t),this.gi(i)))),n<7&&s>=7&&(a=a.next(()=>this.pi(i))),n<8&&s>=8&&(a=a.next(()=>this.yi(t,i))),n<9&&s>=9&&(a=a.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(t)})),n<10&&s>=10&&(a=a.next(()=>this.wi(i))),n<11&&s>=11&&(a=a.next(()=>{(function(l){l.createObjectStore(ai,{keyPath:Rg})})(t),function(l){l.createObjectStore(ui,{keyPath:bg})}(t)})),n<12&&s>=12&&(a=a.next(()=>{(function(l){const d=l.createObjectStore(ci,{keyPath:Ng});d.createIndex(po,kg,{unique:!1}),d.createIndex(Wl,Og,{unique:!1})})(t)})),n<13&&s>=13&&(a=a.next(()=>function(l){const d=l.createObjectStore(qs,{keyPath:_g});d.createIndex(bs,yg),d.createIndex(Kl,Ig)}(t)).next(()=>this.Si(t,i)).next(()=>t.deleteObjectStore(Me))),n<14&&s>=14&&(a=a.next(()=>this.bi(t,i))),n<15&&s>=15&&(a=a.next(()=>function(l){l.createObjectStore(qo,{keyPath:Sg,autoIncrement:!0}).createIndex(go,Vg,{unique:!1}),l.createObjectStore(_r,{keyPath:Pg}).createIndex(Ql,Cg,{unique:!1}),l.createObjectStore(yr,{keyPath:Dg}).createIndex(Hl,xg,{unique:!1})}(t))),n<16&&s>=16&&(a=a.next(()=>{e.objectStore(_r).clear()}).next(()=>{e.objectStore(yr).clear()})),n<17&&s>=17&&(a=a.next(()=>{(function(l){l.createObjectStore(jo,{keyPath:Mg})})(t)})),n<18&&s>=18&&Tl()&&(a=a.next(()=>{e.objectStore(_r).clear()}).next(()=>{e.objectStore(yr).clear()})),a}gi(t){let e=0;return t.store(Me).ee((n,s)=>{e+=Ys(s)}).next(()=>{const n={byteSize:e};return t.store(Pr).put(mo,n)})}fi(t){const e=t.store(Vr),n=t.store(Ut);return e.J().next(s=>v.forEach(s,i=>{const a=IDBKeyRange.bound([i.userId,ze],[i.userId,i.lastAcknowledgedBatchId]);return n.J(qe,a).next(u=>v.forEach(u,l=>{F(l.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:l.batchId});const d=Le(this.serializer,l);return Zh(t,i.userId,d).next(()=>{})}))}))}pi(t){const e=t.store(vn),n=t.store(Me);return t.store($e).get(js).next(s=>{const i=[];return n.ee((a,u)=>{const l=new X(a),d=function(g){return[0,vt(g)]}(l);i.push(e.get(d).next(f=>f?v.resolve():(g=>e.put({targetId:0,path:vt(g),sequenceNumber:s.highestListenSequenceNumber}))(l)))}).next(()=>v.waitFor(i))})}yi(t,e){t.createObjectStore(Cr,{keyPath:vg});const n=e.store(Cr),s=new na,i=a=>{if(s.add(a)){const u=a.lastSegment(),l=a.popLast();return n.put({collectionId:u,parent:vt(l)})}};return e.store(Me).ee({Y:!0},(a,u)=>{const l=new X(a);return i(l.popLast())}).next(()=>e.store(Tn).ee({Y:!0},([a,u,l],d)=>{const f=Kt(u);return i(f.popLast())}))}wi(t){const e=t.store(wn);return e.ee((n,s)=>{const i=fr(s),a=Hh(this.serializer,i);return e.put(a)})}Si(t,e){const n=e.store(Me),s=[];return n.ee((i,a)=>{const u=e.store(qs),l=function(g){return g.document?new O(X.fromString(g.document.name).popFirst(5)):g.noDocument?O.fromSegments(g.noDocument.path):g.unknownDocument?O.fromSegments(g.unknownDocument.path):M(36783)}(a).path.toArray(),d={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(u.put(d))}).next(()=>v.waitFor(s))}bi(t,e){const n=e.store(Ut),s=od(this.serializer),i=new sa(yi.Ai,this.serializer.gt);return n.J().next(a=>{const u=new Map;return a.forEach(l=>{var f;let d=(f=u.get(l.userId))!=null?f:$();Le(this.serializer,l).keys().forEach(g=>d=d.add(g)),u.set(l.userId,d)}),v.forEach(u,(l,d)=>{const f=new bt(d),g=pi.yt(this.serializer,f),I=i.getIndexManager(f),S=_i.yt(f,this.serializer,I,i.referenceDelegate);return new ad(s,S,g,I).recalculateAndSaveOverlaysForDocumentKeys(new _o(e,Ft.ce),l).next()})})}}function $c(r){r.createObjectStore(vn,{keyPath:Tg}).createIndex(Uo,wg,{unique:!0}),r.createObjectStore(wn,{keyPath:"targetId"}).createIndex(Gl,Eg,{unique:!0}),r.createObjectStore($e)}const me="IndexedDbPersistence",to=18e5,eo=5e3,no="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",a_="main";class ia{constructor(t,e,n,s,i,a,u,l,d,f,g=18){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Di=i,this.window=a,this.document=u,this.Ci=d,this.Fi=f,this.Mi=g,this._i=null,this.ai=!1,this.isPrimary=!1,this.networkEnabled=!0,this.xi=null,this.inForeground=!1,this.Oi=null,this.Ni=null,this.Bi=Number.NEGATIVE_INFINITY,this.Li=I=>Promise.resolve(),!ia.v())throw new C(V.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Hp(this,s),this.ki=e+a_,this.serializer=new Qh(l),this.qi=new Ie(this.ki,this.Mi,new o_(this.serializer)),this.ui=new Fp,this.ci=new Kp(this.referenceDelegate,this.serializer),this.remoteDocumentCache=od(this.serializer),this.hi=new Mp,this.window&&this.window.localStorage?this.Ki=this.window.localStorage:(this.Ki=null,f===!1&&St(me,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ui().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new C(V.FAILED_PRECONDITION,no);return this.$i(),this.Wi(),this.Qi(),this.runTransaction("getHighestListenSequenceNumber","readonly",t=>this.ci.getHighestSequenceNumber(t))}).then(t=>{this._i=new Ft(t,this.Ci)}).then(()=>{this.ai=!0}).catch(t=>(this.qi&&this.qi.close(),Promise.reject(t)))}Gi(t){return this.Li=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.qi.K(async e=>{e.newVersion===null&&await t()})}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Di.enqueueAndForget(async()=>{this.started&&await this.Ui()}))}Ui(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",t=>Ts(t).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.zi(t).next(e=>{e||(this.isPrimary=!1,this.Di.enqueueRetryable(()=>this.Li(!1)))})}).next(()=>this.ji(t)).next(e=>this.isPrimary&&!e?this.Ji(t).next(()=>!1):!!e&&this.Hi(t).next(()=>!0))).catch(t=>{if(Re(t))return P(me,"Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return P(me,"Releasing owner lease after error during lease refresh",t),!1}).then(t=>{this.isPrimary!==t&&this.Di.enqueueRetryable(()=>this.Li(t)),this.isPrimary=t})}zi(t){return ur(t).get(sn).next(e=>v.resolve(this.Zi(e)))}Xi(t){return Ts(t).delete(this.clientId)}async Yi(){if(this.isPrimary&&!this.es(this.Bi,to)){this.Bi=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const n=gt(e,An);return n.J().next(s=>{const i=this.ts(s,to),a=s.filter(u=>i.indexOf(u)===-1);return v.forEach(a,u=>n.delete(u.clientId)).next(()=>a)})}).catch(()=>[]);if(this.Ki)for(const e of t)this.Ki.removeItem(this.ns(e.clientId))}}Qi(){this.Ni=this.Di.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Ui().then(()=>this.Yi()).then(()=>this.Qi()))}Zi(t){return!!t&&t.ownerId===this.clientId}ji(t){return this.Fi?v.resolve(!0):ur(t).get(sn).next(e=>{if(e!==null&&this.es(e.leaseTimestampMs,eo)&&!this.rs(e.ownerId)){if(this.Zi(e)&&this.networkEnabled)return!0;if(!this.Zi(e)){if(!e.allowTabSynchronization)throw new C(V.FAILED_PRECONDITION,no);return!1}}return!(!this.networkEnabled||!this.inForeground)||Ts(t).J().next(n=>this.ts(n,eo).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||a&&u)return!0}return!1})===void 0)}).next(e=>(this.isPrimary!==e&&P(me,"Client ".concat(e?"is":"is not"," eligible for a primary lease.")),e))}async shutdown(){this.ai=!1,this.ss(),this.Ni&&(this.Ni.cancel(),this.Ni=null),this._s(),this.us(),await this.qi.runTransaction("shutdown","readwrite",[qr,An],t=>{const e=new _o(t,Ft.ce);return this.Ji(e).next(()=>this.Xi(e))}),this.qi.close(),this.cs()}ts(t,e){return t.filter(n=>this.es(n.updateTimeMs,e)&&!this.rs(n.clientId))}ls(){return this.runTransaction("getActiveClients","readonly",t=>Ts(t).J().next(e=>this.ts(e,to).map(n=>n.clientId)))}get started(){return this.ai}getGlobalsCache(){return this.ui}getMutationQueue(t,e){return _i.yt(t,this.serializer,e,this.referenceDelegate)}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(t){return new $p(t,this.serializer.gt.databaseId)}getDocumentOverlayCache(t){return pi.yt(this.serializer,t)}getBundleCache(){return this.hi}runTransaction(t,e,n){P(me,"Starting transaction:",t);const s=e==="readonly"?"readonly":"readwrite",i=function(l){return l===18?Bg:l===17?Zl:l===16?Lg:l===15?zo:l===14?Yl:l===13?Xl:l===12?Fg:l===11?Jl:void M(60245)}(this.Mi);let a;return this.qi.runTransaction(t,s,i,u=>(a=new _o(u,this._i?this._i.next():Ft.ce),e==="readwrite-primary"?this.zi(a).next(l=>!!l||this.ji(a)).next(l=>{if(!l)throw St("Failed to obtain primary lease for action '".concat(t,"'.")),this.isPrimary=!1,this.Di.enqueueRetryable(()=>this.Li(!1)),new C(V.FAILED_PRECONDITION,ql);return n(a)}).next(l=>this.Hi(a).next(()=>l)):this.hs(a).next(()=>n(a)))).then(u=>(a.raiseOnCommittedEvent(),u))}hs(t){return ur(t).get(sn).next(e=>{if(e!==null&&this.es(e.leaseTimestampMs,eo)&&!this.rs(e.ownerId)&&!this.Zi(e)&&!(this.Fi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new C(V.FAILED_PRECONDITION,no)})}Hi(t){const e={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ur(t).put(sn,e)}static v(){return Ie.v()}Ji(t){const e=ur(t);return e.get(sn).next(n=>this.Zi(n)?(P(me,"Releasing primary lease."),e.delete(sn)):v.resolve())}es(t,e){const n=Date.now();return!(t<n-e)&&(!(t>n)||(St("Detected an update time that is in the future: ".concat(t," > ").concat(n)),!1))}$i(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Oi=()=>{this.Di.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Ui()))},this.document.addEventListener("visibilitychange",this.Oi),this.inForeground=this.document.visibilityState==="visible")}_s(){this.Oi&&(this.document.removeEventListener("visibilitychange",this.Oi),this.Oi=null)}Wi(){var t;typeof((t=this.window)==null?void 0:t.addEventListener)=="function"&&(this.xi=()=>{this.ss();const e=/(?:Version|Mobile)\/1[456]/;El()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Di.enterRestrictedMode(!0),this.Di.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.xi))}us(){this.xi&&(this.window.removeEventListener("pagehide",this.xi),this.xi=null)}rs(t){var e;try{const n=((e=this.Ki)==null?void 0:e.getItem(this.ns(t)))!==null;return P(me,"Client '".concat(t,"' ").concat(n?"is":"is not"," zombied in LocalStorage")),n}catch(n){return St(me,"Failed to get zombied client id.",n),!1}}ss(){if(this.Ki)try{this.Ki.setItem(this.ns(this.clientId),String(Date.now()))}catch(t){St("Failed to set zombie client id.",t)}}cs(){if(this.Ki)try{this.Ki.removeItem(this.ns(this.clientId))}catch(t){}}ns(t){return"firestore_zombie_".concat(this.persistenceKey,"_").concat(t)}}function ur(r){return gt(r,qr)}function Ts(r){return gt(r,An)}function u_(r,t){let e=r.projectId;return r.isDefaultDatabase||(e+="."+r.database),"firestore/"+t+"/"+e+"/"}/**
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
 */class oa{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.Ps=n,this.Ts=s}static Is(t,e){let n=$(),s=$();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new oa(t,e.fromCache,n,s)}}/**
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
 */class c_{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class ud{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=function(){return El()?8:zl(Os())>0?6:4}()}initialize(t,e){this.ds=t,this.indexManager=e,this.Es=!0}getDocumentsMatchingQuery(t,e,n,s){const i={result:null};return this.fs(t,e).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.gs(t,e,s,n).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new c_;return this.ps(t,e,a).next(u=>{if(i.result=u,this.Rs)return this.ys(t,e,a,u.size)})}).next(()=>i.result)}ys(t,e,n,s){return n.documentReadCount<this.As?(hn()<=H.DEBUG&&P("QueryEngine","SDK will not create cache indexes for query:",dn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),v.resolve()):(hn()<=H.DEBUG&&P("QueryEngine","Query:",dn(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Vs*s?(hn()<=H.DEBUG&&P("QueryEngine","The SDK decides to create cache indexes for query:",dn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Lt(e))):v.resolve())}fs(t,e){if(mc(e))return v.resolve(null);let n=Lt(e);return this.indexManager.getIndexType(t,n).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=Gs(e,null,"F"),n=Lt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(i=>{const a=$(...i);return this.ds.getDocuments(t,a).next(u=>this.indexManager.getMinOffset(t,n).next(l=>{const d=this.ws(e,u);return this.Ss(e,d,a,l.readTime)?this.fs(t,Gs(e,null,"F")):this.bs(t,d,e,l)}))})))}gs(t,e,n,s){return mc(e)||s.isEqual(L.min())?v.resolve(null):this.ds.getDocuments(t,n).next(i=>{const a=this.ws(e,i);return this.Ss(e,a,n,s)?v.resolve(null):(hn()<=H.DEBUG&&P("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),dn(e)),this.bs(t,a,e,ug(s,Rr)).next(u=>u))})}ws(t,e){let n=new tt(Eh(t));return e.forEach((s,i)=>{$r(t,i)&&(n=n.add(i))}),n}Ss(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ps(t,e,n){return hn()<=H.DEBUG&&P("QueryEngine","Using full collection scan to execute query:",dn(e)),this.ds.getDocumentsMatchingQuery(t,e,Ot.min(),n)}bs(t,e,n,s){return this.ds.getDocumentsMatchingQuery(t,n,s).next(i=>(e.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const aa="LocalStore",l_=3e8;class h_{constructor(t,e,n,s){this.persistence=t,this.Ds=e,this.serializer=s,this.Cs=new st(B),this.vs=new re(i=>Je(i),jr),this.Fs=new Map,this.Ms=t.getRemoteDocumentCache(),this.ci=t.getTargetCache(),this.hi=t.getBundleCache(),this.xs(n)}xs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new ad(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Cs))}}function cd(r,t,e,n){return new h_(r,t,e,n)}async function ld(r,t){const e=q(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,e.xs(t),e.mutationQueue.getAllMutationBatches(n))).next(i=>{const a=[],u=[];let l=$();for(const d of s){a.push(d.batchId);for(const f of d.mutations)l=l.add(f.key)}for(const d of i){u.push(d.batchId);for(const f of d.mutations)l=l.add(f.key)}return e.localDocuments.getDocuments(n,l).next(d=>({Os:d,removedBatchIds:a,addedBatchIds:u}))})})}function d_(r,t){const e=q(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=t.batch.keys(),i=e.Ms.newChangeBuffer({trackRemovals:!0});return function(u,l,d,f){const g=d.batch,I=g.keys();let S=v.resolve();return I.forEach(D=>{S=S.next(()=>f.getEntry(l,D)).next(k=>{const N=d.docVersions.get(D);F(N!==null,48541),k.version.compareTo(N)<0&&(g.applyToRemoteDocument(k,d),k.isValidDocument()&&(k.setReadTime(d.commitVersion),f.addEntry(k)))})}),S.next(()=>u.mutationQueue.removeMutationBatch(l,g))}(e,n,t,i).next(()=>i.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(u){let l=$();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(l=l.add(u.batch.mutations[d].key));return l}(t))).next(()=>e.localDocuments.getDocuments(n,s))})}function hd(r){const t=q(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.ci.getLastRemoteSnapshotVersion(e))}function f_(r,t){const e=q(r),n=t.snapshotVersion;let s=e.Cs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=e.Ms.newChangeBuffer({trackRemovals:!0});s=e.Cs;const u=[];t.targetChanges.forEach((f,g)=>{const I=s.get(g);if(!I)return;u.push(e.ci.removeMatchingKeys(i,f.removedDocuments,g).next(()=>e.ci.addMatchingKeys(i,f.addedDocuments,g)));let S=I.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(g)!==null?S=S.withResumeToken(dt.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,n)),s=s.insert(g,S),function(k,N,G){return k.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=l_?!0:G.addedDocuments.size+G.modifiedDocuments.size+G.removedDocuments.size>0}(I,S,f)&&u.push(e.ci.updateTargetData(i,S))});let l=kt(),d=$();if(t.documentUpdates.forEach(f=>{t.resolvedLimboDocuments.has(f)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,f))}),u.push(m_(i,a,t.documentUpdates).next(f=>{l=f.Ns,d=f.Bs})),!n.isEqual(L.min())){const f=e.ci.getLastRemoteSnapshotVersion(i).next(g=>e.ci.setTargetsMetadata(i,i.currentSequenceNumber,n));u.push(f)}return v.waitFor(u).next(()=>a.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,l,d)).next(()=>l)}).then(i=>(e.Cs=s,i))}function m_(r,t,e){let n=$(),s=$();return e.forEach(i=>n=n.add(i)),t.getEntries(r,n).next(i=>{let a=kt();return e.forEach((u,l)=>{const d=i.get(u);l.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(u)),l.isNoDocument()&&l.version.isEqual(L.min())?(t.removeEntry(u,l.readTime),a=a.insert(u,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(l),a=a.insert(u,l)):P(aa,"Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",l.version)}),{Ns:a,Bs:s}})}function g_(r,t){const e=q(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=ze),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function p_(r,t){const e=q(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return e.ci.getTargetData(n,t).next(i=>i?(s=i,v.resolve(s)):e.ci.allocateTargetId(n).next(a=>(s=new Qt(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.ci.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=e.Cs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Cs=e.Cs.insert(n.targetId,n),e.vs.set(t,n.targetId)),n})}async function Co(r,t,e){const n=q(r),s=n.Cs.get(t),i=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",i,a=>n.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Re(a))throw a;P(aa,"Failed to update sequence numbers for target ".concat(t,": ").concat(a))}n.Cs=n.Cs.remove(t),n.vs.delete(s.target)}function Kc(r,t,e){const n=q(r);let s=L.min(),i=$();return n.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,f){const g=q(l),I=g.vs.get(f);return I!==void 0?v.resolve(g.Cs.get(I)):g.ci.getTargetData(d,f)}(n,a,Lt(t)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.ci.getMatchingKeysForTargetId(a,u.targetId).next(l=>{i=l})}).next(()=>n.Ds.getDocumentsMatchingQuery(a,t,e?s:L.min(),e?i:$())).next(u=>(__(n,rp(t),u),{documents:u,Ls:i})))}function __(r,t,e){let n=r.Fs.get(t)||L.min();e.forEach((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)}),r.Fs.set(t,n)}class Gc{constructor(){this.activeTargetIds=cp()}Ws(t){this.activeTargetIds=this.activeTargetIds.add(t)}Qs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}$s(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class dd{constructor(){this.Co=new Gc,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.Co.Ws(t),this.vo[t]||"not-current"}updateQueryState(t,e,n){this.vo[t]=e}removeLocalQueryTarget(t){this.Co.Qs(t)}isLocalQueryTarget(t){return this.Co.activeTargetIds.has(t)}clearQueryState(t){delete this.vo[t]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(t){return this.Co.activeTargetIds.has(t)}start(){return this.Co=new Gc,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class y_{Fo(t){}shutdown(){}}/**
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
 */const Qc="ConnectivityMonitor";class Hc{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(t){this.Bo.push(t)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){P(Qc,"Network connectivity changed: AVAILABLE");for(const t of this.Bo)t(0)}No(){P(Qc,"Network connectivity changed: UNAVAILABLE");for(const t of this.Bo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let ws=null;function Do(){return ws===null?ws=function(){return 268435456+Math.round(2147483648*Math.random())}():ws++,"0x"+ws.toString(16)}/**
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
 */const ro="RestConnection",I_={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class E_{get ko(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=e+"://"+t.host,this.Ko="projects/".concat(n,"/databases/").concat(s),this.Uo=this.databaseId.database===zs?"project_id=".concat(n):"project_id=".concat(n,"&database_id=").concat(s)}$o(t,e,n,s,i){const a=Do(),u=this.Wo(t,e.toUriEncodedString());P(ro,"Sending RPC '".concat(t,"' ").concat(a,":"),u,n);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(l,s,i);const{host:d}=new URL(u),f=Al(d);return this.Go(t,u,l,n,f).then(g=>(P(ro,"Received RPC '".concat(t,"' ").concat(a,": "),g),g),g=>{throw In(ro,"RPC '".concat(t,"' ").concat(a," failed with error: "),g,"url: ",u,"request:",n),g})}zo(t,e,n,s,i,a){return this.$o(t,e,n,s,i)}Qo(t,e,n){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Fn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,i)=>t[i]=s),n&&n.headers.forEach((s,i)=>t[i]=s)}Wo(t,e){const n=I_[t];let s="".concat(this.qo,"/v1/").concat(e,":").concat(n);return this.databaseInfo.apiKey&&(s="".concat(s,"?key=").concat(encodeURIComponent(this.databaseInfo.apiKey))),s}terminate(){}}/**
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
 */class T_{constructor(t){this.jo=t.jo,this.Jo=t.Jo}Ho(t){this.Zo=t}Xo(t){this.Yo=t}e_(t){this.t_=t}onMessage(t){this.n_=t}close(){this.Jo()}send(t){this.jo(t)}r_(){this.Zo()}i_(){this.Yo()}s_(t){this.t_(t)}o_(t){this.n_(t)}}/**
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
 */const Et="WebChannelConnection",cr=(r,t,e)=>{r.listen(t,n=>{try{e(n)}catch(s){setTimeout(()=>{throw s},0)}})};class _n extends E_{constructor(t){super(t),this.__=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static a_(){if(!_n.u_){const t=kl();cr(t,Nl.STAT_EVENT,e=>{e.stat===lo.PROXY?P(Et,"STAT_EVENT: detected buffering proxy"):e.stat===lo.NOPROXY&&P(Et,"STAT_EVENT: detected no buffering proxy")}),_n.u_=!0}}Go(t,e,n,s,i){const a=Do();return new Promise((u,l)=>{const d=new Dl;d.setWithCredentials(!0),d.listenOnce(xl.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case vs.NO_ERROR:const g=d.getResponseJson();P(Et,"XHR for RPC '".concat(t,"' ").concat(a," received:"),JSON.stringify(g)),u(g);break;case vs.TIMEOUT:P(Et,"RPC '".concat(t,"' ").concat(a," timed out")),l(new C(V.DEADLINE_EXCEEDED,"Request time out"));break;case vs.HTTP_ERROR:const I=d.getStatus();if(P(Et,"RPC '".concat(t,"' ").concat(a," failed with status:"),I,"response text:",d.getResponseText()),I>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);const D=S==null?void 0:S.error;if(D&&D.status&&D.message){const k=function(G){const j=G.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(j)>=0?j:V.UNKNOWN}(D.status);l(new C(k,D.message))}else l(new C(V.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new C(V.UNAVAILABLE,"Connection failed."));break;default:M(9055,{c_:t,streamId:a,l_:d.getLastErrorCode(),h_:d.getLastError()})}}finally{P(Et,"RPC '".concat(t,"' ").concat(a," completed."))}});const f=JSON.stringify(s);P(Et,"RPC '".concat(t,"' ").concat(a," sending request:"),s),d.send(e,"POST",f,n,15)})}P_(t,e,n){const s=Do(),i=[this.qo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:"projects/".concat(this.databaseId.projectId,"/databases/").concat(this.databaseId.database)},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(u.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Qo(u.initMessageHeaders,e,n),u.encodeInitMessageHeaders=!0;const d=i.join("");P(Et,"Creating RPC '".concat(t,"' stream ").concat(s,": ").concat(d),u);const f=a.createWebChannel(d,u);this.T_(f);let g=!1,I=!1;const S=new T_({jo:D=>{I?P(Et,"Not sending because RPC '".concat(t,"' stream ").concat(s," is closed:"),D):(g||(P(Et,"Opening RPC '".concat(t,"' stream ").concat(s," transport.")),f.open(),g=!0),P(Et,"RPC '".concat(t,"' stream ").concat(s," sending:"),D),f.send(D))},Jo:()=>f.close()});return cr(f,lr.EventType.OPEN,()=>{I||(P(Et,"RPC '".concat(t,"' stream ").concat(s," transport opened.")),S.r_())}),cr(f,lr.EventType.CLOSE,()=>{I||(I=!0,P(Et,"RPC '".concat(t,"' stream ").concat(s," transport closed")),S.s_(),this.I_(f))}),cr(f,lr.EventType.ERROR,D=>{I||(I=!0,In(Et,"RPC '".concat(t,"' stream ").concat(s," transport errored. Name:"),D.name,"Message:",D.message),S.s_(new C(V.UNAVAILABLE,"The operation could not be completed")))}),cr(f,lr.EventType.MESSAGE,D=>{var k;if(!I){const N=D.data[0];F(!!N,16349);const G=N,j=(G==null?void 0:G.error)||((k=G[0])==null?void 0:k.error);if(j){P(Et,"RPC '".concat(t,"' stream ").concat(s," received error:"),j);const U=j.status;let nt=function(E){const p=lt[E];if(p!==void 0)return xh(p)}(U),W=j.message;U==="NOT_FOUND"&&W.includes("database")&&W.includes("does not exist")&&W.includes(this.databaseId.database)&&In("Database '".concat(this.databaseId.database,"' not found. Please check your project configuration.")),nt===void 0&&(nt=V.INTERNAL,W="Unknown error status: "+U+" with message "+j.message),I=!0,S.s_(new C(nt,W)),f.close()}else P(Et,"RPC '".concat(t,"' stream ").concat(s," received:"),N),S.o_(N)}}),_n.a_(),setTimeout(()=>{S.i_()},0),S}terminate(){this.__.forEach(t=>t.close()),this.__=[]}T_(t){this.__.push(t)}I_(t){this.__=this.__.filter(e=>e===t)}Qo(t,e,n){super.Qo(t,e,n),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Ol()}}/**
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
 */function w_(r){return new _n(r)}/**
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
 */function v_(){return typeof window<"u"?window:null}function Ns(){return typeof document<"u"?document:null}/**
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
 */function Ii(r){return new Rp(r,!0)}/**
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
 */_n.u_=!1;class fd{constructor(t,e,n=1e3,s=1.5,i=6e4){this.Di=t,this.timerId=e,this.E_=n,this.R_=s,this.A_=i,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(t){this.cancel();const e=Math.floor(this.V_+this.p_()),n=Math.max(0,Date.now()-this.m_),s=Math.max(0,e-n);s>0&&P("ExponentialBackoff","Backing off for ".concat(s," ms (base delay: ").concat(this.V_," ms, delay with jitter: ").concat(e," ms, last attempt: ").concat(n," ms ago)")),this.d_=this.Di.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),t())),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
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
 */const Wc="PersistentStream";class md{constructor(t,e,n,s,i,a,u,l){this.Di=t,this.w_=n,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=l,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new fd(t,e)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(t){this.q_(),this.stream.send(t)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(t,e){this.q_(),this.K_(),this.F_.cancel(),this.b_++,t!==4?this.F_.reset():e&&e.code===V.RESOURCE_EXHAUSTED?(St(e.toString()),St("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):e&&e.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.e_(e)}U_(){}auth(){this.state=1;const t=this.W_(this.b_),e=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.b_===e&&this.Q_(n,s)},n=>{t(()=>{const s=new C(V.UNKNOWN,"Fetching auth token failed: "+n.message);return this.G_(s)})})}Q_(t,e){const n=this.W_(this.b_);this.stream=this.z_(t,e),this.stream.Ho(()=>{n(()=>this.listener.Ho())}),this.stream.Xo(()=>{n(()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.Xo()))}),this.stream.e_(s=>{n(()=>this.G_(s))}),this.stream.onMessage(s=>{n(()=>++this.v_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(t){return P(Wc,"close with error: ".concat(t)),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Di.enqueueAndForget(()=>this.b_===t?e():(P(Wc,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class A_ extends md{constructor(t,e,n,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}z_(t,e){return this.connection.P_("Listen",t,e)}j_(t){return this.onNext(t)}onNext(t){this.F_.reset();const e=Vp(this.serializer,t),n=function(i){if(!("targetChange"in i))return L.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?L.min():a.readTime?Vt(a.readTime):L.min()}(t);return this.listener.J_(e,n)}H_(t){const e={};e.database=Ro(this.serializer),e.addTarget=function(i,a){let u;const l=a.target;if(u=$s(l)?{documents:Uh(i,l)}:{query:qh(i,l).dt},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=Oh(i,a.resumeToken);const d=vo(i,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(L.min())>0){u.readTime=Nn(i,a.snapshotVersion.toTimestamp());const d=vo(i,a.expectedCount);d!==null&&(u.expectedCount=d)}return u}(this.serializer,t);const n=Cp(this.serializer,t);n&&(e.labels=n),this.k_(e)}Z_(t){const e={};e.database=Ro(this.serializer),e.removeTarget=t,this.k_(e)}}class R_ extends md{constructor(t,e,n,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}get X_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.X_&&this.Y_([])}z_(t,e){return this.connection.P_("Write",t,e)}j_(t){return F(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,F(!t.writeResults||t.writeResults.length===0,55816),this.listener.ea()}onNext(t){F(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.F_.reset();const e=Pp(t.writeResults,t.commitTime),n=Vt(t.commitTime);return this.listener.ta(n,e)}na(){const t={};t.database=Ro(this.serializer),this.k_(t)}Y_(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>Ws(this.serializer,n))};this.k_(e)}}/**
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
 */class b_{}class S_ extends b_{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new C(V.FAILED_PRECONDITION,"The client has already been terminated.")}$o(t,e,n,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.$o(t,Ao(e,n),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new C(V.UNKNOWN,i.toString())})}zo(t,e,n,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.zo(t,Ao(e,n),s,a,u,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new C(V.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}function V_(r,t,e,n){return new S_(r,t,e,n)}class P_{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(t){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca("Connection failed 1 times. Most recent error: ".concat(t.toString())),this.ua("Offline")))}set(t){this.ha(),this.sa=0,t==="Online"&&(this._a=!1),this.ua(t)}ua(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ca(t){const e="Could not reach Cloud Firestore backend. ".concat(t,"\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.");this._a?(St(e),this._a=!1):P("OnlineStateTracker",e)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const Xt="RemoteStore";class C_{constructor(t,e,n,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new ne(1e3),this.Aa=new ne(1001),this.Va=new Set,this.da=[],this.ma=i,this.ma.Fo(a=>{n.enqueueAndForget(async()=>{tn(this)&&(P(Xt,"Restarting streams for network reachability change."),await async function(l){const d=q(l);d.Va.add(4),await Hr(d),d.fa.set("Unknown"),d.Va.delete(4),await Ei(d)}(this))})}),this.fa=new P_(n,s)}}async function Ei(r){if(tn(r))for(const t of r.da)await t(!0)}async function Hr(r){for(const t of r.da)await t(!1)}function xo(r,t){return r.Ia.get(t)||void 0}function gd(r,t){const e=q(r),n=xo(e,t.targetId);if(n!==void 0&&e.Ta.has(n))return;const s=function(u,l){const d=xo(u,l);d!==void 0&&u.Ea.delete(d);const f=function(I,S){return S%2!=0?I.Aa.next():I.Ra.next()}(u,l);return u.Ia.set(l,f),u.Ea.set(f,l),f}(e,t.targetId);P(Xt,"remoteStoreListen mapping SDK target ID to remote",t.targetId,s);const i=new Qt(t.target,s,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);e.Ta.set(s,i),ha(e)?la(e):Un(e).x_()&&ca(e,i)}function ua(r,t){const e=q(r),n=Un(e),s=xo(e,t);P(Xt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,s),e.Ta.delete(s),e.Ia.delete(t),e.Ea.delete(s),n.x_()&&pd(e,s),e.Ta.size===0&&(n.x_()?n.B_():tn(e)&&e.fa.set("Unknown"))}function ca(r,t){if(r.ga.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=r.Ea.get(t.targetId);if(e===void 0)return void P(Xt,"SDK target ID not found for remote ID: "+t.targetId);const n=r.remoteSyncer.getRemoteKeysForTarget(e).size;t=t.withExpectedCount(n)}Un(r).H_(t)}function pd(r,t){r.ga.$e(t),Un(r).Z_(t)}function la(r){r.ga=new Tp({getRemoteKeysForTarget:t=>{const e=r.Ea.get(t);return e!==void 0?r.remoteSyncer.getRemoteKeysForTarget(e):$()},Rt:t=>r.Ta.get(t)||null,lt:()=>r.datastore.serializer.databaseId}),Un(r).start(),r.fa.aa()}function ha(r){return tn(r)&&!Un(r).M_()&&r.Ta.size>0}function tn(r){return q(r).Va.size===0}function _d(r){r.ga=void 0}async function D_(r){r.fa.set("Online")}async function x_(r){r.Ta.forEach((t,e)=>{ca(r,t)})}async function N_(r,t){_d(r),ha(r)?(r.fa.la(t),la(r)):r.fa.set("Unknown")}async function k_(r,t,e){if(r.fa.set("Online"),t instanceof kh&&t.state===2&&t.cause)try{await async function(s,i){const a=i.cause;for(const u of i.targetIds){if(s.Ta.has(u)){const l=s.Ea.get(u);l!==void 0&&(await s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.Ea.delete(u)),s.Ta.delete(u)}s.ga.removeTarget(u)}}(r,t)}catch(n){P(Xt,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await ti(r,n)}else if(t instanceof Ds?r.ga.Xe(t):t instanceof Nh?r.ga.it(t):r.ga.tt(t),!e.isEqual(L.min()))try{const n=await hd(r.localStore);e.compareTo(n)>=0&&await function(i,a){const u=i.ga.Pt(a);u.targetChanges.forEach((d,f)=>{if(d.resumeToken.approximateByteSize()>0){const g=i.Ta.get(f);g&&i.Ta.set(f,g.withResumeToken(d.resumeToken,a))}}),u.targetMismatches.forEach((d,f)=>{const g=i.Ta.get(d);if(!g)return;i.Ta.set(d,g.withResumeToken(dt.EMPTY_BYTE_STRING,g.snapshotVersion)),pd(i,d);const I=new Qt(g.target,d,f,g.sequenceNumber);ca(i,I)});const l=function(f,g){const I=new Map;g.targetChanges.forEach((D,k)=>{const N=f.Ea.get(k);N!==void 0&&I.set(N,D)});let S=new st(B);return g.targetMismatches.forEach((D,k)=>{const N=f.Ea.get(D);N!==void 0&&(S=S.insert(N,k))}),new Gr(g.snapshotVersion,I,S,g.documentUpdates,g.resolvedLimboDocuments)}(i,u);return i.remoteSyncer.applyRemoteEvent(l)}(r,e)}catch(n){P(Xt,"Failed to raise snapshot:",n),await ti(r,n)}}async function ti(r,t,e){if(!Re(t))throw t;r.Va.add(1),await Hr(r),r.fa.set("Offline"),e||(e=()=>hd(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{P(Xt,"Retrying IndexedDB access"),await e(),r.Va.delete(1),await Ei(r)})}function yd(r,t){return t().catch(e=>ti(r,e,t))}async function Wr(r){const t=q(r),e=ve(t);let n=t.Pa.length>0?t.Pa[t.Pa.length-1].batchId:ze;for(;O_(t);)try{const s=await g_(t.localStore,n);if(s===null){t.Pa.length===0&&e.B_();break}n=s.batchId,M_(t,s)}catch(s){await ti(t,s)}Id(t)&&Ed(t)}function O_(r){return tn(r)&&r.Pa.length<10}function M_(r,t){r.Pa.push(t);const e=ve(r);e.x_()&&e.X_&&e.Y_(t.mutations)}function Id(r){return tn(r)&&!ve(r).M_()&&r.Pa.length>0}function Ed(r){ve(r).start()}async function F_(r){ve(r).na()}async function L_(r){const t=ve(r);for(const e of r.Pa)t.Y_(e.mutations)}async function B_(r,t,e){const n=r.Pa.shift(),s=Xo.from(n,t,e);await yd(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await Wr(r)}async function U_(r,t){t&&ve(r).X_&&await async function(n,s){if(function(a){return yp(a)&&a!==V.ABORTED}(s.code)){const i=n.Pa.shift();ve(n).N_(),await yd(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Wr(n)}}(r,t),Id(r)&&Ed(r)}async function Jc(r,t){const e=q(r);e.asyncQueue.verifyOperationInProgress(),P(Xt,"RemoteStore received new credentials");const n=tn(e);e.Va.add(3),await Hr(e),n&&e.fa.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Va.delete(3),await Ei(e)}async function q_(r,t){const e=q(r);t?(e.Va.delete(2),await Ei(e)):t||(e.Va.add(2),await Hr(e),e.fa.set("Unknown"))}function Un(r){return r.pa||(r.pa=function(e,n,s){const i=q(e);return i.ia(),new A_(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Ho:D_.bind(null,r),Xo:x_.bind(null,r),e_:N_.bind(null,r),J_:k_.bind(null,r)}),r.da.push(async t=>{t?(r.pa.N_(),ha(r)?la(r):r.fa.set("Unknown")):(await r.pa.stop(),_d(r))})),r.pa}function ve(r){return r.ya||(r.ya=function(e,n,s){const i=q(e);return i.ia(),new R_(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Ho:()=>Promise.resolve(),Xo:F_.bind(null,r),e_:U_.bind(null,r),ea:L_.bind(null,r),ta:B_.bind(null,r)}),r.da.push(async t=>{t?(r.ya.N_(),await Wr(r)):(await r.ya.stop(),r.Pa.length>0&&(P(Xt,"Stopping write stream with ".concat(r.Pa.length," pending writes")),r.Pa=[]))})),r.ya}/**
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
 */class da{constructor(t,e,n,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Ht,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,i){const a=Date.now()+n,u=new da(t,e,a,s,i);return u.start(n),u}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new C(V.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function fa(r,t){if(St("AsyncQueue","".concat(t,": ").concat(r)),Re(r))return new C(V.UNAVAILABLE,"".concat(t,": ").concat(r));throw r}/**
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
 */class yn{static emptySet(t){return new yn(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||O.comparator(e.key,n.key):(e,n)=>O.comparator(e.key,n.key),this.keyedMap=hr(),this.sortedSet=new st(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof yn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new yn;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
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
 */class Xc{constructor(){this.wa=new st(O.comparator)}track(t){const e=t.doc.key,n=this.wa.get(e);n?t.type!==0&&n.type===3?this.wa=this.wa.insert(e,t):t.type===3&&n.type!==1?this.wa=this.wa.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.wa=this.wa.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.wa=this.wa.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.wa=this.wa.remove(e):t.type===1&&n.type===2?this.wa=this.wa.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.wa=this.wa.insert(e,{type:2,doc:t.doc}):M(63341,{At:t,Sa:n}):this.wa=this.wa.insert(e,t)}ba(){const t=[];return this.wa.inorderTraversal((e,n)=>{t.push(n)}),t}}class kn{constructor(t,e,n,s,i,a,u,l,d){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(t,e,n,s,i){const a=[];return e.forEach(u=>{a.push({type:0,doc:u})}),new kn(t,e,yn.emptySet(e),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&di(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
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
 */class j_{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some(t=>t.Fa())}}class z_{constructor(){this.queries=Yc(),this.onlineState="Unknown",this.Ma=new Set}terminate(){(function(e,n){const s=q(e),i=s.queries;s.queries=Yc(),i.forEach((a,u)=>{for(const l of u.Ca)l.onError(n)})})(this,new C(V.ABORTED,"Firestore shutting down"))}}function Yc(){return new re(r=>Ih(r),di)}async function ma(r,t){const e=q(r);let n=3;const s=t.query;let i=e.queries.get(s);i?!i.va()&&t.Fa()&&(n=2):(i=new j_,n=t.Fa()?0:1);try{switch(n){case 0:i.Da=await e.onListen(s,!0);break;case 1:i.Da=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=fa(a,"Initialization of query '".concat(dn(t.query),"' failed"));return void t.onError(u)}e.queries.set(s,i),i.Ca.push(t),t.xa(e.onlineState),i.Da&&t.Oa(i.Da)&&pa(e)}async function ga(r,t){const e=q(r),n=t.query;let s=3;const i=e.queries.get(n);if(i){const a=i.Ca.indexOf(t);a>=0&&(i.Ca.splice(a,1),i.Ca.length===0?s=t.Fa()?0:1:!i.va()&&t.Fa()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function $_(r,t){const e=q(r);let n=!1;for(const s of t){const i=s.query,a=e.queries.get(i);if(a){for(const u of a.Ca)u.Oa(s)&&(n=!0);a.Da=s}}n&&pa(e)}function K_(r,t,e){const n=q(r),s=n.queries.get(t);if(s)for(const i of s.Ca)i.onError(e);n.queries.delete(t)}function pa(r){r.Ma.forEach(t=>{t.next()})}var No,Zc;(Zc=No||(No={})).Na="default",Zc.Cache="cache";class _a{constructor(t,e,n){this.query=t,this.Ba=e,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=n||{}}Oa(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new kn(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.La?this.qa(t)&&(this.Ba.next(t),e=!0):this.Ka(t,this.onlineState)&&(this.Ua(t),e=!0),this.ka=t,e}onError(t){this.Ba.error(t)}xa(t){this.onlineState=t;let e=!1;return this.ka&&!this.La&&this.Ka(this.ka,t)&&(this.Ua(this.ka),e=!0),e}Ka(t,e){if(!t.fromCache||!this.Fa())return!0;const n=e!=="Offline";return(!this.options.$a||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}qa(t){if(t.docChanges.length>0)return!0;const e=this.ka&&this.ka.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}Ua(t){t=kn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.La=!0,this.Ba.next(t)}Fa(){return this.options.source!==No.Cache}}/**
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
 */class Td{constructor(t){this.key=t}}class wd{constructor(t){this.key=t}}class G_{constructor(t,e){this.query=t,this.eu=e,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=$(),this.mutatedKeys=$(),this.ru=Eh(t),this.iu=new yn(this.ru)}get su(){return this.eu}ou(t,e){const n=e?e._u:new Xc,s=e?e.iu:this.iu;let i=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((f,g)=>{const I=s.get(f),S=$r(this.query,g)?g:null,D=!!I&&this.mutatedKeys.has(I.key),k=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let N=!1;I&&S?I.data.isEqual(S.data)?D!==k&&(n.track({type:3,doc:S}),N=!0):this.au(I,S)||(n.track({type:2,doc:S}),N=!0,(l&&this.ru(S,l)>0||d&&this.ru(S,d)<0)&&(u=!0)):!I&&S?(n.track({type:0,doc:S}),N=!0):I&&!S&&(n.track({type:1,doc:I}),N=!0,(l||d)&&(u=!0)),N&&(S?(a=a.add(S),i=k?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{iu:a,_u:n,Ss:u,mutatedKeys:i}}au(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const i=this.iu;this.iu=t.iu,this.mutatedKeys=t.mutatedKeys;const a=t._u.ba();a.sort((f,g)=>function(S,D){const k=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{At:N})}};return k(S)-k(D)}(f.type,g.type)||this.ru(f.doc,g.doc)),this.uu(n),s=s!=null?s:!1;const u=e&&!s?this.cu():[],l=this.nu.size===0&&this.current&&!s?1:0,d=l!==this.tu;return this.tu=l,a.length!==0||d?{snapshot:new kn(this.query,t.iu,i,a,t.mutatedKeys,l===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),lu:u}:{lu:u}}xa(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({iu:this.iu,_u:new Xc,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(t){return!this.eu.has(t)&&!!this.iu.has(t)&&!this.iu.get(t).hasLocalMutations}uu(t){t&&(t.addedDocuments.forEach(e=>this.eu=this.eu.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.eu=this.eu.delete(e)),this.current=t.current)}cu(){if(!this.current)return[];const t=this.nu;this.nu=$(),this.iu.forEach(n=>{this.hu(n.key)&&(this.nu=this.nu.add(n.key))});const e=[];return t.forEach(n=>{this.nu.has(n)||e.push(new wd(n))}),this.nu.forEach(n=>{t.has(n)||e.push(new Td(n))}),e}Pu(t){this.eu=t.Ls,this.nu=$();const e=this.ou(t.documents);return this.applyChanges(e,!0)}Tu(){return kn.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,this.tu===0,this.hasCachedResults)}}const ya="SyncEngine";class Q_{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class H_{constructor(t){this.key=t,this.Iu=!1}}class W_{constructor(t,e,n,s,i,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Eu={},this.Ru=new re(u=>Ih(u),di),this.Au=new Map,this.Vu=new Set,this.du=new st(O.comparator),this.mu=new Map,this.fu=new ra,this.gu={},this.pu=new Map,this.yu=ne._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return this.wu===!0}}async function J_(r,t,e=!0){const n=Vd(r);let s;const i=n.Ru.get(t);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Tu()):s=await vd(n,t,e,!0),s}async function X_(r,t){const e=Vd(r);await vd(e,t,!0,!1)}async function vd(r,t,e,n){const s=await p_(r.localStore,Lt(t)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,e);let u;return n&&(u=await Y_(r,t,i,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&gd(r.remoteStore,s),u}async function Y_(r,t,e,n,s){r.Su=(g,I,S)=>async function(k,N,G,j){let U=N.view.ou(G);U.Ss&&(U=await Kc(k.localStore,N.query,!1).then(({documents:E})=>N.view.ou(E,U)));const nt=j&&j.targetChanges.get(N.targetId),W=j&&j.targetMismatches.get(N.targetId)!=null,J=N.view.applyChanges(U,k.isPrimaryClient,nt,W);return el(k,N.targetId,J.lu),J.snapshot}(r,g,I,S);const i=await Kc(r.localStore,t,!0),a=new G_(t,i.Ls),u=a.ou(i.documents),l=Qr.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),d=a.applyChanges(u,r.isPrimaryClient,l);el(r,e,d.lu);const f=new Q_(t,e,a);return r.Ru.set(t,f),r.Au.has(e)?r.Au.get(e).push(t):r.Au.set(e,[t]),d.snapshot}async function Z_(r,t,e){const n=q(r),s=n.Ru.get(t),i=n.Au.get(s.targetId);if(i.length>1)return n.Au.set(s.targetId,i.filter(a=>!di(a,t))),void n.Ru.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Co(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),e&&ua(n.remoteStore,s.targetId),ko(n,s.targetId)}).catch(Ze)):(ko(n,s.targetId),await Co(n.localStore,s.targetId,!0))}async function ty(r,t){const e=q(r),n=e.Ru.get(t),s=e.Au.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),ua(e.remoteStore,n.targetId))}async function ey(r,t,e){const n=Pd(r);try{const s=await function(a,u){const l=q(a),d=Y.now(),f=u.reduce((S,D)=>S.add(D.key),$());let g,I;return l.persistence.runTransaction("Locally write mutations","readwrite",S=>{let D=kt(),k=$();return l.Ms.getEntries(S,f).next(N=>{D=N,D.forEach((G,j)=>{j.isValidDocument()||(k=k.add(G))})}).next(()=>l.localDocuments.getOverlayedDocuments(S,D)).next(N=>{g=N;const G=[];for(const j of u){const U=pp(j,g.get(j.key).overlayedDocument);U!=null&&G.push(new se(j.key,U,lh(U.value.mapValue),mt.exists(!0)))}return l.mutationQueue.addMutationBatch(S,d,G,u)}).next(N=>{I=N;const G=N.applyToLocalDocumentSet(g,k);return l.documentOverlayCache.saveOverlays(S,N.batchId,G)})}).then(()=>({batchId:I.batchId,changes:wh(g)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),function(a,u,l){let d=a.gu[a.currentUser.toKey()];d||(d=new st(B)),d=d.insert(u,l),a.gu[a.currentUser.toKey()]=d}(n,s.batchId,e),await Jr(n,s.changes),await Wr(n.remoteStore)}catch(s){const i=fa(s,"Failed to persist write");e.reject(i)}}async function Ad(r,t){const e=q(r);try{const n=await f_(e.localStore,t);t.targetChanges.forEach((s,i)=>{const a=e.mu.get(i);a&&(F(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Iu=!0:s.modifiedDocuments.size>0?F(a.Iu,14607):s.removedDocuments.size>0&&(F(a.Iu,42227),a.Iu=!1))}),await Jr(e,n,t)}catch(n){await Ze(n)}}function tl(r,t,e){const n=q(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.Ru.forEach((i,a)=>{const u=a.view.xa(t);u.snapshot&&s.push(u.snapshot)}),function(a,u){const l=q(a);l.onlineState=u;let d=!1;l.queries.forEach((f,g)=>{for(const I of g.Ca)I.xa(u)&&(d=!0)}),d&&pa(l)}(n.eventManager,t),s.length&&n.Eu.J_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function ny(r,t,e){const n=q(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n.mu.get(t),i=s&&s.key;if(i){let a=new st(O.comparator);a=a.insert(i,ut.newNoDocument(i,L.min()));const u=$().add(i),l=new Gr(L.min(),new Map,new st(B),a,u);await Ad(n,l),n.du=n.du.remove(i),n.mu.delete(t),Ia(n)}else await Co(n.localStore,t,!1).then(()=>ko(n,t,e)).catch(Ze)}async function ry(r,t){const e=q(r),n=t.batch.batchId;try{const s=await d_(e.localStore,t);bd(e,n,null),Rd(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await Jr(e,s)}catch(s){await Ze(s)}}async function sy(r,t,e){const n=q(r);try{const s=await function(a,u){const l=q(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return l.mutationQueue.lookupMutationBatch(d,u).next(g=>(F(g!==null,37113),f=g.keys(),l.mutationQueue.removeMutationBatch(d,g))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,f,u)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>l.localDocuments.getDocuments(d,f))})}(n.localStore,t);bd(n,t,e),Rd(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await Jr(n,s)}catch(s){await Ze(s)}}function Rd(r,t){(r.pu.get(t)||[]).forEach(e=>{e.resolve()}),r.pu.delete(t)}function bd(r,t,e){const n=q(r);let s=n.gu[n.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),n.gu[n.currentUser.toKey()]=s}}function ko(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Au.get(t))r.Ru.delete(n),e&&r.Eu.bu(n,e);r.Au.delete(t),r.isPrimaryClient&&r.fu.Qr(t).forEach(n=>{r.fu.containsKey(n)||Sd(r,n)})}function Sd(r,t){r.Vu.delete(t.path.canonicalString());const e=r.du.get(t);e!==null&&(ua(r.remoteStore,e),r.du=r.du.remove(t),r.mu.delete(e),Ia(r))}function el(r,t,e){for(const n of e)n instanceof Td?(r.fu.addReference(n.key,t),iy(r,n)):n instanceof wd?(P(ya,"Document no longer in limbo: "+n.key),r.fu.removeReference(n.key,t),r.fu.containsKey(n.key)||Sd(r,n.key)):M(19791,{Du:n})}function iy(r,t){const e=t.key,n=e.path.canonicalString();r.du.get(e)||r.Vu.has(n)||(P(ya,"New document in limbo: "+e),r.Vu.add(n),Ia(r))}function Ia(r){for(;r.Vu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){const t=r.Vu.values().next().value;r.Vu.delete(t);const e=new O(X.fromString(t)),n=r.yu.next();r.mu.set(n,new H_(e)),r.du=r.du.insert(e,n),gd(r.remoteStore,new Qt(Lt(zr(e.path)),n,"TargetPurposeLimboResolution",Ft.ce))}}async function Jr(r,t,e){const n=q(r),s=[],i=[],a=[];n.Ru.isEmpty()||(n.Ru.forEach((u,l)=>{a.push(n.Su(l,t,e).then(d=>{var f;if((d||e)&&n.isPrimaryClient){const g=d?!d.fromCache:(f=e==null?void 0:e.targetChanges.get(l.targetId))==null?void 0:f.current;n.sharedClientState.updateQueryState(l.targetId,g?"current":"not-current")}if(d){s.push(d);const g=oa.Is(l.targetId,d);i.push(g)}}))}),await Promise.all(a),n.Eu.J_(s),await async function(l,d){const f=q(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>v.forEach(d,I=>v.forEach(I.Ps,S=>f.persistence.referenceDelegate.addReference(g,I.targetId,S)).next(()=>v.forEach(I.Ts,S=>f.persistence.referenceDelegate.removeReference(g,I.targetId,S)))))}catch(g){if(!Re(g))throw g;P(aa,"Failed to update sequence numbers: "+g)}for(const g of d){const I=g.targetId;if(!g.fromCache){const S=f.Cs.get(I),D=S.snapshotVersion,k=S.withLastLimboFreeSnapshotVersion(D);f.Cs=f.Cs.insert(I,k)}}}(n.localStore,i))}async function oy(r,t){const e=q(r);if(!e.currentUser.isEqual(t)){P(ya,"User change. New user:",t.toKey());const n=await ld(e.localStore,t);e.currentUser=t,function(i,a){i.pu.forEach(u=>{u.forEach(l=>{l.reject(new C(V.CANCELLED,a))})}),i.pu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await Jr(e,n.Os)}}function ay(r,t){const e=q(r),n=e.mu.get(t);if(n&&n.Iu)return $().add(n.key);{let s=$();const i=e.Au.get(t);if(!i)return s;for(const a of i){const u=e.Ru.get(a);s=s.unionWith(u.view.su)}return s}}function Vd(r){const t=q(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ad.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=ay.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=ny.bind(null,t),t.Eu.J_=$_.bind(null,t.eventManager),t.Eu.bu=K_.bind(null,t.eventManager),t}function Pd(r){const t=q(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=ry.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=sy.bind(null,t),t}class Br{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Ii(t.databaseInfo.databaseId),this.sharedClientState=this.Fu(t),this.persistence=this.Mu(t),await this.persistence.start(),this.localStore=this.xu(t),this.gcScheduler=this.Ou(t,this.localStore),this.indexBackfillerScheduler=this.Nu(t,this.localStore)}Ou(t,e){return null}Nu(t,e){return null}xu(t){return cd(this.persistence,new ud,t.initialUser,this.serializer)}Mu(t){return new sa(yi.Ai,this.serializer)}Fu(t){return new dd}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Br.provider={build:()=>new Br};class uy extends Br{constructor(t){super(),this.cacheSizeBytes=t}Ou(t,e){F(this.persistence.referenceDelegate instanceof Zs,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new rd(n,t.asyncQueue,e)}Mu(t){const e=this.cacheSizeBytes!==void 0?Tt.withCacheSize(this.cacheSizeBytes):Tt.DEFAULT;return new sa(n=>Zs.Ai(n,e),this.serializer)}}class cy extends Br{constructor(t,e,n){super(),this.Bu=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await this.Bu.initialize(this,t),await Pd(this.Bu.syncEngine),await Wr(this.Bu.remoteStore),await this.persistence.Gi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}xu(t){return cd(this.persistence,new ud,t.initialUser,this.serializer)}Ou(t,e){const n=this.persistence.referenceDelegate.garbageCollector;return new rd(n,t.asyncQueue,e)}Nu(t,e){const n=new dg(e,this.persistence);return new hg(t.asyncQueue,n)}Mu(t){const e=u_(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Tt.withCacheSize(this.cacheSizeBytes):Tt.DEFAULT;return new ia(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,v_(),Ns(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Fu(t){return new dd}}class ei{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>tl(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=oy.bind(null,this.syncEngine),await q_(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new z_}()}createDatastore(t){const e=Ii(t.databaseInfo.databaseId),n=w_(t.databaseInfo);return V_(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,s,i,a,u){return new C_(n,s,i,a,u)}(this.localStore,this.datastore,t.asyncQueue,e=>tl(this.syncEngine,e,0),function(){return Hc.v()?new Hc:new y_}())}createSyncEngine(t,e){return function(s,i,a,u,l,d,f){const g=new W_(s,i,a,u,l,d);return f&&(g.wu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const i=q(s);P(Xt,"RemoteStore shutting down."),i.Va.add(5),await Hr(i),i.ma.shutdown(),i.fa.set("Unknown")}(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}ei.provider={build:()=>new ei};/**
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
 */class Ea{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Lu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Lu(this.observer.error,t):St("Uncaught Error in snapshot listener:",t.toString()))}ku(){this.muted=!0}Lu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
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
 */const Ae="FirestoreClient";class ly{constructor(t,e,n,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this._databaseInfo=s,this.user=bt.UNAUTHENTICATED,this.clientId=Fo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async a=>{P(Ae,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(n,a=>(P(Ae,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ht;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=fa(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function so(r,t){r.asyncQueue.verifyOperationInProgress(),P(Ae,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await ld(t.localStore,s),n=s)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function nl(r,t){r.asyncQueue.verifyOperationInProgress();const e=await hy(r);P(Ae,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>Jc(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>Jc(t.remoteStore,s)),r._onlineComponents=t}async function hy(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){P(Ae,"Using user provided OfflineComponentProvider");try{await so(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;In("Error using user provided cache. Falling back to memory cache: "+e),await so(r,new Br)}}else P(Ae,"Using default OfflineComponentProvider"),await so(r,new uy(void 0));return r._offlineComponents}async function Cd(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(P(Ae,"Using user provided OnlineComponentProvider"),await nl(r,r._uninitializedComponentsProvider._online)):(P(Ae,"Using default OnlineComponentProvider"),await nl(r,new ei))),r._onlineComponents}function dy(r){return Cd(r).then(t=>t.syncEngine)}async function ni(r){const t=await Cd(r),e=t.eventManager;return e.onListen=J_.bind(null,t.syncEngine),e.onUnlisten=Z_.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=X_.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=ty.bind(null,t.syncEngine),e}function fy(r,t,e,n){const s=new Ea(n),i=new _a(t,s,e);return r.asyncQueue.enqueueAndForget(async()=>ma(await ni(r),i)),()=>{s.ku(),r.asyncQueue.enqueueAndForget(async()=>ga(await ni(r),i))}}function my(r,t,e={}){const n=new Ht;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,u,l,d){const f=new Ea({next:I=>{f.ku(),a.enqueueAndForget(()=>ga(i,g));const S=I.docs.has(u);!S&&I.fromCache?d.reject(new C(V.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&I.fromCache&&l&&l.source==="server"?d.reject(new C(V.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(I)},error:I=>d.reject(I)}),g=new _a(zr(u.path),f,{includeMetadataChanges:!0,$a:!0});return ma(i,g)}(await ni(r),r.asyncQueue,t,e,n)),n.promise}function gy(r,t,e={}){const n=new Ht;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,u,l,d){const f=new Ea({next:I=>{f.ku(),a.enqueueAndForget(()=>ga(i,g)),I.fromCache&&l.source==="server"?d.reject(new C(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(I)},error:I=>d.reject(I)}),g=new _a(u,f,{includeMetadataChanges:!0,$a:!0});return ma(i,g)}(await ni(r),r.asyncQueue,t,e,n)),n.promise}function py(r,t){const e=new Ht;return r.asyncQueue.enqueueAndForget(async()=>ey(await dy(r),t,e)),e.promise}/**
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
 */function Dd(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
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
 */const _y="ComponentProvider",rl=new Map;function yy(r,t,e,n,s){return new qg(r,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Dd(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
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
 */const Iy="firestore.googleapis.com",sl=!0;class il{constructor(t){var e,n;if(t.host===void 0){if(t.ssl!==void 0)throw new C(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Iy,this.ssl=sl}else this.host=t.host,this.ssl=(e=t.ssl)!=null?e:sl;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Yh;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<nd)throw new C(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}ag("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Dd((n=t.experimentalLongPollingOptions)!=null?n:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new C(V.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(i.timeoutSeconds," (must not be NaN)"));if(i.timeoutSeconds<5)throw new C(V.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(i.timeoutSeconds," (minimum allowed value is 5)"));if(i.timeoutSeconds>30)throw new C(V.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(i.timeoutSeconds," (maximum allowed value is 30)"))}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Ta{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new il({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new C(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new C(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new il(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Ym;switch(n.type){case"firstParty":return new eg(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new C(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=rl.get(e);n&&(P(_y,"Removing Datastore"),rl.delete(e),n.terminate())}(this),Promise.resolve()}}/**
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
 */class ie{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new ie(this.firestore,t,this._query)}}class ct{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ee(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ct(this.firestore,t,this._key)}toJSON(){return{type:ct._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(Ur(e,ct._jsonSchema))return new ct(t,n||null,new O(X.fromString(e.referencePath)))}}ct._jsonSchemaVersion="firestore/documentReference/1.0",ct._jsonSchema={type:ht("string",ct._jsonSchemaVersion),referencePath:ht("string")};class Ee extends ie{constructor(t,e,n){super(t,e,zr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ct(this.firestore,null,new O(t))}withConverter(t){return new Ee(this.firestore,t,this._path)}}function By(r,t,...e){if(r=Bt(r),Ll("collection","path",t),r instanceof Ta){const n=X.fromString(t,...e);return Wu(n),new Ee(r,null,n)}{if(!(r instanceof ct||r instanceof Ee))throw new C(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(t,...e));return Wu(n),new Ee(r.firestore,null,n)}}function Ey(r,t,...e){if(r=Bt(r),arguments.length===1&&(t=Fo.newId()),Ll("doc","path",t),r instanceof Ta){const n=X.fromString(t,...e);return Hu(n),new ct(r,null,new O(n))}{if(!(r instanceof ct||r instanceof Ee))throw new C(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(t,...e));return Hu(n),new ct(r.firestore,r instanceof Ee?r.converter:null,new O(n))}}/**
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
 */const ol="AsyncQueue";class al{constructor(t=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new fd(this,"async_queue_retry"),this.cc=()=>{const n=Ns();n&&P(ol,"Visibility state changed to "+n.visibilityState),this.F_.y_()},this.lc=t;const e=Ns();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.hc(),this.Pc(t)}enterRestrictedMode(t){if(!this.rc){this.rc=!0,this.ac=t||!1;const e=Ns();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.cc)}}enqueue(t){if(this.hc(),this.rc)return new Promise(()=>{});const e=new Ht;return this.Pc(()=>this.rc&&this.ac?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.nc.push(t),this.Tc()))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(t){if(!Re(t))throw t;P(ol,"Operation failed with retryable error: "+t)}this.nc.length>0&&this.F_.g_(()=>this.Tc())}}Pc(t){const e=this.lc.then(()=>(this._c=!0,t().catch(n=>{throw this.oc=n,this._c=!1,St("INTERNAL UNHANDLED ERROR: ",ul(n)),n}).then(n=>(this._c=!1,n))));return this.lc=e,e}enqueueAfterDelay(t,e,n){this.hc(),this.uc.indexOf(t)>-1&&(e=0);const s=da.createAndSchedule(this,t,e,n,i=>this.Ic(i));return this.sc.push(s),s}hc(){this.oc&&M(47125,{Ec:ul(this.oc)})}verifyOperationInProgress(){}async Rc(){let t;do t=this.lc,await t;while(t!==this.lc)}Ac(t){for(const e of this.sc)if(e.timerId===t)return!0;return!1}Vc(t){return this.Rc().then(()=>{this.sc.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.sc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Rc()})}dc(t){this.uc.push(t)}Ic(t){const e=this.sc.indexOf(t);this.sc.splice(e,1)}}function ul(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+"\n"+r.stack),t}class Yt extends Ta{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new al,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new al(t),this._firestoreClient=void 0,await t}}}function Uy(r,t,e){e||(e=zs);const n=Om(r,"firestore");if(n.isInitialized(e)){const s=n.getImmediate({identifier:e}),i=n.getOptions(e);if(Ms(i,t))return s;throw new C(V.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(t.cacheSizeBytes!==void 0&&t.localCache!==void 0)throw new C(V.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(t.cacheSizeBytes!==void 0&&t.cacheSizeBytes!==-1&&t.cacheSizeBytes<nd)throw new C(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&Al(t.host)&&Ff(t.host),n.initialize({options:t,instanceIdentifier:e})}function Xr(r){if(r._terminated)throw new C(V.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Ty(r),r._firestoreClient}function Ty(r){var n,s,i,a;const t=r._freezeSettings(),e=yy(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,t);r._componentsProvider||(i=t.localCache)!=null&&i._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(r._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),r._firestoreClient=new ly(r._authCredentials,r._appCheckCredentials,r._queue,e,r._componentsProvider&&function(l){const d=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(d),_online:d}}(r._componentsProvider))}/**
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
 */class Mt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Mt(dt.fromBase64String(t))}catch(e){throw new C(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Mt(dt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Mt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Ur(t,Mt._jsonSchema))return Mt.fromBase64String(t.bytes)}}Mt._jsonSchemaVersion="firestore/bytes/1.0",Mt._jsonSchema={type:ht("string",Mt._jsonSchemaVersion),bytes:ht("string")};/**
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
 */class Ti{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new C(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ot(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class wi{constructor(t){this._methodName=t}}/**
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
 */class Wt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new C(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new C(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return B(this._lat,t._lat)||B(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Wt._jsonSchemaVersion}}static fromJSON(t){if(Ur(t,Wt._jsonSchema))return new Wt(t.latitude,t.longitude)}}Wt._jsonSchemaVersion="firestore/geoPoint/1.0",Wt._jsonSchema={type:ht("string",Wt._jsonSchemaVersion),latitude:ht("number"),longitude:ht("number")};/**
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
 */class qt{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,t._values)}toJSON(){return{type:qt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Ur(t,qt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new qt(t.vectorValues);throw new C(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}qt._jsonSchemaVersion="firestore/vectorValue/1.0",qt._jsonSchema={type:ht("string",qt._jsonSchemaVersion),vectorValues:ht("object")};/**
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
 */const wy=/^__.*__$/;class vy{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new se(t,this.data,this.fieldMask,e,this.fieldTransforms):new Bn(t,this.data,e,this.fieldTransforms)}}class xd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new se(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Nd(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{dataSource:r})}}class wa{constructor(t,e,n,s,i,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.mc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(t){return new wa({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}gc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),n=this.i({path:e,arrayElement:!1});return n.yc(t),n}wc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),n=this.i({path:e,arrayElement:!1});return n.mc(),n}Sc(t){return this.i({path:void 0,arrayElement:!0})}bc(t){return ri(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}mc(){if(this.path)for(let t=0;t<this.path.length;t++)this.yc(this.path.get(t))}yc(t){if(t.length===0)throw this.bc("Document fields must not be empty");if(Nd(this.dataSource)&&wy.test(t))throw this.bc('Document fields cannot begin and end with "__"')}}class Ay{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||Ii(t)}V(t,e,n,s=!1){return new wa({dataSource:t,methodName:e,targetDoc:n,path:ot.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Yr(r){const t=r._freezeSettings(),e=Ii(r._databaseId);return new Ay(r._databaseId,!!t.ignoreUndefinedProperties,e)}function va(r,t,e,n,s,i={}){const a=r.V(i.merge||i.mergeFields?2:0,t,e,s);Ra("Data must be an object, but it was:",a,n);const u=Md(n,a);let l,d;if(i.merge)l=new Ct(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const g of i.mergeFields){const I=On(t,g,e);if(!a.contains(I))throw new C(V.INVALID_ARGUMENT,"Field '".concat(I,"' is specified in your field mask but missing from your input data."));Bd(f,I)||f.push(I)}l=new Ct(f),d=a.fieldTransforms.filter(g=>l.covers(g.field))}else l=null,d=a.fieldTransforms;return new vy(new wt(u),l,d)}class vi extends wi{_toFieldTransform(t){if(t.dataSource!==2)throw t.dataSource===1?t.bc("".concat(this._methodName,"() can only appear at the top level of your update data")):t.bc("".concat(this._methodName,"() cannot be used with set() unless you pass {merge:true}"));return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof vi}}class Aa extends wi{_toFieldTransform(t){return new Vh(t.path,new Pn)}isEqual(t){return t instanceof Aa}}function kd(r,t,e,n){const s=r.V(1,t,e);Ra("Data must be an object, but it was:",s,n);const i=[],a=wt.empty();be(n,(l,d)=>{const f=Ld(t,l,e);d=Bt(d);const g=s.wc(f);if(d instanceof vi)i.push(f);else{const I=Zr(d,g);I!=null&&(i.push(f),a.set(f,I))}});const u=new Ct(i);return new xd(a,u,s.fieldTransforms)}function Od(r,t,e,n,s,i){const a=r.V(1,t,e),u=[On(t,n,e)],l=[s];if(i.length%2!=0)throw new C(V.INVALID_ARGUMENT,"Function ".concat(t,"() needs to be called with an even number of arguments that alternate between field names and values."));for(let I=0;I<i.length;I+=2)u.push(On(t,i[I])),l.push(i[I+1]);const d=[],f=wt.empty();for(let I=u.length-1;I>=0;--I)if(!Bd(d,u[I])){const S=u[I];let D=l[I];D=Bt(D);const k=a.wc(S);if(D instanceof vi)d.push(S);else{const N=Zr(D,k);N!=null&&(d.push(S),f.set(S,N))}}const g=new Ct(d);return new xd(f,g,a.fieldTransforms)}function Ry(r,t,e,n=!1){return Zr(e,r.V(n?4:3,t))}function Zr(r,t){if(Fd(r=Bt(r)))return Ra("Unsupported field value:",t,r),Md(r,t);if(r instanceof wi)return function(n,s){if(!Nd(s.dataSource))throw s.bc("".concat(n._methodName,"() can only be used with update() and set()"));if(!s.path)throw s.bc("".concat(n._methodName,"() is not currently supported inside arrays"));const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.bc("Nested arrays are not supported");return function(n,s){const i=[];let a=0;for(const u of n){let l=Zr(u,s.Sc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}}(r,t)}return function(n,s){if((n=Bt(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return lp(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=Y.fromDate(n);return{timestampValue:Nn(s.serializer,i)}}if(n instanceof Y){const i=new Y(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Nn(s.serializer,i)}}if(n instanceof Wt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Mt)return{bytesValue:Oh(s.serializer,n._byteString)};if(n instanceof ct){const i=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(i))throw s.bc("Document reference is for database ".concat(a.projectId,"/").concat(a.database," but should be for database ").concat(i.projectId,"/").concat(i.database));return{referenceValue:ta(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof qt)return function(a,u){const l=a instanceof qt?a.toArray():a;return{mapValue:{fields:{[Ko]:{stringValue:Go},[Rn]:{arrayValue:{values:l.map(f=>{if(typeof f!="number")throw u.bc("VectorValues must only contain numeric values.");return fi(u.serializer,f)})}}}}}}(n,s);if(Gh(n))return n._toProto(s.serializer);throw s.bc("Unsupported field value: ".concat(si(n)))}(r,t)}function Md(r,t){const e={};return th(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):be(r,(n,s)=>{const i=Zr(s,t.gc(n));i!=null&&(e[n]=i)}),{mapValue:{fields:e}}}function Fd(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Y||r instanceof Wt||r instanceof Mt||r instanceof ct||r instanceof wi||r instanceof qt||Gh(r))}function Ra(r,t,e){if(!Fd(e)||!Bl(e)){const n=si(e);throw n==="an object"?t.bc(r+" a custom object"):t.bc(r+" "+n)}}function On(r,t,e){if((t=Bt(t))instanceof Ti)return t._internalPath;if(typeof t=="string")return Ld(r,t);throw ri("Field path arguments must be of type string or ",r,!1,void 0,e)}const by=new RegExp("[~\\*/\\[\\]]");function Ld(r,t,e){if(t.search(by)>=0)throw ri("Invalid field path (".concat(t,"). Paths must not contain '~', '*', '/', '[', or ']'"),r,!1,void 0,e);try{return new Ti(...t.split("."))._internalPath}catch(n){throw ri("Invalid field path (".concat(t,"). Paths must not be empty, begin with '.', end with '.', or contain '..'"),r,!1,void 0,e)}}function ri(r,t,e,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let u="Function ".concat(t,"() called with invalid data");e&&(u+=" (via `toFirestore()`)"),u+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=" in field ".concat(n)),a&&(l+=" in document ".concat(s)),l+=")"),new C(V.INVALID_ARGUMENT,u+r+l)}function Bd(r,t){return r.some(e=>e.isEqual(t))}/**
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
 */class Sy{convertValue(t,e="none"){switch(Te(t)){case 0:return null;case 1:return t.booleanValue;case 2:return it(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ee(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return be(t,(s,i)=>{n[s]=this.convertValue(i,e)}),n}convertVectorValue(t){var n,s,i;const e=(i=(s=(n=t.fields)==null?void 0:n[Rn].arrayValue)==null?void 0:s.values)==null?void 0:i.map(a=>it(a.doubleValue));return new qt(e)}convertGeoPoint(t){return new Wt(it(t.latitude),it(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=li(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Dr(t));default:return null}}convertTimestamp(t){const e=te(t);return new Y(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=X.fromString(t);F(Kh(n),9688,{name:t});const s=new We(n.get(1),n.get(3)),i=new O(n.popFirst(5));return s.isEqual(e)||St("Document ".concat(i," contains a document reference within a different database (").concat(s.projectId,"/").concat(s.database,") which is not supported. It will be treated as a reference in the current database (").concat(e.projectId,"/").concat(e.database,") instead.")),i}}/**
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
 */class ba extends Sy{constructor(t){super(),this.firestore=t}convertBytes(t){return new Mt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ct(this.firestore,null,e)}}function qy(){return new Aa("serverTimestamp")}const cl="@firebase/firestore",ll="4.15.0";/**
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
 */function hl(r){return function(e,n){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1}(r,["next","error","complete"])}/**
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
 */class Ud{constructor(t,e,n,s,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ct(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Vy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t,e;return(e=(t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)!=null?e:void 0}get(t){if(this._document){const e=this._document.data.field(On("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Vy extends Ud{data(){return super.data()}}/**
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
 */function qd(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new C(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Sa{}class Va extends Sa{}function jy(r,t,...e){let n=[];t instanceof Sa&&n.push(t),n=n.concat(e),function(i){const a=i.filter(l=>l instanceof Ca).length,u=i.filter(l=>l instanceof Pa).length;if(a>1||a>0&&u>0)throw new C(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class Pa extends Va{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new Pa(t,e,n)}_apply(t){const e=this._parse(t);return jd(t._query,e),new ie(t.firestore,t.converter,wo(t._query,e))}_parse(t){const e=Yr(t.firestore);return function(i,a,u,l,d,f,g){let I;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new C(V.INVALID_ARGUMENT,"Invalid Query. You can't perform '".concat(f,"' queries on documentId()."));if(f==="in"||f==="not-in"){fl(g,f);const D=[];for(const k of g)D.push(dl(l,i,k));I={arrayValue:{values:D}}}else I=dl(l,i,g)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||fl(g,f),I=Ry(u,a,g,f==="in"||f==="not-in");return K.create(d,f,I)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}class Ca extends Sa{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Ca(t,e)}_parse(t){const e=this._queryConstraints.map(n=>n._parse(t)).filter(n=>n.getFilters().length>0);return e.length===1?e[0]:Z.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,i){let a=s;const u=i.getFlattenedFilters();for(const l of u)jd(a,l),a=wo(a,l)}(t._query,e),new ie(t.firestore,t.converter,wo(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Da extends Va{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Da(t,e)}_apply(t){const e=function(s,i,a){if(s.startAt!==null)throw new C(V.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new C(V.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Mr(i,a)}(t._query,this._field,this._direction);return new ie(t.firestore,t.converter,np(t._query,e))}}function zy(r,t="asc"){const e=t,n=On("orderBy",r);return Da._create(n,e)}class xa extends Va{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new xa(t,e,n)}_apply(t){return new ie(t.firestore,t.converter,Gs(t._query,this._limit,this._limitType))}}function $y(r){return xa._create("limit",r,"F")}function dl(r,t,e){if(typeof(e=Bt(e))=="string"){if(e==="")throw new C(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!yh(t)&&e.indexOf("/")!==-1)throw new C(V.INVALID_ARGUMENT,"Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '".concat(e,"' contains a '/' character."));const n=t.path.child(X.fromString(e));if(!O.isDocumentKey(n))throw new C(V.INVALID_ARGUMENT,"Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '".concat(n,"' is not because it has an odd number of segments (").concat(n.length,")."));return Nr(r,new O(n))}if(e instanceof ct)return Nr(r,e._key);throw new C(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ".concat(si(e),"."))}function fl(r,t){if(!Array.isArray(r)||r.length===0)throw new C(V.INVALID_ARGUMENT,"Invalid Query. A non-empty array is required for '".concat(t.toString(),"' filters."))}function jd(r,t){const e=function(s,i){for(const a of s)for(const u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new C(V.INVALID_ARGUMENT,"Invalid query. You cannot use more than one '".concat(t.op.toString(),"' filter.")):new C(V.INVALID_ARGUMENT,"Invalid query. You cannot use '".concat(t.op.toString(),"' filters with '").concat(e.toString(),"' filters."))}function Na(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}class Py{constructor(t){let e;this.kind="persistent",t!=null&&t.tabManager?(t.tabManager._initialize(t),e=t.tabManager):(e=Dy(void 0),e._initialize(t)),this._onlineComponentProvider=e._onlineComponentProvider,this._offlineComponentProvider=e._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function Ky(r){return new Py(r)}class Cy{constructor(t){this.forceOwnership=t,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=ei.provider,this._offlineComponentProvider={build:e=>new cy(e,t==null?void 0:t.cacheSizeBytes,this.forceOwnership)}}}function Dy(r){return new Cy(r==null?void 0:r.forceOwnership)}class mr{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ge extends Ud{constructor(t,e,n,s,i,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new ks(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(On("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new C(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Ge._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Ge._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ge._jsonSchema={type:ht("string",Ge._jsonSchemaVersion),bundleSource:ht("string","DocumentSnapshot"),bundleName:ht("string"),bundle:ht("string")};class ks extends Ge{data(t={}){return super.data(t)}}class Qe{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new mr(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new ks(this._firestore,this._userDataWriter,n.key,n,new mr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new C(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{const l=new ks(s._firestore,s._userDataWriter,u.doc.key,u.doc,new mr(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{const l=new ks(s._firestore,s._userDataWriter,u.doc.key,u.doc,new mr(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,f=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),f=a.indexOf(u.doc.key)),{type:xy(u.type),doc:l,oldIndex:d,newIndex:f}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new C(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Qe._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Fo.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],n=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(e.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function xy(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:r})}}/**
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
 */Qe._jsonSchemaVersion="firestore/querySnapshot/1.0",Qe._jsonSchema={type:ht("string",Qe._jsonSchemaVersion),bundleSource:ht("string","QuerySnapshot"),bundleName:ht("string"),bundle:ht("string")};/**
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
 */class Ny{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=Yr(t)}set(t,e,n){this._verifyNotCommitted();const s=io(t,this._firestore),i=Na(s.converter,e,n),a=va(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(a.toMutation(s._key,mt.none())),this}update(t,e,n,...s){this._verifyNotCommitted();const i=io(t,this._firestore);let a;return a=typeof(e=Bt(e))=="string"||e instanceof Ti?Od(this._dataReader,"WriteBatch.update",i._key,e,n,s):kd(this._dataReader,"WriteBatch.update",i._key,e),this._mutations.push(a.toMutation(i._key,mt.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=io(t,this._firestore);return this._mutations=this._mutations.concat(new Kr(e._key,mt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new C(V.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function io(r,t){if((r=Bt(r)).firestore!==t)throw new C(V.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
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
 */function Gy(r){r=Dt(r,ct);const t=Dt(r.firestore,Yt),e=Xr(t);return my(e,r._key).then(n=>zd(t,r,n))}function Qy(r){r=Dt(r,ie);const t=Dt(r.firestore,Yt),e=Xr(t),n=new ba(t);return qd(r._query),gy(e,r._query).then(s=>new Qe(t,n,r,s))}function Hy(r,t,e){r=Dt(r,ct);const n=Dt(r.firestore,Yt),s=Na(r.converter,t,e),i=Yr(n);return ts(n,[va(i,"setDoc",r._key,s,r.converter!==null,e).toMutation(r._key,mt.none())])}function Wy(r,t,e,...n){r=Dt(r,ct);const s=Dt(r.firestore,Yt),i=Yr(s);let a;return a=typeof(t=Bt(t))=="string"||t instanceof Ti?Od(i,"updateDoc",r._key,t,e,n):kd(i,"updateDoc",r._key,t),ts(s,[a.toMutation(r._key,mt.exists(!0))])}function Jy(r){return ts(Dt(r.firestore,Yt),[new Kr(r._key,mt.none())])}function Xy(r,t){const e=Dt(r.firestore,Yt),n=Ey(r),s=Na(r.converter,t),i=Yr(r.firestore);return ts(e,[va(i,"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,mt.exists(!1))]).then(()=>n)}function Yy(r,...t){var d,f,g;r=Bt(r);let e={includeMetadataChanges:!1,source:"default"},n=0;typeof t[n]!="object"||hl(t[n])||(e=t[n++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(hl(t[n])){const I=t[n];t[n]=(d=I.next)==null?void 0:d.bind(I),t[n+1]=(f=I.error)==null?void 0:f.bind(I),t[n+2]=(g=I.complete)==null?void 0:g.bind(I)}let i,a,u;if(r instanceof ct)a=Dt(r.firestore,Yt),u=zr(r._key.path),i={next:I=>{t[n]&&t[n](zd(a,r,I))},error:t[n+1],complete:t[n+2]};else{const I=Dt(r,ie);a=Dt(I.firestore,Yt),u=I._query;const S=new ba(a);i={next:D=>{t[n]&&t[n](new Qe(a,S,I,D))},error:t[n+1],complete:t[n+2]},qd(r._query)}const l=Xr(a);return fy(l,u,s,i)}function ts(r,t){const e=Xr(r);return py(e,t)}function zd(r,t,e){const n=e.docs.get(t._key),s=new ba(r);return new Ge(r,s,t._key,n,new mr(e.hasPendingWrites,e.fromCache),t.converter)}function Zy(r){return r=Dt(r,Yt),Xr(r),new Ny(r,t=>ts(r,t))}(function(t,e=!0){Jm(Bm),Ls(new vr("firestore",(n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),u=new Yt(new Zm(n.getProvider("auth-internal")),new ng(a,n.getProvider("app-check-internal")),jg(a,s),a);return i={useFetchStreams:e,...i},u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),pn(cl,ll,t),pn(cl,ll,"esm2020")})();var ky="firebase",Oy="12.14.0";/**
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
 */pn(ky,Oy,"app");export{Y as T,Uy as a,Yy as b,By as c,Ey as d,Gy as e,qy as f,Fy as g,Jy as h,My as i,Xy as j,Qy as k,$y as l,zy as o,Ky as p,jy as q,Hy as s,Wy as u,Zy as w};
