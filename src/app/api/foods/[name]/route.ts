import { foods } from "@/data";
import { use } from "react";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {name} = use(params);
  const index = foods.findIndex(
    (food) => food.name.toLowerCase().replace(/ /g, "-") === name
  );
  if (index != -1) {
    return new Response(JSON.stringify(foods[index]), {
      headers: {
        "content-type": "application/json",
      },
      status: 200,
    });
  } else {
    return (
      new Response("Food not found"),
      {
        headers: {
          "content-type": "application/json",
        },
        status: 404,
      }
    );
  }
}
