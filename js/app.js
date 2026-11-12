const WHATSAPP_PHONE = "";

const PRODUCTS = {
  "red-velvet": {
    name: "Red Velvet & Vainilla",
    title: "Red Velvet & Vainilla Bourbon",
    price: 3.8,
    compare: 4.2,
    img: "/assets/red-velvet.jpg",
    kicker: "#lanietacambia · Cupcake Estrella",
    unit: "Unidad individual en caja protectora",
    story: "Bizcocho aterciopelado con cacao puro holandés. Frosting montado con queso mascarpone, reducción de frambuesas silvestres y vainilla en vaina Bourbon.",
    note: "Queso mascarpone & frambuesa",
  },
  pistacho: {
    name: "Pistacho & Rosa Silvestre",
    title: "Pistacho & Rosa Silvestre",
    price: 4.2,
    compare: null,
    img: "/assets/pistacho.jpg",
    kicker: "#lanietacambia · Edición Botánica",
    unit: "Unidad individual en caja protectora",
    story: "Pistacho siciliano tostado artesanalmente, crema de pistacho de Bronte, agua de rosas y pétalos cristalizados a mano.",
    note: "Crema de pistacho de Bronte",
  },
  chocolate: {
    name: "Chocolate Trufado 70%",
    title: "Chocolate Belga Trufado",
    price: 3.9,
    compare: null,
    img: "/assets/chocolate.jpg",
    kicker: "#lanietacambia · Intenso 70%",
    unit: "Unidad individual en caja protectora",
    story: "Ganache belga al 70% y un toque de oro comestible. Cacao de origen, mantequilla de obrador y un centro trufado.",
    note: "Ganache belga y oro comestible",
  },
  tarta: {
    name: "Tarta Flores & Higo",
    title: "Tarta Flores & Higos Confitados",
    price: 28,
    compare: null,
    img: "/assets/tarta.jpg",
    kicker: "#lanietacambia · Celebraciones",
    unit: "8-10 porciones · Personalizable",
    story: "Tarta de encargo para 8-10 porciones, con higos confitados, flores comestibles y la paleta de tu celebración.",
    note: "8-10 porciones · Personalizable",
  },
};

const SAMPLE_CART = [
  { name: "Red Velvet & Vainilla", price: 3.8, qty: 2, img: "/assets/red-velvet.jpg", note: "Glaseado mascarpone · frambuesa" },
  { name: "Pistacho & Rosa Silvestre", price: 4.2, qty: 1, img: "/assets/pistacho.jpg", note: "Caja individual de regalo" },
];

const PILL_ACTIVE = "category-pill shrink-0 px-4 py-2 rounded-full bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary font-label text-xs font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer";
const PILL_IDLE = "category-pill shrink-0 px-4 py-2 rounded-full bg-light-surface-container dark:bg-dark-surface-container text-light-on-surface dark:text-dark-on-surface font-label text-xs font-medium hover:bg-light-surface-container-high dark:hover:bg-dark-surface-container-high transition-colors flex items-center gap-1.5 cursor-pointer";

const state = {
  currentScreen: "home",
  productId: "red-velvet",
  detailQty: 2,
  category: "todos",
  delivery: "delivery",
  orderId: "LNP-8492",
  cart: loadCart(),
  favorites: loadFavorites(),
  returnScreen: "home",
};

function loadCart() {
  try {
    const raw = localStorage.getItem("lnp-cart");
    if (!raw) return SAMPLE_CART.map((item) => ({ ...item }));
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return SAMPLE_CART.map((item) => ({ ...item }));
    return parsed;
  } catch (error) {
    return SAMPLE_CART.map((item) => ({ ...item }));
  }
}

function persistCart() {
  try {
    localStorage.setItem("lnp-cart", JSON.stringify(state.cart));
  } catch (error) {
    /* ignore quota or private mode */
  }
}

function loadFavorites() {
  try {
    const raw = localStorage.getItem("lnp-favorites");
    if (!raw) return ["red-velvet"];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return ["red-velvet"];
    return parsed.filter((id) => PRODUCTS[id]);
  } catch (error) {
    return ["red-velvet"];
  }
}

