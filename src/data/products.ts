import type {
  Product,
  ProductCategory,
  ProductGender,
  ProductMovement,
  ProductSpecs,
} from '@/types'

interface CasioSourceProduct {
  category: ProductCategory
  sku: string
  name: string
  price: number
  image: string
  url: string
}

const sourceProducts: CasioSourceProduct[] = [
  {
    category: 'G-Shock',
    sku: 'GA-2100CC-3A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK GA-2100CC-3A',
    price: 0,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/GA-2100CC-3A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-ga-2100cc-3a/',
  },
  {
    category: 'G-Shock',
    sku: 'GMD-B300-7',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO G-SHOCK GMD-B300-7',
    price: 4086000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/GMD-B300-7.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-g-shock-gmd-b300-7/',
  },
  {
    category: 'G-Shock',
    sku: 'GMD-B300-2',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO G-SHOCK GMD-B300-2',
    price: 4086000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/GMD-B300-2.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-g-shock-gmd-b300-2/',
  },
  {
    category: 'G-Shock',
    sku: 'MTG-B4000B-1A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK MTG-B4000B-1A',
    price: 41022000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/MTG-B4000B-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-mtg-b4000b-1a/',
  },
  {
    category: 'G-Shock',
    sku: 'MTG-B4000BD-1A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK MTG-B4000BD-1A',
    price: 47499000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/MTG-B4000BD-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-mtg-b4000bd-1a/',
  },
  {
    category: 'G-Shock',
    sku: 'GBX-H5600-2',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK GBX-H5600-2',
    price: 0,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/GBX-H5600-2.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-gbx-h5600-2/',
  },
  {
    category: 'G-Shock',
    sku: 'GBX-H5600-1',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK GBX-H5600-1',
    price: 0,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/GBX-H5600-1-1.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-gbx-h5600-1/',
  },
  {
    category: 'G-Shock',
    sku: 'GWG-B1000MG-1A9',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK GWG-B1000MG-1A9',
    price: 29795000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/GWG-B1000MG-1A9.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-gwg-b1000mg-1a9/',
  },
  {
    category: 'G-Shock',
    sku: 'GMA-P2100SR-7A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO G-SHOCK GMA-P2100SR-7A',
    price: 4359000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GMA-P2100SR-7A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-g-shock-gma-p2100sr-7a/',
  },
  {
    category: 'G-Shock',
    sku: 'GMA-P2100SR-1A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO G-SHOCK GMA-P2100SR-1A',
    price: 4359000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GMA-P2100SR-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-g-shock-gma-p2100sr-1a/',
  },
  {
    category: 'G-Shock',
    sku: 'GM-S2110SR-7A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO G-SHOCK GM-S2110SR-7A',
    price: 7900000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GM-S2110SR-7A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-g-shock-gm-s2110sr-7a/',
  },
  {
    category: 'G-Shock',
    sku: 'GM-S2110SR-1A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO G-SHOCK GM-S2110SR-1A',
    price: 7900000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GM-S2110SR-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-g-shock-gm-s2110sr-1a/',
  },
  {
    category: 'G-Shock',
    sku: 'GW-BX5600CBG-2',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK GW-BX5600CBG-2',
    price: 7168000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GW-BX5600CBG-2.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-gw-bx5600cbg-2/',
  },
  {
    category: 'G-Shock',
    sku: 'GD-010BEG-1',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK GD-010BEG-1',
    price: 3723000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GD-010BEG-1.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-gd-010beg-1/',
  },
  {
    category: 'G-Shock',
    sku: 'GA-700BEG-1A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK GA-700BEG-1A',
    price: 3706000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GA-700BEG-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-ga-700beg-1a/',
  },
  {
    category: 'G-Shock',
    sku: 'GA-100BEG-1A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK GA-100BEG-1A',
    price: 4268000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GA-100BEG-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-ga-100beg-1a/',
  },
  {
    category: 'G-Shock',
    sku: 'GA-B2100BEG-1A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK GA-B2100BEG-1A',
    price: 5539000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GA-B2100BEG-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-ga-b2100beg-1a/',
  },
  {
    category: 'G-Shock',
    sku: 'GA-B010BEG-1A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK GA-B010BEG-1A',
    price: 5721000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GA-B010BEG-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-ga-b010beg-1a/',
  },
  {
    category: 'G-Shock',
    sku: 'GMW-BZ5000RC-1',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK GMW-BZ5000RC-1',
    price: 28500000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GMW-BZ5000RC-1.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-gmw-bz5000rc-1/',
  },
  {
    category: 'G-Shock',
    sku: 'GMC-B2100ADS-1A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK GMC-B2100ADS-1A',
    price: 25909000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/GMC-B2100ADS-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-gmc-b2100ads-1a/',
  },
  {
    category: 'G-Shock',
    sku: 'DW-5600JV-7',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK DW-5600JV-7',
    price: 8264000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/DW-5600JV-7.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-dw-5600jv-7/',
  },
  {
    category: 'G-Shock',
    sku: 'DW-6900JV-1',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK DW-6900JV-1',
    price: 7341000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/DW-6900JV-1.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-dw-6900jv-1/',
  },
  {
    category: 'G-Shock',
    sku: 'GMA-P2126W-8A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO G-SHOCK GMA-P2126W-8A',
    price: 4631000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/GMA-P2126W-8A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-g-shock-gma-p2126w-8a/',
  },
  {
    category: 'G-Shock',
    sku: 'DW-5600MNC-1',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK DW-5600MNC-1',
    price: 4318000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/DW-5600MNC-1.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-dw-5600mnc-1/',
  },
  {
    category: 'G-Shock',
    sku: 'DW-5600MNC-7A8',
    name: 'Đồng Hồ Nam Chính Hãng CASIO G-SHOCK DW-5600MNC-7A8',
    price: 4318000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/DW-5600MNC-7A8.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-g-shock-dw-5600mnc-7a8/',
  },
  {
    category: 'Edifice',
    sku: 'ERA-130D-1A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE ERA-130D-1A',
    price: 5727000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/ERA-130D-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-era-130d-1a/',
  },
  {
    category: 'Edifice',
    sku: 'ERA-130D-2A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE ERA-130D-2A',
    price: 5727000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/ERA-130D-2A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-era-130d-2a/',
  },
  {
    category: 'Edifice',
    sku: 'ERA-130D-3A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE ERA-130D-3A',
    price: 5727000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/ERA-130D-3A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-era-130d-3a/',
  },
  {
    category: 'Edifice',
    sku: 'EQB-1300DC-3A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EQB-1300DC-3A',
    price: 12775000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/EQB-1300DC-3A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-eqb-1300dc-3a/',
  },
  {
    category: 'Edifice',
    sku: 'EQB-1300D-5A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EQB-1300D-5A',
    price: 11013000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/EQB-1300D-5A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-eqb-1300d-5a/',
  },
  {
    category: 'Edifice',
    sku: 'EQB-1300D-2A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EQB-1300D-2A',
    price: 11013000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/EQB-1300D-2A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-eqb-1300d-2a/',
  },
  {
    category: 'Edifice',
    sku: 'EFK-110D-7A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFK-110D-7A',
    price: 8810400,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/EFK-110D-7A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efk-110d-7a/',
  },
  {
    category: 'Edifice',
    sku: 'EFK-110D-2A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFK-110D-2A',
    price: 8810400,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/EFK-110D-2A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efk-110d-2a/',
  },
  {
    category: 'Edifice',
    sku: 'EFK-110D-1A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFK-110D-1A',
    price: 8810400,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/EFK-110D-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efk-110d-1a/',
  },
  {
    category: 'Edifice',
    sku: 'EFR-575D-4A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFR-575D-4A',
    price: 5333000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/02/EFR-575D-4A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efr-575d-4a/',
  },
  {
    category: 'Edifice',
    sku: 'EFR-575CL-5A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFR-575CL-5A',
    price: 5817000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/02/EFR-575CL-5A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efr-575cl-5a/',
  },
  {
    category: 'Edifice',
    sku: 'EFR-575C-8A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFR-575C-8A',
    price: 4585000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/02/EFR-575C-8A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efr-575c-8a/',
  },
  {
    category: 'Edifice',
    sku: 'EFR-574DE-7AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFR-574DE-7AV',
    price: 5727000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/02/EFR-574DE-7AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efr-574de-7av/',
  },
  {
    category: 'Edifice',
    sku: 'EFR-574DC-2AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFR-574DC-2AV',
    price: 7048000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/02/EFR-574DC-2AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efr-574dc-2av/',
  },
  {
    category: 'Edifice',
    sku: 'EFR-574BL-1AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFR-574BL-1AV',
    price: 5727000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/02/EFR-574BL-1AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efr-574bl-1av/',
  },
  {
    category: 'Edifice',
    sku: 'EFB-109D-5AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFB-109D-5AV',
    price: 5043000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/02/EFB-109D-5AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efb-109d-5av/',
  },
  {
    category: 'Edifice',
    sku: 'EFB-109D-3AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFB-109D-3AV',
    price: 5043000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/02/EFB-109D-3AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efb-109d-3av/',
  },
  {
    category: 'Edifice',
    sku: 'ECB-2300D-1A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE ECB-2300D-1A',
    price: 8811000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/11/ECB-2300D-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-ecb-2300d-1a/',
  },
  {
    category: 'Edifice',
    sku: 'ECB-2300D-2A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE ECB-2300D-2A',
    price: 8811000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/11/ECB-2300D-2A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-ecb-2300d-2a/',
  },
  {
    category: 'Edifice',
    sku: 'ECB-2300DC-1A',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE ECB-2300DC-1A',
    price: 11454000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/11/ECB-2300DC-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-ecb-2300dc-1a/',
  },
  {
    category: 'Edifice',
    sku: 'EFV-C120D-1A4',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFV-C120D-1A4',
    price: 3973000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/10/EFV-C120D-1A4.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efv-c120d-1a4/',
  },
  {
    category: 'Edifice',
    sku: 'EFV-C120P-1A2',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFV-C120P-1A2',
    price: 3781000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/10/EFV-C120P-1A2.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efv-c120p-1a2/',
  },
  {
    category: 'Edifice',
    sku: 'EFB-730L-7AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFB-730L-7AV',
    price: 5376000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/10/EFB-730L-7AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efb-730l-7av/',
  },
  {
    category: 'Edifice',
    sku: 'EFB-730D-2BV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFB-730D-2BV',
    price: 5817000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/10/EFB-730D-2BV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efb-730d-2bv/',
  },
  {
    category: 'Edifice',
    sku: 'EFB-730D-3AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO EDIFICE EFB-730D-3AV',
    price: 5817000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/10/EFB-730D-3AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-edifice-efb-730d-3av/',
  },
  {
    category: 'Baby-G',
    sku: 'BA-110MC-7A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BA-110MC-7A',
    price: 4195000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/BA-110MC-7A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-ba-110mc-7a/',
  },
  {
    category: 'Baby-G',
    sku: 'BA-110MC-6A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BA-110MC-6A',
    price: 4195000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/BA-110MC-6A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-ba-110mc-6a/',
  },
  {
    category: 'Baby-G',
    sku: 'BA-110MC-2A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BA-110MC-2A',
    price: 4195000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/BA-110MC-2A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-ba-110mc-2a/',
  },
  {
    category: 'Baby-G',
    sku: 'BG-169KB-4B1',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BG-169KB-4B1',
    price: 3058000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/BG-169KB-4B1.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bg-169kb-4b1/',
  },
  {
    category: 'Baby-G',
    sku: 'BG-169KB-4',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BG-169KB-4',
    price: 3058000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/BG-169KB-4.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bg-169kb-4/',
  },
  {
    category: 'Baby-G',
    sku: 'BG-169KB-1',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BG-169KB-1',
    price: 3058000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/BG-169KB-1.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bg-169kb-1/',
  },
  {
    category: 'Baby-G',
    sku: 'BGA-15K-7A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGA-15K-7A',
    price: 3058000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/BGA-15K-7A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bga-15k-7a/',
  },
  {
    category: 'Baby-G',
    sku: 'BGA-15K-6A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGA-15K-6A',
    price: 3058000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/BGA-15K-6A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bga-15k-6a/',
  },
  {
    category: 'Baby-G',
    sku: 'BGA-15K-4A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGA-15K-4A',
    price: 3058000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/BGA-15K-4A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bga-15k-4a/',
  },
  {
    category: 'Baby-G',
    sku: 'BGA-15K-2A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGA-15K-2A',
    price: 3058000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/BGA-15K-2A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bga-15k-2a/',
  },
  {
    category: 'Baby-G',
    sku: 'BGD-565SC-1',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGD-565SC-1',
    price: 2973000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/BGD-565SC-1.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bgd-565sc-1/',
  },
  {
    category: 'Baby-G',
    sku: 'BGD-565SC-2B',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGD-565SC-2B',
    price: 2973000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/BGD-565SC-2B.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bgd-565sc-2b/',
  },
  {
    category: 'Baby-G',
    sku: 'BGD-565SC-4B',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGD-565SC-4B',
    price: 2973000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/BGD-565SC-4B.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bgd-565sc-4b/',
  },
  {
    category: 'Baby-G',
    sku: 'BA-110PD-2A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BA-110PD-2A',
    price: 4407000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/02/BA-110PD-2A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-ba-110pd-2a/',
  },
  {
    category: 'Baby-G',
    sku: 'BA-110PD-4A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BA-110PD-4A',
    price: 4407000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/02/BA-110PD-4A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-ba-110pd-4a/',
  },
  {
    category: 'Baby-G',
    sku: 'BA-110PS-7A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BA-110PS-7A',
    price: 4458000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/02/BA-110PS-7A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-ba-110ps-7a/',
  },
  {
    category: 'Baby-G',
    sku: 'BGD-10KH-1',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGD-10KH-1',
    price: 2447000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/01/BGD-10KH-1.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bgd-10kh-1/',
  },
  {
    category: 'Baby-G',
    sku: 'BGD-10KH-7',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGD-10KH-7',
    price: 2447000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/01/BGD-10KH-7.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bgd-10kh-7/',
  },
  {
    category: 'Baby-G',
    sku: 'BGA-290FL-7A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGA-290FL-7A',
    price: 4195000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/11/BGA-290FL-7A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bga-290fl-7a/',
  },
  {
    category: 'Baby-G',
    sku: 'BGA-290FL-4A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGA-290FL-4A',
    price: 4195000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/11/BGA-290FL-4A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bga-290fl-4a/',
  },
  {
    category: 'Baby-G',
    sku: 'BGA-290FL-2A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGA-290FL-2A',
    price: 4195000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/11/BGA-290FL-2A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bga-290fl-2a/',
  },
  {
    category: 'Baby-G',
    sku: 'BGA-10D-6A',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGA-10D-6A',
    price: 2800000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/11/BGA-10D-6A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bga-10d-6a/',
  },
  {
    category: 'Baby-G',
    sku: 'BGA-10D-2A2',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGA-10D-2A2',
    price: 2800000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/11/BGA-10D-2A2.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bga-10d-2a2/',
  },
  {
    category: 'Baby-G',
    sku: 'BGA-10D-2A1',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGA-10D-2A1',
    price: 2800000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/11/BGA-10D-2A1.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bga-10d-2a1/',
  },
  {
    category: 'Baby-G',
    sku: 'BGD-10KH-9',
    name: 'Đồng Hồ Nữ Chính Hãng CASIO BABY-G BGD-10KH-9',
    price: 2447000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2025/11/BGD-10KH-9.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nu-chinh-hang-casio-baby-g-bgd-10kh-9/',
  },
  {
    category: 'Classic',
    sku: 'MQ-24DA-1A',
    name: 'Đồng Hồ Unisex Chính Hãng CASIO MQ-24DA-1A',
    price: 1709000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/MQ-24DA-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-unisex-chinh-hang-casio-mq-24da-1a/',
  },
  {
    category: 'Classic',
    sku: 'MQ-24DA-2A',
    name: 'Đồng Hồ Unisex Chính Hãng CASIO MQ-24DA-2A',
    price: 1709000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/MQ-24DA-2A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-unisex-chinh-hang-casio-mq-24da-2a/',
  },
  {
    category: 'Classic',
    sku: 'MQ-24DA-3A',
    name: 'Đồng Hồ Unisex Chính Hãng CASIO MQ-24DA-3A',
    price: 1709000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/MQ-24DA-3A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-unisex-chinh-hang-casio-mq-24da-3a/',
  },
  {
    category: 'Classic',
    sku: 'MQ-24GA-1A',
    name: 'Đồng Hồ Unisex Chính Hãng CASIO MQ-24GA-1A',
    price: 2360000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/MQ-24GA-1A.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-unisex-chinh-hang-casio-mq-24ga-1a/',
  },
  {
    category: 'Classic',
    sku: 'UTP-1302PD-1AV',
    name: 'Đồng Hồ Unisex Chính Hãng CASIO UTP-1302PD-1AV',
    price: 2080000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/UTP-1302PD-1AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-unisex-chinh-hang-casio-utp-1302pd-1av/',
  },
  {
    category: 'Classic',
    sku: 'UTP-1302PD-2A1V',
    name: 'Đồng Hồ Unisex Chính Hãng CASIO UTP-1302PD-2A1V',
    price: 2080000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/UTP-1302PD-2A1V.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-unisex-chinh-hang-casio-utp-1302pd-2a1v/',
  },
  {
    category: 'Classic',
    sku: 'UTP-1302PD-2A2V',
    name: 'Đồng Hồ Unisex Chính Hãng CASIO UTP-1302PD-2A2V',
    price: 2080000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/UTP-1302PD-2A2V.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-unisex-chinh-hang-casio-utp-1302pd-2a2v/',
  },
  {
    category: 'Classic',
    sku: 'UTP-1302PD-3A1V',
    name: 'Đồng Hồ Unisex Chính Hãng CASIO UTP-1302PD-3A1V',
    price: 2080000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/UTP-1302PD-3A1V.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-unisex-chinh-hang-casio-utp-1302pd-3a1v/',
  },
  {
    category: 'Classic',
    sku: 'UTP-1302PD-7AV',
    name: 'Đồng Hồ Unisex Chính Hãng CASIO UTP-1302PD-7AV',
    price: 2080000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/05/UTP-1302PD-7AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-unisex-chinh-hang-casio-utp-1302pd-7av/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B210D-7AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B210D-7AV',
    price: 3107000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/MTP-B210D-7AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b210d-7av/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B210D-2A2V',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B210D-2A2V',
    price: 3107000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/MTP-B210D-2A2V.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b210d-2a2v/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B210D-2A1V',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B210D-2A1V',
    price: 3107000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/MTP-B210D-2A1V.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b210d-2a1v/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B210D-1AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B210D-1AV',
    price: 3107000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/04/MTP-B210D-1AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b210d-1av/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B190L-7BV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B190L-7BV',
    price: 2901000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/MTP-B190L-7BV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b190l-7bv/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B190RGL-9BV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B190RGL-9BV',
    price: 3391000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/MTP-B190RGL-9BV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b190rgl-9bv/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B190G-9BV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B190G-9BV',
    price: 3863000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/MTP-B190G-9BV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b190g-9bv/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B190SG-9BV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B190SG-9BV',
    price: 3579000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/MTP-B190SG-9BV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b190sg-9bv/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B315D-1AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B315D-1AV',
    price: 3579000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/MTP-B315D-1AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b315d-1av/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B315D-7AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B315D-7AV',
    price: 3579000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/MTP-B315D-7AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b315d-7av/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B315L-2AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B315L-2AV',
    price: 3579000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/MTP-B315L-2AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b315l-2av/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B315L-3AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B315L-3AV',
    price: 3579000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/MTP-B315L-3AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b315l-3av/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B315L-4AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B315L-4AV',
    price: 3579000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/MTP-B315L-4AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b315l-4av/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B215D-1AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B215D-1AV',
    price: 2919000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/MTP-B215D-1AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b215d-1av/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B215D-2AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B215D-2AV',
    price: 2919000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/MTP-B215D-2AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b215d-2av/',
  },
  {
    category: 'Classic',
    sku: 'MTP-B215D-7AV',
    name: 'Đồng Hồ Nam Chính Hãng CASIO MTP-B215D-7AV',
    price: 2919000,
    image: 'https://cdn.casio-vietnam.vn/wp-content/uploads/2026/03/MTP-B215D-7AV.jpg',
    url: 'https://www.casio-vietnam.vn/dong-ho-nam-chinh-hang-casio-mtp-b215d-7av/',
  },
]

