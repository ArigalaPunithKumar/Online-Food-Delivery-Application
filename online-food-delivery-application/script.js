// South Indian Food Data - Bangalore
const foodData = [
    {
        id: 1,
        name: "Benne Masala Dosa",
        restaurant: "Vidyarthi Bhavan",
        description: "Legendary crispy, thick dosa roasted in rich butter with spicy potato filling.",
        price: 85,
        category: "breakfast",
        type: "veg",
        rating: 4.9,
        image: "./assets/dosa.png",
        combo: {
            name: "Filter Coffee",
            price: 25,
            id: 101,
            image: "./assets/restaurant.png"
        }
    },
    {
        id: 2,
        name: "Meghana Special Biryani",
        restaurant: "Meghana Foods",
        description: "Aromatic basmati rice cooked with tender chicken and secret spices.",
        price: 320,
        category: "biryani",
        type: "non-veg",
        rating: 4.8,
        image: "./assets/biryani.png",
        combo: {
            name: "Onions & Raita",
            price: 20,
            id: 102,
            image: "./assets/idli.png"
        }
    },
    {
        id: 3,
        name: "Butter Masala Dosa",
        restaurant: "CTR",
        description: "Crisp dosa served with signature coconut chutney and sambar.",
        price: 75,
        category: "breakfast",
        type: "veg",
        rating: 4.8,
        image: "./assets/dosa.png",
        combo: null
    },
    {
        id: 4,
        name: "Mutton Ghee Roast",
        restaurant: "Empire Restaurant",
        description: "Spicy and tangy Mangalorean style mutton roasted in pure ghee.",
        price: 380,
        category: "curries",
        type: "non-veg",
        rating: 4.7,
        image: "./assets/biryani.png",
        combo: {
            name: "2 Coin Parottas",
            price: 40,
            id: 104,
            image: "./assets/dosa.png"
        }
    },
    {
        id: 5,
        name: "Idli Vada Sambar Dip",
        restaurant: "MTR",
        description: "Soft idlis and crispy vada submerged in flavorful lentil sambar.",
        price: 90,
        category: "breakfast",
        type: "veg",
        rating: 4.6,
        image: "./assets/idli.png",
        combo: null
    },
    {
        id: 6,
        name: "Chicken Kabab",
        restaurant: "Empire Restaurant",
        description: "Crispy, deep-fried chicken marinated in a blend of South Indian spices.",
        price: 210,
        category: "snacks",
        type: "non-veg",
        rating: 4.7,
        image: "./assets/biryani.png",
        combo: null
    },
    {
        id: 7,
        name: "Paneer Butter Masala",
        restaurant: "Meghana Foods",
        description: "Rich and creamy curry made with fresh cottage cheese.",
        price: 240,
        category: "curries",
        type: "veg",
        rating: 4.5,
        image: "./assets/dosa.png",
        combo: null
    },
    {
        id: 8,
        name: "Gobi Manchurian",
        restaurant: "Empire Restaurant",
        description: "Indo-Chinese style crispy cauliflower tossed in a spicy sauce.",
        price: 150,
        category: "snacks",
        type: "veg",
        rating: 4.4,
        image: "./assets/idli.png",
        combo: null
    },
    {
        id: 9,
        name: "Andhra Chicken Meal",
        restaurant: "Nagarjuna",
        description: "Spicy Andhra style chicken served with rice, pappu, and rasam.",
        price: 290,
        category: "biryani",
        type: "non-veg",
        rating: 4.9,
        image: "./assets/biryani.png",
        combo: {
            name: "Chili Chicken Starter",
            price: 150,
            id: 109,
            image: "./assets/biryani.png"
        }
    },
    {
        id: 10,
        name: "Death By Chocolate",
        restaurant: "Corner House",
        description: "Iconic DBC with vanilla ice cream, chocolate sponge, peanuts and hot fudge.",
        price: 260,
        category: "dessert",
        type: "veg",
        rating: 5.0,
        image: "./assets/dessert.png",
        combo: null
    }
];

const categoriesData = [
    { id: "breakfast", name: "Breakfast", image: "./assets/idli.png" },
    { id: "biryani", name: "Biryani", image: "./assets/biryani.png" },
    { id: "curries", name: "Curries", image: "./assets/restaurant.png" },
    { id: "snacks", name: "Snacks", image: "./assets/dosa.png" },
    { id: "dessert", name: "Dessert", image: "./assets/dessert.png" }
];

