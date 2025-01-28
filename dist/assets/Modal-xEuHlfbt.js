import{r,d as Qe,t as Ze,j as l,T as et,k as tt,c as R,E as nt,l as ot,u as O,m as rt,n as X,o as Re,s as q,p as M,R as st,q as Me,v as Ee,w as at,x as it,y as lt,z as ct,B as Oe,C as ut,D as dt}from"./index-IDBWUVYU.js";import{r as ft}from"./index-Chjiymov.js";function ht(){const e=r.useRef(!0),t=r.useRef(()=>e.current);return r.useEffect(()=>(e.current=!0,()=>{e.current=!1}),[]),t.current}function mt(e){const t=r.useRef(null);return r.useEffect(()=>{t.current=e}),t.current}const gt=typeof global<"u"&&global.navigator&&global.navigator.product==="ReactNative",pt=typeof document<"u",ke=pt||gt?r.useLayoutEffect:r.useEffect;var Et=ft();const fe=Qe(Et);function Rt(e){return e.code==="Escape"||e.keyCode===27}function yt(){const e=r.version.split(".");return{major:+e[0],minor:+e[1],patch:+e[2]}}function Fe(e){if(!e||typeof e=="function")return null;const{major:t}=yt();return t>=19?e.props.ref:e.ref}const vt={[nt]:"show",[ot]:"show"},ye=r.forwardRef(({className:e,children:t,transitionClasses:n={},onEnter:o,...s},a)=>{const h={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1,...s},u=r.useCallback((d,c)=>{Ze(d),o==null||o(d,c)},[o]);return l.jsx(et,{ref:a,addEndListener:tt,...h,onEnter:u,childRef:Fe(t),children:(d,c)=>r.cloneElement(t,{...c,className:R("fade",e,t.props.className,vt[d],n[d])})})});ye.displayName="Fade";const bt={"aria-label":fe.string,onClick:fe.func,variant:fe.oneOf(["white"])},ve=r.forwardRef(({className:e,variant:t,"aria-label":n="Close",...o},s)=>l.jsx("button",{ref:s,type:"button",className:R("btn-close",t&&`btn-close-${t}`,e),"aria-label":n,...o}));ve.displayName="CloseButton";ve.propTypes=bt;const Tt=r.forwardRef(({as:e,bsPrefix:t,variant:n="primary",size:o,active:s=!1,disabled:a=!1,className:h,...u},d)=>{const c=O(t,"btn"),[m,{tagName:E}]=rt({tagName:e,disabled:a,...u}),g=E;return l.jsx(g,{...m,...u,ref:d,disabled:a,className:R(h,c,s&&"active",n&&`${c}-${n}`,o&&`${c}-${o}`,u.href&&a&&"disabled")})});Tt.displayName="Button";var wt=Function.prototype.bind.call(Function.prototype.call,[].slice);function $(e,t){return wt(e.querySelectorAll(t))}function je(e,t){if(e.contains)return e.contains(t);if(e.compareDocumentPosition)return e===t||!!(e.compareDocumentPosition(t)&16)}const Ct="data-rr-ui-";function xt(e){return`${Ct}${e}`}const $e=r.createContext(X?window:void 0);$e.Provider;function be(){return r.useContext($e)}const Se=e=>!e||typeof e=="function"?e:t=>{e.current=t};function Nt(e,t){const n=Se(e),o=Se(t);return s=>{n&&n(s),o&&o(s)}}function Te(e,t){return r.useMemo(()=>Nt(e,t),[e,t])}var se;function Be(e){if((!se&&se!==0||e)&&X){var t=document.createElement("div");t.style.position="absolute",t.style.top="-9999px",t.style.width="50px",t.style.height="50px",t.style.overflow="scroll",document.body.appendChild(t),se=t.offsetWidth-t.clientWidth,document.body.removeChild(t)}return se}function Mt(){return r.useState(null)}function he(e){e===void 0&&(e=Re());try{var t=e.activeElement;return!t||!t.nodeName?null:t}catch{return e.body}}function Ot(e){const t=r.useRef(e);return t.current=e,t}function kt(e){const t=Ot(e);r.useEffect(()=>()=>t.current(),[])}function jt(e=document){const t=e.defaultView;return Math.abs(t.innerWidth-e.documentElement.clientWidth)}const Ae=xt("modal-open");class we{constructor({ownerDocument:t,handleContainerOverflow:n=!0,isRTL:o=!1}={}){this.handleContainerOverflow=n,this.isRTL=o,this.modals=[],this.ownerDocument=t}getScrollbarWidth(){return jt(this.ownerDocument)}getElement(){return(this.ownerDocument||document).body}setModalAttributes(t){}removeModalAttributes(t){}setContainerStyle(t){const n={overflow:"hidden"},o=this.isRTL?"paddingLeft":"paddingRight",s=this.getElement();t.style={overflow:s.style.overflow,[o]:s.style[o]},t.scrollBarWidth&&(n[o]=`${parseInt(q(s,o)||"0",10)+t.scrollBarWidth}px`),s.setAttribute(Ae,""),q(s,n)}reset(){[...this.modals].forEach(t=>this.remove(t))}removeContainerStyle(t){const n=this.getElement();n.removeAttribute(Ae),Object.assign(n.style,t.style)}add(t){let n=this.modals.indexOf(t);return n!==-1||(n=this.modals.length,this.modals.push(t),this.setModalAttributes(t),n!==0)||(this.state={scrollBarWidth:this.getScrollbarWidth(),style:{}},this.handleContainerOverflow&&this.setContainerStyle(this.state)),n}remove(t){const n=this.modals.indexOf(t);n!==-1&&(this.modals.splice(n,1),!this.modals.length&&this.handleContainerOverflow&&this.removeContainerStyle(this.state),this.removeModalAttributes(t))}isTopModal(t){return!!this.modals.length&&this.modals[this.modals.length-1]===t}}const me=(e,t)=>X?e==null?(t||Re()).body:(typeof e=="function"&&(e=e()),e&&"current"in e&&(e=e.current),e&&("nodeType"in e||e.getBoundingClientRect)?e:null):null;function St(e,t){const n=be(),[o,s]=r.useState(()=>me(e,n==null?void 0:n.document));if(!o){const a=me(e);a&&s(a)}return r.useEffect(()=>{},[t,o]),r.useEffect(()=>{const a=me(e);a!==o&&s(a)},[e,o]),o}function Bt({children:e,in:t,onExited:n,mountOnEnter:o,unmountOnExit:s}){const a=r.useRef(null),h=r.useRef(t),u=M(n);r.useEffect(()=>{t?h.current=!0:u(a.current)},[t,u]);const d=Te(a,e.ref),c=r.cloneElement(e,{ref:d});return t?c:s||!h.current&&o?null:c}const At=["onEnter","onEntering","onEntered","onExit","onExiting","onExited","addEndListener","children"];function Lt(e,t){if(e==null)return{};var n={};for(var o in e)if({}.hasOwnProperty.call(e,o)){if(t.indexOf(o)>=0)continue;n[o]=e[o]}return n}function Dt(e){let{onEnter:t,onEntering:n,onEntered:o,onExit:s,onExiting:a,onExited:h,addEndListener:u,children:d}=e,c=Lt(e,At);const m=r.useRef(null),E=Te(m,Fe(d)),g=T=>x=>{T&&m.current&&T(m.current,x)},v=r.useCallback(g(t),[t]),W=r.useCallback(g(n),[n]),k=r.useCallback(g(o),[o]),_=r.useCallback(g(s),[s]),b=r.useCallback(g(a),[a]),H=r.useCallback(g(h),[h]),j=r.useCallback(g(u),[u]);return Object.assign({},c,{nodeRef:m},t&&{onEnter:v},n&&{onEntering:W},o&&{onEntered:k},s&&{onExit:_},a&&{onExiting:b},h&&{onExited:H},u&&{addEndListener:j},{children:typeof d=="function"?(T,x)=>d(T,Object.assign({},x,{ref:E})):r.cloneElement(d,{ref:E})})}const Ft=["component"];function $t(e,t){if(e==null)return{};var n={};for(var o in e)if({}.hasOwnProperty.call(e,o)){if(t.indexOf(o)>=0)continue;n[o]=e[o]}return n}const It=r.forwardRef((e,t)=>{let{component:n}=e,o=$t(e,Ft);const s=Dt(o);return l.jsx(n,Object.assign({ref:t},s))});function Wt({in:e,onTransition:t}){const n=r.useRef(null),o=r.useRef(!0),s=M(t);return ke(()=>{if(!n.current)return;let a=!1;return s({in:e,element:n.current,initial:o.current,isStale:()=>a}),()=>{a=!0}},[e,s]),ke(()=>(o.current=!1,()=>{o.current=!0}),[]),n}function _t({children:e,in:t,onExited:n,onEntered:o,transition:s}){const[a,h]=r.useState(!t);t&&a&&h(!1);const u=Wt({in:!!t,onTransition:c=>{const m=()=>{c.isStale()||(c.in?o==null||o(c.element,c.initial):(h(!0),n==null||n(c.element)))};Promise.resolve(s(c)).then(m,E=>{throw c.in||h(!0),E})}}),d=Te(u,e.ref);return a&&!t?null:r.cloneElement(e,{ref:d})}function Le(e,t,n){return e?l.jsx(It,Object.assign({},n,{component:e})):t?l.jsx(_t,Object.assign({},n,{transition:t})):l.jsx(Bt,Object.assign({},n))}const Ht=["show","role","className","style","children","backdrop","keyboard","onBackdropClick","onEscapeKeyDown","transition","runTransition","backdropTransition","runBackdropTransition","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","renderDialog","renderBackdrop","manager","container","onShow","onHide","onExit","onExited","onExiting","onEnter","onEntering","onEntered"];function Ut(e,t){if(e==null)return{};var n={};for(var o in e)if({}.hasOwnProperty.call(e,o)){if(t.indexOf(o)>=0)continue;n[o]=e[o]}return n}let ge;function Kt(e){return ge||(ge=new we({ownerDocument:e==null?void 0:e.document})),ge}function Gt(e){const t=be(),n=e||Kt(t),o=r.useRef({dialog:null,backdrop:null});return Object.assign(o.current,{add:()=>n.add(o.current),remove:()=>n.remove(o.current),isTopModal:()=>n.isTopModal(o.current),setDialogRef:r.useCallback(s=>{o.current.dialog=s},[]),setBackdropRef:r.useCallback(s=>{o.current.backdrop=s},[])})}const Ie=r.forwardRef((e,t)=>{let{show:n=!1,role:o="dialog",className:s,style:a,children:h,backdrop:u=!0,keyboard:d=!0,onBackdropClick:c,onEscapeKeyDown:m,transition:E,runTransition:g,backdropTransition:v,runBackdropTransition:W,autoFocus:k=!0,enforceFocus:_=!0,restoreFocus:b=!0,restoreFocusOptions:H,renderDialog:j,renderBackdrop:T=f=>l.jsx("div",Object.assign({},f)),manager:x,container:ae,onShow:Y,onHide:U=()=>{},onExit:ie,onExited:K,onExiting:J,onEnter:Q,onEntering:Z,onEntered:ee}=e,le=Ut(e,Ht);const w=be(),S=St(ae),p=Gt(x),ce=ht(),te=mt(n),[N,B]=r.useState(!n),y=r.useRef(null);r.useImperativeHandle(t,()=>p,[p]),X&&!te&&n&&(y.current=he(w==null?void 0:w.document)),n&&N&&B(!1);const C=M(()=>{if(p.add(),A.current=Me(document,"keydown",de),V.current=Me(document,"focus",()=>setTimeout(ue),!0),Y&&Y(),k){var f,re;const P=he((f=(re=p.dialog)==null?void 0:re.ownerDocument)!=null?f:w==null?void 0:w.document);p.dialog&&P&&!je(p.dialog,P)&&(y.current=P,p.dialog.focus())}}),G=M(()=>{if(p.remove(),A.current==null||A.current(),V.current==null||V.current(),b){var f;(f=y.current)==null||f.focus==null||f.focus(H),y.current=null}});r.useEffect(()=>{!n||!S||C()},[n,S,C]),r.useEffect(()=>{N&&G()},[N,G]),kt(()=>{G()});const ue=M(()=>{if(!_||!ce()||!p.isTopModal())return;const f=he(w==null?void 0:w.document);p.dialog&&f&&!je(p.dialog,f)&&p.dialog.focus()}),ne=M(f=>{f.target===f.currentTarget&&(c==null||c(f),u===!0&&U())}),de=M(f=>{d&&Rt(f)&&p.isTopModal()&&(m==null||m(f),f.defaultPrevented||U())}),V=r.useRef(),A=r.useRef(),oe=(...f)=>{B(!0),K==null||K(...f)};if(!S)return null;const L=Object.assign({role:o,ref:p.setDialogRef,"aria-modal":o==="dialog"?!0:void 0},le,{style:a,className:s,tabIndex:-1});let z=j?j(L):l.jsx("div",Object.assign({},L,{children:r.cloneElement(h,{role:"document"})}));z=Le(E,g,{unmountOnExit:!0,mountOnEnter:!0,appear:!0,in:!!n,onExit:ie,onExiting:J,onExited:oe,onEnter:Q,onEntering:Z,onEntered:ee,children:z});let D=null;return u&&(D=T({ref:p.setBackdropRef,onClick:ne}),D=Le(v,W,{in:!!n,appear:!0,mountOnEnter:!0,unmountOnExit:!0,children:D})),l.jsx(l.Fragment,{children:st.createPortal(l.jsxs(l.Fragment,{children:[D,z]}),S)})});Ie.displayName="Modal";const Vt=Object.assign(Ie,{Manager:we});function zt(e,t){return e.classList?e.classList.contains(t):(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+t+" ")!==-1}function Pt(e,t){e.classList?e.classList.add(t):zt(e,t)||(typeof e.className=="string"?e.className=e.className+" "+t:e.setAttribute("class",(e.className&&e.className.baseVal||"")+" "+t))}function De(e,t){return e.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function qt(e,t){e.classList?e.classList.remove(t):typeof e.className=="string"?e.className=De(e.className,t):e.setAttribute("class",De(e.className&&e.className.baseVal||"",t))}const I={FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",STICKY_CONTENT:".sticky-top",NAVBAR_TOGGLER:".navbar-toggler"};class Xt extends we{adjustAndStore(t,n,o){const s=n.style[t];n.dataset[t]=s,q(n,{[t]:`${parseFloat(q(n,t))+o}px`})}restore(t,n){const o=n.dataset[t];o!==void 0&&(delete n.dataset[t],q(n,{[t]:o}))}setContainerStyle(t){super.setContainerStyle(t);const n=this.getElement();if(Pt(n,"modal-open"),!t.scrollBarWidth)return;const o=this.isRTL?"paddingLeft":"paddingRight",s=this.isRTL?"marginLeft":"marginRight";$(n,I.FIXED_CONTENT).forEach(a=>this.adjustAndStore(o,a,t.scrollBarWidth)),$(n,I.STICKY_CONTENT).forEach(a=>this.adjustAndStore(s,a,-t.scrollBarWidth)),$(n,I.NAVBAR_TOGGLER).forEach(a=>this.adjustAndStore(s,a,t.scrollBarWidth))}removeContainerStyle(t){super.removeContainerStyle(t);const n=this.getElement();qt(n,"modal-open");const o=this.isRTL?"paddingLeft":"paddingRight",s=this.isRTL?"marginLeft":"marginRight";$(n,I.FIXED_CONTENT).forEach(a=>this.restore(o,a)),$(n,I.STICKY_CONTENT).forEach(a=>this.restore(s,a)),$(n,I.NAVBAR_TOGGLER).forEach(a=>this.restore(s,a))}}let pe;function Yt(e){return pe||(pe=new Xt(e)),pe}const We=r.forwardRef(({className:e,bsPrefix:t,as:n="div",...o},s)=>(t=O(t,"modal-body"),l.jsx(n,{ref:s,className:R(e,t),...o})));We.displayName="ModalBody";const _e=r.createContext({onHide(){}}),Ce=r.forwardRef(({bsPrefix:e,className:t,contentClassName:n,centered:o,size:s,fullscreen:a,children:h,scrollable:u,...d},c)=>{e=O(e,"modal");const m=`${e}-dialog`,E=typeof a=="string"?`${e}-fullscreen-${a}`:`${e}-fullscreen`;return l.jsx("div",{...d,ref:c,className:R(m,t,s&&`${e}-${s}`,o&&`${m}-centered`,u&&`${m}-scrollable`,a&&E),children:l.jsx("div",{className:R(`${e}-content`,n),children:h})})});Ce.displayName="ModalDialog";const He=r.forwardRef(({className:e,bsPrefix:t,as:n="div",...o},s)=>(t=O(t,"modal-footer"),l.jsx(n,{ref:s,className:R(e,t),...o})));He.displayName="ModalFooter";const Jt=r.forwardRef(({closeLabel:e="Close",closeVariant:t,closeButton:n=!1,onHide:o,children:s,...a},h)=>{const u=r.useContext(_e),d=Ee(()=>{u==null||u.onHide(),o==null||o()});return l.jsxs("div",{ref:h,...a,children:[s,n&&l.jsx(ve,{"aria-label":e,variant:t,onClick:d})]})}),Ue=r.forwardRef(({bsPrefix:e,className:t,closeLabel:n="Close",closeButton:o=!1,...s},a)=>(e=O(e,"modal-header"),l.jsx(Jt,{ref:a,...s,className:R(t,e),closeLabel:n,closeButton:o})));Ue.displayName="ModalHeader";const Qt=at("h4"),Ke=r.forwardRef(({className:e,bsPrefix:t,as:n=Qt,...o},s)=>(t=O(t,"modal-title"),l.jsx(n,{ref:s,className:R(e,t),...o})));Ke.displayName="ModalTitle";function Zt(e){return l.jsx(ye,{...e,timeout:null})}function en(e){return l.jsx(ye,{...e,timeout:null})}const Ge=r.forwardRef(({bsPrefix:e,className:t,style:n,dialogClassName:o,contentClassName:s,children:a,dialogAs:h=Ce,"data-bs-theme":u,"aria-labelledby":d,"aria-describedby":c,"aria-label":m,show:E=!1,animation:g=!0,backdrop:v=!0,keyboard:W=!0,onEscapeKeyDown:k,onShow:_,onHide:b,container:H,autoFocus:j=!0,enforceFocus:T=!0,restoreFocus:x=!0,restoreFocusOptions:ae,onEntered:Y,onExit:U,onExiting:ie,onEnter:K,onEntering:J,onExited:Q,backdropClassName:Z,manager:ee,...le},w)=>{const[S,p]=r.useState({}),[ce,te]=r.useState(!1),N=r.useRef(!1),B=r.useRef(!1),y=r.useRef(null),[C,G]=Mt(),ue=it(w,G),ne=Ee(b),de=lt();e=O(e,"modal");const V=r.useMemo(()=>({onHide:ne}),[ne]);function A(){return ee||Yt({isRTL:de})}function oe(i){if(!X)return;const F=A().getScrollbarWidth()>0,Ne=i.scrollHeight>Re(i).documentElement.clientHeight;p({paddingRight:F&&!Ne?Be():void 0,paddingLeft:!F&&Ne?Be():void 0})}const L=Ee(()=>{C&&oe(C.dialog)});ct(()=>{Oe(window,"resize",L),y.current==null||y.current()});const z=()=>{N.current=!0},D=i=>{N.current&&C&&i.target===C.dialog&&(B.current=!0),N.current=!1},f=()=>{te(!0),y.current=dt(C.dialog,()=>{te(!1)})},re=i=>{i.target===i.currentTarget&&f()},P=i=>{if(v==="static"){re(i);return}if(B.current||i.target!==i.currentTarget){B.current=!1;return}b==null||b()},Ve=i=>{W?k==null||k(i):(i.preventDefault(),v==="static"&&f())},ze=(i,F)=>{i&&oe(i),K==null||K(i,F)},Pe=i=>{y.current==null||y.current(),U==null||U(i)},qe=(i,F)=>{J==null||J(i,F),ut(window,"resize",L)},Xe=i=>{i&&(i.style.display=""),Q==null||Q(i),Oe(window,"resize",L)},Ye=r.useCallback(i=>l.jsx("div",{...i,className:R(`${e}-backdrop`,Z,!g&&"show")}),[g,Z,e]),xe={...n,...S};xe.display="block";const Je=i=>l.jsx("div",{role:"dialog",...i,style:xe,className:R(t,e,ce&&`${e}-static`,!g&&"show"),onClick:v?P:void 0,onMouseUp:D,"data-bs-theme":u,"aria-label":m,"aria-labelledby":d,"aria-describedby":c,children:l.jsx(h,{...le,onMouseDown:z,className:o,contentClassName:s,children:a})});return l.jsx(_e.Provider,{value:V,children:l.jsx(Vt,{show:E,ref:ue,backdrop:v,container:H,keyboard:!0,autoFocus:j,enforceFocus:T,restoreFocus:x,restoreFocusOptions:ae,onEscapeKeyDown:Ve,onShow:_,onHide:b,onEnter:ze,onEntering:qe,onEntered:Y,onExit:Pe,onExiting:ie,onExited:Xe,manager:A(),transition:g?Zt:void 0,backdropTransition:g?en:void 0,renderBackdrop:Ye,renderDialog:Je})})});Ge.displayName="Modal";const on=Object.assign(Ge,{Body:We,Header:Ue,Title:Ke,Footer:He,Dialog:Ce,TRANSITION_DURATION:300,BACKDROP_TRANSITION_DURATION:150});export{Tt as B,on as M,fe as P};
