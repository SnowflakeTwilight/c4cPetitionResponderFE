//LLM based personalised approach 
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { name, email, message } = await req.json();

    // 1. Generate personalized content using OpenAI
    //   const prompt = `
    //     Write a warm, personalized thank-you email to ${name} who signed a petition to save local wetlands.
    //     They said: "${message || 'No message provided'}".
    //     Make it sincere, under 150 words, and mention how their support helps the cause.
    //   `;
    const prompt = `
Write a heartfelt and engaging thank-you email to ${name}, who just signed a petition to support animal welfare.

Structure the email as follows:
1. Start with a short story or real-life example that highlights the importance of animal welfare in India.
2. Include a relevant fact or statistic (e.g., number of stray animals, cruelty cases, or rescue success stories).
3. Express sincere thanks using the user's name and emphasize how their support makes a difference.
4. End with a call to action: invite them to donate, volunteer, or spread awareness of lesser-known animal issues we may not yet be working on.

Keep it under 180 words. Make it warm, persuasive, and purpose-driven.
`


    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.8,
        }),
    });

    const openaiJson = await openaiRes.json();
    const emailText = openaiJson.choices?.[0]?.message?.content ?? "Thank you for your support!";

    // 2. Prepare HTML email with a cover image
    const htmlContent = `
  <div style="margin:0;padding:0;background:#f4f4f4;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;margin:auto;background:#ffffff;font-family:Arial,sans-serif;">
      <tr>
        <td style="background-color:#2e7d32;padding:20px;text-align:center;">
          <img src="https://i.ibb.co/XXhDQ6T/pawition-logo.png" alt="Pawition Logo" width="120" style="display:block;margin:auto;" />
          <h1 style="color:#fff;margin:10px 0 0;font-size:24px;">Thank You for Signing!</h1>
        </td>
      </tr>

      <tr>
        <td>
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Wetlands" width="100%" style="display:block;border:0;max-width:100%;" />
        </td>
      </tr>

      <tr>
        <td style="padding:24px;font-size:16px;line-height:1.6;color:#333;">
          <p>Dear <strong>${name}</strong>,</p>
          <p>${emailText.replace(/\n/g, "<br>")}</p>

          <hr style="margin:24px 0;border:0;border-top:1px solid #eee;" />

          <p style="color:#888;">Want to take the next step?</p>

          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td align="center" style="padding:8px;">
                <a href="https://yourdomain.com/donate" style="background-color:#2e7d32;color:#fff;padding:12px 24px;border-radius:5px;text-decoration:none;font-weight:bold;display:inline-block;">💛 Donate</a>
              </td>
              <td align="center" style="padding:8px;">
                <a href="https://yourdomain.com/volunteer" style="background-color:#ff9800;color:#fff;padding:12px 24px;border-radius:5px;text-decoration:none;font-weight:bold;display:inline-block;">✋ Volunteer</a>
              </td>
              <td align="center" style="padding:8px;">
                <a href="https://yourdomain.com/raise-awareness" style="background-color:#0288d1;color:#fff;padding:12px 24px;border-radius:5px;text-decoration:none;font-weight:bold;display:inline-block;">📣 Raise Awareness</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="background:#f1f1f1;padding:16px;text-align:center;font-size:12px;color:#666;">
          🐾 Pawition | A movement for voiceless beings<br/>
          <a href="https://yourdomain.com" style="color:#2e7d32;text-decoration:none;">Visit our website</a>
        </td>
      </tr>
    </table>
  </div>
  `;

    // 3. Send the email with Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"Animal Welfare Campaign presents : PAWITION" <${process.env.EMAIL_ADDRESS}>`,
        to: email,
        subject: "Thank you for signing the petition 🐾",
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}


// <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
//       <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Wetlands" style="width: 100%; border-radius: 8px 8px 0 0;" />
//       <div style="padding: 24px; background: #f9f9f9;">
//         <h2 style="color: #2e7d32;">Thank You, ${name}!</h2>
//         <p style="font-size: 1.1em; color: #333;">${emailText.replace(/\n/g, "<br>")}</p>
//         <hr style="margin: 24px 0;">
//         <p style="font-size: 0.95em; color: #888;">Your support means the world to us and to the wetlands we’re working to protect.</p>
//       </div>
//     </div>



// Simple NodeMailer based approach :

//    import { NextResponse } from "next/server";
//    import nodemailer from "nodemailer";

//    export async function POST(req: Request) {
//      const { name, email, message } = await req.json();

//      // Configure your SMTP transport (example: Gmail)
//      const transporter = nodemailer.createTransport({
//        service: "gmail",
//        auth: {
//          user: process.env.EMAIL_ADDRESS,      // your Gmail address
//          pass: process.env.EMAIL_PASSWORD,     // your Gmail app password
//        },
//      });

//      const mailOptions = {
//        from: `"Wetlands Campaign" <${process.env.EMAIL_ADDRESS}>`,
//        to: email,
//        subject: "Thank you for signing the petition 🐾",
//        text: `Dear ${name},\n\nThank you for your support!\n\nYour message: ${message}`,
//      };

//      try {
//        await transporter.sendMail(mailOptions);
//        return NextResponse.json({ success: true });
//      } catch (error) {
//        console.error("Error sending email:", error);
//        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
//      }
//    }












//    RESEND based approach

// app/api/webhook/route.ts
// import { NextResponse } from "next/server"
// import { Resend } from "resend"

// const resend = new Resend(process.env.RESEND_API_KEY)

// export async function POST(req: Request) {
//   try {
//     const { name, email, message } = await req.json()

//     // 1. Generate the personalized email using OpenAI
//     const prompt = `
//       Write a short and warm thank-you email to someone named ${name} who signed a petition to save local wetlands.
//       They said: "${message || 'No message provided'}".
//       Make it sincere, under 150 words, and mention how their support helps the cause.
//     `

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "gpt-4o",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.8,
//       }),
//     })

//     const json = await response.json()
//     const emailText = json.choices?.[0]?.message?.content ?? "Thank you for your support!"

//     // 2. Send the personalized email
//     await resend.emails.send({
//       from: "Wetlands Campaign <campaign@yourdomain.com>",
//       to: email,
//       subject: "Thank you for signing the petition 🐾",
//       text: emailText,
//     })
//     console.log("Sending email to:", email)
//     console.log("Generated message:", emailText)


//     return NextResponse.json({ success: true })
//   } catch (err) {
//     console.error("Error processing webhook:", err)
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
//   }
// }

// app/api/webhook/route.ts
// import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//   try{
//     const data = await req.json()

//   console.log("Received petition data:", data)

//    const automationResponse = await fetch("https://your-automation-url.com/webhook/petition", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     })

//     if (!automationResponse.ok) {
//       console.error("Automation webhook failed:", await automationResponse.text())
//     }

//   // Do something with the data here (e.g., save to DB, send to webhook, etc.)

//   // Sample webhook forwarding (to Zapier/n8n):
//   // await fetch("https://n8n.yourdomain.com/webhook/petition", {
//   //   method: "POST",
//   //   headers: { "Content-Type": "application/json" },
//   //   body: JSON.stringify(data),
//   // })
//   }catch(err){
//     console.error("Error in webhook route:", err)
//     return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
//   }

// //   return NextResponse.json({ success: true })
// }
