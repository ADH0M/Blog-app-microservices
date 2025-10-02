import { FloatingDockDemo } from "@/components/hub/HubNavbar";
import { SidebarDemo } from "@/components/hub/Sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
return (
  <div className="flex flex-col container  ">
    <SidebarDemo/>
    <div className="p-4 text-center fixed bottom-0 left-1/2 -translate-x-1/2">
      <FloatingDockDemo />
    </div>
  </div>
);

};

export default layout;
