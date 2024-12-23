export const POST = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: "POST",
            ...params,
        });
        return response.json();
    } catch (error) {
        throw error;
    }
};

// GET
export const GET = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: "GET",
            ...params,
        });
        return response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// PUT
export const PUT = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: "PUT",
            ...params,
        });
        return response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// DELETE

export const DELETE = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: "DELETE",
            ...params,
        });
        return response.json();
    } catch (error) {
        throw error;
    }
};
