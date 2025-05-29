const scenes = {
  start: {
    image: "images/phone-pickup.png",
    audio: "audio/oh-superman/phone-so-hold-me.mp3",
    endSound: "audio/Hang_up.mp3", // Neuer Ton
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
    img.style.display = "none";
    img.classList.remove("stockend-animation", "stockend-slide-out", "morph-slide-out", "morph-slide-in");
  });

  let currentIndex = 0;
  const first = morphFrames[0];

  // Vor dem Anzeigen außerhalb positionieren
  first.style.display = "block";
  first.style.transform = "translate(150%, -50%) rotate(90deg)";

  // Kurzen Reflow erzwingen, um Animation sicher zu starten
  void first.offsetWidth;

  // Animation hinzufügen
  first.classList.add("morph-slide-in");

  // Nach Animation: zurück zur Mitte und mit Morph weitermachen
  setTimeout(() => {
    first.classList.remove("morph-slide-in");
    first.style.transform = "translate(-50%, -50%) rotate(90deg)";
    first.classList.add("stockend-animation");

    // Starte Morph-Sequenz mit nächstem Frame
    setTimeout(nextFrame, 1000);
  }, 2000);

  function nextFrame() {
    if (currentIndex < morphFrames.length - 1) {
      if (currentIndex > 0) {
        morphFrames[currentIndex].style.display = "none";
      }

      currentIndex++;
      const next = morphFrames[currentIndex];
      next.style.display = "block";
      next.style.transform = "translate(-50%, -50%) rotate(90deg)";
      setTimeout(nextFrame, 1000);
    } else {
      morphFrames.forEach(img => {
        img.style.display = "none";
        img.classList.remove("stockend-animation", "stockend-slide-out", "morph-slide-out");
      });

      const lastFrame = morphFrames[morphFrames.length - 1];
      lastFrame.style.display = "block";
      lastFrame.classList.add("stockend-animation");

            setTimeout(() => {
        lastFrame.classList.remove("stockend-animation");
        lastFrame.classList.add("morph-slide-out");

        // Neue Slides starten nach dem Ausrutschen
        setTimeout(triggerPostSlides, 4000);
      }, 2000);

    }
  }

  setTimeout(nextFrame, 3000); // Startet nach morph1-Animation (2s) + kleine Pause
}



document.addEventListener("DOMContentLoaded", () => {
  showScene(currentScene);
});

function triggerPostSlides() {
  const left = document.getElementById("post-slide-left");
  const bottom = document.getElementById("post-slide-bottom");
  const right = document.getElementById("post-slide-right");

  [left, bottom, right].forEach(img => {
    if (!img) return;

    img.style.position = "absolute";
    img.style.zIndex = "10000";
    img.style.width = "auto";
    img.style.height = "30dvh";
    img.style.opacity = "0";
    img.style.display = "block";
  });

  // Individuelle Startpositionen außerhalb des sichtbaren Bereichs
  left.style.left = "0";
  left.style.top = "50%";
  left.style.transform = "translateX(-100%) rotate(90deg)";
  left.style.height = "15dvh";
  left.style.zIndex = "18"

  bottom.style.display = "block";
  bottom.style.position = "absolute";
  bottom.style.left = "0";
  bottom.style.bottom = "0";
  bottom.style.right = "-60%";
  bottom.style.top = "";
  bottom.style.transform = "translateX(-50%)translateY(100%)"; // nur vertikal
  bottom.style.height= "40dvh"
  bottom.style.width = "auto";
  bottom.style.zIndex = "20"

  right.style.right = "0";
  right.style.top = "50%";
  right.style.transform = "translateX(100%) rotate(-90deg)";
  right.style.height = "15dvh"
  right.style.zIndex = "17"

  // Reflow
  void left.offsetWidth;
  void bottom.offsetWidth;
  void right.offsetWidth;

  // Slide-in Animationen starten
  left.classList.add("post-in-left");
  bottom.classList.add("post-in-bottom");
  right.classList.add("post-in-right");

  // Nach 1.5s Slide-out
  setTimeout(() => {
    left.classList.replace("post-in-left", "post-out-left");
    bottom.classList.replace("post-in-bottom", "post-out-bottom");
    right.classList.replace("post-in-right", "post-out-right");

    // Nach Animation wieder verstecken
    setTimeout(() => {
      [left, bottom, right].forEach(img => {
        if (img) img.style.display = "none";
      });
    }, 1000);
  }, 1500);
}

