import { IEnv } from "../lib/interfaces/IEnv";

export const producer = async (req: Request, env: IEnv, ctx: ExecutionContext, queryParams: any): Promise<Response> => {


    if (req.method == 'GET') {
        const { searchParams } = new URL(req.url)
        const name = searchParams.get('name');
        const age = searchParams.get('age');
        if (name && age) {
            await env.MY_QUEUE.send({
                name,
                age
            });
            return new Response('Sent message to the queue from get');

        }
        return new Response('send both name and age data');

    } else if (req.method == 'POST') {
        const { name, age } = await req.json() as any;
        if (name && age) {
            await env.MY_QUEUE.send({
                name,
                age
            });
            return new Response('Sent message to the queue from post');

        }
        return new Response('send both name and age data');


    }

    return new Response('message cant send to the queue');

};
