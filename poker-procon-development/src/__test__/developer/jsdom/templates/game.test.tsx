import { render } from '@testing-library/react';

import { GameTemplate } from '@/templates';

describe('GameTemplate', () => {
  test('スナップショット/default', () => {
    const { asFragment } = render(<GameTemplate />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/loading', () => {
    const { asFragment } = render(
      <GameTemplate title="ゲームログ" isLoading />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
