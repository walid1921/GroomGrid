import supabase from "./supabase";

//! Get working time
export async function getWorkingTime() {
  const { data, error } = await supabase.from("workingTime").select("*");

  if (error) {
    console.error(error);
    throw new Error("Working time could not get loaded");
  }

  return data;
}

//! Update working time
export async function updateWorkingTime(
  id: number,
  workingTime: { day: string; isOpen: boolean; start: number; end: number }
) {
  const { data, error } = await supabase
    .from("workingTime")
    .update(workingTime)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("An error occurred while updating working time");
  }

  return data;
}
