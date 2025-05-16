const scenes = {
    start: {
      audio: "/visual%20novel/audio/Let_X=X/Got_the_time.mp3",
      image: "/visual%20novel/images/Let_X=X/LetX=X_001.png",
      choices: [
        { text: "No.", nextScene: "thanks" },
        { text: "For sure!", nextScene: "postcard" }
      ]
    },
    thanks: {
      audio: "/visual%20novel/audio/Let_X=X/thanks.mp3",
      image: "/visual%20novel/images/Let_X=X/LetX=X_003.png",
      choices: [
        { text: "...", nextScene: "link", isLink: true, href: "phone5.html" },
    ]
      

    },
    postcard: {
      audio: "/visual%20novel/audio/Let_X=X/letter.mp3",
      image: "/visual%20novel/images/Let_X=X/LetX=X_001.png",
      choices: [
        { text: "Why didn't you contact me back sooner?", nextScene: "contact" },
        { text: "No problem, for you, always.", nextScene: "always" }
      ]
    },
    contact: {
      audio: "/visual%20novel/audio/Let_X=X/I_met_a_man.mp3",
      image: "/visual%20novel/images/Let_X=X/LetX=X_003.png",
      choices: [
        { text: "And?", nextScene: "and" },
        { text: "Allright, understandable.", nextScene: "understandable"}
      ]
    },
    always: {
      audio: "/visual%20novel/audio/Let_X=X/letX=X_satellites.mp3",
      image: "/visual%20novel/images/Let_X=X/LetX=X_002.png",
      choices: [
        { text: "Sorry, I don't have the time.", nextScene: "time" },
        { text: "Let's watch them.", nextScene: "watch"}
      ]
    },
    and: {
        audio: "/visual%20novel/audio/Let_X=X/Right_again.mp3",
        image: "/visual%20novel/images/Let_X=X/LetX=X_003.png",
        choices: [
            { text: "That was a weak excuse.", nextScene: "time"},
            { text: "Ok, reason enough.", nextScene: "understandable"}
        ]
    },
    watch: {
      audio: "/visual%20novel/audio/Let_X=X/Book_linger_on.mp3",
      image: "/visual%20novel/images/Let_X=X/LetX=X_002.png",
        choices: [
            { text: "Oh boy...", nextScene: "time"},
            { text: "Then let's wait for the future together.", nextScene: "understandable"}
        ]
    },
    understandable: {
      audio: "/visual%20novel/audio/Let_X=X/letx=x_hugs.mp3",
      image: "/visual%20novel/images/Let_X=X/LetX=X_002.png",
        choices:[
        { text: "...", nextScene: "link", isLink: true, href: "phone5.html" },
        ]
    },
    time: {
      audio: "/visual%20novel/audio/Let_X=X/burning_building_ganz.mp3",
      image: "/visual%20novel/images/Let_X=X/LetX=X_002.png",
        choices: [
            { text: "...", nextScene: "link", isLink: true, href: "phone5.html" },
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