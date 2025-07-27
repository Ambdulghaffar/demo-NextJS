"use client";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { IFood, IMacronutrientData } from "@/types";
import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const FoodPage = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = use(params);
  const router = useRouter();
  const [food, setFood] = useState<IFood | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [macronutrinments, setMacronutrinments] = useState<
    IMacronutrientData[]
  >([]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const fetchFood = async () => {
    try {
      const APIQueryURL = `/api/foods/${name}`;
      const response = await fetch(APIQueryURL);
      const data = await response.json();

      // Macronutriments
      const macronutrimentsDatas: IMacronutrientData[] = [
        { name: "carbohydrates", value: data.carbohydrates },
        { name: "protein", value: data.protein },
        { name: "fat", value: data.fat },
      ];
      setMacronutrinments(macronutrimentsDatas);

      //Food general
      setFood(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchFood();
    };
    initialize();
  }, [name]);

  return (
    <>
      {!isLoading && food && macronutrinments ? (
        <div className="p-8 text-white">
          <Undo2
            className="cursor-pointer mb-5 text-white"
            onClick={() => router.back()}
          />
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg: text-7xl">
            {food.name}
          </h1>
          <div className=" flex flex-col md:flex-row items-center md:items-start ">
            <div className="w-full md:w-1/2 lg:-1/3 mb-8 md:mb-0">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={macronutrinments}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {macronutrinments.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-white">
          <p className="text-2xl">Loading...</p>
        </div>
      )}
    </>
  );
};

export default FoodPage;
