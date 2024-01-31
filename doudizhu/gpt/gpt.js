const axios = require('axios');

class ChatGpt {
    constructor() {
        this.url = 'https://api.binjie.fun/api/generateStream';
        this.headers = {
            'Origin': 'https://chat6.aichatos.com',
            'Referer': 'https://chat6.aichatos.com/'
        };
    }

    async post(prompt, userId) {
        try {
            const requestBody = {
                prompt: prompt,
                userId: userId,
                network: false,
                system: "",
                withoutContext: false,
                stream: false
            };

            const response = await axios.post(this.url, requestBody, {
                headers: this.headers,
            });

            return response.data;
        } catch (error) {
            console.error(`HTTP POST request to ${this.url} failed: ${error}`);
            throw error;
        }
    }
}

module.exports = {ChatGpt};