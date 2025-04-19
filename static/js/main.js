window.onload = function () {
  setInterval(loadIntro, 2000);
};

var intros = ["Developer", "Designer", "Student", "Problem Solver", "Trying Artist", "Trying Chef", "Huge Nerd"];
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
    toggleTheme();
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark-mode");
      themeToggle.textContent = "☀️ Light Mode";
    } else {
      localStorage.setItem("theme", "light-mode");
      themeToggle.textContent = "🌙 Dark Mode";
    }
  });
});

// Add this to your theme toggle function
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  
  // Create toast message element
  const toast = document.createElement('div');
  toast.className = 'theme-toast';
  
  if (body.classList.contains('dark-mode')) {
    // Switching to light mode
    body.classList.remove('dark-mode');
    themeToggle.classList.remove('dark');
    toast.textContent = "Let there be light! ☀️";
  } else {
    // Switching to dark mode
    body.classList.add('dark-mode');
    themeToggle.classList.add('dark');
    toast.textContent = "Welcome to the dark side... 🌙";
  }
  
  // Add toast to body
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remove toast after animation
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}

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

  // Enhanced bot response logic
  function getBotResponse(message) {
    const lower = message.toLowerCase();
    if (lower.includes("bye")) {
      setTimeout(() => {
        chatModal.style.display = "none";
      }, 1000);
      return "Goodbye! Have a great day! 👋";
    }

    const triggers = [
      {
        keywords: ["hi", "hello", "hey", "greetings", "howdy", "hiya", "hola", "hallo"], // Make keywords lowercase
        response: "Hello! Nice to meet you! 😊"
      },
      {
        keywords: ["Song", "music", "favorite song", "favorite music"],
        response: "I love listening to a mix of pop and indie music! 🎶"
      },
      {
        keywords: ["hobby", "do for fun", "free time", "interests", "like", "enjoy", "pass time", "hobbies"],
        response: "I love painting, cooking, and reading thriller novels! 🎨📚🍳"
      },
      {
        keywords: ["work", "job", "projects", "what do you do", "working"],
        response: "I'm currently working on AR, web dev, and a cool food ordering system! 🍔🌐"
      },
      {
        keywords: ["skills", "technologies", "tools", "languages", "what do you know"],
        response: "I'm skilled in JavaScript, WebXR, UI/UX design, and a little bit of AI too! 💻✨"
      },
      {
        keywords: ["portfolio", "projects", "show me"],
        response: "You can scroll down to see my portfolio! Feel free to ask about any project. 🚀"
      },
      {
        keywords: ["contact", "reach", "email", "linkedin"],
        response: "You can reach me via the contact form or connect on LinkedIn! 😊"
      }
    ];

    for (const trigger of triggers) {
      if (trigger.keywords.some(keyword => lower.includes(keyword))) {
        return trigger.response;
      }
    }

    return "That's interesting! Tell me more. 😊";
  }

  // Update the send message logic
  sendMessage.addEventListener("click", () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
      // Add user's message
      const userChat = document.createElement("div");
      userChat.className = "chat-message user";
      userChat.textContent = userMessage;
      chatBody.appendChild(userChat);
      chatBody.scrollTop = chatBody.scrollHeight;
      chatInput.value = "";

      // Add bot's typing indicator and response
      const botChat = document.createElement("div");
      botChat.className = "chat-message bot";
      botChat.textContent = "Riya is typing...";
      chatBody.appendChild(botChat);
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(() => {
        botChat.textContent = getBotResponse(userMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 1000);
    }
  });

  // Add suggestion buttons functionality
  document.querySelectorAll(".chat-suggestion").forEach(button => {
    button.addEventListener("click", () => {
      chatInput.value = button.textContent;
      sendMessage.click();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const letsChatButton = document.getElementById("lets-chat-button");
  const chatModal = document.getElementById("chat-modal");

  // Open chat modal when "Let's Chat" button is clicked
  letsChatButton.addEventListener("click", () => {
    chatModal.style.display = "flex";
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Firebase initialization
  const firebaseConfig = {
    apiKey: "AIzaSyAH4WqpfB0f7mgTn8QKaxhWIy8-6BrVAnE",
    authDomain: "riri-2021a.firebaseapp.com",
    databaseURL: "https://riri-2021a-default-rtdb.firebaseio.com",
    projectId: "riri-2021a",
    storageBucket: "riri-2021a.appspot.com",
    messagingSenderId: "859916296956",
    appId: "1:859916296956:web:fb3fcef5c46019f5eb2d79",
  };

  firebase.initializeApp(firebaseConfig);

  // Get a reference to the Realtime Database
  const db = firebase.database();

  // Heart button functionality
  const heartButton = document.getElementById("send-heart");
  const heartModal = document.getElementById("heart-modal");
  const heartYesButton = document.getElementById("heart-yes");
  const heartNoButton = document.getElementById("heart-no");
  const heartsContainer = document.getElementById("hearts-container");

  if (heartButton && heartModal && heartYesButton && heartNoButton && heartsContainer) {
    // Open modal
    heartButton.onclick = () => {
      heartModal.classList.remove("hidden");
    };

    // Close modal
    heartNoButton.onclick = () => {
      heartModal.classList.add("hidden");
    };

    // Save heart
    heartYesButton.onclick = () => {
      const nickname = document.getElementById("nickname").value || "Anonymous";
      const heart = {
        name: nickname,
        timestamp: Date.now(),
      };

      // Save to Firebase
      db.ref("hearts").push(heart, (error) => {
        if (error) {
          console.error("Error saving heart:", error);
        } else {
          heartModal.classList.add("hidden");
        }
      });
    };

    // Update the heart display code in your Firebase child_added listener
    db.ref("hearts").on("child_added", (snapshot) => {
      const heart = snapshot.val();
      const div = document.createElement("div");
      div.textContent = `❤️ from ${heart.name}`;
      div.classList.add("floating-heart");
      div.draggable = true; // Make heart draggable
      
      // Position the heart randomly within the playground
      const playground = document.querySelector(".playground");
      const playgroundRect = playground.getBoundingClientRect();
      
      // Random position within playground bounds
      const randomX = Math.random() * (playgroundRect.width - 150);
      const randomY = Math.random() * (playgroundRect.height - 50);
      
      div.style.position = "absolute";
      div.style.left = `${randomX}px`;
      div.style.top = `${randomY}px`;
      
      // Add drag functionality
      let offsetX = 0;
      let offsetY = 0;
      let velocityX = 0;
      let velocityY = 0;
      let lastX = 0;
      let lastY = 0;
      let zIndexCounter = 1000;

      div.addEventListener("dragstart", (e) => {
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        div.style.opacity = "0.7";
        zIndexCounter++;
        div.style.zIndex = zIndexCounter;
      });

      div.addEventListener("drag", (e) => {
        if (e.clientX === 0 && e.clientY === 0) return;

        const rect = playground.getBoundingClientRect();
        let newX = e.clientX - rect.left - offsetX;
        let newY = e.clientY - rect.top - offsetY;

        // Constrain movement within the playground
        newX = Math.max(0, Math.min(newX, rect.width - 150));
        newY = Math.max(0, Math.min(newY, rect.height - 50));

        // Calculate velocity
        velocityX = newX - lastX;
        velocityY = newY - lastY;
        lastX = newX;
        lastY = newY;

        div.style.left = `${newX}px`;
        div.style.top = `${newY}px`;
      });

      div.addEventListener("dragend", () => {
        div.style.opacity = "1";
        
        // Add bounce effect
        const rect = playground.getBoundingClientRect();
        const heartRect = div.getBoundingClientRect();

        if (heartRect.left <= rect.left || heartRect.right >= rect.right) {
          velocityX = -velocityX * 0.5;
        }
        if (heartRect.top <= rect.top || heartRect.bottom >= rect.bottom) {
          velocityY = -velocityY * 0.5;
        }

        // Apply velocity-based movement
        let animationFrame;
        const applyVelocity = () => {
          let newX = parseFloat(div.style.left) + velocityX;
          let newY = parseFloat(div.style.top) + velocityY;

          // Constrain movement
          newX = Math.max(0, Math.min(newX, rect.width - 150));
          newY = Math.max(0, Math.min(newY, rect.height - 50));

          div.style.left = `${newX}px`;
          div.style.top = `${newY}px`;

          // Apply friction
          velocityX *= 0.9;
          velocityY *= 0.9;

          if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
            animationFrame = requestAnimationFrame(applyVelocity);
          } else {
            cancelAnimationFrame(animationFrame);
          }
        };

        applyVelocity();
      });
      
      playground.appendChild(div);
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const playground = document.querySelector(".playground");
  const cards = playground.querySelectorAll(".card");

  function randomizeCardPositions() {
    cards.forEach(card => {
      // Get playground dimensions
      const playgroundRect = playground.getBoundingClientRect();
      
      // Calculate maximum positions while keeping cards within bounds
      const maxX = playgroundRect.width - card.offsetWidth;
      const maxY = playgroundRect.height - card.offsetHeight;

      // Generate random positions
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      // Apply random positions
      card.style.left = `${randomX}px`;
      card.style.top = `${randomY}px`;

      // Add random rotation between -15 and 15 degrees
      const randomRotation = (Math.random() - 0.5) * 30;
      card.style.transform = `rotate(${randomRotation}deg)`;
    });
  }

  // Initial randomization
  randomizeCardPositions();

  // Optional: Randomize positions when window is resized
  window.addEventListener("resize", randomizeCardPositions);
});

// Initialize Email.js
(function() {
  emailjs.init("kT01aDbQFCChvcc3O");
})();

function sendEmail(e) {
  e.preventDefault();

  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs.send('service_ulo7mbo', 'template_sffvhti', params)
    .then(function(response) {
      alert("Message sent successfully! 📧");
      document.getElementById("contact-form").reset();
      document.getElementById("message-count").textContent = "1000";
    }, function(error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    });

  return false;
}
// Add these functions to your main.js
function openPdfModal(pdfUrl) {
  const modal = document.getElementById("pdf-modal");
  const iframe = document.getElementById("pdf-frame");
  iframe.src = pdfUrl;
  modal.style.display = "flex";
  
  // Prevent body scrolling when modal is open
  document.body.style.overflow = "hidden";
}

function closePdfModal() {
  const modal = document.getElementById("pdf-modal");
  const iframe = document.getElementById("pdf-frame");
  iframe.src = "";
  modal.style.display = "none";
  
  // Restore body scrolling
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
document.getElementById("pdf-modal").addEventListener("click", (e) => {
  if (e.target.id === "pdf-modal") {
    closePdfModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePdfModal();
  }
});

// Add Konami Code Easter Egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
let konamiActive = false;

document.addEventListener('keydown', (e) => {
  // Check if the pressed key matches the next key in sequence
  // Convert 'b' and 'a' to lowercase for case-insensitive comparison
  const currentKey = (konamiCode[konamiIndex] === 'b' || konamiCode[konamiIndex] === 'a') 
    ? e.key.toLowerCase() 
    : e.key;

  if (currentKey === konamiCode[konamiIndex]) {
    konamiIndex++;
    
    // If the full sequence is entered
    if (konamiIndex === konamiCode.length) {
      // Reset the index
      konamiIndex = 0;
      
      // Trigger fun effects
      activateKonamiCode();
    }
  } else {
    konamiIndex = 0;
  }

  // Update event listener for Escape key
  if (e.key === 'Escape' && konamiActive) {
    deactivateKonamiCode();
  }
});

function activateKonamiCode() {
  // Add fun effects when code is triggered
  konamiActive = true;
  document.body.style.transition = 'all 1s';
  
  // Create floating elements
  for (let i = 0; i < 20; i++) {
    createFloatingEmoji();
  }
  
  // Play a fun sound
  const audio = new Audio('./static/more assets/success-221935.mp3');
  audio.play().catch(err => console.log('Audio play failed:', err));
  
  // Add rainbow background
  document.body.style.animation = 'rainbow 3s linear infinite';

  // Start emoji cursor trail
  document.addEventListener('mousemove', createEmojiTrail);
}

function deactivateKonamiCode() {
  konamiActive = false;
  document.body.style.animation = 'none';
  document.removeEventListener('mousemove', createEmojiTrail);
  // Remove any remaining emoji trails
  document.querySelectorAll('.konami-trail').forEach(el => el.remove());
}

function createEmojiTrail(e) {
  if (!konamiActive) return;
  
  const emoji = document.createElement('div');
  emoji.className = 'konami-trail';
  emoji.textContent = ['✨', '🌟', '💫', '⭐', '🎮'][Math.floor(Math.random() * 5)];
  emoji.style.left = e.clientX + 'px';
  emoji.style.top = e.clientY + 'px';
  
  document.body.appendChild(emoji);
  
  // Remove trail after animation
  setTimeout(() => emoji.remove(), 1000);
}

function createFloatingEmoji() {
  const emoji = document.createElement('div');
  emoji.className = 'konami-emoji';
  emoji.textContent = ['🎮', '🌟', '✨', '🎯', '🎪'][Math.floor(Math.random() * 5)];
  
  // Position from bottom of screen
  emoji.style.position = 'fixed';
  emoji.style.bottom = '-50px';
  emoji.style.left = Math.random() * window.innerWidth + 'px';
  emoji.style.zIndex = '9999';
  
  document.body.appendChild(emoji);
  
  // Animate upward
  requestAnimationFrame(() => {
    emoji.style.transition = 'all 2s ease-out';
    emoji.style.transform = `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
    emoji.style.opacity = '0';
  });
  
  // Remove after animation
  setTimeout(() => emoji.remove(), 2000);
}