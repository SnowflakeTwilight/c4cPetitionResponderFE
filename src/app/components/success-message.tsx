"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, X, Share2, MessageCircle, Twitter } from "lucide-react"
import type { Signature } from "@/app/page" 


interface SuccessMessageProps {
  signature: Signature
  shareUrl: string
  shareText: string
  onClose: () => void
}


export function SuccessMessage({ signature, shareUrl, shareText, onClose }: SuccessMessageProps) {
  const handleShare = (platform: "twitter" | "whatsapp" | "facebook") => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(shareText)


    let shareLink = ""


    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        break
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodedText} ${encodedUrl}`
        break
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
    }


    window.open(shareLink, "_blank", "width=600,height=400")
  }


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md animate-in fade-in-0 zoom-in-95">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>


          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Thank you, {signature.name}!</h3>
              <p className="text-gray-600">
                Your signature has been successfully recorded. A confirmation email will be sent to {signature.email}.
              </p>
            </div>


            {signature.message && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 italic">"{signature.message}"</p>
              </div>
            )}


            <div className="border-t pt-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Help spread the word
              </h4>


              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("twitter")}
                  className="flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>


                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("whatsapp")}
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>


                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("facebook")}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


