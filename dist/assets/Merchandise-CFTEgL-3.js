import{r,b as o,j as e,N as m,S as h}from"./index-DCyFZ4Zq.js";const p=()=>{const[c,l]=r.useState([]),[s,n]=r.useState(()=>{const t=localStorage.getItem("cart");return t?JSON.parse(t):[]});o(),r.useEffect(()=>{fetch("https://lyricistapi.wineds.com/api/v1/product/list-paginate").then(t=>t.json()).then(t=>l(t.data.data)).catch(t=>console.error("Error fetching data:",t))},[]),r.useEffect(()=>{localStorage.setItem("cart",JSON.stringify(s))},[s]);const d=t=>{if(!s.some(i=>i.id===t.id)){const i=[...s,t];n(i),h.fire({text:`${t.name} has been added to your cart!`,icon:"success",showConfirmButton:!1,timer:2e3,position:"top-end",toast:!0,customClass:{popup:"custom-swal"}})}};return e.jsxs(e.Fragment,{children:[e.jsx(m,{cart:s}),e.jsx("div",{className:"container-fluid bg-dark",style:{minHeight:"100vh"},children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{className:"text-light text-start",children:e.jsx("span",{className:"typograph-text",children:"All Valuable Books"})}),e.jsx("div",{className:"book-list mt-5 text-start",children:c.map(t=>e.jsxs("div",{className:"book-card d-flex flex-lg-row flex-column p-3",style:{backgroundColor:"rgba(165, 239, 255, 0.2)"},children:[e.jsx("img",{src:`https://lyricistadminapi.wineds.com${t.file_path}`,alt:t.name,className:"img-fluid book-image col-lg-4 col-12"}),e.jsxs("div",{className:"card-body col-lg-8 col-12 text-start text-light",children:[e.jsx("h2",{className:"card-title",children:t.name}),e.jsxs("h5",{children:["By ",e.jsx("span",{style:{color:"rgba(255, 149, 0, 1)"},children:t.member.name})]}),e.jsx("p",{children:t.description}),e.jsxs("p",{className:"card-text text-start",children:[t.price," BDT Only"]}),e.jsx("button",{className:"btn text-light d-flex align-items-center justify-content-center ",onClick:()=>d(t),disabled:s.some(a=>a.id===t.id),style:{width:"176px",height:"39px",padding:"10px",backgroundColor:"#c30505",border:"none",borderRadius:"10px",fontSize:"15px",fontWeight:"600",cursor:s.some(a=>a.id===t.id)?"not-allowed":"pointer"},children:s.some(a=>a.id===t.id)?"In Cart":"Add to Cart"})]})]},t.id))})]})})]})};export{p as default};
