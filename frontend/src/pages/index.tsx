import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to TechNova
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Your modern project management and user platform
      </Typography>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={() => router.push('/login')}>
          Login
        </Button>
        <Button variant="outlined" color="primary" onClick={() => router.push('/register')}>
          Register
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => router.push('/users')}>
          Users
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => router.push('/task')}>
          Kanban Board
        </Button>
      </Box>
    </Container>
  );
} 