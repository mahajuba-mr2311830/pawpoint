let cart = [];

const screen = document.getElementById("screen");

const products = [
  { name: "Feed 5 Cats", price: 20, type: "impact" },
  { name: "Full Feeder Restock", price: 25, type: "impact" },
  { name: "Street Cat Feeding Pack", price: 50, type: "bundle" },
  { name: "New Cat Owner Kit", price: 80, type: "bundle" },
  { name: "Monthly Paw Plan", price: 99, type: "subscription" }
];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
  alert(`${name} added to cart`);
}

function updateCart() {
  document.getElementById("cartCount").textContent = cart.length;
}

function openCart() {
  const cartItems = document.getElementById("cartItems");
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  cartItems.innerHTML = cart.length
    ? cart.map(item => `<p>${item.name} — QAR ${item.price}</p>`).join("")
    : "<p>Your cart is empty.</p>";

  document.getElementById("cartTotal").textContent = total;
  document.getElementById("cartModal").classList.remove("hidden");
}

function closeCart() {
  document.getElementById("cartModal").classList.add("hidden");
}

function checkout() {
  if (cart.length === 0) return alert("Your cart is empty.");

  cart = [];
  updateCart();
  closeCart();

  screen.innerHTML = `
        <div class="card checkout-success">
            <h1>✅ Order Confirmed</h1>
            <p>Your Snoonu-powered pet care order has been placed.</p>
            <p>You earned <strong>50 PawPoints</strong>!</p>
            <button class="primary" onclick="showHome()">Back Home</button>
        </div>
    `;
}

function showHome() {
  screen.innerHTML = `
        <div class="card">
            <h2>Top CSR Sponsors</h2>

            <div class="sponsor-row">
                <img class="sponsor-logo" src="monoprix-logo.png" alt="Monoprix logo">
                <img class="sponsor-logo" src="lulu-logo.png" alt="LuLu logo">
                <img class="sponsor-logo" src="pets-logo.png" alt="Pet brand logo">
            </div>
        </div>

        <div class="card">
            <h2>User Leaderboard</h2>

            <div class="leaderboard">
                <div class="leaderboard-user">
                    <img class="avatar-img" src="cat1.png" alt="Meow4 profile">
                    <b>Meow4</b>
                    <p>420 pts</p>
                </div>

                <div class="leaderboard-user">
                    <img class="avatar-img" src="cat2.jfif" alt="Princess8 profile">
                    <b>Princess8</b>
                    <p>390 pts</p>
                </div>

                <div class="leaderboard-user">
                    <img class="avatar-img" src="cat3.jpg" alt="Biney2 profile">
                    <b>Biney2</b>
                    <p>330 pts</p>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>Impact This Month</h2>
            <img class="impact-image" src="impact-summary.png" alt="Monthly impact summary">
        </div>

        <div class="card">
            <h2>Quick Commerce</h2>
            <button class="primary" onclick="addToCart('Feed 5 Cats', 20)">Feed Now — QAR 20</button>
            <button class="primary" onclick="addToCart('Monthly Paw Plan', 99)">Subscribe — QAR 99</button>
        </div>
    `;
}

function showFeeders() {
  screen.innerHTML = `
        <div class="feeder-map-image-box">
          <img src="feeders-map.png" alt="Feeder locations map">
        </div>

        <div class="card">
            <h2>Al Rayyan PawStation</h2>
            <p>Food level: <strong>18%</strong></p>
            <p>Last fed: 2 hours ago</p>
            <p>Camera: Live monitoring available</p>
            <button class="primary">Watch Live — QAR 15</button>
        </div>

        <div class="card">
            <h2>Used in this feeder</h2>
            <p>Premium Dry Cat Food 10KG</p>
            <button class="primary" onclick="addToCart('Buy Same Food for My Cat', 65)">Buy for My Cat — QAR 65</button>
            <button class="secondary" onclick="addToCart('Send Food to Feeder', 30)">Send to Feeder — QAR 30</button>
        </div>
    `;
}

function showShop() {
  screen.innerHTML = `
        <h1>Snoonu Pet Shop</h1>
        ${products.map(product => `
            <div class="product">
                <h3>${product.name}</h3>
                <p>${getDescription(product.type)}</p>
                <p class="price">QAR ${product.price}</p>
                <button class="primary" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            </div>
        `).join("")}
    `;
}

function getDescription(type) {
  if (type === "impact") return "Sponsor real food and water for stray cats.";
  if (type === "bundle") return "Curated pet-care bundle fulfilled through Snoonu.";
  if (type === "subscription") return "Monthly recurring feeding plan.";
  return "";
}

function showQuest() {
  screen.innerHTML = `
        <div class="card">
            <h2>PawPower Tier 1</h2>
            <p>80 / 100 points</p>
            <progress value="80" max="100"></progress>
        </div>

        <div class="card">
            <h2>Today's Challenges</h2>
            <button class="secondary">Donate QAR 5</button>
            <button class="secondary">Feed 1 Cat</button>
            <button class="secondary">Buy Pet Food via Snoonu</button>
            <button class="secondary">Check Nearest PawStation</button>
        </div>

        <div class="card">
            <h2>Rewards</h2>
            <p>100 points: 10% off pet food</p>
            <p>300 points: 20% off cat toys</p>
        </div>
    `;
}

function showCommunity() {
  screen.innerHTML = `
        <div class="card">
            <h2>Community</h2>
            <p><strong>Why is my cat sneezing?</strong></p>
            <button class="primary" onclick="openCommunityChat()">Hop into the convo</button>
        </div>

        <div id="communityChatBox" class="chat-box hidden">
            <div class="chat-header">
              <h3>Cat Care Chat</h3>
              <button class="chat-close-btn" onclick="closeCommunityChat()">×</button>
            </div>

            <div id="chatMessages" class="chat-messages">
                <div class="chat-message other">
                    <b>LunaCat:</b>
                    <p>My cat was sneezing yesterday too. It could be dust or an allergy.</p>
                </div>

                <div class="chat-message other">
                    <b>PawHelper:</b>
                    <p>Please check if there is any discharge from the nose or eyes.</p>
                </div>

                <div class="chat-message other">
                    <b>MeowCare:</b>
                    <p>If it continues for more than a day or two, it is better to contact a vet.</p>
                </div>
            </div>

            <div class="chat-input-area">
                <input id="chatInput" type="text" placeholder="Type your message...">
                <button class="primary" onclick="sendChatMessage()">Send</button>
            </div>
        </div>

        <div class="card">
            <h2>Rescue Request</h2>
            <p>Cat spotted near Lusail needs food support.</p>
            <button class="primary" onclick="addToCart('Send Rescue Food Kit', 50)">Send Rescue Kit — QAR 50</button>
        </div>

        <div class="card">
            <h2>Powered by Snoonu</h2>
            <button class="secondary" onclick="showShop()">Cat Food</button>
            <button class="secondary" onclick="showShop()">Cat Toys</button>
            <button class="secondary" onclick="showShop()">Care Supplies</button>
            <button class="secondary">AI Vet</button>
        </div>
    `;
}

function openCommunityChat() {
  const chatBox = document.getElementById("communityChatBox");
  chatBox.classList.remove("hidden");

  chatBox.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function closeCommunityChat() {
  const chatBox = document.getElementById("communityChatBox");
  chatBox.classList.add("hidden");
}

function sendChatMessage() {
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  const message = chatInput.value.trim();

  if (message === "") {
    return;
  }

  chatMessages.innerHTML += `
        <div class="chat-message user">
            <b>You:</b>
            <p>${message}</p>
        </div>
    `;

  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

showHome();