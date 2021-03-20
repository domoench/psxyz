import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import { Column, Wrapper, Title1, Section } from '../components/newspaper';
import { colors } from '../theme';
import Anchor from '../components/reusable/Anchor';

// TODO
// - create a new Paypal donate button URL + QR code that redirect back to
//   the live PSxyz site (instead of github)

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

const About = ({ location }) => (
  <Layout
    location={location}
    toggleFiltersDrawer={() => {}}
    showFilters={false}
  >
    {(/* width */) => (
      <Wrapper color={colors.blue}>
        <Column>
          <Section>
            <Title1>OUR STORY</Title1>
            <p>
              Public Service began in 2018, born out of our own needs. As
              creatives of color working in the advertising industry, it quickly
              became obvious that words like diversity and inclusion are
              everywhere but we wanted to see it actualized.
            </p>
            <p>
              Clients knew that the appearance of diversity sells, but working
              in white spaces meant the behind-the-scenes talent hired was
              reflective of what and who they were familiar with–more white
              people. We asked ourselves why we were one of the few people of
              color on set, and how we can fix that. “We only judge the work.”
              “I don’t know any.” “They don’t have the experience.” These are
              excuses we hear.
            </p>
            <p>
              This sort of thinking inevitably sustains systemic privilege and
              inherently devalues the work of people of color who have been
              historically excluded. Breaking through these barriers requires a
              new approach.
            </p>
            <p>
              Our first project is an ever-evolving curated directory of
              U.S.-based imagemakers of color–from directors to makeup artists
              to casting directors and everyone in between. We first
              soft-launched our directory with this{' '}
              <Anchor
                href="https://docs.google.com/spreadsheets/d/1GRLM_otNk_vXXsPqq4lGZckDFfBCtG1rofOdzfTEMII/edit#gid=383960265"
                underline
              >
                document
              </Anchor>
              . Our directory contains people whose work we find interesting,
              who help us see in new ways, who excite us, who have limitless
              potential. Use it as a resource to find talent for your next
              project. If you’re an agency or brand we urge you to read our{' '}
              <Anchor
                href="https://drive.google.com/file/d/1B4xukvX6gKKHQPML9MUkuiimj8U0GYSu/view?usp=drivesdk"
                underline
              >
                open letter
              </Anchor>{' '}
              and{' '}
              <Anchor href="https://www.instagram.com/p/CBgPEzslP-k/" underline>
                guidelines
              </Anchor>{' '}
              before proceeding.
            </p>
          </Section>
        </Column>

        <Column>
          <Section>
            <Title1>OUR TEAM</Title1>
            <p>
              Public Service is an independently-run and self-funded team of
              color. We are Kaity Wong, Inyegumena Nosegbe, Lulu Mu Park, Sheila
              Reyes, Anu Lingala, David Ouyang Moench, and Eshia Alvarado. If
              you’d like to work with us{' '}
              <Anchor href="https://forms.gle/CdsjpnsR14jPRQag8" underline>
                submit an inquiry
              </Anchor>
              .
            </p>
          </Section>
          <Section>
            <Title1>THE CREATIVE STUDIO</Title1>
            <p>
              Public Service is a creative studio actively working to create
              work by and for people of color. We offer services like creative
              and art direction, strategic consulting, writing, custom talent
              curation, and more.{' '}
              <Anchor
                href="https://www.kaitywong.com/s/PublicService_Capabilities_2020.pdf"
                underline
              >
                Learn more
              </Anchor>
              .
            </p>
          </Section>
          <Section>
            <Title1>JOIN THE DIRECTORY</Title1>
            <p>
              Our directory is an ever-growing list, we’d love to hear from you.{' '}
              <Anchor href="https://forms.gle/9sbjt2xGxh4Dikt86" underline>
                Submit your work to be considered
              </Anchor>
              .
            </p>
          </Section>

          <Section>
            <Title1>DONATE</Title1>
            <p>
              Supporting Public Service is an investment in achieving equity in
              imagemaking. Donate to us via{' '}
              <Anchor href="https://venmo.com/public-service" underline>
                Venmo
              </Anchor>{' '}
              or{' '}
              <Anchor
                href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NKHMRH58PWWWE&source=url"
                underline
              >
                Paypal
              </Anchor>{' '}
              to help support and further our work.
            </p>
          </Section>

          <Section>
            <Title1>CONTACT</Title1>
            <p>
              For collabs, conversation, etc. reach out at{' '}
              <Anchor href="mailto:contact@publicservice.com" underline>
                contact@publicservice.xyz
              </Anchor>{' '}
              and{' '}
              <Anchor
                href="http://www.instagram.com/publicservice.xyz"
                underline
              >
                @publicservice.xyz
              </Anchor>
              .
            </p>
          </Section>
        </Column>

        <Column>
          <Section>
            <Title1>AGENCY AND BRAND GUIDELINES</Title1>
            <p>
              As we witness momentum build, a sudden influx of previously
              'unaware' brands and agencies are now desperately seeking to
              diversify their talent. We foresee the problems with this
              superficial approach, and we are determined to offer a more
              thoughtful platform for change. Public Service is not about the
              current moment; it is about the long term future of the creative
              industry. We have spent two years carefully working towards a
              platform made by and for imagemakers of color – a platform to
              foster growth, cultivate opportunities, and advance the fight for
              equity. Our directory is not meant to be failsafe to find a
              photographer for next month's campaign – it is meant as a resource
              to reframe your perspective of what your entire brand could look
              like. We offer this directory for your brand or agency to research
              and explore the vast range of talented imagemakers of color –
              their inspiring multitude of viewpoints and styles.
            </p>
            <p>
              Please take a moment to read our{' '}
              <Anchor
                href="https://drive.google.com/file/d/1B4xukvX6gKKHQPML9MUkuiimj8U0GYSu/view?usp=drivesdk"
                underline
              >
                open letter
              </Anchor>{' '}
              and guidelines for agencies and brands below.
            </p>
            <p>
              1. This is a directory of established industry talent. We ask that
              you contact these individuals for competitively paid opportunities
              only. Please do not devalue their work by attempting to solicit
              free labor.
            </p>
            <p>
              2. Our goal is to help connect you with creatives outside your
              limited network, which is often defined by privilege. We recommend
              you seek and develop long-term relationships with these
              imagemakers of color to fundamentally change what that network
              looks like. Please do not use this directory as a quick fix for
              current issues.
            </p>
            <p>
              3. The broad range of creative professions included in this
              directory is intentional. We believe that every person on set
              brings an influential point of view, and behind-the-scenes teams
              must include a diverse range of perspectives. Please do not
              tokenize imagemakers of color or force them to work in otherwise
              overwhelmingly white spaces.
            </p>
          </Section>
        </Column>
      </Wrapper>
    )}
  </Layout>
);

About.propTypes = {
  location: PropTypes.object.isRequired,
};

export default About;
