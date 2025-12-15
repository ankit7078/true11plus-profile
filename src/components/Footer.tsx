
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'For Students': [
      { name: 'University Search', href: '/directory' },
      { name: 'Scholarships', href: '/scholarships' },
      { name: 'Application Guide', href: '/guide' },
      { name: 'Student Community', href: '/community' }
    ],
    'Resources': [
      { name: 'Study Abroad', href: '/study-abroad' },
      { name: 'Career Guidance', href: '/careers' },
      { name: 'Test Preparation', href: '/test-prep' },
      { name: 'Blog', href: '/blog' }
    ],
    'Support': [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Live Chat', href: '/chat' },
      { name: 'FAQ', href: '/faq' }
    ],
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/jobs' },
      { name: 'Press', href: '/press' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];

  return (
    <footer className="bg-[var(--bg-main)] text-[var(--text-main)] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <img
                src="/img/logo.png"
                alt="Project C Logo"
                className="h-15 w-auto object-contain"
              />
            </Link>

            <p className=" mb-6 leading-relaxed">
              Empowering students worldwide to achieve their educational dreams through
              comprehensive university search, mentorship, and scholarship opportunities.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className=" p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className=" hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-[var(--border)] pt-8 mb-8">
          <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 ">
              <MapPin className="h-5 w-5 text-blue-400" />
              <span>123 Education Street, Learning City, LC 12345</span>
            </div>
            <div className="flex items-center space-x-2 ">
              <Phone className="h-5 w-5 text-blue-400" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 ">
              <Mail className="h-5 w-5 text-blue-400" />
              <span>contact@projectc.edu</span>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-[var(--border)] pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="">
                Get the latest updates on universities, scholarships, and application deadlines.
              </p>
            </div>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg  border border-[var(--border)]  focus:ring-1 focus:ring-[var(--border)] focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className=" mb-4 md:mb-0">
            © 2024 Project C. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className=" hover:text-blue-400 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className=" hover:text-blue-400 transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/cookies" className=" hover:text-blue-400 transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;