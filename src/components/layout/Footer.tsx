import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Bus className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-lg">BusTicket Pro</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for comfortable and safe bus travel across the country.
            </p>
            <div className="flex space-x-4 mt-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block text-gray-400 hover:text-white">About Us</Link>
              <Link to="/routes" className="block text-gray-400 hover:text-white">Popular Routes</Link>
              <Link to="/offers" className="block text-gray-400 hover:text-white">Offers</Link>
              <Link to="/careers" className="block text-gray-400 hover:text-white">Careers</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2 text-sm">
              <Link to="/help" className="block text-gray-400 hover:text-white">Help Center</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white">Contact Us</Link>
              <Link to="/cancellation" className="block text-gray-400 hover:text-white">Cancellation Policy</Link>
              <Link to="/terms" className="block text-gray-400 hover:text-white">Terms & Conditions</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@busticketpro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 BusTicket Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}