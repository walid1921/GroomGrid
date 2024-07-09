import { PAGE_SIZE } from "@/utils/constants";
import supabase from "./supabase";

// REMEMBER RLS POLICIES

//! Get clients
type ClientsTypes = {
  search?: string;
  page: number;
};

export async function getClients({ search, page }: ClientsTypes) {
  let query = supabase.from("clients").select("*", { count: "exact" });

  //! Search by name or email
  //  if (search) {query = query.ilike("fullName", `%${search}%`);} // This is the same as the next line but its just for one field
  if (search) {
    query = query.or(`fullName.ilike.%${search}%,email.ilike.%${search}%`);
  }

  //! Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching clients");
  }

  return { data, count };
}

//! get all clients without pagination
export async function getAllClients() {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("fullName", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching clients");
  }

  return data;
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
  const { error } = await supabase.from("clients").delete().eq("id", id); // delete and eq are methods from supabase to delete a record from the table clients where the id is equal to the id passed as an argument

  if (error) {
    console.error(error);
    throw new Error("An error occurred while deleting client");
  }
}
