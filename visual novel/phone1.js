// phone1.js
const scenes = {
  start: {
    text: "*Phone ringing*",
    image: "images/phone.png",
    audio: "audio/bbc_telephones.mp3",
    loopAudio: true,
    nextScene: "pickup" 
  },
  pickup: {
    text: "Hi. I'm not home right now. But if you want to leave a message, just start talking at the sound of the tone.\n\nHello? This is your Mother. Are you there? Are you coming home? Hello? Is anybody home? Well, you don't know me, but I know you. And I've got a message to give to you.",
    image: "images/phone.png",
    choices: [
      { text: "reply", nextScene: "link", isLink: true, href: "Walk_The_Dog.html" },
    ],
    scrollSpeed: 50
  }
};

let currentScene = "start";
let scrollInterval = null;
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
    currentAudio.loop = scene.loopAudio || false; // Set loop property
    currentAudio.play().catch(e => console.log("Audio play failed:", e));
  }

  // Clear any existing animation
  clearInterval(scrollInterval);
  
  // Reset dialogue
  dialogue.textContent = scene.text;
  dialogue.style.transform = "translateY(100%)"; // Start completely below the box
  
  // Set image and make it clickable if this is the start scene
  sceneImage.style.backgroundImage = `url('${scene.image}')`;
  sceneImage.style.cursor = sceneKey === "start" ? "pointer" : "default";
  
  // Clear any existing click handlers
  sceneImage.onclick = null;
  
  // For start scene, make image clickable to proceed
  if (sceneKey === "start") {
    sceneImage.onclick = () => showScene(scene.nextScene);
    choicesContainer.innerHTML = ""; // No buttons in start scene
  } 

    // For other scenes, show normal choices
    else {
      choicesContainer.innerHTML = "";
      scene.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = choice.isLink 
          ? () => (window.location.href = choice.href)
          : () => showScene(choice.nextScene);
        choicesContainer.appendChild(button);
      });
    }



 // Start scrolling animation for pickup scene
 if (sceneKey === "pickup") {
  const textHeight = dialogue.scrollHeight;
  const containerHeight = dialogue.parentElement.clientHeight;
  let position = containerHeight; // Start with text completely below
  
  scrollInterval = setInterval(() => {
    position -= 1; // Move upward
    dialogue.style.transform = `translateY(${position}px)`;
    
    // Stop when text has scrolled completely through
    if (position <= -textHeight) {
      clearInterval(scrollInterval);
    }
  }, scene.scrollSpeed);
} else {
  // For other scenes, show text immediately
  dialogue.style.transform = "translateY(0)";
}
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  showScene(currentScene);
});