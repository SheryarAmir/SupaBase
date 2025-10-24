import { supabase } from "@/constant/supabase-client";

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
