const generateButton = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");
const statusMessage = document.getElementById("status-message");
const copyTimers = new WeakMap();

function randomHexColor() {
    const digits = "0123456789ABCDEF";
    let color = "#";

    for (let index = 0; index < 6; index += 1) {
        color += digits[Math.floor(Math.random() * digits.length)];
    }

    return color;
}

function createColorCard(color) {
    const card = document.createElement("article");
    card.className = "color-box";

    const swatch = document.createElement("div");
    swatch.className = "color";
    swatch.style.backgroundColor = color;

    const info = document.createElement("div");
    info.className = "color-info";

    const value = document.createElement("span");
    value.className = "hex-value";
    value.textContent = color;

    const copyButton = document.createElement("button");
    copyButton.className = "copy-btn";
    copyButton.type = "button";
    copyButton.textContent = "Copy";
    copyButton.setAttribute("aria-label", `Copy ${color}`);

    info.append(value, copyButton);
    card.append(swatch, info);
    return card;
}

function generatePalette() {
    const colors = Array.from({ length: 5 }, randomHexColor);
    paletteContainer.replaceChildren(...colors.map(createColorCard));
    statusMessage.textContent = "A fresh palette is ready.";
}

async function copyColor(color) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(color);
        return;
    }

    const input = document.createElement("textarea");
    input.value = color;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();

    const copied = document.execCommand("copy");
    input.remove();

    if (!copied) {
        throw new Error("The browser did not allow the color to be copied.");
    }
}

generateButton.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", async (event) => {
    if (!(event.target instanceof Element)) {
        return;
    }

    const button = event.target.closest(".copy-btn");
    if (!button) {
        return;
    }

    const color = button.closest(".color-box").querySelector(".hex-value").textContent;

    try {
        await copyColor(color);
        button.textContent = "Copied";
        button.setAttribute("aria-label", `Copied ${color}`);
        statusMessage.textContent = `${color} copied to clipboard.`;

        clearTimeout(copyTimers.get(button));
        copyTimers.set(button, setTimeout(() => {
            button.textContent = "Copy";
            button.setAttribute("aria-label", `Copy ${color}`);
        }, 1200));
    } catch {
        statusMessage.textContent = "Could not copy the color. Check your browser clipboard permissions and try again.";
    }
});
