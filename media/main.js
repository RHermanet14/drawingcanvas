window.addEventListener('load', ()=>{
    resize(); // Resizes the canvas once the window loads
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
});
  
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const scroll = document.getElementById('scroll');
const background = document.getElementById('background');

const sizeInput = document.getElementById('psize');
sizeInput.addEventListener('wheel', (event) => {
    event.preventDefault();
    const min = Number(sizeInput.min) || 1;
    const max = Number(sizeInput.max) || 100;
    let size = Number(sizeInput.value) || 5;

    size += event.deltaY > 0 ? -1 : 1;
    size = Math.min(max, Math.max(min, size));
    sizeInput.value = size;
},{passive: false});

const checkbox = document.getElementById('eraser');
checkbox.addEventListener('change', () => {
  ctx.globalCompositeOperation = checkbox.checked ? 'destination-out' : 'source-over';
});

function resize(){
  canvas.width = scroll.clientWidth;
  canvas.height = background.scrollHeight;
}

let coord = {x:0 , y:0}; 
let paint = false;

function getPosition(event){
  const rect = canvas.getBoundingClientRect();
  coord.x = event.clientX - rect.left;
  coord.y = event.clientY - rect.top;
}

function startPainting(event){
  canvas.style.pointerEvents = 'auto';
  paint = true;
  getPosition(event);
}

function stopPainting(){
  paint = false;
  canvas.style.pointerEvents = 'none';
}
  
function sketch(event){
  if (!paint) {return;}
  ctx.lineWidth = Number(document.getElementById('psize').value) || 5;
  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.strokeStyle = document.getElementById('pcolor').value;
  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.lineTo(coord.x , coord.y);
  ctx.stroke();
}