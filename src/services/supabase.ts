import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ejnqnprxcxrkuuaiqdzw.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqbnFucHJ4Y3hya3V1YWlxZHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NzUzNTMsImV4cCI6MjA1NDA1MTM1M30.XK07tD1R6zl4qXkJTS5QKCvgbSIqkR0op40zSOty5Ew";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
