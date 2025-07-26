"use client";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { IFood, IMacronutrientData } from "@/types";
import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

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
    <PieChart width={800} height={400}>
      <Pie
        data={macronutrinments}
        cx={120}
        cy={200}
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
  );
};

export default FoodPage;
