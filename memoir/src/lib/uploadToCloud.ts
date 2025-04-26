// src/lib/uploadToCloud.ts
export const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'memoir'); // << your preset
  
    const res = await fetch(`https://api.cloudinary.com/v1_1/dexzhuggv/image/upload`, {
      method: 'POST',
      body: formData,
    });
  
    if (!res.ok) {
      throw new Error('Cloudinary upload failed');
    }
  
    const data = await res.json();
    return data.secure_url; // ✅ The image URL
  };