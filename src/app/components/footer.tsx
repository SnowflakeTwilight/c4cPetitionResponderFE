"use client"


import { Button } from "@/components/ui/button"
import { Share2, MessageCircle, Twitter, Heart } from "lucide-react"


interface FooterProps {
  shareUrl: string
  shareText: string
}


export function Footer({ shareUrl, shareText }: FooterProps) {
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
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Share Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Share This Petition
            </h3>
            <p className="text-gray-300 mb-4">Help us reach more people by sharing this petition with your network.</p>


            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("twitter")}
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>


              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("whatsapp")}
                className="bg-green-600 hover:bg-green-700 border-green-600 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>


              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("facebook")}
                className="bg-blue-800 hover:bg-blue-900 border-blue-800 text-white"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Facebook
              </Button>
            </div>
          </div>


          {/* Organization Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About This Campaign</h3>
            <p className="text-gray-300 mb-4">
              This petition is organized by the Community Environmental Alliance, a grassroots organization dedicated to
              protecting local natural resources.
            </p>


            <div className="space-y-2 text-sm text-gray-400">
              <div>
                <a href="mailto:info@environmentalalliance.org" className="hover:text-white">
                  Contact: info@environmentalalliance.org
                </a>
              </div>
              <div>
                <a href="#" className="hover:text-white">
                  Learn more about our work
                </a>
              </div>
              <div>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>


        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-500" /> for our environment
            <span className="mx-2">•</span>© 2024 Community Environmental Alliance
          </p>
        </div>
      </div>
    </footer>
  )
}
