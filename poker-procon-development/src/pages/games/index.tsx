import { Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import type { GetServerSideProps } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { findGames } from '@/clients/game';
import { findPlayers } from '@/clients/player';
import Alert from '@/components/molecules/alert';
import Pagination from '@/components/molecules/pagination';
import CreateGameModal from '@/components/organisms/create-game-modal';
import ErrorMessageArea from '@/components/organisms/error-message-area';
import GameCardPanel from '@/components/organisms/game-card-panel';
import { ALERT_CLOSE_DELAY } from '@/constants';
import ROUTE from '@/constants/route';
import type {
  CustomeErrorResponse,
  FindGamesResponse,
  FindPlayersResponse,
} from '@/schema/response';
import { CommonTemplate } from '@/templates';
import { generateScreenURL } from '@/utils';

const PER_PAGE = 20;

interface GamePageProps {
  data?: {
    games: FindGamesResponse;
    players: FindPlayersResponse;
  };
  error?: CustomeErrorResponse;
}

const GameListPage = (props: GamePageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const perPage = searchParams.get('per_page')
    ? Number(searchParams.get('per_page'))
    : PER_PAGE;

  const {
    isOpen: createGameModalIsOpen,
    onClose: createGameModalOnClose,
    onOpen: createGameModalOnOpen,
  } = useDisclosure();
  const {
    isOpen: createGameAlertIsOpen,
    onClose: createGameAlertOnClose,
    onOpen: createGameAlertOnOpen,
  } = useDisclosure();
  const {
    isOpen: startGameAlertIsOpen,
    onClose: startGameAlertOnClose,
    onOpen: startGameAlertOnOpen,
  } = useDisclosure();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newGameId, setNewGameId] = useState<string>('');
  const [startGameId, setStartGameId] = useState<string>('');

  /**
   * ゲームを作成が成功した後の処理
   */
  const postCreateGame = useCallback(
    async (id: string) => {
      setNewGameId(id);
      createGameAlertOnOpen();
      router.push(
        generateScreenURL(ROUTE.S_B01_001, null, {
          page: 1,
          per_page: perPage,
        })
      );
      setIsLoading(false);
      setTimeout(() => createGameAlertOnClose(), ALERT_CLOSE_DELAY);
    },
    [
      createGameAlertOnOpen,
      createGameAlertOnClose,
      perPage,
      router,
      setIsLoading,
      setNewGameId,
    ]
  );

  /**
   * ゲームの開始が成功した後の処理
   */
  const postStartGame = useCallback(
    (id: string) => {
      setStartGameId(id);
      startGameAlertOnOpen();
      router.push(
        generateScreenURL(ROUTE.S_B01_001, null, {
          page: 1,
          per_page: perPage,
        })
      );
      setIsLoading(false);
      setTimeout(() => startGameAlertOnClose(), ALERT_CLOSE_DELAY);
    },
    [
      perPage,
      router,
      startGameAlertOnClose,
      setIsLoading,
      setStartGameId,
      startGameAlertOnOpen,
    ]
  );

  return (
    <>
      <CommonTemplate title="ゲーム一覧" isLoading={isLoading}>
        <Flex direction="column" align="center" gap={20}>
          <Heading
            as="h2"
            color="white"
            fontSize="2.25rem"
            fontWeight="black"
            lineHeight="2.75rem"
          >
            ゲーム一覧
          </Heading>
          {props.error && <ErrorMessageArea errors={props.error.errors} />}
          {props.data && (
            <>
              <Button
                colorScheme="red"
                bgColor="brand100.300"
                onClick={createGameModalOnOpen}
                ml="auto"
              >
                新規作成
              </Button>
              <Flex
                direction="row"
                align="stretch"
                gap={5}
                flexWrap="wrap"
                w="full"
                mx="auto"
              >
                {props.data.games.list.map((game) => (
                  <GameCardPanel
                    key={game.id}
                    game={game}
                    index={Number(game.id) - 1}
                    postStartGame={postStartGame}
                    setIsLoading={setIsLoading}
                  />
                ))}
              </Flex>
              {props.data.games.total && (
                <Pagination
                  page={page}
                  max={props.data.games.total ?? 0}
                  perPage={perPage}
                  onClick={(p) =>
                    router.push(
                      generateScreenURL(ROUTE.S_B01_001, null, {
                        page: p,
                        per_page: perPage,
                      })
                    )
                  }
                />
              )}
            </>
          )}
        </Flex>
      </CommonTemplate>
      {createGameModalIsOpen && (
        <CreateGameModal
          players={props.data?.players.list || []}
          isOpen={createGameModalIsOpen}
          onClose={createGameModalOnClose}
          postCreateGame={postCreateGame}
          setIsLoading={setIsLoading}
        />
      )}
      {createGameAlertIsOpen && (
        <Alert
          status="success"
          title="新しいゲームを作成しました。"
          description={`ID: ${newGameId}`}
          onClose={createGameAlertOnClose}
        />
      )}
      {startGameAlertIsOpen && (
        <Alert
          status="success"
          title="ゲームを開始しました。"
          description={`ID: ${startGameId}`}
          onClose={startGameAlertOnClose}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<GamePageProps> = async (
  ctx
) => {
  const page = ctx.query.page ? Number(ctx.query.page) : 1;
  const perPage = ctx.query.per_page ? Number(ctx.query.per_page) : PER_PAGE;

  try {
    const games = await findGames({
      page,
      per_page: perPage,
    });
    const players = await findPlayers();

    return {
      props: {
        data: {
          games,
          players,
        },
      },
    };
  } catch (e: any) {
    return {
      props: {
        error: e,
      },
    };
  }
};

export default GameListPage;
