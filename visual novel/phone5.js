const scenes = {
  start: {
    image: "images/phone-pickup.png",
    audio: "/visual%20novel/audio/phone-so-hold-me.mp3",
    choices: [
      { text: "Credits", nextScene: "link", isLink: true, href: "Credits.html" },
    ]
  }
};

let currentScene = "start";
let currentAudio = null;

function showScene(sceneKey) {
  const scene = scenes[sceneKey];
  const dialogue = document.getElementById("dialogue");
  const sceneImage = document.getElementById("scene-image");
  const choicesContainer = document.getElementById("choices");

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  
  // Play new audio if specified in the scene
  if (scene.audio) {
    currentAudio = new Audio(scene.audio);
    currentAudio.loop = scene.loopAudio || false;
    currentAudio.play().catch(e => console.log("Audio play failed:", e));
  }

  // Set the text and image
  dialogue.textContent = scene.text;
  dialogue.style.transform = "translateY(0)"; // Ensure text is visible
  sceneImage.style.backgroundImage = `url('${scene.image}')`;
  
  // Set image clickability for start scene
  sceneImage.style.cursor = sceneKey === "start" ? "pointer" : "default";
  sceneImage.onclick = sceneKey === "start" ? () => showScene(scene.nextScene) : null;
  
  // Handle choices
  choicesContainer.innerHTML = "";

  if (scene.choices) {
    if (currentAudio) {
      currentAudio.addEventListener("ended", () => {
        scene.choices.forEach(choice => {
          const button = document.createElement("button");
          button.textContent = choice.text;
          button.onclick = choice.isLink 
            ? () => (window.location.href = choice.href)
            : () => showScene(choice.nextScene);
          choicesContainer.appendChild(button);
        });
      });
    } else {
      // Falls kein Audio da ist, sofort anzeigen
      scene.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = choice.isLink 
          ? () => (window.location.href = choice.href)
          : () => showScene(choice.nextScene);
        choicesContainer.appendChild(button);
      });
    }
  }
}
  
function triggerFlyIns() {
  const bottom = document.getElementById("img-bottom");

  [bottom].forEach(img => {
    img.classList.remove("fly-in", "fly-out");
  });

  // Fly in
  setTimeout(() => {
    bottom.classList.add("fly-in");
    setTimeout(() => bottom.classList.add("fly-out"), 18000);
  }, 41000);
}


// Initialize
document.addEventListener("DOMContentLoaded", () => {
  showScene(currentScene);
});