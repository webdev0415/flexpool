import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import HandleLegacyLangVariable from './helpers/LanguageSelectionHelper';

export const StatsOldUrlSupportPage: React.FC<
  RouteComponentProps<{ lang: string }>
> = ({
  match: {
    params: { lang },
  },
}) => {
  HandleLegacyLangVariable(lang);
  return <Redirect to={`/statistics`} />;
};

export default StatsOldUrlSupportPage;
