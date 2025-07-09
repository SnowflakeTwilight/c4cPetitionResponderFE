// app/petition-form/page.tsx

// "use client"

// import { PetitionForm } from "../components/petition-form2"

// // import PetitionForm from "@/components/petition-form2"
// // import PetitionForm from "../../components/petition-form2"
// PetitionForm

// export default function PetitionFormPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center p-8">
//       <div className="max-w-2xl w-full">
//         <h1 className="text-3xl font-bold mb-6">Signing for Petition</h1>
//         <PetitionForm />
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { PetitionForm } from "@/app/components/petition-form2"
import { SuccessMessage } from "@/app/components/success-message"

// export interface Signature {
//   id:string
//   name: string
//   email: string
//   message?: string
//   timestamp: Date
// }

export interface FormData {
  name: string
  email: string
  message?: string
}

interface Signature extends FormData {
  id: string
  timestamp: Date
}

function generateRandomId(){
  // return Math.random();
  // return Math.random().toString(36).substr(2, 9);//base-36 encoded random number (Fallback) 
  // This will return a string of 9 random alphanumeric characters. Not as collision-resistant as UUID, but fine for temp/demo purposes.
  return crypto.randomUUID();
}

export default function PetitionPage() {
  const [submittedData, setSubmittedData] = useState<Signature | null>(null)

  // const handleSuccess = (data: Signature) => {
  //   setSubmittedData(data)
  // }
  const handleSuccess = (data: FormData) => {
  const completeSignature: Signature = {
    ...data,
    id: generateRandomId(), // optional: generate a dummy id
    timestamp: new Date(),
  }
  setSubmittedData(completeSignature)
}

  const handleCloseSuccess = () => {
    setSubmittedData(null)
  }

  return (
    <>
      {submittedData ? (
        <SuccessMessage
          signature={submittedData}
          shareUrl="https://yourdomain.com/petition"
          shareText="I just signed a petition! Join me in making a difference."
          onClose={handleCloseSuccess}
        />
      ) : (
        <PetitionForm onSubmit={handleSuccess} />
      )}
    </>
  )
}