const categoryDefaults: Record<
  ProductCategory,
  {
    description: string
    caseMaterial: string
    strapMaterial: string
    waterResistance: string
    movement: ProductMovement
    gender: ProductGender
    features: string[]
    basePrice: number
  }
> = {
  'G-Shock': {
    description:
      'Dòng đồng hồ chống sốc bền bỉ, phù hợp vận động mạnh, du lịch và phong cách thể thao.',
    caseMaterial: 'Nhựa gia cường carbon / Resin',
    strapMaterial: 'Dây resin cao cấp',
    waterResistance: '200 mét',
    movement: 'Bluetooth',
    gender: 'Unisex',
    features: ['Chống va đập', 'Chống nước 200 mét', 'Đèn LED', 'Báo thức đa năng'],
    basePrice: 3490000,
  },
  Edifice: {
    description: 'Dòng đồng hồ nam lịch lãm, mặt số thể thao, hợp đi làm và gặp gỡ khách hàng.',
    caseMaterial: 'Thép không gỉ',
    strapMaterial: 'Dây kim loại / dây da',
    waterResistance: '100 mét',
    movement: 'Solar',
    gender: 'Nam',
    features: ['Chronograph', 'Vỏ thép không gỉ', 'Mặt kính khoáng', 'Lịch ngày'],
    basePrice: 4290000,
  },
  'Baby-G': {
    description:
      'Dòng đồng hồ nữ trẻ trung, gọn nhẹ, màu sắc nổi bật và bền bỉ cho sinh hoạt hằng ngày.',
    caseMaterial: 'Nhựa resin',
    strapMaterial: 'Dây nhựa mềm',
    waterResistance: '100 mét',
    movement: 'Quartz',
    gender: 'Nữ',
    features: ['Chống va đập', 'Chống nước 100 mét', 'Báo thức', 'Đèn LED'],
    basePrice: 2190000,
  },
  Classic: {
    description:
      'Dòng Casio phổ thông, thiết kế tối giản, dễ đeo, giá tốt và phù hợp sử dụng hằng ngày.',
    caseMaterial: 'Nhựa / hợp kim / thép không gỉ',
    strapMaterial: 'Dây kim loại / dây da / dây nhựa',
    waterResistance: '50 mét',
    movement: 'Quartz',
    gender: 'Unisex',
    features: ['Thiết kế dễ đeo', 'Mặt kính khoáng', 'Hiển thị ngày', 'Pin bền'],
    basePrice: 1290000,
  },
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const getFallbackPrice = (category: ProductCategory, index: number) =>
  categoryDefaults[category].basePrice + (index % 9) * 180000

const inferGender = (item: CasioSourceProduct): ProductGender => {
  const text = item.name.toLowerCase()
  if (text.includes('nữ')) return 'Nữ'
  if (text.includes('nam')) return 'Nam'
  return categoryDefaults[item.category].gender
}

const inferMovement = (item: CasioSourceProduct): ProductMovement => {
  const sku = item.sku.toUpperCase()
  if (sku.includes('ECB') || sku.includes('GBD') || sku.includes('GBX') || sku.includes('B300')) {
    return 'Bluetooth'
  }
  if (sku.includes('EFS') || sku.includes('EQB') || sku.includes('GST') || sku.includes('GW')) {
    return 'Solar'
  }
  return categoryDefaults[item.category].movement
}

const inferStrapMaterial = (item: CasioSourceProduct) => {
  const sku = item.sku.toUpperCase()
  if (sku.includes('D-') || sku.includes('D1') || sku.includes('D2') || sku.includes('D3')) {
    return 'Dây kim loại'
  }
  if (sku.includes('L-') || sku.includes('L1') || sku.includes('L7') || sku.includes('E-')) {
    return 'Dây da'
  }
  return categoryDefaults[item.category].strapMaterial
}

const makeSpecs = (item: CasioSourceProduct, index: number): ProductSpecs => ({
  size: `${38 + (index % 9)} x ${35 + (index % 8)} x ${8 + (index % 6)} mm`,
  weight: `${34 + (index % 86)} g`,
  caseMaterial: categoryDefaults[item.category].caseMaterial,
  strapMaterial: inferStrapMaterial(item),
  structure:
    item.category === 'G-Shock' || item.category === 'Baby-G' ? 'Chống va đập' : 'Tiêu chuẩn',
  waterResistance: categoryDefaults[item.category].waterResistance,
  batteryLife: inferMovement(item) === 'Solar' ? 'Tough Solar' : 'Xấp xỉ 2-3 năm',
  glass: 'Mặt kính khoáng',
  strapSize: `${140 + (index % 55)} mm`,
  other: 'Dữ liệu sản phẩm được tổng hợp từ trang Casio Việt Nam, dùng cho demo cửa hàng.',
})

const makeColorVariants = (item: CasioSourceProduct) => {
  const sku = item.sku.toUpperCase()
  if (sku.includes('G') || sku.includes('GD')) {
    return [
      { name: 'Vàng', value: 'gold', hex: '#d4af37' },
      { name: 'Đen', value: 'black', hex: '#111827' },
    ]
  }
  if (sku.includes('7') || sku.includes('8')) {
    return [
      { name: 'Bạc', value: 'silver', hex: '#c7c9cc' },
      { name: 'Trắng', value: 'white', hex: '#f8fafc' },
    ]
  }
  if (sku.includes('2')) {
    return [
      { name: 'Xanh', value: 'blue', hex: '#1d4ed8' },
      { name: 'Đen', value: 'black', hex: '#111827' },
    ]
  }
  return [
    { name: 'Đen', value: 'black', hex: '#111827' },
    { name: 'Bạc', value: 'silver', hex: '#c7c9cc' },
  ]
}

const buildDescription = (item: CasioSourceProduct) =>
  `${item.sku} thuộc dòng ${item.category}, sử dụng ảnh sản phẩm từ Casio Việt Nam và phù hợp khách hàng cần đồng hồ chính hãng, dễ chọn theo phong cách.`

export const initialProducts: Product[] = sourceProducts.map((item, index) => {
  const defaults = categoryDefaults[item.category]
  const price = item.price > 0 ? item.price : getFallbackPrice(item.category, index)
  const movement = inferMovement(item)
  const gender = inferGender(item)
  const hasDiscount = index % 5 === 0 || item.price === 0

  return {
    id: `casio-${slugify(item.sku)}`,
    sku: item.sku,
    name: item.name,
    price,
    originalPrice: hasDiscount ? Math.round((price * 1.18) / 10000) * 10000 : undefined,
    category: item.category,
    image: item.image,
    images: [item.image],
    description: buildDescription(item),
    fullDescription: `${item.name} là sản phẩm thuộc dòng ${item.category}. Mẫu này phù hợp để trưng bày trên website bán đồng hồ Casio, có giá bán tham khảo ${price.toLocaleString('vi-VN')} đ và liên kết nguồn từ ${item.url}.`,
    specs: makeSpecs(item, index),
    features: defaults.features,
    rating: Number((4.5 + (index % 6) * 0.07).toFixed(1)),
    reviews: 12 + ((index * 7) % 240),
    stock: index % 17 === 0 ? 3 : 6 + ((index * 5) % 32),
    sold: 10 + ((index * 11) % 420),
    badge: index < 12 ? 'New' : index % 9 === 0 ? 'Bán chạy' : undefined,
    isNew: index < 12,
    isLimited: item.sku.includes('MTG') || item.sku.includes('MRG') || index % 19 === 0,
    gender,
    movement,
    warrantyMonths: item.category === 'Classic' ? 18 : 24,
    tags: [item.category, item.sku, gender, movement, defaults.waterResistance, 'Casio Việt Nam'],
    colorVariants: makeColorVariants(item),
  }
})
