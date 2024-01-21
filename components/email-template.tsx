import * as React from 'react';
import Image from 'next/image';

interface EmailTemplateProps {
  imageURl: string,
}

interface ContactEmailTemplateProps {
  name: string,
  email: string,
  message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  imageURl
}) => (
  <div>
    <h1>Here is your image</h1>
    <Image src={imageURl} alt="image" width={500} height={500} />
  </div>
);

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailTemplateProps>> = ({
  name, email, message
}) => (
  <div>
    <h1>You got a message from Mentify</h1>
    <h2>Name :- {name}</h2>
    <h2>Email :- {email}</h2>
    <h2>Message :- {message}</h2>
  </div>
);
