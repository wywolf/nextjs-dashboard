'use client';
import { updateInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import Link from 'next/link'; // 导入 Next.js 的 Link 组件用于页面导航
import {
    CheckIcon, // 导入检查图标
    ClockIcon, // 导入时钟图标
    CurrencyDollarIcon, // 导入货币图标
    UserCircleIcon, // 导入用户图标
} from '@heroicons/react/24/outline'; // 导入 Heroicons 图标库
import { Button } from '@/app/ui/button'; // 导入自定义按钮组件
// import { createInvoice } from '@/app/lib/actions'; // 导入创建发票的函数
import { CustomerField, InvoiceForm } from '@/app/lib/definitions'; // 导入客户字段类型定义 导入发票和客户字段的类型定义

// 定义表单组件，接收客户数据作为属性
export default function EditInvoiceForm({
    invoice,
    customers,
}: {
    invoice: InvoiceForm;
    customers: CustomerField[];
}) {
    const initialState: State = { message: null, errors: {} };
    const updateInvoiceWithId = updateInvoice.bind(null, invoice?.id);
    const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

    return (
        <form action={formAction}>  {/*  */}
            <div className="rounded-md bg-gray-50 p-4 md:p-6"> {/* 表单容器样式 */}
                {/* 客户名称选择 */}
                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Choose customer {/* 标签文本 */}
                    </label>
                    <div className="relative">
                        <select
                            id="customer" // 选择框 ID
                            name="customerId" // 选择框名称
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" // 选择框样式
                            defaultValue="" // 默认值为空
                            aria-describedby="customer-error"
                        >
                            <option value="" disabled> {/* 默认选项，禁用状态 */}
                                Select a customer
                            </option>
                            {customers.map((customer) => ( // 遍历客户数组，生成选项
                                <option key={customer.id} value={customer.id}> {/* 每个选项的 key 和 value */}
                                    {customer.name} {/* 显示客户名称 */}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> {/* 用户图标 */}
                    </div>
                    <div id="customer-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.customerId &&
                            state.errors.customerId.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* 发票金额输入 */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Choose an amount {/* 标签文本 */}
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="amount" // 输入框 ID
                                name="amount" // 输入框名称
                                type="number" // 输入类型为数字
                                step="0.01" // 允许小数点后两位
                                placeholder="Enter USD amount" // 输入框占位符
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" // 输入框样式
                                required // 必填项
                            />
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> {/* 货币图标 */}
                        </div>
                    </div>
                </div>

                {/* 发票状态选择 */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set the invoice status {/* 标签文本 */}
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3"> {/* 状态选择容器样式 */}
                        <div className="flex gap-4"> {/* Flexbox 布局 */}
                            <div className="flex items-center"> {/* 待处理状态 */}
                                <input
                                    id="pending" // 输入框 ID
                                    name="status" // 输入框名称
                                    type="radio" // 输入类型为单选框
                                    value="pending" // 单选框值
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2" // 单选框样式
                                />
                                <label
                                    htmlFor="pending" // 标签关联的输入框 ID
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600" // 标签样式
                                >
                                    Pending <ClockIcon className="h-4 w-4" /> {/* 待处理状态图标 */}
                                </label>
                            </div>
                            <div className="flex items-center"> {/* 已支付状态 */}
                                <input
                                    id="paid" // 输入框 ID
                                    name="status" // 输入框名称
                                    type="radio" // 输入类型为单选框
                                    value="paid" // 单选框值
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2" // 单选框样式
                                />
                                <label
                                    htmlFor="paid" // 标签关联的输入框 ID
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white" // 标签样式
                                >
                                    Paid <CheckIcon className="h-4 w-4" /> {/* 已支付状态图标 */}
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="mt-6 flex justify-end gap-4"> {/* 按钮容器样式 */}
                <Link
                    href="/dashboard/invoices" // 取消按钮链接
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200" // 按钮样式
                >
                    Cancel {/* 按钮文本 */}
                </Link>
                <Button type="submit">Create Invoice</Button> {/* 提交按钮 */}
            </div>
        </form>
    );
}