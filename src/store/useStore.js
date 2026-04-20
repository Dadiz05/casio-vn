import { create } from 'zustand';

const LEGACY_IMAGE_POOL = [
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GMA-P2100SR-1A.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7710868514913_02daeab3d5aa72f5cc92114213392aeb.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7710868375261_70ff55d1670ea738ec0cf680cc03e34c.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7710868019709_a91d195aa228cfcd55a71955acfc5b22.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7710868019711_7cad218184949c83e4dbbb03c9b45360.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7710867989741_9a7fcf5b2a0f4ab4c96b809dccb7b2a7.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2022/02/EFV-140L-7AV.png",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/03/BGD-565-7.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/03/z5209851405773_e899d556ddf5da3dc2ac48796c76cd92.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/03/z5209851405704_5e2abff74c6fcf136158167323bb86f1.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/BGA-15K-2A.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7714611160563_318ac475ecea58c2f4291c74c512bc94.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7714611054089_a5882fcbf303493eec882ce9aa92eb1b.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7714611433262_ac75daaedeb18455e68de7f256d2bcd2.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7714610835578_6feaa52beebf1ec4570987f94df8c193.jpg",
  "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7714610985071_853f396232e4149a6d9ce0cd9ce497c2.jpg"
];

const useStore = create((set, get) => ({
  // Auth
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),

  // Products - Mỗi sản phẩm có 5 hình ảnh
  products: [
    {
      id: "1",
      name: "GMA-P2100SR-1A",
      price: 3290000,
      category: "G-Shock",
      image: "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GMA-P2100SR-1A.jpg", // ảnh chính
      images: [
        "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GMA-P2100SR-1A.jpg",
        "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7710868514913_02daeab3d5aa72f5cc92114213392aeb.jpg",
        "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7710868375261_70ff55d1670ea738ec0cf680cc03e34c.jpg",
        "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7710868019709_a91d195aa228cfcd55a71955acfc5b22.jpg",
        "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7710868019711_7cad218184949c83e4dbbb03c9b45360.jpg",
        "https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/z7710867989741_9a7fcf5b2a0f4ab4c96b809dccb7b2a7.jpg"
      ],
      description: "Nhỏ gọn, tinh tế, thời trang — GMA-P2100 tỏa sáng như ánh nắng mùa hè.",
      fullDescription: "Nhỏ gọn, tinh tế, thời trang — GMA-P2100 tỏa sáng như ánh nắng mùa hè. Được xử lý bằng phương pháp lắng đọng hơi phân cực, mặt kính đồng hồ mang đến cảm giác mùa hè ngập tràn ánh nắng với màu sắc thay đổi theo chuyển động cổ tay.",
      
      specs: {
        size: "46 × 40.2 × 11.2 mm",
        weight: "40 g",
        caseMaterial: "Nhựa",
        strapMaterial: "Dây đeo bằng nhựa",
        structure: "Chống va đập",
        waterResistance: "Khả năng chống nước ở độ sâu 200 mét",
        batteryLife: "Tuổi thọ pin xấp xỉ: 3 năm đối với pin CR1025",
        glass: "Mặt kính khoáng",
        strapSize: "145 đến 190 mm",
        other: "Neobrite"
      },
      
      features: [
        "Giờ thế giới 31 múi giờ",
        "Đồng hồ bấm giờ 1/100 giây",
        "Đồng hồ đếm ngược 24 giờ",
        "5 chế độ báo thức hàng ngày",
        "Hai đèn LED chiếu sáng cực mạnh",
        "Lịch hoàn toàn tự động đến năm 2099",
        "Tính năng chuyển kim",
        "Định dạng giờ 12/24"
      ]
    },

    // Sản phẩm 2
    {
      id: "2",
      name: "Edifice EF-527D-1A",
      price: 3890000,
      category: "Edifice",
      image: "https://cdn.casio-vietnam.vn/wp-content/uploads/2022/02/EFV-140L-7AV.png",
      // images: [
      //   "https://www.casio.com/content/dam/casio/product-info/locales/vn/vi/timepiece/product/image/EF/EF-527/EF-527D-1A.png",
      //   "https://picsum.photos/id/201/600/600",
      //   "https://picsum.photos/id/202/600/600",
      //   "https://picsum.photos/id/203/600/600",
      //   "https://picsum.photos/id/204/600/600"
      // ],
      description: "Thiết kế sang trọng, lịch lãm với chronograph chính xác.",
      fullDescription: "Edifice EF-527D-1A mang phong cách lịch lãm, phù hợp cho doanh nhân và người yêu thích sự tinh tế.",
      specs: {
        size: "48.5 × 42.5 × 11.8 mm",
        weight: "105 g",
        caseMaterial: "Thép không gỉ",
        strapMaterial: "Dây kim loại",
        waterResistance: "100 mét"
      },
      features: ["Chronograph", "Giờ thế giới", "Đèn LED"]
    },

    // Sản phẩm 3
    {
      id: "3",
      name: "Baby-G BGD-565-7",
      price: 1890000,
      category: "Baby-G",
      image: "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/03/BGD-565-7.jpg",
      images: [
        "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/03/BGD-565-7.jpg",
        "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/03/z5209851405773_e899d556ddf5da3dc2ac48796c76cd92.jpg",
        "https://cdn.casio-vietnam.vn/wp-content/uploads/2024/03/z5209851405704_5e2abff74c6fcf136158167323bb86f1.jpg"
      ],
      description: "Dành cho nữ, phong cách thể thao năng động.",
      fullDescription: "Baby-G BGD-565-7 với thiết kế trẻ trung, màu sắc tươi sáng phù hợp cho phái nữ.",
      specs: {
        size: "44.7 × 40.0 × 12.6 mm",
        weight: "43 g",
        caseMaterial: "Nhựa",
        strapMaterial: "Dây đeo bằng nhựa",
        waterResistance: "100 mét"
      },
      features: ["Chống va đập", "Chống nước 100 mét", "Đèn LED"]
    },

    // Các sản phẩm còn lại (97 sản phẩm, để tổng toàn bộ = 100 và id từ 1 đến 100)
    ...Array.from({ length: 97 }, (_, i) => {
      const categories = ["G-Shock", "Edifice", "Baby-G", "Classic"];
      const cat = categories[i % 4];
      const baseId = 4 + i;
      const imageStart = i % LEGACY_IMAGE_POOL.length;
      const gallery = Array.from({ length: 5 }, (_, offset) => {
        const poolIndex = (imageStart + offset) % LEGACY_IMAGE_POOL.length;
        return LEGACY_IMAGE_POOL[poolIndex];
      });

      const suffix = (i + 11).toString().padStart(2, "0");

      let name = "";
      let price = 0;
      let desc = "";
      let waterResistance = "100 mét";
      let caseMaterial = "Nhựa / Thép";
      let strapMaterial = "Dây nhựa / Kim loại";

      if (cat === "G-Shock") {
        name = `G-Shock GA-${2100 + i}-${suffix}`;
        price = 2490000 + (i % 26) * 90000;
        desc = "Đồng hồ G-Shock chống sốc bền bỉ, phù hợp hoạt động cường độ cao";
        waterResistance = "200 mét";
        caseMaterial = "Nhựa gia cường carbon";
        strapMaterial = "Dây resin cao cấp";
      } else if (cat === "Edifice") {
        name = `Edifice EF-${500 + i}D-${suffix}`;
        price = 3290000 + (i % 24) * 110000;
        desc = "Edifice chronograph sang trọng, nhấn mạnh độ chính xác khi vận hành";
        waterResistance = "100 mét";
        caseMaterial = "Thép không gỉ";
        strapMaterial = "Dây kim loại";
      } else if (cat === "Baby-G") {
        name = `Baby-G BGD-${300 + i}-${suffix}`;
        price = 1890000 + (i % 20) * 70000;
        desc = "Baby-G phong cách năng động, gọn nhẹ cho nhịp sống hàng ngày";
        waterResistance = "100 mét";
        caseMaterial = "Nhựa sinh học";
        strapMaterial = "Dây đeo bằng nhựa mềm";
      } else {
        name = `Casio Classic F-${90 + i}-${suffix}`;
        price = 890000 + (i % 22) * 45000;
        desc = "Casio Classic giá tốt, thiết kế tối giản và dễ phối trang phục";
        waterResistance = "50 mét";
        caseMaterial = "Nhựa / Hợp kim";
        strapMaterial = "Dây nhựa / Dây da";
      }

      const featurePool = [
        "Chống va đập",
        "Chống nước",
        "Đèn LED",
        "Lịch tự động",
        "Báo thức đa năng",
        "Giờ thế giới",
        "Đồng hồ bấm giờ",
        "Đếm ngược",
        "Định dạng giờ 12/24",
        "Mặt kính khoáng"
      ];

      const features = Array.from({ length: 4 }, (_, featureOffset) => {
        const featureIndex = (i + featureOffset * 2) % featurePool.length;
        return featurePool[featureIndex];
      });

      return {
        id: baseId.toString(),
        name,
        price,
        category: cat,
        image: gallery[0],
        images: gallery,
        description: desc,
        fullDescription: `${desc}. Sản phẩm chính hãng Casio Nhật Bản với thiết kế hiện đại và độ bền cao.`,
        specs: {
          size: `${44 + (i % 4)} × ${39 + (i % 3)} × ${11 + (i % 3)} mm`,
          weight: `${42 + (i % 18)} g`,
          caseMaterial,
          strapMaterial,
          waterResistance
        },
        features
      };
    })
  ],

  setProducts: (newProducts) => set({ products: newProducts }),

  // Cart functions
  cart: [],

  addToCart: (product) => {
    const currentCart = get().cart;
    const existing = currentCart.find(item => item.id === product.id);

    if (existing) {
      set({
        cart: currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      });
    } else {
      set({ cart: [...currentCart, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (id) => set({
    cart: get().cart.filter(item => item.id !== id)
  }),

  updateCartQuantity: (id, quantity) => {
    if (quantity < 1) return;
    set({
      cart: get().cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    });
  },

  clearCart: () => set({ cart: [] })
}));

export { useStore };