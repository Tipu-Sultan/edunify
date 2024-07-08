import { useDispatch, useSelector } from 'react-redux';
import { signupService } from '../redux/services/authService';

const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = (userData) => {
    dispatch(signupService(userData));
  };

  return {
    handleRegister,
  };
};

export default useAuth;
