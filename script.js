const pages = ["home","event","rsvp","accommodation","secure","thankyou"];
const app = document.getElementById("app");
const toast = document.getElementById("toast");
let current = sessionStorage.getItem("weddingPage") || "home";
let historyStack = JSON.parse(sessionStorage.getItem("weddingHistory") || '["home"]');

const allowed = {
  home: ["event"],
  event: ["home","rsvp"],
  rsvp: ["home","event","accommodation","thankyou"],
  accommodation: ["home","rsvp","secure","thankyou"],
  secure: ["home","accommodation","thankyou"],
  thankyou: ["home"]
};

function show(page, replace=false){
  if(!pages.includes(page)) page="home";
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active", p.dataset.page===page));
  current=page;
  sessionStorage.setItem("weddingPage",page);
  if(replace) sessionStorage.setItem("weddingHistory", JSON.stringify([page]));
  window.scrollTo({top:0,behavior:"instant"});
}

function go(page){
  if(!allowed[current].includes(page)) return;
  historyStack.push(page);
  sessionStorage.setItem("weddingHistory",JSON.stringify(historyStack));
  show(page);
}

document.querySelectorAll("[data-go]").forEach(el=>{
  el.addEventListener("click",()=>go(el.dataset.go));
});

function postToNetlify(form){
  const data = new FormData(form);
  fetch("/", {method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(data).toString()})
    .catch(()=>{}); // Netlify will process the submission; navigation continues even if the fetch is interrupted.
}

const rsvpForm=document.getElementById("rsvp-form");
rsvpForm.addEventListener("submit", e=>{
  e.preventDefault();
  if(!rsvpForm.reportValidity()) return;
  postToNetlify(rsvpForm);
  const attending=rsvpForm.querySelector('input[name="attendance"]:checked').value;
  sessionStorage.setItem("guestName",document.getElementById("full-name").value.trim());
  sessionStorage.setItem("attendance",attending);
  if(attending==="Yes") go("accommodation");
  else go("thankyou");
});

const accommodationForm=document.getElementById("accommodation-form");
accommodationForm.addEventListener("submit", e=>{
  e.preventDefault();
  if(!accommodationForm.reportValidity()) return;

  // Carry the name already entered on the RSVP through to the accommodation
  // submission, without asking the guest to type it again.
  const guestName=sessionStorage.getItem("guestName") || "";
  accommodationForm.querySelector('input[name="guest_name"]').value=guestName;

  postToNetlify(accommodationForm);
  const needs=accommodationForm.querySelector('input[name="needs_accommodation"]:checked').value;
  sessionStorage.setItem("needsAccommodation",needs);
  if(needs==="Yes") go("secure");
  else go("thankyou");
});

function toastMsg(msg){
  toast.textContent=msg; toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2500);
}

// Start/restore only if the page is still part of the current session.
// Directly typing another page URL is not possible because this is a single-page site.
show(current);
