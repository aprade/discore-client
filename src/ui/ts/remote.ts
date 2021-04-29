export const backendAddressAPI = "localhost:3000"

interface Init {
    method?: string,
    body?: string,
}

const request = (endpoint: string, init?: Init): Request => {
    return new Request(`http://${backendAddressAPI}/${endpoint}`, {
        headers: {
            "Content-Type":  "application/json",
        },
        ...init,
    });
};

const http = async <T>(req: any): Promise<T> => {
    const res = await fetch(req);
    const body = await res.json();

    if (!res.ok) {
        throw new Error();
    }

    return body;
}

const post = async <I, D>(
    endpoint: string,
    body: I
): Promise<D> =>
    http<D>(
        request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        })
    );

export default {
    post,
}