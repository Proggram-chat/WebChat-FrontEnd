'use client';
import { HamburgerMenuIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import type { ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Input } from '@/shared/components/ui/input';

interface SideBarProps {
  chats: ReactNode;
}

export const SideBar = ({ chats }: SideBarProps) => {
  return (
    <div className="max-h-[100vh]">
      <div className="bg-white gap-4 flex items-center justify-between w-full shadow-sm h-[50px] px-4 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <HamburgerMenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-[10px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Leave</DropdownMenuLabel>

            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="w-full flex">
          <Input icon={<MagnifyingGlassIcon />} placeholder="Search..." />
        </div>
      </div>
      <Scrollbars style={{ width: '100%', height: '100vh' }} universal>
        {chats}
      </Scrollbars>
    </div>
  );
};
