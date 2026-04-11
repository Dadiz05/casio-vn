import React, { useState } from "react";
import { MessageCircle, X, Phone, MessageSquare, ExternalLink } from "lucide-react";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [showZaloModal, setShowZaloModal] = useState(false);

  return (
    <>
      {/* --- CỤM NÚT FLOATING BÊN GÓC PHẢI --- */}
      <div className="fixed right-6 bottom-6 flex flex-col items-end gap-4 z-[9999]">
        
        <div className={`flex flex-col gap-3 transition-all duration-500 transform ${
            isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          {/* 1. Nút Messenger - Mở link trực tiếp */}
          <div className="group flex items-center gap-3">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-3 py-1.5 rounded-lg shadow-xl font-medium">
              Messenger
            </span>
            <a
              href="https://m.me/your-page"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#0084FF] text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <MessageSquare size={24} />
            </a>
          </div>

          {/* 2. Nút Zalo - Bật Modal (Cái này thay đổi theo ý bạn) */}
          <div className="group flex items-center gap-3">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-3 py-1.5 rounded-lg shadow-xl font-medium">
              Zalo 
            </span>
            <button
              onClick={() => {
                setShowZaloModal(true);
                setIsOpen(false); // Đóng menu floating khi mở modal cho gọn
              }}
              className="w-14 h-14 bg-[#0068FF] text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-xl font-black">Zalo</span>
            </button>
          </div>

          {/* 3. Nút Điện thoại - Gọi điện trực tiếp */}
          <div className="group flex items-center gap-3">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-3 py-1.5 rounded-lg shadow-xl font-medium">
              Hotline
            </span>
            <a
              href="tel:+84123456789"
              className="w-14 h-14 bg-[#34b434] text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <Phone size={24} />
            </a>
          </div>
        </div>

        {/* Nút chính để Đóng/Mở menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 transform ${
            isOpen ? "bg-black rotate-180" : "bg-yellow-400 hover:bg-yellow-300 scale-110"
          }`}
        >
          {isOpen ? (
            <X size={32} className="text-white" />
          ) : (
            <MessageCircle size={32} className="text-black" />
          )}
        </button>
      </div>

      {/* --- MODAL ZALO (Hiện khi ấn vào nút Zalo) --- */}
      {showZaloModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
            
            <button 
              onClick={() => setShowZaloModal(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-10 flex flex-col md:flex-row gap-10">
              {/* Bên trái: Thông tin cửa hàng */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-900 text-yellow-400 rounded-2xl flex items-center justify-center font-bold text-xl border border-gray-700">CASIO</div>
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      Casio Việt Nam
                      <span className="bg-blue-500 text-white p-0.5 rounded-full"><ExternalLink size={12} /></span>
                    </h2>
                    <p className="text-gray-500">Hệ thống đồng hồ chính hãng</p>
                  </div>
                </div>

                <a 
                  href="https://zalo.me/your-link" 
                  target="_blank"
                  className="w-full bg-[#0068FF] text-white py-4 rounded-2xl font-semibold mb-8 hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <MessageSquare size={20} /> Nhắn tin ngay
                </a>

                <div className="space-y-4 text-sm text-gray-600">
                  <p className="flex items-start gap-3">📍 <span>12 Nguyễn Văn Bảo, Hạnh Thông, Hồ Chí Minh 700000, Việt Nam</span></p>
                  <p className="flex items-start gap-3">📞 <span>024.2217.9999</span></p>
                  <p className="flex items-start gap-3">🟢 <span className="text-green-600 font-medium">Đang mở cửa</span> • Mở cửa lúc 09:00</p>
                </div>
              </div>

              {/* Bên phải: QR Code */}
              <div className="w-full md:w-56 flex flex-col items-center justify-center border-l border-gray-100 md:pl-10">
                <div className="bg-white p-3 border-2 border-dashed border-gray-200 rounded-3xl mb-4">
                  {/* Bạn thay link QR thật của bạn vào đây */}
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://zalo.me/your-id" alt="Zalo QR" className="w-40 h-40" />
                </div>
                <p className="text-center text-[11px] text-gray-400 px-4">
                  Sử dụng camera Zalo để quét mã và kết nối với chúng tôi
                </p>
              </div>
            </div>

            <div className="bg-gray-50 px-10 py-5 text-[10px] text-gray-400 text-center border-t border-gray-100">
              G-STORE® Official Online Store. Bản quyền thuộc về Casio VN © 2026.
            </div>
          </div>
        </div>
      )}
    </>
  );
}