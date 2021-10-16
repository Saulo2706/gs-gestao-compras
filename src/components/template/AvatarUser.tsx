/* eslint-disable @next/next/no-img-element */
interface AvatarUserProps {
    className?: string
}
export default function AvatarUser(props: AvatarUserProps) {
    //const {usuario} = useAuth
    return (
        <div tabIndex={0} className="dropdown dropdown-end">
            <div className="m-1">
                <img src={'/img/avatar.svg'}
                    alt="avatar"
                    className={`
                        h-6 w-6 rounded-full cursor-pointer
                        ${props.className}
                    `}
                />
            </div>
            <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-gray-100 text-gray-700 rounded-box w-52 mt-1">
                <li className="hover:bg-gray-200 rounded-box">
                    <a href="/main/user">Meus Dados</a>
                </li>
                <li className="hover:bg-gray-200 rounded-box">
                    <a href="/main/company">Minha Empresa</a>
                </li>
                <li className="hover:bg-gray-200 rounded-box">
                    <a>Sair</a>
                </li>
            </ul>
        </div>


    )
}