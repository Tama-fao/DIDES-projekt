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
      { text: "REPLY", nextScene: "link", isLink: true, href: "Big_Science.html" },
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

  if (scene.audio) {
    currentAudio = new Audio(scene.audio);
    currentAudio.loop = scene.loopAudio || false;
    currentAudio.play().catch(e => console.log("Audio play failed:", e));
  }

  dialogue.textContent = scene.text || "";
  sceneImage.style.backgroundImage = `url('${scene.image}')`;

  if (sceneKey === "start") {
    sceneImage.classList.add("vibrating");
    sceneImage.style.cursor = "pointer";
    sceneImage.onclick = () => showScene(scene.nextScene);
  } else {
    sceneImage.classList.remove("vibrating");
    sceneImage.style.cursor = "default";
    sceneImage.onclick = null;
  }

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

  // Trigger fly-in on specific scene, e.g. pickup
  if (sceneKey === "pickup") triggerFlyIns();
}

function triggerFlyIns() {
  const left = document.getElementById("img-left");
  const right = document.getElementById("img-right");
  const top = document.getElementById("img-top");
  const bottom = document.getElementById("img-bottom");

  [left, right, top, bottom].forEach(img => {
    img.classList.remove("fly-in", "fly-out");
  });

  // Fly in
  setTimeout(() => {
    left.classList.add("fly-in");
    setTimeout(() => left.classList.add("fly-out"), 8500);
  }, 10);

  setTimeout(() => {
    right.classList.add("fly-in");
    setTimeout(() => right.classList.add("fly-out"), 8000);
  }, 17800);

  setTimeout(() => {
    top.classList.add("fly-in");
    setTimeout(() => top.classList.add("fly-out"), 5000);
  }, 35000);

  setTimeout(() => {
    bottom.classList.add("fly-in");
    setTimeout(() => bottom.classList.add("fly-out"), 18000);
  }, 41000);
}


// Initialize once
document.addEventListener("DOMContentLoaded", () => {
  showScene(currentScene);
});
