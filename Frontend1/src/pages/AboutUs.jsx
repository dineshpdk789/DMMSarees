import React from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';

// --- Reusable Icon Components for the "Why Choose Us" section ---
const QualityIcon = () => <svg className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>;
const ShippingIcon = () => <svg className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>;
const SupportIcon = () => <svg className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>;


const AboutUs = () => {
  return (
    <>
      <Navbar />
      <PageTitle title="About Us" />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-indigo-600 tracking-wide uppercase pt-12">Our Story</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Welcome to DMM Sarees
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Founded in 2025, DMM Sarees was born from a simple idea: to make online shopping a seamless and enjoyable experience. We believe that finding high-quality products shouldn't be a chore, but a delight.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mt-16 bg-gray-50 p-12 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            <p className="mt-4 text-lg text-gray-600">
              Our mission is to bring you a curated selection of the finest products, backed by exceptional customer service. We are committed to quality, affordability, and providing a platform where you can shop with confidence and ease.
            </p>
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mx-auto">
                  <QualityIcon />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">Quality Guaranteed</h3>
                <p className="mt-2 text-gray-600">Every product is hand-picked and tested to ensure it meets our high standards of quality and durability.</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mx-auto">
                  <ShippingIcon />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">Fast & Reliable Shipping</h3>
                <p className="mt-2 text-gray-600">We partner with top courier services to get your order to your doorstep quickly and safely.</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mx-auto">
                  <SupportIcon />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">Dedicated Support</h3>
                <p className="mt-2 text-gray-600">Our friendly customer support team is always here to help you with any questions or concerns.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AboutUs;