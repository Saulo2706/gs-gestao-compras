import NavItem from "./NavItem";

export default function SideBar() {
    return (
        <aside className={`flex flex-col`}>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side w-auto h-full">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
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
                        <NavItem href="/main/companyProviderRegister" texto="Cadastro de empresa - Fornecedor" />
                    </li>
                    <li>
                        <NavItem href="/main/companyBuyerRegister" texto="Cadastro de empresa - Comprador" />
                    </li>
                    <li>
                        <NavItem href="/main/productRegister" texto="Cadastro de produtos" />
                    </li>
                </ul>
            </div>
        </aside>
    )
}