import { teamMembers } from './teamMembers';

const SOURCE_TEAM_ASSETS = 'https://raw.githubusercontent.com/mishraji0519/wikiclubtech-nitin/main/WikiClub-Tech-UU-main/WikiClub-Tech-UU-main/public/team/';

const sourceImage = (image: string) => {
  const filename = image.split('/').pop();
  return filename ? `${SOURCE_TEAM_ASSETS}${encodeURIComponent(filename)}` : image;
};

export const previousTeamMembers = teamMembers.map((member) => ({
  ...member,
  image: sourceImage(member.image),
}));
