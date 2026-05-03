/* ===== STATE ===== */
let cart = [];
let pawPoints = 10;
const screen = document.getElementById("screen");

const products = [
  { name: "Feed 5 Cats", price: 20, type: "impact", icon: "🐱" },
  { name: "Full Feeder Restock", price: 25, type: "impact", icon: "🍽️" },
  { name: "Street Cat Feeding Pack", price: 50, type: "bundle", icon: "🎁" },
  { name: "New Cat Owner Kit", price: 80, type: "bundle", icon: "🧺" },
  { name: "Monthly Paw Plan", price: 99, type: "subscription", icon: "⭐" }
];

const challenges = [
  { icon: "💰", label: "Donate QAR 5", pts: 5, done: false },
  { icon: "🐾", label: "Feed 1 Cat", pts: 10, done: false },
  { icon: "🛍️", label: "Buy Pet Food via Snoonu", pts: 15, done: false },
  { icon: "📍", label: "Check Nearest PawStation", pts: 5, done: false }
];

/* ===== TOAST ===== */
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  // Force reflow
  toast.offsetHeight;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, 2200);
}

/* ===== CART ===== */
function addToCart(name, price) {
  cart.push({ name, price, id: Date.now() + Math.random() });
  updateCart();
  showToast(`🛒 ${name} added!`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
  refreshCartItems();
}

function updateCart() {
  const badge = document.getElementById("cartCount");
  badge.textContent = cart.length;
  badge.classList.remove("bump");
  void badge.offsetWidth;
  badge.classList.add("bump");
}

function refreshCartItems() {
  const cartItems = document.getElementById("cartItems");
  const total = cart.reduce((s, i) => s + i.price, 0);
  document.getElementById("cartTotal").textContent = total;

  if (!cart.length) {
    cartItems.innerHTML = `<div class="cart-empty">🐾 Your cart is empty!</div>`;
    return;
  }
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <span class="cart-item-name">${item.name}</span>
      <span class="cart-item-price">QAR ${item.price}</span>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
    </div>
  `).join("");
}

function openCart() {
  refreshCartItems();
  document.getElementById("cartModal").classList.remove("hidden");
}

function closeCart() {
  document.getElementById("cartModal").classList.add("hidden");
}

function handleModalBackdrop(e) {
  if (e.target === e.currentTarget) closeCart();
}

function checkout() {
  if (!cart.length) { showToast("🐾 Your cart is empty!"); return; }
  const total = cart.reduce((s, i) => s + i.price, 0);
  const earned = total;
  pawPoints += earned;
  updatePawPointsDisplay();
  cart = [];
  updateCart();
  closeCart();

  screen.innerHTML = `
    <div class="card checkout-success">
      <span class="success-emoji">🎉</span>
      <h1>Order Confirmed!</h1>
      <p>Your Snoonu-powered pet care order has been placed.<br>Thank you for making a difference! 🐾</p>
      <div class="points-earned">⭐ +${earned} PawPoints earned!</div>
      <p style="margin-top:8px;">Total PawPower: <strong>${pawPoints} / 100 pts</strong></p>
      <button class="btn-primary" style="margin-top:14px;" onclick="showHomeNav()">← Back Home</button>
    </div>
  `;
}

function updatePawPointsDisplay() {
  const el = document.getElementById("headerPawPoints");
  if (el) el.textContent = pawPoints;
}

/* ===== NAV ACTIVE STATE ===== */
function setActiveNav(btn) {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active-nav"));
  btn.classList.add("active-nav");
}

function showHomeNav() {
  setActiveNav(document.querySelectorAll(".nav-btn")[0]);
  showHome();
}

/* ===== HOME ===== */
function showHome() {
  screen.innerHTML = `
    <div class="card" style="animation-delay:0.05s">
      <h2> Top CSR Sponsors</h2>
      <div class="sponsor-row">
        <img class="sponsor-logo" src="monoprix-logo.png" alt="Monoprix" onerror="this.style.display='none'">
        <img class="sponsor-logo" src="lulu-logo.png" alt="LuLu" onerror="this.style.display='none'">
        <img class="sponsor-logo" src="pets-logo.png" alt="Pet Brand" onerror="this.style.display='none'">
      </div>
    </div>

    <div class="card" style="animation-delay:0.12s">
      <h2> User Leaderboard</h2>
      <div class="leaderboard">
        <div class="leaderboard-user rank-2">
          <span class="rank-badge"> </span>
          <img class="avatar-img" src="cat2.jfif" alt="Princess8" onerror="this.src='https://api.dicebear.com/7.x/fun-emoji/svg?seed=Princess8'">
          <b>Princess8</b>
          <p class="pts">390 pts</p>
        </div>
        <div class="leaderboard-user rank-1">
          <span class="rank-badge"> </span>
          <img class="avatar-img" src="cat1.png" alt="Meow4" onerror="this.src='https://api.dicebear.com/7.x/fun-emoji/svg?seed=Meow4'">
          <b>Meow4</b>
          <p class="pts">420 pts</p>
        </div>
        <div class="leaderboard-user rank-3">
          <span class="rank-badge"> </span>
          <img class="avatar-img" src="cat3.jpg" alt="Biney2" onerror="this.src='https://api.dicebear.com/7.x/fun-emoji/svg?seed=Biney2'">
          <b>Biney2</b>
          <p class="pts">330 pts</p>
        </div>
      </div>
    </div>

    <div class="card" style="animation-delay:0.19s">
      <h2> Impact This Month</h2>
      <img class="impact-image" src="impact-summary.png" alt="Monthly impact summary" onerror="this.style.display='none'">
    </div>

    <div class="card" style="animation-delay:0.26s">
      <h2>  Quick Commerce</h2>
      <div class="quick-commerce-row">
        <div class="quick-btn" onclick="addToCart('Feed 5 Cats', 20)">
          <span class="qb-icon">🐱</span>
          <span class="qb-label">Feed Now</span>
          <span class="qb-price">QAR 20</span>
        </div>
        <div class="quick-btn" onclick="addToCart('Monthly Paw Plan', 99)">
          <span class="qb-icon">⭐</span>
          <span class="qb-label">Subscribe</span>
          <span class="qb-price">QAR 99</span>
        </div>
        <div class="quick-btn" onclick="addToCart('Street Cat Feeding Pack', 50)">
          <span class="qb-icon">🎁</span>
          <span class="qb-label">Bundle</span>
          <span class="qb-price">QAR 50</span>
        </div>
      </div>
    </div>
  `;
}

/* ===== FEEDERS ===== */
function showFeeders() {
  screen.innerHTML = `
    <div class="feeder-map-image-box">
      <img src="feeders-map.png" alt="Feeder locations map" onerror="this.parentElement.style.background='linear-gradient(135deg,#fce7f3,#ede9fe)'; this.style.display='none'">
    </div>

    <div class="card">
      <h2>📍 Al Rayyan PawStation</h2>
      <div style="text-align:left;">
        <p style="font-size:13px;color:var(--text-soft);margin-bottom:8px;">Food Level</p>
        <div class="feeder-status-bar">
          <div class="feeder-status-fill" id="feederFill" style="width:0%"></div>
        </div>
        <div class="feeder-meta">
          <span id="feederPct">18% remaining</span>
          <span>Last fed: 2 hrs ago</span>
        </div>
      </div>
      <div class="btn-row" style="margin-top:14px;">
        <button class="btn-primary" onclick="showToast('🎥 Opening live feed...')">📹 Watch Live — QAR 15</button>
      </div>
    </div>

    <div class="card">
      <h2> Used in This Feeder</h2>
      <p style="margin-bottom:12px;color:var(--text-soft);font-size:14px;">Premium Dry Cat Food 10KG</p>
      <div class="btn-row">
        <button class="btn-primary"    onclick="addToCart('Buy Same Food for My Cat', 65)">Buy for My Cat — QAR 65</button>
        <button class="btn-secondary"  onclick="addToCart('Send Food to Feeder', 30)">Send to Feeder — QAR 30</button>
      </div>
    </div>
  `;

  // Animate fill bar
  setTimeout(() => {
    const fill = document.getElementById("feederFill");
    if (fill) fill.style.width = "18%";
  }, 100);
}

/* ===== SHOP ===== */
function showShop() {
  screen.innerHTML = `
    <p class="section-label"> Snoonu Pet Shop</p>
    <div class="product-grid">
      ${products.map((p, i) => `
        <div class="product-card" style="animation-delay:${0.05 + i * 0.07}s">
          <div class="product-icon">${p.icon}</div>
          <div class="product-info">
            <h3>${p.name}</h3>
            <p>${getDescription(p.type)}</p>
          </div>
          <div class="product-right">
            <span class="type-badge type-${p.type}">${p.type}</span>
            <span class="product-price">QAR ${p.price}</span>
            <button class="btn-primary" onclick="addToCart('${p.name}', ${p.price})">Add 🛒</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function getDescription(type) {
  if (type === "impact") return "Sponsor real food & water for stray cats.";
  if (type === "bundle") return "Curated pet-care bundle via Snoonu.";
  if (type === "subscription") return "Monthly recurring feeding plan.";
  return "";
}

/* ===== PAWQUEST ===== */
function showQuest() {
  const tierGoal = 100;
  const tierProgress = Math.min(pawPoints, tierGoal);
  const pct = (tierProgress / tierGoal) * 100;

  screen.innerHTML = `
    <div class="card progress-card">
      <div class="progress-tier">🐾 PawPower Tier 1</div>
      <div class="progress-track">
        <div class="progress-fill" id="questFill" style="width:0%"></div>
      </div>
      <p class="progress-pts">${tierProgress} / ${tierGoal} PawPoints</p>
    </div>

    <div class="card">
      <h2> Today's Challenges</h2>
      <div class="challenges-list">
        ${challenges.map((c, i) => `
          <div class="challenge-item${c.done ? ' done' : ''}" onclick="completeChallenge(${i})">
            <span class="challenge-icon">${c.icon}</span>
            <div class="challenge-text">
              <strong>${c.label}</strong>
              <span>+${c.pts} pts reward</span>
            </div>
            <span class="challenge-pts">+${c.pts}</span>
            <span class="challenge-check">${c.done ? '✅' : '○'}</span>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="card">
      <h2> Rewards</h2>
      <div class="rewards-list">
        <div class="reward-item">
          <div class="reward-points">100 pts</div>
          <div class="reward-details">
            <h3>Pet Food Discount</h3>
            <p>Get <strong>10% off</strong> pet food</p>
          </div>
        </div>
        <div class="reward-item">
          <div class="reward-points">300 pts</div>
          <div class="reward-details">
            <h3>Cat Toys Discount</h3>
            <p>Get <strong>20% off</strong> cat toys</p>
          </div>
        </div>
        <div class="reward-item">
          <div class="reward-points">500 pts</div>
          <div class="reward-details">
            <h3>Free PawStation Visit</h3>
            <p>Sponsor a full day of feeding</p>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const fill = document.getElementById("questFill");
    if (fill) fill.style.width = pct + "%";
  }, 100);
}

function completeChallenge(index) {
  if (challenges[index].done) { showToast("Already completed! 🎉"); return; }
  challenges[index].done = true;
  pawPoints += challenges[index].pts;
  updatePawPointsDisplay();
  showToast(`⭐ +${challenges[index].pts} PawPoints earned!`);
  showQuest();
}

/* ===== COMMUNITY ===== */
function showCommunity() {
  screen.innerHTML = `
    <div class="card">
      <h2> Community</h2>
      <div class="community-post">
        <h3> Why is my cat sneezing?</h3>
        <button class="btn-primary" onclick="openCommunityChat()">💬 Hop into the convo</button>
      </div>
    </div>

    <div id="communityChatBox" class="chat-box hidden">
      <div class="chat-header">
        <h3>🐱 Cat Care Chat</h3>
        <button class="chat-close-btn" onclick="closeCommunityChat()">✕</button>
      </div>
      <div id="chatMessages" class="chat-messages">
        <div class="chat-message other">
          <b>LunaCat 🌙</b>
          <p>My cat was sneezing too — probably dust or an allergy!</p>
        </div>
        <div class="chat-message other">
          <b>PawHelper 🐾</b>
          <p>Check for any discharge from the nose or eyes.</p>
        </div>
        <div class="chat-message other">
          <b>MeowCare ❤️</b>
          <p>If it lasts more than a couple of days, contact a vet!</p>
        </div>
      </div>
      <div class="chat-input-area">
        <input id="chatInput" type="text" placeholder="Type your message..." onkeydown="if(event.key==='Enter') sendChatMessage()">
        <button class="btn-primary" onclick="sendChatMessage()">Send</button>
      </div>
    </div>

    <div class="card">
      <h2>🚨 Rescue Request</h2>
      <p style="color:var(--text-soft);font-size:14px;margin-bottom:12px;">Cat spotted near Lusail needs food support.</p>
      <button class="btn-primary" onclick="addToCart('Send Rescue Food Kit', 50)">🎁 Send Rescue Kit — QAR 50</button>
    </div>

    <div class="card">
      <h2> Powered by Snoonu</h2>
      <div class="powered-row">
        <button class="btn-secondary" onclick="setActiveNav(document.querySelectorAll('.nav-btn')[2]); showShop()"> Cat Food</button>
        <button class="btn-secondary" onclick="setActiveNav(document.querySelectorAll('.nav-btn')[2]); showShop()"> Cat Toys</button>
        <button class="btn-secondary" onclick="setActiveNav(document.querySelectorAll('.nav-btn')[2]); showShop()"> Supplies</button>
        <button class="btn-secondary" onclick="showToast('🤖 AI Vet coming soon!')"> AI Vet</button>
      </div>
    </div>
  `;
}

function openCommunityChat() {
  const box = document.getElementById("communityChatBox");
  box.classList.remove("hidden");
  box.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeCommunityChat() {
  document.getElementById("communityChatBox").classList.add("hidden");
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const msgs = document.getElementById("chatMessages");
  const msg = input.value.trim();
  if (!msg) return;

  msgs.innerHTML += `
    <div class="chat-message user">
      <b>You 💗</b>
      <p>${msg}</p>
    </div>
  `;
  input.value = "";
  msgs.scrollTop = msgs.scrollHeight;
}

/* ===== INIT ===== */
showHome();