import React from 'react';
import Link from 'next/link';

const About = () => (
  <div>
    <h1>About Page</h1>
    <p>This is the about page of our Speak Smart application.</p>
    <Link href="/">Go back to home</Link>
  </div>
);

export default About;