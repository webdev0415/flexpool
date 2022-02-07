// import { useLocation } from 'react-router';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import qs from 'query-string';

import { Highlight } from 'src/components/Typo/Typo';
import { Spacer } from 'src/components/layout/Spacer';
import { Button } from 'src/components/Button';
import { LinkOut } from 'src/components/LinkOut';
import { useTranslation } from 'next-i18next';

export const ViewDashboardSection: React.FC<{ ticker?: string }> = ({
  ticker,
}) => {
  const router = useRouter();
  let search;
  const { t } = useTranslation('get-started');
  const [urlState, setUrlState] = useState(new Date());

  const walletAddress = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      search = window.location.search;
    }
    const parsedSearch = qs.parse(search);
    return parsedSearch.walletAddress || '';
  }, [urlState]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', function (event) {
        setUrlState(new Date());
      });
    }
  }, []);

  if (!walletAddress || !ticker) {
    return null;
  }
  return (
    <>
      <h2>
        <Highlight>#5</Highlight> {t('detail.view.title')}
      </h2>
      <p>{t('detail.view.description')}</p>
      <Spacer />
      <p>
        <Button
          variant="primary"
          as={LinkOut}
          href={`/miner/${ticker}/${walletAddress}`}
        >
          {t('detail.view.cta')}
        </Button>
      </p>
    </>
  );
};
