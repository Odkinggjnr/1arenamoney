import { useState } from "react";

export const useSidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen((prev) => !prev);
  const closeSidebar = () => setOpen(false);

  return { open, toggleSidebar, closeSidebar };
};
