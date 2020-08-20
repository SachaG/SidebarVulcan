import Newsletters from "../../modules/newsletters/collection";
import { getSubject } from "./helpers";

Newsletters.addField([
  {
    fieldName: "subject",
    fieldSchema: {
      type: String,
      onCreate: ({ document }) => !document.subject && getSubject(document),
    },
  },
]);
