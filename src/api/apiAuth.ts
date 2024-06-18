import supabase from "./supabase";

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
