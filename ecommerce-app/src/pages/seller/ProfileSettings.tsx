import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import type { ProfileFormData } from "@/types/dashboard";

const defaultProfile = {
  storeName: "My Awesome Store",
  email: "seller@example.com",
  bio: "We sell amazing products with excellent customer service!",
};

export function ProfileSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: defaultProfile,
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile data:", data);
    toast.success("Profile updated successfully!", {
      description: "Your store information has been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your store profile information</p>
      </div>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Store Profile</CardTitle>
          <CardDescription>Update your store information visible to customers</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://api.dicebear.com/7.x/shapes/svg?seed=store" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image</Label>
                <Input id="profileImage" type="file" accept="image/*" {...register("profileImage")} />
                <p className="text-xs text-muted-foreground">Upload a new profile picture</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name *</Label>
              <Input
                id="storeName"
                placeholder="Enter your store name"
                {...register("storeName", { required: "Store name is required" })}
                className={errors.storeName ? "border-destructive" : ""}
              />
              {errors.storeName && <p className="text-sm text-destructive">{errors.storeName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Store Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell customers about your store..."
                rows={4}
                {...register("bio")}
              />
              <p className="text-xs text-muted-foreground">Brief description of your store (optional)</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-gradient-to-r from-primary to-accent">
                Save Changes
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
