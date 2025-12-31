import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsLoading(false);
    setEmail('');
    setName('');
    
    // Reset after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="waitlist" className="px-4 py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="mb-4 text-slate-900">Be First in Line</h2>
          <p className="text-slate-600">
            Join our waitlist to get early access and exclusive launch benefits.
          </p>
        </div>
        
        {submitted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-slate-900">You're on the list!</h3>
            <p className="text-slate-600">
              We'll notify you when we launch. Check your email for confirmation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-slate-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Joining...' : 'Join Waitlist'}
              </button>
            </div>
            
            <p className="mt-4 text-xs text-center text-slate-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
