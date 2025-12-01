import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {useProfile} from "@/hooks/sellerhooks/profileSettings.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ProfileFormData } from "@/types/dashboard";

export function ProfileSettings() {
  const { data, isLoading, error } = useProfile();

 console.log(data);

  return (
    <div>
      <h1>Profile Settings</h1>
      <p>{data?.name}</p>
      <p>{data?.email}</p>
      <p>{data?.role}</p>
      <p>{data?.bio}</p>
      <p>{data?.storeName}</p>
      <p>{data?.profileImage}</p>
      <p>{data?.created_at}</p>
      <p>{data?.updated_at}</p>
    </div>
  );
}
