// src/lib/uploadToCloud.ts
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dexzhuggv';
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'memoir';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Cloudinary upload failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  const secureUrl: string = data.secure_url || data.url;

  // Ensure delivery uses auto format/quality so browsers receive a compatible image
  if (secureUrl && secureUrl.includes('/upload/')) {
    return secureUrl.replace('/upload/', '/upload/f_auto,q_auto/');
  }

  return secureUrl;
};