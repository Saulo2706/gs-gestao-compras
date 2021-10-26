interface ContentProps{
    children?:any
}
export default function Content(props: ContentProps){
    return(
        <div className={`
            flex flex-col p-3
            m-auto
            h-screen
            text-gray-800 
            dark:text-gray-200
        `}>
            {props.children}
        </div>
    )
}