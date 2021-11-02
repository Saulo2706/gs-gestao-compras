/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
interface AvatarUserProps {
    className?: string
}
export default function AvatarUser(props: AvatarUserProps) {
    //const {usuario} = useAuth
    return (
        <div tabIndex={0} className="dropdown dropdown-end">
            <div className="mt-1 ml-3">
                <Image src={'/img/avatar.svg'}
                    alt="avatar"
                    width="24px"
                    height="24px"
                    className={`
                        rounded-full cursor-pointer
                        ${props.className}
                    `}
                />
            </div>
            <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-gray-100 text-gray-700 rounded-box w-52 mt-1">
                <li className="hover:bg-gray-200 rounded-box">
                    <Link href="/app/user">Meus Dados</Link>
                </li>
                <li className="hover:bg-gray-200 rounded-box">
                    <a>Sair</a>
                </li>
            </ul>
        </div>
    )
}