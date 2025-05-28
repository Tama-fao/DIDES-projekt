const scenes = {
  start: {
    image: "/visual%20novel/images/High_Five.png",
    text: "High Five to enter", // Kein Text gewünscht
  },
};

let currentAudio = null;

function showScene(sceneKey) {
  const scene = scenes[sceneKey];
  const dialogue = document.getElementById("dialogue");
  const sceneImageLeft = document.getElementById("scene-image");
  const sceneImageRight = document.getElementById("scene-image2");
  const choicesContainer = document.getElementById("choices");

  // Stop previous audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // Play audio if available
  if (scene.audio) {
    currentAudio = new Audio(scene.audio);
    currentAudio.loop = scene.loopAudio || false;
    currentAudio.play().catch(e => console.log("Audio play failed:", e));
  }

  // Set background images
  sceneImageLeft.style.backgroundImage = `url('${scene.image}')`;
  sceneImageRight.style.backgroundImage = `url('${scene.image}')`;

  // Set text
  dialogue.textContent = scene.text || "";

  // Clear choices
  choicesContainer.innerHTML = "";

  // Enable animation and redirect on click
  function moveImages() {
    setTimeout(() => {
      const highFiveSound = new Audio("/visual%20novel/audio/Slap.mp3");
      highFiveSound.volume = 0.4; // 30% Lautstärke
      highFiveSound.play().catch(e => console.log("Soundeffekt konnte nicht abgespielt werden:", e));
    }, 500); // <- Delay in Millisekunden (hier: 0.3 Sekunden)
  
    sceneImageLeft.classList.add("move-left");
    sceneImageRight.classList.add("move-right");

    // Verhindert mehrfaches Klicken
    document.removeEventListener("click", moveImages);

    setTimeout(() => {
      window.location.href = "phone_1.html";
    }, 1200); // 1 Sekunde für die CSS Transition
  }

  // Add click event listener to the entire document
  document.addEventListener("click", moveImages);
}

document.addEventListener("DOMContentLoaded", () => {
  showScene("start");
});