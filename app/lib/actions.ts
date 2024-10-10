'use server'; // 指定该文件在服务器端运行
import { z } from 'zod'; // 导入 zod 库用于数据验证
import { sql } from '@vercel/postgres'; // 导入 Vercel 的 Postgres 库用于数据库操作
import { revalidatePath } from 'next/cache'; // 导入 Next.js 的缓存重新验证功能
import { redirect } from 'next/navigation'; // 导入 Next.js 的重定向功能
export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
// 异步函数，用于删除指定 ID 的发票
export async function deleteInvoice(id: string) {
    try {
        // 执行 SQL 语句删除发票，使用传入的 ID
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        // 重新验证缓存路径，以确保数据是最新的
        revalidatePath('/dashboard/invoices');
        // 返回成功消息，表示发票已被删除
        return { message: 'Deleted Invoice.' };
    } catch (error) {
        // 捕获错误并返回错误消息
        return { message: 'Database Error: Failed to Delete Invoice.', error };
    }
}

// 定义表单数据的验证模式，使用 zod 库
const FormSchema = z.object({
    id: z.string(), // 发票 ID，字符串类型
    customerId: z.string({
        invalid_type_error: 'Please select a customer.', // 如果类型不正确，返回错误信息
    }), // 客户 ID，字符串类型
    amount: z.coerce.number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }), // 金额，强制转换为数字并验证大于0
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.', // 如果类型不正确，返回错误信息
    }), // 状态，枚举类型，必须为 'pending' 或 'paid'
    date: z.string(), // 日期，字符串类型
});

// 创建发票时使用的表单模式，不包括 ID 和日期
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// 异步函数，用于创建新发票
export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    // Insert data into the database
    try {
        await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: `'Database Error: Failed to Create Invoice.${error}`,
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

// 更新发票时使用的表单模式，不包括 ID 和日期
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// 异步函数，用于更新指定 ID 的发票
export async function updateInvoice(
    id: string, // 发票的唯一标识符
    prevState: State, // 之前的状态对象，包含可能的错误信息
    formData: FormData, // 表单数据，包含需要更新的字段
) {
    // 验证表单数据，确保数据符合预期格式
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'), // 从表单数据中获取客户 ID
        amount: formData.get('amount'), // 从表单数据中获取金额
        status: formData.get('status'), // 从表单数据中获取状态
    });

    // 如果表单验证失败，返回错误信息
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors, // 返回字段错误
            message: 'Missing Fields. Failed to Update Invoice.', // 返回失败消息
        };
    }

    // 解构验证后的数据
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100; // 将金额转换为分

    // 尝试更新数据库中的发票信息
    try {
        await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
    } catch (error) {
        // 捕获错误并返回错误消息
        return { message: 'Database Error: Failed to Update Invoice.', error };
    }

    // 重新验证缓存路径，以确保数据是最新的
    revalidatePath('/dashboard/invoices');
    // 重定向到发票仪表板
    redirect('/dashboard/invoices');
}