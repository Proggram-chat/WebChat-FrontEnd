"use server";
import { SideBar } from "@/widgets/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";
import ChatList from "@/widgets/sidebar/ui/chats";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} className="max-w-[400px]">
          <SideBar chats={<>chats</>} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
