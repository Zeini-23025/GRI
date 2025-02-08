import { useNavigate } from "react-router-dom";

export const useLogout= () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprimer les tokens et rediriger
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
        window.scrollTo({
          top: 0,
          behavior: 'instant' // Changement immédiat sans animation
        });
      };


      return handleLogout

}