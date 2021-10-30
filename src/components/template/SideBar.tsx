import NavItem from "./NavItem";
import useAppData from "../../data/hook/useAppData";

export default function SideBar() {
    const { mode } = useAppData()

    function renderSideMenu() {
        if (mode == "provider") {
            return (
                <>
                    <li>
                        <NavItem href="/app" texto="Inicio" />
                    </li>
                    <li>
                        <NavItem href="/app/sales" texto="Vendas" />
                    </li>
                    <li>
                        <NavItem href="/app/purchaseOrders" texto="Pedidos" />
                    </li>
                    <li>
                        <NavItem href="/app/budgetsOrders" texto="Orçamentos" />
                    </li>
                    <li>
                        <NavItem href="/app/productManagement" texto="Produtos" />
                    </li>
                    <li>
                        <NavItem href="/app/buyers" texto="Clientes" />
                    </li>
                    <li>
                        <NavItem href="/app/companyManagement" texto="Suas Empresas" />
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li>
                        <NavItem href="/app" texto="Inicio" />
                    </li>
                    <li>
                        <NavItem href="/app/purchases" texto="Compras" />
                    </li>
                    <li>
                        <NavItem href="/app/budgets" texto="Orçamentos" />
                    </li>
                    <li>
                        <NavItem href="/app/partnersProviders" texto="Fornecedores Parceiros" />
                    </li>
                    <li>
                        <NavItem href="/app/companyManagement" texto="Suas Empresas" />
                    </li>
                </>
            )
        }
    }

    return (
        <div className="drawer-side">
            <label htmlFor="main-menu" className="drawer-overlay"></label>
            <aside id="drawer-menu" className={`flex flex-col justify-between border-r border-base-200 bg-base-100 text-base-content w-80 overflow-hidden`} >
                <input id="my-drawer" type="hidden" className="drawer-toggle" />
                <div className="drawer-side w-auto h-screen">
                    <ul className="flex-grow menu p-4 bg-base-100">
                        {renderSideMenu()}
                    </ul>
                </div>
            </aside>
        </div>
    )
}