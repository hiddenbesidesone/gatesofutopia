import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

/**
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 * @param {EntryContext} remixContext
 */
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    defaultSrc: [
      "'self'",
      'cdn.shopify.com',
      'shopify.com',
      '*.youtube.com',
      '*.google.com',
      'fonts.gstatic.com',
    ],
    imgSrc: [
      "'self'",
      'data:',
      'cdn.shopify.com',
      'https://cur.cursors-4u.net/nature/nat-11/nat1021.cur',
    ],
    styleSrc: [
      "'self'",
      'fonts.googleapis.com',
      'cdn.shopify.com',
    ],
    scriptSrc: [
      "'self'",
      'https://unpkg.com/@google/model-viewer@v1.12.1/dist/model-viewer.min.js',
      'cdn.shopify.com',
    ],
    connectSrc: [
      "'self'",
      'https://cdn.shopify.com/3d/models/o/4a01d2c14087968e/amplifier_mat.usdz',
    ],
  });
  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

/** @typedef {import('@shopify/remix-oxygen').EntryContext} EntryContext */
