"use client"

import { useState } from "react"
// import { PetitionIntro } from "@/components/petition-intro"
// import { PetitionForm } from "@/components/petition-form"
// import { SignatureStats } from "@/components/signature-stats"
// import { SuccessMessage } from "@/components/success-message"
// import { Footer } from "@/components/footer"
import { PetitionIntro } from "./components/petition-intro"
import { PetitionForm } from "./components/petition-form2"
import { SignatureStats } from "./components/signature-stats"
import { SuccessMessage } from "./components/success-message"
import { Footer } from "./components/footer"

export interface Signature {
  id: string
  name: string
  email: string
  message?: string
  timestamp: Date
}


export default function PetitionPage() {
  const [signatures, setSignatures] = useState<Signature[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      message: "This is crucial for our community's future.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael@example.com",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      email: "emma@example.com",
      message: "We must protect our environment for future generations.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    },
  ])


  const [showSuccess, setShowSuccess] = useState(false)
  const [newSignature, setNewSignature] = useState<Signature | null>(null)


  const handleSignPetition = (formData: { name: string; email: string; message?: string }) => {
    const signature: Signature = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date(),
    }


    setSignatures((prev) => [signature, ...prev])
    setNewSignature(signature)
    setShowSuccess(true)


    // Auto-hide success message after 10 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 10000)
  }


  const petitionData = {
    title: "Protect the Local Wetlands",
    summary: "Join us in preserving our community's precious wetland ecosystem from commercial development.",
    description: `Our local wetlands are home to over 150 species of birds, countless amphibians, and serve as a natural flood control system that has protected our community for decades.


A proposed commercial development threatens to destroy 80% of this irreplaceable habitat. Once these wetlands are gone, they cannot be restored to their current biodiversity and ecological function.


We are calling on the City Council to reject the development proposal and instead designate the wetlands as a protected conservation area. This petition will be presented at the next City Council meeting on March 15th.


Your signature matters. Together, we can ensure that future generations will be able to enjoy and benefit from this natural treasure.`,
    targetSignatures: 1000,
    shareUrl: typeof window !== "undefined" ? window.location.href : "",
    shareText: "Help protect our local wetlands! Sign this important petition.",
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <PetitionIntro
          title={petitionData.title}
          summary={petitionData.summary}
          description={petitionData.description}
          signatures={signatures}
          targetSignatures={petitionData.targetSignatures}
        />
        {/* 
        <div className="flex justify-center mt-12">

          <div className="grid lg:grid-cols-3 gap-8 mt-12 ">
            <div className="lg:col-span-2">
              <PetitionForm onSubmit={handleSignPetition} disabled={showSuccess} />
            </div>


            <div className="lg:col-span-1">
            <div className="lg:col-span-3">
              <SignatureStats signatures={signatures} targetSignatures={petitionData.targetSignatures} />
            </div>
          </div>
        </  div> */}
        <div className="flex justify-center mt-12">
          <div className="w-full max-w-5xl px-4">
            <div className="grid grid-cols-1">
              <div>
                <SignatureStats
                  signatures={signatures}
                  targetSignatures={petitionData.targetSignatures}
                />
              </div>
            </div>
          </div>
        </div>



        {showSuccess && newSignature && (
          <SuccessMessage
            signature={newSignature}
            shareUrl={petitionData.shareUrl}
            shareText={petitionData.shareText}
            onClose={() => setShowSuccess(false)}
          />
        )}
      </main>


      <Footer shareUrl={petitionData.shareUrl} shareText={petitionData.shareText} />
    </div>
  )
}
