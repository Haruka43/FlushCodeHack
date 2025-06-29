import { ArrowReturnLeft } from '@chakra-icons/bootstrap';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import type { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';

import { findRound } from '@/clients/game';
import GameStepper from '@/components/molecules/game-stepper';
import ErrorMessageArea from '@/components/organisms/error-message-area';
import LogActivity from '@/components/organisms/log-activity';
import LogPlayerArea from '@/components/organisms/log-player-area';
import RoundInformation from '@/components/organisms/round-information';
import ROUTE from '@/constants/route';
import type { Log } from '@/schema/log';
import type { CustomeErrorResponse } from '@/schema/response';
import { buttonHover, gameDeskHeight } from '@/styles';
import { GameTemplate } from '@/templates';
import { generateScreenURL } from '@/utils';
import { isEmphasizeGamePlayer } from '@/utils/style';

interface GameDetailPageProps {
  id: string;
  data?: {
    round: number;
    logs: Log[];
  };
  error?: CustomeErrorResponse;
}

const GameLogPage = (props: GameDetailPageProps) => {
  const [step, setStep] = useState<number>(1);

  const startLog = useMemo(
    () => props.data?.logs.find((item) => item.phase === 'start'),
    [props.data?.logs]
  );
  const order = useMemo(() => {
    return startLog?.content.type === 'start' ? startLog.content.order : [];
  }, [startLog]);

  const view = props.data?.logs?.[step - 1];

  const firstPlayer = useMemo(() => {
    if (!order[0]) return null;
    return view?.game.players[order[0]];
  }, [view, order[0]]);

  const secondPlayer = useMemo(() => {
    if (!order[1]) return null;
    return view?.game.players[order[1]];
  }, [view, order[1]]);

  const thirdPlayer = useMemo(() => {
    if (!order[2]) return null;
    return view?.game.players[order[2]];
  }, [view, order[2]]);

  const fourthPlayer = useMemo(() => {
    if (!order[3]) return null;
    return view?.game.players[order[3]];
  }, [view, order[3]]);

  return (
    <GameTemplate
      title={`ゲームログ - GameId: ${props.id} - Round: ${props.data?.round}`}
    >
      {props.error && <ErrorMessageArea errors={props.error.errors} />}
      <Flex
        position="relative"
        direction="column"
        align="center"
        gap={20}
        minH={gameDeskHeight}
      >
        <Box w="full">
          {/** ラウンド情報: top-left */}
          {view && (
            <RoundInformation
              id={props.id}
              round={props.data?.round ?? 0}
              phase={view.phase}
              pot={view.pot ?? 0}
              minBetPoint={view.minBetPoint ?? 0}
            />
          )}

          {/** アクティビティ情報: top-right */}
          {view && <LogActivity log={view} />}

          {view && (
            <Box w="full">
              {/** プレイヤー1: top-center */}
              {firstPlayer && (
                <LogPlayerArea
                  player={firstPlayer}
                  log={view}
                  position="absolute"
                  top={0}
                  left="50%"
                  transform={[
                    `
                      translateX(-50%)
                      scale(${
                        isEmphasizeGamePlayer(firstPlayer.name, view)
                          ? '1.1, 1.1'
                          : '1, 1'
                      })`,
                    `
                      translateX(-50%)
                      scale(${
                        isEmphasizeGamePlayer(firstPlayer.name, view)
                          ? '1.1, 1.1'
                          : '1, 1'
                      })`,
                    `
                      translateX(-50%)
                      scale(${
                        isEmphasizeGamePlayer(firstPlayer.name, view)
                          ? '1.2, 1.2'
                          : '1, 1'
                      })`,
                    `
                      translateX(-50%)
                      scale(${
                        isEmphasizeGamePlayer(firstPlayer.name, view)
                          ? '1.2, 1.2'
                          : '1, 1'
                      })`,
                    `
                      translateX(-50%)
                      scale(${
                        isEmphasizeGamePlayer(firstPlayer.name, view)
                          ? '1.3, 1.3'
                          : '1, 1'
                      })`,
                  ]}
                />
              )}

              {/** プレイヤー2: right-middle */}
              {secondPlayer && (
                <LogPlayerArea
                  player={secondPlayer}
                  log={view}
                  position="absolute"
                  right={0}
                  top="50%"
                  transform={[
                    `
                      translateY(-50%)
                      scale(${
                        isEmphasizeGamePlayer(secondPlayer.name, view)
                          ? '1.1, 1.1'
                          : '1, 1'
                      })`,
                    `
                      translateY(-50%)
                      scale(${
                        isEmphasizeGamePlayer(secondPlayer.name, view)
                          ? '1.1, 1.1'
                          : '1, 1'
                      })`,
                    `
                      translateY(-50%)
                      scale(${
                        isEmphasizeGamePlayer(secondPlayer.name, view)
                          ? '1.2, 1.2'
                          : '1, 1'
                      })`,
                    `
                      translateY(-50%)
                      scale(${
                        isEmphasizeGamePlayer(secondPlayer.name, view)
                          ? '1.2, 1.2'
                          : '1, 1'
                      })`,
                    `
                      translateY(-50%)
                      scale(${
                        isEmphasizeGamePlayer(secondPlayer.name, view)
                          ? '1.3, 1.3'
                          : '1, 1'
                      })`,
                  ]}
                />
              )}

              {/** プレイヤー3: bottom-center */}
              {thirdPlayer && (
                <LogPlayerArea
                  player={thirdPlayer}
                  log={view}
                  position="absolute"
                  bottom={0}
                  left="50%"
                  transform={[
                    `
                      translateX(-50%)
                      scale(${
                        isEmphasizeGamePlayer(thirdPlayer.name, view)
                          ? '1.1, 1.1'
                          : '1, 1'
                      })`,
                    `
                      translateX(-50%)
                      scale(${
                        isEmphasizeGamePlayer(thirdPlayer.name, view)
                          ? '1.1, 1.1'
                          : '1, 1'
                      })`,
                    `
                      translateX(-50%)
                      scale(${
                        isEmphasizeGamePlayer(thirdPlayer.name, view)
                          ? '1.2, 1.2'
                          : '1, 1'
                      })`,
                    `
                      translateX(-50%)
                      scale(${
                        isEmphasizeGamePlayer(thirdPlayer.name, view)
                          ? '1.2, 1.2'
                          : '1, 1'
                      })`,
                    `
                      translateX(-50%)
                      scale(${
                        isEmphasizeGamePlayer(thirdPlayer.name, view)
                          ? '1.3, 1.3'
                          : '1, 1'
                      })`,
                  ]}
                />
              )}

              {/** プレイヤー4: left-middle */}
              {fourthPlayer && (
                <LogPlayerArea
                  player={fourthPlayer}
                  log={view}
                  position="absolute"
                  left={0}
                  top="50%"
                  transform={[
                    `
                      translateY(-50%)
                      scale(${
                        isEmphasizeGamePlayer(fourthPlayer.name, view)
                          ? '1.1, 1.1'
                          : '1, 1'
                      })`,
                    `
                      translateY(-50%)
                      scale(${
                        isEmphasizeGamePlayer(fourthPlayer.name, view)
                          ? '1.1, 1.1'
                          : '1, 1'
                      })`,
                    `
                      translateY(-50%)
                      scale(${
                        isEmphasizeGamePlayer(fourthPlayer.name, view)
                          ? '1.2, 1.2'
                          : '1, 1'
                      })`,
                    `
                      translateY(-50%)
                      scale(${
                        isEmphasizeGamePlayer(fourthPlayer.name, view)
                          ? '1.2, 1.2'
                          : '1, 1'
                      })`,
                    `
                      translateY(-50%)
                      scale(${
                        isEmphasizeGamePlayer(fourthPlayer.name, view)
                          ? '1.3, 1.3'
                          : '1, 1'
                      })`,
                  ]}
                />
              )}
            </Box>
          )}

          {/** 戻る: bottom-left */}
          <Box position="absolute" bottom={0}>
            <Button
              colorScheme="green"
              leftIcon={<ArrowReturnLeft />}
              as={Link}
              href={generateScreenURL(ROUTE.S_B01_002, { id: props.id })}
              bgColor="brand100.100"
              _hover={buttonHover}
            >
              Back
            </Button>
          </Box>

          {/** ページャー: bottom-right */}
          <GameStepper
            current={step}
            max={props.data?.logs.length ?? 0}
            onChangeStep={setStep}
            position="absolute"
            bottom={0}
            right={0}
          />
        </Box>
      </Flex>
    </GameTemplate>
  );
};

export const getServerSideProps: GetServerSideProps<
  GameDetailPageProps
> = async (ctx: any) => {
  const { id, round } = ctx.query;
  try {
    const data = await findRound(id, Number(round));
    return {
      props: {
        id,
        data,
      },
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
