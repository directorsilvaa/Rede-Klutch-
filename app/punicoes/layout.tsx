import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PunishmentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="container mx-auto px-4 pt-4">
        <div className="flex justify-end">
          <Link href="/admin">
            <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
              Painel Admin
            </Button>
          </Link>
        </div>
      </div>
      {children}
    </>
  )
}