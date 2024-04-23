import supabase, { supabaseUrl } from "./supabase";

type NewServiceType = {
  name: string;
  description: string;
  regularPrice: string;
  discount: string;
  image: string;
};

//! Get all services
export async function getServices() {
  const { data, error } = await supabase.from("services").select("*");

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching services");
  }

  return data;
}

//! Create service
export async function createService(newService: NewServiceType) {
  const imageName = newService.image;

  console.log("newService", newService);

    const imagePath = `${supabaseUrl}/storage/v1/object/public/service-images/${imageName}.png`;

  const { data, error } = await supabase
    .from("services")
    .insert([{ ...newService, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error("An error occurred while creating service");
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
