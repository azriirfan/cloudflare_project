/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname === "/api/hello") {
			return Response.json(
				{ ok: true, msg: "Hello API" },
				{ headers: { "Access-Control-Allow-Origin": "*" } }
			);
		}
		if (url.pathname === "/api/notes") {
			const { results } = await env.DB.prepare("SELECT * FROM notes").all();
			return Response.json(results);
		}
		if (url.pathname === "/api/config") {
			return Response.json({
				greeting: env.GREETING,

			});
		}
		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;

