import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Logo } from './logo';
import { FirestoreService } from '../utils/firebase';
function LogoCircles({color = 'white', ...props}) {
  return (
    <svg width="47" height="56" viewBox="0 0 46.5068 55.2368" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(45deg)' }} {...props}>
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
  const [error, setError] = useState<string | null>(null);
  const firestoreService = new FirestoreService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

 
    try {
      /*
    //old sheetDB aproach: START
      //fetch with POST method via sheetDB free link to append google drive google sheet waitlist.sheet file 
      const res = await fetch('https://sheetdb.io/api/v1/wh2jyoj64jis3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            Timestamp: new Date().toISOString(),
            Email: email,
            Name: name,
            Phone: phone
          }]
        })
      });
      if (!res.ok) throw new Error('Failed to submit');
      */
    //old sheetDB aproach: END


    //new firestore aproach: START
    
    await firestoreService.addSubmissionDocument({
      Timestamp: new Date().toISOString(),
        Email: email,
            Name: name,
            Phone: phone
    });
    
    //new firestore aproach: END  


      setSubmitted(true);

    } catch (err) {
      setError('There was a problem joining the waitlist. Please try again.');
      console.log("Error occured in appending the user submitted waitlist form data to to gogole sheets via sheetDB link: ", err)
    }
  };

  return (
    <section id="waitlist" className="bg-black py-32">
      <div className="max-w-7xs mx-auto px-6" style= {{transitionDuration: "2s"}}>
        <div className="max-w-2xl mx-auto" style = {{display:"flex", justifyContent:"center"}} >
    
          {/* Form Card */}
          <div  className="rounded-3xl p-12 shadow-2xl bg-transparent border border-white">

                   {/* Logo */}
          <div className="flex justify-center mb-12">
            <Logo color = "white"  />
          </div>

         

            {submitted ? (
              <>
                <div className="flex flex-col items-center justify-center py-10 animate-fade-in-up">
                  <p className="text-lg text-white mb-6 text-center max-w-md">Thank you for joining. To get a head start, message <span style={{fontWeight: "bold"}}>GOAT</span>, your head coach at Delirio!</p>
                  <div style = {{paddingBlock: 12}} className="bg-black border border-white rounded-2xl p-8 text-center shadow-0xl w-full max-w-lg">
                    <a style={{color: "white", textDecoration:"underline"}} className="underline text-2xl font-bold block " href="sms:+16174044888">+1 (617) 404-4888</a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl md:text-2.5xl tracking-tight mb-6 text-center text-white">
                  Become a Founding User
                </h2>
                <p className="text-xl text-white/80 mb-10 text-center">
                  Gain early access to new features, and exclusive discounts!
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                  <div className="space-y-4"> 
                    <Input
                      style={{ paddingInline: 25, borderBottomColor: "rgba(255,255,255,0.5)", borderBottomWidth: 0.01, }}
                      type="text"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-14 text-lg bg-transparent text-white placeholder:text-white/60 border border-white/30 focus:border focus:border-white focus:bg-black focus:text-white rounded-[0] focus:rounded-lg transition-all duration-100 outline-none"
                    />
                    <Input
                      style={{ paddingInline: 25, borderBottomColor: "rgba(255,255,255,0.5)" }}
                      type="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-14 text-lg bg-transparent text-white placeholder:text-white/60 border border-white/30 focus:border focus:border-white focus:bg-black focus:text-white rounded-[0] focus:rounded-lg transition-all duration-100 outline-none"
                    />
                    <Input

                      style={{ paddingInline: 25, borderBottomColor: "rgba(255,255,255,0.5)", borderBottomWidth: 0.01, outline: "none" }}
                      type="tel"
                      placeholder="phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-14 text-lg bg-transparent text-white placeholder:text-white/60 border border-white/30 focus:border focus:border-white focus:bg-black focus:text-white rounded-[0] focus:rounded-lg transition-all duration-100 outline-none"
                    />
                  </div>
                  {error && <div className="text-red-400 text-center text-sm mt-2">{error}</div>}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-white text-black hover:bg-white/90 rounded-xl h-14 text-lg font-['Big_Caslon',serif] border border-white"
                  >
                    Join Waitlist
                  </Button>
                </form>
              </>
            )}
            
          </div>
       
        </div>
        
      </div>
    </section>
  );
}