import { applyFilters } from "../hooks/applyFilters";
import supabase, { supabaseUrl } from "./supabase";

interface Shop {
  id?: number;
  name: string;
  image: File;
  [key: string]: any;
}

interface ShopResponse {
  id: number;
  [key: string]: any;
}

export async function getShops(filters: any) {
  let query: any = supabase.from("shop").select("*");

  query = applyFilters(query, filters);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Shops could not be loaded");
  }

  return data;
}

export async function getShop(id: number) {
  const { data, error } = await supabase
    .from("shop")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Shopping not found");
  }

  return data;
}

export async function CreateEditShop(newShop: Shop) {
  // https://ejnqnprxcxrkuuaiqdzw.supabase.co/storage/v1/object/public/shop-images//bed-02.png

  const ImageName = `${Math.random()}-${newShop.image.name}`;
  const ImagePath = `${supabaseUrl}/storage/v1/object/public/shop-images/${ImageName}`;
  // 1. Create Shop
  const { data, error } = (await supabase
    .from("shop")
    .insert([{ ...newShop, image: ImagePath }])
    .select()
    .single()) as { data: ShopResponse | null; error: any };

  if (error) {
    console.error(error);
    throw new Error("Shops could not be Created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("shop-images")
    .upload(ImageName, newShop.image);

  // 3.Delete shop if there was an error uploading image
  if (storageError && data) {
    await supabase.from("shop").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Shops image could not be uploaded and the shop is not be created"
    );
  }

  return data;
}
