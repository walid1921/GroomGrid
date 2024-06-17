import supabase from "./supabase";

// REMEMBER RLS POLICIES

//! Get clients
export async function getClients() {
  const { data, error, count } = await supabase
    .from("clients")
    .select("*", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching clients");
  }

  return { data, count };
}

//! Get a single client
export async function getClient(id: number) {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

//! Create client
type NewClientType = {
  fullName: string;
  email: string;
  phoneNumber: string;
  observations?: string;
};

export async function createClient(newClient: NewClientType) {
  const { data, error } = await supabase
    .from("clients")
    .insert([newClient])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("An error occurred while creating client");
  }

  return data;
}

//! Delete client
export async function deleteClient(id: number) {
  const { error } = await supabase.from("clients").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("An error occurred while deleting client");
  }
}
