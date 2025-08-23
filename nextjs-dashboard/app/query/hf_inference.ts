"use server";

interface HuggingFaceInferenceRequest {
    messages: [any],
    model: string;
}
export async function hfInference(data: HuggingFaceInferenceRequest) {
	const response = await fetch(
		"https://router.huggingface.co/v1/chat/completions",
		{
			headers: {
				Authorization: `Bearer ${process.env.HF_TOKEN}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

// query({ 
//     messages: [
//         {
//             role: "user",
//             content: "What is the capital of France?",
//         },
//     ],
//     model: "openai/gpt-oss-120b:groq",
// }).then((response) => {
//     console.log(JSON.stringify(response));
// });