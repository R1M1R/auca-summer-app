import{c as i,f as c,Z as h,e as y,j as a,m as s,_ as x,$ as p}from"./index-DbcTQMkP.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=i("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=i("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=i("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),v=[{key:"dashboard",path:"/dashboard",Icon:u},{key:"diary",path:"/diary",Icon:x},{key:"schedule",path:"/schedule",Icon:m},{key:"guide",path:"/guide",Icon:p},{key:"settings",path:"/settings",Icon:g}];function f(){const{t:o}=c(),{pathname:r}=h(),l=y();return a.jsx(s.nav,{initial:{y:80,opacity:0},animate:{y:0,opacity:1},transition:{delay:.5,type:"spring",stiffness:300,damping:25},className:"fixed bottom-0 left-0 right-0 z-40 px-3 pb-safe-bottom",children:a.jsx("div",{className:"glass-card rounded-2xl px-2 py-2 flex items-center justify-around max-w-lg mx-auto mb-2",children:v.map(({key:n,path:t,Icon:d})=>{const e=r===t||t!=="/dashboard"&&r.startsWith(t);return a.jsxs(s.button,{onClick:()=>l(t),whileTap:{scale:.88},className:["relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors duration-200",e?"text-primary-500":"text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"].join(" "),children:[e&&a.jsx(s.div,{layoutId:"nav-indicator",className:"absolute inset-0 rounded-xl bg-primary-50 dark:bg-primary-900/30",transition:{type:"spring",stiffness:500,damping:30}}),a.jsx(d,{className:"relative z-10 w-5 h-5",strokeWidth:e?2.5:1.8}),a.jsx("span",{className:"relative z-10 text-[10px] font-medium",children:o(`nav.${n}`)})]},n)})})})}export{f as B,m as C,g as S};
