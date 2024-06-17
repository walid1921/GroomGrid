import { PAGE_SIZE } from "@/utils/constants";
import supabase from "./supabase";

// REMEMBER RLS POLICIES

type ClientsTypes = {
  search?: string;
  page: number;
};

//! Get clients
export async function getClients({ search, page }: ClientsTypes) {
  let query = supabase.from("clients").select("*", { count: "exact" });

  //! Search by name or email
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
