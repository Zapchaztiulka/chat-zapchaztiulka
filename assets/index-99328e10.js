import{j as e,P as v,a as $,u as N,b as q,r as t,L as se,M as te,i as U,A as ae,S as H,c as o,d as I,e as ne,Q as W,f as oe,g as re,s as ie,h as le,k as ce,l as de,m as _,B as ue,n as me}from"./index-bb04999d.js";import{S as fe,D as K,a as ge,P as pe}from"./SearchBtnMini-0316840d.js";import{C as xe,M as D,a as he}from"./Container-01b317f6.js";const ye=()=>e.jsxs("svg",{width:"60",height:"59",viewBox:"0 0 60 59",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("circle",{cx:"30.0002",cy:"29.5227",r:"29.3743",fill:"#FEF3F2"}),e.jsx("circle",{cx:"30.0005",cy:"29.5225",r:"20.0513",fill:"#FEE4E2"}),e.jsx("path",{d:"M30 26.6782V30.5366M30 34.395H30.0097M28.3506 21.7202L20.1804 35.3596C20.012 35.6513 19.9228 35.9821 19.9219 36.3189C19.9209 36.6558 20.0082 36.987 20.175 37.2797C20.3418 37.5723 20.5824 37.8162 20.8727 37.987C21.163 38.1579 21.493 38.2497 21.8299 38.2534H38.1702C38.507 38.2497 38.837 38.1579 39.1274 37.987C39.4177 37.8162 39.6582 37.5723 39.825 37.2797C39.9919 36.987 40.0791 36.6558 40.0782 36.3189C40.0773 35.9821 39.9881 35.6513 39.8197 35.3596L31.6495 21.7202C31.4775 21.4367 31.2354 21.2023 30.9465 21.0396C30.6576 20.877 30.3316 20.7915 30 20.7915C29.6685 20.7915 29.3425 20.877 29.0536 21.0396C28.7647 21.2023 28.5225 21.4367 28.3506 21.7202Z",stroke:"#F04438",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]});const z=({isActiveMenu:n,isOpenModal:m,onFinishChat:y})=>{const l=$(),c=N(q),[T,j]=t.useState(!1),[f,E]=t.useState(""),[M,s]=t.useState(1),S=t.useRef(M),[g,C]=t.useState(null),[b,F]=t.useState(!1),[a,r]=t.useState(null),[p,u]=t.useState(!1),d=t.useRef(null),[x,k]=t.useState(!1),R=localStorage.getItem("userId");let L;const V=i=>{const h=i.target,w=1,ee=4;E(h.value);const A=Math.min(ee,Math.max(w,h.scrollHeight/24));s(A),S.current=A,o.emit("userTyping",{isTyping:!0}),clearTimeout(L),L=setTimeout(()=>{o.emit("userTyping",{isTyping:!1})},1e3)},B=()=>{if(f.trim()==="")return;const i={userId:R,roomId:c._id,message:{messageOwner:"user",messageType:"text",messageText:f}};l({type:I,payload:i}),o.emit("userMessage",i),E(""),s(1)},O=()=>{if(g){k(!0),u(!0);const i=new FormData;i.append("chatImageURL",g),ne(i).then(h=>{const w={userId:R,roomId:c._id,message:{messageOwner:"user",messageType:"image",messageText:h.imageURL}};l({type:I,payload:w}),o.emit("userMessage",w)}).catch(()=>W.error("Не вдалося завантажити фото. Спробуйте повторити")).finally(()=>{C(null),F(!1),r(null),k(!1),u(!1)})}},G=i=>{const h=i.target.files[0];C(h),F(!0);const w=URL.createObjectURL(h);r(w)},Q=()=>{d.current&&d.current.click()},Z=()=>{f.trim()!==""&&s(S.current)},P=i=>{i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),p?O():B())},X=()=>{j(!T)},Y=()=>{s(1),o.emit("userTyping",{isTyping:!1})};return t.useEffect(()=>{j(n)},[n]),e.jsx(e.Fragment,{children:x?e.jsx(se,{}):e.jsxs("footer",{className:"absolute bottom-0 w-full",children:[e.jsxs("div",{className:"relative items-center bg-mainColors-staticWhite",children:[e.jsx("textarea",{className:"input-style",type:"text",placeholder:"Введіть ваше повідомлення",rows:M,value:f,onChange:V,onKeyDown:P,onFocus:Z,onBlur:Y}),!f&&!b&&e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",className:"icon-style",style:{right:"44px"},onClick:X,children:e.jsx(te,{colorFill:T?U.brand:U.primary})}),e.jsxs("button",{className:"icon-style",onClick:Q,children:[e.jsx("input",{type:"file",style:{display:"none"},onChange:G,ref:d}),e.jsx(ae,{})]})]}),f&&e.jsx("button",{type:"submit",className:"icon-style",onClick:B,children:e.jsx(H,{})}),b&&e.jsx("button",{type:"submit",className:"icon-style",onClick:O,children:e.jsx(H,{})}),a&&e.jsx("div",{className:"bg-mainColors-staticWhite ml-5 py-5",children:e.jsx("img",{src:a,alt:"Uploaded Image"})})]}),T&&e.jsxs("div",{className:"flex gap-3 py-xs justify-center fade-in",children:[e.jsx(fe,{to:"/",disabled:c==null?void 0:c.isChatRoomProcessed,onClick:()=>y(),children:"Головне меню"}),e.jsx(K,{onClick:()=>m(),children:"Завершити діалог"})]})]})})};z.propTypes={isActiveMenu:v.bool.isRequired,isOpenModal:v.func.isRequired,onFinishChat:v.func};const je=document.getElementById("modal-root"),J=({onFinishChat:n,closeModal:m})=>{t.useEffect(()=>{const l=c=>{c.code==="Escape"&&m()};return window.addEventListener("keydown",l),()=>{window.removeEventListener("keydown",l)}},[m]);const y=l=>{l.target===l.currentTarget&&m()};return oe.createPortal(e.jsx("div",{onMouseDown:y,className:"fixed z-40 top-[0] left-[0] w-[100vw] h-[100vh] bg-bgColors-backDrop",children:e.jsxs("div",{className:`absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2\r
                   flex flex-col gap-m2 py-m px-s w-[400px] h-auto items-center justify-center\r
                 bg-bgColors-white rounded-medium`,children:[e.jsxs("div",{className:"flex flex-col gap-xs items-center justify-center",children:[e.jsx(ye,{}),e.jsxs("div",{className:"flex flex-col gap-xs2 items-center justify-center leading-6 tracking-textBase",children:[e.jsx("h4",{className:"font-medium text-xl text-textColors-primary",children:"Завершити чат з оператором?"}),e.jsx("p",{className:"font-normal text-base text-textColors-secondary text-center",children:"Ви впевнені, що хочете завершити діалог з оператором?"})]})]}),e.jsxs("div",{className:"flex gap-xs justify-between",children:[e.jsx(ge,{onClick:m,children:"Скасувати"}),e.jsx(K,{to:"/",onClick:()=>n(),children:"Так, завершити"})]})]})}),je)};J.propTypes={onFinishChat:v.func.isRequired,closeModal:v.func.isRequired};const Me=()=>{const n=$(),[m,y]=t.useState(!1),[l,c]=t.useState(!1),[T,j]=t.useState(!1),[f,E]=t.useState(!1),M=N(re),s=N(q),S=N(ie),g=t.useRef(null),C=localStorage.getItem("userId");t.useEffect(()=>{o.emit("authentication",{token:M}),y(!0)},[M]),o.on("authenticationError",({message:a})=>{W.error(a),y(!1)}),t.useEffect(()=>(o.on("closeChatByManager",({room:a})=>{n({type:le,payload:{room:a}})}),()=>{o.off("closeChatByManager")}),[n]),t.useEffect(()=>{!s&&S.isOnline===!0&&n(ce(C))},[s,n,S.isOnline,C]),t.useEffect(()=>(o.on("managerMessage",({roomId:a,message:r})=>{n({type:I,payload:{roomId:a,message:r}})}),()=>{o.off("managerMessage")}),[n]),t.useEffect(()=>(o.on("managerTyping",({isTyping:a,manager:r})=>{a&&r.id===(s==null?void 0:s.managerId)?c(!0):c(!1)}),()=>{o.off("managerTyping")}),[s==null?void 0:s.managerId]),t.useEffect(()=>(o.on("userStatusChanged",({userId:a,isOnline:r})=>{n({type:de,payload:{userId:a,isOnline:r}})}),()=>{o.off("userStatusChanged")}),[n]),t.useEffect(()=>(o.on("managerJoinToChat",a=>{n({type:_,payload:a});const{_id:r,managerName:p,managerSurname:u}=a;if(p){const d={roomId:r,message:{messageOwner:"Бот",messageType:"text",messageText:`До чату приєднався менеджер ${p} ${u}`,createdAt:Date.now()}};n({type:I,payload:d})}}),()=>{o.off("managerJoinToChat")}),[n]),t.useEffect(()=>(o.on("disconnectManager",a=>{if(s){const{_id:r,managerName:p,managerSurname:u}=s,d=a.findIndex(x=>x._id===r);if(d!==-1){n({type:_,payload:a[d]});const x={roomId:r,message:{messageOwner:"Бот",messageType:"text",messageText:`Менеджер ${p} ${u} від'єднався. Очікуйте підключення менеджера...`,createdAt:Date.now()}};n({type:I,payload:x})}}}),()=>{o.off("disconnectManager")}),[s,n]),t.useEffect(()=>{if(g.current){const a=g.current.scrollHeight,r=g.current.clientHeight;a>r&&(g.current.scrollTop=a-r)}},[s,l]);const b=()=>{s&&(n(me({chatRoomId:s._id,userId:C})),E(!1),j(!1))},F=()=>j(!0);return m?e.jsxs("div",{children:[e.jsxs(xe,{children:[e.jsxs("section",{ref:g,className:"flex flex-col gap-5 py-5 message-container",children:[s&&e.jsx(D,{type:"text",text:he,time:s==null?void 0:s.createdAt}),s&&(s==null?void 0:s.messages.map((a,r)=>{const{_id:p=r,messageOwner:u,messageText:d,messageType:x,createdAt:k=Date.now()}=a;return e.jsx(D,{owner:u==="user"?"Ви":u==="Бот"?"Бот":`Менеджер ${s.managerName} ${s.managerSurname}`,type:x,text:d,time:k},p)})),l&&e.jsx("div",{children:e.jsx(pe,{disabled:!0,children:e.jsxs("div",{className:"flex gap-xs2",children:[e.jsx("div",{className:"font-normal text-sm leading-5 text-textColors-tertiary",children:"Менеджер друкує повідомлення"}),e.jsx(ue,{height:20,width:48,radius:8})]})})}),!s&&e.jsx(D,{type:"text",text:"Менеджер завершив чат. Для продовження перейдіть в Головне меню",time:Date.now()})]}),T&&e.jsx(J,{onFinishChat:b,closeModal:()=>j(!1)})]}),e.jsx(z,{isActiveMenu:f,isOpenModal:F,onFinishChat:b})]}):null};export{Me as default};
