import * as React from 'react';

interface EmailTemplateProps {
  imageURl: string,
  email: string
}

interface ContactEmailTemplateProps {
  name: string,
  email: string,
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
  name, email, message
}) => (
  <div>
    <h1>You got a message from Mentify</h1>
    <h2>Name is {name}</h2>
    <h2>Email is {email}</h2>
    <h2>Message is {message}</h2>
  </div>
);
