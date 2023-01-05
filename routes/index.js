const KoaRouter = require('koa-router');
const getMembers = require('../data/members')


const indexRouter = new KoaRouter();

indexRouter.get('/', async function(ctx) {
    const search = ctx.request.query.search || ''
    const members = await getMembers(search)
	  await ctx.render("members", {members, logo: "images/logo.png"})
});


module.exports = indexRouter;