window.onload = function () {
  setInterval(loadIntro, 2000);
};

var intros = ["Developer", "Designer", "Student", "Trying Artist", "Trying Chef", "Huge Nerd"];
var index = 0;
var intro = document.getElementById("intro-loader");

function loadIntro() {
  intro.innerHTML = intros[index];
  intro.classList.add("fade");
  index++;
  if (index >= intros.length) {
    index = 0;
  }
}

function messageCount() {
  var msg = document.getElementById("message").value;
  var msgCount = document.getElementById("message-count");
  var msgLength = msg.length;
  const maxLength = 1000;
  var charLeft = maxLength - msgLength;
  msgCount.innerText = charLeft;
}

document.addEventListener("DOMContentLoaded", function () {
  const images = ["static/images/ri1.png", "static/images/ri2.png", "static/images/ri3.png", "static/images/ri4.png", "static/images/ri5.png"];
  let currentIndex = 0;

  const imgElement = document.getElementById("sequence-image");

  imgElement.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % images.length; // Loop back to first image
      imgElement.src = images[currentIndex];
  });
});


// Add background music toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("bg-music");
  var button = document.getElementById("toggle-sound");
  var isPlaying = false;

  button.addEventListener("click", function () {
    if (isPlaying) {
      audio.pause();
      button.innerText = "🔊 Play Music";
    } else {
      audio.play();
      button.innerText = "🔇 Mute Music";
    }
    isPlaying = !isPlaying;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      // Generate multiple overlapping trails for a continuous effect
      for (let i = 0; i < 9; i++) { // More trails for a smooth blend
          setTimeout(() => createTrail(e.clientX, e.clientY), i * 7); // Staggered effect
      }
  });

  function createTrail(x, y) {
      const trail = document.createElement("div");
      trail.classList.add("trail");
      document.body.appendChild(trail);

      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;

      // Remove after animation
      setTimeout(() => {
          trail.remove();
      }, 400);
  }

  document.addEventListener("mousedown", () => {
    cursor.classList.add("dragging");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("dragging");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("toggle-theme");
  const body = document.body;

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === "dark-mode" ? "☀️ Light Mode" : "🌙 Dark Mode";
  }

  themeToggle.addEventListener("click", function () {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light-mode");
      themeToggle.textContent = "🌙 Dark Mode";
    } else {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark-mode");
      themeToggle.textContent = "☀️ Light Mode";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  const playground = document.querySelector(".playground");
  let zIndexCounter = 1000; // Initialize a global z-index counter

  cards.forEach((card) => {
    let offsetX = 0;
    let offsetY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let lastX = 0;
    let lastY = 0;

    card.addEventListener("dragstart", (e) => {
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      card.style.opacity = "0.7";
      zIndexCounter++; // Increment the z-index counter
      card.style.zIndex = zIndexCounter; // Assign the new z-index to the dragged element
    });

    card.addEventListener("drag", (e) => {
      if (e.clientX === 0 && e.clientY === 0) return; // Ignore invalid drag events

      const rect = playground.getBoundingClientRect();
      let newX = e.clientX - rect.left - offsetX;
      let newY = e.clientY - rect.top - offsetY;

      // Constrain movement within the playground
      newX = Math.max(0, Math.min(newX, rect.width - card.offsetWidth));
      newY = Math.max(0, Math.min(newY, rect.height - card.offsetHeight));

      // Calculate velocity
      velocityX = newX - lastX;
      velocityY = newY - lastY;
      lastX = newX;
      lastY = newY;

      card.style.position = "absolute";
      card.style.left = `${newX}px`;
      card.style.top = `${newY}px`;
    });

    card.addEventListener("dragend", () => {
      card.style.opacity = "1";
      // Do not reset the z-index here; it will remain at the incremented value

      // Add bounce effect if hitting the playground border
      const rect = playground.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      if (cardRect.left <= rect.left || cardRect.right >= rect.right) {
        velocityX = -velocityX * 0.5; // Reverse and reduce velocity
      }
      if (cardRect.top <= rect.top || cardRect.bottom >= rect.bottom) {
        velocityY = -velocityY * 0.5; // Reverse and reduce velocity
      }

      // Apply velocity-based movement
      let animationFrame;
      const applyVelocity = () => {
        let newX = parseFloat(card.style.left) + velocityX;
        let newY = parseFloat(card.style.top) + velocityY;

        // Constrain movement within the playground
        newX = Math.max(0, Math.min(newX, rect.width - card.offsetWidth));
        newY = Math.max(0, Math.min(newY, rect.height - card.offsetHeight));

        card.style.left = `${newX}px`;
        card.style.top = `${newY}px`;

        // Reduce velocity over time (friction)
        velocityX *= 0.9;
        velocityY *= 0.9;

        // Stop animation when velocity is low
        if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
          animationFrame = requestAnimationFrame(applyVelocity);
        } else {
          cancelAnimationFrame(animationFrame);
        }
      };

      applyVelocity();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const cardText = card.querySelector(".card-text");

    card.addEventListener("mouseenter", () => {
      cardText.textContent = "Scan to Interact"; // Change text on hover
    });

    card.addEventListener("mouseleave", () => {
      // Restore original text when hover ends
      if (cardText.closest(".card").querySelector(".card-main-image").alt === "Example 1") {
        cardText.textContent = "Articulated Whale Shark";
      } else if (cardText.closest(".card").querySelector(".card-main-image").alt === "Example 2") {
        cardText.textContent = "Pixar Luxo Jr. Lamp";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const playground = document.querySelector(".playground");
  const ballsContainer = document.querySelector(".balls-container");
  const numBalls = 10; // Number of balls to generate
  const balls = [];
  let zIndexCounter = 1000;

  // Generate random balls
  function generateBalls() {
    for (let i = 0; i < numBalls; i++) {
      const ball = document.createElement("div");
      ball.classList.add("ball");

      // Random size and position
      const size = Math.random() * 50 + 30; // Ball size between 30px and 80px
      const x = Math.random() * (playground.offsetWidth - size);
      const y = -Math.random() * 200; // Start above the playground

      ball.style.width = `${size}px`;
      ball.style.height = `${size}px`;
      ball.style.left = `${x}px`;
      ball.style.top = `${y}px`;

      ballsContainer.appendChild(ball);
      balls.push({ element: ball, size, x, y, velocityX: 0, velocityY: 0 });
    }
  }

  // Animate balls falling
  function animateBalls() {
    balls.forEach((ball) => {
      const { element, size } = ball;
      const targetY = playground.offsetHeight - size;

      element.style.transition = "top 1s ease-out";
      element.style.top = `${targetY}px`;

      // Update ball's position
      ball.y = targetY;
    });
  }

  // Drag and throw functionality
  function enableDragging() {
    balls.forEach((ball) => {
      const { element } = ball;
      let offsetX = 0;
      let offsetY = 0;
      let velocityX = 0;
      let velocityY = 0;
      let lastX = 0;
      let lastY = 0;

      element.addEventListener("mousedown", (e) => {
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        zIndexCounter++;
        element.style.zIndex = zIndexCounter;
        element.style.cursor = "grabbing";

        lastX = e.clientX;
        lastY = e.clientY;

        function onMouseMove(e) {
          const rect = playground.getBoundingClientRect();
          const newX = e.clientX - rect.left - offsetX;
          const newY = e.clientY - rect.top - offsetY;

          // Calculate velocity
          velocityX = e.clientX - lastX;
          velocityY = e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;

          // Update position
          ball.x = Math.max(0, Math.min(newX, playground.offsetWidth - ball.size));
          ball.y = Math.max(0, Math.min(newY, playground.offsetHeight - ball.size));

          element.style.left = `${ball.x}px`;
          element.style.top = `${ball.y}px`;
        }

        function onMouseUp() {
          element.style.cursor = "grab";

          // Apply momentum
          function applyMomentum() {
            ball.x += velocityX;
            ball.y += velocityY;

            // Constrain within playground
            ball.x = Math.max(0, Math.min(ball.x, playground.offsetWidth - ball.size));
            ball.y = Math.max(0, Math.min(ball.y, playground.offsetHeight - ball.size));

            element.style.left = `${ball.x}px`;
            element.style.top = `${ball.y}px`;

            // Reduce velocity (friction)
            velocityX *= 0.9;
            velocityY *= 0.9;

            // Stop when velocity is low
            if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
              requestAnimationFrame(applyMomentum);
            }
          }

          applyMomentum();

          // Remove event listeners
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      });
    });
  }

  // Collision detection
  function detectCollisions() {
    balls.forEach((ballA, index) => {
      balls.slice(index + 1).forEach((ballB) => {
        const dx = ballA.x + ballA.size / 2 - (ballB.x + ballB.size / 2);
        const dy = ballA.y + ballA.size / 2 - (ballB.y + ballB.size / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (ballA.size + ballB.size) / 2) {
          // Simple collision response: swap velocities
          [ballA.velocityX, ballB.velocityX] = [ballB.velocityX, ballA.velocityX];
          [ballA.velocityY, ballB.velocityY] = [ballB.velocityY, ballA.velocityY];
        }
      });
    });

    requestAnimationFrame(detectCollisions);
  }

  // Initialize
  generateBalls();
  animateBalls();
  enableDragging();
  detectCollisions();
});

document.addEventListener("DOMContentLoaded", function () {
  const loadingLanding = document.querySelector(".loading-landing");
  if (!loadingLanding) return;

  gsap.registerPlugin(ScrollTrigger);

  const images = loadingLanding.querySelectorAll("img");
  const loader = loadingLanding.querySelector(".loader--text");

  if (images.length === 0) {
    setTimeout(() => {
      loader.textContent = "100%";
      showDemo();
    }, 3000);
    return;
  }

  const updateProgress = (instance) => {
    const progress = Math.round((instance.progressedCount * 100) / images.length);
    loader.textContent = `${progress}%`;
  };

  const showDemo = () => {
    document.body.style.overflow = "auto";
    document.scrollingElement.scrollTo(0, 0);
    gsap.to(loadingLanding.querySelector(".loader"), { autoAlpha: 0 });

    // Animate each row in the demo-gallery and demo-text
    const sections = gsap.utils.toArray(".demo-gallery .wrapper, .demo-text .wrapper");
    sections.forEach((section, index) => {
      const [x, xEnd] = index % 2 === 0
        ? [section.scrollWidth * -1, 0] // Move left to right
        : ["100%", (section.scrollWidth - section.offsetWidth) * -1]; // Move right to left

      gsap.fromTo(section, { x }, {
        x: xEnd,
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // Start animation when the section enters the viewport
          end: "bottom top", // End animation when the section leaves the viewport
          scrub: 0.5, // Smooth scrolling effect
        },
      });
    });
  };

  imagesLoaded(images)
    .on("progress", (instance) => {
      updateProgress(instance);
    })
    .on("always", () => {
      loader.textContent = "100%";
      showDemo();
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const avatar = document.getElementById("avatar");
  const navbarAvatar = document.getElementById("navbar-avatar");
  const chatModal = document.getElementById("chat-modal");
  const closeChat = document.getElementById("close-chat");
  const chatBody = document.getElementById("chat-body");
  const chatInput = document.getElementById("chat-input");
  const sendMessage = document.getElementById("send-message");

  // Function to toggle chat modal
  function toggleChatModal() {
    chatModal.style.display = chatModal.style.display === "flex" ? "none" : "flex";
  }

  // Open chat modal when either avatar is clicked
  avatar.addEventListener("click", toggleChatModal);
  navbarAvatar.addEventListener("click", toggleChatModal);


  // Close chat modal
  closeChat.addEventListener("click", () => {
    chatModal.style.display = "none";
  });

  // Send message
  sendMessage.addEventListener("click", () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
      // Add user's message to chat
      const userChat = document.createElement("div");
      userChat.className = "chat-message user";
      userChat.textContent = userMessage;
      chatBody.appendChild(userChat);

      // Scroll to the bottom
      chatBody.scrollTop = chatBody.scrollHeight;

      // Clear input
      chatInput.value = "";

      // Add bot's response
      setTimeout(() => {
        const botChat = document.createElement("div");
        botChat.className = "chat-message bot";
        botChat.textContent = getBotResponse(userMessage);
        chatBody.appendChild(botChat);

        // Scroll to the bottom
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 1000);
    }
  });

  // Bot response logic
  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("hobby")) {
      return "I love painting, cooking, and reading thriller novels!";
    } else if (lowerMessage.includes("work")) {
      return "I'm currently working on AR and web development projects!";
    } else {
      return "That's interesting! Tell me more. 😊";
    }
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const letsChatButton = document.getElementById("lets-chat-button");
  const chatModal = document.getElementById("chat-modal");

  // Open chat modal when "Let's Chat" button is clicked
  letsChatButton.addEventListener("click", () => {
    chatModal.style.display = "flex";
  });
});
