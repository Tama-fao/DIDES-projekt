const scenes = {
    start: {
      loopAudio: true,
      audio: "/visual%20novel/audio/Walk_The_Dog/I_Saw_Trees_001.mp3",
      image: "/visual%20novel/images/Walk_The_Dog/Dog_001.png",
      choices: [
        { text: "I don't care.", nextScene: "Care" },
        { text: "Cool!", nextScene: "Cool" }
      ]
    },
    Care: {
      audio: "/visual%20novel/audio/Walk_The_Dog/I_on_Fire.mp3",
      image: "/visual%20novel/images/Walk_The_Dog/Dog_003.png",
      choices: [
        { text: "Ok, so?", nextScene: "Ok" },
        { text: "I'm Sorry...", nextScene: "Sorry" }
      ]
    },
    Cool: {
      audio: "/visual%20novel/audio/Walk_The_Dog/Dog_Cinema_001.mp3",
      image: "/visual%20novel/images/Walk_The_Dog/Dog_001.png",
      choices: [
        { text: "Who cares.", nextScene: "Ok" },
        { text: "I love Dogs too!", nextScene: "Sorry" }
      ]
    },
    Ok: {
      audio: "/visual%20novel/audio/Walk_The_Dog/I_feel_so_bad.mp3",
      image: "/visual%20novel/images/Walk_The_Dog/Dog_003.png",
      choices: [
        { text: "...", nextScene: "link", isLink: true, href: "Phone_2.html" },
      ]
    },
    Sorry: {
      audio: "/visual%20novel/audio/Walk_The_Dog/I_walk_the_dog.mp3",
      image: "/visual%20novel/images/Walk_The_Dog/Dog_002.png",
      choices: [{ text: "...", nextScene: "link", isLink: true, href: "Phone_2.html" },]
    },

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