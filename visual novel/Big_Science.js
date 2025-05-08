const scenes = {
    start: {
      text: "Golden cities.Golden towns. Coo coo it's cold outside. Don't forget your mittens. Here's a man who lives a life of danger. Everywhere he goes he stays - a stranger.",
      image: "Big-Science.png",
      choices: [
        { text: "Don't be a stranger", nextScene: "stranger" },
        { text: "Got places to be, ask for Directions.", nextScene: "directions" }
      ]
    },
    stranger: {
      text: "Howdy stranger. And he said, Every man, every man for himself. Every man, every man for himself. CAll in favor say aye.",
      choices: [
        { text: "aye", nextScene: "aye" },
        { text: "nay", nextScene: "nay" }
      ]
    },
    directions: {
      text: "Hey Pal! How do I get to town from here?  And he said, Well just take a right where they're going to build that new shopping mall, go straight past where they're going to put in the freeway, take a left at what's going to be the new sports center, and keep going until you hit the place where they're thinking of building that drive-in bank.You can't miss it.",
      choices: [
        { text: "Thank you, bye ", nextScene: "Thanks" },
        { text: "Can I hitch a ride?", nextScene: "Ride" }
      ]
    },

      aye: {
        text: "Could you turn out the lights? Let's roll the film. Big Science. Hallelujah. Every man, every man for himself. Big Science. Hallelujah. Yodellayheehoo.", 
        choices: [
            { text: "...", nextScene: "link", isLink: true, href: "Phone3.html" },
        ]
      },

      nay: {
        text: "I think we should put some mountains here. Otherwise, what are all the characters going to fall off of?",
        choices: [
          { text: "Totally!", nextScene: "stairs" },
          { text: "What?", nextScene: "stairs" }
        ]
      },

      stairs: {
        text: "And what about stairs?",
        choices: [
          { text: "All about that!", nextScene: "aye" },
          { text: "What?", nextScene: "what" }
        ]
      },

      what: {
        text: "Ooo coo coo.", 
        choices: [
            { text: "...", nextScene: "link", isLink: true, href: "Phone3.html" },
        ]
      },
   
      Thanks: {
        text: "And I said This must be the place.", 
        choices: [
            { text: "...", nextScene: "link", isLink: true, href: "Phone3.html" },
        ]
      },

      Ride: {
        text: "Mind if I smoke?",
        choices: [
          { text: "No, be silent", nextScene: "silent" },
          { text: "Sure, go ahead.", nextScene: "Sure" }
        ]
      },

      Sure: {
        text: "Hey Professor!", 
        choices: [
            { text: "Thanks for the ride.", nextScene: "link", isLink: true, href: "Phone3.html" },
        ]
      },

      silent: {
        text: "And long cars in long lines and great big signs and they all say, Hallelujah. AYodellayheehoo. Every man for himself.",
        choices: [
          { text: "...", nextScene: "nay" },
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
  