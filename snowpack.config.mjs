const snowpackConfig = {
  alias: {
    components: './src/components',
    context: './src/context',
    react: 'preact/compat',
    'react-dom': 'preact/compat',
    style: './src/style',
    utils: './src/utils',
  },
  mount: {
    public: {
      static: true,
      url: '/',
    },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-sass',
      {
        compilerOptions: {
          loadPath: './src',
        },
      },
    ],
    '@snowpack/plugin-typescript'
  ],
  routes: [
    {
      dest: '/index.html',
      match: 'routes',
      src: '.*',
    },
  ],
  workspaceRoot: '/'
};

export default snowpackConfig;