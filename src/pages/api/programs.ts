import type { NextApiHandler } from "next";
import { Program } from "../../interfaces";

const getPrograms: NextApiHandler = async (request, response) => {
  try {
    const sessionResponse = await fetch(
      `https://api.entrylevel.net/test/sessions`,
      {
        method: "GET",
      }
    );
    const sessions = await sessionResponse.json();

    const sortedSessions = sessions.sort(
      (program1: any, program2: any) =>
        new Date(program2).getTime() - new Date(program1).getTime()
    );

    const programs: Program[] = [];
    let programCount = 0;
		const shortTitleFilter = request.query.short_title ? (request.query.short_title as string).split(',') : [];
		const statusFilter = request.query.status ? (request.query.status as string).split(',') : [];
    for (let session of sortedSessions) {
      if (programCount >= 50) {
        break;
      }
			if (statusFilter.length && !statusFilter.includes(session.status)) {
				continue;
			}

      for (let program of session.program) {
        if (programCount >= 50) {
          break;
        }

				if (shortTitleFilter.length && !shortTitleFilter.includes(program.shortTitle)) {
					continue;
				}
        const { start_date, end_date } = session;
        const { display_title, thumbnail_img_url } = program;
        programs.push({
          startDate: start_date,
          endDate: end_date,
          title: display_title,
          imageUrl: thumbnail_img_url,
        });
        programCount++;
      }
    }

    response.json(programs);
  } catch (error) {
		console.log(error);
		response.status(500).json({});
	}
};

export default getPrograms;
