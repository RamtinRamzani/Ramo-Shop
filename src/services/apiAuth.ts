import supabase, { supabaseUrl } from "./supabase";

interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

interface UpdateUserData {
  password?: string;
  fullName?: string;
  avatar?: File;
}

export async function signup({ email, password, fullName }: SignupCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: UpdateUserData) {
  // 1. Update password or fullName
  let updateData: any = {};
  if (password) updateData.password = password;
  if (fullName) updateData.data = { ...updateData.data, fullName };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(`Error updating user: ${error.message}`);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Date.now()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError)
    throw new Error(`Error uploading avatar: ${storageError.message}`);

  // 3. Update the avatar URL in the user's metadata
  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: { avatar: avatarUrl },
  });

  if (error2) throw new Error(`Error updating user avatar: ${error2.message}`);

  return updatedUser;
}
