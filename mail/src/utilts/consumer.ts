import amqp from "amqplib";
import nodemailer from "nodemailer";


export async function startSendOTPConsumer() {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.UserMail,
        pass: process.env.PassMail,
      },
    });
  const connection = await amqp.connect({
    protocol: "amqp",
    hostname: process.env.RabbitMQ_Host,
    port: 5672,
    username: process.env.RabbitMQ_Username,
    password: process.env.RabbitMQ_Password,
  });

  const channel = await connection.createChannel();
  const queueName = "sign-up";
  await channel.assertQueue(queueName, { durable: true });
  console.log("📩 Mail service consumer started, listening...");

  channel.consume(queueName, async (msg) => {
    if (!msg) return;

    try {
      const { to, subject, username } = JSON.parse(msg.content.toString());

      console.log("🔔 Sending mail to:", to);

      const mailOptions = {
        from: `"Auth App" <${process.env.UserMail}>`,
        to,
        subject,
        html: `
          <h2>Welcome, ${username}!</h2>
          <p>Thank you for signing up. We're excited to have you on board.</p>
          <p>This is a confirmation that your account has been created successfully.</p>
          <br>
          <p><strong>Auth App Team</strong></p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("✅ Mail sent to:", to);

      channel.ack(msg); // Acknowledge **only after success**
    } catch (error) {
      console.error("❌ Failed to process message:", error);
      // Optional: Decide what to do with the message (requeue, dead-letter, etc.)
      // channel.nack(msg, false, true); // Requeue
    }
  });
}
