const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

function randomHexColor() {
  const chars = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * chars.length)];
  }

  return color;
}

function generateColorBox(color) {
  const box = document.createElement("div");
  box.className = "color-box";
  box.innerHTML = `
    <div class="color" style="background-color: ${color}"></div>
    <div class="color-info">
      <span class="hex-value">${color}</span>
      <i class="far fa-copy copy-btn" title="Copy to clipboard"></i>
    </div>
  `;

  return box;
}

function generatePalette() {
  const colors = Array.from({ length: 5 }, () => randomHexColor());
  paletteContainer.innerHTML = "";

  colors.forEach((color) => {
    paletteContainer.appendChild(generateColorBox(color));
  });
}

function showCopySuccess(button) {
  const originalClasses = button.className;

  button.classList.remove("fa-copy");
  button.classList.add("fa-check");
  button.style.color = "#22c55e";

  setTimeout(() => {
    button.className = originalClasses;
    button.style.color = "";
  }, 1000);
}

function copyHexValue(value, triggerButton) {
  const hexValue = value.trim();

  if (!navigator.clipboard) {
    console.log("Clipboard API is not available in this browser.");
    return;
  }

  navigator.clipboard
    .writeText(hexValue)
    .then(() => showCopySuccess(triggerButton))
    .catch((err) => console.log(err));
}

generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", function (e) {
  const copyButton = e.target.closest(".copy-btn");

  if (copyButton) {
    const hexValue = copyButton.parentElement.querySelector(".hex-value").textContent;
    copyHexValue(hexValue, copyButton);
    return;
  }

  const colorBlock = e.target.closest(".color");

  if (colorBlock) {
    const hexValue = colorBlock.nextElementSibling.querySelector(".hex-value").textContent;
    const copyButtonInColor = colorBlock.nextElementSibling.querySelector(".copy-btn");
    copyHexValue(hexValue, copyButtonInColor);
  }
});
