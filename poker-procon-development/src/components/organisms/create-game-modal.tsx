import type { ModalProps } from '@chakra-ui/react';
import {
  Button,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateGameMutation } from '@/apis/mutation';
import { Checkbox } from '@/components/atoms/form-parts';
import ModalContainer from '@/components/molecules/modal-container';
import {
  DEFAULT_FEE,
  DEFAULT_INITIAL_POINT,
  DEFAULT_ROUND,
} from '@/constants/game';
import type { CreateGameRequestType } from '@/schema/request';
import { CreateGameSchema } from '@/schema/request';

export interface CreateGameModalProps
  extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  players: string[];
  postCreateGame: (id: string) => void;
  setIsLoading: (flag: boolean) => void;
}

const CreateGameModal = ({
  players,
  isOpen,
  onClose,
  postCreateGame,
  setIsLoading,
}: CreateGameModalProps) => {
  const { mutateAsync: createGame } = useCreateGameMutation();

  const defaultValues: CreateGameRequestType = {
    players: [],
    totalRound: DEFAULT_ROUND,
    initialPoint: DEFAULT_INITIAL_POINT,
    fee: DEFAULT_FEE,
  };

  const {
    // formState: { errors, isSubmitting },
    formState,
    handleSubmit,
    getValues,
    register,
  } = useForm({
    defaultValues,
    resolver: yupResolver(CreateGameSchema),
  });

  const onSubmit = useCallback(
    async (values: CreateGameRequestType) => {
      setIsLoading(true);
      const res = await createGame(values);
      postCreateGame(res.id);
      onClose();
    },
    [onClose, postCreateGame, setIsLoading]
  );

  const { errors, isSubmitting } = formState;

  return (
    <ModalContainer
      size="3xl"
      title="ゲーム追加"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap={8}>
          <FormControl isInvalid={Boolean(errors.players)}>
            <Flex align="flex-start">
              <FormLabel htmlFor="players" minW={24} fontWeight="bold">
                プレイヤー
              </FormLabel>
              <CheckboxGroup>
                <Flex gap={2.5} wrap="wrap">
                  {players.map((player, i) => {
                    const checkedPlayers = getValues('players');
                    const checked = checkedPlayers?.find(
                      (item) => item === player
                    );
                    return (
                      <Checkbox
                        key={player}
                        value={player}
                        checked={!!checked}
                        {...register('players')}
                        label={player}
                        aria-label={`player-${i}`}
                      />
                    );
                  })}
                </Flex>
              </CheckboxGroup>
            </Flex>
            <FormErrorMessage>
              {errors.players && (
                <Text textStyle="normal.md">{errors.players.message}</Text>
              )}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.totalRound)}>
            <Flex>
              <FormLabel htmlFor="round" minW={24} fontWeight="bold">
                ラウンド数
              </FormLabel>
              <NumberInput>
                <NumberInputField
                  id="round"
                  aria-label="round"
                  {...register('totalRound')}
                />
              </NumberInput>
            </Flex>
            <FormErrorMessage>
              {errors.totalRound && (
                <Text textStyle="normal.md">{errors.totalRound.message}</Text>
              )}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.initialPoint)}>
            <Flex>
              <FormLabel htmlFor="initialPoint" minW={24} fontWeight="bold">
                初期ポイント
              </FormLabel>
              <NumberInput>
                <NumberInputField
                  id="initialPoint"
                  disabled
                  aria-label="initialPoint"
                  {...register('initialPoint')}
                />
              </NumberInput>
            </Flex>
            <FormErrorMessage>
              {errors.initialPoint && (
                <Text textStyle="normal.md">{errors.initialPoint.message}</Text>
              )}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.fee)}>
            <Flex>
              <FormLabel htmlFor="fee" minW={24} fontWeight="bold">
                参加フィー
              </FormLabel>
              <NumberInput>
                <NumberInputField
                  id="fee"
                  disabled
                  aria-label="fee"
                  {...register('fee')}
                />
              </NumberInput>
            </Flex>
            <FormErrorMessage>
              {errors.fee && (
                <Text textStyle="normal.md">{errors.fee.message}</Text>
              )}
            </FormErrorMessage>
          </FormControl>
          <Flex justify="flex-end" gap={4}>
            <Button
              type="reset"
              colorScheme="gray"
              variant="outline"
              onClick={onClose}
              isLoading={isSubmitting}
            >
              キャンセル
            </Button>
            <Button type="submit" colorScheme="red" bgColor="brand100.300">
              作成
            </Button>
          </Flex>
        </Flex>
      </form>
    </ModalContainer>
  );
};

export default CreateGameModal;
