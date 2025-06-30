import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import UserList from '../../components/users/UserList';
import { RootState } from '../../store/store';
import { withAuth } from '../../components/withAuth';

function UsersPage() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <UserList />
    </Layout>
  );
}

export default withAuth(UsersPage); 