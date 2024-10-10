// 该文件包含数据的类型定义。
// 它描述了数据的结构，以及每个属性应该接受的数据类型。
// 为了教学的简化，我们手动定义这些类型。
// 但是，如果你使用 ORM（如 Prisma），这些类型会自动生成。

// 定义用户类型
export type User = {
  id: string; // 用户 ID，字符串类型
  name: string; // 用户名，字符串类型
  email: string; // 用户邮箱，字符串类型
  password: string; // 用户密码，字符串类型
};

// 定义客户类型
export type Customer = {
  id: string; // 客户 ID，字符串类型
  name: string; // 客户名，字符串类型
  email: string; // 客户邮箱，字符串类型
  image_url: string; // 客户头像 URL，字符串类型
};

// 定义发票类型
export type Invoice = {
  id: string; // 发票 ID，字符串类型
  customer_id: string; // 客户 ID，字符串类型
  amount: number; // 发票金额，数字类型
  date: string; // 发票日期，字符串类型
  status: 'pending' | 'paid'; // 发票状态，枚举类型，只能是 'pending' 或 'paid'
};

// 定义收入类型
export type Revenue = {
  month: string; // 月份，字符串类型
  revenue: number; // 收入金额，数字类型
};

// 定义最新发票类型
export type LatestInvoice = {
  id: string; // 发票 ID，字符串类型
  name: string; // 客户名，字符串类型
  image_url: string; // 客户头像 URL，字符串类型
  email: string; // 客户邮箱，字符串类型
  amount: string; // 发票金额，字符串类型（格式化后的）
};

// 定义原始最新发票类型，金额为数字类型
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number; // 发票金额，数字类型
};

// 定义发票表类型
export type InvoicesTable = {
  id: string; // 发票 ID，字符串类型
  customer_id: string; // 客户 ID，字符串类型
  name: string; // 客户名，字符串类型
  email: string; // 客户邮箱，字符串类型
  image_url: string; // 客户头像 URL，字符串类型
  date: string; // 发票日期，字符串类型
  amount: number; // 发票金额，数字类型
  status: 'pending' | 'paid'; // 发票状态，枚举类型
};

// 定义客户表类型
export type CustomersTableType = {
  id: string; // 客户 ID，字符串类型
  name: string; // 客户名，字符串类型
  email: string; // 客户邮箱，字符串类型
  image_url: string; // 客户头像 URL，字符串类型
  total_invoices: number; // 总发票数，数字类型
  total_pending: number; // 总待处理发票数，数字类型
  total_paid: number; // 总已支付发票数，数字类型
};

// 定义格式化后的客户表类型
export type FormattedCustomersTable = {
  id: string; // 客户 ID，字符串类型
  name: string; // 客户名，字符串类型
  email: string; // 客户邮箱，字符串类型
  image_url: string; // 客户头像 URL，字符串类型
  total_invoices: number; // 总发票数，数字类型
  total_pending: string; // 总待处理发票数，字符串类型（格式化后的）
  total_paid: string; // 总已支付发票数，字符串类型（格式化后的）
};

// 定义客户字段类型
export type CustomerField = {
  id: string; // 客户 ID，字符串类型
  name: string; // 客户名，字符串类型
};

// 定义发票表单类型
export type InvoiceForm = {
  id: string; // 发票 ID，字符串类型
  customer_id: string; // 客户 ID，字符串类型
  amount: number; // 发票金额，数字类型
  status: 'pending' | 'paid'; // 发票状态，枚举类型
};
