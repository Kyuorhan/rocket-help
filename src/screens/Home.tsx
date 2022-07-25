import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from 'native-base';

import { SignOut, ChatTeardropText } from 'phosphor-react-native';

import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Order, OrderProps } from '../components/Order';

export function Home() {
  const [statusSelect, setStatusSelect] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: '456',
      patrimony: '123456',
      when: '18/07/2022 ás 10:00',
      status: 'open',
    },
  ]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('detail', { orderId });
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}

        />


      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Meus chamados
          </Heading>

          <Text color="gray.200">
            Ver todos
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelect('open')}
            isActive={statusSelect === 'open'}
          />
          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelect('closed')}
            isActive={statusSelect === 'closed'}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={64} />
              <Text color={colors.gray[300]} fontSize="md" mt={6} textAlign="center">
                Você ainda não possui solicitações {'\n'}
                em {statusSelect === 'open' ? 'andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />

        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}