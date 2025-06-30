import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import { createUser, updateUser } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';

interface UserFormProps {
  userId?: string;
}

export default function UserForm({ userId }: UserFormProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, users } = useSelector((state: RootState) => state.users);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (userId) {
      const user = users.find((u) => u._id === userId);
      if (user) {
        setFormData({
          name: user.name,
          email: user.email,
          password: '',
        });
      }
    }
  }, [userId, users]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (userId) {
        await dispatch(updateUser({ id: userId, userData: formData }));
        toast.success('User updated successfully');
      } else {
        await dispatch(createUser(formData));
        toast.success('User created successfully');
      }
      router.push('/users');
    } catch (error) {
      toast.error(`Operation failed: ${error}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {userId ? 'Edit User' : 'Add New User'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={!userId}
            margin="normal"
            helperText={userId ? 'Leave blank to keep current password' : ''}
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : userId ? (
                'Update'
              ) : (
                'Create'
              )}
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.push('/users')}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
} 