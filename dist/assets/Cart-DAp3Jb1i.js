import{r as h,u as D,j as e,c as I,f as $,N as B,B as f,F as n,S}from"./index-CJuAhs0n.js";const C=h.forwardRef(({bsPrefix:s,variant:c,animation:m="border",size:i,as:l="div",className:d,...u},x)=>{s=D(s,"spinner");const p=`${s}-${m}`;return e.jsx(l,{ref:x,...u,className:I(d,p,i&&`${p}-${i}`,c&&`text-${c}`)})});C.displayName="Spinner";const F="/assets/emptycart-C68bvKV1.png",A=()=>e.jsxs("div",{className:"empty-cart",children:[e.jsx("img",{src:F,alt:"Empty Cart"}),e.jsx("h2",{style:{color:"red"},children:"Your Cart is Empty!"}),e.jsx("p",{children:"Looks like you haven't made order yet."}),e.jsx(f,{variant:"primary",href:"/merchandise",className:"continue-shopping",children:"Continue to Shopping"})]}),K=({book:s,onRemove:c,onQuantityChange:m,index:i})=>{var d;const l=u=>{(s.quantity||1)+u>0&&m(i,u)};return e.jsx("div",{className:"cart-item",children:e.jsxs("div",{className:"cart-item-content",children:[e.jsxs("div",{className:"cart-item-image",children:[s.isOnSale&&e.jsx("div",{className:"super-deal-badge text-light",children:"Super Deal"}),e.jsx("img",{src:`https://adminapi.lyricistsassociationbd.com${s.file_path}`,alt:s.name})]}),e.jsxs("div",{className:"cart-item-details",children:[e.jsx("h2",{className:"cart-item-title",children:s.name}),e.jsxs("h6",{className:"cart-item-author",children:["By ",e.jsx("span",{children:(d=s.member)==null?void 0:d.name})]}),e.jsxs("p",{className:"cart-item-price",children:[s.price," BDT Only"]})]}),e.jsxs("div",{className:"cart-item-actions",children:[e.jsx(f,{variant:"link",className:"delete-btn",onClick:()=>c(i),children:e.jsx("i",{className:"fas fa-trash"})}),e.jsxs("div",{className:"quantity-controls",children:[e.jsx("button",{className:"btn btn-outline-secondary",onClick:()=>l(-1),children:"-"}),e.jsx("span",{className:"mx-3",children:s.quantity||1}),e.jsx("button",{className:"btn btn-outline-secondary",onClick:()=>l(1),children:"+"})]})]})]})})},k=({subtotal:s,deliveryCharge:c,total:m})=>e.jsxs("div",{className:"order-summary",children:[e.jsx("h2",{className:"text-dark",children:"Order Summary"}),e.jsxs("div",{className:"summary-item",children:[e.jsx("span",{children:"Subtotal"}),e.jsxs("span",{children:[s," TK."]})]}),e.jsxs("div",{className:"summary-item",children:[e.jsx("span",{children:"Delivery Charge"}),e.jsxs("span",{children:[c," TK."]})]}),e.jsx("hr",{}),e.jsxs("div",{className:"summary-item total",children:[e.jsx("span",{children:"Total"}),e.jsxs("span",{children:[m," TK."]})]})]}),G=({userInfo:s,paymentMethods:c,onSubmit:m,onChange:i,isLoading:l})=>e.jsxs(n,{onSubmit:m,className:"shipping-form",children:[e.jsx("h3",{children:"Shipping Information"}),e.jsxs("div",{className:"form-row ",children:[e.jsxs(n.Group,{className:"form-group",children:[e.jsx(n.Label,{children:"Name"}),e.jsx(n.Control,{type:"text",name:"name",value:s.name,onChange:i,required:!0,className:"form-control",disabled:l})]}),e.jsxs(n.Group,{className:"form-group",children:[e.jsx(n.Label,{children:"Phone"}),e.jsx(n.Control,{type:"tel",name:"phone",value:s.phone,onChange:i,required:!0,className:"form-control",disabled:l})]})]}),e.jsxs(n.Group,{className:"form-group",children:[e.jsx(n.Label,{children:"Email"}),e.jsx(n.Control,{type:"email",name:"email",value:s.email,onChange:i,required:!0,className:"form-control",disabled:l})]}),e.jsxs(n.Group,{className:"form-group",children:[e.jsx(n.Label,{children:"Shipping Address"}),e.jsx(n.Control,{as:"textarea",rows:3,name:"shippingAddress",value:s.shippingAddress,onChange:i,required:!0,className:"form-control",disabled:l})]}),e.jsxs(n.Group,{className:"form-group",children:[e.jsx(n.Label,{children:"Payment Method"}),e.jsxs(n.Select,{name:"paymentMethod",value:s.paymentMethod,onChange:i,required:!0,className:"form-select",disabled:l,children:[e.jsx("option",{value:"",children:"Select Payment Method"}),c.map(d=>e.jsx("option",{value:d.id,className:"bg-dark text-light",children:d.payment_method},d.id))]})]}),e.jsx(f,{variant:"primary",type:"submit",className:"submit-button",style:{backgroundColor:"red"},disabled:l,children:l?e.jsxs(e.Fragment,{children:[e.jsx(C,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"me-2"}),"Processing..."]}):"Place Order"})]}),J=()=>{const[s,c]=h.useState([]),[m,i]=h.useState([]),[l,d]=h.useState([]),[u,x]=h.useState(!1),[p,v]=h.useState({name:"",phone:"",email:"",shippingAddress:"",paymentMethod:""}),q=$();h.useEffect(()=>{const t=JSON.parse(localStorage.getItem("cart"))||[];c(t),w(),t.length>0&&P(t.map(a=>a.id))},[]);const w=h.useCallback(async()=>{try{const a=await(await fetch("https://api.lyricistsassociationbd.com/api/v1/cart/payment-methods")).json();a.status==="success"&&i(a.data)}catch(t){console.error("Error fetching payment methods:",t)}},[]),P=h.useCallback(async t=>{try{const a=t.map((y,g)=>`product_ids[${g}]=${y}`).join("&"),o=await(await fetch(`https://api.lyricistsassociationbd.com/api/v1/cart/products-data?${a}`)).json();o.status==="success"&&d(o.data)}catch(a){console.error("Error fetching product data:",a)}},[]),j=()=>s.reduce((t,a)=>t+parseFloat(a.price)*(a.quantity||1),0),N=()=>80,b=()=>j()+N(),O=t=>{const{name:a,value:r}=t.target;v(o=>({...o,[a]:r}))},_=async t=>{t.preventDefault(),x(!0);const a={name:p.name,email:p.email,phone:p.phone,shipping_address:p.shippingAddress,payment_method_id:parseInt(p.paymentMethod),order_detail:s.map(r=>({product_id:r.id,price:parseFloat(r.price),qty:r.quantity||1,total:r.price*(r.quantity||1)})),sub_total:j(),delivery_charge:N(),total:b()};try{const r=new Promise(g=>{const T=Math.floor(Math.random()*1e3)+2e3;setTimeout(g,T)}),y=await(await fetch("https://api.lyricistsassociationbd.com/api/v1/cart/order-placement",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();await r,y.status==="success"?(c([]),v({name:"",phone:"",email:"",shippingAddress:"",paymentMethod:""}),localStorage.removeItem("cart"),q("/tracker?order=success&order_id="+y.data.order_number)):(x(!1),S.fire({title:"Error placing order",text:"Please try again.",icon:"error",confirmButtonText:"OK"}))}catch(r){console.error("Error placing order:",r),x(!1),S.fire({title:"Error placing order",text:"Please try again.",icon:"error",confirmButtonText:"OK"})}},E=t=>{const a=s.filter((r,o)=>o!==t);c(a),localStorage.setItem("cart",JSON.stringify(a))},M=(t,a)=>{const r=[...s],o=r[t];o.quantity||(o.quantity=1),o.quantity+=a,c(r),localStorage.setItem("cart",JSON.stringify(r))};return e.jsxs("div",{className:"cart-page",children:[e.jsx(B,{cart:s}),e.jsxs("div",{className:"cart-container",children:[e.jsx("h1",{className:"text-start my-4",children:e.jsx("span",{className:"typograph-text fs-2",children:"Shopping Cart"})}),e.jsx("div",{className:"cart-content",children:s.length===0?e.jsx(A,{}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cart-main",children:[e.jsxs("div",{className:"cart-items",children:[e.jsx("h4",{style:{color:"rgba(255, 149, 0, 1)"},children:"Order Items"}),s.map((t,a)=>e.jsx(K,{book:t,index:a,onRemove:E,onQuantityChange:M},a))]}),e.jsx("div",{className:"order-summary-container",children:e.jsx(k,{subtotal:j(),deliveryCharge:N(),total:b()})})]}),e.jsx("div",{className:"shipping-form-container",children:e.jsx(G,{userInfo:p,paymentMethods:m,onSubmit:_,onChange:O,isLoading:u})})]})})]})]})};export{J as default};
