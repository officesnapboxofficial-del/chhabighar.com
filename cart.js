(function () {
  const ORDERS_KEY = "cgprints_orders";

  function setCheckoutMessage(node, text, type) {
    if (!node) {
      return;
    }
    node.textContent = text;
    node.className = "api-status" + (type ? " " + type : "");
  }

  function saveLocalOrder(order) {
    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
      const next = Array.isArray(existing) ? existing : [];
      next.push(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
    } catch (err) {
      // ignore storage errors
    }
  }

  function renderCartPage() {
    if (!window.CGCart) {
      return;
    }

    const cartItemsNode = document.getElementById("cartItems");
    const subtotalNode = document.getElementById("cartSubtotal");
    const shippingNode = document.getElementById("shipping");
    const totalNode = document.getElementById("cartTotal");
    const clearBtn = document.getElementById("clearCart");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const checkoutMessageNode = document.getElementById("checkoutMessage");

    if (
      !cartItemsNode ||
      !subtotalNode ||
      !totalNode ||
      !clearBtn ||
      !shippingNode ||
      !checkoutBtn ||
      !checkoutMessageNode
    ) {
      return;
    }

    function refresh() {
      const cart = window.CGCart.getCart();
      let subtotal = 0;
      cartItemsNode.innerHTML = "";

      if (!cart.length) {
        cartItemsNode.innerHTML =
          "<p class='list-muted'>Your cart is empty. Go to Home and add products.</p>";
      }

      cart.forEach(function (item, index) {
        subtotal += item.price * item.qty;

        const card = document.createElement("div");
        card.className = "cart-item";
        card.innerHTML =
          "<div class='cart-item-head'>" +
          "<strong>" +
          item.name +
          "</strong>" +
          "<button class='qty-btn' data-remove='" +
          index +
          "' aria-label='Remove item'>x</button>" +
          "</div>" +
          "<div>Price: Rs." +
          item.price +
          "</div>" +
          "<div class='qty-row'>" +
          "<button class='qty-btn' data-dec='" +
          index +
          "'>-</button>" +
          "<strong>" +
          item.qty +
          "</strong>" +
          "<button class='qty-btn' data-inc='" +
          index +
          "'>+</button>" +
          "</div>";
        cartItemsNode.appendChild(card);
      });

      const shipping = subtotal > 0 ? 49 : 0;
      const total = subtotal + shipping;

      subtotalNode.textContent = Math.round(subtotal);
      shippingNode.textContent = Math.round(shipping);
      totalNode.textContent = Math.round(total);
      window.CGCart.updateCartCount();
    }

    function submitOrder() {
      const cart = window.CGCart.getCart();
      if (!cart.length) {
        setCheckoutMessage(checkoutMessageNode, "Cart is empty.", "warn");
        return;
      }

      const customerName = document.getElementById("checkoutName").value.trim();
      const customerPhone = document.getElementById("checkoutPhone").value.trim();
      const customerEmail = document.getElementById("checkoutEmail").value.trim();
      const customerAddress = document.getElementById("checkoutAddress").value.trim();
      const customerCity = document.getElementById("checkoutCity").value.trim();

      if (!customerName || !customerPhone) {
        setCheckoutMessage(
          checkoutMessageNode,
          "Please fill name and phone before checkout.",
          "warn"
        );
        return;
      }

      const subtotal = cart.reduce(function (sum, item) {
        return sum + item.price * item.qty;
      }, 0);
      const shipping = subtotal > 0 ? 49 : 0;
      const total = subtotal + shipping;
      const orderId = "CG-" + Date.now();

      saveLocalOrder({
        order_id: orderId,
        customer: {
          name: customerName,
          phone: customerPhone,
          email: customerEmail || null
        },
        billing: {
          address: customerAddress || null,
          city: customerCity || null
        },
        items: cart,
        subtotal: subtotal,
        shipping: shipping,
        total: total,
        created_at: new Date().toISOString()
      });

      window.CGCart.saveCart([]);
      refresh();
      setCheckoutMessage(
        checkoutMessageNode,
        "Order saved locally (" + orderId + "). Track it in Orders tab.",
        "success"
      );
      setTimeout(function () {
        window.location.href = "orders.html?order=" + encodeURIComponent(orderId);
      }, 900);
    }

    cartItemsNode.addEventListener("click", function (event) {
      const cart = window.CGCart.getCart();
      const removeIndex = event.target.getAttribute("data-remove");
      const decIndex = event.target.getAttribute("data-dec");
      const incIndex = event.target.getAttribute("data-inc");

      if (removeIndex !== null) {
        cart.splice(Number(removeIndex), 1);
      }

      if (decIndex !== null) {
        const i = Number(decIndex);
        cart[i].qty -= 1;
        if (cart[i].qty <= 0) {
          cart.splice(i, 1);
        }
      }

      if (incIndex !== null) {
        const i = Number(incIndex);
        cart[i].qty += 1;
      }

      window.CGCart.saveCart(cart);
      refresh();
    });

    clearBtn.addEventListener("click", function () {
      window.CGCart.saveCart([]);
      refresh();
      setCheckoutMessage(checkoutMessageNode, "", "");
    });

    checkoutBtn.addEventListener("click", submitOrder);

    refresh();
  }

  document.addEventListener("DOMContentLoaded", renderCartPage);
})();
