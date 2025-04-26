// src/lib/uploadToCloud.ts
export const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'memoir'); // << your preset
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });
  
    if (!res.ok) {
      throw new Error('Cloudinary upload failed');
    }
  
    const data = await res.json();
    return data.secure_url; // ✅ The image URL
  };