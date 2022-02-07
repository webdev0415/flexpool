import React from 'react';
import { NextSeo } from 'next-seo';

import { useTranslation, Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';

import { Content } from '../src/components/layout/Content';
import { Divider } from '../src/components/layout/Divider';
import { HeroBlue } from '../src/components/layout/Hero/HeroBlue';
import { Page } from '../src/components/layout/Page';
import { FaDiscord, FaTelegram } from 'react-icons/fa';
import { DISCORD_LINK, TELEGRAM_LINK } from '../src/constants';

const SupportChannelWrapper = styled.a`
  border: 1px solid var(--border-color);
  padding: 1rem 1.5rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  border-radius: 5px;
  svg {
    height: 30px;
    width: 30px;
    margin-right: 0.5rem;
  }
  & + & {
    margin-left: 1rem;
  }
`;

const SupportChannel: React.FC<{
  name: string;
  icon: React.ReactNode;
  href: string;
}> = ({ name, icon, href }) => {
  return (
    <SupportChannelWrapper
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {icon}
      <div className="name">{name}</div>
    </SupportChannelWrapper>
  );
};

export const SupportPage = () => {
  const { t, i18n } = useTranslation('support');
  const { t: seoT } = useTranslation('seo');

  return (
    <Page>
      <NextSeo
        title={seoT('title.support')}
        description={seoT('website_description.support')}
        openGraph={{
          title: seoT('title.support'),
          description: seoT('website_description.support'),
          locale: i18n.language,
        }}
        additionalMetaTags={[
          {
            property: 'keywords',
            content: seoT('keywords.support'),
          },
        ]}
      />

      <HeroBlue>
        <Content md>
          <h1>{t('title')}</h1>
        </Content>
      </HeroBlue>
      <Content md paddingLg>
        <h2>{t('section_one.title')}</h2>
        <p>{t('section_one.description')}</p>
        <Divider margin />
        <h2>{t('section_two.title')}</h2>
        <p>{t('section_two.description')}</p>
        <Divider margin />
        <h2>{t('section_three.title')}</h2>
        <p>{t('section_three.description')}</p>
        <div className="support-channels">
          <SupportChannel
            name={'Discord'}
            icon={<FaDiscord />}
            href={DISCORD_LINK}
          />
          <SupportChannel
            name={'Telegram'}
            icon={<FaTelegram />}
            href={TELEGRAM_LINK}
          />
        </div>
        <Divider margin />
        <h2>{t('section_four.title')}</h2>
        <p>
          <Trans
            ns={'support'}
            i18nKey="section_four.description" // optional -> fallbacks to defaults if not provided
            values={{ email: 'support@flexpool.io' }}
            components={{
              // eslint-disable-next-line
              email: <a href="mailto:support@flexpool.io" />,
            }}
          />
        </p>
        <Divider margin />
        <h2>{t('section_five.title')}</h2>
        <p>
          <Trans
            ns={'support'}
            i18nKey="section_five.description" // optional -> fallbacks to defaults if not provided
            values={{ email: 'hq@flexpool.io' }}
            components={{
              // eslint-disable-next-line
              email: <a href="mailto:hq@flexpool.io" />,
            }}
          />
        </p>
      </Content>
    </Page>
  );
};

export default SupportPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'support',
        'cookie-consent',
        'seo',
      ])),
    },
  };
}
