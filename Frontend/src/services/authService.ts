// import { supabase } from '../config/supabaseClient';
// import type { Provider } from '@supabase/supabase-js';

// export const loginWithProvider = async (provider: Provider) => {
//   const { error } = await supabase.auth.signInWithOAuth({
//     provider: provider,
//     options: {
//       redirectTo: `${window.location.origin}/auth/AuthCallback`, 
//     },
//   });

//   if (error) console.error(`Failed to log in with ${provider}:`, error.message);
// };
