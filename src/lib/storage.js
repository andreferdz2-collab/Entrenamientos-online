import { supabase } from "./supabaseClient";

/*
 * Reemplazo de window.storage (solo disponible dentro de un artifact de
 * Claude) por una tabla simple en Supabase: kv_store(key text primary key,
 * value text, updated_at timestamptz).
 *
 * Mantiene la misma forma que usa App.jsx: get/set/delete/list(key, shared).
 * El parámetro "shared" se ignora — en esta app toda la data ya se guardaba
 * como compartida (entrenadora y clientas leen la misma tabla).
 */

export const storage = {
  async get(key) {
    const { data, error } = await supabase
      .from("kv_store")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    return { key, value: data.value };
  },

  async set(key, value) {
    const { error } = await supabase
      .from("kv_store")
      .upsert({ key, value, updated_at: new Date().toISOString() });
    if (error) throw error;
    return { key, value };
  },

  async delete(key) {
    const { error } = await supabase.from("kv_store").delete().eq("key", key);
    if (error) throw error;
    return { key, deleted: true };
  },

  async list(prefix = "") {
    const { data, error } = await supabase
      .from("kv_store")
      .select("key")
      .ilike("key", `${prefix}%`);
    if (error) throw error;
    return { keys: (data || []).map((d) => d.key) };
  },
};

// Compatibilidad: expone window.storage con la misma firma que App.jsx ya
// usa (get/set/delete/list con un segundo argumento "shared" que aquí se
// ignora), para no tener que tocar el resto del código de App.jsx.
if (typeof window !== "undefined") {
  window.storage = {
    get: (key, _shared) => storage.get(key),
    set: (key, value, _shared) => storage.set(key, value),
    delete: (key, _shared) => storage.delete(key),
    list: (prefix, _shared) => storage.list(prefix),
  };
}
