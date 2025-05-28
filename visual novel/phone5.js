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

   setTimeout(() => {
    laurie.classList.add("fly-in");
    setTimeout(() => laurie.classList.add("fly-out"), 1000);
  }, 100);

  startMorphSequence();
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

  let currentIndex = 0;

  // Vorbereitung: Alle verstecken & 90° drehen (außer das erste)
  morphFrames.forEach((img, index) => {
    img.style.display = 'none';
    if (index !== 0) {
      img.classList.add('rotated-90');
    }
  });

  // Erstes Bild zeigen & rotieren
  const first = morphFrames[0];
  first.style.display = 'block';
  first.classList.add('rotate-stockend');

  // Nach Drehung: weitere Bilder zeigen
  setTimeout(() => {
    nextFrame();
  }, 1000); // Warte bis Animation vorbei

  function nextFrame() {
    if (currentIndex < morphFrames.length - 1) {
      morphFrames[currentIndex].style.display = 'none';
      currentIndex++;
      morphFrames[currentIndex].style.display = 'block';
      setTimeout(nextFrame, 1000);
    } else {
      // Optional: am Ende ausblenden
      setTimeout(() => {
        morphFrames.forEach(img => img.style.display = 'none');
      }, 1000);
    }
  }
}




// Start der Szene beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
  showScene(currentScene);
});
