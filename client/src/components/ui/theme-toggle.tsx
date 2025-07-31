import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { setTheme, theme, actualTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-gray-700 dark:text-gray-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all text-gray-700 dark:text-gray-300 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className={`cursor-pointer flex items-center px-3 py-2 text-sm rounded-sm transition-colors ${
            theme === 'light' 
              ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Sun className="mr-3 h-4 w-4" />
          <span>Light Mode</span>
          {theme === 'light' && <div className="ml-auto w-2 h-2 bg-cyan-500 rounded-full" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className={`cursor-pointer flex items-center px-3 py-2 text-sm rounded-sm transition-colors ${
            theme === 'dark' 
              ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Moon className="mr-3 h-4 w-4" />
          <span>Dark Mode</span>
          {theme === 'dark' && <div className="ml-auto w-2 h-2 bg-cyan-500 rounded-full" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className={`cursor-pointer flex items-center px-3 py-2 text-sm rounded-sm transition-colors ${
            theme === 'system' 
              ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Monitor className="mr-3 h-4 w-4" />
          <span>System Default</span>
          {theme === 'system' && <div className="ml-auto w-2 h-2 bg-cyan-500 rounded-full" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SimpleThemeToggle() {
  const { actualTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(actualTheme === 'dark' ? 'light' : 'dark')}
      className="relative h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-gray-700 dark:text-gray-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all text-gray-700 dark:text-gray-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}