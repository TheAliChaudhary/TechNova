import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import UserForm from '../../components/users/UserForm';
import { RootState } from '../../store/store';
import { withAuth } from '../../components/withAuth';

function NewUserPage() {
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <UserForm />
    </Layout>
  );
}

export default withAuth(NewUserPage); 