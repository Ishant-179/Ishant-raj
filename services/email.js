import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendDownloadEmail = async ({ to, filename, link, expiresAt }) => {
  const subject = `Your download link for ${filename}`;
  const html = `
    <p>Hi,</p>
    <p>Your file <b>${filename}</b> is ready.</p>
    <p><a href="${link}" target="_blank">Click here to download</a></p>
    <p><small>This link expires at ${new Date(expiresAt).toLocaleString()}.</small></p>
  `;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    html
  });
};
