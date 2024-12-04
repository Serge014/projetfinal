document.addEventListener('DOMContentLoaded', () => {
    const cartBadge = document.getElementById('cart-badge');
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage
    let cartCount = cart.reduce((acc, item) => acc + item.quantity, 0); // Calculate initial cart count

    // Function to update the cart badge
    function updateCartBadge() {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'block' : 'none';
    }

    // Function to add a product to the cart
    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++; // Increase quantity if product already in cart
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new product to cart
        }

        cartCount++;
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
        updateCartBadge();
        console.log('Cart:', cart); // Debugging purpose
    }

    // Attach event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                id: parseInt(button.getAttribute('data-id')),
                name: button.getAttribute('data-name'),
                price: parseFloat(button.getAttribute('data-price')),
                image: button.getAttribute('data-image')
            };

            addToCart(product);
            alert(`${product.name} ajouté au panier !`);
        });
    });

    // Initialize cart badge
    updateCartBadge();
});
