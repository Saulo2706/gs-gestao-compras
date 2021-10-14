import { IconAdjustments, IconBell, IconBrief, IconCompany, IconHome, IconLogout, IconQuestion, IconShopping, IconTag } from "../icons";

export default function SideBar() {
    return (
        <aside className={`flex flex-col`}>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side w-auto h-full">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="flex-grow menu p-4 bg-base-100">
                    <li>
                        <a>Menu Item</a>
                    </li>
                    <li>
                        <a>Menu Item</a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}