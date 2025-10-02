//just for test ;

import amqp from "amqplib";

let connection: amqp.ChannelModel, channel: amqp.Channel;


export async function connectRabbitMQ(retries = 5, delay = 3000) {
  while (retries) {
    try {
      connection = await amqp.connect("amqp://localhost", { heartbeat: 30 });

      // Error handling
      connection.on("error", (err) => {
        if (err.message !== "Connection closing") {
          console.error("RabbitMQ connection error:", err);
        }
      });

      connection.on("close", () => {
        console.log("RabbitMQ connection closed. Reconnecting...");
        setTimeout(() => connectRabbitMQ(5, 3000), 3000);
      });

      // Create channel
      channel = await connection.createChannel();

      // Create queue if not exists
      await channel.assertQueue("Notifications", { durable: true });

      console.log("✅ Connected to RabbitMQ, queue 'Notifications' asserted");
      return;
    } catch (error) {
      console.error("RabbitMQ connection error:", error.message);
      retries--;
      console.log(`🔁 Retrying... ${retries} attempts left`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  console.error("❌ Failed to connect to RabbitMQ");
  process.exit(1);
};

// 2. Function to send messages
async function publishEvent(eventMessage , queue) {
  if (channel) {
    try {
      channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(eventMessage)),
        { persistent: true }
      );
      console.log(`📤 Event sent: ${eventMessage}`);
    } catch (err) {
      console.error("Failed to publish:", err);
    }
  } else {
    console.warn("⚠️ Channel not ready. Event not sent.");
  }
};

// 3. Graceful shutdown
process.on("SIGINT", async () => {
  console.log("🛑 Shutting down gracefully...");
  if (channel) await channel.close();
  if (connection) await connection.close();
  process.exit(0);
});

export { connectRabbitMQ, publishEvent  };
