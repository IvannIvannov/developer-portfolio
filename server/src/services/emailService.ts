import nodemailer from "nodemailer";

type ContactEmailData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

export const sendContactEmail = async ({
  name,
  email,
  projectType,
  budget,
  message,
}: ContactEmailData) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    requireTLS: true,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,

    subject: `New project enquiry — ${name}`,

    text: `
New project enquiry

Name: ${name}
Email: ${email}
Project type: ${projectType}
Budget: ${budget}

Message:
${message}
    `,

    html: `
      <div
        style="
          font-family: Arial, sans-serif;
          max-width: 620px;
          margin: 0 auto;
          color: #111111;
        "
      >
        <h2>New project enquiry</h2>

        <p>
          You received a new message from your portfolio website.
        </p>

        <hr
          style="
            border: 0;
            border-top: 1px solid #e5e5e5;
            margin: 24px 0;
          "
        />

        <p>
          <strong>Name:</strong><br />
          ${name}
        </p>

        <p>
          <strong>Email:</strong><br />
          ${email}
        </p>

        <p>
          <strong>Project type:</strong><br />
          ${projectType}
        </p>

        <p>
          <strong>Budget:</strong><br />
          ${budget}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p
          style="
            line-height: 1.7;
            white-space: pre-wrap;
          "
        >
          ${message}
        </p>
      </div>
    `,
  });
};
