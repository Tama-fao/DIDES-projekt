const scenes = {
  start: {
    image: "images/phone-pickup.png",
    audio: "/visual%20novel/audio/oh-superman/phone-so-hold-me.mp3",
    endSound: "/visual%20novel/audio/Hang_up.mp3", // Neuer Ton
    nextImage: "images/phone.png", // Neues Bild
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

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  if (scene.audio) {
    currentAudio = new Audio(scene.audio);
    currentAudio.loop = scene.loopAudio || false;
    currentAudio.play().catch(e => console.warn("Audio konnte nicht abgespielt werden:", e));
    
    // NEU: Nach Audio-Ende Aktionen
    currentAudio.addEventListener('ended', () => {
      // Bild wechseln
      if (scene.nextImage) {
        sceneImage.style.backgroundImage = `url('${scene.nextImage}')`;
      }
      
      // Ton abspielen
      if (scene.endSound) {
        const endAudio = new Audio(scene.endSound);
        endAudio.play().catch(e => console.warn("Endsound konnte nicht abgespielt werden:", e));
      }
    });
  }

  dialogue.textContent = scene.text || "";
  dialogue.style.transform = "translateY(0)";
  sceneImage.style.backgroundImage = `url('${scene.image}')`;
  sceneImage.style.cursor = sceneKey === "start" ? "pointer" : "default";
  sceneImage.onclick = sceneKey === "start" ? () => showScene(scene.nextScene) : null;

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

  if (scene.audio && currentAudio) {
    currentAudio.addEventListener("ended", renderChoices);
  } else {
    renderChoices();
  }

  if (sceneKey === "start") {
    triggerFlyIns();
  }
}

function triggerFlyIns() {
  const herz = document.getElementById("img-herz");
  const arme = document.getElementById("img-arme");
  const laurie = document.getElementById("morph1");

  [herz, arme, laurie].forEach(img => img.classList.remove("fly-in", "fly-out"));

  // Herz-Animation (neu implementiert)
  setTimeout(() => {
    herz.classList.add("fly-in");
    
    // Nach dem Einfliegen (2s) Pulsieren starten
    setTimeout(() => {
      herz.classList.add("heartbeat");
      
      // Nach 10s Pulsieren beginnt das Ausfliegen
      setTimeout(() => {
        herz.classList.add("fly-out");
        herz.classList.add("heartbeat-while-flying");
      }, 10000);
    }, 2000);
  }, 17000);

  // Restliche Animationen (Arme, Laurie etc.)
  setTimeout(() => {
    arme.classList.add("fly-in");
    setTimeout(() => arme.classList.add("fly-out"), 2000);
  }, 25000);

  setTimeout(() => {
    triggerSlideIn();
  }, 32000);

  setTimeout(() => {
    laurie.classList.add("fly-in");
    setTimeout(() => laurie.classList.add("fly-out"), 1000);
  }, 100);

  startMorphSequence();

  setTimeout(() => {
    triggerNewImageFlyIn();
  }, 43000);
}


function triggerSlideIn() {
  const left1 = document.getElementById("slide-left1");
  const left2 = document.getElementById("slide-left2");
  const right1 = document.getElementById("slide-right1");
  const right2 = document.getElementById("slide-right2");

  [left1, left2, right1, right2].forEach(img => {
    img.style.display = "block";
    img.classList.remove("stockend-slide-left", "stockend-slide-right", "slide-out-left", "slide-out-right");
    img.style.opacity = "1";
  });

  left1.classList.add("stockend-slide-left");
  left2.classList.add("stockend-slide-left");
  right1.classList.add("stockend-slide-right");
  right2.classList.add("stockend-slide-right");

  setTimeout(() => {
    triggerSlideOut();
  }, 8000);
}

function triggerSlideOut() {
  const left1 = document.getElementById("slide-left1");
  const left2 = document.getElementById("slide-left2");
  const right1 = document.getElementById("slide-right1");
  const right2 = document.getElementById("slide-right2");

  [left1, left2].forEach(img => {
    img.classList.remove("stockend-slide-left");
    img.classList.add("slide-out-left");
  });

  [right1, right2].forEach(img => {
    img.classList.remove("stockend-slide-right");
    img.classList.add("slide-out-right");
  });

  setTimeout(() => {
    [left1, left2, right1, right2].forEach(img => {
      img.style.display = "none";
      img.classList.remove("slide-out-left", "slide-out-right");
    });

    // triggerNewImageFlyIn();   <--- hier entfernen oder auskommentieren

  }, 3000);
}

function triggerNewImageFlyIn() {
  const newImg = document.getElementById("new-fly-in");
  if (!newImg) return;

  // 1. Reset und Vorbereitung
  newImg.style.display = 'block';
  newImg.style.opacity = '0';
  newImg.style.transform = 'translateX(-50%) translateY(0) scale(0.5)';
  newImg.style.animation = 'none';
  
  // 2. Reflow erzwingen (wichtig!)
  void newImg.offsetWidth;
  
  // 3. Animation starten (stockig mit steps(5))
    newImg.style.animation = 'flyInSteps 4s steps(15, end) forwards';

  // 4. Rückwärtsanimation nach 4 Sekunden
  setTimeout(() => {
    newImg.style.animation = 'none';
    void newImg.offsetWidth; // Reflow
    newImg.style.animation = 'flyOutSteps 4s steps(15, end) forwards';
  }, 5000);
}


// Morph Sequence unverändert
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

document.addEventListener("DOMContentLoaded", () => {
  showScene(currentScene);
});
