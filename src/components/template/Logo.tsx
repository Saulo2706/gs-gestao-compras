import Image from 'next/image'
export default function Logo(){
    return(
        <div className={`
            flex flex-col justify-center items-center
            h-14 w-14 rounded-full
            bg-blue-500
        `}>
            <div>
                <Image src="/img/logo.png" alt="Logo" width="40px" height="40px"/>
            </div>
        </div>
    )
}