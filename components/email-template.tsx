import * as React from 'react';

interface EmailTemplateProps {
    imageUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  imageUrl,
}) => (
  <div>
    <h1>Here is your image!</h1>
    <img src={imageUrl} alt="Generated Image" />
  </div>
);