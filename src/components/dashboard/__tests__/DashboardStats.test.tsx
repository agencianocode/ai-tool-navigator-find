
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/dom';
import { render as customRender } from '../../../test/utils/test-utils';
import DashboardStats from '../DashboardStats';

describe('DashboardStats', () => {
  const mockStats = {
    total_roadmaps: 5,
    completed_roadmaps: 3,
    total_tools_explored: 15,
    last_activity: '2024-01-15'
  };

  it('renders dashboard stats correctly', () => {
    customRender(<DashboardStats stats={mockStats} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Total generadas')).toBeInTheDocument();
  });

  it('handles null stats gracefully', () => {
    customRender(<DashboardStats stats={null} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('Nunca')).toBeInTheDocument();
  });

  it('calculates completion rate correctly', () => {
    customRender(<DashboardStats stats={mockStats} />);
    
    expect(screen.getByText('60% de tasa de éxito')).toBeInTheDocument();
  });
});
