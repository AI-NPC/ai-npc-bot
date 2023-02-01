export function formatArray(arr: string[]): string {
  if (arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return arr.join(" and ");
  return arr.slice(0, -1).join(", ") + ", and " + arr.slice(-1);
}

// transform the following string into an object:
// <npc_first_sentence> Greetings, traveler! How may I help you?
// A: I need assistance completing a quest.
// B: I am in need of magical assistance.
// C: I am looking to purchase magical items.

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
