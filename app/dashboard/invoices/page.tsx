import Pagination from '@/app/ui/invoices/pagination'; // 导入分页组件
import Search from '@/app/ui/search'; // 导入搜索组件
import Table from '@/app/ui/invoices/table'; // 导入发票表格组件
import { CreateInvoice } from '@/app/ui/invoices/buttons'; // 导入创建发票按钮
import { lusitana } from '@/app/ui/fonts'; // 导入字体样式
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'; // 导入发票表格加载骨架
import { Suspense } from 'react'; // 导入Suspense用于处理异步组件
import { fetchInvoicesPages } from '@/app/lib/data'; // 导入获取发票页面数据的函数

// 默认导出异步函数Page，接收搜索参数
export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string; // 搜索查询字符串
        page?: string; // 当前页码
    };
}) {
    // 从搜索参数中提取查询字符串，默认为空
    const query = searchParams?.query || '';
    // 从搜索参数中提取当前页码，默认为1
    const currentPage = Number(searchParams?.page) || 1;
    // 根据查询字符串获取总页数
    const totalPages = await fetchInvoicesPages(query);

    return (
        <div className="w-full"> {/* 主容器，设置宽度为100% */}
            <div className="flex w-full items-center justify-between"> {/* 顶部标题容器 */}
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1> {/* 发票标题 */}
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8"> {/* 搜索和创建按钮容器 */}
                <Search placeholder="Search invoices..." /> {/* 搜索框，提示文本为“搜索发票...” */}
                <CreateInvoice /> {/* 创建发票按钮 */}
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> {/* 异步加载表格，加载时显示骨架 */}
                <Table query={query} currentPage={currentPage} /> {/* 渲染发票表格，传递查询和当前页码 */}
            </Suspense>
            <div className="mt-5 flex w-full justify-center"> {/* 分页容器 */}
                <Pagination totalPages={totalPages} /> {/* 渲染分页组件，传递总页数 */}
            </div>
        </div>
    );
}