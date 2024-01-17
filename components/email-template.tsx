import * as React from 'react';

interface EmailTemplateProps {
  imageURl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  imageURl,
}) => (
  <div>
    <h1>Here is your image</h1>
    <img src={imageURl} alt="image" />
  </div>
);
