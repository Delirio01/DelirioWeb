import { useEffect } from "react";
import { FitnessFooter } from "./FitnessFooter";
import { FitnessHeader } from "./FitnessHeader";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div style={{ paddingBlock: 200 }}>
        <FitnessHeader showCount = {false} />
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="mb-2 text-sm text-gray-500">Last updated: December 29, 2025</p>
            <p className="mb-4">
              Delirio ("we," "us," or "our") provides an AI-powered fitness coaching mobile application. This Privacy
              Policy explains how we collect, use, and protect your information when you use our app.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Information We Collect</h2>

            <h3 className="text-xl font-semibold mb-2 mt-6">Account Information</h3>
            <p className="mb-4">When you create an account, we collect:</p>
            <ul className="mb-4 list-disc pl-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Age</li>
              <li>Height and weight</li>
              <li>Fitness goals</li>
              <li>Experience level</li>
            </ul>
            <p className="mb-4">You can sign in using Apple Sign-In, Google Sign-In, or email and password.</p>

            <h3 className="text-xl font-semibold mb-2 mt-6">Workout Data</h3>
            <p className="mb-4">We track your workout activity, including:</p>
            <ul className="mb-4 list-disc pl-6">
              <li>Workout duration</li>
              <li>Exercise repetitions</li>
              <li>Workout streaks and completion history</li>
            </ul>
            <p className="mb-4">
              This data is stored on our servers to provide you with progress tracking and personalized coaching.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6">Conversation Data</h3>
            <p className="mb-4">
              When you interact with our AI coaches (via text, SMS, WhatsApp, or voice), we store:
            </p>
        <ul className="mb-4 list-disc pl-6">
              <li>Your recent messages (up to 10 messages)</li>
              <li>AI-generated summaries of your conversations</li>
              <li>Memories about your preferences and goals, generated from your conversations</li>
        </ul>
            <p className="mb-4">
              This enables our AI coaches to remember your context and provide personalized guidance across sessions.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6">Camera and Pose Data</h3>
            <p className="mb-4">
              Our app uses your device's camera to analyze your exercise form in real time.{" "}
              <strong>
                This analysis happens entirely on your device using Apple's Vision framework. We do not collect,
                transmit, or store any video footage or pose data from your camera.
              </strong>
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
        <ul className="mb-4 list-disc pl-6">
              <li>Provide personalized fitness coaching and real-time form feedback</li>
              <li>Track your workout progress over time</li>
              <li>Enable our AI coaches to remember your preferences and goals</li>
              <li>Communicate with you about your fitness journey</li>
              <li>Improve our app and services</li>
        </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8">How We Process Your Data</h2>

            <h3 className="text-xl font-semibold mb-2 mt-6">On-Device Processing</h3>
            <p className="mb-4">
              Exercise form analysis is processed entirely on your device. Your camera feed and body position data
              never leave your phone.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6">Cloud Processing</h3>
            <p className="mb-4">
              Voice and text conversations with our AI coaches are processed using third-party AI service providers.
              These providers process your messages to generate responses but do not retain your data for their own
              purposes.
            </p>
            <p className="mb-4">We use the following categories of service providers:</p>
        <ul className="mb-4 list-disc pl-6">
              <li>
                <strong>Cloud infrastructure providers</strong> for data storage and authentication
              </li>
              <li>
                <strong>AI service providers</strong> for conversation processing and voice synthesis
              </li>
              <li>
                <strong>Memory services</strong> for storing conversation context and user preferences
              </li>
              <li>
                <strong>Messaging providers</strong> for SMS and WhatsApp communication
              </li>
        </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Data Retention</h2>
            <p className="mb-4">
              We retain your data for as long as your account is active. If you wish to delete your account and all
              associated data, please contact us at{" "}
              <a href="mailto:amir7alsad@gmail.com" className="text-blue-600 underline">
                amir7alsad@gmail.com
              </a>
              . Upon receiving your request, we will delete your data from our systems and instruct our service
              providers to do the same.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information.
              However, no method of electronic transmission or storage is completely secure, and we cannot guarantee
              absolute security.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Children's Privacy</h2>
            <p className="mb-4">
              Delirio is not intended for users under 16 years of age. We do not knowingly collect personal information
              from children under 16. If you are a parent or guardian and believe your child has provided us with
              personal information, please contact us.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
        <ul className="mb-4 list-disc pl-6">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Ask questions about our data practices</li>
        </ul>
            <p className="mb-4">
              To exercise these rights, contact us at{" "}
              <a href="mailto:amir7alsad@gmail.com" className="text-blue-600 underline">
                amir7alsad@gmail.com
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Third-Party Links</h2>
            <p className="mb-4">
              Our app may contain links to third-party websites or services. We are not responsible for the privacy
              practices of these external sites.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting
              the new policy in the app and updating the "Last updated" date above.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="mb-4">
              <strong>Email:</strong>{" "}
              <a href="mailto:amir7alsad@gmail.com" className="text-blue-600 underline">
                amir7alsad@gmail.com
              </a>
            </p>

            <hr className="my-8 border-gray-300" />
            <p className="text-gray-500 text-sm">Delirio is based in Boston, Massachusetts, United States.</p>
      </div>
    </div>
    </div>
      <FitnessFooter />
</>
  );
}
