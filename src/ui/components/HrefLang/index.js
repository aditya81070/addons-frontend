/* @flow */
import config from 'config';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { hrefLangs } from 'core/languages';
import type { AppState } from 'amo/store';

type Props = {|
  path: string,
|};

type InternalProps = {|
  ...Props,
  _config: typeof config,
  _hrefLangs: typeof hrefLangs,
  clientApp: string,
  lang: string,
|};

export class HrefLangBase extends React.PureComponent<InternalProps> {
  render() {
    const { _config, _hrefLangs, clientApp, path, lang } = this.props;

    if (_config.get('unsupportedHrefLangs').includes(lang)) {
      return null;
    }

    const hrefLangsMap = _config.get('hrefLangsMap');

    return _hrefLangs.map((hrefLang) => {
      const locale = hrefLangsMap[hrefLang] || hrefLang;

      return (
        <link
          href={`/${lang}/${clientApp}${path}`}
          hrefLang={hrefLang}
          key={hrefLang}
          rel="alternate"
        />
      );
    });
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    clientApp: state.api.clientApp,
    lang: state.api.lang,
  };
};

const HrefLang: React.ComponentType<Props> = compose(connect(mapStateToProps))(
  HrefLangBase,
);

export default HrefLang;
