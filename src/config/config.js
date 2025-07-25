
// config/config.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Use a single client instance if preferred for performance,
// but the user's request implies creating a new client per call for dbClient()
// which is generally not recommended for server-side if many calls are made.
// However, I will adhere to the user's provided dbClient() function.
export default function dbClient() {
    const client = createClient(supabaseUrl, supabaseKey);
    return client;
}

