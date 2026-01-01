import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

function LogoCircles({color = 'white'}) {
  return (
    <svg width="47" height="56" viewBox="0 0 46.5068 55.2368" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(45deg)' }}>
      <g clipPath="url(#clip0_19_1608_waitlist)">
        <circle cx="21.5094" cy="41.6439" r="8.18715" fill={color} stroke={color} strokeWidth="5" transform="rotate(-19.0742 21.5094 41.6439)" />
        <circle cx="8.25821" cy="26.7979" r="3.99287" fill={color} stroke={color} strokeWidth="5" transform="rotate(-19.0742 8.25821 26.7979)" />
        <circle cx="38.2892" cy="28.8396" r="3.96088" fill={color} stroke={color} strokeWidth="5" transform="rotate(-19.0742 38.2892 28.8396)" />
        <circle cx="25.3349" cy="14.6024" r="8.98088" fill={color} stroke={color} strokeWidth="5" transform="rotate(-19.0742 25.3349 14.6024)" />
      </g>
      <defs>
        <clipPath id="clip0_19_1608_waitlist">
          <rect fill="white" height="55.2368" width="46.5068" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function FitnessWaitlist() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    // Do not reset fields after submission; only reset if page is reloaded
  };

  return (
    <section id="waitlist" className="bg-black py-32">
      <div className="max-w-7xs mx-auto px-6">
        <div className="max-w-2xl mx-auto" style = {{display:"flex", justifyContent:"center"}} >
    
          {/* Form Card */}
          <div  className="bg-white rounded-3xl p-12 shadow-2xl">

                   {/* Logo */}
          <div className="flex justify-center mb-12">
            <LogoCircles color = "black" />
          </div>

            <h2 className="text-4xl md:text-2.5xl tracking-tight mb-6 text-center">
              Become a Founding User
            </h2>
            <p className="text-xl text-foreground/60 mb-10 text-center">
             Gain early access to new features, and exclusive discounts!
            </p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <p className="text-green-800 text-lg">
                  ✓ Thank you for joining! We'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className = "space-y-4"> 
                  <Input
                  style = {{paddingInline: 25}}
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-14 text-lg rounded-xl border-2"
                  />
                  <Input
                      style = {{paddingInline: 25}}
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 text-lg rounded-xl border-2"
                  />
                  <Input
                      style = {{paddingInline: 25}}
                    type="tel"
                    placeholder="phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-14 text-lg rounded-xl border-2"
                  />
          </div>
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-black text-white hover:bg-black/90 rounded-xl h-14 text-lg font-[\'Big_Caslon\',serif]"
                >
                  Join Waitlist
                </Button>
              </form>
            )}
          </div>
       
        </div>
        
      </div>
    </section>
  );
}