function persistFavorites() {
  try {
    localStorage.setItem("lnp-favorites", JSON.stringify(state.favorites));
  } catch (error) {
    /* ignore quota or private mode */
  }
}

function money(amount) {
  return amount.toFixed(2).replace(".", ",") + " €";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function shippingFee() {
  return state.delivery === "pickup" ? 0 : 2.5;
}

function cartCount() {
  return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartSubtotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function goToScreen(screenName) {
  state.currentScreen = screenName;
  ["viewHome", "viewFavorites", "viewDetail", "viewCart", "viewConfirmation", "viewWhatsApp"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("hidden");
    el.classList.remove("screen-animated-in");
  });

  const tabIdle = "flex flex-col items-center gap-1 py-1 text-light-on-surface-variant dark:text-dark-on-surface-variant hover:text-light-primary cursor-pointer transition-colors";
  const tabActive = "is-active-tab flex flex-col items-center gap-1 py-1 text-light-primary dark:text-dark-primary font-bold cursor-pointer transition-colors";
  ["tabBtnHome", "tabBtnDetail", "tabBtnCart"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = tabIdle;
  });
  const waTab = document.getElementById("tabBtnWhatsApp");
  if (waTab) {
    waTab.className = "flex flex-col items-center gap-1 py-1 text-whatsapp hover:text-whatsapp-hover cursor-pointer transition-colors";
  }

  const labelEl = document.getElementById("currentScreenLabel");
  let targetViewId = "viewHome";

  if (screenName === "home") {
    targetViewId = "viewHome";
    document.getElementById("tabBtnHome").className = tabActive;
    labelEl.textContent = "Catálogo · Obrador";
  } else if (screenName === "favorites") {
    targetViewId = "viewFavorites";
    document.getElementById("tabBtnDetail").className = tabActive;
    labelEl.textContent = "Tus favoritos";
    renderFavorites();
  } else if (screenName === "detail") {
    targetViewId = "viewDetail";
    const source = state.returnScreen || "home";
    const sourceTab = source === "favorites" ? "tabBtnDetail" : source === "cart" ? "tabBtnCart" : "tabBtnHome";
    const sourceEl = document.getElementById(sourceTab);
    if (sourceEl) sourceEl.className = tabActive;
    labelEl.textContent = "Detalle de Producto";
    fillDetail();
  } else if (screenName === "cart") {
    targetViewId = "viewCart";
    document.getElementById("tabBtnCart").className = tabActive;
    labelEl.textContent = "Carrito & WhatsApp";
    renderCart();
  } else if (screenName === "whatsapp") {
    targetViewId = "viewWhatsApp";
    if (waTab) {
      waTab.className = "is-active-wa flex flex-col items-center gap-1 py-1 text-whatsapp font-bold cursor-pointer transition-colors";
    }
    labelEl.textContent = "Vista previa de WhatsApp";
    refreshWhatsAppPreview();
  } else if (screenName === "confirmation") {
    targetViewId = "viewConfirmation";
    labelEl.textContent = "Comprobante #" + state.orderId;
    renderConfirmationReceipt();
    triggerConfettiCelebration();
  }

  const activeView = document.getElementById(targetViewId);
  activeView.classList.remove("hidden");
  void activeView.offsetWidth;
  activeView.classList.add("screen-animated-in");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const text = document.getElementById("toastMessage");
  if (!toast || !text) return;
  text.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("flex");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.add("hidden");
    toast.classList.remove("flex");
  }, 2200);
}

function triggerConfettiCelebration() {
  const container = document.getElementById("confettiContainer");
  if (!container) return;
  container.innerHTML = "";
  container.classList.remove("hidden");
  const colors = ["#E2492D", "#25D366", "#FFB4A5", "#FFDBCF", "#D4AF37"];
  for (let i = 0; i < 28; i += 1) {
    const piece = document.createElement("div");
    const size = 6 + Math.random() * 6;
    piece.style.position = "absolute";
    piece.style.top = "8%";
    piece.style.left = (Math.random() * 100) + "%";
    piece.style.width = size + "px";
    piece.style.height = size + "px";
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    piece.style.animation = `confettiFall ${1.2 + Math.random() * 0.8}s ease-out ${Math.random() * 0.4}s forwards`;
    container.appendChild(piece);
  }
  setTimeout(() => {
    container.classList.add("hidden");
    container.innerHTML = "";
  }, 2600);
}

function toggleAppTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("lnp-theme", dark ? "dark" : "light");
  } catch (error) {
    /* ignore */
  }
  syncThemeButton();
}

function syncThemeButton() {
  const dark = document.documentElement.classList.contains("dark");
  const icon = document.getElementById("themeBtnIcon");
  const text = document.getElementById("themeBtnText");
  if (icon) icon.textContent = dark ? "light_mode" : "dark_mode";
  if (text) text.textContent = dark ? "Claro" : "Oscuro";
}

function currentProduct() {
  return PRODUCTS[state.productId] || PRODUCTS["red-velvet"];
}

function openProduct(productId) {
  if (!PRODUCTS[productId]) return;
  if (state.currentScreen !== "detail") state.returnScreen = state.currentScreen || "home";
  state.productId = productId;
  state.detailQty = 1;
  const mascarpone = document.querySelector('input[name="frosting_choice"][value="Mascarpone"]');
  if (mascarpone) mascarpone.checked = true;
  fillDetail();
  goToScreen("detail");
}

function goBackFromDetail() {
  const screen = state.returnScreen && state.returnScreen !== "detail" ? state.returnScreen : "home";
  goToScreen(screen);
}

function toggleFavorite(productId) {
  const id = productId || state.productId;
  if (!PRODUCTS[id]) return;
  const index = state.favorites.indexOf(id);
  if (index >= 0) state.favorites.splice(index, 1);
  else state.favorites.unshift(id);
  persistFavorites();
  syncFavoriteButton();
  renderFavorites();
  showToast(index >= 0 ? "Quitado de favoritos" : "Guardado en favoritos");
}

function syncFavoriteButton() {
  const btn = document.getElementById("detailFavoriteBtn");
  const icon = document.getElementById("detailFavoriteIcon");
  const saved = state.favorites.includes(state.productId);
  if (btn) {
    btn.setAttribute("aria-pressed", saved ? "true" : "false");
    btn.classList.toggle("text-light-primary", saved);
    btn.classList.toggle("dark:text-dark-primary", saved);
    btn.classList.toggle("text-light-outline", !saved);
    btn.classList.toggle("dark:text-dark-outline", !saved);
  }
  if (icon) icon.style.fontVariationSettings = saved ? "'FILL' 1" : "'FILL' 0";
}

