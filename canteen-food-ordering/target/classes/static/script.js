document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:8080/menu")
        .then(response => response.json())
        .then(menuItems => {
            const menuContainer = document.getElementById("menuItems");
            menuItems.forEach(item => {
                const menuItemElement = document.createElement("div");
                menuItemElement.className = "menu-item";
                menuItemElement.innerHTML = `
                    <img src="https://via.placeholder.com/150" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>₹${item.price}</p>
                    <button onclick="addToOrder('${item.name}', ${item.price}, this)">Add to Order</button>
                `;
                menuContainer.appendChild(menuItemElement);
            });
        })
        .catch(error => console.error("Error fetching menu items:", error));
});

let order = {
    items: [],
    total: 0
};

function addToOrder(itemName, itemPrice, buttonElement) {
    const existingItem = order.items.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price += itemPrice;
        updateQuantityDisplay(buttonElement, existingItem.quantity);
    } else {
        order.items.push({ name: itemName, price: itemPrice, quantity: 1 });
        updateButtonToQuantityControls(buttonElement, itemName, itemPrice, 1);
    }
    order.total += itemPrice;
    updateCartIndicator();
}

function updateQuantityDisplay(buttonElement, quantity) {
    const parent = buttonElement.parentElement;
    parent.innerHTML = `
        <div class="quantity-controls">
            <button onclick="decreaseQuantity('${buttonElement.getAttribute('data-item')}', ${buttonElement.getAttribute('data-price')}, this)">-</button>
            <span>${quantity}</span>
            <button onclick="increaseQuantity('${buttonElement.getAttribute('data-item')}', ${buttonElement.getAttribute('data-price')}, this)">+</button>
        </div>
    `;
}

function updateButtonToQuantityControls(buttonElement, itemName, itemPrice, quantity) {
    buttonElement.setAttribute('data-item', itemName);
    buttonElement.setAttribute('data-price', itemPrice);
    buttonElement.outerHTML = `
        <div class="quantity-controls">
            <button onclick="decreaseQuantity('${itemName}', ${itemPrice}, this)">-</button>
            <span>${quantity}</span>
            <button onclick="increaseQuantity('${itemName}', ${itemPrice}, this)">+</button>
        </div>
    `;
}

function increaseQuantity(itemName, itemPrice, buttonElement) {
    const existingItem = order.items.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price += itemPrice;
        updateQuantityDisplay(buttonElement, existingItem.quantity);
        order.total += itemPrice;
        updateCartIndicator();
    }
}

function decreaseQuantity(itemName, itemPrice, buttonElement) {
    const existingItem = order.items.find(item => item.name === itemName);
    if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.price -= itemPrice;
        updateQuantityDisplay(buttonElement, existingItem.quantity);
        order.total -= itemPrice;
        updateCartIndicator();
    } else if (existingItem && existingItem.quantity === 1) {
        order.items = order.items.filter(item => item.name !== itemName);
        buttonElement.parentElement.parentElement.innerHTML = `
            <button onclick="addToOrder('${itemName}', ${itemPrice}, this)">Add to Order</button>
        `;
        order.total -= itemPrice;
        updateCartIndicator();
    }
}

function updateCartIndicator() {
    const cartCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = cartCount;
    const placeOrderButton = document.getElementById("placeOrderButton");
    if (cartCount > 0) {
        document.getElementById("cartIndicator").classList.remove("hidden");
        placeOrderButton.classList.remove("hidden");
        placeOrderButton.disabled = false;
    } else {
        document.getElementById("cartIndicator").classList.add("hidden");
        placeOrderButton.classList.add("hidden");
        placeOrderButton.disabled = true;
    }
}

document.getElementById("placeOrderButton").addEventListener("click", function() {
    document.getElementById("orderForm").classList.remove("hidden");
});

document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const deliveryAddress = document.getElementById("deliveryAddress").value;

    const orderSummaryTableBody = document.querySelector("#orderSummaryTable tbody");
    orderSummaryTableBody.innerHTML = "";
    order.items.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price}</td>
        `;
        orderSummaryTableBody.appendChild(row);
    });
    document.getElementById("orderTotal").textContent = order.total;

    document.getElementById("orderSummary").classList.remove("hidden");
    document.getElementById("payNowButton").classList.remove("hidden");
});

document.getElementById("payNowButton").addEventListener("click", function() {
    // Simulate payment process
    setTimeout(function() {
        const paymentSuccess = Math.random() > 0.5;
        if (paymentSuccess) {
            document.getElementById("orderConfirmation").textContent = "Payment Successful! Your order is being processed.";
            document.getElementById("orderConfirmation").classList.remove("hidden");
            order = { items: [], total: 0 };
            updateCartIndicator();
        } else {
            alert("Payment failed. Please try again.");
            document.getElementById("payNowButton").classList.remove("hidden");
        }
    }, 1000);
});
