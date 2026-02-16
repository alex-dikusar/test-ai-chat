import { useTheme } from './ThemeProvider';
import { Button } from '@/shared/ui';

const themeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme switcher"
      className="inline-flex items-center rounded-lg border border-border bg-muted/40 p-1"
    >
      {themeOptions.map(({ value, label }) => (
        <Button
          key={value}
          type="button"
          variant={theme === value ? 'secondary' : 'ghost'}
          size="sm"
          className="h-7 px-2.5 text-xs"
          aria-pressed={theme === value}
          onClick={() => setTheme(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
