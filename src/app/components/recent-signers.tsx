"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserIcon } from "lucide-react"
import type { Signature } from "@/app/page"
// import { formatDistanceToNow } from "date-fns"

interface Props {
  signatures: Signature[]
}

export function RecentSignersList({ signatures }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-600">
          <UserIcon className="w-5 h-5" />
          Recent Signers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {signatures.slice(0, 5).map((sig, index) => (
          <div key={index} className="flex justify-between items-start">
            <div>
              <p className="font-semibold">{sig.name}</p>
              {sig.message && (
                <p className="text-sm text-gray-600 mt-1">"{sig.message}"</p>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {/* {formatDistanceToNow(new Date(sig.timestamp), { addSuffix: true })} */}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
