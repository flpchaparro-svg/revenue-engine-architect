import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'wdlc9pg8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-02-20',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);
