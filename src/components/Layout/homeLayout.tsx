import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useGlobalState } from "../../libs/state/globalState";
import { useState } from "react";
import Dropdown from "../Dropdown";
import { RiExpandLeftLine, RiExpandRightLine } from "react-icons/ri";

const HomeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { setTheme, theme } = useGlobalState();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <div className="w-full h-screen flex relative">
      <ProSidebar
        breakPoint="md"
        collapsed={collapsed}
        toggled={toggled}
        onToggle={() => setToggled(!toggled)}
      >
        <SidebarHeader>
          <div className="py-[15px] px-[10px] flex items-center justify-center overflow-clip">
            <p>{collapsed ? "LB" : "Lightbrain CMS"}</p>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaHome />}>
              <div>Home</div>
            </MenuItem>
            <MenuItem icon={<MdDashboard />}>
              <div>Dashboard</div>
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#373737] shadow-2xs dark:border-navy-700 flex items-center justify-between pr-4 px-4 z-10 ${
          collapsed ? "md:pl-24" : "md:pl-[280px]"
        } transition-all`}
      >
        <button
          onClick={() => {
            if (window.innerWidth < 768) {
              setToggled(!toggled);
            } else {
              setCollapsed(!collapsed);
            }
          }}
          className="text-gray-600 hover:text-gray-800 text-2xl"
        >
          {collapsed ? <RiExpandRightLine /> : <RiExpandLeftLine />}
        </button>
        <Dropdown
          // User Avatar
          button={
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer text-black">
              LB
            </div>
          }
          classNames="right-20"
        >
          <div className="bg-white dark:bg-[#373737] shadow-lg rounded-lg p-4 min-w-max">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-navy-800"
            >
              {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </Dropdown>
      </header>

      <main className="flex-1 overflow-y-auto mt-16">{children}</main>
    </div>
  );
};

export default HomeLayout;