function renderFavorites() {
  const container = document.getElementById("favoritesList");
  const subtitle = document.getElementById("favoritesSubtitle");
  if (!container) return;
  const count = state.favorites.length;
  if (subtitle) {
    subtitle.textContent = count === 0
      ? "Todavía no guardaste ningún dulce"
      : count === 1 ? "1 dulce guardado" : count + " dulces guardados";
  }
  container.innerHTML = "";
  if (count === 0) {
    container.innerHTML = `
      <div class="p-6 text-center rounded-2xl bg-light-surface-container-low dark:bg-dark-surface-container-low border border-dashed border-light-outline-variant/60 dark:border-dark-outline-variant space-y-3">
        <div class="w-14 h-14 rounded-full bg-light-surface-container dark:bg-dark-surface-container flex items-center justify-center mx-auto text-light-outline dark:text-dark-outline">
          <span class="material-symbols-outlined text-3xl">favorite</span>
        </div>
        <div>
          <h3 class="font-headline text-base font-bold">Tu lista está vacía</h3>
          <p class="text-xs text-light-on-surface-variant dark:text-dark-on-surface-variant font-body max-w-xs mx-auto mt-0.5">
            Abre un dulce de la carta y pulsa el corazón para dejarlo aquí.
          </p>
        </div>
        <button type="button" onclick="goToScreen('home')" class="w-full max-w-xs mx-auto py-2.5 rounded-full bg-light-primary dark:bg-dark-primary text-white text-xs font-bold cursor-pointer hover:opacity-95 shadow-sm">
          Ver la carta
        </button>
      </div>`;
    return;
  }
  state.favorites.forEach((id) => {
    const product = PRODUCTS[id];
    if (!product) return;
    const row = document.createElement("article");
    row.className = "rounded-xl bg-light-surface-container-low dark:bg-dark-surface-container-low border border-light-outline-variant/40 dark:border-dark-outline-variant/60 flex items-center gap-3 p-3 shadow-sm";
    row.innerHTML = `
      <button type="button" onclick="openProduct('${id}')" class="flex flex-1 items-center gap-3 min-w-0 text-left cursor-pointer">
        <span class="w-16 h-16 rounded-lg bg-light-surface-container dark:bg-dark-surface-container overflow-hidden shrink-0">
          <img src="${escapeHtml(product.img)}" alt="${escapeHtml(product.name)}" class="w-full h-full object-cover">
        </span>
        <span class="min-w-0">
          <span class="font-title text-sm font-bold truncate block">${escapeHtml(product.name)}</span>
          <span class="text-[12px] text-light-on-surface-variant dark:text-dark-on-surface-variant truncate block">${escapeHtml(product.note)}</span>
          <span class="font-title text-sm font-bold text-light-primary dark:text-dark-primary tabular-nums">${money(product.price)}</span>
        </span>
      </button>
      <button type="button" onclick="toggleFavorite('${id}')" aria-label="Quitar ${escapeHtml(product.name)} de favoritos" class="w-9 h-9 rounded-full bg-light-surface dark:bg-dark-surface-container text-light-primary dark:text-dark-primary flex items-center justify-center shrink-0 cursor-pointer">
        <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">favorite</span>
      </button>`;
    container.appendChild(row);
  });
}

function fillDetail() {
  const product = currentProduct();
  const img = document.getElementById("detailHeroImg");
  const title = document.getElementById("detailTitle");
  const kicker = document.getElementById("detailKicker");
  const price = document.getElementById("detailPrice");
  const compare = document.getElementById("detailCompare");
  const unit = document.getElementById("detailUnit");
  const story = document.getElementById("detailStory");
  if (img) {
    img.src = product.img;
    img.alt = product.title;
  }
  if (title) title.textContent = product.title;
  if (kicker) kicker.textContent = product.kicker;
  if (price) price.textContent = money(product.price);
  if (compare) {
    compare.textContent = product.compare ? money(product.compare) : "";
    compare.classList.toggle("hidden", !product.compare);
  }
  if (unit) unit.textContent = product.unit;
  if (story) story.textContent = product.story;
  syncFavoriteButton();
  const qty = document.getElementById("detailQty");
  if (qty) qty.textContent = String(state.detailQty);
  syncChoiceCards("frosting_choice");
  updateDetailTotal();
}

function selectedFrosting() {
  const selected = document.querySelector('input[name="frosting_choice"]:checked');
  return selected ? selected.value : "Mascarpone";
}

function frostingExtra() {
  return selectedFrosting() === "Chantilly" ? 0.3 : 0;
}

function giftSelected() {
  const box = document.getElementById("detailGiftBox");
  return !box || box.checked;
}

function adjustDetailQty(delta) {
  state.detailQty = Math.max(1, state.detailQty + delta);
  const qty = document.getElementById("detailQty");
  if (qty) qty.textContent = String(state.detailQty);
  updateDetailTotal();
}

function updateDetailTotal() {
  const total = (currentProduct().price + frostingExtra()) * state.detailQty;
  const el = document.getElementById("detailPriceTotal");
  if (el) el.textContent = money(total);
  syncChoiceCards("frosting_choice");
}

