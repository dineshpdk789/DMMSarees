import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Assuming you have these components
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

// --- Reusable Icon Components ---
const PhoneIcon = () => <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>;
const EmailIcon = () => <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>;

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    try {
      setSubmitting(true);
      const res = await axios.post('/api/v1/contact', { name, email, message }, { withCredentials: true });
      if (res.data?.success) {
        toast.success('Message sent successfully');
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(res.data?.message || 'Failed to send message');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <PageTitle title="Contact Us" />

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-22 px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              We'd love to hear from you. Please fill out the form below or contact us directly.
            </p>
          </div>

          {/* Main Content: Form + Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Side: Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" rows="4" value={message} onChange={(e)=>setMessage(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                <div>
                  <button type="submit" disabled={submitting} className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${submitting? 'opacity-60 cursor-not-allowed':''}`}>
                    {submitting? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side: Contact Details */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <PhoneIcon />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                    <p className="mt-1 text-gray-500">Our team is available to help you during business hours.</p>
                    <a href="tel:7013418146" className="mt-2 text-indigo-600 hover:text-indigo-800 font-semibold">
                      +91 7013418146
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <EmailIcon />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                    <p className="mt-1 text-gray-500">Send us an email and we'll get back to you shortly.</p>
                    <a href="mailto:pdk7893@gmail.com" className="mt-2 text-indigo-600 hover:text-indigo-800 font-semibold">
                      pdk7893@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ContactUs;