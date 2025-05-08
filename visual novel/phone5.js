const scenes = {
  start: {
    text: "So hold me, Mom, in your long arms. So hold me, Mom, in your long arms. In your automatic arms. Your electronic arms. In your arms. So hold me, Mom, in your long arms. Your petrochemical arms. Your military arms. In your electronic arms.",
    image: "images/phone.png",
    choices: [
      { text: "Credits", nextScene: "link", isLink: true, href: "Credits.html" },
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