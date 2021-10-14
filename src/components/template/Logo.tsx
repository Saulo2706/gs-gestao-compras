import Image from 'next/image'
export default function Logo(){
    return(
        <div className={`
            flex flex-col justify-center items-center
            h-10 w-10 rounded-full
            bg-blue-300
        `}>
            <div>
                <Image src="/img/logo.png" alt="Logo" width="30px" height="30px"/>
            </div>
        </div>
    )
}