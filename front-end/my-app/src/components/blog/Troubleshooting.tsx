import Link from "next/link";
import React from "react";

const Troubleshooting = () => {
  return (
    <>
      <div className="glass-effect rounded-xl p-6 md:p-8 shadow-xl border border-white/20 mt-7">
        <div className="flex items-center mb-6 pb-4 border-b border-white/20">
          <i className="fas fa-tools text-red-400 text-2xl mr-3"></i>
          <h2 className="text-xl font-semibold">Troubleshooting Guide</h2>
        </div>

        {/* <!-- Error Section --> */}
        <div className="bg-red-400/20 rounded-xl p-5 mb-8">
          <div className="flex items-center mb-4">
            <i className="fas fa-exclamation-circle text-red-400 text-xl mr-3"></i>
            <h3 className="text-lg font-semibold">Common Connection Errors</h3>
          </div>
          <p className="mb-3">
            Your code is trying to connect to RabbitMQ at{" "}
            <strong>amqp://localhost</strong>, but RabbitMQ is either not
            installed or not running on your machine.
          </p>

          <div className="bg-amber-500/20 border-l-4 border-amber-500 rounded-r px-4 py-3 mb-2">
            <div className="flex items-center">
              <i className="fas fa-lightbulb text-amber-300 mr-2"></i>
              <span>
                The error you are likely seeing is:{" "}
                <em>Error: connect ECONNREFUSED 127.0.0.1:5672</em>
              </span>
            </div>
          </div>
        </div>

        {/* <!-- Solutions --> */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Solutions:</h3>
          <ol className="list-decimal list-inside space-y-6 pl-4">
            <li className="pb-2">
              <strong>Install RabbitMQ</strong> on your local machine:
              <div className="bg-black/30 rounded-lg p-4 mt-2 font-mono text-sm overflow-x-auto">
                <p># On macOS with Homebrew</p>
                <p className="text-green-400">brew install rabbitmq</p>
                <br />
                <p># On Ubuntu/Debian</p>
                <p className="text-green-400">
                  sudo apt-get install rabbitmq-server
                </p>
                <br />
                <p># On Windows with Chocolatey</p>
                <p className="text-green-400">choco install rabbitmq</p>
              </div>
            </li>

            <li className="pb-2">
              <strong>Start RabbitMQ service</strong> after installation:
              <div className="bg-black/30 rounded-lg p-4 mt-2 font-mono text-sm overflow-x-auto">
                <p># On macOS</p>
                <p className="text-green-400">brew services start rabbitmq</p>
                <br />
                <p># On Linux</p>
                <p className="text-green-400">
                  sudo systemctl start rabbitmq-server
                </p>
              </div>
            </li>

            <li className="pb-2">
              <strong>Enable the management plugin</strong> for a web UI:
              <div className="bg-black/30 rounded-lg p-4 mt-2 font-mono text-sm overflow-x-auto">
                <p className="text-green-400">
                  rabbitmq-plugins enable rabbitmq_management
                </p>
              </div>
            </li>

            <li className="pb-2">
              <strong>Check if RabbitMQ is running</strong>:
              <div className="bg-black/30 rounded-lg p-4 mt-2 font-mono text-sm overflow-x-auto">
                <p className="text-green-400">rabbitmqctl status</p>
              </div>
            </li>

            <li className="pb-2">
              <strong>Alternative</strong>: Use a cloud RabbitMQ instance from
              <Link href="https://www.cloudamqp.com/">
                <span className="text-accent font-semibold hover:underline mx-2 hover:text-indigo-400">
                  CloudAMQP
                </span>
              </Link>
              or similar services and update the connection string in your code.
            </li>
          </ol>

          <div className="bg-blue-400/20 border-l-4 border-blue-400 rounded-r px-4 py-3 mt-6">
            <div className="flex items-center">
              <i className="fas fa-info-circle text-blue-300 mr-2"></i>
              <span>
                After installation, you can access the management UI at
                <Link href="http://localhost:15672">
                  <span className="text-accent font-semibold hover:underline mx-2 hover:text-blue-300">
                    http://localhost:15672
                  </span>
                </Link>
                (default credentials: guest/guest)
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Troubleshooting;
