import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'; // 导入图标组件
import Link from 'next/link'; // 导入 Next.js 的 Link 组件用于导航
import { deleteInvoice } from '@/app/lib/actions'; // 导入删除发票的函数

// 创建发票按钮组件
export function CreateInvoice() {
    return (
        // 使用 Link 组件创建一个导航链接，指向创建发票的页面
        <Link
            href="/dashboard/invoices/create" // 链接目标路径
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" // 按钮样式
        >
            <span className="hidden md:block">Create Invoice</span> {/* 在中等及以上屏幕显示的文本 */}
            <PlusIcon className="h-5 md:ml-4" /> {/* 加号图标 */}
        </Link>
    );
}

// 更新发票按钮组件
export function UpdateInvoice({ id }: { id: string }) {
    return (
        // 使用 Link 组件创建一个导航链接，指向编辑发票的页面
        <Link
            href={`/dashboard/invoices/${id}/edit`} // 链接目标路径，包含发票 ID
            className="rounded-md border p-2 hover:bg-gray-100" // 按钮样式
        >
            <PencilIcon className="w-5" /> {/* 铅笔图标 */}
        </Link>
    );
}

// 删除发票按钮组件
export function DeleteInvoice({ id }: { id: string }) {
    // 绑定删除发票函数，传入发票 ID
    const deleteInvoiceWithId = deleteInvoice.bind(null, id);
    return (
        // 使用 form 元素提交删除请求
        <form action={deleteInvoiceWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100"> {/* 按钮样式 */}
                <span className="sr-only">Delete</span> {/* 屏幕阅读器可见的文本 */}
                <TrashIcon className="w-5" /> {/* 垃圾桶图标 */}
            </button>
        </form>
    );
}
