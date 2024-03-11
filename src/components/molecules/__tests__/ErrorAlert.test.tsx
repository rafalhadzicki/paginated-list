import ErrorAlert from '@/components/molecules/ErrorAlert';
import { fireEvent, render } from '@testing-library/react';

describe('ErrorAlert', () => {
  it('renders correctly when isError is true', () => {
    const { getByText } = render(<ErrorAlert isError={true} />);
    expect(getByText('error')).toBeInTheDocument();
  });

  it('does not render when isError is false', () => {
    const { queryByText } = render(<ErrorAlert isError={false} />);
    expect(queryByText('error')).toBeNull();
  });

  it('displays retry button when onRetry is provided', () => {
    const { getByText } = render(
      <ErrorAlert isError={true} onRetry={() => {}} />
    );
    expect(getByText('retry')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = jest.fn();
    const { getByText } = render(
      <ErrorAlert isError={true} onRetry={onRetry} />
    );

    fireEvent.click(getByText('retry'));

    expect(onRetry).toHaveBeenCalled();
  });
});
