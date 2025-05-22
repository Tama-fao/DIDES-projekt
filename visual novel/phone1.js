// phone1.js
const scenes = {
  start: {
    image: "images/phone.png",
    audio: "/visual%20novel/audio/bbc_telephones.mp3",
    loopAudio: true,
    nextScene: "pickup" 
  },
  pickup: {
    image: "images/phone-pickup.png",
    audio: "/visual%20novel/audio/oh-superman/hi-im-not-home.mp3",
    choices: [
      { text: "REPLY", nextScene: "link", isLink: true, href: "Walk_The_Dog.html" },
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
  dialogue.style.transform = "translateY(0)";
  sceneImage.style.backgroundImage = `url('${scene.image}')`;
  
  // Add or remove vibration class based on scene
  if (sceneKey === "start") {
    sceneImage.classList.add("vibrating");
    sceneImage.style.cursor = "pointer";
    sceneImage.onclick = () => showScene(scene.nextScene);
  } else {
    sceneImage.classList.remove("vibrating");
    sceneImage.style.cursor = "default";
    sceneImage.onclick = null;
  }
  
  // Handle choices
  choicesContainer.innerHTML = "";
  if (scene.choices) {
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

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  showScene(currentScene);
  function triggerFlyIns() {
    setTimeout(() => document.getElementById("img-left").classList.add("fly-in"), 500);
    setTimeout(() => document.getElementById("img-right").classList.add("fly-in"), 1000);
    setTimeout(() => document.getElementById("img-top").classList.add("fly-in"), 1500);
    setTimeout(() => document.getElementById("img-bottom").classList.add("fly-in"), 2000);
  }
  
});