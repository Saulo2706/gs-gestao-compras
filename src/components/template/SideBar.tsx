import NavItem from "./NavItem";

export default function SideBar() {
    return (
        <aside id="drawer-menu" className={`hidden xl:flex flex-col`} >
            <input id="my-drawer" type="hidden" className="drawer-toggle" />
            <div className="drawer-side w-auto h-full">
            {/*<label htmlFor="my-drawer" className="drawer-overlay"></label>*/}
                <ul className="flex-grow menu p-4 bg-base-100">
                    <li>
                        <NavItem href="/main" texto="Inicio" />
                    </li>
                    <li>
                        <NavItem href="/main/purchases" texto="Compras" />
                    </li>
                    <li>
                        <NavItem href="/main/sales" texto="Vendas" />
                    </li>
                    <li>
                        <NavItem href="/main/companyRegister" texto="Cadastro de empresa" />
                    </li>
                    <li>
                        <NavItem href="/main/productRegister" texto="Cadastro de produtos" />
                    </li>
                </ul>
            </div>
        </aside>
    )
}