import{r as e,b as d,j as t,N as o}from"./index-BF5gGKLA.js";const h=()=>{const[i,l]=e.useState([]),[r,c]=e.useState([]);d(),e.useEffect(()=>{fetch("https://lyricistapi.wineds.com/api/v1/product/list-paginate").then(s=>s.json()).then(s=>l(s.data.data)).catch(s=>console.error("Error fetching data:",s));const a=JSON.parse(localStorage.getItem("cart"))||[];c(a)},[]);const n=a=>{const s=[...r,a];c(s),localStorage.setItem("cart",JSON.stringify(s))};return t.jsxs(t.Fragment,{children:[t.jsx(o,{cart:r}),t.jsx("div",{className:"container-fluid bg-dark",style:{minHeight:"100vh"},children:t.jsxs("div",{className:"container",children:[t.jsx("h1",{className:"text-light text-start",children:t.jsx("span",{className:"typograph-text",children:"All Valuable Books"})}),t.jsx("div",{className:"book-list mt-5 text-start",children:i.map(a=>t.jsxs("div",{className:"book-card d-flex flex-row p-3",style:{backgroundColor:"rgba(165, 239, 255, 0.2)"},children:[t.jsx("img",{src:`https://lyricistadminapi.wineds.com${a.file_path}`,alt:a.name,className:"img-fluid book-image"}),t.jsxs("div",{className:"card-body text-start text-light",children:[t.jsx("h2",{className:"card-title",children:a.name}),t.jsxs("h5",{children:["By ",a.member.name]}),t.jsxs("p",{className:"card-text text-start",children:[a.price," BDT Only"]}),t.jsx("button",{className:"btn btn-light text-start text-dark w-25",onClick:()=>n(a),children:"Add to Cart"})]})]},a.id))})]})})]})};export{h as default};
