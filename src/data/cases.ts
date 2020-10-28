import food from "./food";
import general from "./general";
import babyfoot from "./babyfoot";
import accounting from "./accounting";
import baby from "./baby";
import beer from "./beer";
import conference from "./conference";
import covid from "./covid";
import duo from "./duo";
import hobbies from "./hobbies";
import music from "./music";
import old from "./old";
import tag from "./tag";
import travel from "./travel";
import vote from "./vote";
import { CaseType } from '../Game';
import { cyan, teal, purple, lightGreen, indigo } from "@material-ui/core/colors";

interface CasesType {
  food: CaseType[],
  general: CaseType[],
  accounting: CaseType[],
  baby: CaseType[],
  babyfoot: CaseType[],
  beer: CaseType[],
  conference: CaseType[],
  covid: CaseType[],
  duo: CaseType[],
  hobbies: CaseType[],
  music: CaseType[],
  old: CaseType[],
  tag: CaseType[],
  travel: CaseType[],
  vote: CaseType[]
};

export const colors = {
  food: "#439abf",
  general: "#9d2493",
  accounting: "#439abf",
  baby: "#439abf",
  babyfoot: "#a0ce5b",
  beer: "#439abf",
  conference: "#35818b",
  covid: "#304e78",
  duo: "#439abf",
  hobbies: "#35818b",
  music: "#304e78",
  old: "#304e78",
  tag: "#35818b",
  travel: "#439abf",
  vote: "#439abf",
};

export const colors2 = {
  food: cyan,
  general: purple,
  accounting: cyan,
  baby: cyan,
  babyfoot: lightGreen,
  beer: cyan,
  conference: teal,
  covid: indigo,
  duo: cyan,
  hobbies: teal,
  music: indigo,
  old: indigo,
  tag: teal,
  travel: cyan,
  vote: cyan,
};

export default {
  food,
  general,
  accounting,
  baby,
  babyfoot,
  beer,
  conference,
  covid,
  duo,
  hobbies,
  music,
  old,
  tag,
  travel,
  vote
}
