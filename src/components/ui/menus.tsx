import {
  createContext,
  useContext,
  useState,
  ReactNode,
  MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { useOutsideClick } from "@/hooks/useOutsideClick";

// Define the types for the context and the props
interface MenusContextProps {
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: { x: number; y: number } | null;
  setPosition: (position: { x: number; y: number } | null) => void;
}

interface MenusProviderProps {
  children: ReactNode;
}

interface ToggleProps {
  id: string;
}

interface ListProps {
  id: string;
  children: ReactNode;
}

interface ButtonProps {
  children: ReactNode;
}

// Create the context
const MenusContext = createContext<MenusContextProps | undefined>(undefined);

const Menus = ({ children }: MenusProviderProps) => {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const close = () => {
    setOpenId("");
    setPosition(null);
  };

  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

function Toggle({ id }: ToggleProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Toggle must be used within a MenusProvider");
  }
  const { openId, close, open, setPosition } = context;

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="bg-none border-none p-1 rounded-sm translate-x-2 transition-all duration-200 hover:text-gray-100"
    >
      <HiDotsHorizontal size={25} />
    </button>
  );
}

function List({ id, children }: ListProps) {
  const context = useContext(MenusContext);
  const ref = useOutsideClick(() => {
    if (context) {
      context.close(); // Close the menu when clicking outside
    }
  });

  if (!context) {
    throw new Error("List must be used within a MenusProvider");
  }
  const { openId, position } = context;
  if (openId !== id || !position) return null;

  const style = {
    right: `${position.x}px`,
    top: `${position.y}px`,
  };

  return createPortal(
    <ul
      ref={ref}
      className="fixed bg-background shadow-md rounded-md py-2 px-2"
      style={style}
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children }: ButtonProps) {
  return (
    <li>
      <button className="w-full text-left border-none transition-all duration-200">
        {children}
      </button>
    </li>
  );
}

function Menu({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;
