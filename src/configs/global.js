
const versionConfig = {
  
  // DEV/PRIVATE TESTNET
  private_url       : "https://5d39fd88fa091c001447075b.mockapi.io/api/v1/",
  assets_url        : "https://cdn/something/",
  public_url        : "??",
  asset_precision   : 2,
  chain_id          : "",
  admin_pub_key     : "",
  language          : "english"
};

const language = versionConfig.language;

const currency = {
  name: "INKIRI",
  symbol: "IK$",
  fiat: {
    symbol: "BRL$",
    plural: "Reais"
  },
  asset_precision: versionConfig.asset_precision
};

const api = {
  base: versionConfig.base_url,
  baseFiles: versionConfig.assets_url + "files/",
  baseImages: versionConfig.assets_url + "static/uploads/",

  interval_update_tx_ms: 30000,
  timeout_force_update_tx_ms: 15000,
  interval_status_check_ms: 60000,
  chain_id: versionConfig.chain_id,
  
  version: "v1",
  urls: [
    { action: "URL/DFUSE_CONFIG", path: "dfuse/" },
    //http://5d39fd88fa091c001447075b.mockapi.io/api/v1/dfuse
  ]
};

// ToDo: Traer DFuse config from private server!
const dfuse = {
  apiKey    : 'web_8a50f2bc42c1df1a41830c359ba74240',
  network   : 'jungle'
}

export { language, api, currency, dfuse };
