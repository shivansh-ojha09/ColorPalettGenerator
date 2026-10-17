const generateBtn=document.getElementById("generate-btn");
const paletteContainer=document.querySelector(".palette-container");
function randomHexColor(){
    const chars="0123456789ABCDEF";
    let color="#";
    for(let i=0;i<6;i++){
        color+=chars[Math.floor(chars.length*Math.random())];
    }
    return color;
}
function generateColorBox(color){
    const box=document.createElement("div");
    box.className="color-box";
    box.innerHTML=`
        <div class="color" style="background-color: ${color}"></div>
    <div class="color-info">
      <span class="hex-value">${color}</span>
      <i class="far fa-copy copy-btn" title="Copy to clipboard"></i>
    </div>
    `;
    return box;
}
function generatePalrtte(){
    const colors=Array.from({length:5},()=>randomHexColor());
    paletteContainer.innerHTML="";
    colors.forEach((color)=>{
        palatteContainer.appendChild(genrateColorBox(color));
    });
}
