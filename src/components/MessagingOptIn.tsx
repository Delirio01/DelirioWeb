import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { FitnessHeader } from './FitnessHeader';
import { FitnessFooter } from './FitnessFooter';
import { Logo } from './logo';

function normalizePhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  return `+${digits}`;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}

export default function MessagingOptIn() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isFormValid =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    isValidEmail(email) &&
    isValidPhoneNumber(phone) &&
    consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const normalizedPhone = normalizePhoneNumber(phone);

      const response = await fetch('https://sheetdb.io/api/v1/wh2jyoj64jis3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [{
            Timestamp: new Date().toISOString(),
            FirstName: firstName.trim(),
            LastName: lastName.trim(),
            Email: email.trim().toLowerCase(),
            Phone: normalizedPhone,
            ConsentTimestamp: new Date().toISOString(),
            Source: 'SMS Opt-In Form',
          }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit consent.');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div style={{ paddingBlock: 200 }}>
        <FitnessHeader />
        <div className="bg-white px-6 py-24 pt-32">
          <div className="w-full max-w-md mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-10">
              <Logo color="black" />
            </div>

            {/* Card */}
            <div className="bg-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="px-4 py-6 md:px-6">
                {isSuccess ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 border-2 border-green-500 rounded-full mb-6">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-black">Success!</h2>
                  <p className="text-black/70 mb-6">
                    You'll receive a welcome message shortly. Get ready to transform your fitness journey with Delirio!
                  </p>
                  <Link to="/">
                    <Button
                      variant="outline"
                      className="border-2 border-black text-black hover:bg-black hover:text-white rounded-xl px-8 h-12"
                    >
                      Return to Home
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="py-12">
                  <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 text-black tracking-tight">
                    Get SMS Updates
                  </h1>
                  <p className="text-black/60 text-center mb-8">
                    Sign up to receive coaching messages, workout reminders, and progress updates directly to your phone.
                  </p>

                  <form onSubmit={handleSubmit}>
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-8">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-black font-medium">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="h-14 text-base bg-white text-black placeholder:text-black/40 border-2 border-black/20 focus:border-black rounded-xl transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-black font-medium">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="h-14 text-base bg-white text-black placeholder:text-black/40 border-2 border-black/20 focus:border-black rounded-xl transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2 mb-8">
                      <Label htmlFor="email" className="text-black font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-14 text-base bg-white text-black placeholder:text-black/40 border-2 border-black/20 focus:border-black rounded-xl transition-all duration-200"
                      />
                      {email && !isValidEmail(email) && (
                        <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2 mb-8">
                      <Label htmlFor="phone" className="text-black font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="h-14 text-base bg-white text-black placeholder:text-black/40 border-2 border-black/20 focus:border-black rounded-xl transition-all duration-200"
                      />
                      {phone && !isValidPhoneNumber(phone) && (
                        <p className="text-red-500 text-sm mt-1">Please enter a valid US phone number (10 digits)</p>
                      )}
                    </div>

                    {/* Consent Checkbox */}
                    <div className="flex items-start gap-3 mb-8">
                      <Checkbox
                        id="consent"
                        checked={consent}
                        onCheckedChange={(checked) => setConsent(checked === true)}
                        className="mt-1 shrink-0 border-2 border-black/30 data-[state=checked]:bg-black data-[state=checked]:border-black"
                      />
                      <Label
                        htmlFor="consent"
                        className="text-sm leading-relaxed text-black/70 cursor-pointer font-normal"
                      >
                        I agree to receive recurring automated text messages at the phone number provided. Msg & data
                        rates may apply. Msg frequency varies. Reply HELP for help and STOP to end. View our{' '}
                        <Link to="/terms" className="text-black underline hover:text-black/70">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-black underline hover:text-black/70">
                          Privacy Policy
                        </Link>
                        .
                      </Label>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full bg-black text-white hover:bg-black/90 rounded-xl h-14 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Sign Up for SMS Updates'
                      )}
                    </Button>
                  </form>
                </div>
              )}
              </div>
            </div>

            {/* Back to home link */}
            <div className="text-center mt-8 pb-12">
              <Link to="/" className="text-black/60 hover:text-black underline text-sm">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FitnessFooter />
    </>
  );
}
