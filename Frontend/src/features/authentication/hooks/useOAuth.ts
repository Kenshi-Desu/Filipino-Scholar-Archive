import { useState } from 'react';
import { AuthFactory } from '../api/oAuth';
import type { Provider } from '@supabase/supabase-js';

export function useOAuth() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function createLoginHandler(provider: Provider) {
        const loginAction = AuthFactory.oauth(provider);

        return async function () {
            setIsLoading(true);
            setError(null);
            try {
                await loginAction();
            } catch (err: any) {
                const name = provider.charAt(0).toUpperCase() + provider.slice(1);
                setError(err.message || `An error occurred during ${name} Sign-In`);
            } finally {
                setIsLoading(false);
            }
        };
    }

    return { createLoginHandler, isLoading, error };
}