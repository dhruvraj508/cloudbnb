import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
    return(
        <div className="px-8 flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    );
}