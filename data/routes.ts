import { navigation } from './navigation';
import { divisions } from './divisions';

/** Completed public paths shared by prerendering and the sitemap. */
export const publicPaths = [
  ...navigation.map((item) => item.path),
  ...divisions.map((division) => `divisions/${division.id}`),
] as const;
