'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import {
  PieChartOutlined,
  MailOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { useRouter } from 'next/navigation';
// import { ItemType } from 'antd/lib/menu/hooks/useItems';

// type MenuItem = ItemType & { children?: MenuItem[] };
type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: MenuItem[];
  onClick?: (key: string) => void;
};
// type MenuItem = Required<Pick<MenuProps['items'][number], 'key' | 'label' | 'icon'>> & {
//   children?: MenuItem[];
// };

const items: MenuItem[] = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: 'dashboard',
    children: [
      { key: 'dashboard', label: 'dashboard', icon: null },
      { key: '12', label: 'Option 2', icon: null },
      { key: '13', label: 'Option 3', icon: null },
      { key: '14', label: 'Option 4', icon: null },
    ],
  },
  {
    key: '2',
    icon: <PieChartOutlined />,
    label: 'invoices',
    children: [
      { key: 'dashboard/invoices', label: 'invoices', icon: null },
      { key: '22', label: 'Option 2', icon: null },
      {
        key: '23',
        label: 'Submenu',
        icon: null,
        children: [
          { key: '231', label: 'Option 1', icon: null },
          { key: '232', label: 'Option 2', icon: null },
          { key: '233', label: 'Option 3', icon: null },
        ],
      },
    ],
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label: 'customers Three',
    children: [
      { key: 'dashboard/customers', label: 'customers', icon: null },
      { key: '32', label: 'Option 2', icon: null },
      { key: '33', label: 'Option 3', icon: null },
      { key: '34', label: 'Option 4', icon: null },
    ],
  },
];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const App: React.FC = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['1']);
  //   const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const [current, setCurrent] = useState('1');
  const router = useRouter(); // 使用 useRouter 钩子
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  /**
   * 根据路径查找父级菜单项的key值
   *
   * @param items 菜单项数组
   * @param path 菜单项路径
   * @returns 返回找到的父级菜单项的key值，若未找到则返回undefined
   */
  const findParentKeyByPath = (
    items: MenuItem[],
    path: string,
  ): string | undefined => {
    for (const item of items) {
      if (item.children) {
        const found = item.children.some((child) => child.key === path);
        if (found) {
          return item.key;
        }
        // 递归寻找更深层的子菜单
        const deeperParent = findParentKeyByPath(item.children, path);
        if (deeperParent) {
          return deeperParent;
        }
      }
    }
  };

  /**
   * 激活菜单项
   *
   * @param items 菜单项数组
   * @param pathname 当前路径
   * @returns 激活后的菜单项数组
   */
  function activateMenuItem(items: MenuItem[], pathname: string): MenuItem[] {
    return items.map((item) => {
      if (item.key === pathname) {
        console.log('item', item);

        setCurrent(item.key);
        return { ...item, active: true };
      }

      if (item.children) {
        return { ...item, children: activateMenuItem(item.children, pathname) };
      }

      return item;
    });
  }

  useEffect(() => {
    // 根据 pathname 激活菜单项
    activateMenuItem(items, pathname.slice(1));
    // 使用函数寻找父级Key
    // parentKey 将会是 '2'，因为 'dashboard/invoices' 是在 key 为 '2' 的子项中
    const parentKey = findParentKeyByPath(items, pathname.slice(1)) ?? '';

    setStateOpenKeys([parentKey]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1,
    );
    console.log('openKeys', openKeys);
    console.log('currentOpenKey', currentOpenKey);
    setStateOpenKeys(openKeys);

    // open
    // if (currentOpenKey !== undefined) {
    //   const repeatIndex = openKeys
    //     .filter((key) => key !== currentOpenKey)
    //     .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

    //   setStateOpenKeys(
    //     openKeys
    //       // remove repeat key
    //       .filter((_, index) => index !== repeatIndex)
    //       // remove current level all child
    //       .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
    //   );
    // } else {
    //   // close
    //   setStateOpenKeys(openKeys);
    // }
  };

  const handleClick = (e: any) => {
    // 使用 Next.js 的 router.push 来导航
    router.push(`/${e.key}`);
  };

  // 转换原始菜单项数据以包含 Next.js Link
  const generateMenuItems = (items: MenuItem[]): MenuItem[] =>
    items.map((item) => {
      const { children, ...rest } = item;
      return {
        ...rest,
        children: children ? generateMenuItems(children) : undefined,
        onClick: handleClick,
      };
    });

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        // style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        //   theme={theme}
        onClick={onClick}
        style={{ width: 256, minWidth: 0, flex: 'auto', overflow: 'scroll' }}
        defaultOpenKeys={['1', 'dashboard']}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        selectedKeys={[current]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={generateMenuItems(items)}
      />
    </>
  );
};
export default App;

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
// const links = [
//   { name: 'Home', href: '/dashboard', icon: HomeIcon },
//   {
//     name: 'Invoices',
//     href: '/dashboard/invoices',
//     icon: DocumentDuplicateIcon,
//   },
//   { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
// ];

// export default function NavLinks() {
//   const pathname = usePathname();

//   return (
//     <>
//       {links.map((link) => {
//         const LinkIcon = link.icon;
//         return (
//           <Link
//             key={link.name}
//             href={link.href}
//             className={clsx(
//               'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
//               {
//                 'bg-sky-100 text-blue-600': pathname === link.href,
//               },
//             )}
//           >
//             <LinkIcon className="w-6" />
//             <p className="hidden md:block">{link.name}</p>
//           </Link>
//         );
//       })}
//     </>
//   );
// }
