const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center p-4">
        <div className="container max-w-6xl mx-auto">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              User Management System
            </h1>
            <p className="text-lg text-gray-600">
              A secure gateway for login and creating new accounts
            </p>
          </section>

          {children}

          <footer className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Security */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Comprehensive Security
              </h3>
              <p className="text-gray-600">
                We protect your data using the latest encryption and security technologies.
              </p>
            </div>

            {/* Feature 2: Fast Access */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-bolt text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Fast Access
              </h3>
              <p className="text-gray-600">
                A smooth and fast user experience to access your account in seconds.
              </p>
            </div>

            {/* Feature 3: User Management */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                User Management
              </h3>
              <p className="text-gray-600">
                A complete system for efficiently managing users and permissions.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Template;