const restaurantsList = [
    { name: "Vidyarthi Bhavan", desc: "Legendary South Indian", image: "./assets/restaurant.png" },
    { name: "Meghana Foods", desc: "Authentic Biryani", image: "./assets/restaurant.png" },
    { name: "CTR", desc: "Iconic Benne Dosa", image: "./assets/restaurant.png" },
    { name: "Empire Restaurant", desc: "Late Night Cravings", image: "./assets/restaurant.png" },
    { name: "MTR", desc: "Heritage Tiffins", image: "./assets/restaurant.png" },
    { name: "Nagarjuna", desc: "Andhra Style Meals", image: "./assets/restaurant.png" },
    { name: "Corner House", desc: "Famous Desserts", image: "./assets/restaurant.png" }
];

// App State
let cart = [];
const DELIVERY_FEE = 40; // INR
let currentItemForCombo = null; // Stores item temporarily when combo modal is open

// Filter States
let currentCategory = "all";
let currentRestaurant = "all";
let vegOnly = false;

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const categoryList = document.getElementById('category-list');
const verticalRestList = document.getElementById('vertical-restaurant-list');
const restListModal = document.getElementById('restaurants-list-modal');
const closeRestListBtn = document.getElementById('close-rest-list-modal');
const filterBtns = document.querySelectorAll('.filter-btn');
const restaurantSelect = document.getElementById('restaurant-select');
const vegOnlyToggle = document.getElementById('veg-only-toggle');

// Cart DOM
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const cartBadge = document.getElementById('cart-badge');
const subtotalEl = document.getElementById('subtotal-price');
const deliveryFeeEl = document.getElementById('delivery-fee');
const totalEl = document.getElementById('total-price');

// Modal DOM
const comboModalOverlay = document.getElementById('combo-modal-overlay');
const closeComboModal = document.getElementById('close-combo-modal');
const btnSkipCombo = document.getElementById('btn-skip-combo');
const btnAddCombo = document.getElementById('btn-add-combo');
const comboBody = document.getElementById('combo-body');

const restaurantModalOverlay = document.getElementById('restaurant-modal-overlay');
const closeRestaurantModal = document.getElementById('close-restaurant-modal');
const restaurantModalTitle = document.getElementById('restaurant-modal-title');
const restaurantModalGrid = document.getElementById('restaurant-modal-grid');

// Initialize App
function initApp() {
    renderCategories();
    renderRestaurants();
    applyFilters();
    setupEventListeners();
}

function renderCategories() {
    if(categoryList) {
        categoryList.innerHTML = categoriesData.map(cat => `
            <div class="category-card" onclick="setCategory('${cat.id}')">
                <img src="${cat.image}" alt="${cat.name}">
                <h3>${cat.name}</h3>
            </div>
        `).join('');
    }
}

function renderRestaurants() {
    if(verticalRestList) {
        verticalRestList.innerHTML = restaurantsList.map(rest => `
            <div class="vertical-rest-card" onclick="selectRestaurantFromList('${rest.name}')">
                <img src="${rest.image}" alt="${rest.name}" class="vertical-rest-img">
                <div class="vertical-rest-info">
                    <h4>${rest.name}</h4>
                    <p>${rest.desc}</p>
                </div>
            </div>
        `).join('');
    }
}

function selectRestaurantFromList(name) {
    if(restListModal) restListModal.classList.remove('active');
    openRestaurantModal(name);
}

function setCategory(categoryId) {
    currentCategory = categoryId;
    filterBtns.forEach(b => {
        b.classList.remove('active');
        if(b.getAttribute('data-filter') === categoryId) {
            b.classList.add('active');
        }
    });
    applyFilters();
    document.querySelector('.menu-section').scrollIntoView({ behavior: 'smooth' });
}

function applyFilters() {
    let filteredData = foodData;
    
    if (currentCategory !== "all") {
        filteredData = filteredData.filter(item => item.category === currentCategory);
    }
    
    if (currentRestaurant !== "all") {
        filteredData = filteredData.filter(item => item.restaurant === currentRestaurant);
    }
    
    if (vegOnly) {
        filteredData = filteredData.filter(item => item.type === "veg");
    }

    renderMenu(filteredData, menuGrid);
}

