import Players from '@/services/players';

const PlayerTestGameData = {
  currentRound: 1,
  phase: 'start',
  order: ['Player1', 'Player2', 'Player3', 'team2'],
  pot: 0,
  minBetPoint: 0,
  players: {
    Player1: {
      name: 'Player1',
      status: 'active',
      point: 37600,
      round: {
        betPoint: 0,
        first: 0,
        second: 0,
        action: 'bet',
        cards: []
      }
    },
    Player2: {
      name: 'Player2',
      status: 'active',
      point: 17600,
      round: {
        betPoint: 0,
        first: 0,
        second: 0,
        action: 'bet',
        cards: []
      }
    },
    Player3: {
      name: 'Player3',
      status: 'active',
      point: 24800,
      round: {
        betPoint: 0,
        first: 0,
        second: 0,
        action: 'bet',
        cards: []
      }
    },
    team2: {
      name: 'team2',
      status: 'active',
      point: 20000,
      round: { betPoint: 0, first: 0, second: 0, action: null, cards: [] }
    }
  },
  totalRound: 100,
  initialPoint: 20000,
  fee: 200
};

const cards = [
  {
    suit: 'Clubs',
    number: 1
  },
  {
    suit: 'Diamonds',
    number: 7
  },
  {
    suit: 'Spades',
    number: 6
  },
  {
    suit: 'Spades',
    number: 9
  },
  {
    suit: 'Clubs',
    number: 8
  }
];

describe('/demo-player-js service', () => {
  const player = new Players.team2('1', 'team2');

  test('start function', () => {
    player.start(PlayerTestGameData);
    const result = player.test();

    expect(result.id).toBe('1');
    expect(result.name).toBe('team2');
    expect(result.round).toBe(1);
    expect(result.betUnit).toBeGreaterThanOrEqual(0);
    expect(result.win).toBe(0);
  });

  describe('bet function', () => {
    test('bet-1 phase', () => {
      const result = player.bet({
        ...PlayerTestGameData,
        phase: 'bet-1',
        players: {
          ...PlayerTestGameData.players,
          team2: {
            ...PlayerTestGameData.players.team2,
            round: {
              ...PlayerTestGameData.players.team2?.round,
              cards
            }
          }
        }
      });

      expect(typeof result).toBe('number');
    });

    test('bet-2 phase', () => {
      const result = player.bet({
        ...PlayerTestGameData,
        phase: 'bet-2',
        players: {
          ...PlayerTestGameData.players,
          team2: {
            ...PlayerTestGameData.players.team2,
            round: {
              ...PlayerTestGameData.players.team2?.round,
              cards
            }
          }
        }
      });

      expect(typeof result).toBe('number');
    });
  });

  describe('draw function', () => {
    test('draw-1 phase', () => {
      const result = player.draw({
        ...PlayerTestGameData,
        phase: 'draw-1',
        players: {
          ...PlayerTestGameData.players,
          team2: {
            ...PlayerTestGameData.players.team2,
            round: {
              ...PlayerTestGameData.players.team2?.round,
              cards
            }
          }
        }
      });

      expect(result).toHaveLength(5);
      expect(typeof result[0]).toBe('boolean');
      expect(typeof result[1]).toBe('boolean');
      expect(typeof result[2]).toBe('boolean');
      expect(typeof result[3]).toBe('boolean');
      expect(typeof result[4]).toBe('boolean');
    });

    test('draw-2 phase', () => {
      const result = player.draw({
        ...PlayerTestGameData,
        phase: 'draw-2',
        players: {
          ...PlayerTestGameData.players,
          team2: {
            ...PlayerTestGameData.players.team2,
            round: {
              ...PlayerTestGameData.players.team2?.round,
              cards
            }
          }
        }
      });

      expect(result).toHaveLength(5);
      expect(typeof result[0]).toBe('boolean');
      expect(typeof result[1]).toBe('boolean');
      expect(typeof result[2]).toBe('boolean');
      expect(typeof result[3]).toBe('boolean');
      expect(typeof result[4]).toBe('boolean');
    });
  });

  test('end function', () => {
    player.end({
      ...PlayerTestGameData,
      phase: 'finished',
      players: {
        ...PlayerTestGameData.players,
        team2: {
          ...PlayerTestGameData.players.team2,
          round: {
            ...PlayerTestGameData.players.team2?.round,
            cards
          }
        }
      },
      winner: 'team2'
    });
    const result = player.test();
    expect(result.win).toBe(1);
  });
});
