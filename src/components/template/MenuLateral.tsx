import { IconAdjustments, IconBell, IconBrief, IconCompany, IconHome, IconLogout, IconQuestion, IconShopping, IconTag } from "../icons";
import MenuItem from "./MenuItem";
import Logo from "./Logo";

export default function MenuLateral(){
    return(
        <aside className={`
            flex flex-col
            dark:bg-gray-900 
            bg-gray-200 text-gray-700    
        `}>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-800
                h-20 w-20
            `}>
                <Logo></Logo>
            </div>
            <ul className={"flex-grow"}>
                <MenuItem url="/" texto="Inicio" icone={IconHome}/>
                <MenuItem url="/products" texto="Produtos" icone={IconShopping}/>
                <MenuItem url="/budget" texto="Orçamentos" icone={IconTag}/>
                <MenuItem url="/company" texto="Empresa" icone={IconCompany}/>
            </ul>
            <ul>
                <MenuItem texto="Politicas" icone={IconBrief}/>
                <MenuItem texto="Sobre nós" icone={IconQuestion}/>
            </ul>
        </aside>
    )
}