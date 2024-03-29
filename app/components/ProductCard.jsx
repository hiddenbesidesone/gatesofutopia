import clsx from 'clsx';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {Text, Link, AddToCartButton, Button} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';

/**
 * @param {{
 *   product: ProductCardFragment;
 *   label?: string;
 *   className?: string;
 *   loading?: HTMLImageElement['loading'];
 *   onClick?: () => void;
 *   quickAdd?: boolean;
 * }}
 */
export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
}) {
  let cardLabel;

  const cardProduct = product?.variants ? product : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const {image, price, compareAtPrice} = firstVariant;

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price, compareAtPrice)) {
    cardLabel = '🍒 Sale/';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = '🍬 New/';
  }

  const productAnalytics = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };

  return (
    <div className="flex flex-col border-solid border-gray-400 border-l border-r border-b sm:border-b md:border-l-0 lg:border-l-0 lg:border-b lg:border-r lg:[&:nth-child(3n+3)]:border-r-0 hb1--prod-bg">
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
      >
        <div className={clsx('grid cust-cursor-1 relative', className)}>

          <div className="card-image aspect-[5/5] p-4">
            {image && (
              <Image
                className="object-cover w-full fadeIn"
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                aspectRatio="5/5"
                data={image}
                alt={image.altText || `Picture of ${product.title}`}
                loading={loading}
              />
            )}
            <Text
              as="label"
              size="fine"
              className="absolute top-0 right-0 m-4 text-right text-black px-2 py-1 bg-white rounded-sm"
            >
              {cardLabel}
            </Text>
          </div>

          <div className="w-full absolute bottom-0 left-0 gap-1 p-3">
            <div className="flex flex-row justify-between">

              <Text className="w-full overflow-hidden text-ellipsis whitespace-pre-wrap text-display px-1 py-1 bg-white rounded-sm" as="h3">
                {product.title}
              </Text>

              <div>
                <Text className="flex gap-4 whitespace-pre-wrap text-display px-1 py-1 bg-white rounded-sm">
                  <Money withoutTrailingZeros data={price} />
                  {isDiscounted(price, compareAtPrice) && (
                    <CompareAtPrice
                      className={'opacity-50'}
                      data={compareAtPrice}
                    />
                  )}
                </Text>
              </div>
            </div>
          </div>

        </div>
      </Link>
      {quickAdd && firstVariant.availableForSale && (
        <AddToCartButton
          lines={[
            {
              quantity: 1,
              merchandiseId: firstVariant.id,
            },
          ]}
          variant="secondary"
          className="mt-2"
          analytics={{
            products: [productAnalytics],
            totalValue: parseFloat(productAnalytics.price),
          }}
        >
          <Text as="span" className="flex items-center justify-center gap-2">
            Add to Cart
          </Text>
        </AddToCartButton>
      )}
      {quickAdd && !firstVariant.availableForSale && (
        <Button variant="secondary" className="mt-2" disabled>
          <Text as="span" className="flex items-center justify-center gap-2">
            Sold out
          </Text>
        </Button>
      )}
    </div>
  );
}

/**
 * @param {{
 *   data: MoneyV2;
 *   className?: string;
 * }}
 */
function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}

/** @typedef {import('@shopify/hydrogen').ShopifyAnalyticsProduct} ShopifyAnalyticsProduct */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').MoneyV2} MoneyV2 */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').Product} Product */
/** @typedef {import('storefrontapi.generated').ProductCardFragment} ProductCardFragment */
