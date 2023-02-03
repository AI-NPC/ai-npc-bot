import { GameContext } from "@ai-npc/npc3";
export function formatArray(arr: string[]): string {
  if (arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return arr.join(" and ");
  return arr.slice(0, -1).join(", ") + ", and " + arr.slice(-1);
}

export const extractNPCAnswer = (
  answer: string
): { npc: string; choices: string[] } => {
  console.log(JSON.stringify(answer));
  const lines = answer?.split("\n");
  console.log(lines);
  function split(str: string) {
    return str?.split(")")[1].replace(/"/g, "");
  }

  let obj: any = {
    npc: split(lines[1]),
    choices: [split(lines[2]), split(lines[3]), split(lines[4])],
  };

  return obj;
};

export const displayContext = (gameContext: GameContext) =>
  `${`The game is set in a ${gameContext.setting} world. The tone is ${
    gameContext.tone
  }. The objectives include ${gameContext.objectives.join(
    ", "
  )}. The setting takes inspiration from ${gameContext.details.join(
    ", "
  )}.`}\n\n`;

export const parseContext = (contextString: string): GameContext => {
  const [settingsLine, toneLine, objectivesLine, inspirationLine] =
    contextString.split(".");
  console.log(settingsLine, toneLine, objectivesLine, inspirationLine);

  const setting = settingsLine.split(" ").slice(6, 7).join(" ");
  const tone = toneLine.split(" ").slice(4, 5).join(" ");
  const objectives = objectivesLine.split(" ").slice(4).join(" ").split(", ");
  const details = inspirationLine.split(" ").slice(6).join(" ").split(", ");

  return {
    setting,
    tone,
    objectives,
    details,
  };
};
