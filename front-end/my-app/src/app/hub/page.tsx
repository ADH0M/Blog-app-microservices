import Consumer from "@/components/blog/Cunsumer";
import Producer from "@/components/blog/Producer";
import Troubleshooting from "@/components/blog/Troubleshooting";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="gradient-bg min-h-screen text-white p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-8 md:mb-12 py-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            RabbitMQ <i className="fas fa-rabbit text-accent mx-2"></i> Message
            Flow & Error Resolution
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Visualize message flow between producer and consumer, and
            troubleshoot RabbitMQ connection issues.
          </p>
        </header>

        {/* navigation btn*/}

        <div className="flex justify-center mb-8">
          <div className="glass-effect rounded-xl p-1 flex">
            <button
              id="flow-tab"
              className="px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-accent text-white"
            >
              Message Flow
            </button>
            <button
              id="error-tab"
              className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-white/10"
            >
              Error Resolution
            </button>
          </div>
        </div>

        <div id="flow-section" className="space-y-8">
          {/* Producer and Consumer Panels  */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 ">
            {/*  Producer Panel */}
            <div className="flex-1 glass-effect rounded-xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center mb-6 pb-4 border-b border-white/20">
                <i className="fas fa-paper-plane text-green-400 text-2xl mr-3"></i>
                <h2 className="text-xl font-semibold">Message Producer</h2>
              </div>

              <div className="message-form space-y-4">
                <div>
                  <label className="block mb-2 font-medium">Name:</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    className="w-full p-3 rounded-lg bg-white/15 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Age:</label>
                  <input
                    type="number"
                    id="age"
                    placeholder="Enter age"
                    className="w-full p-3 rounded-lg bg-white/15 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Message Content:
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter your message"
                    className="w-full p-3 rounded-lg bg-white/15 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent h-32"
                  >
                   
                  </textarea>
                </div>

                <button
                  id="send-btn"
                  className="w-full bg-gradient-to-r from-accent to-orange-500 hover:from-orange-500 hover:to-accent text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <i className="fas fa-paper-plane mr-2"></i> Send to Queue
                </button>
              </div>
              
            </div>

            <div className="flex-1 glass-effect rounded-xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center mb-6 pb-4 border-b border-white/20">
                <i className="fas fa-envelope text-blue-400 text-2xl mr-3"></i>
                <h2 className="text-xl font-semibold">Message Consumer</h2>
              </div>
              <div
                className="message-log bg-black/30 rounded-lg p-4 h-64 overflow-y-auto"
                id="message-log"
              >
                <div className="log-entry text-sm py-2 border-b border-white/10">
                  <span className="text-accent">00:00:00</span> Waiting for
                  messages...
                </div>
              </div>
              <div className="message-count text-center mt-4 font-medium">
                Messages processed:{" "}
                <span id="msg-count" className="text-accent font-bold">
                  0
                </span>
              </div>
            </div>
          </div>

          {/* Queue Visualization  */}
          <div className="glass-effect rounded-xl p-6 shadow-xl border border-white/20">
            <div className="text-center font-semibold text-lg mb-4">
              Queue: send-mail
            </div>
            <div
              className="queue bg-black/30 rounded-xl h-32 flex items-center px-4 overflow-x-auto"
              id="queue"
            >
              <div className="message h-20 w-20 rounded-lg flex items-center justify-center font-bold mx-2 animate-pulse-slow">
                <div className="text-xs text-center">Initial message</div>
              </div>
              <div className="message h-20 w-20 rounded-lg flex items-center justify-center font-bold mx-2 animate-pulse-slow">
                <div className="text-xs text-center">Another message</div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <div className="text-sm glass-effect rounded-full px-4 py-2">
                <i className="fas fa-info-circle mr-2 text-accent"></i>
                Messages will be automatically consumed every 3 seconds
              </div>
            </div>
          </div>

          <div id="error-section" className="space-y-8">
            <div className="glass-effect rounded-xl p-6 shadow-xl border border-white/20">
              <div className="text-center font-semibold text-2xl mb-4">
                programs in Javascript
              </div>

              <div className=" text-indigo-200  flex gap-4 flex-col">
                <Link href={"/blog#first_implemention"}>
                  The first very fast implementation of RabbitMq
                </Link>

                <Link href={"/blog#exchange-fanout"}>Exchange Fanout</Link>
                <Link href={"/blog#exchange-direct"}>Exchange Direct</Link>
              </div>
            </div>

            {/* First Implemention */}
            <div
              className="flex flex-col lg:flex-row gap-6 md:gap-8"
              id="first_implemention"
            >
              {/* Producer Code Panel  */}

              <div className="flex-1">
                <Producer>
                  <div className="bg-black/30 rounded-lg overflow-x-auto font-mono leading-relaxed p-3">
                    <p>
                      <span className="code-keyword">const</span> amqp ={" "}
                      <span className="code-function">require</span>(
                      <span className="code-string">amqplib</span>);
                    </p>
                    <br />
                    <p>
                      <span className="code-keyword">async function</span>{" "}
                      <span className="code-function">connectRabbitMQ</span>(){" "}
                      {"{"}
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> connection ={" "}
                      <span className="code-keyword">await</span> amqp.
                      <span className="code-function">connect</span>(
                      <span className="code-string">amqp://localhost</span>);
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> channel ={" "}
                      <span className="code-keyword">await</span> connection.
                      <span className="code-function">createChannel</span>();
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> queue ={" "}
                      <span className="code-string">send-mail</span>;
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">await</span> channel.
                      <span className="code-function">
                        assertQueue
                      </span>(queue, {"{"}
                      durable:, <span className="code-keyword">true</span> {"{"}
                      );
                    </p>
                    <p className="ml-4">
                      channel.<span className="code-function">sendToQueue</span>
                      (queue, Buffer.<span className="code-function">from</span>
                      (JSON.
                      <span className="code-function">stringify</span>( {"{"}
                      name : <span className="code-string">ali</span> age:,{" "}
                      <span className="code-string">23</span> {"{"} )));
                    </p>
                    <p>{"}"}</p>
                    <br />
                    <p>
                      <span className="code-function">connectRabbitMQ</span>();
                    </p>
                  </div>
                </Producer>
              </div>

              {/* // Consumer Code Panel */}
              <div className="flex-1">
                <Consumer>
                  <div className="bg-black/30 rounded-lg p-4 overflow-x-auto font-mono text-sm leading-relaxed">
                    <p>
                      <span className="code-keyword">const</span> amqp ={" "}
                      <span className="code-function">require</span>(
                      <span className="code-string">amqplib</span>);
                    </p>
                    <br />
                    <p>
                      <span className="code-keyword">async function</span>{" "}
                      <span className="code-function">connectRabbitMQ</span>(){" "}
                      {"{"}
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> connection ={" "}
                      <span className="code-keyword">await</span> amqp.
                      <span className="code-function">connect</span>(
                      <span className="code-string">amqp://localhost</span>);
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> channel ={" "}
                      <span className="code-keyword">await</span> connection.
                      <span className="code-function">createChannel</span>();
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> queue ={" "}
                      <span className="code-string">send-mail</span>;
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">await</span> channel.
                      <span className="code-function">
                        assertQueue
                      </span>(queue, {"{"} durable :,{" "}
                      <span className="code-keyword">true</span> {"}"});
                    </p>
                    <p className="ml-4">
                      channel.<span className="code-function">consume</span>
                      (queue, (msg)
                      {" => {"}
                    </p>
                    <p className="ml-8">
                      <span className="code-keyword">if</span> (msg !=={" "}
                      <span className="code-keyword">null</span>) {"{"}
                    </p>
                    <p className="ml-12">
                      <span className="code-keyword">const</span> data = JSON.
                      <span className="code-function">parse</span>(msg.content.
                      <span className="code-function">toString</span>());
                    </p>
                    <p className="ml-12">
                      console.<span className="code-function">log</span>(data);
                    </p>
                    <p className="ml-12">
                      channel.<span className="code-function">ack</span>(data);
                    </p>
                    <p className="ml-8">{"}"}</p>
                    <p className="ml-4">{"}"});</p>
                    <p>{"}"}</p>
                    <br />
                    <p>
                      <span className="code-function">connectRabbitMQ</span>();
                    </p>
                  </div>
                </Consumer>
              </div>
            </div>
            {/* Fanout Exchange */}
            <div
              className="flex flex-col lg:flex-row gap-6 md:gap-8"
              id="exchange-fanout"
            >
              {/* Producer Code Panel  */}

              <div className="flex-1">
                <Producer>
                  <div className="bg-black/30 rounded-lg overflow-x-auto font-mono leading-relaxed p-3">
                    <p>
                      <span className="code-keyword">const</span> amqp ={" "}
                      <span className="code-function">require</span>(
                      <span className="code-string">amqplib</span>);
                    </p>
                    <br />
                    <p>
                      <span className="code-keyword">async function</span>{" "}
                      <span className="code-function">connectRabbitMQ</span>(){" "}
                      {"{"}
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> connection ={" "}
                      <span className="code-keyword">await</span> amqp.
                      <span className="code-function">connect</span>(
                      <span className="code-string">amqp://localhost</span>);
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> channel ={" "}
                      <span className="code-keyword">await</span> connection.
                      <span className="code-function">createChannel</span>();
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> exchange ={" "}
                      <span className="code-string">send-mail</span>;
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">await</span> channel.
                      <span className="code-function">assertExchange</span>
                      (exchange,
                      <span className="code-keyword">
                        {"'"}fanout{"'"}
                      </span>
                      ,{"{"}
                      durable:, <span className="code-keyword">true</span> {"}"}
                      );
                    </p>
                    <p className="ml-4">
                      channel.<span className="code-function">publish</span>
                      (Exchange, Buffer.
                      <span className="code-function">from</span>
                      (JSON.
                      <span className="code-function">stringify</span>( {"{"}
                      name : <span className="code-string">ali</span> age:,{" "}
                      <span className="code-string">23</span> {"}"} )));
                    </p>
                    <p>{"}"}</p>
                    <br />
                    <p>
                      <span className="code-function">connectRabbitMQ</span>();
                    </p>
                  </div>
                </Producer>
              </div>

              {/* // Consumer Code Panel */}
              <div className="flex-1">
                <Consumer>
                  <div className="bg-black/30 rounded-lg p-4 overflow-x-auto font-mono text-sm leading-relaxed">
                    <p>
                      <span className="code-keyword">const</span> amqp ={" "}
                      <span className="code-function">require</span>(
                      <span className="code-string">amqplib</span>);
                    </p>
                    <br />
                    <p>
                      <span className="code-keyword">async function</span>{" "}
                      <span className="code-function">connectRabbitMQ</span>(){" "}
                      {"{"}
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> connection ={" "}
                      <span className="code-keyword">await</span> amqp.
                      <span className="code-function">connect</span>(
                      <span className="code-string">amqp://localhost</span>);
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> channel ={" "}
                      <span className="code-keyword">await</span> connection.
                      <span className="code-function">createChannel</span>();
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> exchange ={" "}
                      <span className="code-string">send-mail</span>;
                    </p>

                    <p className="ml-4">
                      <span className="code-keyword">const</span> {"{ "} queue{" "}
                      {"}"} = <span className="code-keyword">await</span>{" "}
                      channel.
                      <span className="code-function">assertQueue</span>({"''"},
                      {"{"}duralbe:<span className="code-keyword">true</span>
                      {"}"}
                      );
                    </p>

                    <p className="ml-4">
                      <span className="code-keyword">await</span> channel.
                      <span className="code-function">assertExchange</span>
                      (exchange, {"'"}
                      <span className="code-keyword">fanout</span> {"'"} ,{"{"}{" "}
                      durable :<span className="code-keyword">true</span> {"}"}
                      );
                    </p>

                    <p className="ml-4">
                      channel.
                      <span className="code-function">bindQueue</span>
                      {"("} queue, {"'"}
                      <span className="code-keyword">exchange</span> ,{"''"}
                      {")"}
                    </p>

                    <p className="ml-4">
                      channel.<span className="code-function">consume</span>
                      (queue, (msg)
                      {" => {"}
                    </p>
                    <p className="ml-8">
                      <span className="code-keyword">if</span> (msg !=={" "}
                      <span className="code-keyword">null</span>) {"{"}
                    </p>
                    <p className="ml-12">
                      <span className="code-keyword">const</span> data = JSON.
                      <span className="code-function">parse</span>(msg.content.
                      <span className="code-function">toString</span>());
                    </p>
                    <p className="ml-12">
                      console.<span className="code-function">log</span>(data);
                    </p>
                    <p className="ml-12">
                      channel.<span className="code-function">ack</span>(data);
                    </p>
                    <p className="ml-8">{"}"}</p>
                    <p className="ml-4">{"}"});</p>
                    <p>{"}"}</p>
                    <br />
                    <p>
                      <span className="code-function">connectRabbitMQ</span>();
                    </p>
                  </div>
                </Consumer>
              </div>
            </div>

            {/* Direct Exchange */}

            <div
              className="flex flex-col lg:flex-row gap-6 md:gap-8"
              id="exchange-fanout"
            >
              {/* Producer Code Panel  */}

              <div className="flex-1">
                <Producer>
                  <div className="bg-black/30 rounded-lg overflow-x-auto font-mono leading-relaxed p-3">
                    <p>
                      <span className="code-keyword">const</span> amqp ={" "}
                      <span className="code-function">require</span>(
                      <span className="code-string">amqplib</span>);
                    </p>
                    <br />
                    <p>
                      <span className="code-keyword">async function</span>{" "}
                      <span className="code-function">connectRabbitMQ</span>(){" "}
                      {"{"}
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> connection ={" "}
                      <span className="code-keyword">await</span> amqp.
                      <span className="code-function">connect</span>(
                      <span className="code-string">amqp://localhost</span>);
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> channel ={" "}
                      <span className="code-keyword">await</span> connection.
                      <span className="code-function">createChannel</span>();
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> exchange ={" "}
                      <span className="code-string">send-mail</span>;
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">await</span> channel.
                      <span className="code-function">assertExchange</span>
                      (exchange,
                      <span className="code-keyword">
                        {"'"}fanout{"'"}
                      </span>
                      ,{"{"}
                      durable:, <span className="code-keyword">true</span> {"}"}
                      );
                    </p>
                    <p className="ml-4">
                      channel.<span className="code-function">publish</span>
                      (Exchange, Buffer.
                      <span className="code-function">from</span>
                      (JSON.
                      <span className="code-function">stringify</span>( {"{"}
                      name : <span className="code-string">ali</span> age:,{" "}
                      <span className="code-string">23</span> {"}"} )));
                    </p>
                    <p>{"}"}</p>
                    <br />
                    <p>
                      <span className="code-function">connectRabbitMQ</span>();
                    </p>
                  </div>
                </Producer>
              </div>

              {/* // Consumer Code Panel */}
              <div className="flex-1">
                <Consumer>
                  <div className="bg-black/30 rounded-lg p-4 overflow-x-auto font-mono text-sm leading-relaxed">
                    <p>
                      <span className="code-keyword">const</span> amqp ={" "}
                      <span className="code-function">require</span>(
                      <span className="code-string">amqplib</span>);
                    </p>
                    <br />
                    <p>
                      <span className="code-keyword">async function</span>{" "}
                      <span className="code-function">connectRabbitMQ</span>(){" "}
                      {"{"}
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> connection ={" "}
                      <span className="code-keyword">await</span> amqp.
                      <span className="code-function">connect</span>(
                      <span className="code-string">amqp://localhost</span>);
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> channel ={" "}
                      <span className="code-keyword">await</span> connection.
                      <span className="code-function">createChannel</span>();
                    </p>
                    <p className="ml-4">
                      <span className="code-keyword">const</span> exchange ={" "}
                      <span className="code-string">send-mail</span>;
                    </p>

                    <p className="ml-4">
                      <span className="code-keyword">const</span> {"{ "} queue{" "}
                      {"}"} = <span className="code-keyword">await</span>{" "}
                      channel.
                      <span className="code-function">assertQueue</span>({"''"},
                      {"{"}duralbe:<span className="code-keyword">true</span>
                      {"}"}
                      );
                    </p>

                    <p className="ml-4">
                      <span className="code-keyword">await</span> channel.
                      <span className="code-function">assertExchange</span>
                      (exchange, {"'"}
                      <span className="code-keyword">fanout</span> {"'"} ,{"{"}{" "}
                      durable :<span className="code-keyword">true</span> {"}"}
                      );
                    </p>

                    <p className="ml-4">
                      channel.
                      <span className="code-function">bindQueue</span>
                      {"("} queue, {"'"}
                      <span className="code-keyword">exchange</span> ,{"''"}
                      {")"}
                    </p>

                    <p className="ml-4">
                      channel.<span className="code-function">consume</span>
                      (queue, (msg)
                      {" => {"}
                    </p>
                    <p className="ml-8">
                      <span className="code-keyword">if</span> (msg !=={" "}
                      <span className="code-keyword">null</span>) {"{"}
                    </p>
                    <p className="ml-12">
                      <span className="code-keyword">const</span> data = JSON.
                      <span className="code-function">parse</span>(msg.content.
                      <span className="code-function">toString</span>());
                    </p>
                    <p className="ml-12">
                      console.<span className="code-function">log</span>(data);
                    </p>
                    <p className="ml-12">
                      channel.<span className="code-function">ack</span>(data);
                    </p>
                    <p className="ml-8">{"}"}</p>
                    <p className="ml-4">{"}"});</p>
                    <p>{"}"}</p>
                    <br />
                    <p>
                      <span className="code-function">connectRabbitMQ</span>();
                    </p>
                  </div>
                </Consumer>
              </div>
            </div>

            <Troubleshooting />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
