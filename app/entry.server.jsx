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
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://cdn.shopify.com',
      'https://fonts.googleapis.com',
      'http://localhost:3100',
    ],
    imgSrc: [
      "'self'",
      'cdn.shopify.com',
      'https://cur.cursors-4u.net/nature/nat-11/nat1021.cur',
      'http://localhost:3100',
    ],
    scriptSrc: [
      "'self'",
      'https://fonts.googleapis.com',
      'cdn.shopify.com',
      'https://unpkg.com/@google/model-viewer@v1.12.1/dist/model-viewer.min.js',
      'http://localhost:3100',
    ],
    frameSrc: [
      "'self'",
      'https://player.vimeo.com',
    ],
    connectSrc: [
      "'self'",
      'cdn.shopify.com',
      'https://monorail-edge.shopifysvc.com',
      'ws://localhost:8002/socket',
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
