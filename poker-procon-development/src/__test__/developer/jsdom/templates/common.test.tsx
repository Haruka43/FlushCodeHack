import { render } from '@testing-library/react';

import { CommonTemplate } from '@/templates';

describe('CommonTemplate', () => {
  test('スナップショット/default', () => {
    const { asFragment } = render(<CommonTemplate />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/loading', () => {
    const { asFragment } = render(
      <CommonTemplate title="ゲーム一覧" isLoading />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
