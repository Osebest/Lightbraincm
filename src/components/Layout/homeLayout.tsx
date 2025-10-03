import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useGlobalState } from "../../libs/state/globalState";

const HomeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { collapsed, toggled, setToggled } = useGlobalState();

  return (
    <div className="w-full h-screen flex relative">
      <ProSidebar
        breakPoint="md"
        collapsed={collapsed}
        toggled={toggled}
        onToggle={() => setToggled(!toggled)}
        className="bg-[]"
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
      <main className="flex-1 overflow-y-auto mt-16">{children}</main>
    </div>
  );
};

export default HomeLayout;
