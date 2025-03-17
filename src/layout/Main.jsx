import { useState, useEffect } from "react";
import { Breadcrumb, Layout, Drawer } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import socket from "../socket";
import { useVendorProfile } from "../api/api";

const { Header, Content, Footer, Sider } = Layout;

const Main = () => {
  const { vendorProfile, isLoading } = useVendorProfile();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const vendorId = "v" + vendorProfile?.id;

  useEffect(() => {
    socket.emit("userConnected", vendorId);
  }, [vendorId]);

  const handleBeforeUnload = () => {
    if (vendorId) {
      socket.emit("disconnect", vendorId);
    }
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  // Generate Breadcrumbs dynamically
  const generateBreadcrumbItems = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return [
      { title: "Dashboard", href: "/" },
      ...pathnames.map((value, index) => {
        const url = `/${pathnames.slice(0, index + 1).join("/")}`;
        return {
          title: value.charAt(0).toUpperCase() + value.slice(1),
          href: url,
        };
      }),
    ];
  };

  // Handle Sidebar drawer visibility
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header className="bg-white sticky top-0 z-50 shadow-md w-full flex items-center px-6">
        <Navbar showDrawer={showDrawer} />
      </Header>
      <button onClick={showDrawer}></button>
      <Layout>
        {/* Sidebar (Desktop) */}
        {isLargeScreen && (
          <Sider
            width={320}
            className="hidden lg:block fixed left-0 top-16 h-full bg-white shadow-md"
          >
            <Sidebar />
          </Sider>
        )}

        {/* Sidebar Drawer (Mobile) */}
        <Drawer
          title="Navigation"
          placement="right"
          onClose={closeDrawer}
          open={drawerVisible}
          style={{ backgroundColor: "#f43f5e" }} // Rose color
          bodyStyle={{ padding: 0 }}
        >
          <Sidebar onClick={closeDrawer} />
        </Drawer>

        {/* Main Content Area */}
        <Layout
          className={`transition-all duration-300 ${
            isLargeScreen ? "ml-[320px]" : "ml-0"
          }`}
        >
          <Content className="px-6 pt-6">
            {/* Breadcrumbs */}
            <Breadcrumb className="mb-4 text-gray-600">
              {generateBreadcrumbItems().map((item, index) => (
                <Breadcrumb.Item key={index}>
                  <Link to={item.href}>{item.title}</Link>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>

            {/* Dynamic Content */}
            <div className="bg-white shadow-lg rounded-xl p-6 min-h-[80vh] border border-gray-200">
              <Outlet />
            </div>
          </Content>

          {/* Footer */}
          <Footer className="text-center text-gray-500 py-4">
            © {new Date().getFullYear()} Admin Dashboard - Powered by Ant Design
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Main;
