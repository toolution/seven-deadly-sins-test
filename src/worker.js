export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.7deadlysinstestfree.com') {
      url.hostname = '7deadlysinstestfree.com';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
