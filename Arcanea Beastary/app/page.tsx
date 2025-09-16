import { redirect } from 'next/navigation';

// Root page redirects to bestiary
export default function HomePage() {
  redirect('/bestiary');
}