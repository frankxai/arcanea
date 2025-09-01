import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="p-8 flex justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Arcanea</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="obsidian">Get Started</Button>
        </CardContent>
      </Card>
    </main>
  )
}
