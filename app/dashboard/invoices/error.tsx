'use client'; // 指定该文件在客户端运行

import { useEffect } from 'react'; // 从 React 库中导入 useEffect 钩子

// 定义一个默认导出的错误组件
export default function Error({
    error, // 错误对象，包含错误信息
    reset, // 重置函数，用于尝试恢复应用状态
}: {
    error: Error & { digest?: string }; // 错误对象的类型定义，可能包含一个可选的 digest 属性
    reset: () => void; // 重置函数的类型定义
}) {
    // 使用 useEffect 钩子在组件挂载时执行副作用
    useEffect(() => {
        // 将错误信息输出到控制台，便于调试
        console.error(error);
    }, [error]); // 依赖项为 error，当 error 变化时重新执行

    // 返回组件的 JSX 结构
    return (
        <main className="flex h-full flex-col items-center justify-center"> {/* 主容器，使用 Flexbox 布局 */}
            <h2 className="text-center">Something went wrong!</h2> {/* 错误提示信息 */}
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400" // 按钮样式
                onClick={
                    // 点击按钮时调用重置函数，尝试重新渲染发票路由
                    () => reset()
                }
            >
                Try again {/* 按钮文本 */}
            </button>
        </main>
    );
}