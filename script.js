/* ---------- CONFETTI ---------- */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
resize();
addEventListener("resize", resize);
const colors = ["#ff9ecb","#ff6fa5","#c9a0ff","#ffe066","#8fe3c0","#ffffff"];
let pieces = [];
function makePieces(n){
  for(let i=0;i<n;i++){
    pieces.push({
      x: Math.random()*canvas.width,
      y: Math.random()*-canvas.height,
      r: 4+Math.random()*6,
      c: colors[Math.floor(Math.random()*colors.length)],
      vy: 1+Math.random()*3,
      vx: -1+Math.random()*2,
      rot: Math.random()*360,
      vr: -4+Math.random()*8
    });
  }
}
function burst(n=45){ makePieces(n); }
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pieces.forEach(p=>{
    p.y += p.vy; p.x += p.vx; p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x,p.y);
    ctx.rotate(p.rot*Math.PI/180);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r);
    ctx.restore();
  });
  pieces = pieces.filter(p=> p.y < canvas.height+20);
  requestAnimationFrame(animate);
}
animate();

/* ---------- ENVELOPE OPEN ---------- */
const envelope = document.getElementById("envelope");
const sceneEnvelope = document.getElementById("scene-envelope");
const sceneCard = document.getElementById("scene-card");
envelope.addEventListener("click", ()=>{
  envelope.classList.add("open");
  burst(70);
  setTimeout(()=>{
    sceneEnvelope.classList.add("hide");
    sceneCard.classList.add("show");
    document.body.style.overflow = "auto";
  }, 550);
});

/* ---------- CANDLES ---------- */
const candles = document.querySelectorAll(".candle");
const cakeMsg = document.getElementById("cakeMsg");
let blownCount = 0;
candles.forEach(c=>{
  c.addEventListener("click", ()=>{
    const flame = c.querySelector(".flame");
    if(flame.dataset.out === "1") return;
    flame.dataset.out = "1";
    flame.style.animation = "none";
    flame.style.transition = "opacity .3s ease, transform .3s ease";
    flame.style.opacity = "0";
    flame.style.transform = "scaleY(0)";
    blownCount++;
    if(blownCount === candles.length){
      cakeMsg.textContent = "wish made ✨ happy birthday!";
      burst(80);
    }
  });
});

/* ---------- LIGHTBOX (click photo to view + save) ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxSave = document.getElementById("lightboxSave");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".frame img").forEach(img=>{
  img.addEventListener("click", ()=>{
    lightboxImg.src = img.src;
    lightboxSave.href = img.src;
    // suggest a filename based on the source image
    const name = img.src.split("/").pop() || "photo.jpg";
    lightboxSave.setAttribute("download", name);
    lightbox.classList.add("show");
  });
});

lightboxClose.addEventListener("click", ()=> lightbox.classList.remove("show"));
lightbox.addEventListener("click", (e)=>{
  if(e.target === lightbox) lightbox.classList.remove("show");
});
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape") lightbox.classList.remove("show");
});
