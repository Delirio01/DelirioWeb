import { FitnessHeader } from "./FitnessHeader";
import { FitnessFooter } from "./FitnessFooter";


export default function TermsServices(){
    return(
        <div id = "terms-of-service">
            <FitnessHeader/>
            <div className="max-w-7xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <p className="mb-4">
                    Welcome to Delirio! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our services, you agree to comply with and be bound by these Terms.
                </p>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                    By using our services, you agree to these Terms. If you do not agree, please do not use our services.
                </p>
                <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
                <p className="mb-4">
                    You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services in any way that could harm us or others.
                </p>
                <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
                <p className="mb-4">
                    All content, features, and functionality on our website and services, including but not limited to text, graphics, logos, and software, are the exclusive property of Delirio or its licensors and are protected by intellectual property laws.
                </p>
            </div>

            <FitnessFooter/>
        </div>
    )
}