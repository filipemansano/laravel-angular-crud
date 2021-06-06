import { EntityMetadataMap } from '@ngrx/data';

const baseEntityMetadata: EntityMetadataMap = {
  Client: {
    additionalCollectionState: {
      pageInfo: null
    }
  },
};

export const baseEntityConfig = {
  baseEntityMetadata,
};
