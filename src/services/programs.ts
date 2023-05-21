import { Program } from "../interfaces";

export async function getPrograms(
  shortTitle: string[] = [],
  status: string[] = []
): Promise<Program[]> {
  const searchParams = new URLSearchParams({
    short_title: shortTitle.filter((title) => !!title).join(","),
    status: status.filter((stt) => !!stt).join(","),
  });
  const baseUrl = window.location.origin;
	try {
		const res = await fetch(`${baseUrl}/api/programs?${searchParams.toString()}`);
		const programList = await res.json();
		return programList;
	} catch (error: any) {
		throw new Error(error);
	}
  
}
