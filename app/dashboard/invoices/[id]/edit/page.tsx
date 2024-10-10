import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    // 从参数中提取发票ID
    const id = params.id;

    // 使用Promise.all并行获取发票和客户数据
    const [invoice, customers] = await Promise.all([
        // 根据ID获取发票信息
        fetchInvoiceById(id),
        // 获取所有客户信息
        fetchCustomers(),
    ]);

    return (
        <main>
            {/* 渲染面包屑导航，显示当前页面的层级 */}
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' }, // 发票列表链接
                    {
                        label: 'Edit Invoice', // 当前页面标签
                        href: `/dashboard/invoices/${id}/edit`, // 当前页面链接
                        active: true, // 标记为活动页面
                    },
                ]}
            />
            {/* 渲染编辑表单，传递发票和客户数据 */}
            <Form invoice={invoice} customers={customers} />
        </main>
    );
}