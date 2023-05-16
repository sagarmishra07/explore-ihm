import CommonHead from "@/components/common/CommonHead";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";
import {useRouter} from "next/router";

const AdminDashboard = () => {
    const router = useRouter();

    return (
        <>
            <CommonHead title={"Dashboard"}/>


            <section>dashboard</section>

        </>
    );
};

AdminDashboard.Layout = AdminDashboardLayout;
export default AdminDashboard;