function detailNote() {
  const product = currentProduct();
  const frosting = selectedFrosting() === "Chantilly" ? "Crema chantilly" : "Frosting mascarpone";
  const gift = giftSelected() ? " · Caja con lazo" : "";
  const dedication = (document.getElementById("detailDedicatoriaInput")?.value || "").trim();
  const card = dedication ? ` · Tarjeta: ${dedication}` : "";
  return `${frosting}${gift}${card}` || product.note;
}

function addFromDetailAndGoCart() {
  const product = currentProduct();
  const note = detailNote();
  const unitPrice = product.price + frostingExtra();
  const existing = state.cart.find((item) => item.name === product.name && item.note === note);
  if (existing) existing.qty += state.detailQty;
  else {
    state.cart.push({
      name: product.name,
      price: unitPrice,
      qty: state.detailQty,
      img: product.img,
      note,
    });
  }
  persistCart();
  updateCartBadge();
  showToast(`${product.name} añadido a tu cesta`);
  goToScreen("cart");
}

function addItemToCart(name, price, img, note) {
  const item = state.cart.find((entry) => entry.name === name && entry.note === (note || "Selección obrador"));
  if (item) item.qty += 1;
  else state.cart.push({ name, price, qty: 1, img, note: note || "Selección obrador" });
  persistCart();
  updateCartBadge();
  showToast(`+1 ${name} añadido a tu cesta`);
  const badge = document.getElementById("navCartBadge");
  if (badge) {
    badge.classList.remove("badge-bump");
    void badge.offsetWidth;
    badge.classList.add("badge-bump");
  }
}

function modifyCartQty(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].qty += delta;
  if (state.cart[index].qty <= 0) {
    const removedName = state.cart[index].name;
    state.cart.splice(index, 1);
    showToast(`Eliminado: ${removedName}`);
  }
  persistCart();
  renderCart();
  updateCartBadge();
}

function clearCart() {
  state.cart = [];
  persistCart();
  renderCart();
  updateCartBadge();
  showToast("Cesta vaciada");
}

function updateCartBadge() {
  const totalCount = cartCount();
  const badge = document.getElementById("navCartBadge");
  if (badge) {
    badge.textContent = String(totalCount);
    badge.style.display = totalCount > 0 ? "flex" : "none";
  }
  const subtitle = document.getElementById("cartItemsSubtitle");
  if (subtitle) {
    subtitle.textContent = totalCount + (totalCount === 1 ? " delicia preparada" : " delicias preparadas");
  }
}

