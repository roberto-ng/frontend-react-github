import { Outlet, useLocation } from "react-router";
import ListSvg from "../assets/list.svg";
import StarSvg from "../assets/star.svg";
import UserSvg from "../assets/user.svg";
import Tab from "../components/Tab";
import TabGroup from "../components/TabGroup";

export default function HomeLayout() {
    const { pathname } = useLocation();

    return (
        <div className="flex flex-1 px-2 flex-col items-center pt-5 min-h-svh bg-slate-800">
            <TabGroup>
                <Tab 
                    title="Repositórios públicos"
                    href="/repos/publicos"
                    iconSource={ListSvg}
                    activeRoute={pathname}
                />     

                <Tab 
                    title="Meus repositórios"
                    href="/repos/meus"
                    iconSource={UserSvg}
                    activeRoute={pathname}
                />   

                <Tab 
                    title="Repositórios favoritos"
                    href="/repos/favoritos"
                    iconSource={StarSvg}
                    activeRoute={pathname}
                />          
            </TabGroup>

            <div className="mt-3">
                <Outlet />
            </div>
        </div>
    );
}