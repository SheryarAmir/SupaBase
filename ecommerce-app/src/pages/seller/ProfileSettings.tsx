import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useProfile, useUpdateProfile } from "@/hooks/sellerhooks/profileSettings.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { sellerProfileImage } from "@/services/seller/sellerProfileImage.service";
import { motion } from "framer-motion";

export default function ProfileSettings() {
  const { data, isLoading, error } = useProfile();
  const { mutateAsync, isPending } = useUpdateProfile();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  type FormValues = {
    name: string;
    storeDescription: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: data?.name ?? "",
      storeDescription: data?.storeDescription ?? "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name ?? "",
        storeDescription: data.storeDescription ?? "",
      });
      setPreviewUrl(data.profileImage ?? null);
    }
  }, [data, reset]);

  // Clean up object URLs when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: basic client-side validation (mirrors signup)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      let profileImageUrl = data?.profileImage ?? undefined;

      if (imageFile) {
        toast.loading("Uploading image...");
        try {
          profileImageUrl = await sellerProfileImage(imageFile);
        } finally {
          toast.dismiss();
        }
      }

      await mutateAsync({
        name: values.name,
        storeDescription: values.storeDescription,
        profileImage: profileImageUrl,
      });
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update profile");
    }
  };

  if (isLoading)
    return <p className="text-center py-10 text-lg">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Failed to load profile</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.h1
        className="text-3xl font-bold tracking-tight"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Profile Settings
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-2xl shadow-md border border-gray-200 dark:border-gray-800">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="flex flex-row items-center gap-4 pb-0">
              <div className="relative inline-block">
                <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                  <AvatarImage src={previewUrl || data?.profileImage || ""} />
                  <AvatarFallback>{data?.name?.[0]}</AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center border border-background shadow-sm"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">
                  {data?.name}
                </CardTitle>
                <p className="text-sm text-gray-500">{data?.email}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    {...register("name")}
                    placeholder="Your name"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={data?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Bio</Label>
                  <Textarea
                    {...register("storeDescription")}
                    placeholder="Tell buyers about yourself or your store"
                    className="bg-background min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={data?.role || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="font-medium">
                    {data?.created_at
                      ? new Date(data.created_at).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">
                    {data?.updated_at
                      ? new Date(data.updated_at).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isSubmitting || isPending}>
                  {isSubmitting || isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
