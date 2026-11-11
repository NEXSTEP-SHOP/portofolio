
/* =========================================
   NEXSTEP WEBSITE - JAVASCRIPT
   ========================================= */

// 1. GAMBAR PRODUK

const fallbackImage =
    "https://placehold.co/600x400?text=NEXSTEP+SHOES";

function getProductImage(product) {
    const categoryNames = {
        futsal: "indoor futsal shoes",
        basket: "basketball shoes",
        voli: "volleyball shoes",
        running: "running shoes",
        badminton: "badminton court shoes",
        "sepak-bola": "football soccer cleats",
        "mini-soccer": "turf soccer shoes"
    };

    const searchText =
        `${product.name} ${categoryNames[product.category]} product`;

    return `https://tse1.mm.bing.net/th?q=${encodeURIComponent(searchText)}&w=800&h=600&c=7&rs=1&p=0`;
}


// 2. DATA 35 PRODUK

const products = [

    // FUTSAL
    { id: 1, name: "adidas Mundial Goal", category: "futsal", price: 1850000 },
    { id: 2, name: "Nike React Gato", category: "futsal", price: 2100000 },
    { id: 3, name: "PUMA Future 7 Play IT", category: "futsal", price: 950000 },
    { id: 4, name: "Mizuno Morelia Sala Japan", category: "futsal", price: 1750000 },
    { id: 5, name: "Joma Top Flex", category: "futsal", price: 1300000 },

    // BASKET
    { id: 6, name: "Nike LeBron XXI", category: "basket", price: 3200000 },
    { id: 7, name: "Air Jordan 1 High", category: "basket", price: 2800000 },
    { id: 8, name: "adidas Harden Vol. 8", category: "basket", price: 2500000 },
    { id: 9, name: "Under Armour Curry 11", category: "basket", price: 2700000 },
    { id: 10, name: "Nike KD 17", category: "basket", price: 2300000 },

    // VOLI
    { id: 11, name: "ASICS Sky Elite FF 3", category: "voli", price: 2400000 },
    { id: 12, name: "Mizuno Wave Momentum 3", category: "voli", price: 2200000 },
    { id: 13, name: "Mizuno Wave Lightning Z8", category: "voli", price: 2100000 },
    { id: 14, name: "Nike HyperAce 3", category: "voli", price: 1700000 },
    { id: 15, name: "ASICS Gel-Rocket 11", category: "voli", price: 950000 },

    // RUNNING
    { id: 16, name: "Nike Alphafly 3", category: "running", price: 4500000 },
    { id: 17, name: "adidas Adizero Adios Pro 3", category: "running", price: 3800000 },
    { id: 18, name: "ASICS Metaspeed Sky Paris", category: "running", price: 4200000 },
    { id: 19, name: "Nike Pegasus 41", category: "running", price: 2100000 },
    { id: 20, name: "New Balance FuelCell SC Elite", category: "running", price: 3900000 },

    // BADMINTON
    { id: 21, name: "Yonex Power Cushion 65 Z3", category: "badminton", price: 1900000 },
    { id: 22, name: "Victor A970", category: "badminton", price: 1600000 },
    { id: 23, name: "Li-Ning Ranger Lite", category: "badminton", price: 1200000 },
    { id: 24, name: "Yonex Aerus Z2", category: "badminton", price: 2300000 },
    { id: 25, name: "Mizuno Wave Claw 3", category: "badminton", price: 1800000 },

    // SEPAK BOLA
    { id: 26, name: "Nike Mercurial Superfly 10 Elite", category: "sepak-bola", price: 4200000 },
    { id: 27, name: "adidas Predator Elite", category: "sepak-bola", price: 3900000 },
    { id: 28, name: "PUMA Future Ultimate", category: "sepak-bola", price: 3500000 },
    { id: 29, name: "Mizuno Alpha Japan", category: "sepak-bola", price: 4100000 },
    { id: 30, name: "Nike Phantom GX 2 Elite", category: "sepak-bola", price: 3800000 },

    // MINI SOCCER
    { id: 31, name: "Nike Phantom GX 2 Elite TF", category: "mini-soccer", price: 3200000 },
    { id: 32, name: "adidas Mundial Team", category: "mini-soccer", price: 2200000 },
    { id: 33, name: "PUMA Ultra Ultimate TT", category: "mini-soccer", price: 2600000 },
    { id: 34, name: "Joma Top Flex Rebound", category: "mini-soccer", price: 1700000 },
    { id: 35, name: "Mizuno Morelia Sala Elite", category: "mini-soccer", price: 2500000 }

];


