import { BoardEditor } from '@/components/BoardEditor';

interface BoardPageProps {
  params: Promise<{ id: string }>;
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { id } = await params;
  return <BoardEditor boardId={id} />;
}

export function generateMetadata() {
  return {
    title: 'Board Editor',
  };
}
