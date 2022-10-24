import { useState } from 'react';
import { Box, filter, Flex, useColorModeValue } from '@chakra-ui/react';
import TraceTable from './TraceTable';
import Filters from './Filters';
import HasError from './HasError';
import axios from 'axios';
import loadingMessage from '../messages/loadingMessage';
import errorMessage from '../messages/errorMessage';
import successMessage from '../messages/successMessage';

export default function Core() {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tracesList, setTracesList] = useState([]);
  const theme = useColorModeValue('light', 'dark');

  const getQuery = (filters) => {
    let tl = tracesList;
    setIsLoading(true);
    let he = hasError;
    setHasError(false);
    loadingMessage(theme);

    const body = {};

    Object.keys(filters).forEach((x) => {
      if (filters[x] && !['skip', 'limit', 'from', 'to'].includes(x))
        typeof filters[x] === 'string'
          ? (body[x] = { $regex: filters[x] })
          : filters[x] instanceof Date
          ? (body.date = filters[x])
          : (body[x] = filters[x]);
    });

    if (filters.from && filters.to) body.date = { $gte: filters.from, $lt: filters.to };

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}traces/q`, body, {
        params: {
          skip: filters.skip,
          limit: filters.limit,
        },
        headers: {
          'Content-Type': 'application/json',
          select: filters.select,
        },
      })
      .then(function ({ data }) {
        if (data.error) throw new Error(response.content);
        tl = data.content;
        setTracesList(tl);
      })
      .catch(function (error) {
        console.log(error);
        he = true;
        setHasError(he);
        errorMessage(theme);
      })
      .finally(function () {
        setIsLoading(false);
        if (!he) successMessage(theme, tl.length);
      });
  };

  return (
    <Flex px="6vw" py="4vh" flexDirection="column" gap={6}>
      <Box p={4} borderRadius={12} bg={useColorModeValue('gray.200', 'blackAlpha.300')}>
        <Filters getQuery={getQuery} isLoading={isLoading}></Filters>
      </Box>
      <Box width="100%" p={4} mb={16} borderRadius={12} bg={useColorModeValue('gray.100', 'blackAlpha.200')}>
        {hasError ? <HasError /> : <TraceTable theme={useColorModeValue('light', 'dark')} tracesList={tracesList} />}
      </Box>
    </Flex>
  );
}
