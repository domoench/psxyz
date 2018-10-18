# PS.xyz
Live dev site at https://infallible-golick-40b1cc.netlify.com

## Stack
- Contentful (contentful.com): Headless CMS
- React (reactjs.org): JS library for frontend UI
- Gatsby (gatsbyjs.org): React site-building framework
- Netlify (netlify.com): Site build/hosting service

## Running in development
`gatsby develop`

### Setup
1. Create a file named `.env.development` with the following contents:
```
CF_SPACE_ID=<Contentful Space ID>
CF_ACCESS_TOKEN=<Contentful API Access Token>
```
(Replace space ID and access token with your real ID and secret token)
