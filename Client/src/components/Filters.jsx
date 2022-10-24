import {
  Box,
  Flex,
  Text,
  Switch,
  Heading,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  FormControl,
  FormLabel,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { CalendarIcon, SearchIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { BiText } from 'react-icons/bi';
import { useState } from 'react';

export default function Filters({ getQuery, isLoading }) {
  const [filters, setFilters] = useState({
    project: '',
    address: '',
    message: '',
    select: '',
    from: '',
    to: '',
    skip: 0,
    limit: 10,
    exception: true,
  });

  const handleChange = (e, property) =>
    setFilters((p) => {
      const copy = { ...p };
      copy[property] = e?.target?.value ?? e;
      return copy;
    });

  return (
    <Box p={4}>
      <Flex mb={6} alignItems="center" justifyContent="space-between" gap={4} direction={{ base: 'column', xl: 'row' }}>
        <Heading size="lg">Filtros</Heading>
        <Flex gap={4} direction={{ base: 'column', lg: 'row' }}>
          <Flex w={36} gap={2} alignItems="center">
            <Text>Skip</Text>
            <NumberInput onChange={(v) => handleChange(v, 'skip')} defaultValue={0} min={0} step={10} allowMouseWheel>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>

          <Flex w={36} gap={2} alignItems="center">
            <Text>Take</Text>
            <NumberInput onChange={(v) => handleChange(v, 'limit')} defaultValue={10} min={1} step={10} allowMouseWheel>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>

          <Button
            variant={filters.exception ? 'solid' : 'outline'}
            leftIcon={filters.exception ? <CheckIcon /> : <CloseIcon />}
            onClick={() => handleChange(!filters.exception, 'exception')}
          >
            Solo excepciones
          </Button>
          <Button isLoading={isLoading} onClick={() => getQuery(filters)} leftIcon={<SearchIcon />} colorScheme="blue">
            Buscar
          </Button>
        </Flex>
      </Flex>
      <Stack spacing={6}>
        <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
          <InputGroup>
            <InputLeftAddon children="Proyecto:" />
            <Input
              variant="filled"
              placeholder="Nombre..."
              value={filters.project}
              onChange={(e) => handleChange(e, 'project')}
            />
            <InputRightElement pointerEvents="none" children={<BiText />} />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Address:" />
            <Input
              variant="filled"
              placeholder="Dirección..."
              value={filters.address}
              onChange={(e) => handleChange(e, 'address')}
            />
            <InputRightElement pointerEvents="none" children={<BiText />} />
          </InputGroup>
        </Flex>

        <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
          <InputGroup>
            <InputLeftAddon children="Mensaje:" />
            <Input
              variant="filled"
              placeholder="Texto..."
              value={filters.message}
              onChange={(e) => handleChange(e, 'message')}
            />
            <InputRightElement pointerEvents="none" children={<BiText />} />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Selección:" />
            <Input
              variant="filled"
              placeholder="Propiedades..."
              value={filters.select}
              onChange={(e) => handleChange(e, 'select')}
            />
            <InputRightElement pointerEvents="none" children={<BiText />} />
          </InputGroup>
        </Flex>

        <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
          <InputGroup>
            <InputLeftAddon children="Desde:" />
            <Input
              type="datetime-local"
              variant="filled"
              placeholder={Date()}
              value={filters.from}
              onChange={(e) => handleChange(e, 'from')}
            />
            <InputRightElement pointerEvents="none" children={<CalendarIcon />} />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon children="Hasta:" />
            <Input
              type="datetime-local"
              variant="filled"
              placeholder={Date()}
              value={filters.to}
              onChange={(e) => handleChange(e, 'to')}
            />
            <InputRightElement pointerEvents="none" children={<CalendarIcon />} />
          </InputGroup>
        </Flex>
      </Stack>
    </Box>
  );
}