function updateTotals() {
  const subtotal = cartSubtotal();
  const shipping = state.cart.length ? shippingFee() : 0;
  const total = subtotal + shipping;
  const subtotalEl = document.getElementById("cartSubtotal");
  const shippingEl = document.getElementById("cartShipping");
  const shippingLabel = document.getElementById("cartShippingLabel");
  const totalEl = document.getElementById("cartTotalSummary");
  const buttonEl = document.getElementById("cartButtonTotal");
  if (subtotalEl) subtotalEl.textContent = money(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? "Gratis" : money(shipping);
  if (shippingLabel) shippingLabel.textContent = state.delivery === "pickup" ? "Recogida en obrador" : "Envío obrador directo";
  if (totalEl) totalEl.textContent = money(total);
  if (buttonEl) buttonEl.textContent = money(total) + " →";
  refreshWhatsAppPreview();
}

function renderCart() {
  const container = document.getElementById("cartItemsContainer");
  if (!container) return;
  container.innerHTML = "";

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center rounded-2xl bg-light-surface-container-low dark:bg-dark-surface-container-low border border-dashed border-light-outline-variant/60 dark:border-dark-outline-variant space-y-3 item-pop-in">
        <div class="w-14 h-14 rounded-full bg-light-surface-container dark:bg-dark-surface-container flex items-center justify-center mx-auto text-light-outline dark:text-dark-outline">
          <span class="material-symbols-outlined text-3xl">shopping_basket</span>
        </div>
        <div>
          <h4 class="font-headline text-base font-bold">Tu cesta está vacía</h4>
          <p class="text-xs text-light-on-surface-variant dark:text-dark-on-surface-variant font-body max-w-xs mx-auto mt-0.5">
            Añade cupcakes artesanales recién horneados para solicitar tu pedido por WhatsApp.
          </p>
        </div>
        <div class="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
          <button type="button" onclick="restoreSampleCart()" class="w-full py-2.5 rounded-full bg-light-primary dark:bg-dark-primary text-white text-xs font-bold cursor-pointer hover:opacity-95 shadow-sm">
            + Añadir selección sugerida
          </button>
          <button type="button" onclick="goToScreen('home')" class="w-full py-2.5 rounded-full bg-light-surface dark:bg-dark-surface-container-high border border-light-outline-variant/60 text-xs font-semibold cursor-pointer hover:bg-light-surface-container">
            Explorar el Obrador
          </button>
        </div>
      </div>`;
    updateTotals();
    return;
  }

  state.cart.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "p-3 rounded-xl bg-light-surface-container-low dark:bg-dark-surface-container-low border border-light-outline-variant/40 dark:border-dark-outline-variant/60 flex items-center gap-3 shadow-sm";
    row.innerHTML = `
      <div class="w-14 h-14 rounded-lg bg-light-surface-container dark:bg-dark-surface-container overflow-hidden shrink-0">
        <img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.name)}" class="w-full h-full object-cover">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-title text-xs font-bold truncate">${escapeHtml(item.name)}</h4>
        <p class="text-[11px] text-light-on-surface-variant dark:text-dark-on-surface-variant truncate">${escapeHtml(item.note || "")}</p>
        <span class="font-title text-xs font-bold text-light-primary dark:text-dark-primary tabular-nums">${money(item.price * item.qty)}</span>
        <span class="block text-[10px] text-light-outline dark:text-dark-outline">(${money(item.price)} / ud)</span>
      </div>
      <div class="flex items-center gap-1.5 bg-light-surface dark:bg-dark-surface-container rounded-full px-2 py-1 border border-light-outline-variant/50 dark:border-dark-outline-variant">
        <button type="button" onclick="modifyCartQty(${index}, -1)" class="w-5 h-5 flex items-center justify-center text-xs cursor-pointer" aria-label="Quitar uno">
          <span class="material-symbols-outlined text-sm">remove</span>
        </button>
        <span class="font-title text-xs font-bold px-1 tabular-nums">${item.qty}</span>
        <button type="button" onclick="modifyCartQty(${index}, 1)" class="w-5 h-5 flex items-center justify-center text-xs cursor-pointer" aria-label="Añadir uno">
          <span class="material-symbols-outlined text-sm">add</span>
        </button>
      </div>`;
    container.appendChild(row);
  });
  updateTotals();
}

function setDeliveryMode(mode) {
  state.delivery = mode === "pickup" ? "pickup" : "delivery";
  const home = document.getElementById("deliveryHome");
  const pickup = document.getElementById("deliveryPickup");
  const active = "p-3 rounded-xl border-2 border-light-primary dark:border-dark-primary bg-light-primary-container/20 dark:bg-dark-primary-container/30 flex flex-col cursor-pointer";
  const idle = "p-3 rounded-xl border border-light-outline-variant/60 dark:border-dark-outline-variant bg-light-surface-container-low dark:bg-dark-surface-container-low flex flex-col cursor-pointer";
  if (home) home.className = state.delivery === "delivery" ? active : idle;
  if (pickup) pickup.className = state.delivery === "pickup" ? active : idle;
  const homeRadio = home?.querySelector("input");
  const pickupRadio = pickup?.querySelector("input");
  if (homeRadio) homeRadio.checked = state.delivery === "delivery";
  if (pickupRadio) pickupRadio.checked = state.delivery === "pickup";
  updateTotals();
}

function checkoutFields() {
  return {
    address: document.getElementById("checkoutAddress")?.value.trim() || "",
    card: document.getElementById("checkoutCardMsg")?.value.trim() || "",
    date: document.getElementById("cartDate")?.value.trim() || "Hoy",
    slot: document.getElementById("cartSlot")?.value || "",
  };
}

function buildOrderMessage() {
  const fields = checkoutFields();
  const lines = ["Hola La Nieta de Portella ✨ Quisiera encargar:"];
  state.cart.forEach((item) => {
    lines.push(`- ${item.qty}x ${item.name} (${(item.price * item.qty).toFixed(2)}€) ${item.note || ""}`.trim());
  });
  const total = cartSubtotal() + (state.cart.length ? shippingFee() : 0);
  lines.push(`Total: ${total.toFixed(2)}€`);
  lines.push(state.delivery === "pickup" ? "Recogida en obrador · Calle Mayor 14" : "Entrega a domicilio");
  if (fields.date || fields.slot) lines.push(`Cuándo: ${fields.date} ${fields.slot}`.trim());
  if (fields.address) lines.push(`Nombre y dirección: ${fields.address}`);
  if (fields.card) lines.push(`Tarjeta: "${fields.card}"`);
  lines.push("¿Me confirmáis disponibilidad?");
  return lines.join("\n");
}

function whatsAppUrl(text) {
  const phone = String(WHATSAPP_PHONE).replace(/\D/g, "");
  const base = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}

function orderPreviewText() {
  return state.cart.length
    ? buildOrderMessage()
    : "Cuando añadas delicias, aquí verás el mensaje que se enviará al obrador.";
}

function refreshWhatsAppPreview() {
  const text = orderPreviewText();
  const preview = document.getElementById("whatsappPreview");
  const bubble = document.getElementById("waPreviewBubble");
  const meta = document.getElementById("waPreviewMeta");
  if (preview) preview.textContent = text;
  if (bubble) bubble.textContent = text;
  if (meta) {
    const count = cartCount();
    meta.textContent = count
      ? count + (count === 1 ? " delicia" : " delicias") + " · " + money(cartSubtotal() + shippingFee())
      : "La cesta está vacía";
  }
}

function confirmAndSendWhatsApp() {
  if (!state.cart.length) {
    showToast("Tu cesta está vacía");
    return;
  }
  state.orderId = "LNP-" + Math.floor(1000 + Math.random() * 9000);
  const orderCode = document.getElementById("orderCode");
  if (orderCode) orderCode.textContent = "Pedido #" + state.orderId;
  const url = whatsAppUrl(buildOrderMessage());
  const link = document.getElementById("confirmWhatsAppLink");
  if (link) link.href = url;
  window.open(url, "_blank", "noopener");
  goToScreen("confirmation");
}

function renderConfirmationReceipt() {
  const container = document.getElementById("confirmationItemsReceipt");
  if (!container) return;
  container.innerHTML = "";
  let subtotal = 0;
  state.cart.forEach((item) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    const row = document.createElement("div");
    row.className = "flex justify-between items-start gap-3 text-xs";
    row.innerHTML = `
      <span>${item.qty}x ${escapeHtml(item.name)}<br><span class="text-[11px] text-light-on-surface-variant dark:text-dark-on-surface-variant">${escapeHtml(item.note || "")}</span></span>
      <span class="font-semibold tabular-nums shrink-0">${money(itemTotal)}</span>`;
    container.appendChild(row);
  });
  const shipping = state.cart.length ? shippingFee() : 0;
  const fields = checkoutFields();
  const summary = document.createElement("div");
  summary.className = "pt-2 border-t border-light-outline-variant/40 dark:border-dark-outline-variant/60 space-y-1 text-xs";
  summary.innerHTML = `
    <div class="flex justify-between"><span>${state.delivery === "pickup" ? "Recogida en obrador" : "Envío obrador directo"}</span><span class="tabular-nums">${shipping === 0 ? "Gratis" : money(shipping)}</span></div>
    <div class="flex justify-between text-whatsapp font-medium"><span>Tarjeta artesanal caligrafiada</span><span>Gratis</span></div>
    <div class="pt-2 border-t border-light-outline-variant/40 dark:border-dark-outline-variant/60 flex justify-between font-bold text-sm">
      <span>Total acordado</span>
      <span class="text-light-primary dark:text-dark-primary tabular-nums">${money(subtotal + shipping)}</span>
    </div>
    <p class="pt-2 text-[11px] text-light-on-surface-variant dark:text-dark-on-surface-variant">${escapeHtml(fields.date)} · ${escapeHtml(fields.slot)}<br>${escapeHtml(fields.address)}</p>
    ${fields.card ? `<p class="italic font-serif text-[11px]">"${escapeHtml(fields.card)}"</p>` : ""}`;
  container.appendChild(summary);
}

function filterCategory(cat) {
  state.category = cat;
  const pills = {
    todos: document.getElementById("pillTodos"),
    cupcakes: document.getElementById("pillCupcakes"),
    tartas: document.getElementById("pillTartas"),
    cajas: document.getElementById("pillCajas"),
  };
  Object.values(pills).forEach((pill) => {
    if (pill) pill.className = PILL_IDLE;
  });
  if (pills[cat]) pills[cat].className = PILL_ACTIVE;
  applyCatalogFilters();
}

function applyCatalogFilters() {
  const query = (document.getElementById("catalogSearchInput")?.value || "").trim().toLowerCase();
  const products = document.querySelectorAll(".product-item");
  const emptyState = document.getElementById("searchEmptyState");
  const termEl = document.getElementById("searchedTermText");
  const cajasHint = document.getElementById("cajasHint");
  let visibleCount = 0;

  products.forEach((product) => {
    const categoryOk = state.category === "todos" || state.category === "cajas" || product.dataset.category === state.category;
    const textOk = query === "" || product.textContent.toLowerCase().includes(query);
    const show = state.category === "cajas" ? false : categoryOk && textOk;
    product.style.display = show ? "flex" : "none";
    if (show) visibleCount += 1;
  });

  if (cajasHint) cajasHint.classList.toggle("hidden", state.category !== "cajas");

  if (emptyState && termEl) {
    const showEmpty = state.category !== "cajas" && visibleCount === 0 && query !== "";
    emptyState.classList.toggle("hidden", !showEmpty);
    if (showEmpty) termEl.textContent = `"${query}"`;
  }
}

function restoreSampleCart() {
  state.cart = SAMPLE_CART.map((item) => ({ ...item }));
  persistCart();
  renderCart();
  updateCartBadge();
  showToast("Selección sugerida en tu cesta");
}

function handleSearch(query) {
  applyCatalogFilters();
  if (typeof query === "string" && query.trim() === "") {
    document.getElementById("searchEmptyState")?.classList.add("hidden");
  }
}

function resetSearch() {
  const input = document.getElementById("catalogSearchInput");
  if (!input) return;
  input.value = "";
  handleSearch("");
}

function toggleLoadingStateDemo() {
  const skeleton = document.getElementById("catalogLoadingSkeleton");
  const grid = document.getElementById("productsGrid");
  if (!skeleton || !grid) return;
  grid.classList.add("hidden");
  skeleton.classList.remove("hidden");
  showToast("Actualizando carta de horneado...");
  setTimeout(() => {
    skeleton.classList.add("hidden");
    grid.classList.remove("hidden");
    showToast("Carta de horneado actualizada");
  }, 900);
}

function showAllergens() {
  showToast("Alérgenos: gluten, huevo, lácteos y frutos secos.");
}

function syncChoiceCards(groupName) {
  document.querySelectorAll(`input[name="${groupName}"]`).forEach((input) => {
    const label = input.closest("label");
    if (!label) return;
    label.classList.toggle("border-2", input.checked);
    label.classList.toggle("border-light-primary", input.checked);
    label.classList.toggle("dark:border-dark-primary", input.checked);
    label.classList.toggle("bg-light-primary-container/20", input.checked);
    label.classList.toggle("dark:bg-dark-primary-container/30", input.checked);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  syncThemeButton();
  renderFavorites();
  renderCart();
  updateCartBadge();
  refreshWhatsAppPreview();
  ["cartDate", "cartSlot", "checkoutAddress", "checkoutCardMsg"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", refreshWhatsAppPreview);
    document.getElementById(id)?.addEventListener("change", refreshWhatsAppPreview);
  });
});
