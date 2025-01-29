import{r as o,j as a,N as F,M as c,F as s,B as G}from"./index-BQ5YbL2O.js";const $=()=>{const[u,g]=o.useState([]),[m,j]=o.useState(1),[b,y]=o.useState(1),[N,d]=o.useState(!1),[e,h]=o.useState(null),[n,p]=o.useState({name:"",phone:"",email:"",payment:""}),f="https://lyricistapi.wineds.com",w="https://lyricistadminapi.wineds.com",C=`${f}/api/v1/events/list-paginate`;o.useEffect(()=>{(async()=>{try{const r=await fetch(`${C}?page=${m}`);if(!r.ok)throw new Error("Network response was not ok");const D=await r.json(),{paginator:M,data:E}=D.data;g(E.map(l=>({id:l.id,image:`${w}${l.file_path}`,title:l.title,artist:l.artist,description:l.description,date:l.date,location:l.location}))),y(M.total_pages)}catch(r){console.error("Error fetching data:",r)}})()},[m]);const S=t=>j(t),k=t=>{h(t),d(!0)},x=()=>{d(!1),h(null),p({name:"",phone:"",email:"",payment:""})},i=t=>{p({...n,[t.target.name]:t.target.value})},P=t=>{t.preventDefault(),console.log("Form Data Submitted:",n),x()};return a.jsxs(a.Fragment,{children:[a.jsx(F,{}),a.jsx("div",{className:"container-fluid bg-dark",style:{marginTop:"-24px",minHeight:"100vh"},children:a.jsxs("div",{className:"container mt-4",children:[a.jsx("h1",{className:"text-light",children:"Upcoming Events"}),a.jsx("div",{className:"row mt-5",children:u.map(t=>a.jsx("div",{className:"col-12 mb-4",children:a.jsxs("div",{className:"cards event-card d-flex flex-row p-3",style:{backgroundColor:"rgba(165, 239, 255, 0.2)"},children:[t.image&&a.jsx("img",{src:t.image,alt:t.title,className:"img-fluid event-image "}),a.jsxs("div",{className:"card-body w-50 text-start text-light",children:[a.jsx("h2",{className:"card-title",children:t.title}),a.jsxs("h5",{children:[" Date: ",t.date," "]}),a.jsxs("h5",{children:[" Location: ",t.location]}),a.jsxs("h6",{className:"card-subtitle mb-2 text-highlight",children:["By ",t.artist]}),a.jsx("p",{className:"card-text text-start fw-normal",children:t.description}),a.jsx("button",{type:"button",className:"btn btn-light text-start w-25",onClick:()=>k(t),children:"Get Tickets"})]})]})},t.id))}),a.jsx("nav",{children:a.jsx("ul",{className:"pagination justify-content-center",children:Array.from({length:b},(t,r)=>a.jsx("li",{className:`page-item ${m===r+1?"active":""}`,children:a.jsx("button",{className:"page-link",onClick:()=>S(r+1),children:r+1})},r))})}),a.jsxs(c,{show:N,onHide:x,dialogClassName:"custom-modal-width",children:[a.jsx(c.Header,{closeButton:!0,children:a.jsxs(c.Title,{children:["Get Tickets for ",e==null?void 0:e.title]})}),a.jsxs(c.Body,{children:[(e==null?void 0:e.image)&&a.jsx("img",{src:e.image,alt:e.title,className:"img-fluid",style:{width:"100%",borderRadius:"8px"}}),a.jsx("h5",{className:"mt-3",children:e==null?void 0:e.artist}),a.jsxs("h6",{className:"text-muted",children:["Date: ",e==null?void 0:e.date," | Location: ",e==null?void 0:e.location]}),a.jsx("p",{className:"mt-3",children:e==null?void 0:e.description}),a.jsxs(s,{onSubmit:P,children:[a.jsxs(s.Group,{className:"mb-3",controlId:"formName",children:[a.jsx(s.Label,{children:"Name"}),a.jsx(s.Control,{type:"text",placeholder:"Enter your name",name:"name",value:n.name,onChange:i,required:!0})]}),a.jsxs(s.Group,{className:"mb-3",controlId:"formPhone",children:[a.jsx(s.Label,{children:"Phone"}),a.jsx(s.Control,{type:"tel",placeholder:"Enter your phone number",name:"phone",value:n.phone,onChange:i,required:!0})]}),a.jsxs(s.Group,{className:"mb-3",controlId:"formEmail",children:[a.jsx(s.Label,{children:"Email"}),a.jsx(s.Control,{type:"email",placeholder:"Enter your email",name:"email",value:n.email,onChange:i,required:!0})]}),a.jsxs(s.Group,{className:"mb-3",controlId:"formPayment",children:[a.jsx(s.Label,{children:"Payment Method"}),a.jsx(s.Control,{type:"text",placeholder:"Enter payment method",name:"payment",value:n.payment,onChange:i,required:!0})]}),a.jsx(G,{variant:"primary",type:"submit",children:"Submit"})]})]})]})]})})]})};export{$ as default};
