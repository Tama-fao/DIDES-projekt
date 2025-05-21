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
    sceneImageLeft.classList.add("move-left");
    sceneImageRight.classList.add("move-right");

    // Verhindert mehrfaches Klicken
    sceneImageLeft.removeEventListener("click", moveImages);
    sceneImageRight.removeEventListener("click", moveImages);

    setTimeout(() => {
      window.location.href = "phone_1.html";
    }, 1200); // 1 Sekunde für die CSS Transition
  }

  sceneImageLeft.addEventListener("click", moveImages);
  sceneImageRight.addEventListener("click", moveImages);
}

document.addEventListener("DOMContentLoaded", () => {
  showScene("start");
});
