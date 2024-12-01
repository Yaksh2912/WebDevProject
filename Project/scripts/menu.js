let cart = [];

function addToCart(category, item) {
    cart.push(item);
    alert(`Added ${item} from ${category} to the cart!`);
}

function viewCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        alert(`Items in your cart: ${cart.join(", ")}`);
    }
}

function goBack() {
    window.history.back();
}

async function addToCart(category, item) {
    try {
        const response = await fetch('/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, item }),
        });

        if (response.ok) {
            alert(`${item} has been added to your cart!`);
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (err) {
        console.error('Failed to add item to cart', err);
    }
}
