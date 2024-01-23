//PM2 config file
module.exports = {
  apps : [{
    name: 'fix-my-budget',
    script: 'index.ts',
    interpreter: '/usr/bin/ts-node',
    interpreterArgs: '-P tsconfig.json',
    env: {
      TS_NODE_PROJECT: './tsconfig.json',
    }
  }],
};
