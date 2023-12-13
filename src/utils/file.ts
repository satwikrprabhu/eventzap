import { env } from "~/env.js";

type CloudinaryResponse = {
	signature: string;
	timestamp: string;
};

export async function uploadFile(file: File) {
	const res = await fetch("/api/cloudinary/sign", {
		method: "GET",
	});
	const { signature, timestamp } = (await res.json()) as CloudinaryResponse;
	const formData = new FormData();
	console.log(file);
	formData.append("file", file);
	formData.append("api_key", env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
	formData.append("signature", signature);
	formData.append("timestamp", timestamp);
	formData.append("folder", "next");
	console.log(signature, timestamp);
	console.log(formData);
	const endpoint = `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`;

	const data = (await fetch(endpoint, {
		method: "POST",
		body: formData,
	}).then((res) => res.json())) as {
		url: string;
	};
	return data.url;
}