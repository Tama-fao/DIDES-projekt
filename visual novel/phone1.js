// phone1.js
const scenes = {
  start: {
    
    image: "images/phone.png",
    audio: "/visual%20novel/audio/bbc_telephones.mp3",
    loopAudio: true,
    nextScene: "pickup" 
  },
  pickup: {
   
    image: "images/phone.png",
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
  dialogue.style.transform = "translateY(0)"; // Ensure text is visible
  sceneImage.style.backgroundImage = `url('${scene.image}')`;
  
  // Set image clickability for start scene
  sceneImage.style.cursor = sceneKey === "start" ? "pointer" : "default";
  sceneImage.onclick = sceneKey === "start" ? () => showScene(scene.nextScene) : null;
  
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
});