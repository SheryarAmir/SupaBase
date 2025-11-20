# Complete Signup Flow with Supabase

## 📋 Overview

Your application now has a complete **2-step signup flow** that:

1. Collects user account info (name, email, password, role)
2. Collects profile details (bio, store name, profile image)
3. Uploads profile image to Supabase Storage
4. Saves complete profile to Supabase Database

## 🔄 Data Flow

```
Signup Form (Step 1)
        ↓
   signupStore.setStep1()
        ↓
   Zustand Store (step1 data logged)
        ↓
Profile Form (Step 2)
        ↓
   signupStore.setStep2()
        ↓
   Zustand Store (step2 data logged)
        ↓
Complete Signup Button
        ↓
   handleSubmitSignup() - Combines step1 + step2
        ↓
   useSignUp() mutation
        ↓
   auth.services.signUp()
        ↓
   ┌─────────────────────────────────────┐
   │ 1. Create auth user                 │
   │ 2. Upload profile image to Storage  │
   │ 3. Save profile to database         │
   └─────────────────────────────────────┘
        ↓
   Success → Redirect to dashboard
```

## 📁 Files Modified/Created

### 1. **signupStore.ts** ✅

- Added console.log to `setStep1()` and `setStep2()`
- Logs both datasets for debugging

### 2. **types/profile.ts** ✅

Updated `UserProfile` interface to include:

```typescript
bio?: string;
storeName?: string;
profileImage?: string;
```

### 3. **services/upload.services.ts** ✅

Added new function:

```typescript
uploadProfileImage(file: File): Promise<string>
```

- Validates file type (JPEG, PNG, WebP, GIF)
- Validates file size (max 5MB)
- Uploads to `usersImages` bucket → `profile-images/` folder
- Returns public URL

### 4. **services/profile.services.ts** ✨ NEW

Created complete profile management service:

```typescript
createSellerProfile(userId, profileData); // Saves seller profile with image
createBuyerProfile(userId, profileData); // Saves buyer profile with image
getUserProfileById(userId); // Fetch user profile
updateUserProfile(userId, updates); // Update profile fields
```

### 5. **services/auth.services.ts** ✅

Enhanced `signUp()` to:

- Accept complete `SignUpCredentials` (including bio, storeName, profileImage)
- Create auth user first
- Then call `createSellerProfile()` or `createBuyerProfile()`
- Handle image upload automatically

### 6. **hooks/Authhooks/useAuth.hook.ts** ✅

Updated `useSignUp()` hook to:

- Clear store after successful signup
- Add error handling

### 7. **components/auth/CompleteSignupExample.tsx** ✨ NEW

Example component showing how to:

- Combine step1 + step2 data
- Submit complete signup
- Handle loading/error states

## 🚀 How to Use

### Step 1: User fills account info

```typescript
const { setStep1 } = useSignupStore();

setStep1({
  name: "John Doe",
  email: "john@example.com",
  password: "securePass123",
  role: "seller",
});
// Console logs: "Step 1 Data: {...}"
```

### Step 2: User fills profile info

```typescript
const { setStep2 } = useSignupStore();

setStep2({
  bio: "I sell handmade crafts",
  storeName: "John's Crafts",
  profileImage: fileObject, // File from input
});
// Console logs: "Step 2 Data: {...}"
```

### Step 3: Submit complete signup

```typescript
import { useSignUp } from "@/hooks/Authhooks/useAuth.hook";
import { useSignupStore } from "@/store/signupStore";

const { step1, step2 } = useSignupStore();
const { mutate: signup } = useSignUp();

const handleSubmit = () => {
  const signupData = {
    ...step1,
    bio: step2.bio,
    storeName: step2.storeName,
    profileImage: step2.profileImage,
  };

  signup(signupData); // Sends to Supabase
};
```

## 📊 Database Structure

Your `profiles` table should have:

```sql
-- profiles table
id (UUID, Primary Key)
name (VARCHAR)
email (VARCHAR)
role (VARCHAR) -- 'seller' or 'buyer'
bio (TEXT, nullable)
storeName (VARCHAR, nullable)
profileImage (VARCHAR, nullable) -- URL to image
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

## 🖼️ Image Upload Details

- **Bucket**: `usersImages`
- **Folder**: `profile-images/`
- **Max Size**: 5MB
- **Allowed Types**: JPEG, PNG, WebP, GIF
- **Returns**: Public URL

Example URL: `https://your-bucket.supabase.co/storage/v1/object/public/usersImages/profile-images/profile_xyz_1234567.jpg`

## ✅ Features

✓ Two-step form data collection
✓ Zustand store for state management
✓ Console logging for debugging
✓ Image validation (type & size)
✓ Image upload to Supabase Storage
✓ Profile data saved to database
✓ Role-based profile creation (seller/buyer)
✓ Error handling
✓ Automatic cleanup after signup
✓ Role-based redirect to dashboards

## 🔒 Security Notes

- Passwords are handled by Supabase Auth
- Images are validated before upload
- File size limited to 5MB
- File types restricted to images only
- All data transmitted securely via HTTPS

## 🧪 Testing

1. Open browser DevTools (F12)
2. Go to Console tab
3. Fill out step 1 form
4. Watch for "Step 1 Data: {...}" log
5. Fill out step 2 form
6. Watch for "Step 2 Data: {...}" log
7. Click submit and monitor for success/error messages

## 🐛 Debugging

Check console for logs from:

- `signupStore.ts` - Step 1 & 2 data
- `upload.services.ts` - "Uploading profile image...", "Profile image uploaded successfully: {URL}"
- `profile.services.ts` - "Seller/Buyer profile created successfully: {data}"
- `auth.services.ts` - "Sign up successful: {userId}"

## 📝 Next Steps

1. Update your signup form components to use this flow
2. Ensure your Supabase table schema matches
3. Create the migration if needed:
   ```sql
   ALTER TABLE profiles ADD COLUMN bio TEXT;
   ALTER TABLE profiles ADD COLUMN storeName VARCHAR(255);
   ALTER TABLE profiles ADD COLUMN profileImage VARCHAR(500);
   ```
4. Test the complete flow end-to-end
5. Configure error notifications for better UX
