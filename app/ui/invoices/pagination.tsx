'use client'; // 指示该组件是一个客户端组件

// 导入所需的图标和库
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'; // 导入左右箭头图标
import clsx from 'clsx'; // 导入clsx库，用于条件类名合并
import Link from 'next/link'; // 导入Next.js的Link组件，用于导航
import { generatePagination } from '@/app/lib/utils'; // 导入生成分页的工具函数

import { usePathname, useSearchParams } from 'next/navigation'; // 导入Next.js的钩子，用于获取当前路径和搜索参数

// 默认导出分页组件
export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname(); // 获取当前路径
    const searchParams = useSearchParams(); // 获取当前搜索参数
    const currentPage = Number(searchParams.get('page')) || 1; // 获取当前页码，默认为1

    // 创建页面URL的函数
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams); // 创建URL搜索参数对象
        params.set('page', pageNumber.toString()); // 设置页码参数
        return `${pathname}?${params.toString()}`; // 返回完整的URL
    };

    // NOTE: 在第11章取消注释此代码
    const allPages = generatePagination(currentPage, totalPages); // 生成所有页面的数组

    return (
        <>
            {/*  NOTE: 在第11章取消注释此代码 */}
            <div className="inline-flex">
                {/* 渲染左箭头 */}
                <PaginationArrow
                    direction="left"
                    href={createPageURL(currentPage - 1)} // 上一页的URL
                    isDisabled={currentPage <= 1} // 如果当前页小于等于1，则禁用
                />

                {/* 渲染页面数字 */}
                <div className="flex -space-x-px">
                    {allPages.map((page, index) => { // 遍历所有页面
                        let position: 'first' | 'last' | 'single' | 'middle' | undefined; // 定义页面位置

                        if (index === 0) position = 'first'; // 如果是第一个页面
                        if (index === allPages.length - 1) position = 'last'; // 如果是最后一个页面
                        if (allPages.length === 1) position = 'single'; // 如果只有一个页面
                        if (page === '...') position = 'middle'; // 如果是省略号

                        return (
                            <PaginationNumber
                                key={page}
                                href={createPageURL(page)} // 当前页面的URL
                                page={page} // 当前页面
                                position={position} // 页面位置
                                isActive={currentPage === page} // 判断当前页面是否为活动页面
                            />
                        );
                    })}
                </div>

                {/* 渲染右箭头 */}
                <PaginationArrow
                    direction="right"
                    href={createPageURL(currentPage + 1)} // 下一页的URL
                    isDisabled={currentPage >= totalPages} // 如果当前页大于等于总页数，则禁用
                />
            </div>
        </>
    );
}

// 渲染页面数字的组件
function PaginationNumber({
    page, // 当前页面
    href, // 当前页面的URL
    isActive, // 是否为活动页面
    position, // 页面位置
}: {
    page: number | string; // 页面类型
    href: string; // URL
    position?: 'first' | 'last' | 'middle' | 'single'; // 页面位置类型
    isActive: boolean; // 是否为活动页面
}) {
    // 根据页面状态设置类名
    const className = clsx(
        'flex h-10 w-10 items-center justify-center text-sm border', // 基础样式
        {
            'rounded-l-md': position === 'first' || position === 'single', // 第一个或单个页面的样式
            'rounded-r-md': position === 'last' || position === 'single', // 最后一个或单个页面的样式
            'z-10 bg-blue-600 border-blue-600 text-white': isActive, // 活动页面的样式
            'hover:bg-gray-100': !isActive && position !== 'middle', // 非活动页面的悬停样式
            'text-gray-300': position === 'middle', // 中间省略号的样式
        },
    );

    // 根据活动状态渲染不同的元素
    return isActive || position === 'middle' ? (
        <div className={className}>{page}</div> // 如果是活动页面或中间省略号，直接渲染数字
    ) : (
        <Link href={href} className={className}>
            {page} {/* 渲染页面数字的链接 */}
        </Link>
    );
}

// 渲染箭头的组件
function PaginationArrow({
    href, // 链接地址
    direction, // 方向：左或右
    isDisabled, // 是否禁用
}: {
    href: string; // URL
    direction: 'left' | 'right'; // 方向
    isDisabled?: boolean; // 是否禁用
}) {
    // 根据状态设置类名
    const className = clsx(
        'flex h-10 w-10 items-center justify-center rounded-md border', // 基础样式
        {
            'pointer-events-none text-gray-300': isDisabled, // 禁用状态的样式
            'hover:bg-gray-100': !isDisabled, // 非禁用状态的悬停样式
            'mr-2 md:mr-4': direction === 'left', // 左箭头的右边距
            'ml-2 md:ml-4': direction === 'right', // 右箭头的左边距
        },
    );

    // 根据方向渲染不同的图标
    const icon =
        direction === 'left' ? (
            <ArrowLeftIcon className="w-4" /> // 左箭头图标
        ) : (
            <ArrowRightIcon className="w-4" /> // 右箭头图标
        );

    // 根据禁用状态渲染不同的元素
    return isDisabled ? (
        <div className={className}>{icon}</div> // 如果禁用，渲染图标
    ) : (
        <Link className={className} href={href}>
            {icon} {/* 渲染可点击的图标 */}
        </Link>
    );
}