import { useContext } from 'react'
import { FavsContext } from '../../context/FavsContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

const VITE_API_URL = import.meta.env.VITE_API_URL;
const useFavorites = (_id) => {

    const authUser = useSelector((state) => state.user.user);

    const { favIds, setFavIds, getFavoriteProducts, setFavsCount } = useContext(FavsContext)

    const match = favIds?.includes(_id);

      // Handle Toggle Favorites
      const toggleFavorites = async (productId) => {
        if (authUser) {
          
          try {
            const res = await axios.put(
              `${VITE_API_URL}/api/v1/users/favorites`,
              { userId: authUser?._id, productId },
              { withCredentials: true }
            );
    
            if (res?.data?.success === true) {
              toast.success(res?.data?.message);
              setFavIds(res?.data?.favorites);
              setFavsCount(res?.data?.favorites?.length);
              getFavoriteProducts();
            }
          } catch (error) {
            console.log(error);
            toast.error(error.message);
          }
        }
      };

      return { toggleFavorites, match}
}

export default useFavorites
