import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useProfile } from "@/hooks/sellerhooks/profileSettings.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ProfileFormData } from "@/types/dashboard";
import { motion } from "framer-motion";

export default function ProfileSettings() {
  const { data, isLoading, error } = useProfile();

  if (isLoading) return <p className="text-center py-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Failed to load profile</p>;

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
          <CardHeader className="flex flex-row items-center gap-4 pb-0">
            <Avatar className="h-16 w-16 ring-2 ring-primary/20">
              <AvatarImage src={data?.profileImage || ""} />
              <AvatarFallback>{data?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold">{data?.name}</CardTitle>
              <p className="text-sm text-gray-500">{data?.email}</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={data?.name || ""} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={data?.email || ""} disabled className="bg-muted" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Bio</Label>
                <Textarea value={data?.storeDescription || ""} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label>Store Name</Label>
                <Input value={data?.storeName || " for now empty"} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={data?.role || ""} disabled className="bg-muted" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Created At</p>
                <p className="font-medium">{new Date(data?.created_at).toLocaleDateString()}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">{new Date(data?.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
