import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "H.H. Trade International - Store Dashboard",
    description: "H.H. Trade International - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
