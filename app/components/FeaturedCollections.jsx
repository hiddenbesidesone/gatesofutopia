import {Image} from '@shopify/hydrogen';
import {Heading, Section, Grid, Link} from '~/components';

/**
 * @param {FeaturedCollectionsProps}
 */
export function FeaturedCollections({
  collections,
  title = 'Collections',
  ...props
}) {
  const haveCollections = collections?.nodes?.length > 0;
  if (!haveCollections) return null;

  const collectionsWithImage = collections.nodes.filter((item) => item.image);

  return (
    <Section {...props} heading={title}>
      <Grid items={collectionsWithImage.length}>
        {collectionsWithImage.map((collection) => {
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className="grid gap-1 relative">
                <div className="card-image bg-primary/5 aspect-[1/1]">
                  {collection?.image && (
                    <Image
                      alt={`Image of ${collection.title}`}
                      data={collection.image}
                      sizes="(max-width: 32em) 100vw, 33vw"
                      aspectRatio="1/1"
                    />
                  )}
                </div>
                <div className="absolute bottom-0 left-0">
                  <Heading size="copy" className="mb-3 ml-3 whitespace-pre-wrap text-display max-w-md px-1 py-1 bg-white rounded-sm dark:text-primary text-contrast">{collection.title}</Heading>
                </div>
              </div>
            </Link>
          );
        })}
      </Grid>
    </Section>
  );
}

/**
 * @typedef {HomepageFeaturedCollectionsQuery & {
 *   title?: string;
 *   [key: string]: any;
 * }} FeaturedCollectionsProps
 */

/** @typedef {import('storefrontapi.generated').HomepageFeaturedCollectionsQuery} HomepageFeaturedCollectionsQuery */
