import NavItem from "./NavItem";

export default function SideBar() {
    return (
        <div className="drawer-side">
            <label htmlFor="main-menu" className="drawer-overlay"></label>
            <aside id="drawer-menu" className={`flex flex-col justify-between border-r border-base-200 bg-base-100 text-base-content w-80 overflow-hidden`} >
                <input id="my-drawer" type="hidden" className="drawer-toggle" />
                <div className="drawer-side w-auto h-screen">
                    <ul className="flex-grow menu p-4 bg-base-100">
                        <li>
                            <NavItem href="/app" texto="Inicio" />
                        </li>
                        <li>
                            <NavItem href="/app/purchases" texto="Compras" />
                        </li>
                        <li>
                            <NavItem href="/app/sales" texto="Vendas" />
                        </li>
                        <li>
                            <NavItem href="/app/companyManagement" texto="Gerenciamento de empresa" />
                        </li>
                        <li>
                            <NavItem href="/app/productManagement" texto="Cadastro de produtos" />
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}