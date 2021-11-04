interface DataTableProps {
    id: string
    children: any
}

export default function DataTable(props: DataTableProps) {
    return (
        <table id={props.id} className="display">
                {props.children}
        </table>
    )
}