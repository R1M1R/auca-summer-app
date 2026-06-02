import{c as s,u as i,j as e,m as a,A as n}from"./index-BRzug9zW.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=s("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=s("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);function h(){const{isDark:t,toggleTheme:o}=i();return e.jsx(a.button,{onClick:o,whileHover:{scale:1.08},whileTap:{scale:.92},className:`relative w-9 h-9 rounded-xl glass-card flex items-center justify-center\r
                 text-slate-500 dark:text-slate-400\r
                 hover:text-slate-800 dark:hover:text-slate-100\r
                 transition-colors duration-200 overflow-hidden`,"aria-label":"Toggle theme",children:e.jsx(n,{mode:"wait",initial:!1,children:e.jsx(a.div,{initial:{rotate:-30,opacity:0,scale:.7},animate:{rotate:0,opacity:1,scale:1},exit:{rotate:30,opacity:0,scale:.7},transition:{duration:.25,ease:"easeOut"},children:t?e.jsx(r,{className:"w-4 h-4",strokeWidth:2}):e.jsx(l,{className:"w-4 h-4",strokeWidth:2})},t?"moon":"sun")})})}export{r as M,l as S,h as T};
