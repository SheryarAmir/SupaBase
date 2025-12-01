import { supabase } from "@/constant/supabase-client";

/**
 * Uploads a profile image to Supabase Storage and returns the public URL
 */
export const uploadProfileImage = async (file: File): Promise<string> => {
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
    const fileName = `profile_${Math.random()
      .toString(36)
      .substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `profile-images/${fileName}`;

    console.log("Uploading profile image:", fileName);

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

    console.log("Profile image uploaded successfully:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error instanceof Error ? error : new Error("Upload failed");
  }
};

/**
 * Uploads an image to Supabase Storage and returns the public URL
 */
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Create a unique file name
    console.log("this is is the file", file);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`; // Store in uploads folder

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from("ProductImages") // Your bucket name
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
    } = supabase.storage.from("ProductImages").getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error instanceof Error ? error : new Error("Upload failed");
  }
};
