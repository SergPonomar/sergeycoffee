import Client from "shopify-buy";

export const client = Client.buildClient({
  storefrontAccessToken: '35653dd0663d0f562a6fe23e508e80c8',
  domain: 'sergeycoffee.myshopify.com/'
});