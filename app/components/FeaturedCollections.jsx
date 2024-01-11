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
              <div className="grid gap-1 md:gap-3">
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
                <Heading size="copy" className="pb-5 md:px-3">{collection.title}</Heading>
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