// Render Food Items
function renderMenu(data, container) {
    if(data.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">No dishes found for the selected filters.</div>`;
        return;
    }

    container.innerHTML = data.map(item => `
        <div class="food-card">
            <div class="food-img-wrap" onclick="openRestaurantModal('${item.restaurant}')">
                <div class="food-rating">
                    <i class='bx bxs-star'></i> ${item.rating}
                </div>
                <div class="diet-indicator ${item.type}">
                    <div class="diet-dot"></div>
                </div>
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="food-info">
                <div class="restaurant-name">${item.restaurant}</div>
                <div class="food-title">
                    <h3>${item.name}</h3>
                </div>
                <p class="food-desc">${item.description}</p>
                <div class="food-bottom">
                    <div class="food-price">₹${item.price}</div>
                    <button class="add-to-cart" onclick="handleAddClick(${item.id})">
                        <i class='bx bx-plus'></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Event Listeners
function setupEventListeners() {
    // Category pill buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            setCategory(e.target.getAttribute('data-filter'));
        });
    });

    // Restaurant dropdown
    restaurantSelect.addEventListener('change', (e) => {
        currentRestaurant = e.target.value;
        applyFilters();
    });

    // Veg Only toggle
    vegOnlyToggle.addEventListener('change', (e) => {
        vegOnly = e.target.checked;
        applyFilters();
    });

    // Cart toggle logic
    cartToggle.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    
    // Combo Modal events
    closeComboModal.addEventListener('click', () => {
        comboModalOverlay.classList.remove('active');
        currentItemForCombo = null;
    });
    
    btnSkipCombo.addEventListener('click', () => {
        addToCart(currentItemForCombo.id); // Add just the item
        comboModalOverlay.classList.remove('active');
        currentItemForCombo = null;
    });
    
    btnAddCombo.addEventListener('click', () => {
        // Add item
        addToCart(currentItemForCombo.id, true);
        // Add combo
        const comboMockItem = {
            id: currentItemForCombo.combo.id,
            name: currentItemForCombo.combo.name + ` (with ${currentItemForCombo.name})`,
            price: currentItemForCombo.combo.price,
            image: currentItemForCombo.combo.image,
            restaurant: currentItemForCombo.restaurant,
            type: currentItemForCombo.type
        };
        addDirectItemToCart(comboMockItem);
        comboModalOverlay.classList.remove('active');
        currentItemForCombo = null;
    });

    if(closeRestListBtn) {
        closeRestListBtn.addEventListener('click', () => {
            restListModal.classList.remove('active');
        });
    }

    // Restaurant Modal events
    closeRestaurantModal.addEventListener('click', () => {
        restaurantModalOverlay.classList.remove('active');
    });
}

// Modals Logic
function openRestaurantModal(restaurantName) {
    restaurantModalTitle.textContent = restaurantName;
    const restaurantDishes = foodData.filter(item => item.restaurant === restaurantName);
    renderMenu(restaurantDishes, restaurantModalGrid);
    restaurantModalOverlay.classList.add('active');
}

function openRestListModal() {
    if(restListModal) {
        restListModal.classList.add('active');
    }
}

function handleAddClick(id) {
    const item = foodData.find(f => f.id === id);
    if (item.combo) {
        currentItemForCombo = item;
        showComboModal(item);
    } else {
        addToCart(id);
    }
}

function showComboModal(item) {
    comboBody.innerHTML = `
        <div class="combo-suggestion-card">
            <div style="display:flex; gap:12px; align-items:center;">
                <img src="${item.combo.image}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">
                <div class="combo-suggestion-info">
                    <h4>${item.combo.name}</h4>
                    <p>Suggested with ${item.name}</p>
                </div>
            </div>
            <div class="combo-suggestion-price">+₹${item.combo.price}</div>
        </div>
    `;
    comboModalOverlay.classList.add('active');
}

function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Cart Logic
function addDirectItemToCart(itemObj) {
    const existingItem = cart.find(item => item.id === itemObj.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...itemObj, quantity: 1 });
    }
    updateCart();
}

function addToCart(id, silent = false) {
    const foodItem = foodData.find(item => item.id === id);
    addDirectItemToCart(foodItem);
    
    if(!silent) {
        cartToggle.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartToggle.style.transform = 'scale(1)';
        }, 200);
    }
}

function changeQuantity(id, change) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        updateCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    // Toggle Empty state message
    if (cart.length === 0) {
        emptyCartMsg.style.display = 'flex';
        Array.from(cartItemsContainer.children).forEach(child => {
            if (child.id !== 'empty-cart-msg') child.remove();
        });
    } else {
        emptyCartMsg.style.display = 'none';
        renderCartItems();
    }

    calculateTotal();
}

function renderCartItems() {
    // Remove current items except empty msg
    Array.from(cartItemsContainer.children).forEach(child => {
        if (child.id !== 'empty-cart-msg') child.remove();
    });

    // Create item elements
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${(item.price * item.quantity)}</div>
            </div>
            <div class="cart-item-actions">
                <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)"><i class='bx bx-minus'></i></button>
                <span class="cart-item-qty">${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)"><i class='bx bx-plus'></i></button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class='bx bx-trash'></i>
            </button>
        `;
        cartItemsContainer.appendChild(itemEl);
    });
}

function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const fee = cart.length > 0 ? DELIVERY_FEE : 0;
    const total = subtotal + fee;

    subtotalEl.textContent = `₹${subtotal}`;
    deliveryFeeEl.textContent = `₹${fee}`;
    totalEl.textContent = `₹${total}`;
}

// Start
initApp();
