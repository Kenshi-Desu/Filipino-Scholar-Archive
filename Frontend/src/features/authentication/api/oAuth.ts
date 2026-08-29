import { supabase } from '@/config/supabaseClient';
import type { Provider } from '@supabase/supabase-js';

type LoginAction = () => Promise<void>;

export const AuthFactory = {
    oauth: function (provider: Provider): LoginAction {
        return async function () {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/AuthCallback`, 
                },
            });

            if (error) {
                console.error(`Failed to log in with ${provider}:`, error.message);
                throw error; 
            }
        };
    },

    credentials: function (email: string, pass: string): LoginAction {
        return async function () {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password: pass,
            });

            if (error) {
                console.error('Failed to log in with credentials:', error.message);
                throw error;
            }
        };
    }
};
