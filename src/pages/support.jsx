import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import { Wrapper, Column } from '../components/newspaper';
import { colors } from '../theme';
import venmoQRCode from '../assets/venmo_QR.png';
import paypalQRCode from '../assets/paypal_QR.png';

const DonateQRs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-context: space-evenly;
`;

const DonateQR = styled.div`
  min-width: 250px;
  flex-basis: auto;
  flex-grow: 1;
  padding: 0.5em;

  & h2 {
    text-align: center;
    padding: 0.5em 0em;
  }
`;

const QRAnchor = ({
  imgSrc,
  href,
  alt,
  className,
}) => (
  <a className={className} href={href}>
    <img src={imgSrc} alt={alt} />
  </a>
);

QRAnchor.propTypes = {
  imgSrc: PropTypes.string,
  href: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

const StyledQRAnchor = styled(QRAnchor)`
  display: inline-block;
  width: 100%;
  & img {
    width: 100%;
  }
`;

// TODO create a new Paypal donate button URL + QR code that redirect back to
// the live PSxyz site (instead of github)

const Support = () => (
  // TODO: What if a user clicks show filters on this page? Should we hide the filters button?
  <Layout
    toggleFiltersDrawer={() => {}}
    showFilters={false}
  >
    <Wrapper color={colors.green}>
      <Column>
        <h1>Supporting Public Service is an investment in diversifying imagemaking.</h1>
        <p>
          Supporting Public Service is an investment in diversifying imagemaking. Donate to us via Venmo to help support costs of hosting and maintenence for this resource.
        </p>
        <DonateQRs>
          <DonateQR>
            <h2>Venmo</h2>
            <StyledQRAnchor
              imgSrc={venmoQRCode}
              href="https://venmo.com/Public-Service"
              alt="Venmo QR Code"
            />
          </DonateQR>

          <DonateQR>
            <h2>Paypal</h2>
            <StyledQRAnchor
              imgSrc={paypalQRCode}
              href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NKHMRH58PWWWE&source=url"
              alt="Paypal QR Code"
            />
          </DonateQR>
        </DonateQRs>
      </Column>
      <Column />
    </Wrapper>
  </Layout>
);

export default Support;
