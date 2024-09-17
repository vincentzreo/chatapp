const URL_BASE = 'http://localhost:6688/api';
const SSE_URL = 'http://localhost:6687/events';

const getUrlBase = () => {
    return URL_BASE;
}

const initSSE = (store) => {
    let url = `${SSE_URL}?token=${store.state.token}`;
    const sse = new EventSource(url);

    sse.addEventListener("NewMessage", (event) => {
        let data = JSON.parse(event.data);
        console.log('NewMessage:', event.data);
        delete data.event;
        store.commit('addMessage', { channelId: data.chatId, message: data });
    });

    sse.onmessage = (event) => {
        /* const data = JSON.parse(event.data);
        commit('addMessage', data); */
        console.log('SSE message:', event);
    }

    sse.onerror = (error) => {
        console.error('EventSource failed:', error);
        sse.close();
    }

    return sse;
}

export { getUrlBase, initSSE };