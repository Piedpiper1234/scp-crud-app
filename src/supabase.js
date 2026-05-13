import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eubvptgtxfahpxmrbpeh.supabase.co';
const supabaseKey = 'sb_publishable_CFpppwYxmIlvpB7ov2dgnw_LQNAaqOc';

export const supabase = createClient(supabaseUrl, supabaseKey);