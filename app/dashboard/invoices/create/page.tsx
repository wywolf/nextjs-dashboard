// import Form from '@/app/ui/invoices/create-form'; // 导入创建发票表单组件
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'; // 导入面包屑导航组件
// import { fetchCustomers } from '@/app/lib/data'; // 导入获取客户数据的函数
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Invoices',
};

// 默认导出异步函数Page
export default async function Page() {
    // 调用fetchCustomers函数以获取客户数据
    // const customers = await fetchCustomers();

    // 返回主页面的JSX结构
    return (
        <main>
            {/* 渲染面包屑导航，显示当前页面的层级 */}
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' }, // 发票链接
                    {
                        label: 'Create Invoice', // 当前页面标签
                        href: '/dashboard/invoices/create', // 当前页面链接
                        active: true, // 标记为活动页面
                    },
                ]}
            />
            {/* 渲染创建发票表单，并传递客户数据作为属性 */}
            {/* <Form customers={customers} /> */}
        </main>
    );
}