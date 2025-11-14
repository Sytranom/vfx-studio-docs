import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9"></div>;
  }

  const getNextTheme = () => {
    if (theme === 'system') return 'light';
    if (theme === 'light') return 'dark';
    return 'system';
  };

  const getIcon = () => {
    if (theme === 'system') return faDesktop;
    if (theme === 'light') return faSun;
    return faMoon;
  };

  return (
    <button
      onClick={() => setTheme(getNextTheme())}
      className="text-text-secondary text-xl w-9 h-9 grid place-items-center rounded-md transition-colors duration-200 ease-in-out hover:text-text-primary hover:bg-bg-main"
      title={`Change theme (current: ${theme})`}
    >
      <FontAwesomeIcon icon={getIcon()} />
    </button>
  );
};

export default ThemeSwitcher;