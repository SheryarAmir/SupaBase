import { supabase } from "@/constant/supabase-client";

/**
 * Uploads a seller profile image to Supabase Storage and returns the public URL
 * @param file - The image file to upload
 * @returns The public URL of the uploaded image
 */
export const uploadSellerProfileImage = async (file: File): Promise<string> => {
  try {
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed."
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("File size exceeds 5MB limit.");
    }

    // Create a unique file name
    const fileExt = file.name.split(".").pop();
    const fileName = `seller_profile_${Math.random()
      .toString(36)
      .substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `seller-profiles/${fileName}`;

    console.log("Uploading seller profile image:", fileName);

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from("usersImages")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("usersImages").getPublicUrl(filePath);

    console.log("Seller profile image uploaded successfully:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("Error uploading seller profile image:", error);
    throw error instanceof Error ? error : new Error("Upload failed");
  }
};
