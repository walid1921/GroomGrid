import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dwnblfbgetdoixzeonca.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3bmJsZmJnZXRkb2l4emVvbmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxMTMwNTQsImV4cCI6MjAyODY4OTA1NH0.bu-6rpnGN1kXaclh9MQ5t2Vx8x6mlfhWQPtU3_a9Nl8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
