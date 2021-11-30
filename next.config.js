module.exports = {
  async redirects() {
    return [
      {
        source: '/poll',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
}