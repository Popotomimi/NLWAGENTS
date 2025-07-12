import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  // Detecta tema atual no mount
  useEffect(() => {
    const hasDark = document.documentElement.classList.contains("dark");
    setIsDark(hasDark);
  }, []);

  // Alterna tema
  function toggleTheme() {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      setIsDark(true);
    }
  }

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b bg-background text-foreground">
      <Link to="/" className="text-lg font-semibold">
        <span>Let me ask</span>
      </Link>

      <div className="flex gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-muted transition cursor-pointer">
          {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
