import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "H.H. Trade International - Admin",
    description: "H.H. Trade International - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
