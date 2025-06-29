import { Flex, Heading } from '@chakra-ui/react';
import type { GetServerSideProps } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import { findGameById } from '@/clients/game';
import Pagination from '@/components/molecules/pagination';
import ErrorMessageArea from '@/components/organisms/error-message-area';
import GameInformation from '@/components/organisms/game-information';
import RoundCardPanel from '@/components/organisms/round-card-panel';
import ROUTE from '@/constants/route';
import type { Game } from '@/schema/game';
import type { Log } from '@/schema/log';
import type { CustomeErrorResponse } from '@/schema/response';
import { CommonTemplate } from '@/templates';
import { generateScreenURL } from '@/utils';

const PER_PAGE = 100;

interface GameLogPageProps {
  id: string;
  data?: {
    game: Game;
    list: { round: number; logs: Log[] }[];
    total: number;
    winRound: {
      [key: string]: number;
    };
  };
  error?: CustomeErrorResponse;
}

const GameLogPage = (props: GameLogPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const perPage = searchParams.get('per_page')
    ? Number(searchParams.get('per_page'))
    : PER_PAGE;

  return (
    <CommonTemplate title={`ゲーム詳細 - ${props.id}`}>
      <Flex direction="column" align="center" gap={20}>
        <Heading
          as="h2"
          color="white"
          fontSize="2.25rem"
          fontWeight="black"
          lineHeight="2.75rem"
        >
          ゲーム詳細
        </Heading>
        {props.error && <ErrorMessageArea errors={props.error.errors} />}
        {props.data && (
          <>
            <GameInformation
              id={props.id}
              game={props.data.game}
              list={props.data.list}
              winRound={props.data.winRound}
            />
            <Flex gap={5} wrap="wrap">
              {props.data.list.map((item, i) => (
                <RoundCardPanel
                  key={item.round}
                  index={i}
                  id={props.id}
                  round={item.round}
                  logs={item.logs}
                />
              ))}
            </Flex>
            {props.data.total > 0 && (
              <Pagination
                page={page}
                max={props.data.total}
                perPage={perPage}
                onClick={(p) =>
                  router.push(
                    generateScreenURL(
                      ROUTE.S_B01_002,
                      { id: props.id },
                      {
                        page: p,
                        per_page: perPage,
                      }
                    )
                  )
                }
              />
            )}
          </>
        )}
      </Flex>
    </CommonTemplate>
  );
};

export const getServerSideProps: GetServerSideProps<GameLogPageProps> = async (
  ctx: any
) => {
  const { id } = ctx.query;
  const page = ctx.query.page ? Number(ctx.query.page) : 1;
  const perPage = ctx.query.per_page ? Number(ctx.query.per_page) : PER_PAGE;

  try {
    const data = await findGameById(id, {
      page,
      per_page: perPage,
    });

    return {
      props: { id, data },
    };
  } catch (e: any) {
    return {
      props: {
        id,
        error: e,
      },
    };
  }
};

export default GameLogPage;