// 3. PASANG GAMBAR UNIK PADA SETIAP PRODUK

products.forEach(product => {
    product.image = getProductImage(product);
});


// 4. VARIABEL WEBSITE

let cart = [];
let selectedCategory = "all";
let displayedProducts = [...products];

const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");


// 5. FORMAT HARGA RUPIAH

function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}


// 6. TAMPILKAN PRODUK

function renderProducts(data = displayedProducts) {

    if (!productGrid) return;

    productGrid.innerHTML = "";

    if (data.length === 0) {
        productGrid.innerHTML = `
            <p class="empty-cart">
                Produk tidak ditemukan.
            </p>
        `;
        return;
    }

    data.forEach(product => {

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='${fallbackImage}'"
                >
            </div>

            <div class="product-info">

                <p class="product-category">
                    ${product.category.replace("-", " ")}
                </p>

                <h3>${product.name}</h3>

                <p class="product-price">
                    ${formatRupiah(product.price)}
                </p>

                <div class="product-actions">

                    <button onclick="showProductDetail(${product.id})">
                        Detail
                    </button>

                    <button onclick="addToCart(${product.id})">
                        + Keranjang
                    </button>

                </div>
            </div>
        `;

        productGrid.appendChild(card);

    });

}


// 7. FILTER KATEGORI

function filterCategory(category) {

    selectedCategory = category;

    document.querySelectorAll(".category-chip").forEach(button => {
        button.classList.remove("active");
    });

    const activeButton = [...document.querySelectorAll(".category-chip")]
        .find(button => {
            return button.getAttribute("onclick") ===
                `filterCategory('${category}')`;
        });

    if (activeButton) {
        activeButton.classList.add("active");
    }

    applyFilters();
}


// 8. PENCARIAN PRODUK

function searchProducts() {
    applyFilters();
}


function applyFilters() {

    const searchInput = document.getElementById("search-input");

    const keyword = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    displayedProducts = products.filter(product => {

        const matchCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const matchSearch =
            product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword);

        return matchCategory && matchSearch;

    });

    sortProducts();
}


// 9. URUTKAN PRODUK

function sortProducts() {

    const sortSelect = document.getElementById("sort-select");

    const sortValue = sortSelect ? sortSelect.value : "default";

    if (sortValue === "low") {

        displayedProducts.sort((a, b) => a.price - b.price);

    } else if (sortValue === "high") {

        displayedProducts.sort((a, b) => b.price - a.price);

    } else if (sortValue === "name") {

        displayedProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    } else {

        displayedProducts.sort((a, b) => a.id - b.id);

    }

    renderProducts();
}


// 10. DETAIL PRODUK

function showProductDetail(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    const detail = document.getElementById("product-detail");

    if (!detail) return;

    detail.innerHTML = `

        <img
            src="${product.image}"
            alt="${product.name}"
            style="width:100%;max-height:250px;object-fit:contain;"
            onerror="this.onerror=null;this.src='${fallbackImage}'"
        >

        <h2 style="margin-top:20px;">
            ${product.name}
        </h2>

        <p style="color:#00bfff;margin:10px 0;">
            ${product.category.replace("-", " ").toUpperCase()}
        </p>

        <h3 style="color:#72e3ff;">
            ${formatRupiah(product.price)}
        </h3>

        <p style="color:#aab8c9;line-height:1.8;margin-top:15px;">
            Sepatu olahraga pilihan dari koleksi NEXSTEP.
            Cocok untuk aktivitas olahraga sesuai kategorinya.
        </p>

        <button
            onclick="addToCart(${product.id})"
            style="
                margin-top:20px;
                padding:13px 20px;
                background:#00bfff;
                color:#00121d;
                border:0;
                border-radius:5px;
                cursor:pointer;
                font-weight:bold;
            "
        >
            TAMBAHKAN KE KERANJANG
        </button>

    `;

    document.getElementById("product-modal").classList.add("show");

}


// 11. TUTUP DETAIL PRODUK

function closeProductModal() {

    document.getElementById("product-modal").classList.remove("show");

}


// 12. TAMBAH PRODUK KE KERANJANG

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    closeProductModal();

    alert(product.name + " berhasil ditambahkan!");

}


// 13. HAPUS PRODUK DARI KERANJANG

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();

}


// 14. UPDATE KERANJANG

function updateCart() {

    if (!cartItems || !cartCount || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Keranjang masih kosong.
            </p>
        `;

    }

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;
        totalQuantity += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.style.cssText = `
            display:flex;
            gap:12px;
            align-items:center;
            margin-bottom:18px;
            padding-bottom:15px;
            border-bottom:1px solid #26394e;
        `;

        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                style="
                    width:75px;
                    height:75px;
                    object-fit:cover;
                    border-radius:7px;
                "
                onerror="this.onerror=null;this.src='${fallbackImage}'"
            >

            <div style="flex:1;">

                <h4 style="font-size:12px;">
                    ${item.name}
                </h4>

                <p style="color:#00bfff;font-size:12px;margin:5px 0;">
                    ${formatRupiah(item.price)}
                </p>

                <p style="font-size:11px;color:#9cabbc;">
                    Jumlah: ${item.quantity}
                </p>

                <button
                    onclick="removeFromCart(${item.id})"
                    style="
                        background:none;
                        border:none;
                        color:#ff6464;
                        cursor:pointer;
                        font-size:11px;
                        margin-top:5px;
                    "
                >
                    Hapus
                </button>

            </div>

        `;

        cartItems.appendChild(cartItem);

    });

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = formatRupiah(total);

}


// 15. BUKA DAN TUTUP KERANJANG

function toggleCart() {

    document.getElementById("cart-panel").classList.toggle("show");

    document.getElementById("cart-overlay").classList.toggle("show");

}


// 16. CHECKOUT SIMULASI

function checkout() {

    if (cart.length === 0) {

        alert("Keranjang kamu masih kosong!");
        return;

    }

    let summary = "RINGKASAN PESANAN NEXSTEP\n\n";

    cart.forEach(item => {

        summary +=
            `${item.name} x${item.quantity} = ${formatRupiah(item.price * item.quantity)}\n`;

    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    summary += "\nTOTAL: " + formatRupiah(total);

    alert(
        summary +
        "\n\nIni hanya simulasi checkout. Belum ada pembayaran sungguhan."
    );

}


// 17. JALANKAN WEBSITE

document.addEventListener("DOMContentLoaded", function() {

    renderProducts();

    updateCart();

});



/* =========================================
   NEXSTEP - FUTURISTIC PREMIUM EFFECTS
========================================= */

(function () {
    function initPremiumEffects() {

        // 1. TAMBAHKAN STYLE EFEK
        const style = document.createElement("style");

        style.textContent = `
            /* SCROLL PROGRESS */
            #nexstepProgress {
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 4px;
                background: linear-gradient(
                    90deg, #007bff, #00eaff, #ffffff
                );
                box-shadow: 0 0 15px #00cfff;
                z-index: 99999;
            }

            /* CURSOR GLOW */
            body {
                --mouse-x: 50%;
                --mouse-y: 50%;
            }

            body::before {
                content: "";
                position: fixed;
                inset: 0;
                pointer-events: none;
                z-index: 9990;
                background: radial-gradient(
                    350px circle at var(--mouse-x) var(--mouse-y),
                    rgba(0, 191, 255, 0.08),
                    transparent 70%
                );
            }

            /* PARTICLES */
            .nex-particle {
                position: fixed;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: #00d9ff;
                box-shadow: 0 0 12px #00d9ff;
                pointer-events: none;
                z-index: 1;
                animation: nexFloat linear infinite;
            }

            @keyframes nexFloat {
                0% {
                    transform: translateY(110vh) scale(0.5);
                    opacity: 0;
                }
                15% { opacity: 0.8; }
                85% { opacity: 0.7; }
                100% {
                    transform: translateY(-10vh) scale(1.3);
                    opacity: 0;
                }
            }

            /* REVEAL ANIMATION */
            .nex-reveal {
                opacity: 0;
                transform: translateY(35px);
                transition: opacity 0.8s ease,
                            transform 0.8s ease;
            }

            .nex-reveal.nex-visible {
                opacity: 1;
                transform: translateY(0);
            }

            /* PRODUCT CARD GLOW */
            .product-card {
                position: relative;
                overflow: hidden;
                transition:
                    transform 0.35s ease,
                    box-shadow 0.35s ease,
                    border-color 0.35s ease;
            }

            .product-card::after {
                content: "";
                position: absolute;
                top: -100%;
                left: -100%;
                width: 60%;
                height: 300%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(0, 217, 255, 0.15),
                    transparent
                );
                transform: rotate(25deg);
                transition: 0.7s;
                pointer-events: none;
            }

            .product-card:hover::after {
                left: 150%;
            }

            .product-card:hover {
                transform: translateY(-10px);
                border-color: #00cfff;
                box-shadow:
                    0 0 15px rgba(0, 191, 255, 0.25),
                    0 0 35px rgba(0, 191, 255, 0.12);
            }

            /* BUTTON NEON */
            button {
                transition:
                    transform 0.25s ease,
                    box-shadow 0.25s ease,
                    filter 0.25s ease;
            }

            button:hover {
                filter: brightness(1.15);
            }

            /* NAVBAR GLOW */
            .navbar {
                backdrop-filter: blur(15px);
            }

            .navbar nav a {
                transition: color 0.3s, text-shadow 0.3s;
            }

            .navbar nav a:hover {
                color: #00d9ff;
                text-shadow: 0 0 12px #00d9ff;
            }

            /* IMAGE HOVER */
            .product-card img {
                transition: transform 0.5s ease;
            }

            .product-card:hover img {
                transform: scale(1.07);
            }

            @media (hover: none), (max-width: 700px) {
                body::before {
                    display: none;
                }

                .nex-reveal {
                    opacity: 1;
                    transform: none;
                }

                .product-card:hover {
                    transform: none;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .nex-particle {
                    display: none;
                }

                .nex-reveal,
                .product-card,
                .product-card img {
                    transition: none;
                }
            }
        `;

        document.head.appendChild(style);

        // 2. SCROLL PROGRESS BAR
        const progress = document.createElement("div");
        progress.id = "nexstepProgress";
        document.body.appendChild(progress);

        function updateProgress() {
            const scrollable =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const percentage = scrollable > 0
                ? (window.scrollY / scrollable) * 100
                : 0;

            progress.style.width = percentage + "%";
        }

        window.addEventListener("scroll", updateProgress);
        updateProgress();

        // 3. PARTIKEL BIRU
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            for (let i = 0; i < 24; i++) {
                const particle = document.createElement("div");
                particle.className = "nex-particle";

                particle.style.left = Math.random() * 100 + "vw";
                particle.style.animationDuration =
                    (8 + Math.random() * 12) + "s";
                particle.style.animationDelay =
                    (-Math.random() * 15) + "s";
                particle.style.opacity = Math.random();

                document.body.appendChild(particle);
            }
        }

        // 4. CURSOR GLOW
        window.addEventListener("mousemove", function (event) {
            document.body.style.setProperty(
                "--mouse-x", event.clientX + "px"
            );

            document.body.style.setProperty(
                "--mouse-y", event.clientY + "px"
            );
        });

        // 5. SCROLL REVEAL
        const revealTargets = [
            ".hero-content",
            ".hero-image",
            ".section-title",
            ".category-chip",
            ".product-card",
            ".about-section",
            ".contact-section",
            ".game-section"
        ].join(",");

        function observeReveal(element) {
            if (
                element.classList.contains("nex-reveal") ||
                element.classList.contains("nex-visible")
            ) return;

            element.classList.add("nex-reveal");
            observer.observe(element);
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("nex-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        document.querySelectorAll(revealTargets).forEach(observeReveal);

        // Amati produk baru saat kategori/search berubah
        const grid = document.getElementById("product-grid");

        if (grid) {
            const mutationObserver = new MutationObserver(() => {
                grid.querySelectorAll(".product-card")
                    .forEach(observeReveal);
            });

            mutationObserver.observe(grid, {
                childList: true
            });
        }

        console.log("NEXSTEP Premium Effects aktif!");
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initPremiumEffects
        );
    } else {
        initPremiumEffects();
    }
})();

/* =========================================
   NEXSTEP - CYBER INTERACTION ENGINE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // 1. NEON SCROLL PROGRESS
    const progress = document.createElement("div");
    progress.id = "nexstep-progress";
    document.body.appendChild(progress);

    let scrollTicking = false;

    function updateScrollProgress() {
        const doc = document.documentElement;

        const scrollable =
            doc.scrollHeight - window.innerHeight;

        const percentage = scrollable > 0
            ? (window.scrollY / scrollable) * 100
            : 0;

        progress.style.width = percentage + "%";
        scrollTicking = false;
    }

    window.addEventListener("scroll", function () {
        if (!scrollTicking) {
            requestAnimationFrame(updateScrollProgress);
            scrollTicking = true;
        }
    }, { passive: true });

    updateScrollProgress();


    // 2. MOUSE SPOTLIGHT HERO
    const hero = document.querySelector(".hero");

    if (
        hero &&
        window.matchMedia("(pointer: fine)").matches
    ) {
        const spotlight = document.createElement("div");

        spotlight.className = "nex-hero-spotlight";
        hero.appendChild(spotlight);

        hero.addEventListener("pointermove", function (event) {
            const rect = hero.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            spotlight.style.setProperty("--spot-x", x + "px");
            spotlight.style.setProperty("--spot-y", y + "px");
        });

        hero.addEventListener("pointerleave", function () {
            spotlight.style.setProperty("--spot-x", "50%");
            spotlight.style.setProperty("--spot-y", "50%");
        });
    }


    // 3. CINEMATIC SCROLL REVEAL
    const revealElements = document.querySelectorAll(
        ".category-section, .catalog-section, " +
        ".game-section, .about-section, .contact-section"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("nex-visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            element.classList.add("nex-reveal");
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("nex-visible");
        });

    }

    console.log("NEXSTEP CYBER EFFECTS ACTIVE!");
});

/* =================================
   NEXSTEP - ENERGY PARTICLE SYSTEM
================================= */

document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Membuat layer efek
    const fxLayer = document.createElement("div");
    fxLayer.className = "nex-fx-layer";
    document.body.prepend(fxLayer);

    // Bola energi
    for (let i = 0; i < 3; i++) {
        const orb = document.createElement("div");
        orb.className = "nex-orb";
        fxLayer.appendChild(orb);
    }

    // Kilatan energi
    for (let i = 0; i < 5; i++) {
        const streak = document.createElement("div");
        streak.className = "nex-streak";
        streak.style.left = (10 + Math.random() * 80) + "%";
        streak.style.top = (Math.random() * 70) + "%";
        streak.style.animationDelay = (Math.random() * 5) + "s";
        fxLayer.appendChild(streak);
    }

    // Partikel cahaya
    for (let i = 0; i < 35; i++) {
        const spark = document.createElement("div");
        spark.className = "nex-spark";

        spark.style.left = Math.random() * 100 + "%";
        spark.style.top = Math.random() * 100 + "%";
        spark.style.setProperty(
            "--duration",
            (3 + Math.random() * 6) + "s"
        );
        spark.style.setProperty(
            "--delay",
            (Math.random() * -8) + "s"
        );

        fxLayer.appendChild(spark);
    }

    console.log("NEXSTEP ENERGY EFFECTS ACTIVATED!");
});



