
type ImagePayload = {
    data: string; // base64
    mimeType: string;
};

type GenerateOptions = {
    mode: 'text' | 'image';
    poseImage: ImagePayload | null;
    userPrompt: string;
}

export const generatePose = async (
    baseImage: ImagePayload,
    options: GenerateOptions
): Promise<string> => {
    
    // The API endpoint of our secure backend function
    const API_ENDPOINT = '/api/generatePose';

    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            baseImage,
            options
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "An unknown error occurred." }));
        // Try to extract a meaningful error message from the backend response
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const result = await response.json();

    if (result.error) {
        throw new Error(result.error);
    }

    if (!result.imageData) {
        throw new Error("No image data received from the server.");
    }
    
    return result.imageData;
};
