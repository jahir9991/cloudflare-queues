import { IEnv } from "../interfaces/IEnv";

export const producer = async (req: Request, env: IEnv, ctx: ExecutionContext): Promise<Response> => {
    await env.MY_QUEUE.send({
        url: req.url,
        method: req.method,
        headers: Object.fromEntries(req.headers),
    });
    return new Response('Sent message to the queue');
};
