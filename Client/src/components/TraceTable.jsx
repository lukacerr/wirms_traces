import { Flex, Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { JsonViewer } from '@textea/json-viewer';

function NoResults() {
  return (
    <Flex w="100%" justifyContent="center" alignItems="center" opacity="0.75" p={2}>
      <Heading size="sm" as="i">
        No hay resultados. Realize una nueva query.
      </Heading>
    </Flex>
  );
}

export default function AppTable({ tracesList, theme }) {
  return tracesList.length ? <JsonViewer theme={theme} value={tracesList} /> : <NoResults></NoResults>;
}
