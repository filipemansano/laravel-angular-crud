import { EntityMetadataMap } from '@ngrx/data';

const baseEntityMetadata: EntityMetadataMap = {
  Client: {
    additionalCollectionState: {
      pageInfo: null
    }
  },

  Plan: {}
};

export const baseEntityConfig = {
  baseEntityMetadata,
};
