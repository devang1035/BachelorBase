const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About BachelorBase</h3>
              <p className="text-gray-300">
                Finding the perfect accommodation for bachelors made easy. 
                Browse, list, and connect with property owners directly.
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-300 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-300 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-300 hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-300">
                <li>📧 support@bachelorbase.com</li>
                <li>📱 +91 1234567890</li>
                <li>📍 Gujarat, India</li>
              </ul>
            </div>
          </div>
  
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} BachelorBase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;