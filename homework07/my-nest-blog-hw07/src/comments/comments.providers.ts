import { DataSource } from 'typeorm';

import { Comment } from './entities/comment.entity';

export const CommentsProviders = [
  {
    provide: 'COMMENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Comment),
    inject: ['DATA_SOURCE'],
  },
];
