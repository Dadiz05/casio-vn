import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function UploadImage({ onImageUpload, currentImage }) {
  const [preview, setPreview] = useState(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload(reader.result); // Truyền base64 hoặc URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUpload("");
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Hình ảnh sản phẩm
      </label>

      {preview ? (
        <div className="relative border-2 border-dashed border-gray-300 rounded-3xl overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 text-red-600"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl h-64 flex flex-col items-center justify-center transition-all ${
            isDragging
              ? "border-black bg-gray-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <Upload size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium">Kéo thả ảnh vào đây</p>
          <p className="text-sm text-gray-500 mt-1">hoặc</p>

          <label className="mt-4 cursor-pointer bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition">
            Chọn ảnh từ máy
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        Hỗ trợ: JPG, PNG, WebP • Kích thước khuyến nghị: 600x600px
      </p>
    </div>
  );
}
