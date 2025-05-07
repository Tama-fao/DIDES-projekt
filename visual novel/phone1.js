const scenes = {
  start: {
    text: "*Phone ringing*",
    image: "images/phone.png",
    choices: [
      { text: "Pick up", nextScene: "pickup" },
    ]
  },
  pickup: {
    text: "Hi. I'm not home right now. But if you want to leave a*Message, just start talking at the sound of the tone.PHello? This is your Mother. Are you there? Are you Coming home? Hello? Is anybody home? Well, you don't know me, But I know you. And I've got a message to give to you.",
    choices: [
      { text: "reply", nextScene: "link", isLink: true, href: "Walk_The_Dog.html" }, // Modified this line
    ]
  },
};

let currentScene = "start";

function showScene(sceneKey) {
  const scene = scenes[sceneKey];
  currentScene = sceneKey;
  document.getElementById("dialogue").innerText = scene.text;
  
  const sceneImage = document.getElementById("scene-image");
  if (scene.image) {
    sceneImage.style.backgroundImage = `url('${scene.image}')`;
  }

  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  
  scene.choices.forEach(choice => {
      const button = document.createElement("button");
      button.innerText = choice.text;
      button.classList.add("choice-button");
      
      if (choice.isLink) {
          // If it's a link, navigate to the specified href
          button.onclick = () => window.location.href = choice.href;
      } else {
          // Otherwise, proceed with normal scene navigation
          button.onclick = () => showScene(choice.nextScene);
      }
      
      choicesContainer.appendChild(button);
  });
}

showScene(currentScene);