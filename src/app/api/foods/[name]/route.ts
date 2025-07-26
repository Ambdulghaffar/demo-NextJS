import { foods } from "@/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  const index = foods.findIndex(
    (food) => food.name.toLowerCase().replace(/ /g, "-") === name
  );

  if (index !== -1) {
    return new Response(JSON.stringify(foods[index]), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }

  return new Response(JSON.stringify({ error: "Food not found" }), {
    headers: { "Content-Type": "application/json" },
    status: 404,
  });
}
