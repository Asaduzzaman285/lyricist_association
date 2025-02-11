import{r as l,b as _,j as e,N as I,B as y,F as r,S as j}from"./index-D9_yaZ4s.js";const M=()=>{const[c,d]=l.useState([]),[f,N]=l.useState([]),[P,v]=l.useState([]),[i,u]=l.useState({name:"",phone:"",email:"",shippingAddress:"",paymentMethod:""}),b=_();l.useEffect(()=>{const t=JSON.parse(localStorage.getItem("cart"))||[];d(t),S(),t.length>0&&C(t.map(s=>s.id))},[]);const S=l.useCallback(async()=>{try{const s=await(await fetch("https://lyricistapi.wineds.com/api/v1/cart/payment-methods")).json();s.status==="success"&&N(s.data)}catch(t){console.error("Error fetching payment methods:",t)}},[]),C=l.useCallback(async t=>{try{const s=t.map((m,O)=>`product_ids[${O}]=${m}`).join("&"),n=await(await fetch(`https://lyricistapi.wineds.com/api/v1/cart/products-data?${s}`)).json();n.status==="success"&&v(n.data)}catch(s){console.error("Error fetching product data:",s)}},[]),h=()=>c.reduce((t,s)=>t+parseFloat(s.price)*(s.quantity||1),0),p=()=>80,x=()=>h()+p(),o=t=>{const{name:s,value:a}=t.target;u({...i,[s]:a})},w=async t=>{t.preventDefault();const s={name:i.name,email:i.email,phone:i.phone,shipping_address:i.shippingAddress,payment_method_id:parseInt(i.paymentMethod),order_detail:c.map(a=>({product_id:a.id,price:parseFloat(a.price),qty:a.quantity||1,total:a.price*(a.quantity||1)})),sub_total:h(),delivery_charge:p(),total:x()};try{const n=await(await fetch("https://lyricistapi.wineds.com/api/v1/cart/order-placement",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).json();n.status==="success"?(console.log("Order placed successfully:",n),d([]),u({name:"",phone:"",email:"",shippingAddress:"",paymentMethod:""}),localStorage.removeItem("cart"),b("/tracker?order=success&order_id="+n.data.order_number)):(console.error("Error placing order:",n),j.fire({title:"Error placing order",text:"Please try again.",icon:"error",confirmButtonText:"OK"}))}catch(a){console.error("Error placing order:",a),j.fire({title:"Error placing order",text:"Please try again.",icon:"error",confirmButtonText:"OK"})}},q=t=>{const s=c.filter((a,n)=>n!==t);d(s),localStorage.setItem("cart",JSON.stringify(s))},g=(t,s)=>{const a=[...c],n=a[t];n.quantity||(n.quantity=1);const m=n.quantity+s;m>0&&(n.quantity=m,d(a),localStorage.setItem("cart",JSON.stringify(a)))};return e.jsxs("div",{children:[e.jsx(I,{cart:c}),e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-md-8",style:{minHeight:"100vh"},children:[e.jsx("h1",{className:"text-start my-4 text-light",children:e.jsx("span",{className:"typograph-text fs-2",children:"Shopping Cart"})}),c.length===0?e.jsx("div",{className:"d-flex justify-content-center align-items-center",style:{minHeight:"50vh"},children:e.jsx("button",{className:"btn  px-4 py-3",style:{background:"transparent",color:"rgb(255, 149, 0)",border:"2px dashed transparent",borderImage:"repeating-linear-gradient(90deg, rgb(255, 149, 0) 0, rgb(255, 149, 0) 15px, transparent 15px, transparent 30px) 10",borderRadius:"8px",fontSize:"1.2rem",cursor:"default",textAlign:"right",paddingRight:"10px"},children:"No products have been added to the cart yet."})}):e.jsxs("div",{className:"cart-list",children:[e.jsx("h4",{style:{color:"rgba(255, 149, 0, 1)"},children:"Order Items"}),c.map((t,s)=>{var a;return e.jsxs("div",{className:"cart-item d-flex",children:[e.jsxs("div",{className:"image-section position-relative",children:[t.isOnSale&&e.jsx("div",{className:"super-deal-badge text-light",children:"Super Deal"}),e.jsx("img",{src:`https://lyricistadminapi.wineds.com${t.file_path}`,alt:t.name,className:"cart-image",style:{width:"100px",maxHeight:"70px"}})]}),e.jsxs("div",{className:"details-section text-start text-light fs-3",children:[e.jsx("h2",{className:"card-title fs-5 ",children:t.name}),e.jsxs("h6",{style:{fontSize:"13px"},children:["By ",e.jsx("span",{style:{color:"rgba(255, 149, 0, 1)"},children:(a=t.member)==null?void 0:a.name})]}),e.jsxs("p",{className:"card-text mt-1  text-start text-danger",style:{fontSize:"13px"},children:[t.price," BDT Only"]})]}),e.jsxs("div",{className:"actions-section d-flex flex-column justify-content-between",children:[e.jsx(y,{variant:"link",className:"text-danger delete-btn",onClick:()=>q(s),children:e.jsx("i",{className:"fas fa-trash"})}),e.jsxs("div",{className:"counter-section d-flex align-items-center text-light",children:[e.jsx("button",{className:"btn btn-outline-secondary",onClick:()=>g(s,-1),children:"-"}),e.jsx("span",{className:"mx-3",children:t.quantity||1}),e.jsx("button",{className:"btn btn-outline-secondary",onClick:()=>g(s,1),children:"+"})]})]})]},s)})]}),c.length>0&&e.jsxs(r,{onSubmit:w,className:"user-info-form mt-2 p-4",children:[e.jsx("h3",{className:"mb-4",style:{color:"rgba(255, 149, 0, 1)"},children:"Shipping Information"}),e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-md-6",children:e.jsxs(r.Group,{className:"mb-3",children:[e.jsx(r.Label,{children:"Name"}),e.jsx(r.Control,{type:"text",name:"name",value:i.name,onChange:o,required:!0})]})}),e.jsx("div",{className:"col-md-6",children:e.jsxs(r.Group,{className:"mb-3",children:[e.jsx(r.Label,{children:"Phone"}),e.jsx(r.Control,{type:"tel",name:"phone",value:i.phone,onChange:o,required:!0})]})})]}),e.jsxs(r.Group,{className:"mb-3",children:[e.jsx(r.Label,{children:"Email"}),e.jsx(r.Control,{type:"email",name:"email",value:i.email,onChange:o,required:!0})]}),e.jsxs(r.Group,{className:"mb-3",children:[e.jsx(r.Label,{children:"Shipping Address"}),e.jsx(r.Control,{as:"textarea",rows:3,name:"shippingAddress",value:i.shippingAddress,onChange:o,required:!0})]}),e.jsxs(r.Group,{className:"mb-3",children:[e.jsx(r.Label,{children:"Payment Method"}),e.jsxs(r.Select,{name:"paymentMethod",value:i.paymentMethod,onChange:o,required:!0,children:[e.jsx("option",{value:"",children:"Select Payment Method"}),f.map(t=>e.jsx("option",{value:t.id,className:"bg-dark text-light",children:t.payment_method},t.id))]})]}),e.jsx(y,{variant:"primary",className:"w-100 mt-4 text-dark",style:{backgroundColor:"red"},type:"submit",disabled:c.length===0,children:"Place Order"})]})]}),c.length>0&&e.jsx("div",{className:"col-md-4",children:e.jsxs("div",{className:"checkout-summary mt-4",children:[e.jsx("h2",{children:"Order Summary"}),e.jsxs("div",{className:"summary-item",children:[e.jsx("span",{children:"Subtotal"}),e.jsxs("span",{children:[h()," TK."]})]}),e.jsxs("div",{className:"summary-item",children:[e.jsx("span",{children:"Delivery Charge"}),e.jsxs("span",{children:[p()," TK."]})]}),e.jsx("hr",{}),e.jsxs("div",{className:"summary-item",children:[e.jsx("span",{children:"Total"}),e.jsxs("span",{children:[x()," TK."]})]})]})})]})})]})};export{M as default};
