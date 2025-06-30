import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getCurrentUser } from '../store/slices/authSlice';

export default function SessionLoader() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user && typeof window !== 'undefined' && localStorage.getItem('token')) {
      dispatch(getCurrentUser());
    }
  }, [user, dispatch]);

  return null;
}