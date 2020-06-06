const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const bClose = document.querySelector("#modal .header a");

buttonSearch.addEventListener("click", ()=>{
    modal.classList.toggle("hide");
});

bClose.addEventListener("click",()=>{
    modal.classList.toggle("hide");
});