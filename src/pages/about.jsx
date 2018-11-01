import React from 'react';
import { Grid } from 'react-bootstrap';
import Layout from '../components/layout';

export default () => (
  <Layout>
    <Grid>
      <h1>About</h1>
      <p>
        {'A little happy sunlight shining through there. But we\'re not there yet, so we don\'t '
          + 'need to worry about it. The light is your friend. Preserve it. I guess that would be considered '
          + 'a UFO. A big cotton ball in the sky.'}
      </p>
      <p>
        {'There isn\'t a rule. You just practice and find out which way works best for you. Now we '
          + 'don\'t want him to get lonely, so we\'ll give him a little friend. I started '
          + 'painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is '
          + 'just a pursued interest. Anybody can do what I do. Get tough with it, get strong. Use your '
          + 'imagination, let it go. We don\'t need any guidelines or formats. All we need to do is just '
          + 'let it flow right out of us.'}
      </p>
    </Grid>
  </Layout>
);
