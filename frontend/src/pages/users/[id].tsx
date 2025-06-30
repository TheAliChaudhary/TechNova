import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import UserForm from '../../components/users/UserForm';
import { RootState } from '../../store/store';
import { withAuth } from '../../components/withAuth';

function EditUserPage() {
  const router = useRouter();
  const { id } = router.query;
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
      <UserForm userId={id as string} />
    </Layout>
  );
}

export default withAuth(EditUserPage); 