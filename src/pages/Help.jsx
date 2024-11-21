import React from 'react';
import { Link } from 'react-router-dom';

function HelpPage() {
  return (
    <div className="bg-gray-50 text-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Welcome to DevTinder Help Center</h1>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">What is DevTinder?</h2>
          <p className="text-lg leading-relaxed mb-4">
            DevTinder is a platform designed for developers to connect, collaborate, and build amazing projects together. Whether you're looking for a new team to join, a collaborator for your side project, or simply want to showcase your skills, DevTinder is the place to be. 
          </p>
          <p className="text-lg leading-relaxed">
            With a community of passionate developers, DevTinder allows users to interact, share ideas, and contribute to open-source projects. Build your professional network, discover opportunities, and create your own unique path in the world of development.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">How to Sign Up</h2>
          <p className="text-lg leading-relaxed mb-4">
            Signing up for DevTinder is quick and easy. Follow these steps to create your account:
          </p>
          <ol className="list-decimal pl-6 text-lg mb-4">
            <li>Click on the "Sign Up" button on the home page.</li>
            <li>Fill in your personal information (name, email, and password).</li>
            <li>Agree to the terms and conditions of the platform.</li>
            <li>Click the "Create Account" button.</li>
            <li>You will receive a verification email; click on the verification link to activate your account.</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">How to Log In</h2>
          <p className="text-lg leading-relaxed mb-4">
            If you already have an account, simply follow these steps to log in:
          </p>
          <ol className="list-decimal pl-6 text-lg mb-4">
            <li>Click on the "Log In" button on the home page.</li>
            <li>Enter your registered email and password.</li>
            <li>Click the "Log In" button to access your profile.</li>
            <li>If you forget your password, click on the "Forgot Password" link to reset it.</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">Managing Your Profile</h2>
          <p className="text-lg leading-relaxed mb-4">
            You can easily manage your profile and make updates to your information. Here's how you can update your profile:
          </p>
          <ol className="list-decimal pl-6 text-lg mb-4">
            <li>Go to your profile page by clicking on your profile icon in the top right corner.</li>
            <li>Click on the "Edit Profile" button to update your profile picture, bio, and other details.</li>
            <li>After making changes, click "Save" to update your profile.</li>
          </ol>
          <p className="text-lg leading-relaxed mb-4">
            Note: You can update your name, bio, and profile picture, but you are unable to change your email address after registration.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">Changing Your Password</h2>
          <p className="text-lg leading-relaxed mb-4">
            To ensure your account remains secure, we allow users to change their password at any time. Here's how you can change your password:
          </p>
          <ol className="list-decimal pl-6 text-lg mb-4">
            <li>Go to your profile settings.</li>
            <li>Click on the "Change Password" option.</li>
            <li>Enter your current password and then enter your new password.</li>
            <li>Click "Save Changes" to update your password.</li>
          </ol>
          <p className="text-lg leading-relaxed">
            You will need to know your current password to change it. If you forget your current password, use the "Forgot Password" option on the login page to reset it.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">What You Can Do on DevTinder</h2>
          <p className="text-lg leading-relaxed mb-4">
            Once you're logged in, DevTinder offers several features to help you connect and collaborate with other developers. Here's a brief overview of what you can do:
          </p>
          <ul className="list-disc pl-6 text-lg mb-4">
            <li><strong>Build Your Profile:</strong> Showcase your skills, projects, and achievements in your profile.</li>
            <li><strong>Connect with Other Developers:</strong> Find and follow other developers, collaborate on open-source projects, and build a network.</li>
            <li><strong>Post Updates and Projects:</strong> Share updates about your ongoing projects or open-source contributions.</li>
            <li><strong>Explore Job Opportunities:</strong> Find job listings and freelance opportunities posted by other developers.</li>
            <li><strong>Join Communities:</strong> Participate in community-driven discussions, share knowledge, and learn from other developers.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Q: How do I reset my password?</h3>
              <p className="text-lg leading-relaxed">To reset your password, click on the "Forgot Password" link on the login page, enter your email address, and follow the instructions sent to your email.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Q: Can I delete my account?</h3>
              <p className="text-lg leading-relaxed">At this time, we don't allow users to delete their accounts directly, but you can contact support to request account deletion.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Q: How do I contact support?</h3>
              <p className="text-lg leading-relaxed">You can contact support by visiting the "Help & Support" section in your profile settings or by emailing support@devtinder.com.</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">Need Further Assistance?</h2>
          <p className="text-lg leading-relaxed mb-4">
            If you need further assistance or have additional questions, feel free to reach out to our support team. We’re here to help you get the most out of your experience on DevTinder!
          </p>
          <Link
            to="/contact"
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-3 rounded-full"
          >
            Contact Support
          </Link>
        </section>
      </div>
    </div>
  );
}

export default HelpPage;
