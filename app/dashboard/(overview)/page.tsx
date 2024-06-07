import { Metadata } from 'next';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
import { Card } from '@/app/ui/dashboard/cards';
import CardWrapper from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

export const metadata: Metadata = {
  title: 'dashboard',
};
export default function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      {/* 希望同时加载多个组件时，可以使用此模式 */}
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div> */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={1} type="collected" />
        <Card title="Pending" value={2} type="pending" />
        <Card title="Total Invoices" value={3} type="invoices" />
        <Card title="Total Customers" value={4} type="customers" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart revenue={[]} />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices latestInvoices={[]} />
        </Suspense>
      </div>
    </main>
  );
}
