import * as React from 'react';

interface EmailTemplateProps {
  imageURl: string,
  email: string
}

interface ContactEmailTemplateProps {
  email: string,
  subject: string,
  message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  imageURl, email
}) => (
  <div>
    <h1>Here is your image</h1>
    <h2>Email is {email}</h2>
    <img src={imageURl} alt="image" />
  </div>
);

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailTemplateProps>> = ({
  email, subject, message
}) => (
  <div>
    <h1>You got a message from Mentify</h1>
    <h2>Email is {email}</h2>
    <h2>Subject is {subject}</h2>
    <h2>Message is {message}</h2>
  </div>
);
