import { BookmarkIcon, HomeIcon,  MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeIconFilled,BookmarkIcon as BookmarkIconFilled,UserIcon as UserIconFilled } from 'react-native-heroicons/solid';
import { ROUTES } from '../Routes/RouteNames';

export const Icons = {
    [ROUTES.HOME]: ({ isFocused, color }) => 
        isFocused ? (
            <HomeIconFilled size={24} color={color} />
        ) : (
            <HomeIcon size={24} color={color} />
        ),
    [ROUTES.CATAGORIES]: ({ isFocused, color }) => 
        isFocused ? (
            <MagnifyingGlassIcon size={24} color={color} />
        ) : (
            <MagnifyingGlassIcon size={24} color={color} />
        ),
    [ROUTES.FAVOURITES]: ({ isFocused, color }) => 
        isFocused ? (
            <BookmarkIconFilled size={24} color={color} />
        ) : (
            <BookmarkIcon size={24} color={color} />
        ),
    [ROUTES.ACCOUNT]: ({ isFocused, color }) => 
        isFocused ? (
            <UserIconFilled size={24} color={color} />
        ) : (
            <UserIcon size={24} color={color} />
        ),
};
