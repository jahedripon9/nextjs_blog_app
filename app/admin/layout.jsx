import Sidebar from "@/Components/AdminComponents/sidebar";

export default function layout({children}) {
    return (
        <>
            <div className="flex">
            <Sidebar />
            </div>
            {children}
        </>
    )
}