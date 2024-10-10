'use client'; // 指示该组件为客户端组件

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // 导入搜索图标
import { useSearchParams, usePathname, useRouter } from 'next/navigation'; // 导入Next.js的路由和搜索参数钩子
import { useDebouncedCallback } from 'use-debounce'; // 导入防抖回调函数

// 定义搜索组件，接收一个placeholder属性
export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams(); // 获取当前的搜索参数
    const pathname = usePathname(); // 获取当前路径
    const { replace } = useRouter(); // 获取路由替换方法

    // 定义处理搜索的防抖回调函数
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams); // 创建URL搜索参数对象
        params.set('page', '1'); // 设置当前页为1
        console.log(`Searching... ${term}`); // 打印搜索的关键词
        if (term) {
            params.set('query', term); // 如果有搜索关键词，设置查询参数
        } else {
            params.delete('query'); // 如果没有关键词，删除查询参数
        }
        replace(`${pathname}?${params.toString()}`); // 替换当前路径和搜索参数

    }, 300); // 设置防抖延迟为300毫秒

    return (
        <div className="relative flex flex-1 flex-shrink-0"> {/* 搜索框的容器 */}
            <label htmlFor="search" className="sr-only"> {/* 隐藏的标签，用于辅助技术 */}
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" // 输入框的样式
                placeholder={placeholder} // 设置输入框的占位符
                onChange={(e) => {
                    handleSearch(e.target.value); // 当输入框内容变化时，调用处理搜索函数
                }}
                defaultValue={searchParams.get('query')?.toString()} // 设置输入框的默认值为当前查询参数
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> {/* 搜索图标 */}
        </div>
    );
}
