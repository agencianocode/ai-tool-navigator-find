
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/dom';
import { render as customRender } from '../../../test/utils/test-utils';
import QuickActions from '../QuickActions';

describe('QuickActions', () => {
  it('renders all quick action buttons', () => {
    customRender(<QuickActions />);
    
    expect(screen.getByText('Nueva Evaluación')).toBeInTheDocument();
    expect(screen.getByText('Explorar Herramientas')).toBeInTheDocument();
    expect(screen.getByText('Mis Favoritos')).toBeInTheDocument();
    expect(screen.getByText('Guías y Tutoriales')).toBeInTheDocument();
    expect(screen.getByText('Configuración')).toBeInTheDocument();
  });

  it('has correct navigation links', () => {
    customRender(<QuickActions />);
    
    const newEvaluationLink = screen.getByText('Nueva Evaluación').closest('a');
    expect(newEvaluationLink).toHaveAttribute('href', '/questionnaire');
    
    const toolsLink = screen.getByText('Explorar Herramientas').closest('a');
    expect(toolsLink).toHaveAttribute('href', '/tools');
  });
});
