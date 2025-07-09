// "use client"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Loader2, CheckCircle } from "lucide-react"
// import { toast } from "sonner"
// // import { petitionApi } from "@/lib/api"


// interface FormData {
//   name: string
//   email: string
//   message?: string
// }

// interface PetitionFormProps {
//   petitionTopic: string // Add petition topic prop
//   onSubmit?: (data: FormData) => void
//   disabled?: boolean
// }

// export function PetitionForm({ petitionTopic, onSubmit, disabled = false }: PetitionFormProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSuccess, setIsSuccess] = useState(false)

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormData>()

//   const onFormSubmit = async (data: FormData) => {
//     setIsSubmitting(true)

//     try {
//       // Call the Flask backend API
//       const result = await petitionApi.signPetition(
//         data.name,
//         data.email,
//         petitionTopic,
//         data.message || ''
//       )

//       reset()
//       setIsSuccess(true)

//       // Call the optional onSubmit callback
//       if (onSubmit) {
//         onSubmit(data)
//       }

//       toast({
//         title: "Thank you for signing!",
//         description: result.message || "Your signature has been recorded successfully.",
//       })
//     } catch (error) {
//       console.error('Error signing petition:', error)

//       toast({
//         title: "Error",
//         description: error.message || "There was a problem submitting your signature. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (disabled || isSuccess) {
//     return (
//       <Card id="petition-form">
//         <CardContent className="p-8 text-center">
//           <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
//           <p className="text-gray-600">Your signature has been successfully recorded for "{petitionTopic}".</p>
//           <Button 
//             className="mt-4 bg-green-600 hover:bg-green-700"
//             onClick={() => setIsSuccess(false)}
//           >
//             Sign Another Petition
//           </Button>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card id="petition-form">
//       <CardHeader>
//         <CardTitle className="text-2xl">Sign the Petition</CardTitle>
//         <p className="text-gray-600">
//           Add your voice to support: <strong>{petitionTopic}</strong>. All fields marked with * are required.
//         </p>
//       </CardHeader>

//       <CardContent>
//         <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
//           <div className="space-y-2">
//             <Label htmlFor="name">Full Name *</Label>
//             <Input
//               id="name"
//               {...register("name", {
//                 required: "Full name is required",
//                 minLength: { value: 2, message: "Name must be at least 2 characters" },
//               })}
//               placeholder="Enter your full name"
//               className={errors.name ? "border-red-500" : ""}
//             />
//             {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">Email Address *</Label>
//             <Input
//               id="email"
//               type="email"
//               {...register("email", {
//                 required: "Email address is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: "Please enter a valid email address",
//                 },
//               })}
//               placeholder="Enter your email address"
//               className={errors.email ? "border-red-500" : ""}
//             />
//             {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="message">Why is this important to you? (Optional)</Label>
//             <Textarea
//               id="message"
//               {...register("message")}
//               placeholder={`Share why "${petitionTopic}" matters to you...`}
//               rows={4}
//               className="resize-none"
//             />
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-sm text-gray-600">
//               By signing this petition, you agree to receive updates about this campaign. Your email will not be shared
//               with third parties.
//             </p>
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Submitting...
//               </>
//             ) : (
//               "Sign the Petition"
//             )}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
import { toast } from "sonner"

interface FormData {
  name: string
  email: string
  message?: string
}


interface PetitionFormProps {
  onSubmit: (data: FormData) => void
  disabled?: boolean
}


export function PetitionForm({ onSubmit, disabled = false }: PetitionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  //   const { toast } = useToast()


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()


  const onFormSubmit = async (data: FormData) => {
    setIsSubmitting(true)


    try {
      const res = await fetch("/api/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      })

     if (!res.ok) throw new Error("Failed to submit")

      // Simulate API call delay
      // await new Promise((resolve) => setTimeout(resolve, 1500))


      onSubmit(data)
      reset()


      toast(
        <div>
          <p className="font-medium">Thank you for signing!</p>
          <p className="text-sm text-muted-foreground">
            Your signature has been recorded and a confirmation email will be sent.
          </p>
        </div>
        //   {
        //   title: "Thank you for signing!",
        //   description: "Your signature has been recorded and a confirmation email will be sent.",
        // }
      )
    } catch (error) {
      console.error(error)
      toast(
        <div>
          <p className="font-medium text-red-600">Error</p>
          <p className="text-sm text-muted-foreground">
            There was a problem submitting your signature. Please try again.
          </p>
        </div>
        //   {
        //   title: "Error",
        //   description: "There was a problem submitting your signature. Please try again.",
        //   variant: "destructive",
        // }
      )
    } finally {
      setIsSubmitting(false)
    }
  }


  if (disabled) {
    return (
      <Card id="petition-form">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
          <p className="text-gray-600">Your signature has been successfully recorded.</p>
        </CardContent>
      </Card>
    )
  }


  return (
    <Card id="petition-form">
      <CardHeader>
        <CardTitle className="text-2xl">Sign the Petition</CardTitle>
        <p className="text-gray-600">
          Add your voice to protect our local wetlands. All fields marked with * are required.
        </p>
      </CardHeader>


      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register("name", {
                required: "Full name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              })}
              placeholder="Enter your full name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>


          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="Enter your email address"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>


          <div className="space-y-2">
            <Label htmlFor="message">Why is this important to you? (Optional)</Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Share why protecting these wetlands matters to you..."
              rows={4}
              className="resize-none"
            />
          </div>


          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              By signing this petition, you agree to receive updates about this campaign. Your email will not be shared
              with third parties.
            </p>
          </div>


          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Sign the Petition"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
