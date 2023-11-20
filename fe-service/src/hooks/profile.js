import { useContext } from 'react';
import ProfileContext from '../context/ProfileProvider';

const useProfile = () => useContext(ProfileContext);
export { useProfile };
