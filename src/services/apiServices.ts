import supabase from "./supabase";

export async function getServices() {
  const { data, error } = await supabase.from("services").select("*");

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching services");
  }

  return data;
}

export async function deleteService(id: { id: number }) {
  const { data, error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("An error occurred while deleting service");
  }

  return data;
}
