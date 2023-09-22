
import { IEnv } from "../interfaces/IEnv";

export const consumer = async (batch: MessageBatch<Error>, env: IEnv): Promise<void> => {

    for (let message of batch.messages) {
        console.log(`message ${message.id} processed: ${JSON.stringify(message.body)}`);

        const response = await fetch('https://cloudflare-fullstack.pages.dev/api/d1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message.body),
        });

        JSON.stringify(await response.json());
        await message.ack();

    }

}

