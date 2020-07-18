import React from 'react';

import { Box, Text, Stack } from '../../ds';
import { Link } from '../link';

import { SearchDocument } from './types';

interface Props {
  items: SearchDocument[];
}

function Result({ slug, title, tags }: SearchDocument) {
  return (
    <div>
      <Link to={slug}>
        <Text>{title}</Text>
      </Link>
      {tags ? (
        <Stack as="ul">
          {tags.map((tag) => (
            <li key={tag}>
              <Text>{tag}</Text>
            </li>
          ))}
        </Stack>
      ) : null}
    </div>
  );
}

export default function Results({ items }: Props) {
  return (
    <Box px="small">
      <Stack as="ul" divide="xxsmall" divideColor="gray">
        {items.map((item) => (
          <li key={item.slug}>
            <Box py="medium">
              <Result title={item.title} slug={item.slug} />
            </Box>
          </li>
        ))}
      </Stack>
    </Box>
  );
}
