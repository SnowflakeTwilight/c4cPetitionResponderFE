import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp } from "lucide-react"
import type { Signature } from "@/app/page"

interface SignatureStatsProps {
  signatures: Signature[]
  targetSignatures: number
}


export function SignatureStats({ signatures, targetSignatures }: SignatureStatsProps) {
  const signatureCount = signatures.length
  const progressPercentage = Math.min((signatureCount / targetSignatures) * 100, 100)


  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))


    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }


  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Petition Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{signatureCount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">of {targetSignatures.toLocaleString()} signatures</div>
          </div>


          <Progress value={progressPercentage} className="h-3" />


          <div className="text-center text-sm text-gray-600">
            {targetSignatures - signatureCount > 0
              ? `${(targetSignatures - signatureCount).toLocaleString()} more needed!`
              : "Target reached! 🎉"}
          </div>
        </CardContent>
      </Card>


      {/* Recent Signers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Recent Signers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {signatures.slice(0, 5).map((signature) => (
              <div key={signature.id} className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{signature.name}</div>
                  {signature.message && (
                    <div className="text-xs text-gray-600 mt-1 line-clamp-2">"{signature.message}"</div>
                  )}
                </div>
                <div className="text-xs text-gray-500 ml-2">{formatTimeAgo(signature.timestamp)}</div>
              </div>
            ))}


            {signatures.length === 0 && (
              <div className="text-center text-gray-500 py-4">Be the first to sign this petition!</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
