import { supabaseUrl } from "@/api/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/service-images/`;
// https://dwnblfbgetdoixzeonca.supabase.co/storage/v1/object/public/service-images/Long%20hair.png

interface Service {
  name: string;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
}

export const services: Service[] = [
  {
    name: "Haircut",
    regularPrice: 30,
    discount: 0,
    image: imageUrl + "Haircut.png",
    description:
      "Experience a precision haircut tailored to your style by our skilled barbers.",
  },
  {
    name: "Hair & Beard",
    regularPrice: 35,
    discount: 0,
    image: imageUrl + "Hair%20&%20Beard.png",
    description:
      "Get a complete makeover with our Hair & Beard package. ",
  },
  {
    name: "Long hair",
    regularPrice: 50,
    discount: 0,
    image: imageUrl + "Long%20hair.png",
    description:
      "Our Long Hair service includes a professional trim or style tailored for long hair.",
  },
  {
    name: "Beard",
    regularPrice: 25,
    discount: 0,
    image: imageUrl + "Beard.png",
    description:
      "Keep your beard looking neat and stylish with our expert beard trimming and shaping service.",
  },
];
