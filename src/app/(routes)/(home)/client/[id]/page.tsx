import { Chat } from '@/screens/chat/ui';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen h-full justify-between flex-col">
      <Chat id={params.id} />
    </main>
  );
}
