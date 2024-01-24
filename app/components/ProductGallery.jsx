import {Image} from '@shopify/hydrogen';
import { MediaFile } from '@shopify/hydrogen';

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({ media, className }) {
  if (!media.length) {
    return null;
  }

  return (
    <div
      className={`swimlane md:grid-flow-row hiddenScroll md:p-0 md:overflow-x-auto md:grid-cols-2 ${className}`}
    >
      {media.map((med, i) => {
        const isFirst = i === 0;
        const isFourth = i === 3;
        const isFullWidth = i % 3 === 0;

        const style = [
          isFullWidth ? 'md:col-span-2' : 'md:col-span-1',
          isFirst || isFourth ? '' : 'md:aspect-[4/5]',
          'aspect-square snap-center card-image bg-white dark:bg-contrast/10 w-mobileGallery md:w-full',
        ].join(' ');

        return (
          <div className={style} key={med.id}>
            {med.__typename === 'MediaImage' && (
              <MediaFile
                data={med} // Pass the entire media object
                sizes={
                  isFirst || isFourth ? '(min-width: 48em) 60vw, 90vw' : '(min-width: 48em) 30vw, 90vw'
                }
                alt='Gates Of Utopia'
                className="object-cover w-full h-full aspect-square fadeIn"
                loading={i === 0 ? 'eager' : 'lazy'} // Adjust loading behavior as needed
              />
            )}
            {med.__typename === 'Video' && (
            <MediaFile
              data={med} // Pass the entire media object
              sizes={
                isFirst || isFourth ? '(min-width: 48em) 60vw, 90vw' : '(min-width: 48em) 30vw, 90vw'
              }
              className="object-cover w-full h-full aspect-square fadeIn"
              loop={true}
              autoPlay={true}
            />
            )}
            {med.__typename === 'Model3d' && (
              <MediaFile
                data={med} // Pass the entire media object
                sizes={
                  isFirst || isFourth ? '(min-width: 48em) 60vw, 90vw' : '(min-width: 48em) 30vw, 90vw'
                }
                className="object-cover w-full h-full aspect-square"
              />
            )}
            {med.__typename === 'ExternalVideo' && (
              <MediaFile
                data={med} // Pass the entire media object
                sizes={
                  isFirst || isFourth ? '(min-width: 48em) 60vw, 90vw' : '(min-width: 48em) 30vw, 90vw'
                }
                className="object-cover w-full h-full aspect-square fadeIn"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}


/** @typedef {import('storefrontapi.generated').MediaFragment} MediaFragment */
