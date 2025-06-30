import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace(`/login?redirect=${encodeURIComponent(router.asPath)}`);
      }
    }, [user, loading, router]);

    if (loading) return null; // or a spinner
    if (!user) return null;
    return <Component {...props as P} />;
  };
}
