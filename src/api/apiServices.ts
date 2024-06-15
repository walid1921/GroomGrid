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
  const { data, error, count } = await supabase
    .from("services")
    .select("*", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching services");
  }

  return { data, count };
}

//! Create service
export async function createService(newService: NewServiceType) {
  let imagePath = newService.image;
  if (!imagePath.startsWith(supabaseUrl)) {
    imagePath = `${supabaseUrl}/storage/v1/object/public/service-images/${imagePath}.png`;
  }

  const { data, error } = await supabase
    .from("services")
    .insert([{ ...newService, image: imagePath }])
    .select()
    .single();

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

//! Update service
export async function updateService({
  id,
  updatedService,
}: {
  id: number;
  updatedService: NewServiceType;
}) {
  const imageName = updatedService.image;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/service-images/${imageName}.png`;

  const { data, error } = await supabase
    .from("services")
    .update({ ...updatedService, image: imagePath })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("An error occurred while updating service");
  }

  return data;
}
