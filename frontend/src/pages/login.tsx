import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { login, clearError } from '../store/slices/authSlice';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const { redirect } = router.query;

  useEffect(() => {
    // Only auto-redirect to /users if already logged in and no redirect param
    if (user && !redirect) {
      router.replace('/users');
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, router, dispatch, redirect]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await dispatch(login({ email, password }));
      toast.success('Login successful');
      if (redirect && typeof redirect === 'string') {
        router.replace(redirect as string);
      } else {
        router.replace('/users');
      }
    } catch (error) {
      toast.error(`Operation failed: ${error}`);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              required
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                Don&apos;t have an account?{' '}
                <Button
                  color="primary"
                  onClick={() => router.push('/register')}
                  sx={{ p: 0 }}
                >
                  Register
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Layout>
  );
} 