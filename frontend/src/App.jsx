import "./App.css"
import { useEffect } from 'react';
import Pages from "./components/pages/Pages"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  useEffect(() => {
    // Vérifier la validité du token au chargement de l'application
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('access_token');
      
      if (token) {
        try {
          const response = await fetch('/api/verify-token', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            // Si le token n'est pas valide, on déconnecte l'utilisateur
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_info');
          }
        } catch (error) {
          // En cas d'erreur, on déconnecte l'utilisateur
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_info');
        }
      }
    };

    checkTokenValidity();
    const handleTabClose = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_info');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);
  
  return <Pages />
}

export default App