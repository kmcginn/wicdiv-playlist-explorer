module.exports = {
    images: {
      domains: ['i.scdn.co'],
    },
    trailingSlash: true,
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    },
  }