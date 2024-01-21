import * as React from 'react';

interface EmailTemplateProps {
  imageURl: string,
  email: string
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
