import { DataSource } from 'typeorm';

import { Post } from './entities/post.entity';

export const postsProviders = [
  {
    provide: 'POSTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
    inject: ['DATA_SOURCE'],
  },
];
