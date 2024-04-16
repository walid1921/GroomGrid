import supabase from "./supabase";

//! Get all services
export async function getServices() {
  const { data, error } = await supabase.from("services").select("*");

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching services");
  }

  return data;
}

//! Delete service
export async function deleteService(id: { id: number }) {
  const { data, error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("An error occurred while deleting service");
  }

  return data;
}

//! Create service
export async function createService(newService) {
  const { data, error } = await supabase.from("services").insert([newService]);

  if (error) {
    console.error(error);
    throw new Error("An error occurred while creating service");
  }

  return data;
}
