import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function RootLayout() {
  return (
    <div>
      <NavBar />
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 12px" }}>
        <Outlet />
      </main>
    </div>
  );
}
