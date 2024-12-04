document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage

    // Function to update total
    function updateCartTotal() {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        cartTotalElement.textContent = `Total: ${total}€`;
    }

    // Render the cart items
    function renderCart() {
        cartItemsContainer.innerHTML = ""; // Clear container
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = "cart-item";

            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Prix: ${item.price}€</p>
                    <div class="quantity-control">
                        <button class="btn-minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn-plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="delete-btn" data-id="${item.id}">Supprimer</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });

        updateCartTotal();
    }

    // Handle cart actions (add, subtract, delete)
    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const itemId = parseInt(target.dataset.id, 10);

        if (target.classList.contains('btn-plus')) {
            const item = cart.find(item => item.id === itemId);
            item.quantity++;
        } else if (target.classList.contains('btn-minus')) {
            const item = cart.find(item => item.id === itemId);
            if (item.quantity > 1) item.quantity--;
        } else if (target.classList.contains('delete-btn')) {
            cart = cart.filter(item => item.id !== itemId);
        }

        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
        renderCart();
    });

    renderCart(); // Initial render
});
