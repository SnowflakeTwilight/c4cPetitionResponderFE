"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Shield } from "lucide-react"
import { useState } from "react"
import ReactCardFlip from "react-card-flip"
import { Progress } from "@/components/ui/progress"
import Link from "next/link" // ✅ Correct Next.js navigation import

interface PetitionIntroProps {
  title: string
  summary: string
  description: string
  signatures: any[]
  targetSignatures: number
}

import type { Signature } from "@/app/page"

export function PetitionIntro({ title, summary, description, signatures, targetSignatures }: PetitionIntroProps) {
  const [flipStates, setFlipStates] = useState([false, false, false])

  const toggleFlip = (index: number) => {
    const newStates = [...flipStates]
    newStates[index] = !newStates[index]
    setFlipStates(newStates)
  }

  const signatureCount = signatures?.length ?? 0
  const progressPercentage = Math.min((signatureCount / targetSignatures) * 100, 100)

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="relative">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.PKIEkpaGH1jXdymDjnSlKQHaD0?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Wetlands landscape with birds and wildlife"
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
            <div className="text-white text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">{title}</h1>
              <p className="text-xl md:text-xl max-w-2xl mx-auto mt-15  text-black">{summary}</p>
            </div>
          </div>
        </div>

        <Link href="/petition-form">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
          >
            Create your own Petition Now
          </Button>
        </Link>
      </div>

      {/* Key Points */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: <Leaf className="h-12 w-12 text-red-600 mx-auto mb-4" />,
            title: "Animal Welfare",
            desc: "Speak up for voiceless animals suffering in silence",
            back: "Promote humane treatment, proper care, and legal rights for all animals.",
          },
          {
            icon: <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
            title: "Marine Captivity",
            desc: "End dolphin shows and captivity in cramped tanks",
            back: "Support ethical marine conservation and protect dolphins' freedom in the wild.",
          },
          {
            icon: <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />,
            title: "Peace & Protection",
            desc: "Fight cruelty, foster compassion, and create a safer world for animals",
            back: "Protect all living beings from exploitation and ensure peaceful coexistence.",
          },
          // {
          //   icon: <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />,
          //   title: "Biodiversity",
          //   desc: "Home to 150+ bird species and countless other wildlife",
          //   back: "Wetlands help sustain endangered species and ecological balance.",
          // },
          // {
          //   icon: <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
          //   title: "Flood Protection",
          //   desc: "Natural flood control system protecting our community",
          //   back: "They absorb heavy rain and reduce downstream flood risk.",
          // },
          // {
          //   icon: <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />,
          //   title: "Community Asset",
          //   desc: "Irreplaceable natural treasure for future generations",
          //   back: "Provides space for learning, recreation, and nature connection.",
          // },
        ].map((card, index) => (
          <ReactCardFlip
            key={index}
            isFlipped={flipStates[index]}
            flipDirection="horizontal"
          >
            {/* Front Side */}
            <Card
              key={`front-${index}`}
              className="cursor-pointer"
              onClick={() => toggleFlip(index)}
            >
              <CardContent className="p-6 text-center">
                {card.icon}
                <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.desc}</p>
              </CardContent>
            </Card>

            {/* Back Side */}
            <Card
              key={`back-${index}`}
              className="cursor-pointer bg-gray-100"
              onClick={() => toggleFlip(index)}
            >
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="font-semibold text-lg mb-2">Did you know?</h3>
                <p className="text-gray-600">{card.back}</p>

                <div className="text-3xl font-bold text-green-600">{signatureCount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">of {targetSignatures.toLocaleString()} signatures</div>
                <Progress value={progressPercentage} className="h-3" />

                <Link href="/petition-form">
                  <Button className="bg-green-600 hover:bg-green-700 text-white mt-5">
                    Sign up for this Petition, Now!
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </ReactCardFlip>
        ))}
      </div>

      {/* Full Description */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Why This Matters</h2>
          <div className="prose prose-lg max-w-none">
            {description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


// "use client"


// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Leaf, Users, Shield, Link } from "lucide-react"
// import { useState } from "react"
// import ReactCardFlip from "react-card-flip"
// import { Progress } from "@/components/ui/progress"
// import Linked from "next/link"

// interface PetitionIntroProps {
//     title: string
//     summary: string
//     description: string
//     signatures: any[]
//     targetSignatures: number
// }
// import type { Signature } from "@/app/page"


// export function PetitionIntro({ title, summary, description, signatures, targetSignatures }: PetitionIntroProps) {
//     const [flipStates, setFlipStates] = useState([false, false, false])

//     const toggleFlip = (index: number) => {
//         const newStates = [...flipStates]
//         newStates[index] = !newStates[index]
//         setFlipStates(newStates)
//     }
//     const scrollToForm = () => {
//         const formElement = document.getElementById("petition-form")
//         if (formElement) {
//             formElement.scrollIntoView({ behavior: "smooth" })
//         }
//     }

//     //   const signatureCount = signatures.length
//     const signatureCount = signatures?.length ?? 0
//     const progressPercentage = Math.min((signatureCount / targetSignatures) * 100, 100)

//     return (
//         <div className="space-y-8">
//             {/* Hero Section */}
//             <div className="text-center space-y-6">
//                 <div className="relative">
//                     <img
//                         src="/placeholder.svg?height=400&width=800"
//                         alt="Wetlands landscape with birds and wildlife"
//                         className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
//                     />
//                     <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
//                         <div className="text-white text-center px-4">
//                             <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
//                             <p className="text-lg md:text-xl max-w-2xl mx-auto">{summary}</p>
//                         </div>
//                     </div>
//                 </div>


//                 <Button
//                     // onClick={scrollToForm}
//                     size="lg"
//                     className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
//                 >
//                     Create your own Petition Now
//                 </Button>
//             </div>


//             {/* Key Points */}
//             <div className="grid md:grid-cols-3 gap-6">
//                 {[
//                     {
//                         icon: <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />,
//                         title: "Biodiversity",
//                         desc: "Home to 150+ bird species and countless other wildlife",
//                         back: "Wetlands help sustain endangered species and ecological balance.",
//                     },
//                     {
//                         icon: <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
//                         title: "Flood Protection",
//                         desc: "Natural flood control system protecting our community",
//                         back: "They absorb heavy rain and reduce downstream flood risk.",
//                     },
//                     {
//                         icon: <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />,
//                         title: "Community Asset",
//                         desc: "Irreplaceable natural treasure for future generations",
//                         back: "Provides space for learning, recreation, and nature connection.",
//                     },
//                 ].map((card, index) => (
//                     <ReactCardFlip
//                         key={index}
//                         isFlipped={flipStates[index]}
//                         flipDirection="horizontal"
//                     >
//                         {/* Front Side */}
//                         <Card
//                             key={`front-${index}`}
//                             className="cursor-pointer"
//                             onClick={() => toggleFlip(index)}
//                         >
//                             <CardContent className="p-6 text-center">
//                                 {card.icon}
//                                 <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
//                                 <p className="text-gray-600">{card.desc}</p>
//                             </CardContent>
//                         </Card>

//                         {/* Back Side */}
//                         <Card
//                             key={`back-${index}`}
//                             className="cursor-pointer bg-gray-100"
//                             onClick={() => toggleFlip(index)}
//                         >
//                             <CardContent className="p-6 text-center">
//                                 <h3 className="font-semibold text-lg mb-2">Did you know?</h3>
//                                 <p className="text-gray-600">{card.back}</p>


//                                 <div className="text-3xl font-bold text-green-600">{signatureCount.toLocaleString()}</div>
//                                 <div className="text-sm text-gray-600">of {targetSignatures.toLocaleString()} signatures</div>
//                                 <div><Progress value={progressPercentage} className="h-3" /></div>

//                                 <Linked href="/petition-form">
//                                 <Button  className="bg-green-600 hover:bg-green-700 text-white mt-5">
//                                     Sign up for this Petition , Now !
//                                     </Button>
//                                 </Linked>
//                             </CardContent>
//                         </Card>
//                     </ReactCardFlip>
//                 ))}
//             </div>

//             {/* Full Description */}
//             <Card>
//                 <CardContent className="p-8">
//                     <h2 className="text-2xl font-bold mb-6">Why This Matters</h2>
//                     <div className="prose prose-lg max-w-none">
//                         {description.split("\n\n").map((paragraph, index) => (
//                             <p key={index} className="mb-4 text-gray-700 leading-relaxed">
//                                 {paragraph}
//                             </p>
//                         ))}
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }