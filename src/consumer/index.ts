
import { IEnv } from "../lib/interfaces/IEnv";

export const consumer = async (batch: MessageBatch<{ name: string, age: number }>, env: IEnv): Promise<void> => {

    for (let message of batch.messages) {
        console.log(`message ${message.id} processed: ${JSON.stringify(message.body)}`);

        const response = await fetch('https://cloudflare-fullstack.pages.dev/api/d1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message.body),
        });

        const data: any = JSON.stringify(await response.json());

        if (data.payload) {
            await message.ack();

        } else {

        }

    }

}

