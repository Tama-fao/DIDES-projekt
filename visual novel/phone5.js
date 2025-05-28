const scenes = {
  start: {
    image: "images/phone-pickup.png",
    audio: "/visual%20novel/audio/oh-superman/phone-so-hold-me.mp3",
    choices: [
      { text: "Credits", nextScene: "link", isLink: true, href: "ende.html" },
    ]
  }
};

let currentScene = "start";
let currentAudio = null;

function showScene(sceneKey) {
  console.log("Zeige Szene:", sceneKey);

  const scene = scenes[sceneKey];
  const dialogue = document.getElementById("dialogue");
  const sceneImage = document.getElementById("scene-image");
  const choicesContainer = document.getElementById("choices");

  if (!scene) {
    console.error("Szene nicht gefunden:", sceneKey);
    return;
  }

  // Stoppe vorheriges Audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // Audio abspielen, wenn vorhanden
  if (scene.audio) {
    currentAudio = new Audio(scene.audio);
    currentAudio.loop = scene.loopAudio || false;
    currentAudio.play().catch(e => console.warn("Audio konnte nicht abgespielt werden:", e));
  }

  // Szene anzeigen
  dialogue.textContent = scene.text || "";
  dialogue.style.transform = "translateY(0)";
  sceneImage.style.backgroundImage = `url('${scene.image}')`;
  sceneImage.style.cursor = sceneKey === "start" ? "pointer" : "default";
  sceneImage.onclick = sceneKey === "start" ? () => showScene(scene.nextScene) : null;

  // Choices löschen & hinzufügen
  choicesContainer.innerHTML = "";

  const renderChoices = () => {
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
  };

  // Warten bis Audio endet oder direkt anzeigen
  if (scene.audio && currentAudio) {
    currentAudio.addEventListener("ended", renderChoices);
  } else {
    renderChoices();
  }

  // Fly-in-Animation für bestimmte Szene
  if (sceneKey === "start") {
    triggerFlyIns();
  }
}

function triggerFlyIns() {
  const herz = document.getElementById("img-herz");
  const arme = document.getElementById("img-arme");
  const laurie = document.getElementById("morph1");

  [herz, arme, laurie].forEach(img => img.classList.remove("fly-in", "fly-out"));

  // Herz (oben)
  setTimeout(() => {
    herz.classList.add("fly-in");
    setTimeout(() => herz.classList.add("fly-out"), 10000);
  }, 17000);

  // Arme (unten)
  setTimeout(() => {
    arme.classList.add("fly-in");
    setTimeout(() => arme.classList.add("fly-out"), 2000);
  }, 25000);

  // Neue Slide-In Animation starten 500ms nach Arme-Out (ca. 27,5s)
  setTimeout(() => {
    triggerSlideIn();
  }, 27500);

  setTimeout(() => {
    laurie.classList.add("fly-in");
    setTimeout(() => laurie.classList.add("fly-out"), 1000);
  }, 100);

  startMorphSequence();
}

function triggerSlideIn() {
  const left1 = document.getElementById("slide-left1");
  const left2 = document.getElementById("slide-left2");
  const right1 = document.getElementById("slide-right1");
  const right2 = document.getElementById("slide-right2");

  [left1, left2, right1, right2].forEach(img => {
    img.style.display = "block";
    img.classList.remove("stockend-slide-left", "stockend-slide-right");
    img.style.opacity = "1";
  });

  // Animationen hinzufügen
  left1.classList.add("stockend-slide-left");
  left2.classList.add("stockend-slide-left");
  right1.classList.add("stockend-slide-right");
  right2.classList.add("stockend-slide-right");

  // Optional: nach Ende Animation wieder ausblenden
  setTimeout(() => {
    [left1, left2, right1, right2].forEach(img => {
      img.style.display = "none";
    });
  }, 9000); // Dauer der Animation in ms
}

function startMorphSequence() {
  const morphFrames = [
    document.getElementById("morph1"),
    document.getElementById("morph2"),
    document.getElementById("morph3"),
    document.getElementById("morph4"),
    document.getElementById("morph5"),
    document.getElementById("morph6"),
    document.getElementById("morph7")
  ];

  morphFrames.forEach((img, i) => {
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transformOrigin = "center center";
    img.style.transform = "translate(-50%, -50%) rotate(90deg)";

    if (i === 0) {
      img.classList.add("stockend-animation");
      img.style.display = "block";
    } else {
      img.classList.remove("stockend-animation");
      img.style.display = "none";
    }
  });

  let currentIndex = 0;

  function nextFrame() {
    if (currentIndex < morphFrames.length - 1) {
      if (currentIndex === 0) {
        morphFrames[0].classList.remove("stockend-animation");
        morphFrames[0].style.display = "none";
      } else {
        morphFrames[currentIndex].style.display = "none";
      }

      currentIndex++;
      morphFrames[currentIndex].style.display = "block";
      morphFrames[currentIndex].style.transform = "translate(-50%, -50%) rotate(90deg)";
      setTimeout(nextFrame, 1000);
    } else {
      morphFrames.forEach(img => {
        img.style.display = "none";
        img.classList.remove("stockend-animation");
        img.classList.remove("stockend-slide-out");
      });

      const lastFrame = morphFrames[morphFrames.length - 1];
      lastFrame.style.display = "block";
      lastFrame.classList.add("stockend-animation");

      setTimeout(() => {
        lastFrame.classList.remove("stockend-animation");
        lastFrame.classList.add("stockend-slide-out");
      }, 2000);
    }
  }

  setTimeout(nextFrame, 2000);
}



// Start der Szene beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
  showScene(currentScene);
});
