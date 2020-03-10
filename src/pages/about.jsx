import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import { Column, Wrapper, Title1 } from '../components/newspaper';
import { colors } from '../theme';
import Anchor from '../components/reusable/Anchor';

// TODO create a new Paypal donate button URL + QR code that redirect back to
// the live PSxyz site (instead of github)

const SocialLink = ({ href, children }) => (
  <Anchor
    href={href}
    color={colors.white}
    hoverColor={colors.red}
    altText={`${children}`}
    underline
  >
    {children}
  </Anchor>
);

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

const About = () => (
  // TODO: What if a user clicks show filters on this page? Should we hide the filters button?
  <Layout
    toggleFiltersDrawer={() => {}}
    showFilters={false}
  >
    <Wrapper color={colors.blue}>
      <Column>
        <Title1>OUR STORY</Title1>
        <p>
          Public Service was born out of our own needs. As people of color working in the advertising industry, it quickly became obvious that words like diversity and inclusion are everywhere but we wanted to see it actualized. Clients knew that the appearance of diversity sells, but working in white spaces meant the behind-the-scenes talent hired was reflective of what and who they were familiar with–more white people. We asked ourselves why we were one of the few people of color on set, and how we can fix that.
        </p>
        <p>
          “We only judge the work.” “I don’t know any.” “They don’t have the experience.” These are excuses we hear. This sort of thinking inevitably sustains systemic privilege and inherently devalues the work of people of color who have been historically excluded. Breaking through these barriers requires a new approach–one we’re creating with you alongside our friends at
          {' '}
          <Anchor
            href="https://www.scopeofwork.co"
            underline
          >
            SOW
          </Anchor>
          .
        </p>
        <p>
          Our first project is an ever-evolving curated directory of U.S.-based POC imagemakers–from directors to makeup artists to casting directors and everyone in between. These are people whose work we find interesting, who help us see in new ways, who excite us, who have limitless potential. Use it as a resource to find POC talent for your next project. Share it. Spread the word. Please note our directory is an ever-growing list so reach out with talent submissions – we’d love to hear from you.
        </p>

      </Column>

      <Column>
        <Title1>PEOPLE</Title1>
        <p>
          Public Service is
          {' '}
          <SocialLink href="https://www.instagram.com/kaity.wong">
            Kaity Wong
          </SocialLink>
          {', '}
          <SocialLink href="https://www.instagram.com/inyebynature/">
            Inyegumena Nosegbe
          </SocialLink>
          {', '}
          <SocialLink href="https://www.instagram.com/______lulu________/">
            Lulu Mu Park
          </SocialLink>
          {', '}
          <SocialLink href="https://www.instagram.com/whosheila/">
            Sheila Reyes
          </SocialLink>
          {', '}
          <SocialLink href="https://www.instagram.com/anoozle/">
            Anu Lingala
          </SocialLink>
          {', '}
          David Ouyang Moench
          {', '}
          <SocialLink href="https://www.instagram.com/eshiaanne/">
            Eshia Alvarado
          </SocialLink>
          .
        </p>

        <p>
          For collabs, conversation, brand partnerships, talent submissions, etc. e-mail us
          {' '}
          <Anchor
            href="mailto:people@publicservice.com"
            altText="people@publicservice.com"
            underline
          >
            people@publicservice.com
          </Anchor>
        </p>
      </Column>

      <Column>
        <Title1>DONATE</Title1>
        <p>
          Supporting Public Service is an investment in achieving equity in imagemaking.
          Donate to us via
          {' '}
          <Anchor
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NKHMRH58PWWWE&source=url"
            altText="Paypal QR Code"
            underline
          >
            Paypal
          </Anchor>
          {' '}
          to help support and expand the work we’re doing.
        </p>
      </Column>
    </Wrapper>
  </Layout>
);

export default About;
