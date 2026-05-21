(function () {
  let autoSyncTimer = null;
  const CART_KEY = "cgprints_cart";
  const WISHLIST_KEY = "cgprints_wishlist";
  const ORDERS_KEY = "cgprints_orders";
  const SEARCH_KEY = "cgprints_search_term";
  const PRODUCT_CACHE_KEY = "cgprints_products_cache";
  const WHATSAPP_NUMBER = "919876543210";
  const WHATSAPP_MESSAGE = "Hi ChhabiGhar, I want to place a custom order.";
  const WHATSAPP_URL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(WHATSAPP_MESSAGE);
  const DEFAULT_PRODUCT_IMAGE = "banner/d1e43480-092e-4eba-93ea-4674bd090c20.png";
  const DEFAULT_CATEGORY_MENU = [
    {
      slug: "personalized-gifts",
      label: "Personalized Gifts",
      icon: "🎁",
      image: "CTEGORY/KEYCHAIN.png",
      subcategories: [
        "Customise Frame",
        "Keychain",
        "Customise Coffee Mug",
        "T-Shirt Print",
        "Customise Pillow Print",
        "Customise Wall Clock"
      ]
    },
    {
      slug: "led-and-premium-products",
      label: "LED & Premium Products",
      icon: "💡",
      image: "CTEGORY/LED FRAME.png",
      subcategories: [
        "LED Frame",
        "Customise Rotating LED Lamp",
        "LED Night Lamp",
        "LED Magic Mirror"
      ]
    },
    {
      slug: "printing-services",
      label: "Printing Services",
      icon: "🖨️",
      image: "banner/d1e43480-092e-4eba-93ea-4674bd090c20.png",
      subcategories: [
        "Visiting Card",
        "Customise Sticker Print",
        "Customise Badge"
      ]
    },
    {
      slug: "special-materials",
      label: "Special Materials",
      icon: "🧊",
      image: "CTEGORY/PHOTO FRAME.png",
      subcategories: ["Customise Stone Print", "Acrylic Magnetic Frame"]
    }
  ];
  const CATEGORY_MENU = buildInitialCategoryMenu();
  const CUSTOM_PRODUCTS = [
    {
      product_id: 20001,
      title: "Customise Frame",
      category_name: "Personalized Gifts",
      current_price: 399,
      previous_price: 599,
      is_feature: 1,
      feature_image: "CTEGORY/PHOTO FRAME.png"
    },
    {
      product_id: 20002,
      title: "Keychain",
      category_name: "Personalized Gifts",
      current_price: 149,
      previous_price: 249,
      is_feature: 1,
      feature_image: "CTEGORY/KEYCHAIN.png"
    },
    {
      product_id: 20003,
      title: "Customise Coffee Mug",
      category_name: "Personalized Gifts",
      current_price: 299,
      previous_price: 449,
      is_feature: 1,
      feature_image: "CTEGORY/MUG.png"
    },
    {
      product_id: 20004,
      title: "T-Shirt Print",
      category_name: "Personalized Gifts",
      current_price: 499,
      previous_price: 699,
      is_feature: 1,
      feature_image: "CTEGORY/T SHIRT.png"
    },
    {
      product_id: 20005,
      title: "Customise Pillow Print",
      category_name: "Personalized Gifts",
      current_price: 349,
      previous_price: 499,
      is_feature: 1,
      feature_image: "CTEGORY/PILLOW.png"
    },
    {
      product_id: 20006,
      title: "Customise Wall Clock",
      category_name: "Personalized Gifts",
      current_price: 599,
      previous_price: 799,
      is_feature: 0,
      feature_image: "CTEGORY/WALL CLOCK.png"
    },
    {
      product_id: 20007,
      title: "LED Frame",
      category_name: "LED & Premium Products",
      current_price: 699,
      previous_price: 999,
      is_feature: 1,
      feature_image: "CTEGORY/LED FRAME.png"
    },
    {
      product_id: 20008,
      title: "Customise Rotating LED Lamp",
      category_name: "LED & Premium Products",
      current_price: 899,
      previous_price: 1199,
      is_feature: 1,
      feature_image: "CTEGORY/LED FRAME.png"
    },
    {
      product_id: 20009,
      title: "LED Night Lamp",
      category_name: "LED & Premium Products",
      current_price: 649,
      previous_price: 899,
      is_feature: 0,
      feature_image: "CTEGORY/LED FRAME.png"
    },
    {
      product_id: 20010,
      title: "LED Magic Mirror",
      category_name: "LED & Premium Products",
      current_price: 999,
      previous_price: 1399,
      is_feature: 1,
      feature_image: "CTEGORY/LED FRAME.png"
    },
    {
      product_id: 20011,
      title: "Visiting Card",
      category_name: "Printing Services",
      current_price: 199,
      previous_price: 299,
      is_feature: 0,
      feature_image: "banner/d1e43480-092e-4eba-93ea-4674bd090c20.png"
    },
    {
      product_id: 20012,
      title: "Customise Sticker Print",
      category_name: "Printing Services",
      current_price: 149,
      previous_price: 249,
      is_feature: 0,
      feature_image: "banner/d1e43480-092e-4eba-93ea-4674bd090c20.png"
    },
    {
      product_id: 20013,
      title: "Customise Stone Print",
      category_name: "Special Materials",
      current_price: 549,
      previous_price: 749,
      is_feature: 0,
      feature_image: "CTEGORY/PHOTO FRAME.png"
    },
    {
      product_id: 20014,
      title: "Acrylic Magnetic Frame",
      category_name: "Special Materials",
      current_price: 499,
      previous_price: 699,
      is_feature: 0,
      feature_image: "CTEGORY/PHOTO FRAME.png"
    },
    {
      product_id: 20015,
      title: "Customise Badge",
      category_name: "Printing Services",
      current_price: 99,
      previous_price: 149,
      is_feature: 0,
      feature_image: "banner/d1e43480-092e-4eba-93ea-4674bd090c20.png"
    }
  ];
  const FALLBACK_BLOGS = [
    {
      title: "7 Personalized Gift Ideas for 2026",
      content:
        "Thoughtful products that work across birthdays, festivals, and office celebrations.",
      image: ""
    },
    {
      title: "How to Choose Durable School Name Labels",
      content:
        "Material, adhesive, and print options every parent should verify before ordering.",
      image: ""
    },
    {
      title: "Turning Family Photos Into Modern Wall Decor",
      content:
        "Frame sizes, layout logic, and finish selection for premium home styling.",
      image: ""
    }
  ];

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function toNumber(value, fallback) {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
  }

  function normalizeCartItem(item) {
    return {
      productId: item && item.productId != null ? Number(item.productId) : null,
      name: item && item.name ? String(item.name) : "Untitled",
      price: toNumber(item && item.price, 0),
      qty: Math.max(1, toNumber(item && item.qty, 1)),
      image: item && item.image ? String(item.image) : DEFAULT_PRODUCT_IMAGE
    };
  }

  function getCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.map(normalizeCartItem);
    } catch (err) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart.map(normalizeCartItem)));
    updateCartCount();
  }

  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);
    document.querySelectorAll(".js-cart-count").forEach(function (node) {
      node.textContent = count;
    });
  }

  function addToCart(item) {
    const nextItem = normalizeCartItem(item);
    const cart = getCart();
    const found = cart.find(function (existing) {
      if (nextItem.productId != null && existing.productId != null) {
        return existing.productId === nextItem.productId;
      }
      return existing.name === nextItem.name;
    });
    if (found) {
      found.qty += nextItem.qty;
    } else {
      cart.push(nextItem);
    }
    saveCart(cart);
  }

  function normalizeWishlistItem(item) {
    return {
      productId: item && item.productId != null ? Number(item.productId) : null,
      name: item && item.name ? String(item.name) : "Untitled",
      price: toNumber(item && item.price, 0),
      image: item && item.image ? String(item.image) : DEFAULT_PRODUCT_IMAGE,
      category: item && item.category ? String(item.category) : "general"
    };
  }

  function getWishlist() {
    try {
      const parsed = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.map(normalizeWishlistItem);
    } catch (err) {
      return [];
    }
  }

  function saveWishlist(items) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify((items || []).map(normalizeWishlistItem)));
    updateWishlistCount();
  }

  function updateWishlistCount() {
    const count = getWishlist().length;
    document.querySelectorAll(".fixed-bottom-nav [data-nav='wishlist']").forEach(function (link) {
      if (!link.querySelector(".js-wishlist-count")) {
        const badge = document.createElement("span");
        badge.className = "js-wishlist-count";
        badge.textContent = "0";
        link.appendChild(badge);
      }
    });
    document.querySelectorAll(".js-wishlist-count").forEach(function (node) {
      node.textContent = count;
    });
  }

  function isInWishlist(productId, name) {
    const needleId = Number(productId || 0);
    const needleName = String(name || "");
    return getWishlist().some(function (item) {
      if (needleId > 0 && item.productId != null) {
        return Number(item.productId) === needleId;
      }
      return item.name === needleName;
    });
  }

  function toggleWishlistItem(item) {
    const nextItem = normalizeWishlistItem(item);
    const wishlist = getWishlist();
    const idx = wishlist.findIndex(function (existing) {
      if (nextItem.productId != null && existing.productId != null) {
        return Number(existing.productId) === Number(nextItem.productId);
      }
      return existing.name === nextItem.name;
    });
    if (idx >= 0) {
      wishlist.splice(idx, 1);
      saveWishlist(wishlist);
      return false;
    }
    wishlist.push(nextItem);
    saveWishlist(wishlist);
    return true;
  }

  function buildWhatsAppEnquiryUrl(productName) {
    const name = String(productName || "this product").trim() || "this product";
    const message = "Hi, I want enquiry for " + name;
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  function openWhatsAppEnquiry(productName) {
    window.location.href = buildWhatsAppEnquiryUrl(productName);
  }

  function buildProductImage(featureImage) {
    if (!featureImage) {
      return DEFAULT_PRODUCT_IMAGE;
    }
    if (/^https?:\/\//i.test(featureImage)) {
      return featureImage;
    }
    if (
      /^(?:\.{0,2}\/)?(?:banner|CTEGORY)\//i.test(featureImage) ||
      /^\/?(?:banner|CTEGORY)\//i.test(featureImage)
    ) {
      return featureImage.replace(/^\/+/, "");
    }
    return DEFAULT_PRODUCT_IMAGE;
  }

  function isHomePage() {
    const path = String(window.location.pathname || "").toLowerCase();
    return path.endsWith("/index.html") || path.endsWith("/") || path === "";
  }

  function isProductsPage() {
    const path = String(window.location.pathname || "").toLowerCase();
    return path.endsWith("/products.html");
  }

  function buildInitialCategoryMenu() {
    return DEFAULT_CATEGORY_MENU.slice();
  }

  function setStatus(node, text, type) {
    if (!node) {
      return;
    }
    node.textContent = text;
    node.className = "api-status" + (type ? " " + type : "");
  }

  function saveProductCache(products) {
    try {
      localStorage.setItem(PRODUCT_CACHE_KEY, JSON.stringify(products || []));
    } catch (err) {
      // ignore storage errors
    }
  }

  function getProductCache() {
    try {
      const parsed = JSON.parse(localStorage.getItem(PRODUCT_CACHE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function buildProductsErrorMessage(error) {
    const protocol = String(window.location.protocol || "").toLowerCase();

    if (protocol === "file:") {
      return "file:// mode me site load karne par issue aa sakta hai. Isse localhost se open karein.";
    }

    return "Products load nahi ho paaye. Page refresh karke dobara try karein.";
  }

  function getFallbackProducts() {
    return CUSTOM_PRODUCTS.slice();
  }

  function getSearchQuery() {
    let fromUrl = "";
    try {
      const params = new URLSearchParams(window.location.search || "");
      fromUrl = String(params.get("q") || "").trim();
    } catch (err) {
      fromUrl = "";
    }

    if (fromUrl) {
      try {
        sessionStorage.setItem(SEARCH_KEY, fromUrl);
      } catch (err) {
        // ignore storage errors
      }
      return fromUrl;
    }
    return "";
  }

  function clearSearchQuery() {
    try {
      sessionStorage.removeItem(SEARCH_KEY);
    } catch (err) {
      // ignore storage errors
    }
  }

  function filterProductsByQuery(products, query) {
    if (!query) {
      return products;
    }
    const needle = query.toLowerCase();
    return products.filter(function (product) {
      const title = String((product && product.title) || "").toLowerCase();
      return title.indexOf(needle) !== -1;
    });
  }

  function renderProducts(products) {
    const grid = document.getElementById("featuredProducts");
    if (!grid) {
      return;
    }

    grid.innerHTML = products
      .map(function (product) {
        const productId = Number(product.product_id || 0);
        const categorySlug = inferProductCategory(product);
        const detailUrl =
          "product.html?id=" +
          encodeURIComponent(String(productId || "")) +
          "&category=" +
          encodeURIComponent(categorySlug);
        const title = escapeHtml(product.title || "Untitled Product");
        const image = escapeHtml(buildProductImage(product.feature_image));
        const price = toNumber(product.current_price, 0);
        const previousPrice = toNumber(product.previous_price, 0);
        const badge = product.is_feature ? "Featured" : "Top Pick";
        const saved = isInWishlist(productId, product.title || "");
        const oldPriceMarkup =
          previousPrice > price
            ? "<span class=\"old-price\">Rs." + Math.round(previousPrice) + "</span>"
            : "";

        return (
          "<article class=\"product-card js-product-card\" data-id=\"" +
          productId +
          "\" data-category=\"" +
          escapeHtml(categorySlug) +
          "\" data-name=\"" +
          title +
          "\" data-detail-url=\"" +
          escapeHtml(detailUrl) +
          "\" tabindex=\"0\" role=\"link\" aria-label=\"Open " +
          title +
          " enquiry\">" +
          "<button class=\"product-wishlist-btn js-toggle-wishlist" +
          (saved ? " is-active" : "") +
          "\" type=\"button\" aria-label=\"Toggle wishlist\" data-id=\"" +
          productId +
          "\" data-name=\"" +
          title +
          "\" data-price=\"" +
          price +
          "\" data-image=\"" +
          image +
          "\" data-category=\"" +
          escapeHtml(categorySlug) +
          "\">&#10084;</button>" +
          "<img src=\"" +
          image +
          "\" alt=\"" +
          title +
          "\" loading=\"lazy\" decoding=\"async\" fetchpriority=\"low\" onerror=\"this.src='" +
          DEFAULT_PRODUCT_IMAGE +
          "'\" />" +
          "<div class=\"product-info\">" +
          "<span class=\"chip\">" +
          badge +
          "</span>" +
          "<h3 class=\"product-title\">" +
          title +
          "</h3>" +
          "<div class=\"price-row\"><span class=\"price\">Rs." +
          Math.round(price) +
          "</span>" +
          oldPriceMarkup +
          "</div>" +
          "<div class=\"product-actions-row\">" +
          "<a class=\"btn btn-light js-view-product\" href=\"" +
          detailUrl +
          "\">View Details</a>" +
          "<button class=\"btn btn-primary js-add-to-cart js-add-to-cart-icon\" aria-label=\"Add to cart\" data-id=\"" +
          productId +
          "\" data-name=\"" +
          title +
          "\" data-price=\"" +
          price +
          "\" data-image=\"" +
          image +
          "\"><svg class=\"nav-svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"9\" cy=\"20\" r=\"1.5\"/><circle cx=\"18\" cy=\"20\" r=\"1.5\"/><path d=\"M3 4h2l2.2 10.3a1 1 0 0 0 1 .7h8.9a1 1 0 0 0 1-.8L20 8H7\"/></svg></button>" +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderWishlistPage() {
    const root = document.getElementById("wishlistItems");
    const emptyState = document.getElementById("wishlistEmpty");
    if (!root) {
      return;
    }

    const wishlist = getWishlist();
    root.innerHTML = "";

    if (!wishlist.length) {
      if (emptyState) {
        emptyState.hidden = false;
      }
      return;
    }

    if (emptyState) {
      emptyState.hidden = true;
    }

    wishlist.forEach(function (item) {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML =
        "<img src=\"" +
        escapeHtml(buildProductImage(item.image)) +
        "\" alt=\"" +
        escapeHtml(item.name) +
        "\" loading=\"lazy\" decoding=\"async\" onerror=\"this.src='" +
        DEFAULT_PRODUCT_IMAGE +
        "'\" />" +
        "<div class=\"product-info\">" +
        "<h3 class=\"product-title\">" +
        escapeHtml(item.name) +
        "</h3>" +
        "<div class=\"price-row\"><span class=\"price\">Rs." +
        Math.round(toNumber(item.price, 0)) +
        "</span></div>" +
        "<button class=\"btn btn-light js-remove-wishlist\" data-id=\"" +
        Number(item.productId || 0) +
        "\" data-name=\"" +
        escapeHtml(item.name) +
        "\">Remove</button>" +
        "<button class=\"btn btn-primary js-wishlist-enquiry\" data-name=\"" +
        escapeHtml(item.name) +
        "\">WhatsApp Enquiry</button>" +
        "</div>";
      root.appendChild(card);
    });
  }

  async function getProductsCatalog() {
    const products = getFallbackProducts();
    saveProductCache(products);
    return {
      products: products,
      isFallback: false,
      loadError: null
    };
  }

  function renderBlogs(blogs) {
    const grid = document.getElementById("blogsGrid");
    if (!grid) {
      return;
    }

    grid.innerHTML = blogs
      .map(function (blog) {
        const title = escapeHtml(blog.title || "Untitled Blog");
        const image = escapeHtml(buildProductImage(blog.image));
        const content = String(blog.content || "")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        const summary = escapeHtml(content.slice(0, 135) + (content.length > 135 ? "..." : ""));

        return (
          "<article class=\"blog-card\">" +
          "<img src=\"" +
          image +
          "\" alt=\"" +
          title +
          "\" loading=\"lazy\" decoding=\"async\" onerror=\"this.src='" +
          DEFAULT_PRODUCT_IMAGE +
          "'\" />" +
          "<div class=\"blog-body\">" +
          "<h3>" +
          title +
          "</h3>" +
          "<p>" +
          summary +
          "</p>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function applyImageLoadingHints() {
    const allImages = Array.from(document.querySelectorAll("img"));
    if (!allImages.length) {
      return;
    }

    const firstHeroImage = document.querySelector(".banner-slide.is-active img, .banner-slide img");
    allImages.forEach(function (img) {
      if (img === firstHeroImage) {
        img.setAttribute("loading", "eager");
        img.setAttribute("decoding", "async");
        img.setAttribute("fetchpriority", "high");
        return;
      }
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
    });
  }

  function updateSearchUrl(query) {
    try {
      const url = new URL(window.location.href);
      if (query) {
        url.searchParams.set("q", query);
      } else {
        url.searchParams.delete("q");
      }
      history.replaceState({}, "", url.toString());
    } catch (err) {
      // ignore URL update issues
    }
  }

  function initLiveSearch() {
    const input = document.getElementById("liveSearchInput");
    const clearBtn = document.getElementById("liveSearchClear");
    if (!input) {
      return;
    }

    input.value = getSearchQuery();
    let timer = null;

    function runFilter(nextValue) {
      const query = String(nextValue || "").trim();
      if (query) {
        try {
          sessionStorage.setItem(SEARCH_KEY, query);
        } catch (err) {
          // ignore storage errors
        }
      } else {
        clearSearchQuery();
      }
      updateSearchUrl(query);
      loadProducts().then(function () {
        applyImageLoadingHints();
      });
    }

    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        runFilter(input.value);
      }, 120);
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        input.value = "";
        runFilter("");
        input.focus();
      });
    }
  }

  function renderOrderTrackingPage() {
    const panel = document.getElementById("orderTrackingPanel");
    if (!panel) {
      return;
    }

    const input = document.getElementById("orderTrackingInput");
    const trigger = document.getElementById("orderTrackingBtn");
    const result = document.getElementById("orderTrackingResult");
    const recentRoot = document.getElementById("recentOrdersList");

    function loadOrders() {
      try {
        const parsed = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch (err) {
        return [];
      }
    }

    function orderStatusFromAge(order) {
      const createdAt = new Date(order && order.created_at ? order.created_at : Date.now());
      const diffHours = Math.max(0, (Date.now() - createdAt.getTime()) / 36e5);
      if (diffHours < 2) {
        return "Order Received";
      }
      if (diffHours < 24) {
        return "In Production";
      }
      if (diffHours < 72) {
        return "Ready to Dispatch";
      }
      return "Delivered";
    }

    function renderRecentOrders(orders) {
      if (!recentRoot) {
        return;
      }
      if (!orders.length) {
        recentRoot.innerHTML = "<p class=\"list-muted\">No recent orders found.</p>";
        return;
      }
      recentRoot.innerHTML = orders
        .slice()
        .reverse()
        .slice(0, 6)
        .map(function (order) {
          const id = escapeHtml(order.order_id || "Unknown");
          const total = Math.round(toNumber(order.total, 0));
          const status = escapeHtml(orderStatusFromAge(order));
          return (
            "<div class=\"cart-item\">" +
            "<div class=\"cart-item-head\"><strong>" +
            id +
            "</strong><span>" +
            status +
            "</span></div>" +
            "<div>Total: Rs." +
            total +
            "</div>" +
            "</div>"
          );
        })
        .join("");
    }

    function showOrder(order) {
      if (!result) {
        return;
      }
      if (!order) {
        result.innerHTML = "<p class=\"api-status warn\">Order not found. Check your Order ID and try again.</p>";
        return;
      }
      const status = orderStatusFromAge(order);
      result.innerHTML =
        "<div class=\"panel\" style=\"padding:14px;\">" +
        "<p><strong>Order ID:</strong> " +
        escapeHtml(order.order_id || "Unknown") +
        "</p>" +
        "<p><strong>Status:</strong> " +
        escapeHtml(status) +
        "</p>" +
        "<p><strong>Customer:</strong> " +
        escapeHtml((order.customer && order.customer.name) || "-") +
        "</p>" +
        "<p><strong>Total:</strong> Rs." +
        Math.round(toNumber(order.total, 0)) +
        "</p>" +
        "</div>";
    }

    const orders = loadOrders();
    renderRecentOrders(orders);

    try {
      const params = new URLSearchParams(window.location.search || "");
      const preset = String(params.get("order") || "").trim();
      if (preset && input) {
        input.value = preset;
      }
    } catch (err) {
      // ignore url parsing issues
    }

    if (trigger && input) {
      trigger.addEventListener("click", function () {
        const id = String(input.value || "").trim().toUpperCase();
        if (!id) {
          showOrder(null);
          return;
        }
        const found = loadOrders().find(function (order) {
          return String(order && order.order_id || "").toUpperCase() === id;
        });
        showOrder(found || null);
      });
      if (input.value.trim()) {
        trigger.click();
      }
    }
  }

  function initFloatingWhatsAppButton() {
    if (document.querySelector(".floating-whatsapp-btn")) {
      return;
    }
    const btn = document.createElement("a");
    btn.className = "floating-whatsapp-btn";
    btn.href = WHATSAPP_URL;
    btn.setAttribute("aria-label", "Chat on WhatsApp");
    btn.innerHTML = "<span>WhatsApp</span>";
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = WHATSAPP_URL;
    });
    document.body.appendChild(btn);
  }

  function syncWishlistButtons() {
    document.querySelectorAll(".js-toggle-wishlist").forEach(function (btn) {
      const id = Number(btn.getAttribute("data-id") || 0);
      const name = btn.getAttribute("data-name") || "";
      btn.classList.toggle("is-active", isInWishlist(id, name));
    });
  }

  function handleWishlistEvents(event) {
    const toggleBtn = event.target.closest(".js-toggle-wishlist");
    if (toggleBtn) {
      event.preventDefault();
      event.stopPropagation();
      const added = toggleWishlistItem({
        productId: Number(toggleBtn.getAttribute("data-id") || 0),
        name: toggleBtn.getAttribute("data-name") || "Product",
        price: Number(toggleBtn.getAttribute("data-price") || 0),
        image: toggleBtn.getAttribute("data-image") || DEFAULT_PRODUCT_IMAGE,
        category: toggleBtn.getAttribute("data-category") || "general"
      });
      toggleBtn.classList.toggle("is-active", added);
      updateWishlistCount();
      renderWishlistPage();
      return true;
    }

    const removeBtn = event.target.closest(".js-remove-wishlist");
    if (removeBtn) {
      event.preventDefault();
      toggleWishlistItem({
        productId: Number(removeBtn.getAttribute("data-id") || 0),
        name: removeBtn.getAttribute("data-name") || "Product"
      });
      renderWishlistPage();
      syncWishlistButtons();
      return true;
    }

    const enquiryBtn = event.target.closest(".js-wishlist-enquiry");
    if (enquiryBtn) {
      event.preventDefault();
      openWhatsAppEnquiry(enquiryBtn.getAttribute("data-name") || "Product");
      return true;
    }

    return false;
  }

  async function loadProducts() {
    const grid = document.getElementById("featuredProducts");
    const status = document.getElementById("productsStatus");
    const query = getSearchQuery();
    const categoryFilter = getCategoryFilter();
    if (!grid) {
      return;
    }

    setStatus(status, "Loading products...", "");
    const catalog = await getProductsCatalog();
    const sourceProducts = catalog.products;
    const loadError = catalog.loadError;
    const isFallback = catalog.isFallback;
    const categoryFiltered = filterProductsByCategory(sourceProducts, categoryFilter);
    let filteredProducts = filterProductsByQuery(categoryFiltered, query);

    if (isProductsPage() && filteredProducts.length > 0 && filteredProducts.length < 4) {
      const taken = new Set(
        filteredProducts.map(function (item) {
          return Number(item && item.product_id);
        })
      );
      const fillers = categoryFiltered.filter(function (item) {
        return !taken.has(Number(item && item.product_id));
      });
      filteredProducts = filteredProducts.concat(fillers.slice(0, 4 - filteredProducts.length));
    }

    if (!filteredProducts.length) {
      grid.innerHTML = "";
      if (loadError) {
        setStatus(status, buildProductsErrorMessage(loadError), "error");
      } else if (query) {
        setStatus(status, "No products found for \"" + query + "\".", "warn");
      } else if (categoryFilter) {
        setStatus(
          status,
          "No products found in category \"" + prettifyCategory(categoryFilter) + "\".",
          "warn"
        );
      } else {
        setStatus(status, "No products available right now.", "warn");
      }
      return;
    }

    const productsToRender = isHomePage() ? filteredProducts.slice(0, 8) : filteredProducts;
    renderProducts(productsToRender);
    syncWishlistButtons();
    applyImageLoadingHints();

    if (query) {
      setStatus(status, "Showing results for \"" + query + "\".", "success");
    } else if (categoryFilter) {
      setStatus(
        status,
        "Category: " + prettifyCategory(categoryFilter) + " (" + filteredProducts.length + " items)",
        "success"
      );
    } else if (isHomePage()) {
      setStatus(status, "Products loaded. Tap Show All for full catalog.", "success");
    } else {
      setStatus(status, "Products loaded successfully.", "success");
    }
  }

  function normalizeCategory(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function normalizeCategoryCard(raw) {
    const label = String(
      (raw && (raw.label || raw.name || raw.title || raw.category_name)) || ""
    ).trim();
    const slug = normalizeCategory(
      (raw && (raw.slug || raw.category_slug || raw.category)) || label
    );
    const image = String(
      (raw && (raw.image || raw.image_url || raw.feature_image || raw.photo)) || ""
    ).trim();
    const icon = String((raw && raw.icon) || "").trim();
    const subcategories = Array.isArray(raw && raw.subcategories)
      ? raw.subcategories.map(function (item) {
          return String(item || "").trim();
        }).filter(Boolean)
      : [];
    return {
      slug: slug || "",
      label: label || "",
      image: image || DEFAULT_PRODUCT_IMAGE,
      icon: icon || "",
      subcategories: subcategories
    };
  }

  function buildCategoryCardsMarkup(items) {
    return (items || [])
      .map(function (item) {
        return (
          "<a class=\"category-card js-category-link\" data-category=\"" +
          escapeHtml(item.slug) +
          "\" href=\"products.html?category=" +
          encodeURIComponent(item.slug) +
          "\">" +
          "<div class=\"category-thumb\"><img src=\"" +
          escapeHtml(buildProductImage(item.image)) +
          "\" alt=\"" +
          escapeHtml(item.label) +
          " category\" loading=\"lazy\" decoding=\"async\" /></div>" +
          "<h3>" +
          escapeHtml(item.label) +
          "</h3>" +
          "</a>"
        );
      })
      .join("");
  }

  function getSubcategoryImage(title) {
    const matched = CUSTOM_PRODUCTS.find(function (item) {
      return String(item && item.title || "").toLowerCase() === String(title || "").toLowerCase();
    });
    if (!matched) {
      return DEFAULT_PRODUCT_IMAGE;
    }
    return buildProductImage(matched.feature_image);
  }

  function buildHomeSubcategoryCardsMarkup(items) {
    return (items || [])
      .map(function (title) {
        return (
          "<a class=\"home-subcard\" href=\"products.html?q=" +
          encodeURIComponent(title) +
          "\" aria-label=\"" +
          escapeHtml(title) +
          "\">" +
          "<div class=\"home-subcard-media\">" +
          "<img src=\"" +
          escapeHtml(getSubcategoryImage(title)) +
          "\" alt=\"" +
          escapeHtml(title) +
          "\" loading=\"lazy\" decoding=\"async\" />" +
          "</div>" +
          "<p class=\"home-subcard-title\">" +
          escapeHtml(title) +
          "</p>" +
          "</a>"
        );
      })
      .join("");
  }

  function getCategoryHeadingIcon(slug) {
    if (slug === "personalized-gifts") {
      return "&#127873;";
    }
    if (slug === "led-and-premium-products") {
      return "&#128161;";
    }
    if (slug === "printing-services") {
      return "&#128424;";
    }
    if (slug === "special-materials") {
      return "&#129514;";
    }
    return "&#9679;";
  }

  function buildHomeCategorySectionsMarkup(items) {
    return (items || [])
      .map(function (item) {
        const subcats = Array.isArray(item.subcategories) ? item.subcategories : [];
        return (
          "<section class=\"home-category-block\">" +
          "<div class=\"home-section-head\">" +
          "<h2><span class=\"home-heading-icon\" aria-hidden=\"true\">" +
          getCategoryHeadingIcon(item.slug) +
          "</span><span>" +
          escapeHtml(item.label) +
          "</span></h2>" +
          "</div>" +
          "<div class=\"home-subcategory-grid\">" +
          buildHomeSubcategoryCardsMarkup(subcats) +
          "</div>" +
          "</section>"
        );
      })
      .join("");
  }

  function renderHomeCategorySections() {
    const root = document.getElementById("homeCategorySections");
    if (!root) {
      return;
    }
    root.innerHTML = buildHomeCategorySectionsMarkup(CATEGORY_MENU);
  }
  function prettifyCategory(slug) {
    if (!slug) {
      return "";
    }
    return slug
      .split("-")
      .filter(Boolean)
      .map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");
  }

  function inferProductCategory(product) {
    const explicit =
      (product && (product.category_name || product.category || product.categoryName)) || "";
    const explicitSlug = normalizeCategory(explicit);
    if (explicitSlug) {
      return explicitSlug;
    }

    const title = String((product && product.title) || "").toLowerCase();
    const image = String((product && product.feature_image) || "").toLowerCase();
    const basis = title + " " + image;

    if (basis.indexOf("led") !== -1 || basis.indexOf("lamp") !== -1 || basis.indexOf("mirror") !== -1) {
      return "led-and-premium-products";
    }
    if (
      basis.indexOf("visiting") !== -1 ||
      basis.indexOf("sticker") !== -1 ||
      basis.indexOf("badge") !== -1 ||
      basis.indexOf("printing") !== -1
    ) {
      return "printing-services";
    }
    if (
      basis.indexOf("stone") !== -1 ||
      basis.indexOf("acrylic") !== -1 ||
      basis.indexOf("magnetic") !== -1
    ) {
      return "special-materials";
    }
    return "personalized-gifts";
  }

  function getCategoryFilter() {
    try {
      const params = new URLSearchParams(window.location.search || "");
      return normalizeCategory(params.get("category"));
    } catch (err) {
      return "";
    }
  }

  function filterProductsByCategory(products, categoryFilter) {
    if (!categoryFilter) {
      return products;
    }
    return products.filter(function (product) {
      return inferProductCategory(product) === categoryFilter;
    });
  }

  async function loadBlogs() {
    const grid = document.getElementById("blogsGrid");
    const status = document.getElementById("blogsStatus");
    if (!grid) {
      return;
    }

    setStatus(status, "Loading blogs...", "");
    renderBlogs(FALLBACK_BLOGS);
    setStatus(status, "Blogs loaded successfully.", "success");
  }

  function initBannerSlider() {
    const slider = document.querySelector(".js-banner-slider");
    if (!slider) {
      return;
    }

    const slides = Array.from(slider.querySelectorAll(".banner-slide"));
    const prevBtn = slider.querySelector(".js-banner-prev");
    const nextBtn = slider.querySelector(".js-banner-next");
    const dotsWrap = slider.querySelector(".js-banner-dots");
    if (!slides.length || !prevBtn || !nextBtn || !dotsWrap) {
      return;
    }
    let activeIndex = 0;
    let timer;

    function renderDots() {
      dotsWrap.innerHTML = "";
      slides.forEach(function (_, index) {
        const dot = document.createElement("span");
        dot.className = "banner-dot" + (index === activeIndex ? " is-active" : "");
        dot.addEventListener("click", function () {
          goTo(index);
        });
        dotsWrap.appendChild(dot);
      });
    }

    function goTo(index) {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === activeIndex);
      });
      renderDots();
    }

    function startAuto() {
      timer = setInterval(function () {
        goTo(activeIndex + 1);
      }, 3500);
    }

    function resetAuto() {
      clearInterval(timer);
      startAuto();
    }

    prevBtn.addEventListener("click", function () {
      goTo(activeIndex - 1);
      resetAuto();
    });

    nextBtn.addEventListener("click", function () {
      goTo(activeIndex + 1);
      resetAuto();
    });

    goTo(0);
    startAuto();
  }

  function initBottomSearch() {
    document.querySelectorAll(".js-bottom-search").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const liveInput = document.getElementById("liveSearchInput");
        if (liveInput && isProductsPage()) {
          liveInput.focus();
          liveInput.select();
          return;
        }
        const currentQuery = getSearchQuery();
        const input = window.prompt("Search products", currentQuery);

        if (input === null) {
          return;
        }

        const query = String(input).trim();
        if (!query) {
          clearSearchQuery();
          window.location.href = "products.html";
          return;
        }

        try {
          sessionStorage.setItem(SEARCH_KEY, query);
        } catch (err) {
          // ignore storage errors
        }

        window.location.href = "products.html?q=" + encodeURIComponent(query);
      });
    });
  }

  function initWhatsAppLinks() {
    const links = document.querySelectorAll(".icon-btn-whatsapp, .nav-icon-whatsapp");
    if (!links.length) {
      return;
    }

    links.forEach(function (link) {
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      link.setAttribute("href", WHATSAPP_URL);
      link.removeAttribute("target");
      link.setAttribute("rel", "noopener");

      link.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = WHATSAPP_URL;
      });
    });
  }

  function initLiveBlogPanel() {
    // API panel removed; keep function to avoid breaking old markup hooks.
  }

  function initLoginBridge() {
    const loginForm = document.querySelector(".js-login-form");
    if (!loginForm) {
      return;
    }

    const statusNode = document.getElementById("loginApiStatus");
    setStatus(statusNode, "Local demo login mode enabled.", "success");

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      setStatus(statusNode, "Login demo submitted. Backend API is disabled.", "success");
    });
  }

  function initCategoryLinks() {
    document.querySelectorAll(".js-category-link").forEach(function (link) {
      const category = normalizeCategory(link.getAttribute("data-category"));
      if (!category) {
        return;
      }
      link.setAttribute("href", "products.html?category=" + encodeURIComponent(category));
    });
  }

  function renderCategoryCardsOnPage(categoryItems) {
    const cardsMarkup = buildCategoryCardsMarkup(categoryItems);
    document.querySelectorAll(".category-grid").forEach(function (grid) {
      if (!grid.closest(".categories")) {
        return;
      }
      grid.innerHTML = cardsMarkup || "";
    });
  }

  function setCategoryStatus(text, type) {
    const node = document.getElementById("categoriesStatus");
    setStatus(node, text, type);
  }

  async function loadCategoryMenu() {
    if (!document.querySelector(".categories-strip")) {
      return;
    }

    setCategoryStatus("", "");
    if (isHomePage()) {
      renderHomeCategorySections();
    } else {
      renderCategoryCardsOnPage(CATEGORY_MENU);
      initCategoryLinks();
    }
    setCategoryStatus("", "");
  }

  function startAutoSync() {
    if (autoSyncTimer) {
      clearInterval(autoSyncTimer);
    }
    autoSyncTimer = null;
  }

  function ensureProductsCategoryStrip() {
    if (!isProductsPage()) {
      return;
    }
    if (document.querySelector(".categories-strip")) {
      return;
    }
    if (document.querySelector(".js-dynamic-category-strip")) {
      return;
    }

    const featuredSection = document.getElementById("featured");
    if (!featuredSection || !featuredSection.parentNode) {
      return;
    }

    const cardsMarkup = buildCategoryCardsMarkup(CATEGORY_MENU);

    const section = document.createElement("section");
    section.className = "categories categories-strip js-dynamic-category-strip";
    section.innerHTML =
      "<div class=\"container\">" +
      "<div class=\"section-head\"><h2>Shop By Categories</h2><p>Select a category to view matching products.</p></div>" +
      "<div class=\"category-grid\">" +
      cardsMarkup +
      "</div>" +
      "</div>";

    featuredSection.parentNode.insertBefore(section, featuredSection);
  }

  function openProductDetailFromCard(card) {
    if (!card) {
      return;
    }
    const productName = card.getAttribute("data-name") || "Product";
    openWhatsAppEnquiry(productName);
  }

  function findProductById(products, productId) {
    return (products || []).find(function (product) {
      return Number(product && product.product_id) === Number(productId);
    });
  }

  async function loadProductDetailPage() {
    const root = document.querySelector(".js-product-detail");
    if (!root) {
      return;
    }

    const status = document.getElementById("productDetailStatus");
    const titleNode = document.getElementById("productDetailTitle");
    const imageNode = document.getElementById("productDetailImage");
    const badgeNode = document.getElementById("productDetailBadge");
    const categoryNode = document.getElementById("productDetailCategory");
    const priceNode = document.getElementById("productDetailPrice");
    const oldPriceNode = document.getElementById("productDetailOldPrice");
    const addBtn = document.getElementById("productDetailAddToCart");

    let productId = 0;
    try {
      const params = new URLSearchParams(window.location.search || "");
      productId = Number(params.get("id") || 0);
    } catch (err) {
      productId = 0;
    }

    if (!productId) {
      setStatus(status, "Product not found. Please open from products page.", "error");
      return;
    }

    setStatus(status, "Loading product details...", "");
    const catalog = await getProductsCatalog();
    const product = findProductById(catalog.products, productId);

    if (!product) {
      setStatus(status, "This product is currently unavailable.", "error");
      return;
    }

    const title = String(product.title || "Untitled Product");
    const image = buildProductImage(product.feature_image);
    const price = toNumber(product.current_price, 0);
    const oldPrice = toNumber(product.previous_price, 0);
    const category = prettifyCategory(inferProductCategory(product));

    if (titleNode) {
      titleNode.textContent = title;
    }
    if (imageNode) {
      imageNode.src = image;
      imageNode.alt = title;
      imageNode.onerror = function () {
        imageNode.src = DEFAULT_PRODUCT_IMAGE;
      };
    }
    if (badgeNode) {
      badgeNode.textContent = product.is_feature ? "Featured" : "Top Pick";
    }
    if (categoryNode) {
      categoryNode.textContent = category || "General";
    }
    if (priceNode) {
      priceNode.textContent = "Rs." + Math.round(price);
    }
    if (oldPriceNode) {
      oldPriceNode.textContent = oldPrice > price ? "Rs." + Math.round(oldPrice) : "";
    }
    if (addBtn) {
      addBtn.setAttribute("data-id", String(Number(product.product_id || 0)));
      addBtn.setAttribute("data-name", title);
      addBtn.setAttribute("data-price", String(price));
      addBtn.setAttribute("data-image", image);
    }

    setStatus(status, "Product details loaded successfully.", "success");
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    updateWishlistCount();
    initBannerSlider();
    initBottomSearch();
    initLiveSearch();
    initWhatsAppLinks();
    initFloatingWhatsAppButton();
    ensureProductsCategoryStrip();
    loadCategoryMenu();
    loadProducts();
    loadBlogs();
    loadProductDetailPage();
    renderWishlistPage();
    renderOrderTrackingPage();
    startAutoSync();
    initLiveBlogPanel();
    initLoginBridge();
    applyImageLoadingHints();

    document.querySelectorAll(".js-menu-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const open = document.body.classList.toggle("menu-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });

    document.querySelectorAll("nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        document.querySelectorAll(".js-menu-toggle").forEach(function (btn) {
          btn.setAttribute("aria-expanded", "false");
        });
      });
    });

    document.addEventListener("click", function (event) {
      if (handleWishlistEvents(event)) {
        return;
      }

      const homeCard = event.target.closest(".home-subcard");
      if (homeCard) {
        event.preventDefault();
        const titleNode = homeCard.querySelector(".home-subcard-title");
        openWhatsAppEnquiry(titleNode ? titleNode.textContent : "Product");
        return;
      }

      const btn = event.target.closest(".js-add-to-cart");
      if (!btn) {
        const productLink = event.target.closest(".js-view-product");
        if (productLink) {
          return;
        }
        const card = event.target.closest(".js-product-card");
        if (!card) {
          return;
        }
        openProductDetailFromCard(card);
        return;
      }
      addToCart({
        productId: Number(btn.dataset.id || 0),
        name: btn.dataset.name || "Product",
        price: Number(btn.dataset.price || 0),
        image: btn.dataset.image || DEFAULT_PRODUCT_IMAGE,
        qty: 1
      });
      if (btn.classList.contains("js-add-to-cart-icon")) {
        const previousMarkup = btn.innerHTML;
        btn.innerHTML = "&#10003;";
        setTimeout(function () {
          btn.innerHTML = previousMarkup;
        }, 900);
      } else {
        btn.textContent = "Added";
        setTimeout(function () {
          btn.textContent = "Add to Cart";
        }, 1000);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      const homeCard = event.target.closest(".home-subcard");
      if (homeCard) {
        event.preventDefault();
        const titleNode = homeCard.querySelector(".home-subcard-title");
        openWhatsAppEnquiry(titleNode ? titleNode.textContent : "Product");
        return;
      }
      const card = event.target.closest(".js-product-card");
      if (!card) {
        return;
      }
      event.preventDefault();
      openProductDetailFromCard(card);
    });

    document.querySelectorAll("form.js-demo-form").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Thanks! We received your message.");
        form.reset();
      });
    });

  });

  window.CGCart = {
    key: CART_KEY,
    getCart: getCart,
    saveCart: saveCart,
    updateCartCount: updateCartCount,
    addToCart: addToCart,
    getWishlist: getWishlist,
    saveWishlist: saveWishlist,
    toggleWishlistItem: toggleWishlistItem,
    updateWishlistCount: updateWishlistCount
  };
})();
