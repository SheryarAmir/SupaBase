import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import type { AccountFormData } from "@/types/dashboard";
import { useAccountSettings } from "@/hooks/sellerhooks/AccountSettings.hook";

export function AccountSettings() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AccountFormData>();

  const newPassword = watch("newPassword");
  const {
    updatePassword,
    deleteAccount,
    isUpdatingPassword,
    isDeletingAccount,
  } = useAccountSettings();

  const onSubmit = async (data: AccountFormData) => {
    try {
      await updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
    } catch (error) {
      console.error("Password update failed", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action is irreversible and will permanently delete all your data."
      )
    ) {
      try {
        await deleteAccount();
      } catch (error) {
        console.error("Account deletion failed", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account security and preferences
        </p>
      </div>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your account password for security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password *</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                className={errors.currentPassword ? "border-destructive" : ""}
              />
              {errors.currentPassword && (
                <p className="text-sm text-destructive">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password *</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={errors.newPassword ? "border-destructive" : ""}
              />
              {errors.newPassword && (
                <p className="text-sm text-destructive">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className={errors.confirmPassword ? "border-destructive" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isUpdatingPassword}
              className="bg-gradient-to-r from-primary to-accent"
            >
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-medium border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions that will affect your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Delete Account</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. This will
                permanently delete your store, all products, orders, and
                customer data.
              </p>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={isDeletingAccount}
              >
                {isDeletingAccount ? "Deleting..." : "Delete My Account"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
