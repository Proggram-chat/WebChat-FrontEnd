"use client";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { ChatList } from "@/widgets/sidebar/ui/chats";

export const SideBar = () => {
  return (
    <div className="max-h-[100vh]">
      <div className="bg-white gap-4 flex items-center justify-between w-full shadow-sm h-[50px] px-4 py-2">
        <Button variant="ghost" size="icon">
          <HamburgerMenuIcon />
        </Button>
        <div className="w-full flex">
          <Input icon={<MagnifyingGlassIcon />} placeholder={"Search..."} />
        </div>
      </div>
      <SimpleBar style={{ maxHeight: "100vh" }}>
        <ChatList />
      </SimpleBar>
    </div>
  );
};
