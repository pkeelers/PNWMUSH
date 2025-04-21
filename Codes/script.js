// Sample product data with categories
const products = [
    { id: 1, name: "Bluey Vuitton", price: 60.00, image: "https://via.placeholder.com/150?text=20ml+Syringe+with+Liquid+Culture+Yellowish+Liquid", category: "liquid-culture" },
    { id: 2, name: "Penis Envy", price: 60.00, image: "https://via.placeholder.com/150?text=20ml+Syringe+with+Liquid+Culture+Yellowish+Liquid", category: "liquid-culture" },
    { id: 3, name: "Albino Bluey Vuitton", price: 60.00, image: "https://via.placeholder.com/150?text=20ml+Syringe+with+Liquid+Culture+Yellowish+Liquid", category: "liquid-culture" },
    { id: 4, name: "Pony Poo Substrate", price: 60.00, image: "https://via.placeholder.com/150?text=Pony+Poo+Substrate", category: "substrate" },
  ];
  
  // Cart state
  let cart = [];
  
  // DOM elements
  const productGrid = document.getElementById("product-grid");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartToggle = document.getElementById("cart-toggle");
  const closeCart = document.getElementById("close-cart");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const checkoutModal = document.getElementById("checkout-modal");
  const cancelCheckout = document.getElementById("cancel-checkout");
  const submitCheckout = document.getElementById("submit-checkout");
  const categoryFilter = document.getElementById("category-filter");
  const homeTab = document.getElementById("home-tab");
  const productsTab = document.getElementById("products-tab");
  const aboutTab = document.getElementById("about-tab");
  const homeSection = document.getElementById("home-section");
  const productsSection = document.getElementById("products-section");
  const aboutSection = document.getElementById("about-section");
  
  // Render products based on filter
  function renderProducts(filter = "all") {
    let filteredProducts = products;
    if (filter !== "all") {
      filteredProducts = products.filter(product => product.category === filter);
    }
    productGrid.innerHTML = filteredProducts.map(product => `
      <div class="bg-white rounded-sm shadow-sm p-6 product-card">
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-sm mb-4">
        <h3 class="text-lg font-semibold text-black">${product.name}</h3>
        <p class="text-gray-600">$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})" class="w-full btn-primary mt-4">Add to Cart</button>
      </div>
    `).join("");
  }
  
  // Add to cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
  }
  
  // Update cart display
  function updateCart() {
    cartItems.innerHTML = cart.map(item => `
      <div class="flex justify-between items-center">
        <div>
          <p class="font-semibold text-black">${item.name}</p>
          <p class="text-gray-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
        <button onclick="removeFromCart(${item.id})" class="text-gray-600 hover:text-black">Remove</button>
      </div>
    `).join("");
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  }
  
  // Remove from cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  }
  
  // Toggle cart sidebar
  cartToggle.addEventListener("click", () => {
    cartSidebar.classList.toggle("translate-x-full");
  });
  
  closeCart.addEventListener("click", () => {
    cartSidebar.classList.add("translate-x-full");
  });
  
  // Checkout process
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    checkoutModal.classList.remove("hidden");
  });
  
  cancelCheckout.addEventListener("click", () => {
    checkoutModal.classList.add("hidden");
  });
  
  submitCheckout.addEventListener("click", () => {
    const name = document.getElementById("checkout-name").value;
    const address = document.getElementById("checkout-address").value;
    if (!name || !address) {
      alert("Please fill in all fields.");
      return;
    }
    alert("Order placed successfully!");
    cart = [];
    updateCart();
    checkoutModal.classList.add("hidden");
    cartSidebar.classList.add("translate-x-full");
  });
  
  // Filter products by category
  categoryFilter.addEventListener("change", (e) => {
    renderProducts(e.target.value);
  });
  
  // Tab navigation
  function showSection(section) {
    homeSection.classList.add("hidden");
    productsSection.classList.add("hidden");
    aboutSection.classList.add("hidden");
    section.classList.remove("hidden");
  
    homeTab.classList.remove("text-black", "font-semibold");
    productsTab.classList.remove("text-black", "font-semibold");
    aboutTab.classList.remove("text-black", "font-semibold");
  }
  
  homeTab.addEventListener("click", (e) => {
    e.preventDefault();
    showSection(homeSection);
    homeTab.classList.add("text-black", "font-semibold");
  });
  
  productsTab.addEventListener("click", (e) => {
    e.preventDefault();
    showSection(productsSection);
    productsTab.classList.add("text-black", "font-semibold");
  });
  
  aboutTab.addEventListener("click", (e) => {
    e.preventDefault();
    showSection(aboutSection);
    aboutTab.classList.add("text-black", "font-semibold");
  });
  
  // Initialize
  showSection(productsSection);
  productsTab.classList.add("text-black", "font-semibold");
  renderProducts();