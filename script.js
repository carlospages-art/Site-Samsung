// Base de dados de produtos
const products = [
    {
        id: 1,
        name: 'Galaxy S24 Ultra',
        category: 'premium',
        price: 7999,
        originalPrice: 8999,
        emoji: '📱',
        description: 'O smartphone mais avançado da Samsung',
        specs: ['6.8" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3', '12GB RAM', '256GB Storage', 'Câmera 200MP', 'Bateria 5000mAh']
    },
    {
        id: 2,
        name: 'Galaxy S24+',
        category: 'premium',
        price: 5999,
        originalPrice: 6999,
        emoji: '📱',
        description: 'Poder e elegância em um só dispositivo',
        specs: ['6.7" Dynamic AMOLED', 'Snapdragon 8 Gen 3', '12GB RAM', '256GB Storage', 'Câmera 50MP', 'Bateria 4900mAh']
    },
    {
        id: 3,
        name: 'Galaxy S24',
        category: 'premium',
        price: 4499,
        originalPrice: 5499,
        emoji: '📱',
        description: 'Inovação ao alcance de mais pessoas',
        specs: ['6.1" Dynamic AMOLED', 'Snapdragon 8 Gen 3', '8GB RAM', '128GB Storage', 'Câmera 50MP', 'Bateria 4000mAh']
    },
    {
        id: 4,
        name: 'Galaxy A55',
        category: 'intermediario',
        price: 2899,
        originalPrice: 3499,
        emoji: '📱',
        description: 'Desempenho confiável para o dia a dia',
        specs: ['6.5" Super AMOLED', 'Exynos 1380', '8GB RAM', '128GB Storage', 'Câmera 50MP', 'Bateria 5000mAh']
    },
    {
        id: 5,
        name: 'Galaxy A35',
        category: 'intermediario',
        price: 1999,
        originalPrice: 2499,
        emoji: '📱',
        description: 'Tecnologia Samsung em bom custo-benefício',
        specs: ['6.6" LCD', 'MediaTek Dimensity', '6GB RAM', '128GB Storage', 'Câmera 50MP', 'Bateria 5000mAh']
    },
    {
        id: 6,
        name: 'Galaxy A25',
        category: 'basico',
        price: 1299,
        originalPrice: 1699,
        emoji: '📱',
        description: 'Smartphone confiável e acessível',
        specs: ['6.5" LCD', 'Exynos 1280', '4GB RAM', '64GB Storage', 'Câmera 50MP', 'Bateria 5000mAh']
    },
    {
        id: 7,
        name: 'Galaxy M15',
        category: 'basico',
        price: 899,
        originalPrice: 1199,
        emoji: '📱',
        description: 'Bateria de longa duração, preço acessível',
        specs: ['6.5" LCD', 'MediaTek Helio', '4GB RAM', '64GB Storage', 'Câmera 50MP', 'Bateria 6000mAh']
    },
    {
        id: 8,
        name: 'Galaxy Z Fold6',
        category: 'premium',
        price: 8999,
        originalPrice: 9999,
        emoji: '📱',
        description: 'Smartphone dobrável de última geração',
        specs: ['7.6" Amoled Dobrável', 'Snapdragon 8 Gen 3', '12GB RAM', '256GB Storage', 'Câmera 50MP', 'Bateria 4400mAh']
    }
];

// Estado do carrinho
let cart = [];
let filteredProducts = [...products];

// Elementos DOM
const productList = document.getElementById('productList');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const closeCartBtn = document.querySelector('.close-cart');
const productModal = document.getElementById('productModal');
const closeModalBtn = document.querySelector('.close-modal');
const filterBtns = document.querySelectorAll('.filter-btn');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const searchInput = document.getElementById('searchInput');
const clearCartBtn = document.getElementById('clearCartBtn');

// Renderizar produtos
function renderProducts() {
    productList.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #757575;">Nenhum produto encontrado.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-body">
                <span class="product-category">${product.category.toUpperCase()}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-specs">
                    <strong>Destaque:</strong>
                    ${product.specs[0]}
                </div>
                <div class="product-price">
                    <span class="original-price">R$ ${product.originalPrice.toLocaleString('pt-BR')}</span>
                    <span class="final-price">R$ ${product.price.toLocaleString('pt-BR')}</span>
                </div>
                <button class="view-details-btn">Ver Detalhes</button>
            </div>
        `;
        
        productCard.addEventListener('click', () => openModal(product));
        productList.appendChild(productCard);
    });
}

// Abrir modal
function openModal(product) {
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalCategory').textContent = product.category.toUpperCase();
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = `R$ ${product.price.toLocaleString('pt-BR')}`;
    document.getElementById('modalOriginalPrice').textContent = `R$ ${product.originalPrice.toLocaleString('pt-BR')}`;
    document.getElementById('modalImage').textContent = product.emoji;
    document.getElementById('modalImage').style.fontSize = '200px';
    
    const specsList = document.getElementById('modalSpecs');
    specsList.innerHTML = '';
    product.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });
    
    const addBtn = document.getElementById('addToCartBtn');
    addBtn.onclick = () => addToCart(product);
    
    productModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeModal() {
    productModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Filtrar produtos
function filterProducts() {
    const activeCategory = document.querySelector('.filter-btn.active').dataset.filter;
    const maxPrice = parseInt(priceRange.value);
    const searchTerm = searchInput.value.toLowerCase();
    
    filteredProducts = products.filter(product => {
        const categoryMatch = activeCategory === 'todos' || product.category === activeCategory;
        const priceMatch = product.price <= maxPrice;
        const searchMatch = product.name.toLowerCase().includes(searchTerm) || 
                          product.description.toLowerCase().includes(searchTerm);
        
        return categoryMatch && priceMatch && searchMatch;
    });
    
    renderProducts();
}

// Adicionar ao carrinho
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    closeModal();
    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Atualizar carrinho
function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Seu carrinho está vazio</div>';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toLocaleString('pt-BR')}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">−</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remover</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `R$ ${total.toLocaleString('pt-BR')}`;
}

// Aumentar quantidade
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Diminuir quantidade
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            removeFromCart(productId);
        }
        updateCart();
    }
}

// Remover do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #00AA44;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// Event Listeners
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('show');
});

closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('show');
});

closeModalBtn.addEventListener('click', closeModal);

productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeModal();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProducts();
    });
});

priceRange.addEventListener('input', () => {
    priceValue.textContent = parseInt(priceRange.value).toLocaleString('pt-BR');
    filterProducts();
});

searchInput.addEventListener('input', filterProducts);

clearCartBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        if (confirm('Tem certeza que deseja limpar o carrinho?')) {
            cart = [];
            updateCart();
            showNotification('Carrinho limpo!');
        }
    }
});

// Inicializar
renderProducts();