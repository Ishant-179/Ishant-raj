import { transporter } from "../config/emailConfig.js";
import dotenv from 'dotenv'
dotenv.config()
export const registerEmail = async(email, userName)=>{
    try{
      const mailSubject = {
        subject : "Registration Successful!",
        to: email,
        from: process.env.EMAIL_USER,
        html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Black & White Email</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Prevent some clients from resizing text -->
  <meta http-equiv="x-apple-disable-message-reformatting">
  <style>
    /* ====== Basic reset for email clients ====== */
    html, body { margin: 0; padding: 0; height: 100% !important; width: 100% !important; background: #000000; }
    img { border: 0; display: block; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    a { color: inherit; text-decoration: none; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    /* ====== Responsive ====== */
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 20px !important; }
      .stack-column, .stack-column-center { display: block !important; width: 100% !important; max-width: 100% !important; }
      .stack-column-center { text-align: center !important; }
      .hero-title { font-size: 26px !important; line-height: 32px !important; }
      .small { font-size: 14px !important; }
    }
  </style>
</head>
<body style="background:#000000; -webkit-font-smoothing:antialiased; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <!-- Preheader (hidden text shown in inbox preview) -->
  <div style="display:none; max-height:0px; overflow:hidden; color:#000000; line-height:0; font-size:0;">
    Quick update — sleek black & white email template.
  </div>

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" bgcolor="#000000" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 30px 16px;">
        <!-- Container -->
        <table role="presentation" class="container" width="600" style="max-width:600px; width:100%; background:#ffffff; border-radius:10px; overflow:hidden;" cellpadding="0" cellspacing="0">
          <!-- Header -->
          <tr>
            <td style="background:#000000; padding:24px 28px; text-align:left;">
              <h1 style="margin:0; font-size:20px; line-height:24px; color:#ffffff; font-weight:700; letter-spacing:0.4px;">Brand Name</h1>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="padding:32px 28px; background:#ffffff; text-align:left;">
              <h2 class="hero-title" style="margin:0 0 12px 0; font-size:32px; line-height:38px; color:#000000; font-weight:800;">
                Hello ${userName}
              </h2>
              <p style="margin:0 0 22px 0; color:#333333; font-size:16px; line-height:24px;">
                A clean black & white design that looks great on desktop and mobile. Use it for announcements, newsletters, or product updates.
              </p>

              <!-- CTA button (bulletproof) -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:10px;">
                <tr>
                  <td align="left">
                    <a href="#" style="background:#000000; color:#ffffff; display:inline-block; padding:12px 22px; border-radius:8px; font-weight:600; font-size:15px;">
                      View Update
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Two column section -->
          <tr>
            <td style="padding:24px 28px; background:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="stack-column" width="50%" style="vertical-align:top; padding-right:12px;">
                    <div style="border:1px solid #e6e6e6; border-radius:8px; padding:14px;">
                      <h3 style="margin:0 0 8px 0; font-size:16px; color:#000000;">Feature One</h3>
                      <p style="margin:0; color:#555555; font-size:14px; line-height:20px;">Short description that explains the first key point. Crisp and direct.</p>
                    </div>
                  </td>
                  <td class="stack-column" width="50%" style="vertical-align:top; padding-left:12px;">
                    <div style="border:1px solid #e6e6e6; border-radius:8px; padding:14px;">
                      <h3 style="margin:0 0 8px 0; font-size:16px; color:#000000;">Feature Two</h3>
                      <p style="margin:0; color:#555555; font-size:14px; line-height:20px;">Another short description. Keep it focused on benefits for the reader.</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 28px;">
              <hr style="border:0; border-top:1px solid #e6e6e6; margin:0;">
            </td>
          </tr>

          <!-- Footer / small note -->
          <tr>
            <td style="padding:18px 28px 28px 28px; background:#ffffff; text-align:left;">
              <p style="margin:0 0 10px 0; color:#666666; font-size:13px; line-height:18px;">
                If you didn't expect this email, you can safely ignore it.
              </p>
              <p style="margin:0; color:#999999; font-size:12px; line-height:16px;">
                © <span id="year">2025</span> Brand Name — <a href="#" style="color:#000000; font-weight:600;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
        <!-- /Container -->
      </td>
    </tr>
  </table>

  <!-- Optional small script: update year if client supports it (most don't in email) -->
  <script>
    try { document.getElementById('year').textContent = new Date().getFullYear(); } catch (e) {}
  </script>
</body>
</html>
`  

      }  
      await transporter.sendMail(mailSubject)

    }
    catch(err){
        console.log("Somrthing went wrong in registerEmail:", err);
    }
}