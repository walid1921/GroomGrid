import supabase from "./supabase";

//! Get settings
export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

//! Update settings
// We expect a newSetting object that looks like {setting: newValue}
type updateSettingType = {
  [key: string]: string;
};
export async function updateSetting(newSetting: updateSettingType) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1) // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
