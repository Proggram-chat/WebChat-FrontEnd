import { SideBar } from "@/widgets/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ResizablePanelGroup direction="horizontal" className="min-h-[200px]">
        <ResizablePanel defaultSize={25} className="max-w-[400px]">
          <SideBar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
