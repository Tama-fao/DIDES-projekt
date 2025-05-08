const scenes = {
  start: {
    text: "And I've got a message to give to you. Here come the planes. So you better get ready. Ready to go. You can come As you are, but pay as you go. Pay as you go. And I said: OK. Who is this really? And the voice said: This is the hand, the hand that takes. This is the Hand, the hand that takes. This is the hand, the hand that takes. Here come the planes. They're American planes. Made in America. Smoking or non-smoking?",
    image: "images/phone.png",
    choices: [
      { text: "reply", nextScene: "link", isLink: true, href: "From_The_Air.html" },
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