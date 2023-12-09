import React from 'react';

const AUP = () => {
    return(
        <div className='text-white p-6'>
            <h2>Acceptable Use Policy</h2>

            <p>Last Updated: [Date]</p>

            <h3>1. Introduction</h3>

            <p>This Acceptable Use Policy (AUP) outlines the terms and conditions for the use of [Your Company/App]'s services.
                Users are expected to comply with this policy to ensure a positive and secure experience for all.</p>

            <h3>2. Acceptable Use</h3>

            <p>Users must use our services responsibly and in accordance with all applicable laws and regulations. Unacceptable
                uses include, but are not limited to:</p>

            <ul>
                <li>Violating any laws or regulations.</li>
                <li>Engaging in fraudulent activities.</li>
                <li>Posting or transmitting malicious content.</li>
                <li>Harassing or threatening others.</li>
                <li>Violating intellectual property rights.</li>
                <li>Attempting unauthorized access or disrupting services.</li>
            </ul>

            <h3>3. User Responsibilities</h3>

            <p>Users are responsible for maintaining the confidentiality of their accounts and ensuring that their actions do
                not harm [Your Company/App] or other users. Reporting any suspicious activities is encouraged.</p>

            <h3>4. Consequences of Violation</h3>

            <p>Violations of this AUP may result in account suspension, termination, or legal action. [Your Company/App] reserves
                the right to enforce consequences based on the severity of the violation.</p>

            <h3>5. Reporting Violations</h3>

            <p>Users can report suspected violations of this AUP by contacting [Your Contact Information]. Prompt reporting
                helps maintain a safe online environment.</p>

            <h3>6. Changes to This Policy</h3>

            <p>This policy may be updated. Users will be notified, and the last update date will be provided.</p>

            <h3>7. Contact Information</h3>

            <p>For inquiries or concerns, contact us at [Your Contact Information].</p>

            <h3>Conclusion</h3>

            <p>Thank you for reviewing our Acceptable Use Policy. Your adherence to these guidelines contributes to a positive
                online community.</p>

            <p>[Your Company/App]<br/>[Your Address]<br/>[Your Contact Information]</p>
            <a href='/'>
            <button className='bg-[#095a1f] hover:bg-[#107b2d] rounded-lg p-2 mx-1 mt-3'>Close</button>
        </a>
        </div>
    )
}

export default AUP;