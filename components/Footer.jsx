import React from 'react'

import { Phone, Mail, MapPin, } from 'lucide-react';
const Footer=()=>{
    return(
        <footer className="bg-[#E2EADF] dark:bg-gray-800 py-5 ">
        <div className="container mx-auto px-4">
          <div className="border-b border-[#1F3714] dark:border-gray-700 pb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pt-8">
            {/* Reach Us Section */}
            <div>
              <h3 className="font-semibold text-[#1F3714] dark:text-white mb-4">Reach us</h3>
              <div className="space-y-4 text-[#1F3714] dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="flex-shrink-0" />
                  <span className="text-sm">+1012 3456 789</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="flex-shrink-0" />
                  <span className="text-sm">demo@gmail.com</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="flex-shrink-0 mt-1" />
                  <span className="text-sm">132 Dartmouth Street Boston, Massachusetts 02156 United States</span>
                </div>
              </div>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="font-semibold text-[#1F3714] dark:text-white mb-4">Company</h3>
              <div className="space-y-4 text-[#1F3714] dark:text-gray-300 text-sm">
                <p>About</p>
                <p>Contact</p>
                <p>Blogs</p>
              </div>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="font-semibold text-[#1F3714] dark:text-white mb-4">Legal</h3>
              <div className="space-y-4 text-[#1F3714] dark:text-gray-300 text-sm">
                <p>Privacy Policy</p>
                <p>Terms & Services</p>
                <p>Terms of Use</p>
                <p>Refund Policy</p>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="font-semibold text-[#1F3714] dark:text-white mb-4">Quick Links</h3>
              <div className="space-y-4 text-[#1F3714] dark:text-gray-300 text-sm">
                <p>Techlabz Keybox</p>
                <p>Downloads</p>
                <p>Forum</p>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="bg-[#6F965E] dark:bg-[#4A6B3D] p-4 rounded-lg">
                <h3 className="font-semibold text-[#1F3714] dark:text-white mb-4">Join Our Newsletter</h3>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full rounded-md px-4 py-2 text-sm bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                  <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                    Subscribe
                  </button>
                  <p className="text-[#1F3714] dark:text-gray-300 text-xs opacity-50">
                    * Will send you weekly updates for your better tool management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer;