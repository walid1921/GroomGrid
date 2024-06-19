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

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data?.user;
}
