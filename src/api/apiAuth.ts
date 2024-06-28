import supabase, { supabaseUrl } from "./supabase";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error("An error occurred while logging in");
  }

  return { data };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error("An error occurred while logging out");
  }
}

//! Signup new user

type SignupData = {
  fullName: string;
  email: string;
  password: string;
};

export async function signup({ fullName, email, password }: SignupData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error("An error occurred while signing up");
  }

  return data;
}

//! Update user data
export async function updateUser({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}) {
  // 1. Update password or full name
  let updateData: any = {};  
  if (password) updateData = { password }; 
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData); 

  if (error) throw new Error(error.message);
  if (!avatar) return data; 


  // 3. but if there is an avatar then we here upload that
  const file = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(file, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. Update the avatar in the user
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `https://dwnblfbgetdoixzeonca.supabase.co/storage/v1/object/public/avatars/${file}`,
      },
    });
  if (updateError) throw new Error(updateError.message);
  return updatedUser;
}
