import React from 'react';

import Layout from '../components/Layout';
import { Column, Wrapper } from '../components/newspaper';
import { colors } from '../theme';

const About = () => (
  // TODO: What if a user clicks show filters on this page? Should we hide the filters button?
  <Layout
    toggleFiltersDrawer={() => {}}
    showFilters={false}
  >
    <Wrapper color={colors.blue}>
      <Column>
        <h1>About Us</h1>
        <p>
          Public Service is a platform dedicated to achieving equity in imagemaking.
          We honor people of color as creators of culture, not just consumers.
          We believe we must diversify the creative talent working behind the scenes of every production to reimagine the gaze, reframe the narrative, and recreate the codes of visual culture.
        </p>
        <p>
          Our first project is an ever-evolving curated directory of U.S.-based POC imagemakers.
          These are people whose work we find interesting, who help us see in new ways, who excite us, who have limitless potential.
          Use it as a tool to find POC talent for your next project. Share it. Spread the word.
        </p>

        <h2>Our Story</h2>
        <p>
          Public Service was born out of our own needs.
          As people of color working in the advertising industry, it quickly became obvious that words like diversity and inclusion are everywhere but we wanted to see it actualized.
          Clients knew that the appearance of diversity sells, but working in white spaces meant the production talent hired was reflective of what and who they were familiar with–more white people.
          We asked ourselves why we were one of the few people of color on set, and how we can fix that.
        </p>
        <p>
          “We only judge the work.” “I don’t know any.” “They don’t have the experience.” These are excuses we hear.
          This sort of thinking inevitably sustains systemic privilege and inherently devalues the work of people of color who have been historically excluded.
          Breaking through these barriers requires a new approach.
        </p>
        <p>
          Our first project is an ever-evolving curated directory of U.S.-based POC imagemakers–from directors to makeup artists to casting directors and everyone in between.
          These are people whose work we find interesting, who help us see in new ways, who excite us, who have limitless potential.
          Use it as a tool to find POC talent for your next project. Share it. Spread the word.
        </p>

        <h2>People</h2>
        <p>
          Public Service is Anu Lingala, David Ouyang Moench, Eshia Alvarado, Inyegumena Nosegbe, Kaity Wong, Lulu Mu Park, Sheila Reyes.
          For collabs or talent submissions e-mail us people@publicservice.com
        </p>
      </Column>

      <Column />
    </Wrapper>
  </Layout>
);

export default About;
