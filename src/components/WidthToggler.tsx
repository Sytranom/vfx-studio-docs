import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import { useContentWidthStore } from '@/hooks/use-content-width';

const WidthToggler = () => {
    const { width, toggle } = useContentWidthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if(!mounted) return <div className="w-9 h-9" />;

    const getIcon = () => {
        if (width === 'fluid') return faCompress;
        return faExpand;
    }

    const getTitle = () => {
        if (width === 'normal') return 'Change to wide width';
        if (width === 'wide') return 'Change to fluid width';
        return 'Change to normal width';
    }

    return (
        <button
            onClick={toggle}
            className="text-text-secondary text-xl w-9 h-9 grid place-items-center rounded-md transition-colors duration-200 ease-in-out hover:text-text-primary hover:bg-bg-main"
            title={getTitle()}
        >
            <FontAwesomeIcon icon={getIcon()} />
        </button>
    );
};

export default WidthToggler;